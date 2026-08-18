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
function ArchiveIcon({ size }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 16 16",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "1.5", y: "2", width: "13", height: "3.5", rx: "1" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 5.5v7a1.5 1.5 0 0 0 1.5 1.5h8a1.5 1.5 0 0 0 1.5-1.5v-7" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 8.5h4" })
      ]
    }
  );
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
      .dsh-archive-badge {
        background: transparent;
      }
      .dsh-archive-badge:hover,
      .dsh-archive-badge[data-active] {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dsh-archive-close:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
      .dsh-archive-batch:hover:not(:disabled) {
        background: color-mix(in srgb, var(--dsw-alias-state-error-primary) 12%, transparent);
      }
    `;
    document.head.appendChild(styleEl);
  }
  const styles = {
    // 侧边栏 footer 把动作排成一行水平 flex（flex-direction: row, nowrap）。
    // 条目是占满整行的 flex 项（可收缩，未来有兄弟动作时共享空间而非被挤出），
    // 徽标几何与设置触发按钮一致——同为 34px 高、12px 圆角、14px/22px 字体，
    // hover 高亮向外溢出 4px。rail 窄栏保持 36px 圆形。
    layer: {
      position: "relative",
      flex: "1 1 auto",
      minWidth: 0,
      display: "flex",
      alignItems: "center"
    },
    layerRail: {
      flex: "none"
    },
    badge: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "calc(100% + 8px)",
      height: "34px",
      margin: "4px -4px 4px",
      padding: "6px 10px",
      boxSizing: "border-box",
      border: "none",
      borderRadius: "12px",
      color: "var(--dsw-alias-label-primary)",
      fontFamily: "inherit",
      fontSize: "14px",
      lineHeight: "22px",
      cursor: "pointer",
      overflow: "hidden",
      whiteSpace: "nowrap"
    },
    badgeRail: {
      justifyContent: "center",
      gap: "0",
      width: "36px",
      height: "36px",
      margin: "8px 0 10px",
      padding: "0",
      borderRadius: "50%"
    },
    badgeLabel: {
      flex: "none",
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    },
    badgeCount: {
      flex: "none",
      marginLeft: "auto",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "12px",
      lineHeight: "16px",
      fontVariantNumeric: "tabular-nums"
    },
    panel: {
      position: "fixed",
      left: "12px",
      bottom: "128px",
      zIndex: 30,
      display: "flex",
      flexDirection: "column",
      width: "420px",
      maxWidth: "calc(100vw - 24px)",
      maxHeight: "60vh",
      overflow: "hidden",
      border: "1px solid var(--dsw-alias-border-l1)",
      borderRadius: "12px",
      background: "var(--dsw-alias-bg-base)",
      boxShadow: "var(--dsw-shadow-lv2)"
    },
    panelHeader: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      minHeight: "44px",
      padding: "0 12px",
      boxSizing: "border-box",
      borderBottom: "1px solid var(--dsw-alias-border-l2)"
    },
    panelTitle: {
      fontSize: "13px",
      fontWeight: 500,
      lineHeight: "20px",
      color: "var(--dsw-alias-label-primary)"
    },
    panelProject: {
      minWidth: 0,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      fontSize: "12px",
      color: "var(--dsw-alias-label-tertiary)"
    },
    close: {
      flex: "none",
      marginLeft: "auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "24px",
      height: "24px",
      padding: 0,
      border: "none",
      borderRadius: "6px",
      background: "transparent",
      color: "var(--dsw-alias-label-tertiary)",
      fontSize: "14px",
      cursor: "pointer"
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
    },
    panelFooter: {
      flex: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "8px",
      minHeight: "44px",
      padding: "0 12px",
      boxSizing: "border-box",
      borderTop: "1px solid var(--dsw-alias-border-l2)"
    },
    panelBody: {
      flex: 1,
      minHeight: 0,
      overflowY: "auto",
      padding: "8px 12px 12px"
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
    }
  };
  function ArchiveFooterAction(props) {
    const wide = props.wide !== false;
    const workspaces = (0, import_react.useSyncExternalStore)(
      ctx.workspaces.list.subscribe,
      () => ctx.workspaces.list.getSnapshot()
    );
    const sessions = (0, import_react.useSyncExternalStore)(
      ctx.sessions.list.subscribe,
      () => ctx.sessions.list.getSnapshot()
    );
    const [open, setOpen] = (0, import_react.useState)(false);
    const [busy, setBusy] = (0, import_react.useState)(null);
    const [batchBusy, setBatchBusy] = (0, import_react.useState)(false);
    const [error, setError] = (0, import_react.useState)(null);
    const panelRef = (0, import_react.useRef)(null);
    const triggerRef = (0, import_react.useRef)(null);
    const busyRef = (0, import_react.useRef)(false);
    const batchBusyRef = (0, import_react.useRef)(false);
    const closePanel = () => {
      setError(null);
      setOpen(false);
    };
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
    (0, import_react.useEffect)(() => {
      if (!open) return;
      const onKey = (event) => {
        if (event.key === "Escape") {
          setError(null);
          setOpen(false);
        }
      };
      const onPointerDown = (event) => {
        const target = event.target;
        if (target === null) return;
        if (panelRef.current?.contains(target) === true) return;
        if (triggerRef.current?.contains(target) === true) return;
        setError(null);
        setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      document.addEventListener("mousedown", onPointerDown);
      return () => {
        document.removeEventListener("keydown", onKey);
        document.removeEventListener("mousedown", onPointerDown);
      };
    }, [open]);
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
          const failures = [];
          for (let offset = 0; offset < ids.length; offset += DELETE_BATCH_SIZE) {
            const payload = await callHost("delete-all", { sessionIds: ids.slice(offset, offset + DELETE_BATCH_SIZE) });
            deleted += payload.deleted ?? 0;
            skipped += payload.skipped ?? 0;
            failed += payload.failed ?? 0;
            const chunkFailures = payload.failures;
            if (chunkFailures !== void 0 && chunkFailures.length > 0) failures.push(...chunkFailures);
          }
          if (failed > 0) {
            const parts = [`\u5DF2\u5220\u9664 ${deleted} \u4E2A`, `\u5931\u8D25 ${failed} \u4E2A`];
            if (skipped > 0) parts.push(`\u8DF3\u8FC7\u8FD0\u884C\u4E2D ${skipped} \u4E2A`);
            let message = parts.join("\uFF0C");
            if (failures.length > 0) {
              message += `\uFF1A${failures.map((item) => `${item.sessionId}\uFF08${item.error}\uFF09`).join("\uFF1B")}`;
            }
            setError(message);
          }
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
        closePanel();
      } catch {
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: wide ? styles.layer : { ...styles.layer, ...styles.layerRail }, children: [
      open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "section",
        {
          ref: panelRef,
          style: styles.panel,
          "aria-label": "\u5DF2\u5F52\u6863\u4F1A\u8BDD",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { style: styles.panelHeader, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.panelTitle, children: "\u5DF2\u5F52\u6863\u4F1A\u8BDD" }),
              projectLabel !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.panelProject, children: [
                "\xB7 ",
                projectLabel
              ] }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "dsh-archive-close",
                  style: styles.close,
                  "aria-label": "\u5173\u95ED",
                  onClick: () => {
                    closePanel();
                  },
                  children: "\u2715"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.panelBody, children: [
              error !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: error }) : null,
              rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.empty, children: "\u5F53\u524D\u9879\u76EE\u6CA1\u6709\u5DF2\u5F52\u6863\u7684\u4F1A\u8BDD" }) : null,
              rows.map((row) => {
                const rowBusy = busy !== null && busy.id === row.id;
                const anyBusy = busy !== null || batchBusy;
                const time = formatTime(row.updatedAt);
                const dlEntry = downloads?.bySession?.[row.id];
                const downloading = dlEntry?.status === "downloading";
                const dlError = dlEntry?.status === "error" ? dlEntry.error ?? "\u5BFC\u51FA\u5931\u8D25" : null;
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.row, children: [
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
              })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { style: styles.panelFooter, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          ref: triggerRef,
          type: "button",
          className: "dsh-archive-badge",
          style: wide ? styles.badge : { ...styles.badge, ...styles.badgeRail },
          "data-active": open || void 0,
          "aria-label": `\u5DF2\u5F52\u6863\u4F1A\u8BDD\uFF08${String(rows.length)}\uFF09`,
          "aria-expanded": open,
          title: wide ? void 0 : `\u5DF2\u5F52\u6863\u4F1A\u8BDD\uFF08${String(rows.length)}\uFF09`,
          onClick: () => {
            if (open) closePanel();
            else setOpen(true);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveIcon, { size: wide ? 16 : 18 }),
            wide && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badgeLabel, children: "\u5F52\u6863" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badgeCount, children: rows.length })
            ] })
          ]
        }
      )
    ] });
  }
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register(
    {
      name: "sidebar.footer.action",
      id: "archive-panel"
    },
    ArchiveFooterAction
  ));
}

return module.exports; } });
//# sourceMappingURL=client.js.map
