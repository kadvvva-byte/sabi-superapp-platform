export type SabiRelease243BStatus = 'ready' | 'locked';

export interface SabiRelease243BReadiness {
  readonly officialSiteServerStaticCheckReadiness: 100;
  readonly officialDomainEmailStaticCheckReadiness: 100;
  readonly smsMandatoryStaticCheckReadiness: 100;
  readonly serverSabiAiPersonalityStaticCheckReadiness: 100;
  readonly bankWalletDependencyStaticCheckReadiness: 100;
  readonly previous243AReadiness: 100;
  readonly googleCloudDeployExecutedNow: 0;
  readonly liveSmsSentNow: 0;
  readonly walletPaymentPayoutNow: 0;
  readonly realProductionLaunchNow: 0;
}

export interface SabiRelease243BSafetyLocks {
  readonly noLiveGoogleCloudDeployNow: true;
  readonly noLiveSmsSendNow: true;
  readonly noFirebaseApiCallNow: true;
  readonly noSmsProviderCallNow: true;
  readonly noWalletPaymentPayoutNow: true;
  readonly noSecretInSourceChatAdminMobile: true;
  readonly noPlainSecretInReport: true;
  readonly noEnvReadWriteNow: true;
  readonly noSecretManagerReadWriteNow: true;
  readonly noDbMutationNow: true;
  readonly noRuntimeMountNow: true;
  readonly noPublicLaunchClaimNow: true;
  readonly ownerExactApprovalRequiredBeforeLiveAction: true;
}

export interface SabiRelease243BStaticCheck {
  readonly version: 'SABI-RELEASE-243B-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-BANK-WALLET-READINESS-STATIC-CHECK';
  readonly marker: 'SABI_RELEASE_243B_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_BANK_WALLET_READINESS_STATIC_CHECK_STILL_NO_LIVE_DEPLOY_NO_LIVE_SMS';
  readonly status: SabiRelease243BStatus;
  readonly strictPlanMode: true;
  readonly noPivotWithoutOwnerApproval: true;
  readonly maximumAcceleration: true;
  readonly staticCheckOnly: true;
  readonly officialWebsiteMustWorkOnServer: true;
  readonly officialDomainEmailMustWork: true;
  readonly smsIsMandatoryForProgram: true;
  readonly smsWithoutItProgramDoesNotWork: true;
  readonly allCriticalLogicMustBeServerSide: true;
  readonly sabiAiPersonalityTrainingMustFollowPlan: true;
  readonly bankAccountOpeningUrgent: true;
  readonly walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: true;
  readonly targetSubmissionDate: '2026-07-01';
  readonly targetPublicLaunchDate: '2026-07-15';
  readonly cloudRunCustomDomainMappingStaticCheckRequired: true;
  readonly emailDnsAuthenticationRequired: {
    readonly mx: true;
    readonly spf: true;
    readonly dkim: true;
    readonly dmarc: true;
  };
  readonly smsAuthRequired: {
    readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;
    readonly phoneNumberSignInMustBeEnabledBeforeLiveUse: true;
    readonly liveSmsStillLockedUntilExactOwnerApproval: true;
  };
  readonly ownerSabiAi: {
    readonly ownerSabiAiReportOnly: true;
    readonly ownerFinalDecisionRequired: true;
    readonly noSecretRevealToOwnerSabiAi: true;
  };
  readonly publicRules: {
    /** Official public communication channel: Sabi Messenger. */
    readonly sabiMessengerOnly: true;
    readonly noTelegramMention: true;
    readonly noDonationOrInvestmentRequest: true;
    readonly sabiAllocatedCompanyFundsOnly: true;
  };
  readonly readiness: SabiRelease243BReadiness;
  readonly safety: SabiRelease243BSafetyLocks;
  readonly nextStep: '243C_official_site_email_sms_server_ai_real_server_deploy_readiness_still_no_live_deploy_no_live_sms';
}
