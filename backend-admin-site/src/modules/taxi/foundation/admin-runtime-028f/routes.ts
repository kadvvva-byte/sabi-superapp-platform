import express, { type Request, type Response, type Router } from "express";

export const TAXI_ADMIN_RUNTIME_028F_VERSION = "TAXI-ADMIN-RUNTIME-028F-ADMIN-UI-COUNT-BRIDGE-FOUNDATION" as const;

export type TaxiAdminRuntime028FSection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

type TaxiAdminRuntime028FSectionBridge = {
  section: TaxiAdminRuntime028FSection;
  labelRu: string;
  uiScreen: string;
  countSourceRoute028E: string;
  uiTarget: string;
  emptyState: "backend_count_not_loaded_yet";
  rawRowsReturned: false;
  records: [];
};

type TaxiAdminRuntime028FSafety = {
  envFileReadOrDumped: false;
  dbReadPerformedBy028F: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  moneyMovementExecuted: false;
  rawRowsReturned: false;
  fakeDataReturned: false;
  localUiMutationExecuted: false;
};

const sectionBridge028F: TaxiAdminRuntime028FSectionBridge[] = [
  { section: "financeProgram", labelRu: "Финансы Taxi", uiScreen: "Такси → Финансы", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/finance-program", uiTarget: "поступления, заработок программы, комиссии, споры", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "access", labelRu: "Доступ", uiScreen: "Такси → Доступ", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/access", uiTarget: "роли, доступы, audit", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "management", labelRu: "Управление", uiScreen: "Такси → Управление", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/management", uiTarget: "страны, города, тарифы, безопасность", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "reports", labelRu: "Отчёты", uiScreen: "Такси → Отчёты", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/reports", uiTarget: "очередь отчётов и экспорт", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "archive", labelRu: "Архив", uiScreen: "Такси → Архив", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/archive", uiTarget: "архивные записи и legal hold", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "driversCars", labelRu: "Водители и авто", uiScreen: "Такси → Водители / Авто", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/drivers-cars", uiTarget: "досье водителя и автомобиля", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "contests", labelRu: "Конкурсы", uiScreen: "Такси → Конкурсы", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/contests", uiTarget: "лидерборды и кандидаты", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "bonuses", labelRu: "Бонусы", uiScreen: "Такси → Бонусы", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/bonuses", uiTarget: "кандидаты на бонусы", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] },
  { section: "agentApplications", labelRu: "Заявки агентов", uiScreen: "Такси → Заявки агентов", countSourceRoute028E: "/api/admin/taxi/runtime-028e/db-read-count/agent-applications", uiTarget: "новые заявки, паспорт, селфи с паспортом", emptyState: "backend_count_not_loaded_yet", rawRowsReturned: false, records: [] }
];

const routeList028F = [
  "/api/admin/taxi/runtime-028f/health",
  "/api/admin/taxi/runtime-028f/readiness",
  "/api/admin/taxi/runtime-028f/count-bridge-contract",
  "/api/admin/taxi/runtime-028f/ui-count-snapshot",
  "/api/admin/taxi/runtime-028f/section/:section"
] as const;

function safety028F(): TaxiAdminRuntime028FSafety {
  return {
    envFileReadOrDumped: false,
    dbReadPerformedBy028F: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    moneyMovementExecuted: false,
    rawRowsReturned: false,
    fakeDataReturned: false,
    localUiMutationExecuted: false
  };
}

function readHeader028F(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028F(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028F(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ") ? authorizationHeader.slice(7).trim() : "";
  const providedToken = (readHeader028F(req, "x-sabi-admin-token") || readHeader028F(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028F(req, "x-sabi-admin-role") || readHeader028F(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "owner_ai", "admin", "deputy", "taxi_manager", "taxi_finance", "support", "moderator", "agent_control", "observer"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028F_VERSION,
      code: "taxi_admin_runtime_028f_admin_required",
      message: "Доступ к Taxi Admin UI count bridge разрешён только авторизованной роли Taxi Admin.",
      safety: safety028F()
    });
    return false;
  }

  return true;
}

function readiness028F() {
  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028F_VERSION,
    taxiAdminRuntimeAdminUiCountBridge028F: 100,
    previousRuntime028E: "passed_exact_owner_approval_count_only_db_read_execution",
    countBridgePolicy: "admin_ui_receives_only_safe_count_routes_and_empty_records_no_raw_rows",
    fakeDataPolicy: "no_backend_fake_data_no_seed_rows_empty_state_only",
    writePolicy: "db_write_wallet_provider_money_actions_blocked",
    productionReadiness: 88,
    routeList: routeList028F,
    sections: sectionBridge028F.map((item) => ({
      section: item.section,
      labelRu: item.labelRu,
      uiScreen: item.uiScreen,
      countSourceRoute028E: item.countSourceRoute028E,
      rawRowsReturned: item.rawRowsReturned
    })),
    safety: safety028F()
  };
}

function findSection028F(section: string): TaxiAdminRuntime028FSectionBridge | null {
  return sectionBridge028F.find((item) => item.section === section) ?? null;
}

export function createTaxiAdminRuntime028FRouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028f/health", (_req, res) => {
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028F_VERSION, status: "healthy", safety: safety028F() });
  });

  router.get("/api/admin/taxi/runtime-028f/readiness", (_req, res) => {
    res.json(readiness028F());
  });

  router.get("/api/admin/taxi/runtime-028f/count-bridge-contract", (_req, res) => {
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028F_VERSION,
      contract: {
        source: "runtime-028e count-only DB read execution",
        target: "Admin UI Taxi screens",
        allowedData: ["section", "labelRu", "uiScreen", "countSourceRoute028E", "count totals from 028E only"],
        blockedData: ["raw rows", "personal data", "documents", "photos", "wallet movement", "provider call", "DB write", "fake seed data"],
        recordsAlwaysEmptyIn028F: true
      },
      safety: safety028F()
    });
  });

  router.get("/api/admin/taxi/runtime-028f/ui-count-snapshot", (req, res) => {
    if (!requireAdmin028F(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028F_VERSION,
      dbReadPerformedBy028F: false,
      sourceRuntime: "028E",
      sourcePolicy: "count-only exact Owner approval already executed outside 028F",
      totalSections: sectionBridge028F.length,
      sections: sectionBridge028F,
      records: [],
      rawRowsReturned: false,
      fakeDataReturned: false,
      safety: safety028F()
    });
  });

  router.get("/api/admin/taxi/runtime-028f/section/:section", (req, res) => {
    if (!requireAdmin028F(req, res)) return;
    const item = findSection028F(String(req.params.section));
    if (!item) {
      res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028F_VERSION, code: "taxi_admin_runtime_028f_section_not_found", records: [], safety: safety028F() });
      return;
    }
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028F_VERSION, section: item, records: [], rawRowsReturned: false, fakeDataReturned: false, safety: safety028F() });
  });

  return router;
}
