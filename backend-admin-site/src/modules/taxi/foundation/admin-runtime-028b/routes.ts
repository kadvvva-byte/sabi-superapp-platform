import express, { type Request, type Response, type Router } from "express";

export const TAXI_ADMIN_RUNTIME_028B_VERSION = "TAXI-ADMIN-RUNTIME-028B-DB-READ-APPROVAL-FOUNDATION" as const;

export type TaxiAdminRuntime028BSection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

export type TaxiAdminRuntime028BModelKey =
  | "TaxiFinanceProgramLedgerReadModel"
  | "TaxiAccessRoleScopeReadModel"
  | "TaxiManagementConfigReadModel"
  | "TaxiReportQueueReadModel"
  | "TaxiArchiveRecordReadModel"
  | "TaxiDriverVehicleDossierReadModel"
  | "TaxiContestLeaderboardReadModel"
  | "TaxiBonusEligibilityReadModel"
  | "TaxiAgentApplicationReadModel";

type TaxiAdminRuntime028BRoutePolicy = {
  route: string;
  section: TaxiAdminRuntime028BSection;
  modelKey: TaxiAdminRuntime028BModelKey;
  readMode: "approved_shape_only_no_query";
};

export type TaxiAdminRuntime028BReadiness = {
  version: typeof TAXI_ADMIN_RUNTIME_028B_VERSION;
  ok: true;
  stage: "db_read_approval_foundation";
  previousRuntime028A: "passed_safe_read_routes_foundation";
  adminUiBridge: "ready";
  fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records";
  dbReadPolicy: "db_read_not_executed_until_exact_owner_approval_and_runtime_smoke";
  dbWritePolicy: "db_write_blocked_409";
  financePolicy: "no_accrual_no_debit_no_transfer_no_payout";
  providerPolicy: "provider_payment_payout_dispatch_disabled";
  ownerApproval: "required_before_any_db_read_or_write_or_money_step";
  productionReadiness: 72;
  sections: TaxiAdminRuntime028BSection[];
  routePolicies: TaxiAdminRuntime028BRoutePolicy[];
};

