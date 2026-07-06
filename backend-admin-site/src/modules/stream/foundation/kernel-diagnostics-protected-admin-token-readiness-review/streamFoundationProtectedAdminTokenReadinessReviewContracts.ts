export const STREAM_FOUNDATION_140M_PROTECTED_ADMIN_TOKEN_READINESS_REVIEW_VERSION = "BACKEND-STREAM-FOUNDATION-140M" as const;

export type StreamFoundation140MReviewStatus = "passed" | "blocked" | "review_required";

export interface StreamFoundation140MReviewItem {
  readonly id: string;
  readonly status: StreamFoundation140MReviewStatus;
  readonly evidence: string;
}

export interface StreamFoundation140MAdminReadinessTarget {
  readonly path: string;
  readonly method: "GET";
  readonly authRequired: true;
  readonly expectedWithoutToken: readonly [401, 403];
  readonly expectedWithValidAdminToken: readonly [200];
  readonly bodyMustStayReadOnly: true;
}

export interface StreamFoundation140MSafety {
  readonly backendRestartPerformed: 0;
  readonly runtimeHttpSmokePerformedByThisStage: 0;
  readonly authenticatedHttpSmokePerformedByThisStage: 0;
  readonly tokenValueStored: false;
  readonly rawTokenReturned: false;
  readonly databaseWritePerformed: 0;
  readonly providerCallPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundation140MSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140M_PROTECTED_ADMIN_TOKEN_READINESS_REVIEW_VERSION;
  readonly stage: "protected_admin_token_readiness_review_source_only";
  readonly status: "protected_admin_token_readiness_review_ready";
  readonly previousEvidence: {
    readonly postRuntimeSmokeStage: "BACKEND-STREAM-FOUNDATION-140L";
    readonly runtimeSmokeStage: "BACKEND-STREAM-FOUNDATION-140K-FIX1";
    readonly healthStatusCode: 200;
    readonly streamFoundationMarkerAccepted: true;
    readonly adminRoutesProtectedWithoutToken: true;
  };
  readonly adminReadinessTargets: readonly StreamFoundation140MAdminReadinessTarget[];
  readonly tokenHandlingRules: readonly string[];
  readonly reviewItems: readonly StreamFoundation140MReviewItem[];
  readonly blockingItems: readonly StreamFoundation140MReviewItem[];
  readonly safety: StreamFoundation140MSafety;
  readonly nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140N controlled authenticated admin GET smoke approval package";
}
