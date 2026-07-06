import {
  STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
  type StreamGiftLedgerProviderAuthorizationBlocked198N,
  type StreamGiftLedgerProviderAuthorizationContext198N,
  type StreamGiftLedgerProviderAuthorizationContractInput198N,
  type StreamGiftLedgerProviderAuthorizationContractSafety198N,
  type StreamGiftLedgerProviderAuthorizationKind198N,
  type StreamGiftLedgerProviderAuthorizationNextRequest198N,
  type StreamGiftLedgerProviderAuthorizationNormalized198N,
  type StreamGiftLedgerProviderAuthorizationReadiness198N,
} from "./streamGiftLedgerProviderAuthorizationContract198N.types";

export const STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_SAFETY: StreamGiftLedgerProviderAuthorizationContractSafety198N = Object.freeze({
  apiDbWriteAllowed: false,
  localRunnerDbWriteAllowed: false,
  providerCallAllowed: false,
  walletMutationAllowed: false,
  paymentCaptureAllowed: false,
  payoutAllowed: false,
  realtimeEmitAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
  rawProviderTokenAccepted: false,
  rawProviderTokenOutputAllowed: false,
  hashOnlyReferenceRequired: true,
});

export const STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_ACCEPTED_KINDS = [
  "wallet_authorization",
  "payment_provider_authorization",
  "admin_replay_verified_reference",
] as const satisfies readonly StreamGiftLedgerProviderAuthorizationKind198N[];

function cleanText(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined;
}

function requireText(value: unknown, code: StreamGiftLedgerProviderAuthorizationBlocked198N["code"]): string {
  const normalized = cleanText(value);
  if (!normalized) throw new Error(code);
  return normalized;
}

function toContext(value: unknown): StreamGiftLedgerProviderAuthorizationContext198N {
  const normalized = cleanText(value);
  if (normalized === "messenger" || normalized === "shorts" || normalized === "creator_profile") return normalized;
  return "stream_live";
}

function toAuthorizationKind(value: unknown): StreamGiftLedgerProviderAuthorizationKind198N {
  const normalized = cleanText(value);
  if (
    normalized === "wallet_authorization" ||
    normalized === "payment_provider_authorization" ||
    normalized === "admin_replay_verified_reference"
  ) {
    return normalized;
  }
  return "payment_provider_authorization";
}

function toQuantity(value: unknown): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) return 1;
  return Math.min(value, 999);
}

function containsRawProviderMaterial(input: Record<string, unknown>): boolean {
  const forbiddenKeys = [
    "providerReference",
    "providerToken",
    "paymentToken",
    "purchaseToken",
    "authorizationCode",
    "rawProviderResponse",
    "secret",
  ];
  return forbiddenKeys.some((key) => cleanText(input[key]) !== undefined);
}

function isSha256Hex64(value: string): boolean {
  return /^[a-f0-9]{64}$/i.test(value);
}

export function createBlockedStreamGiftLedgerProviderAuthorization198N(
  code: StreamGiftLedgerProviderAuthorizationBlocked198N["code"],
): StreamGiftLedgerProviderAuthorizationBlocked198N {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
    status: "blocked_without_mutation",
    code,
    requiredBeforeCommit: [
      "A server-side Wallet/payment provider authorization must already exist outside this contract route.",
      "Only providerReferenceHash is accepted here; raw provider tokens/references are rejected.",
      "providerReferenceHash must be 64-character sha256 hex.",
      "198K send-intent commit still requires STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=true and STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=verified_reference.",
      "Receiver available balance remains locked until settlement gates pass.",
    ],
  };
}

export function normalizeStreamGiftLedgerProviderAuthorizationContract198N(
  input: Record<string, unknown>,
): StreamGiftLedgerProviderAuthorizationContractInput198N {
  if (containsRawProviderMaterial(input)) throw new Error("raw_provider_token_rejected");

  const providerReferenceHash = requireText(input.providerReferenceHash, "provider_reference_hash_required").toLowerCase();
  if (!isSha256Hex64(providerReferenceHash)) throw new Error("provider_reference_hash_must_be_sha256_hex");

  const giftKey = cleanText(input.giftKey);
  const giftCatalogItemId = cleanText(input.giftCatalogItemId);
  if (!giftKey && !giftCatalogItemId) throw new Error("send_intent_required_field_missing");

  return {
    context: toContext(input.context),
    authorizationKind: toAuthorizationKind(input.authorizationKind),
    providerReferenceHash,
    providerName: cleanText(input.providerName),
    senderUserId: requireText(input.senderUserId, "send_intent_required_field_missing"),
    receiverUserId: requireText(input.receiverUserId, "send_intent_required_field_missing"),
    giftKey,
    giftCatalogItemId,
    roomId: cleanText(input.roomId),
    conversationId: cleanText(input.conversationId),
    quantity: toQuantity(input.quantity),
    idempotencyKey: requireText(input.idempotencyKey, "send_intent_required_field_missing"),
  };
}

