import {
  ArrowLeft,
  BookOpen,
  SlidersHorizontal,
  Check,
  ChevronRight,
  CircleAlert,
  LibraryBig,
  ExternalLink,
  Play,
  Plus,
  Search,
  Star,
  ShoppingBasket,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatSelectedDate, todayKey } from "../lib/date";
import { bodyParts, equipmentOptions, exercises } from "../data/exercises";
import { builtInWorkoutTemplates, preparationRoutines } from "../data/workoutTemplates";
import { progressSuggestion } from "../lib/progress";
import { addTemplate, itemKey, phaseLabels, templateItems } from "../lib/workoutPlan";
import type { BodyPart, Checkin, CustomExercise, Equipment, ExerciseSetEntry, GuideExercise, WorkoutDraft, WorkoutItem, WorkoutTemplate, WorkoutTemplateItem } from "../types";
import { EquipmentIcon } from "./EquipmentIcon";
import { ExerciseDiagram } from "./ExerciseDiagram";
import { WorkoutSetEditor } from "./WorkoutSetEditor";
import { RestTimer } from "./RestTimer";
import { TrainingLibraryDialog } from "./TrainingLibraryDialog";
import { TrainingSheet } from "./TrainingSheet";
import { ExerciseGuideSheet } from "./ExerciseGuideSheet";
import { WorkoutPlanSheet } from "./WorkoutPlanSheet";
import { EquipmentGuidance } from "./EquipmentGuidance";
import { exerciseAliases, videoNeedsReview, videoFrameClass } from "../lib/exerciseGuidance";
import { loadMovementPreferences, saveMovementPreferences } from "../lib/movementPreferences";

type TrainingGuideProps = {
  storageScope: string;
  overview: import("../types").ProgressOverview | null;
  workout: WorkoutDraft;
  onWorkoutChange: (workout: WorkoutDraft) => void;
  onCheckout: () => void;
  templates: WorkoutTemplate[];
  history: Checkin[];
  dataLoading: boolean;
  onSaveTemplate: (name: string, items: WorkoutTemplateItem[]) => Promise<void>;
  onDeleteTemplate: (id: string) => Promise<void>;
  customExercises: CustomExercise[];
  onCreateCustomExercise: (input: Omit<CustomExercise, "id" | "createdAt">) => Promise<CustomExercise>;
};

type TimerState = { seconds: number; key: string; deadline: number; pausedRemaining?: number; kind?: "work" | "rest" } | null;

type GuideState = {
  selectedId: string;
  bodyPart: "全部" | BodyPart;
  equipment: "全部" | Equipment;
  query: string;
  timer: TimerState;
};

const GUIDE_STATE_KEY = "you-lian:guide-state:v1";

