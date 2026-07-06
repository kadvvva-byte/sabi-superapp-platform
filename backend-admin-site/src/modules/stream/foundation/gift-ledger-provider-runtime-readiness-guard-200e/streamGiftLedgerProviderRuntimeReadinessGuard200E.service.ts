import { assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe } from "../gift-ledger-controlled-provider-binding-activation-request-200d";
import {
  STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunNextRequest200E,
  type StreamGiftLedgerProviderRuntimeReadinessBindingKind200E,
  type StreamGiftLedgerProviderRuntimeReadinessBlocked200E,
  type StreamGiftLedgerProviderRuntimeReadinessConfigScope200E,
  type StreamGiftLedgerProviderRuntimeReadinessInput200E,
  type StreamGiftLedgerProviderRuntimeReadinessItem200E,
  type StreamGiftLedgerProviderRuntimeReadinessProviderName200E,
  type StreamGiftLedgerProviderRuntimeReadinessResult200E,
  type StreamGiftLedgerProviderRuntimeReadinessSafety200E,
  type StreamGiftLedgerProviderRuntimeReadinessStatus200E,
} from "./streamGiftLedgerProviderRuntimeReadinessGuard200E.types";

export const STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200E_PROVIDER_RUNTIME_READINESS_GUARD_APPROVED" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY: StreamGiftLedgerProviderRuntimeReadinessSafety200E = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerRuntimeReadinessGuardOnly: true,
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
  requiresSeparate200FControlledActivationDryRun: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerProviderRuntimeReadinessBindingKind200E[]);

