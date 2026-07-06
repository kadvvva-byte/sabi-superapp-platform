export interface SabiRelease245IReport {
  version: string;
  marker: string;
  status: 'passed';
  approvalFlagRequired: string;
  scope: string;
  createdAt: string;
  nextStep: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean>;
  reviewMatrix: string[];
  [key: string]: unknown;
}
