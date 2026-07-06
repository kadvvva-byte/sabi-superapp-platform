import { getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot } from "./route-unmounted-smoke";

export const STREAM_137K_BACKEND_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGING_MANIFEST_VERSION = "BACKEND-STREAM-FOUNDATION-137K" as const;

export function getStream137KBackendFoundationUnmountedRouteModuleSmokeStagingManifest() {
  const readiness = getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot();
  return {
    version: STREAM_137K_BACKEND_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGING_MANIFEST_VERSION,
    status: readiness.status,
    localStagingOnly: true,
    summary: readiness.summary,
    routeSafety: {
      routeMount: 0,
      expressRouterInstance: 0,
      appServerTouch: 0,
      databaseReadWrite: 0,
      providerCalls: 0,
      realtimeMediaWrite: 0,
      walletMessengerMutation: 0,
      moneyMovement: 0,
      rawSecretsReturned: 0,
      mobileProviderKeys: 0,
      fakePaymentGiftPayoutSuccess: 0,
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
