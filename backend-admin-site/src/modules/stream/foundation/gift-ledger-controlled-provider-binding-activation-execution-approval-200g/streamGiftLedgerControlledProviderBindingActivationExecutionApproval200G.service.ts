import { assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe } from "../gift-ledger-controlled-provider-binding-activation-dry-run-200f";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlocked200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalResult200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightNextRequest200G,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionApproval200G.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200G_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalSafety200G = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingDryRunOnlyAlreadyCompleted: true,
  activationExecutionApprovalOnly: true,
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
  requiresSeparate200HControlledActivationExecutionPreflight: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G[]);

const PROVIDER_NAMES_200G = Object.freeze(["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const);
const CONFIG_SCOPES_200G = Object.freeze(["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const);
const OWNER_ATTESTATIONS_200G = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const DRY_RUN_STAGES_200G = Object.freeze(["200F_controlled_provider_binding_activation_dry_run_prepared", "pending_owner_fill"] as const);
const EXECUTION_APPROVAL_INTENTS_200G = Object.freeze(["request_controlled_activation_execution_approval_only", "pending_owner_fill"] as const);
const EXECUTION_APPROVAL_MODES_200G = Object.freeze(["approval_only_no_activation_execution", "pending_owner_fill"] as const);
const PROVIDER_BINDING_MODES_200G = Object.freeze(["disabled_until_separate_execution_preflight", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200G = Object.freeze(["disabled_no_provider_call", "pending_owner_fill"] as const);
const PAYMENT_RUNTIME_MODES_200G = Object.freeze(["disabled_no_payment_capture", "pending_owner_fill"] as const);
const PAYOUT_RUNTIME_MODES_200G = Object.freeze(["disabled_no_payout_execution", "pending_owner_fill"] as const);
const WALLET_MUTATION_MODES_200G = Object.freeze(["disabled_no_wallet_mutation", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200G = Object.freeze(["ready", "pending_owner_fill"] as const);
const ADMIN_COMPLIANCE_GATES_200G = Object.freeze(["ready_for_execution_review", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200G = Object.freeze([
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

type ActivationExecutionApprovalScopeExpectation200G = Readonly<{
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G[];
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G[];
}>;

function expectedActivationExecutionApprovalScope200G(
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G[],
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G[],
): ActivationExecutionApprovalScopeExpectation200G {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200G: Record<StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G, ActivationExecutionApprovalScopeExpectation200G> = Object.freeze({
  accept_payments_provider: expectedActivationExecutionApprovalScope200G(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedActivationExecutionApprovalScope200G(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedActivationExecutionApprovalScope200G(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedActivationExecutionApprovalScope200G(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200G(
  code: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlocked200G["code"],
  blockedReason: string,
): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalBlocked200G {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    status: "controlled_provider_binding_activation_execution_approval_blocked_without_activation",
    code,
    blockedReason,
    activationExecutionApprovalPrepared: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY,
  };
}

function containsSecretLikeText200G(value: string): boolean {
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

function hasForbiddenRawSecretInput200G(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200G.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200G)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200G(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200G(nested)) return true;
  }
  return false;
}

function normalizeBindingKind200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G.find((kind) => kind === normalized);
}

function normalizeProviderName200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalProviderName200G {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200G.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeConfigScope200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalConfigScope200G {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200G.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200G.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeDryRunStage200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["dryRunStage"] {
  const normalized = clean(value);
  return DRY_RUN_STAGES_200G.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeExecutionApprovalIntent200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["executionApprovalIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return EXECUTION_APPROVAL_INTENTS_200G.find((intent) => intent === normalized) ?? "pending_owner_fill";
}

function normalizeExecutionApprovalMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["executionApprovalMode"] {
  const normalized = clean(value)?.toLowerCase();
  return EXECUTION_APPROVAL_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeProviderBindingMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["providerBindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_BINDING_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeLiveCallMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePaymentRuntimeMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["paymentRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYMENT_RUNTIME_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePayoutRuntimeMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["payoutRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYOUT_RUNTIME_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeWalletMutationMode200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["walletMutationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return WALLET_MUTATION_MODES_200G.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRollbackPlan200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200G.find((plan) => plan === normalized) ?? "pending_owner_fill";
}

function normalizeAdminComplianceGate200G(value: unknown): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G["adminComplianceGate"] {
  const normalized = clean(value)?.toLowerCase();
  return ADMIN_COMPLIANCE_GATES_200G.find((gate) => gate === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200G(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200G(value);
}

function normalizeBindingItems200G(raw: unknown): readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200G(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200G(record.providerName),
      configReferenceLabel,
      configScope: normalizeConfigScope200G(record.configScope),
      ownerAttestation: normalizeOwnerAttestation200G(record.ownerAttestation),
      dryRunStage: normalizeDryRunStage200G(record.dryRunStage),
      executionApprovalIntent: normalizeExecutionApprovalIntent200G(record.executionApprovalIntent),
      executionApprovalMode: normalizeExecutionApprovalMode200G(record.executionApprovalMode),
      providerBindingMode: normalizeProviderBindingMode200G(record.providerBindingMode),
      liveCallMode: normalizeLiveCallMode200G(record.liveCallMode),
      paymentRuntimeMode: normalizePaymentRuntimeMode200G(record.paymentRuntimeMode),
      payoutRuntimeMode: normalizePayoutRuntimeMode200G(record.payoutRuntimeMode),
      walletMutationMode: normalizeWalletMutationMode200G(record.walletMutationMode),
      rollbackPlan: normalizeRollbackPlan200G(record.rollbackPlan),
      adminComplianceGate: normalizeAdminComplianceGate200G(record.adminComplianceGate),
    }];
  });
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G(
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G {
  return {
    ownerApproval: clean(raw.ownerApproval),
    approvalMode: clean(raw.approvalMode) === "controlled_provider_binding_activation_execution_approval_request"
      ? "controlled_provider_binding_activation_execution_approval_request"
      : "disabled",
    acknowledgedDryRunStage: clean(raw.acknowledgedDryRunStage) === "200F_controlled_provider_binding_activation_dry_run_prepared"
      ? "200F_controlled_provider_binding_activation_dry_run_prepared"
      : "disabled",
    bindingItems: normalizeBindingItems200G(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

function itemByKind200G(
  items: readonly StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G[],
): ReadonlyMap<StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalKind200G, StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200G(item: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalItem200G): string | undefined {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200G[item.bindingKind];
  if (!expected.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} cannot use providerName=${item.providerName}`;
  }
  if (!expected.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} cannot use configScope=${item.configScope}`;
  }
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G(): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G {
  assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    status: "ready_for_controlled_provider_binding_activation_execution_approval",
    previousStageRequired: "200F_controlled_provider_binding_activation_dry_run_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200H_controlled_provider_binding_activation_execution_preflight",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalContract200G(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    contract: "stream.gift.controlled_provider_binding.activation_execution_approval.v1",
    previousStageRequired: "200F_controlled_provider_binding_activation_dry_run_prepared",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_OWNER_APPROVAL,
    approvalMode: "controlled_provider_binding_activation_execution_approval_request",
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G,
    requiredItemFields: [
      "bindingKind",
      "providerName",
      "configReferenceLabel",
      "configScope",
      "ownerAttestation=server_side_config_exists",
      "dryRunStage=200F_controlled_provider_binding_activation_dry_run_prepared",
      "executionApprovalIntent=request_controlled_activation_execution_approval_only",
      "executionApprovalMode=approval_only_no_activation_execution",
      "providerBindingMode=disabled_until_separate_execution_preflight",
      "liveCallMode=disabled_no_provider_call",
      "paymentRuntimeMode=disabled_no_payment_capture",
      "payoutRuntimeMode=disabled_no_payout_execution",
      "walletMutationMode=disabled_no_wallet_mutation",
      "rollbackPlan=ready",
      "adminComplianceGate=ready_for_execution_review",
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
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200G(
  input: StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G,
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalResult200G {
  assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe();
  if (hasForbiddenRawSecretInput200G(raw)) {
    return blocked200G("raw_secret_or_provider_value_rejected", "Raw secrets, provider references, provider tokens or provider responses are forbidden in 200G.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_OWNER_APPROVAL) {
    return blocked200G("owner_approval_required", "Exact owner approval phrase is required for 200G controlled provider binding activation execution approval.");
  }
  if (input.approvalMode !== "controlled_provider_binding_activation_execution_approval_request") {
    return blocked200G("approval_mode_disabled", "approvalMode must be controlled_provider_binding_activation_execution_approval_request.");
  }
  if (input.acknowledgedDryRunStage !== "200F_controlled_provider_binding_activation_dry_run_prepared") {
    return blocked200G("dry_run_stage_required", "200F controlled provider binding activation dry-run acknowledgement is required.");
  }
  if (!input.bindingItems.length) {
    return blocked200G("binding_items_required", "bindingItems are required for all provider binding kinds.");
  }
  const byKind = itemByKind200G(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200G("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200G(item.configReferenceLabel)) {
      return blocked200G("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200G(item);
    if (scopeProblem) return blocked200G("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200G("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.dryRunStage !== "200F_controlled_provider_binding_activation_dry_run_prepared") {
      return blocked200G("dry_run_stage_required", `${item.bindingKind} dryRunStage must be 200F_controlled_provider_binding_activation_dry_run_prepared.`);
    }
    if (item.executionApprovalIntent !== "request_controlled_activation_execution_approval_only") {
      return blocked200G("execution_approval_intent_required", `${item.bindingKind} executionApprovalIntent must be request_controlled_activation_execution_approval_only.`);
    }
    if (item.executionApprovalMode !== "approval_only_no_activation_execution") {
      return blocked200G("execution_approval_mode_must_remain_approval_only", `${item.bindingKind} executionApprovalMode must remain approval_only_no_activation_execution.`);
    }
    if (item.providerBindingMode !== "disabled_until_separate_execution_preflight") {
      return blocked200G("provider_binding_mode_must_remain_disabled", `${item.bindingKind} providerBindingMode must remain disabled_until_separate_execution_preflight.`);
    }
    if (item.liveCallMode !== "disabled_no_provider_call") {
      return blocked200G("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_no_provider_call.`);
    }
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") {
      return blocked200G("payment_runtime_mode_must_remain_disabled", `${item.bindingKind} paymentRuntimeMode must remain disabled_no_payment_capture.`);
    }
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") {
      return blocked200G("payout_runtime_mode_must_remain_disabled", `${item.bindingKind} payoutRuntimeMode must remain disabled_no_payout_execution.`);
    }
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") {
      return blocked200G("wallet_mutation_mode_must_remain_disabled", `${item.bindingKind} walletMutationMode must remain disabled_no_wallet_mutation.`);
    }
    if (item.rollbackPlan !== "ready") {
      return blocked200G("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    }
    if (item.adminComplianceGate !== "ready_for_execution_review") {
      return blocked200G("admin_compliance_gate_required", `${item.bindingKind} adminComplianceGate must be ready_for_execution_review.`);
    }
  }

  const approvedBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    status: "controlled_provider_binding_activation_execution_approval_prepared_without_activation",
    envelope: {
      contract: "stream.gift.controlled_provider_binding.activation_execution_approval.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
      previousStageRequired: "200F_controlled_provider_binding_activation_dry_run_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G,
      approvedBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      controlledActivationExecutionApprovalPrepared: true,
      activationExecutionApprovalOnly: true,
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
      adminComplianceReady: input.bindingItems.every((item) => item.adminComplianceGate === "ready_for_execution_review"),
      nextStage: "200H_controlled_provider_binding_activation_execution_preflight",
    },
    activationExecutionApprovalPrepared: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRunbook200G(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200g-controlled-provider-binding-activation-execution-approval-check.js --i-approve-200g-controlled-provider-binding-activation-execution-approval-check",
      "POST /api/admin/stream/gifts/ledger/200g/controlled-provider-binding-activation-execution-approval with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUIRED_KINDS_200G,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200G",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRequest200G(): StreamGiftLedgerControlledProviderBindingActivationExecutionPreflightNextRequest200G {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_execution_preflight",
    nextStage: "200H_controlled_provider_binding_activation_execution_preflight",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200H: [
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

export function assertStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRemainsSafe(): void {
  assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_SAFETY;
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
    !safety.providerBindingDryRunOnlyAlreadyCompleted ||
    !safety.activationExecutionApprovalOnly ||
    !safety.requiresSeparate200HControlledActivationExecutionPreflight ||
    !safety.referenceLabelsOnly
  ) {
    throw new Error("stream_gift_ledger_200g_unsafe_runtime_flag");
  }
}
