import { ArrowRight } from "lucide-react";
import type { GuideExercise } from "../types";
import { EquipmentIcon } from "./EquipmentIcon";

type Pose = "站姿" | "深蹲" | "髖折疊" | "弓箭步" | "坐姿" | "仰躺" | "俯臥" | "四足跪姿" | "棒式" | "瑜珈";

function poseFor({ id }: GuideExercise): Pose {
  if (/squat|wall-sit|leg-press|leg-extension|leg-curl|calf|adduction|abduction/.test(id)) return /adduction|abduction|leg-/.test(id) ? "坐姿" : "深蹲";
  if (/deadlift|swing|back-extension|seated-forward/.test(id)) return "髖折疊";
  if (/lunge/.test(id)) return "弓箭步";
  if (/press|row|pulldown|pec-deck|curl|triceps|face-pull|assisted/.test(id)) return /bench|chest-press/.test(id) ? "仰躺" : /seated|machine|pulldown|pec-deck/.test(id) ? "坐姿" : "站姿";
  if (/bird-dog|cat-cow|child|thread/.test(id)) return "四足跪姿";
  if (/push-up|plank|mountain/.test(id)) return "棒式";
  if (/glute-bridge|dead-bug|figure-four|supine/.test(id)) return "仰躺";
  if (/superman|cobra/.test(id)) return "俯臥";
  if (/stretch|downward/.test(id)) return "瑜珈";
  return "站姿";
}

function Mannequin({ pose, finish }: { pose: Pose; finish: boolean }) {
  const limb = { stroke: "#3a3b3d", strokeWidth: 12, strokeLinecap: "round" as const };
  const joint = { fill: "#f4f3ef", stroke: "#17181a", strokeWidth: 2 };
  if (pose === "坐姿") return <g><path d="M29 82h56v7H29z" fill="#b8bab5"/><path d="M32 29v38" {...limb}/><circle cx="32" cy="18" r="10" {...joint}/><path d="M30 64 49 75" {...limb}/><path d={finish ? "M49 75 68 72" : "M49 75 50 99"} {...limb}/><path d={finish ? "M30 64 12 75" : "M30 64 27 99"} {...limb}/><path d={finish ? "M12 75 2 72" : "M27 99 27 112"} {...limb}/><path d="M32 39 18 58m14-19 14 19" {...limb}/><circle cx="32" cy="48" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "仰躺") return <g><path d="M9 86h104v7H9z" fill="#b8bab5"/><circle cx="28" cy="68" r="10" {...joint}/><path d="M38 72 72 81" {...limb}/><path d={finish ? "M55 77 49 38" : "M55 77 57 55"} {...limb}/><path d={finish ? "M64 79 72 39" : "M64 79 75 58"} {...limb}/><path d="M72 81 92 65m-20 16 22 9" {...limb}/><circle cx="58" cy="76" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "棒式" || pose === "俯臥") return <g><path d="M7 103h106" stroke="#b8bab5" strokeWidth="5"/><circle cx="25" cy={finish && pose === "俯臥" ? 58 : 76} r="9" {...joint}/><path d={finish && pose === "俯臥" ? "M34 64 72 70" : "M34 79 75 84"} {...limb}/><path d="M48 82 35 101m38-17 30 18" {...limb}/><path d={finish && pose === "俯臥" ? "M43 67 18 47" : "M44 81 21 99"} {...limb}/><circle cx="56" cy="80" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "四足跪姿") return <g><path d="M7 105h106" stroke="#b8bab5" strokeWidth="5"/><circle cx="28" cy={finish ? 55 : 69} r="9" {...joint}/><path d="M37 73 72 75" {...limb}/><path d={finish ? "M42 74 17 51" : "M42 74 31 101"} {...limb}/><path d={finish ? "M71 75 101 57" : "M71 75 84 102"} {...limb}/><circle cx="58" cy="74" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "髖折疊") return <g><circle cx={finish ? 54 : 31} cy={finish ? 19 : 44} r="10" {...joint}/><path d={finish ? "M51 30 50 67" : "M37 51 61 70"} {...limb}/><path d="M52 65 36 101m16-36 18 36" {...limb}/><path d={finish ? "M51 42 31 61m20-19 20 19" : "M48 59 35 79m13-20 17 17"} {...limb}/><circle cx="52" cy="67" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "深蹲" || pose === "弓箭步") return <g><circle cx="52" cy={finish ? 27 : 17} r="10" {...joint}/><path d={finish ? "M52 38 48 66" : "M52 28 52 60"} {...limb}/><path d={finish ? "M48 65 30 83m18-18 23 15" : "M52 60 39 100m13-40 14 40"} {...limb}/><path d={pose === "弓箭步" && finish ? "M30 83 18 103m53-23 27 22" : finish ? "M30 83 24 103m47-23 10 23" : "M39 100 34 108m32-8 7 8"} {...limb}/><path d="M50 43 31 58m21-15 19 15" {...limb}/><circle cx="48" cy="65" r="8" fill="#b7f34a" opacity=".8"/></g>;
  if (pose === "瑜珈") return <g><path d="M7 105h106" stroke="#b8bab5" strokeWidth="5"/><circle cx={finish ? 36 : 51} cy={finish ? 56 : 18} r="9" {...joint}/><path d={finish ? "M44 62 67 76" : "M51 29 51 65"} {...limb}/><path d={finish ? "M67 76 92 103m-25-27-18 27" : "M51 65 38 103m13-38 14 38"} {...limb}/><path d={finish ? "M49 66 21 99m28-33 35 35" : "M51 40 32 57m19-17 19 17"} {...limb}/><circle cx="58" cy="70" r="8" fill="#b7f34a" opacity=".8"/></g>;
  return <g><circle cx="52" cy="17" r="10" {...joint}/><path d="M52 28v38" {...limb}/><path d={finish ? "M52 39 33 18m19 21 19-21" : "M52 40 34 62m18-22 18 22"} {...limb}/><path d="M52 65 39 103m13-38 14 38" {...limb}/><circle cx="52" cy="47" r="8" fill="#b7f34a" opacity=".8"/></g>;
}

export function ExerciseDiagram({ exercise }: { exercise: GuideExercise }) {
  const pose = poseFor(exercise);
  const reverseStages = exercise.id === "machine-hip-adduction";
  return <section className="exercise-diagram" aria-label={`${exercise.name} 假人分解圖`}>
    <div className="exercise-diagram__heading"><div><strong>假人動作圖解</strong><span>先看路徑，再開始動作</span></div><span><EquipmentIcon equipment={exercise.equipment} size={28}/>{exercise.equipment}</span></div>
    <div className="exercise-diagram__stages">
      <figure><svg viewBox="0 0 120 120" role="img" aria-label={`${exercise.name}起始姿勢`}><Mannequin pose={pose} finish={reverseStages}/></svg><figcaption>01 起始</figcaption></figure>
      <ArrowRight className="exercise-diagram__arrow" aria-hidden="true"/>
      <figure><svg viewBox="0 0 120 120" role="img" aria-label={`${exercise.name}完成姿勢`}><Mannequin pose={pose} finish={!reverseStages}/></svg><figcaption>02 完成</figcaption></figure>
    </div>
    <div className="exercise-diagram__cues">{exercise.cues.map((cue, index) => <span key={cue}><b>{index + 1}</b>{cue}</span>)}</div>
  </section>;
}
