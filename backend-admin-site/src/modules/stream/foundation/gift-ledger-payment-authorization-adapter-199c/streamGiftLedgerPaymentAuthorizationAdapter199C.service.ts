import {
  STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
  type StreamGiftLedgerPaymentAuthorizationAdapterBlocked199C,
  type StreamGiftLedgerPaymentAuthorizationAdapterInput199C,
  type StreamGiftLedgerPaymentAuthorizationAdapterReadiness199C,
  type StreamGiftLedgerPaymentAuthorizationAdapterResult199C,
  type StreamGiftLedgerPaymentAuthorizationAdapterSafety199C,
  type StreamGiftLedgerPaymentAuthorizationContext199C,
  type StreamGiftLedgerPaymentAuthorizationProviderKind199C,
  type StreamGiftLedgerPaymentAuthorizationProviderName199C,
  type StreamGiftLedgerPaymentAuthorizationReferenceLabel199C,
  type StreamGiftLedgerPaymentAuthorizationRequestPreview199C,
} from "./streamGiftLedgerPaymentAuthorizationAdapter199C.types";

export const STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_199C_PAYMENT_AUTHORIZATION_ADAPTER_APPROVED" as const;

export const STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY: StreamGiftLedgerPaymentAuthorizationAdapterSafety199C = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawPaymentTokenAccepted: false,
  rawPurchaseTokenAccepted: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerAuthorizationCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  paymentAuthorizationCompletedNow: false,
  dbWriteAllowedNow: false,
  ledgerCommitAllowedNow: false,
  realtimeEmitAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  referenceLabelsOnly: true,
  outputProviderAuthorizationReferenceHashAllowedOnlyAfterRealAdapter: true,
  separateExactOwnerApprovalRequiredFor199D: true,
});

const PROVIDER_KINDS_199C = [
  "accept_payments",
  "google_billing_diamonds",
  "wallet_balance_authorization",
  "manual_provider_reference_review",
] as const satisfies readonly StreamGiftLedgerPaymentAuthorizationProviderKind199C[];

const PROVIDER_NAMES_199C = ["google_billing", "airwallex", "wallet", "manual_review", "other"] as const;

const RAW_SECRET_FIELD_NAMES_199C = [
  "secret",
  "secretValue",
  "rawSecret",
  "apiKey",
  "privateKey",
  "clientSecret",
  "providerToken",
  "rawProviderToken",
  "paymentToken",
  "rawPaymentToken",
  "purchaseToken",
  "rawPurchaseToken",
  "authorizationCode",
  "providerReference",
  "rawProviderReference",
  "providerResponseBody",
  "providerAuthorizationReference",
  "rawProviderAuthorizationReference",
  "accessToken",
  "refreshToken",
  "password",
  "value",
  "rawValue",
  "cardNumber",
  "bankAccount",
  "iban",
  "accountNumber",
] as const;

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked199C(
  code: StreamGiftLedgerPaymentAuthorizationAdapterBlocked199C["code"],
  blockedReason: string,
): StreamGiftLedgerPaymentAuthorizationAdapterBlocked199C {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    status: "payment_authorization_adapter_boundary_blocked",
    code,
    blockedReason,
    providerLiveCallExecuted: false,
    paymentAuthorizationCompleted: false,
    providerAuthorizationReferenceHashCreated: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY,
  };
}

function hasForbiddenRawProviderMaterial199C(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (RAW_SECRET_FIELD_NAMES_199C.some((blocked) => blocked.toLowerCase() === key.toLowerCase()) && clean(record[key])) {
      return true;
    }
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawProviderMaterial199C)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawProviderMaterial199C(nested)) return true;
  }
  return false;
}

function normalizeProviderKind199C(value: unknown): StreamGiftLedgerPaymentAuthorizationProviderKind199C | undefined {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_KINDS_199C.find((kind) => kind === normalized);
}

