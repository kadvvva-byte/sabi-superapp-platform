export type SmsReadinessMaskedAdminReadinessStatusContractMode239W =
  'masked_admin_readiness_status_contract_only_no_live_sms';

export type SmsReadinessMaskedAdminReadinessStatusStage239W = '239W';

export type SmsReadinessMaskedAdminReadinessStatusDecision239W =
  | 'masked_status_contract_ready'
  | 'masked_only_no_secret_view'
  | 'admin_runtime_dependency_locked'
  | 'live_action_dependency_locked'
  | 'policy_boundary_confirmed';

export type SmsReadinessMaskedAdminReadinessStatusCategory239W =
  | 'owner_status_summary'
  | 'firebase_public_config_masked_status'
  | 'firebase_secret_masked_status'
  | 'sms_provider_public_masked_status'
  | 'sms_provider_secret_masked_status'
  | 'domain_allowlist_masked_status'
  | 'localization_template_masked_status'
  | 'backend_route_masked_status'
  | 'admin_runtime_masked_status'
  | 'live_sms_masked_status'
  | 'secret_access_control_masked_status'
  | 'audit_masked_status'
  | 'sabi_messenger_policy_boundary'
  | 'public_funding_policy_boundary';

export type SmsReadinessMaskedAdminReadinessStatusField239W =
  | 'ownerStatusSummaryReference'
  | 'firebaseProjectIdMaskedStatus'
  | 'firebaseAppIdMaskedStatus'
  | 'firebaseAuthDomainMaskedStatus'
  | 'firebaseMessagingSenderIdMaskedStatus'
  | 'firebaseApiKeyMaskedStatusOnly'
  | 'firebaseAdminCredentialMaskedStatusOnly'
  | 'secretManagerPathMaskedStatusOnly'
  | 'smsProviderNameMaskedStatus'
  | 'smsVerifyServiceMaskedStatusOnly'
  | 'smsSenderIdMaskedStatusOnly'
  | 'smsWebhookSecretMaskedStatusOnly'
  | 'smsTemplateLocaleMaskedStatus'
  | 'authorizedDomainMaskedStatus'
  | 'publicSiteDomainMaskedStatus'
  | 'backendRouteRuntimeMaskedStatus'
  | 'adminRuntimeMaskedStatus'
  | 'liveSmsCanaryMaskedStatus'
  | 'secretAccessControlMaskedStatus'
  | 'sabiMessengerPolicyMaskedStatus'
  | 'selfFundedProgramsPolicyMaskedStatus'
  | 'auditMaskedStatusReportReference';

export type SmsReadinessMaskedAdminReadinessDisplayState239W =
  | 'visible_masked_status_only'
  | 'visible_missing_value_status_only'
  | 'visible_locked_status_only'
  | 'visible_policy_confirmed_status_only'
  | 'hidden_secret_value_never_rendered';

export type SmsReadinessMaskedAdminReadinessStatusItem239W = Readonly<{
  readonly field: SmsReadinessMaskedAdminReadinessStatusField239W;
  readonly label: string;
  readonly category: SmsReadinessMaskedAdminReadinessStatusCategory239W;
  readonly placeholder: string;
  readonly adminDisplayState: SmsReadinessMaskedAdminReadinessDisplayState239W;
  readonly maskedAdminText: string;
  readonly decision: SmsReadinessMaskedAdminReadinessStatusDecision239W;
  readonly maskedAdminStatusContractReady: true;
  readonly maskedAdminStatusContractOnly: true;
  readonly statusOnlyNoMutation: true;
  readonly ownerFinalApprovalRequired: true;
  readonly ownerSabiAiReportOnly: true;
  readonly adminCanViewPlainSecret: false;
  readonly adminCanCopySecret: false;
  readonly adminCanExportSecret: false;
  readonly adminCanEditLiveState: false;
  readonly adminCanTriggerLiveSms: false;
  readonly adminCanMountRuntime: false;
  readonly developerCanViewPlainSecret: false;
  readonly sabiAiCanRevealSecret: false;
  readonly runtimeCanReadSecretNow: false;
  readonly secretManagerReadEnabledNow: false;
  readonly secretManagerWriteEnabledNow: false;
  readonly envReadEnabledNow: false;
  readonly envWriteEnabledNow: false;
  readonly firebaseApiCallEnabledNow: false;
  readonly smsProviderCallEnabledNow: false;
  readonly liveSmsEnabledNow: false;
  readonly backendRouteRuntimeMountEnabledNow: false;
  readonly adminRuntimeMountEnabledNow: false;
  readonly realAdminUiChangeEnabledNow: false;
  readonly googleCloudDeployEnabledNow: false;
}>;

