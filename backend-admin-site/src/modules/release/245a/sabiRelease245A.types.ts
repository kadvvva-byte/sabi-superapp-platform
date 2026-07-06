export type SabiRelease245ASafety = Readonly<Record<string, boolean>>;

export type SabiRelease245AReadiness = Readonly<Record<string, number>>;

export type SabiRelease245AReport = Readonly<{
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
  noTelegramMention: boolean;
  noDonationOrInvestmentRequest: boolean;
  sabiAllocatedCompanyFundsOnly: boolean;
  referenceCommand: string;
  nextStep: string;
  readiness: SabiRelease245AReadiness;
  safety: SabiRelease245ASafety;
  readonly [key: string]: unknown;
}>;
