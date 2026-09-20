import { exercises } from "./exercises";
import type { WorkoutTemplate, WorkoutTemplateItem } from "../types";

// Template amounts use the same counting units as canonical exercise content.
const stamp = "2026-09-21T00:00:00.000Z";
const byId = new Map(exercises.map(exercise => [exercise.id, exercise]));
function item(id: string, sets: number, amount: number, restSeconds = 45, note?: string): WorkoutTemplateItem {
  const e = byId.get(id);
  if (!e) throw new Error(`Unknown template exercise: ${id}`);
  return { exerciseId: id, exerciseName: e.name, bodyPart: e.bodyParts[0], tracking: e.tracking,
    restSeconds, sets, weight: null, reps: e.tracking === "reps" ? amount : null,
    durationSeconds: e.tracking === "time" ? amount : null, ...(note ? { note } : {}) };
}
const sides = "第一組左側、第二組右側，每組只做一側；共左右各一組。";
const each = (count: number) => `每組每側 ${count} 次；左右都完成才算一組，欄位填 ${count}，不將左右相加。`;
const combined = "左右合計 10 次，每側 5 次；欄位填 10。";
const gentle = "輕拉而不痛，不彈震；不舒服可跳過，不必勉強做完整張。";
const gym = "重量先留空，選能穩定完成、仍可再做約 2–3 次的重量；先熟悉動作，不測極限。";
const progression = "從預設下限開始，穩定後先增加次數，再小幅加重並回到次數下限；不一起增加重量、次數與組數。休息不足可延長。";
const homePair = ["warmup-home", "cooldown-home"];
const matPair = ["warmup-mat", "cooldown-mat"];
const fullPair = ["warmup-full", "cooldown-full"];
const upperPair = ["warmup-push", "cooldown-push"];
const lowerPair = ["warmup-lower", "cooldown-lower"];
type Input = Omit<WorkoutTemplate, "builtIn" | "createdAt" | "updatedAt">;
const template = (value: Input): WorkoutTemplate => ({ kind: "main", ...value, builtIn: true, createdAt: stamp, updatedAt: stamp });
const lift = (id: string, amount: number, range: string, accessory = false) =>
  item(id, 2, amount, accessory ? 75 : 120, `目標 ${range} 次；先用 ${amount} 次。`);

