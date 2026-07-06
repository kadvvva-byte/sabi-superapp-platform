export const STREAM_FOUNDATION_140N_CONTROLLED_AUTHENTICATED_ADMIN_GET_SMOKE_APPROVAL_VERSION = "BACKEND-STREAM-FOUNDATION-140N" as const;

export type StreamFoundation140NApprovalStatus = "approved_for_runner_package" | "blocked" | "review_required";

export interface StreamFoundation140NApprovalItem {
  readonly id: string;
  readonly status: StreamFoundation140NApprovalStatus;
  readonly evidence: string;
}

export interface StreamFoundation140NAuthenticatedSmokeTarget {
  readonly path: string;
  readonly method: "GET";
  readonly requiresAdminToken: true;
  readonly expectedStatusWithValidAdminToken: 200;
  readonly expectedStatusWithoutToken: readonly [401, 403];
  readonly responseMustBeReadOnlyDiagnostics: true;
}

export interface StreamFoundation140NRunnerConstraints {
  readonly mayCreateOpsRunner: true;
  readonly mayExecuteHttpByThisStage: false;
  readonly allowedMethods: readonly ["GET"];
  readonly allowedHeaders: readonly ["Authorization"];
  readonly tokenInputRuntimeOnly: true;
  readonly tokenStorageAllowed: false;
  readonly tokenLoggingAllowed: false;
  readonly tokenReportAllowed: false;
  readonly backendRestartAllowed: false;
  readonly sourceMutationAllowed: false;
  readonly databaseWriteAllowed: false;
  readonly providerCallAllowed: false;
  readonly walletMutationAllowed: false;
  readonly paymentAuthorizationAllowed: false;
  readonly monthlyPayoutAllowed: false;
  readonly moneyMovementAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundation140NSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140N_CONTROLLED_AUTHENTICATED_ADMIN_GET_SMOKE_APPROVAL_VERSION;
  readonly stage: "controlled_authenticated_admin_get_smoke_approval_package_source_only";
  readonly status: "controlled_authenticated_admin_get_smoke_runner_package_approved_unwritten";
  readonly previousEvidence: {
    readonly tokenReadinessReviewStage: "BACKEND-STREAM-FOUNDATION-140M";
    readonly protectedAdminWithoutTokenVerified: true;
    readonly healthMarkerVerified: true;
    readonly baseUrl: "http://127.0.0.1:4001";
  };
  readonly authenticatedSmokeTargets: readonly StreamFoundation140NAuthenticatedSmokeTarget[];
  readonly runnerConstraints: StreamFoundation140NRunnerConstraints;
  readonly approvalItems: readonly StreamFoundation140NApprovalItem[];
  readonly blockingItems: readonly StreamFoundation140NApprovalItem[];
  readonly nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140O controlled authenticated admin GET smoke runner package";
}
