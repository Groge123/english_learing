/* ==========================================================================
   砚台 · 模板数据
   整理自用户提供的《27 考研英语大作文模板（英一英二通用）》
   与《27 考研英语小作文模板（英一二通用）》。
   英文模板中的 {xxx} 为可替换空位，由引擎统一填充。
   ========================================================================== */
(function () {
  "use strict";
  window.KY = window.KY || {};

  const o = (id, name, en, cn, fields, tip) => ({
    id, name, en, cn,
    fields: fields || [],
    tip: tip || ""
  });

  /* ------------------------------------------------------------------------
     大作文
     ------------------------------------------------------------------------ */
  const big = {
    scenarios: [
      { id: "chart", name: "图表作文", en: "Chart", desc: "柱状图 / 线状图 / 饼状图 / 表格，英一英二通用", icon: "chart" },
      { id: "picture", name: "图画作文", en: "Picture", desc: "单图 / 双图 / 对话图，透过图画看寓意", icon: "picture" },
      { id: "picture-chart", name: "图画 + 图表", en: "Picture + Chart", desc: "2024 英一题型，图画描述与图表总体描述叠加", icon: "combo" },
      { id: "text", name: "文字作文", en: "Text", desc: "大纲样题，阅读文字 + 表明态度", icon: "text" }
    ],

    chartScenarios: [
      { id: "dynamic-single", name: "动态 · 单方向", desc: "一个或多个变量同向变化", example: "2023 英二 健康素养" },
      { id: "dynamic-multi", name: "动态 · 多方向", desc: "多个变量有升有降", example: "2019 英二 毕业生去向" },
      { id: "static", name: "静态图", desc: "占比、分布、格局，无时间趋势", example: "2024 英二 劳动实践" },
      { id: "double", name: "双图表", desc: "饼图 + 柱状图 / 两个图表并列", example: "2026 英一 养老机器人" },
      { id: "universal", name: "万能场景", desc: "没把握、看不懂、时间紧时使用", example: "2025 英一 家电表格" }
    ],

    /* 第一段：图表总体描述 */
    overview: {
      "dynamic-single": [
        o("ov-dyn1", "Which 从句",
          "The {chart} above illustrates the changes in {theme} from {year1} to {year2}, during which it {trend}.",
          "上方图表展示了 {year1} 至 {year2} 年间{themeCn}的变化，其在这一时期{trendCn}。",
          ["chart", "theme", "themeCn", "year1", "year2", "trend", "trendCn"],
          "最稳的总体描述句。主题词是实体（行业/城市/国家）时直接作主语；若主题词是数据（水平/率/比例），也可用 The period from... saw... 句式。"),
        o("ov-dyn2", "趋势作宾语",
          "{theme} saw {trendNoun} from {year1} to {year2}, as illustrated in the {chart}.",
          "如该图表所示，{themeCn}在 {year1} 至 {year2} 年间{trendCn}。",
          ["theme", "themeCn", "trendNoun", "trendCn", "year1", "year2", "chart"],
          "趋势名词短语：a steady rise / a sharp decline / a dramatic surge。注意主题词必须是实体，不能是 level / rate。"),
        o("ov-dyn3", "状语式",
          "According to the data given in the {chart}, the {metric} of {subject} climbed steadily from {year1} to {year2}.",
          "根据图中数据，{subjectCn}的{metricCn}在 {year1} 至 {year2} 年间稳步攀升。",
          ["chart", "metric", "metricCn", "subject", "subjectCn", "year1", "year2"],
          "metric 视情况替换为 level / rate / proportion / percentage / number / volume。")
      ],
      "dynamic-multi": [
        o("ov-mul1", "Among which 从句",
          "The {chart} above illustrates the changes in {theme} from {year1} to {year2}, among which the rise in {item1} was the most striking.",
          "上方图表展示了 {year1} 至 {year2} 年间{themeCn}的变化，其中{item1Cn}的上升最为显著。",
          ["chart", "theme", "themeCn", "year1", "year2", "item1", "item1Cn"],
          "先把最醒目的变化抛出来，细节句再补另外两项。"),
        o("ov-mul2", "Divergent + with",
          "{theme} experienced divergent trends from {year1} to {year2}, with {item1} rising most sharply.",
          "{themeCn}在 {year1} 至 {year2} 年间经历了分化性的趋势，其中{item1Cn}上升最为剧烈。",
          ["theme", "themeCn", "year1", "year2", "item1", "item1Cn"],
          "divergent trends 是“多方向”的标签词，比 changes 更精准。"),
        o("ov-mul3", "状语式 + 对比",
          "As reflected in the {chart}, {theme} moved in opposite directions from {year1} to {year2}, {item1} rising while {item2} falling.",
          "如图中数据所示，{themeCn}在 {year1} 至 {year2} 年间朝不同方向变化，{item1Cn}上升而{item2Cn}下降。",
          ["chart", "theme", "themeCn", "year1", "year2", "item1", "item1Cn", "item2", "item2Cn"],
          "若变量有三个，只写对比最鲜明的两个，第三个留给细节句。")
      ],
      "static": [
        o("ov-sta1", "Distribution + with",
          "The {chart} above presents the distribution of {theme} in {year2}, with {item1} accounting for the largest share.",
          "上方图表呈现了 {year2} 年{themeCn}的分布，其中{item1Cn}占比最高。",
          ["chart", "theme", "themeCn", "year2", "item1", "item1Cn"],
          "静态图三件套：distribution 分布 / dominance 主导 / disparity 差距。"),
        o("ov-sta2", "Dominance + with",
          "The {chart} above highlights the dominance of {item1} in {theme}, with it overshadowing all other components.",
          "上方图表突出了{item1Cn}在{themeCn}中的主导地位，其远超其他各项。",
          ["chart", "item1", "item1Cn", "theme", "themeCn"],
          "仅当第一项远高于其他项（断崖式领先）时使用，不要滥用。"),
        o("ov-sta3", "Disparity + with",
          "The {chart} above reveals a striking disparity in {theme}, with the proportions ranging from {vMin} to {vMax}.",
          "上方图表揭示了{themeCn}中显著的差距，各项占比从 {vMin} 到 {vMax} 不等。",
          ["chart", "theme", "themeCn", "vMin", "vMax"],
          "with + 宾语 + 宾补（现在分词），一句话把差距写出来。")
      ],
      "double": [
        o("ov-dbl1", "While 并列",
          "The chart on the left illustrates {leftTopic}, while the chart on the right presents {rightTopic}.",
          "左侧的图展示了{leftTopicCn}，而右侧的图呈现了{rightTopicCn}。",
          ["leftTopic", "leftTopicCn", "rightTopic", "rightTopicCn"],
          "双图表最稳的骨架：左图 + while + 右图。静静 / 动静 / 动动都不换骨架。"),
        o("ov-dbl2", "As for 另起一句",
          "The {chart} above presents {leftTopic}. As for the chart on the right, it shows {rightTopic}.",
          "上面的图呈现了{leftTopicCn}。至于右侧的图，它展示了{rightTopicCn}。",
          ["chart", "leftTopic", "leftTopicCn", "rightTopic", "rightTopicCn"],
          "两句话更清晰，适合左图信息较多时。"),
        o("ov-dbl3", "总分结构",
          "The two charts present {theme}: the {chart} shows {leftTopic}, while the bar chart on the right lists {rightTopic}.",
          "两幅图呈现了{themeCn}：左图显示了{leftTopicCn}，而右侧的柱状图列出了{rightTopicCn}。",
          ["theme", "themeCn", "chart", "leftTopic", "leftTopicCn", "rightTopic", "rightTopicCn"],
          "先总后分，适合两幅图共同服务一个主题。")
      ],
      "universal": [
        o("ov-uni1", "万能变化句",
          "Some remarkable changes in {theme} have taken place in the past few years.",
          "在过去的几年中，{themeCn}发生了一些显著的变化。",
          ["theme", "themeCn"],
          "没把握时的保命句，先把总体描述写出来。"),
        o("ov-uni2", "万能信息句",
          "The {chart} above provides information about {theme} from {year1} to {year2}.",
          "上述图表提供了 {year1} 至 {year2} 年间关于{themeCn}的信息。",
          ["chart", "theme", "themeCn", "year1", "year2"],
          "2025 英一表格可直接套：The table above provides information about..."),
        o("ov-uni3", "万能分布句",
          "The chart above presents {theme}, offering a clear picture of the overall situation.",
          "上方图表呈现了{themeCn}，清晰地展示了整体情况。",
          ["theme", "themeCn"],
          "静态图、双图表都能用，适合时间紧张时。")
      ]
    },

    /* 第一段：图表细节描述 */
    detail: {
      "dynamic-single": [
        o("det-dyn1", "公式 1 · 首尾对比",
          "To be specific, the {metric} of {subject} {trend} from {v1} in {year1} to {v2} in {year2}.",
          "具体而言，{subjectCn}的{metricCn}从 {year1} 年的 {v1} {trendCn}至 {year2} 年的 {v2}。",
          ["metric", "metricCn", "subject", "subjectCn", "trend", "trendCn", "v1", "year1", "v2", "year2"],
          "一个数据也能写满一句：To be specific + 主语 + 动词 + from...to...。"),
        o("det-dyn2", "公式 2 · compared with",
          "To be specific, the {metric} was {v2} in {year2}, compared with {v1} in {year1}, showing an increase of {diff} {unit}.",
          "具体而言，{metricCn}在 {year2} 年为 {v2}，而 {year1} 年为 {v1}，增长了 {diff} 个{unitCn}。",
          ["metric", "metricCn", "v1", "v2", "year1", "year2", "diff", "unit", "unitCn"],
          "对比 + 增量，数据感最强。percentage points 表示“百分点”。"),
        o("det-dyn3", "公式 3 · 倍数",
          "To be specific, the {metric} in {year2} was {multiple} times that in {year1}.",
          "具体而言，{year2} 年的{metricCn}是 {year1} 年的 {multiple} 倍。",
          ["metric", "metricCn", "year2", "multiple", "year1"],
          "2 倍用 twice，3 倍用 triple / three times，以上用 four times。")
      ],
      "dynamic-multi": [
        o("det-mul1", "公式 1 · 三变量分写",
          "To be specific, {item1} {trend1} from {v1} to {v2}. However, {item2} {trend2} from {v3} to {v4}. Meanwhile, {item3} {trend3}, from {v5} to {v6}.",
          "具体而言，{item1Cn}从 {v1} {trend1Cn}至 {v2}；然而，{item2Cn}从 {v3} {trend2Cn}至 {v4}；与此同时，{item3Cn}从 {v5} {trend3Cn}至 {v6}。",
          ["item1", "item1Cn", "trend1", "trend1Cn", "v1", "v2", "item2", "item2Cn", "trend2", "trend2Cn", "v3", "v4", "item3", "item3Cn", "trend3", "trend3Cn", "v5", "v6"],
          "三个数据用三种动词和副词（decreased remarkably / climbed significantly / rose slightly）避免句式单调。主语用名词短语，动词用过去式。"),
        o("det-mul2", "公式 2 · 重点两项",
          "To be specific, the proportion of {subject} choosing {item1} fell from {v1} to {v2}, whereas that choosing {item2} rose from {v3} to {v4}.",
          "具体而言，选择{item1Cn}的{subjectCn}比例从 {v1} 降至 {v2}，而选择{item2Cn}的比例则从 {v3} 升至 {v4}。",
          ["subject", "subjectCn", "item1", "item1Cn", "v1", "v2", "item2", "item2Cn", "v3", "v4"],
          "whereas 连接对比，句型比 However 更紧凑。")
      ],
      "static": [
        o("det-sta1", "公式 1 · 四项并列 + 排名",
          "To be specific, {item1}, {item2}, {item3} and {item4} account for {v1}, {v2}, {v3} and {v4} respectively. Notably, {item1} tops the list, at {v1}, followed by {item2} at {v2}.",
          "具体而言，{item1Cn}、{item2Cn}、{item3Cn}和{item4Cn}分别占 {v1}、{v2}、{v3} 和 {v4}。值得注意的是，{item1Cn}居首，占 {v1}，其次是{item2Cn}，占 {v2}。",
          ["item1", "item1Cn", "item2", "item2Cn", "item3", "item3Cn", "item4", "item4Cn", "v1", "v2", "v3", "v4"],
          "主语直接用四个项目并列，避免 who 后面接动名词的语法坑。排名写两项即可，避免头重脚轻。"),
        o("det-sta2", "公式 2 · 精简排名",
          "To be specific, {item1} ranks first at {v1}, followed by {item2} at {v2}, while {item3} accounts for only {v3}.",
          "具体而言，{item1Cn}以 {v1} 居首，其次是 {v2} 的{item2Cn}，而{item3Cn}仅占 {v3}。",
          ["item1", "item1Cn", "v1", "item2", "item2Cn", "v2", "item3", "item3Cn", "v3"],
          "数据多、字数紧时用精简版，只写前三项。")
      ],
      "double": [
        o("det-dbl1", "双图分述",
          "To be specific, {leftDetail}. As for the right chart, {rightDetail}.",
          "具体而言，{leftDetailCn}。至于右图，{rightDetailCn}。",
          ["leftDetail", "leftDetailCn", "rightDetail", "rightDetailCn"],
          "左图写一句、右图写一句，中间用 As for 切换。数据不必求全，抓最醒目的两项。"),
        o("det-dbl2", "双图合并",
          "To be specific, {leftDetail}, while the right chart reveals that {rightDetail}.",
          "具体而言，{leftDetailCn}，而右图揭示出{rightDetailCn}。",
          ["leftDetail", "leftDetailCn", "rightDetail", "rightDetailCn"],
          "用 while 把两幅图压进一句，适合字数紧张时。")
      ],
      "universal": [
        o("det-uni1", "自由细节句",
          "To be specific, {detailSentence}.",
          "具体而言，{detailSentenceCn}。",
          ["detailSentence", "detailSentenceCn"],
          "把图表里最醒目的数字用自己的话写出来即可，先求有，再求准。")
      ]
    },

    /* 第一段：社会现象 */
    phenomenonTransition: [
      o("ph-t1", "数据结论", "These data lead us to the conclusion that", "这些数据使我们得出结论：", [], "最百搭的过渡句，后面直接接社会现象，两句合成一句。"),
      o("ph-t2", "统计明显", "It is apparent from the statistics that", "从统计数据可以明显看出：", [], "阅卷老师最熟悉、最安全的过渡。"),
      o("ph-t3", "看似简单", "Despite its apparent simplicity, the chart highlights the core information that", "尽管它看似简单，这幅图却突出了核心信息：", [], "适合静态图，语气比 It is apparent 更高级。"),
      o("ph-t4", "明确传达", "The chart clearly communicates its intended meaning:", "这幅图清楚地传达了它的意图：", [], "冒号后直接写现象，干净利落。")
    ],
    phenomenon: [
      o("ph-1", "迅速发展", "{theme} has been developing rapidly in recent years.", "{themeCn}近年来迅速发展。", ["theme", "themeCn"], "实体主题词（行业/经济/文旅）搭配 develop；水平/率/数量搭配 improve / rise。"),
      o("ph-2", "越来越多人", "an increasing number of {subject} tend to {action} when they are able.", "越来越多的{subjectCn}在有条件时倾向于{actionCn}。", ["subject", "subjectCn", "action", "actionCn"], "people 要换成具体对象：residents / undergraduates / consumers / parents。"),
      o("ph-3", "变得普遍", "{gerund} is becoming common among {subject}.", "{gerundCn}在{subjectCn}中正变得普遍。", ["gerund", "gerundCn", "subject", "subjectCn"], "gerund 用动名词：pursuing further education / working part-time。"),
      o("ph-4", "引起关注", "{theme} has drawn growing attention from the public.", "{themeCn}日益受到公众关注。", ["theme", "themeCn"], "态度型图表（养老机器人、户外活动）首选。可加 with safety as their top concern。"),
      o("ph-6", "公众兴趣", "there has been a growing public interest in {theme}.", "公众对{themeCn}的关注日益增加。", ["theme", "themeCn"], "万能社会现象句，单复数都安全；接在 that 后面最顺。"),
      o("ph-5", "万能现象", "this is a common phenomenon in modern society.", "这是当今社会一个普遍现象。", [], "不需要补充任何成分，时间紧时保命。")
    ],

    /* 图画第一段 */
    pictureIntro: [
      o("pic-in1", "单图 · 象征描绘",
        "As is symbolically depicted in the {pictureType} above, {scene}.",
        "如上图象征性地描绘的那样，{sceneCn}。",
        ["pictureType", "scene", "sceneCn"],
        "公式：环境 + 基本动作 + 主体，主要动作(doing)，with 细节。环境不清就用 in front of us。"),
      o("pic-in2", "单图 · 发人深省",
        "The {pictureType} above presents us with a thought-provoking scene: {scene}.",
        "上面的图画向我们呈现了一个发人深省的场景：{sceneCn}。",
        ["pictureType", "scene", "sceneCn"],
        "冒号后写完整场景，适合画面信息较多时。"),
      o("pic-in3", "对话图",
        "As is symbolically depicted in the {pictureType} above, {scene}. {speakerA} argues that {viewA}. By contrast, {speakerB} maintains that {viewB}.",
        "如上图象征性地描绘的那样，{sceneCn}。{speakerACn}认为{viewACn}；相比之下，{speakerBCn}坚持认为{viewBCn}。",
        ["pictureType", "scene", "sceneCn", "speakerA", "speakerACn", "viewA", "viewACn", "speakerB", "speakerBCn", "viewB", "viewBCn"],
        "对话图推荐“转述”而不是直译：argue / maintain / contend / hold the view that。"),
      o("pic-in4", "两幅图",
        "The cartoons provide us with a thought-provoking scene: {sceneLeft}. However, {sceneRight}.",
        "漫画为我们呈现了一个发人深省的场景：{sceneLeftCn}。然而，{sceneRightCn}。",
        ["sceneLeft", "sceneLeftCn", "sceneRight", "sceneRightCn"],
        "相似用 Similarly / Likewise，对比用 While / However，递进用 Moreover。"),
      o("pic-in5", "图画 + 图表",
        "As is vividly depicted in the cartoon and clearly shown in the chart above, {scene}, and {chartSummary}.",
        "正如漫画生动描绘、上图清楚展示的那样，{sceneCn}，并且{chartSummaryCn}。",
        ["scene", "sceneCn", "chartSummary", "chartSummaryCn"],
        "2024 英一题型：图画描述 + 图表总体描述的简单叠加，细节不必求全。")
    ],
    pictureThemeTransition: [
      o("pic-t1", "首要意图", "The primary intention of the {pictureType} is to remind {audience} that", "这幅图的首要意图是提醒{audienceCn}：", ["pictureType", "audience", "audienceCn"], "audience 越具体越好：the whole society / undergraduates / parents。"),
      o("pic-t2", "简单却含真理", "Simple as the {pictureType} is, it conveys a truth that", "图画虽然简单，却蕴含着一个真理：", ["pictureType"], "Simple as...is 是倒装让步，阅卷老师很吃这一套。"),
      o("pic-t3", "强调核心", "The {pictureType}, undoubtedly, emphasizes the core idea that", "这幅图毫无疑问强调了这样的核心观点：", ["pictureType"], "适合主题明确的单图。"),
      o("pic-t4", "镜像现象", "What the {pictureType} above mirrors is a thought-provoking phenomenon that", "上图所反映的是一个发人深省的现象：", ["pictureType"], "mirror 作动词，比 show 更有画面感。")
    ],
    pictureIdea: [
      o("pic-i1", "如此重要", "{theme} is so indispensable that the subject deserves the highest level of attention and consideration.", "{themeCn}如此不可或缺，值得给予最高程度的关注与思考。", ["theme", "themeCn"], "主题词要具体到事：environmental protection / cultural inheritance / perseverance。"),
      o("pic-i2", "高度重视", "the utmost importance ought to be attached to {theme} by {agent}.", "{agentCn}应当对{themeCn}给予高度重视。", ["theme", "themeCn", "agent", "agentCn"], "agent 一般指 government / the public / universities / individuals。"),
      o("pic-i3", "重大成就", "great accomplishments have been made in {theme} by {agent}.", "{agentCn}在{themeCn}方面取得了巨大成就。", ["theme", "themeCn", "agent", "agentCn"], "适合政府主导的公共建设、环保、文化保护类主题。"),
      o("pic-i4", "双重否定", "at no time should the public underestimate the significance of {theme}.", "公众任何时候都不应低估{themeCn}的重要性。", ["theme", "themeCn"], "双重否定 + 倒装，语气强，适合品德、孝道、坚持类主题。"),
      o("pic-i5", "强调句型", "it is {theme} that deserves greater attention.", "正是{themeCn}值得更多关注。", ["theme", "themeCn"], "It is...that... 强调句，适合创新、合作、选择等主题。")
    ],

    /* 文字作文第一段 */
    textIntro: [
      o("txt-in1", "不可否认", "It cannot be denied that {theme} plays a key role in people's work and life.", "不可否认，{themeCn}在人们的工作和生活中扮演着重要角色。", ["theme", "themeCn"], "不会改写时的保底引出主题句。"),
      o("txt-in2", "众所周知", "Nowadays, it is well-known that the phenomenon of {theme} has caused wide concern.", "如今，众所周知，{themeCn}现象已引起广泛关注。", ["theme", "themeCn"], "适合社会问题类文字材料。"),
      o("txt-in3", "普遍现象", "With the rapid advancement of society and technology, {theme} has become a common phenomenon in our daily lives.", "随着社会和科技的快速发展，{themeCn}已成为我们日常生活中的普遍现象。", ["theme", "themeCn"], "万能开头，适合科技、教育、生活方式类材料。"),
      o("txt-in4", "争议话题", "Currently, whether to {choice1} or {choice2} has become a hot topic among people, especially among the young.", "目前，是{choice1Cn}还是{choice2Cn}已成为人们、尤其是年轻人中的热门话题。", ["choice1", "choice1Cn", "choice2", "choice2Cn"], "二选一型文字材料专用。")
    ],
    textView: [
      o("txt-v1", "作者认为", "The author believes that {authorIdea}.", "作者认为，{authorIdeaCn}。", ["authorIdea", "authorIdeaCn"], "改写观点时保留核心意思，不要加入自己的评价。"),
      o("txt-v2", "因此作者", "Therefore, the author holds that {authorIdea}.", "因此，作者认为{authorIdeaCn}。", ["authorIdea", "authorIdeaCn"], "holds that 比 believes 更正式。"),
      o("txt-v3", "根据作者", "According to the author, {authorIdea}.", "根据作者的观点，{authorIdeaCn}。", ["authorIdea", "authorIdeaCn"], "最简洁的转述句。"),
      o("txt-v4", "在作者看来", "In the opinion of the author, {authorIdea}.", "在作者看来，{authorIdeaCn}。", ["authorIdea", "authorIdeaCn"], "适合作者观点较长时。")
    ],
    stance: [
      o("st-1", "强烈同意", "I fully agree with the author's viewpoint.", "我完全同意作者的观点。", [], "题干要求“说明是否同意”，这句必须有。"),
      o("st-2", "强烈反对", "I strongly disagree with the author's opinion.", "我强烈反对作者的观点。", [], "反对时，第二段要给出反驳理由。"),
      o("st-3", "部分同意", "I share the author's view to a large extent, but I also believe that {reservation}.", "我在很大程度上同意作者的观点，但我也认为{reservationCn}。", ["reservation", "reservationCn"], "部分同意最稳妥，但必须把保留意见写清楚。")
    ],

    /* 第二段 */
    transition: [
      o("tr-1", "三个关键原因", "Three key reasons, from my perspective, account for this phenomenon.", "在我看来，三个关键原因可以解释这一现象。", [], "最简洁，直接引出三点。"),
      o("tr-2", "归结为三方面", "From my perspective, the causes of {theme} can be summarized as three main aspects.", "在我看来，{themeCn}的成因可以归结为三个主要方面。", ["theme", "themeCn"], "适合主题词较短时。"),
      o("tr-3", "多个因素", "Several factors contribute to this phenomenon.", "几个因素促成了这一现象。", [], "不数字数，最安全。"),
      o("tr-4", "多种原因", "A variety of reasons can be cited to account for this phenomenon.", "有很多原因可以用来解释这一现象。", [], "句式比 There are many reasons 高级。"),
      o("tr-5", "因素组合", "A combination of factors has contributed to the tendency reflected in this chart.", "多种因素共同促成了这张图表所反映的趋势。", [], "图表作文专用，注意 chart 可换成 picture。")
    ],

    reasonSchemes: [
      {
        id: "example", name: "举例论证", tag: "个人路线", desc: "用一个身边例子把道理落地，最像“自己写的”。",
        options: [
          o("rs-ex1", "四步组装",
            "For instance, {exampleSubject}, {exampleDetail}, which {exampleBenefit}. {exampleResult}",
            "例如，{exampleSubjectCn}，{exampleDetailCn}，这{exampleBenefitCn}。{exampleResultCn}",
            ["exampleSubject", "exampleSubjectCn", "exampleDetail", "exampleDetailCn", "exampleBenefit", "exampleBenefitCn", "exampleResult", "exampleResultCn"],
            "四步：引出例子 → 描述现状 → which 写好处 → 换角度写结果。例：my roommate Kevin, who is passionate about reading, which brings him exceptional writing skills.")
        ]
      },
      {
        id: "public", name: "群众路线", tag: "大多数人", desc: "宾语从句 + 定语从句，稳且长。",
        options: [
          o("rs-pub1", "大多数人相信",
            "The majority of {subject} believe that {theme} will provide them with a broader platform to {action}, which may put them in a beneficial position in the future.",
            "大多数{subjectCn}认为，{themeCn}将为他们提供一个更广阔的平台去{actionCn}，这可能让他们在未来处于有利位置。",
            ["subject", "subjectCn", "theme", "themeCn", "action", "actionCn"],
            "believe 可替换为 maintain / hold the view that / are convinced。优势：句子长、逻辑顺。")
        ]
      },
      {
        id: "clause", name: "从句 + 六大方面", tag: "万能论证", desc: "主语从句 / 宾语从句 / 同位语从句 + 好处。",
        options: [
          o("rs-cl1", "无人能否认",
            "Definitely no one can deny the fact that {theme} plays a crucial role in {benefit}.",
            "没有人能否认：{themeCn}在{benefitCn}方面起着至关重要的作用。",
            ["theme", "themeCn", "benefit", "benefitCn"],
            "六大方面：社会、自然、文化、个人、交流、科技。benefit 直接从中选。"),
          o("rs-cl2", "越来越多人意识到",
            "An increasing number of people are beginning to realize that {benefit} is strongly dependent on {theme}.",
            "越来越多的人开始意识到，{benefitCn}高度依赖于{themeCn}。",
            ["benefit", "benefitCn", "theme", "themeCn"],
            "注意主谓一致：benefit 是复数时用 are dependent on。"),
          o("rs-cl3", "密不可分",
            "There is no doubt that {theme} is inextricably linked to {benefit}.",
            "毫无疑问，{themeCn}与{benefitCn}密不可分。",
            ["theme", "themeCn", "benefit", "benefitCn"],
            "inextricably linked 是高分搭配，适合经济、科技、环境类。")
        ]
      },
      {
        id: "notonly", name: "Not only 倒装", tag: "递进", desc: "不仅……而且……，句式分高。",
        options: [
          o("rs-no1", "Not only 倒装",
            "Not only does {theme} improve {benefit1}, but it also enables {subject} to {action}.",
            "{themeCn}不仅改善{benefit1Cn}，还使{subjectCn}能够{actionCn}。",
            ["theme", "themeCn", "benefit1", "benefit1Cn", "subject", "subjectCn", "action", "actionCn"],
            "主语是复数时用 Not only do；but also 后主语用 they。")
        ]
      },
      {
        id: "virtual", name: "虚拟语气", tag: "扣帽子", desc: "如果忽视……，个人 / 社会 / 国家会怎样。",
        options: [
          o("rs-v1", "个人层面",
            "If we ignored the importance of {theme}, we would never become a better version of ourselves.",
            "如果我们忽视{themeCn}的重要性，我们就永远不会成为更好的自己。",
            ["theme", "themeCn"],
            "建议放在原因三，段尾给人警醒。"),
          o("rs-v2", "社会层面",
            "If everyone failed to {action}, our society would be confronted with an unpromising and fruitless future.",
            "如果每个人都不去{actionCn}，我们的社会将面临一个没有希望、没有成果的未来。",
            ["action", "actionCn"],
            "fails 变 failed，will 变 would，其余不变。"),
          o("rs-v3", "国家层面",
            "If we underestimated the importance of {theme}, our nation would permanently lag behind in the new era of rapid development.",
            "如果我们低估{themeCn}的重要性，我们的国家将在快速发展的新时代永远落后。",
            ["theme", "themeCn"],
            "语气最重，适合科技、教育、环保等国家战略主题。")
        ]
      },
      {
        id: "contrast", name: "对比论证", tag: "创造对比", desc: "与另一个选项对比，突出主线。",
        options: [
          o("rs-co1", "Compared with",
            "Compared with {alternative}, {theme} can {benefit1}, thereby promoting {benefit2}.",
            "与{alternativeCn}相比，{themeCn}能够{benefit1Cn}，从而促进{benefit2Cn}。",
            ["alternative", "alternativeCn", "theme", "themeCn", "benefit1", "benefit1Cn", "benefit2", "benefit2Cn"],
            "没有对比就创造对比：compared with indoor activities / traditional human care。"),
          o("rs-co2", "In contrast to",
            "In contrast to {alternative}, the advantage of {theme} lies in {benefit}.",
            "与{alternativeCn}相比，{themeCn}的优势在于{benefitCn}。",
            ["alternative", "alternativeCn", "theme", "themeCn", "benefit", "benefitCn"],
            "lie in 后面接名词或动名词。")
        ]
      },
      {
        id: "metaphor", name: "比喻句", tag: "文采", desc: "灯塔 / 钥匙 / 引擎 / 桥梁 / 基石。",
        options: [
          o("rs-me1", "钥匙",
            "{ThemeCap} is the key that unlocks the door to {benefit}.",
            "{themeCn}是开启{benefitCn}之门的钥匙。",
            ["ThemeCap", "theme", "themeCn", "benefit", "benefitCn"],
            "ThemeCap 是首字母大写的主题词，如 Perseverance。"),
          o("rs-me2", "引擎",
            "{ThemeCap} is the engine that propels {benefit}.",
            "{themeCn}是推动{benefitCn}的引擎。",
            ["ThemeCap", "theme", "themeCn", "benefit", "benefitCn"],
            "适合意志品质、行动实践、创新类主题。"),
          o("rs-me3", "桥梁",
            "{ThemeCap} is the bridge between {subject} and {benefit}.",
            "{themeCn}是连接{subjectCn}与{benefitCn}的桥梁。",
            ["ThemeCap", "theme", "themeCn", "subject", "subjectCn", "benefit", "benefitCn"],
            "适合合作、沟通、文化、户外活动类主题。"),
          o("rs-me4", "基石",
            "{ThemeCap} is the foundation upon which we build {benefit}.",
            "{themeCn}是我们构建{benefitCn}的基石。",
            ["ThemeCap", "theme", "themeCn", "benefit", "benefitCn"],
            "适合诚信、教育、制度、基础设施类主题。")
        ]
      }
    ],

    connectors: [
      { id: "c1", en: "Firstly, ... Secondly, ... Thirdly, ...", cn: "第一……第二……第三……" },
      { id: "c2", en: "To begin with, ... What's more, ... Last but not least, ...", cn: "首先……此外……最后但同样重要的是……" },
      { id: "c3", en: "To begin with, ... More importantly, ... Most importantly, ...", cn: "首先……更重要的是……最重要的是……" },
      { id: "c4", en: "For one thing, ... For another, ...", cn: "一方面……另一方面……" },
      { id: "c5", en: "First and foremost, ... Furthermore, ... Last but not least, ...", cn: "首先……此外……最后但同样重要的是……" }
    ],

    /* 第三段 */
    conclusion: [
      o("con-1", "足够重视", "All in all, it is not difficult to draw the conclusion that enough attention must be paid to {theme} by ourselves and our community.", "总而言之，不难得出结论：我们自身和全社会都必须对{themeCn}给予足够重视。", ["theme", "themeCn"], "All in all / To sum up / In general / On the whole 任选。"),
      o("con-2", "牢记重要性", "To sum up, we should bear in mind that {theme} is of great importance to {benefit}.", "总之，我们应牢记，{themeCn}对{benefitCn}至关重要。", ["theme", "themeCn", "benefit", "benefitCn"], "特别适合意志品质类作文。"),
      o("con-3", "不是选择而是必需", "In general, the discussion leads us to the realization that {theme} is not an option, but a necessity.", "总的来说，讨论使我们认识到，{themeCn}不是一种选择，而是一种必需。", ["theme", "themeCn"], "句式高级，适合文化传承、高质量生活、养老等主题。"),
      o("con-4", "不可否认的事实", "On the whole, we are faced with the undeniable fact that {theme} has become an integral part of our lives.", "总的来说，我们面临一个不可否认的事实：{themeCn}已成为我们生活中不可或缺的一部分。", ["theme", "themeCn"], "适合互联网、手机、家电、机器人等已普及的事物。")
    ],
    measures: [
      o("me-gov", "政府作为", "For one thing, it is imperative for the authorities to formulate policies to {action}.", "一方面，当局必须制定政策来{actionCn}。", ["action", "actionCn"], "政府角度：make strict laws / allocate more funds / launch public initiatives。"),
      o("me-citizen", "公民意识", "For another, we should raise public awareness of {theme}.", "另一方面，我们应该提高公众对{themeCn}的意识。", ["theme", "themeCn"], "公民意识是最百搭的第二角度。"),
      o("me-individual", "个人行为", "We should spare no pains to {action} and make our society better.", "我们应该不遗余力地{actionCn}，让社会变得更好。", ["action", "actionCn"], "个人行为：spare no pains to / make concerted efforts to / take concrete steps to。"),
      o("me-media", "媒体呼吁", "New media platforms, ranging from short video apps to social media, should appeal to users to {action}.", "新媒体平台，从短视频应用到社交媒体，应该呼吁用户{actionCn}。", ["action", "actionCn"], "媒体角度最容易被忽略，也最容易写出差异化。"),
      o("me-family", "家庭教育", "Parents and teachers should set a good example for children in {action}.", "家长和老师应在{actionCn}方面为孩子树立榜样。", ["action", "actionCn"], "教育类、习惯类、环保类主题都适用。"),
      o("me-enterprise", "企业责任", "Enterprises ought to spare no pains to improve product quality and {action}.", "企业应该不遗余力地提高产品质量并{actionCn}。", ["action", "actionCn"], "科技产品、家电、养老机器人等主题适用。")
    ],
    future: [
      o("fu-1", "和谐平衡", "If these proposed measures are implemented, a harmonious balance between {benefit1} and {benefit2} will be within our reach.", "如果这些提议的措施得以实施，{benefit1Cn}与{benefit2Cn}之间的和谐平衡将触手可及。", ["benefit1", "benefit1Cn", "benefit2", "benefit2Cn"], "需要小改以适配题目，但画面感强。"),
      o("fu-2", "共同努力", "Only through the joint efforts of all people can we effectively {action} and embrace a better future.", "只有通过所有人的共同努力，我们才能有效{actionCn}，拥抱更好的未来。", ["action", "actionCn"], "Only through...can we... 倒装，气势足。"),
      o("fu-3", "光明未来", "In this way, hopefully, we may embrace a brighter and more promising future.", "这样，我们才有希望拥抱一个更光明、更有希望的未来。", [], "万能保命句，不需要修改。"),
      o("fu-4", "此刻行动", "There is no better time than now for us to take collective and decisive action to address this pressing issue.", "现在是我们采取集体、果断行动解决这一紧迫问题的最佳时机。", [], "万能句，适合问题类主题。")
    ],
    trendPrediction: [
      o("tp-1", "持续增长", "Taking into account all the factors discussed above, we may reasonably conclude that the number of people who choose to {action} will continue to increase in the coming years.", "综合考虑上述因素，我们可以合理得出结论：未来几年选择{actionCn}的人数将持续增加。", ["action", "actionCn"], "图表第三段的替代写法：总结 + 趋势预测，比措施简单。"),
      o("tp-2", "趋势延续", "For the reasons given above, we can predict that an increasing number of people will focus on {theme}, and this trend is likely to continue in the near future.", "基于上述原因，我们可以预测，越来越多的人将关注{themeCn}，这一趋势在不久的将来很可能持续。", ["theme", "themeCn"], "静态图、动态图都能用。"),
      o("tp-3", "更大规模", "Given the arguments above, the next few years will also witness larger-scale, faster-paced and higher-quality development in {theme}.", "鉴于上述论点，未来几年{themeCn}也将迎来更大规模、更快速度和更高水平的发展。", ["theme", "themeCn"], "适合行业、科技、经济类主题。"),
      o("tp-4", "积极影响", "In conclusion, the phenomenon reflected in the chart is bound to continue, and it will keep exerting a positive influence on {benefit}.", "总之，图表所反映的现象必将持续，并将继续对{benefitCn}产生积极影响。", ["benefit", "benefitCn"], "静态图收尾很稳。")
    ],

    /* 六大方面语料库 */
    aspects: {
      social: {
        name: "社会方面", core: "发展 / 服务 / 和谐",
        items: [
          { en: "social progress", cn: "社会进步" },
          { en: "sustained and healthy growth", cn: "持续健康发展" },
          { en: "high-quality development", cn: "高质量发展" },
          { en: "rapid economic growth", cn: "快速经济增长" },
          { en: "economic prosperity", cn: "经济繁荣" },
          { en: "disposable income", cn: "可支配收入" },
          { en: "rural revitalization", cn: "乡村振兴" },
          { en: "employment promotion", cn: "促进就业" },
          { en: "people's livelihood", cn: "民生" },
          { en: "public services", cn: "公共服务" },
          { en: "infrastructure development", cn: "基础设施建设" },
          { en: "elderly care services", cn: "养老服务" },
          { en: "social harmony", cn: "社会和谐" },
          { en: "common prosperity", cn: "共同富裕" },
          { en: "education equity", cn: "教育公平" }
        ]
      },
      nature: {
        name: "自然方面", core: "持续 / 保护 / 和谐",
        items: [
          { en: "sustainable development", cn: "可持续发展" },
          { en: "green transformation", cn: "绿色转型" },
          { en: "natural ecological balance", cn: "自然生态平衡" },
          { en: "environmental awareness", cn: "环保意识" },
          { en: "carbon emissions reduction", cn: "碳减排" },
          { en: "green transportation", cn: "绿色出行" },
          { en: "waste classification and recycling", cn: "垃圾分类与回收" },
          { en: "improve the ecological environment", cn: "改善生态环境" },
          { en: "harmony between humanity and nature", cn: "人与自然和谐共生" },
          { en: "connection with nature", cn: "与自然的联结" },
          { en: "liveable environment", cn: "宜居环境" }
        ]
      },
      culture: {
        name: "文化方面", core: "传承 / 交流 / 包容",
        items: [
          { en: "cultural protection", cn: "文化保护" },
          { en: "digital preservation", cn: "数字化保护" },
          { en: "inherit and develop traditional culture", cn: "继承和发扬传统文化" },
          { en: "cultural exchange", cn: "文化交流" },
          { en: "people-to-people exchange", cn: "人文交流" },
          { en: "cultural diversity", cn: "文化多样性" },
          { en: "open and inclusive attitude", cn: "开放包容的态度" },
          { en: "respect different customs", cn: "尊重不同风俗" },
          { en: "cultural confidence", cn: "文化自信" },
          { en: "cultural identity", cn: "文化认同" },
          { en: "cultural prosperity", cn: "文化繁荣" }
        ]
      },
      personal: {
        name: "个人方面", core: "成长 / 健康 / 学习",
        items: [
          { en: "personal growth", cn: "个人成长" },
          { en: "all-round development", cn: "全面发展" },
          { en: "self-improvement", cn: "自我提升" },
          { en: "physical and mental health", cn: "身心健康" },
          { en: "healthy lifestyle", cn: "健康生活方式" },
          { en: "quality of life", cn: "生活质量" },
          { en: "psychological resilience", cn: "心理素质" },
          { en: "work-life balance", cn: "工作与生活平衡" },
          { en: "relieve stress", cn: "缓解压力" },
          { en: "lifelong learning", cn: "终身学习" },
          { en: "observational skills", cn: "观察力" },
          { en: "practical skills", cn: "动手能力" },
          { en: "curiosity and exploration", cn: "好奇心与探索" },
          { en: "expand our horizons", cn: "开拓眼界" },
          { en: "boost self-confidence", cn: "提升自信" },
          { en: "develop critical thinking", cn: "培养批判性思维" },
          { en: "parent-child interaction", cn: "亲子互动" },
          { en: "self-realization", cn: "自我实现" },
          { en: "a sense of well-being", cn: "幸福感" }
        ]
      },
      communication: {
        name: "交流方面", core: "沟通 / 连接 / 共赢",
        items: [
          { en: "effective communication", cn: "有效沟通" },
          { en: "facilitate effective communication", cn: "促进有效沟通" },
          { en: "information security", cn: "信息安全" },
          { en: "privacy protection", cn: "隐私保护" },
          { en: "bridge communication gaps", cn: "弥合沟通鸿沟" },
          { en: "strengthen interpersonal ties", cn: "加强人际联系" },
          { en: "facilitate information sharing", cn: "促进信息共享" },
          { en: "enhance mutual understanding", cn: "增进相互理解" },
          { en: "build consensus", cn: "建立共识" },
          { en: "collaborate for win-win outcomes", cn: "合作共赢" },
          { en: "deepen friendship", cn: "增进友谊" }
        ]
      },
      technology: {
        name: "科技方面", core: "创新 / 转型 / 赋能",
        items: [
          { en: "technological innovation", cn: "科技创新" },
          { en: "innovation-driven development", cn: "创新驱动发展" },
          { en: "digital transformation", cn: "数字化转型" },
          { en: "industrial upgrading", cn: "产业升级" },
          { en: "new quality productive forces", cn: "新质生产力" },
          { en: "artificial intelligence", cn: "人工智能" },
          { en: "intelligent devices", cn: "智能设备" },
          { en: "smart city construction", cn: "智慧城市建设" },
          { en: "high-end manufacturing", cn: "高端制造" }
        ]
      }
    }
  };

  /* ------------------------------------------------------------------------
     小作文
     ------------------------------------------------------------------------ */
  const small = {
    types: [
      { id: "letter", name: "书信", en: "Letter / Email", desc: "建议、邀请、推荐、感谢、道歉、投诉、咨询、答复等" },
      { id: "notice", name: "通知 / 告示", en: "Notice", desc: "公开宣布活动、会议、比赛、招募等" },
      { id: "minutes", name: "纪要", en: "Minutes", desc: "会议纪要，格式固定，本质仍是书信" }
    ],

    letterSubtypes: [
      { id: "suggest", name: "建议信", mode: "active" },
      { id: "invite", name: "邀请信", mode: "active" },
      { id: "recommend", name: "推荐信", mode: "active" },
      { id: "thank", name: "感谢信", mode: "active" },
      { id: "apologize", name: "道歉信", mode: "active" },
      { id: "complain", name: "投诉信", mode: "active" },
      { id: "inquire", name: "咨询信", mode: "active" },
      { id: "reply", name: "答复信", mode: "passive" },
      { id: "introduce", name: "介绍信", mode: "active" },
      { id: "apply", name: "求职 / 申请信", mode: "active" },
      { id: "resign", name: "辞职信", mode: "active" },
      { id: "help", name: "求助信", mode: "active" },
      { id: "congratulate", name: "祝贺信", mode: "active" },
      { id: "other", name: "其他", mode: "active" }
    ],

    salutations: [
      { id: "sa1", en: "Dear Mr. {lastName},", cn: "尊敬的 {lastName} 先生：" },
      { id: "sa2", en: "Dear Ms. {lastName},", cn: "尊敬的 {lastName} 女士：" },
      { id: "sa3", en: "Dear {firstName},", cn: "亲爱的 {firstName}：" },
      { id: "sa4", en: "Dear Professor,", cn: "尊敬的教授：" },
      { id: "sa5", en: "Dear Editor,", cn: "尊敬的编辑：" },
      { id: "sa6", en: "Dear Sir or Madam,", cn: "尊敬的先生或女士：" },
      { id: "sa7", en: "Dear Friends,", cn: "亲爱的朋友们：" }
    ],

    greetings: [
      o("gr-1", "展信佳", "I hope this letter/email finds you well and {context}.", "展信佳，{contextCn}。", ["context", "contextCn"], "被动回复信最稳的寒暄。"),
      o("gr-2", "很高兴收到来信", "It was a great pleasure to receive your email.", "收到您的来信，我深感愉快。", [], "不需要填空，万能。"),
      o("gr-3", "感谢来信", "Thanks for your email. I am very glad to hear that {news}.", "谢谢你的来信。很高兴得知{newsCn}。", ["news", "newsCn"], "答复信专用：先把对方来信的内容复述一句。"),
      o("gr-4", "感谢分享", "Thank you for sharing {thing} with me. I truly enjoyed it.", "感谢你与我分享{thingCn}，我真的很喜欢。", ["thing", "thingCn"], "2026 英二答复信可直接套。")
    ],

    purposes: [
      { id: "pu-thank", type: "thank", en: "express my sincere gratitude for your warm reception", cn: "对你热情的接待表达诚挚的感谢" },
      { id: "pu-invite", type: "invite", en: "invite you to participate in the {event}", cn: "邀请你参加{eventCn}" },
      { id: "pu-recommend", type: "recommend", en: "recommend {object} to you", cn: "向你推荐{objectCn}" },
      { id: "pu-suggest", type: "suggest", en: "offer some suggestions on {topic}", cn: "就{topicCn}提出一些建议" },
      { id: "pu-apologize", type: "apologize", en: "apologize for {mistake}", cn: "为{mistakeCn}道歉" },
      { id: "pu-complain", type: "complain", en: "complain about {issue}", cn: "投诉{issueCn}" },
      { id: "pu-inquire", type: "inquire", en: "inquire about {details}", cn: "咨询{detailsCn}" },
      { id: "pu-reply", type: "reply", en: "reply to your email and answer your questions", cn: "回复你的邮件并回答你的问题" },
      { id: "pu-introduce", type: "introduce", en: "introduce {object} to you", cn: "向你介绍{objectCn}" },
      { id: "pu-apply", type: "apply", en: "apply for {position}", cn: "申请{positionCn}" },
      { id: "pu-help", type: "help", en: "seek your assistance with {issue}", cn: "就{issueCn}向你求助" },
      { id: "pu-resign", type: "resign", en: "submit my resignation from my present position", cn: "辞去我目前的职位" },
      { id: "pu-congratulate", type: "congratulate", en: "congratulate you on {achievement}", cn: "祝贺你{achievementCn}" },
      { id: "pu-accept", type: "reply", en: "accept your invitation", cn: "接受你的邀请" },
      { id: "pu-decline", type: "reply", en: "decline your invitation", cn: "婉拒你的邀请" },
      { id: "pu-share", type: "reply", en: "share my feelings about {thing} and learn more about {details}", cn: "分享我对{thingCn}的感受，并了解更多{detailsCn}" }
    ],

    selfIntro: [
      o("si-1", "学生身份", "I am a student from the {department} at {university}.", "我是{universityCn}{departmentCn}的一名学生。", ["department", "departmentCn", "university", "universityCn"], "公务信函对方不知道你是谁，必须自我介绍。"),
      o("si-2", "学生会身份", "As a member of the Student Union, I am writing to {purpose}.", "作为学生会的一员，我写信是为了{purposeCn}。", ["purpose", "purposeCn"], "把自我介绍融进开头，省字数。"),
      o("si-3", "默认学生", "I am an undergraduate at a university, majoring in {major}.", "我是一名大学本科生，专业是{majorCn}。", ["major", "majorCn"], "题干没给身份时，默认自己是学生。")
    ],

    secondTransitions: [
      o("st-1", "两个/三个因素", "There are at least two factors accounting for my {noun}.", "我的{nounCn}至少有两个原因。", ["noun", "nounCn"], "noun 用建议、投诉、邀请等的名词形式：suggestion / complaint / invitation。"),
      o("st-2", "原因如下", "The primary reasons for my {noun} are as follows.", "我{nounCn}的主要原因如下。", ["noun", "nounCn"], "最正式的过渡句。"),
      o("st-3", "细节如下", "The details can be listed as follows.", "具体细节如下。", [], "介绍活动、安排时最好用。"),
      o("st-4", "逐一回答", "As for the questions you raised, here are my answers.", "关于你提出的问题，以下是我的回答。", [], "答复信专用。"),
      o("st-5", "我建议", "As for my suggestions, they are outlined below.", "至于我的建议，具体如下。", [], "建议信专用。"),
      o("st-6", "首先", "First and foremost, {point1}.", "首先，{point1Cn}。", ["point1", "point1Cn"], "也可以直接用 Firstly / To begin with。")
    ],

    sentenceBank: [
      {
        id: "activity", name: "活动基本信息", en: "Time · Place · Event",
        items: [
          o("sb-1", "时间地点", "The meeting will be held in {place} at {time} on {date}.", "会议将于{dateCn} {time} 在{placeCn}举行。", ["place", "placeCn", "time", "date", "dateCn"], "交代时间、地点、事件，小作文第二段的第一句。"),
          o("sb-2", "学校主办", "Our university will host the {event} in {place} on {date}.", "我校将于{dateCn}在{placeCn}举办{eventCn}。", ["event", "eventCn", "place", "placeCn", "date", "dateCn"], "host 比 hold 更主动。"),
          o("sb-3", "定于", "The {event} is scheduled to take place in {place} on {date} from {time1} to {time2}.", "{eventCn}定于{dateCn} {time1} 至 {time2} 在{placeCn}举行。", ["event", "eventCn", "place", "placeCn", "date", "dateCn", "time1", "time2"], "be scheduled to 是正式安排。"),
          o("sb-4", "会议召开", "On {date}, a departmental meeting will be held in the main hall, commencing at {time}.", "{dateCn}，一场部门会议将在主会场举行，于{time}开始。", ["date", "dateCn", "time"], "commencing at 比 starting at 正式。")
        ]
      },
      {
        id: "purpose", name: "主题与目的", en: "Theme · Purpose",
        items: [
          o("sb-5", "主题是", "The theme of the {event} is {topic}.", "{eventCn}的主题是{topicCn}。", ["event", "eventCn", "topic", "topicCn"], "一句话交代主题。"),
          o("sb-6", "目的是", "The purpose of the {event} is to {purpose}.", "{eventCn}的目的是{purposeCn}。", ["event", "eventCn", "purpose", "purposeCn"], "最直接的目的一句。"),
          o("sb-7", "旨在深入讨论", "This {event} aims to facilitate an in-depth discussion on {topic}.", "本次{eventCn}旨在促进关于{topicCn}的深入讨论。", ["event", "eventCn", "topic", "topicCn"], "facilitate an in-depth discussion 是高分搭配。"),
          o("sb-8", "主题之下", "Centered on the theme of {theme}, the {event} aims to {purpose}.", "以{themeCn}为主题，本次{eventCn}旨在{purposeCn}。", ["theme", "themeCn", "event", "eventCn", "purpose", "purposeCn"], "过去分词作状语，句式更高级。")
        ]
      },
      {
        id: "people", name: "参与范围", en: "Participants",
        items: [
          o("sb-9", "广泛参与", "The {event} is anticipated to attract wide participation from both students and faculty members.", "预计{eventCn}将吸引学生和教职工的广泛参与。", ["event", "eventCn"], "be anticipated to 比 be expected to 正式。"),
          o("sb-10", "所有年级", "Students of all grades are eligible to enter the {event}, including both domestic and international students.", "所有年级的学生都有资格参加{eventCn}，包括国内和国际学生。", ["event", "eventCn"], "be eligible to 是“有资格”的高分表达。"),
          o("sb-11", "邀请嘉宾", "We have invited leading figures from various sectors, including eminent scholars and renowned entrepreneurs.", "我们邀请了来自各行业的领军人物，包括杰出学者和知名企业家。", [], "需要“排面”时用。"),
          o("sb-12", "汇聚贵宾", "This {event} is expected to bring together a host of distinguished guests, including leading experts in the field.", "本次活动预计将汇聚众多贵宾，包括该领域的顶尖专家。", ["event", "eventCn"], "a host of 替代 many。")
        ]
      },
      {
        id: "process", name: "流程环节", en: "Schedule",
        items: [
          o("sb-13", "趣味活动", "Interesting activities such as {activity1} and {activity2} will be held to arouse students' enthusiasm for {topic}.", "我们将举办{activity1Cn}、{activity2Cn}等有趣活动，以激发学生对{topicCn}的热情。", ["activity1", "activity1Cn", "activity2", "activity2Cn", "topic", "topicCn"], "arouse one's enthusiasm for 是高分搭配。"),
          o("sb-14", "分组挑战", "Participants will be divided into teams for a collaborative challenge, designed to foster teamwork and creative problem-solving.", "参与者将被分成小组，进行团队协作挑战，旨在培养团队精神和创造性解决问题的能力。", [], "适合素拓、夏令营、比赛。"),
          o("sb-15", "开幕式到讨论", "The {event} will commence with an opening ceremony, followed by a series of workshops and a keynote speech, and will conclude with a discussion session.", "{eventCn}将以开幕式开始，随后是系列工作坊和主题演讲，最后以讨论环节收尾。", ["event", "eventCn"], "commence / conclude 一对好词。"),
          o("sb-16", "主题演讲", "Following the opening ceremony, the {event} will feature a keynote speech, workshops, and a concluding discussion session.", "开幕式后，本次{eventCn}将包含主题演讲、工作坊和最后的讨论环节。", ["event", "eventCn"], "feature 作动词，简洁。")
        ]
      },
      {
        id: "reward", name: "奖品与收获", en: "Rewards",
        items: [
          o("sb-17", "难忘经历", "This will be a memorable and rewarding experience, and the prizes and souvenirs will be very valuable.", "这将是一次难忘而充实的经历，奖品和纪念品也将非常珍贵。", [], "画饼句，放第二段最后。"),
          o("sb-18", "前三名", "To encourage more students to join, the top three winners will receive trophies and certificates, and all shortlisted participants will be awarded bonus points.", "为鼓励更多学生参加，前三名将获得奖杯和证书，所有入围者都将获得加分。", [], "比赛、招募类专用。"),
          o("sb-19", "结识同好", "During the {event}, you will have the opportunity to meet like-minded individuals and enjoy a great time together.", "在{eventCn}期间，你将有机会结识志同道合的人，一起度过愉快时光。", ["event", "eventCn"], "社交类活动画饼。"),
          o("sb-20", "宝贵机会", "This {event} offers a precious opportunity to broaden your horizons and enrich your campus life.", "这次{eventCn}提供了开阔视野、丰富校园生活的宝贵机会。", ["event", "eventCn"], "可结合大作文六大方面：broaden horizons / enrich campus life。")
        ]
      },
      {
        id: "recommend", name: "推荐对象", en: "Recommendation",
        items: [
          o("sb-21", "景点", "Located in {location}, {name} is one of the most popular scenic spots in the world.", "{nameCn}位于{locationCn}，是世界上最受欢迎的景点之一。", ["location", "locationCn", "name", "nameCn"], "推荐景点第一句。"),
          o("sb-22", "书/电影", "Written by {author}, {name} is one of the most popular books in the world.", "{nameCn}由{authorCn}所著，是世界上最受欢迎的书之一。", ["author", "authorCn", "name", "nameCn"], "推荐书/电影第一句，directed by 可替换 written by。"),
          o("sb-23", "名人", "{name} was an outstanding scientist, who made remarkable achievements in many fields.", "{nameCn}是一位杰出的科学家，在许多领域都取得了卓越成就。", ["name", "nameCn"], "推荐名人第一句。"),
          o("sb-24", "活动", "Planned by the Student Union, the {event} is one of the most popular events in our university.", "该{eventCn}由学生会策划，是我校最受欢迎的活动之一。", ["event", "eventCn"], "推荐校园活动。"),
          o("sb-25", "对比推荐", "While I understand that {optionA} has advantages, I believe {optionB} will provide you with a more profound and thought-provoking experience.", "虽然我知道{optionACn}有优势，但我相信{optionBCn}会带给你更深刻、更发人深省的体验。", ["optionA", "optionACn", "optionB", "optionBCn"], "二选一建议信的神句。"),
          o("sb-26", "强烈推荐", "I would highly recommend {object} for its exceptional {feature1} and remarkable {feature2}.", "我强烈推荐{objectCn}，因为它拥有卓越的{feature1Cn}和非凡的{feature2Cn}。", ["object", "objectCn", "feature1", "feature1Cn", "feature2", "feature2Cn"], "for its...and remarkable... 结构清晰。"),
          o("sb-27", "独特体验", "What makes {object} highly recommendable is the unique experience it offers, which includes {detail}.", "{objectCn}之所以值得高度推荐，在于它提供的独特体验，其中包括{detailCn}。", ["object", "objectCn", "detail", "detailCn"], "what 引导主语从句，句式高级。")
        ]
      },
      {
        id: "ability", name: "能力与要求", en: "Ability · Requirements",
        items: [
          o("sb-28", "表现出色", "Over the past few years, I have consistently excelled in my role, which is evidenced by the awards and recognition I have received.", "过去几年，我在工作中一直表现出色，所获奖项和认可就是证明。", [], "自荐、求职专用。"),
          o("sb-29", "自律韧性", "I am a highly self-motivated and resilient individual, capable of maintaining focus and productivity in fast-paced environments.", "我是一个高度自律且富有韧性的人，能够在快节奏环境中保持专注和高效。", [], "能力展示，两个形容词 + capable of。"),
          o("sb-30", "协作能力", "I thrive in collaborative settings and have often been the one to facilitate communication and integrate diverse viewpoints.", "我在协作环境中能充分发挥能力，并经常在团队中促进沟通、整合不同观点。", [], "团队合作类岗位。"),
          o("sb-31", "职责要求", "The selected candidates will assist in conducting surveys and analyzing data on {topic}. Moreover, they should have sound organization and communication skills.", "入选者将协助开展{topicCn}的调查和数据分析。此外，他们应具备良好的组织和沟通能力。", ["topic", "topicCn"], "招募志愿者：职责 + 要求。"),
          o("sb-32", "岗位要求", "The role requires the ability to analyze complex problems, develop practical solutions, and execute them effectively.", "该职位要求具备分析复杂问题、制定可行方案并有效执行的能力。", [], "求职、招聘类。"),
          o("sb-33", "热情与技能", "The candidates should be enthusiastic about {topic} and have sound organizational and communication skills.", "候选人应对{topicCn}充满热情，并具备良好的组织和沟通能力。", ["topic", "topicCn"], "最常用的招募要求句。"),
          o("sb-34", "无需经验", "No previous experience is required, for we will provide full training and guidance.", "无需相关经验，我们将提供完整的培训和指导。", [], "招募类万能句，降低门槛。")
        ]
      },
      {
        id: "thanks", name: "感谢与道歉", en: "Thanks · Apology",
        items: [
          o("sb-35", "非常感谢", "I am extremely grateful to you for your unselfish assistance during the {period}.", "我非常感谢你在{periodCn}期间给予的无私帮助。", ["period", "periodCn"], "感谢信核心句。"),
          o("sb-36", "正是你", "It is your {quality} that enabled me to {achievement}.", "正是你的{qualityCn}使我能够{achievementCn}。", ["quality", "qualityCn", "achievement", "achievementCn"], "强调句型，比 thank you 高级。"),
          o("sb-37", "没有帮助", "Without your generous help, I would not have made such great progress in {field}.", "如果没有你的慷慨帮助，我不会在{fieldCn}取得如此大的进步。", ["field", "fieldCn"], "虚拟语气 + 感谢。"),
          o("sb-38", "美妙经历", "Without your generous help, I would not have had such a wonderful experience.", "如果没有你的慷慨帮助，我就不会有如此美妙的经历。", [], "感谢 + 回忆，万能。"),
          o("sb-39", "及时帮助", "Without your timely help, I'm afraid the consequences would have been truly serious.", "如果没有你的及时帮助，后果恐怕会非常严重。", [], "道歉/感谢都能用。"),
          o("sb-40", "专业指导", "All of us desire to improve our ability under your professional guidance.", "我们都希望在您的专业指导下提升自己的能力。", [], "邀请教授、导师时拍马屁。"),
          o("sb-41", "弥补", "To make up for it, I am ready to immediately correct the mistake and offer my full assistance to resolve the matter.", "为了弥补，我准备立即纠正错误，并全力协助解决此事。", [], "道歉信核心句。"),
          o("sb-42", "吸取教训", "I assure you that I have learned a valuable lesson from this and will take concrete steps to ensure it does not happen again.", "我向你保证，我已从中吸取宝贵教训，并将采取具体措施确保不再发生。", [], "道歉信收尾。")
        ]
      },
      {
        id: "universal", name: "万能功能句", en: "Universal",
        items: [
          o("sb-43", "急需", "We are badly in need of {thing}, which can help us {action}.", "我们急需{thingCn}，它能帮助我们{actionCn}。", ["thing", "thingCn", "action", "actionCn"], "建议、求助、投诉都可用。"),
          o("sb-44", "由于", "Due to {reason}, it is inconvenient for us to {action}.", "由于{reasonCn}，我们{actionCn}很不方便。", ["reason", "reasonCn", "action", "actionCn"], "投诉信说明问题。"),
          o("sb-45", "我想知道", "I wonder if you can {request} so that I can {result}.", "我想知道你能否{requestCn}，以便我能够{resultCn}。", ["request", "requestCn", "result", "resultCn"], "提出请求的万能句。"),
          o("sb-46", "更多机会", "We could have more opportunities to {action} if you improved {aspect}.", "如果你改进{aspectCn}，我们就有更多机会{actionCn}。", ["action", "actionCn", "aspect", "aspectCn"], "建议信核心句，礼貌且明确。"),
          o("sb-47", "明智之举", "It is advisable to {action}, which can really help you {benefit}.", "{actionCn}是明智的，这确实能帮你{benefitCn}。", ["action", "actionCn", "benefit", "benefitCn"], "建议信，it is advisable to 比 you should 委婉。"),
          o("sb-48", "鉴于事实", "Given the fact that {fact}, it would be wise for us to {action}.", "鉴于{factCn}，我们{actionCn}才是明智的。", ["fact", "factCn", "action", "actionCn"], "建议信，逻辑感强。"),
          o("sb-49", "独特机会", "{thing} provides a unique opportunity to let you explore your creativity.", "{thingCn}提供了一个独特的机会，让你探索自己的创造力。", ["thing", "thingCn"], "推荐、邀请、介绍类通用。"),
          o("sb-50", "体验文化", "{thing} allows you to experience different cultures and social customs.", "{thingCn}能让你体验不同的文化和社会风俗。", ["thing", "thingCn"], "文化类活动、推荐景点通用。")
        ]
      }
    ],

    thirdEmotion: [
      o("te-1", "感谢考虑", "I would like to express my gratitude for your kind consideration of my {noun}.", "感谢您对我{nounCn}的善意考虑。", ["noun", "nounCn"], "建议信、申请信收尾。"),
      o("te-2", "诚挚歉意", "Please accept my sincere apology for any inconvenience that I have caused.", "对于给您带来的任何不便，请接受我诚挚的歉意。", [], "道歉信收尾。"),
      o("te-3", "享受旅程", "I hope all the members will enjoy the journey.", "我希望所有成员都能享受这段旅程。", [], "邀请、通知类。"),
      o("te-4", "随时联系", "For more information about the {event}, please do not hesitate to contact me.", "如需了解更多关于{eventCn}的信息，请随时与我联系。", ["event", "eventCn"], "通知、邀请类。"),
      o("te-5", "感激接受", "We would appreciate it very much if you could accept our invitation.", "如果您能接受我们的邀请，我们将不胜感激。", [], "邀请信。"),
      o("te-6", "积极参与", "We hope for your active participation and believe this event will be a great success.", "我们期待您的积极参与，相信本次活动将取得圆满成功。", [], "通知、邀请。"),
      o("te-7", "倍感荣幸", "It would be our great honor if you could grace the occasion with your presence.", "如若您能莅临，我们将倍感荣幸。", [], "邀请重要嘉宾，非常正式。"),
      o("te-8", "问候家人", "Please give my best regards to your family.", "请代我向你的家人问好。", [], "私人信件收尾。")
    ],
    thirdReply: [
      o("tr-1", "尽快回复", "I would be grateful if you could reply at your earliest convenience.", "如果您能在方便时尽快回复，我将不胜感激。", [], "最正式。"),
      o("tr-2", "及时回复", "Your prompt reply will be highly appreciated.", "非常感谢您的及时回复。", [], "简短正式。"),
      o("tr-3", "期待来信", "I am looking forward to hearing from you soon.", "我期待很快收到你的来信。", [], "最常用。")
    ],

    notice: {
      titles: ["Notice", "NOTICE"],
      first: [
        o("no-1", "很高兴通知", "It is a pleasure to inform everyone that our {event} will be held in our university.", "很高兴地通知大家，我校将举办{eventCn}。", ["event", "eventCn"], "通知第一句：概况。"),
        o("no-2", "很高兴宣布", "We are pleased to announce that our {event} will be held in our university.", "我们很高兴地宣布，我校将举办{eventCn}。", ["event", "eventCn"], "announce 比 inform 更正式。"),
        o("no-3", "请注意", "Attention all students interested in {topic} on campus!", "校园里所有对{topicCn}感兴趣的同学请注意！", ["topic", "topicCn"], "告示类开头，醒目。"),
        o("no-4", "丰富生活", "To enrich students' extracurricular life, our club will host this {event}.", "为了丰富学生的课外生活，我们社团将举办{eventCn}。", ["event", "eventCn"], "目的 + 活动，一句话交代。")
      ],
      second: [
        o("no-5", "介绍细节", "This notice is intended to introduce some details of this {event}.", "本通知旨在介绍本次{eventCn}的一些细节。", ["event", "eventCn"], "通知第二句：目的。"),
        o("no-6", "通知如下", "The relevant matters are hereby notified as follows.", "现将相关事宜通知如下。", [], "最正式的通知套话，直接背。"),
        o("no-7", "以下事项", "The following are the notifications of the relevant matters.", "以下是有关事项的通知。", [], "备选。")
      ],
      third: [
        o("no-8", "快行动", "Put it into practice! If you are interested in {topic}, this will be a memorable experience for you. We are looking forward to your enthusiastic participation.", "快行动吧！如果你对{topicCn}感兴趣，这将是难忘的经历。我们期待你的热情参与。", ["topic", "topicCn"], "通知第三段：号召。"),
        o("no-9", "欢迎加入", "Welcome to join us. If you are interested in this activity, please do not hesitate to email us at {email}.", "欢迎加入我们。如果你对活动感兴趣，请随时发邮件至 {email} 报名。", ["email"], "报名方式。"),
        o("no-10", "扫码报名", "We look forward to your active participation! Please scan the QR code below to sign up.", "期待大家的积极参与！请扫描下方二维码报名。", [], "模拟通知可用。")
      ]
    },

    minutes: {
      titles: ["Minutes of Meeting", "Summary of Meeting"],
      intro: [
        o("mi-1", "主持人欢迎", "The meeting commenced with a warm welcome from {host}, followed by an introduction to the purpose of gathering.", "会议以{hostCn}的热情欢迎开始，随后介绍了此次会议的目的。", ["host", "hostCn"], "纪要第一句：导入。"),
        o("mi-2", "致欢迎辞", "{host} delivered welcoming remarks and provided a brief overview of the significance of {topic}.", "{hostCn}致欢迎辞，并简要介绍了{topicCn}的意义。", ["host", "hostCn", "topic", "topicCn"], "更正式。")
      ],
      purpose: [
        o("mi-3", "回顾活动", "The meeting aimed to briefly review the activity held last week.", "本次会议旨在简要回顾上周举办的活动。", [], "回顾型会议。"),
        o("mi-4", "制定计划", "The meeting aimed to make a plan for the activity to be held next week.", "本次会议旨在为下周举行的活动制定计划。", [], "计划型会议。"),
        o("mi-5", "讨论问题", "The meeting aimed to discuss the problem of {topic} and find some suitable solutions.", "本次会议旨在讨论{topicCn}的问题并找到合适的解决方案。", ["topic", "topicCn"], "问题型会议。")
      ],
      speech: [
        o("mi-6", "董事长认为", "The chairman expressed the opinion that {opinion}.", "董事长认为{opinionCn}。", ["opinion", "opinionCn"], "大佬发言，可引用大作文模板句。"),
        o("mi-7", "专家认为", "Experts believe that {opinion}.", "专家认为{opinionCn}。", ["opinion", "opinionCn"], "不确定大佬是谁时用专家。"),
        o("mi-8", "详细发言", "A detailed presentation was delivered by {speaker}, highlighting the mission and achievements of {topic}.", "{speakerCn}做了详细发言，强调了{topicCn}的使命与成就。", ["speaker", "speakerCn", "topic", "topicCn"], "正式纪要。")
      ],
      agree: [
        o("mi-9", "大多数人赞成", "The majority of those attendees were in favour of the statement.", "大多数参会者赞成这一表述。", [], "第四句：手下赞同。"),
        o("mi-10", "互动讨论", "Participants engaged in an interactive discussion to address the challenges they faced during the activity.", "参会者进行了互动讨论，以解决活动中面临的挑战。", [], "讨论型会议。")
      ],
      decision: [
        o("mi-11", "会议同意", "The meeting agreed to hold the {event}.", "会议同意举办{eventCn}。", ["event", "eventCn"], "第五句：最终决定。"),
        o("mi-12", "具体措施", "As a concrete measure, the meeting decided that {decision}.", "作为一项具体措施，会议决定{decisionCn}。", ["decision", "decisionCn"], "决定内容较长时用。"),
        o("mi-13", "感谢参与", "The meeting concluded with a vote of thanks to all participants for their active involvement.", "会议最后向所有参会者的积极参与表示感谢。", [], "收尾。")
      ],
      next: o("mi-14", "下次会议", "The date and location of the next meeting will be announced via email to all participants.", "下次会议的日期和地点将通过邮件通知所有参会者。", [], "仅周期性会议可写。")
    },

    closings: [
      { id: "cl1", en: "Yours sincerely,", cn: "此致，敬礼" },
      { id: "cl2", en: "Best regards,", cn: "此致问候" },
      { id: "cl3", en: "Yours faithfully,", cn: "敬上" }
    ]
  };

  /* ------------------------------------------------------------------------
     常用字段标签
     ------------------------------------------------------------------------ */
  const fieldLabels = {
    theme: "主题词（英）", themeCn: "主题词（中）", subject: "写作对象（英）", subjectCn: "写作对象（中）",
    benefit: "好处 / 方面（英）", benefitCn: "好处 / 方面（中）", year1: "起始年", year2: "结束年",
    chart: "图表类型", trend: "趋势动词（过去式）", trendCn: "趋势（中）", trendNoun: "趋势名词",
    metric: "数据指标（英）", metricCn: "数据指标（中）", audience: "受众（英）", audienceCn: "受众（中）",
    agent: "实施者（英）", agentCn: "实施者（中）", pictureType: "图画类型", scene: "画面描述（英）",
    sceneCn: "画面描述（中）", idea: "中心思想（英）", ideaCn: "中心思想（中）", authorIdea: "作者观点（英）",
    authorIdeaCn: "作者观点（中）", stance: "我的态度", action: "动作（英）", actionCn: "动作（中）",
    item1: "项目 1（英）", item1Cn: "项目 1（中）", item2: "项目 2（英）", item2Cn: "项目 2（中）",
    item3: "项目 3（英）", item3Cn: "项目 3（中）", item4: "项目 4（英）", item4Cn: "项目 4（中）",
    v1: "数值 1", v2: "数值 2", v3: "数值 3", v4: "数值 4", v5: "数值 5", v6: "数值 6",
    leftTopic: "左图主题（英）", leftTopicCn: "左图主题（中）", rightTopic: "右图主题（英）", rightTopicCn: "右图主题（中）",
    leftDetail: "左图细节（英）", leftDetailCn: "左图细节（中）", rightDetail: "右图细节（英）", rightDetailCn: "右图细节（中）",
    detailSentence: "细节句（英）", detailSentenceCn: "细节句（中）", phenomenon: "社会现象（英）",
    phenomenonCn: "社会现象（中）", exampleSubject: "例子主体（英）", exampleSubjectCn: "例子主体（中）",
    exampleDetail: "例子现状（英）", exampleDetailCn: "例子现状（中）", exampleBenefit: "例子好处（英）",
    exampleBenefitCn: "例子好处（中）", exampleResult: "例子结果（英）", exampleResultCn: "例子结果（中）",
    alternative: "对比对象（英）", alternativeCn: "对比对象（中）", benefit1: "好处 1（英）", benefit1Cn: "好处 1（中）",
    benefit2: "好处 2（英）", benefit2Cn: "好处 2（中）", ThemeCap: "主题词首字母大写", multiple: "倍数",
    diff: "增量", unit: "单位（英）", unitCn: "单位（中）", vMin: "最低值", vMax: "最高值",
    trend1: "趋势 1（过去式）", trend1Cn: "趋势 1（中）", trend2: "趋势 2（过去式）", trend2Cn: "趋势 2（中）",
    trend3: "趋势 3（过去式）", trend3Cn: "趋势 3（中）", gerund: "动名词（英）", gerundCn: "动名词（中）",
    chartSummary: "图表概述（英）", chartSummaryCn: "图表概述（中）", sceneLeft: "左图画面（英）",
    sceneLeftCn: "左图画面（中）", sceneRight: "右图画面（英）", sceneRightCn: "右图画面（中）",
    speakerA: "人物 A（英）", speakerACn: "人物 A（中）", viewA: "A 的观点（英）", viewACn: "A 的观点（中）",
    speakerB: "人物 B（英）", speakerBCn: "人物 B（中）", viewB: "B 的观点（英）", viewBCn: "B 的观点（中）",
    choice1: "选择 1（英）", choice1Cn: "选择 1（中）", choice2: "选择 2（英）", choice2Cn: "选择 2（中）",
    reservation: "保留意见（英）", reservationCn: "保留意见（中）", context: "寒暄语境（英）",
    contextCn: "寒暄语境（中）", news: "对方来信内容（英）", newsCn: "对方来信内容（中）",
    thing: "事物（英）", thingCn: "事物（中）", event: "活动（英）", eventCn: "活动（中）",
    place: "地点（英）", placeCn: "地点（中）", date: "日期（英）", dateCn: "日期（中）",
    time: "时间", time1: "开始时间", time2: "结束时间", topic: "主题（英）", topicCn: "主题（中）",
    purpose: "目的（英）", purposeCn: "目的（中）", noun: "名词（英）", nounCn: "名词（中）",
    object: "推荐对象（英）", objectCn: "推荐对象（中）", feature1: "特点 1（英）", feature1Cn: "特点 1（中）",
    feature2: "特点 2（英）", feature2Cn: "特点 2（中）", detail: "细节（英）", detailCn: "细节（中）",
    period: "时期（英）", periodCn: "时期（中）", quality: "品质（英）", qualityCn: "品质（中）",
    achievement: "成就（英）", achievementCn: "成就（中）", field: "领域（英）", fieldCn: "领域（中）",
    request: "请求（英）", requestCn: "请求（中）", result: "结果（英）", resultCn: "结果（中）",
    fact: "事实（英）", factCn: "事实（中）", reason: "原因（英）", reasonCn: "原因（中）",
    optionA: "选项 A（英）", optionACn: "选项 A（中）", optionB: "选项 B（英）", optionBCn: "选项 B（中）",
    location: "地点（英）", locationCn: "地点（中）", name: "名称（英）", nameCn: "名称（中）",
    author: "作者（英）", authorCn: "作者（中）", email: "邮箱", host: "主持人（英）", hostCn: "主持人（中）",
    opinion: "观点（英）", opinionCn: "观点（中）", speaker: "发言人（英）", speakerCn: "发言人（中）",
    decision: "决定（英）", decisionCn: "决定（中）", mistake: "过错（英）", mistakeCn: "过错（中）",
    issue: "问题（英）", issueCn: "问题（中）", details: "细节（英）", detailsCn: "细节（中）",
    aspect: "方面（英）", aspectCn: "方面（中）",
    position: "职位（英）", positionCn: "职位（中）", department: "院系（英）", departmentCn: "院系（中）",
    university: "大学（英）", universityCn: "大学（中）", major: "专业（英）", majorCn: "专业（中）",
    lastName: "姓", firstName: "名", point1: "要点 1（英）", point1Cn: "要点 1（中）"
  };

  /* ------------------------------------------------------------------------
     本地 AI 教练知识库
     ------------------------------------------------------------------------ */
  const coachTopics = [
    {
      keys: ["结构", "几段", "三段", "框架", "怎么写"],
      title: "大作文的三段式骨架",
      body: [
        "第一段：图表 / 图画 / 文字引入 + 细节 + 点出社会现象或中心思想。",
        "第二段：过渡句 + 原因 1、2、3。三点原因建议用不同方案：举例、从句、虚拟语气，避免句式重复。",
        "第三段：总结全文 + 具体措施（政府 / 公民 / 媒体等选两个角度）+ 畅想未来。",
        "小作文同理：第一段说明写信目的，第二段按题干分点写细节，第三段表达情感并期待回信。"
      ]
    },
    {
      keys: ["图表", "柱状图", "线状图", "饼状图", "表格", "数据"],
      title: "图表描述：先总体，再细节",
      body: [
        "总体描述只做一件事：用一句话概括标题、图例、数据、时间。动态图写变化方向，静态图写分布或占比。",
        "细节描述必须落到数字：动态图写 from...to... 或 compared with；静态图写 account for / rank first / followed by。",
        "最后用 It is apparent from the statistics that... 点出社会现象，完成“透过数据看现象”。",
        "记住：先求有，再求准。考场上不要为了一个数字纠结三分钟。"
      ]
    },
    {
      keys: ["原因", "论证", "三点", "理由"],
      title: "第二段原因：七选三，不要七选七",
      body: [
        "七个方案：举例论证、群众路线、从句 + 六大方面、Not only 倒装、虚拟语气、对比论证、比喻句。",
        "推荐组合：举例（个人路线）+ 从句（群众路线）+ 虚拟语气（扣帽子）。三个人称、三种句式，阅卷老师一眼看出层次。",
        "好处不知道写什么，就往六大方面靠：社会、自然、文化、个人、交流、科技。",
        "连接词要显性：To begin with / Furthermore / Last but not least，结构分先拿到。"
      ]
    },
    {
      keys: ["小作文", "书信", "建议信", "邀请信", "通知", "答复信", "投诉信", "推荐信"],
      title: "小作文：弱化题型，强化功能",
      body: [
        "所有书信只分两类：被动写信（回复）和主动写信。区别只在称呼和第一段要不要自我介绍。",
        "第一段：背景寒暄 + 写信目的。第二段：过渡句 + 2~3 个分点（时间地点、目的、流程、要求、好处）。第三段：表达情感 + 期待回信。",
        "建议信、投诉信、邀请信、感谢信、道歉信……第二段的核心句是通用的，不要给句子扣“只能用于某种信”的帽子。",
        "通知 = 换格式的书信；纪要 = 换格式的书信。格式记住，内容照搬。"
      ]
    },
    {
      keys: ["评分", "分数", "多少分", "标准", "批改"],
      title: "阅卷老师先看什么",
      body: [
        "第一眼：卷面、字数、段落数。三段清晰、字数达标，基础分先稳住。",
        "第二眼：结构。第一段有没有描述，第二段有没有三点原因，第三段有没有总结和措施。",
        "第三眼：语言。模板句要用对，主谓一致、时态、拼写不要出错；句式有长有短。",
        "最后：主题是否契合。只要内容与主题相关、不牵强，就不会因为“模板痕迹”被判低分。"
      ]
    },
    {
      keys: ["字数", "多少词", "160", "200", "150", "100"],
      title: "字数与时间",
      body: [
        "英一大作文 160–200 词，英二约 150 词；小作文约 100 词。",
        "大作文建议 25 分钟内完成：5 分钟审题列框架，20 分钟默写模板并填空。",
        "小作文建议 10–12 分钟：3 分钟审题，7 分钟写作。",
        "字数不够时，优先加第二段的原因三和第三段的措施二，不要在第一段堆数据。"
      ]
    },
    {
      keys: ["模板", "套用", "痕迹", "雷同"],
      title: "怎么套模板不像模板",
      body: [
        "模板负责骨架，你负责血肉。每篇至少替换 3 处主题词、2 处好处、1 个具体例子。",
        "同一个位置不要每年都用同一句。待选句至少准备 2 个，考场上按题目选。",
        "举例论证最能去模板味：my roommate Kevin / my grandfather / a nursing home in my city，比马云、爱迪生好用得多。",
        "结尾不要只写 Only in this way，换成 If these measures are implemented... 或 Only through the joint efforts... 更像自己写的。"
      ]
    }
  ];

  const quickReplies = [
    "帮我审题",
    "生成一篇初稿",
    "给我三个原因",
    "这句怎么升级",
    "小作文建议信怎么写",
    "按评分标准批改"
  ];

  window.KY.DATA = {
    big,
    small,
    fieldLabels,
    coachTopics,
    quickReplies,
    meta: {
      title: "砚台 · 考研英语作文工坊",
      version: "1.0",
      source: "模板整理自用户提供的 27 考研英语大 / 小作文模板；真题整理自《考研英语作文真题题目汇总》。",
      examTargets: { "英一": 180, "英二": 150, "小作文": 100 }
    }
  };
})();