export const builtInWorkoutTemplates: WorkoutTemplate[] = [
  template({ id: "builtin-everyday-vitality", name: "日常活力｜站姿輕肌力", category: "居家肌力", durationLabel: "約 8–12 分鐘",
    description: "不必躺地板，練習起身、推力與站姿控制。", equipmentNote: "穩固椅子、牆面、固定檯面。", companionIds: homePair,
    guidance: ["每週先安排兩個不連續的肌力日；初次每項一組即可，組間休息 45 秒，必要時延長。", "椅子靠牆，不用有輪子或滑動家具；平衡動作全程扶穩。", "坐站與牆面伏地挺身先各 5 次，適應後逐步到 8 次，不同時加組。"],
    items: [item("chair-sit-to-stand",1,5),item("wall-push-up",1,5),item("supported-hip-abduction",2,5,45,sides),item("supported-calf-raise",1,8),item("supported-weight-shift",1,10,45,"左右合計 10 次，雙腳不離地。")],
  }),
  template({ id: "builtin-mat-basics", name: "輕盈啟動｜墊上基礎", category: "居家肌力", durationLabel: "約 6–10 分鐘",
    description: "仰躺為主，練習溫和腰腹與臀部控制。", equipmentNote: "瑜珈墊；需能安全躺下與起身。", companionIds: matPair,
    guidance: ["先做一輪，不必天天加量。", "不方便上下地板可選日常活力。四字伸展不適可省略，不硬壓膝蓋。"],
    items: [item("pelvic-tilt",1,6),item("heel-slide",1,10,45,combined),item("glute-bridge",1,8),item("figure-four-stretch",2,20,30,sides)],
  }),
  template({ id: "builtin-daily-bodyweight", name: "徒手全身｜基礎肌力", category: "居家肌力", durationLabel: "約 18–25 分鐘",
    description: "腿、推力、臀部與核心的固定順序。", equipmentNote: "瑜珈墊、固定高檯面。", companionIds: ["warmup-home","cooldown-mat"],
    guidance: ["每週先選 2–3 天，中間留恢復日；組間 45–60 秒，不足可延長。", "深蹲可改椅子坐站，斜板伏地挺身可改牆壁版本；斜板推由 6 次漸增至 8 次。", "鳥狗式可先只伸手或腿；側棒式由每側 10 秒起，穩定後到 15 秒。", "純徒手缺少有阻力的拉力；有安全固定的彈力帶時，可另選彈力帶划船補充。肩部活動不等同划船。"],
    items: [item("bodyweight-squat",2,8,60),item("incline-push-up",2,6,60),item("glute-bridge",2,10),item("bird-dog",2,4,45,each(4)),item("knee-side-plank",2,10,45,sides)],
  }),
  template({ id: "builtin-home-dumbbell", name: "居家啞鈴｜全身肌力", category: "居家肌力", durationLabel: "約 25–35 分鐘",
    description: "以啞鈴完成蹲、推、拉，再接墊上訓練。", equipmentNote: "啞鈴、穩固且可鎖定的訓練椅、瑜珈墊；不用餐椅代替訓練椅。", companionIds: fullPair,
    guidance: [gym,progression,"沒有合適訓練椅時，改選徒手全身；不要在不穩的家具上做胸推或支撐划船。"],
    items: [lift("dumbbell-squat",8,"8–10"),lift("dumbbell-chest-press",8,"8–10"),item("dumbbell-row",2,8,120,each(8)),item("glute-bridge",2,10,60),item("dead-bug",2,4,45,each(4))],
  }),
  template({ id: "builtin-core-control", name: "核心穩定｜基礎控制", category: "核心活動", durationLabel: "約 12–18 分鐘",
    description: "以穩定與呼吸為主，不靠忍痛硬撐。", equipmentNote: "瑜珈墊；膝部可加折毛巾。", companionIds: matPair,
    guidance: ["腹部曲線也受飲食、體脂與整體活動影響；核心課表不等於局部減脂。", "死蟲式可改腳跟滑動；側棒式先每側 10 秒，穩定後到 15 秒，肩膝不適可省略。", "若與全身課表同日，這張取代原核心段落，不要兩份全做。"],
    items: [item("heel-slide",1,10,45,combined),item("dead-bug",2,4,45,each(4)),item("bird-dog",2,4,45,each(4)),item("knee-side-plank",2,10,45,sides)],
  }),
  template({ id: "builtin-core-strength", name: "腹部肌力｜控制進階", category: "核心活動", durationLabel: "約 15–22 分鐘",
    description: "基礎控制熟悉後，加入捲腹與棒式。", equipmentNote: "瑜珈墊。", companionIds: matPair,
    guidance: ["捲腹先 8 次，逐步到 12 次；前棒式先 15 秒，穩定後到 25 秒；側棒式每側 15–20 秒。", "不拉頭、不憋氣；頸部不適時省略捲腹，改選核心穩定，不硬做。", "不保證局部減脂；與全身課表同日請取代原核心段落，不疊加兩整張。"],
    items: [item("dead-bug",2,5,45,each(5)),item("supine-crunch",2,8,60),item("front-plank",2,15,60),item("knee-side-plank",2,15,45,sides)],
  }),
  template({ id: "builtin-desk-reset", name: "久坐重啟｜腰背活動", category: "舒緩伸展", durationLabel: "約 6–9 分鐘",
    description: "從站姿到墊上，打斷久坐，不是腰痛治療。", equipmentNote: "瑜珈墊；無法躺下可只走動。",
    guidance: ["踏步先 60 秒，舒服時可到 90 秒；動作之間休息約 30 秒或依需要。", "髖折先小幅度，貓牛式膝腕不適可略過；伸展不舒服也可跳過。", "出現疼痛、麻木或無力就停止；持續或加重請尋求專業評估。"],
    items: [item("march-in-place",1,60,30),item("bodyweight-hip-hinge",1,6,30),item("cat-cow",1,30,30),item("pelvic-tilt",1,6,30),item("figure-four-stretch",2,20,30,sides)],
  }),
  template({ id: "builtin-neck-shoulder-ease", name: "肩頸鬆一點｜短時活動", category: "舒緩伸展", durationLabel: "約 5–8 分鐘",
    description: "小幅度活動，不拉脖子、不做頸部繞圈。", equipmentNote: "穩固椅子、門框；不需下地板。",
    guidance: ["選舒服幅度、先做少量；不是越痠就越用力拉。抬手不適可省略肩胛與門框動作。", "疼痛加重、頭暈、手麻或無力立即停止；持續痠痛請找醫師或物理治療師。"],
    items: [item("shoulder-roll",1,5,30),item("chin-tuck",1,5,30,"輕收下巴，短停約 2 秒，不向下低頭。"),item("seated-neck-rotation",1,6,30,"左右各 3 次，合計填 6；短停約 5 秒，不強拉。"),item("scapular-glide",2,5,30,sides),item("doorway-chest-stretch",1,20,30)],
  }),
  template({ id: "builtin-bedtime-flexibility", name: "睡前慢下來｜墊上伸展", category: "舒緩伸展", durationLabel: "約 6–10 分鐘",
    description: "全程墊上，不反覆站起，也不追求柔軟度極限。", equipmentNote: "瑜珈墊；膝部可墊折毛巾，需能安全起身。",
    guidance: [gentle,"跪姿或嬰兒式膝部不適就略過；扭轉先每側 15 秒，舒服時到 20 秒，不壓腿、不追求碰地。", "不便上下地板可改選肩頸鬆一點；這不是睡眠或疼痛治療。"],
    items: [item("cat-cow",1,30,30),item("child-pose",1,20,30),item("kneeling-hip-flexor-stretch",2,20,30,sides),item("figure-four-stretch",2,20,30,sides),item("supine-twist",2,15,30,sides)],
  }),
  template({ id: "builtin-full-body", name: "全身 A｜器械起步", category: "健身房", durationLabel: "約 30–40 分鐘，不含熱身／收尾",
    description: "腿推、胸推、划船、腿後側與核心。", equipmentNote: "腿推機、胸推機、坐姿划船機、腿彎舉機、瑜珈墊。", companionIds: fullPair,
    guidance: [gym,progression,"每週兩天可交替全身 A／B，肌力日之間留休息日；首次可各降至一組。", "胸推可換啞鈴胸推或史密斯臥推；划船可換胸靠版本；腿彎舉可換俯臥版本。先確認器材與技巧，擇一替換，不全部加入。"],
    items: [lift("leg-press",10,"10–12"),lift("machine-chest-press",10,"10–12"),lift("seated-row",10,"10–12"),lift("leg-curl",10,"10–12",true),item("dead-bug",2,4,45,each(4))],
  }),
  template({ id: "builtin-full-body-b", name: "全身 B｜混合肌力", category: "健身房", durationLabel: "約 35–45 分鐘，不含熱身／收尾",
    description: "以啞鈴、下拉與核心，練習不同的全身組合。", equipmentNote: "啞鈴、訓練椅、高位下拉機、瑜珈墊。", companionIds: fullPair,
    guidance: [gym,progression,"先熟悉髖折再做羅馬尼亞硬舉；不熟悉可先選全身 A。側棒式先每側 10 秒，穩定後到 20 秒。", "下拉可換輔助引體，先學會機台進出；徒手引體是進階選擇，不視為相同難度。"],
    items: [lift("dumbbell-squat",8,"8–10"),lift("lat-pulldown",8,"8–10"),lift("dumbbell-chest-press",8,"8–10"),lift("dumbbell-romanian-deadlift",8,"8–10"),item("knee-side-plank",2,10,45,sides)],
  }),
  template({ id: "builtin-push", name: "上肢 A｜基礎推拉", category: "健身房", durationLabel: "約 35–45 分鐘，不含熱身／收尾",
    description: "胸部推力、背部拉力，再接肩與三頭肌。", equipmentNote: "胸推機、高位下拉機、坐姿划船機、啞鈴、滑輪機。", companionIds: upperPair,
    guidance: [gym,progression,"胸推可換啞鈴或史密斯臥推；划船可換胸靠器械或胸靠啞鈴划船，先調整支撐。", "每種替代只選一項；肩膀不適不強做側平舉。"],
    items: [lift("machine-chest-press",8,"8–12"),lift("lat-pulldown",8,"8–12"),lift("seated-row",8,"8–12"),lift("dumbbell-lateral-raise",10,"10–15",true),lift("cable-triceps-pushdown",10,"10–15",true)],
  }),
  template({ id: "builtin-pull", name: "上肢 B｜胸背變化", category: "健身房", durationLabel: "約 35–45 分鐘，不含熱身／收尾",
    description: "上斜胸推、胸靠划船，再練後肩與手臂。", equipmentNote: "可調訓練椅、啞鈴、胸靠划船機、蝴蝶機。", companionIds: upperPair,
    guidance: [gym,progression,"上斜啞鈴可換史密斯上斜臥推；槓鈴版本留給熟悉卸槓與回架的人。", "槌式彎舉可改牧師椅彎舉機或站姿滑輪彎舉，握法與刺激不同，重新選輕重量。", "過頭伸展若肩膀不適，停止並可改舒適的滑輪三頭下壓；不是忍痛拉大角度。"],
    items: [lift("incline-dumbbell-press",8,"8–12"),lift("chest-supported-machine-row",8,"8–12"),lift("reverse-pec-deck",10,"10–12",true),lift("dumbbell-hammer-curl",10,"10–12",true),lift("seated-dumbbell-overhead-extension",10,"10–12",true)],
  }),
  template({ id: "builtin-lower-body", name: "下肢 A｜腿部基礎", category: "健身房", durationLabel: "約 35–45 分鐘，不含熱身／收尾",
    description: "腿前後側、內收與小腿，從器械開始。", equipmentNote: "腿推機、腿彎舉機、腿屈伸機、大腿內收機、小腿訓練機。", companionIds: lowerPair,
    guidance: [gym,progression,"腿推可換哈克深蹲或史密斯深蹲，但需先學會設定與安全回架，不沿用原重量。", "腿彎舉可選坐姿或俯臥，擇一即可；提踵可減量改扶椅雙腳版本。"],
    items: [lift("leg-press",10,"10–12"),lift("leg-curl",10,"10–12",true),lift("leg-extension",10,"10–12",true),lift("machine-hip-adduction",10,"10–12",true),lift("standing-calf-raise",12,"12–15",true)],
  }),
  template({ id: "builtin-lower-body-b", name: "下肢 B｜臀腿後側", category: "健身房", durationLabel: "約 40–50 分鐘，不含熱身／收尾",
    description: "髖折、臀推、分腿蹲與腿後側；適合已熟悉基礎的人。", equipmentNote: "啞鈴、臀推機、俯臥腿彎舉機、大腿外展機。", companionIds: lowerPair,
    guidance: [gym,progression,"需先熟悉髖折與分腿站姿，不作為初次居家活動的預設課表。", "不穩時先放下啞鈴、縮小幅度；臀推機可改臀橋，腿彎舉可換坐姿版本。", "保加利亞分腿蹲、前蹲、地雷管與槓鈴俯身划船不是穩定器械的一鍵等難度替代。"],
    items: [lift("dumbbell-romanian-deadlift",8,"8–12"),lift("machine-hip-thrust",8,"8–12"),item("dumbbell-static-split-squat",2,8,120,each(8)),lift("lying-leg-curl",8,"8–12",true),lift("machine-hip-abduction",8,"8–12",true)],
  }),
];

