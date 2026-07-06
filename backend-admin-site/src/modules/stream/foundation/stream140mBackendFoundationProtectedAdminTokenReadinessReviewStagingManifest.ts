import { getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot } from "./kernel-diagnostics-protected-admin-token-readiness-review";

export const STREAM_140M_BACKEND_FOUNDATION_PROTECTED_ADMIN_TOKEN_READINESS_REVIEW_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-140M",
  stage: "protected_admin_token_readiness_review_source_only",
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
  snapshot: getStreamFoundationProtectedAdminTokenReadinessReviewSnapshot(),
} as const;
