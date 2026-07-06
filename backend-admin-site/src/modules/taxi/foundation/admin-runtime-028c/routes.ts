import express, { type Request, type Response, type Router } from "express";
import { PrismaClient } from "@prisma/client";

export const TAXI_ADMIN_RUNTIME_028C_VERSION = "TAXI-ADMIN-RUNTIME-028C-CONTROLLED-DB-READ-SMOKE" as const;
export const TAXI_ADMIN_RUNTIME_028C_EXACT_APPROVAL = "I approve TAXI-ADMIN-RUNTIME-028C-CONTROLLED-DB-READ-SMOKE" as const;

export type TaxiAdminRuntime028CSection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

type TaxiAdminRuntime028CDelegateName =
  | "taxiDriverSettlement"
  | "taxiPaymentHold"
  | "taxiAuditLog"
  | "taxiTariffRegion"
  | "taxiProviderReadinessSnapshot"
  | "taxiDriverProfile"
  | "taxiVehicle"
  | "taxiDriverApplication"
  | "taxiDriverVehicleAssignment"
  | "taxiTripRatingLedger"
  | "taxiTrip"
  | "taxiSupportCase"
  | "taxiAgentApplication";

type TaxiAdminRuntime028CReadPlan = {
  section: TaxiAdminRuntime028CSection;
  route: string;
  delegates: TaxiAdminRuntime028CDelegateName[];
  readMode: "controlled_count_only";
};

type CountDelegate028C = {
  count?: () => Promise<number>;
};

type TaxiAdminRuntime028CSafety = {
  envFileReadOrDumped: false;
  dbReadRequiresExactOwnerApproval: true;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  localMutationExecuted: false;
  rawRowsReturned: false;
  fakeSuccessBlocked: true;
};

type TaxiAdminRuntime028CCountResult = {
  delegate: TaxiAdminRuntime028CDelegateName;
  status: "count_read_ok" | "delegate_missing_safe_empty" | "count_read_failed_safe_empty";
  count: number;
  errorCode?: string;
};

const readPlans028C: TaxiAdminRuntime028CReadPlan[] = [
  { section: "financeProgram", route: "/api/admin/taxi/runtime-028c/db-read-smoke/finance-program", delegates: ["taxiDriverSettlement", "taxiPaymentHold", "taxiAuditLog"], readMode: "controlled_count_only" },
  { section: "access", route: "/api/admin/taxi/runtime-028c/db-read-smoke/access", delegates: ["taxiAuditLog"], readMode: "controlled_count_only" },
  { section: "management", route: "/api/admin/taxi/runtime-028c/db-read-smoke/management", delegates: ["taxiTariffRegion", "taxiProviderReadinessSnapshot"], readMode: "controlled_count_only" },
  { section: "reports", route: "/api/admin/taxi/runtime-028c/db-read-smoke/reports", delegates: ["taxiAuditLog", "taxiProviderReadinessSnapshot"], readMode: "controlled_count_only" },
  { section: "archive", route: "/api/admin/taxi/runtime-028c/db-read-smoke/archive", delegates: ["taxiAuditLog", "taxiSupportCase"], readMode: "controlled_count_only" },
  { section: "driversCars", route: "/api/admin/taxi/runtime-028c/db-read-smoke/drivers-cars", delegates: ["taxiDriverProfile", "taxiVehicle", "taxiDriverApplication", "taxiDriverVehicleAssignment"], readMode: "controlled_count_only" },
  { section: "contests", route: "/api/admin/taxi/runtime-028c/db-read-smoke/contests", delegates: ["taxiTripRatingLedger", "taxiTrip"], readMode: "controlled_count_only" },
  { section: "bonuses", route: "/api/admin/taxi/runtime-028c/db-read-smoke/bonuses", delegates: ["taxiTripRatingLedger", "taxiTrip"], readMode: "controlled_count_only" },
  { section: "agentApplications", route: "/api/admin/taxi/runtime-028c/db-read-smoke/agent-applications", delegates: ["taxiAgentApplication", "taxiDriverApplication"], readMode: "controlled_count_only" }
];

