export type SabiRelease245RFix4Status = 'passed' | 'failed';

export interface SabiRelease245RFix4Report {
  version: string;
  status: SabiRelease245RFix4Status;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
