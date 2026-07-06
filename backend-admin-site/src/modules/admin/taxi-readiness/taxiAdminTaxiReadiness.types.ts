import type { TaxiAdminIntegrationSnapshot } from '../../taxi/admin-integration';
import type { TaxiAiAdminDecisionSnapshot } from '../../taxi/ai-admin-decision';
import type { TaxiAiDailyReportSnapshot } from '../../taxi/ai-daily-review';
import type { TaxiAiDailyExportSnapshot } from '../../taxi/ai-daily-export';
import type { TaxiAdminDashboardReadinessSnapshot } from '../../taxi/admin-dashboard';
import type { TaxiAdminNotificationReadinessSnapshot } from '../../taxi/admin-notifications';
import type { TaxiAdminApprovalGatesSnapshot } from '../../taxi/admin-approval-gates';
import type { TaxiAdminExecutionReadinessSnapshot } from '../../taxi/admin-execution-readiness';
import type { TaxiFinalControlSnapshot } from '../../taxi/final-control';
import type { TaxiFoundationSnapshot, TaxiRouteDescriptor } from '../../taxi/foundation';
import type { TaxiKernelBridgeSnapshot } from '../../taxi/kernel';
import type { TaxiClientBoundarySnapshot } from '../../taxi/client-boundary';
import type { TaxiNextPhaseHandoffSnapshot } from '../../taxi/next-phase-handoff';
import type { TaxiDbSchemaApprovalSnapshot } from '../../taxi/db-schema-approval';
import type { TaxiPrismaSchemaCandidateSnapshot } from '../../taxi/prisma-schema-candidate';
import type { TaxiSchemaCandidateMaterializationSnapshot } from '../../taxi/schema-candidate-materialization';
import type { TaxiAdminFoundationCompletionSnapshot } from '../../taxi/admin-foundation-completion';
import type { TaxiAdminUiCockpitSnapshot } from '../../taxi/admin-ui-cockpit';

export type TaxiAdminReadinessVersion = 'TAXI-BACKEND-FOUNDATION-001S';

export type TaxiAdminSectionId =
  | 'taxi_foundation_overview'
  | 'taxi_client_boundary_bridge'
  | 'taxi_driver_balance_gate'
  | 'taxi_admin_configured_commission'
  | 'taxi_country_leagues'
  | 'taxi_daily_ai_reports'
  | 'taxi_complaint_review'
  | 'taxi_reward_freeze'
  | 'taxi_provider_payment_locks'
  | 'taxi_exact_approval_control'
  | 'taxi_ai_pipeline_control'
  | 'taxi_daily_country_audit'
  | 'taxi_complaint_review_queue'
  | 'taxi_client_boundary_compatibility'
  | 'taxi_ai_decision_lifecycle'
  | 'taxi_appeal_sla'
  | 'taxi_daily_report_completeness'
  | 'taxi_daily_report_export'
  | 'taxi_evidence_redaction'
  | 'taxi_escalation_matrix'
  | 'taxi_admin_daily_dashboard'
  | 'taxi_admin_complaint_filters'
  | 'taxi_admin_action_state_board'
  | 'taxi_admin_country_day_role_filters'
  | 'taxi_admin_notification_center'
  | 'taxi_admin_action_inbox'
  | 'taxi_admin_daily_report_status'
  | 'taxi_admin_appeal_sla_notifications'
  | 'taxi_admin_reward_freeze_alerts'
  | 'taxi_admin_approval_gates'
  | 'taxi_daily_report_close_gate'
  | 'taxi_reward_release_approval_gate'
  | 'taxi_client_boundary_publish_gate'
  | 'taxi_admin_execution_readiness'
  | 'taxi_runtime_route_mount_gate'
  | 'taxi_scheduler_activation_gate'
  | 'taxi_db_schema_migration_gate'
  | 'taxi_wallet_payment_payout_execution_gate'
  | 'taxi_provider_dispatch_execution_gate'
  | 'taxi_final_foundation_control'
  | 'taxi_final_readiness_score'
  | 'taxi_final_admin_handoff_matrix'
  | 'taxi_anti_accidental_runtime_guard'
  | 'taxi_client_boundary_compatibility_assertions'
  | 'taxi_next_phase_handoff'
  | 'taxi_admin_ui_review_only_plan'
  | 'taxi_db_schema_plan'
  | 'taxi_route_contract_plan'
  | 'taxi_schema_runtime_separation'
  | 'taxi_future_scheduler_plan'
  | 'taxi_db_schema_exact_approval_plan'
  | 'taxi_prisma_preflight_plan'
  | 'taxi_migration_rollback_plan'
  | 'taxi_db_runtime_zero_access_guard'
  | 'taxi_prisma_schema_candidate_package'
  | 'taxi_schema_candidate_owner_approval'
  | 'taxi_schema_candidate_diff_gate'
  | 'taxi_schema_candidate_zero_access_guard'
  | 'taxi_schema_candidate_materialization_plan'
  | 'taxi_schema_candidate_materialization_approval_gate'
  | 'taxi_schema_candidate_diff_preview_gate'
  | 'taxi_schema_candidate_materialization_zero_access_guard'
  | 'taxi_admin_foundation_completion_100_percent'
  | 'taxi_admin_mobile_ui_return_gate'
  | 'taxi_admin_runtime_schema_scheduler_lock'
  | 'taxi_admin_no_fake_success_completion_guard'
  | 'taxi_admin_ui_cockpit'
  | 'taxi_admin_tariff_config_panel'
  | 'taxi_admin_commission_config_panel'
  | 'taxi_admin_application_review_panel'
  | 'taxi_admin_provider_wallet_runtime_lock_panel';

