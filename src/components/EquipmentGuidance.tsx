import type { GuideExercise } from "../types";
import { equipmentGuidance } from "../lib/exerciseGuidance";
export function EquipmentGuidance({ exercise }: { exercise: GuideExercise }) {
  const notes = equipmentGuidance(exercise);
  return <details className="equipment-guidance"><summary>開始前：器材、重量記法與減量方式</summary><h4>場地與器材</h4><p>{notes.setup}</p><p>本動作的起始設定：{exercise.instructions[0]}</p><h4>重量怎麼填</h4><p>{notes.weight}</p><h4>覺得太難時</h4><p>{notes.easier}</p><h4>不方便跪地、撐手或上下地板？</h4><p>不必勉強完成原動作。可回到動作庫選擇「椅子坐站」「坐姿單腿腿後側伸展」或扶穩站姿活動等適合自己的項目；這些是另一種活動選項，不是原動作的等效替代或疼痛治療。</p><p>若手腕不能承重，請略過伏地挺身與四足支撐；需要支撐時使用固定檯面。發生疼痛或不適先停止，必要時由專業人員協助選擇。</p><p>這是一般練習提示，不是疼痛治療或個別醫療建議。</p></details>;
}
