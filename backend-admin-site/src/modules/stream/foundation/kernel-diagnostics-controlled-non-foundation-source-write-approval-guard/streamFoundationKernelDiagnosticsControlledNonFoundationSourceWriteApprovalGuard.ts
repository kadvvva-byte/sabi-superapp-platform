import {
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageSnapshot,
} from "../kernel-diagnostics-controlled-non-foundation-source-write-approval-package";
import {
  STREAM_FOUNDATION_140H_PRE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_APPROVAL_GUARD_VERSION,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardCheck,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardDecision,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSafety,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardTargetPath,
} from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardContracts";

const EXACT_OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-140H controlled non-foundation source write patch package only, write src/modules/stream/index.ts and src/app.ts exactly as reviewed, no src/server.ts change, no backend restart, no runtime HTTP smoke, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement.";

const TARGET_PATHS: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardTargetPath[] = [
  "src/modules/stream/index.ts",
  "src/app.ts",
  "src/server.ts",
  "rollback_plan",
];

const SAFETY: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  guardPackageBuiltNow: true,
  exactOwnerApprovalPhraseRequired: true,
  exactOwnerApprovalPhraseReceivedNow: false,
  userInstructionWasGenericNextOnly: true,
  genericNextIsNotSufficientForEntryWrite: true,
  nonFoundationSourceWriteAllowedNow: false,
  nonFoundationFilesWrittenNow: false,
  streamIndexWrittenNow: false,
  appTsWrittenNow: false,
  serverTsWrittenNow: false,
  routeMountSourceWrittenNow: false,
  routeMountRuntimePerformedNow: false,
  protectedRouteRegisteredAtRuntimeNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
  runtimeHttpRequestAllowedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
  readyForRuntimeMount: false,
  readyForRuntimeSmoke: false,
  readyForProductionBackend: false,
};

function buildChecks(previous140gReady: boolean, previous140gApprovalItemCount: number): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardCheck[] {
  return [
    {
      id: "140h_pre_previous_140g_ready",
      label: "Previous 140G approval package is available",
      passed: previous140gReady && previous140gApprovalItemCount === 8,
      severity: "required",
      detail: "140H-PRE must build on the reviewed 140G approval package.",
    },
    {
      id: "140h_pre_generic_next_is_guard_only",
      label: "Generic next command is accepted only for guard package",
      passed: true,
      severity: "guard",
      detail: "The observed instruction is not treated as permission to write entry files.",
    },
    {
      id: "140h_pre_exact_approval_missing_blocks_entry_write",
      label: "Exact owner approval phrase is still required",
      passed: true,
      severity: "blocked_until_owner_approval",
      detail: "Non-foundation source write remains blocked until the exact approval phrase is provided.",
    },
    {
      id: "140h_pre_foundation_scope_only",
      label: "Patch remains foundation-only",
      passed: SAFETY.patchScope === "src/modules/stream/foundation/** only",
      severity: "required",
      detail: "Only source files under the Stream foundation folder are part of this package.",
    },
    {
      id: "140h_pre_no_entry_file_write_now",
      label: "Entry files are not written now",
      passed: SAFETY.streamIndexWrittenNow === false && SAFETY.appTsWrittenNow === false && SAFETY.serverTsWrittenNow === false,
      severity: "required",
      detail: "src/modules/stream/index.ts, src/app.ts, and src/server.ts remain untouched by this package.",
    },
    {
      id: "140h_pre_no_route_source_or_runtime_mount",
      label: "Route source and runtime mount are still blocked",
      passed: SAFETY.routeMountSourceWrittenNow === false && SAFETY.routeMountRuntimePerformedNow === false && SAFETY.protectedRouteRegisteredAtRuntimeNow === false,
      severity: "required",
      detail: "No route source insertion and no runtime registration are performed.",
    },
    {
      id: "140h_pre_no_runtime_http",
      label: "No runtime HTTP smoke",
      passed: SAFETY.runtimeHttpRequestAllowedNow === false && SAFETY.runtimeHttpRequestPerformedNow === false,
      severity: "required",
      detail: "This stage creates no live request and no server restart requirement.",
    },
    {
      id: "140h_pre_no_stateful_financial_execution",
      label: "No stateful or financial execution",
      passed: SAFETY.databaseReadAllowedNow === false
        && SAFETY.databaseWriteAllowedNow === false
        && SAFETY.providerCallAllowedNow === false
        && SAFETY.walletMutationAllowedNow === false
        && SAFETY.paymentAuthorizationAllowedNow === false
        && SAFETY.monthlyPayoutAllowedNow === false
        && SAFETY.moneyMovementAllowedNow === false,
      severity: "required",
      detail: "The guard is static and does not call database, provider, wallet, payment, payout, or money movement paths.",
    },
    {
      id: "140h_pre_no_secrets_or_fake_success",
      label: "No raw secrets and no fake success",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false && SAFETY.fakeSuccessAllowed === false,
      severity: "required",
      detail: "The package exposes no secret values and enables no fake provider success.",
    },
  ] as const;
}

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot(): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot {
  const previous140g = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageSnapshot();
  const previous140gReady = previous140g.status === "controlled_non_foundation_source_write_approval_package_ready_unwritten" && previous140g.blockingChecks === 0;
  const checks = buildChecks(previous140gReady, previous140g.approvalItemCount);
  const passedChecks = checks.filter((check) => check.passed).length;
  const decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardDecision = {
    decision: "do_not_write_non_foundation_sources_yet",
    reason: "exact_owner_approval_phrase_missing",
    nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package",
    fallbackStageNow: "140H_PRE_controlled_non_foundation_source_write_approval_guard",
    exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
  };
  return {
    version: STREAM_FOUNDATION_140H_PRE_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_APPROVAL_GUARD_VERSION,
    status: passedChecks === checks.length
      ? "controlled_non_foundation_source_write_blocked_pending_exact_owner_approval"
      : "controlled_non_foundation_source_write_guard_failed",
    patchScope: SAFETY.patchScope,
    previous140gReady,
    previous140gStatus: previous140g.status,
    previous140gApprovalItemCount: previous140g.approvalItemCount,
    exactOwnerApprovalPhraseRequired: true,
    exactOwnerApprovalPhraseReceivedNow: false,
    sourceWriteBlockedUntilExactApproval: true,
    userInstructionObserved: "дальше",
    userInstructionAcceptedForGuardOnly: true,
    userInstructionAcceptedForNonFoundationWrite: false,
    targetPaths: TARGET_PATHS,
    totalChecks: checks.length,
    passedChecks,
    failedChecks: checks.length - passedChecks,
    guardBlockingReasons: ["exact_owner_approval_phrase_missing"],
    checks,
    decision,
    safety: SAFETY,
    nonFoundationFilesWrittenNow: false,
    streamIndexWrittenNow: false,
    appTsWrittenNow: false,
    serverTsWrittenNow: false,
    routeMountSourceWrittenNow: false,
    routeMountRuntimePerformedNow: false,
    runtimeHttpRequestsPerformed: 0,
    databaseExecutionPerformed: 0,
    providerCallsPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    readyForRuntimeMount: false,
    readyForRuntimeSmoke: false,
    readyForProductionBackend: false,
    exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
  };
}
