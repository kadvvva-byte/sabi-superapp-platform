import { getStream144NPostVerificationHandoffSnapshot } from "./stream144nPostVerificationHandoff";
import { getStream144NPostVerificationHandoffReadiness } from "./stream144nPostVerificationHandoffReadiness";

export function runStream144NPostVerificationHandoffSmoke() {
  const snapshot = getStream144NPostVerificationHandoffSnapshot();
  const readiness = getStream144NPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "144l_144m_closed",
      passed: snapshot.closedEvidence.stage144LClosed && snapshot.closedEvidence.stage144MVerificationPassed,
      evidence: JSON.stringify(snapshot.closedEvidence),
    },
    {
      id: "missing_route_files_not_created",
      passed: !snapshot.streamRoutesFileCreatedNow && !snapshot.streamLiveRoutesFileCreatedNow,
      evidence: JSON.stringify(snapshot.missingRouteFilesStillMissingAndNotCreated),
    },
    {
      id: "no_target_or_runtime_change",
      passed:
        snapshot.targetPatchDecisionMadeNow === false &&
        snapshot.safety.sourceModificationPerformed === 0 &&
        snapshot.safety.runtimeMountPerformed === 0 &&
        snapshot.safety.routeBehaviorChangePerformed === 0 &&
        snapshot.safety.targetRouteWritePerformed === 0 &&
        snapshot.safety.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.safety),
    },
    {
      id: "next_144o_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor144O.includes("BACKEND-STREAM-FOUNDATION-144O") &&
        snapshot.requiredExactApprovalTextFor144O.includes("without target route write") &&
        snapshot.requiredExactApprovalTextFor144O.includes("without fake success"),
      evidence: snapshot.requiredExactApprovalTextFor144O,
    },
    { id: "readiness_true", passed: readiness.ready, evidence: readiness.status },
  ];

  const failedAssertions = assertions.filter((item) => !item.passed);
  return {
    version: snapshot.version,
    stage: "target_patch_planning_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0
      ? "target_patch_planning_post_verification_handoff_smoke_passed"
      : "target_patch_planning_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
