import { assertStreamGiftLedgerAdminProductionGates199GRemainsSafe } from "../gift-ledger-admin-production-gates-199g";
import {
  STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
  type StreamGiftLedgerFinalProductionReadinessBlocked199H,
  type StreamGiftLedgerFinalProductionReadinessInput199H,
  type StreamGiftLedgerFinalProductionReadinessNextRequest199H,
  type StreamGiftLedgerFinalProductionReadinessReadiness199H,
  type StreamGiftLedgerFinalProductionReadinessResult199H,
  type StreamGiftLedgerFinalProductionReadinessSafety199H,
  type StreamGiftLedgerFinalProductionReadinessStage199H,
} from "./streamGiftLedgerFinalProductionReadiness199H.types";

export const STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_APPROVAL =
  "STREAM_GIFT_LEDGER_199H_FINAL_HANDOFF_APPROVED" as const;

export const STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY: StreamGiftLedgerFinalProductionReadinessSafety199H = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretReadAllowedNow: false,
  dbReadAllowedNow: false,
  dbWriteAllowedNow: false,
  schemaWriteAllowedNow: false,
  migrationAllowedNow: false,
  prismaGenerateAllowedNow: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutExecutionAllowedNow: false,
  realtimeEmitAllowedNow: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

export const STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_REQUIRED_STAGE_IDS_199H = Object.freeze([
  "198A_foundation_safe_disabled",
  "198B_schema_planning_fix1_clean",
  "198C_prisma_schema_source_write_no_migration",
  "198D_prisma_validate_generate_readiness",
  "198E_prisma_validate_execution_clean",
  "198F_prisma_generate_planning",
  "198G_prisma_generate_execution_clean",
  "198H_generated_client_usability_planning",
  "198I_generated_client_usability_clean",
  "198J_fast_track_closeout_migration_runner",
  "198K_db_backed_provider_guarded_ledger_commit",
  "198L_seed_canonical_catalog_quote_smoke",
  "198M_runtime_quote_send_guard_smoke",
  "198N_provider_authorization_contract",
  "198O_provider_authorized_commit_smoke_owner_local",
  "198P_post_commit_inspection_event_contract",
  "198Q_realtime_delivery_adapter_preview",
  "198R_fix1_realtime_runtime_binding_clean",
  "198S_delivery_receipt_admin_audit_contract",
  "198T_persistent_delivery_receipt_audit_store",
  "198U_settlement_available_release_guard",
  "198V_creator_payout_readiness_guard",
  "198W_provider_payout_contract_admin_approval_gate",
  "198X_payout_execution_guard_provider_adapter_boundary",
  "198Y_owner_local_provider_payout_adapter_smoke",
  "198Z_final_audit_production_binding_request",
  "199A_real_provider_binding_exact_owner_approval",
  "199B_provider_config_readiness_reference_labels",
  "199C_payment_authorization_adapter_boundary",
  "199D_real_payment_authorization_hash_only",
  "199E_provider_authorized_gift_send_ledger_commit",
  "199F_fix1_post_commit_runtime_smoke_clean",
  "199G_admin_controls_production_gates_clean",
] as const);

