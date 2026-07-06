export type StreamGiftLedgerSchemaWriteSafety198C = Readonly<{
  stage: "BACKEND-STREAM-GIFTS-LEDGER-198C";
  prismaSchemaSourceWritePerformedNow: true;
  migrationCreatedNow: false;
  prismaGeneratePerformedNow: false;
  prismaValidatePerformedNow: false;
  dbReadPerformedNow: false;
  dbWritePerformedNow: false;
  walletMutationAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  payoutExecutionAllowedNow: false;
  fakeGiftSendSuccessAllowed: false;
  fakeAvailableBalanceAllowed: false;
  rawSecretReadAllowed: false;
  rawPurchaseTokenOutputAllowed: false;
}>;

export type StreamGiftLedgerSchemaWriteBoundary198C = Readonly<{
  currentStage: "controlled_prisma_schema_source_write_only";
  allowedNow: readonly ["prisma_schema_source_write", "readiness_route", "schema_presence_static_check"];
  forbiddenNow: readonly [
    "migration_file_create",
    "prisma_generate",
    "prisma_validate_with_env",
    "db_read",
    "db_write",
    "wallet_mutation",
    "provider_call",
    "money_movement",
    "payout_execution",
    "raw_secret_read",
    "raw_purchase_token_output",
  ];
  nextStageRequiresSeparateOwnerApproval: true;
}>;

export type StreamGiftLedgerSchemaModel198C = Readonly<{
  name: string;
  kind: "enum" | "model";
  purpose: string;
  sourceWrittenIn198C: true;
}>;

export type StreamGiftLedgerSchemaWriteReadiness198C = Readonly<{
  ok: true;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198C";
  status: "prisma_schema_source_written_no_migration_no_generate";
  safety: StreamGiftLedgerSchemaWriteSafety198C;
  boundary: StreamGiftLedgerSchemaWriteBoundary198C;
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
  schemaModels: readonly StreamGiftLedgerSchemaModel198C[];
  schemaPresenceMarkers: readonly string[];
  nextStage: "198D_prisma_schema_validate_and_generate_planning";
}>;

export type StreamGiftLedgerSchemaWriteApprovalRequest198C = Readonly<{
  ok: false;
  version: "BACKEND-STREAM-GIFTS-LEDGER-198C";
  status: "blocked_until_next_exact_owner_approval";
  code: "prisma_validate_generate_requires_separate_approval";
  requestedNextStage: "198D_prisma_schema_validate_and_generate_planning";
  safety: StreamGiftLedgerSchemaWriteSafety198C;
  requiredApprovalText: string;
  willNotDoNow: readonly string[];
}>;
