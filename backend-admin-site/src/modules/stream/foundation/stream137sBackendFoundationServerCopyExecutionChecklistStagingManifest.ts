import { getStreamFoundation137SServerCopyExecutionChecklistReadiness } from "./server-copy-execution-checklist";

export const STREAM_137S_BACKEND_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGING_MANIFEST = {
  stage: "BACKEND-STREAM-FOUNDATION-137S",
  title: "Server-copy source-only execution checklist staging",
  scope: "local_staging_patch_only",
  description:
    "Prepares the final source-only server-copy execution checklist for Stream backend foundation files without executing commands, copying to server, restarting backend, mounting routes, touching DB/provider/Wallet/Messenger or moving money.",
  readiness: getStreamFoundation137SServerCopyExecutionChecklistReadiness(),
  safety: {
    checklistOnly: true,
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

export function getStream137SBackendFoundationServerCopyExecutionChecklistStagingManifest() {
  return STREAM_137S_BACKEND_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGING_MANIFEST;
}
