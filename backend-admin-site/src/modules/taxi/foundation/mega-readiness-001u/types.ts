import type { TaxiCountryCode, TaxiMoneyAmount, TaxiParticipantRole, TaxiTariffCode } from '../taxiFoundation.types';
import type { TaxiTripLifecycleStage001T } from '../trip-lifecycle-control-001t/types';

export type TaxiMegaFoundationVersion001U = 'TAXI-BACKEND-FOUNDATION-001U';

export type TaxiMegaReadinessDomain001U =
  | 'admin_first_control'
  | 'rider_verification'
  | 'driver_verification'
  | 'vehicle_and_park_review'
  | 'tariff_region_matrix'
  | 'quote_route_eta_control'
  | 'dispatch_matching_control'
  | 'trip_lifecycle_control'
  | 'safety_support_dispute'
  | 'wallet_payment_settlement_lock'
  | 'provider_runtime_lock'
  | 'audit_compliance_readiness';

export type TaxiVerificationRequirement001U =
  | 'phone_verified'
  | 'profile_complete'
  | 'age_region_allowed'
  | 'document_uploaded'
  | 'document_admin_approved'
  | 'selfie_liveness_required'
  | 'vehicle_document_approved'
  | 'driver_license_approved'
  | 'park_contract_approved'
  | 'risk_score_reviewed'
  | 'sanctions_or_fraud_screen_clear'
  | 'local_regulation_policy_configured';

export type TaxiDispatchReadinessCode001U =
  | 'admin_tariff_configured'
  | 'admin_commission_configured'
  | 'region_enabled'
  | 'route_provider_configured'
  | 'dispatch_provider_configured'
  | 'driver_online_allowed'
  | 'driver_balance_reserve_ok'
  | 'driver_documents_approved'
  | 'vehicle_approved'
  | 'rider_payment_or_cash_policy_ready'
  | 'fraud_and_safety_clear';

export type TaxiSupportCaseType001U =
  | 'price_dispute'
  | 'route_dispute'
  | 'driver_no_show'
  | 'rider_no_show'
  | 'unsafe_behavior'
  | 'cash_reconciliation'
  | 'lost_item'
  | 'fake_trip_or_collusion'
  | 'accident_or_emergency'
  | 'refund_review';

export type TaxiAdminAction001U =
  | 'approve_driver'
  | 'reject_driver'
  | 'approve_vehicle'
  | 'configure_tariff'
  | 'configure_commission'
  | 'enable_region'
  | 'lock_region'
  | 'freeze_driver'
  | 'freeze_rider'
  | 'resolve_dispute'
  | 'approve_refund'
  | 'unlock_provider_runtime';

export interface TaxiMegaGate001U {
  readonly domain: TaxiMegaReadinessDomain001U;
  readonly adminVisible: true;
  readonly runtimeMountedNow: false;
  readonly dbWriteEnabledNow: false;
  readonly walletMutationEnabledNow: false;
  readonly paymentEnabledNow: false;
  readonly payoutEnabledNow: false;
  readonly providerDispatchEnabledNow: false;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
  readonly reason: string;
}

export interface TaxiVerificationProfile001U {
  readonly role: TaxiParticipantRole;
  readonly required: readonly TaxiVerificationRequirement001U[];
  readonly adminApprovalRequired: true;
  readonly automatedDecisionMayRejectUser: false;
  readonly runtimeActivationNow: false;
  readonly fakeApprovalBlocked: true;
}

export interface TaxiTariffRegionCell001U {
  readonly countryCode: TaxiCountryCode;
  readonly tariffCode: TaxiTariffCode;
  readonly regionConfiguredByAdmin: true;
  readonly commissionConfiguredByAdmin: true;
  readonly minFareConfiguredByAdmin: true;
  readonly surgeRulesConfiguredByAdmin: true;
  readonly cashPolicyConfiguredByAdmin: true;
  readonly runtimeQuoteEnabledNow: false;
  readonly fakeFareSuccessBlocked: true;
}

