import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import type { StreamFoundationAdminMonetizationConfigDraft, StreamFoundationAdminMonetizationConfigInput } from "./streamFoundationAdminMonetizationConfigContracts";
import { createStreamFoundationAdminMonetizationConfigDraft, STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG, STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG } from "./streamFoundationAdminMonetizationConfigContracts";
import { validateStreamFoundationAdminMonetizationConfig } from "./streamFoundationAdminMonetizationConfigValidator";
import { createStreamFoundationMonetizationLedgerRecordFromRequest } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import { planStreamFoundationGiftTransactionFlow } from "./streamFoundationGiftTransactionFlowService";
import type { StreamFoundationGiftPaymentRequest } from "./streamFoundationMonetizationTypes";
import {
  STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE,
  type StreamFoundationGiftPurchaseExecutionGateAuditDraft,
  type StreamFoundationGiftPurchaseExecutionGateDecisionCode,
  type StreamFoundationGiftPurchaseExecutionGateInput,
  type StreamFoundationGiftPurchaseExecutionGatePlan,
  type StreamFoundationGiftPurchaseExecutionGateStep,
  type StreamFoundationGiftPurchaseExecutionGateStepStatus,
} from "./streamFoundationGiftPurchaseExecutionGateTypes";

function text(value: string): string {
  return value.trim();
}

function requestIsValid(request: StreamFoundationGiftPaymentRequest): boolean {
  return text(request.requestId).length > 0
    && text(request.idempotencyKey).length > 0
    && text(request.senderUserId).length > 0
    && text(request.recipientUserId).length > 0
    && text(request.streamRoomId).length > 0
    && text(request.giftSku).length > 0
    && request.senderUserId !== request.recipientUserId
    && Number.isFinite(request.coinAmount)
    && request.coinAmount > 0;
}

function decisionCodeFor(input: StreamFoundationGiftPurchaseExecutionGateInput, config: StreamFoundationAdminMonetizationConfigDraft): StreamFoundationGiftPurchaseExecutionGateDecisionCode {
  if (!requestIsValid(input.request)) return "gift_purchase_blocked_invalid_request";
  if (!config.acceptPaymentProvider.configured || !config.acceptPaymentProvider.enabled) return "gift_purchase_blocked_accept_payment_provider_not_configured";
  if (!config.walletCoinLedgerProvider.configured || !config.walletCoinLedgerProvider.enabled) return "gift_purchase_blocked_wallet_ledger_not_configured";
  if (!config.monetizationPayoutProvider.configured || !config.monetizationPayoutProvider.enabled) return "gift_purchase_blocked_payout_provider_not_configured";
  if (!input.kycApproved || !input.creatorMonetizationApproved) return "gift_purchase_blocked_compliance_or_creator_approval_required";
  if (!config.acceptPaymentProvider.liveTestPassed || !config.walletCoinLedgerProvider.liveTestPassed || !config.monetizationPayoutProvider.liveTestPassed) return "gift_purchase_blocked_provider_live_test_required";
  if (!input.routeMounted || !input.ownerApprovedRealExecution || !input.providerLiveExecutionApproved) return "gift_purchase_blocked_route_not_mounted";
  return "gift_purchase_ready_for_real_execution_after_route_mount_and_provider_approval";
}

function safeMessageKeyFor(code: StreamFoundationGiftPurchaseExecutionGateDecisionCode): string {
  switch (code) {
    case "gift_purchase_ready_for_real_execution_after_route_mount_and_provider_approval":
      return "stream.monetization.gift_purchase.ready_for_real_execution_after_mount_and_approval";
    case "gift_purchase_blocked_invalid_request":
      return "stream.monetization.gift_purchase.invalid_request";
    case "gift_purchase_blocked_accept_payment_provider_not_configured":
      return "stream.monetization.gift_purchase.accept_payment_provider_not_configured";
    case "gift_purchase_blocked_wallet_ledger_not_configured":
      return "stream.monetization.gift_purchase.wallet_ledger_not_configured";
    case "gift_purchase_blocked_payout_provider_not_configured":
      return "stream.monetization.gift_purchase.payout_provider_not_configured";
    case "gift_purchase_blocked_compliance_or_creator_approval_required":
      return "stream.monetization.gift_purchase.compliance_or_creator_approval_required";
    case "gift_purchase_blocked_route_not_mounted":
      return "stream.monetization.gift_purchase.route_not_mounted";
    case "gift_purchase_blocked_provider_live_test_required":
      return "stream.monetization.gift_purchase.provider_live_test_required";
    case "gift_purchase_blocked_admin_config_required":
    default:
      return "stream.monetization.gift_purchase.admin_config_required";
  }
}

