export type SabiRelease249BStatus = 'passed' | 'failed' | 'awaiting_manual_send_receive_proof';

export interface SabiRelease249BReport {
  version: string;
  status: SabiRelease249BStatus;
  createdAt: string;
  readiness: Record<string, number>;
  safety: Record<string, boolean | string>;
  blockers: string[];
  warnings: string[];
  nextStep: string;
  exactCommandForRecordingProof: string;
  [key: string]: unknown;
}
