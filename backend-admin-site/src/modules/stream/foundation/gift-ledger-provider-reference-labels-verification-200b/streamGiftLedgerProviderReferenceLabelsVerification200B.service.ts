import { assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe } from "../gift-ledger-controlled-live-provider-binding-approval-200a";
import {
  STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
  type StreamGiftLedgerLiveProviderBindingDryRunNextRequest200B,
  type StreamGiftLedgerProviderName200B,
  type StreamGiftLedgerProviderReferenceLabelKind200B,
  type StreamGiftLedgerProviderReferenceLabelsVerificationBlocked200B,
  type StreamGiftLedgerProviderReferenceLabelsVerificationInput200B,
  type StreamGiftLedgerProviderReferenceLabelVerificationItem200B,
  type StreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B,
  type StreamGiftLedgerProviderReferenceLabelsVerificationResult200B,
  type StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B,
} from "./streamGiftLedgerProviderReferenceLabelsVerification200B.types";

export const STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200B_OWNER_FILLED_PROVIDER_REFERENCE_LABELS_VERIFIED" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY: StreamGiftLedgerProviderReferenceLabelsVerificationSafety200B = Object.freeze({
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
  requiresSeparate200CLiveBindingDryRun: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerProviderReferenceLabelKind200B[]);

const PROVIDER_NAMES_200B = ["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const;
const OWNER_ATTESTATIONS_200B = ["server_side_config_exists", "pending_owner_fill"] as const;
const CONFIG_SCOPES_200B = ["accept_payments", "creator_payout", "diamonds_topup", "merchant_rails", "manual_review"] as const;

type StreamGiftLedgerProviderConfigScope200B = StreamGiftLedgerProviderReferenceLabelVerificationItem200B["configScope"];

type StreamGiftLedgerProviderScopeExpectation200B = Readonly<{
  providerNames: readonly StreamGiftLedgerProviderName200B[];
  configScopes: readonly StreamGiftLedgerProviderConfigScope200B[];
}>;

function expectedProviderScope200B(
  providerNames: readonly StreamGiftLedgerProviderName200B[],
  configScopes: readonly StreamGiftLedgerProviderConfigScope200B[],
): StreamGiftLedgerProviderScopeExpectation200B {
  return Object.freeze({
    providerNames: Object.freeze([...providerNames]),
    configScopes: Object.freeze([...configScopes]),
  });
}

const EXPECTED_PROVIDER_SCOPE_BY_KIND_200B: Record<StreamGiftLedgerProviderReferenceLabelKind200B, StreamGiftLedgerProviderScopeExpectation200B> = Object.freeze({
  accept_payments_provider: expectedProviderScope200B(["airwallex", "wallet", "other"], ["accept_payments"]),
  creator_payout_provider: expectedProviderScope200B(["airwallex", "bank", "manual_review", "other"], ["creator_payout"]),
  google_billing_diamonds_provider: expectedProviderScope200B(["google_billing"], ["diamonds_topup"]),
  airwallex_merchant_rails_provider: expectedProviderScope200B(["airwallex"], ["merchant_rails", "accept_payments", "creator_payout"]),
});

const RAW_SECRET_FIELD_NAMES_200B = [
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
  "providerResponse",
  "providerResponseBody",
  "accessToken",
  "refreshToken",
  "password",
  "value",
  "rawValue",
  "bankAccount",
  "bankAccountNumber",
  "cardNumber",
  "iban",
  "swift",
  "authorizationCode",
  "paymentIntentSecret",
] as const;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200B(
  code: StreamGiftLedgerProviderReferenceLabelsVerificationBlocked200B["code"],
  blockedReason: string,
): StreamGiftLedgerProviderReferenceLabelsVerificationBlocked200B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    status: "provider_reference_labels_verification_blocked_without_provider_binding",
    code,
    blockedReason,
    labelsVerified: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY,
  };
}

function hasForbiddenRawSecretInput200B(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200B.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200B)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200B(nested)) return true;
  }
  return false;
}

function containsSecretLikeText200B(value: string): boolean {
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

function normalizeBindingKind200B(value: unknown): StreamGiftLedgerProviderReferenceLabelKind200B | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B.find((kind) => kind === normalized);
}

