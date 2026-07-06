export type SabiRelease245PFix1Status = 'passed' | 'failed';

export interface SabiRelease245PFix1Report {
  version: string;
  status: SabiRelease245PFix1Status;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
