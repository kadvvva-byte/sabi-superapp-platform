export type SabiRelease246AStatus = 'passed' | 'failed';

export interface SabiRelease246AReport {
  version: string;
  status: SabiRelease246AStatus;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
