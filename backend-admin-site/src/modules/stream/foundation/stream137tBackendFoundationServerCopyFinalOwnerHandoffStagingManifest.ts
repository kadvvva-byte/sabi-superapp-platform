import { getStreamFoundation137TServerCopyFinalOwnerHandoffReadiness } from "./server-copy-final-handoff";

export const STREAM_137T_BACKEND_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGING_MANIFEST = {
  stage: "BACKEND-STREAM-FOUNDATION-137T",
  title: "Server-copy final owner handoff staging manifest",
  localStagingOnly: true,
  patchZipOnly: true,
  serverCopyPerformedNow: false,
  backendRestartPerformedNow: false,
  routeMountPerformedNow: false,
  appServerFilesTouched: false,
  databaseWritePerformedNow: false,
  schemaMigrationPerformedNow: false,
  providerCallPerformedNow: false,
  walletMutationPerformedNow: false,
  messengerMutationPerformedNow: false,
  moneyMovementPerformedNow: false,
  fakeMoneySuccessAllowed: false,
  readiness: getStreamFoundation137TServerCopyFinalOwnerHandoffReadiness(),
} as const;

export function getStream137TBackendFoundationServerCopyFinalOwnerHandoffStagingManifest() {
  return STREAM_137T_BACKEND_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGING_MANIFEST;
}
