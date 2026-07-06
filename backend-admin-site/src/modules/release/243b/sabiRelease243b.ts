import type { SabiRelease243BStaticCheck } from './sabiRelease243b.types';

export const SABI_RELEASE_243B_VERSION = 'SABI-RELEASE-243B-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-BANK-WALLET-READINESS-STATIC-CHECK' as const;

export const SABI_RELEASE_243B_MARKER = 'SABI_RELEASE_243B_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_BANK_WALLET_READINESS_STATIC_CHECK_STILL_NO_LIVE_DEPLOY_NO_LIVE_SMS' as const;

export const sabiRelease243BStaticCheck: SabiRelease243BStaticCheck = {
  version: SABI_RELEASE_243B_VERSION,
  marker: SABI_RELEASE_243B_MARKER,
  status: 'ready',
  strictPlanMode: true,
  noPivotWithoutOwnerApproval: true,
  maximumAcceleration: true,
  staticCheckOnly: true,
  officialWebsiteMustWorkOnServer: true,
  officialDomainEmailMustWork: true,
  smsIsMandatoryForProgram: true,
  smsWithoutItProgramDoesNotWork: true,
  allCriticalLogicMustBeServerSide: true,
  sabiAiPersonalityTrainingMustFollowPlan: true,
  bankAccountOpeningUrgent: true,
  walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: true,
  targetSubmissionDate: '2026-07-01',
  targetPublicLaunchDate: '2026-07-15',
  cloudRunCustomDomainMappingStaticCheckRequired: true,
  emailDnsAuthenticationRequired: {
    mx: true,
    spf: true,
    dkim: true,
    dmarc: true,
  },
  smsAuthRequired: {
    firebasePhoneAuthOrApprovedSmsProviderRequired: true,
    phoneNumberSignInMustBeEnabledBeforeLiveUse: true,
    liveSmsStillLockedUntilExactOwnerApproval: true,
  },
  ownerSabiAi: {
    ownerSabiAiReportOnly: true,
    ownerFinalDecisionRequired: true,
    noSecretRevealToOwnerSabiAi: true,
  },
  publicRules: {
    // Official public communication channel: Sabi Messenger.
    sabiMessengerOnly: true,
    noTelegramMention: true,
    noDonationOrInvestmentRequest: true,
    sabiAllocatedCompanyFundsOnly: true,
  },
  readiness: {
    officialSiteServerStaticCheckReadiness: 100,
    officialDomainEmailStaticCheckReadiness: 100,
    smsMandatoryStaticCheckReadiness: 100,
    serverSabiAiPersonalityStaticCheckReadiness: 100,
    bankWalletDependencyStaticCheckReadiness: 100,
    previous243AReadiness: 100,
    googleCloudDeployExecutedNow: 0,
    liveSmsSentNow: 0,
    walletPaymentPayoutNow: 0,
    realProductionLaunchNow: 0,
  },
  safety: {
    noLiveGoogleCloudDeployNow: true,
    noLiveSmsSendNow: true,
    noFirebaseApiCallNow: true,
    noSmsProviderCallNow: true,
    noWalletPaymentPayoutNow: true,
    noSecretInSourceChatAdminMobile: true,
    noPlainSecretInReport: true,
    noEnvReadWriteNow: true,
    noSecretManagerReadWriteNow: true,
    noDbMutationNow: true,
    noRuntimeMountNow: true,
    noPublicLaunchClaimNow: true,
    ownerExactApprovalRequiredBeforeLiveAction: true,
  },
  nextStep: '243C_official_site_email_sms_server_ai_real_server_deploy_readiness_still_no_live_deploy_no_live_sms',
};

export function getSabiRelease243BStaticCheck(): SabiRelease243BStaticCheck {
  return sabiRelease243BStaticCheck;
}
