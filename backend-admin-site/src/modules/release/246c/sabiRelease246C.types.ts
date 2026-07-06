export type SabiRelease246CStatus = 'passed' | 'failed';

export interface SabiRelease246CReport {
  version: string;
  status: SabiRelease246CStatus;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