function normalizeProviderName199C(value: unknown): StreamGiftLedgerPaymentAuthorizationProviderName199C {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_199C.find((name) => name === normalized) ?? "manual_review";
}

function normalizeContext199C(value: unknown): StreamGiftLedgerPaymentAuthorizationContext199C {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "messenger" || normalized === "shorts" || normalized === "creator_profile") return normalized;
  return "stream_live";
}

function isReferenceLabel199C(value: string): boolean {
  return /^[A-Z][A-Z0-9_]{2,96}$/.test(value) && !value.includes("=") && !value.includes(" ");
}

function normalizeReferenceLabels199C(rawLabels: unknown): readonly StreamGiftLedgerPaymentAuthorizationReferenceLabel199C[] {
  if (!Array.isArray(rawLabels)) return [];
  return rawLabels.flatMap((raw): StreamGiftLedgerPaymentAuthorizationReferenceLabel199C[] => {
    if (!raw || typeof raw !== "object") return [];
    const record = raw as Record<string, unknown>;
    const providerKind = normalizeProviderKind199C(record.providerKind);
    const envReferenceLabel = clean(record.envReferenceLabel);
    const purpose = clean(record.purpose) ?? "stream_gifts_payment_authorization_adapter_boundary";
    if (!providerKind || !envReferenceLabel) return [];
    return [{
      providerKind,
      providerName: normalizeProviderName199C(record.providerName),
      envReferenceLabel,
      purpose,
      serverSideOnly: true,
    }];
  });
}

function toPositiveInt(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) return fallback;
  return value;
}

function normalizeRequestPreview199C(rawPreview: unknown): StreamGiftLedgerPaymentAuthorizationRequestPreview199C | undefined {
  if (!rawPreview || typeof rawPreview !== "object") return undefined;
  const record = rawPreview as Record<string, unknown>;
  const senderUserId = clean(record.senderUserId);
  const receiverUserId = clean(record.receiverUserId);
  const idempotencyKey = clean(record.idempotencyKey);
  const giftKey = clean(record.giftKey);
  const giftCatalogItemId = clean(record.giftCatalogItemId);
  const diamondAmount = toPositiveInt(record.diamondAmount, 0);
  const quantity = Math.min(toPositiveInt(record.quantity, 1), 999);
  if (!senderUserId || !receiverUserId || !idempotencyKey) return undefined;
  if (!giftKey && !giftCatalogItemId) return undefined;
  if (diamondAmount < 1 || diamondAmount > 10000) return undefined;
  return {
    context: normalizeContext199C(record.context),
    senderUserId,
    receiverUserId,
    giftKey,
    giftCatalogItemId,
    roomId: clean(record.roomId),
    conversationId: clean(record.conversationId),
    quantity,
    diamondAmount,
    diamondMicros: String(BigInt(diamondAmount) * 1_000_000n * BigInt(quantity)),
    idempotencyKey,
  };
}

export function normalizeStreamGiftLedgerPaymentAuthorizationAdapterInput199C(
  raw: Record<string, unknown>,
): StreamGiftLedgerPaymentAuthorizationAdapterInput199C {
  const adapterMode = clean(raw.adapterMode) === "contract_boundary_only" ? "contract_boundary_only" : "disabled";
  const requestedBundle = clean(raw.requestedBundle) === "stream_gifts_payment_authorization_adapter_boundary"
    ? "stream_gifts_payment_authorization_adapter_boundary"
    : "disabled";
  return {
    ownerApproval: clean(raw.ownerApproval),
    adapterMode,
    requestedBundle,
    providerReferenceLabels: normalizeReferenceLabels199C(raw.providerReferenceLabels),
    requestPreview: normalizeRequestPreview199C(raw.requestPreview),
  };
}

