import {
  TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J,
  TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J,
} from '../repository-service-contracts-002j';
import type {
  TaxiRuntimeServiceDelegateBinding002K,
  TaxiRuntimeServiceMethodKind002K,
  TaxiRuntimeServiceSafety002K,
} from './types';

export const TAXI_RUNTIME_SERVICE_IMPLEMENTATION_VERSION_002K = 'TAXI-BACKEND-FOUNDATION-002K-RUNTIME-SERVICE-IMPLEMENTATION' as const;

export const TAXI_RUNTIME_SERVICE_METHODS_002K = [
  'count_ready',
  'list_ready',
  'get_ready',
  'create_guarded_ready',
  'update_guarded_ready',
  'audit_read_ready',
] as const satisfies readonly TaxiRuntimeServiceMethodKind002K[];

const toRuntimeFamily002K = (domain: string) => domain as TaxiRuntimeServiceDelegateBinding002K['family'];

export const TAXI_RUNTIME_SERVICE_DELEGATE_BINDINGS_002K = TAXI_REPOSITORY_DELEGATE_CONTRACTS_002J.map((delegate) => ({
  modelName: delegate.modelName,
  delegateName: delegate.delegateName,
  tableName: delegate.tableName,
  family: toRuntimeFamily002K(delegate.domain),
  methodsReady: TAXI_RUNTIME_SERVICE_METHODS_002K,
  routeMounted: false,
  dbExecutedInThisStage: false,
  providerDispatch: false,
  walletMutation: false,
})) as readonly TaxiRuntimeServiceDelegateBinding002K[];

export const TAXI_RUNTIME_SERVICE_WORKFLOW_IMPLEMENTATION_KEYS_002K = [
  ...TAXI_REPOSITORY_WORKFLOW_OPERATION_KEYS_002J,
  'rider.profile.upsert_guarded',
  'driver.profile.upsert_guarded',
  'driver.availability.set_guarded',
  'driver.location.shadow_update_guarded',
  'dispatch.offer.expire_guarded',
  'trip.arrive.pickup_guarded',
  'trip.no_show_guarded',
  'payment.hold.capture_reference_guarded',
  'payment.hold.release_reference_guarded',
  'settlement.mark.pending_guarded',
  'settlement.mark.available_guarded',
  'support.case.assign_guarded',
  'dispute.evidence.attach_guarded',
  'provider.readiness.snapshot_read_only',
  'audit.event.append_guarded',
  'idempotency.record.complete_guarded',
  'rating.ledger.recompute_guarded',
  'realtime.shadow.close_guarded',
  'admin.driver.suspend_guarded',
  'admin.driver.application.reopen_guarded',
  'admin.driver.application.require_documents_guarded',
  'admin.vehicle.assignment.create_guarded',
  'admin.vehicle.assignment.revoke_guarded',
  'admin.tariff.region.activate_guarded',
  'admin.tariff.region.suspend_guarded',
  'rider.request.cancel_guarded',
  'dispatch.offer.reassign_guarded',
  'dispatch.offer.reject_guarded',
  'trip.update.route_shadow_guarded',
  'trip.mark.driver_arrived_guarded',
  'trip.mark.rider_picked_up_guarded',
  'trip.safety.flag_guarded',
  'support.case.escalate_guarded',
  'support.case.add_note_guarded',
  'dispute.evidence.review_guarded',
  'provider.status.recheck_guarded',
  'provider.status.mark_unconfigured_guarded',
  'admin.audit.export_request_guarded',
] as const;

export const TAXI_RUNTIME_SERVICE_SAFETY_002K: TaxiRuntimeServiceSafety002K = {
  sourceOnly: true,
  envRead: false,
  dbRead: false,
  dbWrite: false,
  prismaValidate: false,
  prismaGenerate: false,
  prismaMigration: false,
  routeRuntimeMounted: false,
  adminUiRuntimeMounted: false,
  walletMutation: false,
  payment: false,
  payout: false,
  providerDispatch: false,
};
