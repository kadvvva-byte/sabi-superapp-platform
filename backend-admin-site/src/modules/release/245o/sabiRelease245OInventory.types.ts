export type SabiRelease245OInventoryStatus = 'passed';

export interface SabiRelease245OInventoryReport {
  version: string;
  status: SabiRelease245OInventoryStatus;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
