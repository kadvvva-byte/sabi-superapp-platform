export type SabiRelease246IStatus = 'passed' | 'failed';

export interface SabiRelease246IReport {
  version: string;
  status: SabiRelease246IStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
