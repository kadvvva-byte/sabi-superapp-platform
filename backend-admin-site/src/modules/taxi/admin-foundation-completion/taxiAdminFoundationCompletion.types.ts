import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiAdminFoundationCompletionVersion = 'TAXI-BACKEND-FOUNDATION-001R';

export type TaxiAdminFoundationCompletionStatus = 'admin_foundation_100_percent_contract_readiness_safe_disabled';

export type TaxiAdminFoundationCompletionArea =
  | 'foundation_contracts'
  | 'admin_ui_contracts'
  | 'client_boundary_contracts'
  | 'sabi_ai_daily_report_contracts'
  | 'complaint_review_contracts'
  | 'approval_gate_contracts'
  | 'db_schema_planning_contracts'
  | 'route_runtime_planning_contracts'
  | 'scheduler_planning_contracts'
  | 'wallet_payment_payout_lock_contracts'
  | 'provider_dispatch_lock_contracts'
  | 'no_fake_success_controls';

export type TaxiAdminFoundationCompletionGateId =
  | 'admin_foundation_contract_complete'
  | 'admin_ui_review_only_complete'
  | 'client_boundary_only_complete'
  | 'daily_ai_report_complete'
  | 'all_complaints_daily_review_complete'
  | 'raw_evidence_admin_only_complete'
  | 'schema_candidate_plan_complete'
  | 'route_plan_complete'
  | 'scheduler_plan_complete'
  | 'runtime_exact_approval_required'
  | 'db_exact_approval_required'
  | 'wallet_payment_payout_exact_approval_required'
  | 'provider_dispatch_exact_approval_required';

export interface TaxiAdminFoundationCompletionItem {
  readonly area: TaxiAdminFoundationCompletionArea;
  readonly title: string;
  readonly readiness: 'complete_contract_ready';
  readonly adminCompatible: true;
  readonly clientKernelBoundaryCompatible: true;
  readonly runtimeEnabledNow: false;
  readonly exactApprovalRequiredForExecution: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminFoundationCompletionGate {
  readonly gateId: TaxiAdminFoundationCompletionGateId;
  readonly title: string;
  readonly requiredBeforeNextPhase: true;
  readonly completedAtContractLevel: true;
  readonly executionEnabledNow: false;
  readonly ownerExactApprovalRequiredBeforeExecution: true;
}

export interface TaxiAdminFoundationCompletionDecisionInput {
  readonly wantsAdminUiRuntime: boolean;
  readonly wantsRouteMount: boolean;
  readonly wantsSchedulerRuntime: boolean;
  readonly wantsPrismaSchemaWrite: boolean;
  readonly wantsPrismaGenerateOrMigration: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsWalletPaymentPayout: boolean;
  readonly wantsProviderDispatch: boolean;
  readonly hasExactOwnerApproval: boolean;
}

export interface TaxiAdminFoundationCompletionDecision {
  readonly canProceedToClientUiUxNow: false;
  readonly canExecuteRuntimeNow: false;
  readonly canWriteSchemaNow: false;
  readonly canRunDbNow: false;
  readonly blockedReasons: readonly string[];
  readonly foundationAdminPreparedAtContractLevel: true;
  readonly exactApprovalRequiredBeforeExecution: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminFoundationCompletionSnapshot {
  readonly version: TaxiAdminFoundationCompletionVersion;
  readonly module: 'taxi';
  readonly status: TaxiAdminFoundationCompletionStatus;
  readonly foundationAndAdminPreparedAt100PercentContractLevel: true;
  readonly clientUiReturnBlockedUntilRealFoundationAdmin100: true;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly clientAppMustUseKernel: true;
  readonly clientReceivesKernelSafeStatusOnly: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly allComplaintsCheckedEveryDayRequired: true;
  readonly fullDailyAiReportRequired: true;
  readonly sabiAiMustCheckAllComplaintsEveryDay: true;
  readonly adminDashboardContractsComplete: true;
  readonly adminNotificationContractsComplete: true;
  readonly adminApprovalGatesComplete: true;
  readonly schemaPlanningContractsComplete: true;
  readonly routePlanningContractsComplete: true;
  readonly schedulerPlanningContractsComplete: true;
  readonly runtimeExactApprovalRequired: true;
  readonly dbExactApprovalRequired: true;
  readonly providerPaymentPayoutExactApprovalRequired: true;
  readonly completionItems: readonly TaxiAdminFoundationCompletionItem[];
  readonly completionGates: readonly TaxiAdminFoundationCompletionGate[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly routeRuntimeMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}
