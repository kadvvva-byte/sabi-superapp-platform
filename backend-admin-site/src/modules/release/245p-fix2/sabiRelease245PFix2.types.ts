export type SabiRelease245PFix2Status = 'passed' | 'failed';

export interface SabiRelease245PFix2Report {
  version: string;
  status: SabiRelease245PFix2Status;
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
