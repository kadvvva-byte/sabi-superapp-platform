import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminExecutionReadinessVersion = 'TAXI-BACKEND-FOUNDATION-001K';

export type TaxiAdminExecutionReadinessStatus = 'admin_execution_readiness_safe_disabled_ready';

export type TaxiExecutionReadinessGateId =
  | 'runtime_route_mount_gate'
  | 'scheduler_cron_activation_gate'
  | 'db_schema_migration_gate'
  | 'db_read_query_gate'
  | 'db_write_mutation_gate'
  | 'wallet_balance_mutation_gate'
  | 'provider_dispatch_activation_gate'
  | 'payment_charge_gate'
  | 'payout_reward_release_gate'
  | 'location_realtime_tracking_gate'
  | 'admin_dashboard_runtime_gate'
  | 'client_boundary_publish_runtime_gate';

export type TaxiExecutionReadinessDomain =
  | 'api_runtime'
  | 'scheduler'
  | 'database'
  | 'wallet'
  | 'provider'
  | 'payment'
  | 'payout'
  | 'realtime_location'
  | 'admin_ui'
  | 'client_boundary';

export type TaxiExecutionApprovalScope =
  | 'owner_exact_approval'
  | 'security_review'
  | 'admin_permission_review'
  | 'db_schema_review'
  | 'migration_review'
  | 'provider_key_reference_review'
  | 'payment_provider_review'
  | 'payout_provider_review'
  | 'wallet_ledger_review'
  | 'runtime_smoke_review'
  | 'rollback_plan_review';

export interface TaxiAdminExecutionReadinessGate {
  readonly gateId: TaxiExecutionReadinessGateId;
  readonly domain: TaxiExecutionReadinessDomain;
  readonly title: string;
  readonly requiredApprovalScopes: readonly TaxiExecutionApprovalScope[];
  readonly exactApprovalRequiredBeforeRuntime: true;
  readonly adminVisibleFromFoundation: true;
  readonly mobileUiUsesKernelOnly: true;
  readonly canExecuteNow: false;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly walletMutationEnabledNow: false;
  readonly providerEnabledNow: false;
  readonly paymentEnabledNow: false;
  readonly payoutEnabledNow: false;
  readonly fakeSuccessBlocked: true;
}

export type TaxiAdminExecutionChecklistId =
  | 'confirm_client_boundary_contracts'
  | 'confirm_admin_sections_from_foundation'
  | 'confirm_sabi_ai_daily_report_contracts'
  | 'confirm_all_complaints_checked_daily'
  | 'confirm_evidence_redaction'
  | 'confirm_approval_gates'
  | 'confirm_db_schema_plan_only'
  | 'confirm_provider_keys_reference_only'
  | 'confirm_wallet_payment_payout_locked'
  | 'confirm_runtime_routes_unmounted'
  | 'confirm_no_fake_success';

export interface TaxiAdminExecutionReadinessChecklistItem {
  readonly itemId: TaxiAdminExecutionChecklistId;
  readonly title: string;
  readonly requiredBeforeFutureRuntime: true;
  readonly visibleInAdmin: true;
  readonly sourceBackedByFoundation: true;
  readonly blocksRuntimeUntilExactApproval: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminExecutionReadinessSnapshot {
  readonly version: TaxiAdminExecutionReadinessVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminExecutionReadinessStatus;
  readonly adminExecutionReadinessContractsRequired: true;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly exactApprovalRequiredBeforeAnyRuntime: true;
  readonly dailyAiReportMustBeCompleteBeforeRuntime: true;
  readonly allComplaintsCheckedEveryDayBeforeClose: true;
  readonly evidenceRedactionRequiredBeforeMobilePublish: true;
  readonly gates: readonly TaxiAdminExecutionReadinessGate[];
  readonly checklist: readonly TaxiAdminExecutionReadinessChecklistItem[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly routeRuntimeMounted: false;
  readonly dashboardRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminExecutionReadinessInput {
  readonly hasAdminPermission: boolean;
  readonly hasExactOwnerApproval: boolean;
  readonly wantsRuntimeRouteMount: boolean;
  readonly wantsSchedulerActivation: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsWalletMutation: boolean;
  readonly wantsProviderActivation: boolean;
  readonly wantsPaymentOrPayout: boolean;
  readonly wantsClientBoundaryPublish: boolean;
  readonly dailyAiReportComplete: boolean;
  readonly allComplaintsChecked: boolean;
  readonly evidenceRedacted: boolean;
  readonly rollbackPlanReady: boolean;
}

export interface TaxiAdminExecutionReadinessDecision {
  readonly canRenderAdminExecutionReadiness: boolean;
  readonly canExecuteRuntimeNow: false;
  readonly canMountRoutesNow: false;
  readonly canActivateSchedulerNow: false;
  readonly canReadOrWriteDbNow: false;
  readonly canMutateWalletNow: false;
  readonly canActivateProviderNow: false;
  readonly canChargeOrPayoutNow: false;
  readonly canPublishClientBoundarySummaryNow: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeSuccessBlocked: true;
}
