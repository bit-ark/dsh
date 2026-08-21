/**
 * dsh-work — FeatureGrid：功能网格首页。
 *
 * 九宫格排列所有可用功能，点击打开为标签页。
 * 无激活标签时默认显示此页面（类似浏览器新标签页）。
 */
import React from 'react'
import { FEATURES } from './features.js'
const h = React.createElement

/** 功能网格首页：无激活标签时展示全部可用功能卡片。 */
export function FeatureGrid(props) {
  const { onSelect } = props
  return h("div", { className: "dwb-feature-grid" },
    h("div", { className: "dwb-feature-grid-inner" },
      FEATURES.map((feature) => {
        const disabled = feature.disabled === true
        return h("button", {
          key: feature.id,
          type: "button",
          className: "dwb-feature-card" + (disabled ? " dwb-feature-disabled" : ""),
          disabled,
          title: feature.description,
          onClick: () => { if (!disabled && onSelect !== undefined) onSelect(feature.id) },
        },
          h("span", { className: "dwb-feature-card-icon" }, feature.icon()),
          h("span", { className: "dwb-feature-card-label" }, feature.label),
        )
      }),
    ),
  )
}
