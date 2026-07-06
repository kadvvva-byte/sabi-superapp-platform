import { getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot } from "./streamFoundationControlledRouteBindingPatchDraftReview";
import { getStreamFoundationControlledRouteBindingPatchDraftReviewReadiness } from "./streamFoundationControlledRouteBindingPatchDraftReviewReadiness";

export function runStreamFoundationControlledRouteBindingPatchDraftReviewSmoke() {
  const snapshot = getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot();
  const readiness = getStreamFoundationControlledRouteBindingPatchDraftReviewReadiness();

  const assertions = [
    {
      id: "three_draft_review_items_ready",
      passed: snapshot.draftReviewItems.length === 3 && snapshot.totals.draftReviewItems === 3,
      evidence: JSON.stringify(snapshot.draftReviewItems.map((item) => item.routeId)),
    },
    {
      id: "no_actual_target_write_or_mount",
      passed:
        snapshot.totals.actualTargetWritesNow === 0 &&
        snapshot.totals.routeMountNow === 0 &&
        snapshot.totals.runtimePostNow === 0 &&
        snapshot.totals.backendRestartNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteNow === 0 &&
        snapshot.totals.providerCallNow === 0 &&
        snapshot.totals.walletMutationNow === 0 &&
        snapshot.totals.moneyMovementNow === 0 &&
        snapshot.totals.fakeSuccessNow === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "readiness_true",
      passed: readiness.ready === true,
      evidence: readiness.status,
    },
  ];

  const failedAssertions = assertions.filter((assertion) => !assertion.passed);

  return {
    version: snapshot.version,
    stage: "controlled_source_only_route_binding_patch_draft_review_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "route_binding_patch_draft_review_smoke_passed" : "route_binding_patch_draft_review_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
