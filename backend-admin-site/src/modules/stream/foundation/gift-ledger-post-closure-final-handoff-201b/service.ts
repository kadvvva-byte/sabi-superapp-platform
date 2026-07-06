import {
  STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
  type StreamGiftLedgerPostClosureFinalHandoffBlocked201B,
  type StreamGiftLedgerPostClosureFinalHandoffBlockedCode201B,
  type StreamGiftLedgerPostClosureFinalHandoffEnvelope201B,
  type StreamGiftLedgerPostClosureFinalHandoffInput201B,
  type StreamGiftLedgerPostClosureFinalHandoffItem201B,
  type StreamGiftLedgerPostClosureFinalHandoffReadiness201B,
  type StreamGiftLedgerPostClosureFinalHandoffResult201B,
  type StreamGiftLedgerPostClosureFinalHandoffSafety201B,
  type StreamGiftLedgerPostClosureFinalHandoffStage201B,
} from "./types";

export const STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_OWNER_APPROVAL =
  "I_APPROVE_201B_POST_CLOSURE_FINAL_HANDOFF_NO_RUNTIME_EXECUTION" as const;

export const STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_REQUIRED_STAGES_201B = Object.freeze([
  "201A_post_closure_readiness_index_clean",
  "201A_checker_passed",
  "typescript_clean_on_owner_machine",
  "runtime_execution_still_requires_new_exact_owner_approval",
] as const satisfies readonly StreamGiftLedgerPostClosureFinalHandoffStage201B[]);

export const STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_SAFETY: StreamGiftLedgerPostClosureFinalHandoffSafety201B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  previous201APostClosureReadinessClean: true,
  postClosureFinalHandoffOnly: true,
  runtimeExecutionApprovedNow: false,
  liveActivationExecutionApprovedNow: false,
  liveActivationExecutionPerformedNow: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeEnabled: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
  dbReadExecuted: false,
  dbWriteExecuted: false,
  schemaWriteExecuted: false,
  migrationExecuted: false,
  prismaGenerateExecuted: false,
  realtimeEmitExecuted: false,
  runtimeEnablementExecuted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
  futureRuntimeExecutionRequiresSeparateExecutionPackage: true,
  sourceOnly: true,
});

const UNSAFE_VALUE_PATTERN = /(sk_live_|pk_live_|AIza|AKIA|-----BEGIN|private[_ -]?key|secret[_ -]?key|access[_ -]?token|refresh[_ -]?token|client[_ -]?secret|webhook[_ -]?secret|bearer\s+[a-z0-9._-]{12,})/i;
const UNSAFE_KEY_PATTERN = /(secret|token|password|privateKey|clientSecret|apiKey|accessKey|refreshToken|credential|authorization)/i;

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function hasUnsafeRawProviderValue(value: unknown): boolean {
  return typeof value === "string" && UNSAFE_VALUE_PATTERN.test(value);
}

function hasUnsafeRawProviderValueDeep(value: unknown): boolean {
  if (!value || typeof value !== "object") return hasUnsafeRawProviderValue(value);
  if (Array.isArray(value)) return value.some(hasUnsafeRawProviderValueDeep);
  return Object.entries(value as Record<string, unknown>).some(([key, entry]) => UNSAFE_KEY_PATTERN.test(key) || hasUnsafeRawProviderValueDeep(entry));
}

function normalizeHandoffItem(value: unknown): StreamGiftLedgerPostClosureFinalHandoffItem201B | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Record<string, unknown>;
  const stage = normalizeString(item.stage) as StreamGiftLedgerPostClosureFinalHandoffStage201B | undefined;
  const status = normalizeString(item.status) as StreamGiftLedgerPostClosureFinalHandoffItem201B["status"] | undefined;
  const evidenceReference = normalizeString(item.evidenceReference);
  if (!stage || !status || !evidenceReference) return undefined;
  return Object.freeze({
    stage,
    status,
    evidenceReference,
    runtimeExecutionAllowedNow: false,
    providerRuntimeEnabled: false,
    providerCallAllowedNow: false,
    paymentOrPayoutAllowedNow: false,
  });
}

