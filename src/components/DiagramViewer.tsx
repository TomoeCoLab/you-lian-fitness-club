import { useRef, useState, type PointerEvent } from "react";
import { TrainingSheet } from "./TrainingSheet";

export function DiagramViewer({ src, title, instructions = [], cues = [], onClose }: { src: string; title: string; instructions?: string[]; cues?: string[]; onClose: () => void }) {
  const [reading, setReading] = useState(() => window.matchMedia("(max-width: 760px)").matches);
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const last = useRef<{ x: number; y: number; distance: number } | null>(null);
  const snapshot = () => {
    const points = [...pointers.current.values()];
    if (!points.length) return null;
    const a = points[0], b = points[1] ?? a;
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, distance: Math.hypot(a.x - b.x, a.y - b.y) };
  };
  const clamp = (scale: number, x: number, y: number) => {
    const rect = stage.current?.getBoundingClientRect();
    const maxX = (rect?.width ?? 0) * (scale - 1) / 2, maxY = (rect?.height ?? 0) * (scale - 1) / 2;
    return { scale, x: Math.max(-maxX, Math.min(maxX, x)), y: Math.max(-maxY, Math.min(maxY, y)) };
  };
  const zoom = (delta: number) => setView(current => clamp(Math.max(1, Math.min(5, current.scale + delta)), current.x, current.y));
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const next = snapshot(), previous = last.current;
    if (next && previous) setView(current => {
      const scale = Math.max(1, Math.min(5, previous.distance > 0 && next.distance > 0 ? current.scale * next.distance / previous.distance : current.scale));
      return clamp(scale, current.x + next.x - previous.x, current.y + next.y - previous.y);
    });
    last.current = next;
  };
  const end = (event: PointerEvent<HTMLDivElement>) => { pointers.current.delete(event.pointerId); last.current = snapshot(); };
  return <TrainingSheet title={title} onClose={onClose} className="diagram-viewer">
    <div className="guide-media-tabs"><button aria-pressed={reading} onClick={() => setReading(true)}>直式步驟</button><button aria-pressed={!reading} onClick={() => setReading(false)}>完整圖解與縮放</button></div>
    {reading ? <div className="diagram-reading"><p>依文字步驟練習；需要看姿勢時切到完整圖解。不同人適合的幅度不同，不必模仿圖片中的最大角度。</p><ol>{instructions.map((text, index) => <li key={text}><span>步驟 {index + 1}</span><p>{text}</p></li>)}</ol><h3>保持這幾個重點</h3><ul>{cues.map(text => <li key={text}>{text}</li>)}</ul><button className="primary-button" onClick={() => setReading(false)}>查看姿勢大圖</button></div> : <>
    <div className="diagram-viewer__tools"><button onClick={() => zoom(-.5)} aria-label="縮小圖解">−</button><span>{Math.round(view.scale * 100)}%</span><button onClick={() => zoom(.5)} aria-label="放大圖解">＋</button><button onClick={() => setView({ scale: 1, x: 0, y: 0 })}>重設</button></div>
    <div className="diagram-viewer__stage" ref={stage} onDoubleClick={() => setView(current => current.scale > 1 ? { scale: 1, x: 0, y: 0 } : { scale: 2.5, x: 0, y: 0 })}
      onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY }); last.current = snapshot(); }} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}>
      <img src={src} alt={`${title}完整動作圖解`} draggable={false} style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }} />
    </div><p className="diagram-viewer__hint">雙指縮放、拖曳移動，或雙擊放大；亦可使用上方按鈕。</p></>}
  </TrainingSheet>;
}
