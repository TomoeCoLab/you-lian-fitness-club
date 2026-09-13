import type { GuideExercise, GuideVideo } from "../types";

const yt = (id: string, title: string, channel: string): GuideVideo => ({
  embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0`,
  watchUrl: `https://www.youtube.com/watch?v=${id}`, title, channel, language: "英文",
});
const strength = "https://www.nhs.uk/live-well/exercise/strength-exercises/";
const spine = "https://www.nuh.nhs.uk/exercise-videos-spine-school";
const trauma = "https://www.lancsteachinghospitals.nhs.uk/trauma-exercises";
const chair = "使用不會滑動、沒有輪子的穩固椅子，靠牆固定；地面保持乾燥。";
const neck = "若疼痛加重、頭暈、手麻或無力，立即停止；持續痠痛請找醫師或物理治療師評估。";
const reps = (n: number, load: string, sets = 1, restSeconds = 30) => ({ sets, reps: n, durationSeconds: null, restSeconds, load });
const hold = (seconds: number, load: string, sets = 2) => ({ sets, reps: null, durationSeconds: seconds, restSeconds: 15, load });

// General-wellness starter doses, not the rehabilitation prescriptions on source sites.
export const homeExercises: GuideExercise[] = [
  {
    id: "march-in-place", name: "原地踏步", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "time",
    summary: "用小步伐讓身體逐漸活動起來，可作為居家活動或熱身的起點。",
    instructions: ["站在平坦防滑的地面，雙腳自然分開；需要時扶住固定檯面。", "一腳輕輕抬離地面，不必把膝蓋抬高。", "輕放回地面，再換另一腳，雙手自然擺動。", "維持能輕鬆說話的速度；收尾時逐漸放慢。"],
    cues: ["不跳躍、不重踩，膝蓋朝前。", "不穩時扶固定檯面，不追求抬腿高度。"],
    recommendation: hold(30, "先做 30 秒；熱身時可逐步延長，感覺吃力就放慢或休息。", 1),
    video: yt("hno83jTbZrM", "原地踏步示範", "Lancashire & South Cumbria NHS"), sourceUrl: "https://www.lscft.nhs.uk/services/service-finder-z/community-pain-service/useful-resources", sourceLabel: "Lancashire NHS 動作示範",
  },
  {
    id: "chair-sit-to-stand", name: "椅子坐站", bodyParts: ["腿", "核心"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "從椅子站起再坐回，練習日常起身所需的腿臀力量。",
    instructions: [chair, "坐在椅面前半部，雙腳踩穩、膝蓋約直角。", "從髖部略往前傾，腳掌向地面出力，緩慢站起。", "臀部往後找椅面，控制坐回，不直接跌坐。"],
    cues: ["膝蓋跟隨腳尖，不向內夾。", "可用扶手協助或選稍高椅面；不要拉會翻倒的家具。"],
    recommendation: reps(5, "先徒手 5 次。起身困難可用扶手，穩定後才增加到 8–10 次。"),
    video: yt("xeKgx4BYkDo", "椅子坐站示範", "Nottingham University Hospitals NHS"), sourceUrl: strength, sourceLabel: "NHS 肌力活動指引",
  },
  {
    id: "wall-push-up", name: "牆壁伏地挺身", bodyParts: ["胸", "手臂", "核心"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "利用牆面降低負荷，練習上半身推力。",
    instructions: ["雙手放在牆面胸口至肩膀高度，略比肩寬，雙腳站穩。", "身體從頭到腳保持自然直線，慢慢彎肘靠近牆面。", "手肘自然向斜後方，不向兩旁大幅張開。", "吐氣推回起點，胸口和臀部一起移動。"],
    cues: ["靠牆近一點較容易，先用小幅度。", "不塌腰、不聳肩；手腕或肩膀疼痛就停止。"],
    recommendation: reps(5, "徒手，先 5 次；動作穩定後再逐步增加至 10 次。"),
    video: yt("kmzcmFZ9NyY", "牆壁伏地挺身示範", "South Tees Hospitals NHS"), sourceUrl: "https://www.southtees.nhs.uk/resources/combined-press-ups/", sourceLabel: "South Tees NHS 牆面推力指引",
  },
  {
    id: "supported-calf-raise", name: "扶椅雙腳提踵", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "扶穩支撐後，練習雙腳抬起腳跟，活動小腿。",
    instructions: [chair, "雙手扶椅背，雙腳與髖同寬、腳尖朝前。", "腳前掌留在地面，雙腳腳跟一起慢慢抬高。", "短暫停留後慢慢放下，回到整個腳掌著地。"],
    cues: ["不把腳踝往內或往外翻，不前後搖晃。", "全程扶穩；只抬到能控制的高度。"], recommendation: reps(5, "不加重量；雙腳一起做，先不嘗試單腳版本。"),
    video: { ...yt("Obtwzv5WxaM", "扶椅雙腳提踵示範", "Peak Physio"), embedUrl: "https://www.youtube-nocookie.com/embed/Obtwzv5WxaM?rel=0&end=6", note: "本頁播放影片開頭的雙腳提踵片段；原始影片後段另有其他椅旁動作，無需一併跟做。椅子務必靠牆固定。" }, sourceUrl: "https://www.peak-physio.com.au/exercise/chair-exercises/", sourceLabel: "Peak Physio 扶椅活動指引",
  },
  {
    id: "supported-hip-abduction", name: "扶椅站姿側抬腿", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "扶著固定支撐，小幅側抬腿練習臀部外側控制。",
    instructions: [chair, "站直扶穩，腳尖朝前，先站穩支撐腳。", "另一腿向側邊小幅抬離地面，骨盆保持水平。", "控制放回，再重複；完成一組後換側。"],
    cues: ["不歪腰、不靠身體側倒增加高度。", "支撐膝不鎖死，抬腿腳尖不要轉向天花板。"], recommendation: reps(5, "每組一側 5 次，共 2 組：第一組左側，第二組右側。", 2),
    video: yt("wl5RfJ1ZjIE", "站姿側抬腿示範", "NHS Golden Jubilee"), sourceUrl: strength, sourceLabel: "NHS 肌力活動指引",
  },
  {
    id: "supported-weight-shift", name: "扶穩重心左右轉移", bodyParts: ["腿", "核心"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "雙腳不離地，在穩固支撐旁練習小幅度重心移動。",
    instructions: ["面向不會移動的檯面，雙手扶穩，雙腳與髖同寬。", "把重心緩慢移向一腳，兩腳腳掌都留在地面。", "回到中間，再移向另一腳。", "每移向一側再回正算 1 次，左右合計 10 次。"],
    cues: ["不抬腳、不閉眼、不向旁邊大幅歪腰。", "旁邊留出空間；不穩或頭暈就停止並坐下。"], recommendation: reps(10, "左右合計 10 次，每側 5 次；雙手全程扶穩。"),
    video: { ...yt("O4-q0_GpfdA", "扶穩站姿重心轉移示範", "Caregiver Stress / Home Instead"), note: "教練先示範左右重心轉移，再由練習者扶椅操作。本課表請全程扶穩，不跟著做無支撐版本。" }, sourceUrl: "https://hw.qld.gov.au/blog/exercises-to-help-improve-balance/", sourceLabel: "Health and Wellbeing Queensland 平衡活動指引",
  },
  {
    id: "pelvic-tilt", name: "仰躺骨盆前後傾", bodyParts: ["核心", "背"], equipment: "瑜珈墊", difficulty: "入門", tracking: "reps",
    summary: "仰躺小幅度轉動骨盆，練習腰腹的溫和控制，不是把臀部抬起。",
    instructions: ["仰躺屈膝、雙腳踩墊，頭肩和臀部自然靠墊。", "吐氣，輕輕讓骨盆後傾，下背靠近墊面。", "吸氣回到自然位置，保留舒服的小弧度。", "慢慢重複，不用追求最大的拱腰幅度。"],
    cues: ["臀部不離墊，不做成臀橋。", "不憋氣、不用力壓腰；若腰部不適就縮小幅度或停止。"], recommendation: reps(6, "徒手 6 次，小幅度即可；不適合拿來硬壓疼痛。"),
    video: yt("RZi6di5IjW8", "仰躺骨盆傾斜示範", "Nottingham University Hospitals NHS"), sourceUrl: spine, sourceLabel: "Nottingham NHS 脊椎動作教學",
  },
  {
    id: "heel-slide", name: "仰躺腳跟滑動", bodyParts: ["核心", "腿"], equipment: "瑜珈墊", difficulty: "入門", tracking: "reps",
    summary: "腳跟貼墊滑動，在四肢移動時維持軀幹穩定，是死蟲式的較輕版本。",
    instructions: ["仰躺屈膝，雙腳踩穩，腹部輕輕出力。", "吐氣，一側腳跟沿墊面滑遠，另一腳保持原位。", "只滑到腰背不拱起的位置，再吸氣滑回。", "左右交替；一次滑出再回來算 1 次。"],
    cues: ["腳跟全程接觸墊面，不抬腿。", "骨盆不左右晃動，幅度可以很小。"], recommendation: reps(10, "左右合計 10 次，每側 5 次。腰背無法穩定時縮短滑動距離。"),
    video: yt("t2sYmCjr7Hs", "腹部控制與腳跟滑動", "Nottingham University Hospitals NHS"), sourceUrl: spine, sourceLabel: "Nottingham NHS 腹部控制教學",
  },
  {
    id: "knee-side-plank", name: "屈膝側棒式", bodyParts: ["核心", "肩"], equipment: "瑜珈墊", difficulty: "入門", tracking: "time",
    summary: "以前臂與屈膝支撐，練習側腹穩定；比雙腿伸直的側棒式容易。",
    instructions: ["側躺，雙膝彎曲疊放，手肘放在肩膀正下方。", "以前臂和下側膝部支撐，把髖部抬離墊面。", "肩膀、髖部、膝蓋連成自然直線，維持呼吸。", "慢慢放下，休息後下一組換側。"],
    cues: ["不塌腰、不轉向地面，也不把肩膀擠向耳朵。", "肩或膝壓痛時停止，可改做仰躺腳跟滑動。"], recommendation: hold(10, "共 2 組，每側 10 秒；第一組左側、第二組右側。"),
    video: yt("a59BIeTP7DY", "屈膝側棒式示範", "Keep It Moving Physical Therapy & Wellness"), sourceUrl: "https://prophysiotherapy.in/exercises/side-plank-modified-from-knees", sourceLabel: "物理治療師審閱：屈膝側棒式",
  },
  {
    id: "shoulder-roll", name: "肩膀緩慢繞動", bodyParts: ["肩", "背"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "手臂放鬆，讓肩膀做小圈活動，適合久坐空檔。",
    instructions: ["坐穩或站穩，手臂自然垂放，眼睛平視。", "輕輕提起雙肩，再慢慢向後繞。", "把肩膀放回自然位置，完成 1 圈。", "小圈慢慢重複，脖子不要一起轉圈。"],
    cues: ["不強迫用力夾背，不做大幅甩肩。", neck], recommendation: reps(5, "向後小圈 5 次即可；也可坐在穩固椅子上。"),
    video: yt("SGocpsxRkBM", "肩膀繞動示範", "Peak Physio"), sourceUrl: "https://www.peak-physio.com.au/exercise/shoulder-rolls/", sourceLabel: "Peak Physio 肩膀活動指引",
  },
  {
    id: "seated-neck-rotation", name: "坐姿頸部左右轉動", bodyParts: ["肩"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "保持身體朝前，在舒服範圍內緩慢轉頭，不拉扯頸部。",
    instructions: ["坐穩，雙腳著地，手放大腿，眼睛看前方。", "慢慢轉頭朝一側，只到舒服的位置，短停約 5 秒。", "回到正中，再轉向另一側。", "左右各 3 次，合計記 6 次。"],
    cues: ["肩膀不跟著轉、不仰頭；不用手扳頭。", neck], recommendation: reps(6, "左右各 3 次，每次短停約 5 秒；幅度以舒服為準。"),
    video: { ...yt("b6b_8mmexj4", "坐姿頸部轉動：左側示範", "South Tees Hospitals NHS"), note: "影片示範轉向左側；回正後以相同的小幅動作換右側，不用手扳頭。" }, sourceUrl: "https://www.nhs.uk/live-well/exercise/flexibility-exercises/", sourceLabel: "NHS 溫和活動指引",
  },
  {
    id: "chin-tuck", name: "坐姿下巴後收", bodyParts: ["肩"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "保持視線水平，讓頭部輕輕後移；不是把下巴往胸口壓。",
    instructions: ["坐穩、肩膀放鬆，頭部自然，眼睛平視。", "頭部小幅水平向後移，下巴略往內收。", "輕停約 2 秒，不用力，保持呼吸。", "放鬆回到自然位置，慢慢重複。"],
    cues: ["不低頭、不仰頭、不用手推頭。", neck], recommendation: reps(5, "小幅度做 5 次；沒有不適才繼續，不追求用力或角度。"),
    video: { ...yt("14UhAiWiMq0", "坐姿下巴後收示範", "PhysioExercise"), language: "其他語言", note: "影片含荷蘭語說明；以本頁中文步驟輔助觀看，只做頭部小幅水平後移，不用手用力推頭。" }, sourceUrl: trauma, sourceLabel: "Lancashire NHS 頸部動作示範",
  },
  {
    id: "scapular-glide", name: "站姿肩胛前伸與後收", bodyParts: ["肩", "背"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "手臂抬在舒服高度，用肩胛的前後滑動練習上背控制。",
    instructions: ["站穩，一手向前抬至舒服的高度，最高約肩高。", "手肘保持伸直但不鎖死，手掌向前多送一點，讓肩胛滑向外側。", "手臂輕輕回收，讓肩胛靠回胸廓，不用力夾背。", "一組做 5 次，再換另一手。"],
    cues: ["不是彎肘划船，也不靠扭腰或聳肩完成。", "抬手不適可降低高度；疼痛持續就停止。"], recommendation: reps(5, "共 2 組，每側 5 次。若抬手不舒服，先改肩膀緩慢繞動。", 2),
    video: yt("OP8_zF0bh7M", "站姿肩胛控制示範", "Peak Physio"), sourceUrl: "https://www.peak-physio.com.au/exercise/serratus-anterior-open-chain/", sourceLabel: "Peak Physio 肩胛控制指引",
  },
  {
    id: "bodyweight-hip-hinge", name: "徒手髖折", bodyParts: ["腿", "背", "核心"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "練習從髖部折疊，而不是彎腰駝背，可用於下肢訓練前準備。",
    instructions: ["雙腳與髖同寬，膝蓋微彎，手輕放髖部。", "臀部向後移，上半身跟著從髖部前傾。", "背部保持自然，停在腿後側微有張力且能控制的位置。", "腳掌踩穩，臀部出力回到站姿，不往後仰。"],
    cues: ["小幅練習即可，不追求摸地。", "膝蓋略彎但不做成深蹲，脖子跟背部同方向。"], recommendation: reps(8, "先不拿重量，8 次。能維持背部自然後再學負重動作。"),
    video: yt("2W_gXhut5S8", "徒手髖折教學", "Hinge Health"), sourceUrl: "https://www.youtube.com/watch?v=2W_gXhut5S8", sourceLabel: "Hinge Health 物理治療師髖折指引",
  },
  {
    id: "wall-ankle-mobility", name: "扶牆踝關節前移", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "reps",
    summary: "腳跟不抬起，讓膝蓋小幅前移，練習踝關節活動。",
    instructions: ["雙手扶牆，一腳在前，腳尖離牆一小段距離，另一腳在後支撐。", "前腳腳跟留在地面，膝蓋朝第二腳趾方向慢慢前移。", "可輕碰牆，但不必硬碰到；前腳跟不能抬起。", "退回起點，重複 5 次再換側。"],
    cues: ["不向內倒膝、不靠腳踝內翻湊距離。", "腳踝前方夾痛就停止或縮小幅度，不用力壓膝。"], recommendation: reps(5, "每側 5 次，共 2 組；離牆距離以腳跟能著地為準。", 2),
    video: yt("rulADo6OOLs", "膝蓋前移與腳跟著地示範", "Physio Plus Fitness"), sourceUrl: "https://uk.physitrack.com/home-exercise-video/knee-to-wall---ankle-dorsiflexion", sourceLabel: "Physitrack 踝關節活動說明",
  },
  {
    id: "doorway-chest-stretch", name: "門框胸部伸展", bodyParts: ["胸", "肩"], equipment: "徒手", difficulty: "入門", tracking: "time",
    summary: "扶穩門框，輕輕移動身體，感受胸前溫和拉伸。",
    instructions: ["站在穩固門框內，雙前臂扶在兩側，手肘約肩高或稍低。", "一腳小步往前，身體慢慢前移。", "胸前有輕微拉伸即可，腰背保持自然，不仰頭。", "維持約 20 秒後退回，放鬆雙手。"],
    cues: ["不壓到肩膀前側疼痛，不彈震。", "手麻、刺痛或肩膀不舒服就停止，不強拉。"], recommendation: hold(20, "不加重量，輕拉 20 秒即可；不是越痛越有效。", 1),
    video: { ...yt("3EUCP4okOvs", "門框胸部伸展：單側版本", "UCSF Orthopaedic Surgery"), note: "影片示範單側扶門框的變化；圖解為雙側版本。兩者皆只需胸前輕微拉伸，不向肩膀硬壓。" }, sourceUrl: "https://sportsrehab.ucsf.edu/elbow", sourceLabel: "UCSF 上肢伸展指引",
  },
  {
    id: "wall-calf-stretch", name: "扶牆小腿伸展", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "time",
    summary: "前後站姿讓後腳小腿溫和伸展，適合活動後使用。",
    instructions: ["雙手扶牆，一腳在前、另一腳往後。", "兩腳腳尖朝前，後膝自然伸直，後腳跟踩地。", "前膝微彎，身體慢慢前移，到後側小腿輕拉的位置。", "維持 20 秒，退回後換腳。"],
    cues: ["後腳跟不離地，腳尖不要往外轉。", "不彈震、不忍受刺痛，先縮短前後距離。"], recommendation: hold(20, "每組一側 20 秒，共 2 組，左右各一次。"),
    video: yt("A8GwnrsDLi8", "扶牆小腿伸展示範", "South Tees Hospitals NHS"), sourceUrl: "https://www.southtees.nhs.uk/resources/upper-calf-stretch/", sourceLabel: "South Tees NHS 小腿伸展指引",
  },
  {
    id: "chair-hamstring-stretch", name: "坐姿單腿腿後側伸展", bodyParts: ["腿"], equipment: "徒手", difficulty: "入門", tracking: "time",
    summary: "坐在椅子上伸展單側腿後肌群，不必坐到地板或摸到腳尖。",
    instructions: [chair, "坐在前半部，一腳伸向前、腳跟著地，另一腳踩穩。", "背部自然，從髖部輕微前傾，雙手放在未伸直那腿的大腿上。", "腿後側輕拉即可，維持 20 秒後坐正換腿。"],
    cues: ["不用伸手摸腳，也不壓住膝蓋。", "不駝背硬拉，膝可微彎；麻或刺痛時停止。"], recommendation: hold(20, "每組一側 20 秒，共 2 組，左右各一次。"),
    video: yt("wS2lF2QrWJw", "坐姿腿後側伸展示範", "South Tees Hospitals NHS"), sourceUrl: "https://www.southtees.nhs.uk/resources/hamstring-stretch-2/", sourceLabel: "South Tees NHS 腿後側伸展",
  },
  {
    id: "supported-lat-stretch", name: "站姿扶穩背闊肌伸展", bodyParts: ["背", "肩"], equipment: "徒手", difficulty: "入門", tracking: "time",
    summary: "雙手扶固定檯面、臀部往後移，溫和伸展背部與腋下周圍。",
    instructions: ["選不會滑動或翻倒的固定檯面，雙手扶穩、腳與髖同寬。", "膝蓋微彎，臀部往後，身體從髖部前傾。", "手臂沿身體向前延伸，背部自然，脖子跟背部同方向。", "輕拉 20 秒後慢慢走近檯面、站回來。"],
    cues: ["不往下硬壓胸口，不把腰拱起。", "肩膀抬高會痛時跳過；不拉會移動的椅子。"], recommendation: hold(20, "徒手輕拉 20 秒，1 組；不必把身體壓到水平。", 1),
    video: { ...yt("Ux1E-Moqa0U", "扶檯面背部伸展示範", "RehabLex"), note: "影片使用椅背示範；居家請優先用固定檯面，避免椅子滑動或翻倒。" }, sourceUrl: "https://www.acefitness.org/resources/everyone/exercise-library/198/90-lat-stretch/", sourceLabel: "ACE 背部伸展指引",
  },
];
