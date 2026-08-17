// src/usage-fold.ts
function count(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}
function totalOf(buckets) {
  return buckets.uncachedInput + buckets.output + buckets.cacheRead + buckets.cacheWrite;
}
function zeroBuckets() {
  return { uncachedInput: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
}
function addBuckets(target, add) {
  target.uncachedInput += add.uncachedInput;
  target.output += add.output;
  target.cacheRead += add.cacheRead;
  target.cacheWrite += add.cacheWrite;
}
function sampleOf(event) {
  const data = event.data;
  if (data === void 0 || data === null) return void 0;
  if (event.type === "assistant/chunk") {
    const chunk = data.chunk;
    if (chunk === void 0 || chunk === null || chunk.type !== "usage") return void 0;
    if (chunk.usage === void 0 || chunk.usage === null) return void 0;
    if (typeof data.turn !== "number" || typeof data.step !== "number") return void 0;
    return { turn: data.turn, step: data.step, usage: chunk.usage };
  }
  if (event.type === "assistant/message") {
    if (data.usage === void 0 || data.usage === null) return void 0;
    if (typeof data.turn !== "number" || typeof data.step !== "number") return void 0;
    return { turn: data.turn, step: data.step, usage: data.usage };
  }
  return void 0;
}
function bucketsFrom(usage) {
  return {
    uncachedInput: count(usage.inputTokens),
    output: count(usage.outputTokens),
    cacheRead: count(usage.cacheReadTokens),
    cacheWrite: count(usage.cacheWriteTokens)
  };
}
function foldSessionUsage(header, events) {
  const seed = typeof header.seedLength === "number" && Number.isInteger(header.seedLength) && header.seedLength > 0 ? header.seedLength : 0;
  const byStep = /* @__PURE__ */ new Map();
  for (let index = seed; index < events.length; index += 1) {
    const event = events[index];
    if (event === void 0) continue;
    const sample = sampleOf(event);
    if (sample === void 0) continue;
    byStep.set(`${sample.turn}:${sample.step}`, {
      time: typeof event.time === "number" && Number.isFinite(event.time) ? event.time : 0,
      buckets: bucketsFrom(sample.usage)
    });
  }
  const totals = zeroBuckets();
  const samples = [];
  for (const sample of byStep.values()) {
    addBuckets(totals, sample.buckets);
    samples.push(sample);
  }
  return { totals, requests: byStep.size, samples };
}
function sumSamples(samples) {
  const buckets = zeroBuckets();
  for (const sample of samples) addBuckets(buckets, sample.buckets);
  return { buckets, total: totalOf(buckets), requests: samples.length };
}
function two(n) {
  return String(n).padStart(2, "0");
}
function localDate(ms) {
  const d = new Date(ms);
  return { year: d.getFullYear(), month: d.getMonth(), day: d.getDate() };
}
function buildDayBuckets(samples, days, nowMs) {
  const windowDays = Math.max(1, Math.min(90, Math.trunc(Number.isFinite(days) ? days : 14)));
  const today = localDate(nowMs);
  const buckets = [];
  const byKey = /* @__PURE__ */ new Map();
  for (let back = windowDays - 1; back >= 0; back -= 1) {
    const d = new Date(today.year, today.month, today.day - back);
    const date = `${d.getFullYear()}-${two(d.getMonth() + 1)}-${two(d.getDate())}`;
    const bucket = {
      date,
      label: `${two(d.getMonth() + 1)}-${two(d.getDate())}`,
      uncachedInput: 0,
      output: 0,
      cacheRead: 0,
      cacheWrite: 0,
      total: 0,
      requests: 0
    };
    buckets.push(bucket);
    byKey.set(date, bucket);
  }
  for (const sample of samples) {
    if (sample.time <= 0) continue;
    const { year, month, day } = localDate(sample.time);
    const bucket = byKey.get(`${year}-${two(month + 1)}-${two(day)}`);
    if (bucket === void 0) continue;
    bucket.uncachedInput += sample.buckets.uncachedInput;
    bucket.output += sample.buckets.output;
    bucket.cacheRead += sample.buckets.cacheRead;
    bucket.cacheWrite += sample.buckets.cacheWrite;
    bucket.requests += 1;
  }
  for (const bucket of buckets) bucket.total = totalOf(bucket);
  return buckets;
}

// src/index.ts
var name = "dsh-deepseek-balance";
var inject = ["webServer", "sessionPersistence"];
var DEFAULT_BALANCE_BASE_URL = "https://api.deepseek.com";
var DEFAULT_API_KEY_ENV = "DEEPSEEK_API_KEY";
var DEFAULT_USAGE_DAYS = 14;
var MAX_USAGE_DAYS = 90;
var DEFAULT_CACHE_TTL_MS = 3e5;
var BALANCE_TIMEOUT_MS = 8e3;
var USAGE_LOAD_CONCURRENCY = 4;
function nonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}
function resolveConfig(config) {
  let usageDays = DEFAULT_USAGE_DAYS;
  if (typeof config?.usageDays === "number" && Number.isFinite(config.usageDays)) {
    usageDays = Math.max(1, Math.min(MAX_USAGE_DAYS, Math.trunc(config.usageDays)));
  }
  let cacheTtlMs = DEFAULT_CACHE_TTL_MS;
  if (typeof config?.cacheTtlMs === "number" && Number.isFinite(config.cacheTtlMs) && config.cacheTtlMs >= 0) {
    cacheTtlMs = Math.trunc(config.cacheTtlMs);
  }
  let balanceBaseURL = DEFAULT_BALANCE_BASE_URL;
  if (nonEmptyString(config?.balanceBaseURL)) {
    try {
      balanceBaseURL = new URL(config.balanceBaseURL.trim()).toString().replace(/\/+$/, "");
    } catch {
    }
  }
  return {
    apiKeyEnv: nonEmptyString(config?.apiKeyEnv) ? config.apiKeyEnv.trim() : DEFAULT_API_KEY_ENV,
    balanceBaseURL,
    usageDays,
    cacheTtlMs
  };
}
function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}
async function resolveApiKey(ctx, apiKeyEnv) {
  const credentials = ctx.get("credentials");
  if (credentials !== void 0 && typeof credentials.resolve === "function") {
    try {
      const hit = await credentials.resolve(apiKeyEnv);
      if (hit !== void 0 && nonEmptyString(hit.value)) return hit.value;
    } catch (error) {
      ctx.logger?.warn?.(new Error(`deepseek-balance: credentials resolve failed: ${String(error)}`));
    }
  }
  const ambient = process.env[apiKeyEnv];
  if (nonEmptyString(ambient)) return ambient;
  return void 0;
}
async function fetchBalance(baseURL, apiKey) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), BALANCE_TIMEOUT_MS);
  let response;
  try {
    response = await fetch(`${baseURL}/user/balance`, {
      method: "GET",
      headers: { authorization: `Bearer ${apiKey}`, accept: "application/json" },
      signal: controller.signal
    });
  } catch (error) {
    const aborted = controller.signal.aborted;
    return {
      ok: false,
      code: "network",
      message: aborted ? `\u8BF7\u6C42\u8D85\u65F6\uFF08${String(BALANCE_TIMEOUT_MS / 1e3)}s\uFF09\uFF1A\u65E0\u6CD5\u8FDE\u63A5 ${baseURL}` : `\u7F51\u7EDC\u9519\u8BEF\uFF1A${error instanceof Error ? error.message : String(error)}`
    };
  } finally {
    clearTimeout(timer);
  }
  if (response.status === 401 || response.status === 403) {
    return {
      ok: false,
      code: "auth-failed",
      message: `API Key \u88AB\u62D2\u7EDD\uFF08HTTP ${String(response.status)}\uFF09\uFF1A\u53EF\u80FD\u65E0\u6548\u6216\u5DF2\u8FC7\u671F`
    };
  }
  if (!response.ok) {
    return {
      ok: false,
      code: "upstream",
      message: `\u4F59\u989D\u63A5\u53E3\u8FD4\u56DE HTTP ${String(response.status)}`
    };
  }
  let body;
  try {
    body = await response.json();
  } catch {
    return { ok: false, code: "upstream", message: "\u4F59\u989D\u63A5\u53E3\u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u5185\u5BB9" };
  }
  const infos = Array.isArray(body?.balance_infos) ? body.balance_infos : [];
  const balances = infos.map((info) => ({
    currency: typeof info?.currency === "string" ? info.currency : "",
    total: typeof info?.total_balance === "string" ? info.total_balance : String(info?.total_balance ?? "0"),
    granted: typeof info?.granted_balance === "string" ? info.granted_balance : String(info?.granted_balance ?? "0"),
    toppedUp: typeof info?.topped_up_balance === "string" ? info.topped_up_balance : String(info?.topped_up_balance ?? "0")
  }));
  return {
    ok: true,
    available: body?.is_available === true,
    balances,
    fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function cwdLabelOf(cwd) {
  if (!nonEmptyString(cwd)) return "(\u672A\u77E5\u76EE\u5F55)";
  const index = cwd.lastIndexOf("/");
  const label = index >= 0 ? cwd.slice(index + 1) : cwd;
  return label === "" ? cwd : label;
}
async function computeUsage(ctx, persistence, days) {
  const headers = await persistence.list();
  const allSamples = [];
  const perSession = [];
  let skipped = 0;
  let allTimeTotal = 0;
  let allTimeRequests = 0;
  let cursor = 0;
  const worker = async () => {
    for (; ; ) {
      const index = cursor;
      cursor += 1;
      const header = headers[index];
      if (header === void 0) return;
      try {
        const inspection = await persistence.load(header.id);
        const fold = foldSessionUsage(
          { id: header.id, cwd: header.cwd, seedLength: header.seedLength },
          inspection.events
        );
        allSamples.push(...fold.samples);
        allTimeTotal += totalOf(fold.totals);
        allTimeRequests += fold.requests;
        perSession.push({
          sessionId: header.id,
          cwdLabel: cwdLabelOf(header.cwd),
          total: totalOf(fold.totals)
        });
      } catch (error) {
        skipped += 1;
        ctx.logger?.warn?.(new Error(`deepseek-balance: failed to load session '${header.id}': ${String(error)}`));
      }
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(USAGE_LOAD_CONCURRENCY, Math.max(1, headers.length)) }, () => worker())
  );
  const nowMs = Date.now();
  const dayBuckets = buildDayBuckets(allSamples, days, nowMs);
  const windowBuckets = zeroBuckets();
  let windowRequests = 0;
  for (const bucket of dayBuckets) {
    windowBuckets.uncachedInput += bucket.uncachedInput;
    windowBuckets.output += bucket.output;
    windowBuckets.cacheRead += bucket.cacheRead;
    windowBuckets.cacheWrite += bucket.cacheWrite;
    windowRequests += bucket.requests;
  }
  perSession.sort((left, right) => right.total - left.total);
  return {
    ok: true,
    days: dayBuckets,
    totals: { ...windowBuckets, total: totalOf(windowBuckets) },
    allTimeTotal,
    allTimeRequests,
    topSessions: perSession.filter((entry) => entry.total > 0).slice(0, 5),
    sessionsScanned: headers.length - skipped,
    skipped,
    windowDays: days,
    generatedAt: new Date(nowMs).toISOString(),
    cached: false
  };
}
function apply(ctx, config) {
  const resolved = resolveConfig(config);
  let usageCache = null;
  let usageInflight = null;
  const getUsage = async (days, refresh) => {
    if (!refresh && usageCache !== null && usageCache.days === days && Date.now() - usageCache.at < resolved.cacheTtlMs) {
      return { ...usageCache.result, cached: true };
    }
    if (usageInflight === null) {
      usageInflight = computeUsage(ctx, ctx.sessionPersistence, days).then((result) => {
        usageCache = { at: Date.now(), days, result };
        usageInflight = null;
        return result;
      }).catch((error) => {
        usageInflight = null;
        throw error;
      });
    }
    return usageInflight;
  };
  const handler = async (req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    const pathname = url.pathname;
    try {
      if (req.method !== "GET") {
        sendJson(res, 405, { ok: false, code: "method-not-allowed", message: "method not allowed; use GET" });
        return;
      }
      if (pathname === "/dsh-deepseek-balance/balance") {
        const apiKey = await resolveApiKey(ctx, resolved.apiKeyEnv);
        if (apiKey === void 0) {
          sendJson(res, 200, {
            ok: false,
            code: "missing-key",
            message: `\u672A\u627E\u5230 API Key\uFF08\u51ED\u636E\u5F15\u7528 ${resolved.apiKeyEnv}\uFF09\u3002\u8BF7\u5230 \u8BBE\u7F6E \u2192 Models \u914D\u7F6E DeepSeek API Key\uFF0C\u6216\u5728\u542F\u52A8\u73AF\u5883\u4E2D\u5BFC\u51FA\u8BE5\u53D8\u91CF\u3002`
          });
          return;
        }
        sendJson(res, 200, await fetchBalance(resolved.balanceBaseURL, apiKey));
        return;
      }
      if (pathname === "/dsh-deepseek-balance/usage") {
        const rawDays = url.searchParams.get("days");
        let days = resolved.usageDays;
        if (rawDays !== null) {
          const parsed = Number.parseInt(rawDays, 10);
          if (Number.isFinite(parsed)) days = Math.max(1, Math.min(MAX_USAGE_DAYS, parsed));
        }
        const refresh = url.searchParams.get("refresh") === "1";
        sendJson(res, 200, await getUsage(days, refresh));
        return;
      }
      sendJson(res, 404, { ok: false, code: "not-found", message: `unknown route ${JSON.stringify(pathname)}` });
    } catch (error) {
      ctx.logger?.warn?.(new Error(`deepseek-balance: ${String(error)}`));
      sendJson(res, 500, { ok: false, code: "internal", message: "internal error" });
    }
  };
  ctx.effect(
    () => ctx.webServer.register({ kind: "prefix", path: "/dsh-deepseek-balance", handler }),
    "deepseek-balance: routes"
  );
}
export {
  apply,
  buildDayBuckets,
  foldSessionUsage,
  inject,
  name,
  sumSamples,
  totalOf,
  zeroBuckets
};
//# sourceMappingURL=index.js.map
