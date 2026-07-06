import type { StreamFoundationMonetizationFinalReadinessSnapshot } from "../monetization";

export const STREAM_FOUNDATION_SERVER_INSTALL_READINESS_STAGE = "STREAM_FOUNDATION_SERVER_INSTALL_READINESS_137A" as const;

export type StreamFoundationServerInstallCheckStatus =
  | "ready_for_staging_install"
  | "blocked_until_owner_approval"
  | "blocked_until_real_provider_config"
  | "blocked_until_database_repository_binding"
  | "locked_safety_rule";

export type StreamFoundationServerInstallArea =
  | "source_package"
  | "module_boundary"
  | "route_mount"
  | "auth_rate_limit_audit"
  | "database_repository_binding"
  | "provider_secret_storage"
  | "wallet_ledger_binding"
  | "gift_execution"
  | "monthly_payout"
  | "admin_config"
  | "mobile_contract"
  | "rollback";

export type StreamFoundationServerInstallCheck = Readonly<{
  area: StreamFoundationServerInstallArea;
  status: StreamFoundationServerInstallCheckStatus;
  title: string;
  rule: string;
  requiredBeforeServerInstall: readonly string[];
  requiredBeforeLiveMoneyMovement: readonly string[];
}>;

export type StreamFoundationServerInstallPlanStep = Readonly<{
  order: number;
  stage: "pre_install" | "source_copy" | "typecheck" | "route_mount_later" | "post_install_smoke" | "rollback";
  title: string;
  action: string;
  allowedNowInStaging: boolean;
  allowedOnServerWithoutOwnerApproval: boolean;
  blocksMoneyMovement: boolean;
}>;

export type StreamFoundationServerInstallReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_INSTALL_READINESS_STAGE;
  status:
    | "staging_package_ready_for_manual_server_review"
    | "blocked_until_owner_provider_database_wallet_approval";
  dependsOn: readonly string[];
  checks: readonly StreamFoundationServerInstallCheck[];
  installPlan: readonly StreamFoundationServerInstallPlanStep[];
  readyForManualServerReview: boolean;
  readyForAutomaticServerInstallNow: false;
  readyForRouteMountNow: false;
  readyForLiveMoneyMovementNow: false;
  coverage: Readonly<{
    sourcePackageReady: boolean;
    streamBoundaryLocked: boolean;
    monetizationFoundationIncluded: boolean;
    giftExecutionGateIncluded: boolean;
    monthlyPayoutGateIncluded: boolean;
    adminServerOnlyConfigIncluded: boolean;
    rollbackPlanIncluded: boolean;
    coveragePercentForServerInstallPlanning: 100;
  }>;
  monetization: Readonly<{
    finalReadiness: StreamFoundationMonetizationFinalReadinessSnapshot;
    acceptPaymentProviderSeparate: true;
    payoutProviderSeparate: true;
    walletLedgerRequired: true;
    recipientEarningsPendingFirst: true;
    monthlyPayoutOnly: true;
  }>;
  safety: Readonly<{
    localStagingOnly: true;
    touchesMobileProject: false;
    touchesMessengerRuntime: false;
    touchesWalletRuntime: false;
    touchesAdminUiRuntime: false;
    routeMountAllowedNow: false;
    appServerEntryTouched: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    moneyMovementAllowedNow: false;
    walletLedgerMutationAllowedNow: false;
    rawSecretsReturned: false;
    mobileProviderKeysAllowed: false;
    fakePaymentSuccessAllowed: false;
    fakeGiftSuccessAllowed: false;
    fakeEarningCreditAllowed: false;
    fakePayoutSuccessAllowed: false;
  }>;
}>;
