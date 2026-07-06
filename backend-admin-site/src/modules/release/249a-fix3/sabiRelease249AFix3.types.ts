export type SabiRelease249AFix3Status = 'passed' | 'failed';

export interface SabiRelease249AFix3Report {
  version: string;
  status: SabiRelease249AFix3Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
