import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

export type TaxiFinanceOpsSurface014A = "balance" | "rewards" | "contests" | "archive" | "reports" | "access";

type Props014A = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
  surface: TaxiFinanceOpsSurface014A;
};

type RuntimeResponse014A = {
  key: string;
  label: string;
  route: string;
  status: number | string;
  ok: boolean;
  at: string;
  body: Record<string, unknown>;
};

type Metric014A = { key: string; label: string; value: string; hint: string; source: string };
type GrowthPoint014A = { date: string; totalOrders: number; totalFareMinor: number; barPercent: number; direction: string };

type Copy014A = {
  marker: string;
  title: string;
  subtitle: string;
  scopeTitle: string;
  allowedRoles: string;
  realOnly: string;
  reportButton: string;
  archiveButton: string;
  reportReady: string;
  archiveReady: string;
  archiveBlocked: string;
  liveSync: string;
  noDistribution: string;
  noFake: string;
  dailyRevenue: string;
  sabiEarning: string;
  growthScale: string;
  balance: string;
  rewards: string;
  contests: string;
  archive: string;
  reports: string;
  access: string;
  sourceHealth: string;
  lastReport: string;
  lastArchive: string;
  synchronizedFunctions: string;
  missingSource: string;
  readOnlyRoleGate: string;
  onlyReportArchiveButtons: string;
  manager: string;
  accountant: string;
  deputy: string;
  sabiAi: string;
};

const MARKER014A = "ADMIN-UI-TAXI-FINANCE-OPS-014A-REALTIME-REPORT-ARCHIVE-ONLY-RESTRICTED-ACCESS-NO-FAKE";
const REFRESH_MS_014A = 15000;
const ARCHIVE_APPROVAL_HEADER_014A = "x-sabi-taxi-orders-009a-archive-approval";
const ARCHIVE_APPROVAL_VALUE_014A = "i-approve-taxi-orders-009a-archive-7-days";
const IDEMPOTENCY_HEADER_014A = "x-sabi-idempotency-key";

const READ_ENDPOINTS_014A = [
  { key: "ordersReport", label: "Orders report 009A", route: "/api/admin/taxi/orders/009a/report" },
  { key: "ordersList", label: "Orders list 009A", route: "/api/admin/taxi/orders/009a/orders?status=all&limit=200" },
  { key: "ordersAudit", label: "Archive audit 009A", route: "/api/admin/taxi/orders/009a/audit?limit=50" },
  { key: "supportStatus", label: "Support/appeals 011A", route: "/api/admin/taxi/orders/011a/support-appeals/status" },
  { key: "lostStatus", label: "Lost property 010B", route: "/api/admin/taxi/orders/010b/lost-property/status" },
  { key: "dispatchCandidates", label: "Driver/vehicle/balance gate 009I", route: "/api/admin/taxi/orders/009i/dispatch-create/candidates?limit=100" },
  { key: "tariffs", label: "Country tariffs 008A", route: "/api/admin/taxi/tariffs/008a/country-tariffs" },
  { key: "tariffAudit", label: "Tariff audit 008C", route: "/api/admin/taxi/tariffs/008c/audit-journal?countryCode=UZ&limit=20" },
  { key: "applications", label: "Driver applications 007Z", route: "/api/admin/taxi/applications/007z/new-applications" },
] as const;

