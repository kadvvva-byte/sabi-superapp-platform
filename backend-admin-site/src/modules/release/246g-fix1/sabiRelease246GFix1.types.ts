export type SabiRelease246GFix1Status = 'passed' | 'failed';

export interface SabiRelease246GFix1Report {
  version: string;
  status: SabiRelease246GFix1Status;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
