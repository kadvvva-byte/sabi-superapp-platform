import {
  STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG,
  STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG,
  createStreamFoundationMonetizationAdminConfigSnapshot,
  getStreamFoundationMonetizationConfigSafety,
} from "./streamFoundationMonetizationAdminConfig";
import { createStreamFoundationGiftLedgerPlan } from "./streamFoundationGiftLedgerPlanner";
import type {
  StreamFoundationGiftPaymentDecision,
  StreamFoundationGiftPaymentRequest,
  StreamFoundationMonetizationAdminConfigSnapshot,
} from "./streamFoundationMonetizationTypes";

export type StreamFoundationMonetizationCoverageSnapshot = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING";
  paymentAcceptanceConfigSeparated: true;
  monetizationPayoutConfigSeparated: true;
  walletLedgerConfigRequired: true;
  monthlyPayoutRuleImplemented: true;
  receiverPendingEarningsCounted: true;
  senderChargeRequiredBeforeGiftSuccess: true;
  providerKeysServerSideOnly: true;
  noMobileProviderKeys: true;
  noRawSecretReturn: true;
  noFakePaymentSuccess: true;
  noFakeGiftSuccess: true;
  noImmediatePayout: true;
  coveredGiftLedgerEntries: number;
}>;

export class StreamFoundationMonetizationService {
  constructor(private readonly config: StreamFoundationMonetizationAdminConfigSnapshot = STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG) {}

  static createSafeDisabled(): StreamFoundationMonetizationService {
    return new StreamFoundationMonetizationService(STREAM_FOUNDATION_MONETIZATION_SAFE_DISABLED_CONFIG);
  }

  static createReadyPreview(): StreamFoundationMonetizationService {
    return new StreamFoundationMonetizationService(STREAM_FOUNDATION_MONETIZATION_READY_PREVIEW_CONFIG);
  }

  static fromAdminConfig(input: Parameters<typeof createStreamFoundationMonetizationAdminConfigSnapshot>[0]): StreamFoundationMonetizationService {
    return new StreamFoundationMonetizationService(createStreamFoundationMonetizationAdminConfigSnapshot(input));
  }

  getAdminConfigSnapshot(): StreamFoundationMonetizationAdminConfigSnapshot {
    return this.config;
  }

  planGiftPayment(request: StreamFoundationGiftPaymentRequest): StreamFoundationGiftPaymentDecision {
    return createStreamFoundationGiftLedgerPlan(request, this.config);
  }

  getCoverageSnapshot(): StreamFoundationMonetizationCoverageSnapshot {
    const preview = this.planGiftPayment({
      requestId: "coverage-request",
      idempotencyKey: "coverage-idempotency-key",
      senderUserId: "sender-user",
      recipientUserId: "recipient-user",
      streamRoomId: "stream-room",
      giftSku: "gift-basic",
      coinAmount: 100,
      paymentRail: "sabi_coin_wallet",
    });

    return {
      stage: "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
      paymentAcceptanceConfigSeparated: true,
      monetizationPayoutConfigSeparated: true,
      walletLedgerConfigRequired: true,
      monthlyPayoutRuleImplemented: true,
      receiverPendingEarningsCounted: true,
      senderChargeRequiredBeforeGiftSuccess: true,
      providerKeysServerSideOnly: true,
      noMobileProviderKeys: true,
      noRawSecretReturn: true,
      noFakePaymentSuccess: true,
      noFakeGiftSuccess: true,
      noImmediatePayout: true,
      coveredGiftLedgerEntries: preview.ledgerEntries.length,
    };
  }

  getSafetySnapshot() {
    return getStreamFoundationMonetizationConfigSafety();
  }
}
