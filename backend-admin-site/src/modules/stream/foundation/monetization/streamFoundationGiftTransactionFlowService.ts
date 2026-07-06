import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { createStreamFoundationAdminMonetizationConfigDraft, STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG, STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG } from "./streamFoundationAdminMonetizationConfigContracts";
import type { StreamFoundationAdminMonetizationConfigDraft, StreamFoundationAdminMonetizationConfigInput } from "./streamFoundationAdminMonetizationConfigContracts";
import { validateStreamFoundationAdminMonetizationConfig } from "./streamFoundationAdminMonetizationConfigValidator";
import { createStreamFoundationGiftLedgerPlan } from "./streamFoundationGiftLedgerPlanner";
import { createStreamFoundationInMemoryMonetizationLedgerPreviewRepository } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import { createStreamFoundationMonetizationAdminConfigSnapshot } from "./streamFoundationMonetizationAdminConfig";
import type { StreamFoundationGiftPaymentDecision, StreamFoundationGiftPaymentRequest, StreamFoundationMonetizationAdminConfigSnapshot } from "./streamFoundationMonetizationTypes";
import type { StreamFoundationGiftTransactionFlowDecisionCode, StreamFoundationGiftTransactionFlowInput, StreamFoundationGiftTransactionFlowPlan, StreamFoundationGiftTransactionFlowStep, StreamFoundationGiftTransactionFlowStepStatus } from "./streamFoundationGiftTransactionFlowTypes";
import { STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE } from "./streamFoundationGiftTransactionFlowTypes";

function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

