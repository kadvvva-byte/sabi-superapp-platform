import { getStreamFoundationControlledTargetPatchDraftReviewSourceOnlySnapshot } from "./streamFoundationControlledTargetPatchDraftReviewSourceOnly";
import { getStreamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness } from "./streamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness";

export function runStreamFoundationControlledTargetPatchDraftReviewSourceOnlySmoke() {
  const snapshot = getStreamFoundationControlledTargetPatchDraftReviewSourceOnlySnapshot();
  const readiness = getStreamFoundationControlledTargetPatchDraftReviewSourceOnlyReadiness();

  const assertions = [
    {
      id: "owner_approval_accepted_for_142i",
      passed:
        snapshot.ownerApprovalAccepted === true &&
        snapshot.ownerApprovalText.includes("BACKEND-STREAM-FOUNDATION-142I") &&
        snapshot.ownerApprovalText.includes("controlled target patch draft review source-only only"),
      evidence: snapshot.ownerApprovalText,
    },
    {
      id: "future_patch_review_items_ready",
      passed:
        snapshot.futurePatchReviewItems.length === 6 &&
        snapshot.futurePatchReviewItems.some((item) => item.targetFile === "src/app.ts") &&
        snapshot.futurePatchReviewItems.some((item) => item.targetFile === "src/server.ts") &&
        snapshot.futurePatchReviewItems.some((item) => item.targetFile === "src/modules/stream/index.ts"),
      evidence: JSON.stringify(snapshot.futurePatchReviewItems.map((item) => ({ id: item.id, targetFile: item.targetFile }))),
    },
    {
      id: "no_target_write_or_route_binding_now",
      passed:
        snapshot.targetPatchPolicy.appTsWriteAllowedNow === false &&
        snapshot.targetPatchPolicy.serverTsWriteAllowedNow === false &&
        snapshot.targetPatchPolicy.streamIndexWriteAllowedNow === false &&
        snapshot.targetPatchPolicy.routeBindingAllowedNow === false &&
        snapshot.targetPatchPolicy.routeBehaviorChangeAllowedNow === false &&
        snapshot.totals.targetWriteAllowedNow === 0,
      evidence: JSON.stringify(snapshot.targetPatchPolicy),
    },
    {
      id: "routes_remain_blocked_423",
      passed:
        snapshot.targetPatchPolicy.currentRoutesRemainBlockedNow === true &&
        snapshot.targetPatchPolicy.expectedCurrentStatusCode === 423 &&
        snapshot.targetPatchPolicy.runtimePostAllowedNow === false &&
        snapshot.targetPatchPolicy.runtimeSuccessAllowedNow === false &&
        snapshot.targetPatchPolicy.fakeSuccessAllowedNow === false,
      evidence: JSON.stringify(snapshot.targetPatchPolicy),
    },
    {
      id: "no_runtime_db_provider_wallet_money",
      passed:
        snapshot.totals.runtimePostAllowedNow === 0 &&
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0,
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
    stage: "controlled_target_patch_draft_review_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "target_patch_draft_review_source_only_smoke_passed" : "target_patch_draft_review_source_only_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
