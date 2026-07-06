/**
 * SABI-CORE-MONETIZATION-102B
 * Google Billing server verification design.
 *
 * Source-only contract/design. This file must not enable provider runtime,
 * call Google APIs, store raw purchase tokens, mutate Wallet, move money,
 * activate creator payouts, or unlock paid games/stake runtime.
 */

export const SABI_CORE_MONETIZATION_102B_VERSION = "SABI-CORE-MONETIZATION-102B" as const;

export type SabiCoreGoogleBillingVerificationRuntimeState =
  | "source_only_design_ready_runtime_not_enabled"
  | "provider_config_required"
  | "server_verification_required"
  | "db_ledger_approval_required"
  | "play_review_evidence_required";

export type SabiCoreGoogleBillingDigitalGoodKind =
  | "coin_pack"
  | "premium_subscription"
  | "premium_effect"
  | "digital_gift"
  | "creator_support_digital"
  | "game_digital_item_android_only";

export type SabiCoreGoogleBillingVerificationStep = Readonly<{
  id: string;
  title: string;
  purpose: string;
  allowedNow: false;
  requiredBeforeRuntime: readonly string[];
  forbiddenUntilSeparateApproval: readonly string[];
}>;

export type SabiCoreGoogleBillingTokenHandlingRule = Readonly<{
  id: string;
  rule: string;
  rawPurchaseTokenStorageAllowed: false;
  rawPurchaseTokenLogAllowed: false;
  redactedEvidenceAllowed: true;
  auditHashAllowed: true;
}>;

export const SABI_CORE_GOOGLE_BILLING_SUPPORTED_DIGITAL_GOODS = [
  "coin_pack",
  "premium_subscription",
  "premium_effect",
  "digital_gift",
  "creator_support_digital",
  "game_digital_item_android_only",
] as const satisfies readonly SabiCoreGoogleBillingDigitalGoodKind[];

export const SABI_CORE_GOOGLE_BILLING_FORBIDDEN_COMMERCE_BOUNDARIES = [
  "physical_goods",
  "merchant_settlement",
  "business_account_balance",
  "wallet_bank_transfer",
  "airwallex_physical_merchant_commerce",
  "real_money_stake",
  "gambling_prize_payout",
] as const;

export const SABI_CORE_GOOGLE_BILLING_SERVER_VERIFICATION_STEPS = [
  {
    id: "server_receives_purchase_evidence",
    title: "Receive Google Play Billing purchase evidence",
    purpose:
      "Accept Android digital purchase evidence from client without logging raw purchase tokens.",
    allowedNow: false,
    requiredBeforeRuntime: [
      "Google Billing provider keys/config approved",
      "raw purchase token redaction utility implemented",
      "request authentication and replay protection designed",
    ],
    forbiddenUntilSeparateApproval: [
      "raw_purchase_token_logging",
      "raw_purchase_token_database_storage",
      "fake_purchase_success",
      "wallet_balance_credit",
    ],
  },
  {
    id: "server_verifies_with_google_api",
    title: "Verify purchase with Google API",
    purpose:
      "Server verifies purchase/subscription with Google Play Developer API after provider config approval.",
    allowedNow: false,
    requiredBeforeRuntime: [
      "real Google service account/provider config",
      "provider call approval",
      "network retry/timeout policy",
      "purchase state mapping",
    ],
    forbiddenUntilSeparateApproval: [
      "google_billing_provider_call",
      "google_billing_runtime_enable",
      "provider_secret_output",
      "provider_fake_success",
    ],
  },
  {
    id: "entitlement_ledger_decision",
    title: "Create entitlement ledger decision",
    purpose:
      "Prepare idempotent ledger decision only after verification success; DB write requires separate approval.",
    allowedNow: false,
    requiredBeforeRuntime: [
      "DB ledger schema approval",
      "idempotency key design",
      "refund/revocation handling",
      "owner/user entitlement mapping",
    ],
    forbiddenUntilSeparateApproval: [
      "runtime_db_write",
      "wallet_mutation",
      "coin_credit",
      "premium_activation_runtime",
      "creator_payout",
    ],
  },
  {
    id: "refund_chargeback_revocation",
    title: "Handle refunds, chargebacks, and revocations",
    purpose:
      "Prepare entitlement reversal/hold logic before enabling live billing.",
    allowedNow: false,
    requiredBeforeRuntime: [
      "Google notification/webhook design",
      "entitlement rollback policy",
      "admin review evidence",
      "consumer support evidence",
    ],
    forbiddenUntilSeparateApproval: [
      "live_refund_processing",
      "live_entitlement_reversal",
      "wallet_debit",
      "money_movement",
    ],
  },
] as const satisfies readonly SabiCoreGoogleBillingVerificationStep[];

