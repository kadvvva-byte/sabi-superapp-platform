import { getStreamFoundation137QServerCopyApprovalReadiness } from "./server-copy-approval";

export const STREAM_137Q_BACKEND_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGING_MANIFEST = {
  stage: "BACKEND-STREAM-FOUNDATION-137Q",
  title: "Server-copy source-only approval package staging",
  scope: "local_staging_patch_only",
  description:
    "Prepares the source-only owner approval package for copying Stream backend foundation files to /opt/sabi/backend without performing the copy, route mount, restart, DB/provider calls or money movement.",
  readiness: getStreamFoundation137QServerCopyApprovalReadiness(),
  safety: {
    serverCopyPerformedNow: false,
    backendRestartNow: false,
    routeMountNow: false,
    appServerFilesTouched: false,
    databaseWriteNow: false,
    migrationNow: false,
    providerCallsNow: false,
    walletMutationNow: false,
    messengerMutationNow: false,
    moneyMovementNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysExposed: false,
    fakePaymentGiftEarningPayoutSuccess: false,
  },
} as const;

export function getStream137QBackendFoundationServerCopyApprovalPackageStagingManifest() {
  return STREAM_137Q_BACKEND_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGING_MANIFEST;
}
