import { exercises } from "./exercises";
import type { WorkoutTemplate, WorkoutTemplateItem } from "../types";

const stamp = "2026-09-13T00:00:00.000Z";
const byId = new Map(exercises.map(exercise => [exercise.id, exercise]));
function item(id: string, sets: number, amount: number, note?: string): WorkoutTemplateItem {
  const e = byId.get(id);
  if (!e) throw new Error(`Unknown template exercise: ${id}`);
  return { exerciseId: id, exerciseName: e.name, bodyPart: e.bodyParts[0], tracking: e.tracking,
    restSeconds: e.recommendation.restSeconds, sets, weight: null,
    reps: e.tracking === "reps" ? amount : null, durationSeconds: e.tracking === "time" ? amount : null,
    ...(note ? { note } : {}) };
}
const sides = "第一組左側、第二組右側，每組只做一側。";
const alternate = "左右合計 8 次，每側 4 次；伸出再回來算 1 次。";
const gentle = "輕拉而不痛，不彈震；不舒服可跳過，不必勉強做完整張。";
const gym = "重量先留空，選能穩定完成、仍可再做約 2–3 次的輕重量；不測極限。";
const homePair = ["warmup-home", "cooldown-home"];
type Input = Omit<WorkoutTemplate, "builtIn" | "createdAt" | "updatedAt">;
const template = (value: Input): WorkoutTemplate => ({ kind: "main", ...value, builtIn: true, createdAt: stamp, updatedAt: stamp });

