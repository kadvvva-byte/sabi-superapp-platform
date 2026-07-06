export type SabiRelease246EStatus = 'passed' | 'failed';

export interface SabiRelease246EReport {
  version: string;
  status: SabiRelease246EStatus;
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
