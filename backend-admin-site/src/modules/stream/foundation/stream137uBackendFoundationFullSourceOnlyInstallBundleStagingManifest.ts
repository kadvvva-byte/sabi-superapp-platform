import { getStreamFoundation137UFullSourceOnlyInstallBundleReadiness } from "./full-source-install-bundle";

export const STREAM_137U_BACKEND_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGING_MANIFEST = {
  stage: "BACKEND-STREAM-FOUNDATION-137U",
  title: "Full source-only install bundle staging manifest",
  localStagingOnly: true,
  fullSourceOnlyBundle: true,
  patchZipOnly: true,
  serverCopyPerformedNow: false,
  backendRestartPerformedNow: false,
  routeMountPerformedNow: false,
  appServerFilesTouched: false,
  databaseReadPerformedNow: false,
  databaseWritePerformedNow: false,
  schemaMigrationPerformedNow: false,
  providerCallPerformedNow: false,
  walletMutationPerformedNow: false,
  messengerMutationPerformedNow: false,
  moneyMovementPerformedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysExposed: false,
  fakeMoneySuccessAllowed: false,
  readiness: getStreamFoundation137UFullSourceOnlyInstallBundleReadiness(),
} as const;

export function getStream137UBackendFoundationFullSourceOnlyInstallBundleStagingManifest() {
  return STREAM_137U_BACKEND_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGING_MANIFEST;
}
