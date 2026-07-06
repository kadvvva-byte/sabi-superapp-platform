export type SabiRelease250AStatus = 'passed' | 'failed' | 'awaiting_manual_info_alias_route_proof';

export interface SabiRelease250AReport {
  version: string;
  status: SabiRelease250AStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactCommandForRecordingProof: string;
  [key: string]: unknown;
}
