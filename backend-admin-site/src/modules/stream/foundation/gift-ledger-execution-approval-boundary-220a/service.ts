import {
  STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
  type StreamGiftLedgerExecutionApprovalBoundaryApproval220A,
  type StreamGiftLedgerExecutionApprovalBoundaryBlocked220A,
  type StreamGiftLedgerExecutionApprovalBoundaryInput220A,
  type StreamGiftLedgerExecutionApprovalBoundaryResult220A,
  type StreamGiftLedgerExecutionApprovalBoundaryRunbook220A,
  type StreamGiftLedgerExecutionApprovalBoundarySafety220A,
  type StreamGiftLedgerExecutionApprovalBoundarySnapshot220A,
  type StreamGiftLedgerExecutionApprovalBoundarySurface220A,
} from "./types";

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_OWNER_APPROVAL =
  "I_APPROVE_220A_STREAM_GIFTS_EXECUTION_APPROVAL_BOUNDARY_INDEX_NO_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_APPROVALS_220A = Object.freeze([
  "previous_219b_launch_readiness_final_handoff_locked",
  "launch_runtime_enablement_exact_approval_required",
  "provider_binding_exact_approval_required",
  "provider_runtime_exact_approval_required",
  "gift_send_execution_exact_approval_required",
  "gift_ledger_write_exact_approval_required",
  "wallet_payment_exact_approval_required",
  "payout_execution_exact_approval_required",
  "db_read_write_exact_approval_required",
  "admin_runtime_toggle_exact_approval_required",
  "risk_hold_decision_exact_approval_required",
  "compliance_decision_exact_approval_required",
  "privacy_export_redaction_exact_approval_required",
  "report_export_exact_approval_required",
  "realtime_delivery_exact_approval_required",
  "asset_publish_exact_approval_required",
  "provider_credential_lookup_exact_approval_required",
  "raw_secret_handling_forbidden",
] as const satisfies readonly StreamGiftLedgerExecutionApprovalBoundaryApproval220A[]);

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_SURFACES_220A = Object.freeze([
  "execution_approval_boundary_index",
  "closed_launch_readiness_visibility",
  "provider_not_configured_visibility",
  "exact_owner_approval_matrix",
  "runtime_lock_visibility",
  "provider_lock_visibility",
  "db_lock_visibility",
  "wallet_payment_lock_visibility",
  "payout_lock_visibility",
  "gift_send_lock_visibility",
  "admin_toggle_lock_visibility",
  "future_execution_package_visibility",
] as const satisfies readonly StreamGiftLedgerExecutionApprovalBoundarySurface220A[]);

export const STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY: StreamGiftLedgerExecutionApprovalBoundarySafety220A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  readinessIndexOnlyNoRuntime: true,
  providerNotConfiguredVisible: true,
  previous219BFinalHandoffRequired: true,
  executionApprovalBoundaryOnly: true,
  launchRuntimeEnablementExecuted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerRiskCallExecuted: false,
  providerComplianceCallExecuted: false,
  providerPayoutCallExecuted: false,
  providerCredentialLookupExecuted: false,
  adminRuntimeToggleExecuted: false,
  adminEnforcementRuntimeToggleExecuted: false,
  riskHoldRuntimeDecisionExecuted: false,
  fraudRiskRuntimeDecisionExecuted: false,
  velocityRuntimeDecisionExecuted: false,
  abuseRuntimeDecisionExecuted: false,
  complianceRuntimeDecisionExecuted: false,
  kycKybRuntimeDecisionExecuted: false,
  amlSanctionsRuntimeDecisionExecuted: false,
  privacyRuntimeRedactionExecuted: false,
  retentionRuntimePurgeExecuted: false,
  dataSubjectRuntimeExportExecuted: false,
  giftLedgerExportRuntimeReadExecuted: false,
  reportRuntimeExportExecuted: false,
  exportRuntimeFileWriteExecuted: false,
  settlementRuntimeDecisionExecuted: false,
  taxWithholdingRuntimeDecisionExecuted: false,
  payoutEligibilityRuntimeDecisionExecuted: false,
  payoutExecutionExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  sendIntentRuntimeExecutionExecuted: false,
  giftReceiptRuntimeWriteExecuted: false,
  giftLedgerRuntimeWriteExecuted: false,
  giftDeliveryRealtimeEmitExecuted: false,
  assetPublishExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
  futureProviderBindingRequiresSeparateApproval: true,
  futureProviderRuntimeRequiresSeparateApproval: true,
  futureGiftSendExecutionRequiresSeparateApproval: true,
  futureWalletPaymentRequiresSeparateApproval: true,
  futurePayoutExecutionRequiresSeparateApproval: true,
  futureDbReadWriteRequiresSeparateApproval: true,
  futureAdminToggleRequiresSeparateApproval: true,
  sourceOnly: true,
});

