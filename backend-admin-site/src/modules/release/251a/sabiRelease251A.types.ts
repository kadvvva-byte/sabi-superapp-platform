export type SabiRelease251AStatus = 'passed' | 'failed';

export interface SabiRelease251AReport {
  version: string;
  status: SabiRelease251AStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
