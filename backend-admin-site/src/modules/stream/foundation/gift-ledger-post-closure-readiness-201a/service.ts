import {
  STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
  type StreamGiftLedgerPostClosureReadinessBlocked201A,
  type StreamGiftLedgerPostClosureReadinessBlockedCode201A,
  type StreamGiftLedgerPostClosureReadinessEnvelope201A,
  type StreamGiftLedgerPostClosureReadinessInput201A,
  type StreamGiftLedgerPostClosureReadinessItem201A,
  type StreamGiftLedgerPostClosureReadinessPrepared201A,
  type StreamGiftLedgerPostClosureReadinessReadiness201A,
  type StreamGiftLedgerPostClosureReadinessResult201A,
  type StreamGiftLedgerPostClosureReadinessSafety201A,
  type StreamGiftLedgerPostClosureReadinessStage201A,
} from "./types";

export const STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_OWNER_APPROVAL =
  "I_APPROVE_201A_POST_CLOSURE_READINESS_INDEX_NO_RUNTIME_EXECUTION" as const;

export const STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_REQUIRED_STAGES_201A = Object.freeze([
  "200Z_exact_final_handoff_clean",
  "200Z_checker_passed",
  "typescript_clean_on_owner_machine",
  "runtime_execution_still_blocked",
] as const satisfies readonly StreamGiftLedgerPostClosureReadinessStage201A[]);

export const STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_SAFETY: StreamGiftLedgerPostClosureReadinessSafety201A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderResponseAccepted: false,
  previous200ZExactFinalHandoffClean: true,
  postClosureReadinessIndexOnly: true,
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
  if (typeof value !== "string") return false;
  return UNSAFE_VALUE_PATTERN.test(value);
}

function hasUnsafeRawProviderValueDeep(value: unknown): boolean {
  if (!value || typeof value !== "object") return hasUnsafeRawProviderValue(value);
  if (Array.isArray(value)) return value.some(hasUnsafeRawProviderValueDeep);
  return Object.entries(value as Record<string, unknown>).some(([key, entry]) => UNSAFE_KEY_PATTERN.test(key) || hasUnsafeRawProviderValueDeep(entry));
}

function normalizeClosureItem(value: unknown): StreamGiftLedgerPostClosureReadinessItem201A | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Record<string, unknown>;
  const stage = normalizeString(item.stage) as StreamGiftLedgerPostClosureReadinessStage201A | undefined;
  const status = normalizeString(item.status) as StreamGiftLedgerPostClosureReadinessItem201A["status"] | undefined;
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

export function normalizeStreamGiftLedgerPostClosureReadinessInput201A(raw: Record<string, unknown>): StreamGiftLedgerPostClosureReadinessInput201A {
  const rawItems = Array.isArray(raw.closureItems) ? raw.closureItems : [];
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    postClosureMode: normalizeString(raw.postClosureMode) as StreamGiftLedgerPostClosureReadinessInput201A["postClosureMode"],
    acknowledged200ZStage: normalizeString(raw.acknowledged200ZStage) as StreamGiftLedgerPostClosureReadinessInput201A["acknowledged200ZStage"],
    closureItems: Object.freeze(rawItems.map(normalizeClosureItem).filter((item): item is StreamGiftLedgerPostClosureReadinessItem201A => !!item)),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

export function assertStreamGiftLedgerPostClosureReadiness201ARemainsSafe(): true {
  const safety = STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_SAFETY;
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-201A safety invariant failed: post-closure readiness must not execute runtime/provider/payment/payout.");
  }
  return true;
}

function baseBlocked(code: StreamGiftLedgerPostClosureReadinessBlockedCode201A, blockedReason: string): StreamGiftLedgerPostClosureReadinessBlocked201A {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    status: "post_closure_readiness_blocked_without_runtime_execution",
    code,
    blockedReason,
    postClosureReadinessPrepared: false,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_SAFETY,
  });
}

function evidenceReferenceValid(value: string): boolean {
  return /^(report|handoff|checker|tsc|owner_note):[a-z0-9_./:-]{4,160}$/i.test(value);
}

function validateClosureItems(items: readonly StreamGiftLedgerPostClosureReadinessItem201A[]): StreamGiftLedgerPostClosureReadinessBlocked201A | undefined {
  if (!items.length) return baseBlocked("closure_items_required", "Closure readiness items are required for 201A.");
  const stages = new Set(items.map((item) => item.stage));
  for (const stage of STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_REQUIRED_STAGES_201A) {
    if (!stages.has(stage)) return baseBlocked("missing_required_stage", `Missing required 201A stage: ${stage}`);
  }
  for (const item of items) {
    if (item.status !== "confirmed") return baseBlocked("stage_must_be_confirmed", `201A stage must be confirmed: ${item.stage}`);
    if (!evidenceReferenceValid(item.evidenceReference)) return baseBlocked("evidence_reference_required", "Evidence must be a report:/handoff:/checker:/tsc:/owner_note: reference, never a raw secret/provider value.");
    if (item.runtimeExecutionAllowedNow !== false) return baseBlocked("runtime_execution_must_remain_blocked", "Runtime execution must remain blocked after 200Z.");
    if (item.providerRuntimeEnabled !== false) return baseBlocked("provider_runtime_must_remain_disabled", "Provider runtime must remain disabled after 200Z.");
    if (item.providerCallAllowedNow !== false) return baseBlocked("provider_call_must_remain_disabled", "Provider calls must remain disabled after 200Z.");
    if (item.paymentOrPayoutAllowedNow !== false) return baseBlocked("payment_or_payout_must_remain_disabled", "Payment/payout must remain disabled after 200Z.");
  }
  return undefined;
}

