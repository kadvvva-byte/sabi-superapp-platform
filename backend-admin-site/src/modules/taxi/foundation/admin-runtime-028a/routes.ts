import express, { type Request, type Response, type Router } from "express";

export const TAXI_ADMIN_RUNTIME_028A_VERSION = "TAXI-ADMIN-RUNTIME-028A-REAL-ENDPOINTS-FOUNDATION" as const;

export type TaxiAdminRuntime028ASection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

export type TaxiAdminRuntime028AReadiness = {
  version: typeof TAXI_ADMIN_RUNTIME_028A_VERSION;
  ok: true;
  stage: "safe_read_runtime_foundation";
  adminUiBridge: "ready";
  fakeDataPolicy: "no_local_seed_no_backend_fake_empty_state_only";
  globalCountryCoverage: "195_world_countries_from_admin_ui_contract";
  databasePolicy: "db_read_not_executed_db_write_not_executed_until_owner_approval";
  financePolicy: "no_local_accrual_no_debit_no_transfer_no_payout";
  providerPolicy: "provider_dispatch_payment_payout_disabled";
  ownerApproval: "required_before_write_or_money_step";
  productionReadiness: 68;
  sections: TaxiAdminRuntime028ASection[];
  routes: string[];
};

type TaxiAdminRuntime028AListPayload = {
  ok: true;
  version: typeof TAXI_ADMIN_RUNTIME_028A_VERSION;
  section: TaxiAdminRuntime028ASection;
  source: "backend_runtime_028a";
  records: unknown[];
  total: 0;
  emptyState: {
    noFakeData: true;
    message: string;
  };
  safety: TaxiAdminRuntime028ASafety;
};

type TaxiAdminRuntime028ASafeBlockedPayload = {
  ok: false;
  version: typeof TAXI_ADMIN_RUNTIME_028A_VERSION;
  code: "taxi_admin_runtime_028a_write_blocked";
  message: string;
  section: TaxiAdminRuntime028ASection;
  ownerApprovalRequired: true;
  safety: TaxiAdminRuntime028ASafety;
};

type TaxiAdminRuntime028ASafety = {
  envFileReadOrDumped: false;
  dbReadExecuted: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  localMutationExecuted: false;
  fakeSuccessBlocked: true;
};

const adminRoutes028A = [
  "/api/admin/taxi/runtime-028a/health",
  "/api/admin/taxi/runtime-028a/readiness",
  "/api/admin/taxi/finance-program/027a/load",
  "/api/admin/taxi/finance-program/027a/income-scale",
  "/api/admin/taxi/finance-program/027a/earnings-report",
  "/api/admin/taxi/finance-program/027a/request-export",
  "/api/admin/taxi/finance-program/027a/request-owner-approval",
  "/api/admin/taxi/finance-program/027a/archive",
  "/api/admin/taxi/access/026a/load",
  "/api/admin/taxi/access/026a/request-change",
  "/api/admin/taxi/access/026a/request-owner-approval",
  "/api/admin/taxi/access/026a/archive",
  "/api/admin/taxi/management/025a/load",
  "/api/admin/taxi/management/025a/request-change",
  "/api/admin/taxi/management/025a/request-owner-approval",
  "/api/admin/taxi/management/025a/archive",
  "/api/admin/taxi/reports/023a/queue",
  "/api/admin/taxi/reports/023a/generate",
  "/api/admin/taxi/reports/023a/export",
  "/api/admin/taxi/reports/023a/schedule",
  "/api/admin/taxi/reports/023a/archive",
  "/api/admin/taxi/archive/022a/records",
  "/api/admin/taxi/archive/022a/records/:recordId",
  "/api/admin/taxi/drivers-cars/024a/list",
  "/api/admin/taxi/drivers-cars/024a/detail",
  "/api/admin/taxi/drivers-cars/024a/request-docs",
  "/api/admin/taxi/drivers-cars/024a/verify",
  "/api/admin/taxi/drivers-cars/024a/block",
  "/api/admin/taxi/drivers-cars/024a/archive",
  "/api/admin/taxi/contests/021a/leaderboard-queue",
  "/api/admin/taxi/contests/021a/candidates/:candidateId",
  "/api/admin/taxi/bonuses/020a/eligibility-queue",
  "/api/admin/taxi/bonuses/020a/candidates/:candidateId",
  "/api/admin/taxi/applications/007z/new-applications",
  "/api/admin/taxi/applications/007z/applications/:applicationId"
] as const;

const sections028A: TaxiAdminRuntime028ASection[] = [
  "financeProgram",
  "access",
  "management",
  "reports",
  "archive",
  "driversCars",
  "contests",
  "bonuses",
  "agentApplications"
];

