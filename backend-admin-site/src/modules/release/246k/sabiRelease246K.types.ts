export type SabiRelease246KStatus = 'passed' | 'failed';

export interface SabiRelease246KReport {
  version: string;
  status: SabiRelease246KStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
