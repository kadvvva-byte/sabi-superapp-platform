export type SabiRelease246KFix2Status = 'passed' | 'failed';

export interface SabiRelease246KFix2Report {
  version: string;
  status: SabiRelease246KFix2Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