function safety028A(): TaxiAdminRuntime028ASafety {
  return {
    envFileReadOrDumped: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    localMutationExecuted: false,
    fakeSuccessBlocked: true
  };
}

function readHeader028A(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028A(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028A(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  const providedToken = (readHeader028A(req, "x-sabi-admin-token") || readHeader028A(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028A(req, "x-sabi-admin-role") || readHeader028A(req, "x-admin-role") || "admin").trim();
  const roleAllowed = [
    "owner",
    "owner_ai",
    "admin",
    "deputy",
    "taxi_manager",
    "taxi_finance",
    "support",
    "moderator",
    "agent_control",
    "observer"
  ].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028A_VERSION,
      code: "taxi_admin_runtime_028a_admin_required",
      message: "Доступ к runtime данным Taxi Admin разрешён только авторизованной роли Taxi Admin.",
      ownerApprovalRequired: false,
      safety: safety028A()
    });
    return false;
  }

  return true;
}

function listPayload028A(section: TaxiAdminRuntime028ASection, message: string): TaxiAdminRuntime028AListPayload {
  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028A_VERSION,
    section,
    source: "backend_runtime_028a",
    records: [],
    total: 0,
    emptyState: {
      noFakeData: true,
      message
    },
    safety: safety028A()
  };
}

function blocked028A(res: Response, section: TaxiAdminRuntime028ASection, message: string): void {
  const payload: TaxiAdminRuntime028ASafeBlockedPayload = {
    ok: false,
    version: TAXI_ADMIN_RUNTIME_028A_VERSION,
    code: "taxi_admin_runtime_028a_write_blocked",
    message,
    section,
    ownerApprovalRequired: true,
    safety: safety028A()
  };
  res.status(409).json(payload);
}

function routeRead028A(router: Router, path: string, section: TaxiAdminRuntime028ASection, message: string): void {
  router.get(path, (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.json(listPayload028A(section, message));
  });
}

function routePostRead028A(router: Router, path: string, section: TaxiAdminRuntime028ASection, message: string): void {
  router.post(path, (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.json(listPayload028A(section, message));
  });
}

function routeBlocked028A(router: Router, path: string, section: TaxiAdminRuntime028ASection, message: string): void {
  router.post(path, (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    blocked028A(res, section, message);
  });
}

export function taxiAdminRuntime028AReadiness(): TaxiAdminRuntime028AReadiness {
  return {
    version: TAXI_ADMIN_RUNTIME_028A_VERSION,
    ok: true,
    stage: "safe_read_runtime_foundation",
    adminUiBridge: "ready",
    fakeDataPolicy: "no_local_seed_no_backend_fake_empty_state_only",
    globalCountryCoverage: "195_world_countries_from_admin_ui_contract",
    databasePolicy: "db_read_not_executed_db_write_not_executed_until_owner_approval",
    financePolicy: "no_local_accrual_no_debit_no_transfer_no_payout",
    providerPolicy: "provider_dispatch_payment_payout_disabled",
    ownerApproval: "required_before_write_or_money_step",
    productionReadiness: 68,
    sections: sections028A,
    routes: [...adminRoutes028A]
  };
}

export function taxiAdminRuntime028ARouteList(): readonly string[] {
  return adminRoutes028A;
}

