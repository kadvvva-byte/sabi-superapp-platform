export type SabiRelease243TStatus = 'passed' | 'blocked';

export interface SabiRelease243TReadiness {
  readonly [key: string]: number;
}

export interface SabiRelease243TSafety {
  readonly [key: string]: boolean;
}

export interface SabiRelease243TEmailDnsAuthentication {
  readonly mx: true;
  readonly spf: true;
  readonly dkim: true;
  readonly dmarc: true;
}

export interface SabiRelease243TPlan {
  readonly version: string;
  readonly marker: string;
  readonly status: SabiRelease243TStatus;
  readonly readiness: SabiRelease243TReadiness;
  readonly safety: SabiRelease243TSafety;
  readonly nextStep: string;
  readonly [key: string]: unknown;
}
