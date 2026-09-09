import { Camera, Check, ChevronRight, ImageIcon, Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CheckinDraft, CheckinMode, Exercise } from "../types";
import { formatSelectedDate } from "../lib/date";
import { optimizeCheckinPhoto } from "../lib/image";
import { lockAppForModal, trapTabKey } from "../lib/modal";

type CheckinDrawerProps = {
  date: string;
  prefill?: CheckinDraft | null;
  onClose: () => void;
  onSave: (draft: CheckinDraft, photo: File | null) => Promise<void>;
  localOnly?: boolean;
};

const options: Array<{ mode: CheckinMode; index: number; title: string; description: string }> = [
  { mode: "quick", index: 1, title: "快速打卡", description: "一鍵留下今天有練" },
  { mode: "standard", index: 2, title: "一般紀錄", description: "類型、時長、心得與照片" },
  { mode: "detailed", index: 3, title: "完整訓練", description: "動作、組數、重量與次數" },
];

const emptyExercise: Exercise = { name: "", sets: 3, weight: 0, reps: 10 };
const DRAFT_KEY = "you-lian:checkin-draft:v1";

function readDraft(date: string, prefill: CheckinDraft | null | undefined): CheckinDraft {
  if (prefill) return prefill;
  try {
    const parsed = JSON.parse(localStorage.getItem(DRAFT_KEY) ?? "null") as CheckinDraft | null;
    if (parsed?.date === date && ["quick", "standard", "detailed"].includes(parsed.mode) && Array.isArray(parsed.exercises)) return parsed;
  } catch {
    // A malformed local draft should never block check-in.
  }
  return { date, mode: "quick", workoutType: null, durationMinutes: null, note: null, exercises: [{ ...emptyExercise }] };
}

function inRange(value: number, min: number, max: number): boolean {
  return Number.isFinite(value) && value >= min && value <= max;
}

