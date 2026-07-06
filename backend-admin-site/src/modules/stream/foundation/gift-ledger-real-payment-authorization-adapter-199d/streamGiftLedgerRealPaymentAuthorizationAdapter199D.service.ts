import {
  STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
  type StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D,
  type StreamGiftLedgerRealPaymentAuthorizationAdapterInput199D,
  type StreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D,
  type StreamGiftLedgerRealPaymentAuthorizationAdapterResult199D,
  type StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D,
  type StreamGiftLedgerRealPaymentAuthorizationContext199D,
  type StreamGiftLedgerRealPaymentAuthorizationProviderKind199D,
  type StreamGiftLedgerRealPaymentAuthorizationProviderName199D,
  type StreamGiftLedgerRealPaymentAuthorizationRequest199D,
} from "./streamGiftLedgerRealPaymentAuthorizationAdapter199D.types";

export const STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_OWNER_APPROVAL =
  "STREAM_GIFT_LEDGER_199D_REAL_PAYMENT_AUTHORIZATION_ADAPTER_APPROVED" as const;

export const STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_HASH_ONLY_APPROVAL =
  "STREAM_GIFT_LEDGER_199D_HASH_ONLY_AUTHORIZATION_ACCEPTED" as const;

export const STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY: StreamGiftLedgerRealPaymentAuthorizationAdapterSafety199D = Object.freeze({
  envFileReadAllowedNow: false,
  envValueReadAllowedNow: false,
  rawSecretAccepted: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawPaymentTokenAccepted: false,
  rawPurchaseTokenAccepted: false,
  rawProviderResponseAccepted: false,
  providerBindingAllowedNow: false,
  providerLiveCallAllowedNow: false,
  providerAuthorizationCallAllowedNow: false,
  providerPayoutCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  dbWriteAllowedNow: false,
  ledgerCommitAllowedNow: false,
  realtimeEmitAllowedNow: false,
  payoutExecutionAllowedNow: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  ownerLocalHashOnlyAuthorizationIntakeAllowed: true,
  providerAuthorizationReferenceHashOutputAllowed: true,
  separateExactOwnerApprovalRequiredFor199E: true,
});

const PROVIDER_KINDS_199D = [
  "accept_payments",
  "google_billing_diamonds",
  "wallet_balance_authorization",
  "manual_provider_reference_review",
] as const satisfies readonly StreamGiftLedgerRealPaymentAuthorizationProviderKind199D[];

const PROVIDER_NAMES_199D = ["google_billing", "airwallex", "wallet", "manual_review", "other"] as const;

const RAW_SECRET_FIELD_NAMES_199D = [
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

function blocked199D(
  code: StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D["code"],
  blockedReason: string,
): StreamGiftLedgerRealPaymentAuthorizationAdapterBlocked199D {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    status: "real_payment_authorization_adapter_blocked",
    code,
    blockedReason,
    providerLiveCallExecuted: false,
    providerAuthorizationReferenceHashAccepted: false,
    paymentAuthorizationCompletedByBackend: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY,
  };
}

function hasForbiddenRawProviderMaterial199D(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (key === "providerAuthorizationReferenceHash" || key === "providerAuthorizationAmountDiamondMicros") continue;
    if (RAW_SECRET_FIELD_NAMES_199D.some((blocked) => blocked.toLowerCase() === key.toLowerCase()) && clean(record[key])) {
      return true;
    }
    const nested = record[key];
    if (Array.isArray(nested) && nested.some(hasForbiddenRawProviderMaterial199D)) return true;
    if (nested && typeof nested === "object" && hasForbiddenRawProviderMaterial199D(nested)) return true;
  }
  return false;
}

function normalizeProviderKind199D(value: unknown): StreamGiftLedgerRealPaymentAuthorizationProviderKind199D | undefined {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_KINDS_199D.find((kind) => kind === normalized);
}

function normalizeProviderName199D(value: unknown): StreamGiftLedgerRealPaymentAuthorizationProviderName199D {
  const normalized = clean(value)?.toLowerCase();
  return PROVIDER_NAMES_199D.find((name) => name === normalized) ?? "manual_review";
}

function normalizeContext199D(value: unknown): StreamGiftLedgerRealPaymentAuthorizationContext199D {
  const normalized = clean(value)?.toLowerCase();
  if (normalized === "messenger" || normalized === "shorts" || normalized === "creator_profile") return normalized;
  return "stream_live";
}

function toPositiveInt(value: unknown, fallback: number): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) return fallback;
  return value;
}

function isSha256Hex64(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value.trim());
}

function normalizeDiamondMicros(value: unknown): string | undefined {
  const raw = clean(value);
  if (!raw || !/^[0-9]+$/.test(raw)) return undefined;
  return raw;
}

