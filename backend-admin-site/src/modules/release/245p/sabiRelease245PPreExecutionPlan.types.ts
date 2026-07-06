export type SabiRelease245PPreExecutionPlanStatus = 'passed';

export interface SabiRelease245PPreExecutionPlanReport {
  version: string;
  status: SabiRelease245PPreExecutionPlanStatus;
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
