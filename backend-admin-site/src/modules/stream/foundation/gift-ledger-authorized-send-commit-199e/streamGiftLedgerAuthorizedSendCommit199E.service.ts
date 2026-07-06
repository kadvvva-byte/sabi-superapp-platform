import type { PrismaClient } from "@prisma/client";
import {
  createStreamGiftLedgerDbCommit198K,
  normalizeStreamGiftLedgerDbBackedInput198K,
} from "../gift-ledger-db-backed-198k/streamGiftLedgerDbBacked198K.service";
import {
  acceptStreamGiftLedgerRealPaymentAuthorizationHashOnly199D,
  normalizeStreamGiftLedgerRealPaymentAuthorizationAdapterInput199D,
} from "../gift-ledger-real-payment-authorization-adapter-199d/streamGiftLedgerRealPaymentAuthorizationAdapter199D.service";
import type {
  StreamGiftLedgerRealPaymentAuthorizationAdapterResult199D,
  StreamGiftLedgerRealPaymentAuthorizationEnvelope199D,
} from "../gift-ledger-real-payment-authorization-adapter-199d/streamGiftLedgerRealPaymentAuthorizationAdapter199D.types";
import {
  STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
  type StreamGiftLedgerAuthorizedSendCommitBlocked199E,
  type StreamGiftLedgerAuthorizedSendCommitInput199E,
  type StreamGiftLedgerAuthorizedSendCommitReadiness199E,
  type StreamGiftLedgerAuthorizedSendCommitResult199E,
  type StreamGiftLedgerAuthorizedSendCommitSafety199E,
} from "./streamGiftLedgerAuthorizedSendCommit199E.types";

export const STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_APPROVAL =
  "STREAM_GIFT_LEDGER_199E_PROVIDER_AUTHORIZED_LEDGER_COMMIT_APPROVED" as const;

export const STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY: StreamGiftLedgerAuthorizedSendCommitSafety199E = Object.freeze({
  dbReadAllowedNow: true,
  dbWriteAllowedOnlyThrough198KGuard: true,
  providerReferenceHashRequired: true,
  providerLiveCallAllowedNow: false,
  providerAuthorizationCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentCaptureAllowedNow: false,
  payoutExecutionAllowedNow: false,
  realtimeEmitAllowedNow: false,
  availableBalanceReleaseAllowedNow: false,
  rawProviderTokenAccepted: false,
  rawProviderReferenceAccepted: false,
  rawProviderResponseAccepted: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSendSuccessAllowed: false,
  fakeAvailableBalanceAllowed: false,
});

function clean(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function blocked199E(
  code: StreamGiftLedgerAuthorizedSendCommitBlocked199E["code"],
  blockedReason: string,
  extra: Partial<Pick<StreamGiftLedgerAuthorizedSendCommitBlocked199E, "paymentAuthorization" | "acceptedEnvelope" | "ledgerResult">> = {},
): StreamGiftLedgerAuthorizedSendCommitBlocked199E {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    status: "authorized_send_commit_blocked_without_fake_success",
    code,
    blockedReason,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    walletMutationExecuted: false,
    giftSendCommitted: false,
    fakeGiftSendSuccess: false,
    safety: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY,
    ...extra,
  };
}

function isSha256Hex64(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/i.test(value.trim());
}

function normalizePaymentAuthorizationRecord199E(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) return value as Record<string, unknown>;
  return {};
}

function normalizeEnvelopeTo198KInput199E(envelope: StreamGiftLedgerRealPaymentAuthorizationEnvelope199D): Record<string, unknown> {
  const request = envelope.request;
  return {
    context: request.context,
    senderUserId: request.senderUserId,
    receiverUserId: request.receiverUserId,
    giftKey: request.giftKey,
    giftCatalogItemId: request.giftCatalogItemId,
    roomId: request.roomId,
    conversationId: request.conversationId,
    quantity: request.quantity,
    idempotencyKey: request.idempotencyKey,
    providerReferenceHash: envelope.providerAuthorizationReferenceHash,
  };
}

