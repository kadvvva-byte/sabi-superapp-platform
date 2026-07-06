export type SabiRelease245RFix3Status = 'passed' | 'failed';

export interface SabiRelease245RFix3Report {
  version: string;
  status: SabiRelease245RFix3Status;
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