export const builtInWorkoutTemplates: WorkoutTemplate[] = [
  template({ id: "builtin-everyday-vitality", name: "日常活力｜站姿輕肌力", category: "居家肌力", durationLabel: "約 8–12 分鐘",
    description: "不必躺地板，練習起身、推力與站姿控制。", equipmentNote: "穩固椅子、牆面、固定檯面。", companionIds: homePair,
    guidance: ["先慢慢踏步，再依順序完成。初次先 1 輪；肌力日之間留一天休息。", "椅子靠牆，不用有輪子或滑動家具；平衡動作全程扶穩。", "容易後先增加次數，再考慮組數，不同時增加。"],
    items: [item("march-in-place",1,60),item("chair-sit-to-stand",1,5),item("wall-push-up",1,5),item("supported-hip-abduction",2,5,sides),item("supported-calf-raise",1,5),item("supported-weight-shift",1,10,"左右合計 10 次，雙腳不離地。")],
  }),
  template({ id: "builtin-mat-basics", name: "輕盈啟動｜墊上基礎", category: "居家肌力", durationLabel: "約 6–10 分鐘",
    description: "仰躺為主，練習溫和腰腹與臀部控制。", equipmentNote: "瑜珈墊；需能安全躺下與起身。", companionIds: homePair,
    guidance: ["先走動 1–2 分鐘再躺下，先做一輪即可。", "不方便上下地板可選日常活力。四字伸展不適可省略，不硬壓膝蓋。"],
    items: [item("pelvic-tilt",1,6),item("heel-slide",1,10,"左右合計 10 次，每側 5 次。"),item("glute-bridge",1,8),item("figure-four-stretch",2,20,sides)],
  }),
  template({ id: "builtin-daily-bodyweight", name: "徒手全身｜基礎肌力", category: "居家肌力", durationLabel: "約 15–22 分鐘",
    description: "腿、推力與核心一次練習，取代每日徒手套餐。", equipmentNote: "瑜珈墊、固定高檯面。", companionIds: homePair,
    guidance: ["每週先選 2–3 天，中間留恢復日，不必每天練同一內容。", "深蹲可改椅子坐站，斜板伏地挺身可改牆壁版本。", "鳥狗式可先只伸手或腿，死蟲式可改腳跟滑動；反向弓箭步留作進階自選。"],
    items: [item("bodyweight-squat",2,8),item("incline-push-up",2,6),item("glute-bridge",2,10),item("bird-dog",2,8,alternate),item("dead-bug",2,8,alternate)],
  }),
  template({ id: "builtin-core-control", name: "核心穩定｜基礎控制", category: "核心活動", durationLabel: "約 12–18 分鐘",
    description: "以穩定與呼吸為主，不靠大量捲腹或忍痛硬撐。", equipmentNote: "瑜珈墊；膝部可加折毛巾。", companionIds: homePair,
    guidance: ["腹部曲線也受飲食、體脂與整體活動影響；核心課表不等於局部減脂。", "腳跟滑動穩定後可換死蟲式；側棒式肩膝不適可省略。", "姿勢失控就休息，肌力日之間留恢復時間。"],
    items: [item("heel-slide",2,10,"左右合計 10 次，每側 5 次。"),item("bird-dog",2,8,alternate),item("glute-bridge",2,8),item("knee-side-plank",2,10,sides)],
  }),
  template({ id: "builtin-desk-reset", name: "久坐重啟｜腰背活動", category: "核心活動", durationLabel: "約 5–8 分鐘",
    description: "從久坐切換到輕活動，不是腰痛治療課表。", equipmentNote: "瑜珈墊；無法躺下可只走動。", companionIds: homePair,
    guidance: ["先走動再進入墊上活動，過程舒服時可作久坐空檔。", "貓牛式膝腕不適可略過；伸展不舒服也可跳過。", "若出現疼痛、麻木或無力，停止並尋求專業評估。"],
    items: [item("march-in-place",1,60),item("pelvic-tilt",1,6),item("cat-cow",1,30,"緩慢活動，不追求最大拱背。"),item("figure-four-stretch",2,20,sides)],
  }),
  template({ id: "builtin-neck-shoulder-ease", name: "肩頸鬆一點｜短時活動", category: "舒緩伸展", durationLabel: "約 4–7 分鐘",
    description: "小幅度活動，不拉脖子、不做頸部繞圈。", equipmentNote: "穩固椅子、門框；不需下地板。",
    guidance: ["選舒服幅度、先做少量，不是越痠就越要用力拉。", "抬手不適可省略肩胛與門框動作。", "疼痛加重、頭暈、手麻或無力立即停止；持續痠痛請找醫師或物理治療師。"],
    items: [item("shoulder-roll",1,5),item("seated-neck-rotation",1,6,"左右各 3 次，短停約 5 秒。"),item("chin-tuck",1,5),item("scapular-glide",2,5,sides),item("doorway-chest-stretch",1,20)],
  }),
  template({ id: "builtin-bedtime-flexibility", name: "睡前慢下來｜溫和伸展", category: "舒緩伸展", durationLabel: "約 5–8 分鐘",
    description: "不追求柔軟度極限，讓睡前活動簡單一點。", equipmentNote: "椅子、牆面、瑜珈墊。",
    guidance: [gentle,"由坐姿、站姿到仰躺，減少反覆起身。四字伸展可只搭腳踝，不拉腿。", "不便躺下就略過最後一項。嬰兒式、跪姿髖屈肌與扭轉留作自選，不必全部加入。"],
    items: [item("shoulder-roll",1,5),item("chair-hamstring-stretch",2,20,sides),item("wall-calf-stretch",2,20,sides),item("figure-four-stretch",2,20,sides)],
  }),
  template({ id: "builtin-full-body", name: "全身肌力｜健身房基礎", category: "健身房", durationLabel: "約 30–40 分鐘，不含熱身",
    description: "腿部推力、上肢推拉、臀部與核心。", equipmentNote: "腿推機、胸推機、划船機、瑜珈墊。", companionIds: ["warmup-full","cooldown-full"],
    guidance: [gym,"每週先 2 天，中間留恢復日；首次可每項降至 1 組。", "腿推可改徒手深蹲，臀橋熟悉後可換臀推機，不是兩個都加。"],
    items: [item("leg-press",2,10),item("machine-chest-press",2,10),item("seated-row",2,10),item("glute-bridge",2,10),item("dead-bug",2,8,alternate)],
  }),
  template({ id: "builtin-push", name: "上肢推力｜胸肩手臂", category: "健身房", durationLabel: "約 25–35 分鐘，不含熱身",
    description: "胸推、肩推、三頭肌各選一項，避免堆疊重複推力。", equipmentNote: "胸推機、啞鈴、滑輪機。", companionIds: ["warmup-push","cooldown-push"],
    guidance: [gym,"先做輕重量熟悉組；肩痛不要硬推過頭，可略過並評估。"],
    items: [item("machine-chest-press",3,10),item("dumbbell-shoulder-press",2,8),item("cable-triceps-pushdown",2,10)],
  }),
  template({ id: "builtin-pull", name: "上肢拉力｜背部手臂", category: "健身房", durationLabel: "約 25–35 分鐘，不含熱身",
    description: "垂直拉、水平拉、後肩與彎舉的基礎組合。", equipmentNote: "高位下拉機、划船機、蝴蝶機、啞鈴。", companionIds: ["warmup-pull","cooldown-pull"],
    guidance: [gym,"不靠甩腰拉重量；反向蝴蝶機可換滑輪臉拉，擇一即可。"],
    items: [item("lat-pulldown",2,10),item("seated-row",2,10),item("reverse-pec-deck",2,10),item("dumbbell-curl",2,10)],
  }),
  template({ id: "builtin-lower-body", name: "下肢肌力｜腿臀基礎", category: "健身房", durationLabel: "約 30–40 分鐘，不含熱身",
    description: "腿推、腿彎舉、臀推與小腿的清楚順序。", equipmentNote: "腿推機、腿彎舉機、臀推機、小腿訓練機。", companionIds: ["warmup-lower","cooldown-lower"],
    guidance: [gym,"臀推機可換臀橋，提踵可改扶椅版本。", "腿屈伸、大腿內收或外展依需求擇一加 1–2 組，不是必做清單。"],
    items: [item("leg-press",3,10),item("leg-curl",2,10),item("machine-hip-thrust",2,10),item("standing-calf-raise",2,12)],
  }),
];

