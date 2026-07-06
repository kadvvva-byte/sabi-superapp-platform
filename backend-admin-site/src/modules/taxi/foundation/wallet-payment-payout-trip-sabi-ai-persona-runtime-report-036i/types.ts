export type TaxiTripSabiAiPersonaRuntimeReportSafety036I = Readonly<{
  envFileReadOrDumped: false;
  dbWritePerformed: false;
  walletMutationPerformed: false;
  paymentExecutionPerformed: false;
  payoutExecutionPerformed: false;
  providerCallPerformed: false;
  googleProviderCallPerformed: false;
  fakeRoadDataIntroduced: false;
  fakeSuccessIntroduced: false;
  rawPersonalDataExposed: false;
  productionLaunchClaimed: false;
}>;

export type TaxiTripSabiAiPersonaTrait036I = Readonly<{
  key: string;
  label: string;
  behavior: string;
  ownerBoundary: string;
}>;

export type TaxiTripSabiAiPersonaReportLane036I = Readonly<{
  key: string;
  label: string;
  priority: 'critical' | 'high' | 'normal';
  reportMode: 'observe_rank_explain_report_only';
  simultaneousScale: '10000_plus_and_scalable';
  automaticMutationAllowed: false;
}>;

export type TaxiTripSabiAiPersonaRuntimeReadiness036I = Readonly<{
  version: string;
  status: 'trip_sabi_ai_persona_runtime_report_ready_locked';
  backendSafeReadContract036G: 100;
  adminRuntimeVisibility036H: 100;
  tripSabiAiPersonaRuntimeReport036I: 100;
  targetConcurrentTrips: '10000_plus_and_scalable';
  reportOnly: true;
  providerRuntimeConnected: false;
  googleProviderRuntimeConnected: false;
  dbWriteConnected: false;
  walletPaymentPayoutExecution: '0_locked_until_exact_owner_approval';
  taxiAdminUiFunctional: 99;
  taxiAdminUiPremiumUx: 97;
  taxiBackendFoundationSafeRead: 98;
  taxiOwnerSabiAiControl: 99;
  taxiMobileUiBackendSafeRead: 65;
  taxiWalletPaymentPayoutApprovalChain: 98;
  taxiFullProductionReadiness: 96;
}>;

export type TaxiTripSabiAiPersonaRuntimeReport036I = Readonly<{
  version: string;
  scope: 'backend_trip_sabi_ai_persona_runtime_report_safe_read_only_locked';
  personaName: 'Sabi AI Taxi Guardian';
  personaMode: 'global_trip_supervisor_personality_report_only';
  targetConcurrentTrips: '10000_plus_and_scalable';
  reportCadence: 'continuous_watch_daily_owner_report_urgent_escalation';
  googleRole: 'training_reference_not_primary_control_source';
  canAutoDispatch: false;
  canAutoBlock: false;
  canAutoChargeOrPayout: false;
  canWriteDb: false;
  canCallProvider: false;
  canCallGoogleProvider: false;
  traits: readonly TaxiTripSabiAiPersonaTrait036I[];
  lanes: readonly TaxiTripSabiAiPersonaReportLane036I[];
  safety: TaxiTripSabiAiPersonaRuntimeReportSafety036I;
  nextStep: string;
}>;

export type TaxiTripSabiAiPersonaOwnerBrief036I = Readonly<{
  version: string;
  title: 'Owner brief: Sabi AI Taxi Guardian';
  summary: string;
  escalationRules: readonly string[];
  ownerDecisionsRequired: readonly string[];
  reportOnly: true;
  safety: TaxiTripSabiAiPersonaRuntimeReportSafety036I;
}>;