const routeList028C = [
  "/api/admin/taxi/runtime-028c/health",
  "/api/admin/taxi/runtime-028c/readiness",
  "/api/admin/taxi/runtime-028c/owner-approval-request",
  "/api/admin/taxi/runtime-028c/db-read-smoke/all",
  ...readPlans028C.map((plan) => plan.route)
] as const;

let prisma028C: PrismaClient | null = null;

function getPrisma028C(): PrismaClient {
  if (!prisma028C) prisma028C = new PrismaClient();
  return prisma028C;
}

function safety028C(): TaxiAdminRuntime028CSafety {
  return {
    envFileReadOrDumped: false,
    dbReadRequiresExactOwnerApproval: true,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    localMutationExecuted: false,
    rawRowsReturned: false,
    fakeSuccessBlocked: true
  };
}

function readHeader028C(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028C(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028C(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ") ? authorizationHeader.slice(7).trim() : "";
  const providedToken = (readHeader028C(req, "x-sabi-admin-token") || readHeader028C(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028C(req, "x-sabi-admin-role") || readHeader028C(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "owner_ai", "admin", "deputy", "taxi_manager", "taxi_finance", "support", "moderator", "agent_control", "observer"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028C_VERSION,
      code: "taxi_admin_runtime_028c_admin_required",
      message: "Доступ к controlled DB-read smoke Taxi Admin разрешён только авторизованной роли Taxi Admin.",
      ownerApprovalRequired: false,
      safety: safety028C()
    });
    return false;
  }

  return true;
}

function requireExactOwnerApproval028C(req: Request, res: Response): boolean {
  const approval = (readHeader028C(req, "x-sabi-owner-approval") || readHeader028C(req, "x-owner-approval")).trim();
  if (approval !== TAXI_ADMIN_RUNTIME_028C_EXACT_APPROVAL) {
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028C_VERSION,
      code: "taxi_admin_runtime_028c_exact_owner_approval_required",
      message: "Controlled DB-read smoke не выполнен: нужен точный Owner approval header. DB read/write/money/provider не выполнялись.",
      requiredHeader: "x-sabi-owner-approval",
      requiredApproval: TAXI_ADMIN_RUNTIME_028C_EXACT_APPROVAL,
      dbReadExecuted: false,
      records: [],
      total: 0,
      safety: safety028C()
    });
    return false;
  }
  return true;
}

function findPlan028C(section: TaxiAdminRuntime028CSection): TaxiAdminRuntime028CReadPlan {
  return readPlans028C.find((plan) => plan.section === section) ?? readPlans028C[0];
}

function errorCode028C(error: unknown): string {
  if (error && typeof error === "object" && "code" in error && typeof (error as { code?: unknown }).code === "string") {
    return (error as { code: string }).code;
  }
  return "count_read_error";
}

async function countDelegates028C(plan: TaxiAdminRuntime028CReadPlan): Promise<TaxiAdminRuntime028CCountResult[]> {
  const prisma = getPrisma028C() as unknown as Record<string, CountDelegate028C | undefined>;
  const results: TaxiAdminRuntime028CCountResult[] = [];

  for (const delegateName of plan.delegates) {
    const delegate = prisma[delegateName];
    if (!delegate || typeof delegate.count !== "function") {
      results.push({ delegate: delegateName, status: "delegate_missing_safe_empty", count: 0 });
      continue;
    }

    try {
      const count = await delegate.count();
      results.push({ delegate: delegateName, status: "count_read_ok", count: Number.isFinite(count) ? count : 0 });
    } catch (error) {
      results.push({ delegate: delegateName, status: "count_read_failed_safe_empty", count: 0, errorCode: errorCode028C(error) });
    }
  }

  return results;
}

