export type SabiRelease246FFix1Status = 'passed' | 'failed';

export interface SabiRelease246FFix1Report {
  version: string;
  status: SabiRelease246FFix1Status;
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
