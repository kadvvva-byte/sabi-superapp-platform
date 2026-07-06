import {
  TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_GOOGLE_BOUNDARY,
  TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_NEXT_STEP,
  TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_SCOPE,
  TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_TARGET_SCALE,
  TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_VERSION,
} from './constants';
import type {
  TaxiTripSabiAiPersonaOwnerBrief036I,
  TaxiTripSabiAiPersonaReportLane036I,
  TaxiTripSabiAiPersonaRuntimeReadiness036I,
  TaxiTripSabiAiPersonaRuntimeReport036I,
  TaxiTripSabiAiPersonaRuntimeReportSafety036I,
  TaxiTripSabiAiPersonaTrait036I,
} from './types';

function trait036I(key: string, label: string, behavior: string, ownerBoundary: string): TaxiTripSabiAiPersonaTrait036I {
  return Object.freeze({ key, label, behavior, ownerBoundary });
}

function lane036I(key: string, label: string, priority: 'critical' | 'high' | 'normal'): TaxiTripSabiAiPersonaReportLane036I {
  return Object.freeze({
    key,
    label,
    priority,
    reportMode: 'observe_rank_explain_report_only',
    simultaneousScale: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_TARGET_SCALE,
    automaticMutationAllowed: false,
  });
}

export function getTaxiTripSabiAiPersonaRuntimeReportSafety036I(): TaxiTripSabiAiPersonaRuntimeReportSafety036I {
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

export function getTaxiTripSabiAiPersonaTraits036I(): readonly TaxiTripSabiAiPersonaTrait036I[] {
  return Object.freeze([
    trait036I('calm_strict_operator', 'Calm strict operator', 'Explains each risk clearly and does not panic operators.', 'Owner controls final decisions.'),
    trait036I('global_attention', 'Global attention', 'Watches 10 000+ trips by country, city, priority lane, SLA, and risk.', 'No personal data overexposure.'),
    trait036I('memory_with_boundaries', 'Memory with boundaries', 'Keeps trip context, driver/rider risk, complaint history, and route anomalies.', 'Safe-read masked context only.'),
    trait036I('training_reference_google', 'Google as learning/reference', 'Uses future Google/provider information as learning and reference material only.', 'Not a primary control source.'),
  ] as const);
}

export function getTaxiTripSabiAiPersonaReportLanes036I(): readonly TaxiTripSabiAiPersonaReportLane036I[] {
  return Object.freeze([
    lane036I('sos_owner_alert', 'SOS / live safety owner alert', 'critical'),
    lane036I('route_speed_camera_risk', 'Route deviation / speed / camera risk', 'high'),
    lane036I('complaint_dispute_appeal', 'Complaint / dispute / appeal report', 'high'),
    lane036I('capacity_backpressure', 'Global capacity / backpressure report', 'normal'),
    lane036I('daily_private_owner_report', 'Daily private Owner report', 'normal'),
  ] as const);
}

export function getTaxiTripSabiAiPersonaRuntimeReadiness036I(): TaxiTripSabiAiPersonaRuntimeReadiness036I {
  return Object.freeze({
    version: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_VERSION,
    status: 'trip_sabi_ai_persona_runtime_report_ready_locked',
    backendSafeReadContract036G: 100,
    adminRuntimeVisibility036H: 100,
    tripSabiAiPersonaRuntimeReport036I: 100,
    targetConcurrentTrips: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_TARGET_SCALE,
    reportOnly: true,
    providerRuntimeConnected: false,
    googleProviderRuntimeConnected: false,
    dbWriteConnected: false,
    walletPaymentPayoutExecution: '0_locked_until_exact_owner_approval',
    taxiAdminUiFunctional: 99,
    taxiAdminUiPremiumUx: 97,
    taxiBackendFoundationSafeRead: 98,
    taxiOwnerSabiAiControl: 99,
    taxiMobileUiBackendSafeRead: 65,
    taxiWalletPaymentPayoutApprovalChain: 98,
    taxiFullProductionReadiness: 96,
  });
}

export function getTaxiTripSabiAiPersonaRuntimeReport036I(): TaxiTripSabiAiPersonaRuntimeReport036I {
  return Object.freeze({
    version: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_VERSION,
    scope: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_SCOPE,
    personaName: 'Sabi AI Taxi Guardian',
    personaMode: 'global_trip_supervisor_personality_report_only',
    targetConcurrentTrips: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_TARGET_SCALE,
    reportCadence: 'continuous_watch_daily_owner_report_urgent_escalation',
    googleRole: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_GOOGLE_BOUNDARY,
    canAutoDispatch: false,
    canAutoBlock: false,
    canAutoChargeOrPayout: false,
    canWriteDb: false,
    canCallProvider: false,
    canCallGoogleProvider: false,
    traits: getTaxiTripSabiAiPersonaTraits036I(),
    lanes: getTaxiTripSabiAiPersonaReportLanes036I(),
    safety: getTaxiTripSabiAiPersonaRuntimeReportSafety036I(),
    nextStep: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_NEXT_STEP,
  });
}

export function getTaxiTripSabiAiPersonaOwnerBrief036I(): TaxiTripSabiAiPersonaOwnerBrief036I {
  return Object.freeze({
    version: TAXI_TRIP_SABI_AI_PERSONA_RUNTIME_REPORT_036I_VERSION,
    title: 'Owner brief: Sabi AI Taxi Guardian',
    summary: 'Sabi AI watches the global Taxi trip stream as a report-only persona: it ranks risk, explains why, prepares owner/private reports, and escalates critical cases without executing actions.',
    escalationRules: Object.freeze([
      'Escalate SOS and heavy safety risk to Owner/Supervisor immediately.',
      'Escalate route deviation, unsafe stop, speed/camera risk, and dispute with evidence context.',
      'Summarize normal trips only in daily private Owner report.',
      'Use Google/provider data only as training/reference after exact approval, never as primary decision source.',
    ] as const),
    ownerDecisionsRequired: Object.freeze([
      'Any mutation of trip status.',
      'Any driver/rider penalty, block, or unlock.',
      'Any money movement, payout, payment, top-up, or commission action.',
      'Any provider/runtime/Google activation beyond safe-read reference.',
    ] as const),
    reportOnly: true,
    safety: getTaxiTripSabiAiPersonaRuntimeReportSafety036I(),
  });
}
