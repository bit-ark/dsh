// src/usage-fold.ts
var DEFAULT_PEAK_HOURS = [9, 10, 11, 12, 13];
var BEIJING_OFFSET_MS = 8 * 36e5;
function beijingHour(ms) {
  return new Date(ms + BEIJING_OFFSET_MS).getUTCHours();
}
function costOfSample(sample, prices, peakHours) {
  if (prices === void 0) return void 0;
  const price = prices[sample.model];
  if (price === void 0) return void 0;
  const missTokens = sample.buckets.uncachedInput + sample.buckets.cacheWrite;
  const base = missTokens / 1e6 * price.inputMiss + sample.buckets.cacheRead / 1e6 * price.inputHit + sample.buckets.output / 1e6 * price.output;
  const peak = peakHours.includes(beijingHour(sample.time));
  return base * (peak ? 2 : 1);
}
function sumCost(samples, prices, peakHours) {
  if (prices === void 0) return void 0;
  let total = 0;
  let priced = 0;
  for (const sample of samples) {
    const cost = costOfSample(sample, prices, peakHours);
    if (cost === void 0) continue;
    total += cost;
    priced += 1;
  }
  return priced === 0 ? void 0 : total;
}
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
  let currentProvider = "(unknown)";
  let currentModel = "(unknown)";
  for (let index = 0; index < events.length; index += 1) {
    const event = events[index];
    if (event === void 0) continue;
    if (event.type === "request/header") {
      const config = event.data?.header?.config;
      if (typeof config?.provider === "string" && config.provider.length > 0) currentProvider = config.provider;
      if (typeof config?.model === "string" && config.model.length > 0) currentModel = config.model;
      continue;
    }
    if (index < seed) continue;
    const sample = sampleOf(event);
    if (sample === void 0) continue;
    const time = typeof event.time === "number" && Number.isFinite(event.time) ? event.time : 0;
    if (time <= 0) continue;
    byStep.set(`${sample.turn}:${sample.step}`, {
      time,
      provider: currentProvider,
      model: currentModel,
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
function buildDayBuckets(samples, days, nowMs, prices, peakHours = DEFAULT_PEAK_HOURS) {
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
      requests: 0,
      cost: 0,
      priced: false
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
    const cost = costOfSample(sample, prices, peakHours);
    if (cost !== void 0) {
      bucket.cost += cost;
      bucket.priced = true;
    }
  }
  for (const bucket of buckets) bucket.total = totalOf(bucket);
  return buckets;
}

// src/index.ts
var name = "dsh-balance";
var inject = ["webServer", "sessionPersistence"];
var DEFAULT_BALANCE_BASE_URL = "https://api.deepseek.com";
var DEFAULT_API_KEY_ENV = "DEEPSEEK_API_KEY";
var DEFAULT_USAGE_DAYS = 14;
var MAX_USAGE_DAYS = 90;
var DEFAULT_CACHE_TTL_MS = 3e5;
var BALANCE_TIMEOUT_MS = 8e3;
var USAGE_LOAD_CONCURRENCY = 4;
var DEFAULT_PRICES = {
  "deepseek-v4-flash": { inputMiss: 1.5, inputHit: 0.05, output: 4.5 },
  "deepseek-v4-pro": { inputMiss: 4.5, inputHit: 0.15, output: 13.5 }
};
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
  const prices = { ...DEFAULT_PRICES };
  if (config?.pricesPerM !== void 0 && config.pricesPerM !== null && typeof config.pricesPerM === "object") {
    for (const [model, price] of Object.entries(config.pricesPerM)) {
      if (price !== null && typeof price === "object") {
        prices[model] = {
          inputMiss: Number(price.inputMiss) || 0,
          inputHit: Number(price.inputHit) || 0,
          output: Number(price.output) || 0
        };
      }
    }
  }
  const peakHours = Array.isArray(config?.peakHours) && config.peakHours.length > 0 ? [...new Set(config.peakHours.map((hour) => Math.trunc(Number(hour))).filter((hour) => Number.isFinite(hour) && hour >= 0 && hour <= 23))].sort((left, right) => left - right) : [...DEFAULT_PEAK_HOURS];
  return {
    apiKeyEnv: nonEmptyString(config?.apiKeyEnv) ? config.apiKeyEnv.trim() : DEFAULT_API_KEY_ENV,
    balanceBaseURL,
    usageDays,
    cacheTtlMs,
    costCurrency: config?.costCurrency === "USD" ? "USD" : "CNY",
    prices,
    peakHours
  };
}
function roundCost(value) {
  return Math.round(value * 100) / 100;
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
function resolveProviderKeyNames(ctx, config) {
  const names = /* @__PURE__ */ new Map();
  names.set("deepseek-official", DEFAULT_API_KEY_ENV);
  const settings = ctx.get("settings");
  if (settings !== void 0 && typeof settings.get === "function") {
    try {
      const deepseek = settings.get("llm-deepseek");
      if (deepseek !== void 0 && deepseek !== null && typeof deepseek.apiKeyEnv === "string" && nonEmptyString(deepseek.apiKeyEnv)) {
        names.set("deepseek-official", deepseek.apiKeyEnv);
      }
    } catch {
    }
    try {
      const piAi = settings.get("llm-pi-ai");
      const providers = piAi?.providers;
      if (providers !== void 0 && providers !== null && typeof providers === "object") {
        for (const [provider, profile] of Object.entries(providers)) {
          if (profile !== null && typeof profile === "object" && nonEmptyString(profile.apiKeyEnv)) {
            names.set(provider, profile.apiKeyEnv);
          }
        }
      }
    } catch {
    }
  }
  if (config?.keyNameByProvider !== void 0 && config.keyNameByProvider !== null && typeof config.keyNameByProvider === "object") {
    for (const [provider, keyName] of Object.entries(config.keyNameByProvider)) {
      if (nonEmptyString(keyName)) names.set(provider, keyName);
    }
  }
  return names;
}
async function computeUsage(ctx, persistence, days, config, resolved) {
  const headers = await persistence.list();
  const allSamples = [];
  const perSession = [];
  const keyNames = resolveProviderKeyNames(ctx, config);
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
          // persistence.load 的事件是运行时域对象数组，这里按 EventLike
          // 的最小形状（type/time/data）消费，双断言避免类型系统纠缠。
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
  const dayBuckets = buildDayBuckets(allSamples, days, nowMs, resolved.prices, resolved.peakHours);
  const windowBuckets = zeroBuckets();
  let windowRequests = 0;
  let windowCost = 0;
  let windowPriced = false;
  for (const bucket of dayBuckets) {
    windowBuckets.uncachedInput += bucket.uncachedInput;
    windowBuckets.output += bucket.output;
    windowBuckets.cacheRead += bucket.cacheRead;
    windowBuckets.cacheWrite += bucket.cacheWrite;
    windowRequests += bucket.requests;
    windowCost += bucket.cost;
    if (bucket.priced) windowPriced = true;
  }
  const allTimeCostRaw = sumCost(allSamples, resolved.prices, resolved.peakHours);
  const allTimeCost = allTimeCostRaw === void 0 ? null : roundCost(allTimeCostRaw);
  perSession.sort((left, right) => right.total - left.total);
  const perKey = /* @__PURE__ */ new Map();
  for (const sample of allSamples) {
    const keyName = keyNames.get(sample.provider) ?? sample.provider;
    let entry = perKey.get(keyName);
    if (entry === void 0) {
      entry = { keyName, providers: /* @__PURE__ */ new Set(), models: /* @__PURE__ */ new Map(), total: 0, requests: 0, cost: 0, priced: false };
      perKey.set(keyName, entry);
    }
    const sampleCost = costOfSample(sample, resolved.prices, resolved.peakHours);
    if (sampleCost !== void 0) {
      entry.cost += sampleCost;
      entry.priced = true;
    }
    entry.providers.add(sample.provider);
    entry.total += totalOf(sample.buckets);
    entry.requests += 1;
    const modelTotal = entry.models.get(sample.model);
    if (modelTotal === void 0) {
      entry.models.set(sample.model, {
        total: totalOf(sample.buckets),
        requests: 1,
        cost: sampleCost ?? 0,
        priced: sampleCost !== void 0
      });
    } else {
      modelTotal.total += totalOf(sample.buckets);
      modelTotal.requests += 1;
      if (sampleCost !== void 0) {
        modelTotal.cost += sampleCost;
        modelTotal.priced = true;
      }
    }
  }
  const topKeys = [...perKey.values()].filter((entry) => entry.total > 0).map((entry) => ({
    keyName: entry.keyName,
    providerIds: [...entry.providers].sort(),
    models: [...entry.models.entries()].map(([model, modelTotal]) => ({
      model,
      total: modelTotal.total,
      requests: modelTotal.requests,
      cost: modelTotal.priced ? roundCost(modelTotal.cost) : null
    })).sort((left, right) => right.total - left.total),
    total: entry.total,
    requests: entry.requests,
    cost: entry.priced ? roundCost(entry.cost) : null
  })).sort((left, right) => right.total - left.total).slice(0, 5);
  return {
    ok: true,
    days: dayBuckets,
    totals: {
      ...windowBuckets,
      total: totalOf(windowBuckets),
      cost: windowPriced ? roundCost(windowCost) : null
    },
    allTimeTotal,
    allTimeRequests,
    allTimeCost,
    costCurrency: resolved.costCurrency,
    topSessions: perSession.filter((entry) => entry.total > 0).slice(0, 5),
    topKeys,
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
  const usageInflight = /* @__PURE__ */ new Map();
  const getUsage = async (days, refresh) => {
    if (!refresh && usageCache !== null && usageCache.days === days && Date.now() - usageCache.at < resolved.cacheTtlMs) {
      return { ...usageCache.result, cached: true };
    }
    const key = `${days}:${refresh ? "1" : "0"}`;
    let inflight = usageInflight.get(key);
    if (inflight === void 0) {
      inflight = computeUsage(ctx, ctx.sessionPersistence, days, config, resolved).then((result) => {
        usageCache = { at: Date.now(), days, result };
        usageInflight.delete(key);
        return result;
      }).catch((error) => {
        usageInflight.delete(key);
        throw error;
      });
      usageInflight.set(key, inflight);
    }
    return inflight;
  };
  const handler = async (req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    const pathname = url.pathname;
    try {
      if (req.method !== "GET" && req.method !== "HEAD") {
        sendJson(res, 405, { ok: false, code: "method-not-allowed", message: "method not allowed; use GET" });
        return;
      }
      if (pathname === "/dsh-balance/balance") {
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
      if (pathname === "/dsh-balance/usage") {
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
    () => ctx.webServer.register({ kind: "prefix", path: "/dsh-balance", handler }),
    "deepseek-balance: routes"
  );
}
export {
  DEFAULT_PEAK_HOURS,
  apply,
  buildDayBuckets,
  costOfSample,
  foldSessionUsage,
  inject,
  name,
  sumCost,
  sumSamples,
  totalOf,
  zeroBuckets
};
//# sourceMappingURL=index.js.map
