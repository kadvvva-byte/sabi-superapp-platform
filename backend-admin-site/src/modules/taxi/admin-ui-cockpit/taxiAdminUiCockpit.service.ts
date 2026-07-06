import {
  TAXI_ADMIN_UI_COCKPIT_ACTIONS,
  TAXI_ADMIN_UI_COCKPIT_PANELS,
  TAXI_ADMIN_UI_COCKPIT_VERSION,
  taxiAdminUiCockpitRouteDescriptors,
} from './taxiAdminUiCockpit.constants';
import type {
  TaxiAdminUiCockpitDecision,
  TaxiAdminUiCockpitDecisionInput,
  TaxiAdminUiCockpitSnapshot,
} from './taxiAdminUiCockpit.types';

export function getTaxiAdminUiCockpitSnapshot(): TaxiAdminUiCockpitSnapshot {
  return {
    version: TAXI_ADMIN_UI_COCKPIT_VERSION,
    module: 'taxi',
    status: 'admin_ui_cockpit_contract_ready_safe_disabled',
    foundationAdminFirstRuleReady: true,
    adminUiCockpitReady: true,
    adminUiUsesFoundationContractsOnly: true,
    noClientUiImplementationDetails: true,
    clientUiReturnBlockedUntilRealFoundationAdmin100: true,
    adminConfiguredTariffPanelReady: true,
    adminConfiguredCommissionPanelReady: true,
    driverParkApplicationReviewPanelReady: true,
    zoneServiceEligibilityPanelReady: true,
    dailyAiReportPanelReady: true,
    complaintsAppealsEvidencePanelReady: true,
    schemaRoutesRuntimeGatePanelReady: true,
    walletPaymentPayoutLockPanelReady: true,
    providerDispatchLockPanelReady: true,
    clientBoundarySafeSummaryPanelReady: true,
    panels: TAXI_ADMIN_UI_COCKPIT_PANELS,
    actions: TAXI_ADMIN_UI_COCKPIT_ACTIONS,
    routeDescriptors: taxiAdminUiCockpitRouteDescriptors,
    adminUiRuntimeMountedNow: false,
    routeRuntimeMountedNow: false,
    schedulerRuntimeMountedNow: false,
    dbReadEnabled: false,
    dbWriteEnabled: false,
    walletMutationEnabled: false,
    paymentEnabled: false,
    payoutEnabled: false,
    providerEnabled: false,
    fakeSuccessBlocked: true,
  };
}

export function evaluateTaxiAdminUiCockpitRequest(input: TaxiAdminUiCockpitDecisionInput): TaxiAdminUiCockpitDecision {
  const blockedReasons: string[] = [];

  if (input.wantsDbReadOrWrite) {
    blockedReasons.push('admin_ui_db_access_blocked_until_db_exact_approval');
  }
  if (input.wantsRuntimeAction) {
    blockedReasons.push('admin_ui_runtime_action_blocked_until_exact_approval');
  }
  if (input.wantsProviderDispatch) {
    blockedReasons.push('provider_dispatch_blocked_until_provider_exact_approval');
  }
  if (input.wantsWalletPaymentPayout) {
    blockedReasons.push('wallet_payment_payout_blocked_until_finance_exact_approval');
  }
  if (!input.hasExactOwnerApproval) {
    blockedReasons.push('exact_owner_approval_required_before_runtime');
  }

  return {
    canRenderAdminUiContracts: input.wantsRenderAdminUi,
    canExecuteRuntimeNow: false,
    canReadOrWriteDbNow: false,
    blockedReasons: Array.from(new Set(blockedReasons)),
    exactApprovalRequiredBeforeRuntime: true,
    fakeSuccessBlocked: true,
  };
}
