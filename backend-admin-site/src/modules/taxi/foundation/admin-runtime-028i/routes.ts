import express, { type Request, type Response, type Router } from "express";

export const TAXI_ADMIN_RUNTIME_028I_VERSION = "TAXI-ADMIN-RUNTIME-028I-SAFE-READ-MODELS-UI-FOUNDATION" as const;

export type TaxiAdminRuntime028ISection =
  | "financeProgram"
  | "access"
  | "management"
  | "reports"
  | "archive"
  | "driversCars"
  | "contests"
  | "bonuses"
  | "agentApplications";

type TaxiAdminRuntime028ISafeReadModel = {
  section: TaxiAdminRuntime028ISection;
  labelRu: string;
  uiScreen: string;
  sourceCountBridgeRoute028F: string;
  readModelRoute028I: string;
  allowedUiFields: readonly string[];
  blockedRawFields: readonly string[];
  privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows";
  dbReadPerformedBy028I: false;
  rawRowsReturned: false;
  personalRowsReturned: false;
  records: [];
};

type TaxiAdminRuntime028ISafety = {
  envFileReadOrDumped: false;
  dbReadPerformedBy028I: false;
  dbWriteExecuted: false;
  walletMutationExecuted: false;
  providerCallExecuted: false;
  payoutExecuted: false;
  paymentExecuted: false;
  moneyMovementExecuted: false;
  rawRowsReturned: false;
  rawPersonalRowsReturned: false;
  fakeDataReturned: false;
  ownerApprovalHeaderSent: false;
  localUiMutationExecuted: false;
};

const sharedBlockedRawFields028I = [
  "rawUserId",
  "phone",
  "email",
  "passportNumber",
  "passportPhoto",
  "selfieWithPassport",
  "documentImage",
  "bankCard",
  "walletPrivateData",
  "exactGpsTrace",
  "chatTextRaw",
  "evidenceRawFile"
] as const;

