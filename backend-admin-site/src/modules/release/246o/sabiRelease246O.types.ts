export type SabiRelease246OStatus = 'passed' | 'failed';

export interface SabiRelease246OReport {
  version: string;
  status: SabiRelease246OStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  [key: string]: unknown;
}
