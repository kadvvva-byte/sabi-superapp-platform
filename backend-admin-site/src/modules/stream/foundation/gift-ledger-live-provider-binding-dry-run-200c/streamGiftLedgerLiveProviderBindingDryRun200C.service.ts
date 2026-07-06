import { assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe } from "../gift-ledger-provider-reference-labels-verification-200b";
import {
  STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
  type StreamGiftLedgerControlledProviderBindingActivationNextRequest200C,
  type StreamGiftLedgerLiveProviderBindingDryRunBlocked200C,
  type StreamGiftLedgerLiveProviderBindingDryRunInput200C,
  type StreamGiftLedgerLiveProviderBindingDryRunItem200C,
  type StreamGiftLedgerLiveProviderBindingDryRunReadiness200C,
  type StreamGiftLedgerLiveProviderBindingDryRunResult200C,
  type StreamGiftLedgerLiveProviderBindingDryRunSafety200C,
  type StreamGiftLedgerLiveProviderBindingKind200C,
  type StreamGiftLedgerLiveProviderConfigScope200C,
  type StreamGiftLedgerLiveProviderName200C,
} from "./streamGiftLedgerLiveProviderBindingDryRun200C.types";

export const STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200C_LIVE_PROVIDER_BINDING_DRY_RUN_APPROVED" as const;

export const STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY: StreamGiftLedgerLiveProviderBindingDryRunSafety200C = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingExecuted: false,
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
  dryRunOnly: true,
  requiresSeparate200DProviderBindingActivation: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerLiveProviderBindingKind200C[]);

