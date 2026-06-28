const DATA = window.APP_DATA.rows;
const META = window.APP_DATA.meta;
const CANDIDATE_RANK = META.candidateRank;

const riskOrder = { "冲": 0, "小冲": 1, "贴线": 2, "较稳": 3, "保底": 4, "无位次": 5 };
const recommendedRiskOrder = { "贴线": 0, "较稳": 1, "保底": 2, "小冲": 3, "冲": 4, "无位次": 5 };
const safeOrder = { "保底": 0, "较稳": 1, "贴线": 2, "小冲": 3, "冲": 4, "无位次": 5 };
const regionOrder = { "浙江": 0, "广州": 1, "广东": 2, "广西": 3, "其他": 4 };
const natureOrder = { "公办": 0, "中外合作办学": 1, "民办": 2, "": 9 };
const chanceLabels = {
  "冲": "0-20% 很低",
  "小冲": "20-40% 偏低",
  "贴线": "40-55% 接近",
  "较稳": "55-75% 较高",
  "保底": "75%+ 高",
  "无位次": "暂无参考",
};
const independentRanks = {
  "厦门大学嘉庚学院": "ABC独立2026 全国1",
  "东南大学成贤学院": "ABC独立2026 全国2",
  "电子科技大学成都学院": "ABC独立2026 全国3",
  "南京医科大学康达学院": "ABC独立2026 全国4",
  "电子科技大学中山学院": "ABC独立2026 全国5",
  "南京理工大学紫金学院": "ABC独立2026 全国6",
  "温州医科大学仁济学院": "ABC独立2026 全国7",
  "南京航空航天大学金城学院": "ABC独立2026 全国8",
  "宁波大学科学技术学院": "ABC独立2026 全国9",
  "延安大学西安创新学院": "ABC独立2026 全国10",
  "浙江工商大学杭州商学院": "ABC独立2026 全国11",
  "集美大学诚毅学院": "ABC独立2026 全国12",
  "南京邮电大学通达学院": "ABC独立2026 全国13",
  "四川大学锦江学院": "ABC独立2026 全国14",
  "华北理工大学轻工学院": "ABC独立2026 全国15",
  "浙江工业大学之江学院": "独立学院全国第3｜多榜前列",
  "中南林业科技大学涉外学院": "ABC独立2026 全国17",
  "福州大学至诚学院": "ABC独立2026 全国18",
  "杭州电子科技大学信息工程学院": "ABC独立2026 全国20",
  "西安交通大学城市学院": "ABC独立2026 全国21",
  "中国矿业大学徐海学院": "ABC独立2026 全国22",
  "北京科技大学天津学院": "ABC独立2026 全国24",
  "上海外国语大学贤达经济人文学院": "ABC独立2026 全国25",
  "福建师范大学协和学院": "ABC独立2026 全国26",
  "西南财经大学天府学院": "ABC独立2026 全国27",
  "浙江财经大学东方学院": "ABC独立2026 全国33",
  "扬州大学广陵学院": "ABC独立2026 全国34",
  "三峡大学科技学院": "ABC独立2026 全国35",
  "北京邮电大学世纪学院": "ABC独立2026 全国36",
  "北京中医药大学东方学院": "ABC独立2026 全国37",
  "南京师范大学泰州学院": "ABC独立2026 全国38",
  "上海师范大学天华学院": "ABC独立2026 全国39",
  "南京师范大学中北学院": "ABC独立2026 全国40",
  "石家庄铁道大学四方学院": "ABC独立2026 全国42",
  "南京财经大学红山学院": "ABC独立2026 全国43",
  "南京工业大学浦江学院": "ABC独立2026 全国45",
  "江西财经大学现代经济管理学院": "ABC独立2026 全国46",
  "成都理工大学工程技术学院": "ABC独立2026 全国50",
  "浙江农林大学暨阳学院": "ABC独立2026 全国51",
  "昆明理工大学津桥学院": "ABC独立2026 全国52",
  "南京审计大学金审学院": "ABC独立2026 全国54",
  "苏州大学应用技术学院": "ABC独立2026 全国55",
  "天津医科大学临床医学院": "ABC独立2026 全国58",
  "天津财经大学珠江学院": "ABC独立2026 全国59",
  "福建农林大学金山学院": "ABC独立2026 全国60",
  "江苏大学京江学院": "ABC独立2026 全国61",
  "浙江师范大学行知学院": "ABC独立2026 全国64",
  "上海财经大学浙江学院": "ABC独立2026 全国65",
  "吉林师范大学博达学院": "ABC独立2026 全国66",
  "辽宁师范大学海华学院": "ABC独立2026 全国67",
  "重庆工商大学派斯学院": "ABC独立2026 全国69",
  "江苏科技大学苏州理工学院": "ABC独立2026 全国70",
  "江苏师范大学科文学院": "ABC独立2026 全国71",
  "湖北师范大学文理学院": "ABC独立2026 全国72",
  "江西师范大学科学技术学院": "ABC独立2026 全国73",
  "长江大学文理学院": "ABC独立2026 全国74",
  "西南交通大学希望学院": "ABC独立2026 全国76",
  "湖北大学知行学院": "ABC独立2026 全国78",
  "广西民族大学相思湖学院": "ABC独立2026 全国79",
  "内蒙古大学创业学院": "ABC独立2026 全国82",
  "浙江理工大学科技与艺术学院": "ABC独立2026 全国84",
  "天津外国语大学滨海外事学院": "ABC独立2026 全国85",
  "南通大学杏林学院": "ABC独立2026 全国86",
  "西北大学现代学院": "ABC独立2026 全国88",
  "苏州科技大学天平学院": "ABC独立2026 全国93",
  "南宁师范大学师园学院": "ABC独立2026 全国91",
  "湖北工程学院新技术学院": "ABC独立2026 全国99",
  "天津理工大学中环信息学院": "ABC独立2026 全国100+",
  "中国计量大学现代科技学院": "ABC独立2026 全国100+",
  "湖北经济学院法商学院": "ABC独立2026 全国100+",
  "常州大学怀德学院": "ABC独立2026 全国100+",
  "天津商业大学宝德学院": "ABC独立2026 全国100+",
  "江西农业大学南昌商学院": "ABC独立2026 全国100+",
  "武汉工程大学邮电与信息工程学院": "ABC独立2026 全国100+",
  "湖北文理学院理工学院": "ABC独立2026 全国100+",
  "衡阳师范学院南岳学院": "ABC独立2026 全国100+",
  "武汉体育学院体育科技学院": "ABC独立2026 全国100+",
  "湖南科技大学潇湘学院": "ABC独立2026 全国100+",
};

