import type {
  TaxiSchemaCandidateEnum001W,
  TaxiSchemaCandidateField001W,
  TaxiSchemaCandidateIndex001W,
  TaxiSchemaCandidateModel001W,
  TaxiSchemaCandidateModelName001W,
  TaxiSchemaCandidateRelation001W,
  TaxiSchemaMigrationPlanningLock001W,
  TaxiSchemaProviderBoundary001W,
  TaxiSchemaPlanningVersion001W,
} from './types';

export const TAXI_SCHEMA_PLANNING_VERSION_001W: TaxiSchemaPlanningVersion001W = 'TAXI-BACKEND-FOUNDATION-001W-MEGA';

const baseFields = (statusEnum?: TaxiSchemaCandidateField001W['enumName']): readonly TaxiSchemaCandidateField001W[] => [
  { name: 'id', kind: 'id', required: true, indexed: true, unique: true, notes: 'Stable internal identifier.' },
  { name: 'createdAt', kind: 'datetime', required: true, indexed: true, unique: false, notes: 'Creation timestamp.' },
  { name: 'updatedAt', kind: 'datetime', required: true, indexed: true, unique: false, notes: 'Last update timestamp.' },
  ...(statusEnum ? [{ name: 'status', kind: 'enum' as const, required: true, indexed: true, unique: false, enumName: statusEnum, notes: 'Admin/backend controlled status.' }] : []),
];

const field = (
  name: string,
  kind: TaxiSchemaCandidateField001W['kind'],
  notes: string,
  options?: Partial<Pick<TaxiSchemaCandidateField001W, 'required' | 'indexed' | 'unique' | 'enumName' | 'referencesModel'>>,
): TaxiSchemaCandidateField001W => ({
  name,
  kind,
  required: options?.required ?? true,
  indexed: options?.indexed ?? false,
  unique: options?.unique ?? false,
  enumName: options?.enumName,
  referencesModel: options?.referencesModel,
  notes,
});

const index = (
  modelName: TaxiSchemaCandidateModelName001W,
  name: string,
  fields: readonly string[],
  reason: string,
  unique = false,
): TaxiSchemaCandidateIndex001W => ({ modelName, name, fields, unique, reason });

const model = (
  modelName: TaxiSchemaCandidateModelName001W,
  domain: TaxiSchemaCandidateModel001W['domain'],
  purpose: string,
  fields: readonly TaxiSchemaCandidateField001W[],
  indexes: readonly TaxiSchemaCandidateIndex001W[],
): TaxiSchemaCandidateModel001W => ({
  modelName,
  domain,
  purpose,
  fields,
  indexes,
  ownerApprovalRequiredBeforeSchemaWrite: true,
  migrationExecutedNow: false,
  prismaSchemaWriteNow: false,
  prismaGenerateNow: false,
  dbReadNow: false,
  dbWriteNow: false,
  runtimeRouteMountedNow: false,
  fakeSuccessBlocked: true,
});

