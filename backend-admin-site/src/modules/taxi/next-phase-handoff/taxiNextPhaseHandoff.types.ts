import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiNextPhaseHandoffVersion = 'TAXI-BACKEND-FOUNDATION-001M';

export type TaxiNextPhaseHandoffStatus = 'next_admin_db_handoff_safe_disabled_ready';

export type TaxiNextPhaseOwner =
  | 'foundation'
  | 'admin_ui'
  | 'db_schema'
  | 'api_routes'
  | 'scheduler'
  | 'client_boundary'
  | 'sabi_ai'
  | 'provider_dispatch'
  | 'wallet_payment_payout';

export type TaxiNextPhaseStage =
  | 'contract_ready_now'
  | 'schema_plan_only_now'
  | 'admin_ui_plan_ready_now'
  | 'route_plan_only_now'
  | 'blocked_until_exact_approval';

export interface TaxiNextPhaseHandoffItem {
  readonly owner: TaxiNextPhaseOwner;
  readonly stage: TaxiNextPhaseStage;
  readonly title: string;
  readonly deliverable: string;
  readonly dependsOn: readonly string[];
  readonly canExecuteNow: boolean;
  readonly exactApprovalRequiredForRuntime: true;
  readonly adminCompatibleFromFoundation: true;
  readonly clientAppMustUseKernel: true;
  readonly fakeSuccessBlocked: true;
}

export type TaxiDbModelPlanId =
  | 'taxi_ride'
  | 'taxi_ride_route_snapshot'
  | 'taxi_driver_balance_ledger'
  | 'taxi_commission_ledger'
  | 'taxi_daily_ai_report'
  | 'taxi_complaint_case'
  | 'taxi_evidence_bundle'
  | 'taxi_admin_decision'
  | 'taxi_appeal_explanation'
  | 'taxi_country_league_season'
  | 'taxi_league_score_event'
  | 'taxi_reward_freeze_audit';

export interface TaxiDbSchemaPlanItem {
  readonly modelId: TaxiDbModelPlanId;
  readonly title: string;
  readonly purpose: string;
  readonly storesRawEvidence: boolean;
  readonly visibleToMobile: false;
  readonly requiresMigrationApproval: true;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly fakeSuccessBlocked: true;
}

export type TaxiRoutePlanId =
  | 'admin_taxi_readiness_snapshot'
  | 'admin_taxi_daily_ai_report_list'
  | 'admin_taxi_complaint_review_queue'
  | 'admin_taxi_action_inbox'
  | 'admin_taxi_approval_gate_snapshot'
  | 'mobile_taxi_kernel_summary'
  | 'driver_dispatch_gate_preview'
  | 'taxi_runtime_trip_request_future'
  | 'taxi_scheduler_daily_ai_report_future';

export interface TaxiRoutePlanItem {
  readonly routeId: TaxiRoutePlanId;
  readonly method: 'GET' | 'POST';
  readonly path: string;
  readonly audience: 'admin' | 'client_boundary' | 'runtime_future';
  readonly title: string;
  readonly mountedNow: false;
  readonly runtimeEnabledNow: false;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly exactApprovalRequiredBeforeMount: true;
  readonly rawEvidenceAllowedToMobile: false;
  readonly fakeSuccessBlocked: true;
}

export type TaxiAdminPanelPlanId =
  | 'taxi_readiness_overview_panel'
  | 'taxi_daily_ai_report_panel'
  | 'taxi_complaint_review_queue_panel'
  | 'taxi_action_inbox_panel'
  | 'taxi_approval_gate_panel'
  | 'taxi_reward_freeze_panel'
  | 'taxi_db_schema_plan_panel'
  | 'taxi_runtime_gate_panel'
  | 'taxi_client_boundary_summary_panel';

export interface TaxiAdminPanelPlanItem {
  readonly panelId: TaxiAdminPanelPlanId;
  readonly title: string;
  readonly sourceContract: string;
  readonly usesFoundationContracts: true;
  readonly canRenderAsReviewOnly: true;
  readonly canExecuteRuntimeNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly rawEvidenceAdminOnly: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiNextPhaseReadinessInput {
  readonly wantsAdminUiPanelSourceWrite: boolean;
  readonly wantsDbSchemaWrite: boolean;
  readonly wantsPrismaGenerateOrMigration: boolean;
  readonly wantsRouteMountRuntime: boolean;
  readonly wantsSchedulerActivation: boolean;
  readonly wantsProviderWalletPaymentPayout: boolean;
  readonly wantsMobileDirectBackendProviderConnection: boolean;
  readonly hasExactOwnerApproval: boolean;
}

export interface TaxiNextPhaseReadinessDecision {
  readonly canProceedWithAdminUiReviewOnly: boolean;
  readonly canWriteDbSchemaNow: false;
  readonly canRunPrismaNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly canActivateSchedulerNow: false;
  readonly canEnableProviderWalletPaymentPayoutNow: false;
  readonly canConnectMobileDirectlyNow: false;
  readonly blockedReasons: readonly string[];
  readonly exactApprovalRequiredBeforeExecution: true;
  readonly clientAppMustUseKernel: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiNextPhaseHandoffSnapshot {
  readonly version: TaxiNextPhaseHandoffVersion;
  readonly module: 'taxi';
  readonly status: TaxiNextPhaseHandoffStatus;
  readonly adminDbHandoffReady: true;
  readonly adminUiAddedWithFoundation: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly dbSchemaPlanReady: true;
  readonly dbSchemaWriteEnabledNow: false;
  readonly routePlanReady: true;
  readonly routeRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly fullDailyAiReportRequired: true;
  readonly allComplaintsCheckedEveryDayRequired: true;
  readonly handoffItems: readonly TaxiNextPhaseHandoffItem[];
  readonly dbSchemaPlan: readonly TaxiDbSchemaPlanItem[];
  readonly routePlan: readonly TaxiRoutePlanItem[];
  readonly adminPanelPlan: readonly TaxiAdminPanelPlanItem[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}
