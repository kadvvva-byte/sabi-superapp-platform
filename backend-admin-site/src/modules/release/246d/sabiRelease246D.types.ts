export type SabiRelease246DStatus = 'passed' | 'failed';

export interface SabiRelease246DReport {
  version: string;
  status: SabiRelease246DStatus;
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
