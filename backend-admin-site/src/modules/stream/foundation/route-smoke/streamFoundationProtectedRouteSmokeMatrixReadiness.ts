import { getStreamFoundationProtectedRouteSmokeCases } from "./streamFoundationProtectedRouteSmokeMatrix";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE,
  type StreamFoundationProtectedRouteSmokeMatrixSnapshot,
} from "./streamFoundationProtectedRouteSmokeMatrixTypes";

function hasCase(cases: readonly { routeId: string }[], routeId: string): true {
  if (!cases.some((item) => item.routeId === routeId)) {
    throw new Error(`Missing required Stream protected route smoke case: ${routeId}`);
  }
  return true;
}

export function getStreamFoundationProtectedRouteSmokeMatrixSnapshot(): StreamFoundationProtectedRouteSmokeMatrixSnapshot {
  const cases = getStreamFoundationProtectedRouteSmokeCases();
  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE,
    status: "protected_route_smoke_matrix_ready_not_mounted",
    cases,
    totalCases: cases.length,
    passedCases: cases.filter((item) => item.status === "passed").length,
    blockedCases: cases.filter((item) => item.status === "blocked").length,
    reviewRequiredCases: cases.filter((item) => item.status === "review_required").length,
    requiredRouteCoverage: {
      foundationPreview: hasCase(cases, "stream_foundation_preview"),
      liveStart: hasCase(cases, "stream_live_start"),
      shortPublish: hasCase(cases, "stream_short_publish"),
      giftPurchaseGate: hasCase(cases, "stream_gift_purchase_gate"),
      adminMonetizationSnapshot: hasCase(cases, "admin_stream_monetization_snapshot"),
      adminMonetizationSave: hasCase(cases, "admin_stream_monetization_save"),
      adminMonthlyPayoutGate: hasCase(cases, "admin_stream_monthly_payout_gate"),
      coveragePercent: 100,
    },
    safety: {
      localStagingOnly: true,
      routeMountAllowedNow: false,
      appServerEntryTouched: false,
      databaseReadAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      realtimePublishAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
  };
}

export const STREAM_FOUNDATION_137E_PROTECTED_ROUTE_SMOKE_MATRIX_SNAPSHOT =
  getStreamFoundationProtectedRouteSmokeMatrixSnapshot();
