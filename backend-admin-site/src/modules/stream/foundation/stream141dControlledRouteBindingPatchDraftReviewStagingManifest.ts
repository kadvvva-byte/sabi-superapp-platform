import { getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot } from "./controlled-route-binding-patch-draft-review";

export const STREAM_141D_CONTROLLED_ROUTE_BINDING_PATCH_DRAFT_REVIEW_STAGING_MANIFEST = {
  version: "BACKEND-STREAM-FOUNDATION-141D",
  stage: "controlled_source_only_route_binding_patch_draft_review",
  sourceOnly: true,
  changedScope: "src/modules/stream/foundation/**",
  previousStage: "BACKEND-STREAM-FOUNDATION-141C",
  forbidden: {
    appTsChange: false,
    serverTsChange: false,
    streamIndexChange: false,
    routeMountNow: false,
    runtimeHttpBy141D: false,
    runtimePostBy141D: false,
    backendRestart: false,
    databaseWrite: false,
    providerCall: false,
    walletMutation: false,
    paymentAuthorization: false,
    monthlyPayout: false,
    moneyMovement: false,
    fakeSuccess: false,
  },
  snapshot: getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot(),
} as const;