function containsForbiddenValue(values: readonly string[]): boolean {
  return values.some((value) => {
    const normalized = value.trim().toLowerCase();
    return normalized.includes("secret=") ||
      normalized.includes("api_key=") ||
      normalized.includes("apikey=") ||
      normalized.includes("token=") ||
      normalized.includes("password=") ||
      normalized.includes("private_key=") ||
      normalized.includes("bearer ") ||
      normalized.includes("sk_live") ||
      normalized.includes("sk_test");
  });
}

function missingRequired<T extends string>(required: readonly T[], actual: readonly T[]): T | undefined {
  return required.find((entry) => !actual.includes(entry));
}

function blocked(
  code: StreamGiftLedgerExecutionApprovalBoundaryBlocked220A["code"],
  blockedReason: string,
): StreamGiftLedgerExecutionApprovalBoundaryBlocked220A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
    status: "execution_approval_boundary_blocked_without_runtime_enablement",
    code,
    blockedReason,
    readinessPrepared: false,
    providerNotConfiguredVisible: true,
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY,
  };
}

export function normalizeStreamGiftLedgerExecutionApprovalBoundaryInput220A(
  input: Partial<StreamGiftLedgerExecutionApprovalBoundaryInput220A> = {},
): StreamGiftLedgerExecutionApprovalBoundaryInput220A {
  return {
    ownerApproval: input.ownerApproval ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_OWNER_APPROVAL,
    readinessMode: input.readinessMode ?? "execution_approval_boundary_index_only",
    acknowledged219BStage: input.acknowledged219BStage ?? "219B_launch_readiness_control_final_handoff_clean",
    evidenceReferences: input.evidenceReferences ?? [
      "backend-stream-gifts-ledger-219b-report.json",
      "backend-stream-gifts-ledger-219b-handoff.md",
      "owner-machine-typescript-clean",
    ],
    requiredApprovals: input.requiredApprovals ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_APPROVALS_220A,
    controlSurfaces: input.controlSurfaces ?? STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_SURFACES_220A,
    operatorNote: input.operatorNote,
  };
}

export function assertStreamGiftLedgerExecutionApprovalBoundary220ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.rawSecretAccepted !== false ||
    safety.launchRuntimeEnablementExecuted !== false ||
    safety.providerBindingExecuted !== false ||
    safety.providerBindingActivationExecuted !== false ||
    safety.providerRuntimeEnabled !== false ||
    safety.providerLiveCallExecuted !== false ||
    safety.providerRiskCallExecuted !== false ||
    safety.providerComplianceCallExecuted !== false ||
    safety.providerPayoutCallExecuted !== false ||
    safety.providerCredentialLookupExecuted !== false ||
    safety.adminRuntimeToggleExecuted !== false ||
    safety.adminEnforcementRuntimeToggleExecuted !== false ||
    safety.riskHoldRuntimeDecisionExecuted !== false ||
    safety.fraudRiskRuntimeDecisionExecuted !== false ||
    safety.velocityRuntimeDecisionExecuted !== false ||
    safety.abuseRuntimeDecisionExecuted !== false ||
    safety.complianceRuntimeDecisionExecuted !== false ||
    safety.kycKybRuntimeDecisionExecuted !== false ||
    safety.amlSanctionsRuntimeDecisionExecuted !== false ||
    safety.privacyRuntimeRedactionExecuted !== false ||
    safety.retentionRuntimePurgeExecuted !== false ||
    safety.dataSubjectRuntimeExportExecuted !== false ||
    safety.giftLedgerExportRuntimeReadExecuted !== false ||
    safety.reportRuntimeExportExecuted !== false ||
    safety.exportRuntimeFileWriteExecuted !== false ||
    safety.settlementRuntimeDecisionExecuted !== false ||
    safety.taxWithholdingRuntimeDecisionExecuted !== false ||
    safety.payoutEligibilityRuntimeDecisionExecuted !== false ||
    safety.payoutExecutionExecuted !== false ||
    safety.walletMutationExecuted !== false ||
    safety.paymentCaptureExecuted !== false ||
    safety.sendIntentRuntimeExecutionExecuted !== false ||
    safety.giftReceiptRuntimeWriteExecuted !== false ||
    safety.giftLedgerRuntimeWriteExecuted !== false ||
    safety.giftDeliveryRealtimeEmitExecuted !== false ||
    safety.assetPublishExecuted !== false ||
    safety.dbReadExecuted !== false ||
    safety.dbWriteExecuted !== false ||
    safety.migrationExecuted !== false ||
    safety.prismaGenerateExecuted !== false ||
    safety.realtimeEmitExecuted !== false ||
    safety.fakePaymentSuccessAllowed !== false ||
    safety.fakeGiftSendSuccessAllowed !== false ||
    safety.fakePayoutSuccessAllowed !== false ||
    safety.fakeAvailableBalanceAllowed !== false
  ) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-220A safety invariant failed");
  }
  return true;
}

