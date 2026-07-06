export type SabiRelease243CLockName =
  | 'noLiveGoogleCloudDeployNow'
  | 'noCloudRunServiceCreateNow'
  | 'noDomainDnsMutationNow'
  | 'noLiveEmailDnsMutationNow'
  | 'noLiveSmsSendNow'
  | 'noFirebaseApiCallNow'
  | 'noSmsProviderCallNow'
  | 'noWalletPaymentPayoutNow'
  | 'noSecretInSourceChatAdminMobile'
  | 'noPlainSecretInReport'
  | 'noEnvReadWriteNow'
  | 'noSecretManagerReadWriteNow'
  | 'noDbMutationNow'
  | 'noRuntimeMountNow'
  | 'noPublicLaunchClaimNow';

export type SabiRelease243CReadiness = Readonly<{
  officialSiteRealServerDeployReadiness: 100;
  officialDomainEmailRealServerReadiness: 100;
  smsServerBoundaryReadiness: 100;
  serverSabiAiPersonalityRuntimePlanReadiness: 100;
  bankWalletDependencyDeployReadiness: 100;
  previous243BReadiness: 100;
  googleCloudDeployExecutedNow: 0;
  cloudRunServiceCreatedNow: 0;
  liveDomainDnsChangedNow: 0;
  liveEmailDnsChangedNow: 0;
  liveSmsSentNow: 0;
  walletPaymentPayoutNow: 0;
  realProductionLaunchNow: 0;
}>;

export type SabiRelease243CSafety = Readonly<Record<SabiRelease243CLockName, true>> & Readonly<{
  ownerExactApprovalRequiredBeforeLiveAction: true;
  bankAccountOpeningUrgent: true;
  smsWithoutItProgramDoesNotWork: true;
}>;

export type SabiRelease243CPlan = Readonly<{
  version: 'SABI-RELEASE-243C-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-REAL-SERVER-DEPLOY-READINESS';
  marker: 'SABI_RELEASE_243C_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_REAL_SERVER_DEPLOY_READINESS_STILL_NO_LIVE_DEPLOY_NO_LIVE_SMS';
  strictPlanMode: true;
  noPivotWithoutOwnerApproval: true;
  maximumAcceleration: true;
  realServerDeployReadinessOnly: true;
  officialWebsiteMustWorkOnServer: true;
  officialDomainEmailMustWork: true;
  smsIsMandatoryForProgram: true;
  smsWithoutItProgramDoesNotWork: true;
  allCriticalLogicMustBeServerSide: true;
  cloudRunCustomDomainMappingReadinessRequired: true;
  officialSiteHealthCheckRequired: true;
  officialSiteHttpsRequired: true;
  emailDnsAuthenticationRequired: Readonly<{ mx: true; spf: true; dkim: true; dmarc: true }>;
  firebasePhoneAuthOrApprovedSmsProviderRequired: true;
  phoneNumberSignInMustBeEnabledBeforeLiveUse: true;
  smsServerBoundaryRequired: true;
  serverSabiAiPersonalityTrainingMustFollowPlan: true;
  ownerSabiAiReportOnly: true;
  ownerFinalDecisionRequired: true;
  noSecretRevealToOwnerSabiAi: true;
  bankAccountOpeningUrgent: true;
  walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: true;
  walletProviderIntegrationRequiresOwnerExactApproval: true;
  publicCommunicationChannel: 'Sabi Messenger';
  noTelegramMention: true;
  noDonationOrInvestmentRequest: true;
  sabiAllocatedCompanyFundsOnly: true;
  targetSubmissionDate: '2026-07-01';
  targetPublicLaunchDate: '2026-07-15';
  readiness: SabiRelease243CReadiness;
  safety: SabiRelease243CSafety;
  nextStep: '243D_official_site_email_sms_server_ai_real_server_deploy_readiness_static_check_still_no_live_deploy_no_live_sms';
}>;
