import type { StreamFoundationSafetySnapshot } from "../core";
import type { StreamFoundationAdminMonetizationConfigValidation } from "./streamFoundationAdminMonetizationConfigValidator";
import type { StreamFoundationCreatorEarningsSnapshot, StreamFoundationMonetizationLedgerRecord } from "./streamFoundationMonetizationLedgerRepositoryContracts";
import type { StreamFoundationGiftPaymentDecision, StreamFoundationGiftPaymentRequest, StreamFoundationMonthlyPayoutPlan } from "./streamFoundationMonetizationTypes";

export const STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE = "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_STAGING" as const;

export type StreamFoundationGiftTransactionFlowStage = typeof STREAM_FOUNDATION_GIFT_TRANSACTION_FLOW_STAGE;

export type StreamFoundationGiftTransactionFlowStepId =
  | "request_idempotency_checked"
  | "gift_request_validated"
  | "admin_monetization_config_validated"
  | "accept_payment_authorization_required"
  | "wallet_coin_sender_debit_required"
  | "platform_fee_reserved"
  | "recipient_pending_earning_counted"
  | "recipient_monthly_payout_reserved"
  | "audit_event_required"
  | "monthly_payout_cycle_enforced";

export type StreamFoundationGiftTransactionFlowStepStatus =
  | "passed_contract_check"
  | "blocked_invalid_request"
  | "blocked_admin_config_required"
  | "blocked_provider_not_configured"
  | "blocked_wallet_ledger_not_configured"
  | "blocked_monetization_payout_not_configured"
  | "blocked_compliance_review_required"
  | "ready_after_route_mount_approval"
  | "pending_monthly_payout_cycle";

export type StreamFoundationGiftTransactionFlowDecisionCode =
  | "gift_transaction_flow_ready_after_route_mount_approval"
  | "gift_transaction_flow_blocked_invalid_request"
  | "gift_transaction_flow_blocked_admin_config_required"
  | "gift_transaction_flow_blocked_provider_not_configured"
  | "gift_transaction_flow_blocked_wallet_ledger_not_configured"
  | "gift_transaction_flow_blocked_monetization_payout_not_configured"
  | "gift_transaction_flow_blocked_compliance_review_required";

export type StreamFoundationGiftTransactionFlowStep = Readonly<{
  stepId: StreamFoundationGiftTransactionFlowStepId;
  order: number;
  status: StreamFoundationGiftTransactionFlowStepStatus;
  safeMessageKey: string;
  requiredBeforeGiftVisibleToRecipient: boolean;
  requiredBeforeRecipientPendingEarning: boolean;
  requiredBeforeMonthlyPayout: boolean;
  executedNow: false;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
}>;

export type StreamFoundationGiftTransactionFlowInput = Readonly<{
  request: StreamFoundationGiftPaymentRequest;
  kycApproved: boolean;
  creatorMonetizationApproved: boolean;
  payoutMonth: string;
  todayDayOfMonth: number;
}>;

export type StreamFoundationGiftTransactionFlowPlan = Readonly<{
  stage: StreamFoundationGiftTransactionFlowStage;
  ok: boolean;
  decisionCode: StreamFoundationGiftTransactionFlowDecisionCode;
  safeMessageKey: string;
  request: StreamFoundationGiftPaymentRequest;
  steps: readonly StreamFoundationGiftTransactionFlowStep[];
  adminConfigValidation: StreamFoundationAdminMonetizationConfigValidation;
  giftPaymentDecision: StreamFoundationGiftPaymentDecision;
  previewLedgerRecord: StreamFoundationMonetizationLedgerRecord;
  creatorEarningsSnapshot: StreamFoundationCreatorEarningsSnapshot;
  monthlyPayoutPlan?: StreamFoundationMonthlyPayoutPlan;
  senderChargeRequiredBeforeGiftSuccess: true;
  paymentAuthorizationRequiredBeforeGiftVisible: true;
  walletLedgerDebitRequiredBeforeRecipientCredit: true;
  recipientPendingEarningCounted: boolean;
  recipientAvailableEarningNow: false;
  monthlyPayoutOncePerMonth: true;
  monthlyPayoutDirectUserWithdrawalAllowedNow: false;
  executionReadyAfterRouteMountApproval: boolean;
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