const els = {
  filtersPanel: document.querySelector("#filtersPanel"),
  overlay: document.querySelector("#overlay"),
  openFilters: document.querySelector("#openFilters"),
  closeFilters: document.querySelector("#closeFilters"),
  search: document.querySelector("#searchInput"),
  region: document.querySelector("#regionSelect"),
  nature: document.querySelector("#natureSelect"),
  direction: document.querySelector("#directionSelect"),
  tuition: document.querySelector("#tuitionInput"),
  strongFallbackPrivate: document.querySelector("#strongFallbackPrivate"),
  favoritesOnly: document.querySelector("#favoritesOnly"),
  hideVocational: document.querySelector("#hideVocational"),
  reset: document.querySelector("#resetBtn"),
  export: document.querySelector("#exportBtn"),
  sort: document.querySelector("#sortSelect"),
  mobileSort: document.querySelector("#mobileSort"),
  tabs: [...document.querySelectorAll(".tab")],
  tableBody: document.querySelector("#tableBody"),
  cards: document.querySelector("#cardList"),
  planSelect: document.querySelector("#planSelect"),
  planBoard: document.querySelector("#planBoard"),
  empty: document.querySelector("#emptyState"),
  resultLabel: document.querySelector("#resultLabel"),
  totalCount: document.querySelector("#totalCount"),
  zjCount: document.querySelector("#zjCount"),
  gdCount: document.querySelector("#gdCount"),
  publicCount: document.querySelector("#publicCount"),
  safeCount: document.querySelector("#safeCount"),
};

let state = {
  tab: "all",
  sort: "recommended",
  activePlan: "zhijiang",
};

let favorites = new Set(JSON.parse(localStorage.getItem("gxVolunteerFavorites") || "[]"));

function saveFavorites() {
  localStorage.setItem("gxVolunteerFavorites", JSON.stringify([...favorites]));
}

function fmt(value) {
  if (value === null || value === undefined || value === "") return "无";
  return Number(value).toLocaleString("zh-CN");
}

function rankText(value) {
  if (value === null || value === undefined || value === "") return "无";
  return `第 ${fmt(value)} 名`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function riskBadge(risk) {
  return `<span class="badge chance-badge risk-${escapeHtml(risk)}">${escapeHtml(chanceLabels[risk] || risk)}</span>`;
}

function gapText(row) {
  if (row.rankGap === null || row.rankGap === undefined) return `<span>无</span>`;
  const text = row.rankGap >= 0 ? `比她后 ${fmt(row.rankGap)} 名` : `还差 ${fmt(Math.abs(row.rankGap))} 名`;
  const cls = row.rankGap >= 0 ? "gap-positive" : "gap-negative";
  return `<span class="${cls}">${text}</span>`;
}

function plainGapText(row) {
  if (row.rankGap === null || row.rankGap === undefined) return "无";
  return row.rankGap >= 0 ? `比她后 ${fmt(row.rankGap)} 名` : `还差 ${fmt(Math.abs(row.rankGap))} 名`;
}

function independentRankText(row) {
  return independentRanks[row.school] || "";
}

const cityTiers = {
  北京: "一线",
  上海: "一线",
  广州: "一线",
  深圳: "一线",
  杭州: "一线",
  绍兴: "二线",
  宁波: "二线",
  温州: "二线",
  金华: "二线",
  嘉兴: "二线",
  东莞: "二线",
  佛山: "二线",
  南京: "二线",
  苏州: "二线",
  天津: "二线",
  成都: "二线",
  重庆: "二线",
  武汉: "二线",
  西安: "二线",
  厦门: "二线",
  福州: "二线",
  南宁: "二线",
  泉州: "二线",
  珠海: "二线",
  无锡: "二线",
  常州: "三线",
  南通: "三线",
  扬州: "三线",
  徐州: "三线",
  镇江: "三线",
  湖州: "三线",
  台州: "三线",
  桂林: "三线",
  柳州: "三线",
  湛江: "三线",
  清远: "三线",
  肇庆: "三线",
  海口: "三线",
  绵阳: "三线",
  崇左: "四线",
  扶绥: "县城",
};

const schoolCities = {
  "浙江工业大学之江学院": "绍兴",
  "浙江师范大学行知学院": "金华",
  "上海财经大学浙江学院": "金华",
  "宁波财经学院": "宁波",
  "宁波大学科学技术学院": "宁波",
  "杭州电子科技大学信息工程学院": "杭州",
  "浙江农林大学暨阳学院": "绍兴",
  "浙江工商大学杭州商学院": "杭州",
  "浙江财经大学东方学院": "嘉兴",
  "浙江越秀外国语学院": "绍兴",
  "温州商学院": "温州",
  "广州城市理工学院": "广州",
  "广州新华学院": "广州",
  "广州理工学院": "广州",
  "广州应用科技学院": "广州",
  "广州华商学院": "广州",
  "东莞城市学院": "东莞",
  "湛江科技学院": "湛江",
  "南宁理工学院": "南宁/桂林",
  "广西外国语学院": "南宁/扶绥",
  "柳州工学院": "柳州",
  "桂林信息科技学院": "桂林",
};

const campusCityHints = [
  ["东莞", "东莞"],
  ["绍兴", "绍兴"],
  ["柯桥", "绍兴"],
  ["杭州", "杭州"],
  ["下沙", "杭州"],
  ["钱塘", "杭州"],
  ["萧山", "杭州"],
  ["临安", "杭州"],
  ["桐庐", "杭州"],
  ["教工路", "杭州"],
  ["宁波", "宁波"],
  ["海曙", "宁波"],
  ["杭州湾", "宁波"],
  ["梅山", "宁波"],
  ["温州", "温州"],
  ["金华", "金华"],
  ["海宁", "嘉兴"],
  ["嘉兴", "嘉兴"],
  ["广州", "广州"],
  ["花都", "广州"],
  ["清远", "清远"],
  ["佛山", "佛山"],
  ["南海", "佛山"],
  ["湛江", "湛江"],
  ["南宁", "南宁"],
  ["五合", "南宁"],
  ["扶绥", "扶绥"],
  ["空港", "扶绥"],
  ["柳州", "柳州"],
  ["桂林", "桂林"],
];

function cityTier(city) {
  if (!city) return "";
  const first = String(city).split(/[\/、]/)[0];
  return cityTiers[first] || "";
}

function campusText(row) {
  const remark = row.remark || "";
  const match = remark.match(/在([^，。；）)]{1,24}?(?:校区|市|县|区|办学点))办学/);
  if (match) return match[1];
  const simpleMatch = remark.match(/在([^，。；）)]{1,12})办学/);
  if (simpleMatch) return simpleMatch[1];
  const studyMatch = remark.match(/在([^，。；）)]{1,24}?)就读/);
  if (studyMatch) return studyMatch[1];
  return "";
}

