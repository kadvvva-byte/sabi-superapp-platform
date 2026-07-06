export type AdminSmsReadinessPanelPlacementMode239N =
  | 'visual_plan_only_no_admin_runtime_mount'
  | 'contract_only_no_admin_runtime_mount';

export type AdminSmsReadinessPanelPlacementStatus239N = {
  readonly selectedProviderForValidation: 'Firebase Phone Auth';
  readonly providerSelectedForValidationOnly: true;
  readonly firebaseExactValuesProvided: false;
  readonly realFirebaseProviderConnected: false;
  readonly realSmsProviderConnected: false;
  readonly realSmsSent: false;
  readonly realRouteRuntimeMounted: false;
  readonly realAdminRuntimeMounted: false;
  readonly liveAuthEnabledNow: false;
  readonly routeMountMode: 'contract_only_no_runtime_mount';
  readonly panelMode: AdminSmsReadinessPanelPlacementMode239N;
};
