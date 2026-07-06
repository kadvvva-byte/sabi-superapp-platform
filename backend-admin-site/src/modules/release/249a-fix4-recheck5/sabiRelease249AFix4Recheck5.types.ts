export type SabiRelease249AFix4Recheck5Status = 'passed' | 'failed';

export interface SabiRelease249AFix4Recheck5Report {
  version: string;
  status: SabiRelease249AFix4Recheck5Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