const STAGE_LABELS_199H: Readonly<Record<string, string>> = Object.freeze({
  "198A_foundation_safe_disabled": "Foundation safe-disabled gift ledger routes",
  "198B_schema_planning_fix1_clean": "Schema planning and tuple readonly repair",
  "198C_prisma_schema_source_write_no_migration": "Prisma schema source write without migration execution",
  "198D_prisma_validate_generate_readiness": "Prisma validate/generate readiness planning",
  "198E_prisma_validate_execution_clean": "Local Prisma validate execution runner",
  "198F_prisma_generate_planning": "Prisma generate planning",
  "198G_prisma_generate_execution_clean": "Local Prisma generate execution runner",
  "198H_generated_client_usability_planning": "Generated client usability planning",
  "198I_generated_client_usability_clean": "Generated client usability local runner",
  "198J_fast_track_closeout_migration_runner": "Owner-approved local migration runner boundary",
  "198K_db_backed_provider_guarded_ledger_commit": "DB-backed provider-guarded ledger commit",
  "198L_seed_canonical_catalog_quote_smoke": "Canonical 80 gift catalog seed and quote smoke",
  "198M_runtime_quote_send_guard_smoke": "Runtime quote and send guard smoke",
  "198N_provider_authorization_contract": "Hash-only provider authorization contract",
  "198O_provider_authorized_commit_smoke_owner_local": "Owner-local provider-authorized commit smoke",
  "198P_post_commit_inspection_event_contract": "Post-commit inspection and event contract",
  "198Q_realtime_delivery_adapter_preview": "Guarded realtime delivery adapter preview",
  "198R_fix1_realtime_runtime_binding_clean": "Realtime runtime binding with mobile receipt field repair",
  "198S_delivery_receipt_admin_audit_contract": "Delivery receipt Admin audit contract",
  "198T_persistent_delivery_receipt_audit_store": "Persistent delivery receipt audit store",
  "198U_settlement_available_release_guard": "Settlement gates and available release guard",
  "198V_creator_payout_readiness_guard": "Creator payout readiness guard",
  "198W_provider_payout_contract_admin_approval_gate": "Provider payout contract and Admin approval gate",
  "198X_payout_execution_guard_provider_adapter_boundary": "Payout execution guard and provider adapter boundary",
  "198Y_owner_local_provider_payout_adapter_smoke": "Owner-local payout adapter smoke without provider call",
  "198Z_final_audit_production_binding_request": "Final audit and production binding request envelope",
  "199A_real_provider_binding_exact_owner_approval": "Exact owner approval boundary for real provider binding",
  "199B_provider_config_readiness_reference_labels": "Provider config readiness using reference labels only",
  "199C_payment_authorization_adapter_boundary": "Payment authorization adapter boundary",
  "199D_real_payment_authorization_hash_only": "Real payment authorization hash-only adapter",
  "199E_provider_authorized_gift_send_ledger_commit": "Provider-authorized gift send ledger commit",
  "199F_fix1_post_commit_runtime_smoke_clean": "Post-commit runtime smoke with sendIntentId repair",
  "199G_admin_controls_production_gates_clean": "Admin controls and production gates review-only layer",
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function cleanArray(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => clean(item)).filter((item): item is string => Boolean(item));
}

function containsRawSecretLikeValue(value: string): boolean {
  const lowered = value.toLowerCase();
  return (
    lowered.includes("secret=") ||
    lowered.includes("token=") ||
    lowered.includes("sk_") ||
    lowered.includes("bearer ") ||
    lowered.includes("private_key") ||
    lowered.includes("-----begin") ||
    lowered.includes("cardnumber") ||
    lowered.includes("iban=")
  );
}

function blocked199H(
  code: StreamGiftLedgerFinalProductionReadinessBlocked199H["code"],
  blockedReason: string,
): StreamGiftLedgerFinalProductionReadinessBlocked199H {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    status: "final_production_readiness_handoff_blocked_without_runtime_enablement",
    code,
    blockedReason,
    backendReadinessPercent: 99,
    productionRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY,
  };
}

function buildStages199H(): readonly StreamGiftLedgerFinalProductionReadinessStage199H[] {
  return STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_REQUIRED_STAGE_IDS_199H.map((stageId) => ({
    stageId,
    label: STAGE_LABELS_199H[stageId] || stageId,
    status: "owner_reported_clean",
    requiredForBackend100Percent: true,
    runtimeWriteExecutedBy199H: false,
    providerCallExecutedBy199H: false,
    fakeSuccessAllowed: false,
  }));
}

export function normalizeStreamGiftLedgerFinalProductionReadinessInput199H(
  raw: Record<string, unknown>,
): StreamGiftLedgerFinalProductionReadinessInput199H {
  return {
    adminApproval: clean(raw.adminApproval),
    finalHandoffMode: clean(raw.finalHandoffMode) === "production_readiness_handoff_review_only"
      ? "production_readiness_handoff_review_only"
      : "disabled",
    acceptedStageIds: cleanArray(raw.acceptedStageIds),
    operatorNote: clean(raw.operatorNote),
  };
}

export function getStreamGiftLedgerFinalProductionReadiness199H(): StreamGiftLedgerFinalProductionReadinessReadiness199H {
  assertStreamGiftLedgerFinalProductionReadiness199HRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    status: "ready_for_final_production_readiness_handoff",
    backendReadinessPercent: 100,
    readinessMeaning: "backend_chain_complete_not_live_provider_enabled",
    requiredStageIds: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_REQUIRED_STAGE_IDS_199H,
    stillRequiresSeparateOwnerApprovals: [
      "server-side accept-payments provider live binding",
      "server-side creator payout provider live binding",
      "payment capture runtime enablement",
      "Wallet mutation bridge enablement",
      "realtime delivery runtime emit enablement",
      "available balance release execution",
      "provider payout execution",
    ],
    nextStage: "200A_controlled_live_provider_binding_or_stream_gifts_admin_ui",
    safety: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY,
  };
}

export function getStreamGiftLedgerFinalProductionReadinessContract199H(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    contract: "stream.gift.final_production_readiness.handoff.v1",
    approvalField: "adminApproval",
    approvalValue: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_APPROVAL,
    handoffMode: "production_readiness_handoff_review_only",
    backendReadinessPercent: 100,
    readinessMeaning: "100_percent_backend_chain_ready_for_controlled_production_binding_not_live_provider_enabled",
    requiredStageIds: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_REQUIRED_STAGE_IDS_199H,
    separatesProviderBindings: true,
    separatesAcceptPaymentsFromCreatorPayouts: true,
    separatesWalletMutationFromGiftLedgerCommit: true,
    noEnvFileRead: true,
    noEnvValueRead: true,
    noProviderCall: true,
    noDbWrite: true,
    noRuntimeEnablement: true,
    noFakeSuccess: true,
    safety: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY,
  };
}

