import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type JsonRecord007H = Record<string, unknown>;
type QueueKey007H = "applications" | "drivers" | "vehicles" | "orders" | "trips" | "complaints" | "balance" | "tariffs" | "gifts" | "reports";
type WorkTab007H = "applications" | "complaints" | "accounting" | "fleet" | "operations" | "reports";
type Method007H = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type Tone007H = "ready" | "warn" | "locked" | "danger" | "info";

type Source007H = { key: string; title: string; path: string; method: Method007H; body?: JsonRecord007H };
type BackendResult007H = { key: string; title: string; path: string; method: Method007H; ok: boolean; status: number; message: string; payload: unknown; at: string; ms: number };
type ActionJournal007H = { id: string; title: string; queue: QueueKey007H; recordId: string; ok: boolean; status: number; message: string; at: string; route: string; synced: boolean };
type Route007H = { key?: string; operationKey?: string; area?: string; method?: string; path?: string; safeDisabledUntilNextStage?: boolean; requiresAdmin?: boolean; requiresIdempotencyForWrite?: boolean; requiresProviderReadiness?: boolean; requiresWalletBoundary?: boolean };
type Queue007H = { key: QueueKey007H; title: string; subtitle: string; rows: JsonRecord007H[]; requiredReview: string[]; tone: Tone007H };
type Action007H = { key: string; queue: QueueKey007H; title: string; description: string; routeHints: string[]; idKeys: string[]; needsReason: boolean; needsOwnerApproval?: boolean; tone: Tone007H; payloadKind: string };
type Props007H = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };

const MARKER007H = "ADMIN-UI-TAXI-007H-BALANCE-ACCOUNTING-CONTROL";
const DASH = "—";

const COPY007H: Record<AdminLanguage, Record<string, string>> = {
  ru: {
    title: "Taxi Control Center",
    subtitle: "Чёткое изучение заявок такси: качество очередей, ворота доказательств, полнота досье, следующие действия оператора и решения только через сервер — без фейкового успеха.",
    refresh: "Обновить данные",
    diagnostics: "Диагностика",
    load: "Загрузка",
    choose: "Очередь",
    review: "Изучение",
    decision: "Решение",
    sync: "Синхронизация",
    applicationDossier: "Досье заявки",
    driverData: "Водитель",
    vehicleData: "Авто",
    documentPhotos: "Фото и документы",
    safetyData: "Проверка безопасности",
    financeData: "Баланс / расчёты",
    decisionPanel: "Решение администратора",
    reason: "Причина решения",
    ownerApproval: "Owner approval ID",
    selectedId: "Номер записи",
    runAction: "Отправить на сервер",
    blocked: "Нельзя выполнить",
    backendOnly: "Решение засчитывается только после ответа сервера. Интерфейс не утверждает и не меняет статус локально.",
    missingRows: "Сервер пока не вернул строки. Это не фейк: нужно включить или проверить этап чтения либо открыть диагностику.",
    missingPhotos: "Фото и документы не пришли от сервера. Интерфейс не подставляет демонстрационные картинки.",
    latest: "Последний ответ сервера",
    reports: "Отчёты / шкалы",
    sources: "Источники сервера",
    dataTruth: "Качество данных",
    sourceHealth: "Здоровье источников",
    actionJournal: "Журнал действий",
    emptyStateFix: "Что нужно включить дальше",
    technical: "Техническая основа",
  },
  en: {
    title: "Taxi Control Center",
    subtitle: "Clear Taxi intake review: queue quality, evidence gates, dossier completeness, operator next steps and backend-only decisions — no local fake success.",
    refresh: "Refresh data",
    diagnostics: "Diagnostics",
    load: "Load",
    choose: "Queue",
    review: "Review",
    decision: "Decision",
    sync: "Sync",
    applicationDossier: "Application dossier",
    driverData: "Driver",
    vehicleData: "Vehicle",
    documentPhotos: "Photos and documents",
    safetyData: "Safety review",
    financeData: "Balance / settlement",
    decisionPanel: "Admin decision",
    reason: "Decision reason",
    ownerApproval: "Owner approval ID",
    selectedId: "Record ID",
    runAction: "Send to backend",
    blocked: "Blocked",
    backendOnly: "Decision counts only after backend response. UI never approves or changes status locally.",
    missingRows: "Backend has not returned rows yet. This is not fake: enable/check read stage or open diagnostics.",
    missingPhotos: "Photos/documents were not returned by backend. UI does not insert demo images.",
    latest: "Latest backend response",
    reports: "Reports / scales",
    sources: "Backend sources",
    dataTruth: "Data quality",
    sourceHealth: "Source health",
    actionJournal: "Action journal",
    emptyStateFix: "What to enable next",
    technical: "Technical foundation",
  },
  uz: {
    title: "Taxi Control Center",
    subtitle: "Taksi boshqaruvi: arizalar, foto, hujjat, avtomobil, shikoyat, balans va qarorlar — mahalliy soxta muvaffaqiyat yo‘q.",
    refresh: "Maʼlumotni yangilash",
    diagnostics: "Diagnostika",
    load: "Yuklash",
    choose: "Navbat",
    review: "Tekshiruv",
    decision: "Qaror",
    sync: "Sinxronlash",
    applicationDossier: "Ariza dosyesi",
    driverData: "Haydovchi",
    vehicleData: "Mashina",
    documentPhotos: "Foto va hujjatlar",
    safetyData: "Xavfsizlik tekshiruvi",
    financeData: "Balans / hisob-kitob",
    decisionPanel: "Admin qarori",
    reason: "Qaror sababi",
    ownerApproval: "Owner approval ID",
    selectedId: "Yozuv ID",
    runAction: "Backendga yuborish",
    blocked: "Bloklangan",
    backendOnly: "Qaror faqat backend javobidan keyin hisoblanadi. UI lokal approve qilmaydi.",
    missingRows: "Backend hali qator qaytarmadi. Bu fake emas: read stage/diagnostics tekshiring.",
    missingPhotos: "Foto yoki hujjat serverdan kelmadi. Interfeys demo rasm qo‘ymaydi.",
    latest: "Oxirgi backend javobi",
    reports: "Hisobot / shkala",
    sources: "Backend manbalari",
    dataTruth: "Maʼlumot sifati",
    sourceHealth: "Manba holati",
    actionJournal: "Amallar jurnali",
    emptyStateFix: "Keyin nimani yoqish kerak",
    technical: "Texnik asos",
  },
  zh: {
    title: "Taxi Control Center",
    subtitle: "清晰管理出租车：申请、照片、文件、车辆、投诉、余额和决策—无本地虚假成功。",
    refresh: "刷新数据",
    diagnostics: "诊断",
    load: "加载",
    choose: "队列",
    review: "审核",
    decision: "决策",
    sync: "同步",
    applicationDossier: "申请档案",
    driverData: "司机",
    vehicleData: "车辆",
    documentPhotos: "照片和文件",
    safetyData: "安全审核",
    financeData: "余额 / 结算",
    decisionPanel: "管理员决策",
    reason: "决策原因",
    ownerApproval: "Owner approval ID",
    selectedId: "记录编号",
    runAction: "发送到服务器",
    blocked: "已阻止",
    backendOnly: "只有服务器响应后决策才有效。界面不会本地批准或更改状态。",
    missingRows: "服务器尚未返回行。这不是虚假结果：请检查读取阶段或诊断。",
    missingPhotos: "服务器未返回照片或文件。界面不插入演示图片。",
    latest: "最新服务器响应",
    reports: "报告 / 刻度",
    sources: "服务器来源",
    dataTruth: "数据质量",
    sourceHealth: "来源健康",
    actionJournal: "操作日志",
    emptyStateFix: "下一步需要启用",
    technical: "技术基础",
  },
};