export const TAXI_SCHEMA_CANDIDATE_ENUMS_001W: readonly TaxiSchemaCandidateEnum001W[] = [
  { enumName: 'TaxiDriverVerificationStatus', values: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'suspended'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiVehicleReviewStatus', values: ['draft', 'submitted', 'inspection_required', 'approved', 'rejected', 'disabled'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiTariffRegionStatus', values: ['draft', 'active', 'paused', 'archived'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiQuoteStatus', values: ['draft', 'provider_required', 'quoted', 'expired', 'cancelled'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiRiderRequestStatus', values: ['draft', 'quote_required', 'dispatch_pending', 'matched', 'cancelled', 'expired'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiDispatchOfferStatus', values: ['created', 'sent', 'accepted', 'rejected', 'expired', 'cancelled'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiTripStatus', values: ['scheduled', 'driver_assigned', 'driver_arrived', 'in_progress', 'completed', 'cancelled', 'disputed'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiPaymentHoldStatus', values: ['not_required', 'provider_required', 'authorized', 'captured', 'released', 'refunded', 'failed'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiSettlementStatus', values: ['not_ready', 'pending_admin_review', 'ready', 'posted', 'blocked', 'reversed'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiSupportCaseStatus', values: ['open', 'waiting_for_evidence', 'under_review', 'resolved', 'escalated', 'closed'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiDisputeEvidenceType', values: ['photo', 'video', 'audio', 'route_trace', 'payment_receipt', 'chat_log', 'admin_note'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiSafetyEventType', values: ['sos', 'route_deviation', 'speeding_signal', 'harassment_report', 'crash_report', 'unsafe_stop'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiAuditActorType', values: ['system', 'admin', 'rider', 'driver', 'provider', 'support_agent'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiProviderArea', values: ['maps_routes_eta', 'dispatch_matching', 'wallet_payment', 'driver_kyc', 'notifications', 'fraud_safety'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiIdempotencyStatus', values: ['reserved', 'completed', 'conflict', 'expired'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
  { enumName: 'TaxiRatingLedgerSource', values: ['trip_completed', 'support_adjustment', 'fraud_reversal', 'admin_restore'], ownerApprovalRequiredBeforeSchemaWrite: true, prismaSchemaWriteNow: false },
];

export const TAXI_SCHEMA_CANDIDATE_MODELS_001W: readonly TaxiSchemaCandidateModel001W[] = [
  model('TaxiRiderProfile', 'identity_verification', 'Rider Taxi profile, region, trust and safety readiness.', [
    ...baseFields(),
    field('userId', 'string', 'Links to app user identity.', { indexed: true, unique: true }),
    field('countryCode', 'country_code', 'Primary Taxi country.', { indexed: true }),
    field('cityId', 'string', 'Primary city or service area.', { indexed: true }),
    field('trustStatus', 'string', 'Current rider trust state.', { indexed: true }),
    field('safetyFlagsJson', 'json', 'Support and safety flags, no runtime write now.', { required: false }),
  ], [
    index('TaxiRiderProfile', 'taxi_rider_profile_user_unique', ['userId'], 'One rider profile per app user.', true),
    index('TaxiRiderProfile', 'taxi_rider_profile_country_city', ['countryCode', 'cityId'], 'Country/city filtering for readiness and support.'),
  ]),
  model('TaxiDriverProfile', 'identity_verification', 'Driver profile with verification, balance readiness and admin approval state.', [
    ...baseFields('TaxiDriverVerificationStatus'),
    field('userId', 'string', 'Links to app user identity.', { indexed: true, unique: true }),
    field('countryCode', 'country_code', 'Driver country.', { indexed: true }),
    field('cityId', 'string', 'Driver city.', { indexed: true }),
    field('adminApprovedAt', 'datetime', 'Approval timestamp after review.', { required: false, indexed: true }),
    field('balanceReserveMinor', 'money_minor', 'Driver reserve checked before offers, no Wallet write now.'),
  ], [
    index('TaxiDriverProfile', 'taxi_driver_profile_user_unique', ['userId'], 'One driver profile per app user.', true),
    index('TaxiDriverProfile', 'taxi_driver_profile_status_city', ['status', 'countryCode', 'cityId'], 'Dispatch pool filtering.'),
  ]),
  model('TaxiDriverApplication', 'identity_verification', 'Driver application and document review package.', [
    ...baseFields('TaxiDriverVerificationStatus'),
    field('driverProfileId', 'relation_id', 'Driver profile relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('documentBundleJson', 'json', 'KYC/document references without raw secrets.'),
    field('reviewerAdminId', 'string', 'Admin reviewer id.', { required: false, indexed: true }),
    field('decisionReason', 'string', 'Human-readable decision reason.', { required: false }),
  ], [
    index('TaxiDriverApplication', 'taxi_driver_application_profile_status', ['driverProfileId', 'status'], 'Latest application by driver/status.'),
  ]),
  model('TaxiVehicle', 'vehicle_park', 'Vehicle identity, compliance, inspection and park ownership.', [
    ...baseFields('TaxiVehicleReviewStatus'),
    field('driverProfileId', 'relation_id', 'Driver owner relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('plateNumberHash', 'string', 'Plate hash/normalized reference, not public raw dump.', { indexed: true }),
    field('vehicleClass', 'tariff_code', 'Allowed tariff class.', { indexed: true }),
    field('inspectionBundleJson', 'json', 'Inspection evidence references.'),
  ], [
    index('TaxiVehicle', 'taxi_vehicle_driver_status', ['driverProfileId', 'status'], 'Driver vehicle review list.'),
    index('TaxiVehicle', 'taxi_vehicle_plate_hash', ['plateNumberHash'], 'Duplicate prevention.', true),
  ]),
  model('TaxiDriverVehicleAssignment', 'vehicle_park', 'Active driver-to-vehicle assignment for dispatch readiness.', [
    ...baseFields(),
    field('driverProfileId', 'relation_id', 'Driver profile relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('vehicleId', 'relation_id', 'Vehicle relation.', { indexed: true, referencesModel: 'TaxiVehicle' }),
    field('active', 'boolean', 'Only active assignment can receive offers.', { indexed: true }),
  ], [
    index('TaxiDriverVehicleAssignment', 'taxi_assignment_driver_active', ['driverProfileId', 'active'], 'Active vehicle by driver.'),
    index('TaxiDriverVehicleAssignment', 'taxi_assignment_vehicle_active', ['vehicleId', 'active'], 'Prevent duplicate active assignments.'),
  ]),
  model('TaxiTariffRegion', 'tariff_region', 'Admin configured country/city/zone tariff, commission and availability matrix.', [
    ...baseFields('TaxiTariffRegionStatus'),
    field('countryCode', 'country_code', 'Country.', { indexed: true }),
    field('cityId', 'string', 'City.', { indexed: true }),
    field('zoneId', 'string', 'Zone or service area.', { indexed: true }),
    field('tariffCode', 'tariff_code', 'Tariff code.', { indexed: true }),
    field('baseFareMinor', 'money_minor', 'Admin configured base fare.'),
    field('perKmMinor', 'money_minor', 'Admin configured per-km fare.'),
    field('perMinuteMinor', 'money_minor', 'Admin configured per-minute fare.'),
    field('commissionBasisPoints', 'int', 'Admin configured commission in basis points, no fixed foundation percent.'),
  ], [
    index('TaxiTariffRegion', 'taxi_tariff_region_matrix_unique', ['countryCode', 'cityId', 'zoneId', 'tariffCode'], 'Unique Admin tariff matrix cell.', true),
  ]),
  model('TaxiQuote', 'quote_request_dispatch', 'Provider-backed quote snapshot and rider visible fare estimate.', [
    ...baseFields('TaxiQuoteStatus'),
    field('riderProfileId', 'relation_id', 'Rider relation.', { indexed: true, referencesModel: 'TaxiRiderProfile' }),
    field('tariffRegionId', 'relation_id', 'Tariff region relation.', { indexed: true, referencesModel: 'TaxiTariffRegion' }),
    field('pickupGeoJson', 'json', 'Pickup point.'),
    field('dropoffGeoJson', 'json', 'Dropoff point.'),
    field('routeProviderRef', 'string', 'Provider route reference label only.', { required: false, indexed: true }),
    field('estimatedFareMinor', 'money_minor', 'Estimated fare minor units.'),
    field('expiresAt', 'datetime', 'Quote expiry.', { indexed: true }),
  ], [
    index('TaxiQuote', 'taxi_quote_rider_status_expiry', ['riderProfileId', 'status', 'expiresAt'], 'Active rider quotes.'),
  ]),
  model('TaxiRiderRequest', 'quote_request_dispatch', 'Rider request that enters dispatch after quote/admin/provider readiness.', [
    ...baseFields('TaxiRiderRequestStatus'),
    field('quoteId', 'relation_id', 'Quote relation.', { indexed: true, referencesModel: 'TaxiQuote' }),
    field('riderProfileId', 'relation_id', 'Rider relation.', { indexed: true, referencesModel: 'TaxiRiderProfile' }),
    field('idempotencyKey', 'string', 'Rider request idempotency key.', { indexed: true }),
    field('requestedAt', 'datetime', 'Request time.', { indexed: true }),
  ], [
    index('TaxiRiderRequest', 'taxi_rider_request_idempotency', ['riderProfileId', 'idempotencyKey'], 'Prevent duplicate rider request.', true),
  ]),
  model('TaxiDispatchOffer', 'quote_request_dispatch', 'Offer from dispatch to a verified driver/vehicle pair.', [
    ...baseFields('TaxiDispatchOfferStatus'),
    field('riderRequestId', 'relation_id', 'Rider request relation.', { indexed: true, referencesModel: 'TaxiRiderRequest' }),
    field('driverProfileId', 'relation_id', 'Driver relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('vehicleId', 'relation_id', 'Vehicle relation.', { indexed: true, referencesModel: 'TaxiVehicle' }),
    field('offerExpiresAt', 'datetime', 'Offer expiration.', { indexed: true }),
    field('dispatchScoreJson', 'json', 'Matching score/audit inputs.'),
  ], [
    index('TaxiDispatchOffer', 'taxi_dispatch_offer_driver_status_expiry', ['driverProfileId', 'status', 'offerExpiresAt'], 'Driver active offers.'),
    index('TaxiDispatchOffer', 'taxi_dispatch_offer_request_status', ['riderRequestId', 'status'], 'Request offer chain.'),
  ]),
  model('TaxiTrip', 'trip_lifecycle', 'Authoritative backend trip lifecycle record.', [
    ...baseFields('TaxiTripStatus'),
    field('riderRequestId', 'relation_id', 'Rider request relation.', { indexed: true, referencesModel: 'TaxiRiderRequest' }),
    field('acceptedOfferId', 'relation_id', 'Accepted dispatch offer relation.', { indexed: true, referencesModel: 'TaxiDispatchOffer' }),
    field('driverProfileId', 'relation_id', 'Driver relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('riderProfileId', 'relation_id', 'Rider relation.', { indexed: true, referencesModel: 'TaxiRiderProfile' }),
    field('startedAt', 'datetime', 'Trip start.', { required: false, indexed: true }),
    field('completedAt', 'datetime', 'Backend verified completion.', { required: false, indexed: true }),
    field('finalFareMinor', 'money_minor', 'Final fare, backend controlled.', { required: false }),
  ], [
    index('TaxiTrip', 'taxi_trip_driver_status', ['driverProfileId', 'status'], 'Driver trip monitor.'),
    index('TaxiTrip', 'taxi_trip_rider_status', ['riderProfileId', 'status'], 'Rider trip monitor.'),
  ]),
  model('TaxiPaymentHold', 'payment_settlement', 'Payment authorization/hold/capture/refund record with provider readiness lock.', [
    ...baseFields('TaxiPaymentHoldStatus'),
    field('tripId', 'relation_id', 'Trip relation.', { indexed: true, referencesModel: 'TaxiTrip' }),
    field('amountMinor', 'money_minor', 'Hold amount.'),
    field('currency', 'string', 'Currency code.', { indexed: true }),
    field('providerArea', 'enum', 'Payment provider area.', { enumName: 'TaxiProviderArea', indexed: true }),
    field('providerReferenceLabel', 'string', 'Reference label only, not raw credential/value.', { required: false, indexed: true }),
  ], [
    index('TaxiPaymentHold', 'taxi_payment_hold_trip_status', ['tripId', 'status'], 'Trip payment hold state.'),
  ]),
  model('TaxiDriverSettlement', 'payment_settlement', 'Driver net, commission, adjustment and payout readiness ledger.', [
    ...baseFields('TaxiSettlementStatus'),
    field('tripId', 'relation_id', 'Trip relation.', { indexed: true, referencesModel: 'TaxiTrip' }),
    field('driverProfileId', 'relation_id', 'Driver relation.', { indexed: true, referencesModel: 'TaxiDriverProfile' }),
    field('grossFareMinor', 'money_minor', 'Gross fare.'),
    field('commissionMinor', 'money_minor', 'Admin configured commission amount.'),
    field('driverNetMinor', 'money_minor', 'Driver net preview/final.'),
    field('adminReviewReason', 'string', 'Required for blocked/reversed settlement.', { required: false }),
  ], [
    index('TaxiDriverSettlement', 'taxi_driver_settlement_driver_status', ['driverProfileId', 'status'], 'Driver settlement list.'),
    index('TaxiDriverSettlement', 'taxi_driver_settlement_trip_unique', ['tripId'], 'One settlement per trip.', true),
  ]),
  model('TaxiSupportCase', 'support_dispute_safety', 'Support, dispute, refund and safety case command center.', [
    ...baseFields('TaxiSupportCaseStatus'),
    field('tripId', 'relation_id', 'Trip relation.', { required: false, indexed: true, referencesModel: 'TaxiTrip' }),
    field('openedByUserId', 'string', 'Reporter user id.', { indexed: true }),
    field('assignedAdminId', 'string', 'Assigned support/admin user.', { required: false, indexed: true }),
    field('caseReason', 'string', 'Reason code.', { indexed: true }),
    field('refundRequestedMinor', 'money_minor', 'Refund request amount.', { required: false }),
  ], [
    index('TaxiSupportCase', 'taxi_support_case_status_reason', ['status', 'caseReason'], 'Support queue filtering.'),
  ]),
  model('TaxiDisputeEvidence', 'support_dispute_safety', 'Evidence bundle for support and dispute resolution.', [
    ...baseFields(),
    field('supportCaseId', 'relation_id', 'Support case relation.', { indexed: true, referencesModel: 'TaxiSupportCase' }),
    field('evidenceType', 'enum', 'Evidence type.', { enumName: 'TaxiDisputeEvidenceType', indexed: true }),
    field('storageReferenceLabel', 'string', 'Storage/CDN reference label only.'),
    field('submittedByUserId', 'string', 'Submitter user id.', { indexed: true }),
  ], [
    index('TaxiDisputeEvidence', 'taxi_dispute_evidence_case_type', ['supportCaseId', 'evidenceType'], 'Evidence by case/type.'),
  ]),
  model('TaxiSafetyEvent', 'support_dispute_safety', 'SOS, route deviation and safety signal ledger.', [
    ...baseFields(),
    field('tripId', 'relation_id', 'Trip relation.', { required: false, indexed: true, referencesModel: 'TaxiTrip' }),
    field('eventType', 'enum', 'Safety event type.', { enumName: 'TaxiSafetyEventType', indexed: true }),
    field('actorUserId', 'string', 'Actor user id.', { indexed: true }),
    field('geoJson', 'json', 'Safety location payload.', { required: false }),
  ], [
    index('TaxiSafetyEvent', 'taxi_safety_event_trip_type', ['tripId', 'eventType'], 'Safety events by trip/type.'),
  ]),
  model('TaxiAuditLog', 'audit_compliance', 'Immutable audit trail for Taxi Admin/provider/money-sensitive actions.', [
    ...baseFields(),
    field('actorType', 'enum', 'Actor type.', { enumName: 'TaxiAuditActorType', indexed: true }),
    field('actorId', 'string', 'Actor id.', { indexed: true }),
    field('entityType', 'string', 'Entity type.', { indexed: true }),
    field('entityId', 'string', 'Entity id.', { indexed: true }),
    field('reasonCode', 'string', 'Reason code required for heavy actions.', { indexed: true }),
    field('redactedPayloadJson', 'json', 'Redacted audit payload.'),
  ], [
    index('TaxiAuditLog', 'taxi_audit_log_entity', ['entityType', 'entityId'], 'Entity audit lookup.'),
    index('TaxiAuditLog', 'taxi_audit_log_actor_created', ['actorType', 'actorId', 'createdAt'], 'Actor audit lookup.'),
  ]),
  model('TaxiProviderReadinessSnapshot', 'provider_readiness', 'Provider readiness by area, scope and reference labels.', [
    ...baseFields(),
    field('providerArea', 'enum', 'Provider area.', { enumName: 'TaxiProviderArea', indexed: true }),
    field('countryCode', 'country_code', 'Country.', { indexed: true }),
    field('cityId', 'string', 'City.', { indexed: true }),
    field('referenceLabelsJson', 'json', 'Reference labels only, no values.'),
    field('readyForRuntime', 'boolean', 'Readiness flag after separate approval.', { indexed: true }),
  ], [
    index('TaxiProviderReadinessSnapshot', 'taxi_provider_readiness_area_city', ['providerArea', 'countryCode', 'cityId'], 'Provider readiness by area/city.', true),
  ]),
  model('TaxiIdempotencyRecord', 'idempotency_rating', 'Idempotency guard for rider request, dispatch accept, payment and support actions.', [
    ...baseFields('TaxiIdempotencyStatus'),
    field('scope', 'string', 'Idempotency scope.', { indexed: true }),
    field('actorUserId', 'string', 'Actor user id.', { indexed: true }),
    field('idempotencyKeyHash', 'string', 'Hashed idempotency key.', { indexed: true }),
    field('resultReferenceJson', 'json', 'Result reference after completion.', { required: false }),
  ], [
    index('TaxiIdempotencyRecord', 'taxi_idempotency_scope_actor_key', ['scope', 'actorUserId', 'idempotencyKeyHash'], 'Prevent duplicate actions.', true),
  ]),
  model('TaxiTripRatingLedger', 'idempotency_rating', 'Rider/driver rating, points and anti-abuse ledger after backend verified events.', [
    ...baseFields(),
    field('tripId', 'relation_id', 'Trip relation.', { indexed: true, referencesModel: 'TaxiTrip' }),
    field('source', 'enum', 'Ledger source.', { enumName: 'TaxiRatingLedgerSource', indexed: true }),
    field('participantUserId', 'string', 'Driver or rider user id.', { indexed: true }),
    field('pointsDelta', 'int', 'Points change.'),
    field('reasonCode', 'string', 'Reason for rating/points change.', { indexed: true }),
  ], [
    index('TaxiTripRatingLedger', 'taxi_rating_ledger_trip_participant', ['tripId', 'participantUserId'], 'Trip rating ledger by participant.'),
  ]),
];

export const TAXI_SCHEMA_RELATIONS_001W: readonly TaxiSchemaCandidateRelation001W[] = [
  { fromModel: 'TaxiDriverApplication', toModel: 'TaxiDriverProfile', kind: 'many_to_one', fieldName: 'driverProfileId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiVehicle', toModel: 'TaxiDriverProfile', kind: 'many_to_one', fieldName: 'driverProfileId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiDriverVehicleAssignment', toModel: 'TaxiDriverProfile', kind: 'many_to_one', fieldName: 'driverProfileId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiDriverVehicleAssignment', toModel: 'TaxiVehicle', kind: 'many_to_one', fieldName: 'vehicleId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiQuote', toModel: 'TaxiRiderProfile', kind: 'many_to_one', fieldName: 'riderProfileId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiQuote', toModel: 'TaxiTariffRegion', kind: 'many_to_one', fieldName: 'tariffRegionId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiRiderRequest', toModel: 'TaxiQuote', kind: 'many_to_one', fieldName: 'quoteId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiDispatchOffer', toModel: 'TaxiRiderRequest', kind: 'many_to_one', fieldName: 'riderRequestId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiTrip', toModel: 'TaxiDispatchOffer', kind: 'one_to_one', fieldName: 'acceptedOfferId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiPaymentHold', toModel: 'TaxiTrip', kind: 'one_to_one', fieldName: 'tripId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiDriverSettlement', toModel: 'TaxiTrip', kind: 'one_to_one', fieldName: 'tripId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiSupportCase', toModel: 'TaxiTrip', kind: 'many_to_one', fieldName: 'tripId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiDisputeEvidence', toModel: 'TaxiSupportCase', kind: 'many_to_one', fieldName: 'supportCaseId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiSafetyEvent', toModel: 'TaxiTrip', kind: 'many_to_one', fieldName: 'tripId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
  { fromModel: 'TaxiTripRatingLedger', toModel: 'TaxiTrip', kind: 'many_to_one', fieldName: 'tripId', cascadeDeleteAllowedNow: false, requiredForRuntime: true },
];

export const TAXI_SCHEMA_INDEXES_001W: readonly TaxiSchemaCandidateIndex001W[] = TAXI_SCHEMA_CANDIDATE_MODELS_001W.flatMap((candidate) => candidate.indexes);

export const TAXI_SCHEMA_MIGRATION_LOCKS_001W: readonly TaxiSchemaMigrationPlanningLock001W[] = [
  { step: 'schema_owner_review', description: 'Owner reviews Taxi model/enums/index candidate before any Prisma schema write.', exactOwnerApprovalRequired: true, prismaSchemaWriteNow: false, prismaGenerateNow: false, prismaMigrationNow: false, dbReadNow: false, dbWriteNow: false, rollbackPlanRequired: true, fakeMigrationSuccessBlocked: true },
  { step: 'prisma_schema_patch_approval', description: 'Separate exact approval required before editing prisma/schema.prisma.', exactOwnerApprovalRequired: true, prismaSchemaWriteNow: false, prismaGenerateNow: false, prismaMigrationNow: false, dbReadNow: false, dbWriteNow: false, rollbackPlanRequired: true, fakeMigrationSuccessBlocked: true },
  { step: 'migration_dry_run_review', description: 'Diff and generated SQL must be reviewed before migrate/dev/deploy.', exactOwnerApprovalRequired: true, prismaSchemaWriteNow: false, prismaGenerateNow: false, prismaMigrationNow: false, dbReadNow: false, dbWriteNow: false, rollbackPlanRequired: true, fakeMigrationSuccessBlocked: true },
  { step: 'runtime_mount_after_db_ready', description: 'Runtime routes remain unmounted until schema, providers, Wallet and Admin gates are approved.', exactOwnerApprovalRequired: true, prismaSchemaWriteNow: false, prismaGenerateNow: false, prismaMigrationNow: false, dbReadNow: false, dbWriteNow: false, rollbackPlanRequired: true, fakeMigrationSuccessBlocked: true },
];

export const TAXI_SCHEMA_PROVIDER_BOUNDARIES_001W: readonly TaxiSchemaProviderBoundary001W[] = [
  { area: 'maps_routes_eta', requiredReferenceLabels: ['TAXI_MAPS_PROVIDER_NAME', 'TAXI_MAPS_ROUTE_KEY_REF', 'TAXI_TRAFFIC_ETA_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
  { area: 'dispatch_matching', requiredReferenceLabels: ['TAXI_DISPATCH_PROVIDER_NAME', 'TAXI_DISPATCH_RULESET_REF', 'TAXI_DRIVER_POOL_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
  { area: 'wallet_payment', requiredReferenceLabels: ['TAXI_PAYMENT_PROVIDER_NAME', 'TAXI_WALLET_PROVIDER_SCOPE', 'TAXI_REFUND_PROVIDER_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
  { area: 'driver_kyc', requiredReferenceLabels: ['TAXI_DRIVER_KYC_PROVIDER_NAME', 'TAXI_DOCUMENT_REVIEW_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
  { area: 'notifications', requiredReferenceLabels: ['TAXI_NOTIFICATION_PROVIDER_NAME', 'TAXI_PUSH_SMS_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
  { area: 'fraud_safety', requiredReferenceLabels: ['TAXI_FRAUD_PROVIDER_NAME', 'TAXI_SAFETY_SIGNAL_SCOPE'], envReadNow: false, providerCallNow: false, runtimeBindingNow: false, fakeProviderSuccessBlocked: true },
];
