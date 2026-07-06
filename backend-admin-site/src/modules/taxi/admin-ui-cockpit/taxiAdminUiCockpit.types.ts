import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminUiCockpitVersion = 'TAXI-BACKEND-FOUNDATION-001S';

export type TaxiAdminUiCockpitStatus = 'admin_ui_cockpit_contract_ready_safe_disabled';

export type TaxiAdminUiCockpitPanelId =
  | 'taxi_admin_overview_readiness'
  | 'taxi_admin_tariff_catalog_config'
  | 'taxi_admin_commission_config'
  | 'taxi_admin_driver_park_application_review'
  | 'taxi_admin_zone_service_eligibility'
  | 'taxi_admin_daily_ai_report_queue'
  | 'taxi_admin_complaints_appeals_evidence'
  | 'taxi_admin_league_reward_freeze'
  | 'taxi_admin_schema_route_runtime_gates'
  | 'taxi_admin_wallet_payment_payout_locks'
  | 'taxi_admin_provider_dispatch_locks'
  | 'taxi_admin_client_boundary_safe_summary';

export type TaxiAdminUiCockpitPanelStatus = 'contract_ready' | 'review_only' | 'safe_disabled' | 'exact_approval_required';

export type TaxiAdminUiCockpitActionId =
  | 'render_contract_snapshot'
  | 'review_driver_application'
  | 'review_park_application'
  | 'review_tariff_config'
  | 'review_commission_config'
  | 'review_zone_access'
  | 'review_daily_ai_report'
  | 'review_complaint_case'
  | 'review_reward_freeze'
  | 'review_runtime_gate';

export interface TaxiAdminUiCockpitPanelContract {
  readonly panelId: TaxiAdminUiCockpitPanelId;
  readonly title: string;
  readonly purpose: string;
  readonly status: TaxiAdminUiCockpitPanelStatus;
  readonly usesFoundationContractsOnly: true;
  readonly requiresDbReadNow: false;
  readonly canExecuteRuntimeNow: false;
  readonly exactApprovalRequiredBeforeExecution: boolean;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminUiCockpitActionContract {
  readonly actionId: TaxiAdminUiCockpitActionId;
  readonly label: string;
  readonly visibleInAdminUi: true;
  readonly reviewOnlyNow: true;
  readonly writesDbNow: false;
  readonly callsProviderNow: false;
  readonly mutatesWalletNow: false;
  readonly chargesPaymentNow: false;
  readonly releasesPayoutNow: false;
  readonly exactApprovalRequiredBeforeRuntime: true;
}

export interface TaxiAdminUiCockpitSnapshot {
  readonly version: TaxiAdminUiCockpitVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminUiCockpitStatus;
  readonly foundationAdminFirstRuleReady: true;
  readonly adminUiCockpitReady: true;
  readonly adminUiUsesFoundationContractsOnly: true;
  readonly noClientUiImplementationDetails: true;
  readonly clientUiReturnBlockedUntilRealFoundationAdmin100: true;
  readonly adminConfiguredTariffPanelReady: true;
  readonly adminConfiguredCommissionPanelReady: true;
  readonly driverParkApplicationReviewPanelReady: true;
  readonly zoneServiceEligibilityPanelReady: true;
  readonly dailyAiReportPanelReady: true;
  readonly complaintsAppealsEvidencePanelReady: true;
  readonly schemaRoutesRuntimeGatePanelReady: true;
  readonly walletPaymentPayoutLockPanelReady: true;
  readonly providerDispatchLockPanelReady: true;
  readonly clientBoundarySafeSummaryPanelReady: true;
  readonly panels: readonly TaxiAdminUiCockpitPanelContract[];
  readonly actions: readonly TaxiAdminUiCockpitActionContract[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly adminUiRuntimeMountedNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminUiCockpitDecisionInput {
  readonly wantsRenderAdminUi: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsRuntimeAction: boolean;
  readonly wantsProviderDispatch: boolean;
  readonly wantsWalletPaymentPayout: boolean;
  readonly hasExactOwnerApproval: boolean;
}

export interface TaxiAdminUiCockpitDecision {
  readonly canRenderAdminUiContracts: boolean;
  readonly canExecuteRuntimeNow: false;
  readonly canReadOrWriteDbNow: false;
  readonly blockedReasons: readonly string[];
  readonly exactApprovalRequiredBeforeRuntime: true;
  readonly fakeSuccessBlocked: true;
}
