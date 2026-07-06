export type SabiRelease246LFix1Status = 'passed' | 'failed';

export interface SabiRelease246LFix1Report {
  version: string;
  status: SabiRelease246LFix1Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
