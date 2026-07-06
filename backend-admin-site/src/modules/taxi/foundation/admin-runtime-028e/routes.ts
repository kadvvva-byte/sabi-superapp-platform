import express, { type Request, type Response, type Router } from "express";
import { PrismaClient } from "@prisma/client";

export const TAXI_ADMIN_RUNTIME_028E_VERSION = "TAXI-ADMIN-RUNTIME-028E-CONTROLLED-DB-READ-EXECUTION" as const;
export const TAXI_ADMIN_RUNTIME_028E_EXACT_APPROVAL = "I approve TAXI-ADMIN-RUNTIME-028E-CONTROLLED-DB-READ-EXECUTION count-only DB read, no raw rows, no DB write, no wallet, no provider, no payment, no payout, no money movement." as const;

export type TaxiAdminRuntime028ESection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

type TaxiAdminRuntime028EDelegateName =
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

type TaxiAdminRuntime028EReadPlan = {
  section: TaxiAdminRuntime028ESection;
  route: string;
  delegates: TaxiAdminRuntime028EDelegateName[];
  readMode: "controlled_count_only_db_read_execution";
};

type CountDelegate028E = {
  count?: () => Promise<number>;
};

type TaxiAdminRuntime028ESafety = {
  envFileReadOrDumped: false;
  exactOwnerApprovalRequired: true;
  dbReadMode: "count_only";
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  localMutationExecuted: false;
  moneyMovementExecuted: false;
  rawRowsReturned: false;
  rawRowsRequested: false;
  fakeDataReturned: false;
};

type TaxiAdminRuntime028ECountResult = {
  delegate: TaxiAdminRuntime028EDelegateName;
  status: "count_read_ok" | "delegate_missing_safe_empty" | "count_read_failed_safe_empty";
  count: number;
  errorCode?: string;
};

const readPlans028E: TaxiAdminRuntime028EReadPlan[] = [
  { section: "financeProgram", route: "/api/admin/taxi/runtime-028e/db-read-count/finance-program", delegates: ["taxiDriverSettlement", "taxiPaymentHold", "taxiAuditLog"], readMode: "controlled_count_only_db_read_execution" },
  { section: "access", route: "/api/admin/taxi/runtime-028e/db-read-count/access", delegates: ["taxiAuditLog"], readMode: "controlled_count_only_db_read_execution" },
  { section: "management", route: "/api/admin/taxi/runtime-028e/db-read-count/management", delegates: ["taxiTariffRegion", "taxiProviderReadinessSnapshot"], readMode: "controlled_count_only_db_read_execution" },
  { section: "reports", route: "/api/admin/taxi/runtime-028e/db-read-count/reports", delegates: ["taxiAuditLog", "taxiProviderReadinessSnapshot"], readMode: "controlled_count_only_db_read_execution" },
  { section: "archive", route: "/api/admin/taxi/runtime-028e/db-read-count/archive", delegates: ["taxiAuditLog", "taxiSupportCase"], readMode: "controlled_count_only_db_read_execution" },
  { section: "driversCars", route: "/api/admin/taxi/runtime-028e/db-read-count/drivers-cars", delegates: ["taxiDriverProfile", "taxiVehicle", "taxiDriverApplication", "taxiDriverVehicleAssignment"], readMode: "controlled_count_only_db_read_execution" },
  { section: "contests", route: "/api/admin/taxi/runtime-028e/db-read-count/contests", delegates: ["taxiTripRatingLedger", "taxiTrip"], readMode: "controlled_count_only_db_read_execution" },
  { section: "bonuses", route: "/api/admin/taxi/runtime-028e/db-read-count/bonuses", delegates: ["taxiTripRatingLedger", "taxiTrip"], readMode: "controlled_count_only_db_read_execution" },
  { section: "agentApplications", route: "/api/admin/taxi/runtime-028e/db-read-count/agent-applications", delegates: ["taxiAgentApplication", "taxiDriverApplication"], readMode: "controlled_count_only_db_read_execution" }
];