function normalizeRequest199D(rawRequest: unknown): StreamGiftLedgerRealPaymentAuthorizationRequest199D | undefined {
  if (!rawRequest || typeof rawRequest !== "object") return undefined;
  const record = rawRequest as Record<string, unknown>;
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
    context: normalizeContext199D(record.context),
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

export function normalizeStreamGiftLedgerRealPaymentAuthorizationAdapterInput199D(
  raw: Record<string, unknown>,
): StreamGiftLedgerRealPaymentAuthorizationAdapterInput199D {
  const adapterMode = clean(raw.adapterMode) === "owner_local_hash_only" ? "owner_local_hash_only" : "disabled";
  const requestedBundle = clean(raw.requestedBundle) === "stream_gifts_real_payment_authorization_hash_only"
    ? "stream_gifts_real_payment_authorization_hash_only"
    : "disabled";
  return {
    ownerApproval: clean(raw.ownerApproval),
    hashOnlyAuthorizationApproval: clean(raw.hashOnlyAuthorizationApproval),
    adapterMode,
    requestedBundle,
    providerKind: normalizeProviderKind199D(raw.providerKind),
    providerName: normalizeProviderName199D(raw.providerName),
    providerAuthorizationReferenceHash: clean(raw.providerAuthorizationReferenceHash),
    providerAuthorizationAmountDiamondMicros: normalizeDiamondMicros(raw.providerAuthorizationAmountDiamondMicros),
    providerAuthorizationCurrency: clean(raw.providerAuthorizationCurrency) === "DIAMOND_MICROS" ? "DIAMOND_MICROS" : undefined,
    request: normalizeRequest199D(raw.request),
  };
}

export function getStreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D(): StreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D {
  assertStreamGiftLedgerRealPaymentAuthorizationAdapter199DRemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    status: "ready_for_owner_local_hash_only_payment_authorization",
    requiredPreviousStage: "199C_payment_authorization_adapter_boundary_clean",
    currentStage: "199D_real_payment_authorization_adapter_owner_local_hash_only",
    nextStage: "199E_gift_send_real_provider_authorization_commit",
    providerLiveCallExecuted: false,
    paymentAuthorizationCompletedByBackend: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY,
  };
}

export function getStreamGiftLedgerRealPaymentAuthorizationAdapterContract199D() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    contract: "stream.gift.payment_authorization.hash_only.v1" as const,
    ownerApprovalPhrase: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_OWNER_APPROVAL,
    hashOnlyAuthorizationApprovalPhrase: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_HASH_ONLY_APPROVAL,
    requiredPreviousStage: "199C_payment_authorization_adapter_boundary_clean" as const,
    acceptedProviderKinds: PROVIDER_KINDS_199D,
    hashPolicy: {
      providerAuthorizationReferenceHash: "sha256_hex_64_only",
      rawProviderReferenceAllowed: false,
      rawProviderTokenAllowed: false,
      rawProviderResponseAllowed: false,
    },
    amountPolicy: {
      minDiamonds: 1,
      maxDiamonds: 10000,
      diamondMicrosPerDiamond: "1000000",
      receiverPendingBps: 7000,
      platformFeeBps: 3000,
    },
    outputTarget: "POST /api/stream/gifts/ledger/198k/send-intent" as const,
    providerLiveCallExecutedByBackend: false,
    paymentAuthorizationCompletedByBackend: false,
    giftSendCommitted: false,
    nextStage: "199E_gift_send_real_provider_authorization_commit" as const,
    safety: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY,
  };
}