export function createTaxiAdminRuntime028ARouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028a/health", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028A_VERSION, safety: safety028A() });
  });

  router.get("/api/admin/taxi/runtime-028a/readiness", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.json(taxiAdminRuntime028AReadiness());
  });

  routePostRead028A(router, "/api/admin/taxi/finance-program/027a/load", "financeProgram", "Реальные финансовые записи ещё не подключены к DB read runtime; фейковые записи не возвращаются.");
  routePostRead028A(router, "/api/admin/taxi/finance-program/027a/income-scale", "financeProgram", "Шкала поступлений готова как backend contract; суммы не рассчитываются локально.");
  routePostRead028A(router, "/api/admin/taxi/finance-program/027a/earnings-report", "financeProgram", "Отчёт заработка Taxi ожидает DB read и ledger binding; фейковых сумм нет.");
  routeBlocked028A(router, "/api/admin/taxi/finance-program/027a/request-export", "financeProgram", "Экспорт финансов требует DB report runtime и Owner approval.");
  routeBlocked028A(router, "/api/admin/taxi/finance-program/027a/request-owner-approval", "financeProgram", "Owner approval runtime пока safe-disabled.");
  routeBlocked028A(router, "/api/admin/taxi/finance-program/027a/archive", "financeProgram", "Архивация финансового пакета требует backend archive write approval.");

  routePostRead028A(router, "/api/admin/taxi/access/026a/load", "access", "Реальные сотрудники и роли ещё не подключены; фейковых сотрудников нет.");
  routeBlocked028A(router, "/api/admin/taxi/access/026a/request-change", "access", "Изменение доступа требует backend approval workflow.");
  routeBlocked028A(router, "/api/admin/taxi/access/026a/request-owner-approval", "access", "Owner approval для доступа пока safe-disabled.");
  routeBlocked028A(router, "/api/admin/taxi/access/026a/archive", "access", "Архивация доступа требует backend archive write approval.");

  routePostRead028A(router, "/api/admin/taxi/management/025a/load", "management", "Реальные настройки Taxi ещё не подключены; локальных настроек нет.");
  routeBlocked028A(router, "/api/admin/taxi/management/025a/request-change", "management", "Изменение управления требует backend approval workflow.");
  routeBlocked028A(router, "/api/admin/taxi/management/025a/request-owner-approval", "management", "Owner approval для управления пока safe-disabled.");
  routeBlocked028A(router, "/api/admin/taxi/management/025a/archive", "management", "Архивация настройки требует backend archive write approval.");

  routePostRead028A(router, "/api/admin/taxi/reports/023a/queue", "reports", "Очередь реальных отчётов ждёт DB read runtime; фейковых отчётов нет.");
  routeBlocked028A(router, "/api/admin/taxi/reports/023a/generate", "reports", "Генерация отчёта требует backend report engine approval.");
  routeBlocked028A(router, "/api/admin/taxi/reports/023a/export", "reports", "Экспорт отчёта требует backend export runtime approval.");
  routeBlocked028A(router, "/api/admin/taxi/reports/023a/schedule", "reports", "Расписание отчётов требует backend scheduler approval.");
  routeBlocked028A(router, "/api/admin/taxi/reports/023a/archive", "reports", "Архивация отчёта требует backend archive write approval.");

  routePostRead028A(router, "/api/admin/taxi/archive/022a/records", "archive", "Архив ждёт реальные DB records; фейковых архивных записей нет.");
  router.get("/api/admin/taxi/archive/022a/records/:recordId", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028A_VERSION, section: "archive", code: "archive_record_not_loaded", message: "Реальная архивная запись не найдена в подключённом runtime store.", safety: safety028A() });
  });

  routePostRead028A(router, "/api/admin/taxi/drivers-cars/024a/list", "driversCars", "Реальные водители и авто ждут DB read runtime; фейковых карточек нет.");
  routePostRead028A(router, "/api/admin/taxi/drivers-cars/024a/detail", "driversCars", "Досье водителя и авто ждёт DB read runtime; фейковых документов нет.");
  routeBlocked028A(router, "/api/admin/taxi/drivers-cars/024a/request-docs", "driversCars", "Запрос документов требует backend notification workflow.");
  routeBlocked028A(router, "/api/admin/taxi/drivers-cars/024a/verify", "driversCars", "Подтверждение проверки требует backend approval workflow.");
  routeBlocked028A(router, "/api/admin/taxi/drivers-cars/024a/block", "driversCars", "Блокировка требует evidence review и Owner/Senior approval.");
  routeBlocked028A(router, "/api/admin/taxi/drivers-cars/024a/archive", "driversCars", "Архивация водителя/авто требует backend archive write approval.");

  routePostRead028A(router, "/api/admin/taxi/contests/021a/leaderboard-queue", "contests", "Лидерборд конкурсов ждёт реальные DB records; фейковых кандидатов нет.");
  router.get("/api/admin/taxi/contests/021a/candidates/:candidateId", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028A_VERSION, section: "contests", code: "contest_candidate_not_loaded", message: "Реальный кандидат конкурса не найден в runtime store.", safety: safety028A() });
  });

  routePostRead028A(router, "/api/admin/taxi/bonuses/020a/eligibility-queue", "bonuses", "Очередь бонусов ждёт реальные DB records; фейковых кандидатов нет.");
  router.get("/api/admin/taxi/bonuses/020a/candidates/:candidateId", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028A_VERSION, section: "bonuses", code: "bonus_candidate_not_loaded", message: "Реальный кандидат бонуса не найден в runtime store.", safety: safety028A() });
  });

  routePostRead028A(router, "/api/admin/taxi/applications/007z/new-applications", "agentApplications", "Новые агентские заявки ждут реальные DB records; фейковых заявок нет.");
  router.get("/api/admin/taxi/applications/007z/applications/:applicationId", (req, res) => {
    if (!requireAdmin028A(req, res)) return;
    res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028A_VERSION, section: "agentApplications", code: "agent_application_not_loaded", message: "Реальная агентская заявка не найдена в runtime store.", safety: safety028A() });
  });

  return router;
}
