import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { StreamFoundationMonetizationService } from "./monetization";

export const STREAM_136P_BACKEND_FOUNDATION_PAYMENT_MONETIZATION_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-136P" as const;

export function getStream136PBackendFoundationPaymentMonetizationStagingManifest() {
  const safeDisabledService = StreamFoundationMonetizationService.createSafeDisabled();
  const readyPreviewService = StreamFoundationMonetizationService.createReadyPreview();
  const safeDisabledDecision = safeDisabledService.planGiftPayment({
    requestId: "stream-136p-safe-disabled-gift-request",
    idempotencyKey: "stream-136p-safe-disabled-idempotency",
    senderUserId: "sender-user-preview",
    recipientUserId: "recipient-creator-preview",
    streamRoomId: "stream-room-preview",
    giftSku: "gift-basic-preview",
    coinAmount: 100,
    paymentRail: "sabi_coin_wallet",
  });
  const readyPreviewDecision = readyPreviewService.planGiftPayment({
    requestId: "stream-136p-ready-preview-gift-request",
    idempotencyKey: "stream-136p-ready-preview-idempotency",
    senderUserId: "sender-user-preview",
    recipientUserId: "recipient-creator-preview",
    streamRoomId: "stream-room-preview",
    giftSku: "gift-basic-preview",
    coinAmount: 100,
    paymentRail: "sabi_coin_wallet",
  });

  return {
    version: STREAM_136P_BACKEND_FOUNDATION_PAYMENT_MONETIZATION_STAGING_VERSION,
    stage: "local_staging_only",
    purpose: "Add Stream gifts/payment/monetization foundation now, connected through Wallet/payment/admin config contracts without fake money movement.",
    orderCorrection: {
      monetizationMovedFromLastStageToCurrentFoundation: true,
      reason: "Stream gifts must count recipient earnings and support monthly payouts from the beginning of backend foundation design.",
    },
    architecture: [
      "Admin server-side payment acceptance provider config",
      "Admin server-side monetization payout provider config",
      "Wallet/COIN ledger gate",
      "Gift send request validation",
      "Sender charge/debit required before success",
      "Recipient pending earnings ledger credit plan",
      "Monthly payout reserve and payout batch rule",
      "Safe response when provider/wallet/payout config is missing",
    ] as const,
    safeDisabledDecision,
    readyPreviewDecision,
    coverage: readyPreviewService.getCoverageSnapshot(),
    safety: {
      ...STREAM_FOUNDATION_SAFE_SNAPSHOT,
      routeMountAllowedNow: false,
      runtimeExecutionAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      giftsPaymentsRuntimeMutationAllowedNow: false,
      fakePaymentAllowed: false,
      fakeGiftAllowed: false,
      secretMaterialAllowedInResponse: false,
    },
    changedRuntime: {
      appServerTouched: false,
      routeMounted: false,
      prismaSchemaChanged: false,
      databaseWrite: false,
      providerCall: false,
      walletMutation: false,
      payoutExecuted: false,
    },
  } as const;
}
