import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type JsonRecord007F = Record<string, unknown>;
type QueueKey007F = "applications" | "drivers" | "vehicles" | "orders" | "trips" | "complaints" | "balance" | "tariffs" | "gifts" | "reports";
type WorkTab007F = "applications" | "complaints" | "accounting" | "fleet" | "operations" | "reports";
type Method007F = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type Tone007F = "ready" | "warn" | "locked" | "danger" | "info";

type Source007F = { key: string; title: string; path: string; method: Method007F; body?: JsonRecord007F };
type BackendResult007F = { key: string; title: string; path: string; method: Method007F; ok: boolean; status: number; message: string; payload: unknown; at: string; ms: number };
type ActionJournal007F = { id: string; title: string; queue: QueueKey007F; recordId: string; ok: boolean; status: number; message: string; at: string; route: string; synced: boolean };
type Route007F = { key?: string; operationKey?: string; area?: string; method?: string; path?: string; safeDisabledUntilNextStage?: boolean; requiresAdmin?: boolean; requiresIdempotencyForWrite?: boolean; requiresProviderReadiness?: boolean; requiresWalletBoundary?: boolean };
type Queue007F = { key: QueueKey007F; title: string; subtitle: string; rows: JsonRecord007F[]; requiredReview: string[]; tone: Tone007F };
type Action007F = { key: string; queue: QueueKey007F; title: string; description: string; routeHints: string[]; idKeys: string[]; needsReason: boolean; needsOwnerApproval?: boolean; tone: Tone007F; payloadKind: string };
type Props007F = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };

const MARKER007F = "ADMIN-UI-TAXI-007F-INTAKE-QUALITY-REVIEW-CONTROL";
const DASH = "—";

const COPY007F: Record<AdminLanguage, Record<string, string>> = {
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

function tx007F(language: AdminLanguage, key: string): string { return COPY007F[language]?.[key] ?? COPY007F.ru[key] ?? key; }
function isRecord007F(value: unknown): value is JsonRecord007F { return typeof value === "object" && value !== null && !Array.isArray(value); }
function text007F(value: unknown): string { if (value === null || value === undefined || value === "") return DASH; if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value); if (Array.isArray(value)) return `${value.length} items`; if (typeof value === "object") return "object"; return String(value); }

