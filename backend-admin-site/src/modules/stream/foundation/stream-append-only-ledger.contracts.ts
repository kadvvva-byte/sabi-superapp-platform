import {
  type SabiRequiredPaymentRail,
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type SabiPurchasePurposeClassifierDecision,
  type SabiPurchasePurposeClassifierInput,
} from "./stream-purchase-purpose-classifier.contracts";

export const STREAM_APPEND_ONLY_LEDGER_VERSION = "BACKEND-STREAM-FOUNDATION-141F" as const;

export type StreamLedgerEntryKind =
  | "purchase_intent_created"
  | "billing_rail_classified"
  | "google_purchase_verified"
  | "provider_payment_authorized"
  | "gross_amount_recorded"
  | "google_fee_estimated"
  | "google_fee_settled"
  | "sabi_service_fee_calculated"
  | "tax_withholding_or_vat_hold_calculated"
  | "refund_chargeback_reserve_held"
  | "compliance_or_fraud_hold_applied"
  | "entitlement_delivery_approved"
  | "stream_gift_delivery_approved"
  | "creator_earning_pending_created"
  | "creator_earning_payable_released"
  | "merchant_settlement_pending_created"
  | "merchant_settlement_payable_released"
  | "refund_or_void_adjustment_recorded"
  | "admin_manual_review_required";

export type StreamLedgerDirection =
  | "debit"
  | "credit"
  | "hold"
  | "release"
  | "adjustment"
  | "informational";

export type StreamLedgerPartyKind =
  | "user"
  | "streamer_creator"
  | "merchant"
  | "sabi_platform"
  | "google_play"
  | "payment_provider"
  | "tax_or_compliance_reserve"
  | "system";

export type StreamLedgerMoneyAmount = Readonly<{
  amountMinor: string;
  currency: string;
}>;

export type StreamAppendOnlyLedgerEntry = Readonly<{
  version: typeof STREAM_APPEND_ONLY_LEDGER_VERSION;
  entryKind: StreamLedgerEntryKind;
  direction: StreamLedgerDirection;
  sourceBucket: SabiValueLedgerBucket;
  targetBucket: SabiValueLedgerBucket;
  requiredRail: SabiRequiredPaymentRail;
  purchaseInput: SabiPurchasePurposeClassifierInput;
  classifierDecisionStatus: SabiPurchasePurposeClassifierDecision["status"];
  partyKind: StreamLedgerPartyKind;
  amount: StreamLedgerMoneyAmount;
  idempotencyKeyRequired: true;
  appendOnly: true;
  mayUpdateExistingEntry: false;
  mayDeleteExistingEntry: false;
  createsSpendableBalanceImmediately: false;
  createsWithdrawableBalanceImmediately: false;
  requiresGoogleVerificationBeforeDigitalEntitlement: boolean;
  requiresProviderSettlementBeforePayable: boolean;
  requiresComplianceHoldBeforeRelease: boolean;
  fakeSuccessAllowed: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  notes: string;
}>;

export type StreamLedgerBucketRule = Readonly<{
  bucket: SabiValueLedgerBucket;
  appendOnlyEntriesRequired: true;
  mayMixWithOtherBuckets: false;
  mayBecomeSpendableImmediately: false;
  mayBecomeWithdrawableImmediately: false;
  allowedEntryKinds: readonly StreamLedgerEntryKind[];
  notes: string;
}>;

export type StreamAppendOnlyLedgerSnapshot = Readonly<{
  version: typeof STREAM_APPEND_ONLY_LEDGER_VERSION;
  sourceOnly: true;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  appendOnlyRequired: true;
  updateExistingEntriesAllowed: false;
  deleteExistingEntriesAllowed: false;
  bucketRules: readonly StreamLedgerBucketRule[];
}>;

