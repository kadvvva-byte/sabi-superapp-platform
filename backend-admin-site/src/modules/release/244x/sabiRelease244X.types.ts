export type SabiRelease244XSafety = Readonly<Record<string, boolean>>;

export type SabiRelease244XReadiness = Readonly<Record<string, number>>;

export type SabiRelease244XReport = Readonly<{
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
  readiness: SabiRelease244XReadiness;
  safety: SabiRelease244XSafety;
  readonly [key: string]: unknown;
}>;
