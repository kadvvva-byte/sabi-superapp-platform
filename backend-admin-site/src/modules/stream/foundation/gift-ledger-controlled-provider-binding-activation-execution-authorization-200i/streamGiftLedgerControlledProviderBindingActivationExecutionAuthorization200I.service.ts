import { assertStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRemainsSafe } from "../gift-ledger-controlled-provider-binding-activation-execution-preflight-200h";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlocked200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateNextRequest200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationResult200I,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200I_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationSafety200I = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  previous200HExecutionPreflightAlreadyPrepared: true,
  activationExecutionAuthorizationOnly: true,
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
  requiresSeparate200JControlledActivationExecutionFinalGate: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I[]);

const PROVIDER_NAMES_200I = Object.freeze(["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const);
const CONFIG_SCOPES_200I = Object.freeze(["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const);
const OWNER_ATTESTATIONS_200I = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const PREFLIGHT_STAGES_200I = Object.freeze(["200H_controlled_provider_binding_activation_execution_preflight_prepared", "pending_owner_fill"] as const);
const AUTHORIZATION_INTENTS_200I = Object.freeze(["authorize_controlled_activation_execution_without_live_call", "pending_owner_fill"] as const);
const AUTHORIZATION_MODES_200I = Object.freeze(["authorization_only_no_activation_execution", "pending_owner_fill"] as const);
const PROVIDER_BINDING_MODES_200I = Object.freeze(["disabled_until_separate_activation_execution", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200I = Object.freeze(["disabled_no_provider_call", "pending_owner_fill"] as const);
const PAYMENT_RUNTIME_MODES_200I = Object.freeze(["disabled_no_payment_capture", "pending_owner_fill"] as const);
const PAYOUT_RUNTIME_MODES_200I = Object.freeze(["disabled_no_payout_execution", "pending_owner_fill"] as const);
const WALLET_MUTATION_MODES_200I = Object.freeze(["disabled_no_wallet_mutation", "pending_owner_fill"] as const);
const RUNTIME_CUTOVER_MODES_200I = Object.freeze(["disabled_until_200j_final_execution_gate", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200I = Object.freeze(["ready", "pending_owner_fill"] as const);
const ADMIN_COMPLIANCE_GATES_200I = Object.freeze(["ready_for_activation_execution_authorization_review", "pending_owner_fill"] as const);
const AUDIT_ENVELOPE_MODES_200I = Object.freeze(["authorization_audit_only_no_runtime_write", "pending_owner_fill"] as const);
const OPERATOR_AUTHORIZATION_CHECKLISTS_200I = Object.freeze(["complete", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200I = Object.freeze([
  "secret",
  "secretValue",
  "rawSecret",
  "apiKey",
  "privateKey",
  "clientSecret",
  "accessToken",
  "refreshToken",
  "providerToken",
  "rawProviderToken",
  "providerReference",
  "rawProviderReference",
  "providerResponse",
  "rawProviderResponse",
  "providerPayoutReference",
  "rawProviderPayoutReference",
  "webhookSecret",
  "bankAccountNumber",
  "bankAccount",
  "iban",
  "swift",
  "cardNumber",
  "authorizationCode",
  "paymentIntentSecret",
  "airwallexClientSecret",
  "googleBillingPrivateKey",
  "value",
  "rawValue",
] as const);

type ActivationExecutionAuthorizationScopeExpectation200I = Readonly<{
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I[];
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I[];
}>;

function expectedActivationExecutionAuthorizationScope200I(
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I[],
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I[],
): ActivationExecutionAuthorizationScopeExpectation200I {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200I: Record<StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I, ActivationExecutionAuthorizationScopeExpectation200I> = Object.freeze({
  accept_payments_provider: expectedActivationExecutionAuthorizationScope200I(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedActivationExecutionAuthorizationScope200I(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedActivationExecutionAuthorizationScope200I(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedActivationExecutionAuthorizationScope200I(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200I(
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlocked200I["code"],
  blockedReason: string,
): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationBlocked200I {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    status: "controlled_provider_binding_activation_execution_authorization_blocked_without_activation",
    code,
    blockedReason,
    activationExecutionAuthorizationPrepared: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY,
  };
}

function containsSecretLikeText200I(value: string): boolean {
  const lowered = value.toLowerCase();
  return (
    lowered.includes("secret=") ||
    lowered.includes("token=") ||
    lowered.includes("bearer ") ||
    lowered.includes("sk_") ||
    lowered.includes("pk_") ||
    lowered.includes("private_key") ||
    lowered.includes("-----begin") ||
    lowered.includes("cardnumber") ||
    lowered.includes("iban=") ||
    lowered.includes("access_token") ||
    lowered.includes("refresh_token") ||
    lowered.includes("client_secret") ||
    lowered.includes("authorizationcode=")
  );
}

function hasForbiddenRawSecretInput200I(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200I.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200I)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200I(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200I(nested)) return true;
  }
  return false;
}

function normalizeBindingKind200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I.find((kind) => kind === normalized);
}

function normalizeProviderName200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationProviderName200I {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200I.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeConfigScope200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationConfigScope200I {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200I.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200I.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizePreflightStage200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["preflightStage"] {
  const normalized = clean(value)?.toLowerCase();
  return PREFLIGHT_STAGES_200I.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeAuthorizationIntent200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["activationExecutionAuthorizationIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return AUTHORIZATION_INTENTS_200I.find((intent) => intent === normalized) ?? "pending_owner_fill";
}

function normalizeAuthorizationMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["activationExecutionAuthorizationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return AUTHORIZATION_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeProviderBindingMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["providerBindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_BINDING_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeLiveCallMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePaymentRuntimeMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["paymentRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYMENT_RUNTIME_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePayoutRuntimeMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["payoutRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYOUT_RUNTIME_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeWalletMutationMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["walletMutationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return WALLET_MUTATION_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRuntimeCutoverMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["runtimeCutoverMode"] {
  const normalized = clean(value)?.toLowerCase();
  return RUNTIME_CUTOVER_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRollbackPlan200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200I.find((plan) => plan === normalized) ?? "pending_owner_fill";
}

function normalizeAdminComplianceGate200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["adminComplianceGate"] {
  const normalized = clean(value)?.toLowerCase();
  return ADMIN_COMPLIANCE_GATES_200I.find((gate) => gate === normalized) ?? "pending_owner_fill";
}

function normalizeAuditEnvelopeMode200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["auditEnvelopeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return AUDIT_ENVELOPE_MODES_200I.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeOperatorAuthorizationChecklist200I(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I["operatorAuthorizationChecklist"] {
  const normalized = clean(value)?.toLowerCase();
  return OPERATOR_AUTHORIZATION_CHECKLISTS_200I.find((state) => state === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200I(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{6,96}$/.test(value) && !containsSecretLikeText200I(value);
}

function normalizeItem200I(raw: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const record = raw as Record<string, unknown>;
  const bindingKind = normalizeBindingKind200I(record.bindingKind);
  if (!bindingKind) return undefined;
  return {
    bindingKind,
    providerName: normalizeProviderName200I(record.providerName),
    configReferenceLabel: clean(record.configReferenceLabel) ?? "",
    configScope: normalizeConfigScope200I(record.configScope),
    ownerAttestation: normalizeOwnerAttestation200I(record.ownerAttestation),
    preflightStage: normalizePreflightStage200I(record.preflightStage),
    activationExecutionAuthorizationIntent: normalizeAuthorizationIntent200I(record.activationExecutionAuthorizationIntent),
    activationExecutionAuthorizationMode: normalizeAuthorizationMode200I(record.activationExecutionAuthorizationMode),
    providerBindingMode: normalizeProviderBindingMode200I(record.providerBindingMode),
    liveCallMode: normalizeLiveCallMode200I(record.liveCallMode),
    paymentRuntimeMode: normalizePaymentRuntimeMode200I(record.paymentRuntimeMode),
    payoutRuntimeMode: normalizePayoutRuntimeMode200I(record.payoutRuntimeMode),
    walletMutationMode: normalizeWalletMutationMode200I(record.walletMutationMode),
    runtimeCutoverMode: normalizeRuntimeCutoverMode200I(record.runtimeCutoverMode),
    rollbackPlan: normalizeRollbackPlan200I(record.rollbackPlan),
    adminComplianceGate: normalizeAdminComplianceGate200I(record.adminComplianceGate),
    auditEnvelopeMode: normalizeAuditEnvelopeMode200I(record.auditEnvelopeMode),
    operatorAuthorizationChecklist: normalizeOperatorAuthorizationChecklist200I(record.operatorAuthorizationChecklist),
  };
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I(raw: Record<string, unknown>): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I {
  const rawItems = Array.isArray(raw.bindingItems) ? raw.bindingItems : [];
  const bindingItems = rawItems
    .map(normalizeItem200I)
    .filter((item): item is StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I => Boolean(item));
  return {
    ownerApproval: clean(raw.ownerApproval),
    authorizationMode: clean(raw.authorizationMode) === "controlled_provider_binding_activation_execution_authorization_request"
      ? "controlled_provider_binding_activation_execution_authorization_request"
      : "disabled",
    acknowledgedPreflightStage: clean(raw.acknowledgedPreflightStage) === "200H_controlled_provider_binding_activation_execution_preflight_prepared"
      ? "200H_controlled_provider_binding_activation_execution_preflight_prepared"
      : "disabled",
    bindingItems,
    operatorNote: clean(raw.operatorNote),
  };
}

function mapByKind200I(items: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I[]): Map<StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationKind200I, StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200I(item: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationItem200I): string | undefined {
  const expectation = EXPECTED_PROVIDER_SCOPE_BY_KIND_200I[item.bindingKind];
  if (!expectation.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} providerName=${item.providerName} is not allowed for controlled authorization.`;
  }
  if (!expectation.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} configScope=${item.configScope} is not allowed for controlled authorization.`;
  }
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I(): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    status: "ready_for_controlled_provider_binding_activation_execution_authorization",
    previousStageRequired: "200H_controlled_provider_binding_activation_execution_preflight_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200J_controlled_provider_binding_activation_execution_final_gate",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationContract200I(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    contract: "stream.gift.controlled_provider_binding.activation_execution_authorization.v1",
    previousStageRequired: "200H_controlled_provider_binding_activation_execution_preflight_prepared",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_OWNER_APPROVAL,
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I,
    referenceLabelsOnly: true,
    activationExecutionAuthorizationOnly: true,
    forbiddenRuntimeOperations: [
      "read .env or raw secret values",
      "execute provider binding activation",
      "call Google Billing or Airwallex",
      "capture payment",
      "execute payout",
      "mutate Wallet",
      "emit realtime gift delivery",
      "enable runtime",
      "write fake success",
    ],
    nextStage: "200J_controlled_provider_binding_activation_execution_final_gate",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I(
  input: StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I,
  rawInput: unknown = input,
): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationResult200I {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe();
  if (hasForbiddenRawSecretInput200I(rawInput)) {
    return blocked200I("raw_secret_or_provider_value_rejected", "Raw secrets, provider references, provider tokens or provider responses are forbidden in 200I.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_OWNER_APPROVAL) {
    return blocked200I("owner_approval_required", "Owner approval phrase is required before controlled provider binding activation execution authorization.");
  }
  if (input.authorizationMode !== "controlled_provider_binding_activation_execution_authorization_request") {
    return blocked200I("authorization_mode_disabled", "authorizationMode must be controlled_provider_binding_activation_execution_authorization_request.");
  }
  if (input.acknowledgedPreflightStage !== "200H_controlled_provider_binding_activation_execution_preflight_prepared") {
    return blocked200I("preflight_stage_required", "acknowledgedPreflightStage must be 200H_controlled_provider_binding_activation_execution_preflight_prepared.");
  }
  if (!input.bindingItems.length) {
    return blocked200I("binding_items_required", "bindingItems must contain reference-label-only authorization entries.");
  }
  const byKind = mapByKind200I(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200I("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200I(item.configReferenceLabel)) {
      return blocked200I("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200I(item);
    if (scopeProblem) return blocked200I("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200I("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.preflightStage !== "200H_controlled_provider_binding_activation_execution_preflight_prepared") {
      return blocked200I("preflight_stage_required", `${item.bindingKind} preflightStage must be 200H_controlled_provider_binding_activation_execution_preflight_prepared.`);
    }
    if (item.activationExecutionAuthorizationIntent !== "authorize_controlled_activation_execution_without_live_call") {
      return blocked200I("activation_execution_authorization_intent_required", `${item.bindingKind} activationExecutionAuthorizationIntent must be authorize_controlled_activation_execution_without_live_call.`);
    }
    if (item.activationExecutionAuthorizationMode !== "authorization_only_no_activation_execution") {
      return blocked200I("activation_execution_authorization_mode_must_remain_authorization_only", `${item.bindingKind} activationExecutionAuthorizationMode must remain authorization_only_no_activation_execution.`);
    }
    if (item.providerBindingMode !== "disabled_until_separate_activation_execution") {
      return blocked200I("provider_binding_mode_must_remain_disabled", `${item.bindingKind} providerBindingMode must remain disabled_until_separate_activation_execution.`);
    }
    if (item.liveCallMode !== "disabled_no_provider_call") {
      return blocked200I("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_no_provider_call.`);
    }
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") {
      return blocked200I("payment_runtime_mode_must_remain_disabled", `${item.bindingKind} paymentRuntimeMode must remain disabled_no_payment_capture.`);
    }
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") {
      return blocked200I("payout_runtime_mode_must_remain_disabled", `${item.bindingKind} payoutRuntimeMode must remain disabled_no_payout_execution.`);
    }
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") {
      return blocked200I("wallet_mutation_mode_must_remain_disabled", `${item.bindingKind} walletMutationMode must remain disabled_no_wallet_mutation.`);
    }
    if (item.runtimeCutoverMode !== "disabled_until_200j_final_execution_gate") {
      return blocked200I("runtime_cutover_mode_must_remain_disabled", `${item.bindingKind} runtimeCutoverMode must remain disabled_until_200j_final_execution_gate.`);
    }
    if (item.rollbackPlan !== "ready") {
      return blocked200I("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    }
    if (item.adminComplianceGate !== "ready_for_activation_execution_authorization_review") {
      return blocked200I("admin_compliance_gate_required", `${item.bindingKind} adminComplianceGate must be ready_for_activation_execution_authorization_review.`);
    }
    if (item.auditEnvelopeMode !== "authorization_audit_only_no_runtime_write") {
      return blocked200I("audit_envelope_mode_required", `${item.bindingKind} auditEnvelopeMode must be authorization_audit_only_no_runtime_write.`);
    }
    if (item.operatorAuthorizationChecklist !== "complete") {
      return blocked200I("operator_authorization_checklist_required", `${item.bindingKind} operatorAuthorizationChecklist must be complete.`);
    }
  }

  const authorizedBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    status: "controlled_provider_binding_activation_execution_authorization_prepared_without_activation",
    envelope: {
      contract: "stream.gift.controlled_provider_binding.activation_execution_authorization.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
      previousStageRequired: "200H_controlled_provider_binding_activation_execution_preflight_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I,
      authorizedBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      controlledActivationExecutionAuthorizationPrepared: true,
      activationExecutionAuthorizationOnly: true,
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
      runtimeCutoverDisabled: input.bindingItems.every((item) => item.runtimeCutoverMode === "disabled_until_200j_final_execution_gate"),
      rollbackReady: input.bindingItems.every((item) => item.rollbackPlan === "ready"),
      adminComplianceReady: input.bindingItems.every((item) => item.adminComplianceGate === "ready_for_activation_execution_authorization_review"),
      auditEnvelopeReady: input.bindingItems.every((item) => item.auditEnvelopeMode === "authorization_audit_only_no_runtime_write"),
      operatorAuthorizationChecklistComplete: input.bindingItems.every((item) => item.operatorAuthorizationChecklist === "complete"),
      nextStage: "200J_controlled_provider_binding_activation_execution_final_gate",
    },
    activationExecutionAuthorizationPrepared: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRunbook200I(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200i-controlled-provider-binding-activation-execution-authorization-check.js --i-approve-200i-controlled-provider-binding-activation-execution-authorization-check",
      "POST /api/admin/stream/gifts/ledger/200i/controlled-provider-binding-activation-execution-authorization with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_REQUIRED_KINDS_200I,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200I",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRequest200I(): StreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateNextRequest200I {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_execution_final_gate",
    nextStage: "200J_controlled_provider_binding_activation_execution_final_gate",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200J: [
      "raw secret read or print",
      "provider binding execution",
      "provider activation execution",
      "provider live call",
      "provider payout call",
      "Wallet mutation",
      "payment capture",
      "payout execution",
      "runtime enablement",
      "fake provider/payment/payout success",
    ],
  };
}

export function assertStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRemainsSafe(): void {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderResponseAccepted,
    safety.providerBindingExecuted,
    safety.providerBindingActivationExecuted,
    safety.providerRuntimeEnabled,
    safety.providerLiveCallExecuted,
    safety.providerPayoutCallExecuted,
    safety.walletMutationExecuted,
    safety.paymentCaptureExecuted,
    safety.payoutExecutionExecuted,
    safety.dbReadExecuted,
    safety.dbWriteExecuted,
    safety.schemaWriteExecuted,
    safety.migrationExecuted,
    safety.prismaGenerateExecuted,
    safety.realtimeEmitExecuted,
    safety.runtimeEnablementExecuted,
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (
    unsafe.some(Boolean) ||
    !safety.previous200HExecutionPreflightAlreadyPrepared ||
    !safety.activationExecutionAuthorizationOnly ||
    !safety.requiresSeparate200JControlledActivationExecutionFinalGate ||
    !safety.referenceLabelsOnly
  ) {
    throw new Error("stream_gift_ledger_200i_unsafe_runtime_flag");
  }
}
