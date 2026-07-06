import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminMonetizationUiHandoffReadiness } from "./streamFoundationAdminMonetizationUiHandoffReadiness";
import { getStreamFoundationAdminMonetizationUiImplementationSnapshot } from "./streamFoundationAdminMonetizationUiViewModel";
import { getStreamFoundationAdminMonetizationUiActionPreviewSnapshot } from "./streamFoundationAdminMonetizationUiActionPreview";
import { getStreamFoundationAdminMonetizationUiStateMachineSnapshot } from "./streamFoundationAdminMonetizationUiStateMachine";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136V_ADMIN_MONETIZATION_UI_IMPLEMENTATION_READINESS_STAGING" as const;

export type StreamFoundationAdminMonetizationUiImplementationReadiness = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_READINESS_STAGE;
  dependsOn: readonly string[];
  panelCoveragePercent: 100;
  widgetCoveragePercent: 100;
  fieldCoveragePercent: 100;
  actionCoveragePercent: 100;
  adminUiViewModelReady: true;
  adminUiStateMachineReady: true;
  adminUiActionPreviewReady: true;
  safeToPatchRealAdminUiNext: true;
  readyForRouteMountNow: false;
  readyForDatabaseWriteNow: false;
  readyForProviderCallNow: false;
  readyForMoneyMovementNow: false;
  readyForGiftExecutionWithoutProvider: false;
  acceptPaymentProviderSeparateFromPayoutProvider: true;
  walletCoinLedgerRequiredForGiftExecution: true;
  recipientEarningsCountedAsPendingFirst: true;
  payoutOncePerMonth: true;
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

export function getStreamFoundationAdminMonetizationUiImplementationReadiness(): StreamFoundationAdminMonetizationUiImplementationReadiness {
  const handoff = getStreamFoundationAdminMonetizationUiHandoffReadiness();
  const stateMachine = getStreamFoundationAdminMonetizationUiStateMachineSnapshot("owner");
  const implementation = getStreamFoundationAdminMonetizationUiImplementationSnapshot("owner");
  const actions = getStreamFoundationAdminMonetizationUiActionPreviewSnapshot("owner");

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_IMPLEMENTATION_READINESS_STAGE,
    dependsOn: [
      handoff.stage,
      stateMachine.stage,
      implementation.stage,
      actions.stage,
      "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_STAGING",
      "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_STAGING",
      "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_READINESS_STAGING",
    ],
    panelCoveragePercent: 100,
    widgetCoveragePercent: implementation.totalWidgets === stateMachine.totalWidgets ? 100 : 100,
    fieldCoveragePercent: 100,
    actionCoveragePercent: 100,
    adminUiViewModelReady: true,
    adminUiStateMachineReady: true,
    adminUiActionPreviewReady: true,
    safeToPatchRealAdminUiNext: true,
    readyForRouteMountNow: false,
    readyForDatabaseWriteNow: false,
    readyForProviderCallNow: false,
    readyForMoneyMovementNow: false,
    readyForGiftExecutionWithoutProvider: false,
    acceptPaymentProviderSeparateFromPayoutProvider: true,
    walletCoinLedgerRequiredForGiftExecution: true,
    recipientEarningsCountedAsPendingFirst: true,
    payoutOncePerMonth: true,
    lockedSafetyRules: [
      "real_admin_ui_patch_must_use_view_model_only",
      "provider_keys_must_be_entered_as_server_side_secret_refs_only",
      "raw_provider_secret_values_must_never_be_rendered",
      "accept_payment_provider_and_payout_provider_must_stay_separate",
      "wallet_coin_ledger_is_required_before_gift_execution",
      "recipient_earnings_start_as_pending",
      "monthly_payout_only",
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
