/* ==========================================================================
   砚台 · 历年真题库
   题目信息整理自《考研英语作文真题题目汇总》（2001–2026）。
   图表数据为原图关键数据；早期图表未逐项录入的，可在工作台自行补充。
   ========================================================================== */
(function () {
  "use strict";
  window.KY = window.KY || {};

  const big = [
    /* ---------------- 英语一 · 图画 ---------------- */
    {
      id: "b-2001-1", year: 2001, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "爱心献社会", topicEn: "love and mutual help",
      prompt: "图画作文：一盏小油灯在黑暗中发光，图下写着“爱心是一盏灯，越黑暗的地方越明亮”。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "love and mutual help", themeCn: "爱心与互助",
        subject: "the public", subjectCn: "公众", benefit: "social harmony", benefitCn: "社会和谐",
        pictureType: "picture", scene: "in front of us stays an oil lamp, lovely as well as cute, lighting up the darkness",
        sceneCn: "我们面前有一盏可爱的小油灯，正照亮黑暗", idea: "love is a lamp that shines brightest in the darkest places",
        ideaCn: "爱心是一盏灯，在越黑暗的地方越明亮", agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2002-1", year: 2002, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "文化交流", topicEn: "cultural exchange",
      prompt: "图画作文：一位身穿中国传统服饰的美国女孩，笑容灿烂，展现跨文化交流。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "cultural exchange", themeCn: "文化交流",
        subject: "young people", subjectCn: "年轻人", benefit: "mutual understanding", benefitCn: "相互理解",
        pictureType: "picture", scene: "in front of us stands an American girl, graceful as well as elegant, wearing traditional Chinese costume with a sweet smile on her face",
        sceneCn: "我们面前站着一位美国女孩，优雅大方，身穿中国传统服饰，脸上带着甜美的微笑",
        idea: "cultural exchange is the bridge between different nations", ideaCn: "文化交流是不同国家之间的桥梁",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2003-1", year: 2003, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "温室花朵经不起风雨", topicEn: "independence and resilience",
      prompt: "图画作文：温室里的花朵娇艳欲滴，一旦搬到室外便凋零；寓意过度保护让孩子经不起风雨。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "independence and resilience", themeCn: "独立与韧性",
        subject: "children", subjectCn: "孩子", benefit: "personal growth", benefitCn: "个人成长",
        pictureType: "picture", scene: "in the middle of the picture stands a flower in a greenhouse, lovely as well as delicate, unable to survive the storm outside",
        sceneCn: "图画中央是一朵温室里的花，娇嫩可爱，却经不起外面的风雨",
        idea: "overprotection makes children unable to face setbacks", ideaCn: "过度保护会让孩子无法面对挫折",
        agent: "parents and schools", agentCn: "家长和学校"
      },
      fills: {}
    },
    {
      id: "b-2004-1", year: 2004, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "终点又是新起点", topicEn: "perseverance and new beginnings",
      prompt: "图画作文：一名运动员冲过终点线，脸上带着微笑；终点又是新的起点。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "perseverance and new beginnings", themeCn: "坚持与新的起点",
        subject: "young people", subjectCn: "年轻人", benefit: "self-improvement", benefitCn: "自我提升",
        pictureType: "picture", scene: "on the playground runs a young man, active as well as vigorous, rushing to the finishing line with a sweet smile on his face",
        sceneCn: "操场上一位年轻人充满活力地冲向终点线，脸上带着微笑",
        idea: "the finishing line is also a new starting point", ideaCn: "终点也是新的起点",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2005-1", year: 2005, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "养老足球赛", topicEn: "filial piety",
      prompt: "图画作文：四位老人被子女像足球一样踢来踢去，寓意赡养老人责任缺失。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "filial piety", themeCn: "孝道",
        subject: "the elderly", subjectCn: "老年人", benefit: "family bonding", benefitCn: "家庭纽带",
        pictureType: "picture", scene: "in front of us stand four elderly people, helpless as well as sad, being pushed away like a football by their children",
        sceneCn: "我们面前站着四位老人，无助而悲伤，被子女像足球一样推来推去",
        idea: "supporting the elderly is an unshakable duty of every family", ideaCn: "赡养老人是每个家庭不可推卸的责任",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2006-1", year: 2006, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "偶像崇拜", topicEn: "idol worship",
      prompt: "图画作文：年轻人把偶像海报贴在墙上，盲目模仿；寓意理性看待偶像崇拜。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "idol worship", themeCn: "偶像崇拜",
        subject: "young people", subjectCn: "年轻人", benefit: "personal growth", benefitCn: "个人成长",
        pictureType: "picture", scene: "in front of us stands a young man, passionate as well as aggressive, staring at a poster of his idol with curiosity in his eyes",
        sceneCn: "我们面前站着一位年轻人，热情而冲动，正好奇地盯着偶像海报",
        idea: "young people should view idols rationally", ideaCn: "年轻人应当理性看待偶像",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2007-1", year: 2007, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "自信", topicEn: "self-confidence",
      prompt: "图画作文：一名球员面对球门，把自己看得很小、把球门看得很大；寓意自信的重要性。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "self-confidence", themeCn: "自信",
        subject: "young people", subjectCn: "年轻人", benefit: "personal growth", benefitCn: "个人成长",
        pictureType: "picture", scene: "on the playground stands a football player, confident as well as optimistic, facing the goal with determination in his eyes",
        sceneCn: "操场上站着一名足球运动员，自信乐观，眼神坚定地面对球门",
        idea: "self-confidence is the first step towards success", ideaCn: "自信是迈向成功的第一步",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2008-1", year: 2008, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "合作", topicEn: "cooperation",
      prompt: "图画作文：两个残疾人把腿绑在一起，互相支撑着往前走；寓意合作共赢。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "cooperation", themeCn: "合作",
        subject: "young people", subjectCn: "年轻人", benefit: "mutual success", benefitCn: "共同成功",
        pictureType: "picture", scene: "in front of us stand two disabled men, determined as well as optimistic, walking forward with their legs tied together",
        sceneCn: "我们面前站着两个残疾人，坚定乐观，把腿绑在一起互相支撑着前行",
        idea: "cooperation enables us to go further", ideaCn: "合作让我们走得更远",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2009-1", year: 2009, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "网络的近与远", topicEn: "the Internet",
      prompt: "图画作文：互联网把远方的人连在一起，却让身边的人彼此疏远；辩证看待网络。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "the Internet", themeCn: "互联网",
        subject: "young people", subjectCn: "年轻人", benefit: "effective communication", benefitCn: "有效沟通",
        pictureType: "picture", scene: "in the middle of the picture sits a young man, absorbed as well as lonely, staring at a computer screen while his family sits nearby",
        sceneCn: "图画中央坐着一位年轻人，专注却孤独，盯着电脑屏幕，而家人就坐在旁边",
        idea: "the Internet brings people closer but may also distance us from those around us", ideaCn: "网络拉近了远方，却可能疏远了身边",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2010-1", year: 2010, exam: "英一", type: "picture", typeName: "图画 · 文化火锅",
      topic: "文化火锅", topicEn: "cultural integration",
      prompt: "图画作文：一只火锅里煮着京剧、功夫、莎士比亚等中外文化元素，图下写着“文化火锅，既美味又营养”。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "cultural integration", themeCn: "文化融合",
        subject: "the public", subjectCn: "公众", benefit: "cultural diversity", benefitCn: "文化多样性",
        pictureType: "picture", scene: "in the middle of the picture is a hotpot, delicious as well as nutritious, containing cultural elements such as Peking Opera, Kung fu and Shakespeare",
        sceneCn: "图画中央是一只美味又营养的火锅，里面煮着京剧、功夫、莎士比亚等文化元素",
        idea: "cultural integration enriches our spiritual life", ideaCn: "文化融合丰富了我们的精神生活",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2011-1", year: 2011, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "旅程之余", topicEn: "environmental protection",
      prompt: "图画作文：游客在景区游玩后留下满地垃圾，寓意旅游与环境保保护。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "environmental protection", themeCn: "环境保护",
        subject: "tourists", subjectCn: "游客", benefit: "sustainable development", benefitCn: "可持续发展",
        pictureType: "picture", scene: "on the boat sit two tourists, relaxed as well as careless, throwing rubbish into the river without hesitation",
        sceneCn: "船上坐着两名游客，轻松却随意，毫不犹豫地把垃圾扔进河里",
        idea: "environmental protection should go hand in hand with tourism", ideaCn: "旅游与环境保护应当同行",
        agent: "the government and the public", agentCn: "政府和公众"
      },
      fills: {}
    },
    {
      id: "b-2012-1", year: 2012, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "乐观", topicEn: "optimism",
      prompt: "图画作文：瓶子倒了，一个人说“完了，全完了”，另一个人说“还好，还有一半”；寓意乐观心态。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "optimism", themeCn: "乐观",
        subject: "young people", subjectCn: "年轻人", benefit: "psychological resilience", benefitCn: "心理素质",
        pictureType: "picture", scene: "in front of us stand two men, one pessimistic as well as frustrated, the other confident as well as optimistic, looking at the same fallen bottle",
        sceneCn: "我们面前站着两个人，一个悲观沮丧，一个自信乐观，看着同一个倒下的瓶子",
        idea: "a positive mindset makes all the difference", ideaCn: "积极心态决定不同的结果",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2013-1", year: 2013, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "选择", topicEn: "choice",
      prompt: "图画作文：毕业生站在人生十字路口，面对就业、考研、创业等选择。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "choice", themeCn: "选择",
        subject: "graduates", subjectCn: "毕业生", benefit: "personal development", benefitCn: "个人发展",
        pictureType: "picture", scene: "at the crossroads stand a group of graduates, confused as well as hesitant, looking at different roads ahead",
        sceneCn: "毕业生们站在十字路口，困惑而犹豫，望着前方不同的道路",
        idea: "the power of choice shapes our future", ideaCn: "选择的力量塑造我们的未来",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2014-1", year: 2014, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "相携", topicEn: "filial piety and companionship",
      prompt: "图画作文：年轻夫妇搀扶着年迈父母，寓意孝道与陪伴。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "filial piety and companionship", themeCn: "孝道与陪伴",
        subject: "the elderly", subjectCn: "老年人", benefit: "family bonding", benefitCn: "家庭纽带",
        pictureType: "picture", scene: "in front of us walks a young couple, amiable as well as friendly, supporting their elderly parents with care",
        sceneCn: "我们面前走着一对年轻夫妇，亲切友善，小心翼翼地搀扶着年迈的父母",
        idea: "companionship is the best form of filial piety", ideaCn: "陪伴是最好的孝道",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2015-1", year: 2015, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "手机时代的聚会", topicEn: "phone addiction",
      prompt: "图画作文：一群人围坐餐桌，却各自低头看手机；寓意拒绝沉溺手机、珍惜面对面交流。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "phone addiction", themeCn: "手机成瘾",
        subject: "young people", subjectCn: "年轻人", benefit: "effective communication", benefitCn: "有效沟通",
        pictureType: "picture", scene: "around the table sit a group of young people, silent as well as indifferent, staring at their phones instead of talking to each other",
        sceneCn: "一群年轻人围坐餐桌，沉默而冷漠，盯着手机而不是彼此交谈",
        idea: "we should put down our phones and cherish face-to-face communication", ideaCn: "我们应放下手机，珍惜面对面的交流",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2016-1", year: 2016, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "榜样", topicEn: "setting a good example",
      prompt: "图画作文：父亲一边要求孩子读书，一边自己玩手机；寓意言传不如身教。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "setting a good example", themeCn: "树立榜样",
        subject: "parents", subjectCn: "父母", benefit: "children's growth", benefitCn: "孩子成长",
        pictureType: "picture", scene: "in front of us sits a father, lazy as well as careless, playing with his phone while asking his son to study hard",
        sceneCn: "我们面前坐着一位父亲，懒散而随意，一边玩手机一边要求儿子好好学习",
        idea: "actions speak louder than words in family education", ideaCn: "家庭教育中身教重于言传",
        agent: "parents and teachers", agentCn: "家长和老师"
      },
      fills: {}
    },
    {
      id: "b-2017-1", year: 2017, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "读书", topicEn: "reading",
      prompt: "图画作文：一个人坐在书堆中读书，标题“读书”；寓意读书与行动。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "reading", themeCn: "读书",
        subject: "young people", subjectCn: "年轻人", benefit: "personal growth", benefitCn: "个人成长",
        pictureType: "picture", scene: "in the middle of the picture sits a young man, focused as well as peaceful, reading a book carefully",
        sceneCn: "图画中央坐着一位年轻人，专注而平静，认真地读着一本书",
        idea: "reading opens the door to a broader world", ideaCn: "读书打开通往更广阔世界的大门",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2018-1", year: 2018, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "选课", topicEn: "challenging courses",
      prompt: "图画作文：学生选课，面对“易得高分”与“有难度但能学到东西”的课程作出选择。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "taking challenging courses", themeCn: "选择有难度的课程",
        subject: "undergraduates", subjectCn: "大学生", benefit: "critical thinking", benefitCn: "批判性思维",
        pictureType: "picture", scene: "in front of us stands a student, hesitant as well as thoughtful, choosing between an easy course and a challenging one",
        sceneCn: "我们面前站着一名学生，犹豫而深思，在简单课程和有难度的课程之间选择",
        idea: "challenging courses develop critical thinking and expand our horizons", ideaCn: "有难度的课程能培养批判性思维、开拓眼界",
        agent: "undergraduates", agentCn: "大学生"
      },
      fills: {}
    },
    {
      id: "b-2019-1", year: 2019, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "坚持", topicEn: "perseverance",
      prompt: "图画作文：两个人爬山，一人在半山腰坐下，另一人继续攀登；寓意坚持。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "perseverance", themeCn: "坚持",
        subject: "young people", subjectCn: "年轻人", benefit: "self-realization", benefitCn: "自我实现",
        pictureType: "picture", scene: "on the mountain stands a young man, tired as well as determined, climbing towards the top with determination in his eyes",
        sceneCn: "山上站着一位年轻人，疲惫却坚定，眼神坚毅地向山顶攀登",
        idea: "perseverance is the key to reaching the summit", ideaCn: "坚持是到达顶峰的关键",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2020-1", year: 2020, exam: "英一", type: "picture", typeName: "图画 · 非对话",
      topic: "习惯", topicEn: "good habits",
      prompt: "图画作文：两个人在同一张书桌前，一个说“今天必须完成”，一个说“明天再做”；寓意习惯。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "good habits", themeCn: "良好习惯",
        subject: "young people", subjectCn: "年轻人", benefit: "personal growth", benefitCn: "个人成长",
        pictureType: "picture", scene: "in front of us sit two students, one diligent as well as purposeful, the other lazy as well as passive, facing the same desk",
        sceneCn: "我们面前坐着两个学生，一个勤奋而有目标，一个懒惰而被动，面对同一张书桌",
        idea: "good habits determine the height of our life", ideaCn: "好习惯决定人生的高度",
        agent: "young people", agentCn: "年轻人"
      },
      fills: {}
    },
    {
      id: "b-2021-1", year: 2021, exam: "英一", type: "picture", typeName: "图画 · 对话",
      topic: "文化传承", topicEn: "cultural inheritance",
      prompt: "图画作文：父亲和孩子看戏，孩子说“没意思”，父亲说“这是我们的传统文化”；寓意文化传承。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "cultural inheritance", themeCn: "文化传承",
        subject: "young people", subjectCn: "年轻人", benefit: "cultural confidence", benefitCn: "文化自信",
        pictureType: "picture", scene: "in front of us stand a father and his son, talking about a traditional opera performance",
        sceneCn: "我们面前站着一位父亲和他的儿子，正在谈论一场传统戏曲表演",
        idea: "traditional culture should be inherited and carried forward by the younger generation", ideaCn: "传统文化应当由年轻一代继承和发扬",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {
        speakerA: "the son", speakerACn: "儿子", viewA: "the opera is boring and irrelevant to modern life", viewACn: "戏曲很无聊，与现代生活无关",
        speakerB: "the father", speakerBCn: "父亲", viewB: "traditional culture is our root and should be treasured", viewBCn: "传统文化是我们的根，应当珍惜"
      }
    },
    {
      id: "b-2022-1", year: 2022, exam: "英一", type: "picture", typeName: "图画 · 对话",
      topic: "听讲座", topicEn: "campus lectures",
      prompt: "图画作文：两名女生在公告栏前讨论讲座，一个说“与专业无关，浪费时间”，另一个说“听了总会有收获”。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "attending campus lectures", themeCn: "听讲座",
        subject: "undergraduates", subjectCn: "大学生", benefit: "broader horizons", benefitCn: "更广阔的视野",
        pictureType: "picture", scene: "in front of the board stand two girls, talking about campus lectures",
        sceneCn: "公告栏前站着两个女孩，正在谈论校园讲座",
        idea: "we should be open-minded and learn from lectures beyond our major", ideaCn: "我们应保持开放心态，从专业之外的讲座中学习",
        agent: "undergraduates", agentCn: "大学生"
      },
      fills: {
        speakerA: "the girl on the left", speakerACn: "左边的女孩", viewA: "the lecture is irrelevant to her major and a waste of time", viewACn: "讲座与她的专业无关，是浪费时间",
        speakerB: "the girl on the right", speakerBCn: "右边的女孩", viewB: "attending such lectures is highly beneficial nonetheless", viewBCn: "参加这类讲座仍然大有裨益"
      }
    },
    {
      id: "b-2023-1", year: 2023, exam: "英一", type: "picture", typeName: "图画 · 综合",
      topic: "龙舟", topicEn: "traditional culture",
      prompt: "图画作文：人们划龙舟、岸边群众观看，老人说“传统文化越来越受欢迎”。",
      points: ["描述图画", "解释寓意", "给出评论"],
      setup: {
        scenario: "picture", theme: "traditional culture", themeCn: "传统文化",
        subject: "the public", subjectCn: "公众", benefit: "cultural confidence", benefitCn: "文化自信",
        pictureType: "picture", scene: "on the river runs a dragon boat, lively as well as energetic, with a crowd cheering on the bank",
        sceneCn: "河面上龙舟竞渡，热闹而充满活力，岸上人群欢呼",
        idea: "traditional culture is gaining growing popularity among the public", ideaCn: "传统文化正越来越受公众欢迎",
        agent: "the whole society", agentCn: "全社会"
      },
      fills: {}
    },
    {
      id: "b-2024-1", year: 2024, exam: "英一", type: "picture-chart", typeName: "图画 + 柱状图",
      topic: "公园建设", topicEn: "public facilities",
      prompt: "图画 + 图表：左图居民在新建公园锻炼，孩子说“家门口新建的小公园，真不错”；右图某市近三年公园数量 406 → 532 → 670。",
      points: ["描述图画和图表", "解释寓意", "给出评论"],
      data: "公园数量：2020 年 406 座；2021 年 532 座；2022 年 670 座",
      setup: {
        scenario: "picture-chart", theme: "the construction of public facilities", themeCn: "公共设施建设",
        subject: "urban residents", subjectCn: "城市居民", benefit: "healthy lifestyle", benefitCn: "健康生活方式",
        pictureType: "picture", year1: "2020", year2: "2022",
        scene: "several urban residents are exercising in a park and a youngster says that the new park is fantastic",
        sceneCn: "几位城市居民正在公园锻炼，一个孩子说新建的公园真不错",
        idea: "public facilities have greatly improved residents' quality of life", ideaCn: "公共设施极大提升了居民的生活质量",
        agent: "the government", agentCn: "政府"
      },
      fills: {
        chartSummary: "the number of parks in a certain city increased remarkably from 406 in 2020 to 670 in 2022",
        chartSummaryCn: "某市公园数量从 2020 年的 406 座显著增加到 2022 年的 670 座",
        leftDetail: "the number of parks rose from 406 in 2020 to 532 in 2021 and then to 670 in 2022",
        leftDetailCn: "公园数量从 2020 年的 406 座增至 2021 年的 532 座，2022 年又增至 670 座",
        rightDetail: "the growing number of parks has made exercise more accessible to residents",
        rightDetailCn: "公园数量增长让居民锻炼更加方便"
      }
    },

    /* ---------------- 英语一 · 图表 ---------------- */
    {
      id: "b-2025-1", year: 2025, exam: "英一", type: "chart", typeName: "表格 · 动态",
      topic: "家用电器拥有量", topicEn: "household appliances",
      prompt: "表格作文：2014–2023 年全国居民平均每百户年末主要耐用消费品拥有量（空调、洗衣机、电冰箱）。",
      points: ["描述表格", "解释含义", "给出评论"],
      data: "空调 75.2→145.9 台；洗衣机 83.7→98.2 台；电冰箱 85.5→103.4 台（2014→2023）",
      setup: {
        scenario: "dynamic-single", chart: "table", theme: "the ownership of household appliances", themeCn: "家用电器拥有量",
        subject: "Chinese households", subjectCn: "中国家庭", benefit: "quality of life", benefitCn: "生活质量",
        year1: "2014", year2: "2023", trend: "rose significantly", trendCn: "显著上升",
        trendNoun: "a significant rise", metric: "ownership of air conditioners", metricCn: "空调拥有量"
      },
      fills: {
        item1: "air conditioners", item1Cn: "空调", v1: "75.2 units", v2: "145.9 units",
        item2: "refrigerators", item2Cn: "冰箱", v3: "85.5 units", v4: "103.4 units",
        item3: "washing machines", item3Cn: "洗衣机", v5: "83.7 units", v6: "98.2 units"
      }
    },
    {
      id: "b-2026-1", year: 2026, exam: "英一", type: "chart", typeName: "双图表 · 饼图 + 柱状图",
      topic: "养老机器人", topicEn: "elderly-care robots",
      prompt: "双图表：左饼图消费者对养老机器人的接受度（完全接受 39.3%、部分接受 32.8%、不接受 27.9%）；右柱状图首要关注点（安全 46.3%、价格 24.9%、便利 10.7%）。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "接受度 39.3% / 32.8% / 27.9%；关注点 安全 46.3%、价格 24.9%、便利 10.7%",
      setup: {
        scenario: "double", chart: "pie chart", theme: "the public's attitude towards elderly-care robots", themeCn: "公众对养老机器人的态度",
        subject: "consumers", subjectCn: "消费者", benefit: "elderly care services", benefitCn: "养老服务",
        year1: "2026", year2: "2026", trend: "rose steadily", trendCn: "稳步上升",
        metric: "proportion", metricCn: "比例"
      },
      fills: {
        leftTopic: "consumers' attitudes towards elderly-care robots", leftTopicCn: "消费者对养老机器人的态度",
        rightTopic: "their major concerns about such robots", rightTopicCn: "他们对这类机器人的主要担忧",
        leftDetail: "the proportions of respondents who fully accept, partially accept and reject these robots account for 39.3%, 32.8% and 27.9% respectively",
        leftDetailCn: "完全接受、部分接受和不接受这类机器人的受访者比例分别为 39.3%、32.8% 和 27.9%",
        rightDetail: "safety tops the list of consumers' major concerns, at 46.3%, followed by price at 24.9%",
        rightDetailCn: "安全在消费者的主要担忧中居首，占 46.3%，其次是价格，占 24.9%"
      }
    },

    /* ---------------- 英语二 · 图表 ---------------- */
    {
      id: "b-2010-2", year: 2010, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "发展中国家通信业发展迅速", topicEn: "telecommunications in developing countries",
      prompt: "柱状图：2000–2008 年发展中国家手机与固定电话用户数量变化，手机用户迅速增长。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "dynamic-single", chart: "bar chart", theme: "the telecommunications industry in developing countries", themeCn: "发展中国家通信业",
        subject: "mobile phone users", subjectCn: "手机用户", benefit: "effective communication", benefitCn: "有效沟通",
        year1: "2000", year2: "2008", trend: "increased rapidly", trendCn: "迅速增长",
        trendNoun: "a rapid increase", metric: "number", metricCn: "数量"
      },
      fills: { item1: "mobile phone subscriptions", item1Cn: "手机用户", v1: "0.2 billion", v2: "3.3 billion" }
    },
    {
      id: "b-2011-2", year: 2011, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "国产品牌发展迅速", topicEn: "domestic brands",
      prompt: "柱状图：2006–2010 年国产品牌与进口品牌在某市场的份额变化，国产品牌份额持续上升。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "dynamic-multi", chart: "bar chart", theme: "the market share of domestic and imported brands", themeCn: "国产品牌与进口品牌的市场份额",
        subject: "consumers", subjectCn: "消费者", benefit: "national economic development", benefitCn: "国家经济发展",
        year1: "2006", year2: "2010", trend: "rose steadily", trendCn: "稳步上升", metric: "market share", metricCn: "市场份额"
      },
      fills: {
        item1: "domestic brands", item1Cn: "国产品牌", trend1: "rose", trend1Cn: "上升", v1: "35%", v2: "57%",
        item2: "imported brands", item2Cn: "进口品牌", trend2: "declined", trend2Cn: "下降", v3: "65%", v4: "43%",
        item3: "other brands", item3Cn: "其他品牌", trend3: "remained stable", trend3Cn: "保持稳定", v5: "0%", v6: "0%"
      }
    },
    {
      id: "b-2012-2", year: 2012, exam: "英二", type: "chart", typeName: "表格",
      topic: "员工满意度", topicEn: "job satisfaction",
      prompt: "表格：某公司不同年龄段员工对工作的满意度调查，40 岁以下与 50 岁以上各有一半人不确定，41–50 岁有 64% 不满意。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "40 岁以下：一半不确定；41–50 岁：64% 不满意；50 岁以上：一半不确定",
      setup: {
        scenario: "static", chart: "table", theme: "employees' job satisfaction", themeCn: "员工工作满意度",
        subject: "employees", subjectCn: "员工", benefit: "work efficiency", benefitCn: "工作效率",
        year1: "2012", year2: "2012", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "employees under 40", item1Cn: "40 岁以下员工", v1: "50%",
        item2: "employees aged 41–50", item2Cn: "41–50 岁员工", v2: "64%",
        item3: "employees over 50", item3Cn: "50 岁以上员工", v3: "50%",
        item4: "uncertain employees", item4Cn: "不确定的员工", v4: "50%"
      }
    },
    {
      id: "b-2013-2", year: 2013, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "兼职在大学生中越来越普遍", topicEn: "part-time jobs",
      prompt: "柱状图：某高校大学生兼职情况调查，兼职比例逐年上升。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "dynamic-single", chart: "bar chart", theme: "the popularity of part-time jobs among college students", themeCn: "大学生兼职",
        subject: "undergraduates", subjectCn: "大学生", benefit: "practical skills", benefitCn: "实践能力",
        year1: "2010", year2: "2013", trend: "rose steadily", trendCn: "稳步上升",
        trendNoun: "a steady rise", metric: "proportion", metricCn: "比例"
      },
      fills: { item1: "undergraduates with part-time jobs", item1Cn: "兼职大学生", v1: "20%", v2: "45%" }
    },
    {
      id: "b-2014-2", year: 2014, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "城市人口越来越多", topicEn: "urban population",
      prompt: "柱状图：2000–2015 年中国城市与农村人口数量变化，城市人口持续上升。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "dynamic-multi", chart: "bar chart", theme: "the urban and rural population in China", themeCn: "中国城乡人口",
        subject: "Chinese residents", subjectCn: "中国居民", benefit: "urban development", benefitCn: "城市发展",
        year1: "2000", year2: "2015", metric: "population", metricCn: "人口"
      },
      fills: {
        item1: "urban population", item1Cn: "城市人口", trend1: "rose", trend1Cn: "上升", v1: "459 million", v2: "771 million",
        item2: "rural population", item2Cn: "农村人口", trend2: "declined", trend2Cn: "下降", v3: "808 million", v4: "603 million",
        item3: "total population", item3Cn: "总人口", trend3: "grew slowly", trend3Cn: "缓慢增长", v5: "1.27 billion", v6: "1.37 billion"
      }
    },
    {
      id: "b-2015-2", year: 2015, exam: "英二", type: "chart", typeName: "饼状图",
      topic: "春节花销送礼比例高", topicEn: "Spring Festival spending",
      prompt: "饼状图：某市居民春节花销构成，送礼、红包、聚餐、旅游等占比。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "static", chart: "pie chart", theme: "residents' spending during the Spring Festival", themeCn: "居民春节花销",
        subject: "residents", subjectCn: "居民", benefit: "family bonding", benefitCn: "家庭纽带",
        year1: "2015", year2: "2015", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "gifts and red packets", item1Cn: "送礼与红包", v1: "45%",
        item2: "family dinners", item2Cn: "家庭聚餐", v2: "25%",
        item3: "travel", item3Cn: "旅游", v3: "20%",
        item4: "other expenses", item4Cn: "其他开销", v4: "10%"
      }
    },
    {
      id: "b-2016-2", year: 2016, exam: "英二", type: "chart", typeName: "饼状图",
      topic: "旅游目的", topicEn: "travel purposes",
      prompt: "饼状图：某高校学生旅游目的调查，放松心情、观光、增长见识等占比。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "static", chart: "pie chart", theme: "the purpose of students' travel", themeCn: "学生旅游目的",
        subject: "undergraduates", subjectCn: "大学生", benefit: "relieve stress", benefitCn: "缓解压力",
        year1: "2016", year2: "2016", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "relaxing and relieving stress", item1Cn: "放松心情、缓解压力", v1: "40%",
        item2: "sightseeing", item2Cn: "观光", v2: "30%",
        item3: "broadening horizons", item3Cn: "增长见识", v3: "20%",
        item4: "other purposes", item4Cn: "其他目的", v4: "10%"
      }
    },
    {
      id: "b-2017-2", year: 2017, exam: "英二", type: "chart", typeName: "线状图",
      topic: "参观博物馆越来越流行", topicEn: "museum visits",
      prompt: "线状图：2012–2016 年某市博物馆参观人数变化，参观人数持续上升。",
      points: ["描述图表", "解释含义", "给出评论"],
      setup: {
        scenario: "dynamic-single", chart: "line chart", theme: "the number of museum visitors", themeCn: "博物馆参观人数",
        subject: "visitors", subjectCn: "参观者", benefit: "cultural confidence", benefitCn: "文化自信",
        year1: "2012", year2: "2016", trend: "rose steadily", trendCn: "稳步上升",
        trendNoun: "a steady rise", metric: "number", metricCn: "数量"
      },
      fills: { item1: "museum visitors", item1Cn: "博物馆参观者", v1: "4.5 million", v2: "7.8 million" }
    },
    {
      id: "b-2018-2", year: 2018, exam: "英二", type: "chart", typeName: "饼状图",
      topic: "消费者关注特色与服务", topicEn: "dining preferences",
      prompt: "饼状图：2017 年某市消费者选择餐厅时的关注因素：特色 36.3%、服务 26.8%、环境 23.8%、价格 8.4%、其他 4.7%。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "特色 36.3%；服务 26.8%；环境 23.8%；价格 8.4%；其他 4.7%",
      setup: {
        scenario: "static", chart: "pie chart", theme: "the dining preference of consumers", themeCn: "消费者选择餐厅的关注因素",
        subject: "consumers", subjectCn: "消费者", benefit: "service quality", benefitCn: "服务质量",
        year1: "2017", year2: "2017", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "special features", item1Cn: "特色", v1: "36.3%",
        item2: "service", item2Cn: "服务", v2: "26.8%",
        item3: "environment", item3Cn: "环境", v3: "23.8%",
        item4: "price", item4Cn: "价格", v4: "8.4%"
      }
    },
    {
      id: "b-2019-2", year: 2019, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "升学越来越流行", topicEn: "graduates' choices",
      prompt: "柱状图：某高校 2013 与 2018 届本科毕业生去向：就业 68.1%→60.7%，升学 26.3%→34.0%，创业 1.3%→2.6%。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "就业 68.1%→60.7%；升学 26.3%→34.0%；创业 1.3%→2.6%",
      setup: {
        scenario: "dynamic-multi", chart: "bar chart", theme: "the career choice of graduates", themeCn: "毕业生去向",
        subject: "graduates", subjectCn: "毕业生", benefit: "personal development", benefitCn: "个人发展",
        year1: "2013", year2: "2018", metric: "percentage", metricCn: "比例"
      },
      fills: {
        item1: "entering the workforce", item1Cn: "就业", trend1: "decreased", trend1Cn: "下降", v1: "68.1%", v2: "60.7%",
        item2: "pursuing further study", item2Cn: "升学", trend2: "climbed", trend2Cn: "上升", v3: "26.3%", v4: "34.0%",
        item3: "starting a business", item3Cn: "创业", trend3: "rose slightly", trend3Cn: "小幅上升", v5: "1.3%", v6: "2.6%"
      }
    },
    {
      id: "b-2020-2", year: 2020, exam: "英二", type: "chart", typeName: "饼状图",
      topic: "手机阅读目的", topicEn: "mobile reading purposes",
      prompt: "饼状图：某高校学生手机阅读目的调查：学习知识 59.5%、消磨时间 21.3%、获取信息 17.0%、其他 2.2%。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "学习知识 59.5%；消磨时间 21.3%；获取信息 17.0%；其他 2.2%",
      setup: {
        scenario: "static", chart: "pie chart", theme: "the purpose of students' mobile reading", themeCn: "学生手机阅读目的",
        subject: "undergraduates", subjectCn: "大学生", benefit: "lifelong learning", benefitCn: "终身学习",
        year1: "2020", year2: "2020", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "learning knowledge", item1Cn: "学习知识", v1: "59.5%",
        item2: "killing time", item2Cn: "消磨时间", v2: "21.3%",
        item3: "obtaining information", item3Cn: "获取信息", v3: "17.0%",
        item4: "other purposes", item4Cn: "其他目的", v4: "2.2%"
      }
    },
    {
      id: "b-2021-2", year: 2021, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "独自和结伴锻炼", topicEn: "exercise styles",
      prompt: "柱状图：某市居民锻炼方式调查：独自锻炼 54.3%、和朋友一起 47.7%、和家人一起 23.9%、团体活动 15.8%。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "独自 54.3%；朋友 47.7%；家人 23.9%；团体 15.8%",
      setup: {
        scenario: "static", chart: "bar chart", theme: "the exercise style of residents", themeCn: "居民锻炼方式",
        subject: "residents", subjectCn: "居民", benefit: "physical and mental health", benefitCn: "身心健康",
        year1: "2021", year2: "2021", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "exercising alone", item1Cn: "独自锻炼", v1: "54.3%",
        item2: "exercising with friends", item2Cn: "和朋友一起", v2: "47.7%",
        item3: "exercising with family", item3Cn: "和家人一起", v3: "23.9%",
        item4: "group activities", item4Cn: "团体活动", v4: "15.8%"
      }
    },
    {
      id: "b-2022-2", year: 2022, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "快递业发展迅速", topicEn: "express delivery",
      prompt: "柱状图：2018–2020 年我国快递业务量：总量 51→64→83（十亿件），农村 12→15→30（十亿件）。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "总量 51→64→83；农村 12→15→30（单位：十亿件）",
      setup: {
        scenario: "dynamic-multi", chart: "bar chart", theme: "the express delivery volume in China", themeCn: "中国快递业务量",
        subject: "parcels", subjectCn: "快递件", benefit: "rural revitalization", benefitCn: "乡村振兴",
        year1: "2018", year2: "2020", metric: "volume", metricCn: "业务量"
      },
      fills: {
        item1: "total express delivery volume", item1Cn: "快递总业务量", trend1: "rose", trend1Cn: "上升", v1: "51 billion", v2: "83 billion",
        item2: "rural express delivery volume", item2Cn: "农村快递业务量", trend2: "more than doubled", trend2Cn: "翻了一倍多", v3: "12 billion", v4: "30 billion",
        item3: "urban express delivery volume", item3Cn: "城市快递业务量", trend3: "grew steadily", trend3Cn: "稳步增长", v5: "39 billion", v6: "53 billion"
      }
    },
    {
      id: "b-2023-2", year: 2023, exam: "英二", type: "chart", typeName: "线状图",
      topic: "居民健康素养水平稳步提升", topicEn: "health literacy",
      prompt: "线状图：2012–2021 年中国居民健康素养水平从 8.8% 上升至 25.4%。",
      points: ["描述图表", "解释含义", "给出评论"],
      data: "2012 年 8.8% → 2016 年 11.58% → 2021 年 25.4%",
      setup: {
        scenario: "dynamic-single", chart: "line chart", theme: "Chinese residents' health literacy level", themeCn: "中国居民健康素养水平",
        subject: "Chinese residents", subjectCn: "中国居民", benefit: "public health", benefitCn: "公共卫生",
        year1: "2012", year2: "2021", trend: "rose steadily", trendCn: "稳步上升",
        trendNoun: "a steady rise", metric: "health literacy level", metricCn: "健康素养水平"
      },
      fills: {
        item1: "health literacy level", item1Cn: "健康素养水平", trend1: "increased", trend1Cn: "上升",
        v1: "8.8%", v2: "25.4%", diff: "16.6", unit: "percentage points", unitCn: "百分点", multiple: "almost three"
      }
    },
    {
      id: "b-2024-2", year: 2024, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "劳动实践课收获", topicEn: "labor practice course",
      prompt: "柱状图：某高校劳动实践课学生主要收获：学习相关知识 91.3%、提升动手能力 84.8%、心情舒畅 54.4%、增强合作能力 32.6%。",
      points: ["描述和解释图表", "给出评论"],
      data: "相关知识 91.3%；动手能力 84.8%；心情舒畅 54.4%；合作能力 32.6%",
      setup: {
        scenario: "static", chart: "bar chart", theme: "the benefit of the labor practice course", themeCn: "劳动实践课的收益",
        subject: "students", subjectCn: "学生", benefit: "all-round development", benefitCn: "全面发展",
        year1: "2024", year2: "2024", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "acquiring relevant knowledge", item1Cn: "学习相关知识", v1: "91.3%",
        item2: "improving practical skills", item2Cn: "提升动手能力", v2: "84.8%",
        item3: "feeling comfortable", item3Cn: "心情舒畅", v3: "54.4%",
        item4: "enhancing cooperation capacity", item4Cn: "增强合作能力", v4: "32.6%"
      }
    },
    {
      id: "b-2025-2", year: 2025, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "老年人休闲活动", topicEn: "leisure activities of the elderly",
      prompt: "柱状图：某社区老年人主要日常休闲活动：看电视 90.8%、散步 68.3%、养花 34.7%、阅读 31.8%、下棋 18.4%。",
      points: ["描述和解释图表", "给出评论"],
      data: "看电视 90.8%；散步 68.3%；养花 34.7%；阅读 31.8%；下棋 18.4%",
      setup: {
        scenario: "static", chart: "bar chart", theme: "the leisure life of the elderly", themeCn: "老年人休闲生活",
        subject: "elderly residents", subjectCn: "老年居民", benefit: "quality of life", benefitCn: "生活质量",
        year1: "2025", year2: "2025", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "watching TV", item1Cn: "看电视", v1: "90.8%",
        item2: "walking", item2Cn: "散步", v2: "68.3%",
        item3: "gardening", item3Cn: "养花", v3: "34.7%",
        item4: "reading", item4Cn: "阅读", v4: "31.8%"
      }
    },
    {
      id: "b-2026-2", year: 2026, exam: "英二", type: "chart", typeName: "柱状图",
      topic: "儿童户外活动", topicEn: "children's outdoor activities",
      prompt: "柱状图：关于儿童户外活动看法的调查：满足好奇心 54.6%、促进观察力 54.5%、强身健体 37.2%、增强亲子互动 33.2%。",
      points: ["描述和解释图表", "给出评论"],
      data: "好奇心 54.6%；观察力 54.5%；强身健体 37.2%；亲子互动 33.2%",
      setup: {
        scenario: "static", chart: "bar chart", theme: "the value of outdoor activities for children", themeCn: "户外活动对儿童的价值",
        subject: "parents", subjectCn: "家长", benefit: "children's all-round development", benefitCn: "儿童全面发展",
        year1: "2026", year2: "2026", metric: "proportion", metricCn: "比例"
      },
      fills: {
        item1: "satisfying curiosity", item1Cn: "满足好奇心", v1: "54.6%",
        item2: "developing observational skills", item2Cn: "促进观察力", v2: "54.5%",
        item3: "strengthening physical fitness", item3Cn: "强身健体", v3: "37.2%",
        item4: "enhancing parent-child interaction", item4Cn: "增强亲子互动", v4: "33.2%"
      }
    }
  ];

  /* ---------------- 小作文 ---------------- */
  const small = [
    { id: "s-2010-1", year: 2010, exam: "英一", type: "notice", subtype: "notice", topic: "招募国际会议志愿者", topicEn: "volunteer recruitment",
      prompt: "为研究生会写一则通知，为全球化国际会议招募志愿者，说明申请人的基本条件及其他相关信息。", points: ["招募目的", "基本条件", "报名方式"],
      setup: { event: "an international conference on globalization", eventCn: "全球化国际会议", audience: "postgraduate students", audienceCn: "研究生", place: "the university auditorium", placeCn: "学校礼堂", date: "December 20th", dateCn: "12 月 20 日" } },
    { id: "s-2011-1", year: 2011, exam: "英一", type: "letter", subtype: "recommend", mode: "active", topic: "推荐一部电影", topicEn: "recommending a movie",
      prompt: "写信给朋友，推荐一部你最喜欢的电影并说明推荐理由。", points: ["推荐电影", "推荐理由"],
      setup: { audience: "a friend", audienceCn: "朋友", object: "the movie The Shawshank Redemption", objectCn: "电影《肖申克的救赎》", feature1: "inspiring story", feature1Cn: "鼓舞人心的故事", feature2: "profound theme", feature2Cn: "深刻的主题" } },
    { id: "s-2012-1", year: 2012, exam: "英一", type: "letter", subtype: "suggest", mode: "active", topic: "给留学生校园生活建议", topicEn: "campus life suggestions",
      prompt: "以学生会名义给即将来校的留学生写信，表示欢迎并就校园生活提出建议。", points: ["表示欢迎", "校园生活建议"],
      setup: { audience: "international students", audienceCn: "留学生", topic: "campus life", topicCn: "校园生活", noun: "suggestions", nounCn: "建议" } },
    { id: "s-2013-1", year: 2013, exam: "英一", type: "letter", subtype: "invite", mode: "active", topic: "邀请外教担任演讲比赛评委", topicEn: "inviting a judge",
      prompt: "给外教写信，邀请他/她担任即将举行的英语演讲比赛评委，并说明必要细节。", points: ["邀请", "比赛细节"],
      setup: { audience: "a foreign teacher", audienceCn: "外教", event: "the English speech contest", eventCn: "英语演讲比赛", place: "the main hall", placeCn: "主会场", date: "next Friday", dateCn: "下周五" } },
    { id: "s-2014-1", year: 2014, exam: "英一", type: "letter", subtype: "suggest", mode: "active", topic: "提高学生身体素质", topicEn: "improving physical fitness",
      prompt: "给校长写信，就如何提高学生身体素质提出建议。", points: ["提出建议", "说明理由"],
      setup: { audience: "the president of the university", audienceCn: "校长", topic: "students' physical condition", topicCn: "学生身体素质", noun: "suggestions", nounCn: "建议" } },
    { id: "s-2015-1", year: 2015, exam: "英一", type: "letter", subtype: "recommend", mode: "active", topic: "读书会推荐一本书", topicEn: "recommending a book",
      prompt: "你要主持一场读书会，写信向俱乐部成员推荐一本书并说明理由。", points: ["推荐书", "推荐理由"],
      setup: { audience: "club members", audienceCn: "俱乐部成员", object: "the book The Old Man and the Sea", objectCn: "《老人与海》", feature1: "inspiring story", feature1Cn: "鼓舞人心的故事", feature2: "thought-provoking ideas", feature2Cn: "发人深省的思想" } },
    { id: "s-2016-1", year: 2016, exam: "英一", type: "notice", subtype: "notice", topic: "图书馆新生指南", topicEn: "library guide",
      prompt: "假设你是大学图书馆员，写一则通知，向新入学的留学生介绍图书馆相关信息。", points: ["开放时间", "借阅规则", "注意事项"],
      setup: { event: "a library orientation", eventCn: "图书馆新生指南活动", audience: "newly-enrolled international students", audienceCn: "新入学留学生", place: "the university library", placeCn: "大学图书馆" } },
    { id: "s-2017-1", year: 2017, exam: "英一", type: "letter", subtype: "recommend", mode: "active", topic: "向外教推荐景点", topicEn: "recommending tourist attractions",
      prompt: "给新到任的澳大利亚教授 James Cook 写信，推荐所在城市的旅游景点并说明理由。", points: ["推荐景点", "推荐理由"],
      setup: { audience: "Professor James Cook", audienceCn: "James Cook 教授", object: "the West Lake", objectCn: "西湖", feature1: "beautiful scenery", feature1Cn: "优美风景", feature2: "rich cultural heritage", feature2Cn: "深厚文化底蕴" } },
    { id: "s-2018-1", year: 2018, exam: "英一", type: "letter", subtype: "invite", mode: "active", topic: "邀请专家参加毕业典礼", topicEn: "graduation ceremony invitation",
      prompt: "写信邀请所有在校国际专家参加毕业典礼，并告知时间、地点等相关信息。", points: ["邀请", "时间地点", "其他信息"],
      setup: { audience: "international experts on campus", audienceCn: "在校国际专家", event: "the graduation ceremony", eventCn: "毕业典礼", place: "the university auditorium", placeCn: "学校礼堂", date: "June 20th", dateCn: "6 月 20 日" } },
    { id: "s-2019-1", year: 2019, exam: "英一", type: "letter", subtype: "reply", mode: "passive", topic: "答复乡村小学支教项目", topicEn: "replying about a volunteer project",
      prompt: "你在“帮扶乡村小学”项目中工作，给来信咨询的留学生志愿者回信，说明项目细节。", points: ["项目目的", "具体安排", "参与方式"],
      setup: { audience: "an international student volunteer", audienceCn: "留学生志愿者", event: "the Aiding Rural Primary Schools project", eventCn: "帮扶乡村小学项目", topic: "rural education", topicCn: "乡村教育" } },
    { id: "s-2020-1", year: 2020, exam: "英一", type: "notice", subtype: "notice", topic: "歌唱比赛通知", topicEn: "singing contest notice",
      prompt: "学生会安排你通知留学生即将举行的歌唱比赛，写一则约 100 词的通知。", points: ["时间地点", "参赛对象", "奖励"],
      setup: { event: "a singing contest", eventCn: "歌唱比赛", audience: "international students", audienceCn: "留学生", place: "the assembly hall", placeCn: "大会厅", date: "next Friday", dateCn: "下周五" } },
    { id: "s-2021-1", year: 2021, exam: "英一", type: "letter", subtype: "suggest", mode: "active", topic: "给外国朋友在华求职建议", topicEn: "job-hunting advice",
      prompt: "外国朋友刚毕业，想在中国找工作，写信给他/她提出建议。", points: ["求职建议", "理由"],
      setup: { audience: "a foreign friend", audienceCn: "外国朋友", topic: "job hunting in China", topicCn: "在华求职", noun: "suggestions", nounCn: "建议" } },
    { id: "s-2022-1", year: 2022, exam: "英一", type: "letter", subtype: "invite", mode: "active", topic: "邀请教授组队参加创新大赛", topicEn: "innovation contest invitation",
      prompt: "给英国大学教授写信，邀请他/她组队参加在你校举办的国际创新大赛。", points: ["邀请", "比赛细节"],
      setup: { audience: "a professor at a British university", audienceCn: "英国大学教授", event: "the International Innovation Contest", eventCn: "国际创新大赛", place: "our university", placeCn: "我校", date: "December 31st", dateCn: "12 月 31 日" } },
    { id: "s-2023-1", year: 2023, exam: "英一", type: "notice", subtype: "notice", topic: "招募校园运动研究项目学生", topicEn: "research project recruitment",
      prompt: "写一则通知，为 Smith 教授关于校园体育活动的项目招募一名学生，说明职责和要求。", points: ["职责", "要求", "报名方式"],
      setup: { event: "Professor Smith's research project on campus sports activities", eventCn: "Smith 教授校园体育活动研究项目", audience: "students", audienceCn: "学生", topic: "campus sports", topicCn: "校园体育" } },
    { id: "s-2024-1", year: 2024, exam: "英一", type: "letter", subtype: "reply", mode: "passive", topic: "给 Paul 的口头报告建议", topicEn: "advice on an oral report",
      prompt: "阅读留学生 Paul 的邮件并回复：他要做关于中国古代科学家的口头报告，向你寻求建议。", points: ["提供建议", "说明理由"],
      setup: { audience: "Paul", audienceCn: "Paul", topic: "an oral report on an ancient Chinese scientist", topicCn: "关于中国古代科学家的口头报告", noun: "advice", nounCn: "建议" } },
    { id: "s-2025-1", year: 2025, exam: "英一", type: "letter", subtype: "reply", mode: "passive", topic: "向 Paul 介绍创新手工艺展", topicEn: "replying about a craft exhibition",
      prompt: "阅读同学 Paul 的邮件并回复：他对你邀请年轻手工艺人来校展示创新手工艺很感兴趣，想了解更多并帮忙。", points: ["介绍展览", "说明可帮忙的事"],
      setup: { audience: "Paul", audienceCn: "Paul", event: "the innovative craft-making exhibition", eventCn: "创新手工艺展", topic: "innovative craft-making", topicCn: "创新手工艺", place: "the student activity center", placeCn: "学生活动中心" } },
    { id: "s-2026-1", year: 2026, exam: "英一", type: "letter", subtype: "reply", mode: "passive", topic: "向 Paul 介绍中国家书", topicEn: "replying about family letters",
      prompt: "阅读朋友 Paul 的邮件并回复：他被中国家书打动，想了解更多，并询问是否有公开展览。", points: ["介绍家书", "说明展览", "邀请参观"],
      setup: { audience: "Paul", audienceCn: "Paul", event: "the family letter exhibition", eventCn: "家书展览", topic: "Chinese families' handwritten letters", topicCn: "中国家书", place: "the student activity center", placeCn: "学生活动中心" } },
    { id: "s-2010-2", year: 2010, exam: "英二", type: "letter", subtype: "thank", mode: "active", topic: "感谢美国同事并邀请访华", topicEn: "thanks and invitation",
      prompt: "你刚作为中美文化交流项目成员从美国回来，写信给美国同事：感谢热情接待，并邀请他/她方便时来中国。", points: ["感谢", "邀请"],
      setup: { audience: "an American colleague", audienceCn: "美国同事", event: "the Sino-American cultural exchange program", eventCn: "中美文化交流项目", period: "the cultural exchange program", periodCn: "文化交流项目" } },
    { id: "s-2011-2", year: 2011, exam: "英二", type: "letter", subtype: "congratulate", mode: "active", topic: "祝贺表弟考上大学并给建议", topicEn: "congratulations and advice",
      prompt: "表弟李明刚被大学录取，写信祝贺他，并就如何为大学生活做准备提出建议。", points: ["祝贺", "准备建议"],
      setup: { audience: "cousin Li Ming", audienceCn: "表弟李明", topic: "university life", topicCn: "大学生活", noun: "suggestions", nounCn: "建议" } },
    { id: "s-2012-2", year: 2012, exam: "英二", type: "letter", subtype: "complain", mode: "active", topic: "投诉电子词典", topicEn: "complaining about an e-dictionary",
      prompt: "你从网店买的电子词典有问题，写信给客服投诉并要求尽快解决。", points: ["投诉问题", "要求解决"],
      setup: { audience: "the customer service center", audienceCn: "客服中心", issue: "the electronic dictionary I bought online", issueCn: "我在网上买的电子词典", object: "the electronic dictionary", objectCn: "电子词典" } },
    { id: "s-2013-2", year: 2013, exam: "英二", type: "letter", subtype: "invite", mode: "active", topic: "邀请同学参加慈善义卖", topicEn: "charity sale invitation",
      prompt: "班级要为需要帮助的孩子举办慈善义卖，写信给同学告知细节并鼓励参加。", points: ["活动细节", "鼓励参加"],
      setup: { audience: "classmates", audienceCn: "同学", event: "a charity sale for kids in need", eventCn: "帮助困难儿童的慈善义卖", place: "the school playground", placeCn: "学校操场", date: "next Sunday", dateCn: "下周日" } },
    { id: "s-2014-2", year: 2014, exam: "英二", type: "letter", subtype: "help", mode: "active", topic: "向室友 John 求助", topicEn: "asking for advice",
      prompt: "你要出国留学并与当地学生 John 合租，写信告诉他你的生活习惯，并就在当地生活向他请教。", points: ["生活习惯", "寻求建议"],
      setup: { audience: "John", audienceCn: "John", topic: "living abroad", topicCn: "在国外生活", issue: "living habits and local life", issueCn: "生活习惯与当地生活" } },
    { id: "s-2015-2", year: 2015, exam: "英二", type: "notice", subtype: "notice", topic: "夏令营招募志愿者", topicEn: "summer camp volunteers",
      prompt: "学校将为高中生举办夏令营，写一则通知：简要介绍活动并招募志愿者。", points: ["活动介绍", "招募志愿者"],
      setup: { event: "a summer camp for high school students", eventCn: "高中生夏令营", audience: "students", audienceCn: "学生", place: "our university", placeCn: "我校" } },
    { id: "s-2016-2", year: 2016, exam: "英二", type: "letter", subtype: "reply", mode: "passive", topic: "回复 Jack 的翻译建议", topicEn: "replying with translation advice",
      prompt: "你获得翻译比赛奖，朋友 Jack 来信祝贺并请教翻译方法，回信感谢并给出建议。", points: ["感谢", "翻译建议"],
      setup: { audience: "Jack", audienceCn: "Jack", topic: "translation", topicCn: "翻译", noun: "advice", nounCn: "建议" } },
    { id: "s-2017-2", year: 2017, exam: "英二", type: "letter", subtype: "reply", mode: "passive", topic: "回复 Williams 教授并介绍演讲要点", topicEn: "replying about a presentation",
      prompt: "Williams 教授邀请你给留学生做中国文化讲座，回信接受邀请并介绍演讲要点。", points: ["接受邀请", "演讲要点"],
      setup: { audience: "Professor Williams", audienceCn: "Williams 教授", topic: "Chinese culture", topicCn: "中国文化", event: "a presentation on Chinese culture", eventCn: "中国文化讲座" } },
    { id: "s-2018-2", year: 2018, exam: "英二", type: "letter", subtype: "apologize", mode: "active", topic: "取消拜访并道歉", topicEn: "apologizing for cancelling a visit",
      prompt: "你不得不取消旅行计划，无法拜访 Smith 教授，写信道歉、说明情况并建议未来见面。", points: ["道歉", "说明情况", "建议未来见面"],
      setup: { audience: "Professor Smith", audienceCn: "Smith 教授", mistake: "cancelling the visit", mistakeCn: "取消拜访", topic: "a future meeting", topicCn: "未来见面" } },
    { id: "s-2019-2", year: 2019, exam: "英二", type: "letter", subtype: "suggest", mode: "active", topic: "为城市交通辩论提建议", topicEn: "debate topic suggestion",
      prompt: "Smith 教授让你策划一场以城市交通为主题的辩论，写信提出具体辩题、理由和安排。", points: ["具体辩题", "理由", "安排"],
      setup: { audience: "Professor Smith", audienceCn: "Smith 教授", topic: "city traffic", topicCn: "城市交通", noun: "suggestions", nounCn: "建议", event: "a debate on city traffic", eventCn: "城市交通辩论" } },
    { id: "s-2020-2", year: 2020, exam: "英二", type: "letter", subtype: "introduce", mode: "active", topic: "向留学生介绍历史景点并给游览建议", topicEn: "introducing a historical site",
      prompt: "你正为一批留学生策划历史景点游览，写信介绍该景点并给出游览建议。", points: ["介绍景点", "游览建议"],
      setup: { audience: "international students", audienceCn: "留学生", object: "the Forbidden City", objectCn: "故宫", location: "Beijing", locationCn: "北京", topic: "the tour", topicCn: "游览" } },
    { id: "s-2021-2", year: 2021, exam: "英二", type: "letter", subtype: "invite", mode: "active", topic: "邀请 Jack 参加线上会议", topicEn: "online meeting invitation",
      prompt: "你正在组织一场线上会议，写信邀请留学生 Jack 参加并告知细节。", points: ["邀请", "会议细节"],
      setup: { audience: "Jack", audienceCn: "Jack", event: "an online meeting", eventCn: "线上会议", place: "the online platform", placeCn: "线上平台", date: "next Saturday", dateCn: "下周六" } },
    { id: "s-2022-2", year: 2022, exam: "英二", type: "letter", subtype: "invite", mode: "active", topic: "邀请留学生参加校园美食节", topicEn: "food festival invitation",
      prompt: "你正在策划校园美食节，写信给留学生介绍美食节并邀请他们参加。", points: ["介绍美食节", "邀请参加"],
      setup: { audience: "international students", audienceCn: "留学生", event: "a campus food festival", eventCn: "校园美食节", place: "the playground", placeCn: "操场", date: "next Sunday", dateCn: "下周日" } },
    { id: "s-2023-2", year: 2023, exam: "英二", type: "letter", subtype: "suggest", mode: "active", topic: "建议 David 看艺术展", topicEn: "art exhibition suggestion",
      prompt: "周日将举办艺术展和机器人展，朋友 David 问你该去哪个，写信给出建议和理由。", points: ["建议", "理由"],
      setup: { audience: "David", audienceCn: "David", object: "the art exhibition", objectCn: "艺术展", optionA: "the robot show", optionACn: "机器人展", optionB: "the art exhibition", optionBCn: "艺术展" } },
    { id: "s-2024-2", year: 2024, exam: "英二", type: "letter", subtype: "introduce", mode: "active", topic: "与 Jack 商量古建筑保护调查", topicEn: "survey plan on old houses",
      prompt: "你和 Jack 要调查古镇古建筑保护情况，写信提出计划并征求他的意见。", points: ["调查计划", "征求意见"],
      setup: { audience: "Jack", audienceCn: "Jack", topic: "the protection of old houses in an ancient town", topicCn: "古镇古建筑保护", object: "the survey", objectCn: "调查" } },
    { id: "s-2025-2", year: 2025, exam: "英二", type: "letter", subtype: "invite", mode: "active", topic: "邀请 John 参演话剧", topicEn: "short play invitation",
      prompt: "你正在策划一部改编自中国古典名著的话剧，写信给朋友 John 介绍话剧并邀请他参演。", points: ["介绍话剧", "邀请参演"],
      setup: { audience: "John", audienceCn: "John", event: "a short play based on a classic Chinese novel", eventCn: "改编自中国古典名著的话剧", topic: "the play", topicCn: "话剧" } },
    { id: "s-2026-2", year: 2026, exam: "英二", type: "letter", subtype: "reply", mode: "passive", topic: "回复 Jack 并表达对旅行视频的感受", topicEn: "replying about a travel video",
      prompt: "朋友 Jack 分享了他家人中国行的视频，写信告诉他你的感受，并表达想了解更多旅行细节的愿望。", points: ["表达感受", "想了解更多"],
      setup: { audience: "Jack", audienceCn: "Jack", thing: "the video of your family's trip in China", thingCn: "你家人中国行的视频", details: "your trip", detailsCn: "你们的旅行" } },
    { id: "s-2005-0", year: 2005, exam: "早年", type: "letter", subtype: "resign", mode: "active", topic: "辞职信", topicEn: "resignation letter",
      prompt: "两个月前你成为《Designs & Fashions》杂志编辑，现在发现工作与预期不符，决定辞职。写信给王先生说明决定、理由并道歉。", points: ["辞职决定", "理由", "道歉"],
      setup: { audience: "Mr. Wang", audienceCn: "王先生", position: "the editor of Designs & Fashions", positionCn: "《Designs & Fashions》编辑", reason: "the job is not what I expected", reasonCn: "这份工作与我的预期不符" } },
    { id: "s-2006-0", year: 2006, exam: "早年", type: "letter", subtype: "introduce", mode: "active", topic: "希望工程资助申请", topicEn: "Project Hope sponsorship",
      prompt: "你想资助偏远地区的一名孩子，写信给相关部门，请他们帮助寻找资助对象，并说明你想资助什么样的孩子以及如何实施。", points: ["资助意愿", "孩子条件", "实施方式"],
      setup: { audience: "the department concerned", audienceCn: "有关部门", object: "a child in a remote area", objectCn: "偏远地区的一名孩子", topic: "Project Hope", topicCn: "希望工程" } },
    { id: "s-2007-0", year: 2007, exam: "早年", type: "letter", subtype: "suggest", mode: "active", topic: "图书馆服务建议", topicEn: "library service suggestions",
      prompt: "写信给学校图书馆，就改进服务提出建议。", points: ["提出建议", "说明理由"],
      setup: { audience: "the university library", audienceCn: "学校图书馆", topic: "library service", topicCn: "图书馆服务", noun: "suggestions", nounCn: "建议" } },
    { id: "s-2008-0", year: 2008, exam: "早年", type: "letter", subtype: "apologize", mode: "active", topic: "归还 CD 并道歉", topicEn: "apologizing for a CD",
      prompt: "你从加拿大回来，发现行李中有房东 Bob 的一张音乐 CD 忘记归还，写信道歉并提出解决办法。", points: ["道歉", "解决办法"],
      setup: { audience: "Bob", audienceCn: "Bob", mistake: "forgetting to return your CD", mistakeCn: "忘记归还你的 CD", object: "the music CD", objectCn: "音乐 CD" } },
    { id: "s-2009-0", year: 2009, exam: "早年", type: "letter", subtype: "suggest", mode: "active", topic: "减少白色污染建议", topicEn: "reducing white pollution",
      prompt: "写信给报社编辑，就如何减少白色污染提出建议。", points: ["提出建议", "说明理由"],
      setup: { audience: "the editor", audienceCn: "编辑", topic: "white pollution", topicCn: "白色污染", noun: "suggestions", nounCn: "建议" } }
  ];

  window.KY.PROMPTS = { big, small };
})();
