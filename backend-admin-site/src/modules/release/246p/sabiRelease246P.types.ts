export type SabiRelease246PStatus = 'passed' | 'failed';

export interface SabiRelease246PReport {
  version: string;
  status: SabiRelease246PStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
