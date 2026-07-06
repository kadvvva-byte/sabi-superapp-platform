import { getStreamFoundation137LInstallBundleManifest, getStreamFoundationInstallBundleReadinessSnapshot, runStreamFoundationInstallBundleSmoke } from "./install-bundle";

export const STREAM_137L_BACKEND_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-137L" as const;

export function getStream137LBackendFoundationInstallBundleReadinessStagingManifest() {
  const readiness = getStreamFoundationInstallBundleReadinessSnapshot();
  const manifest = getStreamFoundation137LInstallBundleManifest();
  const smoke = runStreamFoundationInstallBundleSmoke();
  return {
    version: STREAM_137L_BACKEND_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGING_MANIFEST_VERSION,
    status: readiness.status,
    localStagingOnly: true,
    patchZipOnly: true,
    manifest,
    smoke,
    summary: readiness.summary,
    sourceInstallSafety: {
      routeMount: 0,
      expressRouterInstance: 0,
      appServerTouch: 0,
      adminRouteTouch: 0,
      serverRestart: 0,
      databaseReadWrite: 0,
      providerCalls: 0,
      realtimeMediaWrite: 0,
      walletMessengerMutation: 0,
      moneyMovement: 0,
      rawSecretsReturned: 0,
      mobileProviderKeys: 0,
      fakePaymentGiftEarningPayoutSuccess: 0,
    },
    monetizationSafety: {
      acceptPaymentProviderSeparate: true,
      payoutProviderSeparate: true,
      walletCoinLedgerRequired: true,
      recipientEarningsPendingBeforePayout: true,
      monthlyPayoutOnly: true,
      providerKeysServerSideOnly: true,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakePaymentGiftEarningPayoutSuccessAllowed: false,
    },
    readiness,
    safety: readiness.safety,
  } as const;
}
