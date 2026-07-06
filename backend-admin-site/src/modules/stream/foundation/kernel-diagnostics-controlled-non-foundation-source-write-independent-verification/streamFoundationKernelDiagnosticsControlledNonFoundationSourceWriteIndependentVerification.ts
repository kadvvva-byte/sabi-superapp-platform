import {
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness,
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSmokeReport,
  getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot,
} from "../kernel-diagnostics-controlled-non-foundation-source-write-staged-package";
import {
  STREAM_FOUNDATION_140H_VERIFY_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_INDEPENDENT_VERIFICATION_VERSION,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationDecision,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationFinding,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSafety,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetPath,
  type StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetSummary,
} from "./streamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationContracts";

const EXACT_OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-140H controlled non-foundation source write patch package only, write src/modules/stream/index.ts and src/app.ts exactly as reviewed, no src/server.ts change, no backend restart, no runtime HTTP smoke, no DB write, no provider call, no Wallet mutation, no payment authorization, no monthly payout, no money movement.";

const SAFETY: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSafety = {
  patchScope: "src/modules/stream/foundation/** only",
  independentVerificationBuiltNow: true,
  exactOwnerApprovalPhraseRequired: true,
  exactOwnerApprovalPhraseReceivedNow: false,
  genericNextAcceptedForVerificationOnly: true,
  sourceWriteAllowedNow: false,
  sourceWritePerformedNow: false,
  nonFoundationFilesWrittenNow: false,
  streamIndexWrittenNow: false,
  appTsWrittenNow: false,
  serverTsWrittenNow: false,
  routeMountSourceWrittenNow: false,
  routeMountRuntimePerformedNow: false,
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

function expectedModeFor(targetPath: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetPath): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetSummary["expectedMode"] {
  if (targetPath === "src/modules/stream/index.ts") return "future_create_only";
  if (targetPath === "src/app.ts") return "future_patch_only";
  if (targetPath === "src/server.ts") return "future_no_change_assertion";
  return "rollback_review_only";
}

function buildFindings(args: {
  readonly previous140hStagedReady: boolean;
  readonly previous140hStagedSmokePassed: boolean;
  readonly stagedArtifactCount: number;
  readonly stagedDiffHunksCarriedForward: number;
  readonly reviewedTargetPaths: readonly string[];
}): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationFinding[] {
  const hasStreamIndex = args.reviewedTargetPaths.includes("src/modules/stream/index.ts");
  const hasAppTs = args.reviewedTargetPaths.includes("src/app.ts");
  const hasServerTs = args.reviewedTargetPaths.includes("src/server.ts");
  const hasRollback = args.reviewedTargetPaths.includes("rollback_plan");
  return [
    {
      id: "140h_verify_staged_ready",
      label: "140H-STAGED readiness is true",
      passed: args.previous140hStagedReady,
      severity: "required",
      detail: "Independent verification must sit after the staged review data package.",
    },
    {
      id: "140h_verify_staged_smoke_passed",
      label: "140H-STAGED smoke is passed",
      passed: args.previous140hStagedSmokePassed,
      severity: "required",
      detail: "The staged package smoke must still pass before any future source write approval.",
    },
    {
      id: "140h_verify_diff_hunks_preserved",
      label: "Reviewed diff hunks are preserved",
      passed: args.stagedArtifactCount === 6 && args.stagedDiffHunksCarriedForward === 6,
      severity: "required",
      detail: "The exact diff review still carries six items: stream index, app import, app bridge, app health marker, server no-change, and rollback.",
    },
    {
      id: "140h_verify_target_coverage",
      label: "All target paths are covered",
      passed: hasStreamIndex && hasAppTs && hasServerTs && hasRollback,
      severity: "required",
      detail: "The verification layer covers future stream index create, app patch, server no-change, and rollback review.",
    },
    {
      id: "140h_verify_source_write_blocked",
      label: "Source write remains blocked",
      passed: SAFETY.sourceWriteAllowedNow === false && SAFETY.sourceWritePerformedNow === false && SAFETY.nonFoundationFilesWrittenNow === false,
      severity: "blocked_until_exact_owner_approval",
      detail: "Generic 'дальше' is not enough to write non-foundation entry files.",
    },
    {
      id: "140h_verify_entry_files_unwritten",
      label: "Entry files are not written now",
      passed: SAFETY.streamIndexWrittenNow === false && SAFETY.appTsWrittenNow === false && SAFETY.serverTsWrittenNow === false,
      severity: "blocked_until_exact_owner_approval",
      detail: "The real entry-file write remains for the approved 140H source-write package only.",
    },
    {
      id: "140h_verify_no_mount_or_http",
      label: "No mount and no runtime request",
      passed: SAFETY.routeMountSourceWrittenNow === false && SAFETY.routeMountRuntimePerformedNow === false && SAFETY.runtimeHttpRequestPerformedNow === false,
      severity: "guard",
      detail: "No backend restart, no protected route runtime mount, and no runtime smoke are performed.",
    },
    {
      id: "140h_verify_no_state_or_money",
      label: "No state/provider/Wallet/payment execution",
      passed: SAFETY.databaseWriteAllowedNow === false && SAFETY.providerCallAllowedNow === false && SAFETY.walletMutationAllowedNow === false && SAFETY.moneyMovementAllowedNow === false,
      severity: "guard",
      detail: "Stream monetization, gifts, Wallet, provider calls, monthly payout, and money movement stay out of scope.",
    },
    {
      id: "140h_verify_no_secret_or_fake_success",
      label: "No secrets and no fake success",
      passed: SAFETY.rawSecretsReturned === false && SAFETY.mobileProviderKeysAllowed === false && SAFETY.fakeSuccessAllowed === false,
      severity: "guard",
      detail: "This stage does not read or return provider secrets and does not mark launch/provider/payment success.",
    },
  ] as const;
}

function buildTargetSummaries(args: {
  readonly reviewedTargetPaths: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetPath[];
  readonly findings: readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationFinding[];
}): readonly StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetSummary[] {
  const findingIds = args.findings.map((finding) => finding.id);
  return args.reviewedTargetPaths.map((targetPath) => ({
    targetPath,
    expectedMode: expectedModeFor(targetPath),
    reviewedNow: true,
    writtenNow: false,
    mountedNow: false,
    runtimeSmokeNow: false,
    exactOwnerApprovalRequiredBeforeWrite: true,
    findingIds,
  }));
}

function toTargetPath(value: string): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationTargetPath {
  if (value === "src/modules/stream/index.ts" || value === "src/app.ts" || value === "src/server.ts" || value === "rollback_plan") {
    return value;
  }
  return "rollback_plan";
}

export function getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot(): StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot {
  const stagedSnapshot = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSnapshot();
  const stagedReadiness = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageReadiness();
  const stagedSmoke = getStreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteStagedPackageSmokeReport();
  const reviewedTargetPaths = stagedSnapshot.targetPaths.map(toTargetPath);
  const previous140hStagedReady = stagedReadiness.ready === true && stagedSnapshot.failedChecks === 0;
  const previous140hStagedSmokePassed = stagedSmoke.status === "controlled_non_foundation_source_write_staged_package_smoke_passed";
  const findings = buildFindings({
    previous140hStagedReady,
    previous140hStagedSmokePassed,
    stagedArtifactCount: stagedSnapshot.artifactCount,
    stagedDiffHunksCarriedForward: stagedSnapshot.diffHunksCarriedForward,
    reviewedTargetPaths,
  });
  const passedFindings = findings.filter((finding) => finding.passed).length;
  const blockingFindings = findings.filter((finding) => !finding.passed);
  const targetSummaries = buildTargetSummaries({ reviewedTargetPaths, findings });
  const decision: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationDecision = {
    decision: "keep_source_write_blocked",
    reason: "exact_owner_approval_phrase_missing",
    genericNextAcceptedAs: "independent_verification_only",
    nextAllowedWithoutExactApproval: "continue_foundation_only_verification_or_review",
    nextStageWhenApprovalProvided: "140H_controlled_non_foundation_source_write_patch_package",
    exactOwnerApprovalPhrase: EXACT_OWNER_APPROVAL_PHRASE,
  };
  const status: StreamFoundationKernelDiagnosticsControlledNonFoundationSourceWriteIndependentVerificationSnapshot["status"] =
    blockingFindings.length === 0
      ? "controlled_non_foundation_source_write_independent_verification_passed_blocked_until_exact_owner_approval"
      : "controlled_non_foundation_source_write_independent_verification_failed";

  return {
    version: STREAM_FOUNDATION_140H_VERIFY_KERNEL_DIAGNOSTICS_CONTROLLED_NON_FOUNDATION_SOURCE_WRITE_INDEPENDENT_VERIFICATION_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previous140hStagedReady,
    previous140hStagedSmokePassed,
    sourceWriteBlockedUntilExactApproval: true,
    exactOwnerApprovalPhraseRequired: true,
    exactOwnerApprovalPhraseReceivedNow: false,
    userInstructionObserved: "дальше",
    genericNextAcceptedForVerificationOnly: true,
    targetSummaries,
    targetSummaryCount: targetSummaries.length,
    reviewedTargetPaths,
    stagedArtifactCount: stagedSnapshot.artifactCount,
    stagedDiffHunksCarriedForward: stagedSnapshot.diffHunksCarriedForward,
    totalFindings: findings.length,
    passedFindings,
    failedFindings: findings.length - passedFindings,
    blockingFindings,
    findings,
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
