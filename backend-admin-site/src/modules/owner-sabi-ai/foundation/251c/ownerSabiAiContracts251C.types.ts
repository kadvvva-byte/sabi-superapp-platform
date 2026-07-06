export type OwnerSabiAiHealthStatus251C = 'ok' | 'degraded' | 'blocked';
export type OwnerSabiAiRiskLevel251C = 'green' | 'yellow' | 'red' | 'critical';

export interface OwnerSabiAiModuleBoundary251C {
  moduleKey: string;
  displayName: string;
  readOnlyHealthScope: string[];
  allowedReadinessFields: string[];
  forbiddenActions: string[];
}

export interface OwnerSabiAiModuleBoundaries251C {
  version: string;
  code: string;
  status: string;
  root: string;
  principle: string;
  modules: OwnerSabiAiModuleBoundary251C[];
}

export interface OwnerSabiAiReadOnlyEndpoint251C {
  method: 'GET';
  path: string;
  mountedNow: false;
  requiresFutureOwnerApproval: true;
  responseShape: Record<string, unknown>;
}

export interface OwnerSabiAiReadOnlyHealthContracts251C {
  version: string;
  code: string;
  status: string;
  endpointPlanNotMounted: true;
  proposedReadOnlyEndpoints: OwnerSabiAiReadOnlyEndpoint251C[];
  hardLocks: Record<string, boolean>;
}

export interface OwnerSabiAiHealthSnapshot251C {
  version: string;
  code: string;
  generatedAt: string;
  status: string;
  publicContact: Record<string, unknown>;
  readiness: Record<string, number>;
  mutationState: Record<string, number>;
}

export interface OwnerSabiAiDailyReportContract251C {
  version: string;
  code: string;
  status: string;
  deliveryNow: false;
  futureDeliveryRequiresOwnerApproval: true;
  sections: Array<Record<string, unknown>>;
  finalActionRule: string;
}