export function prepareStreamGiftLedgerExecutionApprovalBoundary220A(
  input: Partial<StreamGiftLedgerExecutionApprovalBoundaryInput220A> = {},
): StreamGiftLedgerExecutionApprovalBoundaryResult220A {
  assertStreamGiftLedgerExecutionApprovalBoundary220ARemainsSafe();
  const normalized = normalizeStreamGiftLedgerExecutionApprovalBoundaryInput220A(input);

  if (normalized.ownerApproval !== STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_OWNER_APPROVAL) {
    return blocked("owner_approval_required", "220A requires exact source-only approval text.");
  }
  if (normalized.readinessMode !== "execution_approval_boundary_index_only") {
    return blocked("readiness_mode_disabled", "220A is only an execution approval boundary index, not runtime enablement.");
  }
  if (normalized.acknowledged219BStage !== "219B_launch_readiness_control_final_handoff_clean") {
    return blocked("previous_219b_final_handoff_required", "220A requires clean 219B final handoff and owner-machine TypeScript pass.");
  }
  if (normalized.evidenceReferences.length === 0) {
    return blocked("evidence_references_required", "220A requires 219B report/handoff references and TypeScript-clean evidence.");
  }
  if (containsForbiddenValue(normalized.evidenceReferences)) {
    return blocked("raw_secret_or_provider_value_rejected", "220A rejects raw secret/provider credential values in evidence references.");
  }
  if (normalized.requiredApprovals.length === 0) {
    return blocked("required_approvals_required", "220A requires exact approval matrix entries.");
  }
  if (normalized.controlSurfaces.length === 0) {
    return blocked("control_surfaces_required", "220A requires all execution boundary control surfaces.");
  }

  const missingApproval = missingRequired(STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_APPROVALS_220A, normalized.requiredApprovals);
  if (missingApproval) {
    return blocked("missing_required_approval", `220A missing required approval boundary: ${missingApproval}`);
  }
  const missingSurface = missingRequired(STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_SURFACES_220A, normalized.controlSurfaces);
  if (missingSurface) {
    return blocked("missing_required_surface", `220A missing required control surface: ${missingSurface}`);
  }

  return {
    ok: true,
    status: "execution_approval_boundary_index_ready_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.execution-approval-boundary-index.safe_disabled.v1",
      version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
      previousStageRequired: "219B_launch_readiness_control_final_handoff_clean",
      requiredApprovals: normalized.requiredApprovals,
      requiredSurfaces: normalized.controlSurfaces,
      evidenceReferences: normalized.evidenceReferences,
      readinessPrepared: true,
      providerNotConfiguredVisible: true,
      executionApprovalBoundaryOnly: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
      futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
      futureProviderBindingRequiresSeparateApproval: true,
      futureProviderRuntimeRequiresSeparateApproval: true,
      futureGiftSendExecutionRequiresSeparateApproval: true,
      futureWalletPaymentRequiresSeparateApproval: true,
      futurePayoutExecutionRequiresSeparateApproval: true,
      futureDbReadWriteRequiresSeparateApproval: true,
      futureAdminToggleRequiresSeparateApproval: true,
      safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY,
    },
  };
}

