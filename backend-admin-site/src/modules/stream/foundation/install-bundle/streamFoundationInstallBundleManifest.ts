import { getStreamFoundationInstallBundleReadinessSnapshot } from "./streamFoundationInstallBundleReadinessGate";

export const STREAM_FOUNDATION_137L_INSTALL_BUNDLE_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-137L" as const;

export function getStreamFoundation137LInstallBundleManifest() {
  const readiness = getStreamFoundationInstallBundleReadinessSnapshot();
  return {
    version: STREAM_FOUNDATION_137L_INSTALL_BUNDLE_MANIFEST_VERSION,
    stage: readiness.stage,
    status: readiness.status,
    localStagingOnly: true,
    patchZipOnly: true,
    readyForPatchZipReview: readiness.readyForPatchZipReview,
    readyForManualServerSourceCopyAfterOwnerApproval: readiness.readyForManualServerSourceCopyAfterOwnerApproval,
    readyForAutomaticServerInstallNow: readiness.readyForAutomaticServerInstallNow,
    readyForRouteMountNow: readiness.readyForRouteMountNow,
    readyForLiveMoneyMovementNow: readiness.readyForLiveMoneyMovementNow,
    summary: readiness.summary,
    monetizationRules: {
      acceptPaymentProviderSeparate: true,
      payoutProviderSeparate: true,
      walletCoinLedgerRequired: true,
      recipientPendingEarningBeforeAvailable: true,
      monthlyPayoutOnly: true,
      providerKeysServerSideOnly: true,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakePaymentGiftPayoutSuccessAllowed: false,
    },
    safety: readiness.safety,
  } as const;
}
