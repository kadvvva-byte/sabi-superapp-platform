export type SabiRelease246MFix4CloseoutStatus = 'passed';

export interface SabiRelease246MFix4CloseoutReport {
  version: string;
  status: SabiRelease246MFix4CloseoutStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactApprovalForNext: string;
  [key: string]: unknown;
}
