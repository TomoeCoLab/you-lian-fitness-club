import { useState } from "react";
import { DiagramViewer } from "./DiagramViewer";
import type { GuideExercise } from "../types";

function guideImageFor(exerciseId: GuideExercise["id"]) {
  return `/exercise-guides/skill-final/fitness-${exerciseId}-zh-tw.png`;
}

export function ExerciseDiagram({ exercise }: { exercise: GuideExercise }) {
  const [open, setOpen] = useState(false);
  const guideImage = guideImageFor(exercise.id);

  return <><section className="exercise-infographic" aria-label={`${exercise.name} 真人動作分解圖`}>
    <div className="exercise-infographic__heading">
      <div>
        <strong>真人動作圖解</strong>
        <span>依序查看姿勢、重點與呼吸節奏</span>
      </div>
      <button onClick={() => setOpen(true)} aria-label={`開啟${exercise.name}完整大圖`}>
        開啟大圖
      </button>
    </div>
    <button className="exercise-infographic__image-link" onClick={() => setOpen(true)} aria-label={`放大${exercise.name}圖解`}>
      <img
        src={guideImage}
        alt={`${exercise.name}分解動作、動作重點、建議次數或時間與呼吸提醒`}
        loading="lazy"
        decoding="async"
      />
    </button>
  </section>{open ? <DiagramViewer src={guideImage} title={exercise.name} onClose={() => setOpen(false)} /> : null}</>;
}
