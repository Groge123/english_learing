/* ==========================================================================
   砚台 · 模板引擎
   负责：模板拼装、字数统计、智能批改、本地 AI 教练、可选远程大模型。
   ========================================================================== */
(function () {
  "use strict";
  window.KY = window.KY || {};
  const D = window.KY.DATA;
  const P = window.KY.PROMPTS;

  /* ------------------------------------------------------------------------
     基础工具
     ------------------------------------------------------------------------ */
  const escapeHtml = (s) => String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  const label = (key) => (D.fieldLabels && D.fieldLabels[key]) || key;

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const stripTags = (s) => String(s || "").replace(/<[^>]+>/g, " ");

  const countWords = (text) => {
    const clean = String(text || "")
      .replace(/[【】\[\]]/g, " ")
      .replace(/_{2,}/g, " ")
      .trim();
    if (!clean) return 0;
    const tokens = clean.split(/\s+/).filter((w) => /[A-Za-z0-9\u4e00-\u9fa5]/.test(w));
    return tokens.length;
  };

  const splitSentences = (text) => String(text || "")
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const splitParagraphs = (text) => String(text || "")
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  /* ------------------------------------------------------------------------
     模板索引
     ------------------------------------------------------------------------ */
  const bigIndex = new Map();
  const smallIndex = new Map();

  function addBig(section, list) {
    (list || []).forEach((opt) => bigIndex.set(opt.id, { section, option: opt }));
  }
  function addBigNested(section, map) {
    Object.keys(map || {}).forEach((key) => {
      (map[key] || []).forEach((opt) => bigIndex.set(opt.id, { section, option: opt, scenario: key }));
    });
  }

  addBigNested("overview", D.big.overview);
  addBigNested("detail", D.big.detail);
  addBig("phenomenonTransition", D.big.phenomenonTransition);
  addBig("phenomenon", D.big.phenomenon);
  addBig("pictureIntro", D.big.pictureIntro);
  addBig("pictureThemeTransition", D.big.pictureThemeTransition);
  addBig("pictureIdea", D.big.pictureIdea);
  addBig("textIntro", D.big.textIntro);
  addBig("textView", D.big.textView);
  addBig("stance", D.big.stance);
  addBig("transition", D.big.transition);
  D.big.reasonSchemes.forEach((scheme) => {
    (scheme.options || []).forEach((opt) => bigIndex.set(opt.id, { section: "reason", option: opt, scheme: scheme.id, schemeName: scheme.name }));
  });
  addBig("conclusion", D.big.conclusion);
  addBig("measure", D.big.measures);
  addBig("future", D.big.future);
  addBig("trendPrediction", D.big.trendPrediction);

  (D.small.salutations || []).forEach((s) => smallIndex.set(s.id, { section: "salutation", option: s }));
  addBigSmall("greetings", D.small.greetings);
  function addBigSmall(section, list) {
    (list || []).forEach((o) => smallIndex.set(o.id, { section, option: o }));
  }
  (D.small.purposes || []).forEach((p) => smallIndex.set(p.id, { section: "purpose", option: p }));
  addBigSmall("selfIntro", D.small.selfIntro);
  addBigSmall("secondTransition", D.small.secondTransitions);
  D.small.sentenceBank.forEach((group) => {
    (group.items || []).forEach((o) => smallIndex.set(o.id, { section: "bank", option: o, group: group.id, groupName: group.name }));
  });
  addBigSmall("thirdEmotion", D.small.thirdEmotion);
  addBigSmall("thirdReply", D.small.thirdReply);
  addBigSmall("noticeFirst", D.small.notice.first);
  addBigSmall("noticeSecond", D.small.notice.second);
  addBigSmall("noticeThird", D.small.notice.third);
  addBigSmall("minutesIntro", D.small.minutes.intro);
  addBigSmall("minutesPurpose", D.small.minutes.purpose);
  addBigSmall("minutesSpeech", D.small.minutes.speech);
  addBigSmall("minutesAgree", D.small.minutes.agree);
  addBigSmall("minutesDecision", D.small.minutes.decision);
  smallIndex.set(D.small.minutes.next.id, { section: "minutesNext", option: D.small.minutes.next });

  const getBigOption = (id) => (bigIndex.get(id) || {}).option || null;
  const getSmallOption = (id) => (smallIndex.get(id) || {}).option || null;

  function allBigOptions() {
    return Array.from(bigIndex.values()).map((x) => x.option);
  }
  function allSmallOptions() {
    return Array.from(smallIndex.values()).map((x) => x.option);
  }

  /* ------------------------------------------------------------------------
     模板填充
     ------------------------------------------------------------------------ */
  function mergedValues(kind, state, optionId) {
    const base = kind === "big" ? (state.settings || {}) : (state.settings || {});
    const shared = state.shared || {};
    const local = (state.fills && optionId && state.fills[optionId]) || {};
    const values = Object.assign({}, base, shared, local);
    if (values.theme && !values.ThemeCap) values.ThemeCap = capitalize(values.theme);
    return values;
  }

  function capitalize(s) {
    const t = String(s || "").trim();
    return t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
  }

  function fillPlain(en, values, emptyMark) {
    return String(en || "").replace(/\{(\w+)\}/g, (m, key) => {
      const v = values[key];
      if (v == null || String(v).trim() === "") return emptyMark || "______";
      return String(v);
    }).replace(/\s+([,.;:!?])/g, "$1").replace(/,\s*,/g, ",").replace(/\s{2,}/g, " ").trim();
  }

  function fillHtml(en, values) {
    const safe = escapeHtml(en);
    return safe.replace(/\{(\w+)\}/g, (m, key) => {
      const v = values[key];
      const has = v != null && String(v).trim() !== "";
      return `<span class="blank${has ? "" : " is-empty"}" title="${escapeHtml(label(key))}">${has ? escapeHtml(v) : escapeHtml(label(key))}</span>`;
    });
  }

  function optionValues(kind, state, option) {
    return mergedValues(kind, state, option.id);
  }

  /* ------------------------------------------------------------------------
     大作文拼装
     ------------------------------------------------------------------------ */
  function pickBig(state, key, fallback) {
    return (state.selections && state.selections[key]) || fallback;
  }

  function detailSectionFor(state) {
    const sc = state.scenario || "dynamic-single";
    if (D.big.detail[sc]) return D.big.detail[sc];
    return D.big.detail.universal;
  }

  function composeBig(state) {
    const s = state || {};
    const type = s.type || "chart";
    const p1 = [];
    if (type === "picture") {
      p1.push(pickBig(s, "pictureIntro", "pic-in1"));
      p1.push(pickBig(s, "pictureThemeTransition", "pic-t1"));
      p1.push(pickBig(s, "pictureIdea", "pic-i1"));
    } else if (type === "text") {
      p1.push(pickBig(s, "textIntro", "txt-in1"));
      p1.push(pickBig(s, "textView", "txt-v1"));
      p1.push(pickBig(s, "stance", "st-1"));
    } else if (type === "picture-chart") {
      p1.push(pickBig(s, "pictureIntro", "pic-in5"));
      p1.push(pickBig(s, "pictureThemeTransition", "pic-t1"));
      p1.push(pickBig(s, "pictureIdea", "pic-i1"));
    } else {
      p1.push(pickBig(s, "overview", defaultOverviewId(s)));
      p1.push(pickBig(s, "detail", defaultDetailId(s)));
      p1.push(pickBig(s, "phenomenonTransition", "ph-t2"));
      p1.push(pickBig(s, "phenomenon", "ph-1"));
    }

    const p2 = [
      pickBig(s, "transition", "tr-1"),
      pickBig(s, "reason1", "rs-ex1"),
      pickBig(s, "reason2", "rs-cl1"),
      pickBig(s, "reason3", "rs-v2")
    ];

    const p3 = [
      pickBig(s, "conclusion", "con-1"),
      pickBig(s, "measure1", "me-gov"),
      pickBig(s, "measure2", "me-media"),
      pickBig(s, "future", "fu-3")
    ];

    const build = (ids) => ids.map((id) => {
      const opt = getBigOption(id);
      if (!opt) return "";
      return fillPlain(opt.en, optionValues("big", s, opt), "______");
    }).filter(Boolean).join(" ");

    return [build(p1), build(p2), build(p3)].filter((x) => x.trim()).join("\n\n");
  }

  function defaultOverviewId(s) {
    const sc = s.scenario || "dynamic-single";
    const map = {
      "dynamic-single": "ov-dyn1", "dynamic-multi": "ov-mul1", "static": "ov-sta1",
      "double": "ov-dbl1", "universal": "ov-uni2"
    };
    return map[sc] || "ov-dyn1";
  }
  function defaultDetailId(s) {
    const sc = s.scenario || "dynamic-single";
    const map = {
      "dynamic-single": "det-dyn1", "dynamic-multi": "det-mul1", "static": "det-sta1",
      "double": "det-dbl1", "universal": "det-uni1"
    };
    return map[sc] || "det-dyn1";
  }

  function bigParagraphs(state) {
    const s = state || {};
    const type = s.type || "chart";
    if (type === "picture") return [
      { title: "第一段 · 图画描述 + 主题阐述", ids: [pickBig(s, "pictureIntro", "pic-in1"), pickBig(s, "pictureThemeTransition", "pic-t1"), pickBig(s, "pictureIdea", "pic-i1")] },
      { title: "第二段 · 过渡 + 原因 1 / 2 / 3", ids: [pickBig(s, "transition", "tr-1"), pickBig(s, "reason1", "rs-ex1"), pickBig(s, "reason2", "rs-cl1"), pickBig(s, "reason3", "rs-v2")] },
      { title: "第三段 · 总结 + 措施 + 展望", ids: [pickBig(s, "conclusion", "con-1"), pickBig(s, "measure1", "me-gov"), pickBig(s, "measure2", "me-media"), pickBig(s, "future", "fu-3")] }
    ];
    if (type === "text") return [
      { title: "第一段 · 文字改写 + 表明态度", ids: [pickBig(s, "textIntro", "txt-in1"), pickBig(s, "textView", "txt-v1"), pickBig(s, "stance", "st-1")] },
      { title: "第二段 · 过渡 + 原因 1 / 2 / 3", ids: [pickBig(s, "transition", "tr-1"), pickBig(s, "reason1", "rs-ex1"), pickBig(s, "reason2", "rs-cl1"), pickBig(s, "reason3", "rs-v2")] },
      { title: "第三段 · 总结 + 措施 + 展望", ids: [pickBig(s, "conclusion", "con-1"), pickBig(s, "measure1", "me-gov"), pickBig(s, "measure2", "me-media"), pickBig(s, "future", "fu-3")] }
    ];
    if (type === "picture-chart") return [
      { title: "第一段 · 图画 + 图表 + 主题", ids: [pickBig(s, "pictureIntro", "pic-in5"), pickBig(s, "pictureThemeTransition", "pic-t1"), pickBig(s, "pictureIdea", "pic-i1")] },
      { title: "第二段 · 过渡 + 原因 1 / 2 / 3", ids: [pickBig(s, "transition", "tr-1"), pickBig(s, "reason1", "rs-ex1"), pickBig(s, "reason2", "rs-cl1"), pickBig(s, "reason3", "rs-v2")] },
      { title: "第三段 · 总结 + 措施 + 展望", ids: [pickBig(s, "conclusion", "con-1"), pickBig(s, "measure1", "me-gov"), pickBig(s, "measure2", "me-media"), pickBig(s, "future", "fu-3")] }
    ];
    return [
      { title: "第一段 · 总体 + 细节 + 社会现象", ids: [pickBig(s, "overview", defaultOverviewId(s)), pickBig(s, "detail", defaultDetailId(s)), pickBig(s, "phenomenonTransition", "ph-t2"), pickBig(s, "phenomenon", "ph-1")] },
      { title: "第二段 · 过渡 + 原因 1 / 2 / 3", ids: [pickBig(s, "transition", "tr-1"), pickBig(s, "reason1", "rs-ex1"), pickBig(s, "reason2", "rs-cl1"), pickBig(s, "reason3", "rs-v2")] },
      { title: "第三段 · 总结 + 措施 + 展望", ids: [pickBig(s, "conclusion", "con-1"), pickBig(s, "measure1", "me-gov"), pickBig(s, "measure2", "me-media"), pickBig(s, "future", "fu-3")] }
    ];
  }

  /* ------------------------------------------------------------------------
     小作文拼装
     ------------------------------------------------------------------------ */
  function composeSmall(state) {
    const s = state || {};
    const type = s.type || "letter";
    const lines = [];
    if (type === "notice") {
      lines.push(s.title || "Notice");
      lines.push("");
      lines.push(fillPlain(getSmallOption(s.selections.noticeFirst || "no-1")?.en || "", mergedValues("small", s, "no-1")));
      lines.push(fillPlain(getSmallOption(s.selections.noticeSecond || "no-6")?.en || "", mergedValues("small", s, "no-6")));
      lines.push("");
      (s.bankIds || []).forEach((id) => {
        const opt = getSmallOption(id);
        if (opt) lines.push(fillPlain(opt.en, mergedValues("small", s, id)));
      });
      lines.push("");
      lines.push(fillPlain(getSmallOption(s.selections.noticeThird || "no-9")?.en || "", mergedValues("small", s, "no-9")));
      lines.push("");
      lines.push("The Student Union");
      lines.push(s.settings?.date || s.date || "December 20, 2025");
      return lines.join("\n");
    }
    if (type === "minutes") {
      lines.push("Minutes of Meeting");
      lines.push("Date: " + (s.date || "December 23, 2023"));
      lines.push("Time: " + (s.time || "From 10:00 a.m. to 11:30 a.m."));
      lines.push("Location: " + (s.place || "A111, conference room"));
      lines.push("Objective: " + (s.objective || s.topic || ""));
      lines.push("Attendees: " + (s.attendees || "All members"));
      lines.push("");
      const ids = [
        s.selections.minutesIntro || "mi-1",
        s.selections.minutesPurpose || "mi-3",
        s.selections.minutesSpeech || "mi-6",
        s.selections.minutesAgree || "mi-9",
        s.selections.minutesDecision || "mi-11"
      ];
      if (s.includeNext) ids.push("mi-14");
      ids.forEach((id) => {
        const opt = getSmallOption(id);
        if (opt) lines.push(fillPlain(opt.en, mergedValues("small", s, id)));
      });
      lines.push("");
      lines.push("Recorded by: Li Ming");
      lines.push(s.date || "December 23, 2023");
      return lines.join("\n");
    }

    // 书信
    const salutation = getSmallOption(s.salutationId || "sa1");
    lines.push(fillPlain(salutation ? salutation.en : "Dear {lastName},", mergedValues("small", s, salutation && salutation.id)));
    lines.push("");
    const p1 = [];
    const purposeOpt = getSmallOption(s.selections.purpose || "pu-reply");
    const purposeText = purposeOpt ? fillPlain(purposeOpt.en, mergedValues("small", s, purposeOpt.id)) : "reply to your email";
    if (s.mode === "passive") {
      p1.push(fillPlain(getSmallOption(s.greetingId || "gr-1")?.en || "", mergedValues("small", s, s.greetingId || "gr-1")));
      p1.push("I am writing to " + purposeText + ".");
    } else {
      if (s.includeSelfIntro) p1.push(fillPlain(getSmallOption(s.selfIntroId || "si-1")?.en || "", mergedValues("small", s, s.selfIntroId || "si-1")));
      p1.push("I am writing to " + purposeText + ".");
    }
    lines.push(p1.filter(Boolean).join(" "));
    lines.push("");
    const p2 = [];
    p2.push(fillPlain(getSmallOption(s.transitionId || "st-3")?.en || "", mergedValues("small", s, s.transitionId || "st-3")));
    (s.bankIds || []).forEach((id) => {
      const opt = getSmallOption(id);
      if (opt) p2.push(fillPlain(opt.en, mergedValues("small", s, id)));
    });
    lines.push(p2.filter(Boolean).join(" "));
    lines.push("");
    const p3 = [];
    p3.push(fillPlain(getSmallOption(s.emotionId || "te-6")?.en || "", mergedValues("small", s, s.emotionId || "te-6")));
    p3.push(fillPlain(getSmallOption(s.replyId || "tr-3")?.en || "", mergedValues("small", s, s.replyId || "tr-3")));
    lines.push(p3.filter(Boolean).join(" "));
    lines.push("");
    lines.push(s.closing || "Yours sincerely,");
    lines.push(s.signature || "Li Ming");
    return lines.join("\n");
  }

  function smallParagraphs(state) {
    const s = state || {};
    if (s.type === "notice") return [
      { title: "通知格式 · 标题", ids: [] },
      { title: "第一段 · 通知概况 + 目的", ids: [s.selections.noticeFirst || "no-1", s.selections.noticeSecond || "no-6"] },
      { title: "第二段 · 具体内容", ids: s.bankIds || [] },
      { title: "第三段 · 邀请 + 报名", ids: [s.selections.noticeThird || "no-9"] }
    ];
    if (s.type === "minutes") return [
      { title: "纪要头 · 时间 / 地点 / 目的", ids: [] },
      { title: "正文 · 导入 / 目的 / 发言 / 决定", ids: ["mi-1", "mi-3", "mi-6", "mi-9", "mi-11"] }
    ];
    return [
      { title: "称呼与第一段 · 寒暄 + 写信目的", ids: [s.greetingId || "gr-1", s.selections.purpose || "pu-suggest"] },
      { title: "第二段 · 过渡 + 分点细节", ids: [s.transitionId || "st-3"].concat(s.bankIds || []) },
      { title: "第三段 · 情感 + 期待回信", ids: [s.emotionId || "te-6", s.replyId || "tr-3"] }
    ];
  }

  /* ------------------------------------------------------------------------
     默认状态
     ------------------------------------------------------------------------ */
  function defaultBigState() {
    return {
      exam: "英一",
      type: "chart",
      scenario: "dynamic-single",
      promptId: null,
      settings: {
        theme: "Chinese residents' health literacy level",
        themeCn: "中国居民健康素养水平",
        subject: "Chinese residents",
        subjectCn: "中国居民",
        benefit: "public health",
        benefitCn: "公共卫生",
        year1: "2012", year2: "2021",
        chart: "line chart",
        trend: "rose steadily", trendCn: "稳步上升", trendNoun: "a steady rise",
        metric: "health literacy level", metricCn: "健康素养水平",
        pictureType: "picture",
        scene: "in front of us stands a young man, active as well as vigorous, rushing to the finishing line",
        sceneCn: "我们面前站着一位年轻人，充满活力地冲向终点线",
        idea: "perseverance is the key to reaching the summit", ideaCn: "坚持是到达顶峰的关键",
        authorIdea: "showing uncertainty can actually build trust", authorIdeaCn: "坦诚不确定性反而能建立信任",
        agent: "the whole society", agentCn: "全社会",
        audience: "the whole society", audienceCn: "全社会"
      },
      shared: {
        item1: "health literacy level", item1Cn: "健康素养水平",
        v1: "8.8%", v2: "25.4%", diff: "16.6", unit: "percentage points", unitCn: "百分点",
        multiple: "almost three",
        item2: "pursuing further study", item2Cn: "升学",
        item3: "starting a business", item3Cn: "创业",
        trend1: "decreased", trend1Cn: "下降", trend2: "climbed", trend2Cn: "上升",
        trend3: "rose slightly", trend3Cn: "小幅上升",
        v3: "26.3%", v4: "34.0%", v5: "1.3%", v6: "2.6%",
        action: "live a healthy life", actionCn: "过健康的生活",
        benefit1: "physical health", benefit1Cn: "身体健康",
        benefit2: "social progress", benefit2Cn: "社会进步",
        alternative: "a sedentary lifestyle", alternativeCn: "久坐不动的生活方式",
        phenomenon: "Chinese residents' health literacy level has been improving rapidly in recent years",
        phenomenonCn: "中国居民健康素养水平近年来迅速提高",
        exampleSubject: "my community, a lively neighborhood", exampleSubjectCn: "我的社区，一个充满活力的社区",
        exampleDetail: "places a high priority on this issue", exampleDetailCn: "高度重视这一问题",
        exampleBenefit: "brings tangible benefits to residents", exampleBenefitCn: "给居民带来了实实在在的好处",
        exampleResult: "Gradually, people's satisfaction has improved.", exampleResultCn: "渐渐地，人们的满意度提高了。"
      },
      selections: {
        overview: "ov-dyn1", detail: "det-dyn1",
        phenomenonTransition: "ph-t2", phenomenon: "ph-6",
        pictureIntro: "pic-in1", pictureThemeTransition: "pic-t1", pictureIdea: "pic-i1",
        textIntro: "txt-in1", textView: "txt-v1", stance: "st-1",
        transition: "tr-1",
        reason1: "rs-ex1", reason2: "rs-cl1", reason3: "rs-v2",
        conclusion: "con-1", measure1: "me-gov", measure2: "me-media", future: "fu-3"
      },
      fills: {},
      manualText: "",
      review: null
    };
  }

  function defaultSmallState() {
    return {
      exam: "英一",
      type: "letter",
      subtype: "suggest",
      mode: "active",
      promptId: null,
      salutationId: "sa6",
      greetingId: "gr-1",
      selfIntroId: "si-1",
      includeSelfIntro: true,
      transitionId: "st-2",
      emotionId: "te-1",
      replyId: "tr-3",
      closing: "Yours sincerely,",
      signature: "Li Ming",
      date: "December 20, 2025",
      time: "From 10:00 a.m. to 11:30 a.m.",
      place: "A111, conference room",
      objective: "Review the activity held last week",
      attendees: "All members",
      title: "Notice",
      bankIds: ["sb-43", "sb-45", "sb-46"],
      selections: {
        purpose: "pu-suggest", noticeFirst: "no-1", noticeSecond: "no-6", noticeThird: "no-9",
        minutesIntro: "mi-1", minutesPurpose: "mi-3", minutesSpeech: "mi-6", minutesAgree: "mi-9", minutesDecision: "mi-11"
      },
      settings: {
        audience: "the university library", audienceCn: "学校图书馆",
        lastName: "Lee", firstName: "Paul",
        department: "Department of Art", departmentCn: "艺术系",
        university: "our university", universityCn: "我校",
        event: "library orientation", eventCn: "图书馆新生说明会",
        place: "the main library", placeCn: "主图书馆",
        date: "next Monday", dateCn: "下周一",
        time: "5:00 p.m.", topic: "library service", topicCn: "图书馆服务",
        object: "the library service", objectCn: "图书馆服务",
        noun: "suggestions", nounCn: "建议",
        email: "studentunion@university.edu",
        action: "improve the service", actionCn: "改进服务"
      },
      shared: {
        point1: "the activity will be held next Sunday", point1Cn: "活动将于下周日举行",
        context: "I am writing to share some information with you", contextCn: "我写信是想与你分享一些信息",
        thing: "a quiet study area", thingCn: "一个安静的学习区",
        aspect: "the reading environment", aspectCn: "阅读环境",
        host: "the chairman", hostCn: "主席",
        opinion: "enough attention must be paid to library service", opinionCn: "必须对图书馆服务给予足够重视",
        speaker: "the project leader", speakerCn: "项目负责人",
        decision: "more funds will be allocated to improving library service", decisionCn: "将拨付更多资金改善图书馆服务",
        request: "extend the opening hours", requestCn: "延长开放时间",
        result: "have more time to study", resultCn: "有更多时间学习"
      },
      fills: {},
      manualText: "",
      review: null
    };
  }

  /* ------------------------------------------------------------------------
     智能批改
     ------------------------------------------------------------------------ */
  const TEMPLATE_SIGNATURES = [
    "it is apparent from the statistics that", "as is symbolically depicted", "the primary intention of the drawing",
    "to be specific", "for one thing", "for another", "in conclusion", "all in all",
    "there are", "not only", "only through", "i am writing", "i would be grateful",
    "the majority of", "it is imperative", "we should bear in mind", "compared with",
    "in contrast to", "it is not difficult to draw the conclusion", "from my perspective",
    "i wonder if", "we are badly in need", "the primary reasons", "please do not hesitate",
    "i would like to", "looking forward to hearing", "i hope this letter", "as for",
    "it is a pleasure to inform", "the relevant matters", "welcome to join us",
    "the meeting commenced", "the meeting aimed", "the meeting agreed"
  ];

  const STOPWORDS = new Set(("the a an and or but of to in on for with from by as at is are was were be been being this that these those it its their our your we they i you he she them us my me not no can will would could should may might must have has had do does did more most very also such than then there here what which who whom whose when where why how all any both each few many some own same so too s t just now into over after before between during through about against among without within upon").split(" "));

  const BASIC_WORDS = [
    { re: /\bvery important\b/gi, better: "of great importance", label: "very important" },
    { re: /\bmore and more\b/gi, better: "an increasing number of", label: "more and more" },
    { re: /\ba lot of\b/gi, better: "a host of", label: "a lot of" },
    { re: /\bI think\b/gi, better: "From my perspective", label: "I think" },
    { re: /\bgood\b/gi, better: "beneficial", label: "good" },
    { re: /\bbad\b/gi, better: "detrimental", label: "bad" },
    { re: /\bget\b/gi, better: "obtain", label: "get" }
  ];

  function reviewEssay(text, kind, context) {
    const s = context || {};
    const target = kind === "small" ? 100 : (s.exam === "英二" ? 150 : 180);
    const words = countWords(text);
    const paras = splitParagraphs(text);
    const bodyParas = kind === "small"
      ? paras.filter((p) => !/^(Dear\b|Yours\b|Best regards|Sincerely|Li Ming|Zhang Wei|Notice$|NOTICE$|Minutes of Meeting|Date:|Time:|Location:|Objective:|Attendees:|Recorded by:)/i.test(p.trim()))
      : paras;
    const isMinutes = kind === "small" && s.type === "minutes";
    const paraCount = isMinutes ? 3 : (kind === "small" ? Math.max(1, Math.min(3, bodyParas.length || paras.length)) : paras.length);
    const sentences = splitSentences(text);
    const lower = String(text || "").toLowerCase();
    const items = [];
    let score = 58;

    // 字数
    const ratio = words / target;
    if (ratio >= 0.9 && ratio <= 1.15) { score += 10; items.push({ status: "ok", text: `字数达标：${words} 词，目标约 ${target} 词。` }); }
    else if (ratio >= 0.75 && ratio <= 1.3) { score += 5; items.push({ status: "warn", text: `字数略偏：${words} 词，建议控制在 ${target} 词左右。` }); }
    else { items.push({ status: "bad", text: `字数问题：${words} 词，与目标 ${target} 词差距较大。` }); }

    // 段落
    if (paraCount === 3) {
      score += 8;
      items.push({ status: "ok", text: isMinutes ? "纪要格式完整：时间、地点、目的、参会人齐全。" : (kind === "small" ? "正文三段清晰，称呼与落款格式完整。" : "三段式清晰，结构分稳了。") });
    } else if (paraCount >= 2) {
      score += 4;
      items.push({ status: "warn", text: kind === "small" ? `正文约 ${paraCount} 段，建议写成“目的 / 细节 / 期待”三段。` : `当前 ${paraCount} 段，建议写成三段：引入 / 论证 / 总结。` });
    } else {
      items.push({ status: "bad", text: "没有分段或段落不清。阅卷老师第一眼就会扣结构分。" });
    }

    // 模板覆盖
    const hits = TEMPLATE_SIGNATURES.filter((p) => lower.includes(p));
    if (hits.length >= 5) { score += 8; items.push({ status: "ok", text: `模板骨架完整：检测到 ${hits.length} 处模板句式。` }); }
    else if (hits.length >= 2) { score += 4; items.push({ status: "warn", text: `模板句式偏少（${hits.length} 处），可补过渡句或总结句。` }); }
    else { items.push({ status: "bad", text: "几乎没有检测到模板骨架，文章可能偏口语或结构不清。" }); }

    // 连接词
    const transitions = ["firstly", "secondly", "thirdly", "to begin with", "moreover", "furthermore", "however", "therefore", "in conclusion", "all in all", "for one thing", "for another", "last but not least", "meanwhile", "by contrast", "as for", "in addition", "finally", "additionally", "i am writing", "i wonder if", "for instance", "for example", "in fact", "as a result", "consequently", "first and foremost", "what's more"];
    const tHits = transitions.filter((p) => lower.includes(p));
    if (tHits.length >= 3) { score += 6; items.push({ status: "ok", text: `衔接词丰富：${tHits.length} 处，层次清楚。` }); }
    else if (tHits.length >= 1) { score += 2; items.push({ status: "warn", text: "衔接词偏少，建议补 Firstly / Furthermore / Last but not least。" }); }
    else { items.push({ status: "bad", text: "缺少显性衔接词，三段之间像“拼接”。" }); }

    // 句长变化
    const lens = sentences.map((x) => countWords(x)).filter((n) => n > 0);
    const avg = lens.length ? lens.reduce((a, b) => a + b, 0) / lens.length : 0;
    const variance = lens.length ? lens.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / lens.length : 0;
    if (lens.length >= 8 && variance > 25) { score += 4; items.push({ status: "ok", text: `句式有长短变化（平均 ${avg.toFixed(1)} 词/句）。` }); }
    else if (lens.length < 6) { items.push({ status: "warn", text: "句子数量偏少，可把原因或措施展开成两句。" }); }
    else { items.push({ status: "warn", text: "句长比较平均，建议加入一句定语从句或倒装句。" }); }

    // 主题词
    const themeWords = String(s.settings?.theme || "").toLowerCase().split(/\s+/).filter((w) => w.length > 3 && !STOPWORDS.has(w)).slice(0, 3);
    if (themeWords.length) {
      const found = themeWords.filter((w) => lower.includes(w));
      if (found.length >= Math.min(2, themeWords.length)) { score += 4; items.push({ status: "ok", text: `主题词覆盖：${found.join(", ")}。` }); }
      else { items.push({ status: "warn", text: `主题词出现偏少，检查是否始终围绕「${s.settings.themeCn || s.settings.theme}」。` }); }
    }

    // 基础词
    const basic = [];
    BASIC_WORDS.forEach((b) => { if (b.re.test(text)) basic.push(b.label); b.re.lastIndex = 0; });
    if (basic.length) {
      score -= Math.min(6, basic.length * 2);
      items.push({ status: "warn", text: `可升级的基础表达：${basic.join(" / ")}。试试模板里的高级替换。` });
    }

    // 重复词
    const freq = {};
    (lower.match(/[a-z][a-z'-]{2,}/g) || []).forEach((w) => {
      if (!STOPWORDS.has(w) && w.length > 3) freq[w] = (freq[w] || 0) + 1;
    });
    const repeated = Object.keys(freq).filter((w) => freq[w] >= 4).sort((a, b) => freq[b] - freq[a]).slice(0, 3);
    if (repeated.length) {
      score -= 2;
      items.push({ status: "warn", text: `高频重复词：${repeated.map((w) => w + "×" + freq[w]).join("、")}。可换同义词。` });
    }

    // 常见语法 / 格式
    const grammar = [];
    if (/\bpeople\s+is\b/i.test(text)) grammar.push("people 是复数，用 people are");
    if (/\bthere\s+are\s+many\s+reason\b/i.test(text)) grammar.push("there are many reasons（reason 用复数）");
    if (/\bnot only\b/i.test(text) && !/\b(but also|but it also|but they also)\b/i.test(text)) grammar.push("not only 后缺 but also");
    if (/[a-z]\.[A-Z]/.test(text)) grammar.push("句号后要空格");
    if (/[ \t]{2,}/.test(text)) grammar.push("有多余空格");
    if (grammar.length) {
      score -= Math.min(6, grammar.length * 2);
      grammar.forEach((g) => items.push({ status: "bad", text: g }));
    } else {
      items.push({ status: "ok", text: "未发现明显的主谓一致、拼写和格式硬伤。" });
    }

    score = Math.max(42, Math.min(97, Math.round(score)));
    const full = kind === "small" ? 10 : (s.exam === "英二" ? 15 : 20);
    const band = (score / 100 * full).toFixed(1);
    const suggestions = [];
    if (basic.length) suggestions.push(`把 ${basic.slice(0, 2).join(" / ")} 换成模板里的高级表达，语言分立刻不一样。`);
    if (hits.length < 5) suggestions.push("至少补 5 处模板骨架：图表/图画引入、过渡句、原因句、总结句、展望句。");
    if (paraCount !== 3) suggestions.push("按“第一段引入 — 第二段原因 — 第三段总结”重新分段。");
    if (kind === "small" && paraCount !== 3) suggestions.push("小作文正文按“目的 — 细节 — 期待”三段写，称呼和落款不算正文段落。");
    if (words < target * 0.85) suggestions.push("字数不够时，优先展开原因三和措施二，不要在第一段堆数据。");
    if (!suggestions.length) suggestions.push("整体骨架已经稳了。下一步：替换 2 处主题词、加 1 个具体例子，让文章更像你自己写的。");

    return {
      score, band, full, words, target, paragraphs: paraCount, sentences: sentences.length,
      templateHits: hits.length, transitions: tHits.length,
      items, suggestions,
      level: score >= 85 ? "稳健高分" : score >= 72 ? "结构合格" : score >= 60 ? "需要补强" : "风险较高"
    };
  }

  /* ------------------------------------------------------------------------
     润色 / 提纲 / 审题
     ------------------------------------------------------------------------ */
  function polish(text) {
    let out = String(text || "");
    const changes = [];
    BASIC_WORDS.forEach((b) => {
      if (b.re.test(out)) {
        changes.push(`${b.label} → ${b.better}`);
        b.re.lastIndex = 0;
        out = out.replace(b.re, b.better);
      }
      b.re.lastIndex = 0;
    });
    out = out.replace(/\s+([,.;:!?])/g, "$1").replace(/([.!?])([A-Za-z])/g, "$1 $2");
    return { text: out, changes };
  }

  function outlineBig(state) {
    const s = state || {};
    const theme = s.settings?.themeCn || s.settings?.theme || "主题";
    const type = s.type || "chart";
    if (type === "chart") {
      return [
        `第一段：总体描述（${theme}的变化/分布）→ 细节数据（2 个数字）→ 社会现象（${theme}越来越受关注）。`,
        "第二段：过渡句 → 原因一（举例：身边的人/社区）→ 原因二（从句 + 六大方面）→ 原因三（虚拟语气）。",
        "第三段：总结（足够重视）→ 措施（政府 + 媒体/个人）→ 展望（和谐平衡/光明未来）。"
      ];
    }
    if (type === "picture") {
      return [
        `第一段：描述画面（主体 + 动作 + 细节）→ 点出寓意（${theme}很重要）。`,
        "第二段：过渡句 → 原因一（举例）→ 原因二（群众路线/从句）→ 原因三（虚拟语气）。",
        "第三段：总结 → 措施（政府/学校/个人）→ 展望。"
      ];
    }
    return [
      "第一段：改写材料中的现象 + 改写作者观点 + 明确表明态度。",
      "第二段：过渡句 → 原因一（举例）→ 原因二（从句）→ 原因三（虚拟语气）。",
      "第三段：总结 → 措施 → 展望。"
    ];
  }

  function outlineSmall(state) {
    const s = state || {};
    const type = s.type || "letter";
    if (type === "notice") return [
      "标题：Notice；第一段：通知概况 + 通知目的。",
      "第二段：时间地点 → 参与对象 → 流程/要求 → 奖励/收获。",
      "第三段：发出邀请 + 报名方式；右下角落款 + 日期。"
    ];
    if (type === "minutes") return [
      "纪要头：Date / Time / Location / Objective / Attendees。",
      "正文：导入 → 会议目的 → 大佬发言 → 手下赞同 → 最终决定 → （下次会议）。",
      "右下角：Recorded by + 日期。"
    ];
    return [
      "称呼：根据收信人选择 Mr./Ms./Professor/Dear Sir or Madam。",
      "第一段：寒暄 + 写信目的（一句话说清楚）。",
      "第二段：过渡句 + 2~3 个分点（时间地点、目的、流程、要求、好处）。",
      "第三段：表达情感 + 期待回信；落款 Yours sincerely, Li Ming。"
    ];
  }

  function topicInsight(prompt) {
    if (!prompt) return null;
    const text = [prompt.topic, prompt.topicEn, prompt.prompt].join(" ");
    const themes = [
      { keys: ["机器人", "科技", "人工智能", "创新", "robot"], theme: "technological innovation", themeCn: "科技创新", benefit: "quality of life", benefitCn: "生活质量" },
      { keys: ["文化", "传统", "龙舟", "家书", "京剧"], theme: "cultural inheritance", themeCn: "文化传承", benefit: "cultural confidence", benefitCn: "文化自信" },
      { keys: ["环境", "污染", "绿色", "垃圾"], theme: "environmental protection", themeCn: "环境保护", benefit: "sustainable development", benefitCn: "可持续发展" },
      { keys: ["教育", "读书", "学习", "讲座", "课程"], theme: "education and lifelong learning", themeCn: "教育与终身学习", benefit: "personal growth", benefitCn: "个人成长" },
      { keys: ["健康", "锻炼", "养老", "老人", "户外"], theme: "health and well-being", themeCn: "健康与福祉", benefit: "quality of life", benefitCn: "生活质量" },
      { keys: ["合作", "团队", "交流", "沟通"], theme: "cooperation and communication", themeCn: "合作与沟通", benefit: "mutual success", benefitCn: "共同成功" },
      { keys: ["坚持", "自信", "乐观", "习惯", "选择"], theme: "personal qualities", themeCn: "个人品质", benefit: "self-realization", benefitCn: "自我实现" }
    ];
    const hit = themes.find((t) => t.keys.some((k) => text.includes(k)));
    return hit || { theme: prompt.topicEn || "the topic", themeCn: prompt.topic, benefit: "personal growth", benefitCn: "个人成长" };
  }

  /* ------------------------------------------------------------------------
     本地 AI 教练
     ------------------------------------------------------------------------ */
  function localChat(message, ctx) {
    const q = String(message || "").toLowerCase();
    const kind = ctx?.kind || "big";
    const state = ctx?.state;
    const prompt = ctx?.prompt;
    const draft = ctx?.draft || "";

    const topic = D.coachTopics.find((t) => t.keys.some((k) => q.includes(k)));
    if (topic) {
      return {
        text: `<p><strong>${escapeHtml(topic.title)}</strong></p><ul>${topic.body.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul><p class="msg-note">本地教练模式：这些结论来自你上传的模板讲义。配置 API 后可以让大模型针对你的作文逐句改写。</p>`,
        suggestions: ["帮我审题", "生成一篇初稿", "按评分标准批改"]
      };
    }

    if (/审题|题目|立意|跑题/.test(q)) {
      const insight = topicInsight(prompt);
      const points = prompt?.points || (kind === "small" ? ["说明写信目的", "展开细节", "表达期待"] : ["描述", "解释", "评论"]);
      return {
        text: `<p><strong>审题结果</strong></p><ul>` +
          `<li>题型：${escapeHtml(prompt?.typeName || (kind === "small" ? "应用文" : "大作文"))}</li>` +
          `<li>主题：${escapeHtml(prompt?.topic || insight?.themeCn || "自定义题目")}</li>` +
          `<li>写作要点：${points.map((p) => escapeHtml(p)).join("；")}</li>` +
          `<li>建议主题词：<span class="en-line">${escapeHtml(insight?.theme || "the topic")}</span>（${escapeHtml(insight?.themeCn || "")}）</li>` +
          `<li>好处/方面：<span class="en-line">${escapeHtml(insight?.benefit || "personal growth")}</span></li>` +
          `</ul><p>先确定这三件事，再动笔。模板只负责骨架，主题词和好处必须自己换。</p>`,
        suggestions: ["生成提纲", "给我三个原因", "生成一篇初稿"]
      };
    }

    if (/提纲|框架|结构|怎么安排/.test(q)) {
      const list = kind === "small" ? outlineSmall(state) : outlineBig(state);
      return { text: `<p><strong>${kind === "small" ? "小作文" : "大作文"}提纲</strong></p><ol>${list.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ol>`, suggestions: ["生成一篇初稿", "给我三个原因"] };
    }

    if (/初稿|范文|生成|帮我写|写一篇/.test(q)) {
      const essay = kind === "small" ? composeSmall(state || defaultSmallState()) : composeBig(state || defaultBigState());
      return {
        text: `<p><strong>按当前模板生成的初稿</strong>（可以直接复制到右侧编辑，再把 ______ 补完）</p><pre style="white-space:pre-wrap;font-family:var(--serif);font-size:12.5px;line-height:1.7;background:rgba(255,255,255,.5);padding:10px;border-radius:7px;border:1px solid var(--line)">${escapeHtml(essay)}</pre><p class="msg-note">这是“模板拼装版”，不是最终答案。请至少替换主题词、好处和一个具体例子。</p>`,
        suggestions: ["按评分标准批改", "这句怎么升级", "给我三个原因"]
      };
    }

    if (/原因|三个理由|论证/.test(q)) {
      const theme = state?.settings?.theme || "the topic";
      const benefit = state?.settings?.benefit || "personal growth";
      const s = state || defaultBigState();
      const ids = ["rs-ex1", "rs-cl1", "rs-v2"];
      const lines = ids.map((id) => {
        const opt = getBigOption(id);
        return `<li>${escapeHtml(fillPlain(opt.en, optionValues("big", s, opt)))}</li>`;
      }).join("");
      return {
        text: `<p><strong>三个原因，三种句式</strong>（把空位换成你的主题）</p><ol>${lines}</ol><p>主题词：<span class="en-line">${escapeHtml(theme)}</span>；好处：<span class="en-line">${escapeHtml(benefit)}</span>。三个人称、三种句式，层次就出来了。</p>`,
        suggestions: ["生成一篇初稿", "按评分标准批改"]
      };
    }

    if (/升级|润色|高级|替换/.test(q)) {
      if (!draft || draft.length < 20) return { text: "<p>右侧还没有作文。先点「生成初稿」，或把写好的段落粘贴到预览区，我再帮你找可升级的表达。</p>", suggestions: ["生成一篇初稿", "给我三个原因"] };
      const r = polish(draft);
      return {
        text: `<p><strong>可升级表达</strong></p>` + (r.changes.length ? `<ul>${r.changes.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}</ul>` : "<p>没有检测到明显的基础表达，语言已经比较稳。</p>") + `<p class="msg-note">建议先改 2~3 处，不要整篇换词，容易改出语法错误。</p>`,
        suggestions: ["按评分标准批改", "这句怎么升级"]
      };
    }

    if (/批改|评分|打分|多少分/.test(q)) {
      if (!draft || draft.length < 20) return { text: "<p>还没有可批改的作文。先写一篇，或点「生成初稿」。</p>", suggestions: ["生成一篇初稿"] };
      const r = reviewEssay(draft, kind, state || {});
      return {
        text: `<p><strong>预估 ${r.band} / ${r.full} 分</strong>（${r.level}）</p><ul>${r.items.map((i) => `<li>${i.status === "ok" ? "✅" : i.status === "warn" ? "⚠️" : "❌"} ${escapeHtml(i.text)}</li>`).join("")}</ul><p><strong>下一步：</strong>${escapeHtml(r.suggestions[0])}</p>`,
        suggestions: ["这句怎么升级", "给我三个原因"]
      };
    }

    if (/小作文|书信|建议信|邀请信|通知|答复信|投诉信|推荐信/.test(q)) {
      const t = D.coachTopics.find((x) => x.keys.includes("小作文"));
      return {
        text: `<p><strong>小作文：先定三件事</strong></p><ol><li>收信人是谁？决定称呼和要不要自我介绍。</li><li>写信目的是什么？第一段一句话说清。</li><li>题干给了哪 2~3 个要点？第二段逐点写，每点一句。</li></ol><p>第二段可以直接从「功能句库」里挑：时间地点、目的、流程、要求、好处、感谢/道歉。不要按“建议信/投诉信”分别背，按功能背。</p>`,
        suggestions: ["生成一篇初稿", "给我三个原因", "按评分标准批改"]
      };
    }

    if (/图表|柱状|线状|饼状|表格|数据/.test(q)) {
      const t = D.coachTopics.find((x) => x.keys.includes("图表"));
      return { text: `<p><strong>图表描述：先总体，再细节</strong></p><ul>${t.body.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>`, suggestions: ["生成一篇初稿", "给我三个原因"] };
    }

    return {
      text: `<p>我在。你可以直接告诉我：</p><ul><li>「帮我审题」——分析当前题目和主题词</li><li>「生成一篇初稿」——按你选的模板拼一篇</li><li>「给我三个原因」——三种句式的理由</li><li>「按评分标准批改」——结构、字数、模板覆盖、语言</li></ul><p class="msg-note">当前是本地教练模式。右上角「AI 设置」可接入 DeepSeek / OpenAI 兼容模型，进行更细的逐句改写。</p>`,
      suggestions: D.quickReplies.slice(0, 4)
    };
  }

  /* ------------------------------------------------------------------------
     远程大模型
     ------------------------------------------------------------------------ */
  function buildSystemPrompt(ctx) {
    const kind = ctx?.kind || "big";
    const state = ctx?.state || {};
    const prompt = ctx?.prompt;
    const theme = state.settings?.theme || "";
    const draft = ctx?.draft || "";
    return [
      "你是考研英语作文教练，服务对象是 27 考研学生。你的任务不是替学生写一篇“范文”，而是帮他把模板用对、用活。",
      "必须遵守：",
      "1. 大作文三段：第一段引入+细节+主题/现象；第二段过渡+三点原因；第三段总结+两点措施+展望。",
      "2. 小作文：称呼+第一段目的+第二段2-3个分点+第三段情感/期待+落款。",
      "3. 语言用考研书面语，句子长短结合；不要用口语；不要堆砌生僻词。",
      "4. 学生用模板写作，你要指出“哪一句模板用得好、哪一句需要换主题词”。",
      "5. 输出中文讲解 + 英文句子；英文句子要能直接放进作文。",
      "6. 不要编造真题数据；数据以学生提供的为准。",
      "",
      `当前任务：${kind === "small" ? "小作文" : "大作文"}。`,
      prompt ? `当前真题：${[prompt.year, prompt.exam, prompt.typeName, prompt.topic].filter(Boolean).join(" · ")}` : "",
      theme ? `主题词：${theme}` : "",
      draft ? `学生当前作文：\n${draft}` : "学生还没有成稿。",
      "",
      "如果学生要求“写一篇”，请按模板结构写一篇 160-200 词（小作文 100 词）的英文作文，并在后面用 3 条中文说明每段用了什么模板。"
    ].filter(Boolean).join("\n");
  }

  async function remoteChat(messages, config) {
    const cfg = config || {};
    if (!cfg.apiKey && !(cfg.baseUrl || "").includes("localhost")) {
      throw new Error("还没有配置 API Key。请点右上角「AI 设置」填写，或继续使用本地教练。");
    }
    const baseUrl = (cfg.baseUrl || "https://api.deepseek.com/v1").replace(/\/+$/, "");
    const endpoint = /\/chat\/completions$/i.test(baseUrl) ? baseUrl : baseUrl + "/chat/completions";
    const model = cfg.model || "deepseek-chat";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 70000);
    try {
      let res;
      if (cfg.useProxy !== false) {
        res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ baseUrl, apiKey: cfg.apiKey, model, messages, temperature: 0.65 }),
          signal: controller.signal
        });
      } else {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + cfg.apiKey },
          body: JSON.stringify({ model, messages, temperature: 0.65 }),
          signal: controller.signal
        });
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error?.message || `接口返回 ${res.status}。请检查 Base URL、模型名和 Key。`);
      }
      const content = data?.choices?.[0]?.message?.content;
      if (!content) throw new Error("接口没有返回内容。请检查模型名是否正确。");
      return content.trim();
    } finally {
      clearTimeout(timer);
    }
  }

  /* ------------------------------------------------------------------------
     导出
     ------------------------------------------------------------------------ */
  const api = {
    escapeHtml, label, clone, countWords, splitParagraphs, splitSentences, stripTags,
    getBigOption, getSmallOption, allBigOptions, allSmallOptions, bigIndex, smallIndex,
    fillPlain, fillHtml, mergedValues, optionValues,
    composeBig, composeSmall, bigParagraphs, smallParagraphs,
    defaultBigState, defaultSmallState,
    reviewEssay, polish, outlineBig, outlineSmall, topicInsight,
    localChat, remoteChat, buildSystemPrompt
  };

  window.KY.engine = api;
})();
