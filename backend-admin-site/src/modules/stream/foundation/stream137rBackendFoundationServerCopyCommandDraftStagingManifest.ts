import { getStreamFoundation137RServerCopyCommandReadiness } from "./server-copy-command";

export const STREAM_137R_BACKEND_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGING_MANIFEST = {
  stage: "BACKEND-STREAM-FOUNDATION-137R",
  title: "Server-copy source-only command draft staging",
  scope: "local_staging_patch_only",
  description:
    "Prepares exact source-only server copy command drafts for Stream backend foundation files without executing commands, copying to server, restarting backend, mounting routes, touching DB/provider/Wallet/Messenger or moving money.",
  readiness: getStreamFoundation137RServerCopyCommandReadiness(),
  safety: {
    shellCommandsExecutedNow: false,
    serverCopyPerformedNow: false,
    backendRestartNow: false,
    routeMountNow: false,
    appServerFilesTouched: false,
    adminUiFilesTouched: false,
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

export function getStream137RBackendFoundationServerCopyCommandDraftStagingManifest() {
  return STREAM_137R_BACKEND_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGING_MANIFEST;
}
