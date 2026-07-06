export type StreamGiftLedgerSchemaPlanningSafety198B = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198B";
  schemaWritePerformedNow: false;
  migrationCreatedNow: false;
  prismaGeneratePerformedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
}>;

export type StreamGiftLedgerSchemaEntityKind198B =
  | "enum"
  | "model"
  | "relation"
  | "index"
  | "unique_constraint"
  | "settlement_gate";

export type StreamGiftLedgerSchemaEntity198B = Readonly<{
  name: string;
  kind: StreamGiftLedgerSchemaEntityKind198B;
  purpose: string;
  requiredBeforeRuntime: true;
  mutationAllowedIn198B: false;
}>;

export type StreamGiftLedgerSchemaBoundary198B = Readonly<{
  currentStage: "planning_only";
  nextStageRequiresSeparateOwnerApproval: true;
  allowedNow: readonly ["source_planning", "readiness_route", "approval_request_template"];
  forbiddenNow: readonly [
    "prisma_schema_write",
    "migration_file_create",
    "prisma_generate",
    "db_read",
    "db_write",
    "wallet_mutation",
    "provider_call",
    "money_movement",
    "payout_execution",
  ];
}>;

export type StreamGiftLedgerSchemaPlan198B = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198B";
  status: "schema_planning_ready_no_prisma_write";
  safety: StreamGiftLedgerSchemaPlanningSafety198B;
  boundary: StreamGiftLedgerSchemaBoundary198B;
  economyPolicy: Readonly<{
    diamondUnit: "diamond_micros";
    giftPriceMinDiamonds: 1;
    giftPriceMaxDiamonds: 10000;
    receiverShareBps: 7000;
    platformComplianceFeeBps: 3000;
    basisPointsDenominator: 10000;
    minimumTopUpCoins: 10;
    minimumTopUpUsdCents: 1000;
  }>;
  proposedEntities: readonly StreamGiftLedgerSchemaEntity198B[];
  proposedSchemaDraft: string;
  nextStage: "198C_controlled_prisma_schema_write_request";
}>;

export type StreamGiftLedgerSchemaApprovalRequest198B = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198B";
  status: "blocked_until_exact_owner_approval";
  code: "schema_write_requires_separate_approval";
  requestedNextStage: "198C_controlled_prisma_schema_write";
  safety: StreamGiftLedgerSchemaPlanningSafety198B;
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
