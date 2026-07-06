import { assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe } from "../gift-ledger-provider-runtime-readiness-guard-200e";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunBlocked200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunInput200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunResult200F,
  type StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F,
  type StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalNextRequest200F,
} from "./streamGiftLedgerControlledProviderBindingActivationDryRun200F.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200F_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY: StreamGiftLedgerControlledProviderBindingActivationDryRunSafety200F = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingDryRunOnly: true,
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
  requiresSeparate200GControlledActivationExecutionApproval: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F[]);

const PROVIDER_NAMES_200F = Object.freeze([
  "google_billing",
  "airwallex",
  "wallet",
  "bank",
  "manual_review",
  "other",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F[]);

const CONFIG_SCOPES_200F = Object.freeze([
  "accept_payments",
  "creator_payout",
  "diamonds_topup",
  "merchant_rails",
  "manual_review",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F[]);

const OWNER_ATTESTATIONS_200F = Object.freeze(["server_side_config_exists", "pending_owner_fill"] as const);
const RUNTIME_READINESS_GUARD_STAGES_200F = Object.freeze(["200E_provider_runtime_readiness_guard_passed", "pending_owner_fill"] as const);
const ACTIVATION_DRY_RUN_INTENTS_200F = Object.freeze(["validate_controlled_provider_binding_plan_only", "pending_owner_fill"] as const);
const PROVIDER_BINDING_MODES_200F = Object.freeze(["dry_run_only_no_provider_binding", "pending_owner_fill"] as const);
const LIVE_CALL_MODES_200F = Object.freeze(["disabled_no_provider_call", "pending_owner_fill"] as const);
const PAYMENT_RUNTIME_MODES_200F = Object.freeze(["disabled_no_payment_capture", "pending_owner_fill"] as const);
const PAYOUT_RUNTIME_MODES_200F = Object.freeze(["disabled_no_payout_execution", "pending_owner_fill"] as const);
const WALLET_MUTATION_MODES_200F = Object.freeze(["disabled_no_wallet_mutation", "pending_owner_fill"] as const);
const ROLLBACK_PLANS_200F = Object.freeze(["ready", "pending_owner_fill"] as const);

const RAW_SECRET_FIELD_NAMES_200F = Object.freeze([
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

type ActivationDryRunScopeExpectation200F = Readonly<{
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F[];
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F[];
}>;

function expectedActivationDryRunScope200F(
  providerNames: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F[],
  configScopes: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F[],
): ActivationDryRunScopeExpectation200F {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200F: Record<StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F, ActivationDryRunScopeExpectation200F> = Object.freeze({
  accept_payments_provider: expectedActivationDryRunScope200F(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedActivationDryRunScope200F(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedActivationDryRunScope200F(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedActivationDryRunScope200F(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200F(
  code: StreamGiftLedgerControlledProviderBindingActivationDryRunBlocked200F["code"],
  blockedReason: string,
): StreamGiftLedgerControlledProviderBindingActivationDryRunBlocked200F {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    status: "controlled_provider_binding_activation_dry_run_blocked_without_provider_binding",
    code,
    blockedReason,
    activationDryRunPrepared: false,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY,
  };
}

function containsSecretLikeText200F(value: string): boolean {
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

function hasForbiddenRawSecretInput200F(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200F.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200F)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200F(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200F(nested)) return true;
  }
  return false;
}

function normalizeBindingKind200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F.find((kind) => kind === normalized);
}

function normalizeProviderName200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunProviderName200F {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200F.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeConfigScope200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunConfigScope200F {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200F.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200F.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeRuntimeReadinessGuardStage200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["runtimeReadinessGuardStage"] {
  const normalized = clean(value);
  return RUNTIME_READINESS_GUARD_STAGES_200F.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeActivationDryRunIntent200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["activationDryRunIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return ACTIVATION_DRY_RUN_INTENTS_200F.find((intent) => intent === normalized) ?? "pending_owner_fill";
}

function normalizeProviderBindingMode200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["providerBindingMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_BINDING_MODES_200F.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeLiveCallMode200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["liveCallMode"] {
  const normalized = clean(value)?.toLowerCase();
  return LIVE_CALL_MODES_200F.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePaymentRuntimeMode200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["paymentRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYMENT_RUNTIME_MODES_200F.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizePayoutRuntimeMode200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["payoutRuntimeMode"] {
  const normalized = clean(value)?.toLowerCase();
  return PAYOUT_RUNTIME_MODES_200F.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeWalletMutationMode200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["walletMutationMode"] {
  const normalized = clean(value)?.toLowerCase();
  return WALLET_MUTATION_MODES_200F.find((mode) => mode === normalized) ?? "pending_owner_fill";
}

function normalizeRollbackPlan200F(value: unknown): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F["rollbackPlan"] {
  const normalized = clean(value)?.toLowerCase();
  return ROLLBACK_PLANS_200F.find((plan) => plan === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200F(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200F(value);
}

function normalizeBindingItems200F(raw: unknown): readonly StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200F(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200F(record.providerName),
      configReferenceLabel,
      configScope: normalizeConfigScope200F(record.configScope),
      ownerAttestation: normalizeOwnerAttestation200F(record.ownerAttestation),
      runtimeReadinessGuardStage: normalizeRuntimeReadinessGuardStage200F(record.runtimeReadinessGuardStage),
      activationDryRunIntent: normalizeActivationDryRunIntent200F(record.activationDryRunIntent),
      providerBindingMode: normalizeProviderBindingMode200F(record.providerBindingMode),
      liveCallMode: normalizeLiveCallMode200F(record.liveCallMode),
      paymentRuntimeMode: normalizePaymentRuntimeMode200F(record.paymentRuntimeMode),
      payoutRuntimeMode: normalizePayoutRuntimeMode200F(record.payoutRuntimeMode),
      walletMutationMode: normalizeWalletMutationMode200F(record.walletMutationMode),
      rollbackPlan: normalizeRollbackPlan200F(record.rollbackPlan),
    }];
  });
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationDryRunInput200F(
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationDryRunInput200F {
  return {
    ownerApproval: clean(raw.ownerApproval),
    dryRunMode: clean(raw.dryRunMode) === "controlled_provider_binding_activation_dry_run" ? "controlled_provider_binding_activation_dry_run" : "disabled",
    acknowledgedRuntimeReadinessGuardStage: clean(raw.acknowledgedRuntimeReadinessGuardStage) === "200E_provider_runtime_readiness_guard_passed"
      ? "200E_provider_runtime_readiness_guard_passed"
      : "disabled",
    bindingItems: normalizeBindingItems200F(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

function itemByKind200F(
  items: readonly StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F[],
): ReadonlyMap<StreamGiftLedgerControlledProviderBindingActivationDryRunKind200F, StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200F(item: StreamGiftLedgerControlledProviderBindingActivationDryRunItem200F): string | undefined {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200F[item.bindingKind];
  if (!expected.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} cannot use providerName=${item.providerName}`;
  }
  if (!expected.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} cannot use configScope=${item.configScope}`;
  }
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F(): StreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F {
  assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    status: "ready_for_controlled_provider_binding_activation_dry_run",
    previousStageRequired: "200E_provider_runtime_readiness_guard_passed",
    backendReadinessPercent: 100,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200G_controlled_provider_binding_activation_execution_approval",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationDryRunContract200F(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    contract: "stream.gift.controlled_provider_binding.activation_dry_run.v1",
    previousStageRequired: "200E_provider_runtime_readiness_guard_passed",
    requiredOwnerApproval: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_OWNER_APPROVAL,
    dryRunMode: "controlled_provider_binding_activation_dry_run",
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F,
    requiredItemFields: [
      "bindingKind",
      "providerName",
      "configReferenceLabel",
      "configScope",
      "ownerAttestation=server_side_config_exists",
      "runtimeReadinessGuardStage=200E_provider_runtime_readiness_guard_passed",
      "activationDryRunIntent=validate_controlled_provider_binding_plan_only",
      "providerBindingMode=dry_run_only_no_provider_binding",
      "liveCallMode=disabled_no_provider_call",
      "paymentRuntimeMode=disabled_no_payment_capture",
      "payoutRuntimeMode=disabled_no_payout_execution",
      "walletMutationMode=disabled_no_wallet_mutation",
      "rollbackPlan=ready",
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
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationDryRun200F(
  input: StreamGiftLedgerControlledProviderBindingActivationDryRunInput200F,
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationDryRunResult200F {
  assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe();
  if (hasForbiddenRawSecretInput200F(raw)) {
    return blocked200F("raw_secret_or_provider_value_rejected", "Raw secrets, provider references, provider tokens or provider responses are forbidden in 200F.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_OWNER_APPROVAL) {
    return blocked200F("owner_approval_required", "Exact owner approval phrase is required for 200F controlled provider binding activation dry-run.");
  }
  if (input.dryRunMode !== "controlled_provider_binding_activation_dry_run") {
    return blocked200F("dry_run_mode_disabled", "dryRunMode must be controlled_provider_binding_activation_dry_run.");
  }
  if (input.acknowledgedRuntimeReadinessGuardStage !== "200E_provider_runtime_readiness_guard_passed") {
    return blocked200F("runtime_readiness_guard_stage_required", "200E provider runtime readiness guard acknowledgement is required.");
  }
  if (!input.bindingItems.length) {
    return blocked200F("binding_items_required", "bindingItems are required for all provider binding kinds.");
  }
  const byKind = itemByKind200F(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200F("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200F(item.configReferenceLabel)) {
      return blocked200F("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200F(item);
    if (scopeProblem) return blocked200F("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200F("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.runtimeReadinessGuardStage !== "200E_provider_runtime_readiness_guard_passed") {
      return blocked200F("runtime_readiness_guard_item_required", `${item.bindingKind} runtimeReadinessGuardStage must be 200E_provider_runtime_readiness_guard_passed.`);
    }
    if (item.activationDryRunIntent !== "validate_controlled_provider_binding_plan_only") {
      return blocked200F("activation_dry_run_intent_required", `${item.bindingKind} activationDryRunIntent must be validate_controlled_provider_binding_plan_only.`);
    }
    if (item.providerBindingMode !== "dry_run_only_no_provider_binding") {
      return blocked200F("provider_binding_mode_must_remain_dry_run", `${item.bindingKind} providerBindingMode must remain dry_run_only_no_provider_binding.`);
    }
    if (item.liveCallMode !== "disabled_no_provider_call") {
      return blocked200F("live_call_mode_must_remain_disabled", `${item.bindingKind} liveCallMode must remain disabled_no_provider_call.`);
    }
    if (item.paymentRuntimeMode !== "disabled_no_payment_capture") {
      return blocked200F("payment_runtime_mode_must_remain_disabled", `${item.bindingKind} paymentRuntimeMode must remain disabled_no_payment_capture.`);
    }
    if (item.payoutRuntimeMode !== "disabled_no_payout_execution") {
      return blocked200F("payout_runtime_mode_must_remain_disabled", `${item.bindingKind} payoutRuntimeMode must remain disabled_no_payout_execution.`);
    }
    if (item.walletMutationMode !== "disabled_no_wallet_mutation") {
      return blocked200F("wallet_mutation_mode_must_remain_disabled", `${item.bindingKind} walletMutationMode must remain disabled_no_wallet_mutation.`);
    }
    if (item.rollbackPlan !== "ready") {
      return blocked200F("rollback_plan_required", `${item.bindingKind} rollbackPlan must be ready.`);
    }
  }

  const dryRunBindingKinds = [...byKind.keys()];
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    status: "controlled_provider_binding_activation_dry_run_prepared_without_provider_binding",
    envelope: {
      contract: "stream.gift.controlled_provider_binding.activation_dry_run.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
      previousStageRequired: "200E_provider_runtime_readiness_guard_passed",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F,
      dryRunBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      controlledActivationDryRunPrepared: true,
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
      nextStage: "200G_controlled_provider_binding_activation_execution_approval",
    },
    activationDryRunPrepared: true,
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    providerPayoutCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationDryRunRunbook200F(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200f-controlled-provider-binding-activation-dry-run-check.js --i-approve-200f-controlled-provider-binding-activation-dry-run-check",
      "POST /api/admin/stream/gifts/ledger/200f/controlled-provider-binding-activation-dry-run with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_REQUIRED_KINDS_200F,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200F",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRequest200F(): StreamGiftLedgerControlledProviderBindingActivationExecutionApprovalNextRequest200F {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_execution_approval",
    nextStage: "200G_controlled_provider_binding_activation_execution_approval",
    providerRuntimeEnabled: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200G: [
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

export function assertStreamGiftLedgerControlledProviderBindingActivationDryRun200FRemainsSafe(): void {
  assertStreamGiftLedgerProviderRuntimeReadinessGuard200ERemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_SAFETY;
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
  if (unsafe.some(Boolean) || !safety.providerBindingDryRunOnly || !safety.requiresSeparate200GControlledActivationExecutionApproval || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200f_unsafe_runtime_flag");
  }
}
