export type SabiRelease246GFix2Status = 'passed' | 'failed';

export interface SabiRelease246GFix2Report {
  version: string;
  status: SabiRelease246GFix2Status;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
