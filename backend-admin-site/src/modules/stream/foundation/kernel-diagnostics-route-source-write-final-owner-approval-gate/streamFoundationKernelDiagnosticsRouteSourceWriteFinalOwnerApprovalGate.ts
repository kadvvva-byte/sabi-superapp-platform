import {
  getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot,
  STREAM_FOUNDATION_138W_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_VERSION,
} from "../kernel-diagnostics-route-source-write-execution-checklist";
import type {
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalDecision,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateSafety,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateSnapshot,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateStatus,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalPrompt,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirement,
  StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirementId,
} from "./streamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateContracts";
import { STREAM_FOUNDATION_138X_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_FINAL_OWNER_APPROVAL_GATE_VERSION } from "./streamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateContracts";

const FINAL_OWNER_APPROVAL_SAFE_DEFAULTS = {
  finalOwnerApprovalGateOnly: true,
  finalOwnerApprovalGateBuiltNow: true,
  ownerApprovalPromptGeneratedNow: true,
  ownerApprovalCapturedNow: false,
  ownerApprovalPersistedNow: false,
  ownerApprovalReusedFromPreviousStage: false,
  freshForbiddenPathScanPerformedNow: false,
  routeSourceWriteCommandExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  routeMountApprovedNow: false,
  routeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
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
} as const;

