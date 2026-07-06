import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type JsonRecord007D = Record<string, unknown>;
type QueueKey007D = "applications" | "drivers" | "vehicles" | "orders" | "trips" | "complaints" | "balance" | "tariffs" | "gifts" | "reports";
type WorkTab007D = "applications" | "complaints" | "accounting" | "fleet" | "operations" | "reports";
type Method007D = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
type Tone007D = "ready" | "warn" | "locked" | "danger" | "info";

type Source007D = { key: string; title: string; path: string; method: Method007D; body?: JsonRecord007D };
type BackendResult007D = { key: string; title: string; path: string; method: Method007D; ok: boolean; status: number; message: string; payload: unknown; at: string; ms: number };
type Route007D = { key?: string; operationKey?: string; area?: string; method?: string; path?: string; safeDisabledUntilNextStage?: boolean; requiresAdmin?: boolean; requiresIdempotencyForWrite?: boolean; requiresProviderReadiness?: boolean; requiresWalletBoundary?: boolean };
type Queue007D = { key: QueueKey007D; title: string; subtitle: string; rows: JsonRecord007D[]; requiredReview: string[]; tone: Tone007D };
type Action007D = { key: string; queue: QueueKey007D; title: string; description: string; routeHints: string[]; idKeys: string[]; needsReason: boolean; needsOwnerApproval?: boolean; tone: Tone007D; payloadKind: string };
type Props007D = { language: AdminLanguage; config: AdminApiConfig; setNotice: (message: string) => void };

const MARKER007D = "ADMIN-UI-TAXI-007D-APPLICATION-DOSSIER-CONTROL";
const DASH = "—";

const COPY007D: Record<AdminLanguage, Record<string, string>> = {
  ru: {
    title: "Taxi Control Center",
    subtitle: "Чёткое управление такси: заявки, фото, документы, авто, жалобы, баланс и решения — без локального фейкового успеха.",
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
    technical: "Техническая основа",
  },
  en: {
    title: "Taxi Control Center",
    subtitle: "Clear Taxi management: applications, photos, documents, vehicles, complaints, balances and decisions — no local fake success.",
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
    technical: "技术基础",
  },
};

function tx007D(language: AdminLanguage, key: string): string { return COPY007D[language]?.[key] ?? COPY007D.ru[key] ?? key; }
function isRecord007D(value: unknown): value is JsonRecord007D { return typeof value === "object" && value !== null && !Array.isArray(value); }
function text007D(value: unknown): string { if (value === null || value === undefined || value === "") return DASH; if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value); if (Array.isArray(value)) return `${value.length} items`; if (typeof value === "object") return "object"; return String(value); }