export function getStreamGiftLedgerPaymentAuthorizationAdapterReadiness199C(): StreamGiftLedgerPaymentAuthorizationAdapterReadiness199C {
  assertStreamGiftLedgerPaymentAuthorizationAdapter199CRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    status: "ready_for_payment_authorization_adapter_boundary_only",
    requiredPreviousStage: "199B_provider_config_reference_labels_clean",
    currentStage: "199C_payment_authorization_adapter_boundary",
    nextStage: "199D_real_payment_authorization_adapter_owner_local",
    providerLiveCallExecuted: false,
    paymentAuthorizationCompleted: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY,
  };
}

export function getStreamGiftLedgerPaymentAuthorizationAdapterContract199C() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    contract: "stream.gift.payment_authorization.adapter_boundary.v1" as const,
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_OWNER_APPROVAL,
    acceptedProviderKinds: PROVIDER_KINDS_199C,
    requiredPreviousStage: "199B_provider_config_reference_labels_clean" as const,
    amountPolicy: {
      minDiamonds: 1,
      maxDiamonds: 10000,
      diamondMicrosPerDiamond: "1000000",
      oneDiamondUsdCents: 1,
      minimumTopUpCoins: 10,
      minimumTopUpUsd: 10,
    },
    outputContractAfter199D: {
      providerAuthorizationReferenceHash: "sha256_hex_64",
      rawProviderReferenceStored: false,
      rawProviderTokenOutputAllowed: false,
      commitTarget: "POST /api/stream/gifts/ledger/198k/send-intent",
    },
    providerLiveCallExecuted: false,
    paymentAuthorizationCompleted: false,
    giftSendCommitted: false,
    nextStage: "199D_real_payment_authorization_adapter_owner_local" as const,
    safety: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY,
  };
}

