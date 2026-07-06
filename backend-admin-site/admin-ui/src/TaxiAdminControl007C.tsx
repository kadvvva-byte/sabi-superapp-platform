import { useCallback, useEffect, useMemo, useState } from "react";
import type { AdminApiConfig } from "./api";
import type { AdminLanguage } from "./admin-i18n";

type JsonRecord007C = Record<string, unknown>;
type TaxiQueueKey007C = "applications" | "drivers" | "vehicles" | "orders" | "trips" | "complaints" | "balance" | "tariffs" | "gifts" | "reports";
type TaxiTone007C = "ready" | "warn" | "locked" | "danger" | "info";
type TaxiMethod007C = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type TaxiSource007C = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod007C;
  body?: JsonRecord007C;
};

type TaxiBackendResult007C = {
  key: string;
  title: string;
  path: string;
  method: TaxiMethod007C;
  ok: boolean;
  status: number;
  message: string;
  payload: unknown;
  at: string;
};

type TaxiRoute007C = {
  key?: string;
  operationKey?: string;
  area?: string;
  method?: string;
  path?: string;
  safeDisabledUntilNextStage?: boolean;
  requiresAdmin?: boolean;
  requiresIdempotencyForWrite?: boolean;
  requiresProviderReadiness?: boolean;
  requiresWalletBoundary?: boolean;
};

type TaxiQueue007C = {
  key: TaxiQueueKey007C;
  title: string;
  subtitle: string;
  emptyText: string;
  color: TaxiTone007C;
  rows: JsonRecord007C[];
  requiredReview: string[];
};

type TaxiAction007C = {
  key: string;
  queue: TaxiQueueKey007C;
  title: string;
  routeHints: string[];
  idKeys: string[];
  needsReason: boolean;
  needsOwnerApproval?: boolean;
  tone: TaxiTone007C;
  payloadKind: string;
};

type TaxiProps007C = {
  language: AdminLanguage;
  config: AdminApiConfig;
  setNotice: (message: string) => void;
};

const TAXI_ADMIN_007C_MARKER = "ADMIN-UI-TAXI-007C-ORDERED-OPERATIONS-CENTER";
const NO_VALUE = "—";

