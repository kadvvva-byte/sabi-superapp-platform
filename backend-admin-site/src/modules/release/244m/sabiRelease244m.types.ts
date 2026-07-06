export type SabiRelease244MEmailDnsAuthentication = Readonly<{
  mx: true;
  spf: true;
  dkim: true;
  dmarc: true;
}>;

export type SabiRelease244MPreflightStaticCheckReportAcceptanceBoundaryItem = Readonly<{
  name: string;
  required: true;
  liveExecutionAllowed: false;
  secretRevealAllowed: false;
  acceptanceBoundaryOnly: true;
}>;

export type SabiRelease244M = Readonly<Record<string, unknown>>;
