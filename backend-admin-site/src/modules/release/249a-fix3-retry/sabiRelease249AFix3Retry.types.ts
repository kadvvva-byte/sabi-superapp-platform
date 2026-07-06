export type SabiRelease249AFix3RetryStatus = 'passed' | 'failed';

export interface SabiRelease249AFix3RetryReport {
  version: string;
  status: SabiRelease249AFix3RetryStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
