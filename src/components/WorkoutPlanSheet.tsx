import { ArrowDown, ArrowUp, BookOpen, Plus, Trash2 } from "lucide-react";
import type { WorkoutDraft } from "../types";
import { exercises } from "../data/exercises";
import { TrainingSheet } from "./TrainingSheet";

export function WorkoutPlanSheet({ workout, stale, onClose, onStart, onGuide, onChange, onBrowse, onCheckout }: {
  workout: WorkoutDraft; stale: boolean; onClose: () => void; onStart: (id: string) => void;
  onGuide: (id: string) => void; onChange: (workout: WorkoutDraft) => void; onBrowse: () => void; onCheckout: () => void;
}) {
  const total = workout.items.reduce((sum, item) => sum + item.entries.length, 0);
  const completed = workout.items.reduce((sum, item) => sum + item.entries.filter(entry => entry.completed).length, 0);
  const move = (index: number, direction: number) => {
    const items = [...workout.items];
    [items[index], items[index + direction]] = [items[index + direction], items[index]];
    onChange({ ...workout, items, updatedAt: new Date().toISOString() });
  };
  return <TrainingSheet title="今日課表" onClose={onClose} className="workout-plan-sheet">
    <p className="sheet-meta">{workout.workoutDate} · {workout.items.length} 個動作 · {completed} / {total} 組完成</p>
    {stale ? <p className="sheet-warning">這是前次未完成的訓練，請先處理跨日訓練，再繼續記錄。</p> : null}
    <div className="training-sheet__body">
      {workout.items.length === 0 ? <p className="sheet-empty">還沒有動作，從動作庫或課表加入即可開始。</p> : workout.items.map((item, index) => <section className="plan-exercise" key={item.exerciseId}>
        <header><h3>{index + 1}. {item.exerciseName}</h3>{exercises.some(exercise => exercise.id === item.exerciseId) ? <button onClick={() => onGuide(item.exerciseId)} aria-label={`查看${item.exerciseName}指引`}><BookOpen size={17} />指引</button> : <small>自訂動作</small>}</header>
        <ul>{item.entries.map((entry, i) => <li key={entry.id}><span>第 {i + 1} 組</span><span>{entry.weight == null ? "自重" : `${entry.weight} kg`} × {item.tracking === "time" ? `${entry.durationSeconds ?? "—"} 秒` : `${entry.reps ?? "—"} 次`}</span><span>{entry.completed ? "已完成" : "待完成"}</span></li>)}</ul>
        <div className="plan-exercise__actions"><button disabled={stale} onClick={() => onStart(item.exerciseId)}>前往此動作</button><button disabled={stale || index === 0} aria-label={`上移${item.exerciseName}`} onClick={() => move(index, -1)}><ArrowUp size={17} /></button><button disabled={stale || index === workout.items.length - 1} aria-label={`下移${item.exerciseName}`} onClick={() => move(index, 1)}><ArrowDown size={17} /></button><button disabled={stale} aria-label={`移除${item.exerciseName}`} onClick={() => onChange({ ...workout, items: workout.items.filter(other => other.exerciseId !== item.exerciseId), updatedAt: new Date().toISOString() })}><Trash2 size={17} /></button></div>
      </section>)}
      <button className="plan-add" disabled={stale} onClick={onBrowse}><Plus size={18} />新增動作</button>
    </div>
    <footer className="training-sheet__footer"><button className="primary-button" disabled={stale || !workout.items.length} onClick={() => onStart((workout.items.find(item => item.entries.some(entry => !entry.completed)) ?? workout.items[0]).exerciseId)}>{completed ? "繼續訓練" : "開始訓練"}</button>{completed > 0 ? <button onClick={onCheckout}>結束並打卡</button> : null}</footer>
  </TrainingSheet>;
}
