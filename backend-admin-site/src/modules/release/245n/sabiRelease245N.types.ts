export type SabiRelease245NStatus = 'passed';

export interface SabiRelease245NReport {
  version: string;
  status: SabiRelease245NStatus;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean>;
  reviewMatrix: string[];
  nextStep: string;
  [key: string]: unknown;
}
