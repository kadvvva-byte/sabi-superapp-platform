import { assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe } from "../gift-ledger-controlled-provider-binding-activation-execution-approval-200g";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationNextRequest200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlocked200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightResult200H,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200H_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightSafety200H = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  previous200GExecutionApprovalAlreadyPrepared: true,
  activationExecutionPreflightOnly: true,
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
  requiresSeparate200IControlledActivationExecutionAuthorization: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H[]);

const PROVIDER_NAMES_200H = Object.freeze(["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const);
const CONFIG_SCOPES_200H = Object.freeze(["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const);
const OWNER_ATTESTATIONS_200H = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const EXECUTION_APPROVAL_STAGES_200H = Object.freeze(["200G_controlled_provider_binding_activation_execution_approval_prepared", "pending_owner_fill"] as const);
const PREFLIGHT_INTENTS_200H = Object.freeze(["request_controlled_activation_execution_preflight_only", "pending_owner_fill"] as const);
const PREFLIGHT_MODES_200H = Object.freeze(["preflight_only_no_activation_execution", "pending_owner_fill"] as const);
const PROVIDER_BINDING_MODES_200H = Object.freeze(["disabled_until_separate_activation_execution", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200H = Object.freeze(["disabled_no_provider_call", "pending_owner_fill"] as const);
const PAYMENT_RUNTIME_MODES_200H = Object.freeze(["disabled_no_payment_capture", "pending_owner_fill"] as const);
const PAYOUT_RUNTIME_MODES_200H = Object.freeze(["disabled_no_payout_execution", "pending_owner_fill"] as const);
const WALLET_MUTATION_MODES_200H = Object.freeze(["disabled_no_wallet_mutation", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200H = Object.freeze(["ready", "pending_owner_fill"] as const);
const ADMIN_COMPLIANCE_GATES_200H = Object.freeze(["ready_for_activation_execution_review", "pending_owner_fill"] as const);
const AUDIT_ENVELOPE_MODES_200H = Object.freeze(["preflight_audit_only_no_runtime_write", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200H = Object.freeze([
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

type ActivationExecutionPreflightScopeExpectation200H = Readonly<{
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H[];
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H[];
}>;

function expectedActivationExecutionPreflightScope200H(
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H[],
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H[],
): ActivationExecutionPreflightScopeExpectation200H {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200H: Record<StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H, ActivationExecutionPreflightScopeExpectation200H> = Object.freeze({
  accept_payments_provider: expectedActivationExecutionPreflightScope200H(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedActivationExecutionPreflightScope200H(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedActivationExecutionPreflightScope200H(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedActivationExecutionPreflightScope200H(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200H(
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlocked200H["code"],
  blockedReason: string,
): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightBlocked200H {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    status: "controlled_provider_binding_activation_execution_preflight_blocked_without_activation",
    code,
    blockedReason,
    activationExecutionPreflightPrepared: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY,
  };
}

function containsSecretLikeText200H(value: string): boolean {
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

function hasForbiddenRawSecretInput200H(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200H.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200H)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200H(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200H(nested)) return true;
  }
  return false;
}

function normalizeBindingKind200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H.find((kind) => kind === normalized);
}

function normalizeProviderName200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightProviderName200H {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200H.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeConfigScope200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightConfigScope200H {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200H.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200H.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeExecutionApprovalStage200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["executionApprovalStage"] {
  const normalized = clean(value);
  return EXECUTION_APPROVAL_STAGES_200H.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeActivationExecutionPreflightIntent200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["activationExecutionPreflightIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return PREFLIGHT_INTENTS_200H.find((intent) => intent === normalized) ?? "pending_owner_fill";
}

function normalizeActivationExecutionPreflightMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["activationExecutionPreflightMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PREFLIGHT_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeProviderBindingMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["providerBindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_BINDING_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeLiveCallMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePaymentRuntimeMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["paymentRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYMENT_RUNTIME_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePayoutRuntimeMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["payoutRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYOUT_RUNTIME_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeWalletMutationMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["walletMutationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return WALLET_MUTATION_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRollbackPlan200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200H.find((plan) => plan === normalized) ?? "pending_owner_fill";
}

function normalizeAdminComplianceGate200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["adminComplianceGate"] {
  const normalized = clean(value)?.toLowerCase();
  return ADMIN_COMPLIANCE_GATES_200H.find((gate) => gate === normalized) ?? "pending_owner_fill";
}

function normalizeAuditEnvelopeMode200H(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H["auditEnvelopeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return AUDIT_ENVELOPE_MODES_200H.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200H(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200H(value);
}

function normalizeBindingItems200H(raw: unknown): readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200H(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200H(record.providerName),
      configReferenceLabel,
      configScope: normalizeConfigScope200H(record.configScope),
      ownerAttestation: normalizeOwnerAttestation200H(record.ownerAttestation),
      executionApprovalStage: normalizeExecutionApprovalStage200H(record.executionApprovalStage),
      activationExecutionPreflightIntent: normalizeActivationExecutionPreflightIntent200H(record.activationExecutionPreflightIntent),
      activationExecutionPreflightMode: normalizeActivationExecutionPreflightMode200H(record.activationExecutionPreflightMode),
      providerBindingMode: normalizeProviderBindingMode200H(record.providerBindingMode),
      liveCallMode: normalizeLiveCallMode200H(record.liveCallMode),
      paymentRuntimeMode: normalizePaymentRuntimeMode200H(record.paymentRuntimeMode),
      payoutRuntimeMode: normalizePayoutRuntimeMode200H(record.payoutRuntimeMode),
      walletMutationMode: normalizeWalletMutationMode200H(record.walletMutationMode),
      rollbackPlan: normalizeRollbackPlan200H(record.rollbackPlan),
      adminComplianceGate: normalizeAdminComplianceGate200H(record.adminComplianceGate),
      auditEnvelopeMode: normalizeAuditEnvelopeMode200H(record.auditEnvelopeMode),
    }];
  });
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H(
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H {
  return {
    ownerApproval: clean(raw.ownerApproval),
    preflightMode: clean(raw.preflightMode) === "controlled_provider_binding_activation_execution_preflight_request"
      ? "controlled_provider_binding_activation_execution_preflight_request"
      : "disabled",
    acknowledgedExecutionApprovalStage: clean(raw.acknowledgedExecutionApprovalStage) === "200G_controlled_provider_binding_activation_execution_approval_prepared"
      ? "200G_controlled_provider_binding_activation_execution_approval_prepared"
      : "disabled",
    bindingItems: normalizeBindingItems200H(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

function itemByKind200H(
  items: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H[],
): ReadonlyMap<StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightKind200H, StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200H(item: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightItem200H): string | undefined {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200H[item.bindingKind];
  if (!expected.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} cannot use providerName=${item.providerName}`;
  }
  if (!expected.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} cannot use configScope=${item.configScope}`;
  }
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H(): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    status: "ready_for_controlled_provider_binding_activation_execution_preflight",
    previousStageRequired: "200G_controlled_provider_binding_activation_execution_approval_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200I_controlled_provider_binding_activation_execution_authorization",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightContract200H(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    contract: "stream.gift.controlled_provider_binding.activation_execution_preflight.v1",
    previousStageRequired: "200G_controlled_provider_binding_activation_execution_approval_prepared",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_OWNER_APPROVAL,
    preflightMode: "controlled_provider_binding_activation_execution_preflight_request",
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H,
    requiredItemFields: [
      "bindingKind",
      "providerName",
      "configReferenceLabel",
      "configScope",
      "ownerAttestation=server_side_config_exists",
      "executionApprovalStage=200G_controlled_provider_binding_activation_execution_approval_prepared",
      "activationExecutionPreflightIntent=request_controlled_activation_execution_preflight_only",
      "activationExecutionPreflightMode=preflight_only_no_activation_execution",
      "providerBindingMode=disabled_until_separate_activation_execution",
      "liveCallMode=disabled_no_provider_call",
      "paymentRuntimeMode=disabled_no_payment_capture",
      "payoutRuntimeMode=disabled_no_payout_execution",
      "walletMutationMode=disabled_no_wallet_mutation",
      "rollbackPlan=ready",
      "adminComplianceGate=ready_for_activation_execution_review",
      "auditEnvelopeMode=preflight_audit_only_no_runtime_write",
    ],
    forbidden: [
      ".env read",
      "raw secrets or provider tokens",
      "provider binding execution",
      "provider activation execution",
      "provider live call",
      "provider payout call",
      "payment capture",
      "payout execution",
      "Wallet mutation",
      "DB read/write",
      "runtime enablement",
      "realtime emit",
      "fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H(
  input: StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H,
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightResult200H {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe();
  if (hasForbiddenRawSecretInput200H(raw)) {
    return blocked200H("raw_secret_or_provider_value_rejected", "Raw secrets, provider references, provider tokens or provider responses are forbidden in 200H.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_OWNER_APPROVAL) {
    return blocked200H("owner_approval_required", "Exact owner approval phrase is required for 200H controlled provider binding activation execution preflight.");
  }
  if (input.preflightMode !== "controlled_provider_binding_activation_execution_preflight_request") {
    return blocked200H("preflight_mode_disabled", "preflightMode must be controlled_provider_binding_activation_execution_preflight_request.");
  }
  if (input.acknowledgedExecutionApprovalStage !== "200G_controlled_provider_binding_activation_execution_approval_prepared") {
    return blocked200H("execution_approval_stage_required", "200G controlled provider binding activation execution approval acknowledgement is required.");
  }
  if (!input.bindingItems.length) {
    return blocked200H("binding_items_required", "bindingItems are required for all provider binding kinds.");
  }
  const byKind = itemByKind200H(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200H("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200H(item.configReferenceLabel)) {
      return blocked200H("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200H(item);
    if (scopeProblem) return blocked200H("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200H("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.executionApprovalStage !== "200G_controlled_provider_binding_activation_execution_approval_prepared") {
      return blocked200H("execution_approval_stage_required", `${item.bindingKind} executionApprovalStage must be 200G_controlled_provider_binding_activation_execution_approval_prepared.`);
    }
    if (item.activationExecutionPreflightIntent !== "request_controlled_activation_execution_preflight_only") {
      return blocked200H("activation_execution_preflight_intent_required", `${item.bindingKind} activationExecutionPreflightIntent must be request_controlled_activation_execution_preflight_only.`);
    }
    if (item.activationExecutionPreflightMode !== "preflight_only_no_activation_execution") {
      return blocked200H("activation_execution_preflight_mode_must_remain_preflight_only", `${item.bindingKind} activationExecutionPreflightMode must remain preflight_only_no_activation_execution.`);
    }
    if (item.providerBindingMode !== "disabled_until_separate_activation_execution") {
      return blocked200H("provider_binding_mode_must_remain_disabled", `${item.bindingKind} providerBindingMode must remain disabled_until_separate_activation_execution.`);
    }
    if (item.liveCallMode !== "disabled_no_provider_call") {
      return blocked200H("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_no_provider_call.`);
    }
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") {
      return blocked200H("payment_runtime_mode_must_remain_disabled", `${item.bindingKind} paymentRuntimeMode must remain disabled_no_payment_capture.`);
    }
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") {
      return blocked200H("payout_runtime_mode_must_remain_disabled", `${item.bindingKind} payoutRuntimeMode must remain disabled_no_payout_execution.`);
    }
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") {
      return blocked200H("wallet_mutation_mode_must_remain_disabled", `${item.bindingKind} walletMutationMode must remain disabled_no_wallet_mutation.`);
    }
    if (item.rollbackPlan !== "ready") {
      return blocked200H("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    }
    if (item.adminComplianceGate !== "ready_for_activation_execution_review") {
      return blocked200H("admin_compliance_gate_required", `${item.bindingKind} adminComplianceGate must be ready_for_activation_execution_review.`);
    }
    if (item.auditEnvelopeMode !== "preflight_audit_only_no_runtime_write") {
      return blocked200H("audit_envelope_mode_required", `${item.bindingKind} auditEnvelopeMode must be preflight_audit_only_no_runtime_write.`);
    }
  }

  const preflightedBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    status: "controlled_provider_binding_activation_execution_preflight_prepared_without_activation",
    envelope: {
      contract: "stream.gift.controlled_provider_binding.activation_execution_preflight.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
      previousStageRequired: "200G_controlled_provider_binding_activation_execution_approval_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H,
      preflightedBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      controlledActivationExecutionPreflightPrepared: true,
      activationExecutionPreflightOnly: true,
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
      rollbackReady: input.bindingItems.every((item) => item.rollbackPlan === "ready"),
      adminComplianceReady: input.bindingItems.every((item) => item.adminComplianceGate === "ready_for_activation_execution_review"),
      auditEnvelopeReady: input.bindingItems.every((item) => item.auditEnvelopeMode === "preflight_audit_only_no_runtime_write"),
      nextStage: "200I_controlled_provider_binding_activation_execution_authorization",
    },
    activationExecutionPreflightPrepared: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRunbook200H(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200h-controlled-provider-binding-activation-execution-preflight-check.js --i-approve-200h-controlled-provider-binding-activation-execution-preflight-check",
      "POST /api/admin/stream/gifts/ledger/200h/controlled-provider-binding-activation-execution-preflight with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_REQUIRED_KINDS_200H,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200H",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRequest200H(): StreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationNextRequest200H {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_execution_authorization",
    nextStage: "200I_controlled_provider_binding_activation_execution_authorization",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200I: [
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

export function assertStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRemainsSafe(): void {
  assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_SAFETY;
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
    !safety.previous200GExecutionApprovalAlreadyPrepared ||
    !safety.activationExecutionPreflightOnly ||
    !safety.requiresSeparate200IControlledActivationExecutionAuthorization ||
    !safety.referenceLabelsOnly
  ) {
    throw new Error("stream_gift_ledger_200h_unsafe_runtime_flag");
  }
}
