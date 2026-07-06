export type SabiRelease245UFix1Status = 'passed' | 'pending_certificate_or_local_dns_cache';

export interface SabiRelease245UFix1Report {
  version: string;
  status: SabiRelease245UFix1Status;
  createdAt: string;
  officialDomain: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  nextStep: string;
  [key: string]: unknown;
}