const COPY007C: Record<AdminLanguage, Record<string, string>> = {
  ru: {
    title: "Taxi Admin Center",
    subtitle: "Заявки, водители, авто, заказы, поездки, жалобы, баланс, тарифы, подарки и отчёты — по порядку, без фейка.",
    stepTitle: "Порядок работы",
    load: "1. Загрузить реальные данные",
    choose: "2. Выбрать очередь",
    study: "3. Изучить запись",
    verify: "4. Проверить документы / фото / баланс",
    reason: "5. Указать причину",
    execute: "6. Выполнить серверное действие",
    sync: "7. Синхронизация",
    refresh: "Обновить такси",
    diagnostics: "Диагностика",
    queues: "Очереди управления",
    dossier: "Карточка изучения",
    review: "Проверка перед действием",
    actions: "Действия",
    reports: "Отчёты и шкалы",
    response: "Последний ответ сервера",
    sources: "Источники сервера",
    empty: "Сервер пока не вернул живые строки. Это не фейк: нажми обновить или открой серверный этап чтения.",
    noFake: "Интерфейс не утверждает локально. Любое подтверждение, отказ, блокировка, баланс или подарок засчитываются только после ответа сервера.",
    adminReason: "Причина администратора",
    ownerApproval: "Owner approval ID",
    selectedId: "Номер выбранной записи",
    run: "Выполнить",
    blocked: "Нельзя выполнить",
    routeMissing: "Серверный маршрут не найден в списке маршрутов такси",
    checklistMissing: "Нужно завершить проверку",
    reasonMissing: "Нужно указать причину",
    idMissing: "Нужен реальный номер записи",
    backendLocked: "Если сервер вернёт 409/403 — интерфейс покажет причину блокировки, без фейкового успеха.",
    technical: "Технические данные",
  },
  en: {
    title: "Taxi Admin Center",
    subtitle: "Applications, drivers, vehicles, orders, trips, complaints, balance, tariffs, gifts and reports — ordered and no fake.",
    stepTitle: "Admin workflow",
    load: "1. Load real data",
    choose: "2. Choose queue",
    study: "3. Study record",
    verify: "4. Verify documents / photos / balance",
    reason: "5. Enter reason",
    execute: "6. Run backend action",
    sync: "7. Sync",
    refresh: "Refresh Taxi",
    diagnostics: "Diagnostics",
    queues: "Control queues",
    dossier: "Review dossier",
    review: "Pre-action review",
    actions: "Actions",
    reports: "Reports and scales",
    response: "Latest backend response",
    sources: "Backend sources",
    empty: "Backend has not returned live rows yet. This is not fake: refresh or open the backend read stage.",
    noFake: "UI never approves locally. Approval, rejection, blocking, balance or gift actions count only after backend response.",
    adminReason: "Admin reason",
    ownerApproval: "Owner approval ID",
    selectedId: "Selected record ID",
    run: "Run",
    blocked: "Blocked",
    routeMissing: "Route contract not found in /api/taxi/002n/routes",
    checklistMissing: "Review checklist is required",
    reasonMissing: "Admin reason is required",
    idMissing: "Real record ID is required",
    backendLocked: "If backend returns 409/403, UI shows locked reason with no fake success.",
    technical: "Technical data",
  },
  uz: {
    title: "Taxi Admin Center",
    subtitle: "Arizalar, haydovchilar, avtomobillar, buyurtmalar, shikoyatlar, balans, tariflar va hisobotlar — tartibli, soxta natijasiz.",
    stepTitle: "Admin ish tartibi",
    load: "1. Real maʼlumotni yuklash",
    choose: "2. Navbatni tanlash",
    study: "3. Yozuvni tekshirish",
    verify: "4. Hujjat / foto / balansni tekshirish",
    reason: "5. Sabab yozish",
    execute: "6. Backend action bajarish",
    sync: "7. Sinxronlash",
    refresh: "Taxi yangilash",
    diagnostics: "Diagnostika",
    queues: "Boshqaruv navbatlari",
    dossier: "Tekshiruv kartasi",
    review: "Action oldi tekshiruv",
    actions: "Amallar",
    reports: "Hisobotlar va shkala",
    response: "Oxirgi backend javobi",
    sources: "Backend manbalari",
    empty: "Backend hali live qatorlarni qaytarmadi. Bu fake emas: yangilang yoki backend read stage oching.",
    noFake: "UI lokal tasdiqlamaydi. Har qanday approve/reject/balance/gift faqat backend javobidan keyin hisoblanadi.",
    adminReason: "Admin sababi",
    ownerApproval: "Owner approval ID",
    selectedId: "Tanlangan yozuv ID",
    run: "Bajarish",
    blocked: "Bloklangan",
    routeMissing: "Route contract /api/taxi/002n/routes ichida topilmadi",
    checklistMissing: "Tekshiruv shart",
    reasonMissing: "Admin sababi shart",
    idMissing: "Real yozuv ID kerak",
    backendLocked: "Server 409/403 qaytarsa, interfeys soxta muvaffaqiyat ko‘rsatmaydi va bloklash sababini ko‘rsatadi.",
    technical: "Texnik maʼlumot",
  },
  zh: {
    title: "Taxi Admin Center",
    subtitle: "申请、司机、车辆、订单、行程、投诉、余额、价格、礼物和报告—有序且无虚假结果。",
    stepTitle: "管理员流程",
    load: "1. 加载真实数据",
    choose: "2. 选择队列",
    study: "3. 查看记录",
    verify: "4. 验证文件/照片/余额",
    reason: "5. 输入原因",
    execute: "6. 执行服务器操作",
    sync: "7. 同步",
    refresh: "刷新出租车",
    diagnostics: "诊断",
    queues: "控制队列",
    dossier: "审核档案",
    review: "操作前检查",
    actions: "操作",
    reports: "报告和刻度",
    response: "最新服务器响应",
    sources: "服务器来源",
    empty: "服务器尚未返回实时行。这不是虚假结果：请刷新或打开服务器读取阶段。",
    noFake: "界面不会本地批准。批准、拒绝、余额或礼物操作只有服务器响应后才算数。",
    adminReason: "管理员原因",
    ownerApproval: "Owner approval ID",
    selectedId: "所选记录编号",
    run: "执行",
    blocked: "已阻止",
    routeMissing: "未在出租车路线列表中找到服务器路线",
    checklistMissing: "需要完成检查",
    reasonMissing: "需要管理员原因",
    idMissing: "需要真实记录编号",
    backendLocked: "如果服务器返回 409/403，界面会显示锁定原因，不会显示虚假成功。",
    technical: "技术数据",
  },
};

