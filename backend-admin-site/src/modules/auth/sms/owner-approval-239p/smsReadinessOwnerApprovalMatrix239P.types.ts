export type SmsReadinessOwnerApprovalMatrixMode239P = 'owner_approval_matrix_only_no_live_sms';

export type SmsReadinessOwnerApprovalStatus239P =
  | 'locked_not_requested'
  | 'waiting_owner_exact_approval';

export type SmsReadinessOwnerApprovalAction239P =
  | 'firebase_exact_values_intake'
  | 'firebase_admin_backend_contract_enablement'
  | 'sms_provider_exact_values_intake'
  | 'secret_manager_storage_approval'
  | 'backend_route_runtime_mount_approval'
  | 'admin_runtime_mount_approval'
  | 'live_sms_canary_approval'
  | 'google_cloud_deploy_approval'
  | 'production_public_launch_approval';

export type SmsReadinessOwnerApprovalMatrixRow239P = Readonly<{
  readonly action: SmsReadinessOwnerApprovalAction239P;
  readonly title: string;
  readonly status: SmsReadinessOwnerApprovalStatus239P;
  readonly ownerFinalApprovalRequired: true;
  readonly delegatedApprovalAllowed: false;
  readonly sabiAiCanApprove: false;
  readonly sabiAiRole: 'report_only';
  readonly adminCanApproveLiveAction: false;
  readonly exactOwnerCommandRequired: true;
  readonly liveSmsEnabledNow: false;
  readonly firebaseApiCallEnabledNow: false;
  readonly smsProviderCallEnabledNow: false;
  readonly routeRuntimeMountEnabledNow: false;
  readonly adminRuntimeMountEnabledNow: false;
  readonly googleCloudDeployEnabledNow: false;
  readonly productionLaunchEnabledNow: false;
  readonly auditRequiredBeforeNextStep: true;
}>;

export type SmsReadinessOwnerApprovalMatrixStatus239P = Readonly<{
  readonly stage: '239P';
  readonly mode: SmsReadinessOwnerApprovalMatrixMode239P;
  readonly lastConfirmedStage: '239O';
  readonly firebaseExactValuesProvided: false;
  readonly realFirebaseProviderConnected: false;
  readonly realSmsProviderConnected: false;
  readonly realSmsSent: false;
  readonly realRouteRuntimeMounted: false;
  readonly realAdminRuntimeMounted: false;
  readonly realGoogleCloudDeploy: false;
  readonly productionPublicLaunch: false;
  readonly liveAuthEnabledNow: false;
  readonly ownerFinalAuthority: true;
  readonly ownerSabiAiReportOnly: true;
  readonly useSabiMessengerOnly: true;
  readonly noExternalMessengerAlias: true;
  readonly noDonationsOrInvestments: true;
  readonly selfFundedProgramsOnly: true;
  readonly rows: readonly SmsReadinessOwnerApprovalMatrixRow239P[];
}>;

export type SmsReadinessOwnerApprovalSafetyLocks239P = Readonly<{
  readonly noLiveSms: true;
  readonly noFirebaseApiCall: true;
  readonly noSmsProviderCall: true;
  readonly noSmsSent: true;
  readonly noEnvOrSecrets: true;
  readonly noDbSessionTokenWrites: true;
  readonly noAdminUiRuntimeMount: true;
  readonly noBackendRouteRuntimeMount: true;
  readonly noGoogleCloudDeploy: true;
  readonly noWalletPaymentPayoutCrypto: true;
  readonly ownerFinalApprovalRequiredBeforeLiveAction: true;
}>;
