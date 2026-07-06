import { getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot } from "./streamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackage";

export function getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageReadiness() {
  const snapshot = getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot();

  const targetsReady =
    snapshot.authenticatedSmokeTargets.length === 2 &&
    snapshot.authenticatedSmokeTargets.every((target) =>
      target.method === "GET" &&
      target.requiresAdminToken === true &&
      target.expectedStatusWithValidAdminToken === 200 &&
      target.responseMustBeReadOnlyDiagnostics === true
    );

  const constraintsReady =
    snapshot.runnerConstraints.mayCreateOpsRunner === true &&
    snapshot.runnerConstraints.mayExecuteHttpByThisStage === false &&
    snapshot.runnerConstraints.allowedMethods.length === 1 &&
    snapshot.runnerConstraints.allowedMethods[0] === "GET" &&
    snapshot.runnerConstraints.tokenInputRuntimeOnly === true &&
    snapshot.runnerConstraints.tokenStorageAllowed === false &&
    snapshot.runnerConstraints.tokenLoggingAllowed === false &&
    snapshot.runnerConstraints.tokenReportAllowed === false &&
    snapshot.runnerConstraints.backendRestartAllowed === false &&
    snapshot.runnerConstraints.sourceMutationAllowed === false &&
    snapshot.runnerConstraints.databaseWriteAllowed === false &&
    snapshot.runnerConstraints.providerCallAllowed === false &&
    snapshot.runnerConstraints.walletMutationAllowed === false &&
    snapshot.runnerConstraints.paymentAuthorizationAllowed === false &&
    snapshot.runnerConstraints.monthlyPayoutAllowed === false &&
    snapshot.runnerConstraints.moneyMovementAllowed === false &&
    snapshot.runnerConstraints.fakeSuccessAllowed === false;

  const ready =
    snapshot.status === "controlled_authenticated_admin_get_smoke_runner_package_approved_unwritten" &&
    snapshot.previousEvidence.tokenReadinessReviewStage === "BACKEND-STREAM-FOUNDATION-140M" &&
    snapshot.previousEvidence.protectedAdminWithoutTokenVerified === true &&
    snapshot.previousEvidence.healthMarkerVerified === true &&
    targetsReady &&
    constraintsReady &&
    snapshot.blockingItems.length === 0;

  return {
    version: snapshot.version,
    stage: snapshot.stage,
    ready,
    status: ready ? "controlled_authenticated_admin_get_smoke_approval_ready" : "controlled_authenticated_admin_get_smoke_approval_blocked",
    targetCount: snapshot.authenticatedSmokeTargets.length,
    blockingItems: snapshot.blockingItems,
    nextRecommendedStage: snapshot.nextRecommendedStage,
  } as const;
}
