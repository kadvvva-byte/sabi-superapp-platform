export type SabiRelease249AFix4Recheck2Status = 'passed' | 'failed';

export interface SabiRelease249AFix4Recheck2Report {
  version: string;
  status: SabiRelease249AFix4Recheck2Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
