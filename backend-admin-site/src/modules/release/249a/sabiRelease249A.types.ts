export type SabiRelease249AStatus = 'passed' | 'failed';

export interface SabiRelease249AReport {
  version: string;
  status: SabiRelease249AStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
