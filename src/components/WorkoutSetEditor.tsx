import { useState } from "react";
import type { ExerciseSetEntry, WorkoutItem } from "../types";

export function WorkoutSetEditor({ item, disabled, onChange, onComplete, onRemove, onTimer }: {
  onRemove: (id: string) => void;
  onTimer: (entry: ExerciseSetEntry) => void;
  item: WorkoutItem; disabled: boolean;
  onChange: (id: string, patch: Partial<ExerciseSetEntry>) => void;
  onComplete: (entry: ExerciseSetEntry) => void;
}) {
  const [showWeight, setShowWeight] = useState(() => item.entries.some(entry => (entry.weight ?? 0) > 0));
  const weightVisible = item.tracking !== "time" || showWeight;
  const number = (text: string) => text.trim() === "" ? null : Number(text);
  return <section className={`set-editor${weightVisible ? "" : " set-editor--timed"}`} aria-label="全部組數紀錄">
    {item.tracking === "time" ? <button className="text-action" onClick={() => setShowWeight(value => !value)}>{weightVisible ? "收起負重欄" : "需要記錄負重？"}</button> : null}
    <div className="set-editor__heading"><span>組別</span>{weightVisible ? <span>重量 kg</span> : null}<span>{item.tracking === "time" ? "時間 秒" : "次數"}</span><span>完成</span></div>
    {item.entries.map((entry, index) => {
      const value = item.tracking === "time" ? entry.durationSeconds : entry.reps;
      const valid = value != null && Number.isInteger(value) && value > 0 && value <= (item.tracking === "time" ? 86400 : 1000) && (entry.weight == null || Number.isFinite(entry.weight) && entry.weight >= 0 && entry.weight <= 1000);
      return <div className={`set-editor__row${entry.completed ? " is-complete" : ""}`} key={entry.id}>
        <strong>{index + 1}</strong>
        {weightVisible ? <input aria-label={`第 ${index + 1} 組重量`} type="number" min="0" max="1000" step="0.5" inputMode="decimal" placeholder="自重" disabled={disabled} value={entry.weight ?? ""} onChange={event => onChange(entry.id, { weight: number(event.target.value) })} /> : null}
        <input aria-label={`第 ${index + 1} 組${item.tracking === "time" ? "秒數" : "次數"}`} type="number" min="1" step="1" inputMode="numeric" disabled={disabled} value={value ?? ""} onChange={event => onChange(entry.id, item.tracking === "time" ? { durationSeconds: number(event.target.value) } : { reps: number(event.target.value) })} />
        <button aria-label={`${entry.completed ? "取消完成" : "完成"}第 ${index + 1} 組`} aria-pressed={entry.completed} disabled={disabled || !entry.completed && !valid} onClick={() => onComplete(entry)}>{entry.completed ? "✓" : "完成"}</button>
        {!valid ? <small role="status">次數／秒數須為正整數，重量不可為負值。</small> : null}
        <div className="set-editor__tools">{item.tracking === "time" && !entry.completed ? <button disabled={disabled || !valid} onClick={() => onTimer(entry)}>開始第 {index + 1} 組倒數</button> : null}<button disabled={disabled} aria-label={`刪除第 ${index + 1} 組`} onClick={() => onRemove(entry.id)}>刪除此組</button></div>
      </div>;
    })}
    <p>打卡前可修正每組，點 ✓ 可取消完成。</p>
  </section>;
}
