import {
  getStreamFoundationProtectedRouteDefinitions,
  previewStreamFoundationProtectedRouteDefinitions,
} from "./streamFoundationProtectedRouteDefinitions";
import {
  STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE,
  type StreamFoundationProtectedRouteDefinitionsReadinessSnapshot,
} from "./streamFoundationProtectedRouteDefinitionsTypes";

export function getStreamFoundationProtectedRouteDefinitionsReadinessSnapshot(): StreamFoundationProtectedRouteDefinitionsReadinessSnapshot {
  const definitions = getStreamFoundationProtectedRouteDefinitions();
  const previews = previewStreamFoundationProtectedRouteDefinitions();
  return {
    stage: STREAM_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGE,
    status: "protected_route_definitions_ready_for_review_not_mounted",
    definitions,
    previews,
    totalDefinitions: definitions.length,
    mountedDefinitionsNow: 0,
    protectedDefinitions: definitions.length,
    unprotectedDefinitions: 0,
    monetizationDefinitions: definitions.filter((item) => item.group === "mobile_gifts" || item.group === "admin_monetization" || item.group === "admin_payout").length,
    adminDefinitions: definitions.filter((item) => item.group === "admin_monetization" || item.group === "admin_payout").length,
    blockedUntilProviderWalletLedger: definitions.filter((item) => item.status === "definition_blocked_until_provider_wallet_ledger").length,
    coverage: {
      routeFactoryBound: true,
      securityPipelineBound: true,
      liveRoutesDefined: true,
      shortsRoutesDefined: true,
      giftRoutesDefined: true,
      adminMonetizationRoutesDefined: true,
      monthlyPayoutRoutesDefined: true,
      routeMountStillBlocked: true,
      moneyMovementStillBlocked: true,
      coveragePercent: 100,
    },
    safety: {
      localStagingOnly: true,
      routeMountAllowedNow: false,
      appServerEntryTouched: false,
      databaseReadAllowedNow: false,
      databaseWriteAllowedNow: false,
      providerCallAllowedNow: false,
      realtimePublishAllowedNow: false,
      mediaStorageWriteAllowedNow: false,
      walletRuntimeMutationAllowedNow: false,
      messengerRuntimeMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    },
  };
}

export const STREAM_FOUNDATION_137D_PROTECTED_ROUTE_DEFINITIONS_READINESS_SNAPSHOT = getStreamFoundationProtectedRouteDefinitionsReadinessSnapshot();