function studyPlace(row) {
  const text = `${row.remark || ""} ${row.school || ""}`;
  const hinted = campusCityHints.find(([key]) => text.includes(key));
  const city = hinted ? hinted[1] : schoolCities[row.school] || row.province || "";
  const tier = cityTier(city);
  const campus = campusText(row);
  const parts = [city, tier, campus && !String(campus).includes(city) ? campus : ""].filter(Boolean);
  return parts.join(" · ");
}

function studyCity(row) {
  const place = studyPlace(row);
  return place ? place.split(" · ")[0] : "";
}

function cityReason(row) {
  const city = studyCity(row);
  const tier = cityTier(city);
  if (!city) return "";
  if (city === "绍兴") return "绍兴二线，离杭州近";
  if (city === "杭州") return "杭州一线";
  if (city === "东莞") return "东莞二线，靠近广深";
  if (city === "广州") return "广州一线";
  if (tier) return `${city}${tier}`;
  return city;
}

function rankGap2024(row) {
  const rank = row.groupRank2024 ?? row.schoolEasyRank2024;
  return rank ? rank - CANDIDATE_RANK : null;
}

function gapReason(label, gap) {
  if (gap === null || gap === undefined) return "";
  return gap >= 0 ? `${label}比她后${fmt(gap)}名` : `${label}还差${fmt(Math.abs(gap))}名`;
}

function scoreByGap(gap) {
  if (gap === null || gap === undefined) return 18;
  if (gap >= 10000) return 45;
  if (gap >= 7000) return 40;
  if (gap >= 4000) return 35;
  if (gap >= 0) return 28;
  if (gap >= -3000) return 18;
  if (gap >= -8000) return 9;
  return 2;
}

function independentRankNumber(row) {
  const text = independentRankText(row);
  const match = text.match(/全国(?:第)?(\d+)/);
  return match ? Number(match[1]) : null;
}

function schoolScore(row) {
  if (row.nature === "公办") return 15;
  const rank = independentRankNumber(row);
  if (rank && rank <= 5) return 15;
  if (rank && rank <= 20) return 13;
  if (rank && rank <= 50) return 10;
  if (rank && rank <= 100) return 7;
  return row.nature === "民办" ? 5 : 6;
}

function locationScore(row) {
  const city = studyCity(row);
  const tier = cityTier(city);
  let score = 7;
  if (tier === "一线") score = 18;
  else if (tier === "二线") score = 14;
  else if (tier === "三线") score = 8;
  else if (tier === "四线") score = 5;
  else if (tier === "县城") score = 2;
  if (city === "绍兴") score += 2;
  if (row.province === "浙江" || row.region === "广州") score += 1;
  return Math.min(score, 18);
}

function planScore(row) {
  const plan = row.plan || 0;
  if (plan >= 10) return 12;
  if (plan >= 5) return 10;
  if (plan >= 3) return 7;
  if (plan >= 2) return 5;
  if (plan >= 1) return 2;
  return 0;
}

function majorFitScore(row) {
  if (row.direction === "财会管理") return 7;
  if (row.direction === "互联网商业" || row.direction === "传媒内容") return 7;
  if (row.direction === "语言外贸") return 6;
  if (row.direction === "计算机数据") return 6;
  if (row.direction === "商科管理") return 5;
  return 3;
}

function tuitionScore(row) {
  const fee = row.tuitionNum;
  if (!fee) return 1;
  if (fee <= 18000) return 3;
  if (fee <= 25000) return 2;
  if (fee <= 32000) return 1;
  return 0;
}

function preferenceScore(row) {
  return row.school === "浙江工业大学之江学院" ? 5 : 0;
}

function recommendation(row) {
  const gap24 = rankGap2024(row);
  const gapScores = [scoreByGap(row.rankGap)];
  if (gap24 !== null) gapScores.push(scoreByGap(gap24));
  const admission = Math.round(gapScores.reduce((sum, value) => sum + value, 0) / gapScores.length);
  const score = Math.max(
    0,
    Math.min(
      100,
      admission +
        planScore(row) +
        locationScore(row) +
        schoolScore(row) +
        majorFitScore(row) +
        tuitionScore(row) +
        preferenceScore(row),
    ),
  );
  const reasons = [
    preferenceScore(row) ? "重点关注学校" : "",
    row.school === "浙江工业大学之江学院" ? "第一学期后就能转专业" : "",
    gapReason("25年", row.rankGap),
    gapReason("24年", gap24),
    cityReason(row),
    independentRankText(row),
    row.plan ? `招${fmt(row.plan)}人` : "",
    row.direction,
  ].filter(Boolean);
  return { score, reason: reasons.slice(0, 4).join("；") };
}

const juniorFallbacks = [
  {
    school: "中山火炬职业技术学院",
    major: "跨境电子商务",
    province: "广东",
    nature: "公办",
    group: "（102）",
    direction: "互联网商业",
    place: "中山 · 二线",
    groupScore2025: 365,
    groupRank2025: 72439,
    rankGap: 29884,
    plan: 10,
    tuition: "5250",
    note: "广东公办专科，位次很宽，跨境电商方向；只作最后保险",
  },
  {
    school: "广东女子职业技术学院",
    major: "工商企业管理",
    province: "广东",
    nature: "公办",
    group: "（101）",
    direction: "商科管理",
    place: "广州番禺 · 一线",
    groupScore2025: 349,
    groupRank2025: 80796,
    rankGap: 38241,
    plan: 8,
    tuition: "5250",
    note: "广东公办专科，只招女生，位次很宽；只作最后保险",
  },
];

function planRowKey(row) {
  return `${row.school}|${row.major}`;
}

function findPlanRow(school, major) {
  return (
    DATA.find((row) => row.school === school && row.major === major) ||
    DATA.find((row) => row.school === school && row.major.includes(major))
  );
}

function planSeed(school, major, role, note = "") {
  const row = findPlanRow(school, major);
  return row ? { row, role, note } : null;
}

function makePlanSeeds(seeds) {
  return seeds
    .map(([school, major, role, note]) => planSeed(school, major, role, note))
    .filter(Boolean);
}

