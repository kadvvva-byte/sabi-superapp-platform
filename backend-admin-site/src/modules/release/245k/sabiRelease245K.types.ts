export type SabiRelease245KReadiness = Readonly<Record<string, number>>;

export type SabiRelease245KSafety = Readonly<Record<string, boolean>>;

export type SabiRelease245KReport = Readonly<{
  version: string;
  marker: string;
  status: 'passed';
  approvalFlagRequired: string;
  scope: string;
  createdAt: string;
  strictPlanMode: boolean;
  noPivotWithoutOwnerApproval: boolean;
  maximumAcceleration: boolean;
  officialWebsiteMustWorkOnServer: boolean;
  officialDomainEmailMustWork: boolean;
  smsIsMandatoryForProgram: boolean;
  smsWithoutItProgramDoesNotWork: boolean;
  allCriticalLogicMustBeServerSide: boolean;
  publicCommunicationChannel: 'Sabi Messenger';
  reviewMatrix: readonly string[];
  nextStep: string;
  readiness: SabiRelease245KReadiness;
  safety: SabiRelease245KSafety;
  [key: string]: unknown;
}>;
