import { ChartNoAxesColumn, ChevronRight, LibraryBig, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { lockAppForModal, trapTabKey } from "../lib/modal";
import { progressOverview } from "../lib/progress";
import { templateItemPresent } from "../lib/workoutPlan";
import type { Checkin, WorkoutDraft, WorkoutTemplate } from "../types";

type Props = {
  storageScope: string;
  overview: import("../types").ProgressOverview | null;
  templates: WorkoutTemplate[];
  history: Checkin[];
  workout: WorkoutDraft;
  onApply: (template: WorkoutTemplate) => void;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
};

export function TrainingLibraryDialog({ storageScope, templates, history, overview: savedOverview, workout, onApply, onDelete, onClose }: Props) {
  const preferenceKey = `you-lian:program-preferences:v1:${storageScope}`;
  const [preferences, setPreferences] = useState<{ favorites: string[]; recent: string[]; week: string[] }>(() => {
    try { const data = JSON.parse(localStorage.getItem(preferenceKey) ?? "null"); return { favorites: Array.isArray(data?.favorites) ? data.favorites : [], recent: Array.isArray(data?.recent) ? data.recent : [], week: Array.isArray(data?.week) && data.week.length === 7 ? data.week : Array(7).fill("") }; }
    catch { return { favorites: [], recent: [], week: Array(7).fill("") }; }
  });
  const [error, setError] = useState("");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const updatePreferences = (next: typeof preferences) => {
    try { localStorage.setItem(preferenceKey, JSON.stringify(next)); setPreferences(next); }
    catch { setError("瀏覽器空間不足，偏好設定未保存。"); }
  };
  const [tab, setTab] = useState<"templates" | "progress">("templates");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [collection, setCollection] = useState<"main" | "warmup" | "cooldown" | "custom">("main");
  const [category, setCategory] = useState("全部");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const overview = useMemo(() => savedOverview ?? progressOverview(history), [history, savedOverview]);
  const visibleTemplates = templates.filter(template => {
    if (onlyFavorites && !preferences.favorites.includes(template.id)) return false;
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

  const remove = async (id: string) => {
    setBusyId(id);
    try { await onDelete(id); updatePreferences({ favorites: preferences.favorites.filter(value => value !== id), recent: preferences.recent.filter(value => value !== id), week: preferences.week.map(value => value === id ? "" : value) }); } catch { setError("刪除失敗，課表仍保留，請稍後再試。"); } finally { setBusyId(null); }
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
          {error ? <p role="alert">{error}</p> : null}
          <details className="weekly-plan"><summary>一週安排（可留白，不需每天練）</summary><p>以下只安排課表，不會自動打卡或加入今日訓練。肌力練習可先安排每週兩天，中間保留恢復日；舒緩依舒適度選擇，不取代一般日常活動。</p><p>入門範例：週一「日常活力」、週四「徒手全身」，其他日依體力散步或做短時間活動；久坐時穿插起身活動。熱身是主訓練前的準備，收尾和伸展不等於有氧活動，也不需要每天重複練同一部位。</p><p><a href="https://www.nhs.uk/live-well/exercise/how-to-improve-strength-flexibility/" target="_blank" rel="noreferrer">一般活動建議：NHS</a> · 此安排僅保存在本機</p><div>{["週一", "週二", "週三", "週四", "週五", "週六", "週日"].map((day, index) => <label key={day}>{day}<select aria-label={`${day}課表`} value={preferences.week[index]} onChange={event => updatePreferences({ ...preferences, week: preferences.week.map((id, i) => i === index ? event.target.value : id) })}><option value="">休息／自行活動</option>{templates.filter(item => (item.kind ?? "main") === "main").map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>)}</div></details>
          {preferences.recent.length ? <div className="recent-programs"><span>最近使用</span>{preferences.recent.map(id => { const item = templates.find(template => template.id === id); return item ? <button key={id} onClick={() => { setOnlyFavorites(false); setCategory("全部"); setCollection(item.builtIn ? item.kind ?? "main" : "custom"); setPreviewId(id); }}>{item.name}</button> : null; })}</div> : null}
          <button className="favorite-filter" aria-pressed={onlyFavorites} onClick={() => setOnlyFavorites(value => !value)}>{onlyFavorites ? "顯示全部課表" : "只看收藏"}</button>
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
                <ol className="template-preview-list">{template.items.map((item, index) => <li key={`${item.exerciseId}-${index}`}><div><strong>{index + 1}. {item.exerciseName}</strong>{item.note ? <p>{item.note}</p> : null}</div><span>{item.entries ? `${item.entries.length} 組 · 逐組設定` : `${item.sets} 組 × ${item.tracking === "time" ? `${item.durationSeconds ?? 30} 秒` : `${item.reps ?? 10} 次`}`}</span></li>)}</ol>
                {template.guidance ? <ul className="template-guidance">{template.guidance.map(note => <li key={note}>{note}</li>)}</ul> : null}
                <p className="template-library-note">熱身會排在主訓練前，收尾排在最後；同一動作在不同階段分開記錄。同階段已加入的動作會保留原設定。</p>
                {template.companionIds ? <div className="template-companions"><span>可搭配</span>{template.companionIds.map(id => {
                  const companion = templates.find(entry => entry.id === id);
                  return companion ? <button key={id} onClick={() => showCompanion(companion)}>查看{companion.name}</button> : null;
                })}</div> : null}
              </> : null}
              <footer>
                <button aria-label={`${preferences.favorites.includes(template.id) ? "取消收藏" : "收藏"}${template.name}`} aria-pressed={preferences.favorites.includes(template.id)} onClick={() => updatePreferences({ ...preferences, favorites: preferences.favorites.includes(template.id) ? preferences.favorites.filter(id => id !== template.id) : [...preferences.favorites, template.id] })}>{preferences.favorites.includes(template.id) ? "★" : "☆"}</button>
                <small>{template.items.length} 動作 · {template.items.reduce((sum, item) => sum + item.sets, 0)} 組</small>
                {!template.builtIn ? <button className="template-delete" disabled={busyId !== null} onClick={() => void remove(template.id)} aria-label={`刪除 ${template.name}`}><Trash2 size={16} /></button> : null}
                {previewId === template.id
                  ? <button className="template-apply" disabled={template.items.every(item => templateItemPresent(workout, template, item))} onClick={() => { updatePreferences({ ...preferences, recent: [template.id, ...preferences.recent.filter(id => id !== template.id)].slice(0, 4) }); onApply(template); onClose(); }}>{template.items.every(item => templateItemPresent(workout, template, item)) ? "動作皆已加入" : "加入今日課表"}<ChevronRight size={17} /></button>
                  : <button className="template-apply" onClick={() => setPreviewId(template.id)}>查看課表<ChevronRight size={17} /></button>}
              </footer>
            </article>)}
          </div>
        </div> : <div className="training-library__body progress-dashboard">
          <p className="progress-dashboard__intro">以下為全部歷史打卡統計；同一天分次打卡仍只算一個訓練日。{savedOverview ? "單一動作的最近紀錄參考最近 120 筆打卡。" : "訪客統計來自此瀏覽器。"}</p>
          <div className="progress-stat-grid">
            <article><strong>{overview.trainingDays}</strong><span>訓練日數</span></article>
            <article><strong>{overview.sessionCount}</strong><span>打卡筆數</span></article>
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
