import { useState } from "react";
import { DiagramViewer } from "./DiagramViewer";
import type { GuideExercise } from "../types";
import guideAssets from "../data/guideAssets.json";
import { contentReviews } from "../data/contentReviews.generated";
import { diagramNeedsReplacement } from "../lib/contentAudit";

function guideImageFor(exerciseId: GuideExercise["id"]) {
  return `/exercise-guides/skill-final/fitness-${exerciseId}-zh-tw.png`;
}

export function ExerciseDiagram({ exercise }: { exercise: GuideExercise }) {
  const [open, setOpen] = useState(false);
  const asset = (guideAssets as Record<string, { preview: string; full: string; width: number; height: number }>)[exercise.id];
  const guideImage = asset?.full ?? guideImageFor(exercise.id);

  const audit = contentReviews[exercise.id];
  if (diagramNeedsReplacement(audit)) return <section className="exercise-infographic" aria-label={`${exercise.name}圖解暫無提供`}>
    <strong>圖解暫無提供</strong>
    <p>請先參考下方動作步驟與重點。</p>
  </section>;

  return <><section className="exercise-infographic" aria-label={`${exercise.name}動作分解圖`}>
    <div className="exercise-infographic__heading">
      <div>
        <strong>動作分解圖</strong>
        <span>AI 輔助圖解 · 份量以本次課表為準</span>
      </div>
      <button onClick={() => setOpen(true)} aria-label={`開啟${exercise.name}完整大圖`}>
        步驟／大圖
      </button>
    </div>
    <button className="exercise-infographic__image-link" onClick={() => setOpen(true)} aria-label={`放大${exercise.name}圖解`}>
      <img
        src={asset?.preview ?? guideImage}
        width={asset?.width ?? 1448}
        height={asset?.height ?? 1086}
        alt={`${exercise.name}分解動作、動作重點、建議次數或時間與呼吸提醒`}
        loading="lazy"
        decoding="async"
      />
    </button>
  </section>{open ? <DiagramViewer src={guideImage} title={exercise.name} instructions={exercise.instructions} cues={exercise.cues} onClose={() => setOpen(false)} /> : null}</>;
}
