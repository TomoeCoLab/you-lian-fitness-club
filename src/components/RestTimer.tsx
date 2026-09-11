import { Pause, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type RestTimerProps = {
  seconds: number;
  timerKey: string;
  deadline: number;
  pausedRemaining?: number;
  onStateChange?: (state: { deadline: number; pausedRemaining?: number }) => void;
  onClose: () => void;
};

function formatTime(seconds: number): string {
  const safe = Math.max(0, seconds);
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
}

export function RestTimer({ seconds, timerKey, deadline: savedDeadline, pausedRemaining, onStateChange, onClose }: RestTimerProps) {
  const initialDeadline = useMemo(() => savedDeadline || Date.now() + seconds * 1000, [savedDeadline, seconds, timerKey]);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [remaining, setRemaining] = useState(() => pausedRemaining ?? Math.max(0, Math.ceil((initialDeadline - Date.now()) / 1000)));
  const [running, setRunning] = useState(() => pausedRemaining === undefined && initialDeadline > Date.now());

  useEffect(() => {
    setDeadline(initialDeadline);
    setRemaining(pausedRemaining ?? Math.max(0, Math.ceil((initialDeadline - Date.now()) / 1000)));
    setRunning(pausedRemaining === undefined && initialDeadline > Date.now());
  }, [initialDeadline, timerKey, pausedRemaining]);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      const next = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0) {
        setRunning(false);
        if ("vibrate" in navigator) navigator.vibrate([160, 80, 160]);
      }
    };
    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [deadline, running]);

  const toggle = () => {
    if (running) {
      const paused = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(paused);
      setRunning(false);
      onStateChange?.({ deadline, pausedRemaining: paused });
    } else if (remaining > 0) {
      const resumedDeadline = Date.now() + remaining * 1000;
      setDeadline(resumedDeadline);
      setRunning(true);
      onStateChange?.({ deadline: resumedDeadline });
    }
  };

  const reset = () => {
    const resetDeadline = Date.now() + seconds * 1000;
    setRemaining(seconds);
    setDeadline(resetDeadline);
    setRunning(true);
    onStateChange?.({ deadline: resetDeadline });
  };

  return (
    <section className={`rest-timer${remaining === 0 ? " rest-timer--done" : ""}`} aria-live="polite">
      <div>
        <span>{remaining === 0 ? "休息完成" : "休息中"}</span>
        <strong>{formatTime(remaining)}</strong>
      </div>
      <div className="rest-timer__actions">
        <button onClick={toggle} aria-label={running ? "暫停計時" : "繼續計時"}>{running ? <Pause size={22} /> : <Play size={22} />}<span>{running ? "暫停" : "繼續"}</span></button>
        <button onClick={reset} aria-label="重新計時"><RotateCcw size={20} /></button>
        <button onClick={onClose} aria-label="關閉計時器"><X size={20} /></button>
      </div>
    </section>
  );
}
