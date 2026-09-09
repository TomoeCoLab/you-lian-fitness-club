import type { Equipment } from "../types";
import type { ReactNode } from "react";

type EquipmentIconProps = {
  equipment: Equipment | "全部";
  size?: number;
};

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 2.2,
};

export function EquipmentIcon({ equipment, size = 42 }: EquipmentIconProps) {
  const frame = (children: ReactNode) => (
    <svg aria-hidden="true" viewBox="0 0 64 64" width={size} height={size} {...common}>{children}</svg>
  );

  if (equipment === "全部") return frame(<><rect x="9" y="10" width="18" height="18" /><rect x="37" y="10" width="18" height="18" /><rect x="9" y="38" width="18" height="18" /><rect x="37" y="38" width="18" height="18" /></>);
  if (equipment === "徒手") return frame(<><circle cx="32" cy="12" r="5" /><path d="M32 17v17m0-11-11 8m11-8 11 8M32 34 21 52m11-18 11 18" /><path d="M15 53h34" /></>);
  if (equipment === "啞鈴") return frame(<><path d="M16 32h32" /><path d="M12 24v16m6-19v22m28-22v22m6-19v16" /></>);
  if (equipment === "槓鈴") return frame(<><path d="M7 32h50" /><path d="M12 20v24m6-19v14m28-14v14m6-19v24" /></>);
  if (equipment === "壺鈴") return frame(<><path d="M24 23c0-8 16-8 16 0" /><path d="M21 27h22l5 25H16l5-25Z" /><path d="M27 27v-5h10v5" /></>);
  if (equipment === "彈力帶") return frame(<><path d="M18 12c-9 8-9 32 0 40M46 12c9 8 9 32 0 40" /><path d="m18 12 28 40M46 12 18 52" /><circle cx="18" cy="12" r="3" /><circle cx="46" cy="12" r="3" /></>);
  if (equipment === "史密斯機") return frame(<><path d="M12 55V8h40v47M17 49h30M21 20h22M25 16v8m14-8v8" /><path d="M18 28h28M22 25v6m20-6v6" /></>);
  if (equipment === "滑輪機") return frame(<><path d="M10 55V8h44v47M15 14h34" /><circle cx="20" cy="20" r="4" /><circle cx="44" cy="20" r="4" /><path d="M20 24v15l8 8m16-23v15l-8 8M25 51h14" /></>);
  if (equipment === "高位下拉機") return frame(<><path d="M12 56V8h40v48M20 14h24" /><circle cx="32" cy="19" r="3" /><path d="M32 22v10m-12-2h24M24 30l-5 8m21-8 5 8M27 39h10v14H22m20 0H22" /></>);
  if (equipment === "坐姿划船機") return frame(<><path d="M9 55h46M12 12v43m0-35h11l8 18" /><path d="M29 42h17l6 13M28 47v8" /><circle cx="40" cy="22" r="4" /><path d="M39 26 34 37m5-8 9 6" /></>);
  if (equipment === "胸推機") return frame(<><path d="M10 55V10h44v45M18 49h28" /><path d="M24 30v18h16V30" /><circle cx="32" cy="20" r="4" /><path d="M32 24v12m0-8-10 5m10-5 10 5" /></>);
  if (equipment === "蝴蝶機") return frame(<><path d="M9 55V9h46v46M20 49h24" /><circle cx="32" cy="19" r="4" /><path d="M32 23v18m0-12-12-7m12 7 12-7M20 22v16m24-16v16" /></>);
  if (equipment === "肩推機") return frame(<><path d="M10 55V9h44v46M20 50h24" /><circle cx="32" cy="23" r="4" /><path d="M32 27v17m0-12-10-9m10 9 10-9M22 23v-9m20 9v-9" /></>);
  if (equipment === "腿推機") return frame(<><path d="M9 55h46M14 48 34 20m-12 27h18l9 8M35 18l13 11m-9-15 13 11" /><circle cx="22" cy="31" r="4" /><path d="m25 34 8 8 9-11" /></>);
  if (equipment === "腿屈伸機") return frame(<><path d="M8 55h48M16 18v31h19V32H16" /><circle cx="26" cy="13" r="4" /><path d="M26 17v17l12 8 12 1m-2-5v10" /></>);
  if (equipment === "腿彎舉機") return frame(<><path d="M8 55h48M13 23h31l7 26H20" /><circle cx="18" cy="17" r="4" /><path d="m22 19 14 9 10 16m-10-16 12-5" /></>);
  if (equipment === "輔助引體機") return frame(<><path d="M10 56V8h44v48M18 14h28m-24 0v8m20-8v8" /><circle cx="32" cy="25" r="4" /><path d="M32 29v14m0-11-10-10m10 10 10-10M25 48h14m-7-5-7 9m7-9 7 9" /></>);
  if (equipment === "臀推機") return frame(<><path d="M8 55h48M13 42h24l10 13M16 22v20m0-12h17" /><circle cx="40" cy="28" r="4" /><path d="m37 31-9 11m3-8 14 8M25 38l9 10" /><path d="M26 34h22" /></>);
  if (equipment === "哈克深蹲機") return frame(<><path d="M10 55h44M16 50 42 12m-19 38 26-38M38 14h12v10" /><circle cx="34" cy="25" r="4" /><path d="m32 29-6 10 8 9m-8-9 12 3 6-9" /></>);
  if (equipment === "小腿訓練機") return frame(<><path d="M9 55h46M14 14v41m0-34h22l8 12" /><circle cx="27" cy="29" r="4" /><path d="m27 33 1 11m0-6 10 5m-10 1-7 9m7-9 12 8" /><path d="M38 52h12" /></>);
  if (equipment === "羅馬椅") return frame(<><path d="M8 55h48M15 18l12 30m-4-20h23m-9 0 9 27M27 48l-8 7" /><circle cx="30" cy="17" r="4" /><path d="m33 19 13 9m-19-8-8 8" /></>);
  if (equipment === "瑜珈墊") return frame(<><path d="M12 20h34c7 0 10 5 10 11s-4 11-11 11H12V20Z" /><ellipse cx="45" cy="31" rx="7" ry="11" /><path d="M12 42v5m0-27v-5m-4 0h8m-8 32h8" /></>);
  return frame(<><path d="M10 55V10h44v45M18 48h28" /><circle cx="32" cy="21" r="4" /><path d="M32 25v18m0-12-9 6m9-6 9 6" /></>);
}
