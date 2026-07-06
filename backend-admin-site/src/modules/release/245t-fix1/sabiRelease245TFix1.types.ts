export type SabiRelease245TFix1Status = 'passed' | 'failed';

export interface SabiRelease245TFix1Report {
  version: string;
  status: SabiRelease245TFix1Status;
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
