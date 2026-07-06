import { getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot } from "./streamFoundationPreviewRouteIdCorrectionApprovalPackage";

export function getStreamFoundationPreviewRouteIdCorrectionApprovalPackageReadiness() {
  const snapshot = getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot();

  const evidenceReady =
    snapshot.evidence.readinessBearerStatus === 200 &&
    snapshot.evidence.previewBearerStatus === 403 &&
    snapshot.evidence.currentAppPreviewRouteId === "stream_kernel_diagnostics_snapshot" &&
    snapshot.evidence.expectedFoundationPreviewRouteId === "stream_foundation_preview" &&
    snapshot.evidence.authHeaderConfirmed === "Authorization: Bearer" &&
    snapshot.evidence.tokenStorageAllowed === false;

  const patchPlanSafe =
    snapshot.patchPlan.plannedFile === "src/app.ts" &&
    snapshot.patchPlan.oneLineOnly === true &&
    snapshot.patchPlan.serverTsChangeAllowed === false &&
    snapshot.patchPlan.streamIndexChangeAllowed === false &&
    snapshot.patchPlan.backendRestartByPatchAllowed === false &&
    snapshot.patchPlan.runtimeHttpSmokeByPatchAllowed === false &&
    snapshot.patchPlan.databaseWriteAllowed === false &&
    snapshot.patchPlan.providerCallAllowed === false &&
    snapshot.patchPlan.walletMutationAllowed === false &&
    snapshot.patchPlan.paymentAuthorizationAllowed === false &&
    snapshot.patchPlan.monthlyPayoutAllowed === false &&
    snapshot.patchPlan.moneyMovementAllowed === false &&
    snapshot.patchPlan.fakeSuccessAllowed === false;

  const ready = evidenceReady && patchPlanSafe && snapshot.approvalRequired === true && snapshot.approvedNow === false;

  return {
    version: snapshot.version,
    ready,
    status: ready ? "preview_routeid_correction_approval_ready" : "preview_routeid_correction_approval_blocked",
    plannedStage: snapshot.patchPlan.plannedStage,
    requiresExactOwnerApproval: snapshot.approvalRequired,
  } as const;
}