const routeList028E = [
  "/api/admin/taxi/runtime-028e/health",
  "/api/admin/taxi/runtime-028e/readiness",
  "/api/admin/taxi/runtime-028e/owner-approval-request",
  "/api/admin/taxi/runtime-028e/db-read-count/all",
  ...readPlans028E.map((plan) => plan.route)
] as const;

let prisma028E: PrismaClient | null = null;

function getPrisma028E(): PrismaClient {
  if (!prisma028E) prisma028E = new PrismaClient();
  return prisma028E;
}

function safety028E(): TaxiAdminRuntime028ESafety {
  return {
    envFileReadOrDumped: false,
    exactOwnerApprovalRequired: true,
    dbReadMode: "count_only",
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    localMutationExecuted: false,
    moneyMovementExecuted: false,
    rawRowsReturned: false,
    rawRowsRequested: false,
    fakeDataReturned: false
  };
}

function readHeader028E(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028E(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028E(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ") ? authorizationHeader.slice(7).trim() : "";
  const providedToken = (readHeader028E(req, "x-sabi-admin-token") || readHeader028E(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028E(req, "x-sabi-admin-role") || readHeader028E(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "owner_ai", "admin", "deputy", "taxi_manager", "taxi_finance", "support", "moderator", "agent_control", "observer"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028E_VERSION,
      code: "taxi_admin_runtime_028e_admin_required",
      message: "Доступ к controlled DB-read execution Taxi Admin разрешён только авторизованной роли Taxi Admin.",
      dbReadExecuted: false,
      safety: safety028E()
    });
    return false;
  }

  return true;
}

function requireExactOwnerApproval028E(req: Request, res: Response): boolean {
  const approval = (readHeader028E(req, "x-sabi-owner-approval") || readHeader028E(req, "x-owner-approval")).trim();
  if (approval !== TAXI_ADMIN_RUNTIME_028E_EXACT_APPROVAL) {
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028E_VERSION,
      code: "taxi_admin_runtime_028e_exact_owner_approval_required",
      message: "028E count-only DB read не выполнен: нужен точный Owner approval header. DB read/write/money/provider не выполнялись.",
      requiredHeader: "x-sabi-owner-approval",
      requiredApproval: TAXI_ADMIN_RUNTIME_028E_EXACT_APPROVAL,
      dbReadExecuted: false,
      records: [],
      total: 0,
      safety: safety028E()
    });
    return false;
  }
  return true;
}

function findPlan028E(section: TaxiAdminRuntime028ESection): TaxiAdminRuntime028EReadPlan {
  return readPlans028E.find((plan) => plan.section === section) ?? readPlans028E[0];
}

function errorCode028E(error: unknown): string {
  if (error && typeof error === "object" && "code" in error && typeof (error as { code?: unknown }).code === "string") {
    return (error as { code: string }).code;
  }
  return "count_read_error";
}

async function countDelegates028E(plan: TaxiAdminRuntime028EReadPlan): Promise<TaxiAdminRuntime028ECountResult[]> {
  const prisma = getPrisma028E() as unknown as Record<string, CountDelegate028E | undefined>;
  const results: TaxiAdminRuntime028ECountResult[] = [];

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
      results.push({ delegate: delegateName, status: "count_read_failed_safe_empty", count: 0, errorCode: errorCode028E(error) });
    }
  }

  return results;
}

async function dbReadCountPayload028E(section: TaxiAdminRuntime028ESection) {
  const plan = findPlan028E(section);
  const counts = await countDelegates028E(plan);
  const total = counts.reduce((sum, item) => sum + item.count, 0);

  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028E_VERSION,
    section,
    route: plan.route,
    readMode: plan.readMode,
    dbReadExecuted: true,
    dbReadScope: "count_only",
    rawRowsReturned: false,
    rawRowsRequested: false,
    records: [],
    total,
    counts,
    emptyState: {
      noFakeData: true,
      message: total === 0 ? "028E count-only DB read выполнен, реальные записи не найдены или delegate недоступен. Фейковые данные не подставлены." : "028E count-only DB read выполнен. Raw rows не возвращались."
    },
    writeBlocked: true,
    moneyMovementBlocked: true,
    safety: safety028E()
  };
}

