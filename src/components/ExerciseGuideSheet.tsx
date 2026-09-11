import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { GuideExercise } from "../types";
import { ExerciseDiagram } from "./ExerciseDiagram";
import { TrainingSheet } from "./TrainingSheet";

export function ExerciseGuideSheet({ exercise, onClose, onAdd, added }: { exercise: GuideExercise; onClose: () => void; onAdd?: () => void; added: boolean }) {
  const [tab, setTab] = useState<"diagram" | "video">("diagram");
  return <TrainingSheet title={exercise.name} onClose={onClose} className="movement-guide-sheet">
    <p className="sheet-meta">{exercise.bodyParts.join(" · ")} / {exercise.equipment}</p>
    <div className="guide-media-tabs" aria-label="指引內容">
      <button aria-pressed={tab === "diagram"} onClick={() => setTab("diagram")}>圖解與重點</button>
      <button aria-pressed={tab === "video"} onClick={() => setTab("video")}>示範影片</button>
    </div>
    <div className="training-sheet__body">
      {tab === "diagram" ? <ExerciseDiagram exercise={exercise} /> : <div className="exercise-video__frame"><iframe src={exercise.video.embedUrl} title={`${exercise.name}示範影片`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>}
      <section className="sheet-instructions"><h3>動作步驟</h3><ol>{exercise.instructions.map(text => <li key={text}>{text}</li>)}</ol><h3>動作重點</h3><ul>{exercise.cues.map(text => <li key={text}>{text}</li>)}</ul>
        <h3>建議訓練</h3><p>{exercise.recommendation.sets} 組 × {exercise.tracking === "time" ? `${exercise.recommendation.durationSeconds} 秒` : `${exercise.recommendation.reps} 次`} · 休息 {exercise.recommendation.restSeconds} 秒</p><p>{exercise.recommendation.load}</p>
        <a href={exercise.sourceUrl} target="_blank" rel="noreferrer">{exercise.sourceLabel}<ExternalLink size={14} /></a><a href={exercise.video.watchUrl} target="_blank" rel="noreferrer">影片：{exercise.video.channel}<ExternalLink size={14} /></a>
      </section>
    </div>
    <footer className="training-sheet__footer">{onAdd && !added ? <button className="primary-button" onClick={onAdd}>加入今日課表</button> : null}<button onClick={onClose}>返回{onAdd ? "動作庫" : "訓練課表"}</button></footer>
  </TrainingSheet>;
}
