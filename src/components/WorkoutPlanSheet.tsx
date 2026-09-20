import { GripVertical, BookOpen, Plus, Trash2 } from "lucide-react";
import { usePlanDrag } from "./usePlanDrag";
import type { WorkoutDraft } from "../types";
import { exercises } from "../data/exercises";
import { TrainingSheet } from "./TrainingSheet";
import { useState } from "react";
import { itemKey, phaseLabels } from "../lib/workoutPlan";
import { SaveWorkoutTemplate } from "./SaveWorkoutTemplate";
import { weightLabel } from "../lib/weightLabel";

export function WorkoutPlanSheet({ workout, stale, onClose, onStart, onGuide, onChange, onBrowse, onCheckout, onSave }: {
  onSave: (name: string) => Promise<void>;
  workout: WorkoutDraft; stale: boolean; onClose: () => void; onStart: (id: string) => void;
  onGuide: (id: string) => void; onChange: (workout: WorkoutDraft) => void; onBrowse: () => void; onCheckout: () => void;
}) {
  const [removed, setRemoved] = useState<WorkoutDraft | null>(null);
  const total = workout.items.reduce((sum, item) => sum + item.entries.length, 0);
  const completed = workout.items.reduce((sum, item) => sum + item.entries.filter(entry => entry.completed).length, 0);
  const move = (index: number, target: number) => {
    if (target < 0 || target >= workout.items.length) return;
    setRemoved(null);
    const items = [...workout.items];
    items.splice(target, 0, ...items.splice(index, 1));
    onChange({ ...workout, items, updatedAt: new Date().toISOString() });
  };
  const { drag, handleProps } = usePlanDrag(move);
  return <TrainingSheet title="今日課表" onClose={onClose} className="workout-plan-sheet">
    <p className="sheet-meta">手機長按把手拖曳排序，電腦直接拖曳。<br />{workout.workoutDate} · {workout.items.length} 個動作 · {completed} / {total} 組完成</p>
    {stale ? <p className="sheet-warning">這是前次未完成的訓練，請先處理跨日訓練，再繼續記錄。</p> : null}
    <div className="training-sheet__body">
      {removed ? <button className="plan-add" onClick={() => { onChange(removed); setRemoved(null); }}>復原剛才移除的動作</button> : null}
      {workout.items.length === 0 ? <p className="sheet-empty">還沒有動作，從動作庫或課表加入即可開始。</p> : workout.items.map((item, index) => <section className={`plan-exercise${drag?.from === index ? " is-dragging" : ""}${drag?.to === index ? " is-drop-target" : ""}`} key={itemKey(item)}>
        <header><button className="plan-drag-handle" disabled={stale} aria-label={`拖曳排序${item.exerciseName}`} {...handleProps(index)}><GripVertical size={20} /></button><h3>{index + 1}. {item.exerciseName}</h3>{exercises.some(exercise => exercise.id === item.exerciseId) ? <button onClick={() => onGuide(item.exerciseId)} aria-label={`查看${item.exerciseName}指引`}><BookOpen size={17} />指引</button> : <small>自訂動作</small>}</header>
        <p className="training-context-note">{phaseLabels[item.phase ?? "main"]}{item.note ? ` · ${item.note}` : ""}</p>
        <ul>{item.entries.map((entry, i) => <li key={entry.id}><span>第 {i + 1} 組</span><span>{item.tracking === "time" ? `${entry.durationSeconds ?? "—"} 秒` : `${weightLabel(entry.weight, exercises.find(exercise => exercise.id === item.exerciseId)?.equipment)} × ${entry.reps ?? "—"} 次`}</span><span>{entry.completed ? "已完成" : "待完成"}</span></li>)}</ul>
        <div className="plan-exercise__actions"><button disabled={stale} onClick={() => onStart(itemKey(item))}>前往此動作</button><button disabled={stale} aria-label={`移除${item.exerciseName}`} onClick={() => { setRemoved(workout); onChange({ ...workout, items: workout.items.filter(other => itemKey(other) !== itemKey(item)), updatedAt: new Date().toISOString() }); }}><Trash2 size={17} /></button></div>
      </section>)}
      <button className="plan-add" disabled={stale} onClick={onBrowse}><Plus size={18} />新增動作</button>
      {workout.items.length ? <SaveWorkoutTemplate onSave={onSave} /> : null}
    </div>
    <footer className="training-sheet__footer"><button className="primary-button" disabled={stale || !workout.items.length} onClick={() => onStart(itemKey(workout.items.find(item => item.entries.some(entry => !entry.completed)) ?? workout.items[0]))}>{completed ? "繼續訓練" : "開始訓練"}</button>{completed > 0 ? <button onClick={onCheckout}>儲存已完成組數</button> : null}</footer>
  </TrainingSheet>;
}
