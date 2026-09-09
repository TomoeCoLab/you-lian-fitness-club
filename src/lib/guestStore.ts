import type { Checkin, CheckinDraft, ReactionKind, ReactionSummary, User } from "../types";

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
    action(transaction.objectStore(PHOTO_STORE), resolve, reject);
    transaction.oncomplete = () => database.close();
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
  const id = crypto.randomUUID();
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
