export type SabiRelease251CStatus = 'passed' | 'failed';

export interface SabiRelease251CReport {
  version: string;
  status: SabiRelease251CStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