function requestIsValid(request: StreamFoundationGiftPaymentRequest): boolean {
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

function toMonetizationAdminSnapshot(config: StreamFoundationAdminMonetizationConfigDraft): StreamFoundationMonetizationAdminConfigSnapshot {
  return createStreamFoundationMonetizationAdminConfigSnapshot({
    acceptPaymentProviderConfigured: config.acceptPaymentProvider.configured,
    acceptPaymentProviderEnabled: config.acceptPaymentProvider.enabled && config.acceptPaymentProvider.liveTestPassed,
    monetizationPayoutProviderConfigured: config.monetizationPayoutProvider.configured,
    monetizationPayoutProviderEnabled: config.monetizationPayoutProvider.enabled && config.monetizationPayoutProvider.liveTestPassed,
    walletCoinLedgerConfigured: config.walletCoinLedgerProvider.configured,
    walletCoinLedgerEnabled: config.walletCoinLedgerProvider.enabled && config.walletCoinLedgerProvider.liveTestPassed,
    merchantSettlementProviderConfigured: config.platformSettlementProvider.configured,
    merchantSettlementProviderEnabled: config.platformSettlementProvider.enabled && config.platformSettlementProvider.liveTestPassed,
    platformFeeBps: config.policy.platformFeeConfigured ? config.policy.platformFeeBps : undefined,
    monthlyPayoutDayOfMonth: config.policy.monthlyPayoutDayOfMonth,
    minPayoutCoinAmount: config.policy.minPayoutCoinAmount,
    receiverEarningsLedgerEnabled: config.policy.receiverEarningsLedgerRequired,
    senderChargeLedgerEnabled: config.policy.senderChargeLedgerRequired,
    complianceHoldDays: config.policy.complianceHoldDays,
    complianceReviewRequired: false,
  });
}

function codeForDecision(validRequest: boolean, paymentDecision: StreamFoundationGiftPaymentDecision): StreamFoundationGiftTransactionFlowDecisionCode {
  if (!validRequest || paymentDecision.decisionCode === "gift_payment_blocked_invalid_request") return "gift_transaction_flow_blocked_invalid_request";
  if (paymentDecision.decisionCode === "gift_payment_blocked_wallet_ledger_not_configured") return "gift_transaction_flow_blocked_wallet_ledger_not_configured";
  if (paymentDecision.decisionCode === "gift_payment_blocked_monetization_payout_not_configured") return "gift_transaction_flow_blocked_monetization_payout_not_configured";
  if (paymentDecision.decisionCode === "gift_payment_blocked_compliance_review_required") return "gift_transaction_flow_blocked_compliance_review_required";
  if (paymentDecision.decisionCode === "gift_payment_blocked_provider_not_configured") return "gift_transaction_flow_blocked_provider_not_configured";
  if (paymentDecision.decisionCode === "gift_payment_blocked_admin_config_required") return "gift_transaction_flow_blocked_admin_config_required";
  return "gift_transaction_flow_ready_after_route_mount_approval";
}

function messageKeyForCode(code: StreamFoundationGiftTransactionFlowDecisionCode): string {
  switch (code) {
    case "gift_transaction_flow_ready_after_route_mount_approval":
      return "stream.monetization.gift_transaction.ready_after_route_mount_approval";
    case "gift_transaction_flow_blocked_invalid_request":
      return "stream.monetization.gift_transaction.invalid_request";
    case "gift_transaction_flow_blocked_wallet_ledger_not_configured":
      return "stream.monetization.gift_transaction.wallet_ledger_not_configured";
    case "gift_transaction_flow_blocked_monetization_payout_not_configured":
      return "stream.monetization.gift_transaction.payout_provider_not_configured";
    case "gift_transaction_flow_blocked_compliance_review_required":
      return "stream.monetization.gift_transaction.compliance_review_required";
    case "gift_transaction_flow_blocked_provider_not_configured":
      return "stream.monetization.gift_transaction.accept_payment_provider_not_configured";
    case "gift_transaction_flow_blocked_admin_config_required":
    default:
      return "stream.monetization.gift_transaction.admin_config_required";
  }
}

function statusForCode(code: StreamFoundationGiftTransactionFlowDecisionCode): StreamFoundationGiftTransactionFlowStepStatus {
  switch (code) {
    case "gift_transaction_flow_ready_after_route_mount_approval":
      return "ready_after_route_mount_approval";
    case "gift_transaction_flow_blocked_invalid_request":
      return "blocked_invalid_request";
    case "gift_transaction_flow_blocked_wallet_ledger_not_configured":
      return "blocked_wallet_ledger_not_configured";
    case "gift_transaction_flow_blocked_monetization_payout_not_configured":
      return "blocked_monetization_payout_not_configured";
    case "gift_transaction_flow_blocked_compliance_review_required":
      return "blocked_compliance_review_required";
    case "gift_transaction_flow_blocked_provider_not_configured":
      return "blocked_provider_not_configured";
    case "gift_transaction_flow_blocked_admin_config_required":
    default:
      return "blocked_admin_config_required";
  }
}

function step(input: Omit<StreamFoundationGiftTransactionFlowStep, "executedNow" | "routeMountAllowedNow" | "databaseWriteAllowedNow" | "providerCallAllowedNow" | "moneyMovementAllowedNow">): StreamFoundationGiftTransactionFlowStep {
  return {
    ...input,
    executedNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}

function createSteps(decisionCode: StreamFoundationGiftTransactionFlowDecisionCode, valid: boolean): readonly StreamFoundationGiftTransactionFlowStep[] {
  const flowStatus = statusForCode(decisionCode);
  const requestStatus: StreamFoundationGiftTransactionFlowStepStatus = valid ? "passed_contract_check" : "blocked_invalid_request";
  return [
    step({
      stepId: "request_idempotency_checked",
      order: 1,
      status: requestStatus,
      safeMessageKey: "stream.monetization.gift_transaction.idempotency_checked",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "gift_request_validated",
      order: 2,
      status: requestStatus,
      safeMessageKey: "stream.monetization.gift_transaction.request_validated",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "admin_monetization_config_validated",
      order: 3,
      status: flowStatus === "ready_after_route_mount_approval" ? "passed_contract_check" : flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.admin_config_validated",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "accept_payment_authorization_required",
      order: 4,
      status: flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.accept_payment_authorization_required",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: false,
    }),
    step({
      stepId: "wallet_coin_sender_debit_required",
      order: 5,
      status: flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.wallet_sender_debit_required",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: false,
    }),
    step({
      stepId: "platform_fee_reserved",
      order: 6,
      status: flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.platform_fee_reserved",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "recipient_pending_earning_counted",
      order: 7,
      status: flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.recipient_pending_earning_counted",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "recipient_monthly_payout_reserved",
      order: 8,
      status: flowStatus === "ready_after_route_mount_approval" ? "pending_monthly_payout_cycle" : flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.monthly_payout_reserved",
      requiredBeforeGiftVisibleToRecipient: false,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "audit_event_required",
      order: 9,
      status: flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.audit_event_required",
      requiredBeforeGiftVisibleToRecipient: true,
      requiredBeforeRecipientPendingEarning: true,
      requiredBeforeMonthlyPayout: true,
    }),
    step({
      stepId: "monthly_payout_cycle_enforced",
      order: 10,
      status: flowStatus === "ready_after_route_mount_approval" ? "pending_monthly_payout_cycle" : flowStatus,
      safeMessageKey: "stream.monetization.gift_transaction.monthly_cycle_enforced",
      requiredBeforeGiftVisibleToRecipient: false,
      requiredBeforeRecipientPendingEarning: false,
      requiredBeforeMonthlyPayout: true,
    }),
  ];
}

export function planStreamFoundationGiftTransactionFlow(
  input: StreamFoundationGiftTransactionFlowInput,
  adminConfig: StreamFoundationAdminMonetizationConfigDraft = STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG,
): StreamFoundationGiftTransactionFlowPlan {
  const valid = requestIsValid(input.request);
  const adminConfigValidation = validateStreamFoundationAdminMonetizationConfig(adminConfig);
  const adminSnapshot = toMonetizationAdminSnapshot(adminConfig);
  const giftPaymentDecision = createStreamFoundationGiftLedgerPlan(input.request, adminSnapshot);
  const decisionCode = codeForDecision(valid, giftPaymentDecision);
  const repository = createStreamFoundationInMemoryMonetizationLedgerPreviewRepository();
  const previewLedgerRecord = repository.recordGiftLedgerPlan(giftPaymentDecision);
  const creatorEarningsSnapshot = repository.getCreatorEarningsSnapshot(input.request.recipientUserId);
  const executionReadyAfterRouteMountApproval = decisionCode === "gift_transaction_flow_ready_after_route_mount_approval"
    && adminConfigValidation.readyForGiftPaymentExecutionAfterRouteMountApproval;

  return {
    stage: STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE,
    ok: executionReadyAfterRouteMountApproval,
    decisionCode,
    safeMessageKey: messageKeyForCode(decisionCode),
    request: input.request,
    steps: createSteps(decisionCode, valid),
    adminConfigValidation,
    giftPaymentDecision,
    previewLedgerRecord,
    creatorEarningsSnapshot,
    monthlyPayoutPlan: giftPaymentDecision.monthlyPayoutPlan,
    senderChargeRequiredBeforeGiftSuccess: true,
    paymentAuthorizationRequiredBeforeGiftVisible: true,
    walletLedgerDebitRequiredBeforeRecipientCredit: true,
    recipientPendingEarningCounted: giftPaymentDecision.recipientPendingEarningCoinAmount > 0,
    recipientAvailableEarningNow: false,
    monthlyPayoutOncePerMonth: true,
    monthlyPayoutDirectUserWithdrawalAllowedNow: false,
    executionReadyAfterRouteMountApproval,
    giftVisibleToRecipientAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawProviderSecretReturned: false,
    mobileProviderKeysAllowed: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakeEarningCreditAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}

export function planStreamFoundationGiftTransactionFlowFromAdminInput(
  input: StreamFoundationGiftTransactionFlowInput,
  adminConfigInput: StreamFoundationAdminMonetizationConfigInput = {},
): StreamFoundationGiftTransactionFlowPlan {
  return planStreamFoundationGiftTransactionFlow(input, createStreamFoundationAdminMonetizationConfigDraft(adminConfigInput));
}

export function getStreamFoundationGiftTransactionFlowSafeDisabledPreview(): StreamFoundationGiftTransactionFlowPlan {
  return planStreamFoundationGiftTransactionFlow({
    request: {
      requestId: "safe-disabled-gift-flow-preview",
      idempotencyKey: "safe-disabled-gift-flow-idempotency",
      senderUserId: "sender-preview-user",
      recipientUserId: "creator-preview-user",
      streamRoomId: "stream-preview-room",
      giftSku: "gift-preview-100-coin",
      coinAmount: 100,
      paymentRail: "sabi_coin_wallet",
    },
    kycApproved: false,
    creatorMonetizationApproved: false,
    payoutMonth: "preview-month",
    todayDayOfMonth: 1,
  }, STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG);
}

export function getStreamFoundationGiftTransactionFlowReadyProviderReviewPreview(): StreamFoundationGiftTransactionFlowPlan {
  return planStreamFoundationGiftTransactionFlow({
    request: {
      requestId: "ready-provider-review-gift-flow-preview",
      idempotencyKey: "ready-provider-review-gift-flow-idempotency",
      senderUserId: "sender-preview-user",
      recipientUserId: "creator-preview-user",
      streamRoomId: "stream-preview-room",
      giftSku: "gift-preview-100-coin",
      coinAmount: 100,
      paymentRail: "sabi_coin_wallet",
    },
    kycApproved: true,
    creatorMonetizationApproved: true,
    payoutMonth: "preview-month",
    todayDayOfMonth: 1,
  }, STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG);
}
