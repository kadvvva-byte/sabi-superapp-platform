export type SabiRelease249AFix1Status = 'passed' | 'failed';

export interface SabiRelease249AFix1Report {
  version: string;
  status: SabiRelease249AFix1Status;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
