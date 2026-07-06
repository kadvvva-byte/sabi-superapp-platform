export type SabiRelease250BStatus = 'passed' | 'failed';

export interface SabiRelease250BReport {
  version: string;
  status: SabiRelease250BStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