function normalizeProviderName200B(value: unknown): StreamGiftLedgerProviderName200B {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200B.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200B(value: unknown): StreamGiftLedgerProviderReferenceLabelVerificationItem200B["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200B.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function normalizeConfigScope200B(value: unknown): StreamGiftLedgerProviderReferenceLabelVerificationItem200B["configScope"] {
  const normalized = clean(value)?.toLowerCase();
  return CONFIG_SCOPES_200B.find((scope) => scope === normalized) ?? "manual_review";
}

function isReferenceLabel200B(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200B(value);
}

function normalizeLabelItems200B(raw: unknown): readonly StreamGiftLedgerProviderReferenceLabelVerificationItem200B[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerProviderReferenceLabelVerificationItem200B[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200B(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200B(record.providerName),
      configReferenceLabel,
      ownerAttestation: normalizeOwnerAttestation200B(record.ownerAttestation),
      configScope: normalizeConfigScope200B(record.configScope),
    }];
  });
}

export function normalizeStreamGiftLedgerProviderReferenceLabelsVerificationInput200B(
  raw: Record<string, unknown>,
): StreamGiftLedgerProviderReferenceLabelsVerificationInput200B {
  return {
    ownerApproval: clean(raw.ownerApproval),
    verificationMode: clean(raw.verificationMode) === "owner_filled_provider_reference_labels_verification" ? "owner_filled_provider_reference_labels_verification" : "disabled",
    acknowledgedControlledApprovalStage: clean(raw.acknowledgedControlledApprovalStage) === "200A_controlled_live_provider_binding_approval_prepared"
      ? "200A_controlled_live_provider_binding_approval_prepared"
      : "disabled",
    labelItems: normalizeLabelItems200B(raw.labelItems),
    operatorNote: clean(raw.operatorNote),
  };
}

export function getStreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B(): StreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B {
  assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    status: "ready_for_owner_filled_provider_reference_labels_verification",
    previousStageRequired: "200A_controlled_live_provider_binding_approval_prepared",
    backendReadinessPercent: 100,
    runtimeEnabledNow: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200C_live_provider_binding_dry_run",
    safety: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY,
  };
}

export function getStreamGiftLedgerProviderReferenceLabelsVerificationContract200B(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    contract: "stream.gift.provider_reference_labels.verification.v1",
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_OWNER_APPROVAL,
    requiredPreviousStage: "200A_controlled_live_provider_binding_approval_prepared",
    requiredBindingKinds: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B,
    requiredProviderScopePairs: EXPECTED_PROVIDER_SCOPE_BY_KIND_200B,
    acceptsReferenceLabelsOnly: true,
    acceptsRawSecrets: false,
    readsEnvFile: false,
    readsEnvValues: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    nextStage: "200C_live_provider_binding_dry_run",
    safety: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY,
  };
}

function hasInvalidProviderScopePair200B(item: StreamGiftLedgerProviderReferenceLabelVerificationItem200B): boolean {
  const expected = EXPECTED_PROVIDER_SCOPE_BY_KIND_200B[item.bindingKind];
  return !expected.providerNames.includes(item.providerName) || !expected.configScopes.includes(item.configScope);
}

