export type SabiRelease243DReadinessPercent = 0 | 100;

export interface SabiRelease243DReadiness {
  readonly officialSiteRealServerDeployStaticCheckReadiness: SabiRelease243DReadinessPercent;
  readonly officialDomainEmailRealServerStaticCheckReadiness: SabiRelease243DReadinessPercent;
  readonly smsServerBoundaryStaticCheckReadiness: SabiRelease243DReadinessPercent;
  readonly serverSabiAiPersonalityRuntimeStaticCheckReadiness: SabiRelease243DReadinessPercent;
  readonly bankWalletDependencyDeployStaticCheckReadiness: SabiRelease243DReadinessPercent;
  readonly previous243CReadiness: SabiRelease243DReadinessPercent;
  readonly googleCloudDeployExecutedNow: 0;
  readonly cloudRunServiceCreatedNow: 0;
  readonly liveDomainDnsChangedNow: 0;
  readonly liveEmailDnsChangedNow: 0;
  readonly liveSmsSentNow: 0;
  readonly walletPaymentPayoutNow: 0;
  readonly realProductionLaunchNow: 0;
}

export interface SabiRelease243DSafetyLocks {
  readonly noLiveGoogleCloudDeployNow: true;
  readonly noCloudRunServiceCreateNow: true;
  readonly noDomainDnsMutationNow: true;
  readonly noLiveEmailDnsMutationNow: true;
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

export interface SabiRelease243DStatus {
  readonly version: string;
  readonly marker: string;
  readonly strictPlanMode: true;
  readonly noPivotWithoutOwnerApproval: true;
  readonly maximumAcceleration: true;
  readonly staticCheckOnly: true;
  readonly realServerDeployReadinessStaticCheckOnly: true;
  readonly officialWebsiteMustWorkOnServer: true;
  readonly officialDomainEmailMustWork: true;
  readonly smsIsMandatoryForProgram: true;
  readonly smsWithoutItProgramDoesNotWork: true;
  readonly allCriticalLogicMustBeServerSide: true;
  readonly cloudRunCustomDomainMappingStaticCheckRequired: true;
  readonly officialSiteHealthCheckRequired: true;
  readonly officialSiteHttpsRequired: true;
  readonly emailDnsAuthenticationRequired: { readonly mx: true; readonly spf: true; readonly dkim: true; readonly dmarc: true };
  readonly firebasePhoneAuthOrApprovedSmsProviderRequired: true;
  readonly phoneNumberSignInMustBeEnabledBeforeLiveUse: true;
  readonly smsServerBoundaryRequired: true;
  readonly serverSabiAiPersonalityTrainingMustFollowPlan: true;
  readonly ownerSabiAiReportOnly: true;
  readonly ownerFinalDecisionRequired: true;
  readonly noSecretRevealToOwnerSabiAi: true;
  readonly bankAccountOpeningUrgent: true;
  readonly walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: true;
  readonly walletProviderIntegrationRequiresOwnerExactApproval: true;
  readonly publicCommunicationChannel: 'Sabi Messenger';
  readonly noTelegramMention: true;
  readonly noDonationOrInvestmentRequest: true;
  readonly sabiAllocatedCompanyFundsOnly: true;
  readonly targetSubmissionDate: '2026-07-01';
  readonly targetPublicLaunchDate: '2026-07-15';
  readonly readiness: SabiRelease243DReadiness;
  readonly safety: SabiRelease243DSafetyLocks;
  readonly nextStep: string;
}
