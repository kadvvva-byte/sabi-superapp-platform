export type SabiRelease245RStatus = 'passed' | 'failed';

export interface SabiRelease245RReport {
  version: string;
  status: SabiRelease245RStatus;
  approvalFlagRequired: string;
  approvalFlagProvided: boolean;
  scope: string;
  createdAt: string;
  cloudRunServiceUrl: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
