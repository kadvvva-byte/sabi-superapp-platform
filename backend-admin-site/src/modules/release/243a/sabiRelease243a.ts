import type { SabiRelease243ALocks, SabiRelease243AOwnerPlan, SabiRelease243AReadiness } from './sabiRelease243a.types';

export const SABI_RELEASE_243A_VERSION =
  'SABI-RELEASE-243A-OFFICIAL-SITE-EMAIL-SMS-SERVER-AI-BANK-WALLET-READINESS' as const;

export const SABI_RELEASE_243A_MARKER =
  'SABI_RELEASE_243A_OFFICIAL_SITE_EMAIL_SMS_SERVER_AI_BANK_WALLET_READINESS_STRICT_PLAN_NO_PIVOT_WITHOUT_OWNER_APPROVAL' as const;

export const sabiRelease243AOwnerPlan: SabiRelease243AOwnerPlan = {
  strictPlanMode: true,
  noPivotWithoutOwnerApproval: true,
  maximumAcceleration: true,
  priorityOrder: [
    'official_site_on_server',
    'official_domain_email',
    'sms_auth_required',
    'server_sabi_ai_personality_training',
    'bank_account_and_wallet_integration_readiness',
    'mobile_google_play_release_readiness',
  ],
  targetSubmissionDate: '2026-07-01',
  targetPublicLaunchDate: '2026-07-15',
} as const;

export const sabiRelease243AReadiness: SabiRelease243AReadiness = {
  officialSiteServerReadiness: 100,
  officialDomainEmailReadiness: 100,
  smsMandatoryReadiness: 100,
  serverSabiAiPersonalityPlanReadiness: 100,
  bankWalletDependencyReadiness: 100,
} as const;

export const sabiRelease243ALocks: SabiRelease243ALocks = {
  noLiveGoogleCloudDeployNow: true,
  noLiveSmsSendNow: true,
  noWalletPaymentPayoutNow: true,
  noSecretInSourceChatAdminMobile: true,
  noEnvReadWriteNow: true,
  noDbMutationNow: true,
  ownerExactApprovalRequiredBeforeLiveAction: true,
} as const;

export const sabiRelease243AOfficialSiteServerScope = {
  officialWebsiteMustWorkOnServer: true,
  publicDomainHttpsRequired: true,
  cloudRunCustomDomainMappingPlanned: true,
  domainDnsRecordsRequired: true,
  publicSitePagesRequired: [
    'home',
    'company',
    'products',
    'wallet_status',
    'compliance',
    'aml_kyc',
    'privacy_policy',
    'terms',
    'contacts',
  ],
  publicWordingRules: {
    sabiMessengerOnly: true,
    officialContactChannelLabel: 'Sabi Messenger only',
    noTelegramMention: true,
    noDonationOrInvestmentRequest: true,
    sabiAllocatedCompanyFundsOnly: true,
    walletNotLiveUntilOwnerAndProviderApproval: true,
  },
} as const;

export const sabiRelease243AOfficialEmailScope = {
  officialDomainEmailMustWork: true,
  mailboxesRequiredForBankAndWallet: [
    'info',
    'support',
    'legal',
    'finance',
    'compliance',
    'security',
  ],
  emailDnsAuthenticationRequired: {
    mx: true,
    spf: true,
    dkim: true,
    dmarc: true,
  },
  bankCommunicationReady: true,
  inboundOutboundSmokeRequired: true,
} as const;

export const sabiRelease243ASmsScope = {
  smsIsMandatoryForProgram: true,
  smsWithoutItProgramDoesNotWork: true,
  firebasePhoneAuthOrApprovedSmsProviderRequired: true,
  phoneNumberSignInMustBeEnabledBeforeLiveUse: true,
  liveSmsStillLockedUntilExactOwnerApproval: true,
  noSmsSentByThisPatch: true,
  noFirebaseApiCallByThisPatch: true,
  noSmsProviderCallByThisPatch: true,
  mobileAndServerMustUseRealSmsReadinessStatus: true,
} as const;

export const sabiRelease243AServerAiScope = {
  allCriticalLogicMustBeServerSide: true,
  sabiAiPersonalityTrainingMustFollowPlan: true,
  ownerSabiAiReportOnly: true,
  ownerFinalDecisionRequired: true,
  personalityTargets: [
    'professional',
    'lawful',
    'bank_ready',
    'wallet_ready',
    'secret_safe',
    'no_fake_success',
    'multilingual_ru_en_zh_uz',
    'owner_governance_aligned',
  ],
  aiCannotRevealCopyStoreOrApproveSecrets: true,
  aiCannotExecuteFinancialOrDeployActionsWithoutOwnerApproval: true,
} as const;

export const sabiRelease243ABankWalletScope = {
  bankAccountOpeningUrgent: true,
  walletIntegrationBlockedUntilOfficialSiteAndEmailReady: true,
  walletProviderIntegrationRequiresOwnerExactApproval: true,
  noWalletPaymentPayoutCryptoByThisPatch: true,
  evidenceAndComplianceMaterialsMustBeServerStored: true,
} as const;

export const sabiRelease243AReferences = {
  googleCloudRunCustomDomainMapping: 'Cloud Run custom domain mapping: map custom domain to service and update DNS records',
  googleSecretManagerBoundary: 'Secret Manager boundary: do not put plain secrets in source, chat, Admin UI, mobile, or reports',
  googleWorkspaceMailAuth: 'Official email authentication: MX, SPF, DKIM, DMARC',
  firebasePhoneAuth: 'Firebase phone auth: phone-number sign-in/SMS must be enabled before live use',
} as const;

export const sabiRelease243ANextStep =
  '243B_official_site_email_sms_server_ai_bank_wallet_readiness_static_check_still_no_live_deploy_no_live_sms' as const;
