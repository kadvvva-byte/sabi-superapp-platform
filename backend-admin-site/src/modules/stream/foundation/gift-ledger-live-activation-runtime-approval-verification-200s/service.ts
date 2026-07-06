import {
  STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlocked200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlockedCode200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationResult200S,
  type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S,
} from "./types";

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_OWNER_APPROVAL =
  "I_APPROVE_200S_RUNTIME_APPROVAL_VERIFICATION_ONLY_NO_PROVIDER_RUNTIME_ENABLEMENT" as const;

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_REQUIRED_KINDS_200S = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S[]);

export const STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  previous200RRuntimeApprovalRequestClean: true,
  runtimePackageApprovalVerificationOnly: true,
  liveActivationRuntimePackageApprovedNow: false,
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
  futureRuntimeFinalHandoffRequiresSeparateExactOwnerApproval: true,
  referenceLabelsOnly: true,
});

type StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderScopeItem200S = Readonly<{
  providerNames: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S[];
  configScopes: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S[];
}>;

function providerScopeItem200S(
  providerNames: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S[],
  configScopes: readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S[],
): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderScopeItem200S {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]) as readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S[],
    configScopes: Object.freeze([...configScopes]) as readonly StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S[],
  });
}

const PROVIDER_SCOPE: Readonly<Record<StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S, StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderScopeItem200S>> = Object.freeze({
  accept_payments_provider: providerScopeItem200S(["airwallex", "manual_review", "other"], ["accept_payments", "merchant_rails", "manual_review"]),
  creator_payout_provider: providerScopeItem200S(["airwallex", "bank", "manual_review", "other"], ["creator_payout", "manual_review"]),
  google_billing_diamonds_provider: providerScopeItem200S(["google_billing", "manual_review"], ["diamonds_topup", "manual_review"]),
  airwallex_merchant_rails_provider: providerScopeItem200S(["airwallex", "manual_review"], ["merchant_rails", "accept_payments", "creator_payout", "manual_review"]),
});

function hasUnsafeRawProviderValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (/-----BEGIN [A-Z ]+PRIVATE KEY-----/.test(trimmed)) return true;
  if (/sk_live_|pk_live_|rk_live_|AKIA|AIza|ya29\.|eyJ[a-zA-Z0-9_-]{20,}/.test(trimmed)) return true;
  if (trimmed.length >= 72 && /[A-Za-z0-9+/=_-]{48,}/.test(trimmed)) return true;
  return false;
}

