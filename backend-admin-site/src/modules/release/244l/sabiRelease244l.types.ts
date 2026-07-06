export type SabiRelease244LEmailDnsAuthentication = Readonly<{
  mx: true;
  spf: true;
  dkim: true;
  dmarc: true;
}>;

export type SabiRelease244LPreflightStaticCheckReportItem = Readonly<{
  name: string;
  required: true;
  liveExecutionAllowed: false;
  secretRevealAllowed: false;
  reportOnly: true;
}>;

export type SabiRelease244L = Readonly<Record<string, unknown>>;
