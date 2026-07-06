export type SabiRelease251EStatus = 'passed' | 'failed';

export interface SabiRelease251EReport {
  version: string;
  status: SabiRelease251EStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