function statusFor(code: StreamFoundationGiftPurchaseExecutionGateDecisionCode, passed: boolean): StreamFoundationGiftPurchaseExecutionGateStepStatus {
  if (passed) return "passed";
  switch (code) {
    case "gift_purchase_ready_for_real_execution_after_route_mount_and_provider_approval":
      return "ready_after_route_mount_and_provider_approval";
    case "gift_purchase_blocked_invalid_request":
      return "blocked_invalid_request";
    case "gift_purchase_blocked_accept_payment_provider_not_configured":
      return "blocked_provider_not_configured";
    case "gift_purchase_blocked_wallet_ledger_not_configured":
      return "blocked_wallet_ledger_not_configured";
    case "gift_purchase_blocked_payout_provider_not_configured":
      return "blocked_payout_provider_not_configured";
    case "gift_purchase_blocked_compliance_or_creator_approval_required":
      return "blocked_compliance_or_creator_approval_required";
    case "gift_purchase_blocked_route_not_mounted":
      return "blocked_route_not_mounted";
    case "gift_purchase_blocked_provider_live_test_required":
      return "blocked_provider_live_test_required";
    case "gift_purchase_blocked_admin_config_required":
    default:
      return "blocked_admin_config_required";
  }
}

function step(args: Omit<StreamFoundationGiftPurchaseExecutionGateStep, "executedNow" | "routeMountAllowedNow" | "databaseWriteAllowedNow" | "providerCallAllowedNow" | "walletLedgerMutationAllowedNow" | "moneyMovementAllowedNow">): StreamFoundationGiftPurchaseExecutionGateStep {
  return {
    ...args,
    executedNow: false,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletLedgerMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
  };
}

