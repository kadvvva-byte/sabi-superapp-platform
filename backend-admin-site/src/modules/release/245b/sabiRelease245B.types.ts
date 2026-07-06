export type SabiRelease245BSafety = Readonly<Record<string, boolean>>;

export type SabiRelease245BReadiness = Readonly<Record<string, number>>;

export type SabiRelease245BReport = Readonly<{
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
  readiness: SabiRelease245BReadiness;
  safety: SabiRelease245BSafety;
  readonly [key: string]: unknown;
}>;