const short = (id: string, name: string, kind: "warmup" | "cooldown", items: WorkoutTemplateItem[], equipmentNote: string, guidance: string[], home = false): WorkoutTemplate => template({
  id, name, kind, description: kind === "warmup" ? "主訓練前的準備流程。" : "主訓練後的降速與輕伸展。",
  durationLabel: home ? "約 3–5 分鐘，可依狀態延長" : "約 5–10 分鐘，可依狀態延長", equipmentNote,
  guidance: [kind === "warmup" ? "循序暖身，不追求疲勞；使用重量器材時，主動作另做 1–2 組輕重量熟悉組，不當正式工作組。" : "逐漸降速再輕伸展；剛完成較強運動時，可先慢走 5–10 分鐘。伸展不保證避免痠痛。",
    ...guidance,"可與主課表一起加入今日課表：熱身排前、收尾排後，最後一起打卡，不必分開提交。"], items,
});
const march = (seconds: number) => item("march-in-place",1,seconds,15,"也可室內走動；收尾時逐漸放慢。");
const roll = () => item("shoulder-roll",1,5,15);
const ankle = () => item("wall-ankle-mobility",2,5,15,sides);
const calf = () => item("wall-calf-stretch",2,20,15,sides);
const hamstring = () => item("chair-hamstring-stretch",2,20,15,sides);
export const preparationRoutines: WorkoutTemplate[] = [
  short("warmup-home","居家站姿｜熱身","warmup",[march(90),roll(),item("chair-sit-to-stand",1,3,15)],"穩固椅子、固定扶物。",["低強度站姿練習的短準備；還沒暖起來就延長走動。"],true),
  short("cooldown-home","居家站姿｜收尾","cooldown",[march(60),calf(),hamstring()],"牆面、穩固椅子。",[gentle],true),
  short("warmup-mat","墊上／核心｜熱身","warmup",[march(90),item("pelvic-tilt",1,4,15),item("heel-slide",1,6,15,"左右合計 6 次，每側 3 次。")],"瑜珈墊。",["先短走動再躺下，小幅度練習，不必在站姿與墊上反覆切換。"],true),
  short("cooldown-mat","墊上／核心｜收尾","cooldown",[item("figure-four-stretch",2,20,20,sides),item("child-pose",1,20,20)],"瑜珈墊；膝部可加毛巾。",[gentle,"已完成低強度墊上活動可留在墊上；嬰兒式膝部不適可省略，改舒服姿勢自然呼吸。"],true),
  short("warmup-full","全身肌力｜熱身","warmup",[march(180),ankle(),item("bodyweight-hip-hinge",1,6,15),item("wall-push-up",1,5,15)],"牆面、固定扶物。",["接著以輕重量熟悉當天的蹲／腿推、胸推及划船；仍冷或僵硬時延長走動。"]),
  short("cooldown-full","全身肌力｜收尾","cooldown",[march(120),item("doorway-chest-stretch",1,20,15),item("supported-lat-stretch",1,20,15),calf(),hamstring()],"門框、固定檯面、穩固椅子。",[gentle,"可只選伸展舒服的 2–3 項；肩膀抬手會痛就省略胸背伸展。"]),
  short("warmup-push","上肢肌力｜熱身","warmup",[march(180),roll(),item("scapular-glide",2,5,15,sides),item("wall-push-up",1,5,15)],"牆面、固定扶物。",["接著以輕重量練習當天推與拉的路徑，不在熱身做到疲勞。"]),
  short("cooldown-push","上肢肌力｜收尾","cooldown",[march(120),item("doorway-chest-stretch",1,20,15),item("supported-lat-stretch",1,20,15)],"門框、固定檯面。",[gentle,"肩膀抬手會痛就略過對應伸展。"]),
  short("warmup-lower","下肢肌力｜熱身","warmup",[march(180),ankle(),item("bodyweight-hip-hinge",1,6,15),item("bodyweight-squat",1,5,15,"小幅蹲即可，也可改椅子坐站。")],"牆面、固定扶物。",["接著以輕重量熟悉當天腿推、髖折或臀推。"]),
  short("cooldown-lower","下肢肌力｜收尾","cooldown",[march(120),calf(),hamstring(),item("figure-four-stretch",2,20,15,sides)],"牆面、穩固椅子、瑜珈墊。",[gentle,"不方便躺下可略過四字伸展。"]),
];

// Read-time aliases keep old preferences usable; saved workout snapshots are untouched.
export function canonicalTemplateId(id: string): string {
  return id === "warmup-pull" ? "warmup-push" : id === "cooldown-pull" ? "cooldown-push" : id;
}
