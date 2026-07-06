export type SabiRelease246GStatus = 'passed' | 'failed';

export interface SabiRelease246GReport {
  version: string;
  status: SabiRelease246GStatus;
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
