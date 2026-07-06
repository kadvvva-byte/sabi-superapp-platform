import type { TaxiCountryCode, TaxiMoneyAmount, TaxiTariffCode } from '../taxiFoundation.types';

export type TaxiAdminRuntimeReadinessVersion001X = 'TAXI-BACKEND-FOUNDATION-001X-MEGA';

export type TaxiAdminRuntimePanelDomain001X =
  | 'schema_migration_control'
  | 'driver_onboarding_review'
  | 'vehicle_park_review'
  | 'tariff_region_matrix'
  | 'quote_dispatch_monitor'
  | 'trip_lifecycle_monitor'
  | 'payment_hold_settlement_review'
  | 'support_dispute_safety_review'
  | 'provider_readiness_control'
  | 'audit_compliance_export';

export type TaxiAdminRuntimeActionKind001X =
  | 'review'
  | 'approve'
  | 'reject'
  | 'request_changes'
  | 'lock'
  | 'unlock_after_review'
  | 'preview_only'
  | 'export_readiness_report';

export type TaxiAdminRuntimePermission001X =
  | 'taxi:admin:read'
  | 'taxi:admin:write'
  | 'taxi:driver-review:write'
  | 'taxi:vehicle-review:write'
  | 'taxi:tariff-region:write'
  | 'taxi:dispatch:read'
  | 'taxi:trip-monitor:read'
  | 'taxi:settlement-review:write'
  | 'taxi:support-safety:write'
  | 'taxi:provider-readiness:write'
  | 'taxi:audit:read';

export type TaxiAdminRuntimeGate001X =
  | 'admin_auth_required'
  | 'maker_checker_required'
  | 'audit_reason_required'
  | 'country_city_scope_required'
  | 'schema_approval_required'
  | 'provider_reference_labels_required'
  | 'wallet_boundary_approval_required'
  | 'driver_kyc_required'
  | 'vehicle_documents_required'
  | 'tariff_region_config_required'
  | 'support_evidence_required'
  | 'support_safety_policy_approved'
  | 'refund_settlement_review_required'
  | 'fake_success_blocked';

export interface TaxiAdminRuntimePanel001X {
  readonly id: string;
  readonly domain: TaxiAdminRuntimePanelDomain001X;
  readonly title: string;
  readonly purpose: string;
  readonly permissions: readonly TaxiAdminRuntimePermission001X[];
  readonly gates: readonly TaxiAdminRuntimeGate001X[];
  readonly actions: readonly TaxiAdminRuntimeAction001X[];
  readonly readsRuntimeNow: false;
  readonly writesRuntimeNow: false;
  readonly routeMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminRuntimeAction001X {
  readonly id: string;
  readonly kind: TaxiAdminRuntimeActionKind001X;
  readonly label: string;
  readonly permission: TaxiAdminRuntimePermission001X;
  readonly gate: TaxiAdminRuntimeGate001X;
  readonly requiresAuditReason: true;
  readonly requiresMakerChecker: true;
  readonly exactOwnerApprovalRequiredForRuntime: true;
  readonly dryRunOnlyNow: true;
  readonly writesDbNow: false;
  readonly callsProviderNow: false;
  readonly mutatesWalletNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminWorkflowStep001X {
  readonly id: string;
  readonly panelId: string;
  readonly order: number;
  readonly title: string;
  readonly requiredGate: TaxiAdminRuntimeGate001X;
  readonly blockingUntilPassed: true;
  readonly ownerApprovalRequiredBeforeRuntime: true;
  readonly backendRuntimeEnabledNow: false;
  readonly dbMutationEnabledNow: false;
}

export interface TaxiAdminOperationalQueue001X {
  readonly id: string;
  readonly domain: TaxiAdminRuntimePanelDomain001X;
  readonly sourceModelCandidate: string;
  readonly prioritySignals: readonly string[];
  readonly requiredSlaMinutes: number;
  readonly readsDbNow: false;
  readonly writesDbNow: false;
  readonly mountedNow: false;
  readonly fakeQueueSuccessBlocked: true;
}

export interface TaxiAdminMakerCheckerRule001X {
  readonly id: string;
  readonly actionIdPrefix: string;
  readonly firstActorPermission: TaxiAdminRuntimePermission001X;
  readonly secondActorPermission: TaxiAdminRuntimePermission001X;
  readonly sameActorAllowed: false;
  readonly moneyMovementBlockedUntilSecondApproval: true;
  readonly runtimeApprovalEnabledNow: false;
  readonly fakeApprovalBlocked: true;
}

export interface TaxiAdminRuntimeReadinessInput001X {
  readonly countryCode: TaxiCountryCode;
  readonly cityId: string;
  readonly tariffCode: TaxiTariffCode;
  readonly adminTokenHasWriteScope: boolean;
  readonly makerCheckerConfigured: boolean;
  readonly schemaMigrationApproved: boolean;
  readonly providerReferenceLabelsApproved: boolean;
  readonly walletPaymentBoundaryApproved: boolean;
  readonly supportSafetyPolicyApproved: boolean;
  readonly auditExportPolicyApproved: boolean;
}

export interface TaxiAdminRuntimeReadinessDecision001X {
  readonly canMountAdminRoutesNow: false;
  readonly canEnableAdminUiRuntimeNow: false;
  readonly canWriteDbNow: false;
  readonly canMutateWalletNow: false;
  readonly canCapturePaymentNow: false;
  readonly canExecutePayoutNow: false;
  readonly canDispatchProviderNow: false;
  readonly missingGates: readonly TaxiAdminRuntimeGate001X[];
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiAdminSettlementReviewPreviewInput001X {
  readonly currency: TaxiMoneyAmount['currency'];
  readonly grossFareMinor: number;
  readonly adminConfiguredCommissionBasisPoints?: number;
  readonly refundMinor?: number;
  readonly driverAdjustmentMinor?: number;
  readonly supportPenaltyMinor?: number;
}

export interface TaxiAdminSettlementReviewPreview001X {
  readonly grossFare: TaxiMoneyAmount;
  readonly commissionPreview: TaxiMoneyAmount;
  readonly refundPreview: TaxiMoneyAmount;
  readonly driverNetPreview: TaxiMoneyAmount;
  readonly adminReviewRequired: true;
  readonly makerCheckerRequired: true;
  readonly walletMutationNow: false;
  readonly paymentCaptureNow: false;
  readonly payoutNow: false;
  readonly fakeSettlementApprovalBlocked: true;
}

export interface TaxiAdminRuntimeSnapshot001X {
  readonly version: TaxiAdminRuntimeReadinessVersion001X;
  readonly status: 'admin_runtime_readiness_ready_safe_disabled';
  readonly panels: readonly TaxiAdminRuntimePanel001X[];
  readonly workflowSteps: readonly TaxiAdminWorkflowStep001X[];
  readonly operationalQueues: readonly TaxiAdminOperationalQueue001X[];
  readonly makerCheckerRules: readonly TaxiAdminMakerCheckerRule001X[];
  readonly routeRuntimeMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly envReadNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}
