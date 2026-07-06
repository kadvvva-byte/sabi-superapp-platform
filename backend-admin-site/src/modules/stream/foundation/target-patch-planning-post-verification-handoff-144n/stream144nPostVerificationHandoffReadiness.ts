import { getStream144NPostVerificationHandoffSnapshot } from "./stream144nPostVerificationHandoff";

export function getStream144NPostVerificationHandoffReadiness() {
  const s = getStream144NPostVerificationHandoffSnapshot();
  const ready =
    s.closedEvidence.stage144LClosed === true &&
    s.closedEvidence.stage144MVerificationPassed === true &&
    s.closedEvidence.scopeLimitedToStreamFoundation === true &&
    s.closedEvidence.targetReferenceOk === true &&
    s.closedEvidence.contractContentPassed === "5/5" &&
    s.closedEvidence.tscExitCode === 0 &&
    s.preferredDirection === "dedicated_stream_route_boundary_strategy" &&
    s.missingRouteFilesStillMissingAndNotCreated.length === 2 &&
    s.nextDraftPlanningAreas.length === 10 &&
    s.targetPatchDecisionMadeNow === false &&
    s.streamRoutesFileCreatedNow === false &&
    s.streamLiveRoutesFileCreatedNow === false &&
    s.safety.sourceOnly144N === true &&
    s.safety.sourceModificationPerformed === 0 &&
    s.safety.runtimeMountPerformed === 0 &&
    s.safety.routeBehaviorChangePerformed === 0 &&
    s.safety.targetRouteWritePerformed === 0 &&
    s.safety.moneyMovementPerformed === 0 &&
    s.safety.fakeSuccessAllowed === false &&
    s.requiredExactApprovalTextFor144O.includes("BACKEND-STREAM-FOUNDATION-144O") &&
    s.requiredExactApprovalTextFor144O.includes("without creating stream.routes.ts or stream-live.routes.ts") &&
    s.requiredExactApprovalTextFor144O.includes("without target route write") &&
    s.requiredExactApprovalTextFor144O.includes("without fake success");

  return {
    version: s.version,
    ready,
    status: ready
      ? "target_patch_planning_closed_dedicated_route_boundary_draft_ready"
      : "target_patch_planning_post_verification_handoff_blocked",
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-144O controlled dedicated Stream route boundary target patch draft planning package source-only after exact approval",
  } as const;
}
