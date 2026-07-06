export type SabiRelease245MStatus = 'passed';

export interface SabiRelease245MReadiness {
  release245MReadiness: number;
  previous245LReadiness: number;
  release245DFix1TypeClean: number;
  googleCloudDeployExecutedNow: number;
  ownerFinalCommandAcceptedNow: number;
  finalOwnerCommandExecutableNow: number;
  exactPhraseAcceptedNow: number;
  exactPhraseExecutableNow: number;
  cloudRunServiceCreatedNow: number;
  liveDomainDnsChangedNow: number;
  liveEmailDnsChangedNow: number;
  liveSmsSentNow: number;
  walletPaymentPayoutNow: number;
  realProductionLaunchNow: number;
}

export interface SabiRelease245MSafety {
  noLiveGoogleCloudDeployNow: boolean;
  noCloudRunServiceCreateNow: boolean;
  noDomainDnsMutationNow: boolean;
  noLiveEmailDnsMutationNow: boolean;
  noLiveSmsSendNow: boolean;
  noFirebaseApiCallNow: boolean;
  noSmsProviderCallNow: boolean;
  noWalletPaymentPayoutNow: boolean;
  noSecretInSourceChatAdminMobile: boolean;
  noPlainSecretInReport: boolean;
  noEnvReadWriteNow: boolean;
  noSecretManagerReadWriteNow: boolean;
  noDbMutationNow: boolean;
  noRuntimeMountNow: boolean;
  noPublicLaunchClaimNow: boolean;
  ownerExactApprovalRequiredBeforeLiveAction: boolean;
  noPivotWithoutOwnerApproval: boolean;
  noSecretRevealToOwnerSabiAi: boolean;
  noTelegramMention: boolean;
  noDonationOrInvestmentRequest: boolean;
  noFinalOwnerCommandExactPhraseFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportAcceptedNow: boolean;
  noFinalOwnerCommandExactPhraseFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportExecutionNow: boolean;
}

export interface SabiRelease245MReport {
  version: string;
  marker: string;
  status: SabiRelease245MStatus;
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
  cloudRunCustomDomainMappingRequired: boolean;
  officialSiteHttpsRequired: boolean;
  officialSiteHealthCheckRequired: boolean;
  emailDnsAuthenticationRequired: boolean;
  mx: boolean;
  spf: boolean;
  dkim: boolean;
  dmarc: boolean;
  firebasePhoneAuthOrApprovedSmsProviderRequired: boolean;
  phoneNumberSignInMustBeEnabledBeforeLiveUse: boolean;
  liveSmsStillLockedUntilExactOwnerApproval: boolean;
  smsServerBoundaryRequired: boolean;
  serverSabiAiPersonalityTrainingMustFollowPlan: boolean;
  ownerSabiAiReportOnly: boolean;
  ownerFinalDecisionRequired: boolean;
  noSecretRevealToOwnerSabiAi: boolean;
  bankAccountOpeningUrgent: boolean;
  walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: boolean;
  walletProviderIntegrationRequiresOwnerExactApproval: boolean;
  publicCommunicationChannel: 'Sabi Messenger';
  noTelegramMention: boolean;
  noDonationOrInvestmentRequest: boolean;
  sabiAllocatedCompanyFundsOnly: boolean;
  targetOfficialSiteServerReadyDate: string;
  targetBankWalletDependencyDate: string;
  liveDeployCommandReferenceOnly: boolean;
  referenceCommand: string;
  reviewMatrix: string[];
  readiness: SabiRelease245MReadiness;
  safety: SabiRelease245MSafety;
  noExecutionNow: boolean;
  acceptedNow: boolean;
  executableNow: boolean;
  nextStep: string;
  [key: string]: unknown;
}
