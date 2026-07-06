import {
  STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
  type StreamGiftLedgerProviderBindingKind199A,
  type StreamGiftLedgerProviderReferenceLabel199A,
  type StreamGiftLedgerRealProviderBindingApprovalBlocked199A,
  type StreamGiftLedgerRealProviderBindingApprovalInput199A,
  type StreamGiftLedgerRealProviderBindingApprovalReadiness199A,
  type StreamGiftLedgerRealProviderBindingApprovalResult199A,
  type StreamGiftLedgerRealProviderBindingApprovalSafety199A,
} from "./streamGiftLedgerRealProviderBindingApproval199A.types";

export const STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_OWNER_APPROVAL = "STREAM_GIFT_LEDGER_199A_EXACT_OWNER_APPROVAL_REQUEST_APPROVED" as const;

export const STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY: StreamGiftLedgerRealProviderBindingApprovalSafety199A = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutExecutionAllowedNow: false,
  dbWriteAllowedNow: false,
  migrationAllowedNow: false,
  realtimeEmitAllowedNow: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  separateExactOwnerApprovalRequiredFor199B: true,
  referenceLabelsOnly: true,
});

const REQUIRED_PROVIDER_KINDS_199A = [
  "accept_payments",
  "creator_payout",
  "google_billing_diamonds",
  "airwallex_merchant_rails",
] as const satisfies readonly StreamGiftLedgerProviderBindingKind199A[];

const PROVIDER_NAMES_199A = ["google_billing", "airwallex", "bank", "wallet", "manual_review", "other"] as const;

const RAW_SECRET_FIELD_NAMES_199A = [
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
] as const;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked199A(
  code: StreamGiftLedgerRealProviderBindingApprovalBlocked199A["code"],
  blockedReason: string,
): StreamGiftLedgerRealProviderBindingApprovalBlocked199A {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
    status: "real_provider_binding_exact_owner_approval_blocked",
    code,
    blockedReason,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY,
  };
}

function hasForbiddenRawSecretInput199A(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (RAW_SECRET_FIELD_NAMES_199A.some((blocked) => blocked.toLowerCase() === key.toLowerCase()) && clean(record[key])) {
      return true;
    }
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput199A)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput199A(nested)) return true;
  }
  return false;
}

function normalizeProviderKind199A(value: unknown): StreamGiftLedgerProviderBindingKind199A | undefined {
  const normalized = clean(value)?.toLowerCase();
  return REQUIRED_PROVIDER_KINDS_199A.find((kind) => kind === normalized);
}

function normalizeProviderName199A(value: unknown): StreamGiftLedgerProviderReferenceLabel199A["providerName"] {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_199A.find((name) => name === normalized) ?? "manual_review";
}

function isReferenceLabel199A(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ");
}

function normalizeReferenceLabels199A(rawLabels: unknown): readonly StreamGiftLedgerProviderReferenceLabel199A[] {
  if (!Array.isArray(rawLabels)) return [];
  return rawLabels.flatMap((raw): StreamGiftLedgerProviderReferenceLabel199A[] => {
    if (!raw || typeof raw !== "object") return [];
    const record = raw as Record<string, unknown>;
    const providerKind = normalizeProviderKind199A(record.providerKind);
    const envReferenceLabel = clean(record.envReferenceLabel);
    const purpose = clean(record.purpose) ?? "provider_binding_reference_label_only";
    if (!providerKind || !envReferenceLabel) return [];
    return [{
      providerKind,
      providerName: normalizeProviderName199A(record.providerName),
      envReferenceLabel,
      purpose,
    }];
  });
}

export function normalizeStreamGiftLedgerRealProviderBindingApprovalInput199A(
  raw: Record<string, unknown>,
): StreamGiftLedgerRealProviderBindingApprovalInput199A {
  const bindingMode = clean(raw.bindingMode) === "exact_owner_approval_request" ? "exact_owner_approval_request" : "disabled";
  const requestedBundle = clean(raw.requestedBundle) === "stream_gifts_provider_binding" ? "stream_gifts_provider_binding" : "disabled";
  return {
    ownerApproval: clean(raw.ownerApproval),
    bindingMode,
    requestedBundle,
    referenceLabels: normalizeReferenceLabels199A(raw.referenceLabels),
  };
}

export function getStreamGiftLedgerRealProviderBindingApprovalReadiness199A(): StreamGiftLedgerRealProviderBindingApprovalReadiness199A {
  assertStreamGiftLedgerRealProviderBindingApproval199ARemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
    status: "ready_for_exact_owner_approval_request_only",
    requiredPreviousStage: "198Z_final_audit_clean",
    currentStage: "199A_exact_owner_approval_boundary",
    nextStage: "199B_provider_config_readiness_reference_labels_only",
    productionBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY,
  };
}

