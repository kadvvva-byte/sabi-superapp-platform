import { assertStreamGiftLedgerFinalProductionReadiness199HRemainsSafe } from "../gift-ledger-final-production-readiness-199h";
import {
  STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
  type StreamGiftLedgerControlledLiveProviderBindingApprovalBlocked200A,
  type StreamGiftLedgerControlledLiveProviderBindingApprovalInput200A,
  type StreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A,
  type StreamGiftLedgerControlledLiveProviderBindingApprovalResult200A,
  type StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A,
  type StreamGiftLedgerControlledLiveProviderBindingKind200A,
  type StreamGiftLedgerControlledLiveProviderBindingNextRequest200A,
  type StreamGiftLedgerControlledLiveProviderBindingReference200A,
} from "./streamGiftLedgerControlledLiveProviderBindingApproval200A.types";

export const STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_200A_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVED" as const;

export const STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY: StreamGiftLedgerControlledLiveProviderBindingApprovalSafety200A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
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
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  requiresSeparate200BProviderConfigVerification: true,
  referenceLabelsOnly: true,
});

export const STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A = Object.freeze([
  "accept_payments_provider",
  "creator_payout_provider",
  "google_billing_diamonds_provider",
  "airwallex_merchant_rails_provider",
] as const satisfies readonly StreamGiftLedgerControlledLiveProviderBindingKind200A[]);

const PROVIDER_NAMES_200A = ["google_billing", "airwallex", "wallet", "bank", "manual_review", "other"] as const;
const OWNER_ATTESTATIONS_200A = ["server_side_config_exists", "pending_owner_fill"] as const;

const RAW_SECRET_FIELD_NAMES_200A = [
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

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked200A(
  code: StreamGiftLedgerControlledLiveProviderBindingApprovalBlocked200A["code"],
  blockedReason: string,
): StreamGiftLedgerControlledLiveProviderBindingApprovalBlocked200A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    status: "controlled_live_provider_binding_approval_blocked_without_runtime_enablement",
    code,
    blockedReason,
    controlledApprovalPrepared: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY,
  };
}

function hasForbiddenRawSecretInput200A(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    const keyLower = key.toLowerCase();
    if (RAW_SECRET_FIELD_NAMES_200A.some((blocked) => blocked.toLowerCase() === keyLower) && clean(record[key])) return true;
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput200A)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput200A(nested)) return true;
  }
  return false;
}

function containsSecretLikeText200A(value: string): boolean {
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
    lowered.includes("access_token")
  );
}

function normalizeBindingKind200A(value: unknown): StreamGiftLedgerControlledLiveProviderBindingKind200A | undefined {
  const normalized = clean(value)?.toLowerCase();
  return STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A.find((kind) => kind === normalized);
}

function normalizeProviderName200A(value: unknown): StreamGiftLedgerControlledLiveProviderBindingReference200A["providerName"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_200A.find((providerName) => providerName === normalized) ?? "manual_review";
}

function normalizeOwnerAttestation200A(value: unknown): StreamGiftLedgerControlledLiveProviderBindingReference200A["ownerAttestation"] {
  const normalized = clean(value)?.toLowerCase();
  return OWNER_ATTESTATIONS_200A.find((attestation) => attestation === normalized) ?? "pending_owner_fill";
}

function isReferenceLabel200A(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ") && !containsSecretLikeText200A(value);
}

function normalizeBindingReferences200A(raw: unknown): readonly StreamGiftLedgerControlledLiveProviderBindingReference200A[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): StreamGiftLedgerControlledLiveProviderBindingReference200A[] => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const bindingKind = normalizeBindingKind200A(record.bindingKind);
    const configReferenceLabel = clean(record.configReferenceLabel);
    if (!bindingKind || !configReferenceLabel) return [];
    return [{
      bindingKind,
      providerName: normalizeProviderName200A(record.providerName),
      configReferenceLabel,
      ownerAttestation: normalizeOwnerAttestation200A(record.ownerAttestation),
    }];
  });
}

export function normalizeStreamGiftLedgerControlledLiveProviderBindingApprovalInput200A(
  raw: Record<string, unknown>,
): StreamGiftLedgerControlledLiveProviderBindingApprovalInput200A {
  return {
    ownerApproval: clean(raw.ownerApproval),
    approvalMode: clean(raw.approvalMode) === "controlled_live_provider_binding_approval_request" ? "controlled_live_provider_binding_approval_request" : "disabled",
    targetStage: clean(raw.targetStage) === "stream_gifts_live_provider_binding" ? "stream_gifts_live_provider_binding" : "disabled",
    acknowledgedFinalReadinessStage: clean(raw.acknowledgedFinalReadinessStage) === "199H_stream_gifts_backend_100_percent_ready"
      ? "199H_stream_gifts_backend_100_percent_ready"
      : "disabled",
    bindingReferences: normalizeBindingReferences200A(raw.bindingReferences),
    operatorNote: clean(raw.operatorNote),
  };
}

export function getStreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A(): StreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A {
  assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    status: "ready_for_controlled_live_provider_binding_approval_request",
    previousStageRequired: "199H_stream_gifts_backend_100_percent_ready",
    backendReadinessPercent: 100,
    runtimeEnabledNow: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "200B_owner_filled_provider_reference_labels_verification",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY,
  };
}

