export type SabiRelease246BStatus = 'passed' | 'failed';

export interface SabiRelease246BReport {
  version: string;
  status: SabiRelease246BStatus;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  exactApprovalFor246C: string;
  [key: string]: unknown;
}