export function getStreamGiftLedgerRealProviderBindingApprovalContract199A() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
    contract: "stream.gift.provider_binding.exact_owner_approval_request.v1" as const,
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_OWNER_APPROVAL,
    requiredProviderKinds: REQUIRED_PROVIDER_KINDS_199A,
    acceptsOnlyReferenceLabels: true,
    acceptsRawSecrets: false,
    readsEnvFile: false,
    readsEnvValues: false,
    providerBindingExecuted: false,
    nextStage: "199B_provider_config_readiness_reference_labels_only" as const,
    safety: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY,
  };
}

export function prepareStreamGiftLedgerRealProviderBindingApprovalRequest199A(
  input: StreamGiftLedgerRealProviderBindingApprovalInput199A,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerRealProviderBindingApprovalResult199A {
  assertStreamGiftLedgerRealProviderBindingApproval199ARemainsSafe();
  if (hasForbiddenRawSecretInput199A(raw)) {
    return blocked199A("raw_secret_or_provider_value_rejected", "199A accepts reference labels only; raw secrets, tokens, provider references, bank/card data, and values are rejected");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_OWNER_APPROVAL) {
    return blocked199A("owner_approval_required", `ownerApproval must equal ${STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_OWNER_APPROVAL}`);
  }
  if (input.bindingMode !== "exact_owner_approval_request" || input.requestedBundle !== "stream_gifts_provider_binding") {
    return blocked199A("binding_mode_disabled", "bindingMode must be exact_owner_approval_request and requestedBundle must be stream_gifts_provider_binding");
  }
  const labels = input.referenceLabels ?? [];
  if (labels.length < REQUIRED_PROVIDER_KINDS_199A.length) {
    return blocked199A("reference_labels_required", "199A requires reference labels for accept payments, creator payout, Google Billing diamonds, and Airwallex merchant rails");
  }
  const providedKinds = [...new Set(labels.map((label) => label.providerKind))] as StreamGiftLedgerProviderBindingKind199A[];
  const missing = REQUIRED_PROVIDER_KINDS_199A.filter((kind) => !providedKinds.includes(kind));
  if (missing.length > 0) {
    return blocked199A("missing_required_provider_kind", `Missing provider reference labels for: ${missing.join(", ")}`);
  }
  const invalid = labels.find((label) => !isReferenceLabel199A(label.envReferenceLabel));
  if (invalid) {
    return blocked199A("invalid_reference_label", `Invalid reference label for ${invalid.providerKind}; use env key name/reference label only, not a value`);
  }
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
    status: "real_provider_binding_exact_owner_approval_prepared_not_executed",
    code: "provider_binding_requires_199b_separate_execution",
    envelope: {
      contract: "stream.gift.provider_binding.exact_owner_approval_request.v1",
      version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
      requestedBundle: "stream_gifts_provider_binding",
      referenceLabelCount: labels.length,
      requiredProviderKinds: REQUIRED_PROVIDER_KINDS_199A,
      providedProviderKinds: providedKinds,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsSeparated: true,
      airwallexMerchantRailsSeparated: true,
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      payoutExecutionAllowed: false,
      walletMutationAllowed: false,
      rawSecretsIncluded: false,
      nextStage: "199B_provider_config_readiness_reference_labels_only",
    },
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY,
  };
}

export function getStreamGiftLedgerRealProviderBindingApprovalRunbook199A() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
    steps: [
      "Keep 198Z final audit clean before provider binding.",
      "Submit only env reference labels/key names, never raw secrets or provider values.",
      "Keep accept payments provider separate from creator payout provider.",
      "Keep Google Billing diamonds top-up separate from Airwallex payout/merchant rails.",
      "Move to 199B for provider config readiness; do not execute provider calls in 199A.",
    ] as const,
    forbidden: [
      "no .env read",
      "no env value read",
      "no raw secret intake",
      "no provider binding execution",
      "no provider call",
      "no wallet mutation",
      "no payout execution",
      "no fake success",
    ] as const,
    safety: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY,
  };
}

export function assertStreamGiftLedgerRealProviderBindingApproval199ARemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.providerBindingAllowedNow,
    safety.providerLiveCallAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.dbWriteAllowedNow,
    safety.migrationAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (unsafe.some(Boolean) || !safety.referenceLabelsOnly || !safety.separateExactOwnerApprovalRequiredFor199B) {
    throw new Error("199A safety boundary violated");
  }
}
