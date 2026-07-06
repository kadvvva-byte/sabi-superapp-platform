import type {
  StreamFoundationProtectedRouteDefinition,
  StreamFoundationProtectedRouteDefinitionPreview,
} from "../route-definitions";

export const STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE = "BACKEND_STREAM_FOUNDATION_137E_PROTECTED_ROUTE_SMOKE_MATRIX_STAGING" as const;

export type StreamFoundationProtectedRouteSmokeCaseStatus = "passed" | "blocked" | "review_required";

export type StreamFoundationProtectedRouteSmokeCaseKind =
  | "foundation_preview"
  | "mobile_live_write"
  | "mobile_shorts_write"
  | "gift_purchase_gate"
  | "admin_monetization_read"
  | "admin_monetization_write"
  | "monthly_payout_gate";

export type StreamFoundationProtectedRouteSmokeCaseExpectation = Readonly<{
  definitionMustExist: true;
  previewMustExist: true;
  protectedBySecurityPipeline: true;
  routeMountedNow: false;
  appServerTouchedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  messengerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export type StreamFoundationProtectedRouteSmokeCaseObservation = Readonly<{
  definitionFound: boolean;
  previewFound: boolean;
  protectedBySecurityPipeline: boolean;
  factoryStatus: string;
  responseStatus: number;
  securityDecisionCount: number;
  routeMountDecisionPresent: boolean;
  moneyMovementDecisionPresent: boolean;
  redactedResponseOnly: boolean;
  routeMountedNow: boolean;
  runtimeExecutionAllowedNow: boolean;
  databaseReadAllowedNow: boolean;
  databaseWriteAllowedNow: boolean;
  providerCallAllowedNow: boolean;
  realtimePublishAllowedNow: boolean;
  mediaStorageWriteAllowedNow: boolean;
  walletMutationAllowedNow: boolean;
  messengerMutationAllowedNow: boolean;
  moneyMovementAllowedNow: boolean;
  rawSecretsReturned: boolean;
  mobileProviderKeysAllowed: boolean;
  fakePaymentSuccessAllowed: boolean;
  fakeGiftSuccessAllowed: boolean;
  fakePayoutSuccessAllowed: boolean;
}>;

export type StreamFoundationProtectedRouteSmokeCase = Readonly<{
  caseId: string;
  routeId: string;
  kind: StreamFoundationProtectedRouteSmokeCaseKind;
  method: string;
  path: string;
  expectation: StreamFoundationProtectedRouteSmokeCaseExpectation;
  observation: StreamFoundationProtectedRouteSmokeCaseObservation;
  status: StreamFoundationProtectedRouteSmokeCaseStatus;
  safeCode: "STREAM_ROUTE_SMOKE_PASSED" | "STREAM_ROUTE_SMOKE_BLOCKED" | "STREAM_ROUTE_SMOKE_REVIEW_REQUIRED";
  safeMessageKey: string;
  definition?: StreamFoundationProtectedRouteDefinition;
  preview?: StreamFoundationProtectedRouteDefinitionPreview;
}>;

export type StreamFoundationProtectedRouteSmokeMatrixSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_PROTECTED_ROUTE_SMOKE_MATRIX_STAGE;
  status: "protected_route_smoke_matrix_ready_not_mounted";
  cases: readonly StreamFoundationProtectedRouteSmokeCase[];
  totalCases: number;
  passedCases: number;
  blockedCases: number;
  reviewRequiredCases: number;
  requiredRouteCoverage: Readonly<{
    foundationPreview: true;
    liveStart: true;
    shortPublish: true;
    giftPurchaseGate: true;
    adminMonetizationSnapshot: true;
    adminMonetizationSave: true;
    adminMonthlyPayoutGate: true;
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