const PROVIDER_NAMES_200C = ["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const;
const OWNER_ATTESTATIONS_200C = ["server_side_config_exists", "pending_owner_fill"] as const;
const CONFIG_SCOPES_200C = ["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const;
const DRY_RUN_EXPECTATIONS_200C = ["reference_label_resolves_server_side", "pending_owner_fill"] as const;

const RAW_SECRET_FIELD_NAMES_200C = [
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
] as const;

type StreamGiftLedgerLiveProviderScopeExpectation200C = Readonly<{
  providerNames: readonly StreamGiftLedgerLiveProviderName200C[];
  configScopes: readonly StreamGiftLedgerLiveProviderConfigScope200C[];
}>;

function expectedProviderScope200C(
  providerNames: readonly StreamGiftLedgerLiveProviderName200C[],
  configScopes: readonly StreamGiftLedgerLiveProviderConfigScope200C[],
): StreamGiftLedgerLiveProviderScopeExpectation200C {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200C: Record<StreamGiftLedgerLiveProviderBindingKind200C, StreamGiftLedgerLiveProviderScopeExpectation200C> = Object.freeze({
  accept_payments_provider: expectedProviderScope200C(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedProviderScope200C(["airwallex", "bank", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedProviderScope200C(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedProviderScope200C(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200C(
  code: StreamGiftLedgerLiveProviderBindingDryRunBlocked200C["code"],
  blockedReason: string,
): StreamGiftLedgerLiveProviderBindingDryRunBlocked200C {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    status: "live_provider_binding_dry_run_blocked_without_provider_call",
    code,
    blockedReason,
    dryRunPrepared: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY,
  };
}

function hasForbiddenRawSecretInput200C(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200C.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200C)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200C(nested)) return true;
  }
  return false;
}

function containsSecretLikeText200C(value: string): boolean {
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
    lowered.includes("client_secret")
  );
}

function normalizeBindingKind200C(value: unknown): StreamGiftLedgerLiveProviderBindingKind200C | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C.find((kind) => kind === normalized);
}

function normalizeProviderName200C(value: unknown): StreamGiftLedgerLiveProviderName200C {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200C.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200C(value: unknown): StreamGiftLedgerLiveProviderBindingDryRunItem200C["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200C.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeConfigScope200C(value: unknown): StreamGiftLedgerLiveProviderConfigScope200C {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200C.find((scope) => scope === normalized) ?? "manual_review";
}

function normalizeDryRunExpectation200C(value: unknown): StreamGiftLedgerLiveProviderBindingDryRunItem200C["dryRunExpectation"] {
  const normalized = clean(value)?.toLowerCase();
  return DRY_RUN_EXPECTATIONS_200C.find((expectation) => expectation === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200C(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200C(value);
}

function normalizeBindingItems200C(raw: unknown): readonly StreamGiftLedgerLiveProviderBindingDryRunItem200C[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerLiveProviderBindingDryRunItem200C[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200C(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200C(record.providerName),
      configReferenceLabel,
      ownerAttestation: normalizeOwnerAttestation200C(record.ownerAttestation),
      configScope: normalizeConfigScope200C(record.configScope),
      dryRunExpectation: normalizeDryRunExpectation200C(record.dryRunExpectation),
    }];
  });
}

export function normalizeStreamGiftLedgerLiveProviderBindingDryRunInput200C(
  raw: Record<string, unknown>,
): StreamGiftLedgerLiveProviderBindingDryRunInput200C {
  return {
    ownerApproval: clean(raw.ownerApproval),
    dryRunMode: clean(raw.dryRunMode) === "live_provider_binding_dry_run" ? "live_provider_binding_dry_run" : "disabled",
    acknowledgedProviderReferenceLabelsStage: clean(raw.acknowledgedProviderReferenceLabelsStage) === "200B_provider_reference_labels_verified"
      ? "200B_provider_reference_labels_verified"
      : "disabled",
    bindingItems: normalizeBindingItems200C(raw.bindingItems),
    operatorNote: clean(raw.operatorNote),
  };
}

export function getStreamGiftLedgerLiveProviderBindingDryRunReadiness200C(): StreamGiftLedgerLiveProviderBindingDryRunReadiness200C {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    status: "ready_for_live_provider_binding_dry_run",
    previousStageRequired: "200B_provider_reference_labels_verified",
    backendReadinessPercent: 100,
    runtimeEnabledNow: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200D_controlled_provider_binding_activation_request",
    safety: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY,
  };
}

export function getStreamGiftLedgerLiveProviderBindingDryRunContract200C(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    contract: "stream.gift.live_provider_binding.dry_run.v1",
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_OWNER_APPROVAL,
    requiredPreviousStage: "200B_provider_reference_labels_verified",
    requiredBindingKinds: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C,
    requiredProviderScopePairs: EXPECTED_PROVIDER_SCOPE_BY_KIND_200C,
    acceptsReferenceLabelsOnly: true,
    acceptsRawSecrets: false,
    readsEnvFile: false,
    readsEnvValues: false,
    dryRunOnly: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    nextStage: "200D_controlled_provider_binding_activation_request",
    safety: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY,
  };
}

function hasInvalidProviderScopePair200C(item: StreamGiftLedgerLiveProviderBindingDryRunItem200C): boolean {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200C[item.bindingKind];
  return !expected.providerNames.includes(item.providerName) || !expected.configScopes.includes(item.configScope);
}

export function prepareStreamGiftLedgerLiveProviderBindingDryRun200C(
  input: StreamGiftLedgerLiveProviderBindingDryRunInput200C,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerLiveProviderBindingDryRunResult200C {
  assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe();
  if (hasForbiddenRawSecretInput200C(raw)) {
    return blocked200C("raw_secret_or_provider_value_rejected", "200C accepts owner-filled reference labels only; raw secrets, provider values, bank/card data and provider responses are rejected");
  }
  const textToInspect = [input.operatorNote, ...input.bindingItems.map((item) => item.configReferenceLabel)].filter(Boolean).join(" ");
  if (containsSecretLikeText200C(textToInspect)) {
    return blocked200C("raw_secret_or_provider_value_rejected", "200C accepts reference labels/key names only; secret-like text was rejected");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_OWNER_APPROVAL) {
    return blocked200C("owner_approval_required", `ownerApproval must equal ${STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_OWNER_APPROVAL}`);
  }
  if (input.dryRunMode !== "live_provider_binding_dry_run") {
    return blocked200C("dry_run_mode_disabled", "dryRunMode must be live_provider_binding_dry_run");
  }
  if (input.acknowledgedProviderReferenceLabelsStage !== "200B_provider_reference_labels_verified") {
    return blocked200C("provider_reference_labels_ack_required", "acknowledgedProviderReferenceLabelsStage must confirm 200B_provider_reference_labels_verified");
  }
  if (input.bindingItems.length < STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C.length) {
    return blocked200C("binding_items_required", "200C requires dry-run binding labels for accept payments, creator payout, Google Billing diamonds and Airwallex merchant rails providers");
  }
  const dryRunBindingKinds = [...new Set(input.bindingItems.map((item) => item.bindingKind))] as StreamGiftLedgerLiveProviderBindingKind200C[];
  const missing = STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C.filter((kind) => !dryRunBindingKinds.includes(kind));
  if (missing.length > 0) {
    return blocked200C("missing_required_binding_kind", `Missing live provider binding dry-run labels for: ${missing.join(", ")}`);
  }
  const invalidLabel = input.bindingItems.find((item) => !isReferenceLabel200C(item.configReferenceLabel));
  if (invalidLabel) {
    return blocked200C("invalid_reference_label", `Invalid configReferenceLabel for ${invalidLabel.bindingKind}; use an env key name/reference label only`);
  }
  const invalidPair = input.bindingItems.find(hasInvalidProviderScopePair200C);
  if (invalidPair) {
    return blocked200C("invalid_provider_scope_pair", `Invalid providerName/configScope pair for ${invalidPair.bindingKind}; provider scopes must stay separated`);
  }
  const pendingOwnerFillCount = input.bindingItems.filter((item) => item.ownerAttestation !== "server_side_config_exists").length;
  if (pendingOwnerFillCount > 0) {
    return blocked200C("owner_attestation_required", "All 200C owner attestations must be server_side_config_exists before dry-run can be prepared");
  }
  const pendingDryRunExpectationCount = input.bindingItems.filter((item) => item.dryRunExpectation !== "reference_label_resolves_server_side").length;
  if (pendingDryRunExpectationCount > 0) {
    return blocked200C("dry_run_expectation_required", "All 200C dryRunExpectation values must be reference_label_resolves_server_side");
  }
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    status: "live_provider_binding_dry_run_prepared_without_provider_call",
    envelope: {
      contract: "stream.gift.live_provider_binding.dry_run.v1",
      version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
      previousStageRequired: "200B_provider_reference_labels_verified",
      requiredBindingKinds: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C,
      dryRunBindingKinds,
      referenceLabelCount: input.bindingItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      referenceLabelsResolveServerSideAttested: true,
      pendingOwnerFillCount,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      providerBindingDryRunPrepared: true,
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      fakeSuccessWritten: false,
      nextStage: "200D_controlled_provider_binding_activation_request",
    },
    dryRunPrepared: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY,
  };
}

export function getStreamGiftLedgerLiveProviderBindingDryRunRunbook200C(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200c-live-provider-binding-dry-run-check.js --i-approve-200c-live-provider-binding-dry-run-check",
      "POST /api/admin/stream/gifts/ledger/200c/live-provider-binding-dry-run with bindingItems only",
    ],
    requiredBindingItems: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_REQUIRED_KINDS_200C,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200C",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not enable realtime emit",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY,
  };
}

export function createStreamGiftLedgerControlledProviderBindingActivationRequest200C(): StreamGiftLedgerControlledProviderBindingActivationNextRequest200C {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION,
    status: "next_stage_requires_controlled_provider_binding_activation_approval",
    nextStage: "200D_controlled_provider_binding_activation_request",
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    forbiddenUntil200D: [
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

export function assertStreamGiftLedgerLiveProviderBindingDryRun200CRemainsSafe(): void {
  assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderResponseAccepted,
    safety.providerBindingExecuted,
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
  if (unsafe.some(Boolean) || !safety.dryRunOnly || !safety.requiresSeparate200DProviderBindingActivation || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200c_unsafe_runtime_flag");
  }
}
