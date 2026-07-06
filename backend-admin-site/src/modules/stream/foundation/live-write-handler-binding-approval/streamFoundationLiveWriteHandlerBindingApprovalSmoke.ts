import { getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot } from "./streamFoundationLiveWriteHandlerBindingApproval";
import { getStreamFoundationLiveWriteHandlerBindingApprovalReadiness } from "./streamFoundationLiveWriteHandlerBindingApprovalReadiness";

export function runStreamFoundationLiveWriteHandlerBindingApprovalSmoke() {
  const snapshot = getStreamFoundationLiveWriteHandlerBindingApprovalSnapshot();
  const readiness = getStreamFoundationLiveWriteHandlerBindingApprovalReadiness();

  const assertions = [
    {
      id: "handler_drafts_verified_blocked_envelopes",
      passed:
        snapshot.handlerDraftsVerified === true &&
        snapshot.verificationItems.every((item) => item.expectedBlockedStatusCode === 423) &&
        snapshot.verificationItems.every((item) => item.expectedOk === false),
      evidence: JSON.stringify(snapshot.verificationItems),
    },
    {
      id: "binding_approval_items_ready_but_mount_blocked",
      passed:
        snapshot.bindingApprovalItems.every((item) => item.bindingSourceReady === true) &&
        snapshot.bindingApprovalItems.every((item) => item.appRouteMountAllowedNow === false) &&
        snapshot.bindingApprovalItems.every((item) => item.serverRouteMountAllowedNow === false) &&
        snapshot.bindingApprovalItems.every((item) => item.streamIndexExportAllowedNow === false) &&
        snapshot.bindingApprovalItems.every((item) => item.runtimeSmokeAllowedNow === false),
      evidence: JSON.stringify(snapshot.bindingApprovalItems),
    },
    {
      id: "exact_owner_approval_required",
      passed: snapshot.bindingApprovalItems.every((item) => item.requiresExactOwnerApprovalBeforeMount === true && item.requiredApprovalText.includes("I approve BACKEND-STREAM-FOUNDATION-141A")),
      evidence: JSON.stringify(snapshot.bindingApprovalItems.map((item) => item.requiredApprovalText)),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWritePerformed === 0 &&
        snapshot.totals.providerCallPerformed === 0 &&
        snapshot.totals.walletMutationPerformed === 0 &&
        snapshot.totals.moneyMovementPerformed === 0 &&
        snapshot.totals.fakeSuccessAllowed === 0,
      evidence: JSON.stringify(snapshot.totals),
    },
    {
      id: "safety_no_runtime_mutation",
      passed:
        snapshot.safety.appTsChange === false &&
        snapshot.safety.serverTsChange === false &&
        snapshot.safety.streamIndexChange === false &&
        snapshot.safety.routeMountNow === false &&
        snapshot.safety.runtimeHttpBy140Z === false &&
        snapshot.safety.runtimePostBy140Z === false &&
        snapshot.safety.backendRestart === false &&
        snapshot.safety.databaseWrite === false &&
        snapshot.safety.providerCall === false &&
        snapshot.safety.walletMutation === false &&
        snapshot.safety.moneyMovement === false &&
        snapshot.safety.fakeSuccess === false,
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
    stage: "live_write_handler_source_only_verification_and_route_binding_approval_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "live_write_handler_binding_approval_smoke_passed" : "live_write_handler_binding_approval_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
