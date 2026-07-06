import { getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot } from "./streamFoundationPreviewRouteIdCorrectionApprovalPackage";
import { getStreamFoundationPreviewRouteIdCorrectionApprovalPackageReadiness } from "./streamFoundationPreviewRouteIdCorrectionApprovalPackageReadiness";

export function runStreamFoundationPreviewRouteIdCorrectionApprovalPackageSmoke() {
  const snapshot = getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot();
  const readiness = getStreamFoundationPreviewRouteIdCorrectionApprovalPackageReadiness();

  const assertions = [
    {
      id: "evidence_partial_success_locked",
      passed: snapshot.evidence.readinessBearerStatus === 200 && snapshot.evidence.previewBearerStatus === 403,
      evidence: JSON.stringify(snapshot.evidence),
    },
    {
      id: "routeid_mismatch_locked",
      passed:
        snapshot.evidence.currentAppPreviewRouteId === "stream_kernel_diagnostics_snapshot" &&
        snapshot.evidence.expectedFoundationPreviewRouteId === "stream_foundation_preview",
      evidence: JSON.stringify(snapshot.evidence),
    },
    {
      id: "one_line_app_ts_only_plan",
      passed:
        snapshot.patchPlan.plannedFile === "src/app.ts" &&
        snapshot.patchPlan.oneLineOnly === true &&
        snapshot.patchPlan.serverTsChangeAllowed === false &&
        snapshot.patchPlan.streamIndexChangeAllowed === false,
      evidence: JSON.stringify(snapshot.patchPlan),
    },
    {
      id: "no_runtime_money_provider_wallet_plan",
      passed:
        snapshot.patchPlan.backendRestartByPatchAllowed === false &&
        snapshot.patchPlan.runtimeHttpSmokeByPatchAllowed === false &&
        snapshot.patchPlan.databaseWriteAllowed === false &&
        snapshot.patchPlan.providerCallAllowed === false &&
        snapshot.patchPlan.walletMutationAllowed === false &&
        snapshot.patchPlan.paymentAuthorizationAllowed === false &&
        snapshot.patchPlan.monthlyPayoutAllowed === false &&
        snapshot.patchPlan.moneyMovementAllowed === false &&
        snapshot.patchPlan.fakeSuccessAllowed === false,
      evidence: JSON.stringify(snapshot.patchPlan),
    },
    {
      id: "approval_still_required",
      passed: snapshot.approvalRequired === true && snapshot.approvedNow === false,
      evidence: snapshot.status,
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
    stage: "preview_routeid_correction_approval_source_only_smoke",
    ok: failedAssertions.length === 0,
    status: failedAssertions.length === 0 ? "preview_routeid_correction_approval_package_smoke_passed" : "preview_routeid_correction_approval_package_smoke_blocked",
    assertions,
    failedAssertions,
    nextStageRequiresExactApproval: snapshot.patchPlan.plannedStage,
  } as const;
}