function c007C(language: AdminLanguage, key: string): string {
  return COPY007C[language]?.[key] ?? COPY007C.ru[key] ?? key;
}

const SOURCES007C: TaxiSource007C[] = [
  { key: "readiness", title: "Readiness", method: "GET", path: "/api/taxi/002n/readiness" },
  { key: "routes", title: "Routes", method: "GET", path: "/api/taxi/002n/routes" },
  { key: "diagnostics", title: "Admin diagnostics", method: "GET", path: "/api/admin/taxi/002n/diagnostics" },
  { key: "readOnlyPlan", title: "Read-only plan", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run/plan" },
  { key: "readOnlyRows", title: "Read-only data", method: "GET", path: "/api/taxi/002t/read-only-db-dry-run" },
  { key: "writePlan", title: "Write gate plan", method: "GET", path: "/api/taxi/002x/db-write-runtime/plan" },
  { key: "writeGate", title: "Write gate check", method: "POST", path: "/api/taxi/002x/db-write-runtime/write-gate", body: { source: TAXI_ADMIN_007C_MARKER, action: "check_write_gate", fakeSuccessBlocked: true } },
  { key: "providerWallet", title: "Provider / Wallet boundary", method: "POST", path: "/api/taxi/003d/provider-wallet-boundary/check", body: { source: TAXI_ADMIN_007C_MARKER, action: "check_provider_wallet_boundary", fakeSuccessBlocked: true } },
  { key: "cockpit", title: "Admin cockpit", method: "POST", path: "/api/taxi/003h/admin-readiness-cockpit/check", body: { source: TAXI_ADMIN_007C_MARKER, action: "check_admin_cockpit", fakeSuccessBlocked: true } },
];

const ACTIONS007C: TaxiAction007C[] = [
  { key: "reviewApplication", queue: "applications", title: "Review application", routeHints: ["application", "review"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "info", payloadKind: "driver_application_review" },
  { key: "approveApplication", queue: "applications", title: "Approve application", routeHints: ["application", "approve"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_application_approve" },
  { key: "rejectApplication", queue: "applications", title: "Reject application", routeHints: ["application", "reject"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "danger", payloadKind: "driver_application_reject" },
  { key: "requireDocuments", queue: "applications", title: "Require documents", routeHints: ["document", "require"], idKeys: ["applicationId", "driverApplicationId", "id"], needsReason: true, tone: "warn", payloadKind: "driver_application_require_documents" },
  { key: "suspendDriver", queue: "drivers", title: "Suspend driver", routeHints: ["driver", "suspend"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "driver_suspend" },
  { key: "restoreDriver", queue: "drivers", title: "Restore driver", routeHints: ["driver", "restore"], idKeys: ["driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "driver_restore" },
  { key: "approveVehicle", queue: "vehicles", title: "Approve vehicle", routeHints: ["vehicle", "approve"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "ready", payloadKind: "vehicle_approve" },
  { key: "rejectVehicle", queue: "vehicles", title: "Reject vehicle", routeHints: ["vehicle", "reject"], idKeys: ["vehicleId", "id"], needsReason: true, tone: "danger", payloadKind: "vehicle_reject" },
  { key: "assignDispatch", queue: "orders", title: "Assign / reassign driver", routeHints: ["dispatch", "assign"], idKeys: ["requestId", "orderId", "id"], needsReason: true, tone: "info", payloadKind: "dispatch_assign" },
  { key: "cancelTrip", queue: "trips", title: "Cancel trip", routeHints: ["trip", "cancel"], idKeys: ["tripId", "id"], needsReason: true, tone: "danger", payloadKind: "trip_cancel" },
  { key: "resolveComplaint", queue: "complaints", title: "Resolve complaint", routeHints: ["complaint", "resolve"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "ready", payloadKind: "complaint_resolve" },
  { key: "escalateComplaint", queue: "complaints", title: "Escalate complaint", routeHints: ["complaint", "escalate"], idKeys: ["complaintId", "supportCaseId", "id"], needsReason: true, tone: "warn", payloadKind: "complaint_escalate" },
  { key: "reviewBalance", queue: "balance", title: "Review balance / settlement", routeHints: ["settlement", "review"], idKeys: ["settlementId", "paymentHoldId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "warn", payloadKind: "driver_balance_review" },
  { key: "updateTariff", queue: "tariffs", title: "Review tariff / commission", routeHints: ["tariff", "upsert"], idKeys: ["tariffId", "regionCode", "id"], needsReason: true, needsOwnerApproval: true, tone: "info", payloadKind: "tariff_commission_review" },
  { key: "freezeReward", queue: "gifts", title: "Freeze gift / reward", routeHints: ["reward", "freeze"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "danger", payloadKind: "gift_reward_freeze" },
  { key: "releaseReward", queue: "gifts", title: "Release gift / reward", routeHints: ["reward", "release"], idKeys: ["rewardId", "giftId", "driverId", "id"], needsReason: true, needsOwnerApproval: true, tone: "ready", payloadKind: "gift_reward_release" },
];

const QUEUE_META007C: Record<TaxiQueueKey007C, { title: string; subtitle: string; emptyText: string; color: TaxiTone007C; requiredReview: string[] }> = {
  applications: { title: "Заявки", subtitle: "Водитель, проверка личности, документы, фото, авто", emptyText: "Нет заявок от сервера", color: "ready", requiredReview: ["Личность и проверка", "Права", "Фото", "Авто", "Безопасность"] },
  drivers: { title: "Водители", subtitle: "Статусы, блокировки, доступ к диспетчеризации", emptyText: "Нет водителей от сервера", color: "info", requiredReview: ["Профиль", "Риск", "Dispatch", "Баланс"] },
  vehicles: { title: "Авто", subtitle: "Модель, номер, документы, страховка", emptyText: "Нет авто от сервера", color: "info", requiredReview: ["Регистрация", "Страховка", "Фото авто", "Категория"] },
  orders: { title: "Заказы", subtitle: "Заявки на поездки, диспетчеризация, отмены", emptyText: "Нет заказов от сервера", color: "warn", requiredReview: ["Пассажир", "Адреса", "Тариф", "Dispatch"] },
  trips: { title: "Поездки", subtitle: "Жизненный цикл, безопасность, отмены", emptyText: "Нет поездок от сервера", color: "warn", requiredReview: ["Trip state", "Маршрут", "Сумма", "Safety"] },
  complaints: { title: "Жалобы", subtitle: "Доказательства, Саби ИИ, назначение, эскалация", emptyText: "Нет жалоб от сервера", color: "danger", requiredReview: ["Evidence", "Trip", "Severity", "AI recommendation"] },
  balance: { title: "Баланс", subtitle: "Reserve, pending, available, settlement", emptyText: "Нет баланса от сервера", color: "warn", requiredReview: ["Driver balance", "Hold", "Settlement", "Wallet boundary"] },
  tariffs: { title: "Тарифы", subtitle: "Регионы, зоны, комиссии", emptyText: "Нет тарифов от сервера", color: "info", requiredReview: ["Регион", "Комиссия", "История", "Owner approval"] },
  gifts: { title: "Подарки/бонусы", subtitle: "Reward/tips boundary, freeze/release", emptyText: "Нет подарков и наград от сервера", color: "locked", requiredReview: ["Reward ID", "Legal", "Finance", "Owner approval"] },
  reports: { title: "Отчёты", subtitle: "Рост, очереди, блокировки, аудит", emptyText: "Нет отчётов от сервера", color: "ready", requiredReview: ["Growth", "Audit", "Safety", "Route coverage"] },
};

function valueText007C(value: unknown): string {
  if (value === null || value === undefined || value === "") return NO_VALUE;
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return `${value.length}`;
  if (typeof value === "object") return "object";
  return String(value);
}

function isRecord007C(value: unknown): value is JsonRecord007C {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function flattenRecords007C(value: unknown, hint: string): JsonRecord007C[] {
  const loweredHint = hint.toLowerCase();
  const out: JsonRecord007C[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 5 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) {
      const normalized = node.filter(isRecord007C);
      if (normalized.length && path.toLowerCase().includes(loweredHint)) out.push(...normalized);
      node.forEach((item, index) => walk(item, `${path}.${index}`, depth + 1));
      return;
    }
    if (!isRecord007C(node)) return;
    Object.entries(node).forEach(([key, child]) => walk(child, `${path}.${key}`, depth + 1));
  };
  walk(value, "root", 0);
  return out.slice(0, 50);
}

function collectRoutes007C(value: unknown): TaxiRoute007C[] {
  const routes: TaxiRoute007C[] = [];
  const seen = new Set<unknown>();
  const walk = (node: unknown, depth: number) => {
    if (depth > 6 || node === null || node === undefined || seen.has(node)) return;
    if (typeof node === "object") seen.add(node);
    if (Array.isArray(node)) return node.forEach((item) => walk(item, depth + 1));
    if (!isRecord007C(node)) return;
    const path = typeof node.path === "string" ? node.path : null;
    const method = typeof node.method === "string" ? node.method : null;
    const operationKey = typeof node.operationKey === "string" ? node.operationKey : typeof node.key === "string" ? node.key : null;
    if (path && (method || operationKey)) routes.push(node as TaxiRoute007C);
    Object.values(node).forEach((child) => walk(child, depth + 1));
  };
  walk(value, 0);
  return routes;
}

function findFirstId007C(row: JsonRecord007C | null, keys: string[]): string {
  if (!row) return "";
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  for (const [key, value] of Object.entries(row)) {
    if (key.toLowerCase().endsWith("id") && (typeof value === "string" || typeof value === "number")) return String(value);
  }
  return "";
}

function findRoute007C(routes: TaxiRoute007C[], action: TaxiAction007C): TaxiRoute007C | null {
  const hints = action.routeHints.map((h) => h.toLowerCase());
  const scored = routes
    .map((route) => {
      const text = [route.key, route.operationKey, route.area, route.method, route.path].filter(Boolean).join(" ").toLowerCase();
      const score = hints.reduce((sum, hint) => sum + (text.includes(hint) ? 1 : 0), 0);
      return { route, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.route ?? null;
}

function extractPhotoLikeFields007C(row: JsonRecord007C | null): Array<[string, string]> {
  if (!row) return [];
  return Object.entries(row)
    .filter(([key, value]) => /photo|image|avatar|license|document|insurance|registration|car|vehicle/i.test(key) && typeof value === "string" && value.trim())
    .map(([key, value]) => [key, String(value)]);
}

function queueRows007C(results: TaxiBackendResult007C[]): Record<TaxiQueueKey007C, JsonRecord007C[]> {
  const payloads = results.map((item) => item.payload);
  const all = (hint: string) => payloads.flatMap((payload) => flattenRecords007C(payload, hint));
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

export function TaxiAdminControl007CPanel({ language, config, setNotice }: TaxiProps007C) {
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<TaxiBackendResult007C[]>([]);
  const [last, setLast] = useState<TaxiBackendResult007C | null>(null);
  const [activeQueue, setActiveQueue] = useState<TaxiQueueKey007C>("applications");
  const [selected, setSelected] = useState<JsonRecord007C | null>(null);
  const [actionKey, setActionKey] = useState("reviewApplication");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [adminReason, setAdminReason] = useState("");
  const [ownerApprovalId, setOwnerApprovalId] = useState("");
  const [manualId, setManualId] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);

  const callSource = useCallback(async (source: TaxiSource007C): Promise<TaxiBackendResult007C> => {
    const started = Date.now();
    let response: Response | null = null;
    let payload: unknown = null;
    let message = "ok";
    try {
      response = await fetch(`${config.baseUrl}${source.path}`, {
        method: source.method,
        headers: { "Content-Type": "application/json", "x-sabi-admin-token": config.token },
        body: source.method === "GET" ? undefined : JSON.stringify(source.body ?? { source: TAXI_ADMIN_007C_MARKER, fakeSuccessBlocked: true }),
      });
      const text = await response.text();
      try { payload = text ? JSON.parse(text) : null; } catch { payload = text; }
      if (!response.ok) message = isRecord007C(payload) && typeof payload.error === "string" ? payload.error : `HTTP ${response.status}`;
    } catch (error) {
      message = error instanceof Error ? error.message : String(error);
    }
    return {
      key: source.key,
      title: source.title,
      path: source.path,
      method: source.method,
      ok: response?.ok ?? false,
      status: response?.status ?? 0,
      message,
      payload,
      at: new Date().toISOString(),
    };
  }, [config.baseUrl, config.token]);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    try {
      const loaded = await Promise.all(SOURCES007C.map((source) => callSource(source)));
      setResults(loaded);
      setLast(loaded[loaded.length - 1] ?? null);
      setNotice(`Taxi data loaded · ${loaded.filter((item) => item.ok).length}/${loaded.length}`);
    } finally {
      setBusy(false);
    }
  }, [callSource, setNotice]);

  useEffect(() => { void refreshAll(); }, []);

  const routes = useMemo(() => results.flatMap((item) => item.key === "routes" ? collectRoutes007C(item.payload) : []), [results]);
  const rowsByQueue = useMemo(() => queueRows007C(results), [results]);
  const queues: TaxiQueue007C[] = useMemo(() => (Object.keys(QUEUE_META007C) as TaxiQueueKey007C[]).map((key) => ({ key, ...QUEUE_META007C[key], rows: rowsByQueue[key] ?? [] })), [rowsByQueue]);
  const active = queues.find((item) => item.key === activeQueue) ?? queues[0];
  const availableActions = ACTIONS007C.filter((action) => action.queue === activeQueue);
  const action = availableActions.find((item) => item.key === actionKey) ?? availableActions[0] ?? ACTIONS007C[0];
  const route = useMemo(() => findRoute007C(routes, action), [routes, action]);
  const selectedId = manualId.trim() || findFirstId007C(selected, action.idKeys);
  const checklistOk = active.requiredReview.every((item) => checked[`${activeQueue}:${item}`]);
  const reasonOk = !action.needsReason || adminReason.trim().length >= 8;
  const ownerOk = !action.needsOwnerApproval || ownerApprovalId.trim().length >= 4;
  const canRun = Boolean(route?.path && selectedId && checklistOk && reasonOk && ownerOk && !busy);

  useEffect(() => {
    setSelected(active.rows[0] ?? null);
    setChecked({});
    setActionKey((ACTIONS007C.find((item) => item.queue === activeQueue) ?? ACTIONS007C[0]).key);
    setManualId("");
  }, [activeQueue]);

  const runAction = async () => {
    if (!route?.path || !route.method) return;
    const method = route.method.toUpperCase() as TaxiMethod007C;
    setBusy(true);
    const body = {
      source: TAXI_ADMIN_007C_MARKER,
      fakeSuccessBlocked: true,
      action: action.key,
      payloadKind: action.payloadKind,
      selectedId,
      selectedRecord: selected,
      adminReason: adminReason.trim(),
      ownerApprovalId: ownerApprovalId.trim() || null,
      reviewChecklist: active.requiredReview.reduce<Record<string, boolean>>((acc, item) => { acc[item] = checked[`${activeQueue}:${item}`] === true; return acc; }, {}),
    };
    const result = await callSource({ key: action.key, title: action.title, path: route.path, method, body });
    setLast(result);
    setResults((prev) => [...prev.filter((item) => item.key !== action.key), result]);
    if (result.ok) await refreshAll();
    setBusy(false);
  };

  const sourceOk = results.filter((item) => item.ok).length;
  const loadedRows = queues.reduce((sum, item) => sum + item.rows.length, 0);
  const lockedCount = results.filter((item) => item.status === 403 || item.status === 409).length;
  const photoFields = extractPhotoLikeFields007C(selected);
  const displayFields = selected ? Object.entries(selected).slice(0, 18) : [];

  return <section className="taxi007c" data-admin-ui-taxi-007c={TAXI_ADMIN_007C_MARKER}>
    <header className="taxi007c-hero">
      <div>
        <span className="taxi007c-kicker">{TAXI_ADMIN_007C_MARKER}</span>
        <h1>{c007C(language, "title")}</h1>
        <p>{c007C(language, "subtitle")}</p>
      </div>
      <div className="taxi007c-heroActions">
        <button onClick={refreshAll} disabled={busy}>{busy ? "..." : c007C(language, "refresh")}</button>
        <button onClick={() => void callSource(SOURCES007C[2]).then((result) => { setLast(result); setResults((prev) => [...prev.filter((item) => item.key !== result.key), result]); })}>{c007C(language, "diagnostics")}</button>
      </div>
    </header>

    <div className="taxi007c-noFake">{c007C(language, "noFake")}</div>

    <section className="taxi007c-flow">
      <h2>{c007C(language, "stepTitle")}</h2>
      {["load", "choose", "study", "verify", "reason", "execute", "sync"].map((key, index) => <div className="taxi007c-flowStep" key={key}><b>{index + 1}</b><span>{c007C(language, key)}</span></div>)}
    </section>

    <section className="taxi007c-stats">
      <div><span>Backend sources</span><b>{sourceOk}/{SOURCES007C.length}</b></div>
      <div><span>Live rows</span><b>{loadedRows}</b></div>
      <div><span>Route contracts</span><b>{routes.length}</b></div>
      <div><span>Locked / blocked</span><b>{lockedCount}</b></div>
    </section>

    <section className="taxi007c-grid">
      <div className="taxi007c-card taxi007c-queues">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "queues")}</h2><span>{active.title}</span></div>
        <div className="taxi007c-tabs">
          {queues.map((queue) => <button key={queue.key} className={queue.key === activeQueue ? "active" : ""} onClick={() => setActiveQueue(queue.key)}>
            <b>{queue.title}</b><span>{queue.rows.length}</span><small>{queue.subtitle}</small>
          </button>)}
        </div>
        <div className="taxi007c-table">
          {active.rows.length ? active.rows.slice(0, 12).map((row, index) => {
            const id = findFirstId007C(row, ["id", "applicationId", "driverId", "vehicleId", "tripId", "complaintId", "settlementId"]);
            return <button key={`${active.key}-${id || index}`} className={row === selected ? "selected" : ""} onClick={() => setSelected(row)}>
              <span>{id || `row-${index + 1}`}</span>
              <b>{valueText007C(row.status ?? row.state ?? row.type ?? row.kind)}</b>
              <small>{valueText007C(row.name ?? row.fullName ?? row.driverName ?? row.phone ?? row.region ?? row.createdAt)}</small>
            </button>;
          }) : <div className="taxi007c-empty">{active.emptyText}. {c007C(language, "empty")}</div>}
        </div>
      </div>

      <div className="taxi007c-card taxi007c-dossier">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "dossier")}</h2><span>{selectedId || NO_VALUE}</span></div>
        <div className="taxi007c-dossierGrid">
          {displayFields.length ? displayFields.map(([key, value]) => <div key={key}><span>{key}</span><b>{valueText007C(value)}</b></div>) : <div className="taxi007c-empty">{c007C(language, "empty")}</div>}
        </div>
        <h3>Фото и документы</h3>
        <div className="taxi007c-photoGrid">
          {photoFields.length ? photoFields.map(([key, value]) => <a key={key} href={value} target="_blank" rel="noreferrer"><span>{key}</span><b>open</b></a>) : <div className="taxi007c-empty">Сервер не вернул ссылки на фото или документы. Интерфейс не подставляет фейковые фото.</div>}
        </div>
      </div>
    </section>

    <section className="taxi007c-grid taxi007c-actionGrid">
      <div className="taxi007c-card">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "review")}</h2><span>{checklistOk ? "ready" : "required"}</span></div>
        <div className="taxi007c-checks">
          {active.requiredReview.map((item) => <label key={item}><input type="checkbox" checked={checked[`${activeQueue}:${item}`] === true} onChange={(event) => setChecked((prev) => ({ ...prev, [`${activeQueue}:${item}`]: event.target.checked }))} /> <span>{item}</span></label>)}
        </div>
        <label className="taxi007c-field"><span>{c007C(language, "selectedId")}</span><input value={manualId || selectedId} onChange={(event) => setManualId(event.target.value)} placeholder="real backend id" /></label>
        <label className="taxi007c-field"><span>{c007C(language, "adminReason")}</span><textarea value={adminReason} onChange={(event) => setAdminReason(event.target.value)} placeholder="why this action is required" /></label>
        <label className="taxi007c-field"><span>{c007C(language, "ownerApproval")}</span><input value={ownerApprovalId} onChange={(event) => setOwnerApprovalId(event.target.value)} placeholder="required only for critical actions" /></label>
      </div>

      <div className="taxi007c-card">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "actions")}</h2><span>{route?.path ? "route found" : "route missing"}</span></div>
        <div className="taxi007c-actionList">
          {availableActions.map((item) => <button key={item.key} className={item.key === action.key ? "active" : ""} onClick={() => setActionKey(item.key)}>{item.title}</button>)}
        </div>
        <div className="taxi007c-routeBox">
          <span>Route</span><b>{route?.method ?? NO_VALUE} {route?.path ?? c007C(language, "routeMissing")}</b>
          <small>{route?.safeDisabledUntilNextStage ? "safe-disabled until next backend stage" : c007C(language, "backendLocked")}</small>
        </div>
        <button className="taxi007c-run" disabled={!canRun} onClick={runAction}>{canRun ? c007C(language, "run") : c007C(language, "blocked")}</button>
        <ul className="taxi007c-blockers">
          {!route?.path ? <li>{c007C(language, "routeMissing")}</li> : null}
          {!selectedId ? <li>{c007C(language, "idMissing")}</li> : null}
          {!checklistOk ? <li>{c007C(language, "checklistMissing")}</li> : null}
          {!reasonOk ? <li>{c007C(language, "reasonMissing")}</li> : null}
          {!ownerOk ? <li>Owner approval required</li> : null}
        </ul>
      </div>
    </section>

    <section className="taxi007c-grid taxi007c-reportGrid">
      <div className="taxi007c-card">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "reports")}</h2><span>live</span></div>
        {queues.map((queue) => <div className="taxi007c-bar" key={queue.key}><span>{queue.title}</span><div><i style={{ width: `${Math.min(100, queue.rows.length * 12 + 8)}%` }} /></div><b>{queue.rows.length}</b></div>)}
      </div>
      <div className="taxi007c-card">
        <div className="taxi007c-sectionHead"><h2>{c007C(language, "response")}</h2><span>{last ? `HTTP ${last.status}` : NO_VALUE}</span></div>
        {last ? <div className={last.ok ? "taxi007c-response ok" : "taxi007c-response bad"}><b>{last.title}</b><span>{last.method} {last.path}</span><small>{last.message}</small><pre>{JSON.stringify(last.payload, null, 2)}</pre></div> : <div className="taxi007c-empty">{c007C(language, "empty")}</div>}
      </div>
    </section>

    <section className="taxi007c-card taxi007c-sources">
      <div className="taxi007c-sectionHead"><h2>{c007C(language, "sources")}</h2><button onClick={() => setDetailsOpen(!detailsOpen)}>{detailsOpen ? "hide" : "show"}</button></div>
      <div className="taxi007c-sourceList">
        {results.map((item) => <button key={item.key} onClick={() => setLast(item)} className={item.ok ? "ok" : "bad"}><b>{item.title}</b><span>HTTP {item.status}</span><small>{item.path}</small></button>)}
      </div>
      {detailsOpen ? <pre className="taxi007c-technical">{JSON.stringify({ routes: routes.slice(0, 80), results: results.map((item) => ({ key: item.key, status: item.status, ok: item.ok, path: item.path })) }, null, 2)}</pre> : null}
    </section>
  </section>;
}