export function prepareStreamGiftLedgerPaymentAuthorizationAdapterBoundary199C(
  input: StreamGiftLedgerPaymentAuthorizationAdapterInput199C,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerPaymentAuthorizationAdapterResult199C {
  assertStreamGiftLedgerPaymentAuthorizationAdapter199CRemainsSafe();
  if (hasForbiddenRawProviderMaterial199C(raw)) {
    return blocked199C("raw_secret_or_provider_value_rejected", "Raw provider/payment secrets, tokens, references, bank/card identifiers, or response bodies are rejected.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_OWNER_APPROVAL) {
    return blocked199C("owner_approval_required", "Exact 199C owner approval phrase is required before preparing the adapter boundary.");
  }
  if (input.adapterMode !== "contract_boundary_only" || input.requestedBundle !== "stream_gifts_payment_authorization_adapter_boundary") {
    return blocked199C("adapter_mode_disabled", "199C can only prepare a contract boundary; provider calls and captures are not allowed here.");
  }
  const labels = input.providerReferenceLabels ?? [];
  if (labels.length < 2) return blocked199C("reference_labels_required", "At least accept-payments plus Google Billing/Wallet reference labels are required.");
  if (labels.some((label) => !isReferenceLabel199C(label.envReferenceLabel))) {
    return blocked199C("raw_secret_or_provider_value_rejected", "Provider config must be reference-label only, not raw value material.");
  }
  const kinds = [...new Set(labels.map((label) => label.providerKind))] as StreamGiftLedgerPaymentAuthorizationProviderKind199C[];
  if (!kinds.includes("accept_payments")) {
    return blocked199C("accept_payment_provider_label_required", "accept_payments provider reference label is required.");
  }
  if (!kinds.includes("google_billing_diamonds") && !kinds.includes("wallet_balance_authorization")) {
    return blocked199C("google_billing_or_wallet_label_required", "Google Billing diamonds or Wallet balance authorization reference label is required.");
  }
  if (!input.requestPreview) {
    return blocked199C("request_preview_required", "Gift payment request preview is required without provider call.");
  }
  if (input.requestPreview.diamondAmount < 1 || input.requestPreview.diamondAmount > 10000) {
    return blocked199C("invalid_gift_payment_amount", "Gift payment amount must stay in 1-10000 diamonds.");
  }
  if (!input.requestPreview.giftKey && !input.requestPreview.giftCatalogItemId) {
    return blocked199C("gift_identity_required", "Gift key or gift catalog item id is required.");
  }
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    status: "payment_authorization_adapter_boundary_prepared_no_provider_call",
    code: "requires_199d_real_payment_authorization_adapter",
    envelope: {
      contract: "stream.gift.payment_authorization.adapter_boundary.v1",
      version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
      requestedBundle: "stream_gifts_payment_authorization_adapter_boundary",
      providerReferenceLabelCount: labels.length,
      providedProviderKinds: kinds,
      requestPreview: input.requestPreview,
      realAuthorizationAdapterRequired: true,
      providerLiveCallExecuted: false,
      paymentAuthorizationCompleted: false,
      providerAuthorizationReferenceHashCreated: false,
      providerAuthorizationReferenceHashShape: "sha256_hex_64_after_199d_only",
      rawProviderTokenStored: false,
      rawProviderReferenceStored: false,
      giftSendCommitted: false,
      commitTargetAfter199D: "POST /api/stream/gifts/ledger/198k/send-intent",
      nextStage: "199D_real_payment_authorization_adapter_owner_local",
    },
    providerLiveCallExecuted: false,
    paymentAuthorizationCompleted: false,
    providerAuthorizationReferenceHashCreated: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY,
  };
}

export function getStreamGiftLedgerPaymentAuthorizationAdapterRunbook199C() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    purpose: "Prepare the payment authorization adapter boundary before any real provider/Wallet authorization is executed.",
    exactOwnerApproval: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_OWNER_APPROVAL,
    sequence: [
      "199B provider config readiness must be clean and reference-label only.",
      "199C prepares request preview and reference-label mapping only.",
      "199C must not call provider APIs, mutate Wallet, capture payment, write DB, or commit gift send.",
      "199D may perform owner-local real authorization adapter only with a separate exact approval.",
      "Only 64 hex providerAuthorizationReferenceHash can be forwarded into 198K gift ledger commit.",
    ],
    forbidden: [
      "raw provider secret/token/reference intake",
      "provider live call",
      "Wallet mutation",
      "payment capture",
      "ledger commit",
      "realtime delivery",
      "fake payment success",
      "fake gift send success",
      "fake available balance",
      "payout execution",
    ],
    localCheck: [
      "node .\\tools\\stream-gifts-ledger-199c-payment-authorization-adapter-contract-check.js --i-approve-199c-payment-authorization-adapter-check",
    ],
  };
}

export function createStreamGiftLedgerPaymentAuthorizationAdapterNextRequest199C() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION,
    status: "next_stage_requires_separate_199d_real_authorization_adapter",
    nextStage: "199D_real_payment_authorization_adapter_owner_local" as const,
    allowedNext: [
      "owner-local payment authorization adapter with separate exact approval",
      "hash-only provider authorization reference output after real adapter",
      "198K send-intent commit only after verified providerAuthorizationReferenceHash",
    ],
    stillForbidden: [
      "raw provider token/reference output",
      "fake payment authorization success",
      "Wallet mutation without provider authorization",
      "gift ledger commit without providerAuthorizationReferenceHash",
      "available balance release before settlement gates",
      "payout execution",
    ],
    providerLiveCallExecuted: false,
    paymentAuthorizationCompleted: false,
    giftSendCommitted: false,
  };
}

export function assertStreamGiftLedgerPaymentAuthorizationAdapter199CRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawPaymentTokenAccepted,
    safety.rawPurchaseTokenAccepted,
    safety.providerBindingAllowedNow,
    safety.providerLiveCallAllowedNow,
    safety.providerAuthorizationCallAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.paymentAuthorizationCompletedNow,
    safety.dbWriteAllowedNow,
    safety.ledgerCommitAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakePayoutSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (unsafe.some(Boolean)) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-199C unsafe runtime flag detected");
  }
}