export function createStreamGiftLedgerProviderAuthorizationContract198N(
  input: StreamGiftLedgerProviderAuthorizationContractInput198N,
): StreamGiftLedgerProviderAuthorizationNormalized198N {
  const body = {
    context: input.context,
    senderUserId: input.senderUserId,
    receiverUserId: input.receiverUserId,
    giftKey: input.giftKey,
    giftCatalogItemId: input.giftCatalogItemId,
    roomId: input.roomId,
    conversationId: input.conversationId,
    quantity: input.quantity,
    idempotencyKey: input.idempotencyKey,
    providerReferenceHash: input.providerReferenceHash,
  };

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
    mode: "provider_authorization_contract_verified_hash_only",
    context: input.context,
    authorizationKind: input.authorizationKind,
    providerName: input.providerName ?? "server_verified_provider_reference",
    providerReferenceHashAccepted: true,
    providerReferenceHashShape: "sha256_hex_64",
    rawProviderReferenceStored: false,
    rawProviderTokenAccepted: false,
    commitTarget: "POST /api/stream/gifts/ledger/198k/send-intent",
    commitRequires: [
      "Prisma migration already applied",
      "Prisma client generated after schema write",
      "Canonical catalog seeded",
      "providerReferenceHash belongs to a previously verified server-side authorization",
      "STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=true",
      "STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=verified_reference",
      "No raw provider token is stored or returned by this contract",
    ],
    forwardedSendIntentBody: body,
  };
}

export function getStreamGiftLedgerProviderAuthorizationReadiness198N(): StreamGiftLedgerProviderAuthorizationReadiness198N {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
    status: "provider_authorization_contract_ready_hash_only_no_runtime_call",
    safety: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_SAFETY,
    acceptedAuthorizationKinds: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_ACCEPTED_KINDS,
    endpoints: [
      "GET /api/admin/stream/gifts/ledger/198n/readiness",
      "GET /api/admin/stream/gifts/ledger/198n/runbook",
      "POST /api/stream/gifts/ledger/198n/provider-authorization-contract",
      "POST /api/admin/stream/gifts/ledger/198n/next-provider-authorized-commit-request",
    ],
    localRunner: "tools/stream-gifts-ledger-198n-provider-authorization-contract-check.js",
    commitBoundary: [
      "198N validates contract shape only and never writes DB from API.",
      "198K remains the only DB-backed send-intent commit route.",
      "A real commit needs verified providerReferenceHash plus explicit 198K DB-write env flags.",
      "No Wallet mutation, provider call, payment capture, payout, realtime event, or fake success is enabled in 198N.",
    ],
    next: "198O_provider_authorized_commit_smoke_owner_local",
  };
}

export function getStreamGiftLedgerProviderAuthorizationRunbook198N(): Readonly<Record<string, unknown>> {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
    purpose: "Prepare the exact hash-only provider authorization contract required before DB-backed ledger commit.",
    requiredSequence: [
      "Provider/Wallet authorization is verified by a separate server-side provider flow.",
      "Only a sha256 providerReferenceHash is forwarded into gift ledger.",
      "198N validates the contract without DB write.",
      "198K send-intent may commit only when explicit DB-write env flags are enabled.",
      "Settlement gates keep receiver funds pending; available balance and payout remain blocked.",
    ],
    localCheck: [
      "node .\\tools\\stream-gifts-ledger-198n-provider-authorization-contract-check.js --i-approve-provider-authorization-contract-check",
    ],
    forbidden: [
      "raw provider token intake",
      "raw provider reference output",
      "provider API call",
      "Wallet mutation",
      "payment capture",
      "payout",
      "realtime gift delivered event",
      "fake gift send success",
      "fake available balance",
    ],
  };
}

export function createStreamGiftLedgerProviderAuthorizedCommitRequest198N(): StreamGiftLedgerProviderAuthorizationNextRequest198N {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION,
    nextStage: "198O_provider_authorized_commit_smoke_owner_local",
    allowedNext: [
      "owner-local provider-authorized commit smoke using 198K route/service",
      "DB write only with explicit owner approval and verified providerReferenceHash",
      "append-only send intent + ledger + pending earning + settlement gates",
      "post-commit inspection route for ledger rows",
    ],
    stillForbidden: [
      "provider call inside gift ledger",
      "Wallet mutation inside gift ledger",
      "raw secret/token/reference output",
      "available balance release before settlement gates",
      "payout execution",
      "mobile fake send success",
    ],
  };
}

export function assertStreamGiftLedgerProviderAuthorization198NRemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_SAFETY;
  const unsafe = [
    safety.apiDbWriteAllowed,
    safety.localRunnerDbWriteAllowed,
    safety.providerCallAllowed,
    safety.walletMutationAllowed,
    safety.paymentCaptureAllowed,
    safety.payoutAllowed,
    safety.realtimeEmitAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
    safety.rawProviderTokenAccepted,
    safety.rawProviderTokenOutputAllowed,
  ].some(Boolean);
  if (unsafe || !safety.hashOnlyReferenceRequired) throw new Error("STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_UNSAFE_FLAG");
}
