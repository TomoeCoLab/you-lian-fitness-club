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
  const [collection, setCollection] = useState<"main" | "warmup" | "cooldown" | "custom">("main");
  const [category, setCategory] = useState("全部");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overview = useMemo(() => progressOverview(history), [history]);
  const visibleTemplates = templates.filter(template => {
    if (collection === "custom") return !template.builtIn;
    return template.builtIn && (template.kind ?? "main") === collection
      && (collection !== "main" || category === "全部" || template.category === category);
  });
  const changeCollection = (value: typeof collection) => { setCollection(value); setPreviewId(null); };
  const showCompanion = (template: WorkoutTemplate) => {
    setCollection(template.kind === "warmup" ? "warmup" : "cooldown");
    setPreviewId(template.id);
    requestAnimationFrame(() => document.getElementById(`template-${template.id}`)?.scrollIntoView({ block: "nearest" }));
  };

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
      setCollection("custom");
      setPreviewId(null);
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
          <div className="template-filters">
            <label>課表類型<select value={collection} onChange={event => changeCollection(event.target.value as typeof collection)}>
              <option value="main">主課表</option><option value="warmup">運動前熱身</option><option value="cooldown">運動後收尾</option><option value="custom">自訂課表</option>
            </select></label>
            {collection === "main" ? <label>使用情境<select value={category} onChange={event => { setCategory(event.target.value); setPreviewId(null); }}>
              {["全部", "居家肌力", "核心活動", "舒緩伸展", "健身房"].map(value => <option key={value}>{value}</option>)}
            </select></label> : null}
          </div>
          <p className="template-library-note">{collection === "custom" ? "你的自訂課表保持原樣，不受內建課表更新影響。" : "以下是一般活動建議，不是治療處方。初次從少量開始，不舒服就停止；可先查看順序與替代方式。"}</p>
          <p className="template-result-count" role="status">{visibleTemplates.length} 張{collection === "main" ? "主課表" : collection === "warmup" ? "熱身流程" : collection === "cooldown" ? "收尾流程" : "自訂課表"}</p>
          <div className="template-grid">
            {visibleTemplates.length === 0 ? <p className="template-library-note">目前沒有這類課表。可先加入動作，再儲存自己的課表。</p> : null}
            {visibleTemplates.map((template) => <article id={`template-${template.id}`} className={`template-card${previewId === template.id ? " template-card--preview" : ""}`} key={template.id}>
              <div><span>{template.builtIn ? template.category ?? "YOU LIAN 建議" : "自訂課表"}</span><h3>{template.name}</h3><p>{template.description ?? template.items.map((item) => item.exerciseName).join(" · ")}</p>{template.durationLabel ? <p className="template-duration">{template.durationLabel}</p> : null}</div>
              {previewId === template.id ? <>
                {template.equipmentNote ? <p className="template-equipment">準備：{template.equipmentNote}</p> : null}
                <ol className="template-preview-list">{template.items.map((item, index) => <li key={item.exerciseId}><div><strong>{index + 1}. {item.exerciseName}</strong>{item.note ? <p>{item.note}</p> : null}</div><span>{item.sets} 組 × {item.tracking === "time" ? `${item.durationSeconds ?? 30} 秒` : `${item.reps ?? 10} 次`}</span></li>)}</ol>
                {template.guidance ? <ul className="template-guidance">{template.guidance.map(note => <li key={note}>{note}</li>)}</ul> : null}
                {template.items.some(item => workout.items.some(existing => existing.exerciseId === item.exerciseId)) ? <p className="template-library-note">已存在於今日課表的動作會保留原有組數，不重複加入。若要分開記熱身、主訓練與收尾，可各自完成並打卡，同日紀錄會累積。</p> : null}
                {template.companionIds ? <div className="template-companions"><span>可搭配</span>{template.companionIds.map(id => {
                  const companion = templates.find(entry => entry.id === id);
                  return companion ? <button key={id} onClick={() => showCompanion(companion)}>查看{companion.name}</button> : null;
                })}</div> : null}
              </> : null}
              <footer>
                <small>{template.items.length} 動作 · {template.items.reduce((sum, item) => sum + item.sets, 0)} 組</small>
                {!template.builtIn ? <button className="template-delete" disabled={busyId !== null} onClick={() => void remove(template.id)} aria-label={`刪除 ${template.name}`}><Trash2 size={16} /></button> : null}
                {previewId === template.id
                  ? <button className="template-apply" disabled={template.items.every(item => workout.items.some(existing => existing.exerciseId === item.exerciseId))} onClick={() => { onApply(template); onClose(); }}>{template.items.every(item => workout.items.some(existing => existing.exerciseId === item.exerciseId)) ? "動作皆已加入" : "加入今日課表"}<ChevronRight size={17} /></button>
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
