// Generated from content/exercises/*.json. Do not edit.
import type { ContentAudit } from '../lib/contentAudit';
export const contentReviews: Record<string, ContentAudit> = {
  "march-in-place": {
    "revision": 4,
    "contentHash": "118fbf00580f7ae7e1379c8968b5ac52a001b72c942d4f485f8e28b87b5d0951",
    "variation": "原地踏步；本項起始設定：站在平坦防滑的地面，雙腳自然分開；需要時扶住固定檯面。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 30 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "118fbf00580f7ae7e1379c8968b5ac52a001b72c942d4f485f8e28b87b5d0951",
      "findings": [
        "已核對 Marching on the spot；本站不追求抬腿高度，30 秒是一般起始量。不是醫院開給使用者的復健處方。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "118fbf00580f7ae7e1379c8968b5ac52a001b72c942d4f485f8e28b87b5d0951",
      "reviewedImageSha256": "dd8c348246fe4871ded790717367d572b0c6f5ee4c69fed0d075cbf70d5ab306",
      "findings": [
        "重新對照輕抬、同腳落地與左右交替；30 秒 1 組相符。圖中 5 公分僅為示意，不是必達高度。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/hno83jTbZrM?start=21&end=28",
      "check": {
        "videoId": "hno83jTbZrM",
        "seconds": [
          21,
          23,
          25,
          27
        ],
        "start": 21,
        "end": 28,
        "observation": "已核對 21–28 秒為站姿交替抬腳，非前段坐姿；片中抬膝較高，本站只需舒適輕抬，不必跟到同高度。"
      },
      "findings": [
        "已核對 21–28 秒為站姿交替抬腳，非前段坐姿；片中抬膝較高，本站只需舒適輕抬，不必跟到同高度。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "118fbf00580f7ae7e1379c8968b5ac52a001b72c942d4f485f8e28b87b5d0951"
    }
  },
  "chair-sit-to-stand": {
    "revision": 2,
    "contentHash": "32ac626460f018c6e16bcdc78e455b25e407d02dafbdeb3aaee4b19c50ea6879",
    "variation": "椅子坐站；本項起始設定：使用不會滑動、沒有輪子的穩固椅子，靠牆固定；地面保持乾燥。",
    "counting": "一次完整動作加回程算 1 次，預設每組 5 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "32ac626460f018c6e16bcdc78e455b25e407d02dafbdeb3aaee4b19c50ea6879",
      "findings": [
        "已對照原始來源：穩固椅子與坐站控制。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "32ac626460f018c6e16bcdc78e455b25e407d02dafbdeb3aaee4b19c50ea6879",
      "reviewedImageSha256": "f89ad1472cfa3e3b94ee5bf8641be4eaf6fc76c8f91effa8b7a5efe17799f887",
      "findings": [
        "坐姿、前傾起身、站直及控制坐回順序可見；5 次 × 1 組相符。圖中椅子未畫靠牆，實際練習仍依文字固定椅子。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/xeKgx4BYkDo?rel=0",
      "check": {
        "videoId": "xeKgx4BYkDo",
        "seconds": [
          7,
          14,
          26
        ],
        "observation": "可見椅上坐姿、站起與坐回；影片雙手交叉胸前，可依需要扶穩椅子，次數以本次課表為準。"
      },
      "findings": [
        "可見椅上坐姿、站起與坐回；影片雙手交叉胸前，可依需要扶穩椅子，次數以本次課表為準。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "32ac626460f018c6e16bcdc78e455b25e407d02dafbdeb3aaee4b19c50ea6879"
    }
  },
  "wall-push-up": {
    "revision": 2,
    "contentHash": "34065c091d85b1015559ef0c1fc273c3e8405c60b8acd79e0a7d4ca7bb4c5019",
    "variation": "牆壁伏地挺身；本項起始設定：雙手放在牆面胸口至肩膀高度，略比肩寬，雙腳站穩。",
    "counting": "一次完整動作加回程算 1 次，預設每組 5 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "34065c091d85b1015559ef0c1fc273c3e8405c60b8acd79e0a7d4ca7bb4c5019",
      "findings": [
        "已對照原始來源：牆面推撐與身體成線。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "34065c091d85b1015559ef0c1fc273c3e8405c60b8acd79e0a7d4ca7bb4c5019",
      "reviewedImageSha256": "8800304dcd5bd8643ddad725b85f83ebec58969ca1e19c72ef8363da8a0aa295",
      "findings": [
        "側面顯示手撐牆、身體成線屈肘靠近再推回，5 次 × 1 組；未見明顯順序矛盾。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/kmzcmFZ9NyY?rel=0",
      "check": {
        "videoId": "kmzcmFZ9NyY",
        "seconds": [
          7,
          14,
          26
        ],
        "observation": "可見離牆站位與雙手推牆的版本；只在舒適距離內操作。"
      },
      "findings": [
        "可見離牆站位與雙手推牆的版本；只在舒適距離內操作。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "34065c091d85b1015559ef0c1fc273c3e8405c60b8acd79e0a7d4ca7bb4c5019"
    }
  },
  "supported-calf-raise": {
    "revision": 3,
    "contentHash": "5579b76a580d1945a8401f6959f721212c019ae94b5903900872c9b4623b81b5",
    "variation": "扶椅雙腳提踵；本項起始設定：使用不會滑動、沒有輪子的穩固椅子，靠牆固定；地面保持乾燥。",
    "counting": "一次完整動作加回程算 1 次，預設每組 5 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "5579b76a580d1945a8401f6959f721212c019ae94b5903900872c9b4623b81b5",
      "findings": [
        "已對照原始來源：扶椅提踵、控制下降。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "5579b76a580d1945a8401f6959f721212c019ae94b5903900872c9b4623b81b5",
      "reviewedImageSha256": "9274c0503339fb46baa1da28d2caa185d3f6b67f949492b7e7934dbe7f937a08",
      "findings": [
        "已逐格核對：固定椅座前緣貼牆、雙手扶椅，前腳掌持續著地、腳跟抬起再放回；1 組 × 5 次與文字相符。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/Obtwzv5WxaM?rel=0&end=6",
      "check": {
        "videoId": "Obtwzv5WxaM",
        "seconds": [
          3,
          5,
          10,
          19
        ],
        "end": 6,
        "observation": "已查看開頭雙腳扶椅提踵，內嵌於 6 秒結束；原片後段其他椅旁動作不屬於本項。"
      },
      "findings": [
        "已查看開頭雙腳扶椅提踵，內嵌於 6 秒結束；原片後段其他椅旁動作不屬於本項。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "5579b76a580d1945a8401f6959f721212c019ae94b5903900872c9b4623b81b5"
    }
  },
  "supported-hip-abduction": {
    "revision": 3,
    "contentHash": "38e0efea1e341923f56fa71f7296ac876cbfdf4c60e53aa6cf99848258dc71ad",
    "variation": "站姿扶穩固定支撐，軀幹直立的單側髖外展；不是側彎或骨盆側提。",
    "counting": "每組只做一側 5 次；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "38e0efea1e341923f56fa71f7296ac876cbfdf4c60e53aa6cf99848258dc71ad",
      "findings": [
        "已對照原始來源：側抬腿時身體直立。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "38e0efea1e341923f56fa71f7296ac876cbfdf4c60e53aa6cf99848258dc71ad",
      "reviewedImageSha256": "544e7ef956f0080d8893ea5ca045c7401804680cb43e0f12a02d688a594da8c6",
      "findings": [
        "新圖三格的軀幹直立、支撐腳著地、遠離椅子的腿小幅外展及控制放回可見；未再出現舊圖的明顯側傾。",
        "每側 5 次各 1 組、共 2 組及自然呼吸的文字與主檔相符。椅子仍須依現場確認不滑動、靠牆固定，不能由圖保證穩定性。",
        "已逐格視覺檢查，不是專業動作認證；舊圖與原問題保留在 illustration.history。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/wl5RfJ1ZjIE?rel=0",
      "check": {
        "videoId": "wl5RfJ1ZjIE",
        "seconds": [
          6,
          13,
          24
        ],
        "observation": "可見站姿扶穩、單腳向側抬起。影片用固定治療床，居家支撐需同樣穩固。"
      },
      "findings": [
        "可見站姿扶穩、單腳向側抬起。影片用固定治療床，居家支撐需同樣穩固。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "38e0efea1e341923f56fa71f7296ac876cbfdf4c60e53aa6cf99848258dc71ad"
    }
  },
  "supported-weight-shift": {
    "revision": 4,
    "contentHash": "32364f3902af3a28c65df71dc65786e7d1403bae7a65dbd7053733548b992159",
    "variation": "扶穩重心左右轉移；本項起始設定：面向不會移動的檯面，雙手扶穩，雙腳與髖同寬。",
    "counting": "移向一側並回正算 1 次；左右合計 10 次，每側 5 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "32364f3902af3a28c65df71dc65786e7d1403bae7a65dbd7053733548b992159",
      "findings": [
        "核對 Weight shifts；本站採全程扶穩、兩腳不離地的保守版，不要求移到單腳全承重或放手。合計 10 次為本站起始量。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "32364f3902af3a28c65df71dc65786e7d1403bae7a65dbd7053733548b992159",
      "reviewedImageSha256": "a555e434767cb811d449a284ee3d8333a71f351650b43f171acbc763f4ec3a98",
      "findings": [
        "雙腳全程接地、手扶穩、左右轉移與回中間可見；左右合計 10 次相符。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/O4-q0_GpfdA?rel=0",
      "check": {
        "videoId": "O4-q0_GpfdA",
        "seconds": [
          8,
          70,
          90,
          100
        ],
        "observation": "已核對扶椅者雙腳留地、左右重心轉移；教練另示範無扶物，本站請依文字全程扶穩。"
      },
      "findings": [
        "已核對扶椅者雙腳留地、左右重心轉移；教練另示範無扶物，本站請依文字全程扶穩。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "32364f3902af3a28c65df71dc65786e7d1403bae7a65dbd7053733548b992159"
    }
  },
  "pelvic-tilt": {
    "revision": 4,
    "contentHash": "1da1a9187c8daf4563ff7add5d4362c2e75bd77b17402c38d7eea079d5570b6c",
    "variation": "仰躺骨盆前後傾；本項起始設定：仰躺屈膝、雙腳踩墊，頭肩和臀部自然靠墊。",
    "counting": "一次完整動作加回程算 1 次，預設每組 6 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "1da1a9187c8daf4563ff7add5d4362c2e75bd77b17402c38d7eea079d5570b6c",
      "findings": [
        "核對原文與 Fig A/B 描述；不照抄最大前傾範圍，不鼓勵用力收腹或憋氣。本站 6 次為起始參考，不是來源處方。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "1da1a9187c8daf4563ff7add5d4362c2e75bd77b17402c38d7eea079d5570b6c",
      "reviewedImageSha256": "f9e8d210293a40f89ff32d1351f704a8c80532e2e14e661bfd3852dc8a371f6d",
      "findings": [
        "骨盆後傾時臀部未離墊，回到自然弧度而非臀橋；6 次 1 組相符。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/RZi6di5IjW8?start=0&end=28",
      "check": {
        "videoId": "RZi6di5IjW8",
        "seconds": [
          10,
          18,
          26
        ],
        "start": 0,
        "end": 28,
        "observation": "已實際核對屈膝仰躺骨盆前後傾；限定 0–28 秒，不連播末段伸腿。原片停 5 秒及 10–15 次不是本站份量。"
      },
      "findings": [
        "已實際核對屈膝仰躺骨盆前後傾；限定 0–28 秒，不連播末段伸腿。原片停 5 秒及 10–15 次不是本站份量。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "1da1a9187c8daf4563ff7add5d4362c2e75bd77b17402c38d7eea079d5570b6c"
    }
  },
  "heel-slide": {
    "revision": 4,
    "contentHash": "b6ade5192ec617052e8a3a5982cfa64b827c3774cb15739923d3a494cf045947",
    "variation": "仰躺腳跟滑動；本項起始設定：仰躺屈膝，雙腳踩穩，腹部輕輕出力。",
    "counting": "移向一側並回正算 1 次；左右合計 10 次，每側 5 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b6ade5192ec617052e8a3a5982cfa64b827c3774cb15739923d3a494cf045947",
      "findings": [
        "已讀完整動作教學；滑動範圍以腰背穩定為限。來源未指定呼吸與本站的合計次數。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b6ade5192ec617052e8a3a5982cfa64b827c3774cb15739923d3a494cf045947",
      "reviewedImageSha256": "d86e14ddbf095f8d02b27d9e2677116e8428bdb41785ffacb1f8f0d0b6016cf9",
      "findings": [
        "單腳腳跟沿墊滑遠，另一膝屈曲，回程和換側文字清楚；左右合计 10 次相符。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/t2sYmCjr7Hs?rel=0",
      "check": {
        "videoId": "t2sYmCjr7Hs",
        "seconds": [
          18,
          39,
          52,
          66
        ],
        "observation": "重新播放核對仰躺屈膝起始、單側腳跟沿墊滑出與回到屈膝；影片 5–10 次／側含本站每側 5 次，停留時間不覆蓋本站課表。"
      },
      "findings": [
        "重新播放核對仰躺屈膝起始、單側腳跟沿墊滑出與回到屈膝；影片 5–10 次／側含本站每側 5 次，停留時間不覆蓋本站課表。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "b6ade5192ec617052e8a3a5982cfa64b827c3774cb15739923d3a494cf045947"
    }
  },
  "knee-side-plank": {
    "revision": 6,
    "contentHash": "a94c09fa4209a08caf31ab974e33afbf9b0832a6c2323ded3b3fd44447e155a2",
    "variation": "屈膝側棒式；本項起始設定：側躺，雙膝彎曲疊放，手肘放在肩膀正下方。",
    "counting": "每組只保持一側 10 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "a94c09fa4209a08caf31ab974e33afbf9b0832a6c2323ded3b3fd44447e155a2",
      "findings": [
        "已核對屈膝保持版；本站每側 10 秒、共 2 組為起始量。回程採控制放下，不作反覆抬髖次數訓練。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "a94c09fa4209a08caf31ab974e33afbf9b0832a6c2323ded3b3fd44447e155a2",
      "reviewedImageSha256": "89a856930a0431ff32e8fe3c93e578f4b241085bd13447a4f2335be4d5b0804e",
      "findings": [
        "三格確認屈膝側躺、前臂與下側膝支撐抬髖、髖部放回；未示範抬上側腿。每側 10 秒、左右共 2 組。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。",
        "重新核圖為右前臂與右膝支撐；分鏡改為相同鏡向，原始生成提示與 hash 保留，不回填。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/a59BIeTP7DY?rel=0",
      "check": {
        "videoId": "a59BIeTP7DY",
        "seconds": [
          8,
          19,
          27,
          35
        ],
        "observation": "重新核對前臂、屈膝支撐，髖部由地面抬起，再回到地面及換側；19 秒可見抬髖保持。"
      },
      "findings": [
        "重新核對前臂、屈膝支撐，髖部由地面抬起，再回到地面及換側；19 秒可見抬髖保持。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "a94c09fa4209a08caf31ab974e33afbf9b0832a6c2323ded3b3fd44447e155a2"
    }
  },
  "shoulder-roll": {
    "revision": 6,
    "contentHash": "e8428f195c7d94b7547c924c18019933f76316da55a2df01b8d045a8d7530e8d",
    "variation": "肩膀緩慢繞動；本項起始設定：坐穩或站穩，手臂自然垂放，眼睛平視。",
    "counting": "一次完整動作加回程算 1 次，預設每組 5 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e8428f195c7d94b7547c924c18019933f76316da55a2df01b8d045a8d7530e8d",
      "findings": [
        "已核對原始來源支持：坐姿向後緩慢繞肩。來源示範坐姿；本站也提供站穩的小圈版本。來源不提供本站 5 次份量，並非治療處方。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e8428f195c7d94b7547c924c18019933f76316da55a2df01b8d045a8d7530e8d",
      "reviewedImageSha256": "a09f4b251f2f069e8c678dc33c13e2016019e43cb867db35667e447c0887e42d",
      "findings": [
        "四格鏡頭及軀幹方向固定；雙肩抬起、向後向下、返回放鬆，頭頸不繞圈；1 組 × 5 次。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/SGocpsxRkBM?rel=0",
      "check": {
        "videoId": "SGocpsxRkBM",
        "seconds": [
          2,
          4,
          6,
          8
        ],
        "observation": "可見坐姿肩膀上提與回落繞動、頭部不轉圈；圖解採站姿，影片坐姿僅示範肩部路徑，不套用有輪椅為站姿支撐。"
      },
      "findings": [
        "可見坐姿肩膀上提與回落繞動、頭部不轉圈；圖解採站姿，影片坐姿僅示範肩部路徑，不套用有輪椅為站姿支撐。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "e8428f195c7d94b7547c924c18019933f76316da55a2df01b8d045a8d7530e8d"
    }
  },
  "seated-neck-rotation": {
    "revision": 2,
    "contentHash": "4fb8a732e7ceb1c253466bfc9abeab411577c4edf7df9de7c903ac019452f1cf",
    "variation": "坐姿頸部左右轉動；本項起始設定：坐穩，雙腳著地，手放大腿，眼睛看前方。",
    "counting": "移向一側並回正算 1 次；左右合計 6 次，每側 3 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4fb8a732e7ceb1c253466bfc9abeab411577c4edf7df9de7c903ac019452f1cf",
      "findings": [
        "已對照原始來源：坐姿轉頭、肩部朝前及舒適範圍。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4fb8a732e7ceb1c253466bfc9abeab411577c4edf7df9de7c903ac019452f1cf",
      "reviewedImageSha256": "18d4b624c3e8d27a54974470600bb86f6cb1a67b7b2a9ed2e91072400714e41f",
      "findings": [
        "坐姿轉頭、回正再換側，肩部向前與每側 3 次相符；可見安全提醒，不需模仿最大轉角。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/b6b_8mmexj4?rel=0",
      "check": {
        "videoId": "b6b_8mmexj4",
        "seconds": [
          6,
          13,
          23
        ],
        "observation": "可見坐姿向左轉頭；本頁左右都做，先回正再換側，不用手扳頭。"
      },
      "findings": [
        "可見坐姿向左轉頭；本頁左右都做，先回正再換側，不用手扳頭。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "4fb8a732e7ceb1c253466bfc9abeab411577c4edf7df9de7c903ac019452f1cf"
    }
  },
  "chin-tuck": {
    "revision": 7,
    "contentHash": "4a771a2a1055cb6eef2a59bb60d019b32d5c7ae7d50467085cb508adb3fbda4c",
    "variation": "坐姿下巴後收；本項起始設定：坐穩、肩膀放鬆，頭部自然，眼睛平視。",
    "counting": "一次完整動作加回程算 1 次，預設每組 5 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4a771a2a1055cb6eef2a59bb60d019b32d5c7ae7d50467085cb508adb3fbda4c",
      "findings": [
        "核對 Chin retraction 段落；本站小幅 5 次、停約 2 秒是起始設定，不引用其他需手壓頭的伸展。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4a771a2a1055cb6eef2a59bb60d019b32d5c7ae7d50467085cb508adb3fbda4c",
      "reviewedImageSha256": "1b8875a71dbd4940973e041e51eb7ae230da805cc18d8d9bd0d7cb4f63a04c4d",
      "findings": [
        "已核對側面坐姿及水平向後的小幅下巴回收，移除誤導垂直參考線；視線水平，5 次與文字相符。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。",
        "重新核圖是淡色原頭位加水平箭頭，不是虛線；分鏡同步實際採用方式，生成當時 hash 不變。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/14UhAiWiMq0?rel=0",
      "check": {
        "videoId": "14UhAiWiMq0",
        "seconds": [
          8,
          26,
          38,
          47
        ],
        "observation": "重新核對坐姿水平後收下巴；影片手指作位置提示，本站不要求以手施壓或低頭。"
      },
      "findings": [
        "重新核對坐姿水平後收下巴；影片手指作位置提示，本站不要求以手施壓或低頭。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "4a771a2a1055cb6eef2a59bb60d019b32d5c7ae7d50467085cb508adb3fbda4c"
    }
  },
  "scapular-glide": {
    "revision": 2,
    "contentHash": "c0c80f90a3ee5628781e51f9eb918e3b556e7412c9a36832aef2d3d3bcf3261e",
    "variation": "站姿肩胛前伸與後收；本項起始設定：站穩，一手向前抬至舒服的高度，最高約肩高。",
    "counting": "每組只做一側 5 次；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c0c80f90a3ee5628781e51f9eb918e3b556e7412c9a36832aef2d3d3bcf3261e",
      "findings": [
        "已對照原始來源：單臂抬起、肘伸直的肩胛前伸後收。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c0c80f90a3ee5628781e51f9eb918e3b556e7412c9a36832aef2d3d3bcf3261e",
      "reviewedImageSha256": "7f93616e6964fbc1a5cbdd3da0aab74880f822fb85835d3290732fc6b4de53bf",
      "findings": [
        "圖為單臂前伸後收，並非舊影片紀錄所寫雙臂；每側 5 次各 1 組，與一組一側的澄清相符。肩胛位移仍屬示意。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/OP8_zF0bh7M?rel=0",
      "check": {
        "videoId": "OP8_zF0bh7M",
        "seconds": [
          2,
          4,
          8
        ],
        "observation": "既有抽查畫面為站姿單臂前伸；本次文字及圖片也確認為單臂版本，已修正舊紀錄誤寫的雙臂。仍只屬片段抽查，非完整播放核對。"
      },
      "findings": [
        "既有抽查畫面為站姿單臂前伸；本次文字及圖片也確認為單臂版本，已修正舊紀錄誤寫的雙臂。仍只屬片段抽查，非完整播放核對。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "c0c80f90a3ee5628781e51f9eb918e3b556e7412c9a36832aef2d3d3bcf3261e"
    }
  },
  "bodyweight-hip-hinge": {
    "revision": 4,
    "contentHash": "0304b50e990a5a964d3848ca9abf3de3b9b11f42c88e30119248d96492837b12",
    "variation": "徒手髖折；本項起始設定：雙腳與髖同寬，膝蓋微彎，手輕放髖部。",
    "counting": "一次完整動作加回程算 1 次，預設每組 8 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0304b50e990a5a964d3848ca9abf3de3b9b11f42c88e30119248d96492837b12",
      "findings": [
        "已對照動作專屬來源：髖部向後、脊椎自然及控制回站。",
        "引用動作步驟，不採用治療或預防疼痛的成效宣稱；木棍是選用的姿勢提示，不是本站徒手版必需品。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0304b50e990a5a964d3848ca9abf3de3b9b11f42c88e30119248d96492837b12",
      "reviewedImageSha256": "00affacfbdf99539429bcad10dcd152ec36c8e2a15e6914cd5e5c3508c60edfd",
      "findings": [
        "微屈膝、髖向後、軀幹隨髖前傾再站直，無過伸回程；8 次 1 組相符。圖中角度與視距是示意，不要求個別使用者精準達到。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/2W_gXhut5S8?rel=0",
      "check": {
        "videoId": "2W_gXhut5S8",
        "seconds": [
          8,
          22,
          32,
          41
        ],
        "observation": "重新核對站姿無負重、膝微彎，臀部後推與軀幹髖折前傾；不是以膝主導的深蹲。"
      },
      "findings": [
        "重新核對站姿無負重、膝微彎，臀部後推與軀幹髖折前傾；不是以膝主導的深蹲。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "0304b50e990a5a964d3848ca9abf3de3b9b11f42c88e30119248d96492837b12"
    }
  },
  "wall-ankle-mobility": {
    "revision": 3,
    "contentHash": "6bed500c1dd0765c3474686aedfff7787877ad52d0a2f7c9a67db9aa245bee9e",
    "variation": "扶牆踝關節前移；本項起始設定：雙手扶牆，一腳在前，腳尖離牆一小段距離，另一腳在後支撐。",
    "counting": "每組只做一側 5 次；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6bed500c1dd0765c3474686aedfff7787877ad52d0a2f7c9a67db9aa245bee9e",
      "findings": [
        "已核對原始來源支持：面牆前腳膝前移、依腳跟可著地調整距離。不將來源的極限距離測試當必須達成目標；本站不要求固定 5 公分或膝蓋一定碰牆。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6bed500c1dd0765c3474686aedfff7787877ad52d0a2f7c9a67db9aa245bee9e",
      "reviewedImageSha256": "24a3cbef455f9cb0ffa99a57e28f0cc5827af2a5f109f83f5fd04b105c85cbd6",
      "findings": [
        "前膝前移且腳跟保留地面、每側 5 次相符；圖上 5 公分只是起始示意，不強求碰牆。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/rulADo6OOLs?rel=0",
      "check": {
        "videoId": "rulADo6OOLs",
        "seconds": [
          20,
          45,
          80
        ],
        "observation": "可見前後站姿扶牆與膝向牆前移。原片是踝活動度測試，本頁只取輕柔活動形式，不追求測量距離或疼痛極限。"
      },
      "findings": [
        "可見前後站姿扶牆與膝向牆前移。原片是踝活動度測試，本頁只取輕柔活動形式，不追求測量距離或疼痛極限。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "6bed500c1dd0765c3474686aedfff7787877ad52d0a2f7c9a67db9aa245bee9e"
    }
  },
  "doorway-chest-stretch": {
    "revision": 4,
    "contentHash": "03f377d5552441a3a488023a00577dbf615aeab2dadb9d43e32dc43037b7e975",
    "variation": "門框胸部伸展；本項起始設定：站在穩固門框內，雙前臂扶在兩側，手肘約肩高或稍低。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 20 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。",
      "有肩關節脫位、半脫位或冰凍肩病史，先詢問醫療專業如何修改。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "03f377d5552441a3a488023a00577dbf615aeab2dadb9d43e32dc43037b7e975",
      "findings": [
        "已讀治療機構原文。來源保持 30–60 秒；本站 20 秒是一般較短起始份量，不聲稱源自該文處方。肩脫位、不穩或冰凍肩需先詢問專業。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "03f377d5552441a3a488023a00577dbf615aeab2dadb9d43e32dc43037b7e975",
      "reviewedImageSha256": "8410b51f2add28e64f7d4d5108e82caf8c132766ae8744f7f3ad0abbc79a25f1",
      "findings": [
        "雙前臂貼兩側門框，弓步小幅前移、維持、退回完整；手麻肩痛停止與 20 秒相符。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/B9uY01NoqBg",
      "check": {
        "videoId": "B9uY01NoqBg",
        "seconds": [
          8,
          18,
          28,
          40
        ],
        "observation": "已核對雙前臂扶門框、肘約 90 度，跨小步身體前移後保持，取代單側版本；停留時間以本站課表為準。"
      },
      "findings": [
        "已核對雙前臂扶門框、肘約 90 度，跨小步身體前移後保持，取代單側版本；停留時間以本站課表為準。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "03f377d5552441a3a488023a00577dbf615aeab2dadb9d43e32dc43037b7e975"
    }
  },
  "wall-calf-stretch": {
    "revision": 2,
    "contentHash": "b2d3813364c306a22a009b98e8d5c92a53cdb10cbd02c5f19cd884b57c1d5ee6",
    "variation": "扶牆小腿伸展；本項起始設定：雙手扶牆，一腳在前、另一腳往後。",
    "counting": "每組只保持一側 20 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b2d3813364c306a22a009b98e8d5c92a53cdb10cbd02c5f19cd884b57c1d5ee6",
      "findings": [
        "已對照原始來源：扶牆前後站、後膝伸直與腳跟著地。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b2d3813364c306a22a009b98e8d5c92a53cdb10cbd02c5f19cd884b57c1d5ee6",
      "reviewedImageSha256": "c2e909ea054b1371e8dece30a352c19e61ffcbdda216026246ed63d2ed933218",
      "findings": [
        "前後站姿、後膝自然伸直與後跟著地可見，每側 20 秒各 1 組相符；60 公分僅示意，不硬套步距。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/A8GwnrsDLi8?rel=0",
      "check": {
        "videoId": "A8GwnrsDLi8",
        "seconds": [
          8,
          22,
          41
        ],
        "observation": "可見雙手扶牆、前後站姿及後腿伸直的小腿伸展版本。"
      },
      "findings": [
        "可見雙手扶牆、前後站姿及後腿伸直的小腿伸展版本。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "b2d3813364c306a22a009b98e8d5c92a53cdb10cbd02c5f19cd884b57c1d5ee6"
    }
  },
  "chair-hamstring-stretch": {
    "revision": 3,
    "contentHash": "5ed8c826fa16c7c439a432f11bfaa6e9f9df20c6ebb495c8317fd6180d0be929",
    "variation": "坐姿單腿腿後側伸展；本項起始設定：使用不會滑動、沒有輪子的穩固椅子，靠牆固定；地面保持乾燥。",
    "counting": "每組只保持一側 20 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "5ed8c826fa16c7c439a432f11bfaa6e9f9df20c6ebb495c8317fd6180d0be929",
      "findings": [
        "已核對原始來源支持：穩固椅上單腿伸出、由髖前傾而非彎腰硬拉、不彈震。原文未指定 20 秒，本站秒數為起始參考；手的位置與膝微彎是舒適範圍提示。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "5ed8c826fa16c7c439a432f11bfaa6e9f9df20c6ebb495c8317fd6180d0be929",
      "reviewedImageSha256": "1b6769968837f4192b212547d0427661f3c49efbe7bb6c213990c5b533212031",
      "findings": [
        "椅上單腿前伸腳跟著地、手放另一腿且髖前傾，每側 20 秒相符；不壓膝及停止不適的文字可見。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/wS2lF2QrWJw?rel=0",
      "check": {
        "videoId": "wS2lF2QrWJw",
        "seconds": [
          8,
          20,
          37
        ],
        "observation": "可見坐椅前緣、單腿伸直與從髖前傾；不是雙腿坐地前彎。"
      },
      "findings": [
        "可見坐椅前緣、單腿伸直與從髖前傾；不是雙腿坐地前彎。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "5ed8c826fa16c7c439a432f11bfaa6e9f9df20c6ebb495c8317fd6180d0be929"
    }
  },
  "supported-lat-stretch": {
    "revision": 6,
    "contentHash": "d6c3be2abc9c791e4bee8110bb161d72f3c2ad88e09f41f9fdaa31e7af37d201",
    "variation": "站姿扶穩背闊肌伸展；本項起始設定：選不會滑動或翻倒的固定檯面，雙手扶穩、腳與髖同寬。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 20 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "d6c3be2abc9c791e4bee8110bb161d72f3c2ad88e09f41f9fdaa31e7af37d201",
      "findings": [
        "已核對原始來源支持：雙手扶穩檯面、髖後移與背部自然、頸部穩定、不鎖死膝。本站採舒適幅度版本，不要求身體達 90 度；不套用來源起始抬頭到保持姿勢。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "d6c3be2abc9c791e4bee8110bb161d72f3c2ad88e09f41f9fdaa31e7af37d201",
      "reviewedImageSha256": "aa9e7b709d83d47d463ddf8a97fbf2e85360f37d93cd433a97cb859a6bcef079",
      "findings": [
        "四格使用牆上固定檯面，髖部向後移、微彎膝保持及走近站回；頸部順軀幹，不以抬頭看前方示範；20 秒 × 1 組。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/Ux1E-Moqa0U?rel=0",
      "check": {
        "videoId": "Ux1E-Moqa0U",
        "seconds": [
          6,
          12,
          18,
          22
        ],
        "observation": "重新核對站姿雙手扶高支撐、髖往後移及背部延伸；影片椅背需確保固定，本站優先採固定檯面。"
      },
      "findings": [
        "重新核對站姿雙手扶高支撐、髖往後移及背部延伸；影片椅背需確保固定，本站優先採固定檯面。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "d6c3be2abc9c791e4bee8110bb161d72f3c2ad88e09f41f9fdaa31e7af37d201"
    }
  },
  "bodyweight-squat": {
    "revision": 4,
    "contentHash": "6f1a6a4a808870bb0c4a2458e32025520582e439bd966ca8cf1a207deb70fad6",
    "variation": "徒手深蹲；本項起始設定：雙腳略寬於髖，腳尖自然微微朝外。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6f1a6a4a808870bb0c4a2458e32025520582e439bd966ca8cf1a207deb70fad6",
      "findings": [
        "逐段核對動作；僅採舒適可控制幅度，不把平行深度、抬頭或前膝限制套成每人必須達到的角度。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6f1a6a4a808870bb0c4a2458e32025520582e439bd966ca8cf1a207deb70fad6",
      "reviewedImageSha256": "39ccf6c536ae3f48efe44af76267c3ad789c595bbafa492dc29fdc6556570e0c",
      "findings": [
        "五格徒手蹲起、全腳掌著地與膝腳尖同向；圖示 10–15 次、3–4 組包含本站 10 次 3 組。深度依個人能力而非必達平行。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/A8_Zwr3SIac",
      "check": {
        "videoId": "A8_Zwr3SIac",
        "seconds": [
          8,
          17,
          25,
          31
        ],
        "observation": "重新播放核對站姿、徒手下蹲與回站。原片有停留 10 秒的復健建議，本頁為連續控制蹲起，份量依本站課表而非影片。"
      },
      "findings": [
        "重新播放核對站姿、徒手下蹲與回站。原片有停留 10 秒的復健建議，本頁為連續控制蹲起，份量依本站課表而非影片。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "6f1a6a4a808870bb0c4a2458e32025520582e439bd966ca8cf1a207deb70fad6"
    }
  },
  "dumbbell-squat": {
    "revision": 3,
    "contentHash": "1b3ac00ae3e4e9eccedbdd91c6b33fca4e8d6c0bd4abaf407cc00b70e5e05344",
    "variation": "高腳杯深蹲；本項起始設定：雙手托住一顆啞鈴並靠近胸口。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "1b3ac00ae3e4e9eccedbdd91c6b33fca4e8d6c0bd4abaf407cc00b70e5e05344",
      "findings": [
        "採單顆啞鈴版，不混入雙啞鈴或壺鈴；深度依可控制範圍。本站份量不是來源個人化處方。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "1b3ac00ae3e4e9eccedbdd91c6b33fca4e8d6c0bd4abaf407cc00b70e5e05344",
      "reviewedImageSha256": "1399b71197decbdb4e02f5a4f28ecfc346e0cb167a155b1b016300cc3c62bba2",
      "findings": [
        "一顆啞鈴胸前雙手托持，蹲下與回站一致；圖示 10–12 次 3 組包含本站 10 次 3 組。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "c62f9a8847f202d1a91bd1e2fe3a35ca5af563c87df0324aa9d17d7fa5e48d1e"
    }
  },
  "dumbbell-chest-press": {
    "revision": 4,
    "contentHash": "2a931cd4af67254be8fc2f2cbf5ada59bfa75edda3b7d71d2f4bc62faba3b525",
    "variation": "啞鈴胸推；本項起始設定：仰躺後讓前臂接近垂直地面。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "2a931cd4af67254be8fc2f2cbf5ada59bfa75edda3b7d71d2f4bc62faba3b525",
      "findings": [
        "已核對起始到收尾；本站不強求啞鈴碰胸，依肩膀可控幅度。需要時請保護者協助拿放重量。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "2a931cd4af67254be8fc2f2cbf5ada59bfa75edda3b7d71d2f4bc62faba3b525",
      "reviewedImageSha256": "9bf42ccd56634257dd4e91e1f93db61c2941a814c0b75cfd45fb2429ce56931f",
      "findings": [
        "平椅仰躺雙啞鈴推舉，前臂接近垂直，下降不過度；8–12 次 3 組包含本站 10 次 3 組。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/Am787GTLclY",
      "check": {
        "videoId": "Am787GTLclY",
        "seconds": [
          26,
          38,
          41,
          47
        ],
        "observation": "重新核對平板長椅、雙手各持一顆啞鈴，推起及下降胸側；非槓鈴或上斜版本。"
      },
      "findings": [
        "重新核對平板長椅、雙手各持一顆啞鈴，推起及下降胸側；非槓鈴或上斜版本。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "2a931cd4af67254be8fc2f2cbf5ada59bfa75edda3b7d71d2f4bc62faba3b525"
    }
  },
  "dumbbell-row": {
    "revision": 4,
    "contentHash": "8375fc2ac564b021d376a4d4307fcc598a73f73fc3d89c03c8d198978ca73169",
    "variation": "單臂啞鈴划船；本項起始設定：一手一膝支撐長椅，背部維持中立。",
    "counting": "每組數字表示每側次數：左右各 10 次（合計 20 次單側動作）才算完成一組；不是左右合計 10 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8375fc2ac564b021d376a4d4307fcc598a73f73fc3d89c03c8d198978ca73169",
      "findings": [
        "已核對三階段；動作時頭頸隨軀幹，不採轉頭看鏡子檢查姿勢的建議。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8375fc2ac564b021d376a4d4307fcc598a73f73fc3d89c03c8d198978ca73169",
      "reviewedImageSha256": "59554dcdda896471b967d575b42f14670100ecde83c6e9ed867f89f3f28d3f7d",
      "findings": [
        "同側手膝支撐、另一手划向髖部，頸部自然、回程不扭腰；每側 10–12 次 3 組包含本站每側 10 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/r1loX83MWaw",
      "check": {
        "videoId": "r1loX83MWaw",
        "seconds": [
          95,
          110,
          115,
          120
        ],
        "observation": "重新核對同側手膝扶長椅、另一手單啞鈴划船；110 秒示範肘沿身側拉向髖、115 秒回程。頻道目前名稱為女力健身 Nuli App。"
      },
      "findings": [
        "重新核對同側手膝扶長椅、另一手單啞鈴划船；110 秒示範肘沿身側拉向髖、115 秒回程。頻道目前名稱為女力健身 Nuli App。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "8375fc2ac564b021d376a4d4307fcc598a73f73fc3d89c03c8d198978ca73169"
    }
  },
  "dumbbell-shoulder-press": {
    "revision": 4,
    "contentHash": "dcd0b255c4bab96cbb67e809794dcfc8735e1334a3e0e910c46961cdbe9efd40",
    "variation": "坐姿啞鈴肩推；本項起始設定：靠背調至接近直立，啞鈴置於肩側。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "dcd0b255c4bab96cbb67e809794dcfc8735e1334a3e0e910c46961cdbe9efd40",
      "findings": [
        "僅核對頁面 How To Do A Seated Dumbbell Shoulder Press；同頁內嵌說明是槓鈴版，不採作啞鈴示範。使用輕重量，不以踢腿慣性或疼痛中增加幅度作本站要求。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "dcd0b255c4bab96cbb67e809794dcfc8735e1334a3e0e910c46961cdbe9efd40",
      "reviewedImageSha256": "d21b1b698a361cd23bc9f4f42b8ad3ed3ee65c3e0c325cc65552cf9e4d8e1076",
      "findings": [
        "有靠背坐姿雙啞鈴肩推、回肩側，非站姿或胸推；8–12 次 3 組包含本站 10 次 3 組。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/ePxgPKcI1fU",
      "check": {
        "videoId": "ePxgPKcI1fU",
        "seconds": [
          8,
          19,
          28,
          35
        ],
        "observation": "重新核對有靠背坐姿、雙啞鈴肩側起始、向上推及控制放回。"
      },
      "findings": [
        "重新核對有靠背坐姿、雙啞鈴肩側起始、向上推及控制放回。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "dcd0b255c4bab96cbb67e809794dcfc8735e1334a3e0e910c46961cdbe9efd40"
    }
  },
  "dumbbell-curl": {
    "revision": 2,
    "contentHash": "9b1e5d1d109fd828a5505a9b3f3e1dc02409ecdb8d67bf8118340946dcadfda9",
    "variation": "啞鈴彎舉；本項起始設定：掌心朝上握住啞鈴，手肘貼近身體。",
    "counting": "雙手同步彎舉一次算 1 次，預設每組 12 次；若改交替，左右各完成設定次數才算一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9b1e5d1d109fd828a5505a9b3f3e1dc02409ecdb8d67bf8118340946dcadfda9",
      "findings": [
        "已對照原始來源：上臂在身旁的彎舉路徑。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9b1e5d1d109fd828a5505a9b3f3e1dc02409ecdb8d67bf8118340946dcadfda9",
      "reviewedImageSha256": "b2895a3b6d32869ab9984e7218b264d3e8352cfa0fb2fbce7f338e95e940712d",
      "findings": [
        "站姿雙手同時彎肘，上臂近軀幹；10–12 次 × 3 組相容。頁面交替版本須另以每側計數。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "9b1e5d1d109fd828a5505a9b3f3e1dc02409ecdb8d67bf8118340946dcadfda9"
    }
  },
  "dumbbell-triceps-extension": {
    "revision": 5,
    "contentHash": "440f91814f56f3e8a1512e95adbb26459b11657ede9c42507ad342ec48ff93bc",
    "variation": "啞鈴三頭伸展；本項起始設定：雙手托住啞鈴並舉到頭頂。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "440f91814f56f3e8a1512e95adbb26459b11657ede9c42507ad342ec48ff93bc",
      "findings": [
        "已對照動作專屬來源：雙手一顆啞鈴過頭伸展，上臂穩定、屈伸手肘。",
        "歷史別名沿用站姿雙手過頭版；原 Mayo 影片為躺姿單手版，不作本項證據。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "440f91814f56f3e8a1512e95adbb26459b11657ede9c42507ad342ec48ff93bc",
      "reviewedImageSha256": "b8093cad299e300270c0d2d3d11e591a412151f8179d04b9a499b88e2532f988",
      "findings": [
        "歷史別名已共用正式『啞鈴過頭三頭肌伸展』新圖；重新核對同為站姿雙手單顆啞鈴，上臂穩定、頭後屈肘再伸直，3 組 12 次。",
        "保留真正原動作生成來源與提示，不假裝是以別名另產。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/z2-MsrrOFLM",
      "check": {
        "videoId": "z2-MsrrOFLM",
        "seconds": [
          15,
          29,
          40,
          52
        ],
        "observation": "重新核對站姿雙手持單顆啞鈴、頭後屈肘與向上伸肘；不是坐姿或單手版本。"
      },
      "findings": [
        "重新核對站姿雙手持單顆啞鈴、頭後屈肘與向上伸肘；不是坐姿或單手版本。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "440f91814f56f3e8a1512e95adbb26459b11657ede9c42507ad342ec48ff93bc"
    }
  },
  "barbell-bench-press": {
    "revision": 6,
    "contentHash": "9884b38589ae52ce95119baa0ccbde27b4bc0dc4b9159a3cccdb9c2a4c2c8899",
    "variation": "槓鈴臥推；本項起始設定：雙腳踩穩，眼睛位於槓鈴正下方。",
    "counting": "一次完整動作加回程算 1 次，預設每組 8 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9884b38589ae52ce95119baa0ccbde27b4bc0dc4b9159a3cccdb9c2a4c2c8899",
      "findings": [
        "已核對 Setup–Return；不把最大重量、強制固定握距或接近力竭作新手要求。安全架／保護者依現場條件設定。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9884b38589ae52ce95119baa0ccbde27b4bc0dc4b9159a3cccdb9c2a4c2c8899",
      "reviewedImageSha256": "ed9de231a49c570a458955a7becfaf2e680c2719b0c7341a5e27a22026a57aa7",
      "findings": [
        "三格正側面可辨槓位在胸前，不在頸部；雙手持槓、雙腳踩地、頭背臀有支撐，已補接合於立柱的安全支臂。實際擋桿高度仍須按本人胸高測試，非量測圖。",
        "已對照可見姿勢、支撐和文字；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/1Ppl7czpoUc",
      "check": {
        "videoId": "1Ppl7czpoUc",
        "seconds": [
          6,
          12,
          18,
          23
        ],
        "observation": "重新核對平板槓鈴臥推，有保護者協助；圖文所述安全擋桿設定需依場館條件，影片不提供個人重量處方。"
      },
      "findings": [
        "重新核對平板槓鈴臥推，有保護者協助；圖文所述安全擋桿設定需依場館條件，影片不提供個人重量處方。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "9884b38589ae52ce95119baa0ccbde27b4bc0dc4b9159a3cccdb9c2a4c2c8899"
    }
  },
  "barbell-deadlift": {
    "revision": 5,
    "contentHash": "66a985e8e11af9778319eb6811350c19549dcda9948b27cee09407b0582fd40b",
    "variation": "槓鈴硬舉；本項起始設定：槓鈴置於腳掌中段上方，髖部向後。",
    "counting": "一次完整動作加回程算 1 次，預設每組 6 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "66a985e8e11af9778319eb6811350c19549dcda9948b27cee09407b0582fd40b",
      "findings": [
        "已核對地板起始版，與站姿起始的羅馬尼亞硬舉分開；不採來源固定握距或強迫小腿垂直作每人體型標準。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "66a985e8e11af9778319eb6811350c19549dcda9948b27cee09407b0582fd40b",
      "reviewedImageSha256": "0c9d5a78ac138421434b359b4dd61a24e08aedfae377c65ab024971c48efd838",
      "findings": [
        "重新檢視四格：槓片落地起始與回程，槓貼近腿、髖膝協調站起、頸部隨軀幹自然延伸；3 組 6 次與文字一致。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/mCkHvemP79U",
      "check": {
        "videoId": "mCkHvemP79U",
        "seconds": [
          5,
          10,
          15,
          19
        ],
        "observation": "重新核對一般硬舉由站姿放回地面、再站起的槓鈴路徑；不同於膝微彎髖折的羅馬尼亞硬舉。"
      },
      "findings": [
        "重新核對一般硬舉由站姿放回地面、再站起的槓鈴路徑；不同於膝微彎髖折的羅馬尼亞硬舉。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "66a985e8e11af9778319eb6811350c19549dcda9948b27cee09407b0582fd40b"
    }
  },
  "kettlebell-deadlift": {
    "revision": 2,
    "contentHash": "d46e099e22e172b9c685b886a6e34be273d914a33dbffa5652be5926841b61b6",
    "variation": "壺鈴硬舉；本項起始設定：壺鈴放在兩腳之間，髖部往後推。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "d46e099e22e172b9c685b886a6e34be273d914a33dbffa5652be5926841b61b6",
      "findings": [
        "已對照原始來源：地面起始、髖折及控制放回。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "d46e099e22e172b9c685b886a6e34be273d914a33dbffa5652be5926841b61b6",
      "reviewedImageSha256": "1b7d0809b12ca4778ad742501e363f88cd1d4ef1fd1d8b9a9d340fba7d300cf6",
      "findings": [
        "地面壺鈴、雙手握把髖折、站直與放回可見，8–12 次 × 3 組包含預設；第四格改側面，重製時應固定鏡頭。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/LnIMaf-XOpM",
      "check": {
        "videoId": "LnIMaf-XOpM",
        "seconds": [
          4,
          9
        ],
        "observation": "可見雙手持單顆壺鈴在雙腿之間下降與起身，取代原本槓鈴影片；膝髖彎曲幅度依可控制範圍。"
      },
      "findings": [
        "可見雙手持單顆壺鈴在雙腿之間下降與起身，取代原本槓鈴影片；膝髖彎曲幅度依可控制範圍。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "d46e099e22e172b9c685b886a6e34be273d914a33dbffa5652be5926841b61b6"
    }
  },
  "band-row": {
    "revision": 5,
    "contentHash": "08d3d318fbd8033d1a4bf5721bed2240c1ace14ec395914aae129d4f4f62cd19",
    "variation": "彈力帶俯身划船；本項起始設定：雙腳踩住彈力帶中央，膝微彎並從髖部前傾。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "08d3d318fbd8033d1a4bf5721bed2240c1ace14ec395914aae129d4f4f62cd19",
      "findings": [
        "已讀搜尋索引提供的完整三步教學；頁面直連回傳 403。支持雙腳踩帶版本，不支持把帶繞頸或固定遠處。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "08d3d318fbd8033d1a4bf5721bed2240c1ace14ec395914aae129d4f4f62cd19",
      "reviewedImageSha256": "f5c4c32d26e5587a8002f3aa4f96808a7cb2477dfd647ca1e12f341dd27dce35",
      "findings": [
        "四格腳踩帶與划船方向一致，頭頸已不轉向鏡頭；回程、3 組 12 次與規格相符。",
        "已對照可見姿勢、支撐和文字；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "1cc292de5c3303cf163621062c026c22f11e21908c50e7d50716d30e617d44d4"
    }
  },
  "smith-squat": {
    "revision": 4,
    "contentHash": "8b5725120543bbcccdc8d18fa69f36dda07f33f90061f8f04d19f61c241ec3cc",
    "variation": "史密斯深蹲；本項起始設定：調整安全限位，槓置於上背而非頸部。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8b5725120543bbcccdc8d18fa69f36dda07f33f90061f8f04d19f61c241ec3cc",
      "findings": [
        "已讀動作正文；不採用來源『膝蓋不得超過腳尖』的絕對限制。腳位、解掛鉤方向、安全限位仍依現場機台，非跨型號通則。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8b5725120543bbcccdc8d18fa69f36dda07f33f90061f8f04d19f61c241ec3cc",
      "reviewedImageSha256": "3a5d5e25c0cb5de360e85b5d49344971ca3819c94f28d4b7b3dbdff9a4064c67",
      "findings": [
        "軌道內上背負槓、解鉤、蹲下與掛回順序可見；8–12 次 3 組包含本站 10 次 3 組。安全限位仍需現場依機型設定。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/H14HliH4Mfs?start=64&end=90",
      "check": {
        "videoId": "H14HliH4Mfs",
        "seconds": [
          64,
          75,
          85,
          95
        ],
        "start": 64,
        "end": 90,
        "observation": "已重新核對導軌槓上背深蹲；95 秒已進入寬站變化，因此縮短內嵌至 64–90 秒，避免混用站距。"
      },
      "findings": [
        "已重新核對導軌槓上背深蹲；95 秒已進入寬站變化，因此縮短內嵌至 64–90 秒，避免混用站距。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "8b5725120543bbcccdc8d18fa69f36dda07f33f90061f8f04d19f61c241ec3cc"
    }
  },
  "cable-fly": {
    "revision": 4,
    "contentHash": "3beed51dadcc87130c0382586e650605c283413cd2f19323eca5505ff84f9498",
    "variation": "站姿肩高對向滑輪飛鳥；雙肘微彎、雙手在胸前合攏，不採高到低或低到高變化。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "3beed51dadcc87130c0382586e650605c283413cd2f19323eca5505ff84f9498",
      "findings": [
        "已讀標準肩高版本；不混用頁面高到低與低到高兩種版本。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "3beed51dadcc87130c0382586e650605c283413cd2f19323eca5505ff84f9498",
      "reviewedImageSha256": "4c86df91f1c28989c36e7970de0f4bd3319377e39cf6b9966fa5e55b06ea43c7",
      "findings": [
        "雙側同高滑輪、單手握把、前後站姿，微屈肘弧線合攏再開；圖示高度約肩上緣，需依使用者身高調至肩高，10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/Q32gisfVsls",
      "check": {
        "videoId": "Q32gisfVsls",
        "seconds": [
          8,
          55,
          65,
          70
        ],
        "observation": "重新核對雙側單握把、前後站姿與胸前弧線合攏；手肘保持微彎，非三頭下壓。"
      },
      "findings": [
        "重新核對雙側單握把、前後站姿與胸前弧線合攏；手肘保持微彎，非三頭下壓。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "3beed51dadcc87130c0382586e650605c283413cd2f19323eca5505ff84f9498"
    }
  },
  "cable-triceps-pushdown": {
    "revision": 4,
    "contentHash": "4cb6e0d19f80b3193df5dc890a0b30bf0ac99520239a43e080dd7fcc56726217",
    "variation": "滑輪三頭下壓；本項起始設定：滑輪調至高位，雙手握住直桿或繩索。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4cb6e0d19f80b3193df5dc890a0b30bf0ac99520239a43e080dd7fcc56726217",
      "findings": [
        "已讀原始教學的直桿與繩索設定；圖解採繩索（需再核圖），不採身體前後甩動。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "4cb6e0d19f80b3193df5dc890a0b30bf0ac99520239a43e080dd7fcc56726217",
      "reviewedImageSha256": "248526770a271748bfbf2c976cfb99119b0234960e9ed4264512219b59143fd2",
      "findings": [
        "已確認圖解是高位繩索版本；上臂貼身、屈肘起始、下壓伸肘與控制回程，10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "ff9951ec02146f8d1f8513989bbc17283365d9f73c9ef27d3e66a718905cbbb3"
    }
  },
  "machine-chest-press": {
    "revision": 7,
    "contentHash": "c36fc7c57cd058ea1c17c66aca859769fe400e45e35fd78a71d75a75a1e14326",
    "variation": "器械胸推；本項起始設定：調整座椅，握把約在胸口中段。 圖解器械示例：Life Fitness Circuit Series；調節與上下機不得跨機型照搬。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c36fc7c57cd058ea1c17c66aca859769fe400e45e35fd78a71d75a75a1e14326",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已對照原廠手冊第 6 頁文字與圖示：背靠墊、雙腳支撐、肘略低於肩、前推及回程。",
        "同名器械可能不同構造；現場設定仍需依原廠圖示。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c36fc7c57cd058ea1c17c66aca859769fe400e45e35fd78a71d75a75a1e14326",
      "reviewedImageSha256": "61ff24f0aac0791c3353f1ff981f9c3fbd0b42265e0ead32e8a8605ed04794a7",
      "findings": [
        "三格機臂接合可見，握把由胸前推向前方並回程；沒有沿用配重碰撞提示，3 組 12 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/nxklnskwKeo",
      "check": {
        "videoId": "nxklnskwKeo",
        "seconds": [
          8,
          39,
          55,
          65
        ],
        "observation": "重新播放核對靠背坐姿，手肘彎曲起始向前推、控制回程。影片 Matrix 機型與圖解 Life Fitness Circuit 不同，僅對照推胸動作；調節機構依現場標示。"
      },
      "findings": [
        "重新播放核對靠背坐姿，手肘彎曲起始向前推、控制回程。影片 Matrix 機型與圖解 Life Fitness Circuit 不同，僅對照推胸動作；調節機構依現場標示。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "c36fc7c57cd058ea1c17c66aca859769fe400e45e35fd78a71d75a75a1e14326"
    }
  },
  "pec-deck": {
    "revision": 4,
    "contentHash": "f5337b6b4aeaf5e7137697987ea6d12a5672bb53fbd2c515766f80635741ab89",
    "variation": "握把式蝴蝶機夾胸，背部貼靠，雙臂水平合攏；不採肘墊版本。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f5337b6b4aeaf5e7137697987ea6d12a5672bb53fbd2c515766f80635741ab89",
      "findings": [
        "已讀 Life Fitness Pectoral Fly/Rear Deltoid 教學。此項限定握把版本，不能把肘墊機型設定混在同一步。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f5337b6b4aeaf5e7137697987ea6d12a5672bb53fbd2c515766f80635741ab89",
      "reviewedImageSha256": "42a2460ce528c4fa9a0f28c518a87bdba164b83d5352482f038adc67534211b7",
      "findings": [
        "已確認採手握把的坐姿飛鳥，不是以肘部壓墊版本；背貼靠、弧線合攏和回程，10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/eGjt4lk6g34",
      "check": {
        "videoId": "eGjt4lk6g34",
        "seconds": [
          3,
          6,
          8,
          9,
          12
        ],
        "observation": "已核對靠背坐姿、雙手握把、肘微彎向胸前合攏及控制回程。取代肘墊式版本，本站為握把式；調節機構依現場器材。"
      },
      "findings": [
        "已核對靠背坐姿、雙手握把、肘微彎向胸前合攏及控制回程。取代肘墊式版本，本站為握把式；調節機構依現場器材。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f5337b6b4aeaf5e7137697987ea6d12a5672bb53fbd2c515766f80635741ab89"
    }
  },
  "lat-pulldown": {
    "revision": 6,
    "contentHash": "44d7d83e8c073f7560b7500c5a0b044384df91cff7fd21821d34c4324e2296ab",
    "variation": "高位下拉；本項起始設定：固定腿墊，雙手略寬於肩握住橫桿。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "44d7d83e8c073f7560b7500c5a0b044384df91cff7fd21821d34c4324e2296ab",
      "findings": [
        "已讀胸前版本；不採頁面另列的頸後下拉，也不把取槓時髖折角度當成全程大幅後仰要求。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "44d7d83e8c073f7560b7500c5a0b044384df91cff7fd21821d34c4324e2296ab",
      "reviewedImageSha256": "b886198226ef4cab7785e4d5c3e7f5aac5f93a657a78e6ae95e8e905a6945502",
      "findings": [
        "固定視角三格正握寬槓拉至胸前、非頸後；大腿固定與控制回程可見，3 組 10 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/0KULvdo7T0c",
      "check": {
        "videoId": "0KULvdo7T0c",
        "seconds": [
          28,
          32,
          36,
          42,
          48,
          50,
          53,
          56
        ],
        "observation": "實際重新核對坐姿大腿固定、寬握槓向胸前下拉及回伸；50、56 秒可見下拉低點，非頸後下拉。"
      },
      "findings": [
        "實際重新核對坐姿大腿固定、寬握槓向胸前下拉及回伸；50、56 秒可見下拉低點，非頸後下拉。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "44d7d83e8c073f7560b7500c5a0b044384df91cff7fd21821d34c4324e2296ab"
    }
  },
  "seated-row": {
    "revision": 4,
    "contentHash": "f2ce74b34389df7b5f5db104ee5f6307dd8b707d44d67d254c13f30873eeac67",
    "variation": "坐姿划船；本項起始設定：採窄握滑輪坐姿划船：坐穩，雙腳踩踏板、膝微彎，握住前方把手；本版本不使用胸墊。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f2ce74b34389df7b5f5db104ee5f6307dd8b707d44d67d254c13f30873eeac67",
      "findings": [
        "僅採已讀的坐姿滑輪文字步驟；該頁嵌入描述誤列上斜啞鈴划船，不採作影片佐證。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f2ce74b34389df7b5f5db104ee5f6307dd8b707d44d67d254c13f30873eeac67",
      "reviewedImageSha256": "3e52a4a139690cee79faf83a92033c8624ec82645163391886f05abd27bfdc70",
      "findings": [
        "窄握滑輪、雙腳踩踏板、無胸墊，拉向腰部並回程；10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/k0cTJCfxa0Y",
      "check": {
        "videoId": "k0cTJCfxa0Y",
        "seconds": [
          3,
          6,
          10,
          13
        ],
        "observation": "重新核對坐姿腳踏支撐、窄握把纜繩划船，手臂前伸後拉向軀幹，非胸靠墊版本。"
      },
      "findings": [
        "重新核對坐姿腳踏支撐、窄握把纜繩划船，手臂前伸後拉向軀幹，非胸靠墊版本。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f2ce74b34389df7b5f5db104ee5f6307dd8b707d44d67d254c13f30873eeac67"
    }
  },
  "machine-shoulder-press": {
    "revision": 6,
    "contentHash": "cb4ca038a34c2e8d86714a32b023867b18df4eb3b04686cc0f7ac9db523052dc",
    "variation": "器械肩推；本項起始設定：調整座椅，使握把約在肩膀高度。 圖解器械示例：Life Fitness Circuit Series；調節與上下機不得跨機型照搬。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "cb4ca038a34c2e8d86714a32b023867b18df4eb3b04686cc0f7ac9db523052dc",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已對照原廠手冊第 5 頁文字與圖示：背靠墊、腳踩地、活動臂推高及控制回程。",
        "同名器械可能不同構造；現場設定仍需依原廠圖示。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "cb4ca038a34c2e8d86714a32b023867b18df4eb3b04686cc0f7ac9db523052dc",
      "reviewedImageSha256": "08b94aaa1c5c44c9b29a7a5915f00bec03a663820c51c0996a3c6c884e64db6e",
      "findings": [
        "對照原廠 Circuit Series 肩推示意，機臂向上轉動、握把肩側起始、背部支撐與放回一致；3 組 10 次相符。圖為該機型方向示意，不取代現場設定。",
        "已對照可見姿勢、支撐和文字；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/TnhIyp4kmO8",
      "check": {
        "videoId": "TnhIyp4kmO8",
        "seconds": [
          9,
          19,
          25,
          29,
          31,
          33,
          35,
          37,
          40
        ],
        "observation": "已核對靠背坐姿、雙手握器械把手，自肩側推過頭再控制放回。不同機型握把與調節方式不同，勿照影片外觀猜本站圖示的調節位置。"
      },
      "findings": [
        "已核對靠背坐姿、雙手握器械把手，自肩側推過頭再控制放回。不同機型握把與調節方式不同，勿照影片外觀猜本站圖示的調節位置。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "cb4ca038a34c2e8d86714a32b023867b18df4eb3b04686cc0f7ac9db523052dc"
    }
  },
  "leg-press": {
    "revision": 4,
    "contentHash": "02a821f63e6c71007b84e6c6780d02ca6d80a9972db7b1c40a651e25a2787907",
    "variation": "45 度滑車腿推，頭背及骨盆貼靠、雙腳約肩寬；非水平坐姿版本。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "02a821f63e6c71007b84e6c6780d02ca6d80a9972db7b1c40a651e25a2787907",
      "findings": [
        "已讀 45 度滑車版本，與目前圖解一致；不把深度角度或解鎖方式套用所有機台。",
        "份量是本站起始參考，不是來源的個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "02a821f63e6c71007b84e6c6780d02ca6d80a9972db7b1c40a651e25a2787907",
      "reviewedImageSha256": "ab34798929fc94b10e7b49a071c702454980fa138bf9db9bf1259d389470e144",
      "findings": [
        "45 度滑車版而非水平腿推；全腳掌支撐、控制下放、推回與重新扣上安全把手相符，10–15 次 3 組包含本站 12 次。槓片圖示不是建議重量。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/q4W4_VJbKW0",
      "check": {
        "videoId": "q4W4_VJbKW0",
        "seconds": [
          2,
          4,
          5,
          6,
          8
        ],
        "observation": "已核對 45 度斜板腿推的伸腿、屈膝及回程，取代水平式機器。短片未詳述安全擋桿／解鎖，必須另讀本站文字及現場標示，不能照影片負重量選重量。"
      },
      "findings": [
        "已核對 45 度斜板腿推的伸腿、屈膝及回程，取代水平式機器。短片未詳述安全擋桿／解鎖，必須另讀本站文字及現場標示，不能照影片負重量選重量。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "02a821f63e6c71007b84e6c6780d02ca6d80a9972db7b1c40a651e25a2787907"
    }
  },
  "leg-extension": {
    "revision": 6,
    "contentHash": "f6f82ad2eccebd8ae5fa674fdef358b05919050c77549d525527cb130f6dca9b",
    "variation": "腿屈伸；本項起始設定：膝關節對齊機器轉軸，腳墊落在腳踝上方。 圖解器械示例：Life Fitness Circuit Series；調節與上下機不得跨機型照搬。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f6f82ad2eccebd8ae5fa674fdef358b05919050c77549d525527cb130f6dca9b",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已對照原廠手冊第 2 頁文字與圖示：膝對旋轉軸、腿朝上、平順伸膝與回程。",
        "同名器械可能不同構造；現場設定仍需依原廠圖示。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f6f82ad2eccebd8ae5fa674fdef358b05919050c77549d525527cb130f6dca9b",
      "reviewedImageSha256": "721147629fbef690d35d4614fd62accda831f897ea75e72a4f49570c89f52156",
      "findings": [
        "重新修正滾墊後，三格均在小腿前側近腳踝上方；槓桿連接與伸膝回程可辨，3 組 12 次相符。",
        "原廠圖為機構參考，成圖為示意；座位與轉軸設定需依現場機型，非專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/-jYITOdsRKk",
      "check": {
        "videoId": "-jYITOdsRKk",
        "seconds": [
          8,
          35,
          41,
          45
        ],
        "observation": "重新核對坐姿腿伸展，滾墊位於小腿前側近踝、伸膝抬起與控制屈膝回程。影片與圖解機型不同，座椅／活動範圍調節依現場器材標示。"
      },
      "findings": [
        "重新核對坐姿腿伸展，滾墊位於小腿前側近踝、伸膝抬起與控制屈膝回程。影片與圖解機型不同，座椅／活動範圍調節依現場器材標示。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f6f82ad2eccebd8ae5fa674fdef358b05919050c77549d525527cb130f6dca9b"
    }
  },
  "leg-curl": {
    "revision": 6,
    "contentHash": "e3c2cf544f674142803ff19b617001562f7bc33e6e6c570b0a1c1f5405631e0a",
    "variation": "坐姿腿彎舉；本項起始設定：膝關節對齊機器轉軸，固定大腿墊。 圖解器械示例：Life Fitness Circuit Series；調節與上下機不得跨機型照搬。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e3c2cf544f674142803ff19b617001562f7bc33e6e6c570b0a1c1f5405631e0a",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已對照原廠手冊第 3 頁文字與圖示：大腿固定、膝對旋轉軸、滾墊向下後屈膝、回程與退出。",
        "同名器械可能不同構造；現場設定仍需依原廠圖示。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e3c2cf544f674142803ff19b617001562f7bc33e6e6c570b0a1c1f5405631e0a",
      "reviewedImageSha256": "1341a5f1167ac5d72f58a6dfde687a206200a0afe7753ef938ddd8906a7cc46c",
      "findings": [
        "本次修正後活動滾墊位於小腿後側：伸膝時在腿下、屈膝時在腿後；大腿固定、下屈和回程清楚，3 組 12 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/NDy4XDe1Uz4",
      "check": {
        "videoId": "NDy4XDe1Uz4",
        "seconds": [
          7,
          15,
          22,
          27
        ],
        "observation": "重新核對坐姿、大腿固定、活動墊在小腿後側，伸膝起始與向下屈膝。影片與圖示機型不同，調節與上下機不互套。"
      },
      "findings": [
        "重新核對坐姿、大腿固定、活動墊在小腿後側，伸膝起始與向下屈膝。影片與圖示機型不同，調節與上下機不互套。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "e3c2cf544f674142803ff19b617001562f7bc33e6e6c570b0a1c1f5405631e0a"
    }
  },
  "push-up": {
    "revision": 3,
    "contentHash": "705d1e5e16bbbbcc2c1e7cecb838d622152c05e10e776aea4313ac5334f4d186",
    "variation": "標準地面伏地挺身，以雙手與腳尖支撐；非跪姿或上斜版。",
    "counting": "一次完整動作加回程算 1 次，預設每組 8 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "705d1e5e16bbbbcc2c1e7cecb838d622152c05e10e776aea4313ac5334f4d186",
      "findings": [
        "已對照原始來源：身體成線及上臂與軀幹方向。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "705d1e5e16bbbbcc2c1e7cecb838d622152c05e10e776aea4313ac5334f4d186",
      "reviewedImageSha256": "19b9f258e456465b3186771994ad8f08aa17faa2f326905ed6f8f73fcccf4a2a",
      "findings": [
        "已查看四格：雙手與腳尖支撐、胸與骨盆同步下放及推回；視線朝地面，無原圖錯誤肘角標記；3 組 × 8 次與文字一致。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/WDIpL0pjun0",
      "check": {
        "videoId": "WDIpL0pjun0",
        "seconds": [
          5,
          10
        ],
        "observation": "可見地板雙手、腳尖支撐，屈肘下放與推回高位；選用單一動作短片，避免把其他退階說明當成同一版本。"
      },
      "findings": [
        "可見地板雙手、腳尖支撐，屈肘下放與推回高位；選用單一動作短片，避免把其他退階說明當成同一版本。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "705d1e5e16bbbbcc2c1e7cecb838d622152c05e10e776aea4313ac5334f4d186"
    }
  },
  "front-plank": {
    "revision": 6,
    "contentHash": "f51a7138bff4951e052fac725a331bcaa12d9b306c934b2886266116b389a827",
    "variation": "前臂棒式；本項起始設定：手肘位於肩膀正下方，雙腿向後伸直。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 30 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f51a7138bff4951e052fac725a331bcaa12d9b306c934b2886266116b389a827",
      "findings": [
        "核對三階段與停止條件；30 秒 × 3 組是本站起始參考，可提早結束，不以時間取代姿勢。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f51a7138bff4951e052fac725a331bcaa12d9b306c934b2886266116b389a827",
      "reviewedImageSha256": "553a6f349498c5424fd7e81b65040b3342dc6deae9275f2f9ebfde9a43b4fa48",
      "findings": [
        "四格：前臂肩下定位、前臂與腳尖支撐、靜止保持、膝回地結束；3 組 × 30 秒。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/QpOgJLqeo14",
      "check": {
        "videoId": "QpOgJLqeo14",
        "seconds": [
          10,
          20
        ],
        "observation": "重新核對前臂、腳尖支撐的棒式；10 秒準備跪姿，20 秒可見伸腿保持與肩肘對齊，非直臂高棒式。"
      },
      "findings": [
        "重新核對前臂、腳尖支撐的棒式；10 秒準備跪姿，20 秒可見伸腿保持與肩肘對齊，非直臂高棒式。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f51a7138bff4951e052fac725a331bcaa12d9b306c934b2886266116b389a827"
    }
  },
  "incline-dumbbell-press": {
    "revision": 5,
    "contentHash": "58d9f7d6cf9ee2176abfef08baff8d50e4656b5eb0232204b19d2f1558c04c75",
    "variation": "上斜啞鈴胸推；本項起始設定：椅背調至約 30–45 度，雙腳踩穩。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "58d9f7d6cf9ee2176abfef08baff8d50e4656b5eb0232204b19d2f1558c04c75",
      "findings": [
        "來源示範 45 度並提醒過陡會增加肩部主導；本站約 30–45 度、只降到舒適深度，不強迫固定深度。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "58d9f7d6cf9ee2176abfef08baff8d50e4656b5eb0232204b19d2f1558c04c75",
      "reviewedImageSha256": "88985409c7c991a8cb4bf7f4b2b86c5868b8e04ea07215bdbad72964ce4c52f4",
      "findings": [
        "重新檢視三格：低上斜椅背、頭背均有支撐，雙啞鈴由胸側上推再回程；3 組 10 次一致。圖像不能量測精確椅背角度，以文字 30–45 度及現場刻度為準。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/8IdQTpwJD-A?start=10&end=30",
      "check": {
        "videoId": "8IdQTpwJD-A",
        "seconds": [
          12,
          18,
          24,
          29
        ],
        "start": 10,
        "end": 30,
        "observation": "重新核對 10–30 秒上斜長椅雙啞鈴推胸；後半為擴胸，不納入示範區間。"
      },
      "findings": [
        "重新核對 10–30 秒上斜長椅雙啞鈴推胸；後半為擴胸，不納入示範區間。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "58d9f7d6cf9ee2176abfef08baff8d50e4656b5eb0232204b19d2f1558c04c75"
    }
  },
  "dumbbell-lateral-raise": {
    "revision": 3,
    "contentHash": "e8421f368cba2ec9fe644afc10c75f094bfc2413ee6ff1e077352361fe24e750",
    "variation": "啞鈴側平舉；本項起始設定：啞鈴放在身體兩側，手肘保持微彎。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e8421f368cba2ec9fe644afc10c75f094bfc2413ee6ff1e077352361fe24e750",
      "findings": [
        "已讀四步教學。避免以倒水姿勢強迫內旋；不把肩胛固定不動當成自然上舉必須遵循的通則。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "e8421f368cba2ec9fe644afc10c75f094bfc2413ee6ff1e077352361fe24e750",
      "reviewedImageSha256": "0f772fe35d3a10e67b54e879892f641c9e7892314dd8817428dcadd9ec6e1320",
      "findings": [
        "微屈肘向斜前外側抬至肩高，再控制下放；非前平舉過頭，10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "b900f0580ad0b4718fcfb4d2defad8148b5c10e12a6c31960397f6be0425fcd3"
    }
  },
  "romanian-deadlift": {
    "revision": 5,
    "contentHash": "6e9e062b6fe3cbcf9241f668db2de4dde39d79603fa6f651dcfffc406d2253b0",
    "variation": "羅馬尼亞硬舉；本項起始設定：站直持槓，膝蓋保持微彎。",
    "counting": "一次完整動作加回程算 1 次，預設每組 8 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6e9e062b6fe3cbcf9241f668db2de4dde39d79603fa6f651dcfffc406d2253b0",
      "findings": [
        "已對照原始來源：微彎膝、髖折及控制活動幅度。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6e9e062b6fe3cbcf9241f668db2de4dde39d79603fa6f651dcfffc406d2253b0",
      "reviewedImageSha256": "86724e053b6da4ba90de65d7141a6322c14ca1a0eaf552beed1fe4f864566cc5",
      "findings": [
        "已核對站姿開始、髖後移、槓貼腿、舒適深度與站直回程；移除將臀部誤標為背部的肌群圖，3 組 × 8 次相符。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/xgusDooVfKU",
      "check": {
        "videoId": "xgusDooVfKU",
        "seconds": [
          5,
          7,
          10,
          12
        ],
        "observation": "重新核對從站姿開始，膝微彎、髖後移、槓貼腿下降與回站；非一般硬舉地面起拉版本。"
      },
      "findings": [
        "重新核對從站姿開始，膝微彎、髖後移、槓貼腿下降與回站；非一般硬舉地面起拉版本。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "6e9e062b6fe3cbcf9241f668db2de4dde39d79603fa6f651dcfffc406d2253b0"
    }
  },
  "dumbbell-lunge": {
    "revision": 3,
    "contentHash": "c6fe5a0160040c9ec25f9c00e378a34ac86926a4aa16ba7f9717a1f2e200848a",
    "variation": "啞鈴弓箭步；本項起始設定：雙手持啞鈴自然垂放，跨出穩定步距。",
    "counting": "每組數字表示每側次數：左右各 10 次（合計 20 次單側動作）才算完成一組；不是左右合計 10 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c6fe5a0160040c9ec25f9c00e378a34ac86926a4aa16ba7f9717a1f2e200848a",
      "findings": [
        "已讀健身機構原始四步教學；不採用能預防或減少膝痛的保證，不將前膝不得超過腳尖當規則。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c6fe5a0160040c9ec25f9c00e378a34ac86926a4aa16ba7f9717a1f2e200848a",
      "reviewedImageSha256": "2e2c44d0b254a0828044e0f5cf5bb82120f65a928fc9e1b20b507d706f33c939",
      "findings": [
        "向前跨步而非反向弓箭步，前腳掌完整著地、起身回站；每側 8–12 次 3 組包含本站每側 10 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "d8f5b7cbf101bdc20448710766550bd3965a087c8511e3acf8d41778ecb42699"
    }
  },
  "kettlebell-swing": {
    "revision": 6,
    "contentHash": "ae112588a0187b9127ca381156d9e777b4df6d63db5c558a0b81a42586a120cf",
    "variation": "雙手壺鈴擺盪至約胸高，以髖折疊及伸髖驅動；不採過頭版本，包含地面起始與結束停放。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "ae112588a0187b9127ca381156d9e777b4df6d63db5c558a0b81a42586a120cf",
      "findings": [
        "已讀 Brett Jones 的起始與停放說明；雙手胸高版本、不過頭，份量仍是本站參考，不代表來源處方。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "ae112588a0187b9127ca381156d9e777b4df6d63db5c558a0b81a42586a120cf",
      "reviewedImageSha256": "e76ce3026e7453d81f49d7ddcb637d482b0538db18fe61ab039c6de00e3428bf",
      "findings": [
        "髖折、帶入腿間、伸髖擺起、回擺、地面停放五階段可見；壺鈴不過頭，4 組 10 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/sN57oEreWAU",
      "check": {
        "videoId": "sN57oEreWAU",
        "seconds": [
          9,
          15,
          21,
          25
        ],
        "observation": "重新核對雙手握單壺鈴，髖折與伸髖擺起，約胸高而非過頭擺盪。"
      },
      "findings": [
        "重新核對雙手握單壺鈴，髖折與伸髖擺起，約胸高而非過頭擺盪。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "ae112588a0187b9127ca381156d9e777b4df6d63db5c558a0b81a42586a120cf"
    }
  },
  "cable-face-pull": {
    "revision": 3,
    "contentHash": "24712598a4fab26c0a8a7b9dcf5c4326df285d68bcc187b7d7d9132e1a0e56aa",
    "variation": "滑輪臉拉；本項起始設定：滑輪調至臉部高度，雙手握住繩索。",
    "counting": "一次完整動作加回程算 1 次，預設每組 15 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "24712598a4fab26c0a8a7b9dcf5c4326df285d68bcc187b7d7d9132e1a0e56aa",
      "findings": [
        "已核對原始來源支持：繩索設定約眼高、向臉拉與受控回送、避免聳肩或借力。支持主要路徑；手肘高度與肩部活動範圍依可控制且舒適為準，不宣稱矯正姿勢或治療。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "24712598a4fab26c0a8a7b9dcf5c4326df285d68bcc187b7d7d9132e1a0e56aa",
      "reviewedImageSha256": "beab92b1f589b71dc87d286e997ef1b7417afbd0774ffd626bf5d43abbcbc03f",
      "findings": [
        "繩索拉到臉旁、肘向外後方、軀幹穩定可見，10–15 次 × 3 組包含預設；未見同一圖內動作矛盾。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/eTCBSFlCJ_s",
      "check": {
        "videoId": "eTCBSFlCJ_s",
        "seconds": [
          7,
          16
        ],
        "observation": "可見站姿將高位繩索拉向面部並分開雙手，取代原本滑輪飛鳥影片。"
      },
      "findings": [
        "可見站姿將高位繩索拉向面部並分開雙手，取代原本滑輪飛鳥影片。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "24712598a4fab26c0a8a7b9dcf5c4326df285d68bcc187b7d7d9132e1a0e56aa"
    }
  },
  "assisted-pull-up": {
    "revision": 5,
    "contentHash": "77dceea4a746785b90ac8e1941d5a22faf2a9f2c15d0dcaee007dde86fcd58fc",
    "variation": "跪墊式輔助引體向上：雙膝支撐於活動墊；上下機踏固定踏階，不用活動墊當站板。",
    "counting": "一次完整動作加回程算 1 次，預設每組 8 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "77dceea4a746785b90ac8e1941d5a22faf2a9f2c15d0dcaee007dde86fcd58fc",
      "findings": [
        "已讀 Life Fitness Assisted Dip/Chin 雙膝墊教學；離機安全必須按現場說明，不適用活動站板式機台。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "77dceea4a746785b90ac8e1941d5a22faf2a9f2c15d0dcaee007dde86fcd58fc",
      "reviewedImageSha256": "385c04b2a569bb7dafe8aec2fd45ea5ac2c39a451fbf05e03cb91d3b2b4adba0",
      "findings": [
        "固定踏階、雙膝支撐與移動膝墊分開；上拉時人體和膝墊同步升高，回程一致，3 組 8 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "ab7bf7d11c983b4751efa256b44da598a45f7286f88c63a6baebf92747cbe960"
    }
  },
  "machine-hip-thrust": {
    "revision": 3,
    "contentHash": "aff3f4301e2edf45d4f411440e6db9f6c46fd1a53962a2b4404042209c012d1f",
    "variation": "臀推機臀推；本項起始設定：上背靠穩墊面，髖墊置於骨盆前側。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "aff3f4301e2edf45d4f411440e6db9f6c46fd1a53962a2b4404042209c012d1f",
      "findings": [
        "已讀器械臀推段落，並參照 Life Fitness 原廠 Glute Drive 結構；不採文章的『必須重重量』或防受傷保證，解扣必須依現場型號。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "aff3f4301e2edf45d4f411440e6db9f6c46fd1a53962a2b4404042209c012d1f",
      "reviewedImageSha256": "b545e4dffc7ebcd121bf37cb4698cf569c5c50953bc24b1c3a62f3b371c17363",
      "findings": [
        "可見上背靠墊、骨盆前方護墊、腳踩平台與伸髖回程；10–15 次 3 組包含本站 10 次。退出／卸载需配合旁邊文字，圖非機台操作手冊。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "60f2fa8d338aec4928b84bfed17237c5991d8e1a6e5a5a9666e3441b5881d968"
    }
  },
  "hack-squat": {
    "revision": 3,
    "contentHash": "956ba07e069a6033707e321d92eb9786b1245fa635cb669dd4903d8b71ca4964",
    "variation": "哈克深蹲；本項起始設定：肩背貼穩墊面，雙腳置於踏板約肩寬。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "956ba07e069a6033707e321d92eb9786b1245fa635cb669dd4903d8b71ca4964",
      "findings": [
        "已讀斜導軌肩背支撐版本；深度以可穩定控制為準，不強迫所有人蹲至固定角度。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "956ba07e069a6033707e321d92eb9786b1245fa635cb669dd4903d8b71ca4964",
      "reviewedImageSha256": "a1937d1a73e43784db1075b4facddf4e9d8b04bf5fb7de20b2275be4222866f6",
      "findings": [
        "肩背貼滑車、腳踩固定踏板、下降與推回方向一致；安全扣和回掛文字具備，8–12 次 3 組包含本站 10 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "93b19253946d8c8037af3aaad275f01d95f99774e46f76bb12c402875e125605"
    }
  },
  "standing-calf-raise": {
    "revision": 5,
    "contentHash": "005fe2fbc1e59837ae05c2b67f11a922c8bcf2e388bfe7b223612fcd057ca9fb",
    "variation": "站姿提踵；本項起始設定：前腳掌踩穩踏板，肩墊高度調整合適。",
    "counting": "一次完整動作加回程算 1 次，預設每組 15 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "005fe2fbc1e59837ae05c2b67f11a922c8bcf2e388bfe7b223612fcd057ca9fb",
      "findings": [
        "已讀機械段落，採腳尖朝前版本；不採用任意內外轉 45 度或膝過伸。無特定品牌操作機構的支持，解鎖方式依現場說明。",
        "已分開記錄動作來源支持與本站預設份量；仍非個別健康狀況的處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "005fe2fbc1e59837ae05c2b67f11a922c8bcf2e388bfe7b223612fcd057ca9fb",
      "reviewedImageSha256": "4343e16d746ac06e01f2569297fa0ee541f8a657a8ab8241b49adbc4a06cb008",
      "findings": [
        "已改為前腳掌踩踏塊、腳跟懸出後緣，下放與提起均有活動空間；3 組 15 次及卸載後離機提示一致。",
        "已對照可見姿勢、支撐和文字；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "7de8cac9e4899be02f2a031da1341b38a40d9d65df99004ed9f325800a40c40b"
    }
  },
  "machine-hip-adduction": {
    "revision": 4,
    "contentHash": "776bad570c3bac7590b7525f93114eec646546c2433d116a8c12eb894aa2956d",
    "variation": "坐姿大腿內收；本項起始設定：依機身圖示調整座椅、起始角度與擋墊，讓擋墊接觸大腿內側、避開膝關節直接受壓；不套用膝蓋對準轉軸的口訣。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "776bad570c3bac7590b7525f93114eec646546c2433d116a8c12eb894aa2956d",
      "findings": [
        "已對照原始來源：內側擋墊與合腿、受控回程。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "776bad570c3bac7590b7525f93114eec646546c2433d116a8c12eb894aa2956d",
      "reviewedImageSha256": "c1166a8cbd814a171aa6b5256fb76081954861f64fdb0e8382356d083423af70",
      "findings": [
        "阻力墊在大腿內側而非外側，雙腳有踏桿支撐，張開→合攏→張開三階段一致，3 組 12 次相符。",
        "已對照可見姿勢、支撐與文字；器械外形為示意，設定與上下機依現場機型，非生物力學量測或專業認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "118d5a95e42871b8922fd532cf979162e2309cef9a4bdcd18bc2f38d5e4db2b4"
    }
  },
  "machine-hip-abduction": {
    "revision": 2,
    "contentHash": "91deefae22a5837a47dc46e87f3f5def20fb4e6c1ba121405c11ba14675abf82",
    "variation": "坐姿大腿外展；本項起始設定：依機身圖示調整座椅、起始角度與擋墊，讓擋墊接觸大腿外側、避開膝關節直接受壓；不套用膝蓋對準轉軸的口訣。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "91deefae22a5837a47dc46e87f3f5def20fb4e6c1ba121405c11ba14675abf82",
      "findings": [
        "已對照原始來源：外側擋墊與開腿、受控回程。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "91deefae22a5837a47dc46e87f3f5def20fb4e6c1ba121405c11ba14675abf82",
      "reviewedImageSha256": "1d14b5c57fa62b03a4008776a99b945a2be8e27d29e00eeb262a2a25f2819323",
      "findings": [
        "外側擋墊、向外打開與回程可見，未印出錯誤的膝軸通則。圖為 12–15 次 × 3 組，頁面以 12 次為預設；機台設定依現場型號。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/3iGBw2muBrc",
      "check": {
        "videoId": "3iGBw2muBrc",
        "seconds": [
          20,
          28,
          36,
          54,
          60
        ],
        "observation": "可見坐姿機台、腿外側靠墊與雙腿向外打開。此片只用於外展，不再同時作為內收示範。"
      },
      "findings": [
        "可見坐姿機台、腿外側靠墊與雙腿向外打開。此片只用於外展，不再同時作為內收示範。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "91deefae22a5837a47dc46e87f3f5def20fb4e6c1ba121405c11ba14675abf82"
    }
  },
  "dumbbell-overhead-triceps-extension": {
    "revision": 6,
    "contentHash": "b3a23f16ea0cd1c81c723be5038b8ee4778646c9b4ccc932fab077cfe6a40620",
    "variation": "啞鈴過頭三頭肌伸展；本項起始設定：雙手托住一顆啞鈴並舉過頭，雙腳站穩、腹部收緊。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b3a23f16ea0cd1c81c723be5038b8ee4778646c9b4ccc932fab077cfe6a40620",
      "findings": [
        "已核對三階段與手肘肩寬提示；不用固定九十度換取肩肘不適，不用 Mayo 仰躺單臂版本充當站姿過頭版。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "b3a23f16ea0cd1c81c723be5038b8ee4778646c9b4ccc932fab077cfe6a40620",
      "reviewedImageSha256": "b8093cad299e300270c0d2d3d11e591a412151f8179d04b9a499b88e2532f988",
      "findings": [
        "正側面三格，上臂穩定、雙肘明顯彎曲使單顆啞鈴降到頭後，雙手共同持握，沒有強制夾耳提示；3 組 12 次一致。",
        "已對照可見姿勢、支撐和文字；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/z2-MsrrOFLM",
      "check": {
        "videoId": "z2-MsrrOFLM",
        "seconds": [
          15,
          29,
          40,
          52
        ],
        "observation": "重新核對站姿雙手持單顆啞鈴、頭後屈肘與向上伸肘；不是坐姿或單手版本。"
      },
      "findings": [
        "重新核對站姿雙手持單顆啞鈴、頭後屈肘與向上伸肘；不是坐姿或單手版本。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "b3a23f16ea0cd1c81c723be5038b8ee4778646c9b4ccc932fab077cfe6a40620"
    }
  },
  "back-extension": {
    "revision": 4,
    "contentHash": "6978b06cc78fa13ba9c97798a4d2990913c7043e58452b47d7eebc8cc8a738a0",
    "variation": "羅馬椅背伸；本項起始設定：調整大腿墊，使髖關節能自由折疊。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6978b06cc78fa13ba9c97798a4d2990913c7043e58452b47d7eebc8cc8a738a0",
      "findings": [
        "已讀俯臥羅馬椅版本，並非坐姿配重背伸機；不過度後仰。",
        "份量是本站起始參考，不是來源的個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "6978b06cc78fa13ba9c97798a4d2990913c7043e58452b47d7eebc8cc8a738a0",
      "reviewedImageSha256": "eb59ff484c7285ed8310237e682604bcb1bd8f66de99c54c9729b3df25c4e927",
      "findings": [
        "確為羅馬椅髖折背伸而非硬舉；腿部支撐、髖折下放及回到軀幹腿部直線相符，10–15 次 3 組包含本站 12 次。圖不取代上／下機文字。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/VdIKtiivPyk?start=80&end=135",
      "check": {
        "videoId": "VdIKtiivPyk",
        "seconds": [
          80,
          105,
          125
        ],
        "start": 80,
        "end": 135,
        "observation": "重新核對 80–135 秒為 45 度羅馬椅髖折前傾與回到身體一直線；確實不是硬舉。片名改善疼痛屬原作者表述，本站不將此當作治療承諾。"
      },
      "findings": [
        "重新核對 80–135 秒為 45 度羅馬椅髖折前傾與回到身體一直線；確實不是硬舉。片名改善疼痛屬原作者表述，本站不將此當作治療承諾。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "6978b06cc78fa13ba9c97798a4d2990913c7043e58452b47d7eebc8cc8a738a0"
    }
  },
  "reverse-pec-deck": {
    "revision": 3,
    "contentHash": "72a35561ad6debd2bd1347bc52bc9c35504fab9967bf1beeea597690c62399ce",
    "variation": "反向蝴蝶機；本項起始設定：面向器械坐穩，胸口貼靠墊面。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "72a35561ad6debd2bd1347bc52bc9c35504fab9967bf1beeea597690c62399ce",
      "findings": [
        "已對照動作專屬來源：Life Fitness 飛鳥／後三角機胸靠墊、雙腳踩地、展臂與控制回程。",
        "來源機型 Life Fitness Pectoral Fly/Rear Deltoid；其他機型的起始角度需依原廠圖示調整。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "72a35561ad6debd2bd1347bc52bc9c35504fab9967bf1beeea597690c62399ce",
      "reviewedImageSha256": "850e2145c6d7d04396192a2095a04ea5ce8f39a78090c5117ab57497003ad964",
      "findings": [
        "胸口靠墊、手臂由前向兩側展開再回程；圖有切換正反視角，不代表中途轉身，10–15 次 3 組包含本站 12 次。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "14b3112059e2650290797499247084aa27a37841518bc0e07417df53bc94c3e9"
    }
  },
  "incline-push-up": {
    "revision": 3,
    "contentHash": "c02bd6e213772d27a49bc5fea6d29ca80c1f8c4fab83eb9fd32e087b6a301805",
    "variation": "雙手撐穩固加高水平長椅的上斜伏地挺身；非牆面版。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c02bd6e213772d27a49bc5fea6d29ca80c1f8c4fab83eb9fd32e087b6a301805",
      "findings": [
        "已對照原始來源：抬高手部支撐與控制推回。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "c02bd6e213772d27a49bc5fea6d29ca80c1f8c4fab83eb9fd32e087b6a301805",
      "reviewedImageSha256": "4a06bf6a182cfdb37f36f726ffb0ea349eb0dc620ac0697ed4c4e4a7fb1ef39b",
      "findings": [
        "已查看四格：固定水平長椅支撐，頭至腳跟對齊，控制下放再推回；2 組 × 10 次；未混入牆面版。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/0JUrOH--Kdk",
      "check": {
        "videoId": "0JUrOH--Kdk",
        "seconds": [
          4,
          10
        ],
        "observation": "可見雙手撐固定長椅、全身直線屈肘下放的上斜版本；不是地板伏地挺身。"
      },
      "findings": [
        "可見雙手撐固定長椅、全身直線屈肘下放的上斜版本；不是地板伏地挺身。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "c02bd6e213772d27a49bc5fea6d29ca80c1f8c4fab83eb9fd32e087b6a301805"
    }
  },
  "reverse-lunge": {
    "revision": 4,
    "contentHash": "350a5ed3fa55fc459d40f9ab046e2e2fb6c73ba2b52d9bc53468297152e5832c",
    "variation": "反向弓箭步；本項起始設定：站直並扶牆也可以，一腳向後跨一大步。",
    "counting": "每組數字表示每側次數：左右各 8 次（合計 16 次單側動作）才算完成一組；不是左右合計 8 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "350a5ed3fa55fc459d40f9ab046e2e2fb6c73ba2b52d9bc53468297152e5832c",
      "findings": [
        "核對 Reverse Lunges 段落；不採同頁不相關腿彎舉說明。本站左右各 8 次 × 2 組為起始參考。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "350a5ed3fa55fc459d40f9ab046e2e2fb6c73ba2b52d9bc53468297152e5832c",
      "reviewedImageSha256": "cb357ffbf8b0fc7c1d99bb77c3da22fd9b0d086e54fd4759cf86d4f124caf9c0",
      "findings": [
        "四格確認站立、後跨同一路徑、前腳全掌支撐下蹲及回站；未交叉後跨。左右各 8 次、2 組正確。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "4311533b888f0a87abd5b6fca9f5db97e669a286fa0b86f489ff03c50e1dc0d2"
    }
  },
  "glute-bridge": {
    "revision": 6,
    "contentHash": "dcfc44e72a965dd15f7557c0f675706d224b24b2657dc765667b1efa0b8c3131",
    "variation": "臀橋；本項起始設定：仰躺屈膝，雙腳約髖寬踩穩地面。",
    "counting": "一次完整動作加回程算 1 次，預設每組 12 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "dcfc44e72a965dd15f7557c0f675706d224b24b2657dc765667b1efa0b8c3131",
      "findings": [
        "核對 Setup 至 Return 及常見錯誤；2 組 × 12 次為本站起始參考，不採用來源較長等長停留份量。",
        "已對照動作專屬來源；起始份量為本站一般參考，不是個人化處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "dcfc44e72a965dd15f7557c0f675706d224b24b2657dc765667b1efa0b8c3131",
      "reviewedImageSha256": "c46fa8ba605568517b56521f630659662f429e006eb5038a45e1e7ea6a8bf42e",
      "findings": [
        "三格完整呈現屈膝準備、抬髖肩髖膝接近直線、骨盆控制放回；雙腳全腳掌支撐，2 組 × 12 次正確。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/iZ611vwxI4I",
      "check": {
        "videoId": "iZ611vwxI4I",
        "seconds": [
          7,
          15,
          27
        ],
        "observation": "重新核對仰躺屈膝、雙腳踏實及抬髖保持；非單腳臀橋。影片建議的保持秒數不覆蓋本站動態次數。"
      },
      "findings": [
        "重新核對仰躺屈膝、雙腳踏實及抬髖保持；非單腳臀橋。影片建議的保持秒數不覆蓋本站動態次數。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "dcfc44e72a965dd15f7557c0f675706d224b24b2657dc765667b1efa0b8c3131"
    }
  },
  "bird-dog": {
    "revision": 5,
    "contentHash": "f89335da883e4d25a772adef3e489ca9932600109f1d034f5c3b613a6457bc9f",
    "variation": "四足跪姿、對側手腳交替伸展的鳥狗式；不使用同側手腳抬起版本。",
    "counting": "每組數字表示每側次數：左右各 8 次（合計 16 次單側動作）才算完成一組；不是左右合計 8 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f89335da883e4d25a772adef3e489ca9932600109f1d034f5c3b613a6457bc9f",
      "findings": [
        "已對照原始來源：四足對側伸展及骨盆穩定。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f89335da883e4d25a772adef3e489ca9932600109f1d034f5c3b613a6457bc9f",
      "reviewedImageSha256": "a1856d20edff952c44e2253f87ec80dc0ca3d065dce05891157d363ff7cef820",
      "findings": [
        "三格確認四足定位、遠側右手與近側左腿伸展、收回；對側支撐可辨識。已移除鏡像假換側與重複左右標籤。另一側以文字提示，左右各 8 次、2 組。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/ZdAHe9_HeEw",
      "check": {
        "videoId": "ZdAHe9_HeEw",
        "seconds": [
          7,
          12,
          16
        ],
        "observation": "重新核對四足跪姿、對側手腳伸展與回收／換側；手腳不必抬得比軀幹高。"
      },
      "findings": [
        "重新核對四足跪姿、對側手腳伸展與回收／換側；手腳不必抬得比軀幹高。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f89335da883e4d25a772adef3e489ca9932600109f1d034f5c3b613a6457bc9f"
    }
  },
  "dead-bug": {
    "revision": 4,
    "contentHash": "2ffb8fa399cad9130db07933032be456382c4dbe044bee7bd54b030d4e44638d",
    "variation": "仰躺髖膝約 90 度起始，對側手腳下放再回收的死蟲式；非伸直起始交替抬腿版。",
    "counting": "每組數字表示每側次數：左右各 8 次（合計 16 次單側動作）才算完成一組；不是左右合計 8 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "2ffb8fa399cad9130db07933032be456382c4dbe044bee7bd54b030d4e44638d",
      "findings": [
        "已對照原始來源：90/90 起始、對側伸展及腰背控制。預設次數、組數及舒適範圍仍依個人能力調整，不是醫療處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "2ffb8fa399cad9130db07933032be456382c4dbe044bee7bd54b030d4e44638d",
      "reviewedImageSha256": "b26a08d22db385caae377df8cf0cce03acec3b5d17b2b91d1c26bd45fc8343d1",
      "findings": [
        "已查看四格：仰躺髖膝屈曲起始，第二格遠側右手與近側左腿延伸，第四格近側左手與遠側右腿延伸；頭部保持墊上，左右各 8 次、2 組。",
        "人工檢視可見畫面及文字，不代表醫療或生物力學認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/xZhwA0lgIs8?start=110&end=180",
      "check": {
        "videoId": "xZhwA0lgIs8",
        "seconds": [
          115,
          125,
          135,
          145,
          155,
          175
        ],
        "start": 110,
        "end": 180,
        "observation": "已核對仰躺髖膝約 90 度、雙手朝上起始，對側手腳延伸後回收與換側；選取 110–180 秒示範，避免前段錯誤姿勢說明被當作正確動作。不是整片逐秒審核；份量依本站課表。"
      },
      "findings": [
        "已核對仰躺髖膝約 90 度、雙手朝上起始，對側手腳延伸後回收與換側；選取 110–180 秒示範，避免前段錯誤姿勢說明被當作正確動作。不是整片逐秒審核；份量依本站課表。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "2ffb8fa399cad9130db07933032be456382c4dbe044bee7bd54b030d4e44638d"
    }
  },
  "mountain-climber": {
    "revision": 3,
    "contentHash": "0419225f75994a79ed73b588be8a25c0184398bcfb4c90f2b95f2d6459f8234a",
    "variation": "慢速登山者：高棒式、單膝朝同側胸口方向收近，回程後才換腿；不是交叉提膝或跳躍換腿版本。",
    "counting": "每組數字表示每側次數：左右各 12 次（合計 24 次單側動作）才算完成一組；不是左右合計 12 次。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0419225f75994a79ed73b588be8a25c0184398bcfb4c90f2b95f2d6459f8234a",
      "findings": [
        "核對 [P]rehab 慢速版；明確移除加速暗示並補回程、換腿與雙膝落地結束。ACE 跳躍版及 Physitrack 頁面內的弓步旋轉不當作相同示範。",
        "份量為本站一般起始參考，不是個人化處方；影片仍待補。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0419225f75994a79ed73b588be8a25c0184398bcfb4c90f2b95f2d6459f8234a",
      "reviewedImageSha256": "243b72c4a32ca67be73a1a03c5c29aaa2f710d6fa0d410fc68f5e08ca3781c80",
      "findings": [
        "已檢視四格新圖：第二格近鏡腿彎曲、遠腿支撐，第四格改為遠腿彎曲、近腿支撐；第三格雙腳回高棒式，與舊圖重複同側問題不同。",
        "核對圖中每側 12 次 × 2 組、呼吸與主檔一致，無標語、視線朝地；左側標記指向該側鞋部而非膝，腿位仍可辨識。",
        "這是成品視覺核對，不是生物力學量測或醫療／專業認證；未完成完整影片審查。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "64e1c6255698de908add079ede70974ade9112389a41bfae6baa420fe9216eb6"
    }
  },
  "wall-sit": {
    "revision": 4,
    "contentHash": "ce302f700e3066956bd1c7d7522367df878c1eefa09667af73d53f18a65a043f",
    "variation": "靠牆深蹲停留；本項起始設定：背部靠穩牆面，雙腳向前移至能全腳掌踩穩、膝蓋舒適的位置，不固定為一個腳掌的距離。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 30 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "ce302f700e3066956bd1c7d7522367df878c1eefa09667af73d53f18a65a043f",
      "findings": [
        "僅引用 Phase 2 的動作原理，不採治療進程、疼痛容許值或每日頻率。本站保持 30 秒 × 2 組為一般起始參考；疼痛即停止。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "ce302f700e3066956bd1c7d7522367df878c1eefa09667af73d53f18a65a043f",
      "reviewedImageSha256": "3342e0c5962682c2809fed489616d892d7c1e3db96c77f487d5518dd30519a1a",
      "findings": [
        "三格確認背靠牆及全腳掌支撐、舒適深度保持、控制站回；移除強制九十度與額外組數。2 組 × 30 秒。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "210f0735d1bbbdf6f583bfd70411c32ed5fe2e9966a612998e681db7a60af79e"
    }
  },
  "superman": {
    "revision": 4,
    "contentHash": "7cd24e9eb8dce1405bace8d8ee7875b7a743b2590b7717572f5c9491f64387af",
    "variation": "俯臥超人式；本項起始設定：俯臥並將手臂向前伸，額頭朝向地面。",
    "counting": "一次完整動作加回程算 1 次，預設每組 10 次；雙側同步不重複加倍。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "7cd24e9eb8dce1405bace8d8ee7875b7a743b2590b7717572f5c9491f64387af",
      "findings": [
        "核對起始、抬起與放下三階段；僅採小幅度、舒適範圍。本站 2 組 × 10 次不是來源的個人處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "7cd24e9eb8dce1405bace8d8ee7875b7a743b2590b7717572f5c9491f64387af",
      "reviewedImageSha256": "6dfe9013e1683f5b411dc012819af9d26eb79e9758eeb883b4ee38aa4f460d16",
      "findings": [
        "三格確認俯臥、雙手雙腿小幅離地及放回；頭頸朝墊面，不抬頭看鏡頭。2 組 × 10 次，疼痛停止提示保留。",
        "已人工檢視可見畫面及文字，非醫療或生物力學認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "1927da42da97130164243f7b9007550e1a66f280fc1af65ccbe560772d9cf6b8"
    }
  },
  "cat-cow": {
    "revision": 4,
    "contentHash": "edc3c9c9189d9b68ba94cede9092b513cd0b08f985968d1be4fb123ea16eeefe",
    "variation": "貓牛式；本項起始設定：四足跪姿，手在肩下、膝在髖下。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 45 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "edc3c9c9189d9b68ba94cede9092b513cd0b08f985968d1be4fb123ea16eeefe",
      "findings": [
        "已對照動作專屬來源：四足支撐排列、吸氣延伸與吐氣圓背交替。",
        "課表份量仍按能力調整，非醫療處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "edc3c9c9189d9b68ba94cede9092b513cd0b08f985968d1be4fb123ea16eeefe",
      "reviewedImageSha256": "359909f93a051a20927bf2ebc1a0ef6cc311cb19018d1d0792a7e6321f2a9a58",
      "findings": [
        "四足支撐下牛式與貓式脊椎方向相反且可辨，45 秒活動相符；結束回中立依旁邊完整文字。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/JzU1lMR1Uzw?start=65&end=180",
      "check": {
        "videoId": "JzU1lMR1Uzw",
        "seconds": [
          80,
          90,
          100,
          108,
          125,
          135,
          150,
          165
        ],
        "start": 65,
        "end": 180,
        "observation": "已重新核對四足跪姿、拱背與回到牛式；125–135 秒包含錯誤過大幅度示範與說明，勿模仿。保留 65–180 秒完整說明區間，不要求跟到影片頸部抬起幅度或特定呼吸節奏。"
      },
      "findings": [
        "已重新核對四足跪姿、拱背與回到牛式；125–135 秒包含錯誤過大幅度示範與說明，勿模仿。保留 65–180 秒完整說明區間，不要求跟到影片頸部抬起幅度或特定呼吸節奏。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "edc3c9c9189d9b68ba94cede9092b513cd0b08f985968d1be4fb123ea16eeefe"
    }
  },
  "child-pose": {
    "revision": 4,
    "contentHash": "285e01057b951213ddf298eb273af6c3537228fe0ac521239beda07f7f62cdc4",
    "variation": "嬰兒式；本項起始設定：跪坐後讓膝蓋保持舒適寬度，臀部朝腳跟移動。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 45 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "285e01057b951213ddf298eb273af6c3537228fe0ac521239beda07f7f62cdc4",
      "findings": [
        "核對 Setup–Release；本站只採輕微拉感，不把減壓或治療效果當保證，不採個人治療處方。",
        "預設組數及次數為本站一般起始參考，非來源個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "285e01057b951213ddf298eb273af6c3537228fe0ac521239beda07f7f62cdc4",
      "reviewedImageSha256": "47617b67c8c027503eb5a1222513d238876e2d0f570f1505b0d321d0f8184e71",
      "findings": [
        "四足→髖向腳跟→雙臂前伸→保持，沒有把靜態伸展當反覆次數；30–45 秒包含本站 45 秒。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/JzU1lMR1Uzw?start=270&end=310",
      "check": {
        "videoId": "JzU1lMR1Uzw",
        "seconds": [
          280,
          290,
          300
        ],
        "start": 270,
        "end": 310,
        "observation": "重新核對臀部往腳跟、雙手前伸的嬰兒式；280 秒屈肘為準備，290、300 秒為雙手前伸保持。"
      },
      "findings": [
        "重新核對臀部往腳跟、雙手前伸的嬰兒式；280 秒屈肘為準備，290、300 秒為雙手前伸保持。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "285e01057b951213ddf298eb273af6c3537228fe0ac521239beda07f7f62cdc4"
    }
  },
  "kneeling-hip-flexor-stretch": {
    "revision": 5,
    "contentHash": "9bc885bcd03e3de12d3c1909310e806195cfee726a68a67760ec5e3a0af026fa",
    "variation": "跪姿髖屈肌伸展；本項起始設定：單膝跪地、另一腳踩在前方，必要時扶牆。",
    "counting": "每組只保持一側 30 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9bc885bcd03e3de12d3c1909310e806195cfee726a68a67760ec5e3a0af026fa",
      "findings": [
        "已對照動作專屬來源：半跪排列、骨盆穩定及後側臀部輕收。",
        "課表份量仍按能力調整，非醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9bc885bcd03e3de12d3c1909310e806195cfee726a68a67760ec5e3a0af026fa",
      "reviewedImageSha256": "8ff46451e49f32caea86dd9ae11883c14f90ff8bd05a6b55a1a9766df2e5d30e",
      "findings": [
        "重新檢視四格：半跪、骨盆穩定小幅前移、保持與退回；每側 30 秒合共兩組一致。已區分墊子減少接觸壓力與關節疼痛需停止。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "600b793d9992fd1e861f912ed0cba0d0119185106c1690fae3e4db0180279d65"
    }
  },
  "figure-four-stretch": {
    "revision": 6,
    "contentHash": "f0a80e5bc6b9003ac2f7f87b5cbd5109e91b31d863a0321d9cd03b9791c66eab",
    "variation": "仰躺四字伸展：腳踝架在對側大腿、雙手抱支撐腿後側；本圖固定右腳踝架左大腿示範，先回地面再解開換側。",
    "counting": "每組只保持一側 30 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f0a80e5bc6b9003ac2f7f87b5cbd5109e91b31d863a0321d9cd03b9791c66eab",
      "findings": [
        "核對仰躺抱大腿版本，補明確同側與支撐側、回程後才換邊；移除未由所選來源說明的毛巾操作。",
        "每側 30 秒、左右各一組為本站起始參考，不是個人化處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "f0a80e5bc6b9003ac2f7f87b5cbd5109e91b31d863a0321d9cd03b9791c66eab",
      "reviewedImageSha256": "ad08b0db9c9a4e459b8c60ede0f886d6abf2b0568f1adb92ac6ac515f9056ea2",
      "findings": [
        "重新檢視三格：腳踝搭對側大腿，雙手環抱支撐腿大腿後側，頭肩留在墊上，退出回雙腳著地；左右各 30 秒、合共兩組一致。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/vdIugUHKGWg?start=40&end=105",
      "check": {
        "videoId": "vdIugUHKGWg",
        "seconds": [
          60,
          80,
          100
        ],
        "start": 40,
        "end": 105,
        "observation": "重新核對仰躺一踝跨對側大腿形成四字，雙手托支撐腿後側，兩側依序示範；不是踝壓膝蓋。"
      },
      "findings": [
        "重新核對仰躺一踝跨對側大腿形成四字，雙手托支撐腿後側，兩側依序示範；不是踝壓膝蓋。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "f0a80e5bc6b9003ac2f7f87b5cbd5109e91b31d863a0321d9cd03b9791c66eab"
    }
  },
  "supine-twist": {
    "revision": 5,
    "contentHash": "daf08cc6efa2f6b5f397425220a58979c116e87dfb85db3650b28dc1d9071a31",
    "variation": "仰躺脊椎扭轉；本項起始設定：仰躺屈膝，雙腳踩地，雙臂向兩側打開。",
    "counting": "每組只保持一側 30 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "daf08cc6efa2f6b5f397425220a58979c116e87dfb85db3650b28dc1d9071a31",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已核對：仰躺屈膝併攏、雙膝一同轉向側面並返回。",
        "採雙膝版，不是單膝跨腿；保持上身放鬆，不以強壓肩膀換取膝蓋觸地。本站靜態時間非來源處方。",
        "影片配對／備註更新後複核：動作步驟、計數、來源及分鏡未改；影片差異已明示，文字核對仍適用。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "daf08cc6efa2f6b5f397425220a58979c116e87dfb85db3650b28dc1d9071a31",
      "reviewedImageSha256": "871929fc95e5b6890d3cb91c8edd7f9104eb1f8095b04d51c71402462f0e2e9f",
      "findings": [
        "重新檢視四格：雙膝靠攏向一側轉、幅度小、回正；沒有強迫肩膀壓地箭頭；每側 30 秒、合共兩組一致。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。",
        "影片配對／備註更新後對照已檢視成品：指定動作、支撐與份量未變，現有圖片仍適用；保留原產圖內容 hash。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/QxsmVexWs_4",
      "check": {
        "videoId": "QxsmVexWs_4",
        "seconds": [
          4,
          10,
          16,
          22
        ],
        "observation": "已核對仰躺屈膝、雙膝一起往兩側轉動並回正，取代原單膝跨側版本。影片雙臂放身側且為短停往返；本站雙臂舒適展開，依課表每側保持 30 秒，不必跟影片節奏或追求膝蓋碰地。"
      },
      "findings": [
        "已核對仰躺屈膝、雙膝一起往兩側轉動並回正，取代原單膝跨側版本。影片雙臂放身側且為短停往返；本站雙臂舒適展開，依課表每側保持 30 秒，不必跟影片節奏或追求膝蓋碰地。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "daf08cc6efa2f6b5f397425220a58979c116e87dfb85db3650b28dc1d9071a31"
    }
  },
  "butterfly-stretch": {
    "revision": 3,
    "contentHash": "8b0b8b17b0d0fd8a5210794723464eeaf6f880415c6fb273c59091524a05faa1",
    "variation": "蝴蝶式伸展；本項起始設定：坐在折疊毛巾上，腳掌相對、膝蓋自然向兩側。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 45 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8b0b8b17b0d0fd8a5210794723464eeaf6f880415c6fb273c59091524a05faa1",
      "findings": [
        "已核對原始來源支持：腳掌相對的坐姿伸展、脊椎舒服直立、避免壓膝及彈震。來源提供 15–30 秒，本站既有 30–45 秒是一般參考上限，不是來源處方；不舒服應先停止，不能只墊高硬做。",
        "本次僅補來源核對紀錄，教學、份量、圖檔與影片 URL 未變；保留原圖問題及影片僅片段抽查的限制。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "8b0b8b17b0d0fd8a5210794723464eeaf6f880415c6fb273c59091524a05faa1",
      "reviewedImageSha256": "43f1335df1b392d64e19cf157c019b1971bd7937493bf262819378a68baaf196",
      "findings": [
        "腳掌相對、坐高、膝自然向外，無手壓膝可見，30–45 秒涵蓋預設；不適時不是只墊高就繼續。",
        "已逐張檢視原始圖的可見內容；這不是生物力學量測或醫療／專業認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/v4OLkxi5-Q0",
      "check": {
        "videoId": "v4OLkxi5-Q0",
        "seconds": [
          5,
          11
        ],
        "observation": "可見坐地腳掌相對與舒適前傾，取代無對應章節的全身伸展長片。"
      },
      "findings": [
        "可見坐地腳掌相對與舒適前傾，取代無對應章節的全身伸展長片。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "8b0b8b17b0d0fd8a5210794723464eeaf6f880415c6fb273c59091524a05faa1"
    }
  },
  "downward-dog": {
    "revision": 3,
    "contentHash": "24adf0d61c18a95eb4b85bc5386efe76d9e24c6d6246a2eafd287d2e2cb39e7a",
    "variation": "下犬式；本項起始設定：四足跪姿，腳趾踩地後將髖部向後上方推。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 30 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "24adf0d61c18a95eb4b85bc5386efe76d9e24c6d6246a2eafd287d2e2cb39e7a",
      "findings": [
        "已對照動作專屬來源：髖往後上方、軀幹延伸及可微屈膝。",
        "來源由高平板進出；本站是四足跪姿起始的靜態退階，屈膝回四足退出，不把來源動態份量直接套用。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "24adf0d61c18a95eb4b85bc5386efe76d9e24c6d6246a2eafd287d2e2cb39e7a",
      "reviewedImageSha256": "92f74328eb9fad91df7f6ee88e9043e6e9355fd050fea3b1c98cf6920d2a7eed",
      "findings": [
        "倒 V 姿勢、可微屈膝、不強求腳跟接地；20–30 秒包含本站 30 秒，退出依文字屈膝回四足。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "cb4376c974b67e01c4f82d42de8e4c58d5bf67bff53cda85a5c86102f159d1e0"
    }
  },
  "cobra-pose": {
    "revision": 3,
    "contentHash": "9bb732e97d726ebbf586791fff7cabb71715474ca3d88a9812fc883e4e023b46",
    "variation": "低眼鏡蛇式；本項起始設定：俯臥，手掌放在胸口兩側，手肘靠近身體。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 20 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9bb732e97d726ebbf586791fff7cabb71715474ca3d88a9812fc883e4e023b46",
      "findings": [
        "已對照動作專屬來源：骨盆留在墊面、小幅抬胸、控制回程及腰痛停止。",
        "本站採低幅度版，非手肘完全伸直的高眼鏡蛇式。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "9bb732e97d726ebbf586791fff7cabb71715474ca3d88a9812fc883e4e023b46",
      "reviewedImageSha256": "7ad6c6956b58c675ca6ff3cb04a35fc52442c1d8a282f409f30691336afb7f55",
      "findings": [
        "骨盆腿部貼地、低幅胸抬、手輕扶與回趴可見，不是高眼鏡蛇／上犬式；15–20 秒包含本站 20 秒。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "舊影片動作不相符，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "f503642eb2b1b67d78297a2d7960297cc296ee01c600d6b32f5d3f97a3a4678e"
    }
  },
  "seated-forward-fold": {
    "revision": 4,
    "contentHash": "0e8d5283c145fedec2a6bdc6408c2cd7c56896f47c26e865db3a436e6ea68ada",
    "variation": "坐姿腿後側伸展；本項起始設定：坐在折疊毛巾上，雙腿向前並保持微彎。",
    "counting": "每組以實際維持或活動的秒數記錄，預設 30 秒；休息不計入。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0e8d5283c145fedec2a6bdc6408c2cd7c56896f47c26e865db3a436e6ea68ada",
      "internalReviewedAt": "2026-09-20",
      "findings": [
        "已核對：髖折疊、頸椎沿脊椎方向、可屈膝與墊高坐姿。",
        "不要求摸脚或加深幅度。"
      ]
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "0e8d5283c145fedec2a6bdc6408c2cd7c56896f47c26e865db3a436e6ea68ada",
      "reviewedImageSha256": "613f3177a3eacf5ef3cbda06ce57b183374f3d581b3f44661950603a8a5a9e41",
      "findings": [
        "重新檢視四格：坐穩拉長軀幹、髖部前傾、雙手輕放腿部不拉腳、緩慢回坐直；雙腿同時 30 秒、兩組一致。",
        "圖文一致性人工視覺檢查，不代表個別使用者適用或專業動作認證。"
      ]
    },
    "video": {
      "status": "pending",
      "reviewedAt": null,
      "reviewedEmbedUrl": null,
      "check": null,
      "findings": [
        "尚缺可靠對應影片，已停止播放與連結。"
      ],
      "fullPlaybackReviewed": false,
      "auditBaselineContentHash": "bd57902f7d084e8d56be75aa74246f24718daeb541a78980a4e06f3ce2a0bc5c"
    }
  },
  "thread-the-needle": {
    "revision": 4,
    "contentHash": "97443c78cf53550abb41d2bea3f66e5c608df48a500fb0a76a7828e0634c05bc",
    "variation": "穿針引線式；本項起始設定：從四足跪姿開始，一手掌心朝上滑過另一手下方。",
    "counting": "每組只保持一側 30 秒；共 2 組，左右各一組。",
    "breathing": "持續自然呼吸，不憋氣；若配合動作呼吸讓你頭暈或不舒服，先停止。",
    "stopSignals": [
      "出現疼痛、麻木、頭暈或不適時停止；持續或加重請尋求醫療專業協助。"
    ],
    "doseBasis": "本站一般健身起始參考，非引用來源的個人化處方；課表份量另行設定。",
    "text": {
      "status": "source-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "97443c78cf53550abb41d2bea3f66e5c608df48a500fb0a76a7828e0634c05bc",
      "findings": [
        "已對照動作專屬來源：四足跪姿、手臂穿過對側、肩頭隨軀幹旋轉及回程。",
        "課表份量仍按能力調整，非醫療處方。"
      ],
      "internalReviewedAt": "2026-09-20"
    },
    "image": {
      "status": "visual-checked",
      "reviewedAt": "2026-09-20",
      "reviewedContentHash": "97443c78cf53550abb41d2bea3f66e5c608df48a500fb0a76a7828e0634c05bc",
      "reviewedImageSha256": "e0bb91f5ef94c869eb7172dc5346b6c56ac2e0ec83eb5736369853f01c02c292",
      "findings": [
        "掌心朝上穿過對側手下，肩頭側輕靠墊、另一手支撐，回四足換側；每側 20–30 秒與左右各一組相容。",
        "已於文字更新後重新查看原圖，核對可見內容；非生物力學量測或專業動作認證。"
      ]
    },
    "video": {
      "status": "spot-checked",
      "reviewedAt": "2026-09-20",
      "reviewedEmbedUrl": "https://www.youtube-nocookie.com/embed/vdIugUHKGWg?start=300&end=350",
      "check": {
        "videoId": "vdIugUHKGWg",
        "seconds": [
          300,
          330,
          345
        ],
        "start": 300,
        "end": 350,
        "observation": "重新核對四足跪姿準備、單手穿過支撐手下方，肩側靠墊保持及換側；不必強壓肩膀觸地。"
      },
      "findings": [
        "重新核對四足跪姿準備、單手穿過支撐手下方，肩側靠墊保持及換側；不必強壓肩膀觸地。",
        "已實際播放並檢查所列時間點；屬片段抽查，不代表逐秒完整審片或專業認證。"
      ],
      "fullPlaybackReviewed": false,
      "reviewedContentHash": null,
      "auditBaselineContentHash": "97443c78cf53550abb41d2bea3f66e5c608df48a500fb0a76a7828e0634c05bc"
    }
  }
};
