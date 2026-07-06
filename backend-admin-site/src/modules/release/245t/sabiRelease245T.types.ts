export type SabiRelease245TStatus = 'passed' | 'failed';

export interface SabiRelease245TReport {
  version: string;
  status: SabiRelease245TStatus;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  requiredDnsRecords: unknown[];
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
