/**
 * SABI-CORE-MONETIZATION-103B
 * Source-only provider-key / entitlement schema contract draft.
 *
 * This file is planning/contract metadata only. It does not import Prisma,
 * does not call providers, does not read secrets, does not perform DB writes,
 * and does not enable billing, payout, Wallet, or money movement runtime.
 */

export const SABI_CORE_MONETIZATION_103B_VERSION = "SABI-CORE-MONETIZATION-103B" as const;

export type SabiCoreMonetization103BProviderId =
  | "google_billing"
  | "airwallex"
  | "sabi_internal_policy"
  | "sabi_wallet_bridge";

export type SabiCoreMonetization103BWriteMode = "planning_only" | "future_schema_contract";

export type SabiCoreMonetization103BRuntimeState =
  | "disabled"
  | "provider_not_configured"
  | "manual_review_required"
  | "future_controlled_activation_required";

export type SabiCoreMonetization103BLogicalModelName =
  | "SabiProviderKeyReference"
  | "SabiProviderReadinessGate"
  | "SabiEntitlement"
  | "SabiEntitlementEvent"
  | "SabiPurchaseVerificationAttempt"
  | "SabiCreatorEarningsLedgerEntry"
  | "SabiCreatorPayoutHold"
  | "SabiRevenueSharePolicyVersion"
  | "SabiProviderRuntimeAuditEvent";

export type SabiCoreMonetization103BFieldSensitivity =
  | "public_metadata"
  | "admin_readonly_metadata"
  | "server_side_secret_reference_only"
  | "hashed_token_reference_only"
  | "ledger_amount_minor_units"
  | "audit_only";

export interface SabiCoreMonetization103BFieldContract {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly sensitivity: SabiCoreMonetization103BFieldSensitivity;
  readonly notes: string;
}

export interface SabiCoreMonetization103BModelContract {
  readonly name: SabiCoreMonetization103BLogicalModelName;
  readonly purpose: string;
  readonly writeModeNow: SabiCoreMonetization103BWriteMode;
  readonly runtimeNow: SabiCoreMonetization103BRuntimeState;
  readonly appendOnly: boolean;
  readonly storesPlaintextProviderSecret: false;
  readonly storesRawPurchaseToken: false;
  readonly allowsMoneyMovementNow: false;
  readonly fields: readonly SabiCoreMonetization103BFieldContract[];
  readonly indexesPlanned: readonly string[];
  readonly futureActivationRequirements: readonly string[];
}

export interface SabiCoreMonetization103BProviderBoundaryContract {
  readonly providerId: SabiCoreMonetization103BProviderId;
  readonly scope: string;
  readonly runtimeNow: SabiCoreMonetization103BRuntimeState;
  readonly providerCallAllowedNow: false;
  readonly secretOnMobileAllowed: false;
  readonly secretInAdminUiResponseAllowed: false;
  readonly rawPurchaseTokenOutputAllowed: false;
  readonly moneyMovementAllowedNow: false;
  readonly requiredBeforeActivation: readonly string[];
}

export const SABI_CORE_MONETIZATION_103B_PROVIDER_BOUNDARIES: readonly SabiCoreMonetization103BProviderBoundaryContract[] = [
  {
    providerId: "google_billing",
    scope: "Android digital goods only where Google Play Billing policy requires it.",
    runtimeNow: "disabled",
    providerCallAllowedNow: false,
    secretOnMobileAllowed: false,
    secretInAdminUiResponseAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    moneyMovementAllowedNow: false,
    requiredBeforeActivation: [
      "server-side Google Play developer API binding",
      "hashed or provider-token-reference storage design",
      "purchase verification idempotency",
      "entitlement lifecycle audit trail",
      "refund/chargeback/revocation handling",
      "Play review evidence readiness",
    ],
  },
  {
    providerId: "airwallex",
    scope: "Physical merchant/business commerce and settlement only; not Android in-app digital goods bypass.",
    runtimeNow: "disabled",
    providerCallAllowedNow: false,
    secretOnMobileAllowed: false,
    secretInAdminUiResponseAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    moneyMovementAllowedNow: false,
    requiredBeforeActivation: [
      "server-side Airwallex secret reference storage",
      "KYB/KYC/AML provider readiness",
      "merchant settlement and compliance gates",
      "no Android digital goods routing through Airwallex",
      "provider webhooks and reconciliation plan",
    ],
  },
  {
    providerId: "sabi_wallet_bridge",
    scope: "Future wallet bridge for allowed internal balances only after ledger/compliance approval.",
    runtimeNow: "disabled",
    providerCallAllowedNow: false,
    secretOnMobileAllowed: false,
    secretInAdminUiResponseAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    moneyMovementAllowedNow: false,
    requiredBeforeActivation: [
      "Wallet ledger binding",
      "no direct balance editing",
      "admin approval and audit controls",
      "refund/hold/reversal policy",
    ],
  },
  {
    providerId: "sabi_internal_policy",
    scope: "Versioned internal monetization policy metadata only, no runtime entitlement grant without approved source event.",
    runtimeNow: "manual_review_required",
    providerCallAllowedNow: false,
    secretOnMobileAllowed: false,
    secretInAdminUiResponseAllowed: false,
    rawPurchaseTokenOutputAllowed: false,
    moneyMovementAllowedNow: false,
    requiredBeforeActivation: [
      "versioned policy approval",
      "append-only audit event source",
      "admin RBAC and compliance review",
    ],
  },
] as const;

