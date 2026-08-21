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
var PEAK_HOURS = /* @__PURE__ */ new Set([9, 10, 11, 14, 15, 16, 17]);
var FOCUS_REFRESH_MIN_GAP_MS = 1e4;
var REFRESH_STALE_MS = 3e5;
var TICK_MS = 6e4;
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
function currencySymbol(currency) {
  if (currency === "CNY") return "\xA5";
  if (currency === "USD") return "$";
  return `${currency} `;
}
function formatMoney(currency, value) {
  if (!Number.isFinite(value)) value = 0;
  return `${currencySymbol(currency)}${value.toFixed(2)}`;
}
function beijingHour(date) {
  let hour = Number.NaN;
  try {
    hour = Number.parseInt(new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai"
    }).format(date), 10);
  } catch {
    hour = date.getHours();
  }
  if (Number.isNaN(hour)) return -1;
  return hour % 24;
}
var styles = {
  // footer 把动作排成一行水平 flex（flex-direction: row, nowrap）。宽栏条目
  // 是占满整行的 flex 项；条的高度与设置触发按钮一致（34px、12px 圆角），
  // 内部进度条留 5px 内边距。rail 窄栏保持 36px 方形，居中放一条小进度条。
  layer: {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    alignItems: "center"
  },
  layerRail: {
    flex: "none"
  },
  strip: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width: "100%",
    margin: "4px 0 4px",
    padding: "5px 8px",
    boxSizing: "border-box",
    borderRadius: "12px"
  },
  labelsRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    lineHeight: 1
  },
  label: {
    fontSize: "12px",
    fontWeight: 500,
    lineHeight: "15px",
    fontVariantNumeric: "tabular-nums",
    fontFamily: "var(--dsw-font-family, inherit)",
    whiteSpace: "nowrap"
  },
  bar: {
    display: "flex",
    height: "8px",
    borderRadius: "4px",
    overflow: "hidden"
  },
  segment: {
    height: "100%"
  },
  railBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    margin: "8px 0 10px"
  },
  railTrack: {
    display: "flex",
    width: "26px",
    height: "5px",
    borderRadius: "3px",
    overflow: "hidden"
  },
  railFill: {
    height: "100%"
  }
};
function BalanceFooterAction(props) {
  const wide = props.wide !== false;
  const [balance, setBalance] = (0, import_react.useState)(null);
  const [balanceError, setBalanceError] = (0, import_react.useState)(null);
  const [online, setOnline] = (0, import_react.useState)(null);
  const [onlineError, setOnlineError] = (0, import_react.useState)(null);
  const [, setTick] = (0, import_react.useState)(0);
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const lastFetchAt = (0, import_react.useRef)(0);
  const aliveRef = (0, import_react.useRef)(true);
  (0, import_react.useEffect)(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);
  const load = (0, import_react.useCallback)(async () => {
    try {
      const result = await fetchJson("/dsh-balance/balance");
      if (aliveRef.current) {
        setBalance(result);
        setBalanceError(null);
      }
    } catch (err) {
      if (!aliveRef.current) return;
      setBalance(null);
      setBalanceError(err instanceof Error ? err.message : String(err));
    }
    try {
      const result = await fetchJson("/dsh-balance/online");
      if (aliveRef.current) {
        setOnline(result);
        setOnlineError(null);
      }
    } catch (err) {
      if (!aliveRef.current) return;
      setOnline(null);
      setOnlineError(err instanceof Error ? err.message : String(err));
    }
    lastFetchAt.current = Date.now();
  }, []);
  (0, import_react.useEffect)(() => {
    void load();
    const onFocus = () => {
      if (Date.now() - lastFetchAt.current < FOCUS_REFRESH_MIN_GAP_MS) return;
      void load();
    };
    window.addEventListener("focus", onFocus);
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
      if (Date.now() - lastFetchAt.current >= REFRESH_STALE_MS) void load();
    }, TICK_MS);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(timer);
    };
  }, [load]);
  const peakNow = PEAK_HOURS.has(beijingHour(/* @__PURE__ */ new Date()));
  let tooltip;
  let trackColor = "color-mix(in srgb, var(--dsw-alias-label-tertiary) 25%, transparent)";
  let stripBackground = "color-mix(in srgb, var(--dsw-alias-label-tertiary) 10%, transparent)";
  let stripBorder = "1px solid color-mix(in srgb, var(--dsw-alias-label-tertiary) 18%, transparent)";
  let segments = [];
  let costValue = "\u2014";
  let costAria = "\u4ECA\u65E5\u6D88\u8D39 \u2014";
  let costColor = "var(--dsw-alias-label-tertiary)";
  let balanceValue = "\u2014";
  let balanceAria = "\u4F59\u989D \u2014";
  let balanceColor = "var(--dsw-alias-label-primary)";
  const PEAK_COLOR = "var(--dsw-alias-state-warn-primary)";
  const OFF_PEAK_COLOR = "var(--dsw-alias-state-success-primary)";
  const periodHue = peakNow ? PEAK_COLOR : OFF_PEAK_COLOR;
  const costHueText = `color-mix(in srgb, ${periodHue} 55%, var(--dsw-alias-label-primary))`;
  if (balanceError !== null) {
    trackColor = "color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)";
    stripBackground = "color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)";
    stripBorder = "1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)";
    tooltip = `\u65E0\u6CD5\u83B7\u53D6\u4F59\u989D\uFF1A${balanceError}`;
  } else if (balance !== null && balance.ok === false) {
    trackColor = "color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)";
    stripBackground = "color-mix(in srgb, var(--dsw-alias-state-error-primary) 8%, transparent)";
    stripBorder = "1px solid color-mix(in srgb, var(--dsw-alias-state-error-primary) 25%, transparent)";
    tooltip = balance.message;
  } else if (balance !== null && balance.ok === true) {
    if (balance.balances.length === 0) {
      tooltip = "\u63A5\u53E3\u672A\u8FD4\u56DE\u4F59\u989D\u4FE1\u606F";
    } else {
      const primary = balance.balances.find((entry) => entry.currency === "CNY") ?? balance.balances[0];
      const symbol = currencySymbol(primary.currency);
      const total = Number.parseFloat(primary.total);
      balanceValue = `${symbol}${primary.total}`;
      balanceAria = `\u4F59\u989D ${balanceValue}`;
      balanceColor = "var(--dsw-alias-label-primary)";
      let todayCost = null;
      if (onlineError !== null) {
        tooltip = `\u4ECA\u65E5\u6D88\u8D39 \u83B7\u53D6\u5931\u8D25\uFF1A${onlineError}`;
      } else if (online !== null && online.ok === false) {
        tooltip = `\u4ECA\u65E5\u6D88\u8D39 \u4E0D\u53EF\u7528\uFF1A${online.message}`;
      } else if (online !== null && online.ok === true) {
        todayCost = online.todayCost;
        costValue = formatMoney(primary.currency, todayCost);
        costAria = `\u4ECA\u65E5\u6D88\u8D39 ${costValue}`;
        costColor = costHueText;
      } else {
        tooltip = "\u6B63\u5728\u83B7\u53D6\u4ECA\u65E5\u6D88\u8D39\u2026";
      }
      if (todayCost !== null && todayCost > 0) {
        const consumedPct = Number.isFinite(total) && total > 0 ? Math.max(0, Math.min(1, todayCost / total)) : 0;
        if (consumedPct > 0) {
          segments = [{ pct: consumedPct, color: periodHue }];
        }
      }
    }
  }
  const renderFill = (base) => {
    const out = [];
    for (const segment of segments) {
      out.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            style: {
              ...base,
              width: `${Math.round(segment.pct * 1e3) / 10}%`,
              background: segment.color
            }
          },
          segment.color
        )
      );
    }
    return out;
  };
  if (!wide) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.layer, ...styles.layerRail }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.railBox, title: tooltip, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.railTrack, background: trackColor }, children: renderFill(styles.railFill) }) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.layer, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: { ...styles.strip, background: stripBackground, border: stripBorder },
      title: tooltip,
      onMouseEnter: () => {
        setHovered(true);
      },
      onMouseLeave: () => {
        setHovered(false);
      },
      onFocus: () => {
        setHovered(true);
      },
      onBlur: () => {
        setHovered(false);
      },
      tabIndex: 0,
      children: [
        hovered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.labelsRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { ...styles.label, color: costColor }, "aria-label": costAria, children: [
            "\u4ECA\u65E5\u6D88\u8D39 ",
            costValue
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { style: { ...styles.label, color: balanceColor }, "aria-label": balanceAria, children: [
            "\u4F59\u989D ",
            balanceValue
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...styles.bar, background: trackColor }, children: renderFill(styles.segment) })
      ]
    }
  ) });
}
function apply(ctx) {
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register(
    {
      name: "sidebar.footer.action",
      id: "dsh-balance",
      order: 10,
      label: () => "DeepSeek \u8D26\u6237"
    },
    BalanceFooterAction
  ));
}

return module.exports; } });
//# sourceMappingURL=client.js.map
