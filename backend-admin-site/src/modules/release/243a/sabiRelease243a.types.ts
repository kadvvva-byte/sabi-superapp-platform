export type SabiRelease243AReadiness = Readonly<{
  officialSiteServerReadiness: 100;
  officialDomainEmailReadiness: 100;
  smsMandatoryReadiness: 100;
  serverSabiAiPersonalityPlanReadiness: 100;
  bankWalletDependencyReadiness: 100;
}>;

export type SabiRelease243ALocks = Readonly<{
  noLiveGoogleCloudDeployNow: true;
  noLiveSmsSendNow: true;
  noWalletPaymentPayoutNow: true;
  noSecretInSourceChatAdminMobile: true;
  noEnvReadWriteNow: true;
  noDbMutationNow: true;
  ownerExactApprovalRequiredBeforeLiveAction: true;
}>;

export type SabiRelease243AOwnerPlan = Readonly<{
  strictPlanMode: true;
  noPivotWithoutOwnerApproval: true;
  maximumAcceleration: true;
  priorityOrder: readonly [
    'official_site_on_server',
    'official_domain_email',
    'sms_auth_required',
    'server_sabi_ai_personality_training',
    'bank_account_and_wallet_integration_readiness',
    'mobile_google_play_release_readiness'
  ];
  targetSubmissionDate: '2026-07-01';
  targetPublicLaunchDate: '2026-07-15';
}>;
