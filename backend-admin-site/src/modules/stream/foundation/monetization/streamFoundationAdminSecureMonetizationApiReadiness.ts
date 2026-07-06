import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "../core";
import { getStreamFoundationAdminMonetizationReadinessSnapshot } from "./streamFoundationAdminMonetizationReadiness";
import { getStreamFoundationGiftTransactionFlowReadinessSnapshot } from "./streamFoundationGiftTransactionFlowReadiness";
import { STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE } from "./streamFoundationAdminSecureMonetizationApiContracts";
import { getStreamFoundationAdminSecureMonetizationApiSafePreview } from "./streamFoundationAdminSecureMonetizationApiService";

export const STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_136T_ADMIN_SECURE_MONETIZATION_API_READINESS_STAGING" as const;

export type StreamFoundationAdminSecureMonetizationApiReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_READINESS_STAGE;
  dependsOn: readonly string[];
  apiStage: typeof STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE;
  safePreviewDecision: ReturnType<typeof getStreamFoundationAdminSecureMonetizationApiSafePreview>["decisionCode"];
  adminConfigReadinessStage: ReturnType<typeof getStreamFoundationAdminMonetizationReadinessSnapshot>["stage"];
  giftTransactionFlowReadinessStage: ReturnType<typeof getStreamFoundationGiftTransactionFlowReadinessSnapshot>["stage"];
  supportsAcceptPaymentProviderConfig: true;
  supportsSeparatePayoutProviderConfig: true;
  supportsWalletCoinLedgerProviderConfig: true;
  supportsMonthlyPayoutPolicyConfig: true;
  providerKeysServerSideOnly: true;
  redactedResponsesOnly: true;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  auditRequiredForEveryWrite: true;
  idempotencyRequiredForEveryWrite: true;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  readyForAdminUiDraft: true;
  readyForServerRouteMountAfterOwnerApproval: boolean;
  safety: typeof STREAM_FOUNDATION_SAFE_SNAPSHOT;
}>;

export function getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot(): StreamFoundationAdminSecureMonetizationApiReadinessSnapshot {
  const safePreview = getStreamFoundationAdminSecureMonetizationApiSafePreview();
  const adminReadiness = getStreamFoundationAdminMonetizationReadinessSnapshot();
  const giftReadiness = getStreamFoundationGiftTransactionFlowReadinessSnapshot();
  return {
    stage: STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_READINESS_STAGE,
    dependsOn: [
      "BACKEND_STREAM_FOUNDATION_136P_PAYMENT_MONETIZATION_STAGING",
      "BACKEND_STREAM_FOUNDATION_136Q_LEDGER_READINESS_STAGING",
      "BACKEND_STREAM_FOUNDATION_136R_ADMIN_MONETIZATION_CONFIG_STAGING",
      "BACKEND_STREAM_FOUNDATION_136S_GIFT_TRANSACTION_FLOW_STAGING",
    ],
    apiStage: STREAM_FOUNDATION_ADMIN_SECURE_MONETIZATION_API_STAGE,
    safePreviewDecision: safePreview.decisionCode,
    adminConfigReadinessStage: adminReadiness.stage,
    giftTransactionFlowReadinessStage: giftReadiness.stage,
    supportsAcceptPaymentProviderConfig: true,
    supportsSeparatePayoutProviderConfig: true,
    supportsWalletCoinLedgerProviderConfig: true,
    supportsMonthlyPayoutPolicyConfig: true,
    providerKeysServerSideOnly: true,
    redactedResponsesOnly: true,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    auditRequiredForEveryWrite: true,
    idempotencyRequiredForEveryWrite: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
    readyForAdminUiDraft: true,
    readyForServerRouteMountAfterOwnerApproval:
      adminReadiness.readyForAdminUiSecureConfigScreenDraft &&
      giftReadiness.readyForRouteMountApprovalPlanning &&
      safePreview.decisionCode === "admin_monetization_api_preview_ready",
    safety: STREAM_FOUNDATION_SAFE_SNAPSHOT,
  };
}
