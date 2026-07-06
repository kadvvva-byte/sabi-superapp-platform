export type SabiRelease246MFix3AStatus = 'passed' | 'failed';

export interface SabiRelease246MFix3AReport {
  version: string;
  status: SabiRelease246MFix3AStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
