export type SabiRelease245RFix7Status = 'passed' | 'failed';

export interface SabiRelease245RFix7Report {
  version: string;
  status: SabiRelease245RFix7Status;
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