export function prepareStreamGiftLedgerPostClosureReadiness201A(input: StreamGiftLedgerPostClosureReadinessInput201A, rawInput?: unknown): StreamGiftLedgerPostClosureReadinessResult201A {
  assertStreamGiftLedgerPostClosureReadiness201ARemainsSafe();
  if (hasUnsafeRawProviderValueDeep(rawInput ?? input)) return baseBlocked("raw_secret_or_provider_value_rejected", "201A accepts closure evidence labels only, not raw secrets/provider tokens/responses.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_OWNER_APPROVAL) return baseBlocked("owner_approval_required", "Exact 201A owner approval phrase is required for post-closure readiness index preparation.");
  if (input.postClosureMode !== "readiness_index_only") return baseBlocked("post_closure_mode_disabled", "201A can only prepare a readiness index; it cannot execute runtime.");
  if (input.acknowledged200ZStage !== "200Z_exact_final_handoff_clean") return baseBlocked("previous_200z_exact_final_handoff_required", "200Z exact final handoff must be clean before 201A.");
  const blocked = validateClosureItems(input.closureItems);
  if (blocked) return blocked;
  const confirmedStages = Object.freeze(input.closureItems.map((item) => item.stage));
  const envelope: StreamGiftLedgerPostClosureReadinessEnvelope201A = Object.freeze({
    contract: "stream.gift.live_activation.post_closure_readiness_index.v1",
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    previousStageRequired: "200Z_exact_final_handoff_clean",
    requiredStages: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_REQUIRED_STAGES_201A,
    confirmedStages,
    closureItemCount: input.closureItems.length,
    postClosureReadinessPrepared: true,
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
    nextStage: "future_runtime_execution_requires_new_exact_owner_approval_and_separate_execution_package",
  });
  const prepared: StreamGiftLedgerPostClosureReadinessPrepared201A = Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    status: "post_closure_readiness_prepared_without_runtime_execution",
    envelope,
    postClosureReadinessPrepared: true,
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_SAFETY,
  });
  return prepared;
}

export function getStreamGiftLedgerPostClosureReadiness201A(): StreamGiftLedgerPostClosureReadinessReadiness201A {
  assertStreamGiftLedgerPostClosureReadiness201ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    status: "ready_for_post_closure_readiness_index_without_runtime_execution",
    previousStageRequired: "200Z_exact_final_handoff_clean",
    backendReadinessPercent: 100,
    runtimeExecutionStillBlocked: true,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    nextStage: "future_runtime_execution_requires_new_exact_owner_approval_and_separate_execution_package",
    safety: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_SAFETY,
  });
}

export function getStreamGiftLedgerPostClosureReadinessContract201A() {
  assertStreamGiftLedgerPostClosureReadiness201ARemainsSafe();
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    contract: "stream.gift.live_activation.post_closure_readiness_index.v1",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_OWNER_APPROVAL,
    previousStageRequired: "200Z_exact_final_handoff_clean",
    accepts: "closure evidence references only",
    rejects: "raw secrets, provider tokens, provider responses, payment or payout execution data",
    noRuntimeExecution: true,
    noProviderCall: true,
    noProviderRuntimeEnablement: true,
    noWalletMutation: true,
    noPaymentCapture: true,
    noPayoutExecution: true,
    noDbReadWrite: true,
    noRealtimeEmit: true,
    nextStage: "future_runtime_execution_requires_new_exact_owner_approval_and_separate_execution_package",
  });
}

export function getStreamGiftLedgerPostClosureReadinessRunbook201A() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    steps: Object.freeze([
      "Verify 200Z exact final handoff report and checker are clean.",
      "Verify TypeScript is clean on owner machine.",
      "Confirm runtime execution remains blocked.",
      "Do not read environment files or provider credentials.",
      "Do not enable provider runtime, payment, payout, Wallet, DB, Prisma, or realtime side effects.",
      "Future runtime execution requires a new exact owner approval and separate execution package.",
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

export function createStreamGiftLedgerFutureRuntimeExecutionRequest201A() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_POST_CLOSURE_READINESS_201A_VERSION,
    status: "future_runtime_execution_blocked_requires_new_exact_owner_approval",
    reason: "201A is post-closure readiness index only. Runtime execution requires a new exact owner approval and separate execution package.",
    runtimeExecutionApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecutionExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    nextStage: "future_runtime_execution_requires_new_exact_owner_approval_and_separate_execution_package",
  });
}
