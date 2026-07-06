import type { StreamFoundationSafetySnapshot } from "../core";
import type { StreamFoundationAdminMonetizationConfigValidation } from "./streamFoundationAdminMonetizationConfigValidator";
import type { StreamFoundationGiftTransactionFlowPlan } from "./streamFoundationGiftTransactionFlowTypes";
import type { StreamFoundationCreatorEarningsSnapshot, StreamFoundationMonetizationLedgerRecord } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import type { StreamFoundationGiftPaymentDecision, StreamFoundationGiftPaymentRequest, StreamFoundationMonthlyPayoutPlan } from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE = "BACKEND_STREAM_FOUNDATION_136X_GIFT_PURCHASE_EXECUTION_GATE_STAGING" as const;

export type StreamFoundationGiftPurchaseExecutionGateStage = typeof STREAM_FOUNDATION_GIFT_PURCHASE_EXECUTION_GATE_STAGE;

export type StreamFoundationGiftPurchaseExecutionGateDecisionCode =
  | "gift_purchase_ready_for_real_execution_after_route_mount_and_provider_approval"
  | "gift_purchase_blocked_invalid_request"
  | "gift_purchase_blocked_admin_config_required"
  | "gift_purchase_blocked_accept_payment_provider_not_configured"
  | "gift_purchase_blocked_wallet_ledger_not_configured"
  | "gift_purchase_blocked_payout_provider_not_configured"
  | "gift_purchase_blocked_compliance_or_creator_approval_required"
  | "gift_purchase_blocked_route_not_mounted"
  | "gift_purchase_blocked_provider_live_test_required";

export type StreamFoundationGiftPurchaseExecutionGateStepId =
  | "request_idempotency_guard"
  | "admin_accept_payment_provider_guard"
  | "wallet_coin_ledger_provider_guard"
  | "sender_charge_authorization_guard"
  | "platform_fee_reserve_guard"
  | "recipient_pending_earning_guard"
  | "recipient_monthly_payout_reserve_guard"
  | "creator_kyc_monetization_guard"
  | "audit_and_ledger_write_guard"
  | "provider_live_test_and_route_mount_guard";

export type StreamFoundationGiftPurchaseExecutionGateStepStatus =
  | "passed"
  | "blocked_invalid_request"
  | "blocked_admin_config_required"
  | "blocked_provider_not_configured"
  | "blocked_wallet_ledger_not_configured"
  | "blocked_payout_provider_not_configured"
  | "blocked_compliance_or_creator_approval_required"
  | "blocked_route_not_mounted"
  | "blocked_provider_live_test_required"
  | "ready_after_route_mount_and_provider_approval";

export type StreamFoundationGiftPurchaseExecutionGateInput = Readonly<{
  request: StreamFoundationGiftPaymentRequest;
  kycApproved: boolean;
  creatorMonetizationApproved: boolean;
  payoutMonth: string;
  todayDayOfMonth: number;
  routeMounted: boolean;
  ownerApprovedRealExecution: boolean;
  providerLiveExecutionApproved: boolean;
}>;

export type StreamFoundationGiftPurchaseExecutionGateStep = Readonly<{
  stepId: StreamFoundationGiftPurchaseExecutionGateStepId;
  order: number;
  status: StreamFoundationGiftPurchaseExecutionGateStepStatus;
  safeMessageKey: string;
  blocksGiftVisibleToRecipient: boolean;
  blocksRecipientPendingEarning: boolean;
  blocksMonthlyPayoutReserve: boolean;
  executedNow: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationGiftPurchaseExecutionGateAuditDraft = Readonly<{
  auditId: string;
  requestId: string;
  idempotencyKey: string;
  senderUserId: string;
  recipientUserId: string;
  streamRoomId: string;
  giftSku: string;
  grossCoinAmount: number;
  decisionCode: StreamFoundationGiftPurchaseExecutionGateDecisionCode;
  persistedNow: false;
  auditPersistRequiredLater: true;
  providerCallExecuted: false;
  walletMutationExecuted: false;
  moneyMovementExecuted: false;
  rawSecretCaptured: false;
}>;

export type StreamFoundationGiftPurchaseExecutionGatePlan = Readonly<{
  stage: StreamFoundationGiftPurchaseExecutionGateStage;
  ok: boolean;
  decisionCode: StreamFoundationGiftPurchaseExecutionGateDecisionCode;
  safeMessageKey: string;
  request: StreamFoundationGiftPaymentRequest;
  flowPlan: StreamFoundationGiftTransactionFlowPlan;
  adminConfigValidation: StreamFoundationAdminMonetizationConfigValidation;
  giftPaymentDecision: StreamFoundationGiftPaymentDecision;
  ledgerRecordPreview: StreamFoundationMonetizationLedgerRecord;
  creatorEarningsSnapshot: StreamFoundationCreatorEarningsSnapshot;
  monthlyPayoutPlan?: StreamFoundationMonthlyPayoutPlan;
  steps: readonly StreamFoundationGiftPurchaseExecutionGateStep[];
  auditDraft: StreamFoundationGiftPurchaseExecutionGateAuditDraft;
  senderChargeAuthorizationRequired: true;
  senderWalletDebitRequired: true;
  recipientPendingEarningPlanned: boolean;
  recipientAvailableEarningNow: false;
  recipientPayoutReservedForMonthlyBatch: boolean;
  monthlyPayoutOncePerMonth: true;
  routeMounted: boolean;
  ownerApprovedRealExecution: boolean;
  providerLiveExecutionApproved: boolean;
  readyForRealExecutionWhenMountedAndApproved: boolean;
  giftVisibleToRecipientAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  walletLedgerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawProviderSecretReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakeEarningCreditAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: StreamFoundationSafetySnapshot;
}>;
