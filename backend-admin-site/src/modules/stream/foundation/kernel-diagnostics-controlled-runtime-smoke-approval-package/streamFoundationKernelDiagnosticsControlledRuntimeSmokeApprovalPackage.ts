import {
  STREAM_FOUNDATION_140J_KERNEL_DIAGNOSTICS_CONTROLLED_RUNTIME_SMOKE_APPROVAL_PACKAGE_VERSION,
  type StreamFoundation140JRuntimeSmokeApprovalCheck,
  type StreamFoundation140JRuntimeSmokeApprovalSafetyLocks,
  type StreamFoundation140JRuntimeSmokeApprovalSnapshot,
  type StreamFoundation140JRuntimeSmokeApprovalTarget,
} from "./streamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageContracts";

const safetyLocks: StreamFoundation140JRuntimeSmokeApprovalSafetyLocks = {
  backendRestartPerformed: 0,
  runtimeHttpSmokePerformedByThisPackage: 0,
  runtimeHttpSmokeAllowedWithoutNextApproval: false,
  databaseWritePerformed: 0,
  providerCallPerformed: 0,
  walletMutationPerformed: 0,
  paymentAuthorizationPerformed: 0,
  monthlyPayoutPerformed: 0,
  moneyMovementPerformed: 0,
  rawSecretsReturned: 0,
  fakeSuccessAllowed: false,
};

const nextRuntimeSmokeTargets: readonly StreamFoundation140JRuntimeSmokeApprovalTarget[] = [
  {
    path: "/health",
    method: "GET",
    purpose: "Confirm the already-running backend exposes the Stream foundation health marker after the controlled source write.",
    allowedForNextStageOnly: true,
    requiresBackendAlreadyRunning: true,
    mustNotRestartBackend: true,
    mustNotWriteDatabase: true,
    mustNotCallProvider: true,
    mustNotMutateWallet: true,
  },
  {
    path: "/api/admin/stream/foundation/diagnostics/readiness",
    method: "GET",
    purpose: "Confirm the mounted diagnostics readiness route returns a controlled foundation-only readiness snapshot.",
    allowedForNextStageOnly: true,
    requiresBackendAlreadyRunning: true,
    mustNotRestartBackend: true,
    mustNotWriteDatabase: true,
    mustNotCallProvider: true,
    mustNotMutateWallet: true,
  },
  {
    path: "/api/admin/stream/foundation/diagnostics/preview",
    method: "GET",
    purpose: "Confirm the mounted diagnostics preview route returns a controlled foundation-only preview snapshot.",
    allowedForNextStageOnly: true,
    requiresBackendAlreadyRunning: true,
    mustNotRestartBackend: true,
    mustNotWriteDatabase: true,
    mustNotCallProvider: true,
    mustNotMutateWallet: true,
  },
];

const checks: readonly StreamFoundation140JRuntimeSmokeApprovalCheck[] = [
  {
    id: "source_only_foundation_scope",
    label: "140J patch is limited to Stream foundation diagnostics files.",
    status: "passed",
    evidence: "No entry file, app file, server file, Wallet, provider, Prisma, Admin, Messenger, or env source is part of this package.",
  },
  {
    id: "runtime_smoke_not_executed",
    label: "Runtime smoke is approved for a future step only and is not executed by this package.",
    status: "passed",
    evidence: "runtimeHttpSmokePerformedByThisPackage remains 0 and the next stage requires exact owner approval.",
  },
  {
    id: "backend_restart_forbidden",
    label: "Backend restart remains forbidden at this approval stage.",
    status: "passed",
    evidence: "140J contains no restart command and no runtime execution instruction.",
  },
  {
    id: "database_provider_wallet_forbidden",
    label: "Database, provider, Wallet, payment, payout, and money movement remain forbidden.",
    status: "passed",
    evidence: "All safety lock counters are zero and fake success is false.",
  },
  {
    id: "runtime_targets_are_read_only_gets",
    label: "Future runtime smoke targets are read-only GET routes only.",
    status: "passed",
    evidence: "The target list contains only GET /health and Stream diagnostics GET routes.",
  },
  {
    id: "exact_next_approval_required",
    label: "The next runtime smoke step requires an exact approval phrase.",
    status: "passed",
    evidence: "The package publishes the exact required approval phrase for 140K.",
  },
];

export function getStreamFoundationKernelDiagnosticsControlledRuntimeSmokeApprovalPackageSnapshot(): StreamFoundation140JRuntimeSmokeApprovalSnapshot {
  const blockingChecks = checks.filter((check) => check.status === "blocked");

  return {
    version: STREAM_FOUNDATION_140J_KERNEL_DIAGNOSTICS_CONTROLLED_RUNTIME_SMOKE_APPROVAL_PACKAGE_VERSION,
    status: blockingChecks.length === 0
      ? "controlled_runtime_smoke_approval_package_ready"
      : "controlled_runtime_smoke_blocked_pending_exact_owner_approval",
    artifact: "controlled runtime smoke approval package source-only",
    scope: "foundation_only_runtime_smoke_approval",
    allowedPatchPaths: ["src/modules/stream/foundation/**"],
    forbiddenPatchPaths: [
      "src/modules/stream/index.ts",
      "src/app.ts",
      "src/server.ts",
      "src/modules/wallet/**",
      "src/modules/messenger/**",
      "src/modules/admin/**",
      "prisma/**",
      ".env",
    ],
    nextRuntimeSmokeTargets,
    safetyLocks,
    requiredNextApprovalPhrase:
      "I approve BACKEND-STREAM-FOUNDATION-140K controlled runtime HTTP smoke only, no backend restart, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement, no fake success.",
    checks,
    blockingChecks,
  };
}