export type TaxiAdminPermissionKey =
  | 'taxi:read'
  | 'taxi:ai-report:read'
  | 'taxi:complaint:review'
  | 'taxi:league:review'
  | 'taxi:reward:review'
  | 'taxi:provider:configure'
  | 'taxi:runtime:approve'
  | 'taxi:ai-report:review'
  | 'taxi:audit:read'
  | 'taxi:client-boundary:read'
  | 'taxi:decision:review'
  | 'taxi:appeal:review'
  | 'taxi:report:export'
  | 'taxi:evidence:review'
  | 'taxi:dashboard:read'
  | 'taxi:action-state:review'
  | 'taxi:notification:read'
  | 'taxi:notification:review'
  | 'taxi:action-inbox:review'
  | 'taxi:approval-gate:review'
  | 'taxi:report:close'
  | 'taxi:reward:approve'
  | 'taxi:mobile-summary:publish'
  | 'taxi:execution-readiness:review'
  | 'taxi:runtime-route:approve'
  | 'taxi:scheduler:approve'
  | 'taxi:db-schema:approve'
  | 'taxi:wallet-payment-payout:approve'
  | 'taxi:provider-dispatch:approve'
  | 'taxi:next-phase:review'
  | 'taxi:db-schema:plan'
  | 'taxi:route-plan:review'
  | 'taxi:admin-ui:plan'
  | 'taxi:schema-candidate:review'
  | 'taxi:schema-candidate:approve'
  | 'taxi:schema-materialization:review'
  | 'taxi:schema-materialization:approve'
  | 'taxi:foundation-completion:read'
  | 'taxi:mobile-ui-return:review'
  | 'taxi:runtime-lock:review'
  | 'taxi:admin-ui-cockpit:read'
  | 'taxi:admin-ui-cockpit:review';

export type TaxiAdminActionStatus =
  | 'visible_contract_ready'
  | 'review_only'
  | 'safe_disabled'
  | 'exact_approval_required';

export interface TaxiAdminSectionContract {
  readonly sectionId: TaxiAdminSectionId;
  readonly title: string;
  readonly description: string;
  readonly permission: TaxiAdminPermissionKey;
  readonly status: TaxiAdminActionStatus;
  readonly sourceBackedByFoundation: true;
  readonly mountedRuntimeNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminCompatibilitySnapshot {
  readonly version: TaxiAdminReadinessVersion;
  readonly module: 'taxi';
  readonly status: 'admin_compatible_foundation_safe_disabled_ready';
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly adminUiMayUseContractsOnlyNow: true;
  readonly foundation: TaxiFoundationSnapshot;
  readonly kernel: TaxiKernelBridgeSnapshot;
  readonly clientBoundary: TaxiClientBoundarySnapshot;
  readonly aiDailyReview: TaxiAiDailyReportSnapshot;
  readonly aiDailyExport: TaxiAiDailyExportSnapshot;
  readonly adminDashboard: TaxiAdminDashboardReadinessSnapshot;
  readonly adminNotifications: TaxiAdminNotificationReadinessSnapshot;
  readonly adminApprovalGates: TaxiAdminApprovalGatesSnapshot;
  readonly adminExecutionReadiness: TaxiAdminExecutionReadinessSnapshot;
  readonly finalControl: TaxiFinalControlSnapshot;
  readonly nextPhaseHandoff: TaxiNextPhaseHandoffSnapshot;
  readonly dbSchemaApproval: TaxiDbSchemaApprovalSnapshot;
  readonly prismaSchemaCandidate: TaxiPrismaSchemaCandidateSnapshot;
  readonly schemaCandidateMaterialization: TaxiSchemaCandidateMaterializationSnapshot;
  readonly adminFoundationCompletion: TaxiAdminFoundationCompletionSnapshot;
  readonly adminUiCockpit: TaxiAdminUiCockpitSnapshot;
  readonly adminIntegration: TaxiAdminIntegrationSnapshot;
  readonly aiAdminDecision: TaxiAiAdminDecisionSnapshot;
  readonly adminSections: readonly TaxiAdminSectionContract[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly runtimeRoutesMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly exactApprovalRequiredForRuntime: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminReadinessDecisionInput {
  readonly requestedSection: TaxiAdminSectionId;
  readonly hasAdminPermission: boolean;
  readonly wantsRuntimeExecution: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsProviderPaymentOrPayout: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiAdminReadinessDecision {
  readonly requestedSection: TaxiAdminSectionId;
  readonly canRenderAdminSection: boolean;
  readonly canExecuteRuntime: false;
  readonly blockedReasons: readonly string[];
  readonly requiresExactApprovalForRuntime: true;
  readonly fakeSuccessBlocked: true;
}