function schoolBundle(school, majors, role, note = "") {
  const schoolRows = DATA.filter((row) => row.school === school);
  const selected = majors
    .map((major) => schoolRows.find((row) => row.major === major) || schoolRows.find((row) => row.major.includes(major)))
    .filter(Boolean);
  if (!selected.length) return null;
  const representative =
    selected.find((row) => row.major === "汉语言文学") ||
    selected.find((row) => row.major === "电子商务") ||
    selected[0];
  const uniqueMajors = [...new Set(selected.map((row) => row.major))];
  const totalPlan = selected.reduce((sum, row) => sum + (row.plan || 0), 0);
  const fees = selected.map((row) => row.tuitionNum).filter(Boolean);
  const minFee = fees.length ? Math.min(...fees) : null;
  const maxFee = fees.length ? Math.max(...fees) : null;
  return {
    kind: "bundle",
    row: representative,
    role,
    note,
    majorLabel: `可选专业：${uniqueMajors.join("、")}`,
    planLabel: `这些专业合计${fmt(totalPlan)}人 / 学费${minFee && maxFee ? `${fmt(minFee)}-${fmt(maxFee)}` : "见表格"}`,
  };
}

function zhijiangBundle(role, note = "") {
  return schoolBundle(
    "浙江工业大学之江学院",
    ["汉语言文学", "电子商务", "广告学", "广播电视学", "市场营销", "旅游管理", "酒店管理", "日语", "财务管理", "英语"],
    role,
    note || "重点关注学校；绍兴二线，离杭州近；第一学期后就能转专业",
  );
}

function isMainUndergradFallback(row) {
  const gap24 = rankGap2024(row);
  return (
    row.nature === "民办" &&
    !/职业/.test(row.school) &&
    (row.rankGap ?? -999999) >= 10000 &&
    (gap24 === null || gap24 >= 5000)
  );
}

function isGoodUndergradFallback(row) {
  return row.risk === "保底" && !/职业/.test(row.school) && (row.rankGap ?? -999999) >= 9000;
}

function planFallbackScore(row) {
  const gap24 = rankGap2024(row);
  return (
    (isMainUndergradFallback(row) ? 120 : 0) +
    (row.plan || 0) * 1.8 +
    (row.rankGap || 0) / 160 +
    (gap24 || 0) / 180 +
    locationScore(row) * 1.2 +
    schoolScore(row) +
    majorFitScore(row)
  );
}

function addPlanEntries(entries, candidates, count, role, noteForRow) {
  const used = new Set(entries.map((entry) => planRowKey(entry.row)));
  for (const row of candidates) {
    if (entries.length >= count) break;
    const key = planRowKey(row);
    if (used.has(key)) continue;
    entries.push({
      row,
      role,
      note: typeof noteForRow === "function" ? noteForRow(row) : noteForRow || "",
    });
    used.add(key);
  }
  return entries;
}

function sortByPlanQuality(rows, extraScore = () => 0) {
  return [...rows].sort(
    (a, b) =>
      planFallbackScore(b) +
        extraScore(b) -
        (planFallbackScore(a) + extraScore(a)) ||
      recommendation(b).score - recommendation(a).score ||
      compareNullable(b.plan, a.plan, -1),
  );
}

function baseFallbackRows() {
  return DATA.filter(isMainUndergradFallback).filter((row) => row.nature === "民办");
}

function makeZhijiangPlan() {
  let entries = [zhijiangBundle("重点学校", "最想去的学校；专业放一起看，第一学期后能转专业")].filter(Boolean);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(DATA.filter((row) => row.province === "浙江" && isMainUndergradFallback(row))),
    10,
    "本科保底",
    "接在之江后面，负责把本科保住",
  );
  return entries;
}

function makeZhejiangPlan() {
  let entries = [
    zhijiangBundle("浙江优先", "之江重点；绍兴二线，离杭州近；第一学期后能转专业"),
    ...makePlanSeeds([
    ["杭州电子科技大学信息工程学院", "工商管理类", "杭州本科保底", "杭州一线，招生9人"],
    ["杭州电子科技大学信息工程学院", "跨境电子商务", "杭州本科保底", "杭州一线，互联网商业方向"],
    ["浙江工商大学杭州商学院", "人力资源管理", "杭州本科保底", "杭州一线，学费相对低"],
    ["浙江农林大学暨阳学院", "电子商务", "绍兴本科保底", "绍兴二线，离杭州近"],
    ["宁波大学科学技术学院", "会计学", "宁波本科保底", "宁波二线，财会方向"],
    ["浙江财经大学东方学院", "会计学", "浙江本科保底", "财经校名更贴财会方向"],
  ]),
  ].filter(Boolean);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(DATA.filter((row) => row.province === "浙江" && isGoodUndergradFallback(row))),
    10,
    "本科保底",
    "浙江范围内继续补稳",
  );
  return entries;
}

function makeBalancedPlan2() {
  let entries = [
    zhijiangBundle("综合优先", "之江重点；专业放一起看，第一学期后能转专业"),
    ...makePlanSeeds([
    ["杭州电子科技大学信息工程学院", "工商管理类", "浙江本科保底", "杭州一线，招生9人"],
    ["浙江工商大学杭州商学院", "人力资源管理", "浙江本科保底", "杭州一线，学费相对低"],
    ["广州城市理工学院", "会计学", "广东本科保底", "广州一线，招生12人"],
    ["广州城市理工学院", "商务英语", "广东本科保底", "广州一线，招生6人"],
    ["广州新华学院", "汉语言文学", "广东本科保底", "东莞校区，专业接受度高"],
    ["天津财经大学珠江学院", "会计学", "外省本科保底", "财经类民办，学费低"],
    ["湖北经济学院法商学院", "会计学", "外省本科保底", "湖北周边，财会方向"],
  ]),
  ].filter(Boolean);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(baseFallbackRows().filter((row) => row.province !== "广西")),
    10,
    "本科保底",
    "综合补位，继续保本科",
  );
  return entries;
}

function makeGuangdongPlan() {
  let entries = makePlanSeeds([
    ["广州城市理工学院", "会计学", "广州本科保底", "广州一线，招生12人"],
    ["广州城市理工学院", "商务英语", "广州本科保底", "广州一线，招生6人"],
    ["广州城市理工学院", "电子商务", "广州本科保底", "广州一线，互联网商业方向"],
    ["广州新华学院", "网络与新媒体", "东莞本科保底", "东莞二线，传媒方向"],
    ["广州新华学院", "汉语言文学", "东莞本科保底", "东莞二线，专业接受度高"],
    ["广州新华学院", "财务管理", "东莞本科保底", "东莞二线，财会方向"],
    ["广州华商学院", "会计学", "广东本科保底", "后两年回广州，财会方向"],
    ["东莞城市学院", "跨境电子商务", "东莞本科保底", "东莞二线，跨境电商方向"],
  ]);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(DATA.filter((row) => row.province === "广东" && isMainUndergradFallback(row))),
    10,
    "本科保底",
    "广东范围内继续补稳",
  );
  return entries;
}

