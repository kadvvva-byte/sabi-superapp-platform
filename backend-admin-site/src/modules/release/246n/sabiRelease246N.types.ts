export type SabiRelease246NStatus = 'passed' | 'failed';

export interface SabiRelease246NReport {
  version: string;
  status: SabiRelease246NStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