export function acceptStreamGiftLedgerRealPaymentAuthorizationHashOnly199D(
  input: StreamGiftLedgerRealPaymentAuthorizationAdapterInput199D,
  raw: Record<string, unknown> = {},
): StreamGiftLedgerRealPaymentAuthorizationAdapterResult199D {
  assertStreamGiftLedgerRealPaymentAuthorizationAdapter199DRemainsSafe();
  if (hasForbiddenRawProviderMaterial199D(raw)) {
    return blocked199D("raw_secret_or_provider_value_rejected", "Raw provider/payment secrets, tokens, references, card/bank identifiers, or provider response bodies are rejected. Submit only providerAuthorizationReferenceHash.");
  }
  if (input.ownerApproval !== STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_OWNER_APPROVAL) {
    return blocked199D("owner_approval_required", "Exact 199D owner approval phrase is required.");
  }
  if (input.hashOnlyAuthorizationApproval !== STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_HASH_ONLY_APPROVAL) {
    return blocked199D("hash_only_authorization_approval_required", "Exact hash-only authorization acceptance phrase is required.");
  }
  if (input.adapterMode !== "owner_local_hash_only" || input.requestedBundle !== "stream_gifts_real_payment_authorization_hash_only") {
    return blocked199D("adapter_mode_disabled", "199D only accepts owner-local hash-only authorization output; backend provider calls are not allowed here.");
  }
  if (!input.providerKind) return blocked199D("provider_kind_required", "Provider kind is required.");
  if (!isSha256Hex64(input.providerAuthorizationReferenceHash)) {
    return blocked199D("provider_authorization_hash_required", "providerAuthorizationReferenceHash must be exactly 64 hex characters.");
  }
  if (!input.request) return blocked199D("request_required", "Payment authorization request is required.");
  if (input.request.diamondAmount < 1 || input.request.diamondAmount > 10000) {
    return blocked199D("invalid_request_amount", "Gift amount must stay within 1-10000 diamonds.");
  }
  if (!input.request.giftKey && !input.request.giftCatalogItemId) {
    return blocked199D("gift_identity_required", "Gift key or catalog item id is required.");
  }
  if (input.providerAuthorizationAmountDiamondMicros !== input.request.diamondMicros || input.providerAuthorizationCurrency !== "DIAMOND_MICROS") {
    return blocked199D("provider_authorization_amount_mismatch", "Provider authorization amount must exactly match request diamondMicros and DIAMOND_MICROS currency.");
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    status: "provider_authorization_reference_hash_accepted_for_ledger_commit",
    envelope: {
      contract: "stream.gift.payment_authorization.hash_only.v1",
      version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
      requestedBundle: "stream_gifts_real_payment_authorization_hash_only",
      providerKind: input.providerKind,
      providerName: input.providerName ?? "manual_review",
      request: input.request,
      providerAuthorizationReferenceHash: input.providerAuthorizationReferenceHash.trim().toLowerCase(),
      providerAuthorizationAmountDiamondMicros: input.providerAuthorizationAmountDiamondMicros,
      providerAuthorizationCurrency: "DIAMOND_MICROS",
      rawProviderTokenStored: false,
      rawProviderReferenceStored: false,
      rawProviderResponseStored: false,
      providerLiveCallExecutedByBackend: false,
      paymentAuthorizationCompletedByBackend: false,
      ownerAttestedExternalAuthorization: true,
      ledgerCommitTarget: "POST /api/stream/gifts/ledger/198k/send-intent",
      nextStage: "199E_gift_send_real_provider_authorization_commit",
    },
    providerLiveCallExecuted: false,
    providerAuthorizationReferenceHashAccepted: true,
    paymentAuthorizationCompletedByBackend: false,
    giftSendCommitted: false,
    safety: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY,
  };
}

export function getStreamGiftLedgerRealPaymentAuthorizationAdapterRunbook199D() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    purpose: "Accept hash-only payment authorization output after a real owner-local provider/Wallet authorization, without raw secrets or backend provider calls.",
    exactOwnerApproval: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_OWNER_APPROVAL,
    hashOnlyAuthorizationApproval: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_HASH_ONLY_APPROVAL,
    requiredInput: [
      "providerAuthorizationReferenceHash: sha256 hex 64",
      "providerAuthorizationAmountDiamondMicros matching request.diamondMicros",
      "providerAuthorizationCurrency=DIAMOND_MICROS",
      "request with sender/receiver/gift/quantity/amount/idempotency",
    ],
    forbidden: [
      "raw provider token/reference/response",
      "backend provider live call",
      "Wallet mutation",
      "payment capture",
      "DB write",
      "gift ledger commit inside 199D",
      "fake payment success",
      "fake gift send success",
      "available balance release",
      "payout execution",
    ],
    localCheck: [
      "node .\\tools\\stream-gifts-ledger-199d-real-payment-authorization-adapter-check.js --i-approve-199d-real-payment-authorization-adapter-check",
    ],
    nextStage: "199E uses the accepted providerAuthorizationReferenceHash to call 198K send-intent commit guard." as const,
  };
}

export function createStreamGiftLedgerRealPaymentAuthorizationAdapterNextRequest199D() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION,
    status: "next_stage_requires_199e_real_provider_authorized_gift_send_commit",
    nextStage: "199E_gift_send_real_provider_authorization_commit" as const,
    allowedNext: [
      "submit providerAuthorizationReferenceHash into 198K send-intent commit path",
      "commit ledger rows only after provider hash + explicit runtime flags",
      "emit realtime only after post-commit inspection",
    ],
    stillForbidden: [
      "raw provider token/reference output",
      "fake payment authorization success",
      "gift ledger commit without providerAuthorizationReferenceHash",
      "available balance release before settlement gates",
      "payout execution",
    ],
    providerLiveCallExecuted: false,
    paymentAuthorizationCompletedByBackend: false,
    giftSendCommitted: false,
  };
}

export function assertStreamGiftLedgerRealPaymentAuthorizationAdapter199DRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_SAFETY;
  const unsafe = [
    safety.envFileReadAllowedNow,
    safety.envValueReadAllowedNow,
    safety.rawSecretAccepted,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawPaymentTokenAccepted,
    safety.rawPurchaseTokenAccepted,
    safety.rawProviderResponseAccepted,
    safety.providerBindingAllowedNow,
    safety.providerLiveCallAllowedNow,
    safety.providerAuthorizationCallAllowedNow,
    safety.providerPayoutCallAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
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
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-199D unsafe runtime flag detected");
  }
}
