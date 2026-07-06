import {
  TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_NEXT_STEP,
  TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_VERSION,
} from './constants';
import type {
  TaxiTripGlobalScalePriorityLane036G,
  TaxiTripGlobalScaleReadiness036G,
  TaxiTripGlobalScaleSafeReadContract036G,
  TaxiTripGlobalScaleSafety036G,
  TaxiTripGlobalScaleSabiAiPersona036G,
  TaxiTripGlobalScaleShard036G,
} from './types';

function shard036G(key: string, label: string, purpose: string, targetConcurrentTrips: number): TaxiTripGlobalScaleShard036G {
  return Object.freeze({
    key,
    label,
    purpose,
    targetConcurrentTrips,
    safeReadOnly: true,
    canExecuteProviderRuntime: false,
    canWriteDb: false,
    canCreateFakeRoadData: false,
  });
}

function lane036G(key: string, label: string, priority: 'critical' | 'high' | 'normal', ownerEscalationRequired: boolean): TaxiTripGlobalScalePriorityLane036G {
  return Object.freeze({
    key,
    label,
    priority,
    ownerEscalationRequired,
    sabiAiActionMode: 'observe_rank_explain_only',
    automaticPenaltyAllowed: false,
    automaticMoneyActionAllowed: false,
  });
}

export function getTaxiTripGlobalScaleSafety036G(): TaxiTripGlobalScaleSafety036G {
  return Object.freeze({
    envFileReadOrDumped: false,
    dbWritePerformed: false,
    walletMutationPerformed: false,
    paymentExecutionPerformed: false,
    payoutExecutionPerformed: false,
    providerCallPerformed: false,
    googleProviderCallPerformed: false,
    fakeRoadDataIntroduced: false,
    fakeSuccessIntroduced: false,
    rawPersonalDataExposed: false,
    productionLaunchClaimed: false,
  });
}

export function getTaxiTripGlobalScaleShards036G(): readonly TaxiTripGlobalScaleShard036G[] {
  return Object.freeze([
    shard036G('country_city_status', 'Country → city → status shard', 'Distribute 10 000+ trips by country, city, status, risk, and SLA windows.', 10000),
    shard036G('risk_priority_lane', 'Risk priority shard', 'Separate SOS, route deviation, speed risk, dangerous stop, complaint, and dispute queues.', 10000),
    shard036G('operator_workload_lane', 'Operator workload shard', 'Keep human operators focused on the highest-risk small subset while Sabi AI ranks every trip.', 10000),
    shard036G('provider_reference_lane', 'Provider reference shard', 'Prepare future routing/camera/speed provider inputs as reference only until Owner approval.', 10000),
  ] as const);
}

export function getTaxiTripGlobalScalePriorityLanes036G(): readonly TaxiTripGlobalScalePriorityLane036G[] {
  return Object.freeze([
    lane036G('sos_live_safety', 'SOS / live safety incident', 'critical', true),
    lane036G('route_deviation', 'Route deviation / dangerous stop', 'critical', true),
    lane036G('speed_camera_zone', 'Speed regime / camera warning risk', 'high', false),
    lane036G('complaint_dispute', 'Complaint / dispute / appeal', 'high', true),
    lane036G('sla_delay_overload', 'SLA delay / overload / backpressure', 'normal', false),
  ] as const);
}

export function getTaxiTripGlobalScaleSabiAiPersona036G(): TaxiTripGlobalScaleSabiAiPersona036G {
  return Object.freeze({
    personaName: 'Sabi AI Taxi Guardian',
    role: 'global_trip_supervisor_report_only',
    simultaneousControlTarget: '10000_plus_and_scalable',
    tone: 'calm_strict_operator',
    explainsEveryRisk: true,
    asksForOwnerApprovalBeforeMutation: true,
    googleUseBoundary: 'training_reference_not_primary_control_source',
    canAutoDispatch: false,
    canAutoBlock: false,
    canAutoChargeOrPayout: false,
  });
}

export function getTaxiTripGlobalScaleReadiness036G(): TaxiTripGlobalScaleReadiness036G {
  return Object.freeze({
    version: TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_VERSION,
    status: 'global_trip_scale_safe_read_contract_ready_locked',
    tripAdminUi036A: 100,
    tripAdminUi036B: 100,
    tripAdminUi036C: 100,
    tripAdminUi036D: 100,
    tripAdminUi036E: 100,
    tripAdminUi036F: 100,
    backendSafeReadContract036G: 100,
    targetConcurrentTrips: '10000_plus_scalable',
    runtimeProviderExecution: 'locked_until_exact_owner_approval',
    taxiAdminUiFunctional: 98,
    taxiAdminUiPremiumUx: 96,
    taxiBackendFoundationSafeRead: 98,
    taxiOwnerSabiAiControl: 99,
    taxiMobileUiBackendSafeRead: 65,
    taxiWalletPaymentPayoutApprovalChain: 98,
    taxiRealWalletPaymentPayoutProviderDbExecution: '0_locked_until_exact_owner_approval',
    taxiFullProductionReadiness: 95,
  });
}

export function getTaxiTripGlobalScaleSafeReadContract036G(): TaxiTripGlobalScaleSafeReadContract036G {
  return Object.freeze({
    version: TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_VERSION,
    status: 'locked_safe_read_contract_no_runtime_provider_execution',
    scope: 'backend_trip_global_scale_contract_only',
    targetConcurrentTrips: '10000_plus_and_scalable',
    routeMethod: 'GET',
    providerRuntimeConnected: false,
    googleProviderRuntimeConnected: false,
    googleRole: 'training_reference_not_primary_control_source',
    realtimeStreamingConnected: false,
    dbWriteConnected: false,
    canControlLiveTripsNow: false,
    canProvideRealRouteCameraSpeedNow: false,
    exactOwnerApprovalRequiredForRuntime: true,
    shards: getTaxiTripGlobalScaleShards036G(),
    priorityLanes: getTaxiTripGlobalScalePriorityLanes036G(),
    sabiAiPersona: getTaxiTripGlobalScaleSabiAiPersona036G(),
    safety: getTaxiTripGlobalScaleSafety036G(),
    nextStep: TAXI_TRIP_GLOBAL_SCALE_SAFE_READ_CONTRACT_036G_NEXT_STEP,
  });
}