type TaxiAdminRuntime028BSafety = {
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

type TaxiAdminRuntime028BApprovalPayload = {
  ok: true;
  version: typeof TAXI_ADMIN_RUNTIME_028B_VERSION;
  approvalStatus: "owner_approval_required_before_db_read";
  nextExactApproval: "I approve TAXI-ADMIN-RUNTIME-028C-CONTROLLED-DB-READ-SMOKE";
  allowedNextAction: "controlled_db_read_smoke_read_only";
  blockedActions: string[];
  routePolicies: TaxiAdminRuntime028BRoutePolicy[];
  safety: TaxiAdminRuntime028BSafety;
};

const sections028B: TaxiAdminRuntime028BSection[] = [
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

const routePolicies028B: TaxiAdminRuntime028BRoutePolicy[] = [
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/finance-program", section: "financeProgram", modelKey: "TaxiFinanceProgramLedgerReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/access", section: "access", modelKey: "TaxiAccessRoleScopeReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/management", section: "management", modelKey: "TaxiManagementConfigReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/reports", section: "reports", modelKey: "TaxiReportQueueReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/archive", section: "archive", modelKey: "TaxiArchiveRecordReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/drivers-cars", section: "driversCars", modelKey: "TaxiDriverVehicleDossierReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/contests", section: "contests", modelKey: "TaxiContestLeaderboardReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/bonuses", section: "bonuses", modelKey: "TaxiBonusEligibilityReadModel", readMode: "approved_shape_only_no_query" },
  { route: "/api/admin/taxi/runtime-028b/db-read-plan/agent-applications", section: "agentApplications", modelKey: "TaxiAgentApplicationReadModel", readMode: "approved_shape_only_no_query" }
];

const adminRoutes028B = [
  "/api/admin/taxi/runtime-028b/health",
  "/api/admin/taxi/runtime-028b/readiness",
  "/api/admin/taxi/runtime-028b/db-readiness",
  "/api/admin/taxi/runtime-028b/model-map",
  "/api/admin/taxi/runtime-028b/owner-approval-request",
  ...routePolicies028B.map((routePolicy) => routePolicy.route)
] as const;

function safety028B(): TaxiAdminRuntime028BSafety {
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

function readHeader028B(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028B(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028B(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ")
    ? authorizationHeader.slice(7).trim()
    : "";
  const providedToken = (readHeader028B(req, "x-sabi-admin-token") || readHeader028B(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028B(req, "x-sabi-admin-role") || readHeader028B(req, "x-admin-role") || "admin").trim();
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
      version: TAXI_ADMIN_RUNTIME_028B_VERSION,
      code: "taxi_admin_runtime_028b_admin_required",
      message: "Доступ к DB-read readiness Taxi Admin разрешён только авторизованной роли Taxi Admin.",
      ownerApprovalRequired: false,
      safety: safety028B()
    });
    return false;
  }

  return true;
}

function findRoutePolicy028B(section: TaxiAdminRuntime028BSection): TaxiAdminRuntime028BRoutePolicy {
  const routePolicy = routePolicies028B.find((candidate) => candidate.section === section);
  if (!routePolicy) return routePolicies028B[0];
  return routePolicy;
}

export function taxiAdminRuntime028BReadiness(): TaxiAdminRuntime028BReadiness {
  return {
    version: TAXI_ADMIN_RUNTIME_028B_VERSION,
    ok: true,
    stage: "db_read_approval_foundation",
    previousRuntime028A: "passed_safe_read_routes_foundation",
    adminUiBridge: "ready",
    fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
    dbReadPolicy: "db_read_not_executed_until_exact_owner_approval_and_runtime_smoke",
    dbWritePolicy: "db_write_blocked_409",
    financePolicy: "no_accrual_no_debit_no_transfer_no_payout",
    providerPolicy: "provider_payment_payout_dispatch_disabled",
    ownerApproval: "required_before_any_db_read_or_write_or_money_step",
    productionReadiness: 72,
    sections: sections028B,
    routePolicies: routePolicies028B
  };
}

export function taxiAdminRuntime028BRouteList(): readonly string[] {
  return adminRoutes028B;
}

function approvalPayload028B(): TaxiAdminRuntime028BApprovalPayload {
  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028B_VERSION,
    approvalStatus: "owner_approval_required_before_db_read",
    nextExactApproval: "I approve TAXI-ADMIN-RUNTIME-028C-CONTROLLED-DB-READ-SMOKE",
    allowedNextAction: "controlled_db_read_smoke_read_only",
    blockedActions: [
      "DB write",
      "Wallet mutation",
      "money movement",
      "provider call",
      "payout execution",
      "payment execution",
      "fake records",
      "local success"
    ],
    routePolicies: routePolicies028B,
    safety: safety028B()
  };
}

function dbReadPlanPayload028B(section: TaxiAdminRuntime028BSection) {
  const routePolicy = findRoutePolicy028B(section);
  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028B_VERSION,
    section,
    route: routePolicy.route,
    modelKey: routePolicy.modelKey,
    readMode: routePolicy.readMode,
    records: [],
    total: 0,
    emptyState: {
      noFakeData: true,
      message: "DB read ещё не выполняется. После точного approval 028C будет разрешён только read-only smoke без write/money/provider."
    },
    ownerApprovalRequiredBeforeDbRead: true,
    safety: safety028B()
  };
}

export function createTaxiAdminRuntime028BRouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028b/health", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028B_VERSION, safety: safety028B() });
  });

  router.get("/api/admin/taxi/runtime-028b/readiness", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(taxiAdminRuntime028BReadiness());
  });

  router.get("/api/admin/taxi/runtime-028b/db-readiness", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028B_VERSION,
      dbReadiness: "approved_shape_ready_no_query_executed",
      dbReadExecuted: false,
      nextExactApproval: "I approve TAXI-ADMIN-RUNTIME-028C-CONTROLLED-DB-READ-SMOKE",
      safety: safety028B()
    });
  });

  router.get("/api/admin/taxi/runtime-028b/model-map", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028B_VERSION, routePolicies: routePolicies028B, safety: safety028B() });
  });

  router.get("/api/admin/taxi/runtime-028b/owner-approval-request", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(approvalPayload028B());
  });

  router.post("/api/admin/taxi/runtime-028b/owner-approval-request", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028B_VERSION,
      code: "taxi_admin_runtime_028b_approval_request_only",
      message: "Этот endpoint не включает DB read. Для следующего шага нужен отдельный точный approval 028C.",
      ownerApprovalRequired: true,
      safety: safety028B()
    });
  });

  router.get("/api/admin/taxi/runtime-028b/db-read-plan/finance-program", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("financeProgram"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/access", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("access"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/management", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("management"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/reports", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("reports"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/archive", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("archive"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/drivers-cars", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("driversCars"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/contests", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("contests"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/bonuses", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("bonuses"));
  });
  router.get("/api/admin/taxi/runtime-028b/db-read-plan/agent-applications", (req, res) => {
    if (!requireAdmin028B(req, res)) return;
    res.json(dbReadPlanPayload028B("agentApplications"));
  });

  return router;
}