export function CheckinDrawer({ date, prefill, onClose, onSave, localOnly = false }: CheckinDrawerProps) {
  const initial = useRef(readDraft(date, prefill)).current;
  const [mode, setMode] = useState<CheckinMode>(initial.mode);
  const [workoutType, setWorkoutType] = useState(initial.workoutType ?? "");
  const [duration, setDuration] = useState(initial.durationMinutes?.toString() ?? "");
  const [note, setNote] = useState(initial.note ?? "");
  const [exercises, setExercises] = useState<Exercise[]>(initial.exercises.length ? initial.exercises : [{ ...emptyExercise }]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [optimizingPhoto, setOptimizingPhoto] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const unlock = lockAppForModal();
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
      trapTabKey(event, dialogRef.current);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      unlock();
      previousFocusRef.current?.focus();
    };
  }, []);

  useEffect(() => {
    if (prefill) return;
    const durationMinutes = duration === "" ? null : Number(duration);
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ date, mode, workoutType: workoutType.trim() || null, durationMinutes, note: note.trim() || null, exercises } satisfies CheckinDraft));
  }, [date, duration, exercises, mode, note, prefill, workoutType]);

  useEffect(() => {
    if (!photo) {
      setPhotoPreview(null);
      return;
    }
    const url = URL.createObjectURL(photo);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const updateExercise = (index: number, key: "name" | "sets" | "weight" | "reps", value: string) => {
    setExercises((current) => current.map((exercise, exerciseIndex) => exerciseIndex === index ? { ...exercise, [key]: key === "name" ? value : Number(value) } : exercise));
  };

  const choosePhoto = async (file: File | null) => {
    if (!file) return;
    if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
      setError("照片必須是 JPEG、PNG 或 WebP。");
      return;
    }
    setOptimizingPhoto(true);
    setError(null);
    const optimized = await optimizeCheckinPhoto(file);
    setPhoto(optimized);
    setOptimizingPhoto(false);
  };

  const submit = async () => {
    const durationValue = duration === "" ? null : Number(duration);
    if (mode !== "quick" && durationValue !== null && !inRange(durationValue, 1, 1440)) {
      setError("訓練時長請填 1～1440 分鐘。");
      return;
    }
    if (photo && photo.size > 5_000_000) {
      setError("照片壓縮後仍超過 5 MB，請改選另一張照片。");
      return;
    }
    const cleanExercises = mode === "detailed" ? exercises.filter((exercise) => exercise.name.trim()) : [];
    if (mode === "detailed" && cleanExercises.length === 0) {
      setError("完整訓練至少需要一個動作名稱。");
      return;
    }
    if (cleanExercises.some((exercise) => !inRange(exercise.sets, 1, 100) || !inRange(exercise.weight, 0, 1000) || !inRange(exercise.reps, 1, 1000))) {
      setError("請檢查組數、重量與次數；欄位不能留空或超出範圍。");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSave({ date, mode, workoutType: mode === "quick" ? null : workoutType.trim() || null, durationMinutes: mode === "quick" ? null : durationValue, note: mode === "quick" ? null : note.trim() || null, exercises: cleanExercises }, mode === "quick" ? null : photo);
      localStorage.removeItem(DRAFT_KEY);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "儲存失敗，請稍後再試。";
      setError(message === "Invalid check-in" ? "資料格式不正確，請檢查時長與訓練欄位。" : message);
    } finally {
      setSaving(false);
    }
  };

  return createPortal(
    <div className="drawer-layer" role="presentation">
      <button className="drawer-scrim" onClick={onClose} aria-label="關閉打卡視窗" />
      <aside ref={dialogRef} className="checkin-drawer" role="dialog" aria-modal="true" aria-labelledby="checkin-title" tabIndex={-1}>
        <form onSubmit={(event) => { event.preventDefault(); void submit(); }}>
          <header className="drawer-header">
            <div><h2 id="checkin-title">今天練了什麼？</h2><p>{formatSelectedDate(date)}</p></div>
            <button ref={closeRef} type="button" className="icon-button icon-button--plain" onClick={onClose} aria-label="關閉"><X size={28} /></button>
          </header>

          <div className="mode-list" role="radiogroup" aria-label="打卡深度">
            {options.map((option) => (
              <button type="button" className={`mode-row${mode === option.mode ? " mode-row--selected" : ""}`} key={option.mode} onClick={() => setMode(option.mode)} role="radio" aria-checked={mode === option.mode}>
                <span className="mode-row__index">{option.index}</span><strong>{option.title}</strong><span>{option.description}</span>{mode === option.mode ? <Check size={20} strokeWidth={2.6} /> : <ChevronRight size={20} />}
              </button>
            ))}
          </div>

          {mode === "quick" ? (
            <div className="quick-state"><span className="quick-state__mark"><Check size={28} strokeWidth={3} /></span><div><strong>今天有練，就值得留下。</strong><p>不需要填內容，按下完成即可。</p></div></div>
          ) : (
            <div className="drawer-form">
              <div className="form-grid">
                <label className="field"><span>{mode === "detailed" ? "訓練名稱" : "訓練類型"}</span><input value={workoutType} onChange={(event) => setWorkoutType(event.target.value)} placeholder={mode === "detailed" ? "例如：下肢訓練" : "例如：重訓、跑步"} maxLength={40} /></label>
                <label className="field field--duration"><span>訓練時長</span><span className="duration-input"><input type="number" inputMode="numeric" min="1" max="1440" value={duration} onChange={(event) => setDuration(event.target.value)} placeholder="60" /><em>分鐘</em></span></label>
              </div>

              {mode === "detailed" ? (
                <div className="exercise-editor">
                  {exercises.map((exercise, index) => (
                    <fieldset className="exercise-entry-card" key={`exercise-${index}`}>
                      <legend>動作 {index + 1}</legend>
                      <label className="exercise-entry-card__name"><span>動作名稱</span><input value={exercise.name} onChange={(event) => updateExercise(index, "name", event.target.value)} placeholder="深蹲" maxLength={50} /></label>
                      <label><span>組數</span><input type="number" inputMode="numeric" min="1" max="100" value={exercise.sets} onChange={(event) => updateExercise(index, "sets", event.target.value)} /></label>
                      <label><span>重量 kg</span><input type="number" inputMode="decimal" min="0" max="1000" step="0.5" value={exercise.weight} onChange={(event) => updateExercise(index, "weight", event.target.value)} /></label>
                      <label><span>次數</span><input type="number" inputMode="numeric" min="1" max="1000" value={exercise.reps} onChange={(event) => updateExercise(index, "reps", event.target.value)} /></label>
                      <button type="button" className="exercise-entry-card__remove" onClick={() => setExercises((current) => current.filter((_, exerciseIndex) => exerciseIndex !== index))} aria-label={`移除第 ${index + 1} 個動作`}><Trash2 size={17} /><span>移除</span></button>
                      {exercise.entries?.length ? <p className="exercise-row__entries">逐組紀錄：{exercise.entries.map((entry, entryIndex) => entry.durationSeconds ? `第 ${entryIndex + 1} 組 ${entry.durationSeconds} 秒` : `第 ${entryIndex + 1} 組 ${entry.weight ?? 0} kg × ${entry.reps ?? 0} 次`).join(" · ")}</p> : null}
                    </fieldset>
                  ))}
                  <button type="button" className="add-exercise" onClick={() => setExercises((current) => [...current, { ...emptyExercise }])}><Plus size={18} />新增動作</button>
                </div>
              ) : null}

              <label className="field"><span>心得（選填）</span><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="今天的狀態如何？" maxLength={200} rows={3} /><small>{note.length} / 200</small></label>

              <div className="photo-field">
                {photoPreview ? <div className="photo-preview"><img src={photoPreview} alt="準備上傳的訓練照片預覽" /><button type="button" onClick={() => setPhoto(null)} aria-label="移除照片"><X size={18} /></button></div> : null}
                <label className="photo-input"><Camera size={20} /><span>{optimizingPhoto ? "正在壓縮照片…" : photo ? `${photo.name} · ${Math.ceil(photo.size / 1024)} KB` : "拍照或選擇訓練照片（選填）"}</span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={optimizingPhoto} onChange={(event) => void choosePhoto(event.target.files?.[0] ?? null)} /></label>
                {!photoPreview ? <span className="photo-field__hint"><ImageIcon size={15} />會自動縮圖，照片上限 5 MB</span> : null}
              </div>
            </div>
          )}

          <div className="visibility-row"><span className="discord-symbol" aria-hidden="true">●●</span><span>{localOnly ? "只保存在這個瀏覽器" : "只顯示給「今天有練」伺服器成員"}</span></div>
          {error ? <p className="form-error" role="alert">{error}</p> : null}
          <footer className="drawer-actions"><button type="button" className="secondary-button" onClick={onClose}>取消</button><button type="submit" className="primary-button" disabled={saving || optimizingPhoto}>{saving ? "儲存中…" : "完成打卡"}</button></footer>
        </form>
      </aside>
    </div>,
    document.body,
  );
}