function hasUnsafeRawProviderValueDeep(value: unknown): boolean {
  if (hasUnsafeRawProviderValue(value)) return true;
  if (Array.isArray(value)) return value.some(hasUnsafeRawProviderValueDeep);
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).some(hasUnsafeRawProviderValueDeep);
  return false;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeItem(value: unknown): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S | undefined {
  if (!isRecord(value)) return undefined;
  return Object.freeze({
    bindingKind: normalizeString(value.bindingKind) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S,
    providerName: normalizeString(value.providerName) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationProviderName200S,
    configReferenceLabel: normalizeString(value.configReferenceLabel),
    configScope: normalizeString(value.configScope) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationConfigScope200S,
    previousApprovalRequestStage: normalizeString(value.previousApprovalRequestStage) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["previousApprovalRequestStage"],
    runtimePackageVerificationMode: normalizeString(value.runtimePackageVerificationMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["runtimePackageVerificationMode"],
    exactOwnerApprovalRequired: normalizeString(value.exactOwnerApprovalRequired) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["exactOwnerApprovalRequired"],
    activationExecutionMode: normalizeString(value.activationExecutionMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["activationExecutionMode"],
    providerBindingMode: normalizeString(value.providerBindingMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["providerBindingMode"],
    providerRuntimeMode: normalizeString(value.providerRuntimeMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["providerRuntimeMode"],
    liveCallMode: normalizeString(value.liveCallMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["liveCallMode"],
    paymentRuntimeMode: normalizeString(value.paymentRuntimeMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["paymentRuntimeMode"],
    payoutRuntimeMode: normalizeString(value.payoutRuntimeMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["payoutRuntimeMode"],
    walletMutationMode: normalizeString(value.walletMutationMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["walletMutationMode"],
    runtimeCutoverMode: normalizeString(value.runtimeCutoverMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["runtimeCutoverMode"],
    rollbackPlan: normalizeString(value.rollbackPlan) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["rollbackPlan"],
    auditApprovalRequestClosure: normalizeString(value.auditApprovalRequestClosure) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S["auditApprovalRequestClosure"],
  });
}

export function normalizeStreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S(raw: Record<string, unknown>): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S {
  const rawItems = Array.isArray(raw.bindingItems) ? raw.bindingItems : [];
  return Object.freeze({
    ownerApproval: normalizeString(raw.ownerApproval),
    runtimeApprovalVerificationMode: normalizeString(raw.runtimeApprovalVerificationMode) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S["runtimeApprovalVerificationMode"],
    acknowledgedApprovalRequestStage: normalizeString(raw.acknowledgedApprovalRequestStage) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S["acknowledgedApprovalRequestStage"],
    bindingItems: Object.freeze(rawItems.map(normalizeItem).filter(Boolean) as StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S[]),
    operatorNote: normalizeString(raw.operatorNote),
  });
}

function blocked200S(code: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlockedCode200S, blockedReason: string): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationBlocked200S {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    status: "runtime_approval_verification_blocked_without_activation",
    code,
    blockedReason,
    runtimeApprovalVerificationPrepared: false,
    liveActivationRuntimePackageApprovedNow: false,
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
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY,
  });
}

function referenceLabelValid(label: string): boolean {
  return /^provider_ref:[a-z0-9_:-]{8,96}$/i.test(label);
}

function providerScopeValid(item: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationItem200S): boolean {
  const allowed = PROVIDER_SCOPE[item.bindingKind];
  return !!allowed && allowed.providerNames.includes(item.providerName) && allowed.configScopes.includes(item.configScope);
}

export function assertStreamGiftLedgerLiveActivationRuntimeApprovalVerification200SRemainsSafe(): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationSafety200S {
  return STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY;
}

export function prepareStreamGiftLedgerLiveActivationRuntimeApprovalVerification200S(
  input: StreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationResult200S {
  if (hasUnsafeRawProviderValueDeep(raw)) return blocked200S("raw_secret_or_provider_value_rejected", "Raw secrets/provider values are not accepted in 200S.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_OWNER_APPROVAL) return blocked200S("owner_approval_required", "Exact 200S owner approval phrase is required.");
  if (input.runtimeApprovalVerificationMode !== "verification_only") return blocked200S("runtime_approval_verification_mode_disabled", "200S must remain verification_only.");
  if (input.acknowledgedApprovalRequestStage !== "200R_runtime_approval_request_clean") return blocked200S("previous_200r_approval_request_required", "200R clean approval request must be acknowledged.");
  if (input.bindingItems.length === 0) return blocked200S("binding_items_required", "Reference-label binding items are required.");

  const seen = new Set<StreamGiftLedgerLiveActivationRuntimeApprovalVerificationKind200S>();
  for (const item of input.bindingItems) {
    if (!STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_REQUIRED_KINDS_200S.includes(item.bindingKind)) return blocked200S("missing_required_binding_kind", `Unknown binding kind: ${item.bindingKind}`);
    seen.add(item.bindingKind);
    if (!referenceLabelValid(item.configReferenceLabel)) return blocked200S("invalid_reference_label", "Only provider_ref:* reference labels are accepted.");
    if (!providerScopeValid(item)) return blocked200S("invalid_provider_scope_pair", "Provider/scope pair is not allowed for binding kind.");
    if (item.previousApprovalRequestStage !== "200R_runtime_approval_request_clean") return blocked200S("previous_approval_request_item_stage_required", "Each item must acknowledge 200R.");
    if (item.runtimePackageVerificationMode !== "verification_only_no_execution") return blocked200S("runtime_package_verification_mode_must_remain_no_execution", "Verification must not execute runtime.");
    if (item.exactOwnerApprovalRequired !== "required_before_runtime_package_final_handoff") return blocked200S("exact_owner_approval_required_before_final_handoff", "Final handoff still requires exact owner approval.");
    if (item.activationExecutionMode !== "not_executed_verification_only") return blocked200S("activation_execution_mode_must_remain_not_executed", "Activation execution is forbidden in 200S.");
    if (item.providerBindingMode !== "disabled_no_binding") return blocked200S("provider_binding_mode_must_remain_disabled", "Provider binding must remain disabled.");
    if (item.providerRuntimeMode !== "disabled_no_runtime_enablement") return blocked200S("provider_runtime_mode_must_remain_disabled", "Provider runtime must remain disabled.");
    if (item.liveCallMode !== "disabled_no_provider_call") return blocked200S("live_call_mode_must_remain_disabled", "Provider live calls are forbidden.");
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") return blocked200S("payment_runtime_mode_must_remain_disabled", "Payment capture is forbidden.");
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") return blocked200S("payout_runtime_mode_must_remain_disabled", "Payout execution is forbidden.");
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") return blocked200S("wallet_mutation_mode_must_remain_disabled", "Wallet mutations are forbidden.");
    if (item.runtimeCutoverMode !== "disabled_no_cutover") return blocked200S("runtime_cutover_mode_must_remain_disabled", "Runtime cutover must remain disabled.");
    if (item.rollbackPlan !== "ready") return blocked200S("rollback_plan_required", "Rollback plan is required.");
    if (item.auditApprovalRequestClosure !== "complete") return blocked200S("audit_approval_request_closure_required", "200R approval-request audit closure is required.");
  }

  for (const required of STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_REQUIRED_KINDS_200S) {
    if (!seen.has(required)) return blocked200S("missing_required_binding_kind", `Missing required binding kind: ${required}`);
  }

  return Object.freeze({
    ok: true,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    status: "runtime_approval_verification_prepared_without_activation",
    envelope: Object.freeze({
      contract: "stream.gift.live_activation.runtime_approval_verification.v1",
      version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
      previousStageRequired: "200R_runtime_approval_request_clean",
      requiredBindingKinds: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_REQUIRED_KINDS_200S,
      verifiedBindingKinds: Object.freeze([...seen]),
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      runtimeApprovalVerificationPrepared: true,
      runtimeApprovalVerificationOnlyNoExecution: true,
      liveActivationRuntimePackageApprovedNow: false,
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
      runtimeCutoverDisabled: true,
      rollbackReady: true,
      auditApprovalRequestClosureComplete: true,
      futureRuntimeFinalHandoffRequiresSeparateExactOwnerApproval: true,
      nextStage: "200T_live_activation_runtime_package_final_handoff",
    }),
    runtimeApprovalVerificationPrepared: true,
    liveActivationRuntimePackageApprovedNow: false,
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
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S(): StreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    status: "ready_for_runtime_approval_verification_without_activation",
    previousStageRequired: "200R_runtime_approval_request_clean",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200T_live_activation_runtime_package_final_handoff",
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationContract200S() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    contract: "stream.gift.live_activation.runtime_approval_verification.v1",
    requestOnly: false,
    verificationOnly: true,
    activationExecutionNow: false,
    runtimeEnablementNow: false,
    exactOwnerApproval: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_OWNER_APPROVAL,
    requiredKinds: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_REQUIRED_KINDS_200S,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY,
  });
}

export function getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationRunbook200S() {
  return Object.freeze({
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    sequence: ["confirm_200R_clean", "submit_reference_label_items", "verify_no_runtime_execution", "prepare_200T_final_handoff_only"],
    forbidden: [".env read", "raw secrets", "provider binding", "provider runtime enablement", "provider live calls", "provider payout calls", "Wallet mutation", "payment capture", "payout execution", "DB write", "realtime emit", "fake success"],
    nextStage: "200T_live_activation_runtime_package_final_handoff",
  });
}

export function createStreamGiftLedgerLiveActivationRuntimeFinalHandoffRequest200S() {
  return Object.freeze({
    ok: false,
    version: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_VERSION,
    status: "runtime_final_handoff_request_blocked_without_activation",
    reason: "200T final handoff requires a separate exact owner approval and remains no-runtime.",
    liveActivationRuntimePackageApprovedNow: false,
    liveActivationExecutionPerformedNow: false,
    providerRuntimeEnabled: false,
    safety: STREAM_GIFT_LEDGER_LIVE_ACTIVATION_RUNTIME_APPROVAL_VERIFICATION_200S_SAFETY,
  });
}
