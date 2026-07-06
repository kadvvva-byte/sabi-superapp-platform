export type SabiRelease251BStatus = 'passed' | 'failed';

export interface SabiRelease251BReport {
  version: string;
  status: SabiRelease251BStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
