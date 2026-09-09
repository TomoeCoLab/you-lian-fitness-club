import type { WorkoutTemplate, WorkoutTemplateItem } from "../types";

const STORAGE_KEY = "you-lian:guest-templates:v1";

function readTemplates(): WorkoutTemplate[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is WorkoutTemplate => Boolean(
      item && typeof item === "object" && typeof (item as WorkoutTemplate).id === "string" &&
      typeof (item as WorkoutTemplate).name === "string" && Array.isArray((item as WorkoutTemplate).items),
    )) : [];
  } catch {
    return [];
  }
}

function writeTemplates(templates: WorkoutTemplate[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
}

export function loadGuestTemplates(): WorkoutTemplate[] {
  return readTemplates().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function createGuestTemplate(name: string, items: WorkoutTemplateItem[]): WorkoutTemplate {
  const now = new Date().toISOString();
  const template: WorkoutTemplate = { id: crypto.randomUUID(), name: name.trim(), items, createdAt: now, updatedAt: now };
  writeTemplates([template, ...readTemplates()]);
  return template;
}

export function deleteGuestTemplate(id: string): void {
  writeTemplates(readTemplates().filter((template) => template.id !== id));
}
