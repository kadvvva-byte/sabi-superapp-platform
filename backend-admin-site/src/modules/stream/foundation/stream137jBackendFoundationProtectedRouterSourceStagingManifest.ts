import { getStreamFoundationProtectedRouterSourceReadinessSnapshot } from "./routes";

export const STREAM_137J_BACKEND_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-137J" as const;

export function getStream137JBackendFoundationProtectedRouterSourceStagingManifest() {
  const readiness = getStreamFoundationProtectedRouterSourceReadinessSnapshot();
  return {
    version: STREAM_137J_BACKEND_FOUNDATION_PROTECTED_ROUTER_SOURCE_STAGING_MANIFEST_VERSION,
    status: "protected_router_source_ready_not_mounted",
    localStagingOnly: true,
    summary: {
      totalRoutes: readiness.routerSource.totalRoutes,
      readyRoutes: readiness.routerSource.readyRoutes,
      reviewRequiredRoutes: readiness.routerSource.reviewRequiredRoutes,
      blockedRoutes: readiness.routerSource.blockedRoutes,
      coveragePercent: readiness.coverage.coveragePercent,
      routerSourceModuleCreatedNow: readiness.routerSource.routerSourceModuleCreatedNow,
      expressRouterInstanceCreatedNow: readiness.routerSource.expressRouterInstanceCreatedNow,
      routeMountedNow: readiness.routerSource.routeMountedNow,
      appServerTouchedNow: readiness.routerSource.appServerTouchedNow,
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
      fakePaymentGiftPayoutSuccessAllowed: false,
    },
    readiness,
    safety: readiness.safety,
  } as const;
}
