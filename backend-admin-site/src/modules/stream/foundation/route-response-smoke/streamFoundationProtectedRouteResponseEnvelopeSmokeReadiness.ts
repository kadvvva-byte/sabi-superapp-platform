import { getStreamFoundationProtectedRouteResponseEnvelopeSmokeCases } from "./streamFoundationProtectedRouteResponseEnvelopeSmoke";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE,
  type StreamFoundationProtectedRouteResponseEnvelopeSmokeSnapshot,
} from "./streamFoundationProtectedRouteResponseEnvelopeSmokeTypes";

function hasCase(cases: readonly { routeId: string }[], routeId: string): true {
  if (!cases.some((item) => item.routeId === routeId)) {
    throw new Error(`Missing required Stream protected route response envelope smoke case: ${routeId}`);
  }
  return true;
}

export function getStreamFoundationProtectedRouteResponseEnvelopeSmokeSnapshot(): StreamFoundationProtectedRouteResponseEnvelopeSmokeSnapshot {
  const cases = getStreamFoundationProtectedRouteResponseEnvelopeSmokeCases();
  hasCase(cases, "stream_foundation_preview");
  hasCase(cases, "stream_live_start");
  hasCase(cases, "stream_short_publish");
  hasCase(cases, "stream_gift_purchase_gate");
  hasCase(cases, "admin_stream_monetization_snapshot");
  hasCase(cases, "admin_stream_monetization_save");
  hasCase(cases, "admin_stream_monthly_payout_gate");

  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE,
    status: "protected_route_response_envelope_smoke_ready_not_mounted",
    cases,
    totalCases: cases.length,
    passedCases: cases.filter((item) => item.status === "passed").length,
    reviewRequiredCases: cases.filter((item) => item.status === "review_required").length,
    blockedCases: cases.filter((item) => item.status === "blocked").length,
    responseEnvelopeCoverage: {
      protectedRouteResponsesMapped: true,
      securityResultsMapped: true,
      safeCodesMapped: true,
      safeMessageKeysMapped: true,
      redactedResponseOnly: true,
      rawSecretsBlocked: true,
      mobileProviderKeysBlocked: true,
      fakeMoneySuccessBlocked: true,
      routeMountBlocked: true,
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

export const STREAM_FOUNDATION_137F_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_SNAPSHOT =
  getStreamFoundationProtectedRouteResponseEnvelopeSmokeSnapshot();