export function normalizeStreamGiftLedgerAuthorizedSendCommitInput199E(
  raw: Record<string, unknown>,
): StreamGiftLedgerAuthorizedSendCommitInput199E {
  return {
    commitApproval: clean(raw.commitApproval),
    requestedBundle: clean(raw.requestedBundle) === "stream_gifts_provider_authorized_ledger_commit"
      ? "stream_gifts_provider_authorized_ledger_commit"
      : "disabled",
    paymentAuthorization: normalizePaymentAuthorizationRecord199E(raw.paymentAuthorization ?? raw.authorization ?? raw),
  };
}

export function getStreamGiftLedgerAuthorizedSendCommitReadiness199E(): StreamGiftLedgerAuthorizedSendCommitReadiness199E {
  assertStreamGiftLedgerAuthorizedSendCommit199ERemainsSafe();
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    status: "ready_for_provider_authorized_ledger_commit_boundary",
    requiredPreviousStages: [
      "199D_real_payment_authorization_adapter_owner_local_hash_only_clean",
      "198K_db_backed_ledger_service_clean",
    ],
    commitTarget: "198K_createStreamGiftLedgerDbCommit198K",
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    safety: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY,
  };
}

export function getStreamGiftLedgerAuthorizedSendCommitContract199E() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    contract: "stream.gift.provider_authorized_ledger_commit.v1" as const,
    exactCommitApprovalPhrase: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_APPROVAL,
    requiredInput: {
      requestedBundle: "stream_gifts_provider_authorized_ledger_commit",
      paymentAuthorization: "199D hash-only authorization payload or envelope input",
      providerAuthorizationReferenceHash: "sha256 hex 64 only",
    },
    commitTarget: "198K createStreamGiftLedgerDbCommit198K",
    requiredRuntimeFlagsBeforeWrite: [
      "STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=true",
      "STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=verified_reference",
    ],
    forbidden: [
      "raw provider token/reference/response",
      "backend provider live authorization call",
      "Wallet mutation",
      "payment capture",
      "fake payment success",
      "fake gift send success",
      "available balance release before settlement gates",
      "payout execution",
    ],
    nextStages: [
      "198P post-commit inspection",
      "198Q realtime delivery preview",
      "198R guarded realtime runtime binding only if explicitly enabled",
    ] as const,
    safety: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY,
  };
}


function isBlocked199E(
  value: StreamGiftLedgerRealPaymentAuthorizationEnvelope199D | StreamGiftLedgerAuthorizedSendCommitBlocked199E,
): value is StreamGiftLedgerAuthorizedSendCommitBlocked199E {
  return "ok" in value && value.ok === false;
}

function verifyAcceptedAuthorizationMatchesRequest199E(result: StreamGiftLedgerRealPaymentAuthorizationAdapterResult199D): StreamGiftLedgerRealPaymentAuthorizationEnvelope199D | StreamGiftLedgerAuthorizedSendCommitBlocked199E {
  if (!result.ok) {
    return blocked199E("payment_authorization_blocked", "199D payment authorization hash-only adapter did not accept the payload.", { paymentAuthorization: result });
  }
  const envelope = result.envelope;
  if (!isSha256Hex64(envelope.providerAuthorizationReferenceHash)) {
    return blocked199E("provider_authorization_hash_required", "Accepted authorization envelope is missing a sha256 hex providerAuthorizationReferenceHash.", { acceptedEnvelope: envelope });
  }
  if (envelope.providerAuthorizationAmountDiamondMicros !== envelope.request.diamondMicros) {
    return blocked199E("provider_authorization_amount_mismatch", "Accepted authorization amount must exactly match request diamondMicros.", { acceptedEnvelope: envelope });
  }
  return envelope;
}

