export type SabiRelease244VReadiness = Readonly<{
  "officialSiteGoogleCloudDeployFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewReadiness": number,
  "officialDomainEmailGoogleCloudFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewReadiness": number,
  "smsGoogleCloudServerBoundaryFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewReadiness": number,
  "serverSabiAiGoogleCloudPersonalityFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewReadiness": number,
  "bankWalletGoogleCloudDependencyFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewReadiness": number,
  "previous244UReadiness": number,
  "googleCloudDeployExecutedNow": number,
  "ownerFinalCommandAcceptedNow": number,
  "finalOwnerCommandExecutableNow": number,
  "exactPhraseAcceptedNow": number,
  "exactPhraseExecutableNow": number,
  "finalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewAcceptedNow": number,
  "finalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewExecutableNow": number,
  "cloudRunServiceCreatedNow": number,
  "liveDomainDnsChangedNow": number,
  "liveEmailDnsChangedNow": number,
  "liveSmsSentNow": number,
  "walletPaymentPayoutNow": number,
  "realProductionLaunchNow": number
}>;

export type SabiRelease244VSafety = Readonly<{
  "noLiveGoogleCloudDeployNow": boolean,
  "noCloudRunServiceCreateNow": boolean,
  "noDomainDnsMutationNow": boolean,
  "noLiveEmailDnsMutationNow": boolean,
  "noLiveSmsSendNow": boolean,
  "noFirebaseApiCallNow": boolean,
  "noSmsProviderCallNow": boolean,
  "noWalletPaymentPayoutNow": boolean,
  "noSecretInSourceChatAdminMobile": boolean,
  "noPlainSecretInReport": boolean,
  "noEnvReadWriteNow": boolean,
  "noSecretManagerReadWriteNow": boolean,
  "noDbMutationNow": boolean,
  "noRuntimeMountNow": boolean,
  "noPublicLaunchClaimNow": boolean,
  "ownerExactApprovalRequiredBeforeLiveAction": boolean,
  "noPivotWithoutOwnerApproval": boolean,
  "noSecretRevealToOwnerSabiAi": boolean,
  "noTelegramMention": boolean,
  "noDonationOrInvestmentRequest": boolean,
  "noFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewAcceptedNow": boolean,
  "noFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewExecutionNow": boolean
}>;

export type SabiRelease244V = Readonly<Record<string, unknown> & {
  version: string;
  status: 'ready_for_final_review_only';
  marker: string;
  strictPlanMode: boolean;
  noPivotWithoutOwnerApproval: boolean;
  maximumAcceleration: boolean;
  liveDeployCommandReference: string;
  nextStep: string;
  readiness: SabiRelease244VReadiness;
  safety: SabiRelease244VSafety;
}>;
