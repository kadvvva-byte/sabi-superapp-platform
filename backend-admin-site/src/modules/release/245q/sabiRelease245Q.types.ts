export type SabiRelease245QStatus = 'passed' | 'failed';

export interface SabiRelease245QReport {
  version: string;
  status: SabiRelease245QStatus;
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
