export type SabiRelease250BFix1Status = 'passed' | 'failed';

export interface SabiRelease250BFix1Report {
  version: string;
  status: SabiRelease250BFix1Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
