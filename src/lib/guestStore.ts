import type { Checkin, CheckinDraft, ReactionKind, ReactionSummary, User } from "../types";
import { validBackupCustom, validBackupExercise, validBackupTemplate, validBackupWorkout } from "./backupValidation";

const STORAGE_KEY = "rep-club:guest-checkins:v2";
const LEGACY_STORAGE_KEY = "rep-club:guest-checkins:v1";
export const GUEST_MODE_KEY = "rep-club:guest-mode";
const PHOTO_DB_NAME = "rep-club-guest-photos";
const PHOTO_STORE = "photos";

type StoredCheckin = Omit<Checkin, "photoUrl"> & { hasPhoto: boolean };
type StoredState = { version: 2; checkins: StoredCheckin[] };

export const guestUser: User = {
  id: "local-guest",
  username: "guest",
  displayName: "訪客",
  avatarUrl: null,
  demo: false,
};

function isStoredCheckin(value: unknown): value is StoredCheckin {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.date === "string" &&
    (item.mode === "quick" || item.mode === "standard" || item.mode === "detailed") &&
    typeof item.hasPhoto === "boolean" &&
    typeof item.createdAt === "string" &&
    typeof item.updatedAt === "string" &&
    Boolean(item.user && typeof item.user === "object") &&
    Array.isArray(item.exercises)
  );
}

function readState(): StoredState {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = JSON.parse(current ?? localStorage.getItem(LEGACY_STORAGE_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return { version: 2, checkins: [] };
    const item = parsed as Record<string, unknown>;
    if ((item.version !== 1 && item.version !== 2) || !Array.isArray(item.checkins)) return { version: 2, checkins: [] };
    const migrated = { version: 2 as const, checkins: item.checkins.filter(isStoredCheckin) };
    if (!current && item.version === 1) writeState(migrated);
    return migrated;
  } catch {
    return { version: 2, checkins: [] };
  }
}

function writeState(state: StoredState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeReactions(value: unknown): ReactionSummary {
  const raw = value && typeof value === "object" ? value as Partial<ReactionSummary> : {};
  return {
    counts: {
      strong: Number(raw.counts?.strong) || 0,
      fire: Number(raw.counts?.fire) || 0,
      clap: Number(raw.counts?.clap) || 0,
    },
    mine: raw.mine === "strong" || raw.mine === "fire" || raw.mine === "clap" ? raw.mine : null,
  };
}

function openPhotoDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PHOTO_DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(PHOTO_STORE)) request.result.createObjectStore(PHOTO_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("無法開啟本機照片儲存空間。"));
  });
}

async function photoTransaction<T>(
  mode: IDBTransactionMode,
  action: (store: IDBObjectStore, resolve: (value: T) => void, reject: (reason?: unknown) => void) => void,
): Promise<T> {
  const database = await openPhotoDatabase();
  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction(PHOTO_STORE, mode);
    let result: T;
    action(transaction.objectStore(PHOTO_STORE), value => { result = value; }, reject);
    transaction.oncomplete = () => { database.close(); resolve(result); };
    transaction.onabort = () => { database.close(); reject(transaction.error ?? new Error("本機照片儲存已取消。")); };
    transaction.onerror = () => reject(transaction.error ?? new Error("本機照片儲存失敗。"));
  });
}

function putPhoto(id: string, photo: File): Promise<void> {
  return photoTransaction<void>("readwrite", (store, resolve, reject) => {
    const request = store.put(photo, id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function getPhoto(id: string): Promise<Blob | null> {
  return photoTransaction<Blob | null>("readonly", (store, resolve, reject) => {
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : null);
    request.onerror = () => reject(request.error);
  });
}

async function hydrate(checkin: StoredCheckin): Promise<Checkin> {
  const { hasPhoto, ...record } = checkin;
  const photo = hasPhoto ? await getPhoto(checkin.id) : null;
  return { ...record, reactions: normalizeReactions(record.reactions), photoUrl: photo ? URL.createObjectURL(photo) : null };
}

export async function loadGuestMonth(month: string): Promise<Checkin[]> {
  const records = readState().checkins
    .filter((checkin) => checkin.date.startsWith(`${month}-`))
    .sort((a, b) => a.date.localeCompare(b.date) || a.createdAt.localeCompare(b.createdAt));
  return Promise.all(records.map(hydrate));
}

export async function loadGuestHistory(): Promise<Checkin[]> {
  return Promise.all(readState().checkins
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .map(hydrate));
}

export async function saveGuestCheckin(
  draft: CheckinDraft,
  photo: File | null,
): Promise<{ record: Checkin; created: boolean }> {
  const state = readState();
  const now = new Date().toISOString();
  const id = draft.submissionId ?? crypto.randomUUID();
  const previous = state.checkins.find(record => record.id === id);
  if (previous) return { record: await hydrate(previous), created: false };
  if (photo) await putPhoto(id, photo);

  const record: StoredCheckin = {
    ...draft,
    id,
    user: {
      id: guestUser.id,
      username: guestUser.username,
      displayName: guestUser.displayName,
      avatarUrl: null,
    },
    hasPhoto: Boolean(photo),
    createdAt: now,
    updatedAt: now,
    reactions: normalizeReactions(null),
  };
  writeState({ version: 2, checkins: [...state.checkins, record] });
  return { record: await hydrate(record), created: true };
}

export async function setGuestReaction(checkinId: string, reaction: ReactionKind | null): Promise<ReactionSummary | null> {
  const state = readState();
  const target = state.checkins.find((checkin) => checkin.id === checkinId);
  if (!target) return null;
  const reactions = normalizeReactions(target.reactions);
  if (reactions.mine) reactions.counts[reactions.mine] = Math.max(0, reactions.counts[reactions.mine] - 1);
  if (reaction) reactions.counts[reaction] += 1;
  reactions.mine = reaction;
  writeState({
    version: 2,
    checkins: state.checkins.map((checkin) => checkin.id === checkinId ? { ...checkin, reactions } : checkin),
  });
  return reactions;
}

export function revokeGuestPhotoUrls(checkins: Checkin[]): void {
  for (const checkin of checkins) {
    if (checkin.photoUrl?.startsWith("blob:")) URL.revokeObjectURL(checkin.photoUrl);
  }
}

const backupKeys = ["you-lian:guest-templates:v1", "you-lian:custom-exercises:v1", "you-lian:active-workout:v1:guest"] as const;

export async function exportGuestBackup(): Promise<Blob> {
  const state = readState();
  const photos: Record<string, string> = {};
  for (const record of state.checkins.filter(item => item.hasPhoto)) {
    const photo = await getPhoto(record.id);
    if (!photo) throw new Error(`照片 ${record.date} 已遺失，請先確認瀏覽器儲存狀態。`);
    photos[record.id] = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("無法讀取備份照片。"));
      reader.readAsDataURL(photo);
    });
  }
  const local = Object.fromEntries(backupKeys.map(key => [key, JSON.parse(localStorage.getItem(key) ?? "null")]));
  const backup = new Blob([JSON.stringify({ format: "you-lian-guest", version: 1, exportedAt: new Date().toISOString(), checkins: state.checkins, photos, local })], { type: "application/json" });
  if (backup.size > 100 * 1024 * 1024) throw new Error("含照片備份超過目前可還原的 100 MB 上限；資料仍完整保留，請勿清除瀏覽器資料，需先協助分批備份。" );
  return backup;
}

