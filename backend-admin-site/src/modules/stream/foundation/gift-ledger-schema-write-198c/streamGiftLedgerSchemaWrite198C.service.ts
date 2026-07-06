import type {
  StreamGiftLedgerSchemaModel198C,
  StreamGiftLedgerSchemaWriteApprovalRequest198C,
  StreamGiftLedgerSchemaWriteBoundary198C,
  StreamGiftLedgerSchemaWriteReadiness198C,
  StreamGiftLedgerSchemaWriteSafety198C,
} from "./streamGiftLedgerSchemaWrite198C.types";

export const STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198C" as const;

export const STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_SAFETY: StreamGiftLedgerSchemaWriteSafety198C = Object.freeze({
  stage: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_VERSION,
  prismaSchemaSourceWritePerformedNow: true,
  migrationCreatedNow: false,
  prismaGeneratePerformedNow: false,
  prismaValidatePerformedNow: false,
  dbReadPerformedNow: false,
  dbWritePerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawSecretReadAllowed: false,
  rawPurchaseTokenOutputAllowed: false,
});

export const STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_BOUNDARY: StreamGiftLedgerSchemaWriteBoundary198C = Object.freeze({
  currentStage: "controlled_prisma_schema_source_write_only",
  allowedNow: ["prisma_schema_source_write", "readiness_route", "schema_presence_static_check"] as const,
  forbiddenNow: [
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
  ] as const,
  nextStageRequiresSeparateOwnerApproval: true,
});

export const STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MODELS: readonly StreamGiftLedgerSchemaModel198C[] = Object.freeze([
  {
    name: "StreamGiftRuntimeContext",
    kind: "enum",
    purpose: "Shared context for Stream live, Messenger, Shorts, and creator profile gift surfaces.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftSendIntentStatus",
    kind: "enum",
    purpose: "Lifecycle for a gift send intent before any append-only ledger commit is allowed.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftLedgerEntryKind",
    kind: "enum",
    purpose: "Append-only entry kinds for sender authorization, receiver pending credit, fee reserve, release, refund, void, and admin adjustment.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftCreatorEarningStatus",
    kind: "enum",
    purpose: "Creator earning status from pending to held, available, payout requested, paid, or voided.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftSettlementGateKind",
    kind: "enum",
    purpose: "Settlement gate categories for provider, refund, risk, compliance, tax, KYC/KYB/AML, age, region, and Admin approval.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftCatalogItem",
    kind: "model",
    purpose: "Server-owned canonical 80 gift catalog source for Stream and Messenger with 1-10000 diamond price bounds.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftSendIntent",
    kind: "model",
    purpose: "Idempotent gift send request; it does not mean success until provider/funding and ledger commit pass.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftLedgerEntry",
    kind: "model",
    purpose: "Append-only gift ledger rows for sender debit authorization, receiver pending credit, platform fee reserve, release, refund, void, or adjustment.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftCreatorEarning",
    kind: "model",
    purpose: "Creator pending/available earning state; available remains backend-only after settlement gates.",
    sourceWrittenIn198C: true,
  },
  {
    name: "StreamGiftSettlementGate",
    kind: "model",
    purpose: "Risk, refund, provider settlement, compliance, tax, identity, region, and Admin gates before available balance or payout.",
    sourceWrittenIn198C: true,
  },
]);

export const STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MARKERS = [
  "BACKEND-STREAM-GIFTS-LEDGER-198C CONTROLLED SCHEMA SOURCE WRITE START",
  "enum StreamGiftRuntimeContext",
  "enum StreamGiftSendIntentStatus",
  "enum StreamGiftLedgerEntryKind",
  "enum StreamGiftCreatorEarningStatus",
  "enum StreamGiftSettlementGateKind",
  "model StreamGiftCatalogItem",
  "model StreamGiftSendIntent",
  "model StreamGiftLedgerEntry",
  "model StreamGiftCreatorEarning",
  "model StreamGiftSettlementGate",
  "BACKEND-STREAM-GIFTS-LEDGER-198C CONTROLLED SCHEMA SOURCE WRITE END",
] as const;

export function assertStreamGiftLedgerSchemaWrite198CRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_SAFETY;
  const unsafe = [
    safety.migrationCreatedNow,
    safety.prismaGeneratePerformedNow,
    safety.prismaValidatePerformedNow,
    safety.dbReadPerformedNow,
    safety.dbWritePerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawSecretReadAllowed,
    safety.rawPurchaseTokenOutputAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_UNSAFE_RUNTIME_FLAG");
  }
}

export function getStreamGiftLedgerSchemaWriteReadiness198C(): StreamGiftLedgerSchemaWriteReadiness198C {
  assertStreamGiftLedgerSchemaWrite198CRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_VERSION,
    status: "prisma_schema_source_written_no_migration_no_generate",
    safety: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_SAFETY,
    boundary: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_BOUNDARY,
    economyPolicy: {
      diamondUnit: "diamond_micros",
      giftPriceMinDiamonds: 1,
      giftPriceMaxDiamonds: 10000,
      receiverShareBps: 7000,
      platformComplianceFeeBps: 3000,
      basisPointsDenominator: 10000,
      minimumTopUpCoins: 10,
      minimumTopUpUsdCents: 1000,
    },
    schemaModels: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MODELS,
    schemaPresenceMarkers: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_MARKERS,
    nextStage: "198D_prisma_schema_validate_and_generate_planning",
  };
}

export function createStreamGiftLedgerSchemaWriteApprovalRequest198C(): StreamGiftLedgerSchemaWriteApprovalRequest198C {
  assertStreamGiftLedgerSchemaWrite198CRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_VERSION,
    status: "blocked_until_next_exact_owner_approval",
    code: "prisma_validate_generate_requires_separate_approval",
    requestedNextStage: "198D_prisma_schema_validate_and_generate_planning",
    safety: STREAM_GIFT_LEDGER_SCHEMA_WRITE_198C_SAFETY,
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198D Prisma schema validation and generate planning/readiness only after 198C schema source write, no migration, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "No migration is created in 198C.",
      "No prisma generate is run in 198C.",
      "No database read or write is performed in 198C.",
      "No Wallet mutation, provider call, payout, fake gift send, or fake available balance is enabled in 198C.",
    ],
  };
}
