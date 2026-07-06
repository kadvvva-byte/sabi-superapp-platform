export type TaxiSchemaApplyCandidateVersion001Z = 'TAXI-BACKEND-FOUNDATION-001Z-MEGA';

export type TaxiSchemaApplyCandidateDomain001Z =
  | 'identity_verification'
  | 'vehicle_park'
  | 'tariff_region'
  | 'quote_request_dispatch'
  | 'trip_lifecycle'
  | 'payment_settlement'
  | 'support_dispute_safety'
  | 'audit_compliance'
  | 'provider_readiness'
  | 'idempotency_rating'
  | 'realtime_shadow';

export type TaxiSchemaApplyCandidateModelName001Z =
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
  | 'TaxiTripRatingLedger'
  | 'TaxiRealtimeTripShadow';

export type TaxiSchemaApplyCandidateEnumName001Z =
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
  | 'TaxiRatingLedgerSource'
  | 'TaxiRealtimeShadowStatus';

export interface TaxiPrismaEnumCandidate001Z {
  readonly enumName: TaxiSchemaApplyCandidateEnumName001Z;
  readonly domain: TaxiSchemaApplyCandidateDomain001Z;
  readonly prismaEnumBlock: string;
  readonly applyToSchemaNow: false;
  readonly ownerApprovalRequiredBeforeAppend: true;
  readonly fakeSchemaApplySuccessBlocked: true;
}

export interface TaxiPrismaModelCandidate001Z {
  readonly modelName: TaxiSchemaApplyCandidateModelName001Z;
  readonly domain: TaxiSchemaApplyCandidateDomain001Z;
  readonly prismaModelBlock: string;
  readonly requiredRelations: readonly string[];
  readonly requiredIndexes: readonly string[];
  readonly applyToSchemaNow: false;
  readonly ownerApprovalRequiredBeforeAppend: true;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly runtimeRouteMountedNow: false;
  readonly fakeSchemaApplySuccessBlocked: true;
}

export type TaxiSchemaApplyGateId001Z =
  | 'owner_exact_schema_append_approval_required'
  | 'schema_backup_required'
  | 'duplicate_model_scan_required'
  | 'relation_integrity_review_required'
  | 'index_name_collision_review_required'
  | 'rollback_plan_required'
  | 'prisma_generate_separate_approval_required'
  | 'migration_separate_approval_required'
  | 'db_runtime_smoke_separate_approval_required'
  | 'app_route_mount_separate_approval_required'
  | 'wallet_payment_provider_separate_approval_required'
  | 'admin_ui_runtime_separate_approval_required';

export interface TaxiSchemaApplyGate001Z {
  readonly id: TaxiSchemaApplyGateId001Z;
  readonly label: string;
  readonly passedNow: false;
  readonly exactOwnerApprovalRequired: true;
  readonly blocksSchemaWriteNow: true;
  readonly blocksPrismaGenerateNow: true;
  readonly blocksMigrationNow: true;
  readonly fakeGatePassBlocked: true;
}

export interface TaxiSchemaApplyPlanStep001Z {
  readonly id: string;
  readonly order: number;
  readonly description: string;
  readonly canExecuteNow: false;
  readonly requiresSeparateApproval: true;
  readonly writesPrismaSchemaNow: false;
  readonly runsPrismaGenerateNow: false;
  readonly runsPrismaMigrationNow: false;
  readonly readsDbNow: false;
  readonly writesDbNow: false;
  readonly mountsRuntimeRoutesNow: false;
  readonly fakeExecutionSuccessBlocked: true;
}

export interface TaxiSchemaApplyCandidateReadinessInput001Z {
  readonly ownerExactSchemaAppendApproval: boolean;
  readonly schemaBackupReviewed: boolean;
  readonly duplicateModelScanPassed: boolean;
  readonly relationIntegrityReviewed: boolean;
  readonly rollbackPlanReviewed: boolean;
  readonly migrationWindowApproved: boolean;
  readonly providerBoundariesApproved: boolean;
  readonly walletPaymentBoundaryApproved: boolean;
}

export interface TaxiSchemaApplyCandidateReadinessDecision001Z {
  readonly canAppendPrismaSchemaNow: false;
  readonly canRunPrismaGenerateNow: false;
  readonly canRunMigrationNow: false;
  readonly canReadDbNow: false;
  readonly canWriteDbNow: false;
  readonly canMountRuntimeRoutesNow: false;
  readonly safeDisabled: true;
  readonly exactOwnerApprovalRequired: true;
  readonly missing: readonly TaxiSchemaApplyGateId001Z[];
  readonly fakeSuccessBlocked: true;
}

export interface TaxiSchemaApplyCandidateSnapshot001Z {
  readonly version: TaxiSchemaApplyCandidateVersion001Z;
  readonly status: 'schema_apply_candidate_ready_safe_disabled';
  readonly enums: readonly TaxiPrismaEnumCandidate001Z[];
  readonly models: readonly TaxiPrismaModelCandidate001Z[];
  readonly gates: readonly TaxiSchemaApplyGate001Z[];
  readonly planSteps: readonly TaxiSchemaApplyPlanStep001Z[];
  readonly appendCandidateText: string;
  readonly schemaPrismaPatchedNow: false;
  readonly prismaSchemaWriteNow: false;
  readonly prismaGenerateNow: false;
  readonly prismaMigrationNow: false;
  readonly dbReadNow: false;
  readonly dbWriteNow: false;
  readonly routeRuntimeMountedNow: false;
  readonly adminUiRuntimeMountedNow: false;
  readonly walletMutationNow: false;
  readonly paymentNow: false;
  readonly payoutNow: false;
  readonly providerDispatchNow: false;
  readonly fakeSuccessBlocked: true;
}
