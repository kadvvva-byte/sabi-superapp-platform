import { assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe } from "../gift-ledger-controlled-provider-binding-activation-execution-authorization-200i";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlocked200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateConfigScope200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffNextRequest200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateProviderName200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateResult200J,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200J_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateSafety200J = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  previous200IAuthorizationAlreadyPrepared: true,
  activationExecutionFinalGateOnly: true,
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
  requiresSeparateExactLiveActivationExecutionApproval: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J[]);

const PROVIDER_NAMES_200J = Object.freeze(["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const);
const CONFIG_SCOPES_200J = Object.freeze(["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const);
const OWNER_ATTESTATIONS_200J = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const AUTHORIZATION_STAGES_200J = Object.freeze(["200I_controlled_provider_binding_activation_execution_authorization_prepared", "pending_owner_fill"] as const);
const FINAL_GATE_INTENTS_200J = Object.freeze(["open_final_gate_without_runtime_activation", "pending_owner_fill"] as const);
const FINAL_GATE_MODES_200J = Object.freeze(["final_gate_only_no_activation_execution", "pending_owner_fill"] as const);
const PROVIDER_BINDING_MODES_200J = Object.freeze(["disabled_until_separate_live_activation", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200J = Object.freeze(["disabled_no_provider_call", "pending_owner_fill"] as const);
const PAYMENT_RUNTIME_MODES_200J = Object.freeze(["disabled_no_payment_capture", "pending_owner_fill"] as const);
const PAYOUT_RUNTIME_MODES_200J = Object.freeze(["disabled_no_payout_execution", "pending_owner_fill"] as const);
const WALLET_MUTATION_MODES_200J = Object.freeze(["disabled_no_wallet_mutation", "pending_owner_fill"] as const);
const RUNTIME_CUTOVER_MODES_200J = Object.freeze(["disabled_until_separate_exact_activation_execution", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200J = Object.freeze(["ready", "pending_owner_fill"] as const);
const ADMIN_COMPLIANCE_GATES_200J = Object.freeze(["ready_for_final_gate_review", "pending_owner_fill"] as const);
const AUDIT_ENVELOPE_MODES_200J = Object.freeze(["final_gate_audit_only_no_runtime_write", "pending_owner_fill"] as const);
const OPERATOR_FINAL_GATE_CHECKLISTS_200J = Object.freeze(["complete", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200J = Object.freeze([
  "secret", "secretValue", "rawSecret", "apiKey", "privateKey", "clientSecret", "providerSecret", "providerToken", "accessToken", "refreshToken", "password", "credential", "token", "authorizationHeader", "providerReference", "providerResponse",
] as const);
const RAW_SECRET_TEXT_PATTERNS_200J = Object.freeze([/-----BEGIN [A-Z ]*PRIVATE KEY-----/i, /sk_(live|test)_[A-Za-z0-9]/i, /bearer\s+[A-Za-z0-9._-]{16,}/i, /[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{24,}\.[A-Za-z0-9_-]{16,}/i] as const);

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200J: Readonly<Record<StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J, Readonly<{ providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateProviderName200J[]; configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateConfigScope200J[] }>>> = Object.freeze({
  accept_payments_provider: Object.freeze({ providerNames: ["airwallex", "wallet", "bank", "manual_review", "other"] as const, configScopes: ["accept_payments", "merchant_rails", "manual_review"] as const }),
  creator_payout_provider: Object.freeze({ providerNames: ["airwallex", "bank", "manual_review", "other"] as const, configScopes: ["creator_payout", "manual_review"] as const }),
  google_billing_diamonds_provider: Object.freeze({ providerNames: ["google_billing", "manual_review"] as const, configScopes: ["diamonds_topup", "manual_review"] as const }),
  airwallex_merchant_rails_provider: Object.freeze({ providerNames: ["airwallex", "manual_review"] as const, configScopes: ["merchant_rails", "accept_payments", "manual_review"] as const }),
});

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function containsSecretLikeText200J(value: string): boolean {
  return RAW_SECRET_TEXT_PATTERNS_200J.some((pattern) => pattern.test(value));
}

function hasForbiddenRawSecretInput200J(value: unknown, keyPath = "root"): boolean {
  if (typeof value === "string") return containsSecretLikeText200J(value);
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some((item, index) => hasForbiddenRawSecretInput200J(item, `${keyPath}[${index}]`));
  return Object.entries(value as Record<string, unknown>).some(([key, nested]) => {
    if (RAW_SECRET_FIELD_NAMES_200J.some((field) => field.toLowerCase() === key.toLowerCase())) return true;
    return hasForbiddenRawSecretInput200J(nested, `${keyPath}.${key}`);
  });
}

function normalizeBindingKind200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J.find((kind) => kind === normalized);
}
function normalizeProviderName200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateProviderName200J {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200J.find((providerName) => providerName === normalized) ?? "manual_review";
}
function normalizeConfigScope200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateConfigScope200J {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200J.find((scope) => scope === normalized) ?? "manual_review";
}
function normalizeOwnerAttestation200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200J.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}
function normalizeAuthorizationStage200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["authorizationStage"] {
  const normalized = clean(value)?.toLowerCase();
  return AUTHORIZATION_STAGES_200J.find((stage) => stage === normalized) ?? "pending_owner_fill";
}
function normalizeFinalGateIntent200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["finalGateIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return FINAL_GATE_INTENTS_200J.find((intent) => intent === normalized) ?? "pending_owner_fill";
}
function normalizeFinalGateMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["finalGateMode"] {
  const normalized = clean(value)?.toLowerCase();
  return FINAL_GATE_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeProviderBindingMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["providerBindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_BINDING_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeLiveCallMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizePaymentRuntimeMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["paymentRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYMENT_RUNTIME_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizePayoutRuntimeMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["payoutRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYOUT_RUNTIME_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeWalletMutationMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["walletMutationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return WALLET_MUTATION_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeRuntimeCutoverMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["runtimeCutoverMode"] {
  const normalized = clean(value)?.toLowerCase();
  return RUNTIME_CUTOVER_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeRollbackPlan200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200J.find((plan) => plan === normalized) ?? "pending_owner_fill";
}
function normalizeAdminComplianceGate200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["adminComplianceGate"] {
  const normalized = clean(value)?.toLowerCase();
  return ADMIN_COMPLIANCE_GATES_200J.find((gate) => gate === normalized) ?? "pending_owner_fill";
}
function normalizeAuditEnvelopeMode200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["auditEnvelopeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return AUDIT_ENVELOPE_MODES_200J.find((mode) => mode === normalized) ?? "pending_owner_fill";
}
function normalizeOperatorFinalGateChecklist200J(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J["operatorFinalGateChecklist"] {
  const normalized = clean(value)?.toLowerCase();
  return OPERATOR_FINAL_GATE_CHECKLISTS_200J.find((state) => state === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200J(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{6,96}$/.test(value) && !containsSecretLikeText200J(value);
}

function normalizeItem200J(raw: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  const bindingKind = normalizeBindingKind200J(record.bindingKind);
  if (!bindingKind) return undefined;
  return {
    bindingKind,
    providerName: normalizeProviderName200J(record.providerName),
    configReferenceLabel: clean(record.configReferenceLabel) ?? "",
    configScope: normalizeConfigScope200J(record.configScope),
    ownerAttestation: normalizeOwnerAttestation200J(record.ownerAttestation),
    authorizationStage: normalizeAuthorizationStage200J(record.authorizationStage),
    finalGateIntent: normalizeFinalGateIntent200J(record.finalGateIntent),
    finalGateMode: normalizeFinalGateMode200J(record.finalGateMode),
    providerBindingMode: normalizeProviderBindingMode200J(record.providerBindingMode),
    liveCallMode: normalizeLiveCallMode200J(record.liveCallMode),
    paymentRuntimeMode: normalizePaymentRuntimeMode200J(record.paymentRuntimeMode),
    payoutRuntimeMode: normalizePayoutRuntimeMode200J(record.payoutRuntimeMode),
    walletMutationMode: normalizeWalletMutationMode200J(record.walletMutationMode),
    runtimeCutoverMode: normalizeRuntimeCutoverMode200J(record.runtimeCutoverMode),
    rollbackPlan: normalizeRollbackPlan200J(record.rollbackPlan),
    adminComplianceGate: normalizeAdminComplianceGate200J(record.adminComplianceGate),
    auditEnvelopeMode: normalizeAuditEnvelopeMode200J(record.auditEnvelopeMode),
    operatorFinalGateChecklist: normalizeOperatorFinalGateChecklist200J(record.operatorFinalGateChecklist),
  };
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J(raw: Record<string, unknown>): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J {
  const rawItems = Array.isArray(raw.bindingItems) ? raw.bindingItems : [];
  const bindingItems = rawItems.map(normalizeItem200J).filter((item): item is StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J => Boolean(item));
  return {
    ownerApproval: clean(raw.ownerApproval),
    finalGateMode: clean(raw.finalGateMode) === "controlled_provider_binding_activation_execution_final_gate_request" ? "controlled_provider_binding_activation_execution_final_gate_request" : "disabled",
    acknowledgedAuthorizationStage: clean(raw.acknowledgedAuthorizationStage) === "200I_controlled_provider_binding_activation_execution_authorization_prepared" ? "200I_controlled_provider_binding_activation_execution_authorization_prepared" : "disabled",
    bindingItems,
    operatorNote: clean(raw.operatorNote),
  };
}

function mapByKind200J(items: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J[]): Map<StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateKind200J, StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}
function findScopeProblem200J(item: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateItem200J): string | undefined {
  const expectation = EXPECTED_PROVIDER_SCOPE_BY_KIND_200J[item.bindingKind];
  if (!expectation.providerNames.includes(item.providerName)) return `${item.bindingKind} providerName=${item.providerName} is not allowed for controlled final gate.`;
  if (!expectation.configScopes.includes(item.configScope)) return `${item.bindingKind} configScope=${item.configScope} is not allowed for controlled final gate.`;
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J(): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    status: "ready_for_controlled_provider_binding_activation_execution_final_gate",
    previousStageRequired: "200I_controlled_provider_binding_activation_execution_authorization_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateContract200J(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    contract: "stream.gift.controlled_provider_binding.activation_execution_final_gate.v1",
    previousStageRequired: "200I_controlled_provider_binding_activation_execution_authorization_prepared",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_OWNER_APPROVAL,
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J,
    requiredModes: {
      finalGateMode: "controlled_provider_binding_activation_execution_final_gate_request",
      finalGateItemMode: "final_gate_only_no_activation_execution",
      providerBindingMode: "disabled_until_separate_live_activation",
      liveCallMode: "disabled_no_provider_call",
      paymentRuntimeMode: "disabled_no_payment_capture",
      payoutRuntimeMode: "disabled_no_payout_execution",
      walletMutationMode: "disabled_no_wallet_mutation",
      runtimeCutoverMode: "disabled_until_separate_exact_activation_execution",
    },
    forbidden: [".env read", "raw secrets", "provider binding execution", "provider activation execution", "provider live call", "provider payout call", "Wallet mutation", "payment capture", "payout execution", "runtime enablement", "fake success"],
    nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY,
  };
}

function blocked200J(code: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlocked200J["code"], blockedReason: string): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateBlocked200J {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    status: "controlled_provider_binding_activation_execution_final_gate_blocked_without_activation",
    code,
    blockedReason,
    finalGatePrepared: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J(input: StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J, rawInput: unknown = input): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateResult200J {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRemainsSafe();
  if (hasForbiddenRawSecretInput200J(rawInput)) return blocked200J("raw_secret_or_provider_value_rejected", "Raw secrets, provider references, provider tokens or provider responses are forbidden in 200J.");
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_OWNER_APPROVAL) return blocked200J("owner_approval_required", "Owner approval phrase is required before controlled provider binding activation execution final gate.");
  if (input.finalGateMode !== "controlled_provider_binding_activation_execution_final_gate_request") return blocked200J("final_gate_mode_disabled", "finalGateMode must be controlled_provider_binding_activation_execution_final_gate_request.");
  if (input.acknowledgedAuthorizationStage !== "200I_controlled_provider_binding_activation_execution_authorization_prepared") return blocked200J("authorization_stage_required", "acknowledgedAuthorizationStage must be 200I_controlled_provider_binding_activation_execution_authorization_prepared.");
  if (!input.bindingItems.length) return blocked200J("binding_items_required", "bindingItems must contain reference-label-only final gate entries.");
  const byKind = mapByKind200J(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J.find((kind) => !byKind.has(kind));
  if (missing) return blocked200J("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200J(item.configReferenceLabel)) return blocked200J("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    const scopeProblem = findScopeProblem200J(item);
    if (scopeProblem) return blocked200J("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") return blocked200J("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    if (item.authorizationStage !== "200I_controlled_provider_binding_activation_execution_authorization_prepared") return blocked200J("authorization_stage_required", `${item.bindingKind} authorizationStage must be 200I_controlled_provider_binding_activation_execution_authorization_prepared.`);
    if (item.finalGateIntent !== "open_final_gate_without_runtime_activation") return blocked200J("final_gate_intent_required", `${item.bindingKind} finalGateIntent must be open_final_gate_without_runtime_activation.`);
    if (item.finalGateMode !== "final_gate_only_no_activation_execution") return blocked200J("final_gate_mode_must_remain_gate_only", `${item.bindingKind} finalGateMode must remain final_gate_only_no_activation_execution.`);
    if (item.providerBindingMode !== "disabled_until_separate_live_activation") return blocked200J("provider_binding_mode_must_remain_disabled", `${item.bindingKind} providerBindingMode must remain disabled_until_separate_live_activation.`);
    if (item.liveCallMode !== "disabled_no_provider_call") return blocked200J("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_no_provider_call.`);
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") return blocked200J("payment_runtime_mode_must_remain_disabled", `${item.bindingKind} paymentRuntimeMode must remain disabled_no_payment_capture.`);
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") return blocked200J("payout_runtime_mode_must_remain_disabled", `${item.bindingKind} payoutRuntimeMode must remain disabled_no_payout_execution.`);
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") return blocked200J("wallet_mutation_mode_must_remain_disabled", `${item.bindingKind} walletMutationMode must remain disabled_no_wallet_mutation.`);
    if (item.runtimeCutoverMode !== "disabled_until_separate_exact_activation_execution") return blocked200J("runtime_cutover_mode_must_remain_disabled", `${item.bindingKind} runtimeCutoverMode must remain disabled_until_separate_exact_activation_execution.`);
    if (item.rollbackPlan !== "ready") return blocked200J("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    if (item.adminComplianceGate !== "ready_for_final_gate_review") return blocked200J("admin_compliance_gate_required", `${item.bindingKind} adminComplianceGate must be ready_for_final_gate_review.`);
    if (item.auditEnvelopeMode !== "final_gate_audit_only_no_runtime_write") return blocked200J("audit_envelope_mode_required", `${item.bindingKind} auditEnvelopeMode must be final_gate_audit_only_no_runtime_write.`);
    if (item.operatorFinalGateChecklist !== "complete") return blocked200J("operator_final_gate_checklist_required", `${item.bindingKind} operatorFinalGateChecklist must be complete.`);
  }
  const finalGateBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    status: "controlled_provider_binding_activation_execution_final_gate_prepared_without_activation",
    envelope: {
      contract: "stream.gift.controlled_provider_binding.activation_execution_final_gate.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
      previousStageRequired: "200I_controlled_provider_binding_activation_execution_authorization_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J,
      finalGateBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      controlledActivationExecutionFinalGatePrepared: true,
      activationExecutionFinalGateOnly: true,
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
      runtimeCutoverDisabled: input.bindingItems.every((item) => item.runtimeCutoverMode === "disabled_until_separate_exact_activation_execution"),
      rollbackReady: input.bindingItems.every((item) => item.rollbackPlan === "ready"),
      adminComplianceReady: input.bindingItems.every((item) => item.adminComplianceGate === "ready_for_final_gate_review"),
      auditEnvelopeReady: input.bindingItems.every((item) => item.auditEnvelopeMode === "final_gate_audit_only_no_runtime_write"),
      operatorFinalGateChecklistComplete: input.bindingItems.every((item) => item.operatorFinalGateChecklist === "complete"),
      requiresSeparateExactLiveActivationExecutionApproval: true,
      nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff",
    },
    finalGatePrepared: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRunbook200J(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200j-controlled-provider-binding-activation-execution-final-gate-check.js --i-approve-200j-controlled-provider-binding-activation-execution-final-gate-check",
      "POST /api/admin/stream/gifts/ledger/200j/controlled-provider-binding-activation-execution-final-gate with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_REQUIRED_KINDS_200J,
    forbidden: ["do not read .env files", "do not submit raw secrets, provider tokens, provider references or provider responses", "do not execute provider binding in 200J", "do not run provider live calls", "do not mutate Wallet", "do not capture payment", "do not execute payout", "do not enable runtime", "do not fake success"],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffRequest200J(): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffNextRequest200J {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_execution_final_handoff",
    nextStage: "200K_controlled_provider_binding_activation_execution_final_handoff",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntilSeparateExactLiveActivation: ["raw secret read or print", "provider binding execution", "provider activation execution", "provider live call", "provider payout call", "Wallet mutation", "payment capture", "payout execution", "runtime enablement", "fake provider/payment/payout success"],
  };
}

export function assertStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRemainsSafe(): void {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_SAFETY;
  const unsafe = [safety.envFileReadAllowedNow, safety.envValueReadAllowedNow, safety.rawSecretAccepted, safety.rawProviderTokenAccepted, safety.rawProviderReferenceAccepted, safety.rawProviderResponseAccepted, safety.providerBindingExecuted, safety.providerBindingActivationExecuted, safety.providerRuntimeEnabled, safety.providerLiveCallExecuted, safety.providerPayoutCallExecuted, safety.walletMutationExecuted, safety.paymentCaptureExecuted, safety.payoutExecutionExecuted, safety.dbReadExecuted, safety.dbWriteExecuted, safety.schemaWriteExecuted, safety.migrationExecuted, safety.prismaGenerateExecuted, safety.realtimeEmitExecuted, safety.runtimeEnablementExecuted, safety.fakePaymentSuccessAllowed, safety.fakeGiftSendSuccessAllowed, safety.fakePayoutSuccessAllowed, safety.fakeAvailableBalanceAllowed];
  if (unsafe.some(Boolean) || !safety.previous200IAuthorizationAlreadyPrepared || !safety.activationExecutionFinalGateOnly || !safety.requiresSeparateExactLiveActivationExecutionApproval || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200j_unsafe_runtime_flag");
  }
}
