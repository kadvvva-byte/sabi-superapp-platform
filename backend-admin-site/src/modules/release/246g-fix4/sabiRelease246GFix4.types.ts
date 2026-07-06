export type SabiRelease246GFix4Status = 'passed' | 'failed';

export interface SabiRelease246GFix4Report {
  version: string;
  status: SabiRelease246GFix4Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
