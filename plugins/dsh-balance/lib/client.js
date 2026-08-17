window.__ModuleLoader__.load({ id: "dsh-balance", factory: (require) => {
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
var inject = ["slots"];
var CHART_HEIGHT = 150;
var TOP_UP_URL = "https://platform.deepseek.com/top_up";
var FOCUS_REFRESH_MIN_GAP_MS = 1e4;
var SEGMENTS = [
  { field: "uncachedInput", label: "\u672A\u7F13\u5B58\u8F93\u5165", color: "var(--dsw-alias-brand-primary)" },
  { field: "cacheRead", label: "\u7F13\u5B58\u8BFB", color: "var(--dsw-alias-state-warn-primary)" },
  { field: "cacheWrite", label: "\u7F13\u5B58\u5199", color: "var(--dsw-alias-label-tertiary)" },
  { field: "output", label: "\u8F93\u51FA", color: "var(--dsw-alias-state-success-primary)" }
];
async function fetchJson(path) {
  let response;
  try {
    response = await fetch(path, { headers: { accept: "application/json" } });
  } catch (error) {
    throw new Error(`\u7F51\u7EDC\u9519\u8BEF\uFF1A${error instanceof Error ? error.message : String(error)}`);
  }
  let payload;
  try {
    payload = await response.json();
  } catch {
    payload = void 0;
  }
  if (!response.ok || payload === void 0) {
    throw new Error(`\u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${String(response.status)}\uFF09`);
  }
  return payload;
}
function formatTokens(value) {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-US");
}
function formatTime(iso) {
  const ms = Date.parse(iso);
  if (Number.isNaN(ms)) return "";
  try {
    return new Date(ms).toLocaleString();
  } catch {
    return "";
  }
}
function currencySymbol(currency) {
  if (currency === "CNY") return "\xA5";
  if (currency === "USD") return "$";
  return `${currency} `;
}
function formatCost(value, currency) {
  if (value === null || value === void 0) return "\u2014";
  return `${currencySymbol(currency)}${Number.isFinite(value) ? value.toFixed(2) : "0.00"}`;
}
var styles = {
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
  hint: {
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    marginBottom: "12px"
  },
  card: {
    padding: "12px 14px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid var(--dsw-alias-border-l2)",
    background: "var(--dsw-alias-bg-layer-1)"
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    marginBottom: "10px"
  },
  cardTitle: {
    fontWeight: 600,
    fontSize: "var(--dsw-font-xs-13, 13px)"
  },
  cardTag: {
    color: "var(--dsw-alias-label-tertiary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    fontWeight: 400,
    marginLeft: "6px"
  },
  button: {
    flex: "none",
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    cursor: "pointer",
    background: "transparent",
    border: "1px solid var(--dsw-alias-border-l2)",
    color: "var(--dsw-alias-label-primary)"
  },
  topupButton: {
    flex: "none",
    padding: "3px 10px",
    borderRadius: "6px",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    cursor: "pointer",
    background: "transparent",
    border: "1px solid var(--dsw-alias-brand-primary)",
    color: "var(--dsw-alias-brand-primary)"
  },
  buttonRow: {
    display: "flex",
    gap: "6px"
  },
  error: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid var(--dsw-alias-state-error-primary)",
    color: "var(--dsw-alias-state-error-primary)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all"
  },
  notice: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid var(--dsw-alias-border-l2)",
    color: "var(--dsw-alias-label-secondary)",
    whiteSpace: "pre-wrap"
  },
  loading: {
    color: "var(--dsw-alias-label-tertiary)",
    padding: "6px 0"
  },
  bigFigure: {
    fontSize: "22px",
    fontWeight: 650,
    lineHeight: 1.2
  },
  subFigure: {
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    marginTop: "2px"
  },
  badge: (ok) => ({
    display: "inline-block",
    marginTop: "8px",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    color: ok ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-warn-primary)",
    border: `1px solid ${ok ? "var(--dsw-alias-state-success-primary)" : "var(--dsw-alias-state-warn-primary)"}`
  }),
  tiny: {
    color: "var(--dsw-alias-label-tertiary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    marginTop: "8px"
  },
  legend: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "10px",
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)"
  },
  legendSwatch: (color) => ({
    display: "inline-block",
    width: "10px",
    height: "10px",
    borderRadius: "2px",
    background: color,
    marginRight: "4px"
  }),
  dayLabel: {
    textAlign: "center",
    color: "var(--dsw-alias-label-tertiary)",
    fontSize: "10px",
    marginTop: "4px",
    whiteSpace: "nowrap",
    overflow: "hidden"
  },
  totalsRow: {
    marginTop: "10px",
    color: "var(--dsw-alias-label-secondary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    lineHeight: 1.6
  },
  sessionRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 0",
    borderBottom: "1px solid var(--dsw-alias-border-l1)"
  },
  sessionName: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  sessionId: {
    color: "var(--dsw-alias-label-tertiary)",
    fontSize: "var(--dsw-font-xxs-12, 12px)"
  },
  modelRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "2px 0",
    fontSize: "var(--dsw-font-xxs-12, 12px)",
    color: "var(--dsw-alias-label-secondary)"
  },
  modelName: {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  empty: {
    padding: "16px 0",
    textAlign: "center",
    color: "var(--dsw-alias-label-tertiary)"
  }
};
function UsageChart({ days, currency }) {
  const max = Math.max(...days.map((day) => day.total), 1);
  const labelEvery = days.length > 16 ? 3 : days.length > 9 ? 2 : 1;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", gap: "4px", alignItems: "stretch" }, children: days.map((day, index) => {
      const barPx = day.total > 0 ? Math.max(3, day.total / max * CHART_HEIGHT) : 0;
      const segmentPx = (value) => day.total > 0 && value > 0 ? value / day.total * barPx : 0;
      const tooltip = `${day.date}
\u672A\u7F13\u5B58\u8F93\u5165 ${formatTokens(day.uncachedInput)} \xB7 \u7F13\u5B58\u8BFB ${formatTokens(day.cacheRead)} \xB7 \u7F13\u5B58\u5199 ${formatTokens(day.cacheWrite)} \xB7 \u8F93\u51FA ${formatTokens(day.output)}
\u5171 ${formatTokens(day.total)} tokens \xB7 ${String(day.requests)} \u6B21\u8BF7\u6C42
\u4F30\u7B97\u8D39\u7528 ${formatCost(day.cost > 0 ? day.cost : null, currency)}`;
      const showLabel = index % labelEvery === 0 || index === days.length - 1;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            title: tooltip,
            style: {
              height: `${String(CHART_HEIGHT)}px`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              borderBottom: "1px solid var(--dsw-alias-border-l1)"
            },
            children: barPx > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { borderRadius: "3px 3px 0 0", overflow: "hidden", display: "flex", flexDirection: "column" }, children: SEGMENTS.map((segment) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                style: { height: `${String(segmentPx(day[segment.field]))}px`, background: segment.color }
              },
              segment.field
            )) }) : null
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.dayLabel, visibility: showLabel ? "visible" : "hidden" }, children: day.label })
      ] }, day.date);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.legend, children: SEGMENTS.map((segment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.legendSwatch(segment.color) }),
      segment.label
    ] }, segment.field)) })
  ] });
}
function BalanceSection(_props) {
  const [balance, setBalance] = (0, import_react.useState)(null);
  const [balanceError, setBalanceError] = (0, import_react.useState)(null);
  const [balanceLoading, setBalanceLoading] = (0, import_react.useState)(true);
  const [usage, setUsage] = (0, import_react.useState)(null);
  const [usageError, setUsageError] = (0, import_react.useState)(null);
  const [usageLoading, setUsageLoading] = (0, import_react.useState)(true);
  const lastBalanceFetchAt = (0, import_react.useRef)(0);
  const aliveRef = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);
  const loadBalance = (0, import_react.useCallback)(async () => {
    setBalanceLoading(true);
    setBalanceError(null);
    try {
      const payload = await fetchJson("/dsh-balance/balance");
      if (aliveRef.current) setBalance(payload);
    } catch (error) {
      if (!aliveRef.current) return;
      setBalance(null);
      setBalanceError(error instanceof Error ? error.message : String(error));
    } finally {
      lastBalanceFetchAt.current = Date.now();
      if (aliveRef.current) setBalanceLoading(false);
    }
  }, []);
  const openTopUp = (0, import_react.useCallback)(() => {
    window.open(TOP_UP_URL, "_blank", "noopener");
  }, []);
  (0, import_react.useEffect)(() => {
    const onFocus = () => {
      if (Date.now() - lastBalanceFetchAt.current < FOCUS_REFRESH_MIN_GAP_MS) return;
      void loadBalance();
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [loadBalance]);
  const loadUsage = (0, import_react.useCallback)(async (refresh) => {
    setUsageLoading(true);
    setUsageError(null);
    try {
      const path = refresh ? "/dsh-balance/usage?refresh=1" : "/dsh-balance/usage";
      const payload = await fetchJson(path);
      if (aliveRef.current) setUsage(payload);
    } catch (error) {
      if (!aliveRef.current) return;
      setUsage(null);
      setUsageError(error instanceof Error ? error.message : String(error));
    } finally {
      if (aliveRef.current) setUsageLoading(false);
    }
  }, []);
  (0, import_react.useEffect)(() => {
    void loadBalance();
    void loadUsage(false);
  }, [loadBalance, loadUsage]);
  const children = [];
  children.push(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.pageHeader, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.title, children: "DeepSeek \u8D26\u6237" }) }, "page-header"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.hint, children: "\u4F59\u989D\u6765\u81EA DeepSeek \u5B98\u65B9\u63A5\u53E3\uFF1B\u6D88\u8017\u7EDF\u8BA1\u81EA\u672C\u673A\u6301\u4E45\u5316\u4F1A\u8BDD\u65E5\u5FD7\uFF08provider \u4E0A\u62A5\u7684\u5B9E\u9645 token \u7528\u91CF\uFF09\u3002\u5145\u503C\u76F4\u8FBE\u5B98\u65B9\u626B\u7801\u9875\uFF0C\u8FD4\u56DE\u672C\u9875\u540E\u4F59\u989D\u81EA\u52A8\u5237\u65B0\u3002" }, "page-hint")
  );
  const balanceBody = [];
  if (balanceLoading) {
    balanceBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.loading, children: "\u6B63\u5728\u83B7\u53D6\u4F59\u989D\u2026" }, "b-loading"));
  } else if (balanceError !== null) {
    balanceBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: balanceError }, "b-error"));
  } else if (balance !== null && balance.ok === false) {
    if (balance.code === "missing-key") {
      balanceBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.notice, children: balance.message }, "b-missing"));
    } else {
      balanceBody.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: balance.message }, "b-fail"),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: { ...styles.button, marginTop: "8px" }, onClick: () => void loadBalance(), children: "\u91CD\u8BD5" }, "b-retry")
      );
    }
  } else if (balance !== null && balance.ok === true) {
    if (balance.balances.length === 0) {
      balanceBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.loading, children: "\u63A5\u53E3\u672A\u8FD4\u56DE\u4F59\u989D\u4FE1\u606F" }, "b-empty"));
    }
    for (const entry of balance.balances) {
      balanceBody.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.bigFigure, children: [
            currencySymbol(entry.currency),
            entry.total
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.subFigure, children: [
            "\u8D60\u9001 ",
            currencySymbol(entry.currency),
            entry.granted,
            " \xB7 ",
            "\u5145\u503C ",
            currencySymbol(entry.currency),
            entry.toppedUp
          ] })
        ] }, `b-${entry.currency}`)
      );
    }
    balanceBody.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge(balance.available), children: balance.available ? "\u53EF\u7528\u4E8E API \u8C03\u7528" : "\u4F59\u989D\u4E0D\u8DB3\uFF0CAPI \u8C03\u7528\u53EF\u80FD\u5931\u8D25" }) }, "b-badge"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.tiny, children: [
        "\u83B7\u53D6\u4E8E ",
        formatTime(balance.fetchedAt)
      ] }, "b-time")
    );
  }
  children.push(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.cardHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.cardTitle, children: "\u8D26\u6237\u4F59\u989D" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.buttonRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "button",
            {
              type: "button",
              style: styles.topupButton,
              title: "\u5728\u65B0\u6807\u7B7E\u9875\u6253\u5F00 DeepSeek \u5B98\u65B9\u5145\u503C\u9875\uFF08\u626B\u7801\u652F\u4ED8\uFF09",
              onClick: openTopUp,
              children: "\u5145\u503C"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: styles.button, disabled: balanceLoading, onClick: () => void loadBalance(), children: balanceLoading ? "\u83B7\u53D6\u4E2D\u2026" : "\u5237\u65B0" })
        ] })
      ] }),
      balanceBody
    ] }, "balance-card")
  );
  const usageBody = [];
  if (usageLoading) {
    usageBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.loading, children: "\u6B63\u5728\u7EDF\u8BA1\u4F1A\u8BDD\u65E5\u5FD7\u2026" }, "u-loading"));
  } else if (usageError !== null) {
    usageBody.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: usageError }, "u-error"),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: { ...styles.button, marginTop: "8px" }, onClick: () => void loadUsage(false), children: "\u91CD\u8BD5" }, "u-retry")
    );
  } else if (usage !== null && usage.ok === false) {
    usageBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.error, children: usage.message }, "u-fail"));
  } else if (usage !== null && usage.ok === true) {
    const windowEmpty = usage.totals.total === 0;
    if (windowEmpty) {
      usageBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.empty, children: [
        "\u6700\u8FD1 ",
        String(usage.windowDays),
        " \u5929\u6CA1\u6709\u6D88\u8017\u8BB0\u5F55"
      ] }, "u-empty"));
    } else {
      usageBody.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsageChart, { days: usage.days, currency: usage.costCurrency }, "u-chart"));
      usageBody.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.totalsRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            "\u8FD1 ",
            String(usage.windowDays),
            " \u5929\u5408\u8BA1\uFF1A",
            formatTokens(usage.totals.total),
            " tokens \xB7 ",
            String(usage.days.reduce((sum, day) => sum + day.requests, 0)),
            " \u6B21\u8BF7\u6C42 \xB7 \u4F30\u7B97\u8D39\u7528 ",
            formatCost(usage.totals.cost, usage.costCurrency)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            "\u672A\u7F13\u5B58\u8F93\u5165 ",
            formatTokens(usage.totals.uncachedInput),
            " \xB7 \u7F13\u5B58\u8BFB ",
            formatTokens(usage.totals.cacheRead),
            " \xB7 ",
            "\u7F13\u5B58\u5199 ",
            formatTokens(usage.totals.cacheWrite),
            " \xB7 \u8F93\u51FA ",
            formatTokens(usage.totals.output)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            "\u5386\u53F2\u603B\u8BA1\uFF1A",
            formatTokens(usage.allTimeTotal),
            " tokens \xB7 ",
            String(usage.allTimeRequests),
            " \u6B21\u8BF7\u6C42 \xB7 \u4F30\u7B97\u8D39\u7528 ",
            formatCost(usage.allTimeCost, usage.costCurrency),
            "\uFF08\u626B\u63CF ",
            String(usage.sessionsScanned),
            " \u4E2A\u4F1A\u8BDD",
            usage.skipped > 0 ? `\uFF0C\u8DF3\u8FC7 ${String(usage.skipped)} \u4E2A` : "",
            "\uFF09"
          ] })
        ] }, "u-totals")
      );
    }
  }
  children.push(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.cardHeader, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.cardTitle, children: [
          "Token \u6D88\u8017",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.cardTag, children: [
            usage !== null && usage.ok === true ? `\u8FD1 ${String(usage.windowDays)} \u5929` : "\u6309\u5929",
            usage !== null && usage.ok === true && usage.cached ? " \xB7 \u7F13\u5B58" : ""
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", style: styles.button, disabled: usageLoading, onClick: () => void loadUsage(true), children: usageLoading ? "\u7EDF\u8BA1\u4E2D\u2026" : "\u91CD\u65B0\u7EDF\u8BA1" })
      ] }),
      usageBody
    ] }, "usage-card")
  );
  if (!usageLoading && usage !== null && usage.ok === true && (usage.topKeys?.length ?? 0) > 0) {
    const rows = [];
    for (const key of usage.topKeys) {
      const providers = key.providerIds.length > 0 ? key.providerIds.join(" / ") : "(\u672A\u77E5 provider)";
      const modelLines = (key.models ?? []).map((model) => `${model.model} ${formatTokens(model.total)}\uFF08${String(model.requests)} \u6B21\uFF09\xB7 ${formatCost(model.cost, usage.costCurrency)}`).join("\n");
      const tooltip = `provider\uFF1A${providers}
${String(key.requests)} \u6B21\u8BF7\u6C42 \xB7 \u4F30\u7B97\u8D39\u7528 ${formatCost(key.cost, usage.costCurrency)}

\u6A21\u578B\u6D88\u8017\uFF1A
${modelLines}`;
      const modelRows = (key.models ?? []).map((model) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.modelRow, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.modelName, title: `${String(model.requests)} \u6B21\u8BF7\u6C42`, children: model.model }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatCost(model.cost, usage.costCurrency) })
      ] }, model.model));
      rows.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { ...styles.sessionRow, flexDirection: "column", alignItems: "stretch", gap: "2px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.sessionName, title: tooltip, children: key.keyName }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.sessionId, children: providers }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { title: `${String(key.requests)} \u6B21\u8BF7\u6C42 \xB7 \u4F30\u7B97\u8D39\u7528 ${formatCost(key.cost, usage.costCurrency)}`, children: formatTokens(key.total) })
          ] }),
          modelRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { paddingLeft: "10px", marginLeft: "2px", borderLeft: "2px solid var(--dsw-alias-border-l1)" }, children: modelRows }) : null
        ] }, key.keyName)
      );
    }
    children.push(
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.cardHeader, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.cardTitle, children: [
          "\u6D88\u8017\u6700\u591A\u7684 API Key",
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: styles.cardTag, children: [
            "\u5386\u53F2\u603B\u8BA1 Top ",
            String(usage.topKeys.length)
          ] })
        ] }) }),
        rows
      ] }, "top-card")
    );
  }
  children.push(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.tiny, children: "\u6CE8\uFF1A\u7EDF\u8BA1\u53EA\u542B\u5DF2\u843D\u76D8\u7684\u4F1A\u8BDD\u65E5\u5FD7\uFF0C\u8FDB\u884C\u4E2D\u7684\u4F1A\u8BDD\u672A\u843D\u76D8\u4E8B\u4EF6\u6682\u4E0D\u8BA1\u5165\uFF1Bfork / \u5B50\u4EE3\u7406\u4F1A\u8BDD\u5DF2\u53BB\u9664\u7EE7\u627F\u7684\u7236\u4F1A\u8BDD\u90E8\u5206\u3002\u6D88\u8017\u6309\u8BF7\u6C42\u7684 provider \u8DEF\u7531\u5F52\u5C5E\u5230\u5BF9\u5E94 API key\uFF08\u51ED\u636E\u5F15\u7528\u540D\uFF09\uFF0C\u540C\u540D key \u7684\u591A\u4E2A provider \u4F1A\u5408\u5E76\u3002\u8D39\u7528\u4E3A\u4F30\u7B97\uFF1A\u6309 DeepSeek V4 \u5CF0\u8C37\u4EF7\uFF08\u7A7A\u95F2\u4E3A\u57FA\u51C6\u3001\u9AD8\u5CF0 09:00\u201314:00 \u5317\u4EAC \xD72\uFF0C2026-08-17 \u751F\u6548\uFF09\u6298\u7B97\uFF1B\u5386\u53F2\u6D88\u8017\u6309\u73B0\u4EF7\u8FD1\u4F3C\uFF1B\u672A\u914D\u7F6E\u4EF7\u683C\u7684\u6A21\u578B\uFF08\u5982 qwen3.8-max\uFF09\u4E0D\u8BA1\u8D39\uFF08\u663E\u793A \u2014\uFF09\uFF0C\u53EF\u5728\u63D2\u4EF6\u884C\u914D\u7F6E pricesPerM \u8865\u5145\u3002" }, "footnote")
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.root, children });
}
function apply(ctx) {
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "dsh-balance",
    order: 30,
    label: () => "DeepSeek \u8D26\u6237"
  }, BalanceSection));
}

return module.exports; } });
//# sourceMappingURL=client.js.map
