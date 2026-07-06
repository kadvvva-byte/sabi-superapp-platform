import {
  STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
  type StreamGiftLedgerProviderConfigKind199B,
  type StreamGiftLedgerProviderConfigReadinessAttestation199B,
  type StreamGiftLedgerProviderConfigReadinessBlocked199B,
  type StreamGiftLedgerProviderConfigReadinessInput199B,
  type StreamGiftLedgerProviderConfigReadiness199B,
  type StreamGiftLedgerProviderConfigReadinessResult199B,
  type StreamGiftLedgerProviderConfigReadinessSafety199B,
  type StreamGiftLedgerProviderConfigReferenceLabel199B,
  type StreamGiftLedgerProviderName199B,
} from "./streamGiftLedgerProviderConfigReadiness199B.types";

export const STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_OWNER_APPROVAL = "STREAM_GIFT_LEDGER_199B_PROVIDER_CONFIG_READINESS_APPROVED" as const;

export const STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY: StreamGiftLedgerProviderConfigReadinessSafety199B = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  providerConfigPresenceLookupAllowedNow: false,
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
  referenceLabelsOnly: true,
  separateExactOwnerApprovalRequiredFor199C: true,
});

const REQUIRED_PROVIDER_KINDS_199B = [
  "accept_payments",
  "creator_payout",
  "google_billing_diamonds",
  "airwallex_merchant_rails",
] as const satisfies readonly StreamGiftLedgerProviderConfigKind199B[];

const PROVIDER_NAMES_199B = ["google_billing", "airwallex", "bank", "wallet", "manual_review", "other"] as const;

const RAW_SECRET_FIELD_NAMES_199B = [
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
  "routingNumber",
  "accountNumber",
] as const;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked199B(
  code: StreamGiftLedgerProviderConfigReadinessBlocked199B["code"],
  blockedReason: string,
): StreamGiftLedgerProviderConfigReadinessBlocked199B {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
    status: "provider_config_readiness_blocked",
    code,
    blockedReason,
    providerConfigReadyForLiveCalls: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY,
  };
}

function hasForbiddenRawSecretInput199B(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (RAW_SECRET_FIELD_NAMES_199B.some((blocked) => blocked.toLowerCase() === key.toLowerCase()) && clean(record[key])) {
      return true;
    }
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawSecretInput199B)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawSecretInput199B(nested)) return true;
  }
  return false;
}

function normalizeProviderKind199B(value: unknown): StreamGiftLedgerProviderConfigKind199B | undefined {
  const normalized = clean(value)?.toLowerCase();
  return REQUIRED_PROVIDER_KINDS_199B.find((kind) => kind === normalized);
}

function normalizeProviderName199B(value: unknown): StreamGiftLedgerProviderName199B {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_199B.find((name) => name === normalized) ?? "manual_review";
}

function isReferenceLabel199B(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ");
}

function normalizeReferenceLabels199B(rawLabels: unknown): readonly StreamGiftLedgerProviderConfigReferenceLabel199B[] {
  if (!Array.isArray(rawLabels)) return [];
  return rawLabels.flatMap((raw): StreamGiftLedgerProviderConfigReferenceLabel199B[] => {
    if (!raw || typeof raw !== "object") return [];
    const record = raw as Record<string, unknown>;
    const providerKind = normalizeProviderKind199B(record.providerKind);
    const envReferenceLabel = clean(record.envReferenceLabel);
    const purpose = clean(record.purpose) ?? "provider_config_readiness_reference_label_only";
    if (!providerKind || !envReferenceLabel) return [];
    return [{
      providerKind,
      providerName: normalizeProviderName199B(record.providerName),
      envReferenceLabel,
      purpose,
      serverSideOnly: true,
    }];
  });
}

function normalizeAttestations199B(rawAttestations: unknown): readonly StreamGiftLedgerProviderConfigReadinessAttestation199B[] {
  if (!Array.isArray(rawAttestations)) return [];
  return rawAttestations.flatMap((raw): StreamGiftLedgerProviderConfigReadinessAttestation199B[] => {
    if (!raw || typeof raw !== "object") return [];
    const record = raw as Record<string, unknown>;
    const providerKind = normalizeProviderKind199B(record.providerKind);
    const envReferenceLabel = clean(record.envReferenceLabel);
    if (!providerKind || !envReferenceLabel) return [];
    if (record.ownerConfirmsReferenceLabelExists !== true) return [];
    if (record.ownerConfirmsNoRawSecretShared !== true) return [];
    if (record.ownerConfirmsServerSideOnly !== true) return [];
    return [{
      providerKind,
      envReferenceLabel,
      ownerConfirmsReferenceLabelExists: true,
      ownerConfirmsNoRawSecretShared: true,
      ownerConfirmsServerSideOnly: true,
    }];
  });
}

export function normalizeStreamGiftLedgerProviderConfigReadinessInput199B(
  raw: Record<string, unknown>,
): StreamGiftLedgerProviderConfigReadinessInput199B {
  const configMode = clean(raw.configMode) === "reference_label_readiness" ? "reference_label_readiness" : "disabled";
  const requestedBundle = clean(raw.requestedBundle) === "stream_gifts_provider_config_readiness" ? "stream_gifts_provider_config_readiness" : "disabled";
  return {
    ownerApproval: clean(raw.ownerApproval),
    configMode,
    requestedBundle,
    referenceLabels: normalizeReferenceLabels199B(raw.referenceLabels),
    attestations: normalizeAttestations199B(raw.attestations),
  };
}

