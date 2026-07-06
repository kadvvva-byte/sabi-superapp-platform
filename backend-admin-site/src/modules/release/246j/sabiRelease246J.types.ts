export type SabiRelease246JStatus = 'passed' | 'failed';

export interface SabiRelease246JReport {
  version: string;
  status: SabiRelease246JStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
