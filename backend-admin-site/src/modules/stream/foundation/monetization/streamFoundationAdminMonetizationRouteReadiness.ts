import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminMonetizationUiImplementationReadiness } from "./streamFoundationAdminMonetizationUiImplementationReadiness";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./streamFoundationGiftTransactionFlowReadiness";
import { STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE } from "./streamFoundationAdminMonetizationRouteContracts";
import { getStreamFoundationAdminMonetizationRouteSafePreview } from "./streamFoundationAdminMonetizationRouteService";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136W_ADMIN_MONETIZATION_ROUTE_READINESS_STAGING" as const;

export type StreamFoundationAdminMonetizationRouteReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_READINESS_STAGE;
  routeStage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE;
  dependsOn: readonly string[];
  safePreviewDecision: ReturnType<typeof getStreamFoundationAdminMonetizationRouteSafePreview>["decisionCode"];
  uiImplementationReady: ReturnType<typeof getStreamFoundationAdminMonetizationUiImplementationReadiness>["safeToPatchRealAdminUiNext"];
  giftFlowReadyForPlanning: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadinessSnapshot>["readyForRouteMountApprovalPlanning"];
  implementedRouteHandlers: readonly string[];
  supportsRedactedSnapshot: true;
  supportsDraftValidation: true;
  supportsInMemoryProviderRefSaveForStaging: true;
  supportsInMemoryMonthlyPayoutPolicySaveForStaging: true;
  supportsProviderDisableForStaging: true;
  blocksProviderLiveTestUntilRealProviderApproval: true;
  auditDraftCreatedForEveryWrite: true;
  idempotencyRequiredForEveryWrite: true;
  routeMountAllowedNow: false;
  routeMountedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  readyForRealRouteMountAfterOwnerApproval: boolean;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationAdminMonetizationRouteReadinessSnapshot(): StreamFoundationAdminMonetizationRouteReadinessSnapshot {
  const safePreview = getStreamFoundationAdminMonetizationRouteSafePreview();
  const uiReadiness = getStreamFoundationAdminMonetizationUiImplementationReadiness();
  const giftReadiness = getStreamFoundationGiftTransactionFlowReadinessSnapshot();
  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_READINESS_STAGE,
    routeStage: STREAM_FOUNDATION_ADMIN_MONETIZATION_ROUTE_STAGE,
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-136P",
      "BACKEND-STREAM-FOUNDATION-136Q",
      "BACKEND-STREAM-FOUNDATION-136R",
      "BACKEND-STREAM-FOUNDATION-136S",
      "BACKEND-STREAM-FOUNDATION-136T",
      "BACKEND-STREAM-FOUNDATION-136U",
      "BACKEND-STREAM-FOUNDATION-136V",
    ],
    safePreviewDecision: safePreview.decisionCode,
    uiImplementationReady: uiReadiness.safeToPatchRealAdminUiNext,
    giftFlowReadyForPlanning: giftReadiness.readyForRouteMountApprovalPlanning,
    implementedRouteHandlers: [
      "GET /api/admin/stream/monetization/config/snapshot",
      "POST /api/admin/stream/monetization/config/validate",
      "POST /api/admin/stream/monetization/config/provider-ref",
      "POST /api/admin/stream/monetization/config/monthly-payout-policy",
      "POST /api/admin/stream/monetization/config/provider-live-test-gate",
      "POST /api/admin/stream/monetization/config/disable-provider",
      "POST /api/admin/stream/monetization/config/rotate-provider-secret-ref",
      "GET /api/admin/stream/monetization/config/readiness",
    ],
    supportsRedactedSnapshot: true,
    supportsDraftValidation: true,
    supportsInMemoryProviderRefSaveForStaging: true,
    supportsInMemoryMonthlyPayoutPolicySaveForStaging: true,
    supportsProviderDisableForStaging: true,
    blocksProviderLiveTestUntilRealProviderApproval: true,
    auditDraftCreatedForEveryWrite: true,
    idempotencyRequiredForEveryWrite: true,
    routeMountAllowedNow: false,
    routeMountedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    readyForRealRouteMountAfterOwnerApproval:
      safePreview.decisionCode === "admin_monetization_route_snapshot_ready" &&
      uiReadiness.safeToPatchRealAdminUiNext &&
      giftReadiness.readyForRouteMountApprovalPlanning,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
