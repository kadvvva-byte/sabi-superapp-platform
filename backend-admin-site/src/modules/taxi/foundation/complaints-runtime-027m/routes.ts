import express, { type Request, type Response, type Router } from "express";
import fs from "fs";
import path from "path";

export type TaxiComplaintRuntime027MState =
  | "новая"
  | "срочная"
  | "ждёт связи"
  | "ждёт доказательств"
  | "проверка"
  | "решение"
  | "апелляция"
  | "закрыта";

export type TaxiComplaintRuntime027MRisk = "низкий" | "средний" | "высокий" | "критический";

export type TaxiComplaintRuntime027MCase = {
  complaintGlobalId: string;
  source: string;
  orderGlobalId: string;
  tripGlobalId: string;
  passengerId: string;
  driverId: string;
  driverBalanceTopupId: string;
  state: TaxiComplaintRuntime027MState;
  risk: TaxiComplaintRuntime027MRisk;
  sla: string;
  reason: string;
  country: string;
  city: string;
  tariff: string;
  amount: string;
  currency: string;
  operator: string;
  nextStep: string;
  updatedAt: string;
  checks: Record<string, string>;
  decision?: string;
  transferReason?: string;
  appealReason?: string;
};

export type TaxiComplaintRuntime027MChatMessage = {
  id: string;
  complaintGlobalId: string;
  at: string;
  from: string;
  to: string;
  body: string;
  state: string;
};

export type TaxiComplaintRuntime027MEvent = {
  id: string;
  at: string;
  complaintGlobalId: string;
  actor: string;
  actorRole: string;
  action: string;
  route: string;
  status: number;
  result: string;
};

type TaxiComplaintRuntime027MStore = {
  complaints: TaxiComplaintRuntime027MCase[];
  chat: Record<string, TaxiComplaintRuntime027MChatMessage[]>;
  events: TaxiComplaintRuntime027MEvent[];
};

type TaxiComplaintRuntime027MBody = {
  readonly complaintGlobalId?: unknown;
  readonly search?: Partial<{
    readonly complaintGlobalId: unknown;
    readonly orderGlobalId: unknown;
    readonly tripGlobalId: unknown;
    readonly passengerId: unknown;
    readonly driverId: unknown;
    readonly driverBalanceTopupId: unknown;
  }>;
  readonly activeCase?: Partial<TaxiComplaintRuntime027MCase> | null;
  readonly selectedCurrency?: unknown;
  readonly operatorName?: unknown;
  readonly contactResult?: unknown;
  readonly proofRequest?: unknown;
  readonly routeCheck?: unknown;
  readonly paymentCheck?: unknown;
  readonly cancelCheck?: unknown;
  readonly waitCheck?: unknown;
  readonly decision?: unknown;
  readonly appealReason?: unknown;
  readonly transferReason?: unknown;
  readonly officialPassengerReply?: unknown;
  readonly officialDriverReply?: unknown;
  readonly passengerMessage?: unknown;
  readonly driverMessage?: unknown;
  readonly contactType?: unknown;
  readonly evidenceNote?: unknown;
  readonly intake?: Partial<TaxiComplaintRuntime027MCase>;
};

const TAXI_COMPLAINTS_027M_VERSION = "TAXI-COMPLAINTS-UNIFIED-RUNTIME-027M-FIX2";
const STORE_DIR = path.join(process.cwd(), ".data", "taxi", "complaints-runtime-027m");
const STORE_PATH = path.join(STORE_DIR, "complaints-store.json");

const adminRoutes027M = [
  "/api/admin/taxi/complaints/list",
  "/api/admin/taxi/complaints/open-by-id",
  "/api/admin/taxi/complaints/chat/load",
  "/api/admin/taxi/complaints/chat/send-passenger",
  "/api/admin/taxi/complaints/chat/send-driver",
  "/api/admin/taxi/complaints/accept",
  "/api/admin/taxi/complaints/contact/save-result",
  "/api/admin/taxi/complaints/evidence/request",
  "/api/admin/taxi/complaints/checks/route",
  "/api/admin/taxi/complaints/checks/payment",
  "/api/admin/taxi/complaints/checks/cancel",
  "/api/admin/taxi/complaints/checks/wait-time",
  "/api/admin/taxi/complaints/decision/save",
  "/api/admin/taxi/complaints/reply/passenger",
  "/api/admin/taxi/complaints/reply/driver",
  "/api/admin/taxi/complaints/escalate/senior",
  "/api/admin/taxi/complaints/escalate/owner",
  "/api/admin/taxi/complaints/appeal/open",
  "/api/admin/taxi/complaints/close",
  "/api/admin/taxi/complaints/intake",
  "/api/admin/taxi/complaints/events"
] as const;

