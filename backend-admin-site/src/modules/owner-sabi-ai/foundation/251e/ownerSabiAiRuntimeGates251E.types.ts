export type OwnerSabiAiRuntimeStatus251E = 'local_plan_only_not_mounted' | 'local_gate_contracts_only' | 'local_matrix_only' | 'local_checklist_only';

export interface OwnerSabiAiProposedFutureRoute251E {
  method: 'GET';
  path: string;
  routeMountedNow: false;
  dataSourceNow: string;
  futureDataSources: string[];
  finalActionCapability: false;
}

export interface OwnerSabiAiRuntimeMountPlan251E {
  version: string;
  code: string;
  status: OwnerSabiAiRuntimeStatus251E;
  realRuntimeMountedNow: false;
  cloudRunDeployNow: false;
  adminRouteConnectedNow: false;
  runtimeDataConnectedNow: false;
  futureMountGoal: string;
  proposedFutureRoutes: OwnerSabiAiProposedFutureRoute251E[];
  forbiddenIn251E: string[];
  futureSequence: Array<Record<string, unknown>>;
}

export interface OwnerSabiAiLockedGate251E {
  gateKey: string;
  title: string;
  readiness: number;
  currentlyOpen: false;
  [key: string]: unknown;
}

export interface OwnerSabiAiLockedGateContracts251E {
  version: string;
  code: string;
  status: OwnerSabiAiRuntimeStatus251E;
  gates: OwnerSabiAiLockedGate251E[];
  globalDefault: Record<string, boolean>;
}

export interface OwnerSabiAiApprovalMatrix251E {
  version: string;
  code: string;
  status: OwnerSabiAiRuntimeStatus251E;
  actors: Array<Record<string, unknown>>;
  decisionClasses: Array<Record<string, unknown>>;
}

export interface OwnerSabiAiFutureRuntimeChecklist251E {
  version: string;
  code: string;
  status: OwnerSabiAiRuntimeStatus251E;
  beforeAnyRuntimeMount: string[];
  firstAllowedRuntimeProofAfterApproval: Record<string, string>;
}
