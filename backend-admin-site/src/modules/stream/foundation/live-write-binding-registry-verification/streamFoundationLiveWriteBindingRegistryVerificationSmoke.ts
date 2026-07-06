import { getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot } from "./streamFoundationLiveWriteBindingRegistryVerification";
import { getStreamFoundationLiveWriteBindingRegistryVerificationReadiness } from "./streamFoundationLiveWriteBindingRegistryVerificationReadiness";

export function runStreamFoundationLiveWriteBindingRegistryVerificationSmoke() {
  const snapshot = getStreamFoundationLiveWriteBindingRegistryVerificationSnapshot();
  const readiness = getStreamFoundationLiveWriteBindingRegistryVerificationReadiness();

  const assertions = [
    {
      id: "three_bindings_verified",
      passed: snapshot.verificationItems.length === 3 && snapshot.totals.verifiedBindings === 3,
      evidence: JSON.stringify(snapshot.verificationItems.map((item) => item.routeId)),
    },
    {
      id: "draft_handlers_and_exact_approval_required",
      passed:
        snapshot.verificationItems.every((item) => item.draftHandlerPresent === true) &&
        snapshot.verificationItems.every((item) => item.exactApprovalRequired === true),
      evidence: JSON.stringify(snapshot.verificationItems),
    },
    {
      id: "runtime_mount_and_post_blocked",
      passed:
        snapshot.verificationItems.every((item) => item.appTsMountNow === false) &&
        snapshot.verificationItems.every((item) => item.serverTsMountNow === false) &&
        snapshot.verificationItems.every((item) => item.streamIndexExportNow === false) &&
        snapshot.verificationItems.every((item) => item.runtimePostAllowedNow === false),
      evidence: JSON.stringify(snapshot.verificationItems),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.totals.databaseWriteAllowedNow === 0 &&
        snapshot.totals.providerCallAllowedNow === 0 &&
        snapshot.totals.walletMutationAllowedNow === 0 &&
        snapshot.totals.moneyMovementAllowedNow === 0 &&
        snapshot.totals.fakeSuccessAllowed === 0,
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
    stage: "source_only_binding_registry_verification_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "binding_registry_verification_smoke_passed" : "binding_registry_verification_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: readiness.nextRecommendedStage,
  } as const;
}
