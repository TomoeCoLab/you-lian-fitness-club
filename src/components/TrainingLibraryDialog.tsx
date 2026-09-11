import { ChartNoAxesColumn, ChevronRight, LibraryBig, Plus, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockAppForModal, trapTabKey } from "../lib/modal";
import { progressOverview } from "../lib/progress";
import type { Checkin, WorkoutDraft, WorkoutTemplate } from "../types";

type Props = {
  templates: WorkoutTemplate[];
  history: Checkin[];
  workout: WorkoutDraft;
  onApply: (template: WorkoutTemplate) => void;
  onSave: (name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
};

export function TrainingLibraryDialog({ templates, history, workout, onApply, onSave, onDelete, onClose }: Props) {
  const [tab, setTab] = useState<"templates" | "progress">("templates");
  const [name, setName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overview = useMemo(() => progressOverview(history), [history]);

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

  const save = async () => {
    const trimmed = name.trim();
    if (!trimmed || workout.items.length === 0) return;
    setBusyId("save");
    try {
      await onSave(trimmed);
      setName("");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    setBusyId(id);
    try { await onDelete(id); } finally { setBusyId(null); }
  };

  return createPortal(
    <div className="modal-backdrop training-library-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="training-library" role="dialog" aria-modal="true" aria-labelledby="training-library-title">
        <header>
          <div><span className="eyebrow">YOU LIAN / TRAIN SMART</span><h2 id="training-library-title">課表與進度</h2></div>
          <button ref={closeRef} className="icon-button" onClick={onClose} aria-label="關閉課表與進度"><X /></button>
        </header>
        <div className="training-library__tabs" role="tablist">
          <button role="tab" aria-selected={tab === "templates"} onClick={() => setTab("templates")}><LibraryBig size={18} />我的課表</button>
          <button role="tab" aria-selected={tab === "progress"} onClick={() => setTab("progress")}><ChartNoAxesColumn size={18} />訓練進度</button>
        </div>

        {tab === "templates" ? <div className="training-library__body">
          <section className="template-save-panel">
            <div><strong>儲存目前訓練</strong><span>{workout.items.length > 0 ? `${workout.items.length} 個動作，可下次一鍵載入` : "先在健身指引加入動作"}</span></div>
            <div><input value={name} maxLength={40} onChange={(event) => setName(event.target.value)} placeholder="例如：週一推力日" aria-label="課表名稱" /><button disabled={!name.trim() || workout.items.length === 0 || busyId !== null} onClick={() => void save()}><Plus size={17} />儲存</button></div>
          </section>
          <div className="template-grid">
            {templates.map((template) => <article className={`template-card${previewId === template.id ? " template-card--preview" : ""}`} key={template.id}>
              <div><span>{template.builtIn ? "YOU LIAN 建議" : "自訂課表"}</span><h3>{template.name}</h3><p>{template.items.map((item) => item.exerciseName).join(" · ")}</p></div>
              {previewId === template.id ? <ol className="template-preview-list">{template.items.map((item) => <li key={item.exerciseId}><strong>{item.exerciseName}</strong><span>{item.sets} 組 · {item.tracking === "time" ? `${item.durationSeconds ?? 30} 秒` : `${item.reps ?? 10} 次`}</span></li>)}</ol> : null}
              <footer>
                <small>{template.items.length} 動作 · {template.items.reduce((sum, item) => sum + item.sets, 0)} 組</small>
                {!template.builtIn ? <button className="template-delete" disabled={busyId !== null} onClick={() => void remove(template.id)} aria-label={`刪除 ${template.name}`}><Trash2 size={16} /></button> : null}
                {previewId === template.id
                  ? <button className="template-apply" onClick={() => { onApply(template); onClose(); }}>加入今日課表<ChevronRight size={17} /></button>
                  : <button className="template-apply" onClick={() => setPreviewId(template.id)}>查看課表<ChevronRight size={17} /></button>}
              </footer>
            </article>)}
          </div>
        </div> : <div className="training-library__body progress-dashboard">
          <p className="progress-dashboard__intro">依目前帳號的歷史打卡統計；每個動作頁也會顯示下一次建議。</p>
          <div className="progress-stat-grid">
            <article><strong>{overview.sessionCount}</strong><span>累積訓練</span></article>
            <article><strong>{overview.totalSets}</strong><span>完成組數</span></article>
            <article><strong>{overview.totalMinutes}</strong><span>紀錄分鐘</span></article>
          </div>
          <section className="progress-favorite"><span>最常練習</span><strong>{overview.favorite}</strong><p>建議是依已記錄的重量、次數或時間推算；身體狀態與動作品質永遠優先。</p></section>
          {history.length === 0 ? <div className="progress-empty"><ChartNoAxesColumn size={28} /><strong>完成第一筆詳細打卡後，就能看到進度。</strong></div> : null}
        </div>}
      </div>
    </div>,
    document.body,
  );
}