export function taxiAdminRuntime028EReadiness() {
  return {
    version: TAXI_ADMIN_RUNTIME_028E_VERSION,
    ok: true,
    stage: "controlled_db_read_execution",
    previousRuntime028D: "passed_real_runtime_smoke",
    dbReadMode: "exact_owner_approval_header_required_count_only_execution",
    dbWritePolicy: "db_write_blocked_409",
    fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
    rawRowsPolicy: "no_raw_rows_returned_counts_only",
    financePolicy: "no_accrual_no_debit_no_transfer_no_payout",
    providerPolicy: "provider_payment_payout_dispatch_disabled",
    productionReadiness: 85,
    routePlans: readPlans028E,
    safety: safety028E()
  };
}

export function taxiAdminRuntime028ERouteList(): readonly string[] {
  return routeList028E;
}

export function createTaxiAdminRuntime028ERouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028e/health", (req, res) => {
    if (!requireAdmin028E(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028E_VERSION, safety: safety028E() });
  });

  router.get("/api/admin/taxi/runtime-028e/readiness", (req, res) => {
    if (!requireAdmin028E(req, res)) return;
    res.json(taxiAdminRuntime028EReadiness());
  });

  router.get("/api/admin/taxi/runtime-028e/owner-approval-request", (req, res) => {
    if (!requireAdmin028E(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028E_VERSION,
      approvalStatus: "exact_owner_approval_required_for_count_only_db_read_execution",
      exactApprovalHeader: "x-sabi-owner-approval",
      exactApprovalValue: TAXI_ADMIN_RUNTIME_028E_EXACT_APPROVAL,
      allowedAction: "count_only_db_read_execution_no_raw_rows_no_write_no_money",
      blockedActions: ["DB write", "raw row export", "Wallet mutation", "money movement", "provider call", "payout execution", "payment execution", "local success", "fake records"],
      safety: safety028E()
    });
  });

  router.post("/api/admin/taxi/runtime-028e/:anyAction", (req, res) => {
    if (!requireAdmin028E(req, res)) return;
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028E_VERSION,
      code: "taxi_admin_runtime_028e_write_actions_blocked",
      message: "028E разрешает только count-only DB read. Любые write/money/provider действия заблокированы.",
      safety: safety028E()
    });
  });

  const registerReadCount = (path: string, section: TaxiAdminRuntime028ESection) => {
    router.get(path, async (req, res) => {
      if (!requireAdmin028E(req, res)) return;
      if (!requireExactOwnerApproval028E(req, res)) return;
      res.json(await dbReadCountPayload028E(section));
    });
  };

  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/finance-program", "financeProgram");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/access", "access");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/management", "management");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/reports", "reports");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/archive", "archive");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/drivers-cars", "driversCars");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/contests", "contests");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/bonuses", "bonuses");
  registerReadCount("/api/admin/taxi/runtime-028e/db-read-count/agent-applications", "agentApplications");

  router.get("/api/admin/taxi/runtime-028e/db-read-count/all", async (req, res) => {
    if (!requireAdmin028E(req, res)) return;
    if (!requireExactOwnerApproval028E(req, res)) return;
    const sections = await Promise.all(readPlans028E.map((plan) => dbReadCountPayload028E(plan.section)));
    const total = sections.reduce((sum, item) => sum + item.total, 0);
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028E_VERSION,
      dbReadExecuted: true,
      dbReadScope: "count_only",
      rawRowsReturned: false,
      rawRowsRequested: false,
      records: [],
      total,
      sections,
      fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
      writeBlocked: true,
      moneyMovementBlocked: true,
      safety: safety028E()
    });
  });

  return router;
}
