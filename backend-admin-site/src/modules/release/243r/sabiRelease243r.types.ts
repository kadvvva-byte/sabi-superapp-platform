export type SabiRelease243RStatus = 'passed' | 'blocked';

export interface SabiRelease243RReadiness {
  readonly [key: string]: number;
}

export interface SabiRelease243RSafety {
  readonly [key: string]: boolean;
}

export interface SabiRelease243REmailDnsAuthentication {
  readonly mx: true;
  readonly spf: true;
  readonly dkim: true;
  readonly dmarc: true;
}

export interface SabiRelease243RPlan {
  readonly version: string;
  readonly marker: string;
  readonly status: SabiRelease243RStatus;
  readonly readiness: SabiRelease243RReadiness;
  readonly safety: SabiRelease243RSafety;
  readonly nextStep: string;
  readonly [key: string]: unknown;
}
