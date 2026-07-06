export type SabiRelease246LStatus = 'passed' | 'failed';

export interface SabiRelease246LReport {
  version: string;
  status: SabiRelease246LStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
