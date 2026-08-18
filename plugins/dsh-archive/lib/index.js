// src/index.ts
import { rm } from "node:fs/promises";
import { basename, dirname } from "node:path";
var name = "dsh-archive";
var inject = ["webServer", "workspaceRegistry", "sessionPersistence"];
var HttpError = class extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
};
function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let settled = false;
    const fail = (error) => {
      if (settled) return;
      settled = true;
      reject(error);
    };
    req.on("data", (chunk) => {
      if (settled) return;
      size += chunk.length;
      if (size > 1e6) {
        fail(new HttpError(413, "\u8BF7\u6C42\u4F53\u8FC7\u5927\uFF08\u4E0A\u9650 1MB\uFF09"));
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (settled) return;
      settled = true;
      try {
        const text = Buffer.concat(chunks).toString("utf8");
        resolve(text === "" ? {} : JSON.parse(text));
      } catch {
        reject(new HttpError(400, "\u8BF7\u6C42\u4F53\u4E0D\u662F\u5408\u6CD5\u7684 JSON"));
      }
    });
    req.on("error", () => fail(new HttpError(400, "\u8BF7\u6C42\u6D41\u8BFB\u53D6\u5931\u8D25")));
  });
}
function sendJson(res, status, value) {
  const body = JSON.stringify(value);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}
