import {
  type SabiRequiredPaymentRail,
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type SabiPurchasePurpose,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type SabiPurchasePlatform,
  type SabiPurchaseTargetKind,
} from "./stream-purchase-purpose-classifier.contracts";
import {
  type StreamLedgerEntryKind,
  type StreamLedgerDirection,
  type StreamLedgerPartyKind,
} from "./stream-append-only-ledger.contracts";
import {
  type StreamGooglePurchaseProductType,
  type StreamGooglePurchaseVerificationStatus,
} from "./stream-google-purchase-verification.contracts";

export const STREAM_DB_SCHEMA_PLANNING_VERSION = "BACKEND-STREAM-FOUNDATION-141K" as const;

export type StreamDbPlannedTableName =
  | "StreamPurchaseIntent"
  | "StreamPurchaseClassification"
  | "StreamGooglePurchaseVerification"
  | "StreamAppendOnlyLedgerEntry"
  | "StreamLedgerHold"
  | "StreamCreatorEarningState"
  | "StreamMerchantSettlementState"
  | "StreamRefundVoidAdjustment"
  | "StreamIdempotencyKey"
  | "StreamProviderGateSnapshot";

export type StreamDbPlannedColumnKind =
  | "id"
  | "string"
  | "enum"
  | "decimal_minor_string"
  | "boolean"
  | "json"
  | "datetime"
  | "hash_only"
  | "foreign_key";

export type StreamDbPlannedColumn = Readonly<{
  name: string;
  kind: StreamDbPlannedColumnKind;
  nullable: boolean;
  unique: boolean;
  indexed: boolean;
  rawSecretAllowed: false;
  rawPurchaseTokenAllowed: false;
  notes: string;
}>;

export type StreamDbPlannedIndex = Readonly<{
  name: string;
  fields: readonly string[];
  unique: boolean;
  purpose: string;
}>;

export type StreamDbPlannedTable = Readonly<{
  version: typeof STREAM_DB_SCHEMA_PLANNING_VERSION;
  tableName: StreamDbPlannedTableName;
  appendOnly: boolean;
  updateAllowedByDefault: false;
  deleteAllowedByDefault: false;
  storesRawSecrets: false;
  storesRawPurchaseTokens: false;
  createsSpendableBalanceImmediately: false;
  createsWithdrawableBalanceImmediately: false;
  runtimeWriteAllowedNow: false;
  prismaMigrationAllowedNow: false;
  columns: readonly StreamDbPlannedColumn[];
  indexes: readonly StreamDbPlannedIndex[];
  notes: string;
}>;

export type StreamDbSchemaPlanningSnapshot = Readonly<{
  version: typeof STREAM_DB_SCHEMA_PLANNING_VERSION;
  sourceOnly: true;
  prismaSchemaWriteAllowedNow: false;
  schemaMigrationAllowedNow: false;
  prismaGenerateAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretStorageAllowed: false;
  rawPurchaseTokenStorageAllowed: false;
  tables: readonly StreamDbPlannedTable[];
}>;

function column(
  name: string,
  kind: StreamDbPlannedColumnKind,
  notes: string,
  options: Partial<Pick<StreamDbPlannedColumn, "nullable" | "unique" | "indexed">> = {},
): StreamDbPlannedColumn {
  return {
    name,
    kind,
    nullable: options.nullable ?? false,
    unique: options.unique ?? false,
    indexed: options.indexed ?? false,
    rawSecretAllowed: false,
    rawPurchaseTokenAllowed: false,
    notes,
  };
}

function index(name: string, fields: readonly string[], unique: boolean, purpose: string): StreamDbPlannedIndex {
  return { name, fields, unique, purpose };
}

function table(
  tableName: StreamDbPlannedTableName,
  appendOnly: boolean,
  columns: readonly StreamDbPlannedColumn[],
  indexes: readonly StreamDbPlannedIndex[],
  notes: string,
): StreamDbPlannedTable {
  return {
    version: STREAM_DB_SCHEMA_PLANNING_VERSION,
    tableName,
    appendOnly,
    updateAllowedByDefault: false,
    deleteAllowedByDefault: false,
    storesRawSecrets: false,
    storesRawPurchaseTokens: false,
    createsSpendableBalanceImmediately: false,
    createsWithdrawableBalanceImmediately: false,
    runtimeWriteAllowedNow: false,
    prismaMigrationAllowedNow: false,
    columns,
    indexes,
    notes,
  };
}

export type StreamDbSchemaPlanningTypedReferences = Readonly<{
  bucket: SabiValueLedgerBucket;
  rail: SabiRequiredPaymentRail;
  purpose: SabiPurchasePurpose;
  platform: SabiPurchasePlatform;
  targetKind: SabiPurchaseTargetKind;
  ledgerEntryKind: StreamLedgerEntryKind;
  ledgerDirection: StreamLedgerDirection;
  partyKind: StreamLedgerPartyKind;
  googleProductType: StreamGooglePurchaseProductType;
  googleVerificationStatus: StreamGooglePurchaseVerificationStatus;
}>;