function makeFirstTierPlan() {
  let entries = makePlanSeeds([
    ["杭州电子科技大学信息工程学院", "工商管理类", "一线城市本科保底", "杭州一线，招生9人"],
    ["杭州电子科技大学信息工程学院", "跨境电子商务", "一线城市本科保底", "杭州一线，互联网商业方向"],
    ["杭州电子科技大学信息工程学院", "财务管理", "一线城市本科保底", "杭州一线，财会方向"],
    ["浙江工商大学杭州商学院", "人力资源管理", "一线城市本科保底", "杭州一线，学费相对低"],
    ["浙江工商大学杭州商学院", "电子商务", "一线城市本科保底", "杭州一线，互联网商业方向"],
    ["广州城市理工学院", "会计学", "一线城市本科保底", "广州一线，招生12人"],
    ["广州城市理工学院", "商务英语", "一线城市本科保底", "广州一线，招生6人"],
    ["广州城市理工学院", "电子商务", "一线城市本科保底", "广州一线，互联网商业方向"],
    ["上海建桥学院", "网络与新媒体", "一线城市本科保底", "上海一线，但学费高"],
    ["上海建桥学院", "会计学", "一线城市本科保底", "上海一线，但学费高"],
  ]);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(
      baseFallbackRows().filter((row) => ["浙江", "广东", "上海"].includes(row.province)),
      (row) => (["杭州", "广州", "上海"].includes(studyCity(row)) ? 20 : 0),
    ),
    10,
    "一线城市本科保底",
    "城市优先，继续补本科保底",
  );
  return entries;
}

function makeStablePlan() {
  let entries = makePlanSeeds([
    ["广州城市理工学院", "会计学", "本科主保底", "广东方向，招生12人"],
    ["广州城市理工学院", "商务英语", "本科主保底", "广东方向，招生6人"],
    ["广州新华学院", "汉语言文学", "本科主保底", "东莞校区，专业接受度高"],
    ["广州新华学院", "网络与新媒体", "本科主保底", "东莞校区，传媒方向"],
    ["天津财经大学珠江学院", "会计学", "本科主保底", "外省保底，学费低"],
    ["天津财经大学珠江学院", "财务管理", "本科主保底", "外省保底，财会方向"],
    ["天津商业大学宝德学院", "工商管理类", "本科主保底", "外省保底，学费低"],
    ["湖北经济学院法商学院", "会计学", "本科主保底", "湖北周边，财会方向"],
    ["苏州大学应用技术学院", "财务管理", "本科主保底", "江苏周边，学费低"],
    ["无锡太湖学院", "会计学", "本科主保底", "江苏周边，财会方向"],
  ]);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(baseFallbackRows().filter((row) => row.province !== "广西")),
    10,
    "本科主保底",
    "非广西本地，放在后段稳本科",
  );
  return entries;
}

function makeNearHomePlan() {
  let entries = makePlanSeeds([
    ["广州城市理工学院", "会计学", "广州本科保底", "广州就读，招生12人"],
    ["广州城市理工学院", "商务英语", "广州本科保底", "广州就读，招生6人"],
    ["广州城市理工学院", "电子商务", "广州本科保底", "广州就读，互联网商业方向"],
    ["广州城市理工学院", "财务管理", "广州本科保底", "广州就读，财会方向"],
    ["广州城市理工学院", "工商管理", "广州本科保底", "广州就读，商科方向"],
    ["广州城市理工学院", "国际经济与贸易", "广州本科保底", "广州就读，商科方向"],
    ["广州城市理工学院", "人力资源管理", "广州本科保底", "广州就读，商科方向"],
    ["广州新华学院", "网络与新媒体", "广深圈本科保底", "东莞校区，离广州近"],
    ["广州新华学院", "汉语言文学", "广深圈本科保底", "东莞校区，专业接受度高"],
    ["广州新华学院", "财务管理", "广深圈本科保底", "东莞校区，财会方向"],
  ]);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(baseFallbackRows().filter((row) => row.province === "广东")),
    10,
    "广州近本科保底",
    "广州/东莞生活圈，继续补本科保底",
  );
  return entries;
}

function makeUltraSafePlan() {
  let entries = makePlanSeeds([
    ["广州城市理工学院", "会计学", "本科主保底", "广东方向，24/25都宽"],
    ["广州城市理工学院", "商务英语", "本科主保底", "广东方向，24/25都宽"],
    ["广州新华学院", "工商管理", "本科主保底", "东莞校区，广东方向"],
    ["广州新华学院", "汉语言文学", "本科主保底", "东莞校区，专业接受度高"],
    ["天津财经大学珠江学院", "会计学", "本科主保底", "学费低，财会方向"],
    ["天津财经大学珠江学院", "财务管理", "本科主保底", "学费低，财会方向"],
    ["天津财经大学珠江学院", "工商管理", "本科主保底", "学费低，商科方向"],
    ["天津商业大学宝德学院", "财务管理", "本科主保底", "外省保底，学费低"],
    ["湖北经济学院法商学院", "会计学", "本科主保底", "湖北周边，财会方向"],
    ["苏州大学应用技术学院", "财务管理", "本科主保底", "江苏周边，学费低"],
  ]);
  entries = addPlanEntries(
    entries,
    sortByPlanQuality(baseFallbackRows().filter((row) => row.province !== "广西"), (row) =>
      row.province === "广东" ? 12 : 0,
    ),
    10,
    "本科主保底",
    "非广西本地，本科保底继续补满",
  );
  return entries;
}

function buildSchemes() {
  return [
    {
      id: "zhijiang",
      tab: "综合最优",
      title: "综合最优方案：之江放前面，后面接本科保底",
      summary: "兼顾想去之江、浙江城市和本科安全，前面冲喜欢，后面保本科。",
      guardrail: "之江2025位次比她后4103名，24年也比她后4894名，偏稳但不当最终保底。",
      entries: makeZhijiangPlan(),
      juniors: [],
    },
    {
      id: "balanced2",
      tab: "综合方案2",
      title: "综合方案2：之江 + 浙江 + 广东保底",
      summary: "比综合最优更均衡，之江不放太多，浙江和广东本科保底一起接上。",
      guardrail: "这套适合想保留之江机会，但又不想后段全部押同一区域。",
      entries: makeBalancedPlan2(),
      juniors: [],
    },
    {
      id: "balanced3",
      tab: "综合方案3",
      title: "综合方案3：本科稳妥优先，不押广西本地",
      summary: "更偏安全，用广东/外省民办本科托住，不把广西本地当主推。",
      guardrail: "这套牺牲一点城市偏好，换更稳的本科后段。",
      entries: makeStablePlan(),
      juniors: [],
    },
    {
      id: "zhejiang",
      tab: "浙江系列",
      title: "浙江系列：杭州/绍兴/宁波为主",
      summary: "适合最在意浙江城市和生活环境时用，保底仍然留在本科里。",
      guardrail: "浙江强保底多集中在民办，学费和校区要一起看。",
      entries: makeZhejiangPlan(),
      juniors: [],
    },
    {
      id: "nearHome",
      tab: "离家近系列",
      title: "离家近系列：广东本科优先",
      summary: "按广东方向理解离家近，不放广西本地；广州、东莞等实际就读地会标出来。",
      guardrail: "广东方案要重点看实际校区：有些广州校名实际在东莞、肇庆或惠州。",
      entries: makeNearHomePlan(),
      juniors: [],
    },
    {
      id: "firstTier",
      tab: "一线城市系列",
      title: "一线城市系列：杭州 / 广州 / 上海优先",
      summary: "优先一线城市体验，能本科保底的放后面；上海选项要特别注意学费。",
      guardrail: "一线城市方案不是最省钱，适合家庭能接受更高学费时看。",
      entries: makeFirstTierPlan(),
      juniors: [],
    },
    {
      id: "ultra",
      tab: "超级稳妥",
      title: "超级稳妥方案：10个本科保底，再加专科保险",
      summary: "本科保底先放满，且不把广西本地当主推；专科只作为极端情况保险。",
      guardrail: "先把本科稳住，专科保险只有在确认愿意读专科时才考虑。",
      entries: makeUltraSafePlan(),
      juniors: juniorFallbacks,
    },
  ];
}