export const STREAM_LEDGER_BUCKET_RULES: readonly StreamLedgerBucketRule[] = [
  {
    bucket: "wallet_balance_physical_commerce",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "purchase_intent_created",
      "billing_rail_classified",
      "provider_payment_authorized",
      "gross_amount_recorded",
      "merchant_settlement_pending_created",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Physical commerce Wallet balance is for real-world goods/services and merchant settlement rails. It must not buy Android digital entitlements as a Google Billing bypass.",
  },
  {
    bucket: "purchased_digital_coin_google_billing",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "purchase_intent_created",
      "billing_rail_classified",
      "google_purchase_verified",
      "gross_amount_recorded",
      "google_fee_estimated",
      "google_fee_settled",
      "sabi_service_fee_calculated",
      "tax_withholding_or_vat_hold_calculated",
      "refund_chargeback_reserve_held",
      "entitlement_delivery_approved",
      "stream_gift_delivery_approved",
      "creator_earning_pending_created",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Purchased Android digital value must be backed by Google Play Billing verification before entitlement or creator earning is created.",
  },
  {
    bucket: "reward_bonus_coin",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "purchase_intent_created",
      "billing_rail_classified",
      "entitlement_delivery_approved",
      "admin_manual_review_required",
    ],
    notes:
      "Reward/bonus value is free/earned only. It must not become a cash-purchased bypass or default cash-out bucket.",
  },
  {
    bucket: "creator_earning_pending",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "creator_earning_pending_created",
      "refund_chargeback_reserve_held",
      "compliance_or_fraud_hold_applied",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Creator pending earnings wait for verification, refund/chargeback windows, compliance/fraud checks and provider settlement.",
  },
  {
    bucket: "creator_earning_payable",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "creator_earning_payable_released",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Creator payable balance can only be released after all holds and checks; runtime payout remains disabled until future approval.",
  },
  {
    bucket: "merchant_settlement_pending",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "merchant_settlement_pending_created",
      "provider_payment_authorized",
      "compliance_or_fraud_hold_applied",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Merchant pending settlement is separate from creator earnings and digital coin accounting.",
  },
  {
    bucket: "merchant_settlement_payable",
    appendOnlyEntriesRequired: true,
    mayMixWithOtherBuckets: false,
    mayBecomeSpendableImmediately: false,
    mayBecomeWithdrawableImmediately: false,
    allowedEntryKinds: [
      "merchant_settlement_payable_released",
      "refund_or_void_adjustment_recorded",
      "admin_manual_review_required",
    ],
    notes:
      "Merchant payable settlement requires KYB/AML/provider checks and must not mix with creator payout.",
  },
];

export function buildStreamAppendOnlyLedgerEntryPreview(
  input: Readonly<{
    entryKind: StreamLedgerEntryKind;
    direction: StreamLedgerDirection;
    sourceBucket: SabiValueLedgerBucket;
    targetBucket: SabiValueLedgerBucket;
    requiredRail: SabiRequiredPaymentRail;
    purchaseInput: SabiPurchasePurposeClassifierInput;
    classifierDecisionStatus: SabiPurchasePurposeClassifierDecision["status"];
    partyKind: StreamLedgerPartyKind;
    amount: StreamLedgerMoneyAmount;
    notes: string;
  }>,
): StreamAppendOnlyLedgerEntry {
  return {
    version: STREAM_APPEND_ONLY_LEDGER_VERSION,
    entryKind: input.entryKind,
    direction: input.direction,
    sourceBucket: input.sourceBucket,
    targetBucket: input.targetBucket,
    requiredRail: input.requiredRail,
    purchaseInput: input.purchaseInput,
    classifierDecisionStatus: input.classifierDecisionStatus,
    partyKind: input.partyKind,
    amount: input.amount,
    idempotencyKeyRequired: true,
    appendOnly: true,
    mayUpdateExistingEntry: false,
    mayDeleteExistingEntry: false,
    createsSpendableBalanceImmediately: false,
    createsWithdrawableBalanceImmediately: false,
    requiresGoogleVerificationBeforeDigitalEntitlement:
      input.requiredRail === "google_play_billing_android",
    requiresProviderSettlementBeforePayable:
      input.targetBucket === "creator_earning_payable" || input.targetBucket === "merchant_settlement_payable",
    requiresComplianceHoldBeforeRelease:
      input.targetBucket === "creator_earning_payable" || input.targetBucket === "merchant_settlement_payable",
    fakeSuccessAllowed: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    notes: input.notes,
  };
}

export function buildStreamAppendOnlyLedgerSnapshot(): StreamAppendOnlyLedgerSnapshot {
  return {
    version: STREAM_APPEND_ONLY_LEDGER_VERSION,
    sourceOnly: true,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    appendOnlyRequired: true,
    updateExistingEntriesAllowed: false,
    deleteExistingEntriesAllowed: false,
    bucketRules: STREAM_LEDGER_BUCKET_RULES,
  };
}
