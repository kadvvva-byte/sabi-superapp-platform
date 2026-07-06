import {
  type SabiRequiredPaymentRail,
  type SabiValueLedgerBucket,
} from "./stream-coin-wallet-digital-billing-boundary.contracts";
import {
  type StreamLedgerEntryKind,
  type StreamLedgerMoneyAmount,
  type StreamLedgerPartyKind,
} from "./stream-append-only-ledger.contracts";

export const STREAM_ADMIN_PROVIDER_READINESS_VERSION = "BACKEND-STREAM-FOUNDATION-141H" as const;

export type StreamBillingProviderGateId =
  | "google_play_billing_android"
  | "external_payment_provider_or_bank_rail"
  | "payout_provider_future";

export type StreamProviderGateStatus =
  | "provider_not_configured"
  | "configured_safe_disabled"
  | "ready_for_read_only_smoke"
  | "blocked"
  | "live_enabled_future";

export type StreamAdminReadinessSurfaceId =
  | "stream_billing_provider_status"
  | "stream_product_catalog"
  | "stream_ledger_review"
  | "creator_streamer_payout_readiness"
  | "merchant_settlement_readiness"
  | "refund_void_chargeback_review"
  | "compliance_hold_review";

export type StreamProviderReadinessGate = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_READINESS_VERSION;
  gateId: StreamBillingProviderGateId;
  status: StreamProviderGateStatus;
  configuredNow: false;
  callsAllowedNow: false;
  keysServerSideOnly: true;
  rawSecretValuesReturned: false;
  missingStateMustReturn:
    | "provider_not_configured"
    | "payout_provider_not_configured";
  mustNotReturn:
    | "fake_success"
    | "fake_payment_authorized"
    | "fake_payout_released";
  adminVisible: true;
  runtimeDbWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  notes: string;
}>;

export type StreamAdminReadinessSurfaceField = Readonly<{
  key: string;
  required: true;
  secretValueAllowed: false;
  editableNow: false;
  notes: string;
}>;

export type StreamAdminReadinessSurface = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_READINESS_VERSION;
  surfaceId: StreamAdminReadinessSurfaceId;
  title: string;
  adminVisibleFuture: true;
  sourceOnlyNow: true;
  readOnlyNow: true;
  writeActionsAllowedNow: false;
  providerCallsAllowedNow: false;
  walletMutationsAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  fields: readonly StreamAdminReadinessSurfaceField[];
  notes: string;
}>;

export type StreamAdminLedgerReviewRow = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_READINESS_VERSION;
  ledgerBucket: SabiValueLedgerBucket;
  entryKind: StreamLedgerEntryKind;
  rail: SabiRequiredPaymentRail;
  partyKind: StreamLedgerPartyKind;
  grossAmount: StreamLedgerMoneyAmount;
  googleFee: StreamLedgerMoneyAmount;
  sabiFee: StreamLedgerMoneyAmount;
  holds: readonly string[];
  netPending: StreamLedgerMoneyAmount;
  netPayable: StreamLedgerMoneyAmount;
  appendOnlyEntryCountRequired: true;
  manualOverwriteAllowed: false;
  payoutReleaseAllowedNow: false;
  merchantSettlementReleaseAllowedNow: false;
  fakeSuccessAllowed: false;
}>;

export type StreamAdminProviderReadinessSnapshot = Readonly<{
  version: typeof STREAM_ADMIN_PROVIDER_READINESS_VERSION;
  sourceOnly: true;
  liveBillingEnabledNow: false;
  googleProviderCallAllowedNow: false;
  externalProviderCallAllowedNow: false;
  payoutProviderCallAllowedNow: false;
  runtimeDbWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowed: false;
  rawSecretValuesReturned: false;
  gates: readonly StreamProviderReadinessGate[];
  surfaces: readonly StreamAdminReadinessSurface[];
}>;

function field(key: string, notes: string): StreamAdminReadinessSurfaceField {
  return {
    key,
    required: true,
    secretValueAllowed: false,
    editableNow: false,
    notes,
  };
}

export const STREAM_PROVIDER_READINESS_GATES: readonly StreamProviderReadinessGate[] = [
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    gateId: "google_play_billing_android",
    status: "provider_not_configured",
    configuredNow: false,
    callsAllowedNow: false,
    keysServerSideOnly: true,
    rawSecretValuesReturned: false,
    missingStateMustReturn: "provider_not_configured",
    mustNotReturn: "fake_success",
    adminVisible: true,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    notes:
      "Google Play Billing provider gate remains safe-disabled until Play Console products, server-side verification and credentials are configured server-side only.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    gateId: "external_payment_provider_or_bank_rail",
    status: "provider_not_configured",
    configuredNow: false,
    callsAllowedNow: false,
    keysServerSideOnly: true,
    rawSecretValuesReturned: false,
    missingStateMustReturn: "provider_not_configured",
    mustNotReturn: "fake_payment_authorized",
    adminVisible: true,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    notes:
      "External payment provider/bank rail gate remains safe-disabled until commerce provider, KYB/KYC/AML and settlement contracts are ready.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    gateId: "payout_provider_future",
    status: "provider_not_configured",
    configuredNow: false,
    callsAllowedNow: false,
    keysServerSideOnly: true,
    rawSecretValuesReturned: false,
    missingStateMustReturn: "payout_provider_not_configured",
    mustNotReturn: "fake_payout_released",
    adminVisible: true,
    runtimeDbWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    notes:
      "Payout provider gate remains safe-disabled until payout provider, compliance holds and owner approval are ready.",
  },
];

