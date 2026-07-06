export type SabiRelease244KEmailDnsAuthentication = Readonly<{
  mx: true;
  spf: true;
  dkim: true;
  dmarc: true;
}>;

export type SabiRelease244KPreflightStaticCheckItem = Readonly<{
  name: string;
  required: true;
  liveExecutionAllowed: false;
  secretRevealAllowed: false;
}>;

export type SabiRelease244K = Readonly<Record<string, unknown>>;