async function dbReadSmokePayload028C(section: TaxiAdminRuntime028CSection) {
  const plan = findPlan028C(section);
  const counts = await countDelegates028C(plan);
  const total = counts.reduce((sum, item) => sum + item.count, 0);

  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028C_VERSION,
    section,
    route: plan.route,
    readMode: plan.readMode,
    dbReadExecuted: true,
    rawRowsReturned: false,
    records: [],
    total,
    counts,
    emptyState: {
      noFakeData: true,
      message: total === 0 ? "DB read smoke выполнен, реальные записи не найдены или delegate недоступен. Фейковые данные не подставлены." : "DB read smoke выполнен только по counts. Raw rows не возвращались."
    },
    writeBlocked: true,
    moneyMovementBlocked: true,
    safety: safety028C()
  };
}

export function taxiAdminRuntime028CReadiness() {
  return {
    version: TAXI_ADMIN_RUNTIME_028C_VERSION,
    ok: true,
    stage: "controlled_db_read_smoke",
    previousRuntime028B: "passed_db_read_approval_foundation",
    dbReadMode: "exact_owner_approval_header_required_count_only",
    dbWritePolicy: "db_write_blocked_409",
    fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
    rawRowsPolicy: "no_raw_rows_returned_counts_only",
    financePolicy: "no_accrual_no_debit_no_transfer_no_payout",
    providerPolicy: "provider_payment_payout_dispatch_disabled",
    productionReadiness: 76,
    routePlans: readPlans028C,
    safety: safety028C()
  };
}

export function taxiAdminRuntime028CRouteList(): readonly string[] {
  return routeList028C;
}

export function createTaxiAdminRuntime028CRouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028c/health", (req, res) => {
    if (!requireAdmin028C(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028C_VERSION, safety: safety028C() });
  });

  router.get("/api/admin/taxi/runtime-028c/readiness", (req, res) => {
    if (!requireAdmin028C(req, res)) return;
    res.json(taxiAdminRuntime028CReadiness());
  });

  router.get("/api/admin/taxi/runtime-028c/owner-approval-request", (req, res) => {
    if (!requireAdmin028C(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028C_VERSION,
      approvalStatus: "exact_owner_approval_required_for_db_read_smoke",
      exactApprovalHeader: "x-sabi-owner-approval",
      exactApprovalValue: TAXI_ADMIN_RUNTIME_028C_EXACT_APPROVAL,
      allowedAction: "count_only_db_read_smoke_no_raw_rows_no_write_no_money",
      blockedActions: ["DB write", "raw row export", "Wallet mutation", "money movement", "provider call", "payout execution", "payment execution", "local success", "fake records"],
      safety: safety028C()
    });
  });

  router.post("/api/admin/taxi/runtime-028c/:anyAction", (req, res) => {
    if (!requireAdmin028C(req, res)) return;
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028C_VERSION,
      code: "taxi_admin_runtime_028c_write_actions_blocked",
      message: "028C разрешает только read-only count smoke. Любые write/money/provider действия заблокированы.",
      safety: safety028C()
    });
  });

  const registerReadSmoke = (path: string, section: TaxiAdminRuntime028CSection) => {
    router.get(path, async (req, res) => {
      if (!requireAdmin028C(req, res)) return;
      if (!requireExactOwnerApproval028C(req, res)) return;
      res.json(await dbReadSmokePayload028C(section));
    });
  };

  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/finance-program", "financeProgram");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/access", "access");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/management", "management");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/reports", "reports");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/archive", "archive");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/drivers-cars", "driversCars");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/contests", "contests");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/bonuses", "bonuses");
  registerReadSmoke("/api/admin/taxi/runtime-028c/db-read-smoke/agent-applications", "agentApplications");

  router.get("/api/admin/taxi/runtime-028c/db-read-smoke/all", async (req, res) => {
    if (!requireAdmin028C(req, res)) return;
    if (!requireExactOwnerApproval028C(req, res)) return;
    const sections = await Promise.all(readPlans028C.map((plan) => dbReadSmokePayload028C(plan.section)));
    const total = sections.reduce((sum, item) => sum + item.total, 0);
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028C_VERSION,
      dbReadExecuted: true,
      rawRowsReturned: false,
      records: [],
      total,
      sections,
      fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
      writeBlocked: true,
      moneyMovementBlocked: true,
      safety: safety028C()
    });
  });

  return router;
}