function planChance(entry) {
  if (entry.kind === "junior") return "专科保险";
  const row = entry.row;
  if (isMainUndergradFallback(row)) return "本科主保底";
  if (isGoodUndergradFallback(row)) return "本科保底";
  if (row.risk === "较稳") return "本科偏稳";
  return chanceLabels[row.risk] || row.risk;
}

function entryPlace(entry) {
  if (entry.kind === "junior") return entry.place;
  return studyPlace(entry.row) || entry.row.province;
}

function entryRankLine(entry) {
  const rank = entry.kind === "junior" ? entry.groupRank2025 : entry.row.groupRank2025;
  const gap = entry.kind === "junior" ? entry.rankGap : entry.row.rankGap;
  const score = entry.kind === "junior" ? entry.groupScore2025 : entry.row.groupScore2025;
  const gapCopy = gap >= 0 ? `比她后${fmt(gap)}名` : `还差${fmt(Math.abs(gap))}名`;
  return `2025最低${fmt(rank)}名，${score}分，${gapCopy}`;
}

function entryReason(entry) {
  if (entry.kind === "junior") return entry.note;
  const rec = recommendation(entry.row);
  return [entry.note, rec.reason].filter(Boolean).join("；");
}

function planItem(entry, index) {
  const row = entry.kind === "junior" ? entry : entry.row;
  const chance = planChance(entry);
  const role = entry.role || chance;
  const majorLabel = entry.majorLabel || row.major;
  const planLabel = entry.planLabel || `计划${fmt(row.plan)}人 / 学费${row.tuition || "无"}`;
  return `
    <li class="plan-item ${entry.kind === "junior" ? "junior-plan-item" : ""} ${entry.kind === "bundle" ? "bundle-plan-item" : ""}">
      <div class="plan-index">${String(index + 1).padStart(2, "0")}</div>
      <div class="plan-main">
        <div class="plan-line">
          <b>${escapeHtml(row.school)}</b>
          <span>${escapeHtml(majorLabel)}</span>
        </div>
        <div class="plan-meta">
          <span>${escapeHtml(row.province)} / ${escapeHtml(row.nature)}</span>
          <span>${escapeHtml(entryPlace(entry))}</span>
          <span>${escapeHtml(row.direction)}</span>
        </div>
        <p>${escapeHtml(entryReason(entry))}</p>
      </div>
      <div class="plan-side">
        ${role !== chance ? `<span class="plan-role">${escapeHtml(role)}</span>` : ""}
        <span class="plan-chance ${entry.kind === "junior" ? "junior" : ""}">${escapeHtml(chance)}</span>
        <small>${escapeHtml(entryRankLine(entry))}</small>
        <small>${escapeHtml(planLabel)}</small>
      </div>
    </li>
  `;
}

function renderPlans() {
  const schemes = buildSchemes();
  if (!schemes.some((scheme) => scheme.id === state.activePlan)) state.activePlan = schemes[0].id;
  const active = schemes.find((scheme) => scheme.id === state.activePlan) || schemes[0];
  els.planSelect.innerHTML = schemes
    .map(
      (scheme) =>
        `<option value="${escapeHtml(scheme.id)}"${scheme.id === active.id ? " selected" : ""}>${escapeHtml(scheme.tab)}</option>`,
    )
    .join("");

  const fallbackCount = active.entries.filter((entry) => isMainUndergradFallback(entry.row)).length;
  const juniorHtml = active.juniors.length
    ? `
      <div class="junior-panel">
        <h3>额外专科保险</h3>
        <p>这部分不算本科志愿，只是为了极端情况下仍有学上。</p>
        <ol class="plan-list junior-list">
          ${active.juniors.map((item, index) => planItem({ ...item, kind: "junior", role: "额外保险" }, index)).join("")}
        </ol>
      </div>
    `
    : "";

  els.planBoard.innerHTML = `
    <article class="scheme-card">
      <div class="scheme-head">
        <div>
          <h3>${escapeHtml(active.title)}</h3>
          <p>${escapeHtml(active.summary)}</p>
        </div>
        <div class="scheme-stats">
          <span><b>${active.entries.length}</b> 本科</span>
          <span><b>${fallbackCount}</b> 本科保底</span>
          ${active.juniors.length ? `<span><b>${active.juniors.length}</b> 专科保险</span>` : ""}
        </div>
      </div>
      <div class="scheme-warning">${escapeHtml(active.guardrail)}</div>
      <ol class="plan-list">
        ${active.entries.slice(0, 10).map(planItem).join("")}
      </ol>
      ${juniorHtml}
    </article>
  `;
}

function searchText(row) {
  return [
    row.school,
    row.major,
    row.province,
    row.region,
    row.nature,
    row.group,
    row.direction,
    row.remark,
  ]
    .join(" ")
    .toLowerCase();
}

function activeRisks() {
  return [...document.querySelectorAll('input[name="risk"]:checked')].map((el) => el.value);
}

function isStrongFallbackPrivate(row) {
  return row.nature === "民办" && !/职业/.test(row.school) && (row.rankGap ?? -999999) >= 10000;
}

function tabMatch(row) {
  if (state.tab === "zhejiang") return row.province === "浙江";
  if (state.tab === "guangdong") return row.province === "广东";
  if (state.tab === "private") return row.nature === "民办";
  if (state.tab === "safe") return row.risk === "保底";
  if (state.tab === "fallbackPrivate") return isStrongFallbackPrivate(row);
  if (state.tab === "finance") return row.direction === "财会管理";
  if (state.tab === "computer") return row.direction === "计算机数据";
  if (state.tab === "internet") return row.direction === "互联网商业" || row.direction === "传媒内容";
  return true;
}

