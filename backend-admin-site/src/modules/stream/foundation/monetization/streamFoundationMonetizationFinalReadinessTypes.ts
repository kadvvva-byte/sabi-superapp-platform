import type { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";

export const STREAM_FOUNDATION_MONETIZATION_FINAL_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136Z_MONETIZATION_FINAL_READINESS_HANDOFF_STAGING" as const;

export type StreamFoundationMonetizationFinalReadinessStatus =
  | "foundation_ready_for_local_staging"
  | "blocked_until_real_provider_wallet_db_and_route_mount";

export type StreamFoundationMonetizationFinalReadinessArea =
  | "admin_config"
  | "accept_payment_provider"
  | "payout_provider"
  | "wallet_ledger"
  | "gift_purchase"
  | "recipient_earnings"
  | "monthly_payout"
  | "admin_ui_handoff"
  | "audit_reconciliation"
  | "route_mount";

export type StreamFoundationMonetizationFinalReadinessItem = Readonly<{
  area: StreamFoundationMonetizationFinalReadinessArea;
  status: "ready_for_staging" | "blocked_until_real_execution_stage" | "locked_safety_rule";
  title: string;
  rule: string;
  requiredBeforeLive: readonly string[];
}>;

export type StreamFoundationMonetizationFinalReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_MONETIZATION_FINAL_READINESS_STAGE;
  status: StreamFoundationMonetizationFinalReadinessStatus;
  dependsOn: readonly string[];
  readinessItems: readonly StreamFoundationMonetizationFinalReadinessItem[];
  readyForStagingItems: number;
  blockedUntilExecutionItems: number;
  lockedSafetyRules: number;
  coveragePercentForStagingFoundation: 100;
  giftFlow: Readonly<{
    senderPaymentAuthorizationRequired: true;
    walletLedgerDebitRequired: true;
    recipientPendingEarningCreatedOnlyAfterAuthorizedPayment: true;
    recipientAvailableEarningCreatedNow: false;
    giftVisibleAsPaidOnlyAfterLedgerCommit: true;
    fakeGiftSuccessAllowed: false;
  }>;
  payoutFlow: Readonly<{
    payoutFrequency: "monthly_only";
    directUserWithdrawalAllowedNow: false;
    payoutBeforeMonthlyCycleAllowedNow: false;
    pendingToAvailableRequiresMonthlyBatch: true;
    creatorKycRequired: true;
    creatorMonetizationApprovalRequired: true;
    fakePayoutSuccessAllowed: false;
  }>;
  adminProviderConfig: Readonly<{
    acceptPaymentProviderConfiguredSeparately: true;
    monetizationPayoutProviderConfiguredSeparately: true;
    walletCoinLedgerProviderRequired: true;
    secretsServerSideOnly: true;
    rawSecretsReturnedToAdmin: false;
    providerKeysReturnedToMobile: false;
  }>;
  executionGates: Readonly<{
    routeMountAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    walletLedgerMutationAllowedNow: false;
    moneyMovementAllowedNow: false;
    readyForServerInstallAfterOwnerApproval: boolean;
    readyForRealMoneyExecutionNow: false;
  }>;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;