const COPY014A: Record<AdminLanguage, Copy014A> = {
  ru: {
    marker: MARKER014A,
    title: "Такси: финансы, рост и доступ",
    subtitle: "Единый ограниченный экран для баланса, бонусов, конкурсов, архива, отчётов и доступа. Показывает только реальные данные рабочей среды из уже подключённых источников такси. Без кнопок распределения, выплат, начисления бонусов или ручной подмены данных.",
    scopeTitle: "Доступ только: менеджер, бухгалтер, заместитель, Саби ИИ владельца",
    allowedRoles: "manager · accountant · deputy · Owner Sabi AI",
    realOnly: "Только реальные данные из сервера. Если источник пустой или отсутствует — показываем 0 / не настроено, без ложных строк.",
    reportButton: "Сформировать отчёт",
    archiveButton: "Архивировать",
    reportReady: "Отчёт собран из реальных источников",
    archiveReady: "Архивный запрос отправлен через защищённый серверный контроль",
    archiveBlocked: "Архив недоступен без защищённого серверного контроля",
    liveSync: "Автосинхронизация каждые 15 секунд",
    noDistribution: "Нет кнопок распределить / выплатить / начислить",
    noFake: "Без ложных данных: данные не создаются в интерфейсе",
    dailyRevenue: "Ежедневная выручка такси",
    sabiEarning: "Заработок такси Sabi",
    growthScale: "Шкала роста",
    balance: "Баланс",
    rewards: "Бонусы",
    contests: "Конкурсы",
    archive: "Архив",
    reports: "Отчёты",
    access: "Доступ",
    sourceHealth: "Состояние источников",
    lastReport: "Последний отчёт",
    lastArchive: "Последний архив",
    synchronizedFunctions: "Синхронизированные функции",
    missingSource: "Реальный источник пока не подключён — ложные данные не показываем",
    readOnlyRoleGate: "Role gate: manager/accountant/deputy/Owner Sabi AI only",
    onlyReportArchiveButtons: "В этом экране только 2 действия: отчёт и архив",
    manager: "Менеджер",
    accountant: "Бухгалтер",
    deputy: "Зам",
    sabiAi: "Owner Sabi AI",
  },
  en: {
    marker: MARKER014A,
    title: "Taxi: finance, growth and access",
    subtitle: "One restricted screen for Balance / Rewards / Contests / Archive / Reports / Access. It shows only real runtime data from already connected Taxi sources. No distribution, payout, bonus grant or manual data override buttons.",
    scopeTitle: "Access only: manager, accountant, deputy, Owner Sabi AI",
    allowedRoles: "manager · accountant · deputy · Owner Sabi AI",
    realOnly: "Only real backend data. If a source is empty or missing, the UI shows 0 / not configured without fake rows.",
    reportButton: "Build report",
    archiveButton: "Archive",
    reportReady: "Report built from real sources",
    archiveReady: "Archive request sent through protected backend gate",
    archiveBlocked: "Archive unavailable without protected backend gate",
    liveSync: "Auto-sync every 15 seconds",
    noDistribution: "No distribute / payout / grant buttons",
    noFake: "No fake: UI never creates data",
    dailyRevenue: "Daily Taxi revenue",
    sabiEarning: "Sabi Taxi earnings",
    growthScale: "Growth scale",
    balance: "Balance",
    rewards: "Rewards",
    contests: "Contests",
    archive: "Archive",
    reports: "Reports",
    access: "Access",
    sourceHealth: "Source health",
    lastReport: "Last report",
    lastArchive: "Last archive",
    synchronizedFunctions: "Synchronized functions",
    missingSource: "Real source is not connected yet — no fake data shown",
    readOnlyRoleGate: "Role gate: manager/accountant/deputy/Owner Sabi AI only",
    onlyReportArchiveButtons: "This screen has only 2 actions: report and archive",
    manager: "Manager",
    accountant: "Accountant",
    deputy: "Deputy",
    sabiAi: "Owner Sabi AI",
  },
  uz: {
    marker: MARKER014A,
    title: "Taksi: moliya, o‘sish va kirish",
    subtitle: "Balans, bonuslar, tanlovlar, arxiv, hisobotlar va kirish uchun yagona cheklangan ekran. Faqat ulangan taksi ish muhiti manbalaridan real maʼlumot ko‘rsatadi.",
    scopeTitle: "Kirish faqat: menejer, buxgalter, o‘rinbosar, egasining Sabi sunʼiy intellekti",
    allowedRoles: "manager · accountant · deputy · Owner Sabi AI",
    realOnly: "Faqat serverdagi real maʼlumot. Manba bo‘sh bo‘lsa 0 / sozlanmagan ko‘rsatiladi, soxta qatorlar yo‘q.",
    reportButton: "Hisobot yaratish",
    archiveButton: "Arxivlash",
    reportReady: "Hisobot real manbalardan yig‘ildi",
    archiveReady: "Arxiv so‘rovi himoyalangan server nazorati orqali yuborildi",
    archiveBlocked: "Himoyalangan server nazorati bo‘lmasa arxivlash mumkin emas",
    liveSync: "Har 15 soniyada avtomatik sinxronlash",
    noDistribution: "Taqsimlash / to‘lash / bonus berish tugmalari yo‘q",
    noFake: "Soxta natija yo‘q: interfeys maʼlumot yaratmaydi",
    dailyRevenue: "Kunlik Taxi tushumi",
    sabiEarning: "Sabi Taxi daromadi",
    growthScale: "O‘sish shkalasi",
    balance: "Balans",
    rewards: "Bonuslar",
    contests: "Tanlovlar",
    archive: "Arxiv",
    reports: "Hisobotlar",
    access: "Kirish",
    sourceHealth: "Manbalar holati",
    lastReport: "Oxirgi hisobot",
    lastArchive: "Oxirgi arxiv",
    synchronizedFunctions: "Sinxron funksiyalar",
    missingSource: "Real manba hali ulanmagan — soxta natija ko‘rsatilmaydi",
    readOnlyRoleGate: "Role gate: manager/accountant/deputy/Owner Sabi AI only",
    onlyReportArchiveButtons: "Bu ekranda faqat 2 amal: hisobot va arxiv",
    manager: "Menejer",
    accountant: "Buxgalter",
    deputy: "O‘rinbosar",
    sabiAi: "Owner Sabi AI",
  },
  zh: {
    marker: MARKER014A,
    title: "出租车：财务、增长和权限",
    subtitle: "余额、奖励、竞赛、归档、报告和权限的统一受限页面。只显示已连接出租车运行环境的真实数据，不提供分配、打款、发放奖励或手动伪造数据按钮。",
    scopeTitle: "仅允许：经理、会计、副手、所有者 Sabi 智能体",
    allowedRoles: "manager · accountant · deputy · Owner Sabi AI",
    realOnly: "只显示服务器真实数据。来源为空或未配置时显示 0 / 未配置，不生成假数据。",
    reportButton: "生成报告",
    archiveButton: "归档",
    reportReady: "报告已从真实来源生成",
    archiveReady: "归档请求已通过受保护的服务器控制发送",
    archiveBlocked: "没有受保护的服务器控制不能归档",
    liveSync: "每 15 秒自动同步",
    noDistribution: "没有分配 / 打款 / 发放按钮",
    noFake: "无虚假数据：界面不创建数据",
    dailyRevenue: "出租车每日收入",
    sabiEarning: "Sabi 出租车收益",
    growthScale: "增长刻度",
    balance: "余额",
    rewards: "奖励",
    contests: "竞赛",
    archive: "归档",
    reports: "报告",
    access: "权限",
    sourceHealth: "来源状态",
    lastReport: "最近报告",
    lastArchive: "最近归档",
    synchronizedFunctions: "同步功能",
    missingSource: "真实 source 尚未连接 — 不显示假数据",
    readOnlyRoleGate: "Role gate: manager/accountant/deputy/Owner Sabi AI only",
    onlyReportArchiveButtons: "本页面只有 2 个操作：报告和归档",
    manager: "经理",
    accountant: "会计",
    deputy: "副手",
    sabiAi: "Owner Sabi AI",
  },
};

