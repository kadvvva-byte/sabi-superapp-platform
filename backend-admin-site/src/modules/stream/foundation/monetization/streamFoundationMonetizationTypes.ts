import type { StreamFoundationSafetySnapshot } from "../core";

export type StreamFoundationMonetizationStage = "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING";

export type StreamFoundationPaymentRail =
  | "sabi_coin_wallet"
  | "external_card_acquirer"
  | "alipay_plus_provider"
  | "bank_provider"
  | "manual_provider_review";

export type StreamFoundationMonetizationConfigStatus =
  | "ready"
  | "disabled"
  | "provider_not_configured"
  | "wallet_ledger_not_configured"
  | "monetization_not_configured"
  | "compliance_review_required";

export type StreamFoundationPaymentProviderPurpose =
  | "accept_stream_gift_payment"
  | "creator_monetization_payout"
  | "wallet_coin_ledger"
  | "merchant_admin_settlement";

export type StreamFoundationServerSecretReference = Readonly<{
  providerKeyRef: string;
  purpose: StreamFoundationPaymentProviderPurpose;
  configured: boolean;
  enabled: boolean;
  serverSideOnly: true;
  rawSecretReturned: false;
  mobileSecretAllowed: false;
}>;

export type StreamFoundationMonetizationAdminConfigSnapshot = Readonly<{
  stage: StreamFoundationMonetizationStage;
  acceptPaymentProvider: StreamFoundationServerSecretReference;
  monetizationPayoutProvider: StreamFoundationServerSecretReference;
  walletCoinLedgerProvider: StreamFoundationServerSecretReference;
  merchantSettlementProvider: StreamFoundationServerSecretReference;
  platformFeeBpsConfigured: boolean;
  platformFeeBps: number;
  monthlyPayoutDayOfMonth: number;
  payoutOncePerMonth: true;
  minPayoutCoinAmount: number;
  receiverEarningsLedgerEnabled: boolean;
  senderChargeLedgerEnabled: boolean;
  complianceHoldDays: number;
  status: StreamFoundationMonetizationConfigStatus;
  adminConfigRequiredBeforeExecution: boolean;
  providerLiveTestRequiredBeforeExecution: boolean;
  secretValuesReturned: false;
  mobileReceivesProviderKeys: false;
}>;

export type StreamFoundationGiftPaymentRequest = Readonly<{
  requestId: string;
  idempotencyKey: string;
  senderUserId: string;
  recipientUserId: string;
  streamRoomId: string;
  giftSku: string;
  coinAmount: number;
  paymentRail: StreamFoundationPaymentRail;
  clientCreatedAt?: string;
}>;

export type StreamFoundationGiftLedgerEntryKind =
  | "sender_payment_authorization_required"
  | "sender_wallet_debit_required"
  | "platform_fee_receivable"
  | "recipient_pending_earning_credit"
  | "recipient_monthly_payout_reserve"
  | "provider_settlement_reference_required";

export type StreamFoundationGiftLedgerEntry = Readonly<{
  entryKey: string;
  kind: StreamFoundationGiftLedgerEntryKind;
  ownerUserId?: string;
  streamRoomId: string;
  giftSku: string;
  coinAmount: number;
  direction: "debit" | "credit" | "hold" | "reference";
  visibleToRecipientEarnings: boolean;
  payoutEligible: boolean;
  payoutBlockedUntilMonthlyCycle: boolean;
  databaseWriteAllowedNow: false;
  moneyMovementAllowedNow: false;
  providerCallAllowedNow: false;
}>;

export type StreamFoundationGiftPaymentDecisionCode =
  | "gift_payment_ready_for_real_execution_when_mounted"
  | "gift_payment_blocked_invalid_request"
  | "gift_payment_blocked_admin_config_required"
  | "gift_payment_blocked_provider_not_configured"
  | "gift_payment_blocked_wallet_ledger_not_configured"
  | "gift_payment_blocked_monetization_payout_not_configured"
  | "gift_payment_blocked_compliance_review_required";

export type StreamFoundationMonthlyPayoutPlan = Readonly<{
  payoutOncePerMonth: true;
  monthlyPayoutDayOfMonth: number;
  receiverUserId: string;
  pendingCoinAmount: number;
  availableBeforeMonthlyPayoutNow: false;
  nextPayoutRequiresKycOrCreatorApproval: true;
  payoutBatchRequired: true;
  providerPayoutCallAllowedNow: false;
  databaseWriteAllowedNow: false;
}>;

export type StreamFoundationGiftPaymentDecision = Readonly<{
  stage: StreamFoundationMonetizationStage;
  ok: boolean;
  decisionCode: StreamFoundationGiftPaymentDecisionCode;
  safeMessageKey: string;
  requestPreview: Readonly<{
    requestId: string;
    senderUserId: string;
    recipientUserId: string;
    streamRoomId: string;
    giftSku: string;
    coinAmount: number;
    paymentRail: StreamFoundationPaymentRail;
  }>;
  configStatus: StreamFoundationMonetizationConfigStatus;
  ledgerEntries: readonly StreamFoundationGiftLedgerEntry[];
  recipientPendingEarningCoinAmount: number;
  platformFeeCoinAmount: number;
  recipientNetCoinAmount: number;
  monthlyPayoutPlan?: StreamFoundationMonthlyPayoutPlan;
  paymentProviderCallAllowedNow: false;
  walletDebitAllowedNow: false;
  receiverLedgerCreditAllowedNow: false;
  payoutAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  rawProviderSecretReturned: false;
  safety: StreamFoundationSafetySnapshot;
}>;
