// BACKEND-STREAM-FOUNDATION-144O
// Read-only entitlement verification route source draft.
// Draft-only: not mounted, no runtime binding, no provider use, no storage write,
// no ledger append, no Sabi balance change, no funds flow, no entitlement activation.

import {
  STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SAFE_FLAGS,
  buildStreamGooglePlayEntitlementVerificationDecisionDraft,
  buildStreamGooglePlayEntitlementVerificationServiceSnapshotDraft,
  assertStreamGooglePlayEntitlementVerificationServiceDraftSafe,
  type StreamGooglePlayEntitlementVerificationDecisionDraft,
  type StreamGooglePlayEntitlementVerificationInputDraft,
} from "./stream-google-play-entitlement-verification-service-source-draft";

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144O" as const;

export type StreamGooglePlayEntitlementVerificationRouteDraftVersion =
  typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayEntitlementVerificationRouteMethodDraft = "GET";

export type StreamGooglePlayEntitlementVerificationRouteSafeFlags = {
  readonly sourceOnly: boolean;
  readonly routeDraftOnly: boolean;
  readonly routeMountAllowedNow: false;
  readonly backendRestartAllowedNow: false;
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

export type StreamGooglePlayEntitlementVerificationRouteInputDraft = {
  readonly productId?: string;
  readonly platform?: "android";
  readonly includeCatalogSnapshot?: boolean;
};

export type StreamGooglePlayEntitlementVerificationRouteSnapshotDraft = {
  readonly version: StreamGooglePlayEntitlementVerificationRouteDraftVersion;
  readonly method: StreamGooglePlayEntitlementVerificationRouteMethodDraft;
  readonly path: "/api/admin/stream/google-play/entitlement-verification/draft";
  readonly mountedNow: false;
  readonly adminAuthRequiredForFutureMount: true;
  readonly readOnly: true;
  readonly safeFlags: StreamGooglePlayEntitlementVerificationRouteSafeFlags;
  readonly serviceSafeFlags: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SAFE_FLAGS;
  readonly decision: StreamGooglePlayEntitlementVerificationDecisionDraft;
  readonly catalogDecisions: readonly StreamGooglePlayEntitlementVerificationDecisionDraft[];
  readonly serviceSnapshotSafe: boolean;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SAFE_FLAGS: StreamGooglePlayEntitlementVerificationRouteSafeFlags = {
  sourceOnly: true,
  routeDraftOnly: true,
  routeMountAllowedNow: false,
  backendRestartAllowedNow: false,
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

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT = {
  method: "GET",
  path: "/api/admin/stream/google-play/entitlement-verification/draft",
  mountedNow: false,
  adminAuthRequiredForFutureMount: true,
  readOnly: true,
} as const;

export function normalizeStreamGooglePlayEntitlementVerificationRouteInputDraft(
  input: StreamGooglePlayEntitlementVerificationRouteInputDraft = {},
): StreamGooglePlayEntitlementVerificationInputDraft {
  return {
    productId: input.productId || "sabi_coin_pack_basic_draft",
    platform: "android",
  };
}

export function buildStreamGooglePlayEntitlementVerificationRouteSnapshotDraft(
  input: StreamGooglePlayEntitlementVerificationRouteInputDraft = {},
): StreamGooglePlayEntitlementVerificationRouteSnapshotDraft {
  const normalized = normalizeStreamGooglePlayEntitlementVerificationRouteInputDraft(input);
  const decision = buildStreamGooglePlayEntitlementVerificationDecisionDraft(normalized);
  const catalogDecisions = input.includeCatalogSnapshot === true
    ? buildStreamGooglePlayEntitlementVerificationServiceSnapshotDraft()
    : [];
  const serviceSnapshotSafe = assertStreamGooglePlayEntitlementVerificationServiceDraftSafe([
    decision,
    ...catalogDecisions,
  ]);

  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SOURCE_DRAFT_VERSION,
    method: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT.method,
    path: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT.path,
    mountedNow: false,
    adminAuthRequiredForFutureMount: true,
    readOnly: true,
    safeFlags: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SAFE_FLAGS,
    serviceSafeFlags: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_SERVICE_SAFE_FLAGS,
    decision,
    catalogDecisions,
    serviceSnapshotSafe,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayEntitlementVerificationRouteDraftSafe(
  value: StreamGooglePlayEntitlementVerificationRouteSnapshotDraft,
): boolean {
  return (
    value.mountedNow === false &&
    value.readOnly === true &&
    value.safeFlags.routeMountAllowedNow === false &&
    value.safeFlags.backendRestartAllowedNow === false &&
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.ledgerAppendAllowedNow === false &&
    value.safeFlags.balanceChangeAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.entitlementActivationAllowedNow === false &&
    value.safeFlags.creatorReleaseAllowedNow === false &&
    value.safeFlags.merchantReleaseAllowedNow === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.decision.providerCallAllowedNow === false &&
    value.decision.dataStoreWriteAllowedNow === false &&
    value.decision.ledgerAppendAllowedNow === false &&
    value.decision.balanceChangeAllowedNow === false &&
    value.decision.walletFlowAllowedNow === false &&
    value.decision.fundsFlowAllowedNow === false &&
    value.decision.entitlementActivationAllowedNow === false
  );
}
