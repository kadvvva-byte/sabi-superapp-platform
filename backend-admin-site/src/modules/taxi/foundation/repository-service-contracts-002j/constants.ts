import type { TaxiRepositoryDelegateContract002J, TaxiRepositoryServiceSafety002J } from './types';

export const TAXI_REPOSITORY_SERVICE_CONTRACTS_VERSION_002J = 'TAXI-BACKEND-FOUNDATION-002J-REPOSITORY-SERVICE-CONTRACTS' as const;

export const TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J = [
  { modelName: 'TaxiRiderProfile', tableName: 'TaxiRiderProfile', delegateName: 'taxiRiderProfile', domain: 'rider_profile', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDriverProfile', tableName: 'TaxiDriverProfile', delegateName: 'taxiDriverProfile', domain: 'driver_profile', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDriverApplication', tableName: 'TaxiDriverApplication', delegateName: 'taxiDriverApplication', domain: 'driver_verification', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiVehicle', tableName: 'TaxiVehicle', delegateName: 'taxiVehicle', domain: 'vehicle_review', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDriverVehicleAssignment', tableName: 'TaxiDriverVehicleAssignment', delegateName: 'taxiDriverVehicleAssignment', domain: 'driver_vehicle_assignment', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiTariffRegion', tableName: 'TaxiTariffRegion', delegateName: 'taxiTariffRegion', domain: 'tariff_region', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiQuote', tableName: 'TaxiQuote', delegateName: 'taxiQuote', domain: 'quote', accessMode: 'transaction_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiRiderRequest', tableName: 'TaxiRiderRequest', delegateName: 'taxiRiderRequest', domain: 'rider_request', accessMode: 'transaction_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDispatchOffer', tableName: 'TaxiDispatchOffer', delegateName: 'taxiDispatchOffer', domain: 'dispatch_offer', accessMode: 'transaction_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiTrip', tableName: 'TaxiTrip', delegateName: 'taxiTrip', domain: 'trip_lifecycle', accessMode: 'transaction_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiPaymentHold', tableName: 'TaxiPaymentHold', delegateName: 'taxiPaymentHold', domain: 'payment_hold_reference', accessMode: 'write_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDriverSettlement', tableName: 'TaxiDriverSettlement', delegateName: 'taxiDriverSettlement', domain: 'driver_settlement_reference', accessMode: 'write_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiSupportCase', tableName: 'TaxiSupportCase', delegateName: 'taxiSupportCase', domain: 'support_case', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiDisputeEvidence', tableName: 'TaxiDisputeEvidence', delegateName: 'taxiDisputeEvidence', domain: 'dispute_evidence', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiSafetyEvent', tableName: 'TaxiSafetyEvent', delegateName: 'taxiSafetyEvent', domain: 'safety_event', accessMode: 'admin_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiAuditLog', tableName: 'TaxiAuditLog', delegateName: 'taxiAuditLog', domain: 'audit_log', accessMode: 'write_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiProviderReadinessSnapshot', tableName: 'TaxiProviderReadinessSnapshot', delegateName: 'taxiProviderReadinessSnapshot', domain: 'provider_readiness', accessMode: 'provider_readiness_read_only', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiIdempotencyRecord', tableName: 'TaxiIdempotencyRecord', delegateName: 'taxiIdempotencyRecord', domain: 'idempotency', accessMode: 'transaction_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiTripRatingLedger', tableName: 'TaxiTripRatingLedger', delegateName: 'taxiTripRatingLedger', domain: 'trip_rating_ledger', accessMode: 'write_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
  { modelName: 'TaxiRealtimeTripShadow', tableName: 'TaxiRealtimeTripShadow', delegateName: 'taxiRealtimeTripShadow', domain: 'realtime_shadow', accessMode: 'write_guarded', runtimeMounted: false, providerDispatch: false, walletMutation: false },
] as const satisfies readonly TaxiRepositoryDelegateContract002J[];

export const TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J = [
  'driver.application.submit_guarded',
  'admin.driver.application.review_guarded',
  'admin.vehicle.review_guarded',
  'admin.tariff.region.upsert_guarded',
  'rider.quote.create_guarded',
  'rider.request.create_guarded',
  'dispatch.offer.create_guarded',
  'driver.offer.accept_guarded',
  'trip.start_guarded',
  'trip.complete_guarded',
  'trip.cancel_guarded',
  'payment.hold.reference_write_guarded',
  'settlement.reference_write_guarded',
  'support.case.open_guarded',
  'support.case.resolve_guarded',
  'safety.event.record_guarded',
  'audit.log.write_guarded',
  'idempotency.record.reserve_guarded',
  'rating.ledger.write_guarded',
  'realtime.shadow.write_guarded',
] as const;

export const TAXI_REPOSITORY_SERVICE_SAFETY_002J: TaxiRepositoryServiceSafety002J = {
  sourceOnly: true,
  envRead: false,
  dbRead: false,
  dbWrite: false,
  prismaMigration: false,
  prismaGenerate: false,
  routeRuntimeMounted: false,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
};