/** Restore only our known guest keys. Existing records and an active draft always win. */
export async function importGuestBackup(file: File): Promise<number> {
  if (file.size > 100 * 1024 * 1024) throw new Error("備份檔超過 100 MB，請先保留原檔並聯絡協助。" );
  const value = JSON.parse(await file.text());
  if (value?.format !== "you-lian-guest" || value.version !== 1 || !Array.isArray(value.checkins) || value.checkins.length > 10000 || !value.checkins.every(isStoredCheckin)) throw new Error("不是支援的 YOU LIAN 訪客備份。" );
  const current = readState();
  const ids = new Set(current.checkins.map(item => item.id));
  const added: StoredCheckin[] = [];
  const photoFiles: Array<[string, File]> = [];
  for (const item of value.checkins as StoredCheckin[]) {
    if (ids.has(item.id)) continue;
    ids.add(item.id);
    if (item.id.length > 200 || !/^\d{4}-\d{2}-\d{2}$/.test(item.date) || !Number.isFinite(Date.parse(item.date)) || item.exercises.length > 20 || !item.exercises.every(validBackupExercise) || item.durationMinutes !== null && (typeof item.durationMinutes !== "number" || item.durationMinutes < 1 || item.durationMinutes > 1440) || item.note !== null && typeof item.note !== "string" || item.workoutType !== null && typeof item.workoutType !== "string") throw new Error("備份紀錄格式不正確。");
    if (item.hasPhoto) {
      const data = value.photos?.[item.id];
      if (typeof data !== "string" || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(data) || data.length > 7 * 1024 * 1024) throw new Error("備份照片格式不正確或過大。");
      const [header, encoded] = data.split(",");
      const bytes = Uint8Array.from(atob(encoded), char => char.charCodeAt(0));
      photoFiles.push([item.id, new File([bytes], "backup-photo", { type: header.slice(5, header.indexOf(";")) })]);
    }
    added.push({ ...item, user: guestUser, reactions: normalizeReactions(item.reactions) });
  }
  const writes = new Map<string, string>([[STORAGE_KEY, JSON.stringify({ version: 2, checkins: [...current.checkins, ...added] })]]);
  for (const key of backupKeys) {
    const incoming = value.local?.[key];
    if (!incoming) continue;
    const old = JSON.parse(localStorage.getItem(key) ?? "null");
    if (key.includes("active-workout")) {
      if (!validBackupWorkout(incoming)) throw new Error("備份訓練草稿格式不正確。");
      if (!old?.items?.length) writes.set(key, JSON.stringify(incoming));
    } else {
      if (!Array.isArray(incoming) || incoming.length > 1000 || !incoming.every(key.includes("templates") ? validBackupTemplate : validBackupCustom)) throw new Error("備份課表或動作格式不正確。");
      const existing = Array.isArray(old) ? old : [];
      const known = new Set(existing.map(item => item.id));
      writes.set(key, JSON.stringify([...existing, ...incoming.filter(item => !known.has(item.id))]));
    }
  }
  for (const [id, photo] of photoFiles) await putPhoto(id, photo);
  const previous = new Map([...writes.keys()].map(key => [key, localStorage.getItem(key)]));
  try { for (const [key, data] of writes) localStorage.setItem(key, data); }
  catch (error) {
    for (const [key, data] of previous) { if (data === null) localStorage.removeItem(key); else localStorage.setItem(key, data); }
    throw error;
  }
  return added.length;
}
