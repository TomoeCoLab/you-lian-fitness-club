export type MovementPreferences = { favorites: string[]; recent: string[] };
const key = (owner: string) => `you-lian:movement-preferences:v1:${owner}`;
export function loadMovementPreferences(owner: string): MovementPreferences {
  try {
    const data = JSON.parse(localStorage.getItem(key(owner)) ?? "null");
    const ids = (value: unknown): string[] => Array.isArray(value) ? value.filter((id): id is string => typeof id === "string").slice(0, 100) : [];
    return { favorites: ids(data?.favorites), recent: ids(data?.recent).slice(0, 8) };
  } catch { return { favorites: [], recent: [] }; }
}
export function saveMovementPreferences(owner: string, value: MovementPreferences) { localStorage.setItem(key(owner), JSON.stringify(value)); }