export function getStreamGiftLedgerProviderConfigReadiness199B(): StreamGiftLedgerProviderConfigReadiness199B {
  assertStreamGiftLedgerProviderConfigReadiness199BRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
    status: "ready_for_provider_config_reference_label_readiness_only",
    requiredPreviousStage: "199A_exact_owner_approval_clean",
    currentStage: "199B_provider_config_readiness_reference_labels_only",
    nextStage: "199C_payment_authorization_adapter_boundary",
    providerConfigReadyForLiveCalls: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY,
  };
}

export function getStreamGiftLedgerProviderConfigReadinessContract199B() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
    contract: "stream.gift.provider_config.reference_labels_readiness.v1" as const,
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_OWNER_APPROVAL,
    requiredProviderKinds: REQUIRED_PROVIDER_KINDS_199B,
    referenceLabelsOnly: true,
    readsEnvFile: false,
    readsEnvValues: false,
    providerConfigPresenceLookupExecuted: false,
    providerConfigReadyForLiveCalls: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    nextStage: "199C_payment_authorization_adapter_boundary" as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY,
  };
}

export function prepareStreamGiftLedgerProviderConfigReadiness199B(
  input: StreamGiftLedgerProviderConfigReadinessInput199B,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerProviderConfigReadinessResult199B {
  assertStreamGiftLedgerProviderConfigReadiness199BRemainsSafe();
  if (hasForbiddenRawSecretInput199B(raw)) {
    return blocked199B("raw_secret_or_provider_value_rejected", "199B accepts reference labels and owner attestations only; raw secrets, provider tokens, bank/card/IBAN data, and provider response values are rejected");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_OWNER_APPROVAL) {
    return blocked199B("owner_approval_required", `ownerApproval must equal ${STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_OWNER_APPROVAL}`);
  }
  if (input.configMode !== "reference_label_readiness" || input.requestedBundle !== "stream_gifts_provider_config_readiness") {
    return blocked199B("config_mode_disabled", "configMode must be reference_label_readiness and requestedBundle must be stream_gifts_provider_config_readiness");
  }
  const labels = input.referenceLabels ?? [];
  if (labels.length < REQUIRED_PROVIDER_KINDS_199B.length) {
    return blocked199B("reference_labels_required", "199B requires reference labels for accept payments, creator payout, Google Billing diamonds, and Airwallex merchant rails");
  }
  const providedKinds = [...new Set(labels.map((label) => label.providerKind))] as StreamGiftLedgerProviderConfigKind199B[];
  const missing = REQUIRED_PROVIDER_KINDS_199B.filter((kind) => !providedKinds.includes(kind));
  if (missing.length > 0) {
    return blocked199B("missing_required_provider_kind", `Missing provider config reference labels for: ${missing.join(", ")}`);
  }
  const invalid = labels.find((label) => !isReferenceLabel199B(label.envReferenceLabel));
  if (invalid) {
    return blocked199B("invalid_reference_label", `Invalid reference label for ${invalid.providerKind}; use env key name/reference label only, not a value`);
  }
  const attestations = input.attestations ?? [];
  const attestedKinds = new Set(attestations.map((attestation) => attestation.providerKind));
  const missingAttestation = REQUIRED_PROVIDER_KINDS_199B.find((kind) => !attestedKinds.has(kind));
  if (missingAttestation) {
    return blocked199B("attestation_required", `Owner attestation required for ${missingAttestation}; 199B cannot read .env or env values`);
  }
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
    status: "provider_config_readiness_prepared_reference_labels_only",
    code: "provider_config_requires_199c_adapter_boundary",
    envelope: {
      contract: "stream.gift.provider_config.reference_labels_readiness.v1",
      version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
      requestedBundle: "stream_gifts_provider_config_readiness",
      referenceLabelCount: labels.length,
      attestationCount: attestations.length,
      requiredProviderKinds: REQUIRED_PROVIDER_KINDS_199B,
      providedProviderKinds: providedKinds,
      acceptPaymentsProviderSeparated: true,
      creatorPayoutProviderSeparated: true,
      googleBillingDiamondsSeparated: true,
      airwallexMerchantRailsSeparated: true,
      referenceLabelsOnly: true,
      rawSecretsIncluded: false,
      providerConfigPresenceLookupExecuted: false,
      providerConfigReadyForLiveCalls: false,
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      payoutExecutionAllowed: false,
      walletMutationAllowed: false,
      nextStage: "199C_payment_authorization_adapter_boundary",
    },
    providerConfigReadyForLiveCalls: false,
    providerBindingExecuted: false,
    providerLiveCallExecuted: false,
    payoutExecutionAllowed: false,
    safety: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY,
  };
}

export function getStreamGiftLedgerProviderConfigReadinessRunbook199B() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
    steps: [
      "Keep 199A exact owner approval clean before config readiness.",
      "Submit only env reference labels/key names plus owner attestations; never submit raw values.",
      "Keep accept payments, creator payout, Google Billing diamonds, and Airwallex rails separated.",
      "Do not read .env or env values in 199B; actual lookup/binding is a separate controlled stage.",
      "Move to 199C for payment authorization adapter boundary; no provider live call in 199B.",
    ] as const,
    forbidden: [
      "no .env read",
      "no env value read",
      "no raw secret intake",
      "no provider binding execution",
      "no provider live call",
      "no Wallet mutation",
      "no payout execution",
      "no fake success",
    ] as const,
    safety: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY,
  };
}

export function assertStreamGiftLedgerProviderConfigReadiness199BRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.providerConfigPresenceLookupAllowedNow,
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
  if (unsafe.some(Boolean) || !safety.referenceLabelsOnly || !safety.separateExactOwnerApprovalRequiredFor199C) {
    throw new Error("199B safety boundary violated");
  }
}