export function normalizeStreamGiftLedgerPostClosureFinalHandoffInput201B(raw: Record<string, unknown>): StreamGiftLedgerPostClosureFinalHandoffInput201B {
  const rawItems = Array.isArray(raw.handoffItems) ? raw.handoffItems : [];
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    finalHandoffMode: normalizeString(raw.finalHandoffMode) as StreamGiftLedgerPostClosureFinalHandoffInput201B["finalHandoffMode"],
    acknowledged201AStage: normalizeString(raw.acknowledged201AStage) as StreamGiftLedgerPostClosureFinalHandoffInput201B["acknowledged201AStage"],
    handoffItems: Object.freeze(rawItems.map(normalizeHandoffItem).filter((item): item is StreamGiftLedgerPostClosureFinalHandoffItem201B => !!item)),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerPostClosureFinalHandoff201BRemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_SAFETY;
  if (
    safety.envFileReadAllowedNow ||
    safety.envValueReadAllowedNow ||
    safety.rawSecretAccepted ||
    safety.rawProviderTokenAccepted ||
    safety.rawProviderResponseAccepted ||
    safety.runtimeExecutionApprovedNow ||
    safety.liveActivationExecutionApprovedNow ||
    safety.liveActivationExecutionPerformedNow ||
    safety.providerBindingExecuted ||
    safety.providerBindingActivationExecuted ||
    safety.providerRuntimeEnabled ||
    safety.providerLiveCallExecuted ||
    safety.providerPayoutCallExecuted ||
    safety.walletMutationExecuted ||
    safety.paymentCaptureExecuted ||
    safety.payoutExecutionExecuted ||
    safety.dbReadExecuted ||
    safety.dbWriteExecuted ||
    safety.schemaWriteExecuted ||
    safety.migrationExecuted ||
    safety.prismaGenerateExecuted ||
    safety.realtimeEmitExecuted ||
    safety.runtimeEnablementExecuted ||
    safety.fakePaymentSuccessAllowed ||
    safety.fakeGiftSendSuccessAllowed ||
    safety.fakePayoutSuccessAllowed ||
    safety.fakeAvailableBalanceAllowed
  ) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-201B safety invariant failed: post-closure final handoff must not execute runtime/provider/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerPostClosureFinalHandoffBlockedCode201B, blockedReason: string): StreamGiftLedgerPostClosureFinalHandoffBlocked201B {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    status: "post_closure_final_handoff_blocked_without_runtime_execution",
    code,
    blockedReason,
    postClosureFinalHandoffPrepared: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|owner_note):[a-z0-9_./:-]{4,160}$/i.test(value);
}

function validateHandoffItems(items: readonly StreamGiftLedgerPostClosureFinalHandoffItem201B[]): StreamGiftLedgerPostClosureFinalHandoffBlocked201B | undefined {
  if (!items.length) return baseBlocked("handoff_items_required", "Post-closure final handoff items are required for 201B.");
  const stages = new Set(items.map((item) => item.stage));
  for (const stage of STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_REQUIRED_STAGES_201B) {
    if (!stages.has(stage)) return baseBlocked("missing_required_stage", `Missing required 201B stage: ${stage}`);
  }
  for (const item of items) {
    if (item.status !== "confirmed") return baseBlocked("stage_must_be_confirmed", `201B stage must be confirmed: ${item.stage}`);
    if (!evidenceReferenceValid(item.evidenceReference)) return baseBlocked("evidence_reference_required", "Evidence must be a report:/handoff:/checker:/tsc:/owner_note: reference, never a raw secret/provider value.");
    if (item.runtimeExecutionAllowedNow !== false) return baseBlocked("runtime_execution_must_remain_blocked", "Runtime execution must remain blocked after 201A.");
    if (item.providerRuntimeEnabled !== false) return baseBlocked("provider_runtime_must_remain_disabled", "Provider runtime must remain disabled after 201A.");
    if (item.providerCallAllowedNow !== false) return baseBlocked("provider_call_must_remain_disabled", "Provider calls must remain disabled after 201A.");
    if (item.paymentOrPayoutAllowedNow !== false) return baseBlocked("payment_or_payout_must_remain_disabled", "Payment/payout must remain disabled after 201A.");
  }
  return undefined;
}

