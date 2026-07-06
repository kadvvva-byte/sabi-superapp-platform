import { getStreamFoundationControlledRouteBindingApprovalPackageSnapshot } from "./controlled-route-binding-approval-package";

export const STREAM_141C_CONTROLLED_ROUTE_BINDING_APPROVAL_PACKAGE_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141C",
  stage: "controlled_route_binding_source_only_approval_package",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141B",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141C: false,
    runtimePostBy141C: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledRouteBindingApprovalPackageSnapshot(),
} as const;
