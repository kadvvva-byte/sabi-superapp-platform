import {
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardReadiness,
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot,
} from "../kernel-diagnostics-controlled-non-foundation-source-write-approval-guard";
import {
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageReadiness,
} from "../kernel-diagnostics-controlled-non-foundation-source-write-approval-package";
import {
  getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageDiffHunks,
  getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageReadiness,
} from "../kernel-diagnostics-exact-non-foundation-diff-review-package";
import {
  STREAM_FOUNDATION_140H_STAGED_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_STAGED_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifactKind,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageCheck,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageDecision,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSafety,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath,
} from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageContracts";

const EXACT_OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-140H controlled non-foundation source write patch package only, write src/modules/stream/index.ts and src/app.ts exactly as reviewed, no src/server.ts change, no backend restart, no runtime HTTP smoke, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement.";

const SAFETY: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  stagedPackageBuiltNow: true,
  exactOwnerApprovalPhraseRequired: true,
  exactOwnerApprovalPhraseReceivedNow: false,
  genericNextAcceptedForStagingOnly: true,
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

function stagedArtifactKindFor(operation: string): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifactKind {
  if (operation.includes("create_file")) return "planned_create_file_source";
  if (operation.includes("insert_import")) return "planned_import_patch";
  if (operation.includes("insert_mount")) return "planned_route_bridge_patch";
  if (operation.includes("insert_health")) return "planned_health_marker_patch";
  if (operation.includes("confirm_no_change")) return "planned_no_change_assertion";
  return "planned_rollback_checklist";
}

function buildArtifacts(): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact[] {
  return getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageDiffHunks().map((hunk, index) => ({
    artifactId: `140h-staged-${String(index + 1).padStart(2, "0")}-${hunk.safeCode}`,
    sourceHunkId: hunk.hunkId,
    targetPath: hunk.targetPath as StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath,
    artifactKind: stagedArtifactKindFor(hunk.operation),
    reviewDataOnly: true,
    writtenNow: false,
    mountedNow: false,
    runtimeSmokeNow: false,
    exactOwnerApprovalRequiredBeforeWrite: true,
    exactAnchor: hunk.oldAnchor,
    plannedLines: hunk.newLines,
    safetyNotes: hunk.safetyNotes,
    rollbackInstruction: hunk.rollbackInstruction,
  }));
}

function uniqueTargetPaths(artifacts: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact[]): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath[] {
  return [...new Set(artifacts.map((artifact) => artifact.targetPath))] as StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageTargetPath[];
}