function requirement(
  requirementId: StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirementId,
  title: string,
  passedForReviewNow: boolean,
  blocking: boolean,
  acceptedOwnerApprovalPhraseFragment: string,
  forbiddenScope: readonly string[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirement {
  return {
    requirementId,
    title,
    requiredForOwnerApproval: true,
    passedForReviewNow,
    blocking,
    acceptedOwnerApprovalPhraseFragment,
    forbiddenScope,
    safeCode: `stream_kernel_diagnostics_route_source_write_final_owner_approval_${requirementId}_${passedForReviewNow ? "passed" : "blocked"}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteFinalOwnerApproval.${requirementId}.${passedForReviewNow ? "passed" : "blocked"}`,
  };
}

type ExecutionChecklistSnapshot = ReturnType<typeof getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot>;

function buildRequirements(executionChecklist: ExecutionChecklistSnapshot): readonly StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirement[] {
  const runtimeSafe =
    executionChecklist.runtimeHttpRequestsPerformed === 0 &&
    executionChecklist.providerCallsPerformed === 0 &&
    executionChecklist.databaseExecutionPerformed === 0 &&
    executionChecklist.walletMutationPerformed === 0 &&
    executionChecklist.paymentAuthorizationPerformed === 0 &&
    executionChecklist.monthlyPayoutPerformed === 0 &&
    executionChecklist.moneyMovementPerformed === 0 &&
    executionChecklist.rawSecretsReturned === 0 &&
    executionChecklist.mobileProviderKeysAllowed === false &&
    executionChecklist.fakeSuccessAllowed === false;
  const sourceBoundarySafe =
    executionChecklist.streamIndexPatchIncluded === false &&
    executionChecklist.appServerPatchIncluded === false &&
    executionChecklist.streamModulePatchIncluded === false;
  const executionChecklistReady = executionChecklist.readyForOwnerExecutionReview && executionChecklist.blockingChecklistItemCount === 0;

  return [
    requirement(
      "owner_must_name_stage_138y_only",
      "Owner approval must explicitly name BACKEND-STREAM-FOUNDATION-138Y only",
      executionChecklistReady,
      !executionChecklistReady,
      "I approve BACKEND-STREAM-FOUNDATION-138Y diagnostics route source write only",
      ["implicit approval", "approval for multiple stages", "approval reused from 138X"],
    ),
    requirement(
      "owner_must_approve_source_write_only",
      "Owner approval must be limited to diagnostics route source files only",
      executionChecklist.readyForRouteSourceWriteNow === false && executionChecklist.routeSourceFilesWrittenNow === false,
      false,
      "source write only, no route mount, no runtime execution",
      ["route mount", "runtime HTTP request", "provider call", "DB write", "Wallet mutation"],
    ),
    requirement(
      "owner_must_keep_route_mount_separate",
      "Route mount must remain a separate later approval and gate",
      executionChecklist.routeMountApprovedNow === false && executionChecklist.routeMountPerformed === false && executionChecklist.protectedRouteRegisteredNow === false,
      false,
      "route mount remains separate and blocked",
      ["Express router mount", "protected route registration", "src/app.ts", "src/server.ts"],
    ),
    requirement(
      "owner_must_keep_stream_index_excluded",
      "src/modules/stream/index.ts must stay excluded",
      executionChecklist.streamIndexPatchIncluded === false,
      executionChecklist.streamIndexPatchIncluded !== false,
      "src/modules/stream/index.ts excluded",
      ["src/modules/stream/index.ts", "stream module entrypoint patch"],
    ),
    requirement(
      "owner_must_keep_app_server_excluded",
      "src/app.ts and src/server.ts must stay excluded",
      executionChecklist.appServerPatchIncluded === false,
      executionChecklist.appServerPatchIncluded !== false,
      "src/app.ts and src/server.ts excluded",
      ["src/app.ts", "src/server.ts", "application mount", "router mount"],
    ),
    requirement(
      "owner_must_keep_wallet_messenger_admin_excluded",
      "Wallet, Messenger and Admin UI runtime files must stay excluded",
      executionChecklist.streamModulePatchIncluded === false,
      executionChecklist.streamModulePatchIncluded !== false,
      "Wallet, Messenger and Admin UI untouched",
      ["src/modules/wallet", "src/modules/messenger", "admin-ui", "Wallet runtime mutation"],
    ),
    requirement(
      "owner_must_keep_prisma_env_excluded",
      "Prisma schema, env files and provider secrets must stay excluded",
      executionChecklist.rawSecretsReturned === 0 && executionChecklist.mobileProviderKeysAllowed === false,
      !(executionChecklist.rawSecretsReturned === 0 && executionChecklist.mobileProviderKeysAllowed === false),
      "Prisma and env files excluded; no raw secrets; no mobile provider keys",
      ["prisma", "env file", "raw provider secret", "mobile provider key"],
    ),
    requirement(
      "owner_must_require_fresh_forbidden_scan",
      "A fresh forbidden path/content scan must run immediately before 138Y execution",
      executionChecklist.freshForbiddenPathScanPerformedNow === false,
      false,
      "fresh forbidden scan required immediately before execution",
      ["stale scan reuse", "write without forbidden scan"],
    ),
    requirement(
      "owner_must_require_typecheck_and_smoke_after_write",
      "TypeScript and smoke must run after any later source write",
      executionChecklist.postWriteTypecheckExecutedNow === false && executionChecklist.postWriteSmokeExecutedNow === false,
      false,
      "post-write TypeScript and smoke required",
      ["skip TypeScript", "skip smoke", "claim runtime readiness without checks"],
    ),
    requirement(
      "owner_must_accept_no_runtime_execution",
      "The approval must not authorize runtime execution, provider calls, Wallet mutation or money movement",
      runtimeSafe,
      !runtimeSafe,
      "no runtime execution, no provider calls, no Wallet mutation, no money movement, no fake success",
      ["payment authorization", "monthly payout", "money movement", "fake provider success"],
    ),
    requirement(
      "owner_must_accept_no_runtime_execution",
      "The final approval gate keeps source boundary safe before 138Y",
      sourceBoundarySafe,
      !sourceBoundarySafe,
      "foundation-only source boundary remains safe",
      ["non-foundation source patch", "app/server patch", "stream entrypoint patch"],
    ),
  ].slice(0, 10);
}

function buildApprovalPrompt(): StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalPrompt {
  return {
    promptId: "stream_kernel_diagnostics_route_source_write_final_owner_approval_prompt",
    exactApprovalRequiredLater: true,
    approvedNow: false,
    persistedNow: false,
    allowedFutureStage: "BACKEND-STREAM-FOUNDATION-138Y",
    approvalTextTemplate:
      "I approve BACKEND-STREAM-FOUNDATION-138Y diagnostics route source write only, foundation-only, no src/modules/stream/index.ts, no route mount, no app/server patch, no DB/provider/Wallet/payment/payout/money movement, no secrets, no fake success.",
    forbiddenApprovalReuse: [
      "138X approval cannot be reused as 138Y execution approval",
      "previous approval cannot authorize route mount",
      "source write approval cannot authorize provider activation or money movement",
    ],
    safeCode: "stream_kernel_diagnostics_route_source_write_final_owner_approval_prompt_generated_review_only",
    safeMessageKey: "stream.kernel.diagnostics.routeSourceWriteFinalOwnerApproval.prompt.generatedReviewOnly",
  };
}

function buildDecision(
  executionChecklist: ExecutionChecklistSnapshot,
  requirements: readonly StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalRequirement[],
): StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalDecision {
  const blockingRequirementIds = requirements.filter((item) => item.blocking).map((item) => item.requirementId);
  const runtimeBlocked = requirements.some((item) => item.requirementId === "owner_must_accept_no_runtime_execution" && item.blocking);
  const mountBlocked = requirements.some((item) => item.requirementId === "owner_must_keep_route_mount_separate" && item.blocking);
  const freshScanRequired = requirements.some((item) => item.requirementId === "owner_must_require_fresh_forbidden_scan" && item.passedForReviewNow);
  const readyForOwnerApprovalReview = blockingRequirementIds.length === 0 && executionChecklist.readyForOwnerExecutionReview;
  const decisionCode = !executionChecklist.readyForOwnerExecutionReview
    ? "final_owner_approval_gate_blocked_by_execution_checklist"
    : runtimeBlocked
      ? "final_owner_approval_gate_blocked_by_runtime_safety"
      : mountBlocked
        ? "final_owner_approval_gate_blocked_until_mount_separation"
        : freshScanRequired
          ? "final_owner_approval_gate_ready_but_not_approved_now"
          : "final_owner_approval_gate_blocked_until_fresh_scan";

  return {
    decisionCode,
    readyForOwnerApprovalReview,
    approvedNow: false,
    routeSourceWriteAllowedNow: false,
    routeSourceFilesWrittenNow: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    blockingRequirementIds,
    safeCode: `stream_kernel_diagnostics_route_source_write_final_owner_approval_gate_${decisionCode}`,
    safeMessageKey: `stream.kernel.diagnostics.routeSourceWriteFinalOwnerApproval.decision.${decisionCode}`,
  };
}

function buildStatus(decision: StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalDecision): StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateStatus {
  if (decision.decisionCode === "final_owner_approval_gate_blocked_by_execution_checklist") {
    return "final_owner_approval_gate_blocked_by_execution_checklist";
  }
  if (decision.decisionCode === "final_owner_approval_gate_blocked_by_runtime_safety") {
    return "final_owner_approval_gate_blocked_by_safety_boundary";
  }
  if (decision.decisionCode === "final_owner_approval_gate_blocked_until_mount_separation") {
    return "final_owner_approval_gate_blocked_until_route_mount_stays_separate";
  }
  if (decision.decisionCode === "final_owner_approval_gate_blocked_until_fresh_scan") {
    return "final_owner_approval_gate_blocked_until_fresh_scan_at_execution_time";
  }
  return decision.readyForOwnerApprovalReview
    ? "final_owner_approval_gate_ready_for_owner_review"
    : "final_owner_approval_gate_blocked_until_exact_owner_approval_message";
}

export function getStreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateSnapshot(): StreamFoundationKernelDiagnosticsRouteSourceWriteFinalOwnerApprovalGateSnapshot {
  const executionChecklist = getStreamFoundationKernelDiagnosticsRouteSourceWriteExecutionChecklistSnapshot();
  const requirements = buildRequirements(executionChecklist);
  const approvalPrompt = buildApprovalPrompt();
  const decision = buildDecision(executionChecklist, requirements);

  return {
    version: STREAM_FOUNDATION_138X_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_FINAL_OWNER_APPROVAL_GATE_VERSION,
    gateId: "stream_kernel_diagnostics_route_source_write_final_owner_approval_gate",
    status: buildStatus(decision),
    patchScope: "src/modules/stream/foundation/** only",
    executionChecklistVersion: STREAM_FOUNDATION_138W_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_WRITE_EXECUTION_CHECKLIST_VERSION,
    executionChecklistStatus: executionChecklist.status,
    finalOwnerApprovalGateOnly: true,
    finalOwnerApprovalGateBuiltNow: true,
    readyForOwnerApprovalReview: decision.readyForOwnerApprovalReview,
    readyForRouteSourceWriteNow: false,
    ownerApprovalPromptGeneratedNow: true,
    ownerApprovalCapturedNow: false,
    ownerApprovalPersistedNow: false,
    ownerApprovalReusedFromPreviousStage: false,
    freshForbiddenPathScanPerformedNow: false,
    routeSourceWriteCommandExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    executableCommandTextReturnedNow: false,
    routeMountApprovedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    streamModulePatchIncluded: false,
    requirements,
    requirementCount: requirements.length,
    blockingRequirementCount: decision.blockingRequirementIds.length,
    approvalPrompt,
    decision,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    safety: {
      ...executionChecklist.safety,
      ...FINAL_OWNER_APPROVAL_SAFE_DEFAULTS,
    },
  };
}
