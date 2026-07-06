import type { TaxiCountryCode, TaxiMoneyAmount, TaxiTariffCode } from '../taxiFoundation.types';

export type TaxiSchemaPlanningVersion001W = 'TAXI-BACKEND-FOUNDATION-001W-MEGA';

export type TaxiSchemaCandidateModelName001W =
  | 'TaxiRiderProfile'
  | 'TaxiDriverProfile'
  | 'TaxiDriverApplication'
  | 'TaxiVehicle'
  | 'TaxiDriverVehicleAssignment'
  | 'TaxiTariffRegion'
  | 'TaxiQuote'
  | 'TaxiRiderRequest'
  | 'TaxiDispatchOffer'
  | 'TaxiTrip'
  | 'TaxiPaymentHold'
  | 'TaxiDriverSettlement'
  | 'TaxiSupportCase'
  | 'TaxiDisputeEvidence'
  | 'TaxiSafetyEvent'
  | 'TaxiAuditLog'
  | 'TaxiProviderReadinessSnapshot'
  | 'TaxiIdempotencyRecord'
  | 'TaxiTripRatingLedger';

export type TaxiSchemaCandidateEnumName001W =
  | 'TaxiDriverVerificationStatus'
  | 'TaxiVehicleReviewStatus'
  | 'TaxiTariffRegionStatus'
  | 'TaxiQuoteStatus'
  | 'TaxiRiderRequestStatus'
  | 'TaxiDispatchOfferStatus'
  | 'TaxiTripStatus'
  | 'TaxiPaymentHoldStatus'
  | 'TaxiSettlementStatus'
  | 'TaxiSupportCaseStatus'
  | 'TaxiDisputeEvidenceType'
  | 'TaxiSafetyEventType'
  | 'TaxiAuditActorType'
  | 'TaxiProviderArea'
  | 'TaxiIdempotencyStatus'
  | 'TaxiRatingLedgerSource';

export type TaxiSchemaCandidateDomain001W =
  | 'identity_verification'
  | 'vehicle_park'
  | 'tariff_region'
  | 'quote_request_dispatch'
  | 'trip_lifecycle'
  | 'payment_settlement'
  | 'support_dispute_safety'
  | 'audit_compliance'
  | 'provider_readiness'
  | 'idempotency_rating';

export type TaxiSchemaFieldKind001W =
  | 'id'
  | 'string'
  | 'int'
  | 'boolean'
  | 'datetime'
  | 'json'
  | 'money_minor'
  | 'country_code'
  | 'tariff_code'
  | 'enum'
  | 'relation_id';

export type TaxiSchemaRelationKind001W = 'one_to_one' | 'one_to_many' | 'many_to_one';

export interface TaxiSchemaCandidateField001W {
  readonly name: string;
  readonly kind: TaxiSchemaFieldKind001W;
  readonly required: boolean;
  readonly indexed: boolean;
  readonly unique: boolean;
  readonly enumName?: TaxiSchemaCandidateEnumName001W;
  readonly referencesModel?: TaxiSchemaCandidateModelName001W;
  readonly notes: string;
}

export interface TaxiSchemaCandidateRelation001W {
  readonly fromModel: TaxiSchemaCandidateModelName001W;
  readonly toModel: TaxiSchemaCandidateModelName001W;
  readonly kind: TaxiSchemaRelationKind001W;
  readonly fieldName: string;
  readonly cascadeDeleteAllowedNow: false;
  readonly requiredForRuntime: true;
}

export interface TaxiSchemaCandidateIndex001W {
  readonly modelName: TaxiSchemaCandidateModelName001W;
  readonly name: string;
  readonly fields: readonly string[];
  readonly unique: boolean;
  readonly reason: string;
}

export interface TaxiSchemaCandidateModel001W {
  readonly modelName: TaxiSchemaCandidateModelName001W;
  readonly domain: TaxiSchemaCandidateDomain001W;
  readonly purpose: string;
  readonly fields: readonly TaxiSchemaCandidateField001W[];
  readonly indexes: readonly TaxiSchemaCandidateIndex001W[];
  readonly ownerApprovalRequiredBeforeSchemaWrite: true;
  readonly migrationExecutedNow: false;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly runtimeRouteMountedNow: false;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSchemaCandidateEnum001W {
  readonly enumName: TaxiSchemaCandidateEnumName001W;
  readonly values: readonly string[];
  readonly ownerApprovalRequiredBeforeSchemaWrite: true;
  readonly prismaSchemaWriteNow: false;
}

export interface TaxiSchemaMigrationPlanningLock001W {
  readonly step: string;
  readonly description: string;
  readonly exactOwnerApprovalRequired: true;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly rollbackPlanRequired: true;
  readonly fakeMigrationSuccessBlocked: true;
}

export interface TaxiSchemaProviderBoundary001W {
  readonly area: 'maps_routes_eta' | 'dispatch_matching' | 'wallet_payment' | 'driver_kyc' | 'notifications' | 'fraud_safety';
  readonly requiredReferenceLabels: readonly string[];
  readonly envReadNow: false;
  readonly providerCallNow: false;
  readonly runtimeBindingNow: false;
  readonly fakeProviderSuccessBlocked: true;
}

export interface TaxiSchemaReadinessInput001W {
  readonly countryCode: TaxiCountryCode;
  readonly cityId: string;
  readonly targetTariff: TaxiTariffCode;
  readonly adminApprovedSchemaVersion?: string;
  readonly ownerApprovedMigration: boolean;
  readonly rollbackPlanReviewed: boolean;
  readonly providerReferenceLabelsApproved: boolean;
  readonly walletPaymentBoundaryApproved: boolean;
}

export interface TaxiSchemaReadinessDecision001W {
  readonly canWritePrismaSchemaNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly missing: readonly string[];
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSettlementSchemaPreviewInput001W {
  readonly currency: TaxiMoneyAmount['currency'];
  readonly grossFareMinor: number;
  readonly adminConfiguredCommissionBasisPoints?: number;
  readonly driverAdjustmentMinor?: number;
  readonly refundMinor?: number;
}

export interface TaxiSettlementSchemaPreview001W {
  readonly grossFare: TaxiMoneyAmount;
  readonly commissionPreview: TaxiMoneyAmount;
  readonly driverNetPreview: TaxiMoneyAmount;
  readonly refundPreview: TaxiMoneyAmount;
  readonly dbSettlementPersistedNow: false;
  readonly walletMutationNow: false;
  readonly paymentCaptureNow: false;
  readonly payoutNow: false;
  readonly adminConfigRequiredForProduction: true;
  readonly fakeSettlementSuccessBlocked: true;
}

export interface TaxiSchemaPlanningSnapshot001W {
  readonly version: TaxiSchemaPlanningVersion001W;
  readonly status: 'schema_planning_ready_safe_disabled';
  readonly models: readonly TaxiSchemaCandidateModel001W[];
  readonly enums: readonly TaxiSchemaCandidateEnum001W[];
  readonly relations: readonly TaxiSchemaCandidateRelation001W[];
  readonly indexes: readonly TaxiSchemaCandidateIndex001W[];
  readonly migrationLocks: readonly TaxiSchemaMigrationPlanningLock001W[];
  readonly providerBoundaries: readonly TaxiSchemaProviderBoundary001W[];
  readonly runtimeRoutesMounted: false;
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