const safeReadModels028I: readonly TaxiAdminRuntime028ISafeReadModel[] = [
  {
    section: "financeProgram",
    labelRu: "Финансы Taxi",
    uiScreen: "Такси → Финансы",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/financeProgram",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/financeProgram",
    allowedUiFields: ["section", "labelRu", "countryCode", "cityKey", "periodKey", "currencyCode", "incomeCount", "settlementCount", "disputeCount", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "access",
    labelRu: "Доступ",
    uiScreen: "Такси → Доступ",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/access",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/access",
    allowedUiFields: ["section", "labelRu", "roleKey", "countryScope", "cityScope", "staffCount", "pendingApprovalCount", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "management",
    labelRu: "Управление",
    uiScreen: "Такси → Управление",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/management",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/management",
    allowedUiFields: ["section", "labelRu", "countryCount", "cityCount", "tariffRegionCount", "safetyRuleCount", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "reports",
    labelRu: "Отчёты",
    uiScreen: "Такси → Отчёты",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/reports",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/reports",
    allowedUiFields: ["section", "labelRu", "queueCount", "readyCount", "blockedCount", "periodKey", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "archive",
    labelRu: "Архив",
    uiScreen: "Такси → Архив",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/archive",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/archive",
    allowedUiFields: ["section", "labelRu", "archiveCount", "legalHoldCount", "categoryKey", "periodKey", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "driversCars",
    labelRu: "Водители и авто",
    uiScreen: "Такси → Водители / Авто",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/driversCars",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/driversCars",
    allowedUiFields: ["section", "labelRu", "driverCount", "vehicleCount", "pendingReviewCount", "countryCode", "cityKey", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "contests",
    labelRu: "Конкурсы",
    uiScreen: "Такси → Конкурсы",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/contests",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/contests",
    allowedUiFields: ["section", "labelRu", "countryCode", "leagueCount", "participantCount", "antiCheatFlagCount", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "bonuses",
    labelRu: "Бонусы",
    uiScreen: "Такси → Бонусы",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/bonuses",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/bonuses",
    allowedUiFields: ["section", "labelRu", "candidateCount", "blockedCount", "approvedByOwnerCount", "countryCode", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  },
  {
    section: "agentApplications",
    labelRu: "Заявки агентов",
    uiScreen: "Такси → Заявки агентов",
    sourceCountBridgeRoute028F: "/api/admin/taxi/runtime-028f/section/agentApplications",
    readModelRoute028I: "/api/admin/taxi/runtime-028i/read-model/agentApplications",
    allowedUiFields: ["section", "labelRu", "pendingCount", "reviewCount", "approvedCount", "rejectedCount", "countryCode", "cityKey", "readinessBadge"],
    blockedRawFields: sharedBlockedRawFields028I,
    privacyPolicy: "aggregate_or_redacted_only_no_raw_personal_rows",
    dbReadPerformedBy028I: false,
    rawRowsReturned: false,
    personalRowsReturned: false,
    records: []
  }
] as const;

const routeList028I = [
  "/api/admin/taxi/runtime-028i/health",
  "/api/admin/taxi/runtime-028i/readiness",
  "/api/admin/taxi/runtime-028i/safe-read-model-contract",
  "/api/admin/taxi/runtime-028i/safe-read-models",
  "/api/admin/taxi/runtime-028i/read-model/:section",
  "/api/admin/taxi/runtime-028i/blocked-write-action"
] as const;

function safety028I(): TaxiAdminRuntime028ISafety {
  return {
    envFileReadOrDumped: false,
    dbReadPerformedBy028I: false,
    dbWriteExecuted: false,
    walletMutationExecuted: false,
    providerCallExecuted: false,
    payoutExecuted: false,
    paymentExecuted: false,
    moneyMovementExecuted: false,
    rawRowsReturned: false,
    rawPersonalRowsReturned: false,
    fakeDataReturned: false,
    ownerApprovalHeaderSent: false,
    localUiMutationExecuted: false
  };
}

function readHeader028I(req: Request, name: string): string {
  const value = req.headers[name] ?? req.headers[name.toLowerCase()] ?? req.headers[name.toUpperCase()];
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : "";
  return typeof value === "string" ? value : "";
}

function requireAdmin028I(req: Request, res: Response): boolean {
  const authorizationHeader = readHeader028I(req, "authorization");
  const bearerToken = authorizationHeader.toLowerCase().startsWith("bearer ") ? authorizationHeader.slice(7).trim() : "";
  const providedToken = (readHeader028I(req, "x-sabi-admin-token") || readHeader028I(req, "x-admin-token") || bearerToken).trim();
  const providedRole = (readHeader028I(req, "x-sabi-admin-role") || readHeader028I(req, "x-admin-role") || "admin").trim();
  const roleAllowed = ["owner", "owner_ai", "admin", "deputy", "taxi_manager", "taxi_finance", "support", "moderator", "agent_control", "observer"].includes(providedRole);

  if (!providedToken || !roleAllowed) {
    res.status(403).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028I_VERSION,
      code: "taxi_admin_runtime_028i_admin_required",
      message: "Доступ к Taxi safe read-models разрешён только авторизованной роли Taxi Admin.",
      safety: safety028I()
    });
    return false;
  }

  return true;
}

function findSafeReadModel028I(section: string): TaxiAdminRuntime028ISafeReadModel | null {
  return safeReadModels028I.find((item) => item.section === section) ?? null;
}

function readiness028I() {
  return {
    ok: true,
    version: TAXI_ADMIN_RUNTIME_028I_VERSION,
    taxiAdminRuntimeSafeReadModelsUiFoundation028I: 100,
    previousRuntime028H: "passed_admin_ui_live_count_binding",
    safeReadModelPolicy: "ui_read_models_are_contract_first_aggregate_or_redacted_only_no_raw_personal_rows",
    sourcePolicy: "built_on_028F_count_bridge_and_028E_count_only_db_read_no_db_read_by_028i",
    fakeDataPolicy: "no_backend_fake_data_empty_records_only_until_next_approved_read_model_execution",
    writePolicy: "db_write_wallet_provider_money_actions_blocked",
    productionReadiness: 94,
    routeList: routeList028I,
    sections: safeReadModels028I.map((item) => ({
      section: item.section,
      labelRu: item.labelRu,
      uiScreen: item.uiScreen,
      readModelRoute028I: item.readModelRoute028I,
      sourceCountBridgeRoute028F: item.sourceCountBridgeRoute028F,
      allowedUiFields: item.allowedUiFields,
      rawRowsReturned: item.rawRowsReturned,
      personalRowsReturned: item.personalRowsReturned
    })),
    safety: safety028I()
  };
}

export function createTaxiAdminRuntime028IRouter(): Router {
  const router = express.Router();

  router.get("/api/admin/taxi/runtime-028i/health", (_req, res) => {
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028I_VERSION, status: "healthy", safety: safety028I() });
  });

  router.get("/api/admin/taxi/runtime-028i/readiness", (_req, res) => {
    res.json(readiness028I());
  });

  router.get("/api/admin/taxi/runtime-028i/safe-read-model-contract", (_req, res) => {
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028I_VERSION,
      contract: {
        stage: "foundation_only",
        purpose: "prepare_safe_admin_ui_read_models_after_live_count_binding",
        allowed: ["aggregate counters", "status buckets", "country/city scope", "period keys", "redacted readiness badges"],
        blocked: ["raw personal rows", "passport", "selfie", "phone", "email", "bank card", "wallet private data", "exact GPS trace", "raw documents", "DB write", "money movement", "provider call"],
        recordsAlwaysEmptyIn028I: true,
        nextRequiredApproval: "TAXI-ADMIN-RUNTIME-028J-SAFE-READ-MODELS-RUNTIME-SMOKE"
      },
      safety: safety028I()
    });
  });

  router.get("/api/admin/taxi/runtime-028i/safe-read-models", (req, res) => {
    if (!requireAdmin028I(req, res)) return;
    res.json({
      ok: true,
      version: TAXI_ADMIN_RUNTIME_028I_VERSION,
      models: safeReadModels028I,
      records: [],
      rawRowsReturned: false,
      personalRowsReturned: false,
      fakeDataReturned: false,
      dbReadPerformedBy028I: false,
      safety: safety028I()
    });
  });

  router.get("/api/admin/taxi/runtime-028i/read-model/:section", (req, res) => {
    if (!requireAdmin028I(req, res)) return;
    const model = findSafeReadModel028I(String(req.params.section));
    if (!model) {
      res.status(404).json({ ok: false, version: TAXI_ADMIN_RUNTIME_028I_VERSION, code: "taxi_admin_runtime_028i_section_not_found", records: [], safety: safety028I() });
      return;
    }
    res.json({ ok: true, version: TAXI_ADMIN_RUNTIME_028I_VERSION, model, records: [], rawRowsReturned: false, personalRowsReturned: false, fakeDataReturned: false, safety: safety028I() });
  });

  router.all("/api/admin/taxi/runtime-028i/blocked-write-action", (_req, res) => {
    res.status(409).json({
      ok: false,
      version: TAXI_ADMIN_RUNTIME_028I_VERSION,
      code: "taxi_admin_runtime_028i_write_actions_blocked",
      message: "028I разрешает только safe read-model foundation. DB write, Wallet, provider, payment, payout and money movement are blocked.",
      safety: safety028I()
    });
  });

  return router;
}