function buildChecks(args: {
  previous140fReady: boolean;
  previous140gReady: boolean;
  previous140hPreGuardReady: boolean;
  artifacts: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact[];
}): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageCheck[] {
  return [
    {
      id: "140h_staged_previous_140f_ready",
      label: "Exact non-foundation diff review package is ready",
      passed: args.previous140fReady,
      severity: "required",
      detail: "140H-STAGED must carry forward the reviewed 140F diff hunks exactly as review data.",
    },
    {
      id: "140h_staged_previous_140g_ready",
      label: "Source write approval package is ready",
      passed: args.previous140gReady,
      severity: "required",
      detail: "140H-STAGED must follow the 140G approval package, not invent a new mount path.",
    },
    {
      id: "140h_staged_previous_guard_ready",
      label: "140H-PRE guard is active",
      passed: args.previous140hPreGuardReady,
      severity: "guard",
      detail: "Generic 'дальше' remains accepted only for staging/review data, not for entry file writes.",
    },
    {
      id: "140h_staged_artifact_count",
      label: "All reviewed diff hunks are staged",
      passed: args.artifacts.length === 6,
      severity: "required",
      detail: "The staged package should include stream index create, app import, app route bridge, app health marker, server no-change, and rollback plan.",
    },
    {
      id: "140h_staged_entry_write_blocked",
      label: "Entry files are not written by this stage",
      passed: SAFETY.nonFoundationFilesWrittenNow === false && SAFETY.streamIndexWrittenNow === false && SAFETY.appTsWrittenNow === false,
      severity: "blocked_until_owner_approval",
      detail: "The real source write remains blocked until the exact owner approval phrase is provided.",
    },
    {
      id: "140h_staged_no_server_change",
      label: "server.ts remains excluded",
      passed: args.artifacts.some((artifact) => artifact.targetPath === "src/server.ts" && artifact.artifactKind === "planned_no_change_assertion"),
      severity: "guard",
      detail: "server.ts is represented only as a no-change assertion.",
    },
    {
      id: "140h_staged_no_runtime_mount",
      label: "No runtime route mount is performed",
      passed: SAFETY.routeMountSourceWrittenNow === false && SAFETY.routeMountRuntimePerformedNow === false && SAFETY.runtimeHttpRequestPerformedNow === false,
      severity: "blocked_until_owner_approval",
      detail: "This package stores review data only and performs no runtime smoke.",
    },
    {
      id: "140h_staged_no_state_or_money_execution",
      label: "No DB/provider/Wallet/payment/payout/money execution",
      passed: SAFETY.databaseWriteAllowedNow === false && SAFETY.providerCallAllowedNow === false && SAFETY.walletMutationAllowedNow === false && SAFETY.moneyMovementAllowedNow === false,
      severity: "guard",
      detail: "Stream monetization and payment foundation remain outside this stage.",
    },
    {
      id: "140h_staged_no_secret_or_fake_success",
      label: "No raw secrets and no fake success",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false && SAFETY.fakeSuccessAllowed === false,
      severity: "guard",
      detail: "Provider secrets remain server-side-only later; this stage does not read or return secrets.",
    },
  ] as const;
}

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifacts(): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageArtifact[] {
  return buildArtifacts();
}

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot(): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot {
  const previous140fReadiness = getStreamFoundationKernelDiagnosticsExactNonFoundationDiffReviewPackageReadiness();
  const previous140gReadiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalPackageReadiness();
  const previousGuardReadiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardReadiness();
  const previousGuardSnapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteApprovalGuardSnapshot();
  const artifacts = buildArtifacts();
  const previous140fReady = previous140fReadiness.ready === true;
  const previous140gReady = previous140gReadiness.ready === true;
  const previous140hPreGuardReady = previousGuardReadiness.guardReady === true && previousGuardSnapshot.sourceWriteBlockedUntilExactApproval === true;
  const checks = buildChecks({ previous140fReady, previous140gReady, previous140hPreGuardReady, artifacts });
  const passedChecks = checks.filter((check) => check.passed).length;
  const blockingChecks = checks.filter((check) => !check.passed);
  const status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot["status"] =
    blockingChecks.length === 0
      ? "controlled_non_foundation_source_write_staged_pending_exact_owner_approval"
      : "controlled_non_foundation_source_write_staged_package_failed";
  const decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageDecision = {
    decision: "keep_non_foundation_source_write_blocked",
    reason: "exact_owner_approval_phrase_missing",
    genericNextAcceptedAs: "stage_review_data_only",
    nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package",
    exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
  };

  return {
    version: STREAM_FOUNDATION_140H_STAGED_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_STAGED_PACKAGE_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previous140fReady,
    previous140gReady,
    previous140hPreGuardReady,
    exactOwnerApprovalPhraseRequired: true,
    exactOwnerApprovalPhraseReceivedNow: false,
    sourceWriteBlockedUntilExactApproval: true,
    userInstructionObserved: "дальше",
    genericNextAcceptedForStagingOnly: true,
    targetPaths: uniqueTargetPaths(artifacts),
    artifacts,
    artifactCount: artifacts.length,
    diffHunksCarriedForward: artifacts.length,
    totalChecks: checks.length,
    passedChecks,
    failedChecks: checks.length - passedChecks,
    blockingChecks,
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
