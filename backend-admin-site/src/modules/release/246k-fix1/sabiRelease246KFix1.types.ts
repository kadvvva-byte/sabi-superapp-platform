export type SabiRelease246KFix1Status = 'passed' | 'failed';

export interface SabiRelease246KFix1Report {
  version: string;
  status: SabiRelease246KFix1Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
