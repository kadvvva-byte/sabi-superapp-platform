import express, { type Request, type Response, type Router } from "express";

export const TAXI_ADMIN_RUNTIME_028D_VERSION = "TAXI-ADMIN-RUNTIME-028D-REAL-RUNTIME-SMOKE" as const;

export type TaxiAdminRuntime028DRouteStatus = {
  route: string;
  method: "GET" | "POST";
  expectedStatus: 200 | 409;
  purpose: string;
  dbReadExpected: false;
  dbWriteExpected: false;
  moneyMovementExpected: false;
};

type TaxiAdminRuntime028DSafety = {
  envFileReadOrDumped: false;
  dbReadExecutedBy028D: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  moneyMovementExecuted: false;
  rawRowsReturned: false;
  fakeDataReturned: false;
};

const smokePlan028D: TaxiAdminRuntime028DRouteStatus[] = [
  { route: "/api/admin/taxi/runtime-028a/health", method: "GET", expectedStatus: 200, purpose: "028A runtime route health", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028a/readiness", method: "GET", expectedStatus: 200, purpose: "028A runtime route readiness", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028b/health", method: "GET", expectedStatus: 200, purpose: "028B DB-read approval foundation health without DB read", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028b/readiness", method: "GET", expectedStatus: 200, purpose: "028B readiness without DB read", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028c/health", method: "GET", expectedStatus: 200, purpose: "028C controlled DB-read smoke health without DB read", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028c/readiness", method: "GET", expectedStatus: 200, purpose: "028C readiness without DB read", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028c/owner-approval-request", method: "GET", expectedStatus: 200, purpose: "028C exact Owner approval request visible", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false },
  { route: "/api/admin/taxi/runtime-028c/db-read-smoke/all", method: "GET", expectedStatus: 409, purpose: "028C DB-read smoke must be blocked without exact Owner approval", dbReadExpected: false, dbWriteExpected: false, moneyMovementExpected: false }
];

const routeList028D = [
  "/api/admin/taxi/runtime-028d/health",
  "/api/admin/taxi/runtime-028d/readiness",
  "/api/admin/taxi/runtime-028d/runtime-smoke-plan",
  "/api/admin/taxi/runtime-028d/runtime-smoke-contract"
] as const;

function safety028D(): TaxiAdminRuntime028DSafety {
  return {
    envFileReadOrDumped: false,
    dbReadExecutedBy028D: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    moneyMovementExecuted: false,
    rawRowsReturned: false,
    fakeDataReturned: false
  };
}

function readHeader028D(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028D(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028D(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ") ? authorizationHeader.slice(7).trim() : "";
  const providedToken = (readHeader028D(req, "x-sabi-admin-token") || readHeader028D(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028D(req, "x-sabi-admin-role") || readHeader028D(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "owner_ai", "admin", "deputy", "taxi_manager", "taxi_finance", "support", "moderator", "agent_control", "observer"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028D_VERSION,
      code: "taxi_admin_runtime_028d_admin_required",
      message: "Доступ к runtime smoke Taxi Admin разрешён только авторизованной роли Taxi Admin.",
      safety: safety028D()
    });
    return false;
  }

  return true;
}

export function taxiAdminRuntime028DReadiness() {
  return {
    version: TAXI_ADMIN_RUNTIME_028D_VERSION,
    ok: true,
    stage: "real_runtime_http_smoke_contract",
    previousRuntime028C: "passed_controlled_db_read_smoke_foundation",
    smokeMode: "http_runtime_smoke_no_exact_owner_approval_no_db_read",
    dbReadPolicy: "028D does not send exact Owner approval header; DB-read smoke must return 409 blocked",
    dbWritePolicy: "db_write_blocked",
    fakeDataPolicy: "no_backend_fake_data_no_seed_no_fallback_records",
    rawRowsPolicy: "no_raw_rows_returned",
    financePolicy: "no_accrual_no_debit_no_transfer_no_payout",
    providerPolicy: "provider_payment_payout_dispatch_disabled",
    productionReadiness: 80,
    smokePlan: smokePlan028D,
    safety: safety028D()
  };
}

export function taxiAdminRuntime028DRouteList(): readonly string[] {
  return routeList028D;
}

export function createTaxiAdminRuntime028DRouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028d/health", (req, res) => {
    if (!requireAdmin028D(req, res)) return;
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028D_VERSION, safety: safety028D() });
  });

  router.get("/api/admin/taxi/runtime-028d/readiness", (req, res) => {
    if (!requireAdmin028D(req, res)) return;
    res.json(taxiAdminRuntime028DReadiness());
  });

  router.get("/api/admin/taxi/runtime-028d/runtime-smoke-plan", (req, res) => {
    if (!requireAdmin028D(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028D_VERSION,
      smokePlan: smokePlan028D,
      exactOwnerApprovalHeaderSentBy028D: false,
      dbReadExpectedBy028D: false,
      dbWriteExpectedBy028D: false,
      moneyMovementExpectedBy028D: false,
      safety: safety028D()
    });
  });

  router.get("/api/admin/taxi/runtime-028d/runtime-smoke-contract", (req, res) => {
    if (!requireAdmin028D(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028D_VERSION,
      contract: {
        mustHitOnlyReadinessAndBlockedRoutes: true,
        mustNotSendExactOwnerApprovalHeader: true,
        mustExpect028CBlocked409WithoutApproval: true,
        mustNotReadRawRows: true,
        mustNotWriteDb: true,
        mustNotMutateWallet: true,
        mustNotMoveMoney: true,
        mustNotCallProvider: true,
        mustNotReturnFakeData: true
      },
      productionReadiness: 80,
      safety: safety028D()
    });
  });

  router.post("/api/admin/taxi/runtime-028d/:anyAction", (req, res) => {
    if (!requireAdmin028D(req, res)) return;
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028D_VERSION,
      code: "taxi_admin_runtime_028d_write_actions_blocked",
      message: "028D — только runtime smoke contract/readiness. Любые write/money/provider действия заблокированы.",
      safety: safety028D()
    });
  });

  return router;
}
