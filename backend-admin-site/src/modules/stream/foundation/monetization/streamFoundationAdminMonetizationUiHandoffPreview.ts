import {
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_API_HANDOFF_CONTRACT,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS,
  STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS,
  type StreamFoundationAdminMonetizationUiPanelStatus,
} from "./streamFoundationAdminMonetizationUiHandoffContracts";
import { getStreamFoundationAdminSecureMonetizationApiSafePreview } from "./streamFoundationAdminSecureMonetizationApiService";
import { getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot } from "./streamFoundationAdminSecureMonetizationApiReadiness";

export const STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_PREVIEW_STAGE = "BACKEND_STREAM_FOUNDATION_136U_ADMIN_MONETIZATION_UI_HANDOFF_PREVIEW_STAGING" as const;

export type StreamFoundationAdminMonetizationUiHandoffPreviewPanel = Readonly<{
  panelId: string;
  status: StreamFoundationAdminMonetizationUiPanelStatus;
  fieldCount: number;
  actionCount: number;
  safeForAdminUiDisplay: true;
  rawSecretVisible: false;
  mobileVisibleSecret: false;
}>;

export type StreamFoundationAdminMonetizationUiHandoffPreview = Readonly<{
  stage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_PREVIEW_STAGE;
  handoffStage: typeof STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE;
  apiDecisionCode: ReturnType<typeof getStreamFoundationAdminSecureMonetizationApiSafePreview>["decisionCode"];
  apiReadinessStage: ReturnType<typeof getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot>["stage"];
  adminUiArea: "Stream / Gifts / Monetization";
  panels: readonly StreamFoundationAdminMonetizationUiHandoffPreviewPanel[];
  totalPanels: number;
  totalFields: number;
  totalActions: number;
  editableSecretReferenceFields: number;
  monthlyPayoutPolicyFields: number;
  requiredBeforeGiftExecutionFields: number;
  writeActionsRequiringRouteMountLater: number;
  safeReadActionAvailable: true;
  acceptPaymentProviderSeparateFromPayoutProvider: true;
  walletCoinLedgerRequiredForGiftExecution: true;
  recipientEarningsCountedAsPendingFirst: true;
  payoutOncePerMonth: true;
  routeMountAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretValuesReturned: false;
  mobileProviderKeysReturned: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
}>;

export function getStreamFoundationAdminMonetizationUiHandoffPreview(): StreamFoundationAdminMonetizationUiHandoffPreview {
  const apiPreview = getStreamFoundationAdminSecureMonetizationApiSafePreview();
  const apiReadiness = getStreamFoundationAdminSecureMonetizationApiReadinessSnapshot();
  const panels: StreamFoundationAdminMonetizationUiHandoffPreviewPanel[] = STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.map((panel) => ({
    panelId: panel.panelId,
    status: panel.status,
    fieldCount: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.panelId === panel.panelId).length,
    actionCount: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.filter((action) => {
      if (panel.panelId === "accept_payment_provider_config") return action.providerTarget === "accept_payment_provider";
      if (panel.panelId === "monetization_payout_provider_config") return action.providerTarget === "monetization_payout_provider";
      if (panel.panelId === "wallet_coin_ledger_provider_config") return action.providerTarget === "wallet_coin_ledger_provider";
      if (panel.panelId === "monthly_payout_policy") return action.operation === "save_monthly_payout_policy";
      if (panel.panelId === "provider_live_test_gate") return action.operation === "request_provider_live_test_gate";
      if (panel.panelId === "stream_monetization_overview") return action.operation === "read_redacted_config_snapshot";
      return false;
    }).length,
    safeForAdminUiDisplay: true,
    rawSecretVisible: false,
    mobileVisibleSecret: false,
  }));

  return {
    stage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_PREVIEW_STAGE,
    handoffStage: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_HANDOFF_STAGE,
    apiDecisionCode: apiPreview.decisionCode,
    apiReadinessStage: apiReadiness.stage,
    adminUiArea: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_API_HANDOFF_CONTRACT.adminUiArea,
    panels,
    totalPanels: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_PANELS.length,
    totalFields: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.length,
    totalActions: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.length,
    editableSecretReferenceFields: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.kind === "redacted_secret_ref" && field.editable).length,
    monthlyPayoutPolicyFields: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.apiSource === "monthly_payout_policy").length,
    requiredBeforeGiftExecutionFields: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_FIELDS.filter((field) => field.requiredBeforeGiftExecution).length,
    writeActionsRequiringRouteMountLater: STREAM_FOUNDATION_ADMIN_MONETIZATION_UI_ACTIONS.filter((action) => action.requiresRouteMountLater).length,
    safeReadActionAvailable: true,
    acceptPaymentProviderSeparateFromPayoutProvider: true,
    walletCoinLedgerRequiredForGiftExecution: true,
    recipientEarningsCountedAsPendingFirst: true,
    payoutOncePerMonth: true,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    rawSecretValuesReturned: false,
    mobileProviderKeysReturned: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  };
}