export const SABI_CORE_MONETIZATION_103B_MODEL_CONTRACTS: readonly SabiCoreMonetization103BModelContract[] = [
  {
    name: "SabiProviderKeyReference",
    purpose: "Server-side provider key reference metadata only; never stores plaintext provider secrets.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "provider_not_configured",
    appendOnly: false,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "public_metadata", notes: "Internal reference id." },
      { name: "providerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "google_billing, airwallex, or future provider id." },
      { name: "secretRef", type: "String?", required: false, sensitivity: "server_side_secret_reference_only", notes: "Reference to server secret store only; never plaintext." },
      { name: "status", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "provider_not_configured until real backend binding." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Creation timestamp." },
      { name: "updatedAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Update timestamp." },
    ],
    indexesPlanned: ["providerId", "status"],
    futureActivationRequirements: ["encrypted server secret store", "provider-specific health/readiness gate", "admin audit event"],
  },
  {
    name: "SabiProviderReadinessGate",
    purpose: "Read-only provider readiness and safety gating state for Admin visibility.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "provider_not_configured",
    appendOnly: false,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "public_metadata", notes: "Readiness gate id." },
      { name: "providerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Provider id." },
      { name: "gateStatus", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "disabled, provider_not_configured, ready_for_test, ready_for_live after future approval." },
      { name: "providerCallAllowedNow", type: "Boolean", required: true, sensitivity: "admin_readonly_metadata", notes: "Must remain false until explicit activation." },
      { name: "moneyMovementAllowedNow", type: "Boolean", required: true, sensitivity: "admin_readonly_metadata", notes: "Must remain false until real ledger/provider/compliance gates." },
      { name: "updatedAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Gate update timestamp." },
    ],
    indexesPlanned: ["providerId", "gateStatus"],
    futureActivationRequirements: ["manual provider setup", "safe test result", "admin approval", "runtime audit event"],
  },
  {
    name: "SabiEntitlement",
    purpose: "User/business entitlement state derived only from verified purchase or approved internal policy.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "disabled",
    appendOnly: false,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "public_metadata", notes: "Entitlement id." },
      { name: "ownerType", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "USER, BUSINESS, CREATOR, STREAMER, or future owner type." },
      { name: "ownerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Internal owner reference." },
      { name: "entitlementKey", type: "String", required: true, sensitivity: "public_metadata", notes: "Feature key, e.g. premium_ai, stream_creator_tool." },
      { name: "sourceProvider", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "google_billing or approved internal policy." },
      { name: "status", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "active, revoked, expired, held, pending_verification." },
      { name: "validFrom", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Start timestamp." },
      { name: "validUntil", type: "DateTime?", required: false, sensitivity: "audit_only", notes: "Expiration timestamp when applicable." },
    ],
    indexesPlanned: ["ownerType_ownerId", "entitlementKey_status", "sourceProvider"],
    futureActivationRequirements: ["verified purchase event", "revocation handling", "append-only entitlement event"],
  },
  {
    name: "SabiEntitlementEvent",
    purpose: "Append-only entitlement lifecycle/audit event trail.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "disabled",
    appendOnly: true,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Event id." },
      { name: "entitlementId", type: "String", required: true, sensitivity: "audit_only", notes: "Linked entitlement id." },
      { name: "eventType", type: "String", required: true, sensitivity: "audit_only", notes: "created, activated, renewed, revoked, expired, held." },
      { name: "sourceRef", type: "String?", required: false, sensitivity: "hashed_token_reference_only", notes: "Purchase verification attempt or policy reference, no raw token." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Append-only event timestamp." },
    ],
    indexesPlanned: ["entitlementId", "eventType", "createdAt"],
    futureActivationRequirements: ["append-only write path", "idempotency guard", "admin audit reader"],
  },
  {
    name: "SabiPurchaseVerificationAttempt",
    purpose: "Server-side purchase verification record with hashed/non-plaintext token reference.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "disabled",
    appendOnly: true,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Attempt id." },
      { name: "providerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "google_billing for Android digital goods verification." },
      { name: "ownerType", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Entitlement owner type." },
      { name: "ownerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Entitlement owner id." },
      { name: "purchaseTokenHash", type: "String", required: true, sensitivity: "hashed_token_reference_only", notes: "Hash/reference only; raw purchase token forbidden." },
      { name: "verificationStatus", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "pending, verified, rejected, revoked, duplicate." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Attempt timestamp." },
    ],
    indexesPlanned: ["providerId_purchaseTokenHash", "ownerType_ownerId", "verificationStatus"],
    futureActivationRequirements: ["Google server verification connector", "idempotency", "raw token redaction", "revocation listener"],
  },
  {
    name: "SabiCreatorEarningsLedgerEntry",
    purpose: "Append-only creator earnings ledger derived from verified settlement after fees, taxes, and holds.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "disabled",
    appendOnly: true,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Ledger entry id." },
      { name: "creatorId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Creator/streamer internal id." },
      { name: "currency", type: "String", required: true, sensitivity: "public_metadata", notes: "ISO currency or internal unit after future approval." },
      { name: "grossAmountMinor", type: "BigInt", required: true, sensitivity: "ledger_amount_minor_units", notes: "Gross amount in minor units." },
      { name: "providerFeeMinor", type: "BigInt", required: true, sensitivity: "ledger_amount_minor_units", notes: "Provider fee, e.g. Play Billing fee." },
      { name: "platformFeeMinor", type: "BigInt", required: true, sensitivity: "ledger_amount_minor_units", notes: "Sabi platform/service fee." },
      { name: "netAmountMinor", type: "BigInt", required: true, sensitivity: "ledger_amount_minor_units", notes: "Net before payout holds." },
      { name: "status", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "pending_settlement, held, releasable, reversed." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Entry timestamp." },
    ],
    indexesPlanned: ["creatorId_status", "createdAt"],
    futureActivationRequirements: ["verified purchase/settlement source", "hold policy", "no direct balance editing", "reversal path"],
  },
  {
    name: "SabiCreatorPayoutHold",
    purpose: "Compliance/refund/chargeback/provider-settlement hold state before any payout.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "disabled",
    appendOnly: false,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Hold id." },
      { name: "creatorId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Creator id." },
      { name: "reason", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "refund_window, chargeback_risk, compliance_review, provider_settlement_pending." },
      { name: "status", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "active, released, extended, escalated." },
      { name: "releaseAfter", type: "DateTime?", required: false, sensitivity: "audit_only", notes: "Earliest release time." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Creation timestamp." },
      { name: "updatedAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Update timestamp." },
    ],
    indexesPlanned: ["creatorId_status", "reason"],
    futureActivationRequirements: ["compliance review policy", "admin release controls", "provider settlement confirmation"],
  },
  {
    name: "SabiRevenueSharePolicyVersion",
    purpose: "Versioned fee/revenue-share policy for Google Billing, Sabi platform fee, taxes, and holds.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "manual_review_required",
    appendOnly: true,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Policy version id." },
      { name: "policyKey", type: "String", required: true, sensitivity: "public_metadata", notes: "google_billing_creator_revenue_share, stream_subscription_fee, etc." },
      { name: "version", type: "Int", required: true, sensitivity: "public_metadata", notes: "Monotonic policy version." },
      { name: "providerFeeBps", type: "Int", required: true, sensitivity: "admin_readonly_metadata", notes: "Provider fee basis points; must handle Google 15-30% range." },
      { name: "platformFeeBps", type: "Int", required: true, sensitivity: "admin_readonly_metadata", notes: "Sabi service/platform fee basis points." },
      { name: "status", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "draft, approved, retired." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Creation timestamp." },
    ],
    indexesPlanned: ["policyKey_version", "status"],
    futureActivationRequirements: ["owner/admin approval", "tax/compliance review", "immutable published versions"],
  },
  {
    name: "SabiProviderRuntimeAuditEvent",
    purpose: "Audit trail for provider readiness, activation requests, disabled runtime checks, and safety gates.",
    writeModeNow: "future_schema_contract",
    runtimeNow: "manual_review_required",
    appendOnly: true,
    storesPlaintextProviderSecret: false,
    storesRawPurchaseToken: false,
    allowsMoneyMovementNow: false,
    fields: [
      { name: "id", type: "String", required: true, sensitivity: "audit_only", notes: "Audit event id." },
      { name: "providerId", type: "String", required: true, sensitivity: "admin_readonly_metadata", notes: "Provider id." },
      { name: "eventType", type: "String", required: true, sensitivity: "audit_only", notes: "readiness_snapshot, activation_requested, blocked_runtime_call, safety_check." },
      { name: "actorType", type: "String", required: true, sensitivity: "audit_only", notes: "system, admin, owner, provider_webhook." },
      { name: "safeSummary", type: "Json", required: true, sensitivity: "audit_only", notes: "Redacted summary only, no secrets or raw tokens." },
      { name: "createdAt", type: "DateTime", required: true, sensitivity: "audit_only", notes: "Append-only timestamp." },
    ],
    indexesPlanned: ["providerId_eventType", "createdAt"],
    futureActivationRequirements: ["redaction policy", "admin audit reader", "immutable event append path"],
  },
] as const;

export const SABI_CORE_MONETIZATION_103B_NON_NEGOTIABLE_BOUNDARIES = [
  "No fake payment, subscription, purchase, payout, provider, or Wallet success states.",
  "No Android digital goods bypass outside Google Play Billing where Google policy requires it.",
  "No Airwallex usage for Android in-app digital goods; Airwallex remains business/merchant/physical commerce side.",
  "No provider secrets in mobile, Admin UI, or client responses; server-side reference only.",
  "No raw Google purchase token or provider secret printed in reports or logs.",
  "No direct balance editing; financial effects must go through ledger, provider, and compliance gates later.",
  "No Prisma schema write, migration, generate, DB write, provider call, Wallet mutation, or money movement in 103B.",
] as const;

export const SABI_CORE_MONETIZATION_103B_SAFETY_LOCKS = {
  sourceOnlyContractDraft: true,
  prismaSchemaWriteAllowedNow: false,
  prismaMigrateOrGenerateAllowedNow: false,
  dbWriteAllowedNow: false,
  providerActivationAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  creatorPayoutExecutionAllowedNow: false,
  stakeRuntimeEnabledNow: false,
  googleBillingRuntimeEnabledNow: false,
  airwallexRuntimeEnabledNow: false,
  adminUiTouchAllowedNow: false,
  mobileUiTouchAllowedNow: false,
  rawSecretsOutputAllowedNow: false,
  rawPurchaseTokensOutputAllowedNow: false,
} as const;

export const SABI_CORE_MONETIZATION_103B_HANDOFF = {
  version: SABI_CORE_MONETIZATION_103B_VERSION,
  status: "source_only_contract_draft_ready",
  modelCount: SABI_CORE_MONETIZATION_103B_MODEL_CONTRACTS.length,
  providerBoundaryCount: SABI_CORE_MONETIZATION_103B_PROVIDER_BOUNDARIES.length,
  safetyLocks: SABI_CORE_MONETIZATION_103B_SAFETY_LOCKS,
  nextStages: [
    "103C Prisma schema diff planning report, no write/migrate/generate.",
    "103D controlled Prisma schema source patch only after explicit approval, no migrate/generate.",
    "103E Prisma validate/generate planning or execution only after explicit approval.",
    "103F Admin UI visibility continuation after backend planning is stable.",
  ],
} as const;