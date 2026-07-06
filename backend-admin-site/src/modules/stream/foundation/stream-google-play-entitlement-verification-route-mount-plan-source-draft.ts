// BACKEND-STREAM-FOUNDATION-144Q
// Protected read-only entitlement verification route mount planning.
// Planning-only: no route registration, no backend runtime change, no provider use,
// no storage write, no ledger append, no Sabi balance change, no funds flow,
// no entitlement activation, and no raw credential or proof output.

import {
  STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT,
  STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SAFE_FLAGS,
  buildStreamGooglePlayEntitlementVerificationRouteSnapshotDraft,
  assertStreamGooglePlayEntitlementVerificationRouteDraftSafe,
  type StreamGooglePlayEntitlementVerificationRouteSnapshotDraft,
} from "./stream-google-play-entitlement-verification-route-source-draft";

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144Q" as const;

export type StreamGooglePlayEntitlementVerificationRouteMountPlanDraftVersion =
  typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayEntitlementVerificationRouteMountPlanStatusDraft =
  | "planning_only"
  | "blocked_until_separate_owner_approval"
  | "blocked_until_admin_auth_confirmed"
  | "blocked_until_backend_restart_approval"
  | "blocked_until_google_provider_keys_ready"
  | "ready_for_future_mount_preflight";

export type StreamGooglePlayEntitlementVerificationRouteMountPlanSafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly routeMountExecutionAllowedNow: false;
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

export type StreamGooglePlayEntitlementVerificationRouteMountPlanGateDraft = {
  readonly gate: string;
  readonly passed: boolean;
  readonly requiredBeforeFutureMount: boolean;
  readonly note: string;
};

export type StreamGooglePlayEntitlementVerificationRouteMountPlanDraft = {
  readonly version: StreamGooglePlayEntitlementVerificationRouteMountPlanDraftVersion;
  readonly status: StreamGooglePlayEntitlementVerificationRouteMountPlanStatusDraft;
  readonly plannedRoute: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT;
  readonly routeSnapshot: StreamGooglePlayEntitlementVerificationRouteSnapshotDraft;
  readonly routeSnapshotSafe: boolean;
  readonly protectedAdminAuthRequired: true;
  readonly plannedMountTarget: "admin_stream_foundation_routes";
  readonly futureMountExecutionRequiresSeparateApproval: true;
  readonly backendRestartRequiresSeparateApproval: true;
  readonly safeFlags: StreamGooglePlayEntitlementVerificationRouteMountPlanSafeFlags;
  readonly gates: readonly StreamGooglePlayEntitlementVerificationRouteMountPlanGateDraft[];
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SAFE_FLAGS: StreamGooglePlayEntitlementVerificationRouteMountPlanSafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  routeMountExecutionAllowedNow: false,
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

export function buildStreamGooglePlayEntitlementVerificationRouteMountPlanDraft(): StreamGooglePlayEntitlementVerificationRouteMountPlanDraft {
  const routeSnapshot = buildStreamGooglePlayEntitlementVerificationRouteSnapshotDraft({
    productId: "sabi_coin_pack_basic_draft",
    platform: "android",
    includeCatalogSnapshot: true,
  });
  const routeSnapshotSafe = assertStreamGooglePlayEntitlementVerificationRouteDraftSafe(routeSnapshot);

  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SOURCE_DRAFT_VERSION,
    status: "blocked_until_separate_owner_approval",
    plannedRoute: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT,
    routeSnapshot,
    routeSnapshotSafe,
    protectedAdminAuthRequired: true,
    plannedMountTarget: "admin_stream_foundation_routes",
    futureMountExecutionRequiresSeparateApproval: true,
    backendRestartRequiresSeparateApproval: true,
    safeFlags: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SAFE_FLAGS,
    gates: [
      {
        gate: "route_snapshot_safe",
        passed: routeSnapshotSafe,
        requiredBeforeFutureMount: true,
        note: "Route snapshot must remain read-only and safe-disabled.",
      },
      {
        gate: "protected_admin_auth_required",
        passed: true,
        requiredBeforeFutureMount: true,
        note: "Future mount must stay behind protected Admin auth.",
      },
      {
        gate: "google_provider_keys_ready",
        passed: false,
        requiredBeforeFutureMount: false,
        note: "Google keys are pending; this read-only route may still expose blocked status only.",
      },
      {
        gate: "separate_owner_approval_for_mount",
        passed: false,
        requiredBeforeFutureMount: true,
        note: "Future route registration requires a separate exact owner approval.",
      },
      {
        gate: "separate_owner_approval_for_backend_restart",
        passed: false,
        requiredBeforeFutureMount: true,
        note: "Future backend restart requires a separate exact owner approval.",
      },
    ],
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayEntitlementVerificationRouteMountPlanDraftSafe(
  value: StreamGooglePlayEntitlementVerificationRouteMountPlanDraft,
): boolean {
  return (
    value.routeSnapshotSafe === true &&
    value.protectedAdminAuthRequired === true &&
    value.futureMountExecutionRequiresSeparateApproval === true &&
    value.backendRestartRequiresSeparateApproval === true &&
    value.safeFlags.routeMountExecutionAllowedNow === false &&
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
    STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_SAFE_FLAGS.routeMountAllowedNow === false
  );
}
