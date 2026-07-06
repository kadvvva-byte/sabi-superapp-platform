import type { SabiRelease243GApprovalReport } from './sabiRelease243g.types';

export const SABI_RELEASE_243G_VERSION = 'SABI-RELEASE-243G-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-GOOGLE-CLOUD-DEPLOY-EXACT-OWNER-APPROVAL-GATE-REPORT' as const;

export const SABI_RELEASE_243G_MARKER = 'SABI_RELEASE_243G_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_GOOGLE_CLOUD_DEPLOY_EXACT_OWNER_APPROVAL_GATE_REPORT_STILL_NO_LIVE_DEPLOY_NO_LIVE_SMS' as const;

export const sabiRelease243GApprovalPhraseReferenceOnly =
  'I approve RELEASE-243G official site email SMS server AI Google Cloud deploy exact Owner approval gate report planning only' as const;

export const sabiRelease243GLiveDeployCommandReferenceOnly =
  'gcloud run deploy sabi-official-site --region <REGION> --source <SERVER_BUILD_CONTEXT>' as const;

export const sabiRelease243GReport: SabiRelease243GApprovalReport = {
  version: SABI_RELEASE_243G_VERSION,
  marker: SABI_RELEASE_243G_MARKER,
  strictPlanMode: true,
  noPivotWithoutOwnerApproval: true,
  maximumAcceleration: true,
  googleCloudDeployExactOwnerApprovalGateReportOnly: true,
  ownerExactApprovalGateReportReady: true,
  officialWebsiteMustWorkOnServer: true,
  officialDomainEmailMustWork: true,
  smsIsMandatoryForProgram: true,
  smsWithoutItProgramDoesNotWork: true,
  allCriticalLogicMustBeServerSide: true,
  readiness: {
    officialSiteGoogleCloudDeployApprovalGateReportReadiness: 100,
    officialDomainEmailGoogleCloudApprovalGateReportReadiness: 100,
    smsGoogleCloudServerBoundaryApprovalGateReportReadiness: 100,
    serverSabiAiGoogleCloudPersonalityApprovalGateReportReadiness: 100,
    bankWalletGoogleCloudDependencyApprovalGateReportReadiness: 100,
    previous243FReadiness: 100,
    googleCloudDeployExecutedNow: 0,
    cloudRunServiceCreatedNow: 0,
    liveDomainDnsChangedNow: 0,
    liveEmailDnsChangedNow: 0,
    liveSmsSentNow: 0,
    walletPaymentPayoutNow: 0,
    realProductionLaunchNow: 0,
  },
  safety: {
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
  },
  nextStep: '243H_official_site_email_sms_server_ai_google_cloud_deploy_exact_owner_approval_gate_report_static_check_still_no_live_deploy_no_live_sms',
} as const;

export const sabiRelease243GOfficialRequirements = {
  cloudRunCustomDomainMappingOwnerApprovalReportRequired: true,
  officialSiteHttpsOwnerApprovalReportRequired: true,
  officialSiteHealthCheckOwnerApprovalReportRequired: true,
  emailDnsAuthenticationOwnerApprovalReportRequired: {
    mx: true,
    spf: true,
    dkim: true,
    dmarc: true,
  },
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
  ownerApprovalPhraseReferenceOnly: sabiRelease243GApprovalPhraseReferenceOnly,
  liveDeployCommandReferenceOnly: sabiRelease243GLiveDeployCommandReferenceOnly,
  acceptedNow: false,
  executableNow: false,
  noExecutionNow: true,
} as const;

export const getSabiRelease243GReport = (): SabiRelease243GApprovalReport => sabiRelease243GReport;
