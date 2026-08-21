window.__ModuleLoader__.load({ id: "dsh-archive", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var inject = ["slots", "sessions", "workspaces"];
var DELETE_BATCH_SIZE = 200;
async function callHost(endpoint, body) {
  const response = await fetch(`/dsh-archive/${endpoint}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = void 0;
  }
  if (!response.ok || payload === void 0 || payload.ok !== true) {
    throw new Error(payload?.error ?? `\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${String(response.status)}\uFF09`);
  }
  return payload;
}
function formatTime(value) {
  if (value === void 0 || Number.isNaN(value)) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "";
  }
}
function formatSkippedIds(ids, skipped) {
  const shown = ids.slice(0, 10);
  const suffix = shown.length < skipped ? `\u2026\u7B49 ${skipped} \u4E2A` : "";
  return shown.map((id) => `\u300C${id}\u300D`).join("\u3001") + suffix;
}
var downloadStates = {};
var downloadListeners = /* @__PURE__ */ new Set();
var downloadInflight = /* @__PURE__ */ new Set();
var downloadsSnapshot = { bySession: {} };
function subscribeDownloads(listener) {
  downloadListeners.add(listener);
  return () => {
    downloadListeners.delete(listener);
  };
}
function emitDownloads() {
  downloadsSnapshot = { bySession: { ...downloadStates } };
  for (const listener of downloadListeners) listener();
}
function getDownloadsSnapshot() {
  return downloadsSnapshot;
}
function hostBase() {
  const origin = globalThis.location?.origin;
  return origin !== void 0 && origin !== "null" ? origin : "http://dsh.internal";
}
function sessionLogZipFilename(sessionId) {
  return `dsh-session-${String(sessionId).replace(/[^A-Za-z0-9_-]/g, "_")}.zip`;
}
function exportUrl(sessionId) {
  const url = new URL("/api/session.export", hostBase());
  url.searchParams.set("sessionId", sessionId);
  url.searchParams.set("includeDescendants", "true");
  return url.toString();
}
async function downloadSessionLog(sessionId) {
  if (downloadInflight.has(sessionId)) return;
  downloadInflight.add(sessionId);
  downloadStates[sessionId] = { status: "downloading" };
  emitDownloads();
  try {
    const response = await fetch(exportUrl(sessionId), { method: "HEAD" });
    if (!response.ok) throw new Error(`\u5BFC\u51FA\u5931\u8D25\uFF1AHTTP ${response.status}`);
    const anchor = document.createElement("a");
    anchor.href = exportUrl(sessionId);
    anchor.download = sessionLogZipFilename(sessionId);
    anchor.click();
    downloadStates[sessionId] = { status: "success" };
  } catch (error) {
    downloadStates[sessionId] = {
      status: "error",
      error: error instanceof Error ? error.message : String(error)
    };
  } finally {
    downloadInflight.delete(sessionId);
  }
  emitDownloads();
}
function pruneDownloads(activeIds) {
  let changed = false;
  for (const id of Object.keys(downloadStates)) {
    if (!activeIds.has(id)) {
      delete downloadStates[id];
      changed = true;
    }
  }
  if (changed) emitDownloads();
}
function apply(ctx) {
  const STYLE_ID = "dsh-archive-style";
  if (typeof document !== "undefined" && document.getElementById(STYLE_ID) === null) {
    const styleEl = document.createElement("style");
    styleEl.id = STYLE_ID;
    styleEl.setAttribute("data-plugin", "dsh-archive");
    styleEl.textContent = `
      .dsh-archive-row:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dsh-archive-batch:hover:not(:disabled) {
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
      }
    `;
    document.head.appendChild(styleEl);
  }
  const styles = {
    // 设置页根：与 dsh-balance 设置页同款——页面自己滚动，颜色走主题 token。
    root: {
      height: "100%",
      overflowY: "auto",
      padding: "16px 20px",
      boxSizing: "border-box",
      color: "var(--dsw-alias-label-primary)",
      fontSize: "var(--dsw-font-xs-13, 13px)",
      fontFamily: "var(--dsw-font-family, inherit)"
    },
    pageHeader: {
      display: "flex",
      alignItems: "baseline",
      gap: "8px",
      marginBottom: "4px"
    },
    title: {
      fontSize: "var(--dsw-font-xs-strong-13, 13px)",
      fontWeight: 600
    },
    project: {
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "var(--dsw-font-xxs-12, 12px)"
    },
    count: {
      marginLeft: "auto",
      flex: "none",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "var(--dsw-font-xxs-12, 12px)",
      fontVariantNumeric: "tabular-nums"
    },
    hint: {
      color: "var(--dsw-alias-label-secondary)",
      fontSize: "var(--dsw-font-xxs-12, 12px)",
      lineHeight: 1.6,
      marginBottom: "12px"
    },
    error: {
      padding: "8px 12px",
      marginBottom: "8px",
      borderRadius: "8px",
      border: "1px solid var(--dsw-alias-state-error-primary)",
      color: "var(--dsw-alias-state-error-primary)",
      fontSize: "12px",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all"
    },
    row: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "10px 12px",
      marginBottom: "8px",
      borderRadius: "8px",
      border: "1px solid var(--dsw-alias-border-l2)",
      background: "var(--dsw-alias-bg-base)"
    },
    rowMain: {
      flex: 1,
      minWidth: 0
    },
    rowTitle: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      cursor: "pointer",
      fontSize: "13px",
      color: "var(--dsw-alias-label-primary)"
    },
    rowMeta: {
      marginTop: "2px",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "12px"
    },
    buttonBase: {
      flex: "none",
      padding: "4px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      cursor: "pointer",
      background: "transparent"
    },
    empty: {
      padding: "24px 0",
      textAlign: "center",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "12px"
    },
    batchRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      marginTop: "8px",
      paddingTop: "10px",
      borderTop: "1px solid var(--dsw-alias-border-l2)"
    },
    batchDelete: {
      flex: "none",
      display: "inline-flex",
      alignItems: "center",
      height: "24px",
      padding: "0 12px",
      boxSizing: "border-box",
      borderRadius: "6px",
      border: "1px solid var(--dsw-alias-state-error-primary)",
      background: "transparent",
      color: "var(--dsw-alias-state-error-primary)",
      fontSize: "12px",
      lineHeight: "1",
      cursor: "pointer"
    }
  };
  function ArchiveSection(_props) {
    const workspaces = (0, import_react.useSyncExternalStore)(
      ctx.workspaces.list.subscribe,
      () => ctx.workspaces.list.getSnapshot()
    );
    const sessions = (0, import_react.useSyncExternalStore)(
      ctx.sessions.list.subscribe,
      () => ctx.sessions.list.getSnapshot()
    );
    const [busy, setBusy] = (0, import_react.useState)(null);
    const [batchBusy, setBatchBusy] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)(null);
    const busyRef = (0, import_react.useRef)(false);
    const batchBusyRef = (0, import_react.useRef)(false);
    const workspace = (0, import_react.useMemo)(() => {
      const items = workspaces?.items;
      if (items === void 0 || items.length === 0) return void 0;
      const recent = workspaces?.recentWorkspaceId;
      if (recent !== void 0) {
        const byRecent = items.find((item) => item.workspaceId === recent);
        if (byRecent !== void 0) return byRecent;
      }
      const current = sessions?.current;
      if (current !== void 0) {
        const byMembership = items.find((item) => item.sessionIds.includes(current));
        if (byMembership !== void 0) return byMembership;
        const currentCwd = sessions?.byId[current]?.cwd;
        if (currentCwd !== void 0) {
          const byPath = items.find((item) => item.path === currentCwd);
          if (byPath !== void 0) return byPath;
        }
      }
      return void 0;
    }, [workspaces, sessions]);
    const projectLabel = workspace?.title;
    const rows = (0, import_react.useMemo)(() => {
      const archived = workspaces?.archivedSessionIds;
      if (archived === void 0 || archived.length === 0 || workspace === void 0) return [];
      const result = [];
      for (const id of archived) {
        const summary = sessions?.byId[id];
        const inAccount = workspace.sessionIds.includes(id);
        const sameProject = summary?.cwd !== void 0 && summary.cwd === workspace.path;
        if (!inAccount && !sameProject) continue;
        result.push({
          id,
          title: summary?.displayTitle ?? id,
          updatedAt: summary?.updatedAt
        });
      }
      return result;
    }, [workspaces, sessions, workspace]);
    (0, import_react.useEffect)(() => {
      pruneDownloads(new Set(rows.map((row) => row.id)));
    }, [rows]);
    const downloads = (0, import_react.useSyncExternalStore)(
      (listener) => subscribeDownloads(listener),
      () => getDownloadsSnapshot()
    );
    const run = async (action, id) => {
      if (busyRef.current) return;
      busyRef.current = true;
      setError(null);
      setBusy({ id, action });
      try {
        await callHost(action, { sessionId: id });
        ctx.sessions.refresh?.().catch?.(() => {
        });
        ctx.workspaces.refresh?.().catch?.(() => {
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        busyRef.current = false;
        setBusy(null);
      }
    };
    const restore = (id) => {
      void run("restore", id);
    };
    const remove = (id, title) => {
      const confirmed = window.confirm(
        `\u786E\u5B9A\u8981\u6C38\u4E45\u5220\u9664\u4F1A\u8BDD\u300C${title}\u300D\u5417\uFF1F

\u8FD9\u662F\u786C\u5220\u9664\uFF1A\u4F1A\u8BDD\u7684\u6240\u6709\u6587\u4EF6\u90FD\u4F1A\u88AB\u5220\u9664\uFF0C\u65E0\u6CD5\u6062\u590D\u3002`
      );
      if (confirmed) void run("delete", id);
    };
    const deleteAll = () => {
      if (rows.length === 0) return;
      const confirmed = window.confirm(
        `\u786E\u5B9A\u8981\u4E00\u952E\u5220\u9664\u5168\u90E8 ${rows.length} \u4E2A\u5DF2\u5F52\u6863\u4F1A\u8BDD\u5417\uFF1F

\u8FD9\u662F\u786C\u5220\u9664\uFF1A\u6BCF\u4E2A\u4F1A\u8BDD\u7684\u6240\u6709\u6587\u4EF6\u90FD\u4F1A\u88AB\u5220\u9664\uFF0C\u65E0\u6CD5\u6062\u590D\u3002
\u8FD0\u884C\u4E2D\u7684\u4F1A\u8BDD\u4F1A\u88AB\u8DF3\u8FC7\u3002`
      );
      if (!confirmed) return;
      if (batchBusyRef.current) return;
      batchBusyRef.current = true;
      setError(null);
      setBatchBusy(true);
      void (async () => {
        try {
          const ids = rows.map((row) => row.id);
          const total = ids.length;
          let deleted = 0;
          let skipped = 0;
          let failed = 0;
          const skippedIds = [];
          const failures = [];
          for (let offset = 0; offset < ids.length; offset += DELETE_BATCH_SIZE) {
            const payload = await callHost("delete-all", { sessionIds: ids.slice(offset, offset + DELETE_BATCH_SIZE) });
            deleted += payload.deleted ?? 0;
            skipped += payload.skipped ?? 0;
            failed += payload.failed ?? 0;
            const chunkSkipped = payload.skippedIds;
            if (chunkSkipped !== void 0 && chunkSkipped.length > 0) skippedIds.push(...chunkSkipped);
            const chunkFailures = payload.failures;
            if (chunkFailures !== void 0 && chunkFailures.length > 0) failures.push(...chunkFailures);
          }
          let message;
          if (deleted === total) {
            message = `\u5DF2\u5220\u9664\u5168\u90E8 ${total} \u4E2A\u4F1A\u8BDD`;
          } else {
            const parts = [`\u5DF2\u5220\u9664 ${deleted} \u4E2A`];
            if (skipped > 0) {
              const skippedText = skippedIds.length > 0 ? `\uFF1A${formatSkippedIds(skippedIds, skipped)}` : "";
              parts.push(`\u8DF3\u8FC7\u8FD0\u884C\u4E2D ${skipped} \u4E2A${skippedText}`);
            }
            if (failed > 0) parts.push(`\u5931\u8D25 ${failed} \u4E2A`);
            message = parts.join("\uFF0C");
            if (skipped > 0) {
              message += "\u3002\u5F52\u6863\u4E0D\u4F1A\u7ED3\u675F\u4F1A\u8BDD\u2014\u2014\u4F1A\u8BDD\u4F1A\u4E00\u76F4\u5B58\u6D3B\u5230 dsh web \u91CD\u542F\u4E3A\u6B62\uFF1B\u91CD\u542F\u540E\u8FD9\u4E9B\u4F1A\u8BDD\u5373\u53EF\u5220\u9664";
            }
            if (failures.length > 0) {
              message += `\u3002\u5931\u8D25\u660E\u7EC6\uFF1A${failures.map((item) => `${item.sessionId}\uFF08${item.error}\uFF09`).join("\uFF1B")}`;
            }
          }
          setError(message);
          ctx.sessions.refresh?.().catch?.(() => {
          });
          ctx.workspaces.refresh?.().catch?.(() => {
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : String(err));
        } finally {
          batchBusyRef.current = false;
          setBatchBusy(false);
        }
      })();
    };
    const openSession = (id) => {
      try {
        ctx.sessions.open(id);
      } catch {
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.root, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.pageHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.title, children: "\u5DF2\u5F52\u6863\u4F1A\u8BDD" }),
        projectLabel !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.project, children: [
          "\xB7 ",
          projectLabel
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.count, children: rows.length })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.hint, children: "\u7BA1\u7406\u5F53\u524D\u9879\u76EE\u7684\u5DF2\u5F52\u6863\u4F1A\u8BDD\u3002\u6062\u590D\u4F1A\u628A\u5B83\u653E\u56DE\u4FA7\u8FB9\u680F\u5217\u8868\uFF1B\u5220\u9664\u4E3A\u786C\u5220\u9664\uFF08\u4E0D\u53EF\u6062\u590D\uFF09\uFF1B \u8FD0\u884C\u4E2D\u7684\u4F1A\u8BDD\u65E0\u6CD5\u5220\u9664\uFF0C\u9700\u91CD\u542F dsh web \u540E\u91CD\u8BD5\u3002" }),
      error !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: error }) : null,
      rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: "\u5F53\u524D\u9879\u76EE\u6CA1\u6709\u5DF2\u5F52\u6863\u7684\u4F1A\u8BDD" }) : null,
      rows.map((row) => {
        const rowBusy = busy !== null && busy.id === row.id;
        const anyBusy = busy !== null || batchBusy;
        const time = formatTime(row.updatedAt);
        const dlEntry = downloads?.bySession?.[row.id];
        const downloading = dlEntry?.status === "downloading";
        const dlError = dlEntry?.status === "error" ? dlEntry.error ?? "\u5BFC\u51FA\u5931\u8D25" : null;
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.row, className: "dsh-archive-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.rowMain, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: styles.rowTitle,
                title: `\u6253\u5F00\u4F1A\u8BDD ${row.title}`,
                onClick: () => {
                  openSession(row.id);
                },
                children: row.title
              }
            ),
            time !== "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.rowMeta, children: time }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              title: dlError ?? "\u4E0B\u8F7D\u4F1A\u8BDD\u65E5\u5FD7 (ZIP)",
              disabled: anyBusy || downloading,
              style: {
                ...styles.buttonBase,
                border: "1px solid var(--dsw-alias-border-l2)",
                color: "var(--dsw-alias-label-primary)",
                opacity: anyBusy || downloading ? 0.5 : 1
              },
              onClick: () => {
                void downloadSessionLog(row.id);
              },
              children: downloading ? "\u4E0B\u8F7D\u4E2D\u2026" : dlError !== null ? "\u91CD\u8BD5" : "\u4E0B\u8F7D"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              disabled: anyBusy,
              style: {
                ...styles.buttonBase,
                border: "1px solid var(--dsw-alias-border-l2)",
                color: "var(--dsw-alias-label-primary)",
                opacity: anyBusy && !rowBusy ? 0.5 : 1
              },
              onClick: () => {
                restore(row.id);
              },
              children: rowBusy && busy?.action === "restore" ? "\u6062\u590D\u4E2D\u2026" : "\u6062\u590D"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              disabled: anyBusy,
              style: {
                ...styles.buttonBase,
                border: "1px solid var(--dsw-alias-state-error-primary)",
                color: "var(--dsw-alias-state-error-primary)",
                opacity: anyBusy && !rowBusy ? 0.5 : 1
              },
              onClick: () => {
                remove(row.id, row.title);
              },
              children: rowBusy && busy?.action === "delete" ? "\u5220\u9664\u4E2D\u2026" : "\u5220\u9664"
            }
          )
        ] }, row.id);
      }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.batchRow, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: "dsh-archive-batch",
          style: {
            ...styles.batchDelete,
            opacity: batchBusy || busy !== null || rows.length === 0 ? 0.5 : 1
          },
          disabled: batchBusy || busy !== null || rows.length === 0,
          onClick: () => {
            deleteAll();
          },
          children: batchBusy ? "\u5220\u9664\u4E2D\u2026" : "\u4E00\u952E\u5220\u9664"
        }
      ) })
    ] });
  }
  ctx.slots.inject("settings.section", () => ctx.slots.register(
    {
      name: "settings.section",
      id: "dsh-archive",
      order: 30,
      label: () => "\u5F52\u6863"
    },
    ArchiveSection
  ));
}

return module.exports; } });
//# sourceMappingURL=client.js.map
