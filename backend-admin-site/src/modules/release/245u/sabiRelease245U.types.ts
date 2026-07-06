export type SabiRelease245UStatus = 'passed' | 'pending_dns_propagation_or_failed';

export interface SabiRelease245UReport {
  version: string;
  status: SabiRelease245UStatus;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