export interface TaxiDispatchMatrixRule001U {
  readonly code: TaxiDispatchReadinessCode001U;
  readonly requiredBeforeRuntimeOffer: true;
  readonly blocksDriverOfferWhenMissing: true;
  readonly adminVisible: true;
  readonly providerBackedWhenRuntimeEnabled: boolean;
}

export interface TaxiSupportDisputeRule001U {
  readonly caseType: TaxiSupportCaseType001U;
  readonly freezesSettlement: boolean;
  readonly freezesRewards: boolean;
  readonly adminReviewRequired: true;
  readonly evidenceRequired: readonly string[];
  readonly uiMayResolveAutomatically: false;
  readonly fakeResolutionBlocked: true;
}

export interface TaxiAdminControlPanel001U {
  readonly id: string;
  readonly title: string;
  readonly actions: readonly TaxiAdminAction001U[];
  readonly routeMountedNow: false;
  readonly runtimeWritesEnabledNow: false;
  readonly auditRequired: true;
}

export interface TaxiMegaReadinessInput001U {
  readonly countryCode: TaxiCountryCode;
  readonly tariffCode: TaxiTariffCode;
  readonly role: TaxiParticipantRole;
  readonly driverBalanceMinor?: number;
  readonly grossFareMinor?: number;
  readonly currency?: TaxiMoneyAmount['currency'];
  readonly adminConfiguredCommissionBasisPoints?: number;
  readonly verificationPresent: readonly TaxiVerificationRequirement001U[];
  readonly dispatchPresent: readonly TaxiDispatchReadinessCode001U[];
  readonly hasOpenSupportCase: boolean;
  readonly openSupportCaseTypes: readonly TaxiSupportCaseType001U[];
}

export interface TaxiMegaReadinessDecision001U {
  readonly version: TaxiMegaFoundationVersion001U;
  readonly canEnableRuntimeNow: false;
  readonly canCreateRuntimeTripNow: false;
  readonly canSendRuntimeDispatchOfferNow: false;
  readonly canMutateWalletNow: false;
  readonly canCapturePaymentNow: false;
  readonly canSettleDriverNow: false;
  readonly missingVerification: readonly TaxiVerificationRequirement001U[];
  readonly missingDispatch: readonly TaxiDispatchReadinessCode001U[];
  readonly blockedLifecycleStages: readonly TaxiTripLifecycleStage001T[];
  readonly supportDisputeLocks: readonly TaxiSupportCaseType001U[];
  readonly estimatedCommissionPreview?: TaxiMoneyAmount;
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiMegaFoundationSnapshot001U {
  readonly version: TaxiMegaFoundationVersion001U;
  readonly module: 'taxi';
  readonly status: 'mega_foundation_safe_disabled_ready';
  readonly adminFirst: true;
  readonly sourceOnlyFoundation: true;
  readonly runtimeRoutesMounted: false;
  readonly adminUiRuntimeMounted: false;
  readonly dbReadEnabled: false;
  readonly dbWriteEnabled: false;
  readonly prismaSchemaWriteEnabled: false;
  readonly prismaGenerateEnabled: false;
  readonly prismaMigrationEnabled: false;
  readonly walletMutationEnabled: false;
  readonly paymentEnabled: false;
  readonly payoutEnabled: false;
  readonly providerDispatchEnabled: false;
  readonly mobileKernelAllowed: false;
  readonly gates: readonly TaxiMegaGate001U[];
  readonly verificationProfiles: readonly TaxiVerificationProfile001U[];
  readonly tariffRegionMatrix: readonly TaxiTariffRegionCell001U[];
  readonly dispatchMatrix: readonly TaxiDispatchMatrixRule001U[];
  readonly supportDisputeRules: readonly TaxiSupportDisputeRule001U[];
  readonly adminControlPanels: readonly TaxiAdminControlPanel001U[];
}
