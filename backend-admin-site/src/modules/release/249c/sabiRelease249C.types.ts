export type SabiRelease249CStatus = 'passed' | 'failed';

export interface SabiRelease249CReport {
  version: string;
  status: SabiRelease249CStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
