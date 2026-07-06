export type SabiRelease245RFix6Status = 'passed' | 'failed';

export interface SabiRelease245RFix6Report {
  version: string;
  status: SabiRelease245RFix6Status;
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