export const SABI_CORE_GOOGLE_BILLING_TOKEN_HANDLING_RULES = [
  {
    id: "no_raw_purchase_token_storage",
    rule:
      "Raw Google purchase tokens must never be stored in logs, admin responses, analytics, reports, or plain database fields.",
    rawPurchaseTokenStorageAllowed: false,
    rawPurchaseTokenLogAllowed: false,
    redactedEvidenceAllowed: true,
    auditHashAllowed: true,
  },
  {
    id: "redacted_purchase_evidence_only",
    rule:
      "Admin/Play-review evidence may show product id, state, timestamps, and token hash/redacted suffix only, never the raw token.",
    rawPurchaseTokenStorageAllowed: false,
    rawPurchaseTokenLogAllowed: false,
    redactedEvidenceAllowed: true,
    auditHashAllowed: true,
  },
  {
    id: "idempotent_entitlement_decision",
    rule:
      "Purchase verification must be idempotent and protected against replay before any entitlement ledger write is approved.",
    rawPurchaseTokenStorageAllowed: false,
    rawPurchaseTokenLogAllowed: false,
    redactedEvidenceAllowed: true,
    auditHashAllowed: true,
  },
] as const satisfies readonly SabiCoreGoogleBillingTokenHandlingRule[];

export const SABI_CORE_MONETIZATION_102B_GOOGLE_BILLING_SERVER_VERIFICATION_DESIGN = {
  version: SABI_CORE_MONETIZATION_102B_VERSION,
  mode: "google_billing_server_verification_design_source_only",
  runtimeState:
    "source_only_design_ready_runtime_not_enabled" as SabiCoreGoogleBillingVerificationRuntimeState,
  readOnlyDesign: true,
  androidDigitalGoodsOnly: true,
  supportedDigitalGoods: SABI_CORE_GOOGLE_BILLING_SUPPORTED_DIGITAL_GOODS,
  forbiddenCommerceBoundaries: SABI_CORE_GOOGLE_BILLING_FORBIDDEN_COMMERCE_BOUNDARIES,
  verificationSteps: SABI_CORE_GOOGLE_BILLING_SERVER_VERIFICATION_STEPS,
  tokenHandlingRules: SABI_CORE_GOOGLE_BILLING_TOKEN_HANDLING_RULES,
  requiredProviderKeysLater: [
    "google_service_account_reference_server_side_only",
    "google_play_package_name",
    "google_play_product_id_catalog",
    "google_play_subscription_id_catalog",
  ],
  requiredRuntimeComponentsLater: [
    "server_side_google_purchase_verification_connector",
    "redacted_purchase_token_hashing",
    "idempotent_entitlement_ledger",
    "refund_chargeback_revocation_reconciliation",
    "admin_play_review_evidence",
  ],
  stillDisabled: {
    googleBillingRuntime: true,
    googleBillingProviderCall: true,
    providerActivation: true,
    runtimeDbWrite: true,
    walletMutation: true,
    moneyMovement: true,
    creatorPayout: true,
    stakeRuntime: true,
    gamblingRuntime: true,
    airwallexRuntime: true,
  },
  safety: {
    sourceOnlyDesign: true,
    providerActivationPerformed: false,
    googleBillingRuntimeEnabled: false,
    googleBillingProviderCallPerformed: false,
    providerCallPerformed: false,
    runtimeDbWritePerformed: false,
    prismaMigrateOrGeneratePerformed: false,
    walletMutationPerformed: false,
    moneyMovementPerformed: false,
    creatorPayoutPerformed: false,
    stakeRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    gamblingRuntimeEnabled: false,
    airwallexRuntimeEnabled: false,
    adminUiTouched: false,
    mobileTouched: false,
    rawSecretsPrinted: false,
    rawPurchaseTokensPrinted: false,
  },
} as const;

export function buildSabiCoreMonetization102BGoogleBillingServerVerificationDesignSnapshot() {
  return {
    ...SABI_CORE_MONETIZATION_102B_GOOGLE_BILLING_SERVER_VERIFICATION_DESIGN,
    generatedAtUtc: new Date().toISOString(),
  };
}
