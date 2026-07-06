export type SabiRelease246MStatus = 'passed' | 'failed';

export interface SabiRelease246MReport {
  version: string;
  status: SabiRelease246MStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
