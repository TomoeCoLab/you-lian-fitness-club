import type { BodyPart, Equipment } from '../types';
import { exerciseCatalog } from './exerciseCatalog.generated';

// Teaching content has a single authoring source: content/exercises/*.json.
export const exercises = exerciseCatalog;
export const bodyParts: Array<'全部' | BodyPart> = ['全部', '胸', '背', '腿', '肩', '手臂', '核心'];
export const equipmentOptions: Array<'全部' | Equipment> = [
  '全部', '徒手', '啞鈴', '槓鈴', '曲槓', '地雷管', '單槓', '壺鈴', '彈力帶', '史密斯機', '滑輪機',
  '胸推機', '蝴蝶機', '高位下拉機', '坐姿划船機', '肩推機', '腿推機', '腿屈伸機', '腿彎舉機',
  '輔助引體機', '胸靠划船機', '牧師椅彎舉機', '臀推機', '哈克深蹲機', '小腿訓練機', '羅馬椅', '大腿內收機', '大腿外展機', '瑜珈墊',
];
