export type SabiRelease251DStatus = 'passed' | 'failed';

export interface SabiRelease251DReport {
  version: string;
  status: SabiRelease251DStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
