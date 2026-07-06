import type {
  StreamGiftLedgerSchemaApprovalRequest198B,
  StreamGiftLedgerSchemaBoundary198B,
  StreamGiftLedgerSchemaEntity198B,
  StreamGiftLedgerSchemaPlan198B,
  StreamGiftLedgerSchemaPlanningSafety198B,
} from "./streamGiftLedgerSchemaPlanning198B.types";

export const STREAM_GIFT_LEDGER_SCHEMA_198B_VERSION = "BACKEND-STREAM-GIFTS-LEDGER-198B" as const;

export const STREAM_GIFT_LEDGER_SCHEMA_198B_SAFETY: StreamGiftLedgerSchemaPlanningSafety198B = Object.freeze({
  stage: STREAM_GIFT_LEDGER_SCHEMA_198B_VERSION,
  schemaWritePerformedNow: false,
  migrationCreatedNow: false,
  prismaGeneratePerformedNow: false,
  dbReadPerformedNow: false,
  dbWritePerformedNow: false,
  walletMutationAllowedNow: false,
  providerCallAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

export const STREAM_GIFT_LEDGER_SCHEMA_198B_BOUNDARY: StreamGiftLedgerSchemaBoundary198B = Object.freeze({
  currentStage: "planning_only",
  nextStageRequiresSeparateOwnerApproval: true,
  allowedNow: ["source_planning", "readiness_route", "approval_request_template"] as const,
  forbiddenNow: [
    "prisma_schema_write",
    "migration_file_create",
    "prisma_generate",
    "db_read",
    "db_write",
    "wallet_mutation",
    "provider_call",
    "money_movement",
    "payout_execution",
  ] as const,
});

export const STREAM_GIFT_LEDGER_SCHEMA_198B_ENTITIES: readonly StreamGiftLedgerSchemaEntity198B[] = Object.freeze([
  {
    name: "StreamGiftCatalogItem",
    kind: "model",
    purpose: "Server-owned canonical catalog for Stream and Messenger gifts, with 1-10000 diamond price bounds and asset metadata references.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
  {
    name: "StreamGiftSendIntent",
    kind: "model",
    purpose: "Idempotent send request created after auth/provider readiness checks and before append-only ledger entries.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
  {
    name: "StreamGiftLedgerEntry",
    kind: "model",
    purpose: "Append-only ledger record for sender debit authorization, receiver pending credit, platform fee reserve, refund, void, and adjustment rows.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
  {
    name: "StreamGiftCreatorEarning",
    kind: "model",
    purpose: "Creator pending/held/available earning state linked to a verified gift ledger event; available balance is backend-only after settlement.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
  {
    name: "StreamGiftSettlementGate",
    kind: "settlement_gate",
    purpose: "Risk, refund window, tax, KYC/KYB/AML, provider settlement, and Admin approval gates before payout eligibility.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
  {
    name: "StreamGiftProviderReferenceHash",
    kind: "unique_constraint",
    purpose: "Provider references are stored hashed; raw provider tokens/secrets are never stored or returned by gift runtime routes.",
    requiredBeforeRuntime: true,
    mutationAllowedIn198B: false,
  },
]);

export const STREAM_GIFT_LEDGER_SCHEMA_198B_DRAFT = `// BACKEND-STREAM-GIFTS-LEDGER-198B DRAFT ONLY.
// Do not paste into prisma/schema.prisma until 198C exact owner approval.
// No migration, no prisma generate, no DB write in 198B.

enum StreamGiftRuntimeContext {
  STREAM_LIVE
  MESSENGER
  SHORTS
  CREATOR_PROFILE
}

enum StreamGiftSendIntentStatus {
  DRAFT
  PROVIDER_AUTH_REQUIRED
  PROVIDER_AUTHORIZED
  LEDGER_COMMITTED
  BLOCKED
  VOIDED
}

enum StreamGiftLedgerEntryKind {
  SENDER_DEBIT_AUTHORIZATION
  RECEIVER_PENDING_CREDIT
  PLATFORM_FEE_RESERVE
  SETTLEMENT_RELEASE
  REFUND_REVERSAL
  ADMIN_ADJUSTMENT
}

enum StreamGiftCreatorEarningStatus {
  PENDING
  HELD
  AVAILABLE
  PAYOUT_REQUESTED
  PAID
  VOIDED
}

model StreamGiftCatalogItem {
  id String @id
  giftKey String @unique
  title String
  runtimeContext StreamGiftRuntimeContext[]
  diamondPrice Int
  assetId String?
  assetPosterUrl String?
  active Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([active])
  @@index([diamondPrice])
}

model StreamGiftSendIntent {
  id String @id
  context StreamGiftRuntimeContext
  senderUserId String
  receiverUserId String
  roomId String?
  conversationId String?
  giftCatalogItemId String
  quantity Int
  grossDiamondMicros BigInt
  receiverPendingDiamondMicros BigInt
  platformFeeDiamondMicros BigInt
  idempotencyKeyHash String @unique
  providerReferenceHash String?
  status StreamGiftSendIntentStatus @default(DRAFT)
  blockedReasons Json?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([senderUserId, status])
  @@index([receiverUserId, status])
  @@index([roomId])
  @@index([conversationId])
}

model StreamGiftLedgerEntry {
  id String @id
  sendIntentId String
  entryKind StreamGiftLedgerEntryKind
  partyUserId String
  amountDiamondMicros BigInt
  currency String @default("DIAMOND_MICROS")
  idempotencyKeyHash String @unique
  metadata Json?
  createdAt DateTime @default(now())

  @@index([sendIntentId])
  @@index([partyUserId, entryKind])
  @@index([createdAt])
}

model StreamGiftCreatorEarning {
  id String @id
  creatorUserId String
  sendIntentId String
  ledgerEntryId String
  pendingDiamondMicros BigInt
  availableDiamondMicros BigInt @default(0)
  status StreamGiftCreatorEarningStatus @default(PENDING)
  holdReasons Json?
  payoutEligible Boolean @default(false)
  payoutExecutionAllowed Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([creatorUserId, status])
  @@index([sendIntentId])
}
`;

export function assertStreamGiftLedgerSchemaPlanning198BRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_SCHEMA_198B_SAFETY;
  const unsafe = [
    safety.schemaWritePerformedNow,
    safety.migrationCreatedNow,
    safety.prismaGeneratePerformedNow,
    safety.dbReadPerformedNow,
    safety.dbWritePerformedNow,
    safety.walletMutationAllowedNow,
    safety.providerCallAllowedNow,
    safety.moneyMovementAllowedNow,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ].some(Boolean);

  if (unsafe) {
    throw new Error("STREAM_GIFT_LEDGER_SCHEMA_198B_UNSAFE_FLAG");
  }
}

export function getStreamGiftLedgerSchemaPlan198B(): StreamGiftLedgerSchemaPlan198B {
  assertStreamGiftLedgerSchemaPlanning198BRemainsSafe();

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_SCHEMA_198B_VERSION,
    status: "schema_planning_ready_no_prisma_write",
    safety: STREAM_GIFT_LEDGER_SCHEMA_198B_SAFETY,
    boundary: STREAM_GIFT_LEDGER_SCHEMA_198B_BOUNDARY,
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
    proposedEntities: STREAM_GIFT_LEDGER_SCHEMA_198B_ENTITIES,
    proposedSchemaDraft: STREAM_GIFT_LEDGER_SCHEMA_198B_DRAFT,
    nextStage: "198C_controlled_prisma_schema_write_request",
  };
}

export function createStreamGiftLedgerSchemaApprovalRequest198B(): StreamGiftLedgerSchemaApprovalRequest198B {
  assertStreamGiftLedgerSchemaPlanning198BRemainsSafe();

  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_SCHEMA_198B_VERSION,
    status: "blocked_until_exact_owner_approval",
    code: "schema_write_requires_separate_approval",
    requestedNextStage: "198C_controlled_prisma_schema_write",
    safety: STREAM_GIFT_LEDGER_SCHEMA_198B_SAFETY,
    requiredApprovalText:
      "I approve BACKEND-STREAM-GIFTS-LEDGER-198C controlled Prisma schema source write for gift ledger models only, no migration, no prisma generate, no DB read/write, no Wallet mutation, no provider call, no money movement, no payout, no raw secrets or purchase tokens.",
    willNotDoNow: [
      "No edit to prisma/schema.prisma in 198B.",
      "No migration file creation in 198B.",
      "No prisma generate in 198B.",
      "No DB read/write in 198B.",
      "No Wallet mutation or provider call in 198B.",
    ],
  };
}