export function getStreamGiftLedgerControlledLiveProviderBindingApprovalContract200A(): Readonly<Record<string, unknown>> {
  assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    contract: "stream.gift.controlled_live_provider_binding.approval_request.v1",
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_OWNER_APPROVAL,
    requiredPreviousStage: "199H_stream_gifts_backend_100_percent_ready",
    requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A,
    acceptsReferenceLabelsOnly: true,
    acceptsRawSecrets: false,
    readsEnvFile: false,
    readsEnvValues: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    nextStage: "200B_owner_filled_provider_reference_labels_verification",
    safety: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY,
  };
}

export function prepareStreamGiftLedgerControlledLiveProviderBindingApproval200A(
  input: StreamGiftLedgerControlledLiveProviderBindingApprovalInput200A,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerControlledLiveProviderBindingApprovalResult200A {
  assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe();
  if (hasForbiddenRawSecretInput200A(raw)) {
    return blocked200A("raw_secret_or_provider_value_rejected", "200A accepts reference labels only; raw secrets, tokens, provider values, bank/card data and provider responses are rejected");
  }
  const textToInspect = [input.operatorNote, ...input.bindingReferences.map((ref) => ref.configReferenceLabel)].filter(Boolean).join(" ");
  if (containsSecretLikeText200A(textToInspect)) {
    return blocked200A("raw_secret_or_provider_value_rejected", "200A accepts reference labels/key names only; secret-like text was rejected");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_OWNER_APPROVAL) {
    return blocked200A("owner_approval_required", `ownerApproval must equal ${STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_OWNER_APPROVAL}`);
  }
  if (input.approvalMode !== "controlled_live_provider_binding_approval_request" || input.targetStage !== "stream_gifts_live_provider_binding") {
    return blocked200A("approval_mode_disabled", "approvalMode must be controlled_live_provider_binding_approval_request and targetStage must be stream_gifts_live_provider_binding");
  }
  if (input.acknowledgedFinalReadinessStage !== "199H_stream_gifts_backend_100_percent_ready") {
    return blocked200A("final_readiness_ack_required", "acknowledgedFinalReadinessStage must confirm 199H_stream_gifts_backend_100_percent_ready");
  }
  if (input.bindingReferences.length < STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A.length) {
    return blocked200A("binding_references_required", "200A requires reference labels for accept payments, creator payout, Google Billing diamonds and Airwallex merchant rails providers");
  }
  const providedKinds = [...new Set(input.bindingReferences.map((ref) => ref.bindingKind))] as StreamGiftLedgerControlledLiveProviderBindingKind200A[];
  const missing = STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A.filter((kind) => !providedKinds.includes(kind));
  if (missing.length > 0) {
    return blocked200A("missing_required_binding_kind", `Missing controlled binding reference labels for: ${missing.join(", ")}`);
  }
  const invalid = input.bindingReferences.find((ref) => !isReferenceLabel200A(ref.configReferenceLabel));
  if (invalid) {
    return blocked200A("invalid_reference_label", `Invalid configReferenceLabel for ${invalid.bindingKind}; use an env key name/reference label only`);
  }
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    status: "controlled_live_provider_binding_approval_prepared_not_executed",
    envelope: {
      contract: "stream.gift.controlled_live_provider_binding.approval_request.v1",
      version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
      previousStageRequired: "199H_stream_gifts_backend_100_percent_ready",
      targetStage: "stream_gifts_live_provider_binding",
      requiredBindingKinds: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A,
      providedBindingKinds: providedKinds,
      referenceLabelCount: input.bindingReferences.length,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsProviderSeparated: true,
      airwallexMerchantRailsProviderSeparated: true,
      rawSecretsIncluded: false,
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      paymentCaptureExecuted: false,
      payoutExecuted: false,
      walletMutationExecuted: false,
      fakeSuccessWritten: false,
      nextStage: "200B_owner_filled_provider_reference_labels_verification",
    },
    controlledApprovalPrepared: true,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    payoutExecuted: false,
    walletMutationExecuted: false,
    fakeSuccessWritten: false,
    safety: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY,
  };
}

export function getStreamGiftLedgerControlledLiveProviderBindingApprovalRunbook200A(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    commands: [
      "node .\\node_modules\\typescript\\bin\\tsc --noEmit -p tsconfig.json",
      "node .\\tools\\stream-gifts-ledger-200a-controlled-live-provider-binding-approval-check.js --i-approve-200a-controlled-live-binding-approval-check",
      "POST /api/admin/stream/gifts/ledger/200a/controlled-live-binding-approval with reference labels only",
    ],
    requiredReferenceLabels: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_REQUIRED_KINDS_200A,
    forbidden: [
      "do not read .env files",
      "do not submit raw secrets or provider tokens",
      "do not execute provider binding in 200A",
      "do not run provider live calls",
      "do not mutate Wallet",
      "do not capture payment",
      "do not execute payout",
      "do not fake success",
    ],
    safety: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY,
  };
}

export function createStreamGiftLedgerOwnerFilledProviderReferenceLabelsRequest200A(): StreamGiftLedgerControlledLiveProviderBindingNextRequest200A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION,
    status: "next_stage_requires_owner_filled_reference_labels_only",
    nextStage: "200B_owner_filled_provider_reference_labels_verification",
    providerBindingExecuted: false,
    forbiddenUntil200B: [
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

export function assertStreamGiftLedgerControlledLiveProviderBindingApproval200ARemainsSafe(): void {
  assertStreamGiftLedgerFinalProductionReadiness199HRemainsSafe();
  const safety = STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
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
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (unsafe.some(Boolean) || !safety.requiresSeparate200BProviderConfigVerification || !safety.referenceLabelsOnly) {
    throw new Error("stream_gift_ledger_200a_unsafe_runtime_flag");
  }
}
