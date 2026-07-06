import { getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot } from "./streamFoundationControlledTargetPatchWritePreApprovalGuard";
import { getStreamFoundationControlledTargetPatchWritePreApprovalGuardReadiness } from "./streamFoundationControlledTargetPatchWritePreApprovalGuardReadiness";

export function runStreamFoundationControlledTargetPatchWritePreApprovalGuardSmoke() {
  const snapshot = getStreamFoundationControlledTargetPatchWritePreApprovalGuardSnapshot();
  const readiness = getStreamFoundationControlledTargetPatchWritePreApprovalGuardReadiness();

  const assertions = [
    {
      id: "dalshe_not_accepted_as_target_write_approval",
      passed: snapshot.userInputAcceptedAsApproval === false && snapshot.reason === "message_dalshe_is_not_exact_write_approval",
      evidence: `${snapshot.userInputAcceptedAsApproval}:${snapshot.reason}`,
    },
    {
      id: "required_exact_approval_text_present",
      passed:
        snapshot.requiredExactApprovalText.includes("I approve BACKEND-STREAM-FOUNDATION-141H") &&
        snapshot.requiredExactApprovalText.includes("no src/server.ts change") &&
        snapshot.requiredExactApprovalText.includes("no money movement"),
      evidence: snapshot.requiredExactApprovalText,
    },
    {
      id: "all_target_writes_blocked_now",
      passed:
        snapshot.targetWriteAllowedNow === false &&
        snapshot.appTsWriteAllowedNow === false &&
        snapshot.streamIndexWriteAllowedNow === false &&
        snapshot.serverTsWriteAllowedNow === false,
      evidence: JSON.stringify({
        targetWriteAllowedNow: snapshot.targetWriteAllowedNow,
        appTsWriteAllowedNow: snapshot.appTsWriteAllowedNow,
        streamIndexWriteAllowedNow: snapshot.streamIndexWriteAllowedNow,
        serverTsWriteAllowedNow: snapshot.serverTsWriteAllowedNow,
      }),
    },
    {
      id: "no_runtime_or_money_actions",
      passed:
        snapshot.routeMountAllowedNow === false &&
        snapshot.runtimePostAllowedNow === false &&
        snapshot.backendRestartAllowedNow === false &&
        snapshot.databaseWriteAllowedNow === false &&
        snapshot.providerCallAllowedNow === false &&
        snapshot.walletMutationAllowedNow === false &&
        snapshot.moneyMovementAllowedNow === false &&
        snapshot.fakeSuccessAllowedNow === false,
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
    stage: "controlled_target_patch_write_pre_approval_guard_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "pre_approval_guard_smoke_passed" : "pre_approval_guard_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
