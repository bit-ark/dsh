// src/index.ts
import { rm } from "node:fs/promises";
import { basename, dirname } from "node:path";
var name = "dsh-archive-tab";
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
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1e6) {
        reject(new HttpError(413, "request body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      try {
        const text = Buffer.concat(chunks).toString("utf8");
        resolve(text === "" ? {} : JSON.parse(text));
      } catch {
        reject(new HttpError(400, "request body is not valid JSON"));
      }
    });
    req.on("error", () => reject(new HttpError(400, "request stream failed")));
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
    throw new HttpError(400, "sessionId must be a non-empty string");
  }
  return sessionId;
}
function requireSessionIds(body) {
  const raw = body.sessionIds;
  if (!Array.isArray(raw) || raw.length === 0) {
    throw new HttpError(400, "sessionIds must be a non-empty array");
  }
  if (raw.length > 500) {
    throw new HttpError(400, "sessionIds must not exceed 500 entries");
  }
  const seen = /* @__PURE__ */ new Set();
  const ids = [];
  for (const value of raw) {
    if (typeof value !== "string" || value.length === 0 || value.length > 512) {
      throw new HttpError(400, "sessionIds must contain only non-empty strings");
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
      "workspace registry write chain is unavailable (harness API drift); restore is disabled until this plugin is updated"
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
    const route = pathname === "/dsh-archive-tab/restore" ? "restore" : pathname === "/dsh-archive-tab/delete" ? "delete" : pathname === "/dsh-archive-tab/delete-all" ? "delete-all" : void 0;
    try {
      if (route === void 0) throw new HttpError(404, `unknown route ${JSON.stringify(pathname)}`);
      if (req.method !== "POST") throw new HttpError(405, "method not allowed; use POST");
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
      sendJson(res, 500, { ok: false, error: "internal error" });
    }
  };
  ctx.effect(
    () => ctx.webServer.register({ kind: "prefix", path: "/dsh-archive-tab", handler }),
    "dsh-archive-tab: routes"
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
async function deleteSessionCore(ctx, sessionId) {
  const registry = ctx.workspaceRegistry;
  const headers = await ctx.sessionPersistence.list();
  const header = headers.find((candidate) => candidate.id === sessionId);
  let targetDir = null;
  if (header !== void 0) {
    const location = ctx.sessionPersistence.locate(header);
    if (location !== void 0 && typeof location.path === "string" && location.path !== "") {
      const dir = dirname(location.path);
      const dirName = basename(dir);
      if (dirName !== sessionId && dirName !== encodeURIComponent(sessionId)) {
        throw new HttpError(500, `refusing to remove unexpected session directory ${JSON.stringify(dir)}`);
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
      throw new HttpError(500, `refusing to remove unexpected session directory ${JSON.stringify(targetDir)}`);
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
    throw new HttpError(409, "session is live in this process; close it before deleting");
  }
  const result = await deleteSessionCore(ctx, sessionId);
  sendJson(res, 200, {
    ok: true,
    sessionId,
    ...result
  });
}
async function handleDeleteAll(ctx, sessionIds, res) {
  let deleted = 0;
  let skipped = 0;
  let failed = 0;
  const failures = [];
  for (const sessionId of sessionIds) {
    const live = ctx.get("sessions")?.get(sessionId);
    if (live !== void 0) {
      skipped += 1;
      continue;
    }
    try {
      await deleteSessionCore(ctx, sessionId);
      deleted += 1;
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
