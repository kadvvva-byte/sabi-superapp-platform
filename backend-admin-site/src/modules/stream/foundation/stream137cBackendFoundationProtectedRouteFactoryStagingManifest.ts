import { STREAM_FOUNDATION_137B_SECURITY_GUARD_READINESS_SNAPSHOT } from "./security";
import { STREAM_FOUNDATION_137C_PROTECTED_ROUTE_FACTORY_READINESS_SNAPSHOT } from "./route-factory";

export const STREAM_137C_BACKEND_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGING_VERSION =
  "BACKEND-STREAM-FOUNDATION-137C" as const;

export const STREAM_137C_BACKEND_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGING_MANIFEST = {
  version: STREAM_137C_BACKEND_FOUNDATION_PROTECTED_ROUTE_FACTORY_STAGING_VERSION,
  status: "protected_route_factory_ready_for_later_mount_not_mounted",
  scope: "backend_stream_foundation_local_staging_only",
  dependsOn: ["136O functional foundation", "137B security guard pipeline"],
  routeFactory: STREAM_FOUNDATION_137C_PROTECTED_ROUTE_FACTORY_READINESS_SNAPSHOT,
  securityGuards: STREAM_FOUNDATION_137B_SECURITY_GUARD_READINESS_SNAPSHOT,
  routeMount: {
    routeMountAllowedNow: false,
    appTsTouched: false,
    serverTsTouched: false,
    expressRouterMountedNow: false,
    requiredSeparateApprovalBeforeMount: true,
  },
  moneySafety: {
    acceptPaymentProviderConfiguredNow: false,
    payoutProviderConfiguredNow: false,
    walletLedgerBoundNow: false,
    paymentAuthorizationExecutedNow: false,
    earningCreditExecutedNow: false,
    monthlyPayoutExecutedNow: false,
    fakePaymentSuccessAllowed: false,
    fakeGiftSuccessAllowed: false,
    fakePayoutSuccessAllowed: false,
  },
  safety: {
    localStagingOnly: true,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    externalNetworkAllowedNow: false,
    walletRuntimeMutationAllowedNow: false,
    messengerRuntimeMutationAllowedNow: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  },
} as const;
