export type SabiRelease246FStatus = 'passed' | 'failed';

export interface SabiRelease246FReport {
  version: string;
  status: SabiRelease246FStatus;
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