export type SmsReadinessMaskedAdminReadinessPanelRule239W = Readonly<{
  readonly surface: 'Admin SMS readiness panel';
  readonly visibility: 'masked_status_only';
  readonly canDisplayPlainSecretNow: false;
  readonly canDisplayProviderResponseNow: false;
  readonly canDisplayLiveTokenNow: false;
  readonly canCopyMaskedStatusNow: true;
  readonly canCopyPlainSecretNow: false;
  readonly canExportSecretNow: false;
  readonly canMutateRuntimeNow: false;
  readonly canSendLiveSmsNow: false;
  readonly notes: string;
}>;

export type SmsReadinessMaskedAdminReadinessStatusContract239W = Readonly<{
  readonly stage: SmsReadinessMaskedAdminReadinessStatusStage239W;
  readonly mode: SmsReadinessMaskedAdminReadinessStatusContractMode239W;
  readonly marker: 'smsReadinessMaskedAdminReadinessStatusContract239W';
  readonly lastConfirmedStage: '239V';
  readonly lastConfirmedStageMarker: '239V_secret_reference_access_control_matrix_contract_only_passed_199_of_199';
  readonly selectedProviderForValidation: 'Firebase Phone Auth';
  readonly providerSelectedForValidationOnly: true;
  readonly ownerFinalAuthority: true;
  readonly ownerSabiAiReportOnly: true;
  readonly ownerCommunicationChannel: 'Sabi Messenger';
  readonly useSabiMessengerOnly: true;
  readonly noExternalMessengerAlias: true;
  readonly noDonationsOrInvestments: true;
  readonly selfFundedProgramsOnly: true;
  readonly maskedAdminStatusContractReady: true;
  readonly maskedAdminReadinessStatusOnly: true;
  readonly realAdminUiChangedNow: false;
  readonly adminRuntimeMountedNow: false;
  readonly adminStatusMutationEnabledNow: false;
  readonly adminSecretRevealEnabledNow: false;
  readonly ownerSecretAccessApprovalProvidedNow: false;
  readonly secretAccessGrantedNow: false;
  readonly secretReferenceAcceptedNow: false;
  readonly secretManagerAccessEnabledNow: false;
  readonly breakGlassAccessEnabledNow: false;
  readonly secretManagerReadEnabledNow: false;
  readonly secretManagerWriteEnabledNow: false;
  readonly envReadEnabledNow: false;
  readonly envWriteEnabledNow: false;
  readonly firebaseExactValuesProvided: false;
  readonly firebaseSecretValuesProvided: false;
  readonly smsProviderExactValuesProvided: false;
  readonly realFirebaseProviderConnected: false;
  readonly realSmsProviderConnected: false;
  readonly realSmsSent: false;
  readonly realRouteRuntimeMounted: false;
  readonly realAdminRuntimeMounted: false;
  readonly realAdminUiChanged: false;
  readonly realGoogleCloudDeploy: false;
  readonly productionPublicLaunch: false;
  readonly statusItems: readonly SmsReadinessMaskedAdminReadinessStatusItem239W[];
  readonly panelRule: SmsReadinessMaskedAdminReadinessPanelRule239W;
}>;

export type SmsReadinessMaskedAdminReadinessStatusSafetyLocks239W = Readonly<{
  readonly noLiveSms: true;
  readonly noFirebaseApiCall: true;
  readonly noSmsProviderCall: true;
  readonly noSmsSent: true;
  readonly noEnvOrSecrets: true;
  readonly noEnvRead: true;
  readonly noEnvWrite: true;
  readonly noSecretManagerRead: true;
  readonly noSecretManagerWrite: true;
  readonly noSecretManagerAccessGrant: true;
  readonly noSecretValueInSource: true;
  readonly noPlainSecretInChat: true;
  readonly noPlainSecretInAdminUi: true;
  readonly noSecretRevealToAdmin: true;
  readonly noSecretRevealToDeveloper: true;
  readonly noSecretRevealToOwnerSabiAi: true;
  readonly noBreakGlassAccess: true;
  readonly noDbSessionTokenWrites: true;
  readonly noAdminUiRuntimeMount: true;
  readonly noBackendRouteRuntimeMount: true;
  readonly noRealAdminUiChange: true;
  readonly noAdminStatusMutation: true;
  readonly noGoogleCloudDeploy: true;
  readonly noWalletPaymentPayoutCrypto: true;
  readonly maskedAdminStatusContractOnly: true;
  readonly ownerFinalApprovalRequiredBeforeLiveAction: true;
}>;