function buildSteps(input: StreamFoundationGiftPurchaseExecutionGateInput, config: StreamFoundationAdminMonetizationConfigDraft, code: StreamFoundationGiftPurchaseExecutionGateDecisionCode): readonly StreamFoundationGiftPurchaseExecutionGateStep[] {
  const valid = requestIsValid(input.request);
  const acceptReady = config.acceptPaymentProvider.configured && config.acceptPaymentProvider.enabled && config.acceptPaymentProvider.liveTestPassed;
  const walletReady = config.walletCoinLedgerProvider.configured && config.walletCoinLedgerProvider.enabled && config.walletCoinLedgerProvider.liveTestPassed;
  const payoutReady = config.monetizationPayoutProvider.configured && config.monetizationPayoutProvider.enabled && config.monetizationPayoutProvider.liveTestPassed;
  const complianceReady = input.kycApproved && input.creatorMonetizationApproved;
  const routeReady = input.routeMounted && input.ownerApprovedRealExecution && input.providerLiveExecutionApproved;
  return [
    step({
      stepId: "request_idempotency_guard",
      order: 1,
      status: statusFor(code, valid),
      safeMessageKey: "stream.monetization.gift_purchase.request_idempotency_guard",
      blocksGiftVisibleToRecipient: !valid,
      blocksRecipientPendingEarning: !valid,
      blocksMonthlyPayoutReserve: !valid,
    }),
    step({
      stepId: "admin_accept_payment_provider_guard",
      order: 2,
      status: statusFor(code, acceptReady),
      safeMessageKey: "stream.monetization.gift_purchase.accept_payment_provider_guard",
      blocksGiftVisibleToRecipient: !acceptReady,
      blocksRecipientPendingEarning: !acceptReady,
      blocksMonthlyPayoutReserve: !acceptReady,
    }),
    step({
      stepId: "wallet_coin_ledger_provider_guard",
      order: 3,
      status: statusFor(code, walletReady),
      safeMessageKey: "stream.monetization.gift_purchase.wallet_coin_ledger_provider_guard",
      blocksGiftVisibleToRecipient: !walletReady,
      blocksRecipientPendingEarning: !walletReady,
      blocksMonthlyPayoutReserve: !walletReady,
    }),
    step({
      stepId: "sender_charge_authorization_guard",
      order: 4,
      status: statusFor(code, acceptReady && walletReady),
      safeMessageKey: "stream.monetization.gift_purchase.sender_charge_authorization_guard",
      blocksGiftVisibleToRecipient: !(acceptReady && walletReady),
      blocksRecipientPendingEarning: !(acceptReady && walletReady),
      blocksMonthlyPayoutReserve: !(acceptReady && walletReady),
    }),
    step({
      stepId: "platform_fee_reserve_guard",
      order: 5,
      status: statusFor(code, config.policy.platformFeeConfigured),
      safeMessageKey: "stream.monetization.gift_purchase.platform_fee_reserve_guard",
      blocksGiftVisibleToRecipient: !config.policy.platformFeeConfigured,
      blocksRecipientPendingEarning: !config.policy.platformFeeConfigured,
      blocksMonthlyPayoutReserve: !config.policy.platformFeeConfigured,
    }),
    step({
      stepId: "recipient_pending_earning_guard",
      order: 6,
      status: statusFor(code, walletReady && payoutReady),
      safeMessageKey: "stream.monetization.gift_purchase.recipient_pending_earning_guard",
      blocksGiftVisibleToRecipient: !(walletReady && payoutReady),
      blocksRecipientPendingEarning: !(walletReady && payoutReady),
      blocksMonthlyPayoutReserve: !(walletReady && payoutReady),
    }),
    step({
      stepId: "recipient_monthly_payout_reserve_guard",
      order: 7,
      status: statusFor(code, payoutReady && config.policy.payoutOncePerMonth),
      safeMessageKey: "stream.monetization.gift_purchase.monthly_payout_reserve_guard",
      blocksGiftVisibleToRecipient: false,
      blocksRecipientPendingEarning: !(payoutReady && config.policy.payoutOncePerMonth),
      blocksMonthlyPayoutReserve: !(payoutReady && config.policy.payoutOncePerMonth),
    }),
    step({
      stepId: "creator_kyc_monetization_guard",
      order: 8,
      status: statusFor(code, complianceReady),
      safeMessageKey: "stream.monetization.gift_purchase.creator_kyc_monetization_guard",
      blocksGiftVisibleToRecipient: !complianceReady,
      blocksRecipientPendingEarning: !complianceReady,
      blocksMonthlyPayoutReserve: !complianceReady,
    }),
    step({
      stepId: "audit_and_ledger_write_guard",
      order: 9,
      status: statusFor(code, routeReady),
      safeMessageKey: "stream.monetization.gift_purchase.audit_and_ledger_write_guard",
      blocksGiftVisibleToRecipient: !routeReady,
      blocksRecipientPendingEarning: !routeReady,
      blocksMonthlyPayoutReserve: !routeReady,
    }),
    step({
      stepId: "provider_live_test_and_route_mount_guard",
      order: 10,
      status: statusFor(code, routeReady),
      safeMessageKey: "stream.monetization.gift_purchase.provider_live_test_and_route_mount_guard",
      blocksGiftVisibleToRecipient: !routeReady,
      blocksRecipientPendingEarning: !routeReady,
      blocksMonthlyPayoutReserve: !routeReady,
    }),
  ];
}

function auditDraft(input: StreamFoundationGiftPurchaseExecutionGateInput, code: StreamFoundationGiftPurchaseExecutionGateDecisionCode): StreamFoundationGiftPurchaseExecutionGateAuditDraft {
  return {
    auditId: `stream-gift-purchase-gate-audit-${input.request.requestId}`,
    requestId: input.request.requestId,
    idempotencyKey: input.request.idempotencyKey,
    senderUserId: input.request.senderUserId,
    recipientUserId: input.request.recipientUserId,
    streamRoomId: input.request.streamRoomId,
    giftSku: input.request.giftSku,
    grossCoinAmount: Math.max(0, Math.floor(input.request.coinAmount)),
    decisionCode: code,
    persistedNow: false,
    auditPersistRequiredLater: true,
    providerCallExecuted: false,
    walletMutationExecuted: false,
    moneyMovementExecuted: false,
    rawSecretCaptured: false,
  };
}