export function finalizeStreamGiftLedgerProductionReadinessHandoff199H(
  input: StreamGiftLedgerFinalProductionReadinessInput199H,
): StreamGiftLedgerFinalProductionReadinessResult199H {
  assertStreamGiftLedgerFinalProductionReadiness199HRemainsSafe();

  if (input.adminApproval !== STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_APPROVAL) {
    return blocked199H("admin_approval_required", "adminApproval must exactly match STREAM_GIFT_LEDGER_199H_FINAL_HANDOFF_APPROVED");
  }

  if (input.finalHandoffMode !== "production_readiness_handoff_review_only") {
    return blocked199H("handoff_mode_disabled", "finalHandoffMode must be production_readiness_handoff_review_only");
  }

  const joined = [input.operatorNote, ...input.acceptedStageIds].filter(Boolean).join(" ");
  if (containsRawSecretLikeValue(joined)) {
    return blocked199H("raw_secret_like_value_rejected", "199H accepts stage ids and notes only; raw secret-like values are rejected");
  }

  const accepted = new Set(input.acceptedStageIds);
  const missing = STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_REQUIRED_STAGE_IDS_199H.filter((stageId) => !accepted.has(stageId));
  if (missing.length) {
    return blocked199H("missing_required_stage", `Missing required clean stage ids: ${missing.join(", ")}`);
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    status: "stream_gifts_backend_100_percent_ready_for_controlled_production_binding",
    backendReadinessPercent: 100,
    productionRuntimeEnabled: false,
    controlledProductionBindingRequiredNext: true,
    stages: buildStages199H(),
    acceptedStageIds: Array.from(accepted),
    missingStageIds: [],
    productionProviderBindingApprovalRequired: true,
    payoutExecutionApprovalRequired: true,
    walletMutationApprovalRequired: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "200A_controlled_live_provider_binding_or_stream_gifts_admin_ui",
    safety: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY,
  };
}

export function getStreamGiftLedgerFinalProductionReadinessRunbook199H(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-199h-final-production-readiness-check.js --i-approve-199h-final-production-readiness-check",
      "POST /api/admin/stream/gifts/ledger/199h/final-handoff with adminApproval=STREAM_GIFT_LEDGER_199H_FINAL_HANDOFF_APPROVED and all acceptedStageIds",
    ],
    operatorNotes: [
      "Backend gift ledger chain is 100% ready for controlled production binding.",
      "This is not a live provider/payout enablement step.",
      "Real provider binding, payment capture, Wallet mutation and payout execution each require separate exact owner approval.",
    ],
  };
}

export function createStreamGiftLedgerNextLiveProviderBindingRequest199H(): StreamGiftLedgerFinalProductionReadinessNextRequest199H {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION,
    status: "next_stage_requires_separate_owner_approval",
    backendChainClosed: true,
    allowedNext: [
      "200A controlled live provider binding approval request",
      "Stream gifts Admin UI production gates panel",
      "owner-filled provider reference-label verification",
      "controlled protected runtime smoke after explicit owner approval",
    ],
    stillForbiddenWithoutSeparateApproval: [
      "reading or printing raw secrets",
      "provider live payment call",
      "provider payout execution",
      "Wallet mutation",
      "payment capture",
      "realtime delivery emit in production",
      "fake gift/payment/payout success",
    ],
  };
}

export function assertStreamGiftLedgerFinalProductionReadiness199HRemainsSafe(): void {
  assertStreamGiftLedgerAdminProductionGates199GRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_SAFETY;
  if (
    safety.envFileReadAllowedNow !== false ||
    safety.envValueReadAllowedNow !== false ||
    safety.rawSecretReadAllowedNow !== false ||
    safety.dbReadAllowedNow !== false ||
    safety.dbWriteAllowedNow !== false ||
    safety.schemaWriteAllowedNow !== false ||
    safety.migrationAllowedNow !== false ||
    safety.prismaGenerateAllowedNow !== false ||
    safety.providerBindingAllowedNow !== false ||
    safety.providerLiveCallAllowedNow !== false ||
    safety.providerPayoutCallAllowedNow !== false ||
    safety.walletMutationAllowedNow !== false ||
    safety.paymentCaptureAllowedNow !== false ||
    safety.payoutExecutionAllowedNow !== false ||
    safety.realtimeEmitAllowedNow !== false ||
    safety.fakePaymentSuccessAllowed !== false ||
    safety.fakeGiftSendSuccessAllowed !== false ||
    safety.fakePayoutSuccessAllowed !== false ||
    safety.fakeAvailableBalanceAllowed !== false
  ) {
    throw new Error("stream_gift_ledger_199h_unsafe_runtime_flag");
  }
}
