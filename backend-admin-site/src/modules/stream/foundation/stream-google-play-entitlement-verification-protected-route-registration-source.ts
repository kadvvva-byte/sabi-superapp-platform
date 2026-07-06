// BACKEND-STREAM-FOUNDATION-144T
// Protected read-only route registration source.
// Source-only: this file exports a registration function. It is not imported by
// app.ts in this stage, backend is not restarted, and runtime route remains inactive.

import {
  STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT,
  buildStreamGooglePlayEntitlementVerificationRouteSnapshotDraft,
  assertStreamGooglePlayEntitlementVerificationRouteDraftSafe,
  type StreamGooglePlayEntitlementVerificationRouteSnapshotDraft,
} from "./stream-google-play-entitlement-verification-route-source-draft";
import {
  STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SAFE_FLAGS,
  buildStreamGooglePlayEntitlementVerificationRouteMountPlanDraft,
  assertStreamGooglePlayEntitlementVerificationRouteMountPlanDraftSafe,
} from "./stream-google-play-entitlement-verification-route-mount-plan-source-draft";

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_REGISTRATION_SOURCE_VERSION =
  "BACKEND-STREAM-FOUNDATION-144T" as const;

export const STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH =
  "/api/admin/stream/google-play/entitlement-verification/draft" as const;

export type StreamRouteQueryValue = string | readonly string[] | undefined;

export type StreamRouteReqDraft = {
  readonly query?: Readonly<Record<string, StreamRouteQueryValue>>;
};

export type StreamRouteResDraft = {
  readonly status: (code: number) => StreamRouteResDraft;
  readonly json: (body: unknown) => unknown;
};

export type StreamRouteNextDraft = () => void;

export type StreamProtectedAdminGuardDraft = (
  req: StreamRouteReqDraft,
  res: StreamRouteResDraft,
  next: StreamRouteNextDraft,
) => unknown;

export type StreamRouteHandlerDraft = (
  req: StreamRouteReqDraft,
  res: StreamRouteResDraft,
  next: StreamRouteNextDraft,
) => unknown;

export type StreamRouterLikeDraft = {
  readonly get: (
    routePath: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH,
    guard: StreamProtectedAdminGuardDraft,
    handler: StreamRouteHandlerDraft,
  ) => unknown;
};

export type StreamGooglePlayEntitlementVerificationProtectedRouteRegistrationResultDraft = {
  readonly version: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_REGISTRATION_SOURCE_VERSION;
  readonly routePath: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH;
  readonly method: "GET";
  readonly protectedAdminAuthRequired: true;
  readonly readOnly: true;
  readonly routeRegistrationSourceReady: true;
  readonly runtimeRouteActiveByThisStage: false;
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
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

function firstQueryValue(value: StreamRouteQueryValue): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return typeof value[0] === "string" ? value[0] : undefined;
  return undefined;
}

function parseIncludeCatalogSnapshot(value: StreamRouteQueryValue): boolean {
  return firstQueryValue(value) === "true";
}

export function buildStreamGooglePlayEntitlementVerificationProtectedRouteBodyDraft(
  req: StreamRouteReqDraft = {},
): {
  readonly ok: false;
  readonly status: "safe_disabled_blocked";
  readonly routePath: typeof STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH;
  readonly routeSnapshot: StreamGooglePlayEntitlementVerificationRouteSnapshotDraft;
  readonly mountPlanSafe: boolean;
  readonly note: string;
} {
  const productId = firstQueryValue(req.query?.productId);
  const includeCatalogSnapshot = parseIncludeCatalogSnapshot(req.query?.includeCatalogSnapshot);
  const routeSnapshot = buildStreamGooglePlayEntitlementVerificationRouteSnapshotDraft({
    productId,
    platform: "android",
    includeCatalogSnapshot,
  });
  const routeSafe = assertStreamGooglePlayEntitlementVerificationRouteDraftSafe(routeSnapshot);
  const mountPlan = buildStreamGooglePlayEntitlementVerificationRouteMountPlanDraft();
  const mountPlanSafe = assertStreamGooglePlayEntitlementVerificationRouteMountPlanDraftSafe(mountPlan);

  return {
    ok: false,
    status: "safe_disabled_blocked",
    routePath: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH,
    routeSnapshot,
    mountPlanSafe: routeSafe && mountPlanSafe,
    note: "Read-only safe-disabled draft. No provider verification or entitlement activation is performed.",
  };
}

export function createStreamGooglePlayEntitlementVerificationProtectedRouteHandlerDraft(): StreamRouteHandlerDraft {
  return (req, res) => {
    const body = buildStreamGooglePlayEntitlementVerificationProtectedRouteBodyDraft(req);
    const httpStatus = body.mountPlanSafe ? 409 : 500;
    return res.status(httpStatus).json(body);
  };
}

export function registerStreamGooglePlayEntitlementVerificationProtectedRouteDraft(
  router: StreamRouterLikeDraft,
  protectedAdminGuard: StreamProtectedAdminGuardDraft,
): StreamGooglePlayEntitlementVerificationProtectedRouteRegistrationResultDraft {
  router.get(
    STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH,
    protectedAdminGuard,
    createStreamGooglePlayEntitlementVerificationProtectedRouteHandlerDraft(),
  );

  return {
    version: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_REGISTRATION_SOURCE_VERSION,
    routePath: STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_PROTECTED_ROUTE_PATH,
    method: "GET",
    protectedAdminAuthRequired: true,
    readOnly: true,
    routeRegistrationSourceReady: true,
    runtimeRouteActiveByThisStage: false,
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
    rawCredentialReturnAllowed: false,
    rawProviderProofReturnAllowed: false,
    syntheticProviderApprovalAllowed: false,
    liveBillingEnabledNow: false,
  };
}

export function assertStreamGooglePlayEntitlementVerificationProtectedRouteRegistrationSourceSafe(
  value: StreamGooglePlayEntitlementVerificationProtectedRouteRegistrationResultDraft,
): boolean {
  return (
    value.protectedAdminAuthRequired === true &&
    value.readOnly === true &&
    value.routeRegistrationSourceReady === true &&
    value.runtimeRouteActiveByThisStage === false &&
    value.backendRestartAllowedNow === false &&
    value.providerCallAllowedNow === false &&
    value.dataStoreWriteAllowedNow === false &&
    value.ledgerAppendAllowedNow === false &&
    value.balanceChangeAllowedNow === false &&
    value.walletFlowAllowedNow === false &&
    value.fundsFlowAllowedNow === false &&
    value.entitlementActivationAllowedNow === false &&
    value.creatorReleaseAllowedNow === false &&
    value.merchantReleaseAllowedNow === false &&
    value.rawCredentialReturnAllowed === false &&
    value.rawProviderProofReturnAllowed === false &&
    value.syntheticProviderApprovalAllowed === false &&
    value.liveBillingEnabledNow === false &&
    STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_MOUNT_PLAN_SAFE_FLAGS.routeMountExecutionAllowedNow === false &&
    STREAM_GOOGLE_PLAY_ENTITLEMENT_VERIFICATION_ROUTE_DRAFT.mountedNow === false
  );
}