export const STREAM_ADMIN_READINESS_SURFACES: readonly StreamAdminReadinessSurface[] = [
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    surfaceId: "stream_billing_provider_status",
    title: "Stream Billing Provider Status",
    adminVisibleFuture: true,
    sourceOnlyNow: true,
    readOnlyNow: true,
    writeActionsAllowedNow: false,
    providerCallsAllowedNow: false,
    walletMutationsAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    fields: [
      field("googlePlayBillingConfigured", "Boolean status only; no secret values."),
      field("googlePlayApiServerCredentialsPresentServerSideOnly", "Presence flag only; raw keys never returned."),
      field("googleProductCatalogSynced", "Readiness status only; no live sync now."),
      field("providerNotConfiguredReason", "Honest safe-disabled reason."),
      field("lastVerificationSmokeStatus", "Read-only smoke status only."),
    ],
    notes: "Admin must show provider_not_configured instead of fake Google Billing success.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    surfaceId: "stream_product_catalog",
    title: "Stream Product Catalog",
    adminVisibleFuture: true,
    sourceOnlyNow: true,
    readOnlyNow: true,
    writeActionsAllowedNow: false,
    providerCallsAllowedNow: false,
    walletMutationsAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    fields: [
      field("sku", "Product SKU identifier."),
      field("productKind", "Digital/physical/reward classification."),
      field("platform", "Android/iOS/web/admin classification."),
      field("rail", "Required payment rail."),
      field("googleBillingRequired", "True for Android digital goods/services where required."),
      field("sabiFeePercent", "Sabi fee configuration visibility."),
      field("googleFeePercentModel", "15-30 percent model visibility."),
      field("active", "Activation state; false until provider ready."),
      field("reviewRequired", "Manual review state for unclassified products."),
    ],
    notes: "Admin must block unclassified monetized products before launch.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    surfaceId: "stream_ledger_review",
    title: "Stream Ledger Review",
    adminVisibleFuture: true,
    sourceOnlyNow: true,
    readOnlyNow: true,
    writeActionsAllowedNow: false,
    providerCallsAllowedNow: false,
    walletMutationsAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    fields: [
      field("purchaseIntentId", "Trace identifier."),
      field("classifierDecision", "Classification result."),
      field("ledgerBucket", "Separated ledger bucket."),
      field("appendOnlyEntryCount", "Append-only entry count."),
      field("grossAmount", "Gross amount."),
      field("googleFee", "Google fee amount/estimate."),
      field("sabiFee", "Sabi fee amount."),
      field("holds", "Refund/compliance/settlement holds."),
      field("netPending", "Pending net."),
      field("netPayable", "Approved payable net."),
    ],
    notes: "Admin must never allow manual ledger overwrite.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    surfaceId: "creator_streamer_payout_readiness",
    title: "Creator/Streamer Payout Readiness",
    adminVisibleFuture: true,
    sourceOnlyNow: true,
    readOnlyNow: true,
    writeActionsAllowedNow: false,
    providerCallsAllowedNow: false,
    walletMutationsAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    fields: [
      field("creatorId", "Creator identifier."),
      field("pendingEarnings", "Pending earnings only."),
      field("refundReserve", "Refund/chargeback reserve."),
      field("complianceHold", "Compliance/fraud hold."),
      field("settlementHold", "Provider settlement hold."),
      field("payableBalance", "Approved payable amount only."),
      field("payoutBlockedReasons", "Reasons blocking payout."),
    ],
    notes: "Payout release remains disabled until future provider/compliance stage.",
  },
  {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    surfaceId: "merchant_settlement_readiness",
    title: "Merchant Settlement Readiness",
    adminVisibleFuture: true,
    sourceOnlyNow: true,
    readOnlyNow: true,
    writeActionsAllowedNow: false,
    providerCallsAllowedNow: false,
    walletMutationsAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    fields: [
      field("merchantId", "Merchant identifier."),
      field("physicalCommerceOrders", "Physical commerce order summary."),
      field("providerSettlementState", "Provider settlement status."),
      field("kybAmlState", "KYB/AML status."),
      field("pendingSettlement", "Pending settlement amount."),
      field("payableSettlement", "Approved payable settlement."),
      field("settlementBlockedReasons", "Reasons blocking settlement."),
    ],
    notes: "Merchant settlement must stay separate from creator earnings.",
  },
];

export function buildStreamAdminProviderReadinessSnapshot(): StreamAdminProviderReadinessSnapshot {
  return {
    version: STREAM_ADMIN_PROVIDER_READINESS_VERSION,
    sourceOnly: true,
    liveBillingEnabledNow: false,
    googleProviderCallAllowedNow: false,
    externalProviderCallAllowedNow: false,
    payoutProviderCallAllowedNow: false,
    runtimeDbWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowed: false,
    rawSecretValuesReturned: false,
    gates: STREAM_PROVIDER_READINESS_GATES,
    surfaces: STREAM_ADMIN_READINESS_SURFACES,
  };
}
