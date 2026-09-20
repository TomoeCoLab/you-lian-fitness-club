import { useEffect, useRef, useState, type PointerEvent } from "react";

export function usePlanDrag(onMove: (from: number, to: number) => void) {
  const [drag, setDrag] = useState<{ from: number; to: number } | null>(null);
  const state = useRef<{ from: number; to: number; y: number; startY: number; active: boolean; element: HTMLElement; timer: number; frame: number } | null>(null);
  const finish = (commit: boolean) => {
    const current = state.current;
    if (!current) return;
    clearTimeout(current.timer); cancelAnimationFrame(current.frame);
    state.current = null; setDrag(null);
    if (commit && current.active && current.from !== current.to) onMove(current.from, current.to);
  };
  useEffect(() => () => { if (state.current) { clearTimeout(state.current.timer); cancelAnimationFrame(state.current.frame); } }, []);
  const start = (event: PointerEvent<HTMLButtonElement>, from: number) => {
    if (event.button !== 0) return;
    const element = event.currentTarget;
    element.setPointerCapture(event.pointerId);
    const current = { from, to: from, y: event.clientY, startY: event.clientY, active: false, element, timer: 0, frame: 0 };
    state.current = current;
    const tick = () => {
      if (state.current !== current || !current.active) return;
      const dialog = element.closest("dialog")!;
      const rect = dialog.getBoundingClientRect();
      const top = rect.top + 100, bottom = rect.bottom - 110;
      if (current.y < top) dialog.scrollTop -= Math.min(14, (top - current.y) / 3);
      if (current.y > bottom) dialog.scrollTop += Math.min(14, (current.y - bottom) / 3);
      const rows = [...dialog.querySelectorAll<HTMLElement>(".plan-exercise")];
      let distance = Infinity, target = from;
      rows.forEach((row, index) => { const bounds = row.getBoundingClientRect(); const next = Math.abs(current.y - (bounds.top + bounds.height / 2)); if (next < distance) { distance = next; target = index; } });
      if (target !== current.to) { current.to = target; setDrag({ from, to: target }); }
      current.frame = requestAnimationFrame(tick);
    };
    const activate = () => { current.active = true; setDrag({ from, to: from }); current.frame = requestAnimationFrame(tick); };
    if (event.pointerType === "mouse") activate(); else current.timer = window.setTimeout(activate, 300);
  };
  return { drag, handleProps: (index: number) => ({
    onPointerDown: (event: PointerEvent<HTMLButtonElement>) => start(event, index),
    onPointerMove: (event: PointerEvent<HTMLButtonElement>) => { const current = state.current; if (!current) return; current.y = event.clientY; if (!current.active && Math.abs(current.y - current.startY) > 10) finish(false); },
    onPointerUp: () => finish(true), onPointerCancel: () => finish(false), onLostPointerCapture: () => finish(false),
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape") finish(false);
      if (event.altKey && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        event.preventDefault(); onMove(index, index + (event.key === "ArrowUp" ? -1 : 1));
      }
    },
    title: "長按拖曳；鍵盤可用 Alt + 上下方向鍵排序",
  }) };
}
