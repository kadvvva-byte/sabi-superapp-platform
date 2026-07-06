export type SabiRelease246HStatus = 'passed' | 'failed';

export interface SabiRelease246HReport {
  version: string;
  status: SabiRelease246HStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
