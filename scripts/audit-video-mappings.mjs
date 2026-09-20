import { registerHooks } from "node:module";
registerHooks({ resolve(specifier, context, next) { try { return next(specifier, context); } catch (error) { if (specifier.startsWith(".") && !/\.(?:[cm]?js|tsx?|json)$/i.test(specifier)) return next(`${specifier}.ts`, context); throw error; } } });
// Inventory only: duplicate mappings are a review signal, not proof of correctness/incorrectness.
const { exercises } = await import("../src/data/exercises.ts");
const entries = exercises.map(exercise => ({ id: exercise.id, name: exercise.name, video: exercise.video.embedUrl.match(/embed\/([^?]+)/)?.[1] ?? exercise.video.embedUrl }));
for (const video of new Set(entries.map(entry => entry.video))) {
  const group = entries.filter(entry => entry.video === video);
  if (group.length > 1) console.log(JSON.stringify({ video, exercises: group.map(entry => ({ id: entry.id, name: entry.name })) }));
}
console.log(`${entries.length} exercise/video mappings inventoried. Playback and movement review are separate manual gates.`);
