import { getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot } from "./kernel-diagnostics-controlled-authenticated-admin-get-smoke-approval-package";

export const STREAM_140N_BACKEND_FOUNDATION_CONTROLLED_AUTHENTICATED_ADMIN_GET_SMOKE_APPROVAL_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140N",
  stage: "controlled_authenticated_admin_get_smoke_approval_package_source_only",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    backendRestart: false,
    runtimeHttpSmokeByThisStage: false,
    authenticatedHttpSmokeByThisStage: false,
    tokenValueStored: false,
    rawTokenReturned: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot(),
} as const;
