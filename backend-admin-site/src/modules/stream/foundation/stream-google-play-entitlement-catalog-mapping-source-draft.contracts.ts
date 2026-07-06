// BACKEND-STREAM-FOUNDATION-144K
// Safe-disabled entitlement lifecycle and server-side product catalog mapping contract.
// Draft-only: no provider use, no data-store write, no Sabi balance change,
// no funds flow, no entitlement activation, and no raw credential or proof output.

import {
  type StreamGooglePlayReadinessDigitalPurpose,
} from "./stream-google-play-idempotency-ledger-readiness-source-draft.contracts";

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144K" as const;

export type StreamGooglePlayEntitlementCatalogMappingDraftVersion =
  typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayProductKindDraft =
  | "coin_pack"
  | "premium_subscription"
  | "premium_feature"
  | "digital_gift"
  | "stream_boost"
  | "creator_subscription"
  | "digital_badge"
  | "digital_effect"
  | "ai_digital_tool";

export type StreamGooglePlayEntitlementLifecycleStateDraft =
  | "catalog_missing"
  | "provider_not_configured"
  | "provider_result_required"
  | "idempotency_gate_required"
  | "ledger_append_gate_required"
  | "entitlement_blocked_safe_disabled"
  | "ready_for_later_activation_gate";

export type StreamGooglePlayEntitlementHoldReasonDraft =
  | "provider_keys_pending"
  | "real_provider_result_missing"
  | "purchase_proof_not_supplied"
  | "catalog_mapping_missing"
  | "idempotency_not_checked"
  | "ledger_append_not_done"
  | "refund_window_open"
  | "chargeback_window_open"
  | "compliance_review_required"
  | "owner_approval_missing";

export type StreamGooglePlayCatalogProductDraft = {
  readonly productId: string;
  readonly productKind: StreamGooglePlayProductKindDraft;
  readonly digitalPurpose: StreamGooglePlayReadinessDigitalPurpose;
  readonly targetBucket: "purchased_digital_coin_google_billing";
  readonly serverCatalogVersion: string;
  readonly activeInDraftCatalog: boolean;
  readonly androidOnlyBillingRequired: true;
};

export type StreamGooglePlayEntitlementLifecycleDraft = {
  readonly version: StreamGooglePlayEntitlementCatalogMappingDraftVersion;
  readonly productId: string;
  readonly productKind: StreamGooglePlayProductKindDraft;
  readonly digitalPurpose: StreamGooglePlayReadinessDigitalPurpose;
  readonly lifecycleState: StreamGooglePlayEntitlementLifecycleStateDraft;
  readonly holdReasons: readonly StreamGooglePlayEntitlementHoldReasonDraft[];
  readonly entitlementActivationAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayEntitlementCatalogMappingSafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly catalogDraftOnly: boolean;
  readonly entitlementActivationAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayEntitlementCatalogMappingSnapshotDraft = {
  readonly version: StreamGooglePlayEntitlementCatalogMappingDraftVersion;
  readonly catalogVersion: string;
  readonly products: readonly StreamGooglePlayCatalogProductDraft[];
  readonly lifecycleTemplates: readonly StreamGooglePlayEntitlementLifecycleDraft[];
  readonly safeFlags: StreamGooglePlayEntitlementCatalogMappingSafeFlags;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS: StreamGooglePlayEntitlementCatalogMappingSafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  catalogDraftOnly: true,
  entitlementActivationAllowedNow: false,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  ledgerAppendAllowedNow: false,
  balanceChangeAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  creatorReleaseAllowedNow: false,
  merchantReleaseAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export const STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT: readonly StreamGooglePlayCatalogProductDraft[] = [
  {
    productId: "sabi_coin_pack_basic_draft",
    productKind: "coin_pack",
    digitalPurpose: "other_android_digital_entitlement",
    targetBucket: "purchased_digital_coin_google_billing",
    serverCatalogVersion: "draft_v1",
    activeInDraftCatalog: false,
    androidOnlyBillingRequired: true,
  },
  {
    productId: "sabi_stream_boost_draft",
    productKind: "stream_boost",
    digitalPurpose: "stream_boost",
    targetBucket: "purchased_digital_coin_google_billing",
    serverCatalogVersion: "draft_v1",
    activeInDraftCatalog: false,
    androidOnlyBillingRequired: true,
  },
  {
    productId: "sabi_digital_gift_draft",
    productKind: "digital_gift",
    digitalPurpose: "digital_gift",
    targetBucket: "purchased_digital_coin_google_billing",
    serverCatalogVersion: "draft_v1",
    activeInDraftCatalog: false,
    androidOnlyBillingRequired: true,
  },
];

export function buildStreamGooglePlayEntitlementLifecycleDraft(
  product: StreamGooglePlayCatalogProductDraft,
  holdReasons: readonly StreamGooglePlayEntitlementHoldReasonDraft[] = [
    "provider_keys_pending",
    "real_provider_result_missing",
    "ledger_append_not_done",
    "owner_approval_missing",
  ],
): StreamGooglePlayEntitlementLifecycleDraft {
  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SOURCE_DRAFT_VERSION,
    productId: product.productId,
    productKind: product.productKind,
    digitalPurpose: product.digitalPurpose,
    lifecycleState: "entitlement_blocked_safe_disabled",
    holdReasons,
    entitlementActivationAllowedNow: false,
    providerCallAllowedNow: false,
    dataStoreWriteAllowedNow: false,
    ledgerAppendAllowedNow: false,
    balanceChangeAllowedNow: false,
    walletFlowAllowedNow: false,
    fundsFlowAllowedNow: false,
    creatorReleaseAllowedNow: false,
    merchantReleaseAllowedNow: false,
    rawCredentialReturnAllowed: false,
    rawProviderProofReturnAllowed: false,
    syntheticProviderApprovalAllowed: false,
    liveBillingEnabledNow: false,
  };
}

export function buildStreamGooglePlayEntitlementCatalogMappingSnapshotDraft(): StreamGooglePlayEntitlementCatalogMappingSnapshotDraft {
  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SOURCE_DRAFT_VERSION,
    catalogVersion: "draft_v1",
    products: STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT,
    lifecycleTemplates: STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT.map((product) =>
      buildStreamGooglePlayEntitlementLifecycleDraft(product),
    ),
    safeFlags: STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayEntitlementCatalogMappingDraftSafe(
  value: StreamGooglePlayEntitlementCatalogMappingSnapshotDraft,
): boolean {
  return (
    value.safeFlags.entitlementActivationAllowedNow === false &&
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.ledgerAppendAllowedNow === false &&
    value.safeFlags.balanceChangeAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.creatorReleaseAllowedNow === false &&
    value.safeFlags.merchantReleaseAllowedNow === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.products.every((product) => product.targetBucket === "purchased_digital_coin_google_billing") &&
    value.lifecycleTemplates.every(
      (item) =>
        item.entitlementActivationAllowedNow === false &&
        item.providerCallAllowedNow === false &&
        item.ledgerAppendAllowedNow === false &&
        item.balanceChangeAllowedNow === false,
    )
  );
}
