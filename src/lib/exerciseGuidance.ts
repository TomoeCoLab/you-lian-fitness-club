import type { GuideExercise } from "../types";
import { contentReviews } from "../data/contentReviews.generated";

export const exerciseAliases: Record<string, string> = { "dumbbell-triceps-extension": "dumbbell-overhead-triceps-extension" };
export function canonicalExerciseId(id: string) { return exerciseAliases[id] ?? id; }

export function equipmentGuidance(exercise: GuideExercise): { setup: string; weight: string; easier: string } {
  const { equipment, id } = exercise;
  const setup = equipment === "徒手" || equipment === "瑜珈墊"
    ? "在防滑平面保留活動空間；需要椅子或扶物時，選無輪、穩固且不滑動的支撐。地板動作可用墊子減少壓迫。"
    : equipment === "啞鈴" || equipment === "壺鈴" ? "確認握把乾燥、重量固定；先用輕重量確認活動路徑，使用長椅時確認靠背與座椅已鎖定。"
    : equipment === "槓鈴" || equipment === "史密斯機" ? "先確認安全擋桿、掛鉤與重量固定。空槓也有重量；不熟悉卸槓與回架時先請現場人員協助。"
    : equipment === "彈力帶" ? "檢查彈力帶有無裂痕，固定點不可鬆脫；避免讓帶子回彈朝向臉部。"
    : "依機身圖示調整座椅、靠墊與起始位置；不同器械的轉軸與支撐位置不同，不一律以膝蓋對軸。插銷完全插入，先以最低可控阻力試做；不確定設定時請現場人員協助。";
  const single = ["dumbbell-squat", "dumbbell-row", "dumbbell-triceps-extension", "dumbbell-overhead-triceps-extension"].includes(id);
  const weight = equipment === "啞鈴" ? single ? "記錄單顆啞鈴重量（雙手共持一顆也只記這一顆）。單側動作左右重量不同請在心得補充。" : "記錄每手單顆啞鈴重量，不將左右相加；每次維持同一記法。"
    : equipment === "輔助引體機" ? "記錄機台輔助重量；數字越大通常越省力，不能當成一般負重比較。"
    : equipment === "槓鈴" ? "記錄槓鈴加左右槓片的總重量；先確認槓本身重量。"
    : equipment === "史密斯機" ? "機型有不同配重與槓重，依機台標示記錄並在心得註明機型；不要直接與自由槓比較。"
    : equipment === "徒手" || equipment === "瑜珈墊" ? "一般留空代表自重；額外負重才填 kg。伸展不以增加重量為目標。"
    : equipment === "彈力帶" ? "不同品牌阻力不能直接換算 kg；重量留空，在心得記錄顏色、品牌與拉伸長度。"
    : equipment === "壺鈴" ? "記錄使用的單顆壺鈴重量。" : "記錄同一機台的標示重量；滑輪倍率與機型不同，不能直接跨機台比較。";
  const alternatives: Record<string, string> = {
    "push-up": "可先改為牆面伏地挺身；若手腕或肩膀疼痛，停止而非硬做。",
    "incline-push-up": "可改為牆面伏地挺身，降低支撐負荷。",
    "bodyweight-squat": "可改為椅子坐站，或縮小下蹲幅度。",
    "dumbbell-squat": "先放下重量，改徒手深蹲或椅子坐站。",
    "front-plank": "先縮短維持時間；可改仰躺腳跟滑行練習軀幹控制。",
    "dead-bug": "可先改為仰躺腳跟滑行，縮短伸腿距離。",
    "bird-dog": "先只移動一隻手或一隻腳，軀幹能穩定再進行對側伸展。",
    "knee-side-plank": "可縮短維持時間；肩部不舒服時不要繼續承重。",
  };
  return { setup, weight, easier: alternatives[id] ?? "先減少次數、時間、負重或活動幅度。只在舒適範圍內練習；出現疼痛、麻木、頭暈或不適時停止，不把不舒服當成正常訓練目標。" };
}

// Legacy shared videos have no exercise-specific chapter evidence. Never present them as a verified demonstration.
export function videoNeedsReview(exercise: GuideExercise): boolean {
  const audit = contentReviews[exercise.id]?.video;
  const review = audit?.check;
  if (!review || audit.status !== 'spot-checked' || audit.reviewedEmbedUrl !== exercise.video.embedUrl) return true;
  try {
    const url = new URL(exercise.video.embedUrl);
    return url.pathname !== `/embed/${review.videoId}` || !["www.youtube-nocookie.com", "www.youtube.com"].includes(url.hostname)
      || Number(url.searchParams.get("start") ?? 0) !== (review.start ?? 0)
      || Number(url.searchParams.get("end") ?? 0) !== (review.end ?? 0);
  } catch { return true; }
}

export function contentReview(exercise: GuideExercise) {
  const audit = contentReviews[exercise.id]?.video;
  const check = !videoNeedsReview(exercise) ? audit?.check : undefined;
  return {
    date: audit?.reviewedAt ?? '尚未完成',
    status: check ? "僅片段抽查，非完整核對" : audit?.status === 'blocked' ? "版本不符，暫停示範" : "尚未取得足夠片段，待複核",
    detail: check?.observation ?? audit?.findings.join('；') ?? "本次未能確認對應動作片段，不把片名或能播放當成內容正確。已停用原影片與影片連結，請先閱讀文字步驟及來源。",
    seconds: check?.seconds ?? [],
  };
}
