import { getStreamFoundationProviderRealtimeModerationPostVerificationHandoffSnapshot } from "./streamFoundationProviderRealtimeModerationPostVerificationHandoff";
import { getStreamFoundationProviderRealtimeModerationPostVerificationHandoffReadiness } from "./streamFoundationProviderRealtimeModerationPostVerificationHandoffReadiness";

export function runStreamFoundationProviderRealtimeModerationPostVerificationHandoffSmoke() {
  const snapshot = getStreamFoundationProviderRealtimeModerationPostVerificationHandoffSnapshot();
  const readiness = getStreamFoundationProviderRealtimeModerationPostVerificationHandoffReadiness();

  const assertions = [
    {
      id: "143g_verification_evidence_preserved",
      passed:
        snapshot.verificationEvidence143G.ok === true &&
        snapshot.verificationEvidence143G.scopeLimitedToStreamFoundation === true &&
        snapshot.verificationEvidence143G.tscExitCode === 0 &&
        snapshot.verificationEvidence143G.providerCallPerformed === 0 &&
        snapshot.verificationEvidence143G.providerSecretReadPerformed === 0 &&
        snapshot.verificationEvidence143G.realtimeSocketOpenPerformed === 0 &&
        snapshot.verificationEvidence143G.realtimeBroadcastPerformed === 0 &&
        snapshot.verificationEvidence143G.moderationBypassPerformed === 0 &&
        snapshot.verificationEvidence143G.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.verificationEvidence143G),
    },
    {
      id: "provider_realtime_moderation_artifacts_closed_clean",
      passed:
        snapshot.closedGateArtifacts.length === 3 &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.status === "closed_clean") &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.providerCallPerformed === 0) &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.providerSecretReadPerformed === 0) &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.realtimeSocketOpenPerformed === 0) &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.moderationBypassPerformed === 0) &&
        snapshot.closedGateArtifacts.every((artifact) => artifact.fakeSuccessAllowed === false),
      evidence: JSON.stringify(snapshot.closedGateArtifacts),
    },
    {
      id: "runtime_mount_prerequisite_plan_present_and_blocked",
      passed:
        snapshot.runtimeMountPrerequisitePlanningItems.length === 8 &&
        snapshot.runtimeMountPrerequisitePlanningItems.some((item) => item.area === "repository_boundary_prerequisite") &&
        snapshot.runtimeMountPrerequisitePlanningItems.some((item) => item.area === "provider_readiness_prerequisite") &&
        snapshot.runtimeMountPrerequisitePlanningItems.some((item) => item.area === "realtime_handoff_prerequisite") &&
        snapshot.runtimeMountPrerequisitePlanningItems.some((item) => item.area === "owner_runtime_mount_approval_prerequisite") &&
        snapshot.runtimeMountPrerequisitePlanningItems.every((item) => item.runtimeMountAllowedNow === false) &&
        snapshot.runtimeMountPrerequisitePlanningItems.every((item) => item.fakeSuccessAllowedNow === false),
      evidence: JSON.stringify(snapshot.runtimeMountPrerequisitePlanningItems.map((item) => item.area)),
    },
    {
      id: "next_143i_approval_present",
      passed:
        snapshot.requiredExactApprovalTextFor143I.includes("BACKEND-STREAM-FOUNDATION-143I") &&
        snapshot.requiredExactApprovalTextFor143I.includes("runtime mount prerequisite") &&
        snapshot.requiredExactApprovalTextFor143I.includes("no provider secret read") &&
        snapshot.requiredExactApprovalTextFor143I.includes("no fake success"),
      evidence: snapshot.requiredExactApprovalTextFor143I,
    },
    {
      id: "143h_safety_clean",
      passed:
        snapshot.safety.targetWriteBy143H === false &&
        snapshot.safety.prismaSchemaChangeBy143H === false &&
        snapshot.safety.migrationCreatedBy143H === false &&
        snapshot.safety.runtimePostBy143H === false &&
        snapshot.safety.runtimeDbReadBy143H === false &&
        snapshot.safety.runtimeDbWriteBy143H === false &&
        snapshot.safety.providerCallBy143H === false &&
        snapshot.safety.providerSecretReadBy143H === false &&
        snapshot.safety.realtimeSocketOpenBy143H === false &&
        snapshot.safety.realtimeBroadcastBy143H === false &&
        snapshot.safety.moderationBypassBy143H === false &&
        snapshot.safety.moneyMovementBy143H === false &&
        snapshot.safety.fakeSuccessBy143H === false,
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
    stage: "provider_realtime_moderation_post_verification_handoff_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "provider_realtime_moderation_post_verification_handoff_smoke_passed" : "provider_realtime_moderation_post_verification_handoff_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