export function planStreamFoundationGiftPurchaseExecutionGate(
  input: StreamFoundationGiftPurchaseExecutionGateInput,
  adminConfig: StreamFoundationAdminMonetizationConfigDraft = STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG,
): StreamFoundationGiftPurchaseExecutionGatePlan {
  const adminConfigValidation = validateStreamFoundationAdminMonetizationConfig(adminConfig);
  const flowPlan = planStreamFoundationGiftTransactionFlow(input, adminConfig);
  const code = decisionCodeFor(input, adminConfig);
  const ledgerRecordPreview = createStreamFoundationMonetizationLedgerRecordFromRequest(input.request, flowPlan.giftPaymentDecision);
  const readyForRealExecutionWhenMountedAndApproved = code === "gift_purchase_ready_for_real_execution_after_route_mount_and_provider_approval";
  return {
    stage: STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE,
    ok: readyForRealExecutionWhenMountedAndApproved,
    decisionCode: code,
    safeMessageKey: safeMessageKeyFor(code),
    request: input.request,
    flowPlan,
    adminConfigValidation,
    giftPaymentDecision: flowPlan.giftPaymentDecision,
    ledgerRecordPreview,
    creatorEarningsSnapshot: flowPlan.creatorEarningsSnapshot,
    monthlyPayoutPlan: flowPlan.monthlyPayoutPlan,
    steps: buildSteps(input, adminConfig, code),
    auditDraft: auditDraft(input, code),
    senderChargeAuthorizationRequired: true,
    senderWalletDebitRequired: true,
    recipientPendingEarningPlanned: flowPlan.giftPaymentDecision.recipientPendingEarningCoinAmount > 0,
    recipientAvailableEarningNow: false,
    recipientPayoutReservedForMonthlyBatch: flowPlan.monthlyPayoutPlan !== undefined,
    monthlyPayoutOncePerMonth: true,
    routeMounted: input.routeMounted,
    ownerApprovedRealExecution: input.ownerApprovedRealExecution,
    providerLiveExecutionApproved: input.providerLiveExecutionApproved,
    readyForRealExecutionWhenMountedAndApproved,
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

export function planStreamFoundationGiftPurchaseExecutionGateFromAdminInput(
  input: StreamFoundationGiftPurchaseExecutionGateInput,
  adminConfigInput: StreamFoundationAdminMonetizationConfigInput = {},
): StreamFoundationGiftPurchaseExecutionGatePlan {
  return planStreamFoundationGiftPurchaseExecutionGate(input, createStreamFoundationAdminMonetizationConfigDraft(adminConfigInput));
}

export function getStreamFoundationGiftPurchaseExecutionGateSafeDisabledPreview(): StreamFoundationGiftPurchaseExecutionGatePlan {
  return planStreamFoundationGiftPurchaseExecutionGate({
    request: {
      requestId: "safe-disabled-gift-purchase-gate-preview",
      idempotencyKey: "safe-disabled-gift-purchase-gate-idempotency",
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
    routeMounted: false,
    ownerApprovedRealExecution: false,
    providerLiveExecutionApproved: false,
  }, STREAM_FOUNDATION_ADMIN_MONETIZATION_SAFE_DISABLED_CONFIG);
}

export function getStreamFoundationGiftPurchaseExecutionGateReadyButUnmountedPreview(): StreamFoundationGiftPurchaseExecutionGatePlan {
  return planStreamFoundationGiftPurchaseExecutionGate({
    request: {
      requestId: "ready-unmounted-gift-purchase-gate-preview",
      idempotencyKey: "ready-unmounted-gift-purchase-gate-idempotency",
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
    routeMounted: false,
    ownerApprovedRealExecution: false,
    providerLiveExecutionApproved: false,
  }, STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG);
}

export function getStreamFoundationGiftPurchaseExecutionGateMountedApprovedPreview(): StreamFoundationGiftPurchaseExecutionGatePlan {
  return planStreamFoundationGiftPurchaseExecutionGate({
    request: {
      requestId: "mounted-approved-gift-purchase-gate-preview",
      idempotencyKey: "mounted-approved-gift-purchase-gate-idempotency",
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
    routeMounted: true,
    ownerApprovedRealExecution: true,
    providerLiveExecutionApproved: true,
  }, STREAM_FOUNDATION_ADMIN_MONETIZATION_READY_FOR_REAL_PROVIDER_REVIEW_CONFIG);
}