function loadGuideState(storageScope: string): GuideState {
  const fallback: GuideState = { selectedId: exercises[0].id, bodyPart: "全部", equipment: "全部", query: "", timer: null };
  try {
    const parsed = JSON.parse(localStorage.getItem(`${GUIDE_STATE_KEY}:${storageScope}`) ?? "null") as Partial<GuideState> | null;
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

export function TrainingGuide({ storageScope, workout, templates, history, overview, dataLoading, customExercises, onCreateCustomExercise, onWorkoutChange, onCheckout, onSaveTemplate, onDeleteTemplate }: TrainingGuideProps) {
  const [initialGuideState] = useState(() => loadGuideState(storageScope));
  const [selectedId, setSelectedId] = useState(initialGuideState.selectedId);
  const [bodyPart, setBodyPart] = useState<"全部" | BodyPart>(initialGuideState.bodyPart);
  const [equipment, setEquipment] = useState<"全部" | Equipment>(initialGuideState.equipment);
  const [query, setQuery] = useState(initialGuideState.query);
  const [timer, setTimer] = useState<TimerState>(initialGuideState.timer);
  const [basketOpen, setBasketOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [trainingMode, setTrainingMode] = useState(false);
  const [trainingId, setTrainingId] = useState<string | null>(null);
  const [guideId, setGuideId] = useState<string | null>(null);
  const [equipmentOpen, setEquipmentOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [movementPreferences, setMovementPreferences] = useState(() => loadMovementPreferences(storageScope));
  const [movementCollection, setMovementCollection] = useState<"all" | "favorites" | "recent">("all");
  const rememberMovement = (id: string) => updateMovementPreferences({ ...movementPreferences, recent: [id, ...movementPreferences.recent.filter(value => value !== id)].slice(0, 8) });
  const updateMovementPreferences = (next: typeof movementPreferences) => {
    try { saveMovementPreferences(storageScope, next); setMovementPreferences(next); }
    catch { setNotice("瀏覽器空間不足，動作收藏未保存。"); }
  };
  const [clock, setClock] = useState(Date.now());
  const [undoItems, setUndoItems] = useState<WorkoutItem[] | null>(null);
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customBodyPart, setCustomBodyPart] = useState<BodyPart>("胸");
  const [customTracking, setCustomTracking] = useState<"reps" | "time">("reps");
  const [customBusy, setCustomBusy] = useState(false);
  const [customError, setCustomError] = useState("");
  const closeLibrary = useCallback(() => setLibraryOpen(false), []);

  useEffect(() => {
    localStorage.setItem(`${GUIDE_STATE_KEY}:${storageScope}`, JSON.stringify({ selectedId, bodyPart, equipment, query, timer } satisfies GuideState));
  }, [bodyPart, equipment, query, selectedId, timer, storageScope]);

  useEffect(() => setVideoActive(false), [selectedId]);

  useEffect(() => {
    if (workout.items.length === 0) { setTimer(null); setTrainingMode(false); }
  }, [workout.items.length]);

  useEffect(() => {
    document.body.classList.toggle("training-mode-open", trainingMode);
    return () => document.body.classList.remove("training-mode-open");
  }, [trainingMode]);
  useEffect(() => {
    if (!trainingMode) return;
    const interval = window.setInterval(() => setClock(Date.now()), 15000);
    return () => window.clearInterval(interval);
  }, [trainingMode]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-Hant");
    return exercises.filter((exercise) => {
      const matchesBody = bodyPart === "全部" || exercise.bodyParts.includes(bodyPart);
      const matchesEquipment = equipment === "全部" || exercise.equipment === equipment || equipment === "徒手" && exercise.equipment === "瑜珈墊";
      const matchesQuery = !needle || `${exercise.name} ${exercise.equipment} ${exercise.bodyParts.join(" ")}`.toLocaleLowerCase("zh-Hant").includes(needle);
      const matchesCollection = movementCollection === "all" || movementPreferences[movementCollection].includes(exercise.id);
      return !exerciseAliases[exercise.id] && matchesBody && matchesEquipment && matchesQuery && matchesCollection;
    });
  }, [bodyPart, equipment, query, movementCollection, movementPreferences]);

  const contextualEquipmentCounts = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("zh-Hant");
    const candidates = exercises.filter((exercise) => {
      const matchesBody = bodyPart === "全部" || exercise.bodyParts.includes(bodyPart);
      const matchesQuery = !needle || `${exercise.name} ${exercise.equipment} ${exercise.bodyParts.join(" ")}`.toLocaleLowerCase("zh-Hant").includes(needle);
      return !exerciseAliases[exercise.id] && matchesBody && matchesQuery;
    });
    return new Map(equipmentOptions.map((option) => [option, option === "全部" ? candidates.length : candidates.filter((exercise) => exercise.equipment === option || option === "徒手" && exercise.equipment === "瑜珈墊").length]));
  }, [bodyPart, query]);

  const selected = filtered.find((exercise) => exercise.id === selectedId) ?? filtered[0] ?? null;
  const activeItem = selected ? workout.items.find((item) => item.exerciseId === selected.id) ?? null : null;
  const totalSets = workout.items.reduce((total, item) => total + item.entries.length, 0);
  const completedSets = workout.items.reduce((total, item) => total + completedCount(item), 0);
  const staleWorkout = workout.items.length > 0 && workout.workoutDate !== todayKey();
  const suggestion = useMemo(() => selected ? progressSuggestion(selected, history) : null, [history, selected]);
  const allTemplates = useMemo(() => [...builtInWorkoutTemplates, ...preparationRoutines, ...templates], [templates]);
  const currentItem = workout.items.find(item => itemKey(item) === trainingId) ?? workout.items.find((item) => item.entries.some((entry) => !entry.completed)) ?? workout.items[0] ?? null;
  const currentEntry = currentItem?.entries.find((entry) => !entry.completed) ?? currentItem?.entries.at(-1) ?? null;
  const currentItemIndex = currentItem ? workout.items.findIndex(item => itemKey(item) === itemKey(currentItem)) : -1;
  const updateTimerState = (state: { deadline: number; pausedRemaining?: number }) => setTimer(previous => previous ? { ...previous, pausedRemaining: undefined, ...state } : null);

  const updateItems = (items: WorkoutItem[]) => {
    if (items.length > 20) { setNotice("單次課表最多 20 個動作，請先儲存已完成內容再加入。"); return; }
    setNotice("");
    setUndoItems(null);
    onWorkoutChange({ ...workout, items, updatedAt: new Date().toISOString() });
  };

  const updateTrainingEntry = (id: string, patch: Partial<ExerciseSetEntry>) => {
    if (!currentItem || staleWorkout) return;
    updateItems(workout.items.map(item => itemKey(item) === itemKey(currentItem)
      ? { ...item, entries: item.entries.map(entry => {
        if (entry.id !== id) return entry;
        const next = { ...entry, ...patch };
        const value = item.tracking === "time" ? next.durationSeconds : next.reps;
        if (value == null || !Number.isInteger(value) || value <= 0 || value > (item.tracking === "time" ? 86400 : 1000) || next.weight != null && (!Number.isFinite(next.weight) || next.weight < 0 || next.weight > 1000)) next.completed = false;
        return next;
      }) } : item));
  };
  const completeTrainingEntry = (entry: ExerciseSetEntry) => {
    if (!currentItem || staleWorkout) return;
    updateTrainingEntry(entry.id, { completed: !entry.completed });
    if (!entry.completed) setTimer({ seconds: currentItem.restSeconds, key: `${entry.id}-${Date.now()}`, deadline: Date.now() + currentItem.restSeconds * 1000 });
  };

  const createCustomExercise = async () => {
    const name = customName.trim();
    if (!name || staleWorkout || customBusy) return;
    setCustomBusy(true);
    setCustomError("");
    try {
    const custom = await onCreateCustomExercise({ name, bodyPart: customBodyPart, tracking: customTracking, restSeconds: 60 });
    updateItems([...workout.items, {
      exerciseId: custom.id, exerciseName: custom.name, bodyPart: custom.bodyPart, tracking: custom.tracking,
      restSeconds: custom.restSeconds, custom: true,
      entries: [{ id: crypto.randomUUID(), weight: null, reps: custom.tracking === "reps" ? 10 : null, durationSeconds: custom.tracking === "time" ? 30 : null, completed: false }],
    }]);
    setCustomName("");
    setCustomOpen(false);
    setBasketOpen(true);
    } catch {
      setCustomError("無法儲存自訂動作，請稍後再試。輸入內容已保留。");
    } finally {
      setCustomBusy(false);
    }
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

  const addExercise = (exercise: GuideExercise) => {
    if (staleWorkout || workout.items.some(item => item.exerciseId === exercise.id)) return;
    updateItems([...workout.items, { exerciseId: exercise.id, exerciseName: exercise.name, bodyPart: exercise.bodyParts[0], tracking: exercise.tracking, restSeconds: exercise.recommendation.restSeconds, entries: [makeEntry(exercise)] }]);
    setNotice(`已加入 ${exercise.name}`);
  };
  const openTraining = (id: string) => {
    if (!workout.trainingStartedAt) onWorkoutChange({ ...workout, trainingStartedAt: new Date().toISOString() });
    setTrainingId(id); setBasketOpen(false); setTrainingMode(true);
  };

  const updateEntry = (entryId: string, patch: Partial<ExerciseSetEntry>) => {
    if (!selected || staleWorkout) return;
    updateItems(workout.items.map((item) => activeItem && itemKey(item) === itemKey(activeItem)
      ? { ...item, entries: item.entries.map((entry) => {
        if (entry.id !== entryId) return entry;
        const next = { ...entry, ...patch }; const value = item.tracking === "time" ? next.durationSeconds : next.reps;
        if (value == null || !Number.isInteger(value) || value <= 0 || value > (item.tracking === "time" ? 86400 : 1000) || next.weight != null && (!Number.isFinite(next.weight) || next.weight < 0 || next.weight > 1000)) next.completed = false;
        return next;
      }) }
      : item));
  };

  const completeEntry = (entry: ExerciseSetEntry) => {
    if (!selected || staleWorkout) return;
    const completed = !entry.completed;
    const value = selected.tracking === "time" ? entry.durationSeconds : entry.reps;
    if (completed && (value == null || !Number.isInteger(value) || value <= 0)) { setNotice("請填入大於 0 的整數次數或秒數。"); return; }
    updateEntry(entry.id, { completed });
    if (completed) setTimer({ seconds: activeItem?.restSeconds ?? selected.recommendation.restSeconds, key: `${entry.id}-${Date.now()}`, deadline: Date.now() + (activeItem?.restSeconds ?? selected.recommendation.restSeconds) * 1000 });
  };

  const addSet = () => {
    if (!selected || staleWorkout) return;
    if (!activeItem) {
      startExercise();
      return;
    }
    if (activeItem.entries.length >= 20) return;
    const previous = activeItem.entries.at(-1);
    updateItems(workout.items.map((item) => activeItem && itemKey(item) === itemKey(activeItem)
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
    setUndoItems(workout.items);
  };

  const removeItem = (id: string) => { updateItems(workout.items.filter(item => itemKey(item) !== id)); setUndoItems(workout.items); };
  const removeTrainingEntry = (id: string) => {
    updateItems(workout.items.map(item => ({ ...item, entries: item.entries.filter(entry => entry.id !== id) })).filter(item => item.entries.length > 0));
    setUndoItems(workout.items);
  };
  const undo = undoItems ? <button className="plan-add" onClick={() => updateItems(undoItems)}>復原剛才刪除的內容</button> : null;

  const applyTemplate = (template: WorkoutTemplate) => {
    if (staleWorkout) return;
    updateItems(addTemplate(workout, template));
    setLibraryOpen(false);
    setBasketOpen(true);
  };

  const saveCurrentTemplate = async (name: string) => {
    await onSaveTemplate(name, templateItems(workout));
  };

  const guideExercise = exercises.find(exercise => exercise.id === guideId);
  const overlays = <>
    {basketOpen ? <WorkoutPlanSheet workout={workout} stale={staleWorkout} onSave={saveCurrentTemplate} onClose={() => setBasketOpen(false)} onStart={openTraining} onGuide={setGuideId} onChange={next => { setUndoItems(null); onWorkoutChange(next); }} onBrowse={() => { setBasketOpen(false); setTrainingMode(false); }} onCheckout={() => { setBasketOpen(false); onCheckout(); }} /> : null}
    {guideExercise ? <ExerciseGuideSheet key={guideExercise.id} exercise={guideExercise} onClose={() => setGuideId(null)} added={workout.items.some(item => item.exerciseId === guideExercise.id)} onAdd={trainingMode || basketOpen ? undefined : () => addExercise(guideExercise)} /> : null}
  </>;

  if (trainingMode && currentItem && currentEntry) {
    const nextItem = workout.items[currentItemIndex + 1] ?? null;
    const elapsedMinutes = workout.trainingStartedAt ? Math.max(0, Math.floor((clock - new Date(workout.trainingStartedAt).getTime()) / 60000)) : 0;
    return <><main className="active-workout-page">
      <header className="active-workout-header"><button onClick={() => setTrainingMode(false)}><ArrowLeft size={21} />動作庫</button><strong>YOU LIAN</strong><button onClick={() => setBasketOpen(true)}>完整課表</button></header>
      <section className="active-workout-main">
        <div className="active-workout-title"><div><span>目前動作</span><h1>{currentItem.exerciseName}</h1><p>{currentItem.custom ? "自訂動作" : `${currentItem.bodyPart} · ${currentItem.tracking === "time" ? "計時" : "次數"}`}</p></div><strong>動作 {currentItemIndex + 1} / {workout.items.length}</strong></div>
        <div className="active-context-actions"><button onClick={() => setBasketOpen(true)}>查看完整課表 · {workout.items.length} 動作</button>{exercises.some(exercise => exercise.id === currentItem.exerciseId) ? <button onClick={() => setGuideId(currentItem.exerciseId)}><BookOpen size={17} />查看指引</button> : <span>自訂動作：尚無官方指引</span>}</div>
        <p className="training-context-note">{phaseLabels[currentItem.phase ?? "main"]}{currentItem.templateName ? ` · ${currentItem.templateName}` : ""}{currentItem.note ? <><br />{currentItem.note}</> : null}</p>
        <WorkoutSetEditor key={itemKey(currentItem)} item={currentItem} disabled={staleWorkout} onChange={updateTrainingEntry} onComplete={completeTrainingEntry} onRemove={removeTrainingEntry} onTimer={entry => setTimer({ seconds: entry.durationSeconds!, deadline: Date.now() + entry.durationSeconds! * 1000, key: `work-${entry.id}-${Date.now()}`, kind: "work" })} />
        {undo}
        {timer ? <RestTimer kind={timer.kind} seconds={timer.seconds} timerKey={timer.key} deadline={timer.deadline} pausedRemaining={timer.pausedRemaining} onStateChange={updateTimerState} onClose={() => setTimer(null)} /> : <div className="active-rest-placeholder"><span>休息倒數</span><strong>{Math.floor(currentItem.restSeconds / 60).toString().padStart(2, "0")}:{(currentItem.restSeconds % 60).toString().padStart(2, "0")}</strong><small>完成一組後自動開始</small></div>}
        <button className="add-set-button" disabled={staleWorkout || currentItem.entries.length >= 20} onClick={() => updateItems(workout.items.map(item => itemKey(item) === itemKey(currentItem) ? { ...item, entries: [...item.entries, { ...item.entries.at(-1)!, id: crypto.randomUUID(), completed: false }] } : item))}><Plus size={18} />新增一組</button>
        <section className="active-next"><span>下一個動作</span>{nextItem ? <button onClick={() => openTraining(itemKey(nextItem))}><strong>{nextItem.exerciseName}</strong><small>{phaseLabels[nextItem.phase ?? "main"]} · {nextItem.entries.length} 組 · {nextItem.tracking === "time" ? `${nextItem.entries[0]?.durationSeconds ?? 30} 秒` : `${nextItem.entries[0]?.reps ?? 10} 次`}</small><ChevronRight size={20} /></button> : <p>可從完整課表切換其他動作，或儲存已完成組數。</p>}</section>
      </section>
      <footer className="active-workout-bar"><span><small>已完成</small><strong>{completedSets} / {totalSets} 組</strong></span><span><small>開始後經過</small><strong>{elapsedMinutes} 分鐘</strong></span><button disabled={completedSets === 0} onClick={onCheckout}>儲存並打卡</button></footer>
    </main>{overlays}</>;
  }

  return (
    <main className="guide-page">
      <nav className="guide-workflow-actions" aria-label="訓練入口">
        <button onClick={() => setLibraryOpen(true)}><LibraryBig size={20} /><span><strong>選課表</strong><small>依目標挑選完整順序</small></span></button>
        <button onClick={() => { setMovementCollection("all"); document.querySelector<HTMLInputElement>(".exercise-search input")?.focus(); }}><Search size={20} /><span><strong>找動作</strong><small>搜尋、收藏與最近查看</small></span></button>
        <button disabled={!workout.items.length} onClick={() => setBasketOpen(true)}><ShoppingBasket size={20} /><span><strong>{workout.items.length ? "繼續訓練" : "今日課表"}</strong><small>{workout.items.length ? `${completedSets} / ${totalSets} 組完成 · 先查看課表` : "先加入想練的動作"}</small></span></button>
      </nav>
      {notice ? <p className="guide-inline-notice" role="status">{notice}<button onClick={() => setNotice("")}>關閉提示</button></p> : null}
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
        <div className="library-quick-actions"><button className="custom-exercise-button" onClick={() => setCustomOpen(true)}><Plus size={18} />自訂動作</button><button onClick={() => setBasketOpen(true)}>今日課表 · {workout.items.length}</button></div>
        <label className="exercise-search"><Search size={19} /><input aria-label="搜尋動作、部位或器材" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜尋動作、部位或器材" /></label>
        <div className="movement-collections" aria-label="動作集合">{([['all', '全部動作'], ['favorites', '收藏動作'], ['recent', '最近查看']] as const).map(([id, label]) => <button key={id} aria-pressed={movementCollection === id} onClick={() => setMovementCollection(id)}>{label}</button>)}</div>
        <div className="mobile-filter-row" aria-label="行動版動作篩選">
          <select aria-label="部位" value={bodyPart} onChange={(event) => setBodyPart(event.target.value as "全部" | BodyPart)}>{bodyParts.map((option) => <option key={option}>{option}</option>)}</select>
          <button onClick={() => setEquipmentOpen(true)}><SlidersHorizontal size={16} />{equipment === "全部" ? "器材" : equipment}</button><span>{filtered.length} 個動作</span>
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
              <div key={exercise.id} className={selected?.id === exercise.id ? "exercise-list-row exercise-list-row--active" : "exercise-list-row"}>
                <button className="exercise-row-guide" aria-label={`查看${exercise.name}指引`} onClick={() => { rememberMovement(exercise.id); setSelectedId(exercise.id); if (window.matchMedia("(max-width: 760px)").matches) setGuideId(exercise.id); }}><span className="exercise-list-row__icon"><EquipmentIcon equipment={exercise.equipment} size={22} /></span><span><strong>{exercise.name}</strong><small>{exercise.bodyParts.join(" · ")} / {exercise.equipment}</small></span></button>
                <button className="movement-favorite" aria-label={`收藏${exercise.name}`} aria-pressed={movementPreferences.favorites.includes(exercise.id)} onClick={() => updateMovementPreferences({ ...movementPreferences, favorites: movementPreferences.favorites.includes(exercise.id) ? movementPreferences.favorites.filter(id => id !== exercise.id) : [...movementPreferences.favorites, exercise.id] })}><Star size={17} fill={movementPreferences.favorites.includes(exercise.id) ? "currentColor" : "none"} /></button>
                <button className="exercise-row-add" aria-label={`${inWorkout ? "已加入" : "加入"}${exercise.name}`} disabled={inWorkout || staleWorkout} onClick={() => addExercise(exercise)}>{inWorkout ? <Check size={16} /> : <Plus size={16} />}{inWorkout ? "已加入" : "加入"}</button>
              </div>
            );
          }) : <p className="exercise-list__empty">沒有符合的動作，換個部位或器材看看。</p>}
        </div>
        {customExercises.length > 0 ? <div className="custom-exercise-list"><span>我的自訂動作</span>{customExercises.map((item) => <button key={item.id} disabled={staleWorkout} onClick={() => {
          if (!workout.items.some((workoutItem) => workoutItem.exerciseId === item.id)) updateItems([...workout.items, { exerciseId: item.id, exerciseName: item.name, bodyPart: item.bodyPart, tracking: item.tracking, restSeconds: item.restSeconds, custom: true, entries: [{ id: crypto.randomUUID(), weight: null, reps: item.tracking === "reps" ? 10 : null, durationSeconds: item.tracking === "time" ? 30 : null, completed: false }] }]);
          setBasketOpen(true);
        }}><strong>{item.name}</strong><small>{item.bodyPart} · {item.tracking === "time" ? "計時" : "次數"}</small><Plus size={16} /></button>)}</div> : null}
      </section>

      {selected ? <article className="exercise-detail">
        <header>
          <div><h2>{selected.name}</h2><p>{selected.bodyParts.join(" · ")} / {selected.equipment} / {selected.difficulty}</p></div>
          <span>{activeItem ? `${completedCount(activeItem)} / ${activeItem.entries.length} 組完成` : "尚未加入訓練"}</span>
        </header>
        <section className="movement-summary"><p>{selected.summary}</p><ul>{selected.cues.slice(0, 3).map(cue => <li key={cue}>{cue}</li>)}</ul><button className="primary-button" disabled={staleWorkout} onClick={() => { if (activeItem) openTraining(itemKey(activeItem)); else addExercise(selected); }}>{activeItem ? "前往訓練" : "加入今日課表"}</button></section>

        <ExerciseDiagram exercise={selected} />
        <EquipmentGuidance exercise={selected} />

        <section className="exercise-video" aria-label={`${selected.name} 示範影片`}>
          {videoNeedsReview(selected) ? <p className="video-review-notice">示範影片暫無提供，請先參考動作步驟與教學來源。</p> : <div className={videoFrameClass(selected)}>
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
          </div>}
          {!videoNeedsReview(selected) ? <div className="exercise-video__credit">
            <span><strong>{selected.video.language}示範</strong>{selected.video.title} · {selected.video.channel}</span>
            <a href={selected.video.watchUrl} target="_blank" rel="noreferrer">開啟原始影片<ExternalLink size={14} /></a>
          </div> : null}
        </section>

        <div className="exercise-copy-grid">
          <section><h3>教學</h3><ol>{selected.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}</ol></section>
          <section><h3>動作重點</h3><ul>{selected.cues.map((cue) => <li key={cue}><Check size={16} />{cue}</li>)}</ul></section>
          <section className="recommendation"><h3>單獨練習參考</h3><p><strong>{selected.recommendation.sets} 組</strong> × <strong>{selected.tracking === "time" ? `${selected.recommendation.durationSeconds} 秒` : `${selected.recommendation.reps} 次`}</strong></p><p>組間休息 {selected.recommendation.restSeconds} 秒</p><small>{selected.recommendation.load}</small><p>課表會依用途安排不同份量；本次以「今日課表」的組數、次數與時間為準，可按身體狀態減量。</p></section>
          {suggestion ? <section className="progress-suggestion"><h3>依你的紀錄</h3><strong>{suggestion.title}</strong><p>{suggestion.detail}</p><small>{suggestion.meta}</small></section> : null}
        </div>

        <section className="set-logger">
          <div className="set-logger__title"><h3>逐組紀錄</h3>{!activeItem ? <button onClick={startExercise}><Plus size={18} />開始記錄</button> : null}</div>
          {activeItem ? (
            <>
              <p className="training-context-note">{phaseLabels[activeItem.phase ?? "main"]}{activeItem.note ? ` · ${activeItem.note}` : ""}。同名動作有多個階段時，請由「今日課表」切換。</p>
              <WorkoutSetEditor key={itemKey(activeItem)} item={activeItem} disabled={staleWorkout} onChange={updateEntry} onComplete={completeEntry} onRemove={removeEntry} onTimer={entry => setTimer({ seconds: entry.durationSeconds!, deadline: Date.now() + entry.durationSeconds! * 1000, key: `work-${entry.id}-${Date.now()}`, kind: "work" })} />
              <button className="add-set-button" disabled={staleWorkout || activeItem.entries.length >= 20} onClick={addSet}><Plus size={19} />新增一組</button>
            </>
          ) : <p className="set-logger__empty">按「開始記錄」建立第一組；完成一組後會自動開始休息倒數。</p>}
        </section>

        {timer ? <RestTimer kind={timer.kind} seconds={timer.seconds} timerKey={timer.key} deadline={timer.deadline} pausedRemaining={timer.pausedRemaining} onStateChange={updateTimerState} onClose={() => setTimer(null)} /> : null}

        <div className="exercise-source">
          <span>內容為中文摘要，器材依場館機型調整；請以原始資料為準。</span>
          <div>
            {!videoNeedsReview(selected) ? <a href={selected.video.watchUrl} target="_blank" rel="noreferrer">影片：{selected.video.channel}<ExternalLink size={14} /></a> : null}
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

      <aside className="workout-basket" aria-label="今天的訓練">
        <div className="workout-basket__head"><div><h2>{staleWorkout ? "尚未完成的訓練" : "今天的訓練"}</h2><p>{workout.items.length} 個動作 · {completedSets} / {totalSets} 組完成</p></div></div>
        <button className="plan-add" onClick={() => setBasketOpen(true)}>查看完整課表</button>
        {staleWorkout ? <div className="workout-basket__stale"><CircleAlert size={18} /><span>這是 {formatSelectedDate(workout.workoutDate)} 的訓練。請先完成前次打卡，或清空後開始今天。</span></div> : null}
        <div className="workout-basket__items">
          {workout.items.length > 0 ? workout.items.map((item) => (
            <div key={itemKey(item)} className="basket-item">
              <button onClick={() => setBasketOpen(true)}>
                <span><strong>{item.exerciseName}</strong><small>{completedCount(item)} / {item.entries.length} 組完成</small></span>
                <ChevronRight size={18} />
              </button>
              <button aria-label={`移除 ${item.exerciseName}`} onClick={() => removeItem(itemKey(item))}><Trash2 size={16} /></button>
            </div>
          )) : <p>還沒有動作。選一個動作開始記錄，它就會留在這裡。</p>}
        </div>
        <button className="basket-checkout" disabled={completedSets === 0} onClick={onCheckout}>{staleWorkout ? "完成前次打卡" : "帶入今天打卡"}<ChevronRight size={20} /></button>
        {workout.items.length > 0 && completedSets === 0 ? <small>至少完成一組後即可帶入。</small> : null}
      </aside>

      {workout.items.length > 0 ? (
        <button className="mobile-basket-bar" onClick={() => setBasketOpen(true)}>
          <ShoppingBasket size={20} /><span>{staleWorkout ? "尚未完成" : "查看今日課表"} · {workout.items.length} 動作 · {completedSets} / {totalSets} 組</span><ChevronRight size={20} />
        </button>
      ) : null}
      {undo}
      {overlays}
      {equipmentOpen ? <TrainingSheet title="選擇器材" onClose={() => setEquipmentOpen(false)}><div className="training-sheet__body equipment-sheet-grid">{equipmentOptions.map(option => <button key={option} aria-pressed={equipment === option} onClick={() => { setEquipment(option); setEquipmentOpen(false); }}><EquipmentIcon equipment={option} size={28} /><span>{option}</span><small>{contextualEquipmentCounts.get(option)} 動作</small></button>)}</div></TrainingSheet> : null}
      {libraryOpen ? <TrainingLibraryDialog storageScope={storageScope} templates={allTemplates} history={history} overview={overview} workout={workout} onApply={applyTemplate} onDelete={onDeleteTemplate} onClose={closeLibrary} /> : null}
      {customOpen ? <TrainingSheet title="建立自訂動作" onClose={() => { if (!customBusy) setCustomOpen(false); }}>
        <form className="custom-exercise-dialog" onSubmit={(event) => { event.preventDefault(); void createCustomExercise(); }}>
          <label><span>動作名稱</span><input autoFocus required disabled={customBusy} value={customName} maxLength={50} onChange={(event) => setCustomName(event.target.value)} placeholder="例如：農夫走路" /></label>
          <div><label><span>主要部位</span><select disabled={customBusy} value={customBodyPart} onChange={(event) => setCustomBodyPart(event.target.value as BodyPart)}>{bodyParts.filter((item): item is BodyPart => item !== "全部").map((item) => <option key={item}>{item}</option>)}</select></label><label><span>紀錄方式</span><select disabled={customBusy} value={customTracking} onChange={(event) => setCustomTracking(event.target.value as "reps" | "time")}><option value="reps">次數</option><option value="time">時間</option></select></label></div>
          <p>自訂動作會保存在你的動作庫，並使用和其他動作相同的逐組紀錄。</p>
          {customError ? <p role="alert">{customError}</p> : null}
          <button className="primary-button" disabled={!customName.trim() || customBusy || staleWorkout}>{customBusy ? "儲存中…" : "加入今日訓練"}</button>
        </form>
      </TrainingSheet> : null}
    </main>
  );
}
