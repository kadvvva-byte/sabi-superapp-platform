import { getStreamFoundationRepositoryBoundaryPostVerificationHandoffSnapshot } from "./streamFoundationRepositoryBoundaryPostVerificationHandoff";
import { getStreamFoundationRepositoryBoundaryPostVerificationHandoffReadiness } from "./streamFoundationRepositoryBoundaryPostVerificationHandoffReadiness";

export function runStreamFoundationRepositoryBoundaryPostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationRepositoryBoundaryPostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationRepositoryBoundaryPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143c_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143C.ok === true &&
        snapshot.verificationEvidence143C.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143C.migrationVerificationOk === true &&
        snapshot.verificationEvidence143C.tscExitCode === 0 &&
        snapshot.verificationEvidence143C.runtimeDbReadPerformed === 0 &&
        snapshot.verificationEvidence143C.runtimeDbWritePerformed === 0 &&
        snapshot.verificationEvidence143C.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143C),
    },
    {
      id: "repository_artifacts_closed_clean",
      passed:
        snapshot.closedArtifacts.length === 3 &&
        snapshot.closedArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedArtifacts.every((artifact) => artifact.runtimeDbAccessPerformed === 0) &&
        snapshot.closedArtifacts.every((artifact) => artifact.moneyMovementPerformed === 0) &&
        snapshot.closedArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedArtifacts),
    },
    {
      id: "next_batch_plan_present_and_blocked",
      passed:
        snapshot.nextBatchPlan.length === 6 &&
        snapshot.nextBatchPlan.some((item) => item.area === "provider_readiness_gate") &&
        snapshot.nextBatchPlan.some((item) => item.area === "realtime_handoff_gate") &&
        snapshot.nextBatchPlan.some((item) => item.area === "moderation_runtime_gate") &&
        snapshot.nextBatchPlan.every((item) => item.providerCallAllowedNow === false) &&
        snapshot.nextBatchPlan.every((item) => item.runtimeDbWriteAllowedNow === false) &&
        snapshot.nextBatchPlan.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.nextBatchPlan.map((item) => item.area)),
    },
    {
      id: "next_143e_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143E.includes("BACKEND-STREAM-FOUNDATION-143E") &&
        snapshot.requiredExactApprovalTextFor143E.includes("provider realtime moderation gate planning") &&
        snapshot.requiredExactApprovalTextFor143E.includes("no provider call") &&
        snapshot.requiredExactApprovalTextFor143E.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143E,
    },
    {
      id: "143d_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143D === false &&
        snapshot.safety.prismaSchemaChangeBy143D === false &&
        snapshot.safety.migrationCreatedBy143D === false &&
        snapshot.safety.runtimePostBy143D === false &&
        snapshot.safety.runtimeDbReadBy143D === false &&
        snapshot.safety.runtimeDbWriteBy143D === false &&
        snapshot.safety.providerCallBy143D === false &&
        snapshot.safety.walletMutationBy143D === false &&
        snapshot.safety.moneyMovementBy143D === false &&
        snapshot.safety.fakeSuccessBy143D === false,
      evidence: JSON.stringify(snapshot.safety),
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
    stage: "repository_boundary_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "repository_boundary_post_verification_handoff_smoke_passed" : "repository_boundary_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