export async function commitStreamGiftLedgerProviderAuthorizedSend199E(
  prisma: PrismaClient,
  input: StreamGiftLedgerAuthorizedSendCommitInput199E,
): Promise<StreamGiftLedgerAuthorizedSendCommitResult199E> {
  assertStreamGiftLedgerAuthorizedSendCommit199ERemainsSafe();
  if (input.commitApproval !== STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_APPROVAL) {
    return blocked199E("commit_approval_required", "Exact 199E commit approval phrase is required before passing hash-only authorization into 198K ledger commit.");
  }
  if (input.requestedBundle !== "stream_gifts_provider_authorized_ledger_commit") {
    return blocked199E("requested_bundle_disabled", "199E only accepts stream_gifts_provider_authorized_ledger_commit requests.");
  }

  const normalizedAuthorization = normalizeStreamGiftLedgerRealPaymentAuthorizationAdapterInput199D(input.paymentAuthorization);
  const authorizationResult = acceptStreamGiftLedgerRealPaymentAuthorizationHashOnly199D(normalizedAuthorization, input.paymentAuthorization);
  const envelopeOrBlocked = verifyAcceptedAuthorizationMatchesRequest199E(authorizationResult);
  if (isBlocked199E(envelopeOrBlocked)) return envelopeOrBlocked;
  const envelope = envelopeOrBlocked;

  const commitInput = normalizeStreamGiftLedgerDbBackedInput198K(normalizeEnvelopeTo198KInput199E(envelope));
  const ledgerResult = await createStreamGiftLedgerDbCommit198K(prisma, commitInput);
  if (!ledgerResult.ok) {
    return blocked199E("198k_commit_guard_blocked", "198K ledger commit guard blocked the write; no fake gift success was returned.", {
      acceptedEnvelope: envelope,
      ledgerResult,
    });
  }

  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    status: "provider_authorized_ledger_committed",
    paymentAuthorization: envelope,
    ledgerCommit: ledgerResult,
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    availableBalanceReleased: false,
    payoutExecuted: false,
    fakePaymentSuccess: false,
    fakeGiftSendSuccess: false,
    fakeAvailableBalance: false,
    nextStages: [
      "198P_post_commit_inspection",
      "198Q_realtime_delivery_preview",
      "198R_guarded_realtime_runtime_binding_if_enabled",
    ],
    safety: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY,
  };
}

export function getStreamGiftLedgerAuthorizedSendCommitRunbook199E() {
  return {
    ok: true,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    purpose: "Commit the 198K gift ledger only after a 199D hash-only provider authorization envelope is accepted.",
    exactCommitApproval: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_APPROVAL,
    localRuntimeFlagsRequiredBeforeRealWrite: [
      "$env:STREAM_GIFT_LEDGER_DB_WRITE_ENABLED=\"true\"",
      "$env:STREAM_GIFT_LEDGER_PROVIDER_AUTH_MODE=\"verified_reference\"",
    ],
    endpoint: "POST /api/stream/gifts/ledger/199e/authorized-send-intent",
    stillForbidden: [
      "raw provider material",
      "backend provider live call",
      "Wallet mutation",
      "payment capture",
      "fake payment success",
      "fake gift send success",
      "available balance release",
      "payout execution",
    ],
    nextStage: "199F runtime post-commit smoke + realtime delivery production verification" as const,
  };
}

export function createStreamGiftLedgerAuthorizedSendCommitNextRequest199E() {
  return {
    ok: false,
    version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION,
    status: "next_stage_requires_199f_post_commit_runtime_smoke",
    allowedNext: [
      "inspect committed send intent through 198P",
      "build delivery preview through 198Q",
      "emit realtime only through 198R explicit delivery flags",
    ],
    stillForbidden: [
      "provider live call inside 199E",
      "Wallet mutation inside 199E",
      "available balance release before 198U settlement gates",
      "payout execution before creator payout provider path",
      "fake delivered/fake success flags",
    ],
    providerLiveCallExecuted: false,
    paymentCaptureExecuted: false,
    walletMutationExecuted: false,
    realtimeEmitExecuted: false,
    payoutExecuted: false,
  };
}

export function assertStreamGiftLedgerAuthorizedSendCommit199ERemainsSafe(): void {
  const safety = STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_SAFETY;
  const unsafe = [
    safety.providerLiveCallAllowedNow,
    safety.providerAuthorizationCallAllowedNow,
    safety.walletMutationAllowedNow,
    safety.paymentCaptureAllowedNow,
    safety.payoutExecutionAllowedNow,
    safety.realtimeEmitAllowedNow,
    safety.availableBalanceReleaseAllowedNow,
    safety.rawProviderTokenAccepted,
    safety.rawProviderReferenceAccepted,
    safety.rawProviderResponseAccepted,
    safety.fakePaymentSuccessAllowed,
    safety.fakeGiftSendSuccessAllowed,
    safety.fakeAvailableBalanceAllowed,
  ];
  if (unsafe.some(Boolean)) {
    throw new Error("BACKEND-STREAM-GIFTS-LEDGER-199E unsafe runtime flag detected");
  }
}