function requireSessionId(body) {
  const sessionId = body.sessionId;
  if (typeof sessionId !== "string" || sessionId.length === 0 || sessionId.length > 512) {
    throw new HttpError(400, "sessionId \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32");
  }
  return sessionId;
}
function requireSessionIds(body) {
  const raw = body.sessionIds;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new HttpError(400, "sessionIds \u5FC5\u987B\u662F\u975E\u7A7A\u6570\u7EC4");
  }
  if (raw.length > 500) {
    throw new HttpError(400, "sessionIds \u6700\u591A 500 \u9879");
  }
  const seen = /* @__PURE__ */ new Set();
  const ids = [];
  for (const value of raw) {
    if (typeof value !== "string" || value.length === 0 || value.length > 512) {
      throw new HttpError(400, "sessionIds \u53EA\u80FD\u5305\u542B\u975E\u7A7A\u5B57\u7B26\u4E32");
    }
    if (seen.has(value)) continue;
    seen.add(value);
    ids.push(value);
  }
  return ids;
}
async function unarchiveSession(registry, sessionId) {
  if (!registry.archivedSessionIds.includes(sessionId)) return { changed: false };
  const internals = registry;
  if (typeof internals.enqueueOperation !== "function" || typeof internals.requireState !== "function" || typeof internals.setState !== "function") {
    throw new HttpError(
      503,
      "workspace registry \u5199\u94FE\u4E0D\u53EF\u7528\uFF08harness API \u6F02\u79FB\uFF09\uFF1B\u6062\u590D/\u5220\u9664\u5DF2\u505C\u7528\uFF0C\u8BF7\u66F4\u65B0\u672C\u63D2\u4EF6"
    );
  }
  let changed = false;
  await internals.enqueueOperation(async () => {
    const state = internals.requireState();
    if (!state.archivedSessionIds.includes(sessionId)) return;
    await internals.setState({
      ...state,
      archivedSessionIds: state.archivedSessionIds.filter((id) => id !== sessionId)
    });
    changed = true;
  });
  return { changed };
}
function apply(ctx) {
  const handler = async (req, res) => {
    const pathname = new URL(req.url ?? "/", "http://x").pathname;
    const route = pathname === "/dsh-archive/restore" ? "restore" : pathname === "/dsh-archive/delete" ? "delete" : pathname === "/dsh-archive/delete-all" ? "delete-all" : void 0;
    try {
      if (route === void 0) throw new HttpError(404, `\u672A\u77E5\u8DEF\u7531 ${JSON.stringify(pathname)}`);
      if (req.method !== "POST") throw new HttpError(405, "\u4EC5\u652F\u6301 POST \u65B9\u6CD5");
      const mediaType = (req.headers["content-type"] ?? "").split(";", 1)[0]?.trim().toLowerCase();
      if (mediaType !== "application/json") throw new HttpError(415, "content-type \u5FC5\u987B\u662F application/json");
      const body = await readJsonBody(req);
      if (route === "restore") {
        await handleRestore(ctx, requireSessionId(body), res);
      } else if (route === "delete") {
        await handleDelete(ctx, requireSessionId(body), res);
      } else {
        await handleDeleteAll(ctx, requireSessionIds(body), res);
      }
    } catch (error) {
      if (error instanceof HttpError) {
        sendJson(res, error.status, { ok: false, error: error.message });
        return;
      }
      ctx.logger.warn(error instanceof Error ? error : new Error(String(error)));
      sendJson(res, 500, { ok: false, error: "\u5185\u90E8\u9519\u8BEF" });
    }
  };
  ctx.effect(
    () => ctx.webServer.register({ kind: "prefix", path: "/dsh-archive", handler }),
    "dsh-archive: routes"
  );
}
async function handleRestore(ctx, sessionId, res) {
  const registry = ctx.workspaceRegistry;
  const { changed } = await unarchiveSession(registry, sessionId);
  sendJson(res, 200, {
    ok: true,
    sessionId,
    changed,
    archivedSessionIds: [...registry.archivedSessionIds]
  });
}
async function deleteSessionCore(ctx, sessionId, headers) {
  const registry = ctx.workspaceRegistry;
  const allHeaders = headers ?? await ctx.sessionPersistence.list();
  const header = allHeaders.find((candidate) => candidate.id === sessionId);
  let targetDir = null;
  if (header !== void 0) {
    const location = ctx.sessionPersistence.locate(header);
    if (location !== void 0 && typeof location.path === "string" && location.path !== "") {
      const dir = dirname(location.path);
      const dirName = basename(dir);
      if (dirName !== sessionId && dirName !== encodeURIComponent(sessionId)) {
        throw new HttpError(500, `\u62D2\u7EDD\u5220\u9664\u610F\u5916\u7684\u4F1A\u8BDD\u76EE\u5F55 ${JSON.stringify(dir)}`);
      }
      targetDir = dir;
    }
  }
  const { changed: unarchived } = await unarchiveSession(registry, sessionId);
  let detachedWorkspaces = 0;
  const detachErrors = [];
  for (const workspace of registry.list()) {
    if (!workspace.sessionIds.includes(sessionId)) continue;
    try {
      await workspace.detachSession(sessionId);
      detachedWorkspaces += 1;
    } catch (error) {
      detachErrors.push(`workspace ${workspace.id}: ${String(error)}`);
      ctx.logger.warn(new Error(`archive-tab: detach failed for '${sessionId}' in workspace '${workspace.id}': ${String(error)}`));
    }
  }
  let removedFiles = false;
  if (targetDir !== null) {
    const dirName = basename(targetDir);
    if (dirName !== sessionId && dirName !== encodeURIComponent(sessionId)) {
      throw new HttpError(500, `\u62D2\u7EDD\u5220\u9664\u610F\u5916\u7684\u4F1A\u8BDD\u76EE\u5F55 ${JSON.stringify(targetDir)}`);
    }
    await rm(targetDir, { recursive: true, force: true });
    removedFiles = true;
  }
  let clearedProjectionCache = false;
  const cache = ctx.get("sessionProjectionCache");
  const table = cache?.table;
  if (table !== void 0 && typeof table.delete === "function") {
    try {
      clearedProjectionCache = await table.delete(sessionId);
    } catch (error) {
      ctx.logger.warn(new Error(`archive-tab: projection-cache cleanup failed for '${sessionId}': ${String(error)}`));
    }
  }
  return {
    removedFiles,
    detachedWorkspaces,
    unarchived,
    clearedProjectionCache,
    persisted: header !== void 0,
    detachErrors
  };
}
async function handleDelete(ctx, sessionId, res) {
  const live = ctx.get("sessions")?.get(sessionId);
  if (live !== void 0) {
    throw new HttpError(
      409,
      "\u8BE5\u4F1A\u8BDD\u4ECD\u5728\u8FDB\u7A0B\u4E2D\u8FD0\u884C\uFF0C\u65E0\u6CD5\u5220\u9664\u3002\u5F52\u6863\u4E0D\u4F1A\u7ED3\u675F\u4F1A\u8BDD\u2014\u2014\u4F1A\u8BDD\u4F1A\u4E00\u76F4\u5B58\u6D3B\u5230 dsh web \u91CD\u542F\u4E3A\u6B62\uFF1B\u8BF7\u91CD\u542F dsh web \u540E\u518D\u5220\u9664"
    );
  }
  const result = await deleteSessionCore(ctx, sessionId);
  sendJson(res, 200, {
    ok: true,
    sessionId,
    ...result
  });
}
async function handleDeleteAll(ctx, sessionIds, res) {
  const sessions = ctx.get("sessions");
  const headers = await ctx.sessionPersistence.list();
  let deleted = 0;
  let skipped = 0;
  let failed = 0;
  const skippedIds = [];
  const failures = [];
  for (const sessionId of sessionIds) {
    const live = sessions?.get(sessionId);
    if (live !== void 0) {
      skipped += 1;
      skippedIds.push(sessionId);
      continue;
    }
    try {
      const result = await deleteSessionCore(ctx, sessionId, headers);
      if (result.detachErrors.length > 0) {
        failed += 1;
        failures.push({
          sessionId,
          error: `\u6587\u4EF6\u5DF2\u5220\u9664\uFF0C\u4F46 workspace \u8D26\u76EE\u89E3\u9664\u5931\u8D25\uFF1A${result.detachErrors.join("\uFF1B")}`
        });
        ctx.logger.warn(new Error(`archive-tab: batch delete incomplete for '${sessionId}': ${result.detachErrors.join("; ")}`));
      } else {
        deleted += 1;
      }
    } catch (error) {
      failed += 1;
      const message = error instanceof HttpError ? error.message : String(error);
      failures.push({ sessionId, error: message });
      ctx.logger.warn(new Error(`archive-tab: batch delete failed for '${sessionId}': ${message}`));
    }
  }
  sendJson(res, 200, {
    ok: true,
    total: sessionIds.length,
    deleted,
    skipped,
    skippedIds,
    failed,
    failures
  });
}
export {
  apply,
  inject,
  name
};
//# sourceMappingURL=index.js.map