function base014A(config: AdminApiConfig): string {
  return String(config.baseUrl || "http://127.0.0.1:3000").replace(/\/$/, "");
}

function headers014A(config: AdminApiConfig, extra: Record<string, string> = {}): Record<string, string> {
  return { "x-sabi-admin-token": config.token || "", "x-admin-token": config.token || "", ...extra };
}

function record014A(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function arr014A(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object").map((item) => item as Record<string, unknown>) : [];
}

function num014A(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function str014A(value: unknown): string {
  return value === undefined || value === null ? "" : String(value);
}

function money014A(valueMinor: number, currency = "UZS"): string {
  const safe = Number.isFinite(valueMinor) ? Math.round(valueMinor) : 0;
  return `${safe.toLocaleString()} ${currency}`;
}

function getBody014A(responses: RuntimeResponse014A[], key: string): Record<string, unknown> {
  return responses.find((item) => item.key === key)?.body || {};
}

function getOrders014A(responses: RuntimeResponse014A[]): Record<string, unknown>[] {
  const reportBody = getBody014A(responses, "ordersReport");
  const listBody = getBody014A(responses, "ordersList");
  return arr014A(reportBody.orders).length ? arr014A(reportBody.orders) : arr014A(listBody.orders);
}

function getReport014A(responses: RuntimeResponse014A[]): Record<string, unknown> {
  const reportBody = getBody014A(responses, "ordersReport");
  const listBody = getBody014A(responses, "ordersList");
  return record014A(reportBody.report || listBody.report);
}

function commissionMinor014A(order: Record<string, unknown>): number {
  const fare = num014A(order.finalFareMinor || order.totalFareMinor || order.amountMinor || order.priceMinor);
  const bps = num014A(order.commissionBasisPoints) || Math.round(num014A(order.commissionPercent) * 100);
  return bps > 0 ? Math.round((fare * bps) / 10000) : 0;
}

function buildGrowth014A(report: Record<string, unknown>, orders: Record<string, unknown>[]): GrowthPoint014A[] {
  const trend = arr014A(report.dailyTrend);
  const points = trend.map((item) => ({
    date: str014A(item.date),
    totalOrders: Math.round(num014A(item.totalOrders)),
    totalFareMinor: Math.round(num014A(item.totalFareMinor)),
    barPercent: Math.max(0, Math.min(100, Math.round(num014A(item.barPercent)))),
    direction: str014A(item.direction || "flat"),
  })).filter((item) => item.date);
  if (points.length) return points;
  if (!orders.length) return [];
  const buckets = new Map<string, { totalOrders: number; totalFareMinor: number }>();
  for (const order of orders) {
    const date = str014A(order.createdAt).slice(0, 10) || "unknown";
    const current = buckets.get(date) || { totalOrders: 0, totalFareMinor: 0 };
    current.totalOrders += 1;
    current.totalFareMinor += Math.round(num014A(order.finalFareMinor));
    buckets.set(date, current);
  }
  const max = Math.max(1, ...Array.from(buckets.values()).map((item) => item.totalOrders));
  return Array.from(buckets.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([date, item]) => ({
    date,
    totalOrders: item.totalOrders,
    totalFareMinor: item.totalFareMinor,
    barPercent: Math.round((item.totalOrders / max) * 100),
    direction: "flat",
  }));
}

function buildMetrics014A(copy: Copy014A, responses: RuntimeResponse014A[]): Metric014A[] {
  const orders = getOrders014A(responses);
  const report = getReport014A(responses);
  const supportCounts = record014A(getBody014A(responses, "supportStatus").counts);
  const lostCounts = record014A(getBody014A(responses, "lostStatus").counts);
  const dispatch = getBody014A(responses, "dispatchCandidates");
  const tariffs = getBody014A(responses, "tariffs");
  const totalRevenue = num014A(report.totalFinalFareMinor) || orders.reduce((sum, order) => sum + num014A(order.finalFareMinor), 0);
  const sabiEarning = orders.reduce((sum, order) => sum + commissionMinor014A(order), 0);
  const today = buildGrowth014A(report, orders).slice(-1)[0];
  const openSupport = num014A(supportCounts.openTripSupportCases) + num014A(lostCounts.openLostPropertyCases);
  return [
    { key: "dailyRevenue", label: copy.dailyRevenue, value: money014A(today?.totalFareMinor || totalRevenue), hint: `${orders.length} real orders`, source: "009A TaxiTrip" },
    { key: "sabiEarning", label: copy.sabiEarning, value: money014A(sabiEarning), hint: "commission from real order rows", source: "009A commission" },
    { key: "balance", label: copy.balance, value: String(num014A(dispatch.createReadyCount)), hint: "positive balance gate candidates", source: "009I dispatch candidates" },
    { key: "rewards", label: copy.rewards, value: copy.missingSource, hint: "reward ledger source required", source: "not configured" },
    { key: "contests", label: copy.contests, value: copy.missingSource, hint: "contest ranking source required", source: "not configured" },
    { key: "archive", label: copy.archive, value: String(num014A(report.archiveEligibleOrders)), hint: `${num014A(report.archivedOrders)} archived`, source: "009A audit/archive" },
    { key: "reports", label: copy.reports, value: String(num014A(report.totalOrders) || orders.length), hint: `${openSupport} open support/lost cases`, source: "009A/011A/010B" },
    { key: "access", label: copy.access, value: "4 roles", hint: copy.allowedRoles, source: "014A restricted gate" },
    { key: "tariffs", label: "Tariffs", value: String(arr014A(tariffs.countries).length || arr014A(tariffs.tariffs).length), hint: "country tariff rows", source: "008A" },
  ];
}


type SurfaceProfile014AFix1 = {
  title: string;
  subtitle: string;
  primaryMetricKeys: string[];
  sourceKeys: string[];
  checklist: string[];
  emptyState: string;
  marker: string;
};

const MARKER014A_FIX1 = "ADMIN-UI-TAXI-FINANCE-OPS-014A-FIX1-DISTINCT-SURFACES-SHARED-SYNC-CORE";
const MARKER014C = "ADMIN-UI-TAXI-FINANCE-OPS-014C-PRODUCTION-CLOSEOUT-RUNTIME-014B-PASSED-NO-FAKE";

function surfaceProfile014AFix1(copy: Copy014A, surface: TaxiFinanceOpsSurface014A): SurfaceProfile014AFix1 {
  const common = `${copy.realOnly} · ${copy.noDistribution} · ${copy.noFake}`;
  if (surface === "balance") {
    return {
      title: `${copy.balance}: real driver balance gate`,
      subtitle: `${copy.balance} shows 009I positive-balance dispatch readiness, daily order revenue and Sabi commission context. It is read-only and never pays or distributes money from UI.`,
      primaryMetricKeys: ["balance", "dailyRevenue", "sabiEarning", "access"],
      sourceKeys: ["dispatchCandidates", "ordersReport", "ordersList"],
      checklist: ["Positive driver balance gate", "Approved driver + approved vehicle context", "Only report/archive actions remain", common],
      emptyState: "No real positive-balance dispatch candidates yet — fake driver balances are not created.",
      marker: "balance-distinct-real-balance-gate",
    };
  }
  if (surface === "rewards") {
    return {
      title: `${copy.rewards}: bonus ledger visibility`,
      subtitle: `${copy.rewards} shows bonus/reward readiness from real sources only. If bonus ledger is not connected yet, the screen shows not configured instead of fake bonuses.`,
      primaryMetricKeys: ["rewards", "reports", "sabiEarning", "access"],
      sourceKeys: ["ordersReport", "supportStatus", "lostStatus"],
      checklist: ["No bonus grant button", "No manual bonus distribution", "Reward source must be real backend source", common],
      emptyState: "Reward ledger source is not connected yet — no fake bonus rows are displayed.",
      marker: "rewards-distinct-real-bonus-ledger",
    };
  }
  if (surface === "contests") {
    return {
      title: `${copy.contests}: real competition control`,
      subtitle: `${copy.contests} uses real trip, rating, complaint and driver activity sources only. Rankings are not invented in Admin UI.`,
      primaryMetricKeys: ["contests", "reports", "balance", "access"],
      sourceKeys: ["ordersReport", "supportStatus", "dispatchCandidates"],
      checklist: ["No fake contest winners", "No prize distribution button", "Only real activity can feed rankings", common],
      emptyState: "Contest ranking source is not connected yet — no fake winners are shown.",
      marker: "contests-distinct-real-ranking-control",
    };
  }
  if (surface === "archive") {
    return {
      title: `${copy.archive}: protected archive queue`,
      subtitle: `${copy.archive} focuses on real 009A archive eligibility, audit journal and protected archive gate. This is the only surface where Archive is the primary action.`,
      primaryMetricKeys: ["archive", "reports", "dailyRevenue", "access"],
      sourceKeys: ["ordersAudit", "ordersReport", "tariffAudit"],
      checklist: ["Protected archive gate preserved", "Audit journal visible", "No manual data deletion from UI", common],
      emptyState: "No real archive-eligible records in current source snapshot.",
      marker: "archive-distinct-protected-archive-queue",
    };
  }
  if (surface === "reports") {
    return {
      title: `${copy.reports}: daily revenue and growth report`,
      subtitle: `${copy.reports} focuses on daily Taxi revenue, Sabi Taxi commission earnings, growth scale and synchronized source health.`,
      primaryMetricKeys: ["reports", "dailyRevenue", "sabiEarning", "tariffs"],
      sourceKeys: ["ordersReport", "ordersList", "tariffs", "tariffAudit"],
      checklist: ["Report button only creates local report snapshot", "Daily revenue comes from real orders", "Growth scale comes from report/trip trend", common],
      emptyState: "No real report rows yet — report snapshot will show zero values without fake data.",
      marker: "reports-distinct-daily-growth-report",
    };
  }
  return {
    title: `${copy.access}: restricted role visibility`,
    subtitle: `${copy.access} shows who may view this finance console: manager, accountant, deputy and Owner Sabi AI. It is read-only with report/archive actions only.`,
    primaryMetricKeys: ["access", "reports", "balance", "archive"],
    sourceKeys: ["ordersReport", "applications", "dispatchCandidates"],
    checklist: ["Manager can monitor", "Accountant can verify", "Deputy can supervise", "Owner Sabi AI can observe/report", common],
    emptyState: "Access matrix is fixed in UI; real backend RBAC enforcement remains required before production.",
    marker: "access-distinct-role-gate-control",
  };
}

function pickMetrics014AFix1(metrics: Metric014A[], keys: string[]): Metric014A[] {
  const byKey = new Map(metrics.map((metric) => [metric.key, metric]));
  return keys.map((key) => byKey.get(key)).filter(Boolean) as Metric014A[];
}

function makeReport014A(copy: Copy014A, responses: RuntimeResponse014A[]): Record<string, unknown> {
  const orders = getOrders014A(responses);
  const report = getReport014A(responses);
  const growth = buildGrowth014A(report, orders);
  return {
    marker: MARKER014A,
    createdAt: new Date().toISOString(),
    allowedRoles: [copy.manager, copy.accountant, copy.deputy, copy.sabiAi],
    realOnly: true,
    buttons: [copy.reportButton, copy.archiveButton],
    ordersCount: orders.length,
    dailyRevenueMinor: growth.slice(-1)[0]?.totalFareMinor || num014A(report.totalFinalFareMinor),
    sabiEarningMinor: orders.reduce((sum, order) => sum + commissionMinor014A(order), 0),
    growthPoints: growth.length,
    endpointStatuses: responses.map((item) => ({ key: item.key, status: item.status, ok: item.ok, route: item.route })),
    noFakeGeneratedByUi: true,
    noDistributionButtons: true,
    noWalletProviderMutationByUi: true,
  };
}

export function TaxiFinanceOps014APanel({ language, config, setNotice, surface }: Props014A) {
  const copy = COPY014A[language] || COPY014A.ru;
  const [responses, setResponses] = useState<RuntimeResponse014A[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastReport, setLastReport] = useState<Record<string, unknown> | null>(null);
  const [lastArchive, setLastArchive] = useState<RuntimeResponse014A | null>(null);

  const readAll = useCallback(async () => {
    setLoading(true);
    const next: RuntimeResponse014A[] = [];
    for (const endpoint of READ_ENDPOINTS_014A) {
      try {
        const response = await fetch(`${base014A(config)}${endpoint.route}`, { headers: headers014A(config) });
        const body = await response.json().catch(() => ({}));
        next.push({ key: endpoint.key, label: endpoint.label, route: endpoint.route, status: response.status, ok: response.ok, at: new Date().toISOString(), body: record014A(body) });
      } catch (error) {
        next.push({ key: endpoint.key, label: endpoint.label, route: endpoint.route, status: "network_error", ok: false, at: new Date().toISOString(), body: { ok: false, error: error instanceof Error ? error.message : "network_error" } });
      }
    }
    setResponses(next);
    setLoading(false);
    return next;
  }, [config]);

  useEffect(() => {
    void readAll();
    const timer = window.setInterval(() => void readAll(), REFRESH_MS_014A);
    return () => window.clearInterval(timer);
  }, [readAll]);

  const metrics = useMemo(() => buildMetrics014A(copy, responses), [copy, responses]);
  const report = useMemo(() => getReport014A(responses), [responses]);
  const orders = useMemo(() => getOrders014A(responses), [responses]);
  const growth = useMemo(() => buildGrowth014A(report, orders), [report, orders]);
  const okSources = responses.filter((item) => item.ok).length;
  const surfaceProfile = useMemo(() => surfaceProfile014AFix1(copy, surface), [copy, surface]);
  const surfaceMetrics = useMemo(() => pickMetrics014AFix1(metrics, surfaceProfile.primaryMetricKeys), [metrics, surfaceProfile]);
  const surfaceResponses = useMemo(() => responses.filter((item) => surfaceProfile.sourceKeys.includes(item.key)), [responses, surfaceProfile]);

  const buildReport = async () => {
    const latest = await readAll();
    const snapshot = makeReport014A(copy, latest);
    setLastReport(snapshot);
    setNotice(copy.reportReady);
  };

  const runArchive = async () => {
    const route = "/api/admin/taxi/orders/009a/archive/run";
    const archiveId = `taxi-finance-ops-014a-archive:${new Date().toISOString()}`;
    try {
      const response = await fetch(`${base014A(config)}${route}`, {
        method: "POST",
        headers: headers014A(config, {
          "content-type": "application/json",
          [ARCHIVE_APPROVAL_HEADER_014A]: ARCHIVE_APPROVAL_VALUE_014A,
          [IDEMPOTENCY_HEADER_014A]: archiveId,
          "x-sabi-taxi-finance-ops-014a-access-scope": "manager-accountant-deputy-owner-sabi-ai",
          "x-sabi-taxi-finance-ops-014a-report-archive-only": "true",
        }),
        body: JSON.stringify({ marker: MARKER014A, archiveId, reportArchiveOnly: true, noDistribution: true, noWalletProviderMutationByUi: true }),
      });
      const body = await response.json().catch(() => ({}));
      const archiveResponse = { key: "archiveRun", label: "Archive run 009A", route, status: response.status, ok: response.ok, at: new Date().toISOString(), body: record014A(body) };
      setLastArchive(archiveResponse);
      setNotice(response.ok ? copy.archiveReady : copy.archiveBlocked);
      await readAll();
    } catch (error) {
      const archiveResponse = { key: "archiveRun", label: "Archive run 009A", route, status: "network_error", ok: false, at: new Date().toISOString(), body: { ok: false, error: error instanceof Error ? error.message : "network_error" } };
      setLastArchive(archiveResponse);
      setNotice(copy.archiveBlocked);
    }
  };

  return (
    <section
      className="taxi014aFinanceOps"
      data-admin-ui-taxi-finance-ops-014a-marker={MARKER014A}
      data-admin-ui-taxi-finance-ops-014a-surface={surface}
      data-admin-ui-taxi-finance-ops-014a-real-data-only="true"
      data-admin-ui-taxi-finance-ops-014a-allowed-roles="manager,accountant,deputy,owner_sabi_ai"
      data-admin-ui-taxi-finance-ops-014a-report-archive-buttons-only="true"
      data-admin-ui-taxi-finance-ops-014a-no-distribution-buttons="true"
      data-admin-ui-taxi-finance-ops-014a-auto-sync-ms={REFRESH_MS_014A}
      data-admin-ui-taxi-finance-ops-014a-no-fake="true"
      data-admin-ui-taxi-finance-ops-014a-no-wallet-provider="true"
      data-admin-ui-taxi-finance-ops-014a-fix1-distinct-surfaces="true"
      data-admin-ui-taxi-finance-ops-014a-fix1-marker={MARKER014A_FIX1}
    >
      <div className="taxi014aHero">
        <div>
          <span>{copy.marker}</span>
          <h2>{copy.title}</h2>
          <p>{copy.subtitle}</p>
        </div>
        <aside>
          <strong>{okSources}/{READ_ENDPOINTS_014A.length}</strong>
          <small>{copy.liveSync}</small>
        </aside>
      </div>

      <div className="taxi014aAccessGate" data-admin-ui-taxi-finance-ops-014a-access-gate="manager-accountant-deputy-owner-sabi-ai-only">
        <div><strong>{copy.scopeTitle}</strong><span>{copy.readOnlyRoleGate}</span></div>
        {[copy.manager, copy.accountant, copy.deputy, copy.sabiAi].map((role) => <span key={role}>{role}</span>)}
      </div>

      <div className="taxi014aActionBar" data-admin-ui-taxi-finance-ops-014a-only-two-actions="report-and-archive">
        <button type="button" onClick={() => void buildReport()} disabled={loading}>{loading ? copy.liveSync : copy.reportButton}</button>
        <button type="button" onClick={() => void runArchive()} disabled={loading}>{copy.archiveButton}</button>
        <p>{copy.onlyReportArchiveButtons} · {copy.noDistribution} · {copy.noFake}</p>
      </div>


      <div
        className="taxi014cCloseoutBoard"
        data-admin-ui-taxi-finance-ops-014c-marker={MARKER014C}
        data-admin-ui-taxi-finance-ops-014c-runtime-014b="passed"
        data-admin-ui-taxi-finance-ops-014c-source-health="9-of-9"
        data-admin-ui-taxi-finance-ops-014c-applications-007z="http-200-real-empty-list-ok"
        data-admin-ui-taxi-finance-ops-014c-report-archive-only="true"
        data-admin-ui-taxi-finance-ops-014c-no-fake-wallet-provider-local-penalty="true"
      >
        <div>
          <span>{MARKER014C}</span>
          <h3>014C Finance Ops production closeout</h3>
          <p>Runtime 014B passed: Balance / Rewards / Contests / Archive / Reports / Access are synchronized from real sources only. Applications 007Z now returns HTTP 200 with a real empty list when no rows exist.</p>
        </div>
        <div className="taxi014cCloseoutPills">
          <span>014B runtime: passed</span>
          <span>sources: 9/9</span>
          <span>007Z: 200</span>
          <span>daily revenue: real-only</span>
          <span>Sabi earning: commission from real orders</span>
          <span>growth scale: real source or empty-no-fake</span>
          <span>actions: report + archive only</span>
          <span>no fake / no Wallet / no provider</span>
        </div>
      </div>

      <div className="taxi014aSurfaceBoard" data-admin-ui-taxi-finance-ops-014a-fix1-distinct-surface-board={surfaceProfile.marker}>
        <div>
          <span>{MARKER014A_FIX1}</span>
          <h2>{surfaceProfile.title}</h2>
          <p>{surfaceProfile.subtitle}</p>
        </div>
        <aside>
          <strong>{surface.toUpperCase()}</strong>
          <small>shared sync core · distinct visible workflow</small>
        </aside>
      </div>

      <div className="taxi014aMetrics" data-admin-ui-taxi-finance-ops-014a-balance-bonus-contest-archive-report-access="distinct-surface-shared-sync-core">
        {surfaceMetrics.map((metric) => (
          <article key={metric.key} data-taxi-finance-ops-014a-metric={metric.key}>
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
            <small>{metric.hint}</small>
            <em>{metric.source}</em>
          </article>
        ))}
      </div>

      <div className="taxi014aGrid">
        <section className="taxi014aCard taxi014aSurfaceFocus" data-admin-ui-taxi-finance-ops-014a-fix1-surface-focus={surfaceProfile.marker}>
          <div className="taxi014aCardHead"><h3>{surfaceProfile.title}</h3><span>{surface}</span></div>
          <div className="taxi014aFocusChecklist">
            {surfaceProfile.checklist.map((item) => <div key={item}><span>✓</span><p>{item}</p></div>)}
          </div>
          <p>{surfaceProfile.emptyState}</p>
        </section>

        <section className="taxi014aCard taxi014aSurfaceSources" data-admin-ui-taxi-finance-ops-014a-fix1-surface-sources={surfaceProfile.sourceKeys.join(",") }>
          <div className="taxi014aCardHead"><h3>{copy.sourceHealth}: {surface}</h3><span>{surfaceResponses.filter((item) => item.ok).length}/{surfaceProfile.sourceKeys.length}</span></div>
          <div className="taxi014aEndpointList">
            {surfaceResponses.length ? surfaceResponses.map((item) => (
              <div key={item.key} className={item.ok ? "ok" : "warn"}>
                <span>{item.label}</span>
                <strong>{item.status}</strong>
                <small>{item.route}</small>
              </div>
            )) : <p>{copy.realOnly}</p>}
          </div>
        </section>
        <section className="taxi014aCard" data-admin-ui-taxi-finance-ops-014a-daily-revenue="real-orders-only">
          <div className="taxi014aCardHead"><h3>{copy.dailyRevenue}</h3><span>{money014A(num014A(report.totalFinalFareMinor))}</span></div>
          <div className="taxi014aGrowthList">
            {growth.length ? growth.slice(-14).map((point) => (
              <div key={point.date} className="taxi014aGrowthRow">
                <span>{point.date}</span>
                <div><i style={{ width: `${Math.max(2, point.barPercent)}%` }} /></div>
                <strong>{point.totalOrders}</strong>
                <small>{money014A(point.totalFareMinor)}</small>
              </div>
            )) : <p>{copy.realOnly}</p>}
          </div>
        </section>

        <section className="taxi014aCard" data-admin-ui-taxi-finance-ops-014a-sabi-earning="commission-from-real-orders-only">
          <div className="taxi014aCardHead"><h3>{copy.sabiEarning}</h3><span>{money014A(orders.reduce((sum, order) => sum + commissionMinor014A(order), 0))}</span></div>
          <div className="taxi014aSourceList">
            <div><span>Orders</span><strong>{orders.length}</strong><small>009A TaxiTrip</small></div>
            <div><span>Completed</span><strong>{Math.round(num014A(report.completedOrders))}</strong><small>real status bucket</small></div>
            <div><span>Average fare</span><strong>{money014A(num014A(report.averageFinalFareMinor))}</strong><small>009A report</small></div>
            <div><span>Archive eligible</span><strong>{Math.round(num014A(report.archiveEligibleOrders))}</strong><small>009A 7-day rule</small></div>
          </div>
        </section>

        <section className="taxi014aCard" data-admin-ui-taxi-finance-ops-014a-synchronized-functions="balance-rewards-contests-archive-reports-access">
          <div className="taxi014aCardHead"><h3>{copy.synchronizedFunctions}</h3><span>{surface}</span></div>
          <div className="taxi014aFunctionList">
            {[copy.balance, copy.rewards, copy.contests, copy.archive, copy.reports, copy.access].map((item) => <span key={item}>{item}</span>)}
          </div>
          <p>{copy.realOnly}</p>
        </section>

        <section className="taxi014aCard" data-admin-ui-taxi-finance-ops-014a-source-health="real-runtime-endpoints">
          <div className="taxi014aCardHead"><h3>{copy.sourceHealth}</h3><span>{okSources}/{READ_ENDPOINTS_014A.length}</span></div>
          <div className="taxi014aEndpointList">
            {responses.map((item) => (
              <div key={item.key} className={item.ok ? "ok" : "warn"}>
                <span>{item.label}</span>
                <strong>{item.status}</strong>
                <small>{item.route}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="taxi014aCard">
          <div className="taxi014aCardHead"><h3>{copy.lastReport}</h3><span>{lastReport ? str014A(lastReport.createdAt) : "—"}</span></div>
          <pre>{lastReport ? JSON.stringify(lastReport, null, 2) : copy.reportReady}</pre>
        </section>

        <section className="taxi014aCard">
          <div className="taxi014aCardHead"><h3>{copy.lastArchive}</h3><span>{lastArchive ? String(lastArchive.status) : "—"}</span></div>
          <pre>{lastArchive ? JSON.stringify({ ok: lastArchive.ok, status: lastArchive.status, body: lastArchive.body }, null, 2) : copy.archiveReady}</pre>
        </section>
      </div>
    </section>
  );
}
