import type { Equipment } from "../types";

export function weightLabel(weight: number | null | undefined, equipment?: Equipment): string {
  if (weight != null) return `${weight} kg`;
  if (equipment === "徒手" || equipment === "瑜珈墊" || equipment === "單槓") return "自重";
  if (equipment === "彈力帶") return "阻力見備註";
  return "重量未填";
}
