import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type {
  StreamFoundationGiftLedgerEntry,
  StreamFoundationGiftPaymentDecision,
  StreamFoundationGiftPaymentDecisionCode,
  StreamFoundationGiftPaymentRequest,
  StreamFoundationMonetizationAdminConfigSnapshot,
} from "./streamFoundationMonetizationTypes";

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function entry(input: Omit<StreamFoundationGiftLedgerEntry,
  | "databaseWriteAllowedNow"
  | "moneyMovementAllowedNow"
  | "providerCallAllowedNow"
>): StreamFoundationGiftLedgerEntry {
  return {
    ...input,
    databaseWriteAllowedNow: false,
    moneyMovementAllowedNow: false,
    providerCallAllowedNow: false,
  };
}

function decisionCodeForConfig(config: StreamFoundationMonetizationAdminConfigSnapshot): StreamFoundationGiftPaymentDecisionCode {
  if (config.status === "wallet_ledger_not_configured") return "gift_payment_blocked_wallet_ledger_not_configured";
  if (config.status === "monetization_not_configured") return "gift_payment_blocked_monetization_payout_not_configured";
  if (config.status === "provider_not_configured") return "gift_payment_blocked_provider_not_configured";
  if (config.status === "compliance_review_required") return "gift_payment_blocked_compliance_review_required";
  if (config.status === "disabled") return "gift_payment_blocked_admin_config_required";
  return "gift_payment_ready_for_real_execution_when_mounted";
}

function messageKeyForDecision(code: StreamFoundationGiftPaymentDecisionCode): string {
  switch (code) {
    case "gift_payment_ready_for_real_execution_when_mounted":
      return "stream.monetization.gift.ready_for_real_execution_when_mounted";
    case "gift_payment_blocked_invalid_request":
      return "stream.monetization.gift.invalid_request";
    case "gift_payment_blocked_wallet_ledger_not_configured":
      return "stream.monetization.gift.wallet_ledger_not_configured";
    case "gift_payment_blocked_monetization_payout_not_configured":
      return "stream.monetization.gift.payout_provider_not_configured";
    case "gift_payment_blocked_compliance_review_required":
      return "stream.monetization.gift.compliance_review_required";
    case "gift_payment_blocked_admin_config_required":
      return "stream.monetization.gift.admin_config_required";
    case "gift_payment_blocked_provider_not_configured":
    default:
      return "stream.monetization.gift.payment_provider_not_configured";
  }
}

function validRequest(request: StreamFoundationGiftPaymentRequest): boolean {
  return isNonEmpty(request.requestId)
    && isNonEmpty(request.idempotencyKey)
    && isNonEmpty(request.senderUserId)
    && isNonEmpty(request.recipientUserId)
    && isNonEmpty(request.streamRoomId)
    && isNonEmpty(request.giftSku)
    && request.senderUserId !== request.recipientUserId
    && Number.isFinite(request.coinAmount)
    && request.coinAmount > 0;
}

export function createStreamFoundationGiftLedgerPlan(
  request: StreamFoundationGiftPaymentRequest,
  config: StreamFoundationMonetizationAdminConfigSnapshot,
): StreamFoundationGiftPaymentDecision {
  const invalid = !validRequest(request);
  const platformFeeCoinAmount = invalid ? 0 : Math.floor((request.coinAmount * config.platformFeeBps) / 10000);
  const recipientNetCoinAmount = invalid ? 0 : Math.max(0, request.coinAmount - platformFeeCoinAmount);
  const readyCode = invalid ? "gift_payment_blocked_invalid_request" : decisionCodeForConfig(config);
  const ok = readyCode === "gift_payment_ready_for_real_execution_when_mounted";

  const ledgerEntries: readonly StreamFoundationGiftLedgerEntry[] = invalid
    ? []
    : [
      entry({
        entryKey: `${request.idempotencyKey}:sender:${request.senderUserId}`,
        kind: request.paymentRail === "sabi_coin_wallet" ? "sender_wallet_debit_required" : "sender_payment_authorization_required",
        ownerUserId: request.senderUserId,
        streamRoomId: request.streamRoomId,
        giftSku: request.giftSku,
        coinAmount: request.coinAmount,
        direction: "debit",
        visibleToRecipientEarnings: false,
        payoutEligible: false,
        payoutBlockedUntilMonthlyCycle: false,
      }),
      entry({
        entryKey: `${request.idempotencyKey}:fee:platform`,
        kind: "platform_fee_receivable",
        streamRoomId: request.streamRoomId,
        giftSku: request.giftSku,
        coinAmount: platformFeeCoinAmount,
        direction: "credit",
        visibleToRecipientEarnings: false,
        payoutEligible: false,
        payoutBlockedUntilMonthlyCycle: false,
      }),
      entry({
        entryKey: `${request.idempotencyKey}:earning:${request.recipientUserId}`,
        kind: "recipient_pending_earning_credit",
        ownerUserId: request.recipientUserId,
        streamRoomId: request.streamRoomId,
        giftSku: request.giftSku,
        coinAmount: recipientNetCoinAmount,
        direction: "credit",
        visibleToRecipientEarnings: true,
        payoutEligible: true,
        payoutBlockedUntilMonthlyCycle: true,
      }),
      entry({
        entryKey: `${request.idempotencyKey}:monthly-payout-reserve:${request.recipientUserId}`,
        kind: "recipient_monthly_payout_reserve",
        ownerUserId: request.recipientUserId,
        streamRoomId: request.streamRoomId,
        giftSku: request.giftSku,
        coinAmount: recipientNetCoinAmount,
        direction: "hold",
        visibleToRecipientEarnings: true,
        payoutEligible: false,
        payoutBlockedUntilMonthlyCycle: true,
      }),
      entry({
        entryKey: `${request.idempotencyKey}:provider-settlement-reference`,
        kind: "provider_settlement_reference_required",
        streamRoomId: request.streamRoomId,
        giftSku: request.giftSku,
        coinAmount: request.coinAmount,
        direction: "reference",
        visibleToRecipientEarnings: false,
        payoutEligible: false,
        payoutBlockedUntilMonthlyCycle: false,
      }),
    ];

  return {
    stage: "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
    ok,
    decisionCode: readyCode,
    safeMessageKey: messageKeyForDecision(readyCode),
    requestPreview: {
      requestId: request.requestId,
      senderUserId: request.senderUserId,
      recipientUserId: request.recipientUserId,
      streamRoomId: request.streamRoomId,
      giftSku: request.giftSku,
      coinAmount: request.coinAmount,
      paymentRail: request.paymentRail,
    },
    configStatus: config.status,
    ledgerEntries,
    recipientPendingEarningCoinAmount: recipientNetCoinAmount,
    platformFeeCoinAmount,
    recipientNetCoinAmount,
    monthlyPayoutPlan: invalid
      ? undefined
      : {
        payoutOncePerMonth: true,
        monthlyPayoutDayOfMonth: config.monthlyPayoutDayOfMonth,
        receiverUserId: request.recipientUserId,
        pendingCoinAmount: recipientNetCoinAmount,
        availableBeforeMonthlyPayoutNow: false,
        nextPayoutRequiresKycOrCreatorApproval: true,
        payoutBatchRequired: true,
        providerPayoutCallAllowedNow: false,
        databaseWriteAllowedNow: false,
      },
    paymentProviderCallAllowedNow: false,
    walletDebitAllowedNow: false,
    receiverLedgerCreditAllowedNow: false,
    payoutAllowedNow: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    rawProviderSecretReturned: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