function filterRows() {
  const q = els.search.value.trim().toLowerCase();
  const selectedRisks = activeRisks();
  const tuitionMax = Number(els.tuition.value || 0);

  return DATA.filter((row) => {
    if (!tabMatch(row)) return false;
    if (q && !searchText(row).includes(q)) return false;
    if (els.region.value !== "all") {
      if (els.region.value === "广东" && row.province !== "广东") return false;
      if (els.region.value !== "广东" && row.region !== els.region.value && row.province !== els.region.value) return false;
    }
    if (els.nature.value !== "all" && row.nature !== els.nature.value) return false;
    if (els.direction.value !== "all" && row.direction !== els.direction.value) return false;
    if (els.strongFallbackPrivate.checked && !isStrongFallbackPrivate(row)) return false;
    if (!selectedRisks.includes(row.risk)) return false;
    if (tuitionMax > 0 && row.tuitionNum && row.tuitionNum > tuitionMax) return false;
    if (els.favoritesOnly.checked && !favorites.has(row.id)) return false;
    if (els.hideVocational.checked && /职业/.test(row.school)) return false;
    return true;
  });
}

function compareNullable(a, b, fallback = 9999999) {
  return (a ?? fallback) - (b ?? fallback);
}

function sortRows(rows) {
  const sort = state.sort;
  const ordered = [...rows];
  if (sort === "safe") {
    ordered.sort(
      (a, b) =>
        (safeOrder[a.risk] ?? 9) - (safeOrder[b.risk] ?? 9) ||
        compareNullable(b.groupRank2025, a.groupRank2025, -1) ||
        (regionOrder[a.region] ?? 9) - (regionOrder[b.region] ?? 9),
    );
  } else if (sort === "near") {
    ordered.sort(
      (a, b) =>
        Math.abs(a.rankGap ?? 999999) - Math.abs(b.rankGap ?? 999999) ||
        (regionOrder[a.region] ?? 9) - (regionOrder[b.region] ?? 9),
    );
  } else if (sort === "tuition") {
    ordered.sort(
      (a, b) =>
        (safeOrder[a.risk] ?? 9) - (safeOrder[b.risk] ?? 9) ||
        compareNullable(a.tuitionNum, b.tuitionNum) ||
        Math.abs(a.rankGap ?? 999999) - Math.abs(b.rankGap ?? 999999),
    );
  } else if (sort === "plan") {
    ordered.sort(
      (a, b) =>
        (safeOrder[a.risk] ?? 9) - (safeOrder[b.risk] ?? 9) ||
        compareNullable(b.plan, a.plan, -1) ||
        Math.abs(a.rankGap ?? 999999) - Math.abs(b.rankGap ?? 999999),
    );
  } else if (state.tab === "fallbackPrivate") {
    ordered.sort(
      (a, b) =>
        compareNullable(b.rankGap, a.rankGap, -1) ||
        compareNullable(b.plan, a.plan, -1) ||
        compareNullable(a.tuitionNum, b.tuitionNum) ||
        (regionOrder[a.region] ?? 9) - (regionOrder[b.region] ?? 9),
    );
  } else {
    ordered.sort(
      (a, b) =>
        recommendation(b).score - recommendation(a).score ||
        (recommendedRiskOrder[a.risk] ?? 9) - (recommendedRiskOrder[b.risk] ?? 9) ||
        (regionOrder[a.region] ?? 9) - (regionOrder[b.region] ?? 9) ||
        (natureOrder[a.nature] ?? 9) - (natureOrder[b.nature] ?? 9) ||
        compareNullable(a.groupRank2025, b.groupRank2025),
    );
  }
  return ordered;
}

function updateSummary(rows) {
  els.totalCount.textContent = fmt(rows.length);
  els.zjCount.textContent = fmt(rows.filter((r) => r.province === "浙江").length);
  els.gdCount.textContent = fmt(rows.filter((r) => r.province === "广东").length);
  els.publicCount.textContent = fmt(rows.filter((r) => r.nature === "民办").length);
  els.safeCount.textContent = fmt(rows.filter(isStrongFallbackPrivate).length);
}

function rowDetails(row) {
  const pieces = [];
  if (row.remark) pieces.push(row.remark);
  return pieces.join(" · ");
}

function tableRow(row) {
  const favored = favorites.has(row.id);
  const rec = recommendation(row);
  return `
    <tr>
      <td><button class="fav-btn" data-fav="${escapeHtml(row.id)}" type="button" aria-label="收藏">${favored ? "★" : "☆"}</button></td>
      <td>${riskBadge(row.risk)}</td>
      <td>
        <div class="score-badge">${fmt(rec.score)}</div>
      </td>
      <td>
        <div class="school-name">${escapeHtml(row.school)}</div>
        <div class="subtext">${escapeHtml(row.group)} · ${escapeHtml(row.code)}</div>
        ${independentRankText(row) ? `<div class="rank-note">${escapeHtml(independentRankText(row))}</div>` : ""}
      </td>
      <td>
        <div class="major-name">${escapeHtml(row.major)}</div>
        <div class="subtext">${escapeHtml(row.direction)}${rowDetails(row) ? " · " + escapeHtml(rowDetails(row)) : ""}</div>
      </td>
      <td><div class="score-reason reason-cell">${escapeHtml(rec.reason)}</div></td>
      <td>
        <div>${escapeHtml(row.province)} / ${escapeHtml(row.nature)}</div>
        <div class="place-note">${escapeHtml(studyPlace(row))}</div>
      </td>
      <td>
        <div class="rank-cell">${fmt(row.groupRank2025)}</div>
        <div class="subtext">${row.groupScore2025 || "无"}分 · ${gapText(row)}</div>
      </td>
      <td>
        <div class="rank-cell">${fmt(row.majorRank2025)}</div>
        <div class="subtext">${row.majorScore2025 ? row.majorScore2025 + "分" : "专业明细缺失"}</div>
      </td>
      <td>${fmt(row.plan)}</td>
      <td>${escapeHtml(row.tuition || "无")}</td>
      <td>${escapeHtml(row.select || row.groupSelect || "无")}</td>
    </tr>
  `;
}

