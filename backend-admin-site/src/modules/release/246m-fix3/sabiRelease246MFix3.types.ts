export type SabiRelease246MFix3Status = 'passed' | 'failed';

export interface SabiRelease246MFix3Report {
  version: string;
  status: SabiRelease246MFix3Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
