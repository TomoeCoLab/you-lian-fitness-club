import {
  Check,
  ChevronRight,
  CircleAlert,
  LibraryBig,
  ExternalLink,
  Play,
  Plus,
  Search,
  ShoppingBasket,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { formatSelectedDate, todayKey } from "../lib/date";
import { trapTabKey } from "../lib/modal";
import { bodyParts, equipmentOptions, exercises } from "../data/exercises";
import { builtInWorkoutTemplates } from "../data/workoutTemplates";
import { progressSuggestion } from "../lib/progress";
import type { BodyPart, Checkin, Equipment, ExerciseSetEntry, GuideExercise, WorkoutDraft, WorkoutItem, WorkoutTemplate, WorkoutTemplateItem } from "../types";
import { EquipmentIcon } from "./EquipmentIcon";
import { RestTimer } from "./RestTimer";
import { TrainingLibraryDialog } from "./TrainingLibraryDialog";

type TrainingGuideProps = {
  workout: WorkoutDraft;
  onWorkoutChange: (workout: WorkoutDraft) => void;
  onCheckout: () => void;
  templates: WorkoutTemplate[];
  history: Checkin[];
  dataLoading: boolean;
  onSaveTemplate: (name: string, items: WorkoutTemplateItem[]) => Promise<void>;
  onDeleteTemplate: (id: string) => Promise<void>;
};

type TimerState = { seconds: number; key: string; deadline: number } | null;

type GuideState = {
  selectedId: string;
  bodyPart: "全部" | BodyPart;
  equipment: "全部" | Equipment;
  query: string;
  timer: TimerState;
};

const GUIDE_STATE_KEY = "you-lian:guide-state:v1";

function loadGuideState(): GuideState {
  const fallback: GuideState = { selectedId: exercises[0].id, bodyPart: "全部", equipment: "全部", query: "", timer: null };
  try {
    const parsed = JSON.parse(localStorage.getItem(GUIDE_STATE_KEY) ?? "null") as Partial<GuideState> | null;
    if (!parsed) return fallback;
    return {
      selectedId: typeof parsed.selectedId === "string" ? parsed.selectedId : fallback.selectedId,
      bodyPart: bodyParts.includes(parsed.bodyPart as "全部" | BodyPart) ? parsed.bodyPart as "全部" | BodyPart : "全部",
      equipment: equipmentOptions.includes(parsed.equipment as "全部" | Equipment) ? parsed.equipment as "全部" | Equipment : "全部",
      query: typeof parsed.query === "string" ? parsed.query : "",
      timer: parsed.timer && typeof parsed.timer.deadline === "number" && typeof parsed.timer.seconds === "number" && typeof parsed.timer.key === "string" ? parsed.timer as TimerState : null,
    };
  } catch {
    return fallback;
  }
}

function numberOrNull(value: string): number | null {
  if (value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

function makeEntry(exercise: GuideExercise, previous?: ExerciseSetEntry): ExerciseSetEntry {
  return {
    id: crypto.randomUUID(),
    weight: previous?.weight ?? null,
    reps: exercise.tracking === "reps" ? previous?.reps ?? exercise.recommendation.reps : null,
    durationSeconds: exercise.tracking === "time" ? previous?.durationSeconds ?? exercise.recommendation.durationSeconds : null,
    completed: false,
  };
}

function completedCount(item: WorkoutItem): number {
  return item.entries.filter((entry) => entry.completed).length;
}

function youtubeThumbnail(embedUrl: string): string | null {
  const videoId = embedUrl.match(/\/embed\/([^?&/]+)/)?.[1];
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
}

export function TrainingGuide({ workout, templates, history, dataLoading, onWorkoutChange, onCheckout, onSaveTemplate, onDeleteTemplate }: TrainingGuideProps) {
  const [initialGuideState] = useState(loadGuideState);
  const [selectedId, setSelectedId] = useState(initialGuideState.selectedId);
  const [bodyPart, setBodyPart] = useState<"全部" | BodyPart>(initialGuideState.bodyPart);
  const [equipment, setEquipment] = useState<"全部" | Equipment>(initialGuideState.equipment);
  const [query, setQuery] = useState(initialGuideState.query);
  const [timer, setTimer] = useState<TimerState>(initialGuideState.timer);
  const [basketOpen, setBasketOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const closeLibrary = useCallback(() => setLibraryOpen(false), []);
  const basketRef = useRef<HTMLElement>(null);
  const basketCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    localStorage.setItem(GUIDE_STATE_KEY, JSON.stringify({ selectedId, bodyPart, equipment, query, timer } satisfies GuideState));
  }, [bodyPart, equipment, query, selectedId, timer]);

  useEffect(() => setVideoActive(false), [selectedId]);

  useEffect(() => {
    if (workout.items.length === 0) setTimer(null);
  }, [workout.items.length]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-Hant");
    return exercises.filter((exercise) => {
      const matchesBody = bodyPart === "全部" || exercise.bodyParts.includes(bodyPart);
      const matchesEquipment = equipment === "全部" || exercise.equipment === equipment;
      const matchesQuery = !needle || `${exercise.name} ${exercise.equipment} ${exercise.bodyParts.join(" ")}`.toLocaleLowerCase("zh-Hant").includes(needle);
      return matchesBody && matchesEquipment && matchesQuery;
    });
  }, [bodyPart, equipment, query]);

  const contextualEquipmentCounts = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-Hant");
    const candidates = exercises.filter((exercise) => {
      const matchesBody = bodyPart === "全部" || exercise.bodyParts.includes(bodyPart);
      const matchesQuery = !needle || `${exercise.name} ${exercise.equipment} ${exercise.bodyParts.join(" ")}`.toLocaleLowerCase("zh-Hant").includes(needle);
      return matchesBody && matchesQuery;
    });
    return new Map(equipmentOptions.map((option) => [option, option === "全部" ? candidates.length : candidates.filter((exercise) => exercise.equipment === option).length]));
  }, [bodyPart, query]);

  const selected = filtered.find((exercise) => exercise.id === selectedId) ?? filtered[0] ?? null;
  const activeItem = selected ? workout.items.find((item) => item.exerciseId === selected.id) ?? null : null;
  const totalSets = workout.items.reduce((total, item) => total + item.entries.length, 0);
  const completedSets = workout.items.reduce((total, item) => total + completedCount(item), 0);
  const staleWorkout = workout.items.length > 0 && workout.workoutDate !== todayKey();
  const suggestion = useMemo(() => selected ? progressSuggestion(selected, history) : null, [history, selected]);
  const allTemplates = useMemo(() => [...builtInWorkoutTemplates, ...templates], [templates]);

  const updateItems = (items: WorkoutItem[]) => {
    onWorkoutChange({ ...workout, items, updatedAt: new Date().toISOString() });
  };

  const startExercise = () => {
    if (!selected || activeItem || staleWorkout) return;
    updateItems([
      ...workout.items,
      {
        exerciseId: selected.id,
        exerciseName: selected.name,
        bodyPart: selected.bodyParts[0],
        tracking: selected.tracking,
        restSeconds: selected.recommendation.restSeconds,
        entries: [makeEntry(selected)],
      },
    ]);
  };

  const updateEntry = (entryId: string, patch: Partial<ExerciseSetEntry>) => {
    if (!selected || staleWorkout) return;
    updateItems(workout.items.map((item) => item.exerciseId === selected.id
      ? { ...item, entries: item.entries.map((entry) => entry.id === entryId ? { ...entry, ...patch } : entry) }
      : item));
  };

  const completeEntry = (entry: ExerciseSetEntry) => {
    if (!selected || staleWorkout) return;
    const completed = !entry.completed;
    updateEntry(entry.id, { completed });
    if (completed) setTimer({ seconds: selected.recommendation.restSeconds, key: `${entry.id}-${Date.now()}`, deadline: Date.now() + selected.recommendation.restSeconds * 1000 });
  };

  const addSet = () => {
    if (!selected || staleWorkout) return;
    if (!activeItem) {
      startExercise();
      return;
    }
    const previous = activeItem.entries.at(-1);
    updateItems(workout.items.map((item) => item.exerciseId === selected.id
      ? { ...item, entries: [...item.entries, makeEntry(selected, previous)] }
      : item));
  };

  const removeEntry = (entryId: string) => {
    if (!selected || staleWorkout) return;
    updateItems(workout.items.flatMap((item) => {
      if (item.exerciseId !== selected.id) return [item];
      const entries = item.entries.filter((entry) => entry.id !== entryId);
      return entries.length > 0 ? [{ ...item, entries }] : [];
    }));
  };

  const removeItem = (exerciseId: string) => updateItems(workout.items.filter((item) => item.exerciseId !== exerciseId));

  const applyTemplate = (template: WorkoutTemplate) => {
    if (staleWorkout) return;
    const existingIds = new Set(workout.items.map((item) => item.exerciseId));
    const additions: WorkoutItem[] = template.items.filter((item) => !existingIds.has(item.exerciseId)).map((item) => ({
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      bodyPart: item.bodyPart,
      tracking: item.tracking,
      restSeconds: item.restSeconds,
      entries: Array.from({ length: item.sets }, () => ({
        id: crypto.randomUUID(),
        weight: item.weight,
        reps: item.tracking === "reps" ? item.reps : null,
        durationSeconds: item.tracking === "time" ? item.durationSeconds : null,
        completed: false,
      })),
    }));
    if (additions.length > 0) updateItems([...workout.items, ...additions]);
  };

  const saveCurrentTemplate = async (name: string) => {
    const items: WorkoutTemplateItem[] = workout.items.map((item) => {
      const first = item.entries[0];
      return {
        exerciseId: item.exerciseId,
        exerciseName: item.exerciseName,
        bodyPart: item.bodyPart,
        tracking: item.tracking,
        restSeconds: item.restSeconds,
        sets: item.entries.length,
        weight: first?.weight ?? null,
        reps: item.tracking === "reps" ? first?.reps ?? 10 : null,
        durationSeconds: item.tracking === "time" ? first?.durationSeconds ?? 30 : null,
      };
    });
    await onSaveTemplate(name, items);
  };

  useEffect(() => {
    if (!basketOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const inertTargets = [...document.querySelectorAll<HTMLElement>(".site-header, .guide-page > :not(.workout-basket), .site-footer, .mobile-nav")];
    inertTargets.forEach((element) => { element.inert = true; });
    document.body.classList.add("basket-open");
    basketCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setBasketOpen(false);
      trapTabKey(event, basketRef.current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("basket-open");
      inertTargets.forEach((element) => { element.inert = false; });
      previousFocus?.focus();
    };
  }, [basketOpen]);

  return (
    <main className="guide-page">
      <aside className="guide-filters" aria-label="動作篩選">
        <section>
          <h2>部位</h2>
          <div className="filter-list">
            {bodyParts.map((option) => <button key={option} className={bodyPart === option ? "filter-button filter-button--active" : "filter-button"} onClick={() => setBodyPart(option)}>{option}</button>)}
          </div>
        </section>
        <section>
          <div className="equipment-filter-heading"><h2>器材</h2><span>看圖挑選</span></div>
          <div className="equipment-visual-grid">
            {equipmentOptions.map((option) => (
              <button key={option} className={equipment === option ? "equipment-card equipment-card--active" : "equipment-card"} onClick={() => setEquipment(option)}>
                <EquipmentIcon equipment={option} size={38} />
                <span>{option}</span>
                <small>{contextualEquipmentCounts.get(option)} 動作</small>
              </button>
            ))}
          </div>
        </section>
      </aside>

      <section className="exercise-browser">
        <div className="exercise-browser__heading"><div><span className="eyebrow">YOU LIAN / MOVE LIBRARY</span><h1>今天想練哪裡？</h1></div><button onClick={() => setLibraryOpen(true)}><LibraryBig size={18} />課表與進度{dataLoading ? <i /> : null}</button></div>
        <label className="exercise-search"><Search size={19} /><input aria-label="搜尋動作、部位或器材" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋動作、部位或器材" /></label>
        <div className="mobile-filter-row" aria-label="行動版動作篩選">
          <select aria-label="部位" value={bodyPart} onChange={(event) => setBodyPart(event.target.value as "全部" | BodyPart)}>{bodyParts.map((option) => <option key={option}>{option}</option>)}</select>
          <span>{filtered.length} 個符合動作</span>
        </div>
        <div className="compact-equipment-strip" aria-label="以器材篩選動作">
          {equipmentOptions.map((option) => (
            <button key={option} className={equipment === option ? "equipment-card equipment-card--active" : "equipment-card"} onClick={() => setEquipment(option)}>
              <EquipmentIcon equipment={option} size={34} />
              <span>{option}</span>
              <small>{contextualEquipmentCounts.get(option)}</small>
            </button>
          ))}
        </div>
        <div className="exercise-list" aria-live="polite">
          {filtered.length > 0 ? filtered.map((exercise) => {
            const inWorkout = workout.items.some((item) => item.exerciseId === exercise.id);
            return (
              <button key={exercise.id} className={selected?.id === exercise.id ? "exercise-list-row exercise-list-row--active" : "exercise-list-row"} onClick={() => setSelectedId(exercise.id)}>
                <span className="exercise-list-row__icon"><EquipmentIcon equipment={exercise.equipment} size={27} /></span>
                <span><strong>{exercise.name}</strong><small>{exercise.bodyParts.join(" · ")} / {exercise.equipment}</small></span>
                {inWorkout ? <Check size={18} /> : <ChevronRight size={20} />}
              </button>
            );
          }) : <p className="exercise-list__empty">沒有符合的動作，換個部位或器材看看。</p>}
        </div>
      </section>

      {selected ? <article className="exercise-detail">
        <header>
          <div><h2>{selected.name}</h2><p>{selected.bodyParts.join(" · ")} / {selected.equipment} / {selected.difficulty}</p></div>
          <span>{activeItem ? `${completedCount(activeItem)} / ${activeItem.entries.length} 組完成` : "尚未加入訓練"}</span>
        </header>

        <section className="exercise-video" aria-label={`${selected.name} 示範影片`}>
          <div className="exercise-video__frame">
            {videoActive ? <iframe
                key={selected.video.embedUrl}
                src={`${selected.video.embedUrl}${selected.video.embedUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title={`${selected.name}｜${selected.video.title}`}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              /> : <button className="exercise-video__poster" onClick={() => setVideoActive(true)} aria-label={`播放 ${selected.name} 示範影片`}>
                {youtubeThumbnail(selected.video.embedUrl) ? <img src={youtubeThumbnail(selected.video.embedUrl) ?? ""} alt="" loading="lazy" /> : null}
                <span><Play size={26} fill="currentColor" />播放示範</span>
              </button>}
          </div>
          <div className="exercise-video__credit">
            <span><strong>{selected.video.language}示範</strong>{selected.video.title} · {selected.video.channel}</span>
            <a href={selected.video.watchUrl} target="_blank" rel="noreferrer">在 YouTube 開啟<ExternalLink size={14} /></a>
          </div>
        </section>

        <div className="exercise-copy-grid">
          <section><h3>教學</h3><ol>{selected.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol></section>
          <section><h3>動作重點</h3><ul>{selected.cues.map((cue) => <li key={cue}><Check size={16} />{cue}</li>)}</ul></section>
          <section className="recommendation"><h3>建議訓練</h3><p><strong>{selected.recommendation.sets} 組</strong> × <strong>{selected.tracking === "time" ? `${selected.recommendation.durationSeconds} 秒` : `${selected.recommendation.reps} 次`}</strong></p><p>組間休息 {selected.recommendation.restSeconds} 秒</p><small>{selected.recommendation.load}</small></section>
          {suggestion ? <section className="progress-suggestion"><h3>依你的紀錄</h3><strong>{suggestion.title}</strong><p>{suggestion.detail}</p><small>{suggestion.meta}</small></section> : null}
        </div>

        <section className="set-logger">
          <div className="set-logger__title"><h3>逐組紀錄</h3>{!activeItem ? <button onClick={startExercise}><Plus size={18} />開始記錄</button> : null}</div>
          {activeItem ? (
            <>
              <div className="set-table">
                <div className="set-table__head"><span>組別</span><span>重量 KG</span><span>{selected.tracking === "time" ? "時間 秒" : "次數"}</span><span>狀態</span><span /></div>
                {activeItem.entries.map((entry, index) => (
                  <div className={`set-row${entry.completed ? " set-row--complete" : ""}`} key={entry.id}>
                    <strong className="set-row__number">第 {index + 1} 組</strong>
                    <label><span>重量 KG</span><input aria-label={`第 ${index + 1} 組重量`} inputMode="decimal" type="number" min="0" step="0.5" placeholder={selected.equipment === "徒手" ? "—" : "0"} value={entry.weight ?? ""} onChange={(event) => updateEntry(entry.id, { weight: numberOrNull(event.target.value) })} /></label>
                    <label><span>{selected.tracking === "time" ? "時間 秒" : "次數"}</span><input aria-label={`第 ${index + 1} 組${selected.tracking === "time" ? "時間" : "次數"}`} inputMode="numeric" type="number" min="0" value={selected.tracking === "time" ? entry.durationSeconds ?? "" : entry.reps ?? ""} onChange={(event) => updateEntry(entry.id, selected.tracking === "time" ? { durationSeconds: numberOrNull(event.target.value) } : { reps: numberOrNull(event.target.value) })} /></label>
                    <button className="set-complete-button" onClick={() => completeEntry(entry)}>{entry.completed ? <Check size={17} /> : null}{entry.completed ? "已完成" : "完成這組"}</button>
                    <button className="set-delete-button" onClick={() => removeEntry(entry.id)} aria-label={`刪除第 ${index + 1} 組`}><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
              <button className="add-set-button" onClick={addSet}><Plus size={19} />新增一組</button>
            </>
          ) : <p className="set-logger__empty">按「開始記錄」建立第一組；完成一組後會自動開始休息倒數。</p>}
        </section>

        {timer ? <RestTimer seconds={timer.seconds} timerKey={timer.key} deadline={timer.deadline} onClose={() => setTimer(null)} /> : null}

        <div className="exercise-source">
          <span>內容為中文摘要，器材依場館機型調整；請以原始資料為準。</span>
          <div>
            <a href={selected.video.watchUrl} target="_blank" rel="noreferrer">影片：{selected.video.channel}<ExternalLink size={14} /></a>
            <a href={selected.sourceUrl} target="_blank" rel="noreferrer">文字：{selected.sourceLabel}<ExternalLink size={14} /></a>
          </div>
        </div>
        <p className="safety-note"><CircleAlert size={18} />疼痛或不適請停止，必要時諮詢專業人員。</p>
      </article> : <article className="exercise-detail exercise-detail--empty">
        <Search size={28} />
        <h2>找不到符合的動作</h2>
        <p>清除搜尋或切換篩選條件，再選一個動作開始。</p>
        <button onClick={() => { setQuery(""); setBodyPart("全部"); setEquipment("全部"); }}>顯示全部動作</button>
      </article>}

      <aside ref={basketRef} className={`workout-basket${basketOpen ? " workout-basket--open" : ""}`} aria-label="今天的訓練" role={basketOpen ? "dialog" : undefined} aria-modal={basketOpen ? "true" : undefined} tabIndex={basketOpen ? -1 : undefined}>
        <div className="workout-basket__head"><div><h2>{staleWorkout ? "尚未完成的訓練" : "今天的訓練"}</h2><p>{workout.items.length} 個動作 · {completedSets} / {totalSets} 組完成</p></div><button ref={basketCloseRef} className="workout-basket__close" onClick={() => setBasketOpen(false)} aria-label="關閉訓練籃"><X size={22} /></button></div>
        {staleWorkout ? <div className="workout-basket__stale"><CircleAlert size={18} /><span>這是 {formatSelectedDate(workout.workoutDate)} 的訓練。請先完成前次打卡，或清空後開始今天。</span></div> : null}
        <div className="workout-basket__items">
          {workout.items.length > 0 ? workout.items.map((item) => (
            <div key={item.exerciseId} className="basket-item">
              <button onClick={() => { setSelectedId(item.exerciseId); setBasketOpen(false); }}>
                <span><strong>{item.exerciseName}</strong><small>{completedCount(item)} / {item.entries.length} 組完成</small></span>
                <ChevronRight size={18} />
              </button>
              <button aria-label={`移除 ${item.exerciseName}`} onClick={() => removeItem(item.exerciseId)}><Trash2 size={16} /></button>
            </div>
          )) : <p>還沒有動作。選一個動作開始記錄，它就會留在這裡。</p>}
        </div>
        <button className="basket-checkout" disabled={completedSets === 0} onClick={onCheckout}>{staleWorkout ? "完成前次打卡" : "帶入今天打卡"}<ChevronRight size={20} /></button>
        {workout.items.length > 0 && completedSets === 0 ? <small>至少完成一組後即可帶入。</small> : null}
      </aside>

      {workout.items.length > 0 ? (
        <button className="mobile-basket-bar" onClick={() => setBasketOpen(true)}>
          <ShoppingBasket size={22} /><span>{staleWorkout ? "尚未完成" : "今天的訓練"} · {workout.items.length} 動作 · {completedSets} 組</span><ChevronRight size={20} />
        </button>
      ) : null}
      {libraryOpen ? <TrainingLibraryDialog templates={allTemplates} history={history} workout={workout} onApply={applyTemplate} onSave={saveCurrentTemplate} onDelete={onDeleteTemplate} onClose={closeLibrary} /> : null}
    </main>
  );
}