function card(row) {
  const favored = favorites.has(row.id);
  const rec = recommendation(row);
  return `
    <article class="choice-card">
      <div class="card-top">
        <div class="card-title">
          <h3>${escapeHtml(row.school)}</h3>
          <p>${escapeHtml(row.province)} / ${escapeHtml(row.nature)} / ${escapeHtml(row.group)}</p>
          <p class="place-note">${escapeHtml(studyPlace(row))}</p>
          ${independentRankText(row) ? `<p class="rank-note">${escapeHtml(independentRankText(row))}</p>` : ""}
        </div>
        <button class="fav-btn" data-fav="${escapeHtml(row.id)}" type="button" aria-label="收藏">${favored ? "★" : "☆"}</button>
      </div>
      <div class="card-major">${escapeHtml(row.major)}</div>
      <div class="card-grid">
        <div class="metric score-metric"><span>综合推荐</span><b>${fmt(rec.score)}分</b></div>
        <div class="metric"><span>录取机会</span><b>${escapeHtml(chanceLabels[row.risk] || row.risk)}</b></div>
        <div class="metric"><span>2025最低位次</span><b>${rankText(row.groupRank2025)}</b></div>
        <div class="metric"><span>和她比</span><b>${plainGapText(row)}</b></div>
        <div class="metric"><span>计划/学费</span><b>${fmt(row.plan)} / ${escapeHtml(row.tuition || "无")}</b></div>
      </div>
      <div class="score-reason card-score-reason">${escapeHtml(rec.reason)}</div>
      <div class="card-foot">
        <span class="badge">${escapeHtml(row.direction)}</span>
        ${riskBadge(row.risk)}
        <span class="badge">${escapeHtml(row.select || row.groupSelect || "选科无")}</span>
      </div>
      ${rowDetails(row) ? `<div class="subtext">${escapeHtml(rowDetails(row))}</div>` : ""}
    </article>
  `;
}

function render() {
  const filtered = sortRows(filterRows());
  updateSummary(filtered);

  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const limit = mobile ? 160 : 420;
  const visible = filtered.slice(0, limit);

  els.tableBody.innerHTML = visible.map(tableRow).join("");
  els.cards.innerHTML = visible.map(card).join("");
  els.empty.hidden = filtered.length !== 0;
  els.resultLabel.textContent = `显示 ${fmt(visible.length)} / ${fmt(filtered.length)} 条结果`;
}

function setTab(tab) {
  state.tab = tab;
  els.tabs.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === tab));
  render();
}

function syncRegionTabs() {
  const regionTabNames = new Set(["zhejiang", "guangdong"]);
  const hideRegionTabs = els.region.value !== "all";
  els.tabs.forEach((btn) => {
    if (regionTabNames.has(btn.dataset.tab)) {
      btn.hidden = hideRegionTabs;
    }
  });
  if (hideRegionTabs && regionTabNames.has(state.tab)) {
    setTab("all");
  }
}

function toggleFavorite(id) {
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  saveFavorites();
  render();
}

function exportCsv() {
  const rows = sortRows(filterRows());
  const headers = [
    "院校",
    "专业",
    "综合推荐分",
    "推荐理由",
    "地区",
    "性质",
    "专业组",
    "录取机会",
    "2025最低分",
    "2025最低位次",
    `和她位次差`,
    "专业位次",
    "计划",
    "学费",
    "选科",
    "独立学院排名",
    "备注",
  ];
  const csvRows = rows.map((row) => [
    row.school,
    row.major,
    recommendation(row).score,
    recommendation(row).reason,
    row.province,
    row.nature,
    row.group,
    chanceLabels[row.risk] || row.risk,
    row.groupScore2025,
    row.groupRank2025,
    row.rankGap,
    row.majorRank2025 || "",
    row.plan || "",
    row.tuition || "",
    row.select || row.groupSelect || "",
    independentRankText(row),
    row.remark || "",
  ]);
  const csv = [headers, ...csvRows]
    .map((cols) => cols.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "妹妹本科志愿筛选结果.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function openFilters() {
  els.filtersPanel.classList.add("open");
  els.overlay.hidden = false;
}

function closeFilters() {
  els.filtersPanel.classList.remove("open");
  els.overlay.hidden = true;
}

function resetFilters() {
  els.search.value = "";
  els.region.value = "all";
  els.nature.value = "all";
  els.direction.value = "all";
  els.tuition.value = "";
  els.strongFallbackPrivate.checked = false;
  els.favoritesOnly.checked = false;
  els.hideVocational.checked = true;
  document.querySelectorAll('input[name="risk"]').forEach((el) => {
    el.checked = true;
  });
  state.sort = "recommended";
  els.sort.value = "recommended";
  els.mobileSort.value = "recommended";
  syncRegionTabs();
  setTab("all");
}

function bind() {
  [
    els.search,
    els.region,
    els.nature,
    els.direction,
    els.tuition,
    els.strongFallbackPrivate,
    els.favoritesOnly,
    els.hideVocational,
  ].forEach((el) => {
    el.addEventListener("input", render);
    el.addEventListener("change", render);
  });
  els.region.addEventListener("change", syncRegionTabs);
  document.querySelectorAll('input[name="risk"]').forEach((el) => el.addEventListener("change", render));
  els.tabs.forEach((btn) => btn.addEventListener("click", () => setTab(btn.dataset.tab)));
  els.sort.addEventListener("change", () => {
    state.sort = els.sort.value;
    els.mobileSort.value = state.sort;
    render();
  });
  els.mobileSort.addEventListener("change", () => {
    state.sort = els.mobileSort.value;
    els.sort.value = state.sort;
    render();
  });
  els.reset.addEventListener("click", resetFilters);
  els.export.addEventListener("click", exportCsv);
  els.openFilters.addEventListener("click", openFilters);
  els.closeFilters.addEventListener("click", closeFilters);
  els.overlay.addEventListener("click", closeFilters);
  els.planSelect.addEventListener("change", () => {
    state.activePlan = els.planSelect.value;
    renderPlans();
  });
  document.body.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-fav]");
    if (btn) toggleFavorite(btn.dataset.fav);
  });
  window.addEventListener("resize", render);
}

function populateRegionOptions() {
  const currentValues = new Set([...els.region.options].map((option) => option.value));
  const priority = ["广西", "江苏", "福建", "山东", "湖北", "湖南", "四川", "重庆"];
  const provinces = [...new Set(DATA.map((row) => row.province).filter(Boolean))]
    .filter((province) => !currentValues.has(province))
    .sort((a, b) => {
      const ai = priority.includes(a) ? priority.indexOf(a) : 99;
      const bi = priority.includes(b) ? priority.indexOf(b) : 99;
      return ai - bi || a.localeCompare(b, "zh-CN");
    });
  for (const province of provinces) {
    const option = document.createElement("option");
    option.value = province;
    option.textContent = province;
    els.region.appendChild(option);
  }
}

populateRegionOptions();
bind();
syncRegionTabs();
renderPlans();
render();
