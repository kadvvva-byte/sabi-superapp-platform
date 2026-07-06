import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot } from "./streamFoundationAdminSecureMonetizationApiReadiness";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./streamFoundationGiftTransactionFlowReadiness";
import { getStreamFoundationMonetizationLedgerReadinessSnapshot } from "./streamFoundationMonetizationLedgerReadiness";
import { getStreamFoundationAdminMonetizationUiHandoffPreview } from "./streamFoundationAdminMonetizationUiHandoffPreview";
import { STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE } from "./streamFoundationAdminMonetizationUiHandoffContracts";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136U_ADMIN_MONETIZATION_UI_HANDOFF_READINESS_STAGING" as const;

export type StreamFoundationAdminMonetizationUiHandoffReadiness = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_READINESS_STAGE;
  handoffStage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE;
  dependsOn: readonly string[];
  apiReadinessStage: ReturnType<typeof getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot>["stage"];
  ledgerReadinessStage: ReturnType<typeof getStreamFoundationMonetizationLedgerReadinessSnapshot>["stage"];
  giftFlowReadinessStage: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadinessSnapshot>["stage"];
  panelCoveragePercent: 100;
  actionCoveragePercent: 100;
  adminUiContractReady: true;
  readyForAdminUiImplementationDraft: true;
  readyForBackendRouteMountAfterOwnerApproval: boolean;
  readyForGiftExecutionWithoutProvider: false;
  readyForRealMoneyMovementWithoutWalletLedger: false;
  acceptPaymentProviderSeparateFromPayoutProvider: true;
  walletCoinLedgerRequiredForGiftExecution: true;
  recipientEarningsCountedAsPendingFirst: true;
  monthlyPayoutOnly: true;
  blockedUntilRouteMount: readonly string[];
  blockedUntilProviderConfig: readonly string[];
  lockedSafetyRules: readonly string[];
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationAdminMonetizationUiHandoffReadiness(): StreamFoundationAdminMonetizationUiHandoffReadiness {
  const preview = getStreamFoundationAdminMonetizationUiHandoffPreview();
  const apiReadiness = getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot();
  const ledgerReadiness = getStreamFoundationMonetizationLedgerReadinessSnapshot();
  const giftFlowReadiness = getStreamFoundationGiftTransactionFlowReadinessSnapshot();

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_READINESS_STAGE,
    handoffStage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
    dependsOn: [
      "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
      "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_READINESS_STAGING",
      "BACKEND_STREAM_FOUNDATION_136R_ADMIN_MONETIZATION_CONFIG_STAGING",
      "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_STAGING",
      "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING",
    ],
    apiReadinessStage: apiReadiness.stage,
    ledgerReadinessStage: ledgerReadiness.stage,
    giftFlowReadinessStage: giftFlowReadiness.stage,
    panelCoveragePercent: 100,
    actionCoveragePercent: 100,
    adminUiContractReady: true,
    readyForAdminUiImplementationDraft: true,
    readyForBackendRouteMountAfterOwnerApproval: apiReadiness.readyForServerRouteMountAfterOwnerApproval,
    readyForGiftExecutionWithoutProvider: false,
    readyForRealMoneyMovementWithoutWalletLedger: false,
    acceptPaymentProviderSeparateFromPayoutProvider: true,
    walletCoinLedgerRequiredForGiftExecution: true,
    recipientEarningsCountedAsPendingFirst: true,
    monthlyPayoutOnly: true,
    blockedUntilRouteMount: [
      "save_accept_payment_provider_ref",
      "save_monetization_payout_provider_ref",
      "save_wallet_coin_ledger_provider_ref",
      "save_monthly_payout_policy",
      "request_provider_live_test_gate",
    ],
    blockedUntilProviderConfig: [
      "gift_payment_authorization",
      "wallet_coin_sender_debit",
      "recipient_pending_earning_credit",
      "monthly_payout_batch_release",
    ],
    lockedSafetyRules: [
      "admin_ui_must_show_redacted_secret_refs_only",
      "mobile_must_never_receive_provider_keys",
      "accept_payment_provider_and_payout_provider_must_be_separate",
      "recipient_earnings_start_as_pending",
      "payouts_are_monthly_only",
      "no_fake_payment_success",
      "no_fake_gift_success",
      "no_fake_payout_success",
    ],
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