const PROVIDER_NAMES_200E = Object.freeze(["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const satisfies readonly StreamGiftLedgerProviderRuntimeReadinessProviderName200E[]);
const CONFIG_SCOPES_200E = Object.freeze(["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const satisfies readonly StreamGiftLedgerProviderRuntimeReadinessConfigScope200E[]);
const OWNER_ATTESTATIONS_200E = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const ACTIVATION_REQUEST_STAGES_200E = Object.freeze(["200D_controlled_provider_binding_activation_request_prepared", "pending_owner_fill"] as const);
const RUNTIME_READINESS_200E = Object.freeze(["ready_for_controlled_activation", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200E = Object.freeze(["disabled_until_separate_activation", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200E = Object.freeze(["ready", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200E = Object.freeze([
  "secret",
  "clientSecret",
  "apiKey",
  "privateKey",
  "accessToken",
  "refreshToken",
  "providerToken",
  "providerReference",
  "providerResponse",
  "rawProviderReference",
  "rawProviderToken",
  "rawProviderResponse",
  "webhookSecret",
  "bankAccountNumber",
  "iban",
  "cardNumber",
]);

type RuntimeScopeExpectation200E = Readonly<{
  providerNames: readonly StreamGiftLedgerProviderRuntimeReadinessProviderName200E[];
  configScopes: readonly StreamGiftLedgerProviderRuntimeReadinessConfigScope200E[];
}>;

function expectedRuntimeScope200E(
  providerNames: readonly StreamGiftLedgerProviderRuntimeReadinessProviderName200E[],
  configScopes: readonly StreamGiftLedgerProviderRuntimeReadinessConfigScope200E[],
): RuntimeScopeExpectation200E {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200E: Record<StreamGiftLedgerProviderRuntimeReadinessBindingKind200E, RuntimeScopeExpectation200E> = Object.freeze({
  accept_payments_provider: expectedRuntimeScope200E(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedRuntimeScope200E(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedRuntimeScope200E(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedRuntimeScope200E(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200E(
  code: StreamGiftLedgerProviderRuntimeReadinessBlocked200E["code"],
  blockedReason: string,
): StreamGiftLedgerProviderRuntimeReadinessBlocked200E {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    status: "provider_runtime_readiness_blocked_without_runtime_enablement",
    code,
    blockedReason,
    runtimeReadinessGuardPassed: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY,
  };
}

function containsSecretLikeText200E(value: string): boolean {
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

function hasForbiddenRawSecretInput200E(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200E.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200E)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200E(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200E(nested)) return true;
  }
  return false;
}

function normalizeBindingKind200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessBindingKind200E | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E.find((kind) => kind === normalized);
}

function normalizeProviderName200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessProviderName200E {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200E.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeConfigScope200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessConfigScope200E {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200E.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessItem200E["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200E.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeActivationRequestStage200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessItem200E["activationRequestStage"] {
  const normalized = clean(value);
  return ACTIVATION_REQUEST_STAGES_200E.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeRuntimeReadiness200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessItem200E["runtimeReadiness"] {
  const normalized = clean(value)?.toLowerCase();
  return RUNTIME_READINESS_200E.find((status) => status === normalized) ?? "pending_owner_fill";
}

function normalizeLiveCallMode200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessItem200E["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200E.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRollbackPlan200E(value: unknown): StreamGiftLedgerProviderRuntimeReadinessItem200E["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200E.find((plan) => plan === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200E(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200E(value);
}

function normalizeBindingItems200E(raw: unknown): readonly StreamGiftLedgerProviderRuntimeReadinessItem200E[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerProviderRuntimeReadinessItem200E[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200E(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200E(record.providerName),
      configReferenceLabel,
      configScope: normalizeConfigScope200E(record.configScope),
      ownerAttestation: normalizeOwnerAttestation200E(record.ownerAttestation),
      activationRequestStage: normalizeActivationRequestStage200E(record.activationRequestStage),
      runtimeReadiness: normalizeRuntimeReadiness200E(record.runtimeReadiness),
      liveCallMode: normalizeLiveCallMode200E(record.liveCallMode),
      rollbackPlan: normalizeRollbackPlan200E(record.rollbackPlan),
    }];
  });
}

export function normalizeStreamGiftLedgerProviderRuntimeReadinessInput200E(
  raw: Record<string, unknown>,
): StreamGiftLedgerProviderRuntimeReadinessInput200E {
  return {
    ownerApproval: clean(raw.ownerApproval),
    readinessMode: clean(raw.readinessMode) === "provider_runtime_readiness_guard" ? "provider_runtime_readiness_guard" : "disabled",
    acknowledgedActivationRequestStage: clean(raw.acknowledgedActivationRequestStage) === "200D_controlled_provider_binding_activation_request_prepared"
      ? "200D_controlled_provider_binding_activation_request_prepared"
      : "disabled",
    bindingItems: normalizeBindingItems200E(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

function itemByKind200E(
  items: readonly StreamGiftLedgerProviderRuntimeReadinessItem200E[],
): ReadonlyMap<StreamGiftLedgerProviderRuntimeReadinessBindingKind200E, StreamGiftLedgerProviderRuntimeReadinessItem200E> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200E(item: StreamGiftLedgerProviderRuntimeReadinessItem200E): string | undefined {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200E[item.bindingKind];
  if (!expected.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} cannot use providerName=${item.providerName}`;
  }
  if (!expected.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} cannot use configScope=${item.configScope}`;
  }
  return undefined;
}

export function getStreamGiftLedgerProviderRuntimeReadinessGuard200E(): StreamGiftLedgerProviderRuntimeReadinessStatus200E {
  assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    status: "ready_for_provider_runtime_readiness_guard",
    previousStageRequired: "200D_controlled_provider_binding_activation_request_prepared",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200F_controlled_provider_binding_activation_dry_run",
    safety: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY,
  };
}

export function getStreamGiftLedgerProviderRuntimeReadinessGuardContract200E(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    contract: "stream.gift.provider_runtime.readiness_guard.v1",
    previousStageRequired: "200D_controlled_provider_binding_activation_request_prepared",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_OWNER_APPROVAL,
    readinessModeRequired: "provider_runtime_readiness_guard",
    acknowledgedActivationRequestStageRequired: "200D_controlled_provider_binding_activation_request_prepared",
    requiredBindingKinds: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E,
    bindingItemShape: {
      bindingKind: "accept_payments_provider | creator_payout_provider | google_billing_diamonds_provider | airwallex_merchant_rails_provider",
      providerName: "google_billing | airwallex | wallet | bank | other",
      configReferenceLabel: "UPPERCASE_REFERENCE_LABEL_ONLY",
      configScope: "accept_payments | creator_payout | diamonds_topup | merchant_rails",
      ownerAttestation: "server_side_config_exists",
      activationRequestStage: "200D_controlled_provider_binding_activation_request_prepared",
      runtimeReadiness: "ready_for_controlled_activation",
      liveCallMode: "disabled_until_separate_activation",
      rollbackPlan: "ready",
    },
    forbidden: [
      "raw secrets",
      "raw provider references",
      "provider response payloads",
      ".env read",
      "provider binding execution",
      "provider live call",
      "provider payout call",
      "Wallet mutation",
      "payment capture",
      "payout execution",
      "runtime enablement",
      "fake success",
    ],
    safety: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY,
  };
}

export function runStreamGiftLedgerProviderRuntimeReadinessGuard200E(
  input: StreamGiftLedgerProviderRuntimeReadinessInput200E,
  raw: Record<string, unknown>,
): StreamGiftLedgerProviderRuntimeReadinessResult200E {
  assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe();
  if (hasForbiddenRawSecretInput200E(raw)) {
    return blocked200E("raw_secret_or_provider_value_rejected", "Raw secrets, raw provider references, tokens or provider responses are forbidden in 200E.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_OWNER_APPROVAL) {
    return blocked200E("owner_approval_required", "Exact owner approval phrase is required for 200E provider runtime readiness guard.");
  }
  if (input.readinessMode !== "provider_runtime_readiness_guard") {
    return blocked200E("readiness_mode_disabled", "readinessMode must be provider_runtime_readiness_guard.");
  }
  if (input.acknowledgedActivationRequestStage !== "200D_controlled_provider_binding_activation_request_prepared") {
    return blocked200E("activation_request_stage_required", "200D controlled provider binding activation request acknowledgement is required.");
  }
  if (!input.bindingItems.length) {
    return blocked200E("binding_items_required", "bindingItems are required for all provider binding kinds.");
  }
  const byKind = itemByKind200E(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200E("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200E(item.configReferenceLabel)) {
      return blocked200E("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200E(item);
    if (scopeProblem) return blocked200E("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200E("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.activationRequestStage !== "200D_controlled_provider_binding_activation_request_prepared") {
      return blocked200E("activation_request_stage_item_required", `${item.bindingKind} activationRequestStage must be 200D_controlled_provider_binding_activation_request_prepared.`);
    }
    if (item.runtimeReadiness !== "ready_for_controlled_activation") {
      return blocked200E("runtime_readiness_required", `${item.bindingKind} runtimeReadiness must be ready_for_controlled_activation.`);
    }
    if (item.liveCallMode !== "disabled_until_separate_activation") {
      return blocked200E("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_until_separate_activation in 200E.`);
    }
    if (item.rollbackPlan !== "ready") {
      return blocked200E("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    }
  }
  const checkedBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    status: "provider_runtime_readiness_guard_passed_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.provider_runtime.readiness_guard.v1",
      version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
      previousStageRequired: "200D_controlled_provider_binding_activation_request_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E,
      checkedBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      runtimeReadinessGuardPassed: true,
      readyForControlledActivationDryRun: true,
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
      nextStage: "200F_controlled_provider_binding_activation_dry_run",
    },
    runtimeReadinessGuardPassed: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY,
  };
}

export function getStreamGiftLedgerProviderRuntimeReadinessGuardRunbook200E(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200e-provider-runtime-readiness-guard-check.js --i-approve-200e-provider-runtime-readiness-guard-check",
      "POST /api/admin/stream/gifts/ledger/200e/provider-runtime-readiness-guard with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_REQUIRED_KINDS_200E,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200E",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationDryRunRequest200E(): StreamGiftLedgerControlledProviderBindingActivationDryRunNextRequest200E {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_dry_run",
    nextStage: "200F_controlled_provider_binding_activation_dry_run",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200F: [
      "raw secret read or print",
      "provider binding execution",
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

export function assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe(): void {
  assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_SAFETY;
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
  if (unsafe.some(Boolean) || !safety.providerRuntimeReadinessGuardOnly || !safety.requiresSeparate200FControlledActivationDryRun || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200e_unsafe_runtime_flag");
  }
}