export const STREAM_DB_SCHEMA_PLANNED_TABLES: readonly StreamDbPlannedTable[] = [
  table(
    "StreamPurchaseIntent",
    false,
    [
      column("id", "id", "Stable purchase intent id."),
      column("userId", "string", "Buyer/user id.", { indexed: true }),
      column("sku", "string", "Classified product SKU.", { indexed: true }),
      column("platform", "enum", "Purchase platform such as android."),
      column("purchasePurpose", "enum", "Classified purchase purpose."),
      column("targetKind", "enum", "Physical, digital, creator or merchant target."),
      column("idempotencyKey", "string", "Required idempotency key.", { unique: true }),
      column("status", "enum", "Intent state; no money movement by itself.", { indexed: true }),
      column("createdAt", "datetime", "Creation timestamp."),
      column("updatedAt", "datetime", "Status timestamp only; no balance overwrite."),
    ],
    [
      index("StreamPurchaseIntent_user_status_idx", ["userId", "status"], false, "Find user purchase intents by state."),
      index("StreamPurchaseIntent_idempotency_key_uq", ["idempotencyKey"], true, "Block duplicate purchase intent creation."),
    ],
    "Purchase intent can update only status metadata in future controlled runtime; it must not credit balances or deliver entitlements by itself.",
  ),
  table(
    "StreamPurchaseClassification",
    true,
    [
      column("id", "id", "Append-only classification row id."),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("classifierVersion", "string", "Classifier version."),
      column("decisionStatus", "enum", "Classifier decision status."),
      column("requiredRail", "enum", "Required payment rail."),
      column("ledgerBucket", "enum", "Target ledger bucket."),
      column("hardBlockReasons", "json", "Hard-block reasons if blocked."),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamPurchaseClassification_intent_idx", ["purchaseIntentId"], false, "Trace all classification decisions."),
    ],
    "Classification is append-only so changed decisions create new evidence rows instead of overwriting history.",
  ),
  table(
    "StreamGooglePurchaseVerification",
    true,
    [
      column("id", "id", "Append-only verification row id."),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("sku", "string", "Google Play SKU.", { indexed: true }),
      column("productType", "enum", "One-time product or subscription."),
      column("packageName", "string", "Android package name."),
      column("purchaseTokenHash", "hash_only", "Hash only; raw purchase token must not be stored.", { indexed: true }),
      column("verificationStatus", "enum", "Verification status."),
      column("acknowledgementStatus", "enum", "Acknowledgement/consume state."),
      column("providerResponseMetadata", "json", "Redacted metadata only; no raw secrets/tokens.", { nullable: true }),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamGooglePurchaseVerification_token_hash_idx", ["purchaseTokenHash"], false, "Trace token hash without storing raw token."),
      index("StreamGooglePurchaseVerification_intent_idx", ["purchaseIntentId"], false, "Trace verification by purchase intent."),
    ],
    "Google purchase verification stores token hashes and redacted metadata only; raw tokens and provider secrets are forbidden.",
  ),
  table(
    "StreamAppendOnlyLedgerEntry",
    true,
    [
      column("id", "id", "Append-only ledger row id."),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("entryKind", "enum", "Ledger entry kind.", { indexed: true }),
      column("direction", "enum", "Debit/credit/hold/release/adjustment/informational."),
      column("sourceBucket", "enum", "Source ledger bucket.", { indexed: true }),
      column("targetBucket", "enum", "Target ledger bucket.", { indexed: true }),
      column("requiredRail", "enum", "Required rail."),
      column("partyKind", "enum", "User, creator, merchant, platform, Google, provider, reserve, system."),
      column("amountMinor", "decimal_minor_string", "Minor-unit amount as string to avoid float errors."),
      column("currency", "string", "Currency code."),
      column("idempotencyKey", "string", "Ledger idempotency key.", { unique: true }),
      column("metadata", "json", "Redacted metadata only.", { nullable: true }),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamAppendOnlyLedgerEntry_intent_idx", ["purchaseIntentId"], false, "Trace ledger entries by purchase intent."),
      index("StreamAppendOnlyLedgerEntry_idempotency_key_uq", ["idempotencyKey"], true, "Block duplicate ledger rows."),
      index("StreamAppendOnlyLedgerEntry_bucket_idx", ["sourceBucket", "targetBucket"], false, "Review bucket movement without mixing balances."),
    ],
    "Core append-only ledger table. Future runtime must add adjustment rows instead of updating or deleting existing rows.",
  ),
  table(
    "StreamLedgerHold",
    true,
    [
      column("id", "id", "Append-only hold row id."),
      column("ledgerEntryId", "foreign_key", "Ledger row reference.", { indexed: true }),
      column("holdKind", "enum", "Refund, chargeback, compliance, fraud, provider settlement, tax."),
      column("holdStatus", "enum", "Applied, reviewed, released, rejected."),
      column("amountMinor", "decimal_minor_string", "Held amount minor string."),
      column("currency", "string", "Currency code."),
      column("reason", "string", "Human/admin reason."),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamLedgerHold_entry_idx", ["ledgerEntryId"], false, "Trace holds by ledger row."),
      index("StreamLedgerHold_status_idx", ["holdStatus"], false, "Admin review of active holds."),
    ],
    "Holds are append-only evidence; payable release requires separate release entries later.",
  ),
  table(
    "StreamCreatorEarningState",
    true,
    [
      column("id", "id", "Append-only creator earning row id."),
      column("creatorId", "string", "Creator/streamer id.", { indexed: true }),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("stateKind", "enum", "Pending, held, payable, adjusted."),
      column("amountMinor", "decimal_minor_string", "Amount minor string."),
      column("currency", "string", "Currency code."),
      column("blockedReasons", "json", "Reasons preventing payable release.", { nullable: true }),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamCreatorEarningState_creator_state_idx", ["creatorId", "stateKind"], false, "Review creator earnings by state."),
    ],
    "Creator earning state is append-only and stays separate from merchant settlement.",
  ),
  table(
    "StreamMerchantSettlementState",
    true,
    [
      column("id", "id", "Append-only merchant settlement row id."),
      column("merchantId", "string", "Merchant id.", { indexed: true }),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("stateKind", "enum", "Pending, held, payable, adjusted."),
      column("amountMinor", "decimal_minor_string", "Amount minor string."),
      column("currency", "string", "Currency code."),
      column("kybAmlState", "enum", "KYB/AML state."),
      column("blockedReasons", "json", "Reasons preventing settlement release.", { nullable: true }),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamMerchantSettlementState_merchant_state_idx", ["merchantId", "stateKind"], false, "Review merchant settlement by state."),
    ],
    "Merchant settlement is append-only and must not mix with creator payout or digital coin buckets.",
  ),
  table(
    "StreamRefundVoidAdjustment",
    true,
    [
      column("id", "id", "Append-only adjustment row id."),
      column("purchaseIntentId", "foreign_key", "Purchase intent reference.", { indexed: true }),
      column("adjustmentKind", "enum", "Refund, void, chargeback, subscription cancellation."),
      column("sourceReferenceHash", "hash_only", "External reference hash only if needed."),
      column("amountMinor", "decimal_minor_string", "Adjustment amount minor string."),
      column("currency", "string", "Currency code."),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamRefundVoidAdjustment_intent_idx", ["purchaseIntentId"], false, "Trace refund/void/chargeback adjustment by intent."),
    ],
    "Refunds, voids and chargebacks are represented as append-only adjustment evidence.",
  ),
  table(
    "StreamIdempotencyKey",
    false,
    [
      column("id", "id", "Idempotency row id."),
      column("scope", "string", "Idempotency scope.", { indexed: true }),
      column("keyHash", "hash_only", "Hash of idempotency key.", { unique: true }),
      column("status", "enum", "Reserved, completed, blocked, expired."),
      column("createdAt", "datetime", "Creation timestamp."),
      column("expiresAt", "datetime", "Expiry timestamp.", { indexed: true }),
    ],
    [
      index("StreamIdempotencyKey_key_hash_uq", ["keyHash"], true, "Block duplicate processing."),
      index("StreamIdempotencyKey_scope_status_idx", ["scope", "status"], false, "Review idempotency state."),
    ],
    "Idempotency key table may update status only under future controlled runtime; it must not store raw keys.",
  ),
  table(
    "StreamProviderGateSnapshot",
    true,
    [
      column("id", "id", "Append-only provider gate snapshot row id."),
      column("gateId", "enum", "Provider gate id.", { indexed: true }),
      column("status", "enum", "Provider status."),
      column("configuredNow", "boolean", "Presence flag only."),
      column("callsAllowedNow", "boolean", "Provider calls allowed flag."),
      column("rawSecretValuesReturned", "boolean", "Must always be false."),
      column("createdAt", "datetime", "Append timestamp."),
    ],
    [
      index("StreamProviderGateSnapshot_gate_created_idx", ["gateId", "createdAt"], false, "Trace provider readiness over time."),
    ],
    "Provider gate snapshots store presence/status only, never raw secret values.",
  ),
];

export function buildStreamDbSchemaPlanningSnapshot(): StreamDbSchemaPlanningSnapshot {
  return {
    version: STREAM_DB_SCHEMA_PLANNING_VERSION,
    sourceOnly: true,
    prismaSchemaWriteAllowedNow: false,
    schemaMigrationAllowedNow: false,
    prismaGenerateAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    rawSecretStorageAllowed: false,
    rawPurchaseTokenStorageAllowed: false,
    tables: STREAM_DB_SCHEMA_PLANNED_TABLES,
  };
}
