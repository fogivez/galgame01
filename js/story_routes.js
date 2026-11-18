window.STORY_ROUTES = {
  /* ==================== ROUTE A: 九条奏线 ==================== */
  route_kanade_1: [
    {
      bg: "bg_library",
      bgm: "bgm_kanade",
      weather: "none",
      date: "12月18日 · 傍晚",
      location: "旧图书馆 · 阅览室",
      clearSprites: true,
      sfx: "door",
      t: "我一路冲下楼梯撞开旧图书馆的木门，空气里飘着旧纸张与身上雪水融化后的微凉湿气。"
    },
    {
      t: "九条奏果然坐在最里面那张长桌前。桌面中央摊开着那封已经撕裂过又被她用镇纸压住的白色确认书，钢笔就放在她的指尖旁。"
    },
    {
      sprites: { center: "kanade_glasses" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「九分四十秒。……你差二十秒就赶不上了，白石。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「学姐，别签那张纸！昨晚在部室里我不敢回答……不是因为我在逃避你，是因为我怕自己没有资格去承载你压上整个人生的赌注。」"
    },
    {
      sprites: { center: "kanade_normal" }, active: "center",
      t: "她缓缓摘下银丝眼镜，“啪”地一声合上镜腿放在桌上。没有了镜片的遮挡，她那双黑曜石般的眼眸里翻涌着几乎要将人吞没的执拗与锋芒。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「没资格？那现在呢？君安芳和橘凛音都在下面等着你去哄她们。你跑来这里，就意味着要亲手打破你维持了半年的“好人”面具了。」"
    },
    {
      sprites: { center: "kanade_sad" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「说出来吧，白石悠真——如果为了留住我，你必须背叛她们的期待、成为最自私的共犯，你还敢握住我的手吗？」"
    },
    {
      choice: [
        {
          text: "上前握住她冰凉的双手，将那张确认书彻底撕成碎片：“她们那里，由我亲自去道歉；但你这里，我绝不放手。”",
          effects: { kanade: 3 },
          flag: "kanade_tear_paper",
          goto: "route_kanade_2"
        },
        {
          text: "迟疑了半晌：“学姐，如果反抗家族会让伯母也受牵连，我不能这么自私……”",
          effects: { kanade: -2 },
          goto: "route_kanade_bitter_prep"
        }
      ]
    }
  ],

  route_kanade_2: [
    {
      bg: "bg_hallway",
      bgm: "bgm_tension",
      weather: "snow",
      date: "12月19日 · 放学后",
      location: "旧校舍一楼 · 楼梯转角",
      clearSprites: true,
      t: "第二天放学后，我先去音乐室向君安芳鞠躬坦白了全部选择。芳沉默了很久，最后只是轻声说了一句“我知道了，祝你们幸福”，便背着吉他提前离开。"
    },
    {
      t: "然而当我走到一楼楼梯转角时，一个握着两张皱巴巴门票的短发身影拦在了雪光映照的走廊中央。"
    },
    {
      sprites: { center: "rinne_cry" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「……所以，你最后还是选了九条前辈啊。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「凛音……对不起。这两张门票的钱——」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「闭嘴！！谁要你还钱啊大笨蛋！！」"
    },
    {
      t: "凛音眼眶通红，声音却像刀片一样划破冰冷的走廊。她把两张门票狠狠攥成一团，却怎么也舍不得扔掉。"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「我只是不甘心……如果五年前那场车祸没有发生、如果我家里也有体面的父母、我也像九条前辈那样漂亮又闪闪发光的话——你是不是就不会只把我当成“那个一直都在的青梅竹马”了？！」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「不是那样的！凛音你对我来说从来不是——」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「别说了！再多说一句我真的会恨你一辈子……走吧，别让九条前辈等太久。既然选了她，就给我负起责任到死啊，白石悠真！」"
    },
    {
      t: "说完这句话，凛音抹了一把脸上的泪水，转身头也不回地冲进了教学楼外的暴雪里。"
    },
    { goto: "route_kanade_3" }
  ],

  route_kanade_3: [
    {
      bg: "bg_station_night",
      bgm: "bgm_kanade",
      weather: "snow",
      date: "12月20日 · 夜",
      location: "电车站台 · 雪夜",
      clearSprites: true,
      t: "那天晚上，我在高架桥下的自动贩卖机旁找到了等在雪里的九条奏。她的黑卡果然已经被本家冻结，连公寓的备用钥匙也留在了宅邸玄关。"
    },
    {
      sprites: { center: "kanade_normal" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「……看见了。你今天下午在楼梯口和橘同学说话的样子。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「学姐……？」"
    },
    {
      sprites: { center: "kanade_sad" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「我很卑劣吧。看着你为别人露出愧疚痛苦的表情，我心里竟然有种扭曲的安心感——因为这证明你是真的为了留在我身边，亲手斩断了别的选择。」"
    },
    {
      t: "我从外套口袋里拿出买好的热玉米浓汤塞进她冰凉的手心里，然后将她轻轻拥入怀中。"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「既然已经是共犯了，这份愧疚和罪恶感，我也不会分一半给别人，我们一起背到春天吧。」"
    },
    { goto: "route_kanade_4" }
  ],

  route_kanade_4: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_climax",
      weather: "snow",
      date: "12月22日 · 冬至夜",
      location: "旧校舍 · 广播直播室",
      clearSprites: true,
      sfx: "chime",
      t: "12月22日晚六点三十分，冬至特别广播正式开始。尽管气氛再也回不到十二月初初雪那晚的毫无芥蒂，四个人还是专业而沉默地完成了最后一次合奏。"
    },
    {
      t: "芳提前交出了录好的木吉他纯伴奏带站在调音室后排，凛音抱着双臂靠在门框上守住了广播线路总闸。"
    },
    {
      sprites: { center: "kanade_glasses" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「『如果十二月的雪落得太快，掩盖了所有来不及走完的足迹——那么请记住此刻电波里的杂音，因为那是有人不惜与全世界为敌，也要为你留下的证据。』」"
    },
    {
      t: "念完最后一句原本不在台本上的即兴独白，她抬起眸子隔着玻璃窗望向站在调音台旁的我。我按下Walkman与主控台的并轨键，去年那段缺了半拍的钢琴曲终于在冬至夜完整响彻校园。"
    },
    { goto: "route_kanade_climax" }
  ],

  route_kanade_climax: [
    {
      branch: function (state) {
        if (state.affection.kanade >= 2 || state.flags.kanade_tear_paper) {
          return "route_kanade_true";
        }
        return "route_kanade_bitter";
      }
    }
  ],

  route_kanade_true: [
    {
      bg: "bg_title",
      bgm: "bgm_climax",
      weather: "snow_heavy",
      date: "12月22日 · 直播结束后的雪夜",
      location: "樱见丘学园 · 天台",
      clearSprites: true,
      cg: "cg_finale_snow",
      t: "直播结束的掌声从楼下教室一直传到三楼走廊。等校工锁好总闸、众人各自散去后，九条奏拉着我躲进了风雪漫天的顶楼天台。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「悠真……这一次，你再也没有退路了。就算以后我租住在便宜的旧公寓里、脾气变得更差、占有欲越来越强，你也绝对不能松开这只手。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「嗯。我已经把寒假的便利店夜班表填好了——刚好够请某位大小姐喝一整个冬天的黑咖啡。」"
    },
    {
      t: "远处高架桥上的电车亮着暖黄的车灯驶过雪幕，将漫天飞雪染成温柔的银白。属于两个共犯的漫长冬天，终于在彼此掌心的温度里融化了第一道冰棱。"
    },
    {
      ending: {
        id: "end_kanade_true",
        badge: "KANADE TRUE END",
        title: "永不融化的共犯",
        desc: "她卸下了九条家完美千金与高冷学姐的枷锁，而你接住了她所有的沉重与偏执。冬雪未停，属于两个共犯的漫长未来才刚刚开始。"
      }
    }
  ],

  route_kanade_bitter_prep: [
    {
      bg: "bg_library",
      bgm: "bgm_tension",
      weather: "none",
      date: "12月18日 · 夜",
      location: "旧图书馆 · 阅览室",
      t: "听到我的犹豫后，九条奏握着钢笔的手忽然彻底停住了。房间里安静得只剩下窗外雪粒敲击玻璃的细响。"
    },
    { goto: "route_kanade_bitter" }
  ],

  route_kanade_bitter: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_tension",
      weather: "snow",
      date: "12月24日 · 平安夜",
      location: "旧校舍 · 寂静的部室",
      clearSprites: true,
      t: "那晚之后，九条奏在确认书上工工整整地签下了自己的名字。她没有再发过一句脾气，甚至在冬至夜完美无瑕地念完了全部既定台本。"
    },
    {
      sprites: { center: "kanade_glasses" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「果然……这才是你最擅长的“正确选择”呢，白石君。既不得罪任何人，也不用背负毁掉别人人生的罪名。」"
    },
    {
      t: "冬至广播结束后第三天，九条奏提前办完了海外预科的退学手续，没有再回部室取走任何东西。只有桌上那罐凉透的黑咖啡旁，压着一张写着伦敦邮编的空白纸条。"
    },
    {
      ending: {
        id: "end_kanade_bitter",
        badge: "KANADE BITTERSWEET END",
        title: "镜片后的告别",
        desc: "你守住了她体面却冰冷的未来，却在那个雪夜永远失去了她唯一一次为你卸下的心防。"
      }
    }
  ],

  /* ==================== ROUTE B: 君安芳线 ==================== */
  route_kaoru_1: [
    {
      bg: "bg_rooftop_snow",
      bgm: "bgm_kaoru",
      weather: "snow",
      date: "12月18日 · 傍晚",
      location: "教学楼顶层 · 天台",
      clearSprites: true,
      sfx: "door",
      t: "我沿着音乐教室空荡荡的走廊一路找到顶楼天台。推开铁门时，君安芳正背对着门坐在积雪的长椅旁，怀里抱着木吉他，却没有拨动一根琴弦。"
    },
    {
      t: "我故意站在她左侧三步外喊了一声她的名字——她没有任何反应，只是下意识把米白色的围巾往左耳边拉了拉。直到我绕到她右手边弯下腰，她才猛地一颤。"
    },
    {
      cg: "cg_kaoru_rooftop",
      s: "君安芳", cls: "kaoru",
      t: "「悠、悠真君？！……学姐在旧图书馆等你，你跑来这里干什么呀……」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「别再把我推给别人了，芳。昨天在部室没能说出口的那句话，我现在亲口告诉你——我选的是你，不是因为同情你的耳朵，是因为从你站在窗口笑的那天起我就移不开眼了。」"
    },
    {
      t: "那一瞬间，君安芳脸上那副永远体贴开朗的防线终于彻底碎裂。她低头把额头抵在吉他琴颈上，压抑许久的眼泪一滴一滴砸在雪地里。"
    },
    {
      cg: null,
      sprites: { center: "kaoru_sad" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「骗人……我的左耳已经彻底听不清高频了，医生说右耳说不定哪天也会跟不上……这样的我，根本没有资格让你放弃九条学姐和凛音酱……」"
    },
    {
      choice: [
        {
          text: "摘下手套套在她冻僵的手上，把她的掌心按在吉他共鸣箱上：“声音消失了，还有振动和我在。”",
          effects: { kaoru: 3 },
          flag: "kaoru_resonance",
          goto: "route_kaoru_2"
        },
        {
          text: "“冬至的直播还是别上场了吧，先停下所有排练去医院住院观察才行。”",
          effects: { kaoru: -2 },
          goto: "route_kaoru_bitter"
        }
      ]
    }
  ],

  route_kaoru_2: [
    {
      bg: "bg_library",
      bgm: "bgm_tension",
      weather: "none",
      date: "12月19日 · 傍晚",
      location: "旧图书馆 · 阅览室外",
      clearSprites: true,
      t: "第二天下午，陪芳从东京女子医大附属医院复诊回来后，我独自去旧图书馆还书，却在书架尽头被一道修长的黑影拦住了去路。"
    },
    {
      sprites: { center: "kanade_glasses" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「我听说了。你陪她去了东女医大的耳科门诊，今天还特地把直播调音台改到了右边。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「学姐……」"
    },
    {
      sprites: { center: "kanade_normal" }, active: "center",
      t: "九条奏摘下银丝眼镜，嘴角挂着一抹近乎残酷的冷笑，一步步逼近到我面前半步的距离。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「回答我，白石悠真。你选择君安芳，究竟是因为爱情——还是因为你那可悲的救世主同情心？！」"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「假如明天医生告诉你她的耳朵只是暂时发炎、吃两盒药就能彻底痊愈；而我明天就要飞往伦敦再也不见——到那个时候，你敢发誓自己不会后悔今天把她留在了身边吗？！」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「……不会后悔。」"
    },
    {
      t: "我迎着九条奏几乎要刺穿人心的目光，一字一句地说道："
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「正因为她从来没想过靠眼泪博取谁的怜悯、哪怕快听不见了也还在用吉他的共鸣记住每个人的声音——我才会被那样的她吸引。哪怕明天她的耳朵奇迹般好了，我也依然会站在她的右手边。」"
    },
    {
      sprites: { center: "kanade_sad" }, active: "center",
      t: "九条奏闭了闭眼。几秒钟后，她重新戴上眼镜，侧身让开了通道。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「……真是一点也不像那个优柔寡断的你的回答呢。滚吧，冬至夜之前别再让我看见你们两个出现在我视线里。」"
    },
    { goto: "route_kaoru_3" }
  ],

  route_kaoru_3: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_kaoru",
      weather: "snow",
      date: "12月20日 · 排练夜",
      location: "旧校舍 · 广播室",
      clearSprites: true,
      t: "回到空无一人的广播室，我们重新调整了直播台位——我把自己的监听麦和节拍灯移到了她的右侧，并在她左肘边摆了一台能随着鼓点闪烁微光的旧节拍器。"
    },
    {
      sprites: { center: "kaoru_normal" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「呐，悠真君……把你的手按在吉他的低音弦旁边好不好？像这样。」"
    },
    {
      t: "她轻轻拉过我的右手，让我的指腹贴在木吉他温热的共鸣面板边缘，随即轻轻拨响了一个柔和的G大调和弦。木头传来的细微震动顺着指尖一直传到胸口。"
    },
    {
      sprites: { center: "kaoru_happy" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「以前我总觉得，听不见声音就是彻底被关进了黑屋子里。可是今天看着节拍器的灯一闪一闪，又感觉到你的掌心就在我右手边……忽然觉得，好像也没有那么可怕了。」"
    },
    { goto: "route_kaoru_4" }
  ],

  route_kaoru_4: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_climax",
      weather: "snow",
      date: "12月22日 · 冬至夜",
      location: "旧校舍 · 广播直播现场",
      clearSprites: true,
      sfx: "chime",
      t: "12月22日晚六点半，全校广播的红色指示灯亮起。九条奏一言不发地替我们拉开了推子，凛音在门口朝我们竖起一个笨拙却释然的大拇指。"
    },
    {
      t: "直播进行到后半段《冬日回响》的现场弹唱时，或许是因为冬夜气压变化，芳的耳鸣忽然毫无征兆地发作了——她脸色微白，按弦的手指顿了半拍。"
    },
    {
      t: "几乎在同一秒，我直接握住了她拨片停顿的右手腕，用指节轻轻在她膝盖侧敲出稳定的四拍节奏，同时凑近她右耳边的麦克风，和她一起唱出了第一句副歌。"
    },
    {
      sprites: { center: "kaoru_happy" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「……！」"
    },
    {
      t: "她微红着眼眶抬起头看我，随即扬起嘴角，顺着我的声线把最后一整段高潮清亮而坚定地弹唱到了尾声。"
    },
    { goto: "route_kaoru_true" }
  ],

  route_kaoru_true: [
    {
      bg: "bg_rooftop_snow",
      bgm: "bgm_climax",
      weather: "snow_heavy",
      date: "12月25日 · 圣诞节清晨",
      location: "樱见丘学园 · 天台长椅",
      clearSprites: true,
      sprites: { center: "kaoru_happy" }, active: "center",
      t: "冬至直播后的圣诞节清晨，校园里刚停过一场大雪。我们并肩坐在天台那张熟悉的混凝土长椅上，分享着同一副只戴了右侧耳塞的Walkman。"
    },
    {
      s: "君安芳", cls: "kaoru",
      t: "「悠真君，你猜那天直播话筒关掉前两秒，我右耳听见了什么？“明年冬天也一起弹吧”——全校大概只有我一个人当成告白收下了哦？」"
    },
    {
      t: "她取下右耳的耳塞，自然地把头靠在了我的肩膀上，头发上的那枚银杏发夹在冬日晨光里泛着温和的微光。"
    },
    {
      ending: {
        id: "end_kaoru_true",
        badge: "KAORU TRUE END",
        title: "致听见你的频率",
        desc: "她曾害怕自己会从别人的声音世界里悄然退场，而你站在她的右侧，用掌心的琴弦共振陪她唱完了整个冬天。"
      }
    }
  ],

  route_kaoru_bitter: [
    {
      bg: "bg_classroom_winter",
      bgm: "bgm_tension",
      weather: "snow",
      date: "12月23日 · 冬至次日",
      location: "樱见丘学园 · 2年B组",
      clearSprites: true,
      t: "听到我让她“先别管直播、好好休息”时，君安芳乖巧地点了点头，露出那副熟悉的、毫无破绽的温柔微笑。"
    },
    {
      sprites: { center: "kaoru_normal" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「嗯，悠真君说得对呢。不能因为我一个人的任性拖累整个广播企划。」"
    },
    {
      t: "冬至夜的广播改用了她提前录好的纯音乐小样。广播很成功，可圣诞节前夜她却提前办好了休学手续，搬回老家专心复健。只留下课桌抽屉里一把用擦琴布仔细包好的木吉他。"
    },
    {
      ending: {
        id: "end_kaoru_bitter",
        badge: "KAORU BITTERSWEET END",
        title: "无声的休止符",
        desc: "你以“为她好”的名义替她按下了暂停键，却没能陪她一起面对那个逐渐失去声音的冬天。"
      }
    }
  ],

  /* ==================== ROUTE C: 橘凛音线 ==================== */
  route_rinne_1: [
    {
      bg: "bg_winter_street",
      bgm: "bgm_rinne",
      weather: "snow_heavy",
      date: "12月18日 · 雪夜",
      location: "校门银杏树下 → 冬夜雪道",
      clearSprites: true,
      t: "我冲出校门时，橘凛音正独自站在光秃秃的银杏树下，厚围巾上积了一层厚厚的雪。听到身后的踏雪声，她下意识回过头，随即又故作镇定地把脸扭向一边。"
    },
    {
      sprites: { center: "rinne_tsun" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「干嘛跑这么急啊笨蛋悠真！九条前辈和君安同学不都在楼里吗，你跑出来找我干嘛……」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「因为我知道，如果我不出来叫住你，你肯定又要一个人走回那栋黑灯瞎火的老屋二楼，然后在被窝里嘴硬说“一个人也没什么大不了”吧。」"
    },
    {
      cg: "cg_rinne_snow",
      sfx: "heartbeat",
      s: "橘凛音", cls: "rinne",
      t: "「……！你、你少自作聪明了！我哪有那么脆弱……」"
    },
    {
      t: "然而她话说到一半，声音却忽然哽住了。滚烫的眼泪顺着冻红的脸颊滑下来，砸进厚毛衣的领口里。"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「呜……混蛋悠真！为什么偏偏在这个时候这么敏锐啊……我明明都已经做好心理准备了，做好准备看着你像别人一样被更优秀、更耀眼的人带走……」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「九条前辈那么聪明漂亮，君安同学那么温柔体贴……只有我，是个父母不在了、连剑道都因为手腕废掉而打不了全国大赛的笨蛋青梅竹马！我除了每天对你大呼小叫，还能用什么办法留住你啊！」"
    },
    {
      choice: [
        {
          text: "上前把浑身冰凉的她紧紧抱进怀里：“笨蛋，我这辈子哪儿也不去，就在你身边。”",
          effects: { rinne: 3 },
          flag: "rinne_hug",
          goto: "route_rinne_2"
        },
        {
          text: "拍拍她的肩膀：“别瞎想，不管什么时候我们都是最好的青梅竹马。”",
          effects: { rinne: -2 },
          goto: "route_rinne_bitter"
        }
      ]
    }
  ],

  route_rinne_2: [
    {
      bg: "bg_clubroom",
      bgm: "bgm_tension",
      weather: "snow",
      date: "12月20日 · 午后",
      location: "旧校舍 · 部室门外",
      clearSprites: true,
      t: "冬至直播前两天，我和凛音一起回部室整理最后的朗读稿。推开门时，却正好撞见正在收拾吉他谱的君安芳。"
    },
    {
      sprites: { left: "rinne_normal", right: "kaoru_normal" }, active: "right",
      s: "君安芳", cls: "kaoru",
      t: "「凛音酱，悠真君……我把中段朗读的进拍记号用荧光笔画在台本上了，这样直播的时候就算紧张也不会看漏哦。」"
    },
    {
      t: "芳脸上依旧挂着那副让人挑不出半分错处的柔和笑容。然而正是这份体贴到近乎残忍的笑意，却让向来直率的凛音忽然红了眼眶。"
    },
    {
      sprites: { left: "rinne_cry", right: "kaoru_normal" }, active: "left",
      s: "橘凛音", cls: "rinne",
      t: "「……够了啦，君安同学！！连这种时候你都要这么温柔地把位置让给我吗？！」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「你这样笑着成全我们，搞得好像我是趁着你耳朵不好、偷偷抢走悠真的小偷一样啊！！就算要讨厌我、就算像九条前辈那样直接扇我一巴掌也好啊……！」"
    },
    {
      sprites: { left: "rinne_cry", right: "kaoru_sad" }, active: "right",
      t: "空气安静了两秒。君安芳微微低下头，指尖轻轻摩挲了一下发梢上的银杏发夹，声音终于不再那么轻松："
    },
    {
      s: "君安芳", cls: "kaoru",
      t: "「怎么会呢……凛音酱才不是小偷。从一开始，那个十年来一直站在他身边的位子就是你的啊。我只是……贪心地多坐了一会儿而已。」"
    },
    {
      t: "凛音吸了吸鼻子，接过台本紧紧抱在胸前，重重地鞠了一躬。"
    },
    { goto: "route_rinne_3" }
  ],

  route_rinne_3: [
    {
      bg: "bg_room_rinne",
      bgm: "bgm_rinne",
      weather: "snow",
      date: "12月21日 · 夜",
      location: "商店街 · 橘家老和果子屋二楼",
      clearSprites: true,
      t: "那天晚上我一路把凛音送回老屋二楼，帮她煮了两大碗加了年糕的味增乌冬面。"
    },
    {
      sprites: { center: "rinne_normal" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「……咳。话说在前头啊，这几天哭鼻子的丢脸样子，你要是敢跟相泽那家伙透半个字，我就真的拿竹刀劈了你！」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「好好好，保证守口如瓶。不过冬至夜那封“未寄出的回响”，你最后决定写给谁了？」"
    },
    {
      sprites: { center: "rinne_tsun" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「写给五年前没来得及说再见的人……还有某个直到高二冬天才开窍的大木头咯！」"
    },
    { goto: "route_rinne_4" }
  ],

  route_rinne_4: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_climax",
      weather: "snow",
      date: "12月22日 · 冬至夜",
      location: "旧校舍 · 广播直播室",
      clearSprites: true,
      sfx: "chime",
      t: "12月22日晚六点三十分，冬至特别广播正式开播。轮到中段压轴朗读时，橘凛音站在电容麦克风前深吸了一口气。"
    },
    {
      sprites: { center: "rinne_cry" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「『致五年前没能等到的那趟车——我现在很好，叔叔婶婶很照顾我，手腕也在慢慢恢复。而且……那个从小总是跟在我后面挨揍的笨蛋，现在变成了即使下着大雪也会站在我前面挡风的人。』」"
    },
    {
      t: "念到最后一句时，她的声音带上了轻微的哽咽，却比任何华丽的辞藻都更有力量。广播室里的芳悄悄擦了擦眼角，连一向严厉的九条奏也轻声说了一句“……念得很好，橘同学”。"
    },
    { goto: "route_rinne_true" }
  ],

  route_rinne_true: [
    {
      bg: "bg_shopping_street",
      bgm: "bgm_climax",
      weather: "snow",
      date: "12月24日 · 平安夜",
      location: "商店街 · 老和果子屋前",
      clearSprites: true,
      sprites: { center: "rinne_normal" }, active: "center",
      t: "冬至广播大获成功后的平安夜。刚过晚上七点，商店街尽头那栋老木屋二楼的窗户已经提前亮起了暖黄的灯光——那是我和凛音周末一起爬梯子换上的新灯罩。"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「喂，白石大代理部长！超市限定的红豆热可可都要凉了，你还要在楼下傻笑到什么时候？」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「来了来了。不过说好了，今晚不许再拿剑道竹刀敲我头。」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「那要看你的表现咯——快点上来啦，笨蛋！」"
    },
    {
      ending: {
        id: "end_rinne_true",
        badge: "RINNE TRUE END",
        title: "直到灯火亮起",
        desc: "十年青梅竹马的傲娇外壳终于在雪夜里融化。从此以后，那条归途上再也不会只有孤零零的一串脚印。"
      }
    }
  ],

  route_rinne_bitter: [
    {
      bg: "bg_classroom_winter",
      bgm: "bgm_tension",
      weather: "snow",
      date: "1月10日 · 第三学期",
      location: "樱见丘学园 · 走廊",
      clearSprites: true,
      t: "听到“最好的青梅竹马”这句话时，橘凛音低下头狠狠吸了吸鼻子，随后又露出了比平时更张扬的假笑。"
    },
    {
      sprites: { center: "rinne_tsun" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「哈，那当然咯！谁稀罕和你这种木头谈恋爱啊，笨蛋！」"
    },
    {
      t: "冬至结束后，凛音以手腕恢复训练为由重新回到了剑道部，只是再也没有在雪夜里等过我一起走商店街的归途。"
    },
    {
      ending: {
        id: "end_rinne_bitter",
        badge: "RINNE BITTERSWEET END",
        title: "永远的青梅竹马",
        desc: "你们退回到了最安全的距离。她保住了骄傲，你保住了日常，唯独错过了跨出那半步的机会。"
      }
    }
  ],

  /* ==================== NORMAL END ==================== */
  route_normal_1: [
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_tension",
      weather: "snow",
      date: "12月22日 · 冬至夜",
      location: "旧校舍 · 广播同好会室",
      clearSprites: true,
      t: "最后的四天里，我把所有精力都倾注在了协调台本与设备线路上，用礼貌而克制的忙碌回避了所有一对一的追问。"
    },
    {
      t: "冬至夜的特别广播取得了意料之外的圆满成功。教导处的藤堂老师笑着撤回了废部通告，学生会也破例批准了下学期的预算。"
    },
    { goto: "route_normal_end" }
  ],

  route_normal_end: [
    {
      bg: "bg_clubroom",
      bgm: "bgm_title",
      weather: "snow",
      date: "1月10日 · 第三学期开学",
      location: "旧校舍 · 空荡的同好会室",
      clearSprites: true,
      t: "可是——当新年的雪渐渐停歇、第三学期开始时，原本挤满四个人的那张长桌旁却变得异常空旷。"
    },
    {
      t: "九条学姐如期接受了家族安排、在毕业前夕提前飞往伦敦；君安芳为了专心接受耳科康复治疗办了转学手续；而凛音也重新回到剑道部的高强度集训里，彼此擦肩而过时只剩下一句礼貌的“早安”。"
    },
    {
      t: "我独自坐在窗边，再次按下旧Walkman的播放键。磁带缓缓转动，沙沙的底噪里只剩下去年冬天没能说出口的那句残响。"
    },
    {
      ending: {
        id: "end_normal",
        badge: "NORMAL END",
        title: "冬日未寄出的信",
        desc: "你保护了所有人的体面，唯独错过了握住任何一只手的时机。漫长的冬天结束了，故事却留在了原地。"
      }
    }
  ]
};