function tx007H(language: AdminLanguage, key: string): string { return COPY007H[language]?.[key] ?? COPY007H.ru[key] ?? key; }
function isRecord007H(value: unknown): value is JsonRecord007H { return typeof value === "object" && value !== null && !Array.isArray(value); }
function text007H(value: unknown): string { if (value === null || value === undefined || value === "") return DASH; if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value); if (Array.isArray(value)) return `${value.length} items`; if (typeof value === "object") return "object"; return String(value); }

const SOURCES007H: Source007H[] = [
  { key: "readiness", title: "Readiness", method: "GET", path: "/api/taxi/002n/readiness" },
  { key: "routes", title: "Routes", method: "GET", path: "/api/taxi/002n/routes" },
  { key: "diagnostics", title: "Admin diagnostics", method: "GET", path: "/api/admin/taxi/002n/diagnostics" },
  { key: "readOnlyPlan", title: "Read-only plan", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run/plan" },
  { key: "readOnlyRows", title: "Read-only rows", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run" },
  { key: "writePlan", title: "Write gate plan", method: "GET", path: "/api/taxi/002x/db-write-runtime/plan" },
  { key: "writeGate", title: "Write gate check", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: MARKER007H, action: "check_write_gate", fakeSuccessBlocked: true } },
  { key: "providerWallet", title: "Provider / Wallet boundary", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: MARKER007H, action: "check_provider_wallet_boundary", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", method: "POST", path: "/api/taxi/003h/admin-readiness-cockpit/check", body: { source: MARKER007H, action: "check_admin_cockpit", fakeSuccessBlocked: true } },
];

const QUEUE_META007H: Record<QueueKey007H, Omit<Queue007H, "key" | "rows">> = {
  applications: { title: "Заявки", subtitle: "Водитель, документы, фото, авто", tone: "ready", requiredReview: ["identity_checked", "driver_photo_checked", "license_checked", "vehicle_checked", "safety_checked"] },
  drivers: { title: "Водители", subtitle: "Профиль, доступ, риск", tone: "info", requiredReview: ["profile_checked", "risk_checked", "balance_checked"] },
  vehicles: { title: "Авто", subtitle: "Модель, номер, страховка", tone: "info", requiredReview: ["registration_checked", "insurance_checked", "vehicle_photo_checked"] },
  orders: { title: "Заказы", subtitle: "Запросы, диспетчеризация, отмены", tone: "warn", requiredReview: ["route_checked", "tariff_checked", "dispatch_checked"] },
  trips: { title: "Поездки", subtitle: "Lifecycle, safety, dispute", tone: "warn", requiredReview: ["trip_state_checked", "amount_checked", "safety_checked"] },
  complaints: { title: "Жалобы", subtitle: "Evidence, AI, escalation", tone: "danger", requiredReview: ["evidence_checked", "trip_checked", "severity_checked", "ai_checked"] },
  balance: { title: "Баланс", subtitle: "Reserve, pending, available", tone: "warn", requiredReview: ["driver_balance_checked", "hold_checked", "settlement_checked", "wallet_boundary_checked"] },
  tariffs: { title: "Тарифы", subtitle: "Регионы, зоны, комиссии", tone: "info", requiredReview: ["region_checked", "commission_checked", "history_checked"] },
  gifts: { title: "Подарки / бонусы", subtitle: "Tips, rewards, freeze/release", tone: "locked", requiredReview: ["reward_checked", "finance_checked", "legal_checked", "owner_checked"] },
  reports: { title: "Отчёты", subtitle: "Рост, аудит, блокировки", tone: "ready", requiredReview: ["growth_checked", "audit_checked", "route_coverage_checked"] },
};

const WORK_TABS007H: Array<{ key: WorkTab007H; title: string; queues: QueueKey007H[]; description: string }> = [
  { key: "applications", title: "Заявки", queues: ["applications"], description: "Изучение заявки: водитель, авто, документы, фото, проверка личности, безопасность." },
  { key: "complaints", title: "Жалобы", queues: ["complaints", "trips"], description: "Проверка жалоб, доказательства, рекомендация Саби ИИ и отработка." },
  { key: "accounting", title: "Баланс", queues: ["balance", "gifts"], description: "Баланс таксистов, расчёт, граница бонусов и подарков." },
  { key: "fleet", title: "Водители / авто", queues: ["drivers", "vehicles"], description: "Учёт водителей, авто, документы и доступ к диспетчеризации." },
  { key: "operations", title: "Заказы / поездки", queues: ["orders", "trips", "tariffs"], description: "Заказы, поездки, диспетчеризация, тарифы и комиссии." },
  { key: "reports", title: "Отчёты", queues: ["reports"], description: "Шкалы роста, отчёты, аудит и готовность." },
];

const ACTIONS007H: Action007H[] = [
  { key: "reviewApplication", queue: "applications", title: "Изучить заявку", description: "Открыть процесс проверки по заявке без изменения базы.", routeHints: ["application", "review"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "info", payloadKind: "driver_application_review" },
  { key: "approveApplication", queue: "applications", title: "Подтвердить заявку", description: "Одобрение только через сервер и аудит.", routeHints: ["application", "approve"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_application_approve" },
  { key: "rejectApplication", queue: "applications", title: "Отклонить заявку", description: "Отказ с причиной и причиной блокировки сервера.", routeHints: ["application", "reject"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "danger", payloadKind: "driver_application_reject" },
  { key: "requireDocuments", queue: "applications", title: "Запросить документы", description: "Запросить недостающие фото/документы.", routeHints: ["document", "require"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "warn", payloadKind: "driver_application_require_documents" },
  { key: "suspendDriver", queue: "drivers", title: "Остановить водителя", description: "Suspend only via backend.", routeHints: ["driver", "suspend"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "driver_suspend" },
  { key: "restoreDriver", queue: "drivers", title: "Восстановить водителя", description: "Restore only via backend.", routeHints: ["driver", "restore"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_restore" },
  { key: "approveVehicle", queue: "vehicles", title: "Подтвердить авто", description: "Approve vehicle documents.", routeHints: ["vehicle", "approve"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "ready", payloadKind: "vehicle_approve" },
  { key: "rejectVehicle", queue: "vehicles", title: "Отклонить авто", description: "Reject vehicle documents.", routeHints: ["vehicle", "reject"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "danger", payloadKind: "vehicle_reject" },
  { key: "assignDispatch", queue: "orders", title: "Назначить / переназначить", description: "Dispatch action through backend.", routeHints: ["dispatch", "assign"], idKeys: ["requestId", "orderId", "id"], needsReason: true, tone: "info", payloadKind: "dispatch_assign" },
  { key: "cancelTrip", queue: "trips", title: "Отменить поездку", description: "Trip cancel with reason.", routeHints: ["trip", "cancel"], idKeys: ["tripId", "id"], needsReason: true, tone: "danger", payloadKind: "trip_cancel" },
  { key: "resolveComplaint", queue: "complaints", title: "Закрыть жалобу", description: "Resolve complaint after evidence review.", routeHints: ["complaint", "resolve"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "ready", payloadKind: "complaint_resolve" },
  { key: "escalateComplaint", queue: "complaints", title: "Передать жалобу выше", description: "Escalate complaint to supervisor/legal.", routeHints: ["complaint", "escalate"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "warn", payloadKind: "complaint_escalate" },
  { key: "reviewBalance", queue: "balance", title: "Проверить баланс", description: "Review settlement/hold without wallet mutation.", routeHints: ["settlement", "review"], idKeys: ["settlementId", "paymentHoldId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "warn", payloadKind: "driver_balance_review" },
  { key: "updateTariff", queue: "tariffs", title: "Проверить тариф", description: "Tariff/commission action through backend.", routeHints: ["tariff", "upsert"], idKeys: ["tariffId", "regionCode", "id"], needsReason: true, needsOwnerApproval: true, tone: "info", payloadKind: "tariff_commission_review" },
  { key: "freezeReward", queue: "gifts", title: "Заморозить бонус/подарок", description: "Freeze reward boundary only after backend.", routeHints: ["reward", "freeze"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "gift_reward_freeze" },
  { key: "releaseReward", queue: "gifts", title: "Разморозить бонус/подарок", description: "Release reward boundary only after backend.", routeHints: ["reward", "release"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "gift_reward_release" },
];

function flattenRecords007H(value: unknown, hint: string): JsonRecord007H[] {
  const out: JsonRecord007H[] = [];
  const seen = new Set<unknown>();
  const lowerHint = hint.toLowerCase();
  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 6 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) {
      const rows = node.filter(isRecord007H);
      if (rows.length && path.toLowerCase().includes(lowerHint)) out.push(...rows);
      node.forEach((child, index) => walk(child, `${path}.${index}`, depth + 1));
      return;
    }
    if (!isRecord007H(node)) return;
    Object.entries(node).forEach(([key, child]) => walk(child, `${path}.${key}`, depth + 1));
  };
  walk(value, "root", 0);
  return out.slice(0, 80);
}

function collectRoutes007H(value: unknown): Route007H[] {
  const routes: Route007H[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 7 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) { node.forEach((child) => walk(child, depth + 1)); return; }
    if (!isRecord007H(node)) return;
    const path = typeof node.path === "string" ? node.path : null;
    const method = typeof node.method === "string" ? node.method : null;
    const operationKey = typeof node.operationKey === "string" ? node.operationKey : typeof node.key === "string" ? node.key : null;
    if (path && (method || operationKey)) routes.push(node as Route007H);
    Object.values(node).forEach((child) => walk(child, depth + 1));
  };
  walk(value, 0);
  return routes;
}

function queueRows007H(results: BackendResult007H[]): Record<QueueKey007H, JsonRecord007H[]> {
  const payloads = results.map((item) => item.payload);
  const all = (hint: string) => payloads.flatMap((payload) => flattenRecords007H(payload, hint));
  return {
    applications: [...all("application"), ...all("driverApplication")],
    drivers: all("driver"),
    vehicles: [...all("vehicle"), ...all("car")],
    orders: [...all("order"), ...all("request")],
    trips: all("trip"),
    complaints: [...all("complaint"), ...all("dispute"), ...all("support")],
    balance: [...all("balance"), ...all("settlement"), ...all("hold")],
    tariffs: [...all("tariff"), ...all("region"), ...all("commission")],
    gifts: [...all("gift"), ...all("reward"), ...all("bonus"), ...all("tip")],
    reports: [...all("report"), ...all("audit"), ...all("metric")],
  };
}

function firstId007H(row: JsonRecord007H | null, keys: string[]): string {
  if (!row) return "";
  for (const key of keys) {
    const value = row[key];
    if ((typeof value === "string" || typeof value === "number") && String(value).trim()) return String(value).trim();
  }
  for (const [key, value] of Object.entries(row)) {
    if (key.toLowerCase().endsWith("id") && (typeof value === "string" || typeof value === "number")) return String(value);
  }
  return "";
}

function pickFields007H(row: JsonRecord007H | null, patterns: RegExp[], limit = 8): Array<[string, unknown]> {
  if (!row) return [];
  return Object.entries(row).filter(([key]) => patterns.some((pattern) => pattern.test(key))).slice(0, limit);
}

function photoFields007H(row: JsonRecord007H | null): Array<[string, string]> {
  if (!row) return [];
  return Object.entries(row)
    .filter(([key, value]) => /photo|image|avatar|license|document|insurance|registration|car|vehicle|selfie|passport|certificate/i.test(key) && typeof value === "string" && value.trim())
    .map(([key, value]) => [key, String(value)]);
}

function findRoute007H(routes: Route007H[], action: Action007H): Route007H | null {
  const hints = action.routeHints.map((hint) => hint.toLowerCase());
  const scored = routes.map((route) => {
    const text = [route.key, route.operationKey, route.area, route.method, route.path].filter(Boolean).join(" ").toLowerCase();
    const score = hints.reduce((sum, hint) => sum + (text.includes(hint) ? 1 : 0), 0);
    return { route, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  return scored[0]?.route ?? null;
}

function resultMessage007H(payload: unknown, status: number): string {
  if (isRecord007H(payload)) {
    for (const key of ["error", "message", "reason", "blockedReason", "status"]) {
      if (typeof payload[key] === "string") return String(payload[key]);
    }
  }
  return status ? `HTTP ${status}` : "network/error";
}

function FieldGroup007H({ title, rows, empty }: { title: string; rows: Array<[string, unknown]>; empty: string }) {
  return <article className="taxi007h-fieldGroup"><h3>{title}</h3>{rows.length ? <div>{rows.map(([key, value]) => <p key={key}><span>{key}</span><b>{text007H(value)}</b></p>)}</div> : <em>{empty}</em>}</article>;
}

export function TaxiAdminControl007HPanel({ language, config, setNotice }: Props007H) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<BackendResult007H[]>([]);
  const [last, setLast] = useState<BackendResult007H | null>(null);
  const [activeTab, setActiveTab] = useState<WorkTab007H>("applications");
  const [activeQueue, setActiveQueue] = useState<QueueKey007H>("applications");
  const [selected, setSelected] = useState<JsonRecord007H | null>(null);
  const [manualId, setManualId] = useState("");
  const [actionKey, setActionKey] = useState("reviewApplication");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [actionJournal, setActionJournal] = useState<ActionJournal007H[]>([]);
  const [queueSearch, setQueueSearch] = useState("");
  const [sourceOpen, setSourceOpen] = useState(false);

  const callSource = useCallback(async (source: Source007H): Promise<BackendResult007H> => {
    const started = Date.now();
    let response: Response | null = null;
    let payload: unknown = null;
    try {
      response = await fetch(`${config.baseUrl}${source.path}`, {
        method: source.method,
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": config.token },
        body: source.method === "GET" ? undefined : JSON.stringify(source.body ?? { source: MARKER007H, fakeSuccessBlocked: true }),
      });
      const text = await response.text();
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    } catch (error) {
      payload = { error: error instanceof Error ? error.message : String(error) };
    }
    const status = response?.status ?? 0;
    const message = response?.ok ? "ok" : resultMessage007H(payload, status);
    return { key: source.key, title: source.title, path: source.path, method: source.method, ok: response?.ok ?? false, status, message, payload, at: new Date().toISOString(), ms: Date.now() - started };
  }, [config.baseUrl, config.token]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    try {
      const loaded = await Promise.all(SOURCES007H.map((source) => callSource(source)));
      setResults(loaded);
      setLast(loaded[loaded.length - 1] ?? null);
      setNotice(`Taxi refresh · ${loaded.filter((item) => item.ok).length}/${loaded.length} sources`);
    } finally { setBusy(false); }
  }, [callSource, setNotice]);

  useEffect(() => { void refreshAll(); }, [refreshAll]);

  const routes = useMemo(() => results.flatMap((item) => item.key === "routes" ? collectRoutes007H(item.payload) : []), [results]);
  const rowsByQueue = useMemo(() => queueRows007H(results), [results]);
  const queues = useMemo(() => (Object.keys(QUEUE_META007H) as QueueKey007H[]).map((key) => ({ key, ...QUEUE_META007H[key], rows: rowsByQueue[key] ?? [] })), [rowsByQueue]);
  const currentTab = WORK_TABS007H.find((tab) => tab.key === activeTab) ?? WORK_TABS007H[0];
  const visibleQueues = queues.filter((queue) => currentTab.queues.includes(queue.key));
  const active = queues.find((queue) => queue.key === activeQueue) ?? visibleQueues[0] ?? queues[0];
  const actions = ACTIONS007H.filter((action) => action.queue === active.key);
  const action = actions.find((item) => item.key === actionKey) ?? actions[0] ?? ACTIONS007H[0];
  const route = useMemo(() => findRoute007H(routes, action), [routes, action]);
  const selectedId = manualId.trim() || firstId007H(selected, action.idKeys);
  const checklistOk = active.requiredReview.every((item) => checked[`${active.key}:${item}`]);
  const reasonOk = !action.needsReason || adminReason.trim().length >= 8;
  const ownerOk = !action.needsOwnerApproval || ownerApprovalId.trim().length >= 4;
  const canRun = Boolean(route?.path && selectedId && checklistOk && reasonOk && ownerOk && !busy);

  useEffect(() => {
    const firstQueue = currentTab.queues[0] ?? "applications";
    setActiveQueue(firstQueue);
    const firstAction = ACTIONS007H.find((item) => item.queue === firstQueue) ?? ACTIONS007H[0];
    setActionKey(firstAction.key);
    setChecked({});
    setManualId("");
  }, [activeTab]);

  useEffect(() => {
    setSelected(active.rows[0] ?? null);
    setChecked({});
    setManualId("");
    const firstAction = ACTIONS007H.find((item) => item.queue === active.key) ?? ACTIONS007H[0];
    setActionKey(firstAction.key);
  }, [active.key, active.rows]);

  const runAction = async () => {
    if (!route?.path || !route.method) return;
    const method = route.method.toUpperCase() as Method007H;
    setBusy(true);
    const body = {
      source: MARKER007H,
      fakeSuccessBlocked: true,
      action: action.key,
      payloadKind: action.payloadKind,
      selectedId,
      selectedRecord: selected,
      adminReason: adminReason.trim(),
      ownerApprovalId: ownerApprovalId.trim() || null,
      reviewChecklist: active.requiredReview.reduce<Record<string, boolean>>((acc, item) => { acc[item] = checked[`${active.key}:${item}`] === true; return acc; }, {}),
    };
    const result = await callSource({ key: action.key, title: action.title, path: route.path, method, body });
    setLast(result);
    setResults((prev) => [...prev.filter((item) => item.key !== action.key), result]);
    let synced = false;
    if (result.ok) { await refreshAll(); synced = true; }
    setActionJournal((prev) => [{ id: `${Date.now()}-${action.key}`, title: action.title, queue: active.key, recordId: selectedId, ok: result.ok, status: result.status, message: result.message, at: new Date().toISOString(), route: `${method} ${route.path}`, synced }, ...prev].slice(0, 20));
    setBusy(false);
  };

  const sourceOk = results.filter((item) => item.ok).length;
  const lockedCount = results.filter((item) => item.status === 403 || item.status === 409).length;
  const loadedRows = queues.reduce((sum, item) => sum + item.rows.length, 0);
  const photos = photoFields007H(selected);
  const filteredRows = useMemo(() => {
    const q = queueSearch.trim().toLowerCase();
    if (!q) return active.rows;
    return active.rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [active.rows, queueSearch]);
  const sourceHealth = useMemo(() => SOURCES007H.map((source) => results.find((result) => result.key === source.key) ?? null), [results]);
  const driverRows = pickFields007H(selected, [/driver/i, /name/i, /phone/i, /kyc/i, /identity/i, /license/i, /region/i]);
  const vehicleRows = pickFields007H(selected, [/vehicle/i, /car/i, /plate/i, /model/i, /color/i, /insurance/i, /registration/i]);
  const safetyRows = pickFields007H(selected, [/risk/i, /fraud/i, /safety/i, /complaint/i, /status/i, /state/i, /score/i]);
  const financeRows = pickFields007H(selected, [/balance/i, /settlement/i, /amount/i, /hold/i, /commission/i, /reward/i, /bonus/i, /gift/i]);
  const dataQuality = [
    { key: "driver", title: tx007H(language, "driverData"), ok: driverRows.length > 0, count: driverRows.length },
    { key: "vehicle", title: tx007H(language, "vehicleData"), ok: vehicleRows.length > 0, count: vehicleRows.length },
    { key: "photos", title: tx007H(language, "documentPhotos"), ok: photos.length > 0, count: photos.length },
    { key: "safety", title: tx007H(language, "safetyData"), ok: safetyRows.length > 0, count: safetyRows.length },
    { key: "finance", title: tx007H(language, "financeData"), ok: financeRows.length > 0, count: financeRows.length },
  ];
  const evidenceReadyCount = dataQuality.filter((item) => item.ok).length;
  const intakeQualityPercent = Math.round((evidenceReadyCount / dataQuality.length) * 100);
  const sourceCoveragePercent = Math.round((sourceOk / SOURCES007H.length) * 100);
  const routeCoveragePercent = Math.min(100, Math.round((routes.length / Math.max(1, ACTIONS007H.length)) * 100));
  const reviewBlockers = [
    !loadedRows ? "read-only queue rows not returned by backend" : null,
    !selectedId ? "select a real record id" : null,
    driverRows.length ? null : "driver identity fields missing",
    vehicleRows.length ? null : "vehicle fields missing",
    photos.length ? null : "photo/document evidence missing",
    safetyRows.length ? null : "safety/risk fields missing",
    financeRows.length ? null : "balance/settlement fields missing",
    !route?.path ? "backend route contract missing for selected action" : null,
  ].filter(Boolean) as string[];
  const operatorSteps = [
    { title: "1. Verify queue source", value: loadedRows ? `${loadedRows} rows parsed` : "waiting for read-only rows", ok: loadedRows > 0 },
    { title: "2. Open dossier", value: selectedId || "select real record", ok: Boolean(selectedId) },
    { title: "3. Check evidence", value: `${evidenceReadyCount}/${dataQuality.length} sections returned`, ok: evidenceReadyCount === dataQuality.length },
    { title: "4. Match backend route", value: route?.path ? `${route.method} ${route.path}` : "route missing", ok: Boolean(route?.path) },
    { title: "5. Submit backend-only decision", value: canRun ? "ready" : "blocked until checklist/reason/owner gate", ok: canRun },
  ];

  const complaintRows = rowsByQueue.complaints ?? [];
  const selectedComplaint = active.key === "complaints" ? selected : complaintRows[0] ?? null;
  const selectedComplaintId = firstId007H(selectedComplaint, ["complaintId", "supportCaseId", "disputeId", "tripId", "id"]);
  const complaintEvidenceRows = pickFields007H(selectedComplaint, [/evidence/i, /photo/i, /image/i, /video/i, /audio/i, /message/i, /chat/i, /note/i, /proof/i], 12);
  const complaintContextRows = pickFields007H(selectedComplaint, [/complaint/i, /dispute/i, /support/i, /trip/i, /driver/i, /rider/i, /amount/i, /route/i, /status/i, /state/i], 14);
  const complaintAiRows = pickFields007H(selectedComplaint, [/ai/i, /recommend/i, /risk/i, /severity/i, /score/i, /fraud/i, /safety/i], 10);
  const complaintActions = ACTIONS007H.filter((item) => item.queue === "complaints");
  const complaintActionCoverage = complaintActions.map((item) => ({ action: item, route: findRoute007H(routes, item) }));
  const complaintEvidenceScore = Math.round(((complaintEvidenceRows.length ? 1 : 0) + (complaintContextRows.length ? 1 : 0) + (complaintAiRows.length ? 1 : 0) + (selectedComplaintId ? 1 : 0)) / 4 * 100);
  const complaintReviewBlockers = [
    !complaintRows.length ? "complaint queue returned no rows" : null,
    !selectedComplaintId ? "complaint/support/trip id missing" : null,
    complaintEvidenceRows.length ? null : "complaint evidence fields missing",
    complaintContextRows.length ? null : "complaint trip/driver/rider context missing",
    complaintAiRows.length ? null : "AI/risk/severity recommendation missing",
    complaintActionCoverage.some((item) => item.route?.path) ? null : "complaint backend action routes missing",
  ].filter(Boolean) as string[];
  const complaintResolutionSteps = [
    { title: "1. Open complaint", value: selectedComplaintId || "select real complaint/support case", ok: Boolean(selectedComplaintId) },
    { title: "2. Verify evidence", value: `${complaintEvidenceRows.length} evidence fields`, ok: complaintEvidenceRows.length > 0 },
    { title: "3. Check trip/driver/rider context", value: `${complaintContextRows.length} context fields`, ok: complaintContextRows.length > 0 },
    { title: "4. Check AI/safety recommendation", value: `${complaintAiRows.length} risk fields`, ok: complaintAiRows.length > 0 },
    { title: "5. Choose resolve/escalate action", value: complaintActionCoverage.some((item) => item.route?.path) ? "backend route matched" : "backend route missing", ok: complaintActionCoverage.some((item) => item.route?.path) },
  ];

  const balanceRows = rowsByQueue.balance ?? [];
  const rewardRows = rowsByQueue.gifts ?? [];
  const selectedAccounting = active.key === "balance" || active.key === "gifts" ? selected : balanceRows[0] ?? rewardRows[0] ?? null;
  const selectedAccountingId = firstId007H(selectedAccounting, ["settlementId", "paymentHoldId", "driverId", "rewardId", "giftId", "bonusId", "id"]);
  const accountingMoneyRows = pickFields007H(selectedAccounting, [/balance/i, /settlement/i, /amount/i, /hold/i, /reserve/i, /pending/i, /available/i, /commission/i, /fee/i, /currency/i, /payout/i, /payment/i, /wallet/i], 14);
  const accountingDriverRows = pickFields007H(selectedAccounting, [/driver/i, /name/i, /phone/i, /region/i, /kyc/i, /identity/i, /vehicle/i], 10);
  const accountingRiskRows = pickFields007H(selectedAccounting, [/risk/i, /fraud/i, /status/i, /state/i, /block/i, /freeze/i, /dispute/i, /complaint/i, /approval/i, /owner/i, /tax/i, /legal/i, /aml/i], 12);
  const accountingRewardRows = pickFields007H(selectedAccounting, [/reward/i, /gift/i, /bonus/i, /tip/i, /promo/i, /freeze/i, /release/i, /available/i], 12);
  const accountingActions = ACTIONS007H.filter((item) => item.queue === "balance" || item.queue === "gifts");
  const accountingActionCoverage = accountingActions.map((item) => ({ action: item, route: findRoute007H(routes, item) }));
  const accountingScore = Math.round(((selectedAccountingId ? 1 : 0) + (accountingMoneyRows.length ? 1 : 0) + (accountingDriverRows.length ? 1 : 0) + (accountingRiskRows.length ? 1 : 0) + (accountingActionCoverage.some((item) => item.route?.path) ? 1 : 0)) / 5 * 100);
  const accountingBlockers = [
    !balanceRows.length && !rewardRows.length ? "balance/reward queues returned no rows" : null,
    !selectedAccountingId ? "driver/settlement/reward id missing" : null,
    accountingMoneyRows.length ? null : "money fields missing: balance, hold, reserve, pending, available, settlement",
    accountingDriverRows.length ? null : "driver accounting context missing",
    accountingRiskRows.length ? null : "risk/freeze/approval/tax/legal fields missing",
    accountingActionCoverage.some((item) => item.route?.path) ? null : "balance/reward backend action routes missing",
  ].filter(Boolean) as string[];
  const accountingReviewSteps = [
    { title: "1. Open driver ledger", value: selectedAccountingId || "select settlement/reward/driver row", ok: Boolean(selectedAccountingId) },
    { title: "2. Verify money fields", value: `${accountingMoneyRows.length} money fields`, ok: accountingMoneyRows.length > 0 },
    { title: "3. Check driver context", value: `${accountingDriverRows.length} driver fields`, ok: accountingDriverRows.length > 0 },
    { title: "4. Check freeze/risk/legal gate", value: `${accountingRiskRows.length} risk fields`, ok: accountingRiskRows.length > 0 },
    { title: "5. Route through backend only", value: accountingActionCoverage.some((item) => item.route?.path) ? "backend route matched" : "backend route missing", ok: accountingActionCoverage.some((item) => item.route?.path) },
  ];

  return <section className="taxi007h" data-admin-ui-taxi-007h={MARKER007H}>
    <header className="taxi007h-hero">
      <div><span>{MARKER007H}</span><h1>{tx007H(language, "title")}</h1><p>{tx007H(language, "subtitle")}</p></div>
      <div className="taxi007h-actions"><button onClick={refreshAll} disabled={busy}>{busy ? "..." : tx007H(language, "refresh")}</button><button onClick={() => void callSource(SOURCES007H[2]).then((result) => { setLast(result); setResults((prev) => [...prev.filter((item) => item.key !== result.key), result]); })}>{tx007H(language, "diagnostics")}</button></div>
    </header>

    <div className="taxi007h-warning">{tx007H(language, "backendOnly")}</div>

    <nav className="taxi007h-process" aria-label="Taxi workflow order">
      {["load", "choose", "review", "decision", "sync"].map((key, index) => <div key={key}><b>{index + 1}</b><span>{tx007H(language, key)}</span></div>)}
    </nav>

    <section className="taxi007h-metrics">
      <article><span>Backend sources</span><b>{sourceOk}/{SOURCES007H.length}</b><small>real endpoints</small></article>
      <article><span>Live rows</span><b>{loadedRows}</b><small>from backend payloads</small></article>
      <article><span>Route contracts</span><b>{routes.length}</b><small>/api/taxi/002n/routes</small></article>
      <article><span>Locked</span><b>{lockedCount}</b><small>403/409 shown honestly</small></article>
    </section>

    <section className="taxi007h-intakeBoard" data-admin-ui-taxi-007h-intake-board="ready">
      <article className="taxi007h-panel taxi007h-intakeSummary">
        <header><h2>Intake quality</h2><p>real rows, evidence and backend route coverage</p></header>
        <div className="taxi007h-scoreDial"><b>{intakeQualityPercent}%</b><span>dossier completeness</span></div>
        <div className="taxi007h-miniBars">
          <p><span>Sources</span><b style={{ width: `${sourceCoveragePercent}%` }} /><strong>{sourceCoveragePercent}%</strong></p>
          <p><span>Routes</span><b style={{ width: `${routeCoveragePercent}%` }} /><strong>{routeCoveragePercent}%</strong></p>
          <p><span>Evidence</span><b style={{ width: `${intakeQualityPercent}%` }} /><strong>{evidenceReadyCount}/{dataQuality.length}</strong></p>
        </div>
      </article>
      <article className="taxi007h-panel taxi007h-operatorSteps" data-admin-ui-taxi-007h-operator-next-steps="ready">
        <header><h2>Operator checklist</h2><p>clear order before any approval/reject action</p></header>
        <div>{operatorSteps.map((step) => <p key={step.title} className={step.ok ? "ok" : "bad"}><b>{step.title}</b><span>{step.value}</span></p>)}</div>
      </article>
      <article className="taxi007h-panel taxi007h-blockers" data-admin-ui-taxi-007h-evidence-gate="ready">
        <header><h2>Review blockers</h2><p>nothing is hidden or locally approved</p></header>
        {reviewBlockers.length ? <ul>{reviewBlockers.map((item) => <li key={item}>{item}</li>)}</ul> : <div className="taxi007h-empty">No UI blocker. Backend is still final source of truth.</div>}
      </article>
    </section>

    <section className="taxi007h-complaintCenter" data-admin-ui-taxi-007h-complaint-review-center="ready">
      <article className="taxi007h-panel taxi007h-complaintSummary">
        <header><h2>Complaint review center</h2><p>жалобы, доказательства, риск по Саби ИИ, отработка и решение только через сервер</p></header>
        <div className="taxi007h-scoreDial"><b>{complaintEvidenceScore}%</b><span>complaint evidence readiness</span></div>
        <div className="taxi007h-complaintStats">
          <p><span>Complaint rows</span><b>{complaintRows.length}</b></p>
          <p><span>Selected case</span><b>{selectedComplaintId || DASH}</b></p>
          <p><span>Backend actions</span><b>{complaintActionCoverage.filter((item) => item.route?.path).length}/{complaintActions.length}</b></p>
        </div>
      </article>
      <article className="taxi007h-panel taxi007h-complaintSteps" data-admin-ui-taxi-007h-complaint-resolution-flow="ready">
        <header><h2>Complaint resolution flow</h2><p>порядок проверки жалобы перед решением или эскалацией</p></header>
        <div>{complaintResolutionSteps.map((step) => <p key={step.title} className={step.ok ? "ok" : "bad"}><b>{step.title}</b><span>{step.value}</span></p>)}</div>
      </article>
      <article className="taxi007h-panel taxi007h-complaintEvidence" data-admin-ui-taxi-007h-complaint-evidence-board="ready">
        <header><h2>Evidence board</h2><p>только данные, которые вернул сервер</p></header>
        <div className="taxi007h-evidenceGrid">
          <FieldGroup007H title="Complaint / trip context" rows={complaintContextRows} empty="complaint context not returned" />
          <FieldGroup007H title="Evidence / media / notes" rows={complaintEvidenceRows} empty="evidence not returned" />
          <FieldGroup007H title="AI / risk / severity" rows={complaintAiRows} empty="AI/risk recommendation not returned" />
        </div>
      </article>
      <article className="taxi007h-panel taxi007h-complaintRoutes" data-admin-ui-taxi-007h-complaint-action-routes="ready">
        <header><h2>Complaint backend actions</h2><p>Интерфейс не закрывает жалобу локально</p></header>
        <div>{complaintActionCoverage.map((item) => <p key={item.action.key} className={item.route?.path ? "ok" : "bad"}><b>{item.action.title}</b><span>{item.route?.method ?? DASH} {item.route?.path ?? "route missing"}</span></p>)}</div>
        {complaintReviewBlockers.length ? <ul>{complaintReviewBlockers.map((item) => <li key={item}>{item}</li>)}</ul> : <div className="taxi007h-empty">Complaint UI blockers are clear. Backend response is still final source of truth.</div>}
      </article>
    </section>

    <section className="taxi007h-accountingCenter" data-admin-ui-taxi-007h-balance-accounting-center="ready">
      <article className="taxi007h-panel taxi007h-accountingSummary" data-admin-ui-taxi-007h-balance-ledger-board="ready">
        <header><h2>Driver balance / accounting center</h2><p>баланс таксистов, резерв, ожидание, доступно, удержание, расчёт — без изменения кошелька</p></header>
        <div className="taxi007h-scoreDial"><b>{accountingScore}%</b><span>ledger review readiness</span></div>
        <div className="taxi007h-complaintStats">
          <p><span>Balance rows</span><b>{balanceRows.length}</b></p>
          <p><span>Reward rows</span><b>{rewardRows.length}</b></p>
          <p><span>Selected ledger</span><b>{selectedAccountingId || DASH}</b></p>
          <p><span>Backend actions</span><b>{accountingActionCoverage.filter((item) => item.route?.path).length}/{accountingActions.length}</b></p>
        </div>
      </article>
      <article className="taxi007h-panel taxi007h-accountingSteps" data-admin-ui-taxi-007h-settlement-boundary-flow="ready">
        <header><h2>Settlement boundary flow</h2><p>админ проверяет, сервер решает, провайдер и кошелёк не вызываются из интерфейса</p></header>
        <div>{accountingReviewSteps.map((step) => <p key={step.title} className={step.ok ? "ok" : "bad"}><b>{step.title}</b><span>{step.value}</span></p>)}</div>
      </article>
      <article className="taxi007h-panel taxi007h-accountingEvidence" data-admin-ui-taxi-007h-balance-evidence-board="ready">
        <header><h2>Balance evidence board</h2><p>только реальные поля ответа сервера</p></header>
        <div className="taxi007h-evidenceGrid">
          <FieldGroup007H title="Money / settlement" rows={accountingMoneyRows} empty="money fields not returned" />
          <FieldGroup007H title="Driver accounting context" rows={accountingDriverRows} empty="driver accounting context not returned" />
          <FieldGroup007H title="Risk / freeze / legal" rows={accountingRiskRows} empty="risk/freeze/legal fields not returned" />
          <FieldGroup007H title="Rewards / gifts / bonuses" rows={accountingRewardRows} empty="reward/gift fields not returned" />
        </div>
      </article>
      <article className="taxi007h-panel taxi007h-accountingRoutes" data-admin-ui-taxi-007h-reward-boundary-routes="ready">
        <header><h2>Balance / rewards backend actions</h2><p>Интерфейс не выполняет вывод средств, списание, выдачу или изменение кошелька локально</p></header>
        <div>{accountingActionCoverage.map((item) => <p key={item.action.key} className={item.route?.path ? "ok" : "bad"}><b>{item.action.title}</b><span>{item.route?.method ?? DASH} {item.route?.path ?? "route missing"}</span></p>)}</div>
        {accountingBlockers.length ? <ul>{accountingBlockers.map((item) => <li key={item}>{item}</li>)}</ul> : <div className="taxi007h-empty">Accounting UI blockers are clear. Backend response is still final source of truth.</div>}
      </article>
    </section>

    <section className="taxi007h-workTabs">
      {WORK_TABS007H.map((tab) => <button key={tab.key} className={tab.key === activeTab ? "active" : ""} onClick={() => setActiveTab(tab.key)}><b>{tab.title}</b><span>{tab.description}</span></button>)}
    </section>

    <section className="taxi007h-main">
      <aside className="taxi007h-panel taxi007h-queues">
        <header><h2>{currentTab.title}</h2><p>{currentTab.description}</p></header>
        <div className="taxi007h-queueButtons">{visibleQueues.map((queue) => <button key={queue.key} className={queue.key === active.key ? `active tone-${queue.tone}` : `tone-${queue.tone}`} onClick={() => setActiveQueue(queue.key)}><b>{queue.title}</b><span>{queue.rows.length}</span><small>{queue.subtitle}</small></button>)}</div>
        <label className="taxi007h-search"><span>Search real rows</span><input value={queueSearch} onChange={(event) => setQueueSearch(event.target.value)} placeholder="ID, phone, status, region" /></label>
        <div className="taxi007h-recordList">{filteredRows.length ? filteredRows.slice(0, 16).map((row, index) => {
          const id = firstId007H(row, ["id", "applicationId", "driverApplicationId", "driverId", "vehicleId", "tripId", "complaintId", "settlementId"]);
          return <button key={`${active.key}-${id || index}`} className={row === selected ? "selected" : ""} onClick={() => setSelected(row)}><b>{id || `row-${index + 1}`}</b><span>{text007H(row.status ?? row.state ?? row.kind ?? row.type)}</span><small>{text007H(row.name ?? row.fullName ?? row.driverName ?? row.phone ?? row.region ?? row.createdAt)}</small></button>;
        }) : <div className="taxi007h-empty">{queueSearch.trim() ? "No rows match the search. Clear search to see all backend rows." : tx007H(language, "missingRows")}</div>}</div>
      </aside>

      <main className="taxi007h-panel taxi007h-dossier">
        <header><h2>{tx007H(language, "applicationDossier")}</h2><p>{selectedId || tx007H(language, "selectedId")}</p></header>
        <div className="taxi007h-dossierGrid">
          <FieldGroup007H title={tx007H(language, "driverData")} rows={driverRows} empty="driver data not returned" />
          <FieldGroup007H title={tx007H(language, "vehicleData")} rows={vehicleRows} empty="vehicle data not returned" />
          <FieldGroup007H title={tx007H(language, "safetyData")} rows={safetyRows} empty="safety status not returned" />
          <FieldGroup007H title={tx007H(language, "financeData")} rows={financeRows} empty="balance/settlement not returned" />
        </div>
        <section className="taxi007h-docs"><header><h3>{tx007H(language, "documentPhotos")}</h3><span>{photos.length}</span></header>{photos.length ? <div>{photos.map(([key, url]) => <a key={key} href={url} target="_blank" rel="noreferrer"><span>{key}</span><b>open</b></a>)}</div> : <em>{tx007H(language, "missingPhotos")}</em>}</section>
      </main>

      <aside className="taxi007h-panel taxi007h-decision">
        <header><h2>{tx007H(language, "decisionPanel")}</h2><p>{action.title}</p></header>
        <div className="taxi007h-actionList">{actions.map((item) => <button key={item.key} className={item.key === action.key ? `active tone-${item.tone}` : `tone-${item.tone}`} onClick={() => setActionKey(item.key)}><b>{item.title}</b><span>{item.description}</span></button>)}</div>
        <div className="taxi007h-checklist">{active.requiredReview.map((item) => <label key={item}><input type="checkbox" checked={checked[`${active.key}:${item}`] === true} onChange={(event) => setChecked((prev) => ({ ...prev, [`${active.key}:${item}`]: event.target.checked }))} /><span>{item}</span></label>)}</div>
        <label><span>{tx007H(language, "selectedId")}</span><input value={manualId || selectedId} onChange={(event) => setManualId(event.target.value)} placeholder="real backend id" /></label>
        <label><span>{tx007H(language, "reason")}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="required admin reason" /></label>
        <label><span>{tx007H(language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="required for critical action" /></label>
        <div className="taxi007h-route"><span>Backend route</span><b>{route?.method ?? DASH} {route?.path ?? "route contract not found"}</b><small>{route?.safeDisabledUntilNextStage ? "safe-disabled by backend" : "backend response is source of truth"}</small></div>
        <button className="taxi007h-run" disabled={!canRun} onClick={runAction}>{canRun ? tx007H(language, "runAction") : tx007H(language, "blocked")}</button>
        <ul>{!route?.path ? <li>route contract missing</li> : null}{!selectedId ? <li>record id required</li> : null}{!checklistOk ? <li>review checklist required</li> : null}{!reasonOk ? <li>reason min 8 chars</li> : null}{!ownerOk ? <li>owner approval required</li> : null}</ul>
      </aside>
    </section>

    <section className="taxi007h-truthGrid" data-admin-ui-taxi-007h-data-truth="ready">
      <article className="taxi007h-panel"><header><h2>{tx007H(language, "dataTruth")}</h2><p>selected dossier completeness from backend payload only</p></header><div className="taxi007h-qualityList">{dataQuality.map((item) => <div key={item.key} className={item.ok ? "ok" : "bad"}><b>{item.title}</b><span>{item.ok ? "returned" : "missing"}</span><strong>{item.count}</strong></div>)}</div><p className="taxi007h-note">{loadedRows ? "Rows are parsed from backend payloads. Missing evidence stays missing." : tx007H(language, "emptyStateFix") + ": Taxi read-only DB rows endpoint must return queue rows."}</p></article>
      <article className="taxi007h-panel"><header><h2>{tx007H(language, "sourceHealth")}</h2><button onClick={() => setSourceOpen((value) => !value)}>{sourceOpen ? "hide" : "show"}</button></header><div className="taxi007h-sourceHealth">{sourceHealth.map((item, index) => { const source = SOURCES007H[index]; return <button key={source.key} className={item?.ok ? "ok" : "bad"} onClick={() => void callSource(source).then((result) => { setLast(result); setResults((prev) => [...prev.filter((old) => old.key !== result.key), result]); })}><b>{source.title}</b><span>{item ? `HTTP ${item.status}` : "not loaded"}</span><small>{source.method} {source.path}</small></button>; })}</div>{sourceOpen ? <pre>{JSON.stringify(sourceHealth.map((item, index) => ({ source: SOURCES007H[index].key, status: item?.status ?? null, ok: item?.ok ?? false, message: item?.message ?? "not loaded" })), null, 2)}</pre> : null}</article>
      <article className="taxi007h-panel"><header><h2>{tx007H(language, "actionJournal")}</h2><p>backend-only attempts</p></header>{actionJournal.length ? <div className="taxi007h-journal">{actionJournal.map((item) => <div key={item.id} className={item.ok ? "ok" : "bad"}><b>{item.title}</b><span>{item.queue} · {item.recordId || DASH}</span><small>HTTP {item.status} · {item.message} · sync {item.synced ? "done" : "not changed"}</small></div>)}</div> : <div className="taxi007h-empty">No backend action attempted in this session.</div>}</article>
    </section>

    <section className="taxi007h-bottom">
      <article className="taxi007h-panel"><header><h2>{tx007H(language, "reports")}</h2><p>queues, route coverage, locked reasons</p></header>{queues.map((queue) => <div className="taxi007h-bar" key={queue.key}><span>{queue.title}</span><b style={{ width: `${Math.min(100, queue.rows.length * 10 + 8)}%` }} /><strong>{queue.rows.length}</strong></div>)}</article>
      <article className="taxi007h-panel"><header><h2>{tx007H(language, "latest")}</h2><p>{last ? `HTTP ${last.status} · ${last.ms}ms` : DASH}</p></header>{last ? <div className={last.ok ? "taxi007h-response ok" : "taxi007h-response bad"}><b>{last.title}</b><span>{last.method} {last.path}</span><small>{last.message}</small><pre>{JSON.stringify(last.payload, null, 2)}</pre></div> : <div className="taxi007h-empty">{tx007H(language, "missingRows")}</div>}</article>
    </section>

    <section className="taxi007h-panel taxi007h-sources"><header><h2>{tx007H(language, "sources")}</h2><button onClick={() => setTechnicalOpen((value) => !value)}>{technicalOpen ? "hide" : "show"}</button></header><div>{results.map((item) => <button key={item.key} className={item.ok ? "ok" : "bad"} onClick={() => setLast(item)}><b>{item.title}</b><span>HTTP {item.status}</span><small>{item.path}</small></button>)}</div>{technicalOpen ? <pre>{JSON.stringify({ routes: routes.slice(0, 100), results: results.map(({ key, status, ok, path, ms }) => ({ key, status, ok, path, ms })) }, null, 2)}</pre> : null}</section>
  </section>;
}
