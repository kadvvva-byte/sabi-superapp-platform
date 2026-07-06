export type SabiRelease243SStatus = 'passed' | 'blocked';

export interface SabiRelease243SReadiness {
  readonly [key: string]: number;
}

export interface SabiRelease243SSafety {
  readonly [key: string]: boolean;
}

export interface SabiRelease243SEmailDnsAuthentication {
  readonly mx: true;
  readonly spf: true;
  readonly dkim: true;
  readonly dmarc: true;
}

export interface SabiRelease243SPlan {
  readonly version: string;
  readonly marker: string;
  readonly status: SabiRelease243SStatus;
  readonly readiness: SabiRelease243SReadiness;
  readonly safety: SabiRelease243SSafety;
  readonly nextStep: string;
  readonly [key: string]: unknown;
}
