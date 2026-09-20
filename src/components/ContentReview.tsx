import type { GuideExercise } from "../types";
import { contentReview, videoNeedsReview } from "../lib/exerciseGuidance";
import { contentReviews } from "../data/contentReviews.generated";
import { reviewLabels } from "../lib/contentAudit";
export function ContentReview({ exercise }: { exercise: GuideExercise }) {
  const review = contentReview(exercise);
  const audit = contentReviews[exercise.id];
  return <section className="content-review">
    {audit ? <><p>文字：{reviewLabels[audit.text.status]} · 圖解：{reviewLabels[audit.image.status]} · 影片：{reviewLabels[audit.video.status]}</p><p>計數方式（動作預設）：{audit.counting}</p></> : null}
    <details><summary>來源與檢查紀錄 · {review.status}</summary>
      {audit ? <p>{audit.breathing}</p> : null}
      <p>{review.detail}</p>
      {exercise.video.note ? <p>{exercise.video.note}</p> : null}
      <p>盤點日期：{review.date}。檢查方式：公開來源與實際播放器畫面抽查，不是逐秒觀看、醫療審查或專業動作認證。</p>
      {review.seconds.length ? <p>本次抽查秒點：{review.seconds.join("、")} 秒。播放器能否在你的裝置播放，仍受來源限制。</p> : null}
      <p>圖解是 AI 輔助製作，已逐張做可見內容檢查；有矛盾或不清楚的舊圖暫不顯示。視覺檢查不是專業動作認證，也不能取代成品與來源的再次核對。</p>
      {audit ? <><p>內容修訂 {audit.revision}。{audit.doseBasis}</p><ul>{audit.text.findings.map(x => <li key={x}>文字：{x}</li>)}{audit.image.findings.map(x => <li key={x}>圖解：{x}</li>)}</ul><p>{audit.stopSignals.join(' ')}</p></> : null}
      <a href={exercise.sourceUrl} target="_blank" rel="noreferrer">文字來源：{exercise.sourceLabel}</a>{!videoNeedsReview(exercise) ? <>{" · "}<a href={exercise.video.watchUrl} target="_blank" rel="noreferrer">原始影片：{exercise.video.channel}</a></> : null}
    </details>
  </section>;
}
