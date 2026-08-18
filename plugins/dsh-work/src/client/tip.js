/** dsh-work — TipButton：带几何自适应气泡的图标按钮。 */
import React from 'react'
const { useState, useRef, useLayoutEffect } = React
const h = React.createElement

		// ── TipButton: icon button with an instant custom tooltip ────────────
		// The bubble is position:fixed, so it escapes the panel's overflow
		// clipping — but fixed positioning knows nothing about viewport edges:
		// a bubble on a header icon (flush against the top of the window) would
		// be cut off above, and one on a right-edge icon would run off the
		// screen. Geometry is a pure function so it can be unit-tested without
		// a browser; the component measures the rendered bubble and applies it
		// in a layout effect (before paint, so there is no visual jump).
		export const TIP_EDGE = 12;
		export function fitTipGeometry(anchor, size, viewport) {
			// Slide horizontally back inside the viewport, keeping the bubble
			// centered on the anchor where possible.
			const half = size.width / 2;
			let x = anchor.left + anchor.width / 2;
			if (x + half > viewport.width - TIP_EDGE) x = viewport.width - TIP_EDGE - half;
			if (x - half < TIP_EDGE) x = TIP_EDGE + half;
			// Flip below only when the top is genuinely blocked; an anchor with
			// room above keeps the requested above placement instead of bouncing.
			const fitsAbove = anchor.top - 6 - size.height >= TIP_EDGE;
			const fitsBelow = anchor.bottom + 6 + size.height <= viewport.height - TIP_EDGE;
			const below = !fitsAbove && fitsBelow;
			return { x, y: below ? anchor.bottom + 6 : anchor.top - 6, below };
		}
		export function TipButton(props) {
			const [visible, setVisible] = useState(false);
			const [pos, setPos] = useState({ x: 0, y: 0, below: false });
			const anchor = useRef(null);
			const bubble = useRef(null);
			const show = (event) => {
				const rect = event.currentTarget.getBoundingClientRect();
				anchor.current = { left: rect.left, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
				setVisible(true);
			};
			const hide = () => setVisible(false);
			useLayoutEffect(() => {
				if (!visible || anchor.current === null) return;
				const el = bubble.current;
				if (el === null) return;
				const fit = () => setPos(fitTipGeometry(anchor.current, { width: el.offsetWidth, height: el.offsetHeight }, { width: window.innerWidth, height: window.innerHeight }));
				fit();
				window.addEventListener("resize", fit);
				return () => window.removeEventListener("resize", fit);
			}, [visible, props.tip]);
			return h(React.Fragment, null,
				h("button", {
					type: "button",
					className: props.className,
					"data-active": props.active || undefined,
					onClick: props.onClick,
					disabled: props.disabled,
					"aria-label": props.tip,
					onMouseEnter: show,
					onMouseLeave: hide,
					onFocus: show,
					onBlur: hide,
				}, props.children),
				visible
					? h("div", {
						ref: bubble,
						className: "dwb-tip" + (pos.below ? " dwb-tip-below" : ""),
						style: { left: pos.x, top: pos.y },
						role: "tooltip",
					}, props.tip)
					: null,
			);
		}
