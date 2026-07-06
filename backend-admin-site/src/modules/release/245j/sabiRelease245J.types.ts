export type SabiRelease245JStatus = 'passed';

export interface SabiRelease245JCommandBoundary {
  readonly acceptedNow: false;
  readonly executableNow: false;
  readonly noExecutionNow: true;
  readonly [key: string]: string | number | boolean | readonly string[] | undefined;
}

export interface SabiRelease245JReadiness {
  readonly release245JReadiness: 100;
  readonly previous245IReadiness: 100;
  readonly release245DFix1TypeClean: 100;
  readonly googleCloudDeployExecutedNow: 0;
  readonly ownerFinalCommandAcceptedNow: 0;
  readonly finalOwnerCommandExecutableNow: 0;
  readonly exactPhraseAcceptedNow: 0;
  readonly exactPhraseExecutableNow: 0;
  readonly liveSmsSentNow: 0;
  readonly walletPaymentPayoutNow: 0;
  readonly realProductionLaunchNow: 0;
  readonly [key: string]: number;
}

export interface SabiRelease245JSafety {
  readonly noLiveGoogleCloudDeployNow: true;
  readonly noCloudRunServiceCreateNow: true;
  readonly noDomainDnsMutationNow: true;
  readonly noLiveEmailDnsMutationNow: true;
  readonly noLiveSmsSendNow: true;
  readonly noFirebaseApiCallNow: true;
  readonly noSmsProviderCallNow: true;
  readonly noWalletPaymentPayoutNow: true;
  readonly noSecretInSourceChatAdminMobile: true;
  readonly noPlainSecretInReport: true;
  readonly noEnvReadWriteNow: true;
  readonly noSecretManagerReadWriteNow: true;
  readonly noDbMutationNow: true;
  readonly noRuntimeMountNow: true;
  readonly noPublicLaunchClaimNow: true;
  readonly ownerExactApprovalRequiredBeforeLiveAction: true;
  readonly [key: string]: boolean;
}

export interface SabiRelease245JReport {
  readonly version: string;
  readonly marker: string;
  readonly status: SabiRelease245JStatus;
  readonly approvalFlagRequired: string;
  readonly scope: string;
  readonly createdAt: string;
  readonly reviewMatrix: readonly string[];
  readonly commandBoundary: SabiRelease245JCommandBoundary;
  readonly readiness: SabiRelease245JReadiness;
  readonly safety: SabiRelease245JSafety;
  readonly nextStep: string;
  readonly [key: string]: unknown;
}
