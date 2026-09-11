import { ArrowRight, CalendarClock, Trash2, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { formatSelectedDate } from "../lib/date";
import { lockAppForModal, trapTabKey } from "../lib/modal";

type StaleWorkoutDialogProps = {
  date: string;
  completedSets: number;
  onFinishPrevious: () => void;
  onStartToday: () => void;
  onClose: () => void;
};

export function StaleWorkoutDialog({ date, completedSets, onFinishPrevious, onStartToday, onClose }: StaleWorkoutDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlock = lockAppForModal();
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      trapTabKey(event, dialogRef.current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlock();
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="stale-workout-layer">
      <button className="stale-workout-scrim" onClick={onClose} aria-label="稍後處理前次訓練" />
      <div ref={dialogRef} className="stale-workout-dialog" role="dialog" aria-modal="true" aria-labelledby="stale-workout-title" tabIndex={-1}>
        <header>
          <CalendarClock size={26} />
          <div><span>跨日訓練</span><h2 id="stale-workout-title">前次訓練還沒收尾</h2></div>
          <button ref={closeRef} onClick={onClose} aria-label="關閉"><X size={22} /></button>
        </header>
        <p>{formatSelectedDate(date)}留下了 {completedSets} 個已完成組數。請先決定它要記在哪一天，YOU LIAN 不會自動把舊訓練算進今天。</p>
        <div className="stale-workout-actions">
          <button className="stale-workout-primary" disabled={completedSets === 0} onClick={onFinishPrevious}>
            <span><strong>完成前次打卡</strong><small>{completedSets === 0 ? "至少需有一組已完成紀錄" : "時長計算到最後一次紀錄"}</small></span><ArrowRight size={20} />
          </button>
          <button className="stale-workout-secondary" onClick={onStartToday}>
            <Trash2 size={18} /><span><strong>清空並開始今天</strong><small>前次未送出的組數會移除</small></span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