const SOURCES007D: Source007D[] = [
  { key: "readiness", title: "Readiness", method: "GET", path: "/api/taxi/002n/readiness" },
  { key: "routes", title: "Routes", method: "GET", path: "/api/taxi/002n/routes" },
  { key: "diagnostics", title: "Admin diagnostics", method: "GET", path: "/api/admin/taxi/002n/diagnostics" },
  { key: "readOnlyPlan", title: "Read-only plan", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run/plan" },
  { key: "readOnlyRows", title: "Read-only rows", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run" },
  { key: "writePlan", title: "Write gate plan", method: "GET", path: "/api/taxi/002x/db-write-runtime/plan" },
  { key: "writeGate", title: "Write gate check", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: MARKER007D, action: "check_write_gate", fakeSuccessBlocked: true } },
  { key: "providerWallet", title: "Provider / Wallet boundary", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: MARKER007D, action: "check_provider_wallet_boundary", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", method: "POST", path: "/api/taxi/003h/admin-readiness-cockpit/check", body: { source: MARKER007D, action: "check_admin_cockpit", fakeSuccessBlocked: true } },
];

const QUEUE_META007D: Record<QueueKey007D, Omit<Queue007D, "key" | "rows">> = {
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

const WORK_TABS007D: Array<{ key: WorkTab007D; title: string; queues: QueueKey007D[]; description: string }> = [
  { key: "applications", title: "Заявки", queues: ["applications"], description: "Изучение заявки: водитель, авто, документы, фото, проверка личности, безопасность." },
  { key: "complaints", title: "Жалобы", queues: ["complaints", "trips"], description: "Проверка жалоб, доказательства, рекомендация Саби ИИ и отработка." },
  { key: "accounting", title: "Баланс", queues: ["balance", "gifts"], description: "Баланс таксистов, расчёт, граница бонусов и подарков." },
  { key: "fleet", title: "Водители / авто", queues: ["drivers", "vehicles"], description: "Учёт водителей, авто, документы и доступ к диспетчеризации." },
  { key: "operations", title: "Заказы / поездки", queues: ["orders", "trips", "tariffs"], description: "Заказы, поездки, диспетчеризация, тарифы и комиссии." },
  { key: "reports", title: "Отчёты", queues: ["reports"], description: "Шкалы роста, отчёты, аудит и готовность." },
];

const ACTIONS007D: Action007D[] = [
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

function flattenRecords007D(value: unknown, hint: string): JsonRecord007D[] {
  const out: JsonRecord007D[] = [];
  const seen = new Set<unknown>();
  const lowerHint = hint.toLowerCase();
  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 6 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) {
      const rows = node.filter(isRecord007D);
      if (rows.length && path.toLowerCase().includes(lowerHint)) out.push(...rows);
      node.forEach((child, index) => walk(child, `${path}.${index}`, depth + 1));
      return;
    }
    if (!isRecord007D(node)) return;
    Object.entries(node).forEach(([key, child]) => walk(child, `${path}.${key}`, depth + 1));
  };
  walk(value, "root", 0);
  return out.slice(0, 80);
}

function collectRoutes007D(value: unknown): Route007D[] {
  const routes: Route007D[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 7 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) { node.forEach((child) => walk(child, depth + 1)); return; }
    if (!isRecord007D(node)) return;
    const path = typeof node.path === "string" ? node.path : null;
    const method = typeof node.method === "string" ? node.method : null;
    const operationKey = typeof node.operationKey === "string" ? node.operationKey : typeof node.key === "string" ? node.key : null;
    if (path && (method || operationKey)) routes.push(node as Route007D);
    Object.values(node).forEach((child) => walk(child, depth + 1));
  };
  walk(value, 0);
  return routes;
}

function queueRows007D(results: BackendResult007D[]): Record<QueueKey007D, JsonRecord007D[]> {
  const payloads = results.map((item) => item.payload);
  const all = (hint: string) => payloads.flatMap((payload) => flattenRecords007D(payload, hint));
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

function firstId007D(row: JsonRecord007D | null, keys: string[]): string {
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

function pickFields007D(row: JsonRecord007D | null, patterns: RegExp[], limit = 8): Array<[string, unknown]> {
  if (!row) return [];
  return Object.entries(row).filter(([key]) => patterns.some((pattern) => pattern.test(key))).slice(0, limit);
}

function photoFields007D(row: JsonRecord007D | null): Array<[string, string]> {
  if (!row) return [];
  return Object.entries(row)
    .filter(([key, value]) => /photo|image|avatar|license|document|insurance|registration|car|vehicle|selfie|passport|certificate/i.test(key) && typeof value === "string" && value.trim())
    .map(([key, value]) => [key, String(value)]);
}

function findRoute007D(routes: Route007D[], action: Action007D): Route007D | null {
  const hints = action.routeHints.map((hint) => hint.toLowerCase());
  const scored = routes.map((route) => {
    const text = [route.key, route.operationKey, route.area, route.method, route.path].filter(Boolean).join(" ").toLowerCase();
    const score = hints.reduce((sum, hint) => sum + (text.includes(hint) ? 1 : 0), 0);
    return { route, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);
  return scored[0]?.route ?? null;
}

function resultMessage007D(payload: unknown, status: number): string {
  if (isRecord007D(payload)) {
    for (const key of ["error", "message", "reason", "blockedReason", "status"]) {
      if (typeof payload[key] === "string") return String(payload[key]);
    }
  }
  return status ? `HTTP ${status}` : "network/error";
}

function FieldGroup007D({ title, rows, empty }: { title: string; rows: Array<[string, unknown]>; empty: string }) {
  return <article className="taxi007d-fieldGroup"><h3>{title}</h3>{rows.length ? <div>{rows.map(([key, value]) => <p key={key}><span>{key}</span><b>{text007D(value)}</b></p>)}</div> : <em>{empty}</em>}</article>;
}

export function TaxiAdminControl007DPanel({ language, config, setNotice }: Props007D) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<BackendResult007D[]>([]);
  const [last, setLast] = useState<BackendResult007D | null>(null);
  const [activeTab, setActiveTab] = useState<WorkTab007D>("applications");
  const [activeQueue, setActiveQueue] = useState<QueueKey007D>("applications");
  const [selected, setSelected] = useState<JsonRecord007D | null>(null);
  const [manualId, setManualId] = useState("");
  const [actionKey, setActionKey] = useState("reviewApplication");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [technicalOpen, setTechnicalOpen] = useState(false);

  const callSource = useCallback(async (source: Source007D): Promise<BackendResult007D> => {
    const started = Date.now();
    let response: Response | null = null;
    let payload: unknown = null;
    try {
      response = await fetch(`${config.baseUrl}${source.path}`, {
        method: source.method,
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": config.token },
        body: source.method === "GET" ? undefined : JSON.stringify(source.body ?? { source: MARKER007D, fakeSuccessBlocked: true }),
      });
      const text = await response.text();
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
    } catch (error) {
      payload = { error: error instanceof Error ? error.message : String(error) };
    }
    const status = response?.status ?? 0;
    const message = response?.ok ? "ok" : resultMessage007D(payload, status);
    return { key: source.key, title: source.title, path: source.path, method: source.method, ok: response?.ok ?? false, status, message, payload, at: new Date().toISOString(), ms: Date.now() - started };
  }, [config.baseUrl, config.token]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    try {
      const loaded = await Promise.all(SOURCES007D.map((source) => callSource(source)));
      setResults(loaded);
      setLast(loaded[loaded.length - 1] ?? null);
      setNotice(`Taxi refresh · ${loaded.filter((item) => item.ok).length}/${loaded.length} sources`);
    } finally { setBusy(false); }
  }, [callSource, setNotice]);

  useEffect(() => { void refreshAll(); }, [refreshAll]);

  const routes = useMemo(() => results.flatMap((item) => item.key === "routes" ? collectRoutes007D(item.payload) : []), [results]);
  const rowsByQueue = useMemo(() => queueRows007D(results), [results]);
  const queues = useMemo(() => (Object.keys(QUEUE_META007D) as QueueKey007D[]).map((key) => ({ key, ...QUEUE_META007D[key], rows: rowsByQueue[key] ?? [] })), [rowsByQueue]);
  const currentTab = WORK_TABS007D.find((tab) => tab.key === activeTab) ?? WORK_TABS007D[0];
  const visibleQueues = queues.filter((queue) => currentTab.queues.includes(queue.key));
  const active = queues.find((queue) => queue.key === activeQueue) ?? visibleQueues[0] ?? queues[0];
  const actions = ACTIONS007D.filter((action) => action.queue === active.key);
  const action = actions.find((item) => item.key === actionKey) ?? actions[0] ?? ACTIONS007D[0];
  const route = useMemo(() => findRoute007D(routes, action), [routes, action]);
  const selectedId = manualId.trim() || firstId007D(selected, action.idKeys);
  const checklistOk = active.requiredReview.every((item) => checked[`${active.key}:${item}`]);
  const reasonOk = !action.needsReason || adminReason.trim().length >= 8;
  const ownerOk = !action.needsOwnerApproval || ownerApprovalId.trim().length >= 4;
  const canRun = Boolean(route?.path && selectedId && checklistOk && reasonOk && ownerOk && !busy);

  useEffect(() => {
    const firstQueue = currentTab.queues[0] ?? "applications";
    setActiveQueue(firstQueue);
    const firstAction = ACTIONS007D.find((item) => item.queue === firstQueue) ?? ACTIONS007D[0];
    setActionKey(firstAction.key);
    setChecked({});
    setManualId("");
  }, [activeTab]);

  useEffect(() => {
    setSelected(active.rows[0] ?? null);
    setChecked({});
    setManualId("");
    const firstAction = ACTIONS007D.find((item) => item.queue === active.key) ?? ACTIONS007D[0];
    setActionKey(firstAction.key);
  }, [active.key, active.rows]);

  const runAction = async () => {
    if (!route?.path || !route.method) return;
    const method = route.method.toUpperCase() as Method007D;
    setBusy(true);
    const body = {
      source: MARKER007D,
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
    if (result.ok) await refreshAll();
    setBusy(false);
  };

  const sourceOk = results.filter((item) => item.ok).length;
  const lockedCount = results.filter((item) => item.status === 403 || item.status === 409).length;
  const loadedRows = queues.reduce((sum, item) => sum + item.rows.length, 0);
  const photos = photoFields007D(selected);
  const driverRows = pickFields007D(selected, [/driver/i, /name/i, /phone/i, /kyc/i, /identity/i, /license/i, /region/i]);
  const vehicleRows = pickFields007D(selected, [/vehicle/i, /car/i, /plate/i, /model/i, /color/i, /insurance/i, /registration/i]);
  const safetyRows = pickFields007D(selected, [/risk/i, /fraud/i, /safety/i, /complaint/i, /status/i, /state/i, /score/i]);
  const financeRows = pickFields007D(selected, [/balance/i, /settlement/i, /amount/i, /hold/i, /commission/i, /reward/i, /bonus/i, /gift/i]);

  return <section className="taxi007d" data-admin-ui-taxi-007d={MARKER007D}>
    <header className="taxi007d-hero">
      <div><span>{MARKER007D}</span><h1>{tx007D(language, "title")}</h1><p>{tx007D(language, "subtitle")}</p></div>
      <div className="taxi007d-actions"><button onClick={refreshAll} disabled={busy}>{busy ? "..." : tx007D(language, "refresh")}</button><button onClick={() => void callSource(SOURCES007D[2]).then((result) => { setLast(result); setResults((prev) => [...prev.filter((item) => item.key !== result.key), result]); })}>{tx007D(language, "diagnostics")}</button></div>
    </header>

    <div className="taxi007d-warning">{tx007D(language, "backendOnly")}</div>

    <nav className="taxi007d-process" aria-label="Taxi workflow order">
      {["load", "choose", "review", "decision", "sync"].map((key, index) => <div key={key}><b>{index + 1}</b><span>{tx007D(language, key)}</span></div>)}
    </nav>

    <section className="taxi007d-metrics">
      <article><span>Backend sources</span><b>{sourceOk}/{SOURCES007D.length}</b><small>real endpoints</small></article>
      <article><span>Live rows</span><b>{loadedRows}</b><small>from backend payloads</small></article>
      <article><span>Route contracts</span><b>{routes.length}</b><small>/api/taxi/002n/routes</small></article>
      <article><span>Locked</span><b>{lockedCount}</b><small>403/409 shown honestly</small></article>
    </section>

    <section className="taxi007d-workTabs">
      {WORK_TABS007D.map((tab) => <button key={tab.key} className={tab.key === activeTab ? "active" : ""} onClick={() => setActiveTab(tab.key)}><b>{tab.title}</b><span>{tab.description}</span></button>)}
    </section>

    <section className="taxi007d-main">
      <aside className="taxi007d-panel taxi007d-queues">
        <header><h2>{currentTab.title}</h2><p>{currentTab.description}</p></header>
        <div className="taxi007d-queueButtons">{visibleQueues.map((queue) => <button key={queue.key} className={queue.key === active.key ? `active tone-${queue.tone}` : `tone-${queue.tone}`} onClick={() => setActiveQueue(queue.key)}><b>{queue.title}</b><span>{queue.rows.length}</span><small>{queue.subtitle}</small></button>)}</div>
        <div className="taxi007d-recordList">{active.rows.length ? active.rows.slice(0, 16).map((row, index) => {
          const id = firstId007D(row, ["id", "applicationId", "driverApplicationId", "driverId", "vehicleId", "tripId", "complaintId", "settlementId"]);
          return <button key={`${active.key}-${id || index}`} className={row === selected ? "selected" : ""} onClick={() => setSelected(row)}><b>{id || `row-${index + 1}`}</b><span>{text007D(row.status ?? row.state ?? row.kind ?? row.type)}</span><small>{text007D(row.name ?? row.fullName ?? row.driverName ?? row.phone ?? row.region ?? row.createdAt)}</small></button>;
        }) : <div className="taxi007d-empty">{tx007D(language, "missingRows")}</div>}</div>
      </aside>

      <main className="taxi007d-panel taxi007d-dossier">
        <header><h2>{tx007D(language, "applicationDossier")}</h2><p>{selectedId || tx007D(language, "selectedId")}</p></header>
        <div className="taxi007d-dossierGrid">
          <FieldGroup007D title={tx007D(language, "driverData")} rows={driverRows} empty="driver data not returned" />
          <FieldGroup007D title={tx007D(language, "vehicleData")} rows={vehicleRows} empty="vehicle data not returned" />
          <FieldGroup007D title={tx007D(language, "safetyData")} rows={safetyRows} empty="safety status not returned" />
          <FieldGroup007D title={tx007D(language, "financeData")} rows={financeRows} empty="balance/settlement not returned" />
        </div>
        <section className="taxi007d-docs"><header><h3>{tx007D(language, "documentPhotos")}</h3><span>{photos.length}</span></header>{photos.length ? <div>{photos.map(([key, url]) => <a key={key} href={url} target="_blank" rel="noreferrer"><span>{key}</span><b>open</b></a>)}</div> : <em>{tx007D(language, "missingPhotos")}</em>}</section>
      </main>

      <aside className="taxi007d-panel taxi007d-decision">
        <header><h2>{tx007D(language, "decisionPanel")}</h2><p>{action.title}</p></header>
        <div className="taxi007d-actionList">{actions.map((item) => <button key={item.key} className={item.key === action.key ? `active tone-${item.tone}` : `tone-${item.tone}`} onClick={() => setActionKey(item.key)}><b>{item.title}</b><span>{item.description}</span></button>)}</div>
        <div className="taxi007d-checklist">{active.requiredReview.map((item) => <label key={item}><input type="checkbox" checked={checked[`${active.key}:${item}`] === true} onChange={(event) => setChecked((prev) => ({ ...prev, [`${active.key}:${item}`]: event.target.checked }))} /><span>{item}</span></label>)}</div>
        <label><span>{tx007D(language, "selectedId")}</span><input value={manualId || selectedId} onChange={(event) => setManualId(event.target.value)} placeholder="real backend id" /></label>
        <label><span>{tx007D(language, "reason")}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="required admin reason" /></label>
        <label><span>{tx007D(language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="required for critical action" /></label>
        <div className="taxi007d-route"><span>Backend route</span><b>{route?.method ?? DASH} {route?.path ?? "route contract not found"}</b><small>{route?.safeDisabledUntilNextStage ? "safe-disabled by backend" : "backend response is source of truth"}</small></div>
        <button className="taxi007d-run" disabled={!canRun} onClick={runAction}>{canRun ? tx007D(language, "runAction") : tx007D(language, "blocked")}</button>
        <ul>{!route?.path ? <li>route contract missing</li> : null}{!selectedId ? <li>record id required</li> : null}{!checklistOk ? <li>review checklist required</li> : null}{!reasonOk ? <li>reason min 8 chars</li> : null}{!ownerOk ? <li>owner approval required</li> : null}</ul>
      </aside>
    </section>

    <section className="taxi007d-bottom">
      <article className="taxi007d-panel"><header><h2>{tx007D(language, "reports")}</h2><p>queues, route coverage, locked reasons</p></header>{queues.map((queue) => <div className="taxi007d-bar" key={queue.key}><span>{queue.title}</span><b style={{ width: `${Math.min(100, queue.rows.length * 10 + 8)}%` }} /><strong>{queue.rows.length}</strong></div>)}</article>
      <article className="taxi007d-panel"><header><h2>{tx007D(language, "latest")}</h2><p>{last ? `HTTP ${last.status} · ${last.ms}ms` : DASH}</p></header>{last ? <div className={last.ok ? "taxi007d-response ok" : "taxi007d-response bad"}><b>{last.title}</b><span>{last.method} {last.path}</span><small>{last.message}</small><pre>{JSON.stringify(last.payload, null, 2)}</pre></div> : <div className="taxi007d-empty">{tx007D(language, "missingRows")}</div>}</article>
    </section>

    <section className="taxi007d-panel taxi007d-sources"><header><h2>{tx007D(language, "sources")}</h2><button onClick={() => setTechnicalOpen((value) => !value)}>{technicalOpen ? "hide" : "show"}</button></header><div>{results.map((item) => <button key={item.key} className={item.ok ? "ok" : "bad"} onClick={() => setLast(item)}><b>{item.title}</b><span>HTTP {item.status}</span><small>{item.path}</small></button>)}</div>{technicalOpen ? <pre>{JSON.stringify({ routes: routes.slice(0, 100), results: results.map(({ key, status, ok, path, ms }) => ({ key, status, ok, path, ms })) }, null, 2)}</pre> : null}</section>
  </section>;
}
