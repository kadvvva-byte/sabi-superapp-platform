import type {
  SabiRelease244K,
  SabiRelease244KEmailDnsAuthentication,
  SabiRelease244KPreflightStaticCheckItem,
} from './sabiRelease244k.types';

export const sabiRelease244KEmailDnsAuthentication: SabiRelease244KEmailDnsAuthentication = {
  mx: true,
  spf: true,
  dkim: true,
  dmarc: true,
} as const;

export const sabiRelease244KPreflightStaticChecks: readonly SabiRelease244KPreflightStaticCheckItem[] = [
  { name: 'owner_exact_phrase_present_static_check', required: true, liveExecutionAllowed: false, secretRevealAllowed: false },
  { name: 'secret_manager_references_verified_without_reveal_static_check', required: true, liveExecutionAllowed: false, secretRevealAllowed: false },
  { name: 'wallet_payment_payout_still_locked_static_check', required: true, liveExecutionAllowed: false, secretRevealAllowed: false },
  { name: 'cloud_run_domain_https_health_preflight_static_check', required: true, liveExecutionAllowed: false, secretRevealAllowed: false },
  { name: 'sms_provider_phone_auth_preflight_static_check', required: true, liveExecutionAllowed: false, secretRevealAllowed: false },
] as const;

export const sabiRelease244K: SabiRelease244K = {
  version: 'SABI-RELEASE-244K-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-GOOGLE-CLOUD-DEPLOY-FINAL-OWNER-COMMAND-EXACT-PHRASE-FINAL-EXECUTION-PREFLIGHT-GATE-STATIC-CHECK',
  marker: 'SABI_RELEASE_244K_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_GOOGLE_CLOUD_DEPLOY_FINAL_OWNER_COMMAND_EXACT_PHRASE_FINAL_EXECUTION_PREFLIGHT_GATE_STATIC_CHECK_STILL_NO_LIVE_DEPLOY_NO_LIVE_SMS',
  strictPlanMode: true,
  noPivotWithoutOwnerApproval: true,
  maximumAcceleration: true,

  googleCloudDeployFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckOnly: true,
  ownerFinalCommandExactPhraseFinalExecutionPreflightGateStaticCheckReady: true,
  finalExecutionPreflightGateStaticCheckPlanningOnly: true,

  officialWebsiteMustWorkOnServer: true,
  officialDomainEmailMustWork: true,
  smsIsMandatoryForProgram: true,
  smsWithoutItProgramDoesNotWork: true,
  allCriticalLogicMustBeServerSide: true,

  cloudRunCustomDomainMappingFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckRequired: true,
  officialSiteHttpsFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckRequired: true,
  officialSiteHealthCheckFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckRequired: true,
  emailDnsAuthenticationFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckRequired: true,
  emailDnsAuthentication: sabiRelease244KEmailDnsAuthentication,

  firebasePhoneAuthOrApprovedSmsProviderRequired: true,
  phoneNumberSignInMustBeEnabledBeforeLiveUse: true,
  liveSmsStillLockedUntilExactOwnerApproval: true,
  smsServerBoundaryRequired: true,

  serverSabiAiPersonalityTrainingMustFollowPlan: true,
  ownerSabiAiReportOnly: true,
  ownerFinalDecisionRequired: true,
  noSecretRevealToOwnerSabiAi: true,

  bankAccountOpeningUrgent: true,
  walletIntegrationBlockedUntilOfficialSiteEmailAndSmsReady: true,
  walletProviderIntegrationRequiresOwnerExactApproval: true,

  publicCommunicationChannel: 'Sabi Messenger',
  noTelegramMention: true,
  noDonationOrInvestmentRequest: true,
  sabiAllocatedCompanyFundsOnly: true,

  targetSubmissionDate: '2026-07-01',
  targetPublicLaunchDate: '2026-07-15',

  ownerFinalCommandExactPhraseFinalExecutionPreflightGateStaticCheckReferenceOnly: true,
  ownerExactPhraseFinalExecutionPreflightGateStaticCheckValue: 'I approve RELEASE-244K official site email SMS server AI Google Cloud deploy final Owner command exact phrase final execution preflight gate static check planning only',
  liveDeployCommandExactPhraseFinalExecutionPreflightGateStaticCheckReferenceOnly: true,
  liveDeployCommandExactPhraseFinalExecutionPreflightGateStaticCheckReferenceOnlyValue: 'gcloud run deploy sabi-official-site --region <REGION> --source <SERVER_BUILD_CONTEXT>',

  preflightChecksRequiredBeforeAnyLiveExecution: true,
  preflightStaticChecksRequiredBeforeAnyLiveExecution: true,
  preflightStaticCheckMatrix: sabiRelease244KPreflightStaticChecks,
  owner_exact_phrase_present_static_check: true,
  secret_manager_references_verified_without_reveal_static_check: true,
  wallet_payment_payout_still_locked_static_check: true,

  acceptedNow: false,
  executableNow: false,
  noExecutionNow: true,
  finalExecutionPreflightGateDoesNotExecuteDeployNow: true,
  finalExecutionPreflightGateDoesNotAcceptFinalCommandNow: true,
  finalExecutionPreflightGateDoesNotAcceptExactPhraseNow: true,
  finalExecutionPreflightGateRequiresSeparateOwnerExactApprovalBeforeLiveDeploy: true,
  finalExecutionPreflightGateRequiresSeparateStaticCheckBeforeAnyRun: true,
  finalExecutionPreflightGateStaticCheckDoesNotExecuteDeployNow: true,
  finalExecutionPreflightGateStaticCheckDoesNotAcceptFinalCommandNow: true,
  finalExecutionPreflightGateStaticCheckDoesNotAcceptExactPhraseNow: true,
  finalExecutionPreflightGateStaticCheckRequiresSeparateReportBeforeAnyRun: true,

  noOwnerFinalCommandAcceptedNow: true,
  noFinalOwnerCommandExecutionNow: true,
  noExactPhraseAcceptedNow: true,
  noExactPhraseExecutionNow: true,
  noFinalExecutionPreflightGateAcceptedNow: true,
  noFinalExecutionPreflightGateExecutionNow: true,
  noFinalExecutionPreflightGateStaticCheckAcceptedNow: true,
  noFinalExecutionPreflightGateStaticCheckExecutionNow: true,

  nextStep: '244L_official_site_email_sms_server_ai_google_cloud_deploy_final_owner_command_exact_phrase_final_execution_preflight_gate_static_check_report_still_no_live_deploy_no_live_sms',

  officialSiteGoogleCloudDeployFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReadiness: 100,
  officialDomainEmailGoogleCloudFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReadiness: 100,
  smsGoogleCloudServerBoundaryFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReadiness: 100,
  serverSabiAiGoogleCloudPersonalityFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReadiness: 100,
  bankWalletGoogleCloudDependencyFinalOwnerCommandExactPhraseFinalExecutionPreflightGateStaticCheckReadiness: 100,
  previous244JFix1Readiness: 100,
  previous244JRerunReadiness: 100,

  googleCloudDeployExecutedNow: 0,
  ownerFinalCommandAcceptedNow: 0,
  finalOwnerCommandExecutableNow: 0,
  exactPhraseAcceptedNow: 0,
  exactPhraseExecutableNow: 0,
  finalExecutionPreflightGateAcceptedNow: 0,
  finalExecutionPreflightGateExecutableNow: 0,
  finalExecutionPreflightGateStaticCheckAcceptedNow: 0,
  finalExecutionPreflightGateStaticCheckExecutableNow: 0,
  cloudRunServiceCreatedNow: 0,
  liveDomainDnsChangedNow: 0,
  liveEmailDnsChangedNow: 0,
  liveSmsSentNow: 0,
  walletPaymentPayoutNow: 0,
  realProductionLaunchNow: 0,

  noLiveGoogleCloudDeployNow: true,
  noCloudRunServiceCreateNow: true,
  noDomainDnsMutationNow: true,
  noLiveEmailDnsMutationNow: true,
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
} as const;

export default sabiRelease244K;
