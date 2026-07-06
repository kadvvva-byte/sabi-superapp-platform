export type SabiRelease245SStatus = 'passed' | 'failed';

export interface SabiRelease245SReport {
  version: string;
  status: SabiRelease245SStatus;
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