export function getStreamGiftLedgerExecutionApprovalBoundary220A(): StreamGiftLedgerExecutionApprovalBoundarySnapshot220A {
  assertStreamGiftLedgerExecutionApprovalBoundary220ARemainsSafe();
  return {
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
    type: "stream_gifts_post_closure_execution_approval_boundary_index",
    previousStageRequired: "219B launch-readiness control final handoff clean plus TypeScript clean on owner machine",
    readinessIndexOnlyNoRuntime: true,
    providerNotConfiguredVisible: true,
    requiredApprovals: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_APPROVALS_220A,
    controlSurfaces: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_SURFACES_220A,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureLaunchRuntimeEnablementRequiresSeparateApproval: true,
    futureProviderBindingRequiresSeparateApproval: true,
    futureProviderRuntimeRequiresSeparateApproval: true,
    futureGiftSendExecutionRequiresSeparateApproval: true,
    futureWalletPaymentRequiresSeparateApproval: true,
    futurePayoutExecutionRequiresSeparateApproval: true,
    futureDbReadWriteRequiresSeparateApproval: true,
    futureAdminToggleRequiresSeparateApproval: true,
    sourceOnly: true,
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY,
  };
}

export function getStreamGiftLedgerExecutionApprovalBoundary220AContract() {
  return {
    contract: "stream.gift.execution-approval-boundary-index.safe_disabled.v1" as const,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
    ownerApproval: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_OWNER_APPROVAL,
    requiredApprovals: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_APPROVALS_220A,
    requiredSurfaces: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_REQUIRED_SURFACES_220A,
    runtimeEnablement: "blocked_requires_new_exact_owner_approval" as const,
    sourceOnly: true,
  };
}

export function getStreamGiftLedgerExecutionApprovalBoundary220ARunbook(): StreamGiftLedgerExecutionApprovalBoundaryRunbook220A {
  return {
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
    steps: [
      "Keep 219B final handoff evidence attached.",
      "Display exact approval boundary matrix for launch/runtime/provider/db/wallet/payout/send/admin operations.",
      "Reject raw secrets, env values, provider tokens, purchase tokens, payout tokens, or credential values.",
      "Require a separate exact owner approval and execution package before any future runtime action.",
    ],
    blockedRuntimeActions: [
      "launch runtime enablement",
      "provider binding/runtime/call",
      "gift send execution or ledger write",
      "Wallet payment or payout execution",
      "DB read/write, migration, Prisma generate",
      "Admin runtime toggle and realtime emit",
    ],
    nextStage: "220B_stream_gifts_execution_approval_boundary_final_handoff",
  };
}

function lockedRequest(action: string) {
  return {
    ok: false as const,
    version: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_VERSION,
    status: "locked_requires_new_exact_owner_approval" as const,
    action,
    blockedReason: "220A is source-only approval-boundary visibility. Runtime execution requires a separate exact owner approval and a separate execution package.",
    launchRuntimeEnablementExecuted: false,
    providerRuntimeEnabled: false,
    sendIntentRuntimeExecutionExecuted: false,
    walletMutationExecuted: false,
    payoutExecutionExecuted: false,
    dbReadExecuted: false,
    dbWriteExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_EXECUTION_APPROVAL_BOUNDARY_220A_SAFETY,
  };
}

export const createStreamGiftLedgerExecutionApprovalBoundary220ALaunchRuntimeEnablementRequest = () => lockedRequest("launch_runtime_enablement");
export const createStreamGiftLedgerExecutionApprovalBoundary220AProviderBindingRequest = () => lockedRequest("provider_binding");
export const createStreamGiftLedgerExecutionApprovalBoundary220AProviderRuntimeRequest = () => lockedRequest("provider_runtime");
export const createStreamGiftLedgerExecutionApprovalBoundary220AGiftSendExecutionRequest = () => lockedRequest("gift_send_execution");
export const createStreamGiftLedgerExecutionApprovalBoundary220AWalletPaymentRequest = () => lockedRequest("wallet_payment");
export const createStreamGiftLedgerExecutionApprovalBoundary220APayoutExecutionRequest = () => lockedRequest("payout_execution");
export const createStreamGiftLedgerExecutionApprovalBoundary220ADbReadWriteRequest = () => lockedRequest("db_read_write");
export const createStreamGiftLedgerExecutionApprovalBoundary220AAdminRuntimeToggleRequest = () => lockedRequest("admin_runtime_toggle");
