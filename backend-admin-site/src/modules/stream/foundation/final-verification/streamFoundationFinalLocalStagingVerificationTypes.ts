import type { StreamFoundationInstallBundleReadinessSnapshot } from "../install-bundle";

export const STREAM_FOUNDATION_FINAL_LOCAL_STAGING_VERIFICATION_STAGE =
  "BACKEND_STREAM_FOUNDATION_137M_FINAL_LOCAL_STAGING_VERIFICATION" as const;

export type StreamFoundationFinalLocalStagingVerificationStatus =
  | "final_local_staging_verified_safe_blocked"
  | "final_local_staging_review_required"
  | "final_local_staging_blocked";

export type StreamFoundationFinalLocalStagingVerificationCheckStatus =
  | "passed"
  | "review_required"
  | "blocked";

export type StreamFoundationFinalLocalStagingVerificationArea =
  | "package_scope"
  | "typescript_surface"
  | "install_bundle"
  | "security_pipeline"
  | "protected_routes"
  | "monetization_payment_wallet"
  | "monthly_payout"
  | "server_mount_boundary"
  | "database_provider_boundary"
  | "wallet_messenger_boundary"
  | "secret_boundary"
  | "final_handoff";

export type StreamFoundationFinalLocalStagingVerificationCheck = Readonly<{
  area: StreamFoundationFinalLocalStagingVerificationArea;
  status: StreamFoundationFinalLocalStagingVerificationCheckStatus;
  title: string;
  rule: string;
  evidence: readonly string[];
  blocksServerCopyNow: boolean;
  blocksRouteMountNow: boolean;
  blocksLiveMoneyNow: boolean;
  nextRequiredAction: readonly string[];
}>;

export type StreamFoundationFinalLocalStagingVerificationSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  changesAppServerFiles: false;
  mountsRoutesNow: false;
  createsExpressRouterInstanceNow: false;
  executesRuntimeNow: false;
  readsDatabaseNow: false;
  writesDatabaseNow: false;
  mutatesPrismaSchemaNow: false;
  runsMigrationNow: false;
  callsProviderNow: false;
  publishesRealtimeNow: false;
  writesMediaStorageNow: false;
  mutatesWalletNow: false;
  mutatesMessengerNow: false;
  movesMoneyNow: false;
  returnsRawSecrets: false;
  exposesMobileProviderKeys: false;
  allowsFakePaymentSuccess: false;
  allowsFakeGiftSuccess: false;
  allowsFakeEarningCredit: false;
  allowsFakePayoutSuccess: false;
  allowsFakeSuccess: false;
}>;

export type StreamFoundationFinalLocalStagingVerificationSummary = Readonly<{
  totalChecks: number;
  passedChecks: number;
  reviewRequiredChecks: number;
  blockedChecks: number;
  coveragePercent: number;
  streamFoundationPackagePresent: boolean;
  monetizationPackagePresent: boolean;
  protectedRoutesPresent: boolean;
  allRoutesRemainUnmounted: boolean;
  appServerUntouched: boolean;
  databaseProviderWalletRemainUnmutated: boolean;
  noRawSecretsReturned: boolean;
  noMobileProviderKeys: boolean;
  noFakeMoneySuccess: boolean;
  readyForServerCopyReview: boolean;
  readyForRouteMountNow: false;
  readyForLiveMoneyNow: false;
}>;

export type StreamFoundationFinalLocalStagingVerificationSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_FINAL_LOCAL_STAGING_VERIFICATION_STAGE;
  status: StreamFoundationFinalLocalStagingVerificationStatus;
  dependsOn: readonly string[];
  installBundle: StreamFoundationInstallBundleReadinessSnapshot;
  checks: readonly StreamFoundationFinalLocalStagingVerificationCheck[];
  summary: StreamFoundationFinalLocalStagingVerificationSummary;
  safety: StreamFoundationFinalLocalStagingVerificationSafety;
  finalRules: Readonly<{
    serverCopyOnlyAfterOwnerApproval: true;
    routeMountRequiresSeparateApproval: true;
    databaseSchemaRequiresSeparateStage: true;
    providerLiveTestRequiresSeparateStage: true;
    walletLedgerAdapterRequiresSeparateStage: true;
    giftSuccessRequiresRealPaymentAuthorization: true;
    recipientEarningStartsAsPending: true;
    payoutIsMonthlyOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