export function verifyStreamGiftLedgerProviderReferenceLabels200B(
  input: StreamGiftLedgerProviderReferenceLabelsVerificationInput200B,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerProviderReferenceLabelsVerificationResult200B {
  assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe();
  if (hasForbiddenRawSecretInput200B(raw)) {
    return blocked200B("raw_secret_or_provider_value_rejected", "200B accepts owner-filled reference labels only; raw secrets, provider values, bank/card data and provider responses are rejected");
  }
  const textToInspect = [input.operatorNote, ...input.labelItems.map((item) => item.configReferenceLabel)].filter(Boolean).join(" ");
  if (containsSecretLikeText200B(textToInspect)) {
    return blocked200B("raw_secret_or_provider_value_rejected", "200B accepts reference labels/key names only; secret-like text was rejected");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_OWNER_APPROVAL) {
    return blocked200B("owner_approval_required", `ownerApproval must equal ${STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_OWNER_APPROVAL}`);
  }
  if (input.verificationMode !== "owner_filled_provider_reference_labels_verification") {
    return blocked200B("verification_mode_disabled", "verificationMode must be owner_filled_provider_reference_labels_verification");
  }
  if (input.acknowledgedControlledApprovalStage !== "200A_controlled_live_provider_binding_approval_prepared") {
    return blocked200B("controlled_approval_ack_required", "acknowledgedControlledApprovalStage must confirm 200A_controlled_live_provider_binding_approval_prepared");
  }
  if (input.labelItems.length < STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B.length) {
    return blocked200B("label_items_required", "200B requires owner-filled reference labels for accept payments, creator payout, Google Billing diamonds and Airwallex merchant rails providers");
  }
  const verifiedKinds = [...new Set(input.labelItems.map((item) => item.bindingKind))] as StreamGiftLedgerProviderReferenceLabelKind200B[];
  const missing = STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B.filter((kind) => !verifiedKinds.includes(kind));
  if (missing.length > 0) {
    return blocked200B("missing_required_binding_kind", `Missing owner-filled provider reference labels for: ${missing.join(", ")}`);
  }
  const invalidLabel = input.labelItems.find((item) => !isReferenceLabel200B(item.configReferenceLabel));
  if (invalidLabel) {
    return blocked200B("invalid_reference_label", `Invalid configReferenceLabel for ${invalidLabel.bindingKind}; use an env key name/reference label only`);
  }
  const invalidPair = input.labelItems.find(hasInvalidProviderScopePair200B);
  if (invalidPair) {
    return blocked200B("invalid_provider_scope_pair", `Invalid providerName/configScope pair for ${invalidPair.bindingKind}; provider scopes must stay separated`);
  }
  const pendingOwnerFillCount = input.labelItems.filter((item) => item.ownerAttestation !== "server_side_config_exists").length;
  if (pendingOwnerFillCount > 0) {
    return blocked200B("owner_attestation_required", "All 200B owner attestations must be server_side_config_exists before live binding dry-run can be requested");
  }
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    status: "provider_reference_labels_verified_without_provider_binding",
    envelope: {
      contract: "stream.gift.provider_reference_labels.verification.v1",
      version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
      previousStageRequired: "200A_controlled_live_provider_binding_approval_prepared",
      requiredBindingKinds: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B,
      verifiedBindingKinds: verifiedKinds,
      referenceLabelCount: input.labelItems.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      serverSideConfigAttested: true,
      pendingOwnerFillCount,
      rawSecretsIncluded: false,
      envFileRead: false,
      envValueRead: false,
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      fakeSuccessWritten: false,
      nextStage: "200C_live_provider_binding_dry_run",
    },
    labelsVerified: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    runtimeEnabled: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY,
  };
}

export function getStreamGiftLedgerProviderReferenceLabelsVerificationRunbook200B(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200b-provider-reference-labels-verification-check.js --i-approve-200b-provider-reference-labels-verification-check",
      "POST /api/admin/stream/gifts/ledger/200b/verify-provider-reference-labels with labelItems only",
    ],
    requiredLabelItems: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABEL_REQUIRED_KINDS_200B,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets, provider tokens, provider references or provider responses",
      "do not execute provider binding in 200B",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY,
  };
}

export function createStreamGiftLedgerLiveProviderBindingDryRunRequest200B(): StreamGiftLedgerLiveProviderBindingDryRunNextRequest200B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION,
    status: "next_stage_requires_live_provider_binding_dry_run_approval",
    nextStage: "200C_live_provider_binding_dry_run",
    providerBindingExecuted: false,
    forbiddenUntil200C: [
      "raw secret read or print",
      "provider binding execution",
      "provider live call",
      "provider payout call",
      "Wallet mutation",
      "payment capture",
      "payout execution",
      "fake provider/payment/payout success",
    ],
  };
}

export function assertStreamGiftLedgerProviderReferenceLabelsVerification200BRemainsSafe(): void {
  assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe();
  const safety = STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_SAFETY;
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
  if (unsafe.some(Boolean) || !safety.requiresSeparate200CLiveBindingDryRun || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200b_unsafe_runtime_flag");
  }
}