export function prepareStreamGiftLedgerPostClosureFinalHandoff201B(input: StreamGiftLedgerPostClosureFinalHandoffInput201B, rawInput?: unknown): StreamGiftLedgerPostClosureFinalHandoffResult201B {
  assertStreamGiftLedgerPostClosureFinalHandoff201BRemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "201B accepts handoff evidence labels only, not raw secrets/provider tokens/responses.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 201B owner approval phrase is required for post-closure final handoff preparation.");
  if (input.finalHandoffMode !== "post_closure_final_handoff_only") return baseBlocked("final_handoff_mode_disabled", "201B can only prepare a final handoff; it cannot execute runtime.");
  if (input.acknowledged201AStage !== "201A_post_closure_readiness_index_clean") return baseBlocked("previous_201a_post_closure_readiness_required", "201A post-closure readiness index must be clean before 201B.");
  const blocked = validateHandoffItems(input.handoffItems);
  if (blocked) return blocked;
  const confirmedStages = Object.freeze(input.handoffItems.map((item) => item.stage));
  const envelope: StreamGiftLedgerPostClosureFinalHandoffEnvelope201B = Object.freeze({
    contract: "stream.gift.live_activation.post_closure_final_handoff.v1",
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    previousStageRequired: "201A_post_closure_readiness_index_clean",
    requiredStages: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_REQUIRED_STAGES_201B,
    confirmedStages,
    handoffItemCount: input.handoffItems.length,
    postClosureFinalHandoffPrepared: true,
    runtimeExecutionStillBlocked: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    rawSecretsIncluded: false,
    envFileRead: false,
    envValueRead: false,
    fakeSuccessWritten: false,
    futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    futureRuntimeExecutionRequiresSeparateExecutionPackage: true,
    nextStage: "closed_safe_disabled_post_closure_handoff_future_runtime_execution_requires_new_exact_owner_approval",
  });
  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    status: "post_closure_final_handoff_prepared_without_runtime_execution",
    envelope,
    postClosureFinalHandoffPrepared: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_SAFETY,
  });
}

export function getStreamGiftLedgerPostClosureFinalHandoff201B(): StreamGiftLedgerPostClosureFinalHandoffReadiness201B {
  assertStreamGiftLedgerPostClosureFinalHandoff201BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    status: "ready_for_post_closure_final_handoff_without_runtime_execution",
    previousStageRequired: "201A_post_closure_readiness_index_clean",
    backendReadinessPercent: 100,
    runtimeExecutionStillBlocked: true,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "closed_safe_disabled_post_closure_handoff_future_runtime_execution_requires_new_exact_owner_approval",
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_SAFETY,
  });
}

export function getStreamGiftLedgerPostClosureFinalHandoffContract201B() {
  assertStreamGiftLedgerPostClosureFinalHandoff201BRemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    contract: "stream.gift.live_activation.post_closure_final_handoff.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_OWNER_APPROVAL,
    previousStageRequired: "201A_post_closure_readiness_index_clean",
    accepts: "post-closure handoff evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, payment or payout execution data",
    noRuntimeExecution: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "closed_safe_disabled_post_closure_handoff_future_runtime_execution_requires_new_exact_owner_approval",
  });
}

export function getStreamGiftLedgerPostClosureFinalHandoffRunbook201B() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    steps: Object.freeze([
      "Verify 201A post-closure readiness report and checker are clean.",
      "Verify TypeScript is clean on owner machine.",
      "Confirm runtime execution still requires a new exact owner approval.",
      "Do not read environment files or provider credentials.",
      "Do not enable provider runtime, payment, payout, Wallet, DB, Prisma, or realtime side effects.",
      "Close this safe-disabled handoff branch; future runtime execution requires a separate execution package.",
    ]),
    blockedOperations: Object.freeze([
      "env_read",
      "raw_secret_input",
      "provider_call",
      "provider_runtime_enablement",
      "wallet_mutation",
      "payment_capture",
      "payout_execution",
      "db_read_write",
      "prisma_generate_or_migration",
      "realtime_emit",
      "fake_success",
    ]),
  });
}

export function createStreamGiftLedgerFutureRuntimeExecutionRequest201B() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_FINAL_HANDOFF_201B_VERSION,
    status: "future_runtime_execution_blocked_requires_new_exact_owner_approval",
    reason: "201B is post-closure final handoff only. Runtime execution requires a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "closed_safe_disabled_post_closure_handoff_future_runtime_execution_requires_new_exact_owner_approval",
  });
}
