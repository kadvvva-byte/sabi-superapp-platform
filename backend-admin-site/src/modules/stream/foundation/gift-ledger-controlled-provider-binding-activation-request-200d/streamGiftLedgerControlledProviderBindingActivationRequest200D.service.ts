import { assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe } from "../gift-ledger-live-provider-binding-dry-run-200c";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationRequestBlocked200D,
  type StreamGiftLedgerControlledProviderBindingActivationRequestInput200D,
  type StreamGiftLedgerControlledProviderBindingActivationRequestItem200D,
  type StreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D,
  type StreamGiftLedgerControlledProviderBindingActivationRequestResult200D,
  type StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D,
  type StreamGiftLedgerControlledProviderBindingConfigScope200D,
  type StreamGiftLedgerControlledProviderBindingKind200D,
  type StreamGiftLedgerControlledProviderBindingProviderName200D,
  type StreamGiftLedgerProviderRuntimeReadinessNextRequest200D,
} from "./streamGiftLedgerControlledProviderBindingActivationRequest200D.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200D_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY: StreamGiftLedgerControlledProviderBindingActivationRequestSafety200D = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingExecuted: false,
  providerBindingActivationExecuted: false,
  providerLiveCallExecuted: false,
  providerPayoutCallExecuted: false,
  walletMutationExecuted: false,
  paymentCaptureExecuted: false,
  payoutExecutionExecuted: false,
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
  activationRequestOnly: true,
  requiresSeparate200EProviderRuntimeReadiness: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledProviderBindingKind200D[]);

