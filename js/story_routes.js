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
      t: "「九分四十秒。……差一点，我就以为你不会推开这扇门了，白石。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「学姐，别签那张纸。昨晚在部室里我没能开口……不是因为想逃，是因为我终于明白，如果连自己都不肯承受得罪任何人的代价，我就没有资格接住你退掉机票的那份决绝。」"
    },
    {
      sprites: { center: "kanade_side" }, active: "center",
      t: "她缓缓摘下银丝眼镜，“啪”地一声合上镜腿放在确认书上。没有了镜片的隔阂，那双深黑色的眼眸安静地望过来，里面不再是高不可攀的锋芒，而是几乎要将人拽进深冬的沉重。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「现在想通了？楼下还有两个在等你给出交代的人。你站到这里，就意味着从今晚起，你再也不能当那个让所有人都觉得体贴的“好人”了。」"
    },
    {
      sprites: { center: "kanade_sad" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「回答我，白石悠真——哪怕要亲手辜负她们，哪怕以后要和我一起背着这份愧疚走下去，你还是愿意把手伸过来吗？」"
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
      t: "说完这句话，凛音抹了一把脸上的泪水，转身头也不回地冲进了教学楼外的暴雪里。两张折得起毛的室内乐门票滑落在楼梯拐角。"
    },
    {
      choice: [
        {
          text: "站在原地没有去追，目送她的背影彻底消失在暴雪夜色里",
          effects: { kanade: 2 },
          flag: "kanade_route_resolve",
          goto: "route_kanade_3"
        },
        {
          text: "下意识追下两级台阶弯腰捡起门票：“凛音——至少先把票拿回去吧……”",
          effects: { kanade: -2, hesitation: 1 },
          flag: "kanade_route_wavered",
          goto: "route_kanade_3"
        }
      ]
    }
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
        if (state.flags.kanade_tear_paper && state.flags.kanade_route_resolve && state.affection.kanade >= 5) {
          return "route_kanade_true";
        }
        if (state.flags.kanade_tear_paper || state.affection.kanade >= 3) {
          return "route_kanade_normal";
        }
        return "route_kanade_bitter";
      }
    }
  ],

  route_kanade_normal: [
    {
      bg: "bg_station_night",
      bgm: "bgm_kanade",
      weather: "snow",
      date: "12月23日 · 清晨",
      location: "樱见丘电车站 · 机场快线站台",
      clearSprites: true,
      sprites: { center: "kanade_side" }, active: "center",
      t: "冬至广播结束后的第二天清晨。我在高架站台的检票口外拦住了拖着深色登机箱的九条奏。她重新戴上了那副银丝眼镜，大衣扣子一丝不苟地系到最上方一颗。"
    },
    {
      s: "九条奏", cls: "kanade",
      t: "「……昨晚播完那段录音以后，我已经很知足了，白石。只是那天在楼梯转角，你还是忍不住想去捡那张掉下来的门票吧？」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「学姐，那只是……」"
    },
    {
      sprites: { center: "kanade_smile" }, active: "center",
      s: "九条奏", cls: "kanade",
      t: "「嘘。不用再勉强自己挑什么好听的话说了。」"
    },
    {
      t: "她从大衣口袋里摸出一盘标签工整的新磁带塞进我掌心——那是我随身听里去年空着的那半段，已经由她自己在冬至夜后独自录完了收尾和弦。"
    },
    {
      t: "机场快线的车灯穿透风雪缓缓驶进站台。车门合上的一刻，她站在玻璃窗后轻轻朝我颔首，这一次没有回头。"
    },
    {
      ending: {
        id: "end_kanade_normal",
        badge: "KANADE NORMAL END",
        title: "单程航班的未完乐章",
        desc: "你们一同弹完了冬至夜的最后一段录音，却终究没能彻底跨过心底那半步迟疑。她收起所有的锋芒与执拗独自飞往伦敦，只把那盘完整却无人的磁带留在了你的冬天。"
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
      sprites: { center: "kaoru_guitar" }, active: "center",
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
    {
      choice: [
        {
          text: "“趁今晚还没睡，我把右声道标注好的完整谱面发给奏和凛音，明天让所有人知道你在用什么办法合奏！”",
          effects: { kaoru: 2 },
          flag: "kaoru_open_truth",
          goto: "route_kaoru_4"
        },
        {
          text: "“只要你点头，后面的主控台交给我，我们俩就像这样安静把直播撑过去就好。”",
          effects: { kaoru: 1, hesitation: 1 },
          goto: "route_kaoru_4"
        }
      ]
    }
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
      sprites: { center: "kaoru_ear" }, active: "center",
      s: "君安芳", cls: "kaoru",
      t: "「……！」"
    },
    {
      t: "她微红着眼眶抬起头看我，随即扬起嘴角，顺着我的声线把最后一整段高潮清亮而坚定地弹唱到了尾声。"
    },
    {
      branch: function (state) {
        if ((state.flags.kaoru_open_truth || state.affection.kaoru >= 5) && state.flags.kaoru_resonance) {
          return "route_kaoru_true";
        }
        return "route_kaoru_bitter";
      }
    }
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
      sprites: { center: "rinne_shy" }, active: "center",
      s: "橘凛音", cls: "rinne",
      t: "「……跑这么急干什么，鞋带都散了。楼里还有人在等你吧，出来找我算怎么回事。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「因为我知道，如果今晚我不追出来叫住你，你明天早上还是会像什么都没发生过一样，站在路口问我为什么还没出门。」"
    },
    {
      cg: "cg_rinne_snow",
      sfx: "heartbeat",
      s: "橘凛音", cls: "rinne",
      t: "「……少自作聪明了。你以为你很了解我吗？」"
    },
    {
      t: "话说到一半，她的声音却骤然低了下去。滚烫的眼泪顺着冻得发红的眼尾滑落，无声地融进深灰色的毛衣领口。"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「为什么偏偏到了这种时候才突然变得这么敏锐啊……我明明都已经想好了，只要装作不在意，就能看着你去选那个更耀眼、或者更需要你照顾的人。」"
    },
    {
      s: "橘凛音", cls: "rinne",
      t: "「九条前辈有和你一起录完的磁带，君安同学有只告诉过你的秘密……而我呢？剑道部停训以后，我连能拿得出手的东西都没有了。我每天只知道冲你发脾气、顺路帮你带早饭，除了这些，我根本不知道还能用什么把你留在身边。」"
    },
    {
      choice: [
        {
          text: "上前把浑身发冷的她拥进怀里：“不用再替我数着哪天会走了。这个冬天，还有以后的每一个冬天，我都在你这边。”",
          effects: { rinne: 3 },
          flag: "rinne_hug",
          goto: "route_rinne_2"
        },
        {
          text: "抬手替她拂去肩上的雪：“别胡思乱想了，不管以后怎样，我们永远是最好的朋友。”",
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
      t: "话音未落，橘凛音咬着下唇突然往后退了半步，似乎想要把怀里的台本硬塞回给芳、自己先一步逃出这间让人喘不过气的部室——"
    },
    {
      choice: [
        {
          text: "上前一把攥住凛音的手腕：“别推给任何人，十年来一直站在那个位子的人就是你。”",
          effects: { rinne: 2 },
          flag: "rinne_firm_answer",
          goto: "route_rinne_3"
        },
        {
          text: "看着门内脸色苍白的芳，犹豫着松开手指，轻声说：“今天大家都太累了，先各自冷静两天吧……”",
          effects: { rinne: -2, hesitation: 2 },
          goto: "route_rinne_bitter"
        }
      ]
    }
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
  ],

  /* ==================== TRIANGLE CRISIS END (WA2多线崩塌) ==================== */
  route_triangle_crisis: [
    {
      bg: "bg_hallway_night",
      bgm: "bgm_tension",
      weather: "snow_heavy",
      date: "12月18日 · 夜（崩塌之后）",
      location: "旧校舍 → 樱见丘街角",
      clearSprites: true,
      sfx: "door",
      t: "我一路气喘吁吁地赶到旧图书馆三楼时，长桌上只留下一只已经冷透的空咖啡罐；折返音乐室推开门，吉他架空荡荡地立在暮色里；等跑出校门，银杏树下的雪地也只剩半行很快被新雪抹平的脚印。"
    },
    {
      t: "因为之前每一次试图向谁靠近时，总还要分出三分心思替另外两个人遮风挡雨；到头来，哪怕在最后一秒急着给出承诺，也已经没有人敢再把后背交到我手里。"
    },
    {
      bg: "bg_clubroom_night",
      bgm: "bgm_tension",
      weather: "snow_heavy",
      date: "12月22日 · 冬至夜六点半",
      location: "旧校舍 · 熄灯的广播室",
      clearSprites: true,
      t: "冬至的钟声敲响六下半时，风雪拍打着旧校舍三楼的窗玻璃。老式调音台的红色电源灯静静亮着，可木桌四周的三把椅子全都空着。"
    },
    {
      sprites: { left: "yuma_normal", right: "shota_normal" }, active: "right",
      s: "相泽翔太", cls: "npc",
      t: "「……别等了，悠真。教导处的藤堂老师刚才打电话去楼下广播室问了，九条前辈把剪好的纯背景配乐磁带托门口保安大叔送来了。」"
    },
    {
      s: "白石悠真", cls: "yuma",
      t: "「那芳和凛音呢……」"
    },
    {
      sprites: { left: "yuma_normal", right: "shota_normal" }, active: "right",
      s: "相泽翔太", cls: "npc",
      t: "「君安同学提前一天转去专科住院观察了；凛音下午给社团钥匙柜塞了一张请假条，说家里有事。谁都没闹，也没人怪你——但有些东西一旦在半途耗光了信任，就算把直播放完，也接不回原来的音轨了。」"
    },
    {
      clearSprites: true,
      t: "广播线路如期在六点三十五分切入了那段没有旁白、也没有木吉他合奏的孤独钢琴录音。空无一人的教室里，风雪声穿过门缝，长长久久地回荡着。"
    },
    {
      ending: {
        id: "end_triangle_collapse",
        badge: "CRISIS END",
        title: "雪夜熄灯的广播室",
        desc: "你一直试图在不伤害任何人的前提下留下所有人，却在接二连三的动摇与隐瞒里耗尽了最后的信任。冬至的广播如期响起，却再也没有人站在麦克风前等你。"
      }
    }
  ]
};
