import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiDbSchemaApprovalVersion = 'TAXI-BACKEND-FOUNDATION-001N';

export type TaxiDbSchemaApprovalStatus = 'db_schema_exact_approval_planning_safe_disabled_ready';

export type TaxiDbSchemaApprovalStage =
  | 'schema_inventory'
  | 'model_contract_review'
  | 'prisma_diff_review'
  | 'migration_plan_review'
  | 'rollback_plan_review'
  | 'owner_exact_approval_request'
  | 'blocked_until_exact_approval';

export type TaxiDbSchemaApprovalModelId =
  | 'TaxiRide'
  | 'TaxiRideRouteSnapshot'
  | 'TaxiDriverBalanceLedger'
  | 'TaxiCommissionLedger'
  | 'TaxiDailyAiReport'
  | 'TaxiComplaintCase'
  | 'TaxiEvidenceBundle'
  | 'TaxiAdminDecision'
  | 'TaxiAppealExplanation'
  | 'TaxiCountryLeagueSeason'
  | 'TaxiLeagueScoreEvent'
  | 'TaxiRewardFreezeAudit';

export type TaxiDbSchemaPreflightCheckId =
  | 'schema_write_scope_locked'
  | 'prisma_generate_locked'
  | 'migration_locked'
  | 'db_read_locked'
  | 'db_write_locked'
  | 'raw_evidence_admin_only'
  | 'client_boundary_summary_only'
  | 'all_complaints_daily_report_coverage'
  | 'admin_compatibility_coverage'
  | 'rollback_plan_required';

export interface TaxiDbSchemaApprovalModelPlan {
  readonly modelId: TaxiDbSchemaApprovalModelId;
  readonly purpose: string;
  readonly adminVisible: true;
  readonly mobileVisibleRaw: false;
  readonly requiresPrismaSchemaWrite: true;
  readonly requiresMigration: true;
  readonly exactApprovalRequiredBeforeWrite: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiDbSchemaPreflightCheck {
  readonly checkId: TaxiDbSchemaPreflightCheckId;
  readonly title: string;
  readonly requiredBeforeSchemaWrite: true;
  readonly passedNow: false;
  readonly reason: string;
}

export interface TaxiDbSchemaForbiddenExecutionLock {
  readonly id: string;
  readonly blockedNow: true;
  readonly exactApprovalRequired: true;
  readonly reason: string;
}

export interface TaxiDbSchemaApprovalInput {
  readonly wantsPrismaSchemaWrite: boolean;
  readonly wantsPrismaGenerate: boolean;
  readonly wantsPrismaMigration: boolean;
  readonly wantsDbRead: boolean;
  readonly wantsDbWrite: boolean;
  readonly wantsRuntimeRouteMount: boolean;
  readonly wantsSchedulerActivation: boolean;
  readonly hasExactOwnerApproval: boolean;
}

export interface TaxiDbSchemaApprovalDecision {
  readonly canWritePrismaSchemaNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly canActivateSchedulerNow: false;
  readonly blockedReasons: readonly string[];
  readonly exactApprovalRequiredBeforeAnyExecution: true;
  readonly adminCompatibleFromFoundation: true;
  readonly clientAppMustUseKernel: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiDbSchemaApprovalSnapshot {
  readonly version: TaxiDbSchemaApprovalVersion;
  readonly module: 'taxi';
  readonly status: TaxiDbSchemaApprovalStatus;
  readonly dbSchemaExactApprovalPlanningReady: true;
  readonly prismaSchemaWriteEnabledNow: false;
  readonly prismaGenerateEnabledNow: false;
  readonly prismaMigrationEnabledNow: false;
  readonly dbReadEnabledNow: false;
  readonly dbWriteEnabledNow: false;
  readonly runtimeRouteMountEnabledNow: false;
  readonly schedulerRuntimeMountedNow: false;
  readonly adminAddedWithFoundation: true;
  readonly adminUiUsesSameFoundationContracts: true;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly allComplaintsCheckedEveryDayRequired: true;
  readonly fullDailyAiReportRequired: true;
  readonly rollbackPlanRequiredBeforeMigration: true;
  readonly stages: readonly TaxiDbSchemaApprovalStage[];
  readonly modelPlan: readonly TaxiDbSchemaApprovalModelPlan[];
  readonly preflightChecks: readonly TaxiDbSchemaPreflightCheck[];
  readonly forbiddenExecutionLocks: readonly TaxiDbSchemaForbiddenExecutionLock[];
  readonly routeDescriptors: readonly TaxiRouteDescriptor[];
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerEnabled: false;
  readonly fakeSuccessBlocked: true;
}
