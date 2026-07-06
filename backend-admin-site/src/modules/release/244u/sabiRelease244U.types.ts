export type SabiRelease244UReadiness = Readonly<{
  "officialSiteGoogleCloudDeployFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReadiness": number,
  "officialDomainEmailGoogleCloudFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReadiness": number,
  "smsGoogleCloudServerBoundaryFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReadiness": number,
  "serverSabiAiGoogleCloudPersonalityFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReadiness": number,
  "bankWalletGoogleCloudDependencyFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReadiness": number,
  "previous244TReadiness": number,
  "googleCloudDeployExecutedNow": number,
  "ownerFinalCommandAcceptedNow": number,
  "finalOwnerCommandExecutableNow": number,
  "exactPhraseAcceptedNow": number,
  "exactPhraseExecutableNow": number,
  "finalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportAcceptedNow": number,
  "finalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportExecutableNow": number,
  "cloudRunServiceCreatedNow": number,
  "liveDomainDnsChangedNow": number,
  "liveEmailDnsChangedNow": number,
  "liveSmsSentNow": number,
  "walletPaymentPayoutNow": number,
  "realProductionLaunchNow": number
}>;

export type SabiRelease244USafety = Readonly<{
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
  "noFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportAcceptedNow": boolean,
  "noFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportExecutionNow": boolean
}>;

export type SabiRelease244U = Readonly<{
  version: string;
  status: 'ready_for_static_check_report_review_only';
  marker: string;
  strictPlanMode: boolean;
  noPivotWithoutOwnerApproval: boolean;
  maximumAcceleration: boolean;
  googleCloudDeployFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportOnly: boolean;
  ownerFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportReady: boolean;
  finalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportPlanningOnly: boolean;
  ownerExactPhraseFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReportAcceptanceBoundaryStaticCheckReportFinalReviewStaticCheckReportAcceptanceBoundaryStaticCheckReportValue: string;
  liveDeployCommandReference: string;
  nextStep: string;
  readiness: SabiRelease244UReadiness;
  safety: SabiRelease244USafety;
  readonly [key: string]: unknown;
}>;
