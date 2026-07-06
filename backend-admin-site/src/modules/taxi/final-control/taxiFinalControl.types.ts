import type { TaxiRouteDescriptor } from '../foundation';

export type TaxiFinalControlVersion = 'TAXI-BACKEND-FOUNDATION-001L';

export type TaxiFinalControlStatus = 'final_foundation_control_safe_disabled_ready';

export type TaxiFinalReadinessDimensionId =
  | 'client_boundary_compatibility'
  | 'admin_foundation_contracts'
  | 'sabi_ai_daily_report_completeness'
  | 'all_complaints_daily_review'
  | 'evidence_redaction_privacy'
  | 'admin_approval_gates'
  | 'execution_readiness_gates'
  | 'anti_accidental_runtime_guard'
  | 'wallet_payment_payout_locks'
  | 'provider_dispatch_locks'
  | 'fake_success_blockers';

export type TaxiFinalReadinessLevel = 'ready_contract_only' | 'blocked_until_exact_approval';

export interface TaxiFinalReadinessScoreItem {
  readonly dimensionId: TaxiFinalReadinessDimensionId;
  readonly title: string;
  readonly scorePercent: 100;
  readonly level: TaxiFinalReadinessLevel;
  readonly adminVisible: true;
  readonly clientKernelBoundaryCompatible: true;
  readonly blocksRuntimeUntilExactApproval: true;
  readonly fakeSuccessBlocked: true;
}

export type TaxiFinalHandoffOwner =
  | 'foundation'
  | 'admin_ui'
  | 'client_boundary'
  | 'sabi_ai'
  | 'db_schema'
  | 'runtime_api'
  | 'provider_dispatch'
  | 'wallet_payment_payout';

export type TaxiFinalHandoffStage =
  | 'contract_ready_safe_disabled'
  | 'admin_visible_contract_ready'
  | 'exact_approval_required_before_execution'
  | 'future_runtime_blocked_now';

export interface TaxiFinalHandoffMatrixItem {
  readonly owner: TaxiFinalHandoffOwner;
  readonly stage: TaxiFinalHandoffStage;
  readonly title: string;
  readonly requiredBeforeRuntime: readonly string[];
  readonly canExecuteNow: false;
  readonly exactApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export type TaxiAntiAccidentalRuntimeGuardId =
  | 'no_app_ts_mount_without_exact_approval'
  | 'no_scheduler_start_without_exact_approval'
  | 'no_db_read_write_without_schema_gate'
  | 'no_wallet_mutation_without_ledger_gate'
  | 'no_payment_charge_without_provider_gate'
  | 'no_payout_release_without_legal_finance_gate'
  | 'no_dispatch_provider_call_without_reference_label_gate'
  | 'no_mobile_direct_backend_provider_imports'
  | 'no_raw_evidence_publish_to_mobile'
  | 'no_fake_success_fallback';

export interface TaxiAntiAccidentalRuntimeGuard {
  readonly guardId: TaxiAntiAccidentalRuntimeGuardId;
  readonly title: string;
  readonly enforcedFromFoundation: true;
  readonly canBeBypassedByUi: false;
  readonly exactApprovalRequiredToUnlock: true;
  readonly runtimeEnabledNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiClientBoundaryCompatibilityAssertion {
  readonly assertionId:
    | 'mobile_ui_uses_kernel_facade_only'
    | 'mobile_receives_redacted_status_only'
    | 'mobile_publish_after_admin_lock_only'
    | 'mobile_close_stops_taxi_session_runtime'
    | 'mobile_resume_never_fakes_active_trip';
  readonly description: string;
  readonly requiredForMobileUi: true;
  readonly adminFoundationBacked: true;
  readonly directProviderImportAllowed: false;
  readonly directPaymentOrPayoutAllowed: false;
  readonly rawEvidenceAllowedOnMobile: false;
}

export interface TaxiFinalControlSnapshot {
  readonly version: TaxiFinalControlVersion;
  readonly module: 'taxi';
  readonly status: TaxiFinalControlStatus;
  readonly finalFoundationControlLayerReady: true;
  readonly readinessScorePercent: 100;
  readonly adminHandoffMatrixReady: true;
  readonly antiAccidentalRuntimeGuardsReady: true;
  readonly clientBoundaryCompatibilityAssertionsReady: true;
  readonly dailyAiReportRequired: true;
  readonly allComplaintsCheckedEveryDayRequired: true;
  readonly adminAddedWithFoundation: true;
  readonly maximumCompatibilityMode: true;
  readonly clientAppMustUseKernel: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly readinessItems: readonly TaxiFinalReadinessScoreItem[];
  readonly handoffMatrix: readonly TaxiFinalHandoffMatrixItem[];
  readonly antiAccidentalRuntimeGuards: readonly TaxiAntiAccidentalRuntimeGuard[];
  readonly clientBoundaryAssertions: readonly TaxiClientBoundaryCompatibilityAssertion[];
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

export interface TaxiFinalControlReadinessInput {
  readonly hasExactOwnerApproval: boolean;
  readonly wantsRuntimeMount: boolean;
  readonly wantsSchedulerActivation: boolean;
  readonly wantsDbReadOrWrite: boolean;
  readonly wantsWalletPaymentPayout: boolean;
  readonly wantsProviderDispatch: boolean;
  readonly wantsClientBoundaryDirectProviderAccess: boolean;
  readonly wantsRawEvidenceOnMobile: boolean;
}

export interface TaxiFinalControlReadinessDecision {
  readonly canProceedWithFoundationOnly: true;
  readonly canEnableRuntimeNow: false;
  readonly canMountRoutesNow: false;
  readonly canActivateSchedulerNow: false;
  readonly canReadOrWriteDbNow: false;
  readonly canMutateWalletOrChargeOrPayoutNow: false;
  readonly canCallProviderNow: false;
  readonly canExposeRawEvidenceToMobileNow: false;
  readonly blockedReasons: readonly string[];
  readonly exactApprovalRequiredBeforeRuntime: true;
  readonly fakeSuccessBlocked: true;
}