const warmNote = "先讓身體逐漸暖起來。健身房熱身約 5–10 分鐘，主動作再做 1–2 組輕重量熟悉組，不當正式組。";
const coolNote = "先慢走逐漸降速，再輕伸展；活動量大時慢走可延長至 5–10 分鐘。伸展不是避免痠痛的保證。";
const short = (id: string, name: string, kind: "warmup" | "cooldown", items: WorkoutTemplateItem[], guidance: string[]): WorkoutTemplate => template({
  id, name, kind, description: kind === "warmup" ? "主訓練前的準備流程。" : "主訓練後的降速與輕伸展。",
  durationLabel: id.endsWith("home") ? "約 2–4 分鐘" : "約 5–10 分鐘，可依狀態延長",
  equipmentNote: "固定牆面／檯面、穩固椅子；墊上動作才需瑜珈墊。",
  guidance: [kind === "warmup" ? warmNote : coolNote,...guidance,"獨立短流程，不會自動串接主訓練；可先熱身打卡，再選主訓練，最後再選收尾。"], items,
});
const march = (seconds: number) => item("march-in-place",1,seconds,"也可室內走動；收尾時逐漸放慢。");
const roll = () => item("shoulder-roll",1,5);
const scapula = () => item("scapular-glide",2,5,sides);
const ankle = () => item("wall-ankle-mobility",2,5,sides);
const calf = () => item("wall-calf-stretch",2,20,sides);
const hamstring = () => item("chair-hamstring-stretch",2,20,sides);
export const preparationRoutines: WorkoutTemplate[] = [
  short("warmup-push","上肢推力｜熱身","warmup",[march(180),roll(),scapula(),item("wall-push-up",1,5)],["接著用輕重量熟悉胸推與肩推，不在熱身追求疲勞。"]),
  short("cooldown-push","上肢推力｜收尾","cooldown",[march(120),roll(),item("doorway-chest-stretch",1,20)],[gentle,"肩頸不舒服時省略門框伸展。"]),
  short("warmup-pull","上肢拉力｜熱身","warmup",[march(180),roll(),scapula()],["接著用輕重量熟悉下拉與划船。"]),
  short("cooldown-pull","上肢拉力｜收尾","cooldown",[march(120),roll(),item("supported-lat-stretch",1,20)],[gentle,"肩膀抬手會痛就略過背部伸展。"]),
  short("warmup-lower","下肢肌力｜熱身","warmup",[march(180),ankle(),item("bodyweight-hip-hinge",1,8),item("bodyweight-squat",1,5,"小幅蹲即可，也可改椅子坐站。")],["接著做輕重量腿推／臀推熟悉組。"]),
  short("cooldown-lower","下肢肌力｜收尾","cooldown",[march(120),calf(),hamstring(),item("figure-four-stretch",2,20,sides)],[gentle,"不方便躺下可略過四字伸展。"]),
  short("warmup-full","全身肌力｜熱身","warmup",[march(180),roll(),ankle(),item("bodyweight-hip-hinge",1,8),item("wall-push-up",1,5)],["接著熟悉當天腿推、胸推、划船的輕重量版本。"]),
  short("cooldown-full","全身肌力｜收尾","cooldown",[march(120),item("doorway-chest-stretch",1,20),item("supported-lat-stretch",1,20),calf(),hamstring()],[gentle,"可只選當天覺得緊繃、伸展舒服的 2–3 項。"]),
  short("warmup-home","居家／墊上｜熱身","warmup",[march(90),roll(),item("chair-sit-to-stand",1,3)],["居家輕活動先 2–4 分鐘即可，不強迫做滿健身房長度。", "墊上版本可省略坐站，躺下先小幅骨盆傾斜；站姿課表不需躺下。"]),
  short("cooldown-home","居家／墊上｜收尾","cooldown",[march(60),roll(),hamstring()],[gentle,"已在墊上可省略踏步與椅上伸展，改四字伸展與放鬆呼吸，不必反覆起身。"]),
];
