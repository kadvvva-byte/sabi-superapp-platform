import type { StreamFoundationProtectedRouteFactoryResponse } from "../route-factory";
import type { StreamFoundationProtectedRouteSmokeCase } from "../route-smoke";

export const STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE = "BACKEND_STREAM_FOUNDATION_137F_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGING" as const;

export type StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus = "passed" | "blocked" | "review_required";

export type StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation = Readonly<{
  routeSmokeCaseFound: boolean;
  protectedPreviewResponseFound: boolean;
  statusCode: number;
  okFlag: boolean;
  safeCodePresent: boolean;
  safeMessageKeyPresent: boolean;
  securityResultPresent: boolean;
  securityDecisionCount: number;
  requiredBeforeLiveMountCount: number;
  redactedResponseOnly: boolean;
  apiPreviewEnvelopeSafe: boolean;
  routeMountedNow: boolean;
  runtimeExecutionAllowedNow: boolean;
  databaseWriteAllowedNow: boolean;
  providerCallAllowedNow: boolean;
  moneyMovementAllowedNow: boolean;
  rawSecretsReturned: boolean;
  mobileProviderKeysAllowed: boolean;
  fakePaymentSuccessAllowed: boolean;
  fakeGiftSuccessAllowed: boolean;
  fakePayoutSuccessAllowed: boolean;
}>;

export type StreamFoundationProtectedRouteResponseEnvelopeSmokeCase = Readonly<{
  caseId: string;
  routeId: string;
  method: string;
  path: string;
  status: StreamFoundationProtectedRouteResponseEnvelopeSmokeStatus;
  safeCode: "STREAM_ROUTE_RESPONSE_ENVELOPE_SMOKE_PASSED" | "STREAM_ROUTE_RESPONSE_ENVELOPE_REVIEW_REQUIRED" | "STREAM_ROUTE_RESPONSE_ENVELOPE_SMOKE_BLOCKED";
  safeMessageKey: string;
  observation: StreamFoundationProtectedRouteResponseEnvelopeSmokeObservation;
  sourceSmokeCase: StreamFoundationProtectedRouteSmokeCase;
  protectedResponse?: StreamFoundationProtectedRouteFactoryResponse;
}>;

export type StreamFoundationProtectedRouteResponseEnvelopeSmokeSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_RESPONSE_ENVELOPE_SMOKE_STAGE;
  status: "protected_route_response_envelope_smoke_ready_not_mounted";
  cases: readonly StreamFoundationProtectedRouteResponseEnvelopeSmokeCase[];
  totalCases: number;
  passedCases: number;
  reviewRequiredCases: number;
  blockedCases: number;
  responseEnvelopeCoverage: Readonly<{
    protectedRouteResponsesMapped: true;
    securityResultsMapped: true;
    safeCodesMapped: true;
    safeMessageKeysMapped: true;
    redactedResponseOnly: true;
    rawSecretsBlocked: true;
    mobileProviderKeysBlocked: true;
    fakeMoneySuccessBlocked: true;
    routeMountBlocked: true;
    coveragePercent: 100;
  }>;
  safety: Readonly<{
    localStagingOnly: true;
    routeMountAllowedNow: false;
    appServerEntryTouched: false;
    databaseReadAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    realtimePublishAllowedNow: false;
    mediaStorageWriteAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    moneyMovementAllowedNow: false;
    rawSecretsReturned: false;
    mobileProviderKeysAllowed: false;
    fakeSuccessAllowed: false;
  }>;
}>;
