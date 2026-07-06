export type OwnerSabiAi251FRouteCandidate = Readonly<{
  method: 'GET';
  path: string;
  purpose: string;
  readOnly: true;
  mountedNow: false;
  requiresFutureOwnerApprovalToMount: true;
}>;

export type OwnerSabiAi251FPersonalityKernel = Readonly<{
  identity: Readonly<Record<string, boolean>>;
  professorDomains: readonly string[];
  languageMission: Readonly<Record<string, boolean | number | string>>;
  humanStyle: Readonly<Record<string, boolean>>;
}>;

export type OwnerSabiAi251FGovernance = Readonly<Record<string, boolean>>;

export type OwnerSabiAi251FSafety = Readonly<Record<string, boolean>>;

export type OwnerSabiAi251FReadiness = Readonly<Record<string, number>>;