const SOURCES007F: Source007F[] = [
  { key: "readiness", title: "Readiness", method: "GET", path: "/api/taxi/002n/readiness" },
  { key: "routes", title: "Routes", method: "GET", path: "/api/taxi/002n/routes" },
  { key: "diagnostics", title: "Admin diagnostics", method: "GET", path: "/api/admin/taxi/002n/diagnostics" },
  { key: "readOnlyPlan", title: "Read-only plan", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run/plan" },
  { key: "readOnlyRows", title: "Read-only rows", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run" },
  { key: "writePlan", title: "Write gate plan", method: "GET", path: "/api/taxi/002x/db-write-runtime/plan" },
  { key: "writeGate", title: "Write gate check", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: MARKER007F, action: "check_write_gate", fakeSuccessBlocked: true } },
  { key: "providerWallet", title: "Provider / Wallet boundary", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: MARKER007F, action: "check_provider_wallet_boundary", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", method: "POST", path: "/api/taxi/003h/admin-readiness-cockpit/check", body: { source: MARKER007F, action: "check_admin_cockpit", fakeSuccessBlocked: true } },
];

const QUEUE_META007F: Record<QueueKey007F, Omit<Queue007F, "key" | "rows">> = {
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

const WORK_TABS007F: Array<{ key: WorkTab007F; title: string; queues: QueueKey007F[]; description: string }> = [
  { key: "applications", title: "Заявки", queues: ["applications"], description: "Изучение заявки: водитель, авто, документы, фото, проверка личности, безопасность." },
  { key: "complaints", title: "Жалобы", queues: ["complaints", "trips"], description: "Проверка жалоб, доказательства, рекомендация Саби ИИ и отработка." },
  { key: "accounting", title: "Баланс", queues: ["balance", "gifts"], description: "Баланс таксистов, расчёт, граница бонусов и подарков." },
  { key: "fleet", title: "Водители / авто", queues: ["drivers", "vehicles"], description: "Учёт водителей, авто, документы и доступ к диспетчеризации." },
  { key: "operations", title: "Заказы / поездки", queues: ["orders", "trips", "tariffs"], description: "Заказы, поездки, диспетчеризация, тарифы и комиссии." },
  { key: "reports", title: "Отчёты", queues: ["reports"], description: "Шкалы роста, отчёты, аудит и готовность." },
];

const ACTIONS007F: Action007F[] = [
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

function flattenRecords007F(value: unknown, hint: string): JsonRecord007F[] {
  const out: JsonRecord007F[] = [];
  const seen = new Set<unknown>();
  const lowerHint = hint.toLowerCase();
  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 6 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) {
      const rows = node.filter(isRecord007F);
      if (rows.length && path.toLowerCase().includes(lowerHint)) out.push(...rows);
      node.forEach((child, index) => walk(child, `${path}.${index}`, depth + 1));
      return;
    }
    if (!isRecord007F(node)) return;
    Object.entries(node).forEach(([key, child]) => walk(child, `${path}.${key}`, depth + 1));
  };
  walk(value, "root", 0);
  return out.slice(0, 80);
}

function collectRoutes007F(value: unknown): Route007F[] {
  const routes: Route007F[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 7 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) { node.forEach((child) => walk(child, depth + 1)); return; }
    if (!isRecord007F(node)) return;
    const path = typeof node.path === "string" ? node.path : null;
    const method = typeof node.method === "string" ? node.method : null;
    const operationKey = typeof node.operationKey === "string" ? node.operationKey : typeof node.key === "string" ? node.key : null;
    if (path && (method || operationKey)) routes.push(node as Route007F);
    Object.values(node).forEach((child) => walk(child, depth + 1));
  };
  walk(value, 0);
  return routes;
}

function queueRows007F(results: BackendResult007F[]): Record<QueueKey007F, JsonRecord007F[]> {
  const payloads = results.map((item) => item.payload);
  const all = (hint: string) => payloads.flatMap((payload) => flattenRecords007F(payload, hint));
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

function firstId007F(row: JsonRecord007F | null, keys: string[]): string {
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

function pickFields007F(row: JsonRecord007F | null, patterns: RegExp[], limit = 8): Array<[string, unknown]> {
  if (!row) return [];
  return Object.entries(row).filter(([key]) => patterns.some((pattern) => pattern.test(key))).slice(0, limit);
}

function photoFields007F(row: JsonRecord007F | null): Array<[string, string]> {
  if (!row) return [];
  return Object.entries(row)
    .filter(([key, value]) => /photo|image|avatar|license|document|insurance|registration|car|vehicle|selfie|passport|certificate/i.test(key) && typeof value === "string" && value.trim())
    .map(([key, value]) => [key, String(value)]);
}

function findRoute007F(routes: Route007F[], action: Action007F): Route007F | null {
  const hints = action.routeHints.map((hint) => hint.toLowerCase());
  const scored = routes.map((route) => {
    const text = [route.key, route.operationKey, route.area, route.method, route.path].filter(Boolean).join(" ").toLowerCase();
    const score = hints.reduce((sum, hint) => sum + (text.includes(hint) ? 1 : 0), 0);
    return { route, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  return scored[0]?.route ?? null;
}

function resultMessage007F(payload: unknown, status: number): string {
  if (isRecord007F(payload)) {
    for (const key of ["error", "message", "reason", "blockedReason", "status"]) {
      if (typeof payload[key] === "string") return String(payload[key]);
    }
  }
  return status ? `HTTP ${status}` : "network/error";
}

function FieldGroup007F({ title, rows, empty }: { title: string; rows: Array<[string, unknown]>; empty: string }) {
  return <article className="taxi007f-fieldGroup"><h3>{title}</h3>{rows.length ? <div>{rows.map(([key, value]) => <p key={key}><span>{key}</span><b>{text007F(value)}</b></p>)}</div> : <em>{empty}</em>}</article>;
}

export function TaxiAdminControl007FPanel({ language, config, setNotice }: Props007F) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<BackendResult007F[]>([]);
  const [last, setLast] = useState<BackendResult007F | null>(null);
  const [activeTab, setActiveTab] = useState<WorkTab007F>("applications");
  const [activeQueue, setActiveQueue] = useState<QueueKey007F>("applications");
  const [selected, setSelected] = useState<JsonRecord007F | null>(null);
  const [manualId, setManualId] = useState("");
  const [actionKey, setActionKey] = useState("reviewApplication");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [technicalOpen, setTechnicalOpen] = useState(false);
  const [actionJournal, setActionJournal] = useState<ActionJournal007F[]>([]);
  const [queueSearch, setQueueSearch] = useState("");
  const [sourceOpen, setSourceOpen] = useState(false);

  const callSource = useCallback(async (source: Source007F): Promise<BackendResult007F> => {
    const started = Date.now();
    let response: Response | null = null;
    let payload: unknown = null;
    try {
      response = await fetch(`${config.baseUrl}${source.path}`, {
        method: source.method,
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": config.token },
        body: source.method === "GET" ? undefined : JSON.stringify(source.body ?? { source: MARKER007F, fakeSuccessBlocked: true }),
      });
      const text = await response.text();
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    } catch (error) {
      payload = { error: error instanceof Error ? error.message : String(error) };
    }
    const status = response?.status ?? 0;
    const message = response?.ok ? "ok" : resultMessage007F(payload, status);
    return { key: source.key, title: source.title, path: source.path, method: source.method, ok: response?.ok ?? false, status, message, payload, at: new Date().toISOString(), ms: Date.now() - started };
  }, [config.baseUrl, config.token]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    try {
      const loaded = await Promise.all(SOURCES007F.map((source) => callSource(source)));
      setResults(loaded);
      setLast(loaded[loaded.length - 1] ?? null);
      setNotice(`Taxi refresh · ${loaded.filter((item) => item.ok).length}/${loaded.length} sources`);
    } finally { setBusy(false); }
  }, [callSource, setNotice]);

  useEffect(() => { void refreshAll(); }, [refreshAll]);

  const routes = useMemo(() => results.flatMap((item) => item.key === "routes" ? collectRoutes007F(item.payload) : []), [results]);
  const rowsByQueue = useMemo(() => queueRows007F(results), [results]);
  const queues = useMemo(() => (Object.keys(QUEUE_META007F) as QueueKey007F[]).map((key) => ({ key, ...QUEUE_META007F[key], rows: rowsByQueue[key] ?? [] })), [rowsByQueue]);
  const currentTab = WORK_TABS007F.find((tab) => tab.key === activeTab) ?? WORK_TABS007F[0];
  const visibleQueues = queues.filter((queue) => currentTab.queues.includes(queue.key));
  const active = queues.find((queue) => queue.key === activeQueue) ?? visibleQueues[0] ?? queues[0];
  const actions = ACTIONS007F.filter((action) => action.queue === active.key);
  const action = actions.find((item) => item.key === actionKey) ?? actions[0] ?? ACTIONS007F[0];
  const route = useMemo(() => findRoute007F(routes, action), [routes, action]);
  const selectedId = manualId.trim() || firstId007F(selected, action.idKeys);
  const checklistOk = active.requiredReview.every((item) => checked[`${active.key}:${item}`]);
  const reasonOk = !action.needsReason || adminReason.trim().length >= 8;
  const ownerOk = !action.needsOwnerApproval || ownerApprovalId.trim().length >= 4;
  const canRun = Boolean(route?.path && selectedId && checklistOk && reasonOk && ownerOk && !busy);

  useEffect(() => {
    const firstQueue = currentTab.queues[0] ?? "applications";
    setActiveQueue(firstQueue);
    const firstAction = ACTIONS007F.find((item) => item.queue === firstQueue) ?? ACTIONS007F[0];
    setActionKey(firstAction.key);
    setChecked({});
    setManualId("");
  }, [activeTab]);

  useEffect(() => {
    setSelected(active.rows[0] ?? null);
    setChecked({});
    setManualId("");
    const firstAction = ACTIONS007F.find((item) => item.queue === active.key) ?? ACTIONS007F[0];
    setActionKey(firstAction.key);
  }, [active.key, active.rows]);

  const runAction = async () => {
    if (!route?.path || !route.method) return;
    const method = route.method.toUpperCase() as Method007F;
    setBusy(true);
    const body = {
      source: MARKER007F,
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
  const photos = photoFields007F(selected);
  const filteredRows = useMemo(() => {
    const q = queueSearch.trim().toLowerCase();
    if (!q) return active.rows;
    return active.rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [active.rows, queueSearch]);
  const sourceHealth = useMemo(() => SOURCES007F.map((source) => results.find((result) => result.key === source.key) ?? null), [results]);
  const driverRows = pickFields007F(selected, [/driver/i, /name/i, /phone/i, /kyc/i, /identity/i, /license/i, /region/i]);
  const vehicleRows = pickFields007F(selected, [/vehicle/i, /car/i, /plate/i, /model/i, /color/i, /insurance/i, /registration/i]);
  const safetyRows = pickFields007F(selected, [/risk/i, /fraud/i, /safety/i, /complaint/i, /status/i, /state/i, /score/i]);
  const financeRows = pickFields007F(selected, [/balance/i, /settlement/i, /amount/i, /hold/i, /commission/i, /reward/i, /bonus/i, /gift/i]);
  const dataQuality = [
    { key: "driver", title: tx007F(language, "driverData"), ok: driverRows.length > 0, count: driverRows.length },
    { key: "vehicle", title: tx007F(language, "vehicleData"), ok: vehicleRows.length > 0, count: vehicleRows.length },
    { key: "photos", title: tx007F(language, "documentPhotos"), ok: photos.length > 0, count: photos.length },
    { key: "safety", title: tx007F(language, "safetyData"), ok: safetyRows.length > 0, count: safetyRows.length },
    { key: "finance", title: tx007F(language, "financeData"), ok: financeRows.length > 0, count: financeRows.length },
  ];
  const evidenceReadyCount = dataQuality.filter((item) => item.ok).length;
  const intakeQualityPercent = Math.round((evidenceReadyCount / dataQuality.length) * 100);
  const sourceCoveragePercent = Math.round((sourceOk / SOURCES007F.length) * 100);
  const routeCoveragePercent = Math.min(100, Math.round((routes.length / Math.max(1, ACTIONS007F.length)) * 100));
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

  return <section className="taxi007f" data-admin-ui-taxi-007f={MARKER007F}>
    <header className="taxi007f-hero">
      <div><span>{MARKER007F}</span><h1>{tx007F(language, "title")}</h1><p>{tx007F(language, "subtitle")}</p></div>
      <div className="taxi007f-actions"><button onClick={refreshAll} disabled={busy}>{busy ? "..." : tx007F(language, "refresh")}</button><button onClick={() => void callSource(SOURCES007F[2]).then((result) => { setLast(result); setResults((prev) => [...prev.filter((item) => item.key !== result.key), result]); })}>{tx007F(language, "diagnostics")}</button></div>
    </header>

    <div className="taxi007f-warning">{tx007F(language, "backendOnly")}</div>

    <nav className="taxi007f-process" aria-label="Taxi workflow order">
      {["load", "choose", "review", "decision", "sync"].map((key, index) => <div key={key}><b>{index + 1}</b><span>{tx007F(language, key)}</span></div>)}
    </nav>

    <section className="taxi007f-metrics">
      <article><span>Backend sources</span><b>{sourceOk}/{SOURCES007F.length}</b><small>real endpoints</small></article>
      <article><span>Live rows</span><b>{loadedRows}</b><small>from backend payloads</small></article>
      <article><span>Route contracts</span><b>{routes.length}</b><small>/api/taxi/002n/routes</small></article>
      <article><span>Locked</span><b>{lockedCount}</b><small>403/409 shown honestly</small></article>
    </section>

    <section className="taxi007f-intakeBoard" data-admin-ui-taxi-007f-intake-board="ready">
      <article className="taxi007f-panel taxi007f-intakeSummary">
        <header><h2>Intake quality</h2><p>real rows, evidence and backend route coverage</p></header>
        <div className="taxi007f-scoreDial"><b>{intakeQualityPercent}%</b><span>dossier completeness</span></div>
        <div className="taxi007f-miniBars">
          <p><span>Sources</span><b style={{ width: `${sourceCoveragePercent}%` }} /><strong>{sourceCoveragePercent}%</strong></p>
          <p><span>Routes</span><b style={{ width: `${routeCoveragePercent}%` }} /><strong>{routeCoveragePercent}%</strong></p>
          <p><span>Evidence</span><b style={{ width: `${intakeQualityPercent}%` }} /><strong>{evidenceReadyCount}/{dataQuality.length}</strong></p>
        </div>
      </article>
      <article className="taxi007f-panel taxi007f-operatorSteps" data-admin-ui-taxi-007f-operator-next-steps="ready">
        <header><h2>Operator checklist</h2><p>clear order before any approval/reject action</p></header>
        <div>{operatorSteps.map((step) => <p key={step.title} className={step.ok ? "ok" : "bad"}><b>{step.title}</b><span>{step.value}</span></p>)}</div>
      </article>
      <article className="taxi007f-panel taxi007f-blockers" data-admin-ui-taxi-007f-evidence-gate="ready">
        <header><h2>Review blockers</h2><p>nothing is hidden or locally approved</p></header>
        {reviewBlockers.length ? <ul>{reviewBlockers.map((item) => <li key={item}>{item}</li>)}</ul> : <div className="taxi007f-empty">No UI blocker. Backend is still final source of truth.</div>}
      </article>
    </section>

    <section className="taxi007f-workTabs">
      {WORK_TABS007F.map((tab) => <button key={tab.key} className={tab.key === activeTab ? "active" : ""} onClick={() => setActiveTab(tab.key)}><b>{tab.title}</b><span>{tab.description}</span></button>)}
    </section>

    <section className="taxi007f-main">
      <aside className="taxi007f-panel taxi007f-queues">
        <header><h2>{currentTab.title}</h2><p>{currentTab.description}</p></header>
        <div className="taxi007f-queueButtons">{visibleQueues.map((queue) => <button key={queue.key} className={queue.key === active.key ? `active tone-${queue.tone}` : `tone-${queue.tone}`} onClick={() => setActiveQueue(queue.key)}><b>{queue.title}</b><span>{queue.rows.length}</span><small>{queue.subtitle}</small></button>)}</div>
        <label className="taxi007f-search"><span>Search real rows</span><input value={queueSearch} onChange={(event) => setQueueSearch(event.target.value)} placeholder="ID, phone, status, region" /></label>
        <div className="taxi007f-recordList">{filteredRows.length ? filteredRows.slice(0, 16).map((row, index) => {
          const id = firstId007F(row, ["id", "applicationId", "driverApplicationId", "driverId", "vehicleId", "tripId", "complaintId", "settlementId"]);
          return <button key={`${active.key}-${id || index}`} className={row === selected ? "selected" : ""} onClick={() => setSelected(row)}><b>{id || `row-${index + 1}`}</b><span>{text007F(row.status ?? row.state ?? row.kind ?? row.type)}</span><small>{text007F(row.name ?? row.fullName ?? row.driverName ?? row.phone ?? row.region ?? row.createdAt)}</small></button>;
        }) : <div className="taxi007f-empty">{queueSearch.trim() ? "No rows match the search. Clear search to see all backend rows." : tx007F(language, "missingRows")}</div>}</div>
      </aside>

      <main className="taxi007f-panel taxi007f-dossier">
        <header><h2>{tx007F(language, "applicationDossier")}</h2><p>{selectedId || tx007F(language, "selectedId")}</p></header>
        <div className="taxi007f-dossierGrid">
          <FieldGroup007F title={tx007F(language, "driverData")} rows={driverRows} empty="driver data not returned" />
          <FieldGroup007F title={tx007F(language, "vehicleData")} rows={vehicleRows} empty="vehicle data not returned" />
          <FieldGroup007F title={tx007F(language, "safetyData")} rows={safetyRows} empty="safety status not returned" />
          <FieldGroup007F title={tx007F(language, "financeData")} rows={financeRows} empty="balance/settlement not returned" />
        </div>
        <section className="taxi007f-docs"><header><h3>{tx007F(language, "documentPhotos")}</h3><span>{photos.length}</span></header>{photos.length ? <div>{photos.map(([key, url]) => <a key={key} href={url} target="_blank" rel="noreferrer"><span>{key}</span><b>open</b></a>)}</div> : <em>{tx007F(language, "missingPhotos")}</em>}</section>
      </main>

      <aside className="taxi007f-panel taxi007f-decision">
        <header><h2>{tx007F(language, "decisionPanel")}</h2><p>{action.title}</p></header>
        <div className="taxi007f-actionList">{actions.map((item) => <button key={item.key} className={item.key === action.key ? `active tone-${item.tone}` : `tone-${item.tone}`} onClick={() => setActionKey(item.key)}><b>{item.title}</b><span>{item.description}</span></button>)}</div>
        <div className="taxi007f-checklist">{active.requiredReview.map((item) => <label key={item}><input type="checkbox" checked={checked[`${active.key}:${item}`] === true} onChange={(event) => setChecked((prev) => ({ ...prev, [`${active.key}:${item}`]: event.target.checked }))} /><span>{item}</span></label>)}</div>
        <label><span>{tx007F(language, "selectedId")}</span><input value={manualId || selectedId} onChange={(event) => setManualId(event.target.value)} placeholder="real backend id" /></label>
        <label><span>{tx007F(language, "reason")}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="required admin reason" /></label>
        <label><span>{tx007F(language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="required for critical action" /></label>
        <div className="taxi007f-route"><span>Backend route</span><b>{route?.method ?? DASH} {route?.path ?? "route contract not found"}</b><small>{route?.safeDisabledUntilNextStage ? "safe-disabled by backend" : "backend response is source of truth"}</small></div>
        <button className="taxi007f-run" disabled={!canRun} onClick={runAction}>{canRun ? tx007F(language, "runAction") : tx007F(language, "blocked")}</button>
        <ul>{!route?.path ? <li>route contract missing</li> : null}{!selectedId ? <li>record id required</li> : null}{!checklistOk ? <li>review checklist required</li> : null}{!reasonOk ? <li>reason min 8 chars</li> : null}{!ownerOk ? <li>owner approval required</li> : null}</ul>
      </aside>
    </section>

    <section className="taxi007f-truthGrid" data-admin-ui-taxi-007f-data-truth="ready">
      <article className="taxi007f-panel"><header><h2>{tx007F(language, "dataTruth")}</h2><p>selected dossier completeness from backend payload only</p></header><div className="taxi007f-qualityList">{dataQuality.map((item) => <div key={item.key} className={item.ok ? "ok" : "bad"}><b>{item.title}</b><span>{item.ok ? "returned" : "missing"}</span><strong>{item.count}</strong></div>)}</div><p className="taxi007f-note">{loadedRows ? "Rows are parsed from backend payloads. Missing evidence stays missing." : tx007F(language, "emptyStateFix") + ": Taxi read-only DB rows endpoint must return queue rows."}</p></article>
      <article className="taxi007f-panel"><header><h2>{tx007F(language, "sourceHealth")}</h2><button onClick={() => setSourceOpen((value) => !value)}>{sourceOpen ? "hide" : "show"}</button></header><div className="taxi007f-sourceHealth">{sourceHealth.map((item, index) => { const source = SOURCES007F[index]; return <button key={source.key} className={item?.ok ? "ok" : "bad"} onClick={() => void callSource(source).then((result) => { setLast(result); setResults((prev) => [...prev.filter((old) => old.key !== result.key), result]); })}><b>{source.title}</b><span>{item ? `HTTP ${item.status}` : "not loaded"}</span><small>{source.method} {source.path}</small></button>; })}</div>{sourceOpen ? <pre>{JSON.stringify(sourceHealth.map((item, index) => ({ source: SOURCES007F[index].key, status: item?.status ?? null, ok: item?.ok ?? false, message: item?.message ?? "not loaded" })), null, 2)}</pre> : null}</article>
      <article className="taxi007f-panel"><header><h2>{tx007F(language, "actionJournal")}</h2><p>backend-only attempts</p></header>{actionJournal.length ? <div className="taxi007f-journal">{actionJournal.map((item) => <div key={item.id} className={item.ok ? "ok" : "bad"}><b>{item.title}</b><span>{item.queue} · {item.recordId || DASH}</span><small>HTTP {item.status} · {item.message} · sync {item.synced ? "done" : "not changed"}</small></div>)}</div> : <div className="taxi007f-empty">No backend action attempted in this session.</div>}</article>
    </section>

    <section className="taxi007f-bottom">
      <article className="taxi007f-panel"><header><h2>{tx007F(language, "reports")}</h2><p>queues, route coverage, locked reasons</p></header>{queues.map((queue) => <div className="taxi007f-bar" key={queue.key}><span>{queue.title}</span><b style={{ width: `${Math.min(100, queue.rows.length * 10 + 8)}%` }} /><strong>{queue.rows.length}</strong></div>)}</article>
      <article className="taxi007f-panel"><header><h2>{tx007F(language, "latest")}</h2><p>{last ? `HTTP ${last.status} · ${last.ms}ms` : DASH}</p></header>{last ? <div className={last.ok ? "taxi007f-response ok" : "taxi007f-response bad"}><b>{last.title}</b><span>{last.method} {last.path}</span><small>{last.message}</small><pre>{JSON.stringify(last.payload, null, 2)}</pre></div> : <div className="taxi007f-empty">{tx007F(language, "missingRows")}</div>}</article>
    </section>

    <section className="taxi007f-panel taxi007f-sources"><header><h2>{tx007F(language, "sources")}</h2><button onClick={() => setTechnicalOpen((value) => !value)}>{technicalOpen ? "hide" : "show"}</button></header><div>{results.map((item) => <button key={item.key} className={item.ok ? "ok" : "bad"} onClick={() => setLast(item)}><b>{item.title}</b><span>HTTP {item.status}</span><small>{item.path}</small></button>)}</div>{technicalOpen ? <pre>{JSON.stringify({ routes: routes.slice(0, 100), results: results.map(({ key, status, ok, path, ms }) => ({ key, status, ok, path, ms })) }, null, 2)}</pre> : null}</section>
  </section>;
}
