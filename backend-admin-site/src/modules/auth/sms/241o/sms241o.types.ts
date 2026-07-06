export type Sms241OReadinessPercent = 0 | 100;

export interface Sms241OSafetyLocks {
  noLiveSms: boolean;
  noFirebaseApiCall: boolean;
  noSmsProviderCall: boolean;
  noSmsSent: boolean;
  noEnvOrSecrets: boolean;
  noEnvRead: boolean;
  noEnvWrite: boolean;
  noSecretManagerRead: boolean;
  noSecretManagerWrite: boolean;
  noSecretManagerAccessGrant: boolean;
  noSecretValueInSource: boolean;
  noPlainSecretInChat: boolean;
  noPlainSecretInAdminUi: boolean;
  noSecretRevealToAdmin: boolean;
  noSecretRevealToDeveloper: boolean;
  noSecretRevealToOwnerSabiAi: boolean;
  noBreakGlassAccess: boolean;
  noDbSessionTokenWrites: boolean;
  noAdminUiRuntimeMount: boolean;
  noBackendRouteRuntimeMount: boolean;
  noRealAdminUiChange: boolean;
  noAdminStatusMutation: boolean;
  noAdminBuildExecution: boolean;
  noOwnerBuildSmokeApprovalAccepted: boolean;
  noExactOwnerCommandAccepted: boolean;
  noGoogleCloudDeploy: boolean;
  noWalletPaymentPayoutCrypto: boolean;
  ownerFinalApprovalRequiredBeforeLiveAction: boolean;
}

export interface Sms241OReadiness {
  sms241OAdminUiMaskedReadinessBuildSmokeExactOwnerBuildExecutionFinalCommandReadyStaticCheckReady: Sms241OReadinessPercent;
  sms241NAdminUiMaskedReadinessBuildSmokeExactOwnerBuildExecutionFinalCommandReady: Sms241OReadinessPercent;
  sms241MAdminUiMaskedReadinessBuildSmokeExactOwnerBuildExecutionGateStaticCheckReportReady: Sms241OReadinessPercent;
  sms241LAdminUiMaskedReadinessBuildSmokeExactOwnerBuildExecutionGateStaticCheckReady: Sms241OReadinessPercent;
  sms241KAdminUiMaskedReadinessBuildSmokeExactOwnerBuildExecutionGateReady: Sms241OReadinessPercent;
  exactOwnerBuildSmokeCommandProvidedNow: Sms241OReadinessPercent;
  exactOwnerBuildSmokeCommandAcceptedNow: Sms241OReadinessPercent;
  ownerBuildSmokeApprovalProvidedNow: Sms241OReadinessPercent;
  ownerBuildSmokeApprovalAcceptedNow: Sms241OReadinessPercent;
  adminBuildExecutedNow: Sms241OReadinessPercent;
  adminBuildExecutionEnabledNow: Sms241OReadinessPercent;
  realAdminUiChangedNow: Sms241OReadinessPercent;
  realSmsSent: Sms241OReadinessPercent;
  productionPublicLaunch: Sms241OReadinessPercent;
}

export interface Sms241OFinalCommandReadyStaticCheck {
  version: string;
  marker: string;
  windowsExpandArchiveSafePath: boolean;
  shortPathReady: boolean;
  finalCommandReadyStaticCheckOnly: boolean;
  finalCommandReadyStaticCheckReady: boolean;
  ownerExactBuildExecutionFinalCommandReadyStaticCheckReady: boolean;
  buildExecutionFinalCommandReadyStaticCheckReady: boolean;
  buildExecutionStillNotExecuted: boolean;
  buildExecutionGateOpenNow: boolean;
  acceptedNow: boolean;
  executableNow: boolean;
  noExecutionNow: boolean;
  ownerFinalApprovalRequired: boolean;
  ownerSabiAiReportOnly: boolean;
  maskedAdminStatusOnly: boolean;
  exactOwnerCommandProvidedNow: boolean;
  exactOwnerCommandAcceptedNow: boolean;
  ownerBuildSmokeApprovalProvidedNow: boolean;
  ownerBuildSmokeApprovalAcceptedNow: boolean;
  canAcceptOwnerCommandNow: boolean;
  canRunAdminBuildNow: boolean;
  canApproveAdminBuildExecutionNow: boolean;
  canDisplayPlainSecretNow: boolean;
  canDisplayProviderResponseNow: boolean;
  canDisplayLiveTokenNow: boolean;
  canCopyPlainSecretNow: boolean;
  canExportSecretNow: boolean;
  canMutateRuntimeNow: boolean;
  canSendLiveSmsNow: boolean;
  exactOwnerApprovalText: string;
  plannedAdminBuildCommandReferenceOnly: string;
  purpose: string;
  readiness: Sms241OReadiness;
  safety: Sms241OSafetyLocks;
  publicCommunicationRule: string;
  fundingRule: string;
  nextStep: string;
}