const PROVIDER_NAMES_200D = ["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const;
const OWNER_ATTESTATIONS_200D = ["server_side_config_exists", "pending_owner_fill"] as const;
const CONFIG_SCOPES_200D = ["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const;
const DRY_RUN_STAGES_200D = ["200C_live_provider_binding_dry_run_prepared", "pending_owner_fill"] as const;
const ACTIVATION_INTENTS_200D = ["request_activation_only", "pending_owner_fill"] as const;

const RAW_SECRET_FIELD_NAMES_200D = [
  "secret",
  "secretValue",
  "rawSecret",
  "apiKey",
  "privateKey",
  "clientSecret",
  "providerToken",
  "rawProviderToken",
  "providerReference",
  "rawProviderReference",
  "providerPayoutReference",
  "rawProviderPayoutReference",
  "providerResponseBody",
  "accessToken",
  "refreshToken",
  "password",
  "value",
  "rawValue",
  "bankAccount",
  "cardNumber",
  "iban",
  "swift",
  "authorizationCode",
  "paymentIntentSecret",
  "airwallexClientSecret",
  "googleBillingPrivateKey",
] as const;

type StreamGiftLedgerControlledProviderBindingScopeExpectation200D = Readonly<{
  providerNames: readonly StreamGiftLedgerControlledProviderBindingProviderName200D[];
  configScopes: readonly StreamGiftLedgerControlledProviderBindingConfigScope200D[];
}>;

function expectedProviderScope200D(
  providerNames: readonly StreamGiftLedgerControlledProviderBindingProviderName200D[],
  configScopes: readonly StreamGiftLedgerControlledProviderBindingConfigScope200D[],
): StreamGiftLedgerControlledProviderBindingScopeExpectation200D {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200D: Record<StreamGiftLedgerControlledProviderBindingKind200D, StreamGiftLedgerControlledProviderBindingScopeExpectation200D> = Object.freeze({
  accept_payments_provider: expectedProviderScope200D(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedProviderScope200D(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedProviderScope200D(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedProviderScope200D(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200D(
  code: StreamGiftLedgerControlledProviderBindingActivationRequestBlocked200D["code"],
  blockedReason: string,
): StreamGiftLedgerControlledProviderBindingActivationRequestBlocked200D {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    status: "controlled_provider_binding_activation_request_blocked_without_runtime_enablement",
    code,
    blockedReason,
    activationRequestPrepared: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY,
  };
}

function hasForbiddenRawSecretInput200D(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200D.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200D)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200D(nested)) return true;
    if (typeof nested === "string" && containsSecretLikeText200D(nested)) return true;
  }
  return false;
}

function containsSecretLikeText200D(value: string): boolean {
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

function normalizeBindingKind200D(value: unknown): StreamGiftLedgerControlledProviderBindingKind200D | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D.find((kind) => kind === normalized);
}

function normalizeProviderName200D(value: unknown): StreamGiftLedgerControlledProviderBindingProviderName200D {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200D.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200D(value: unknown): StreamGiftLedgerControlledProviderBindingActivationRequestItem200D["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200D.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeConfigScope200D(value: unknown): StreamGiftLedgerControlledProviderBindingConfigScope200D {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200D.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeDryRunStage200D(value: unknown): StreamGiftLedgerControlledProviderBindingActivationRequestItem200D["dryRunStage"] {
  const normalized = clean(value);
  return DRY_RUN_STAGES_200D.find((stage) => stage === normalized) ?? "pending_owner_fill";
}

function normalizeActivationIntent200D(value: unknown): StreamGiftLedgerControlledProviderBindingActivationRequestItem200D["activationIntent"] {
  const normalized = clean(value)?.toLowerCase();
  return ACTIVATION_INTENTS_200D.find((intent) => intent === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200D(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200D(value);
}

function normalizeBindingItems200D(raw: unknown): readonly StreamGiftLedgerControlledProviderBindingActivationRequestItem200D[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerControlledProviderBindingActivationRequestItem200D[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200D(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200D(record.providerName),
      configReferenceLabel,
      configScope: normalizeConfigScope200D(record.configScope),
      ownerAttestation: normalizeOwnerAttestation200D(record.ownerAttestation),
      dryRunStage: normalizeDryRunStage200D(record.dryRunStage),
      activationIntent: normalizeActivationIntent200D(record.activationIntent),
    }];
  });
}

export function normalizeStreamGiftLedgerControlledProviderBindingActivationRequestInput200D(
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationRequestInput200D {
  return {
    ownerApproval: clean(raw.ownerApproval),
    activationMode: clean(raw.activationMode) === "controlled_provider_binding_activation_request" ? "controlled_provider_binding_activation_request" : "disabled",
    acknowledgedDryRunStage: clean(raw.acknowledgedDryRunStage) === "200C_live_provider_binding_dry_run_prepared"
      ? "200C_live_provider_binding_dry_run_prepared"
      : "disabled",
    bindingItems: normalizeBindingItems200D(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

function itemByKind200D(
  items: readonly StreamGiftLedgerControlledProviderBindingActivationRequestItem200D[],
): ReadonlyMap<StreamGiftLedgerControlledProviderBindingKind200D, StreamGiftLedgerControlledProviderBindingActivationRequestItem200D> {
  return new Map(items.map((item) => [item.bindingKind, item]));
}

function findScopeProblem200D(item: StreamGiftLedgerControlledProviderBindingActivationRequestItem200D): string | undefined {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200D[item.bindingKind];
  if (!expected.providerNames.includes(item.providerName)) {
    return `${item.bindingKind} cannot use providerName=${item.providerName}`;
  }
  if (!expected.configScopes.includes(item.configScope)) {
    return `${item.bindingKind} cannot use configScope=${item.configScope}`;
  }
  return undefined;
}

export function getStreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D(): StreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    status: "ready_for_controlled_provider_binding_activation_request",
    previousStageRequired: "200C_live_provider_binding_dry_run_prepared",
    backendReadinessPercent: 100,
    runtimeEnabledNow: false,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200E_provider_runtime_readiness_guard",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationRequestContract200D(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    contract: "stream.gift.provider_binding.activation_request.v1",
    previousStageRequired: "200C_live_provider_binding_dry_run_prepared",
    ownerApprovalRequired: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_OWNER_APPROVAL,
    activationModeRequired: "controlled_provider_binding_activation_request",
    acknowledgedDryRunStageRequired: "200C_live_provider_binding_dry_run_prepared",
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D,
    bindingItemShape: {
      bindingKind: "accept_payments_provider | creator_payout_provider | google_billing_diamonds_provider | airwallex_merchant_rails_provider",
      providerName: "google_billing | airwallex | wallet | bank | other",
      configReferenceLabel: "UPPERCASE_REFERENCE_LABEL_ONLY",
      configScope: "accept_payments | creator_payout | diamonds_topup | merchant_rails",
      ownerAttestation: "server_side_config_exists",
      dryRunStage: "200C_live_provider_binding_dry_run_prepared",
      activationIntent: "request_activation_only",
    },
    forbidden: [
      "raw secrets",
      "raw provider references",
      "raw provider tokens",
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
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledProviderBindingActivationRequest200D(
  input: StreamGiftLedgerControlledProviderBindingActivationRequestInput200D,
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledProviderBindingActivationRequestResult200D {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  if (hasForbiddenRawSecretInput200D(raw)) {
    return blocked200D("raw_secret_or_provider_value_rejected", "Raw secrets, raw provider references, tokens or provider responses are forbidden in 200D.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_OWNER_APPROVAL) {
    return blocked200D("owner_approval_required", "Exact owner approval phrase is required for 200D activation request preparation.");
  }
  if (input.activationMode !== "controlled_provider_binding_activation_request") {
    return blocked200D("activation_mode_disabled", "activationMode must be controlled_provider_binding_activation_request.");
  }
  if (input.acknowledgedDryRunStage !== "200C_live_provider_binding_dry_run_prepared") {
    return blocked200D("dry_run_ack_required", "200C live provider binding dry-run acknowledgement is required.");
  }
  if (!input.bindingItems.length) {
    return blocked200D("binding_items_required", "bindingItems are required for all provider binding kinds.");
  }
  const byKind = itemByKind200D(input.bindingItems);
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D.find((kind) => !byKind.has(kind));
  if (missing) {
    return blocked200D("missing_required_binding_kind", `Missing required bindingKind=${missing}.`);
  }
  for (const item of input.bindingItems) {
    if (!isReferenceLabel200D(item.configReferenceLabel)) {
      return blocked200D("invalid_reference_label", `configReferenceLabel for ${item.bindingKind} must be an uppercase reference label only.`);
    }
    const scopeProblem = findScopeProblem200D(item);
    if (scopeProblem) return blocked200D("invalid_provider_scope_pair", scopeProblem);
    if (item.ownerAttestation !== "server_side_config_exists") {
      return blocked200D("owner_attestation_required", `${item.bindingKind} ownerAttestation must be server_side_config_exists.`);
    }
    if (item.dryRunStage !== "200C_live_provider_binding_dry_run_prepared") {
      return blocked200D("dry_run_stage_required", `${item.bindingKind} dryRunStage must be 200C_live_provider_binding_dry_run_prepared.`);
    }
    if (item.activationIntent !== "request_activation_only") {
      return blocked200D("activation_intent_required", `${item.bindingKind} activationIntent must be request_activation_only.`);
    }
  }
  const requestedBindingKinds = [...byKind.keys()];
  const pendingOwnerFillCount = input.bindingItems.filter((item) => item.ownerAttestation === "pending_owner_fill" || item.dryRunStage === "pending_owner_fill" || item.activationIntent === "pending_owner_fill").length;
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    status: "controlled_provider_binding_activation_request_prepared_without_runtime_enablement",
    envelope: {
      contract: "stream.gift.provider_binding.activation_request.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
      previousStageRequired: "200C_live_provider_binding_dry_run_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D,
      requestedBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      serverSideConfigAttested: true,
      activationIntentRequestOnly: true,
      pendingOwnerFillCount,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      activationRequestPrepared: true,
      providerBindingExecuted: false,
      providerBindingActivationExecuted: false,
      providerLiveCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      runtimeEnabled: false,
      fakeSuccessWritten: false,
      nextStage: "200E_provider_runtime_readiness_guard",
    },
    activationRequestPrepared: true,
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY,
  };
}

export function getStreamGiftLedgerControlledProviderBindingActivationRequestRunbook200D(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200d-controlled-provider-binding-activation-request-check.js --i-approve-200d-controlled-provider-binding-activation-request-check",
      "POST /api/admin/stream/gifts/ledger/200d/controlled-provider-binding-activation-request with reference labels only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUIRED_KINDS_200D,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200D",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable realtime emit",
      "do not enable runtime",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY,
  };
}

export function createStreamGiftLedgerProviderRuntimeReadinessRequest200D(): StreamGiftLedgerProviderRuntimeReadinessNextRequest200D {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION,
    status: "next_stage_requires_provider_runtime_readiness_guard",
    nextStage: "200E_provider_runtime_readiness_guard",
    providerBindingExecuted: false,
    providerBindingActivationExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200E: [
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

export function assertStreamGiftLedgerControlledProviderBindingActivationRequest200DRemainsSafe(): void {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderResponseAccepted,
    safety.providerBindingExecuted,
    safety.providerBindingActivationExecuted,
    safety.providerLiveCallExecuted,
    safety.providerPayoutCallExecuted,
    safety.walletMutationExecuted,
    safety.paymentCaptureExecuted,
    safety.payoutExecutionExecuted,
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
  if (unsafe.some(Boolean) || !safety.activationRequestOnly || !safety.requiresSeparate200EProviderRuntimeReadiness || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200d_unsafe_runtime_flag");
  }
}
