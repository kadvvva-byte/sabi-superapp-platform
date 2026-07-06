import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./core";
import { getStreamFoundationServerInstallReadinessSnapshot } from "./deployment";

export const STREAM_137A_BACKEND_FOUNDATION_SERVER_INSTALL_READINESS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-137A" as const;

export type Stream137ABackendFoundationServerInstallReadinessStagingManifest = Readonly<{
  version: typeof STREAM_137A_BACKEND_FOUNDATION_SERVER_INSTALL_READINESS_STAGING_VERSION;
  scope: "local_staging_patch_only";
  purpose: "stream_backend_foundation_server_install_readiness_without_runtime_mount";
  files: readonly string[];
  readiness: ReturnType<typeof getStreamFoundationServerInstallReadinessSnapshot>;
  installRules: Readonly<{
    copyToServerOnlyAfterOwnerApproval: true;
    routeMountSeparateStage: true;
    appServerEntryTouchedNow: false;
    databaseBindingSeparateStage: true;
    providerBindingSeparateStage: true;
    walletLedgerBindingSeparateStage: true;
    moneyMovementBlockedUntilAllGates: true;
  }>;
  monetizationRules: Readonly<{
    acceptPaymentProviderSeparate: true;
    payoutProviderSeparate: true;
    providerSecretsServerSideOnly: true;
    recipientEarningsPendingFirst: true;
    creatorPayoutMonthlyOnly: true;
    fakePaymentGiftEarningPayoutBlocked: true;
  }>;
  safety: Readonly<{
    localStagingOnly: true;
    routeMountAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    walletLedgerMutationAllowedNow: false;
    moneyMovementAllowedNow: false;
    messengerRuntimeMutationAllowedNow: false;
    walletRuntimeMutationAllowedNow: false;
    mobileProjectMutationAllowedNow: false;
    adminUiRuntimeMutationAllowedNow: false;
    rawSecretsReturned: false;
    fakeSuccessAllowed: false;
  }>;
  nextStage: "BACKEND_STREAM_FOUNDATION_137B_AUTH_RATE_LIMIT_AUDIT_FUNCTIONAL_GUARDS_STAGING";
}>;

export function getStream137ABackendFoundationServerInstallReadinessStagingManifest(): Stream137ABackendFoundationServerInstallReadinessStagingManifest {
  return {
    version: STREAM_137A_BACKEND_FOUNDATION_SERVER_INSTALL_READINESS_STAGING_VERSION,
    scope: "local_staging_patch_only",
    purpose: "stream_backend_foundation_server_install_readiness_without_runtime_mount",
    files: [
      "src/modules/stream/foundation/deployment/streamFoundationServerInstallReadinessTypes.ts",
      "src/modules/stream/foundation/deployment/streamFoundationServerInstallPlan.ts",
      "src/modules/stream/foundation/deployment/streamFoundationServerInstallReadinessGate.ts",
      "src/modules/stream/foundation/deployment/index.ts",
      "src/modules/stream/foundation/stream137aBackendFoundationServerInstallReadinessStagingManifest.ts",
      "src/modules/stream/index.ts",
      "STREAM_BACKEND_STAGING_README_137A.md",
    ],
    readiness: getStreamFoundationServerInstallReadinessSnapshot(),
    installRules: {
      copyToServerOnlyAfterOwnerApproval: true,
      routeMountSeparateStage: true,
      appServerEntryTouchedNow: false,
      databaseBindingSeparateStage: true,
      providerBindingSeparateStage: true,
      walletLedgerBindingSeparateStage: true,
      moneyMovementBlockedUntilAllGates: true,
    },
    monetizationRules: {
      acceptPaymentProviderSeparate: true,
      payoutProviderSeparate: true,
      providerSecretsServerSideOnly: true,
      recipientEarningsPendingFirst: true,
      creatorPayoutMonthlyOnly: true,
      fakePaymentGiftEarningPayoutBlocked: true,
    },
    safety: {
      localStagingOnly: true,
      routeMountAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      walletLedgerMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      mobileProjectMutationAllowedNow: false,
      adminUiRuntimeMutationAllowedNow: false,
      rawSecretsReturned: false,
      fakeSuccessAllowed: false,
    },
    nextStage: "BACKEND_STREAM_FOUNDATION_137B_AUTH_RATE_LIMIT_AUDIT_FUNCTIONAL_GUARDS_STAGING",
  };
}

export const STREAM_137A_BACKEND_FOUNDATION_SERVER_INSTALL_READINESS_STAGING_MANIFEST = getStream137ABackendFoundationServerInstallReadinessStagingManifest();
export const STREAM_137A_BACKEND_FOUNDATION_SERVER_INSTALL_READINESS_SAFE_SNAPSHOT = STREAM_FOUNDATION_SAFE_SNAPSHOT;
