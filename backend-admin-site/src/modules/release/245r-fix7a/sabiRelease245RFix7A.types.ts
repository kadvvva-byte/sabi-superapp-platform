export type SabiRelease245RFix7AStatus = 'passed' | 'failed';

export interface SabiRelease245RFix7AReport {
  version: string;
  status: SabiRelease245RFix7AStatus;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  cloudRunServiceUrl: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
