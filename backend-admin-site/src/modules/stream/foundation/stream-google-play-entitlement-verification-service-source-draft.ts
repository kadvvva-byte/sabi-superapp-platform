// BACKEND-STREAM-FOUNDATION-144M
// Safe-disabled entitlement verification service draft.
// Draft-only: it builds blocked decisions from the catalog mapping.
// It does not contact providers, write storage, append ledger entries,
// change Sabi balances, enable live billing, or activate entitlements.

import {
  STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS,
  STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT,
  buildStreamGooglePlayEntitlementCatalogMappingSnapshotDraft,
  buildStreamGooglePlayEntitlementLifecycleDraft,
  assertStreamGooglePlayEntitlementCatalogMappingDraftSafe,
  type StreamGooglePlayCatalogProductDraft,
  type StreamGooglePlayEntitlementLifecycleDraft,
} from "./stream-google-play-entitlement-catalog-mapping-source-draft.contracts";

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144M" as const;

export type StreamGooglePlayEntitlementVerificationServiceDraftVersion =
  typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayEntitlementVerificationOutcomeDraft =
  | "catalog_missing"
  | "provider_not_configured"
  | "safe_disabled_blocked"
  | "future_gate_required";

export type StreamGooglePlayEntitlementVerificationInputDraft = {
  readonly productId: string;
  readonly platform: "android";
  readonly userReferenceHash?: string;
  readonly providerReferenceHash?: string;
};

export type StreamGooglePlayEntitlementVerificationDecisionDraft = {
  readonly version: StreamGooglePlayEntitlementVerificationServiceDraftVersion;
  readonly productId: string;
  readonly platform: "android";
  readonly outcome: StreamGooglePlayEntitlementVerificationOutcomeDraft;
  readonly catalogProduct: StreamGooglePlayCatalogProductDraft;
  readonly lifecycle: StreamGooglePlayEntitlementLifecycleDraft;
  readonly catalogSnapshotSafe: boolean;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly entitlementActivationAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
  readonly generatedAtUtc: string;
};

export type StreamGooglePlayEntitlementVerificationServiceSafeFlags = {
  readonly sourceOnly: boolean;
  readonly serviceDraftOnly: boolean;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly entitlementActivationAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SAFE_FLAGS: StreamGooglePlayEntitlementVerificationServiceSafeFlags = {
  sourceOnly: true,
  serviceDraftOnly: true,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  ledgerAppendAllowedNow: false,
  balanceChangeAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  entitlementActivationAllowedNow: false,
  creatorReleaseAllowedNow: false,
  merchantReleaseAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

function fallbackCatalogProductDraft(productId: string): StreamGooglePlayCatalogProductDraft {
  return {
    productId: productId || "missing_product",
    productKind: "coin_pack",
    digitalPurpose: "other_android_digital_entitlement",
    targetBucket: "purchased_digital_coin_google_billing",
    serverCatalogVersion: "draft_v1",
    activeInDraftCatalog: false,
    androidOnlyBillingRequired: true,
  };
}

export function buildStreamGooglePlayEntitlementVerificationDecisionDraft(
  input: StreamGooglePlayEntitlementVerificationInputDraft,
): StreamGooglePlayEntitlementVerificationDecisionDraft {
  const catalogSnapshot = buildStreamGooglePlayEntitlementCatalogMappingSnapshotDraft();
  const catalogSnapshotSafe = assertStreamGooglePlayEntitlementCatalogMappingDraftSafe(catalogSnapshot);
  const catalogProduct =
    STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT.find((product) => product.productId === input.productId) ??
    fallbackCatalogProductDraft(input.productId);

  const productMissing = !STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT.some((product) => product.productId === input.productId);
  const lifecycle = buildStreamGooglePlayEntitlementLifecycleDraft(
    catalogProduct,
    productMissing
      ? ["catalog_mapping_missing", "provider_keys_pending", "owner_approval_missing"]
      : ["provider_keys_pending", "real_provider_result_missing", "ledger_append_not_done", "owner_approval_missing"],
  );

  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SOURCE_DRAFT_VERSION,
    productId: input.productId,
    platform: "android",
    outcome: productMissing ? "catalog_missing" : "safe_disabled_blocked",
    catalogProduct,
    lifecycle,
    catalogSnapshotSafe,
    providerCallAllowedNow: false,
    dataStoreWriteAllowedNow: false,
    ledgerAppendAllowedNow: false,
    balanceChangeAllowedNow: false,
    walletFlowAllowedNow: false,
    fundsFlowAllowedNow: false,
    entitlementActivationAllowedNow: false,
    creatorReleaseAllowedNow: false,
    merchantReleaseAllowedNow: false,
    rawCredentialReturnAllowed: false,
    rawProviderProofReturnAllowed: false,
    syntheticProviderApprovalAllowed: false,
    liveBillingEnabledNow: false,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function buildStreamGooglePlayEntitlementVerificationServiceSnapshotDraft(
  inputs: readonly StreamGooglePlayEntitlementVerificationInputDraft[] = STREAM_GOOGLE_PLAY_PRODUCT_CATALOG_DRAFT.map((product) => ({
    productId: product.productId,
    platform: "android",
  })),
): readonly StreamGooglePlayEntitlementVerificationDecisionDraft[] {
  return inputs.map((input) => buildStreamGooglePlayEntitlementVerificationDecisionDraft(input));
}

export function assertStreamGooglePlayEntitlementVerificationServiceDraftSafe(
  decisions: readonly StreamGooglePlayEntitlementVerificationDecisionDraft[],
): boolean {
  return (
    STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS.entitlementActivationAllowedNow === false &&
    STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS.providerCallAllowedNow === false &&
    STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS.ledgerAppendAllowedNow === false &&
    STREAM_GOOGLE_PLAY_ENTITLEMENT_CATALOG_MAPPING_SAFE_FLAGS.balanceChangeAllowedNow === false &&
    decisions.every(
      (decision) =>
        decision.providerCallAllowedNow === false &&
        decision.dataStoreWriteAllowedNow === false &&
        decision.ledgerAppendAllowedNow === false &&
        decision.balanceChangeAllowedNow === false &&
        decision.walletFlowAllowedNow === false &&
        decision.fundsFlowAllowedNow === false &&
        decision.entitlementActivationAllowedNow === false &&
        decision.creatorReleaseAllowedNow === false &&
        decision.merchantReleaseAllowedNow === false &&
        decision.rawCredentialReturnAllowed === false &&
        decision.rawProviderProofReturnAllowed === false &&
        decision.syntheticProviderApprovalAllowed === false &&
        decision.liveBillingEnabledNow === false &&
        decision.catalogProduct.targetBucket === "purchased_digital_coin_google_billing" &&
        decision.catalogProduct.activeInDraftCatalog === false,
    )
  );
}