const mobileRoutes027M = [
  "/api/taxi/mobile/complaints/health",
  "/api/taxi/mobile/complaints/intake",
  "/api/taxi/mobile/complaints/open",
  "/api/taxi/mobile/complaints/chat/load",
  "/api/taxi/mobile/complaints/chat/send",
  "/api/taxi/mobile/complaints/evidence/send"
] as const;

function now027M(): string {
  return new Date().toISOString();
}

function text027M(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function makeId027M(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`.toUpperCase();
}

function emptyStore027M(): TaxiComplaintRuntime027MStore {
  return { complaints: [], chat: {}, events: [] };
}

function ensureStore027M(): void {
  fs.mkdirSync(STORE_DIR, { recursive: true });
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(emptyStore027M(), null, 2), "utf8");
  }
}

function readStore027M(): TaxiComplaintRuntime027MStore {
  ensureStore027M();
  const parsed = JSON.parse(fs.readFileSync(STORE_PATH, "utf8")) as Partial<TaxiComplaintRuntime027MStore>;
  return {
    complaints: Array.isArray(parsed.complaints) ? parsed.complaints : [],
    chat: parsed.chat && typeof parsed.chat === "object" ? parsed.chat : {},
    events: Array.isArray(parsed.events) ? parsed.events : []
  };
}

function writeStore027M(store: TaxiComplaintRuntime027MStore): void {
  ensureStore027M();
  const tmp = `${STORE_PATH}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(tmp, STORE_PATH);
}

function readHeader027M(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin027M(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader027M(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  const providedToken = (readHeader027M(req, "x-sabi-admin-token") || readHeader027M(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader027M(req, "x-sabi-admin-role") || readHeader027M(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "admin", "support", "taxi_manager", "operator"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_COMPLAINTS_027M_VERSION,
      code: "taxi_complaints_admin_required",
      message: "Доступ к обработке жалоб разрешён только администратору или оператору такси.",
      localSuccessBlocked: true,
      providerCallPerformed: false,
      financeOperationPerformed: false,
      moneyMovementPerformed: false
    });
    return false;
  }

  return true;
}

function mobileIdentity027M(req: Request, res: Response): { userId: string; role: "passenger" | "driver" } | null {
  const userId = readHeader027M(req, "x-sabi-user-id") || readHeader027M(req, "x-user-id");
  const roleRaw = readHeader027M(req, "x-sabi-user-role") || readHeader027M(req, "x-user-role");
  const role = roleRaw === "driver" ? "driver" : roleRaw === "passenger" ? "passenger" : "";
  if (!userId || !role) {
    res.status(401).json({
      ok: false,
      version: TAXI_COMPLAINTS_027M_VERSION,
      code: "mobile_identity_required",
      message: "Нужен ID пользователя и роль passenger/driver из мобильного клиента.",
      localSuccessBlocked: true
    });
    return null;
  }
  return { userId, role };
}

function body027M(req: Request): TaxiComplaintRuntime027MBody {
  return req.body && typeof req.body === "object" ? (req.body as TaxiComplaintRuntime027MBody) : {};
}

function requestedComplaintId027M(req: Request): string {
  const body = body027M(req);
  return text027M(body.complaintGlobalId) || text027M(body.search?.complaintGlobalId) || text027M(body.activeCase?.complaintGlobalId);
}

function operator027M(req: Request): string {
  const value = text027M(body027M(req).operatorName);
  return value || "admin_operator";
}

function findComplaint027M(store: TaxiComplaintRuntime027MStore, complaintGlobalId: string): TaxiComplaintRuntime027MCase | undefined {
  return store.complaints.find((item) => item.complaintGlobalId === complaintGlobalId);
}

function appendEvent027M(
  store: TaxiComplaintRuntime027MStore,
  complaintGlobalId: string,
  actor: string,
  actorRole: string,
  action: string,
  route: string,
  status: number,
  result: string
): TaxiComplaintRuntime027MEvent {
  const event: TaxiComplaintRuntime027MEvent = {
    id: makeId027M("EVT"),
    at: now027M(),
    complaintGlobalId,
    actor,
    actorRole,
    action,
    route,
    status,
    result
  };
  store.events.unshift(event);
  store.events = store.events.slice(0, 300);
  return event;
}

function caseFromBody027M(req: Request, sourceFallback: string): TaxiComplaintRuntime027MCase {
  const body = body027M(req);
  const intake = body.intake ?? {};
  const activeCase = body.activeCase ?? {};
  const search = body.search ?? {};
  const complaintGlobalId =
    text027M(body.complaintGlobalId) ||
    text027M(search.complaintGlobalId) ||
    text027M(activeCase.complaintGlobalId) ||
    text027M(intake.complaintGlobalId) ||
    makeId027M("CMP");

  return {
    complaintGlobalId,
    source: text027M(intake.source) || sourceFallback,
    orderGlobalId: text027M(search.orderGlobalId) || text027M(activeCase.orderGlobalId) || text027M(intake.orderGlobalId),
    tripGlobalId: text027M(search.tripGlobalId) || text027M(activeCase.tripGlobalId) || text027M(intake.tripGlobalId),
    passengerId: text027M(search.passengerId) || text027M(activeCase.passengerId) || text027M(intake.passengerId),
    driverId: text027M(search.driverId) || text027M(activeCase.driverId) || text027M(intake.driverId),
    driverBalanceTopupId:
      text027M(search.driverBalanceTopupId) || text027M(activeCase.driverBalanceTopupId) || text027M(intake.driverBalanceTopupId),
    state: "новая",
    risk: "средний",
    sla: text027M(intake.sla) || "ожидает назначения",
    reason: text027M(intake.reason) || "обращение требует обработки",
    country: text027M(intake.country),
    city: text027M(intake.city),
    tariff: text027M(intake.tariff),
    amount: text027M(intake.amount),
    currency: text027M(body.selectedCurrency) || text027M(intake.currency),
    operator: text027M(body.operatorName) || "не назначен",
    nextStep: "принять в работу",
    updatedAt: now027M(),
    checks: {}
  };
}

function sendNotFound027M(res: Response, complaintGlobalId: string, route: string): void {
  res.status(404).json({
    ok: false,
    version: TAXI_COMPLAINTS_027M_VERSION,
    code: "complaint_not_found",
    message: "Жалоба не найдена по глобальному ID.",
    complaintGlobalId,
    route,
    localSuccessBlocked: true
  });
}

function withComplaint027M(
  req: Request,
  res: Response,
  action: string,
  update: (store: TaxiComplaintRuntime027MStore, complaint: TaxiComplaintRuntime027MCase) => Record<string, unknown>
): void {
  if (!requireAdmin027M(req, res)) return;
  const route = req.path;
  const complaintGlobalId = requestedComplaintId027M(req);
  if (!complaintGlobalId) {
    res.status(400).json({ ok: false, code: "complaint_id_required", message: "Нужен глобальный ID жалобы.", route, localSuccessBlocked: true });
    return;
  }
  const store = readStore027M();
  const complaint = findComplaint027M(store, complaintGlobalId);
  if (!complaint) {
    sendNotFound027M(res, complaintGlobalId, route);
    return;
  }
  const result = update(store, complaint);
  complaint.operator = operator027M(req);
  complaint.updatedAt = now027M();
  const event = appendEvent027M(store, complaintGlobalId, complaint.operator, "admin", action, route, 200, "сервер сохранил действие");
  writeStore027M(store);
  res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint, event, ...result });
}

function createRouter027M(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/complaints/health", (_req, res) => {
    res.status(200).json({
      ok: true,
      version: TAXI_COMPLAINTS_027M_VERSION,
      activeComplaintRuntimeRoutes: true,
      localSuccessBlocked: true,
      providerCallPerformed: false,
      financeOperationPerformed: false,
      moneyMovementPerformed: false
    });
  });

  router.post("/api/admin/taxi/complaints/intake", (req, res) => {
    if (!requireAdmin027M(req, res)) return;
    const store = readStore027M();
    const incoming = caseFromBody027M(req, "админ-приём");
    const existing = findComplaint027M(store, incoming.complaintGlobalId);
    if (existing) {
      res.status(409).json({ ok: false, code: "complaint_already_exists", complaintGlobalId: incoming.complaintGlobalId, localSuccessBlocked: true });
      return;
    }
    store.complaints.unshift(incoming);
    store.chat[incoming.complaintGlobalId] = [];
    const event = appendEvent027M(store, incoming.complaintGlobalId, operator027M(req), "admin", "Создать входящую жалобу", req.path, 201, "жалоба принята сервером");
    writeStore027M(store);
    res.status(201).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint: incoming, event });
  });

  router.post("/api/admin/taxi/complaints/list", (req, res) => {
    if (!requireAdmin027M(req, res)) return;
    const store = readStore027M();
    appendEvent027M(store, "список", operator027M(req), "admin", "Загрузить список жалоб", req.path, 200, "список загружен сервером");
    writeStore027M(store);
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, items: store.complaints });
  });

  router.post("/api/admin/taxi/complaints/open-by-id", (req, res) => {
    if (!requireAdmin027M(req, res)) return;
    const complaintGlobalId = requestedComplaintId027M(req);
    const store = readStore027M();
    const complaint = findComplaint027M(store, complaintGlobalId);
    if (!complaint) {
      sendNotFound027M(res, complaintGlobalId, req.path);
      return;
    }
    const event = appendEvent027M(store, complaintGlobalId, operator027M(req), "admin", "Открыть жалобу", req.path, 200, "дело открыто сервером");
    writeStore027M(store);
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint, event });
  });

  router.post("/api/admin/taxi/complaints/chat/load", (req, res) => {
    withComplaint027M(req, res, "Загрузить чат", (store, complaint) => ({ messages: store.chat[complaint.complaintGlobalId] ?? [] }));
  });

  router.post("/api/admin/taxi/complaints/chat/send-passenger", (req, res) => {
    withComplaint027M(req, res, "Отправить пассажиру", (store, complaint) => {
      const message: TaxiComplaintRuntime027MChatMessage = {
        id: makeId027M("MSG"),
        complaintGlobalId: complaint.complaintGlobalId,
        at: now027M(),
        from: "оператор",
        to: "пассажир",
        body: text027M(body027M(req).passengerMessage),
        state: "сохранено сервером"
      };
      store.chat[complaint.complaintGlobalId] = [message, ...(store.chat[complaint.complaintGlobalId] ?? [])];
      return { messages: store.chat[complaint.complaintGlobalId] };
    });
  });

  router.post("/api/admin/taxi/complaints/chat/send-driver", (req, res) => {
    withComplaint027M(req, res, "Отправить водителю", (store, complaint) => {
      const message: TaxiComplaintRuntime027MChatMessage = {
        id: makeId027M("MSG"),
        complaintGlobalId: complaint.complaintGlobalId,
        at: now027M(),
        from: "оператор",
        to: "водитель",
        body: text027M(body027M(req).driverMessage),
        state: "сохранено сервером"
      };
      store.chat[complaint.complaintGlobalId] = [message, ...(store.chat[complaint.complaintGlobalId] ?? [])];
      return { messages: store.chat[complaint.complaintGlobalId] };
    });
  });

  router.post("/api/admin/taxi/complaints/accept", (req, res) => withComplaint027M(req, res, "Принять в работу", (_store, complaint) => {
    complaint.state = "ждёт связи";
    complaint.nextStep = "связаться с пассажиром и водителем";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/contact/save-result", (req, res) => withComplaint027M(req, res, "Сохранить контакт", (_store, complaint) => {
    complaint.checks.contact = text027M(body027M(req).contactResult) || text027M(body027M(req).contactType);
    complaint.state = "ждёт доказательств";
    complaint.nextStep = "запросить доказательства";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/evidence/request", (req, res) => withComplaint027M(req, res, "Запросить доказательства", (_store, complaint) => {
    complaint.checks.proofRequest = text027M(body027M(req).proofRequest);
    complaint.state = "ждёт доказательств";
    complaint.nextStep = "проверить факты";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/checks/route", (req, res) => withComplaint027M(req, res, "Сохранить маршрут", (_store, complaint) => {
    complaint.checks.route = text027M(body027M(req).routeCheck);
    complaint.state = "проверка";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/checks/payment", (req, res) => withComplaint027M(req, res, "Сохранить оплату", (_store, complaint) => {
    complaint.checks.payment = text027M(body027M(req).paymentCheck);
    complaint.state = "проверка";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/checks/cancel", (req, res) => withComplaint027M(req, res, "Сохранить отмену", (_store, complaint) => {
    complaint.checks.cancel = text027M(body027M(req).cancelCheck);
    complaint.state = "проверка";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/checks/wait-time", (req, res) => withComplaint027M(req, res, "Сохранить ожидание", (_store, complaint) => {
    complaint.checks.wait = text027M(body027M(req).waitCheck);
    complaint.state = "проверка";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/decision/save", (req, res) => withComplaint027M(req, res, "Сохранить решение", (_store, complaint) => {
    complaint.decision = text027M(body027M(req).decision);
    complaint.state = "решение";
    complaint.nextStep = "отправить официальные ответы";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/reply/passenger", (req, res) => withComplaint027M(req, res, "Ответ пассажиру", (_store, complaint) => {
    complaint.checks.passengerReply = text027M(body027M(req).officialPassengerReply);
    return {};
  }));

  router.post("/api/admin/taxi/complaints/reply/driver", (req, res) => withComplaint027M(req, res, "Ответ водителю", (_store, complaint) => {
    complaint.checks.driverReply = text027M(body027M(req).officialDriverReply);
    return {};
  }));

  router.post("/api/admin/taxi/complaints/escalate/senior", (req, res) => withComplaint027M(req, res, "Передать старшему", (_store, complaint) => {
    complaint.transferReason = text027M(body027M(req).transferReason);
    complaint.nextStep = "проверка старшего";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/escalate/owner", (req, res) => withComplaint027M(req, res, "Передать владельцу", (_store, complaint) => {
    complaint.transferReason = text027M(body027M(req).transferReason);
    complaint.nextStep = "проверка владельца";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/appeal/open", (req, res) => withComplaint027M(req, res, "Открыть апелляцию", (_store, complaint) => {
    complaint.appealReason = text027M(body027M(req).appealReason);
    complaint.state = "апелляция";
    complaint.nextStep = "рассмотреть апелляцию";
    return {};
  }));

  router.post("/api/admin/taxi/complaints/close", (req, res) => withComplaint027M(req, res, "Закрыть жалобу", (_store, complaint) => {
    complaint.state = "закрыта";
    complaint.nextStep = "дело закрыто";
    return {};
  }));

  router.get("/api/admin/taxi/complaints/events", (req, res) => {
    if (!requireAdmin027M(req, res)) return;
    const store = readStore027M();
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, events: store.events });
  });

  router.get("/api/taxi/mobile/complaints/health", (_req, res) => {
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, mobileComplaintBridgeReady: true });
  });

  router.post("/api/taxi/mobile/complaints/intake", (req, res) => {
    const identity = mobileIdentity027M(req, res);
    if (!identity) return;
    const store = readStore027M();
    const incoming = caseFromBody027M(req, identity.role === "driver" ? "мобильное приложение водителя" : "мобильное приложение пассажира");
    if (identity.role === "passenger" && !incoming.passengerId) incoming.passengerId = identity.userId;
    if (identity.role === "driver" && !incoming.driverId) incoming.driverId = identity.userId;
    if (findComplaint027M(store, incoming.complaintGlobalId)) {
      res.status(409).json({ ok: false, code: "complaint_already_exists", complaintGlobalId: incoming.complaintGlobalId, localSuccessBlocked: true });
      return;
    }
    store.complaints.unshift(incoming);
    store.chat[incoming.complaintGlobalId] = [];
    const event = appendEvent027M(store, incoming.complaintGlobalId, identity.userId, identity.role, "Создать жалобу из мобильного приложения", req.path, 201, "жалоба поступила в общий центр");
    writeStore027M(store);
    res.status(201).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint: incoming, event });
  });

  router.post("/api/taxi/mobile/complaints/open", (req, res) => {
    const identity = mobileIdentity027M(req, res);
    if (!identity) return;
    const complaintGlobalId = requestedComplaintId027M(req);
    const store = readStore027M();
    const complaint = findComplaint027M(store, complaintGlobalId);
    if (!complaint) {
      sendNotFound027M(res, complaintGlobalId, req.path);
      return;
    }
    const allowed = complaint.passengerId === identity.userId || complaint.driverId === identity.userId;
    if (!allowed) {
      res.status(403).json({ ok: false, code: "complaint_access_denied", message: "Эта жалоба не принадлежит пользователю.", localSuccessBlocked: true });
      return;
    }
    const event = appendEvent027M(store, complaintGlobalId, identity.userId, identity.role, "Открыть жалобу в мобильном приложении", req.path, 200, "дело открыто пользователем");
    writeStore027M(store);
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint, event });
  });

  router.post("/api/taxi/mobile/complaints/chat/load", (req, res) => {
    const identity = mobileIdentity027M(req, res);
    if (!identity) return;
    const complaintGlobalId = requestedComplaintId027M(req);
    const store = readStore027M();
    const complaint = findComplaint027M(store, complaintGlobalId);
    if (!complaint) {
      sendNotFound027M(res, complaintGlobalId, req.path);
      return;
    }
    const allowed = complaint.passengerId === identity.userId || complaint.driverId === identity.userId;
    if (!allowed) {
      res.status(403).json({ ok: false, code: "complaint_access_denied", message: "Эта жалоба не принадлежит пользователю.", localSuccessBlocked: true });
      return;
    }
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, messages: store.chat[complaintGlobalId] ?? [] });
  });

  router.post("/api/taxi/mobile/complaints/chat/send", (req, res) => {
    const identity = mobileIdentity027M(req, res);
    if (!identity) return;
    const complaintGlobalId = requestedComplaintId027M(req);
    const store = readStore027M();
    const complaint = findComplaint027M(store, complaintGlobalId);
    if (!complaint) {
      sendNotFound027M(res, complaintGlobalId, req.path);
      return;
    }
    const allowed = complaint.passengerId === identity.userId || complaint.driverId === identity.userId;
    if (!allowed) {
      res.status(403).json({ ok: false, code: "complaint_access_denied", message: "Эта жалоба не принадлежит пользователю.", localSuccessBlocked: true });
      return;
    }
    const message: TaxiComplaintRuntime027MChatMessage = {
      id: makeId027M("MSG"),
      complaintGlobalId,
      at: now027M(),
      from: identity.role === "driver" ? "водитель" : "пассажир",
      to: "оператор",
      body: text027M(identity.role === "driver" ? body027M(req).driverMessage : body027M(req).passengerMessage) || text027M(body027M(req).passengerMessage) || text027M(body027M(req).driverMessage),
      state: "сохранено сервером"
    };
    store.chat[complaintGlobalId] = [message, ...(store.chat[complaintGlobalId] ?? [])];
    const event = appendEvent027M(store, complaintGlobalId, identity.userId, identity.role, "Отправить сообщение в общий центр", req.path, 200, "сообщение сохранено сервером");
    writeStore027M(store);
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, messages: store.chat[complaintGlobalId], event });
  });

  router.post("/api/taxi/mobile/complaints/evidence/send", (req, res) => {
    const identity = mobileIdentity027M(req, res);
    if (!identity) return;
    const complaintGlobalId = requestedComplaintId027M(req);
    const store = readStore027M();
    const complaint = findComplaint027M(store, complaintGlobalId);
    if (!complaint) {
      sendNotFound027M(res, complaintGlobalId, req.path);
      return;
    }
    const allowed = complaint.passengerId === identity.userId || complaint.driverId === identity.userId;
    if (!allowed) {
      res.status(403).json({ ok: false, code: "complaint_access_denied", message: "Эта жалоба не принадлежит пользователю.", localSuccessBlocked: true });
      return;
    }
    complaint.checks.mobileEvidence = text027M(body027M(req).evidenceNote);
    complaint.updatedAt = now027M();
    const event = appendEvent027M(store, complaintGlobalId, identity.userId, identity.role, "Отправить доказательства из мобильного приложения", req.path, 200, "доказательства сохранены сервером");
    writeStore027M(store);
    res.status(200).json({ ok: true, version: TAXI_COMPLAINTS_027M_VERSION, complaint, event });
  });

  return router;
}

export function createTaxiAdminComplaintsRuntime027MRouter(): Router {
  return createRouter027M();
}

export const taxiAdminComplaintsRuntime027MRouteList = [...adminRoutes027M, ...mobileRoutes027M];
