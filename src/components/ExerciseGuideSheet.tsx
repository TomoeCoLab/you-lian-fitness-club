import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { GuideExercise } from "../types";
import { ExerciseDiagram } from "./ExerciseDiagram";
import { TrainingSheet } from "./TrainingSheet";
import { EquipmentGuidance } from "./EquipmentGuidance";
import { videoNeedsReview, videoFrameClass } from "../lib/exerciseGuidance";

export function ExerciseGuideSheet({ exercise, onClose, onAdd, added }: { exercise: GuideExercise; onClose: () => void; onAdd?: () => void; added: boolean }) {
  const [tab, setTab] = useState<"diagram" | "video">("diagram");
  return <TrainingSheet title={exercise.name} onClose={onClose} className="movement-guide-sheet">
    <p className="sheet-meta">{exercise.bodyParts.join(" · ")} / {exercise.equipment}</p>
    <div className="guide-media-tabs" aria-label="指引內容">
      <button aria-pressed={tab === "diagram"} onClick={() => setTab("diagram")}>圖解與重點</button>
      <button aria-pressed={tab === "video"} onClick={() => setTab("video")}>示範影片</button>
    </div>
    <div className="training-sheet__body">
      {tab === "diagram" ? <ExerciseDiagram exercise={exercise} /> : videoNeedsReview(exercise) ? <p className="video-review-notice">示範影片暫無提供，請先參考動作步驟與教學來源。</p> : <><div className={videoFrameClass(exercise)}><iframe src={exercise.video.embedUrl} title={`${exercise.name}示範影片`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div><p className="sheet-meta">{exercise.video.language}示範 · {exercise.video.channel}。若播放器無法載入，可使用下方影片來源連結。</p></>}
      <EquipmentGuidance exercise={exercise} />
      <section className="sheet-instructions"><h3>動作步驟</h3><ol>{exercise.instructions.map(text => <li key={text}>{text}</li>)}</ol><h3>動作重點</h3><ul>{exercise.cues.map(text => <li key={text}>{text}</li>)}</ul>
        <h3>單獨練習參考</h3><p>{exercise.recommendation.sets} 組 × {exercise.tracking === "time" ? `${exercise.recommendation.durationSeconds} 秒` : `${exercise.recommendation.reps} 次`} · 休息 {exercise.recommendation.restSeconds} 秒</p><p>{exercise.recommendation.load}</p><p>課表可能依熱身、主訓練或收尾安排不同份量；本次實際組數、次數與時間以「今日課表」為準，可按身體狀態減量。</p>
        <a href={exercise.sourceUrl} target="_blank" rel="noreferrer">{exercise.sourceLabel}<ExternalLink size={14} /></a>{!videoNeedsReview(exercise) ? <a href={exercise.video.watchUrl} target="_blank" rel="noreferrer">影片：{exercise.video.channel}<ExternalLink size={14} /></a> : null}
        <p className="safety-note">出現疼痛、麻木、頭暈或不適請停止；持續或加重時請尋求專業協助。</p>
      </section>
    </div>
    <footer className="training-sheet__footer">{onAdd && !added ? <button className="primary-button" onClick={onAdd}>加入今日課表</button> : null}<button onClick={onClose}>返回{onAdd ? "動作庫" : "訓練課表"}</button></footer>
  </TrainingSheet>;
}
