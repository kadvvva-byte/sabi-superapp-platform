export type SmsReadinessOwnerExactValuesReferenceIntakeMode239Q =
  'candidate_owner_exact_values_reference_intake_only_no_live_sms';

export type SmsReadinessOwnerExactValuesReferenceIntakeStage239Q = '239Q';

export type SmsReadinessOwnerExactValuesReferenceIntakeStatus239Q =
  | 'missing_locked'
  | 'reference_placeholder_only'
  | 'candidate_value_not_provided';

export type SmsReadinessOwnerExactValuesReferenceIntakeCategory239Q =
  | 'owner_approval_reference'
  | 'firebase_public_config_reference'
  | 'firebase_secret_reference_only'
  | 'sms_provider_reference_only'
  | 'domain_and_app_reference'
  | 'route_runtime_reference'
  | 'admin_runtime_reference'
  | 'audit_reference';

export type SmsReadinessOwnerExactValuesReferenceSensitivity239Q =
  | 'non_secret_value_allowed_later_after_exact_owner_approval'
  | 'secret_reference_only_never_plain_value'
  | 'approval_reference_only'
  | 'runtime_mount_reference_only';

export type SmsReadinessOwnerExactValuesReferenceField239Q =
  | 'ownerApprovalReference'
  | 'ownerCommandTextReference'
  | 'firebaseProjectId'
  | 'firebaseAppId'
  | 'firebaseAuthDomain'
  | 'firebaseApiKeyReference'
  | 'firebaseAdminServiceAccountReference'
  | 'firebaseAdminCredentialSecretManagerReference'
  | 'firebaseMessagingSenderId'
  | 'smsProviderName'
  | 'smsVerifyServiceIdReference'
  | 'smsSenderIdReference'
  | 'smsWebhookSecretReference'
  | 'smsTemplateLocaleReference'
  | 'authorizedDomainReference'
  | 'backendRouteApprovalReference'
  | 'adminRuntimeApprovalReference'
  | 'liveSmsCanaryApprovalReference';

export type SmsReadinessOwnerExactValuesReferenceIntakeItem239Q = Readonly<{
  readonly field: SmsReadinessOwnerExactValuesReferenceField239Q;
  readonly label: string;
  readonly category: SmsReadinessOwnerExactValuesReferenceIntakeCategory239Q;
  readonly sensitivity: SmsReadinessOwnerExactValuesReferenceSensitivity239Q;
  readonly placeholder: string;
  readonly status: SmsReadinessOwnerExactValuesReferenceIntakeStatus239Q;
  readonly actualValueProvided: false;
  readonly containsSecret: false;
  readonly shouldBeStoredInEnv: false;
  readonly shouldBeStoredInDb: false;
  readonly shouldBeStoredInChat: false;
  readonly validationOnly: true;
  readonly ownerFinalApprovalRequired: true;
  readonly sabiAiCanApproveLiveAction: false;
  readonly adminCanApproveLiveAction: false;
  readonly firebaseApiCallEnabledNow: false;
  readonly smsProviderCallEnabledNow: false;
  readonly liveSmsEnabledNow: false;
  readonly routeRuntimeMountEnabledNow: false;
  readonly adminRuntimeMountEnabledNow: false;
}>;

export type SmsReadinessOwnerExactValuesReferenceIntakeStatusPackage239Q = Readonly<{
  readonly stage: SmsReadinessOwnerExactValuesReferenceIntakeStage239Q;
  readonly mode: SmsReadinessOwnerExactValuesReferenceIntakeMode239Q;
  readonly lastConfirmedStage: '239P';
  readonly selectedProviderForValidation: 'Firebase Phone Auth';
  readonly providerSelectedForValidationOnly: true;
  readonly ownerFinalAuthority: true;
  readonly ownerSabiAiReportOnly: true;
  readonly useSabiMessengerOnly: true;
  readonly noExternalMessengerAlias: true;
  readonly noDonationsOrInvestments: true;
  readonly selfFundedProgramsOnly: true;
  readonly firebaseExactValuesProvided: false;
  readonly firebaseSecretValuesProvided: false;
  readonly smsProviderExactValuesProvided: false;
  readonly realFirebaseProviderConnected: false;
  readonly realSmsProviderConnected: false;
  readonly realSmsSent: false;
  readonly realRouteRuntimeMounted: false;
  readonly realAdminRuntimeMounted: false;
  readonly realGoogleCloudDeploy: false;
  readonly productionPublicLaunch: false;
  readonly items: readonly SmsReadinessOwnerExactValuesReferenceIntakeItem239Q[];
}>;

export type SmsReadinessOwnerExactValuesReferenceSafetyLocks239Q = Readonly<{
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
  readonly noPlainSecretInChat: true;
  readonly noSecretValueInSource: true;
  readonly ownerFinalApprovalRequiredBeforeLiveAction: true;
}>;
