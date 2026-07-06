import { getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot } from "./streamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackage";
import { getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageReadiness } from "./streamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageReadiness";

export function runStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSmoke() {
  const snapshot = getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot();
  const readiness = getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageReadiness();

  const assertions = [
    {
      id: "version_140n",
      passed: snapshot.version === "BACKEND-STREAM-FOUNDATION-140N",
      evidence: snapshot.version,
    },
    {
      id: "previous_140m_locked",
      passed: snapshot.previousEvidence.tokenReadinessReviewStage === "BACKEND-STREAM-FOUNDATION-140M",
      evidence: JSON.stringify(snapshot.previousEvidence),
    },
    {
      id: "targets_get_only",
      passed: snapshot.authenticatedSmokeTargets.length === 2 && snapshot.authenticatedSmokeTargets.every((target) => target.method === "GET"),
      evidence: JSON.stringify(snapshot.authenticatedSmokeTargets),
    },
    {
      id: "token_runtime_only_no_storage",
      passed:
        snapshot.runnerConstraints.tokenInputRuntimeOnly === true &&
        snapshot.runnerConstraints.tokenStorageAllowed === false &&
        snapshot.runnerConstraints.tokenLoggingAllowed === false &&
        snapshot.runnerConstraints.tokenReportAllowed === false,
      evidence: JSON.stringify(snapshot.runnerConstraints),
    },
    {
      id: "no_execution_by_140n",
      passed:
        snapshot.runnerConstraints.mayExecuteHttpByThisStage === false &&
        snapshot.runnerConstraints.backendRestartAllowed === false &&
        snapshot.runnerConstraints.sourceMutationAllowed === false,
      evidence: JSON.stringify(snapshot.runnerConstraints),
    },
    {
      id: "no_db_provider_wallet_money",
      passed:
        snapshot.runnerConstraints.databaseWriteAllowed === false &&
        snapshot.runnerConstraints.providerCallAllowed === false &&
        snapshot.runnerConstraints.walletMutationAllowed === false &&
        snapshot.runnerConstraints.paymentAuthorizationAllowed === false &&
        snapshot.runnerConstraints.monthlyPayoutAllowed === false &&
        snapshot.runnerConstraints.moneyMovementAllowed === false &&
        snapshot.runnerConstraints.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.runnerConstraints),
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
    stage: "controlled_authenticated_admin_get_smoke_approval_package_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "controlled_authenticated_admin_get_smoke_approval_package_smoke_passed" : "controlled_authenticated_admin_get_smoke_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
