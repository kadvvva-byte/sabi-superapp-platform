export const STREAM_FOUNDATION_140J_KERNEL_DIAGNOSTICS_CONTROLLED_RUNTIME_SMOKE_APPROVAL_PACKAGE_VERSION = "BACKEND-STREAM-FOUNDATION-140J" as const;

export type StreamFoundation140JRuntimeSmokeApprovalStatus =
  | "controlled_runtime_smoke_approval_package_ready"
  | "controlled_runtime_smoke_blocked_pending_exact_owner_approval";

export type StreamFoundation140JRuntimeSmokeApprovalCheckStatus = "passed" | "blocked";

export interface StreamFoundation140JRuntimeSmokeApprovalCheck {
  readonly id: string;
  readonly label: string;
  readonly status: StreamFoundation140JRuntimeSmokeApprovalCheckStatus;
  readonly evidence: string;
}

export interface StreamFoundation140JRuntimeSmokeApprovalSafetyLocks {
  readonly backendRestartPerformed: 0;
  readonly runtimeHttpSmokePerformedByThisPackage: 0;
  readonly runtimeHttpSmokeAllowedWithoutNextApproval: false;
  readonly databaseWritePerformed: 0;
  readonly providerCallPerformed: 0;
  readonly walletMutationPerformed: 0;
  readonly paymentAuthorizationPerformed: 0;
  readonly monthlyPayoutPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly rawSecretsReturned: 0;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundation140JRuntimeSmokeApprovalTarget {
  readonly path: string;
  readonly method: "GET";
  readonly purpose: string;
  readonly allowedForNextStageOnly: true;
  readonly requiresBackendAlreadyRunning: true;
  readonly mustNotRestartBackend: true;
  readonly mustNotWriteDatabase: true;
  readonly mustNotCallProvider: true;
  readonly mustNotMutateWallet: true;
}

export interface StreamFoundation140JRuntimeSmokeApprovalSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140J_KERNEL_DIAGNOSTICS_CONTROLLED_RUNTIME_SMOKE_APPROVAL_PACKAGE_VERSION;
  readonly status: StreamFoundation140JRuntimeSmokeApprovalStatus;
  readonly artifact: "controlled runtime smoke approval package source-only";
  readonly scope: "foundation_only_runtime_smoke_approval";
  readonly allowedPatchPaths: readonly ["src/modules/stream/foundation/**"];
  readonly forbiddenPatchPaths: readonly [
    "src/modules/stream/index.ts",
    "src/app.ts",
    "src/server.ts",
    "src/modules/wallet/**",
    "src/modules/messenger/**",
    "src/modules/admin/**",
    "prisma/**",
    ".env"
  ];
  readonly nextRuntimeSmokeTargets: readonly StreamFoundation140JRuntimeSmokeApprovalTarget[];
  readonly safetyLocks: StreamFoundation140JRuntimeSmokeApprovalSafetyLocks;
  readonly requiredNextApprovalPhrase: string;
  readonly checks: readonly StreamFoundation140JRuntimeSmokeApprovalCheck[];
  readonly blockingChecks: readonly StreamFoundation140JRuntimeSmokeApprovalCheck[];
}
