import {
  STREAM_FOUNDATION_140P_PREVIEW_ROUTEID_CORRECTION_APPROVAL_VERSION,
  type StreamFoundation140PApprovalSnapshot,
} from "./streamFoundationPreviewRouteIdCorrectionApprovalPackageContracts";

export function getStreamFoundationPreviewRouteIdCorrectionApprovalPackageSnapshot(): StreamFoundation140PApprovalSnapshot {
  return {
    version: STREAM_FOUNDATION_140P_PREVIEW_ROUTEID_CORRECTION_APPROVAL_VERSION,
    stage: "preview_routeid_correction_approval_source_only",
    status: "controlled_app_ts_one_line_patch_requires_exact_owner_approval",
    evidence: {
      readinessBearerStatus: 200,
      previewBearerStatus: 403,
      currentAppPreviewRouteId: "stream_kernel_diagnostics_snapshot",
      expectedFoundationPreviewRouteId: "stream_foundation_preview",
      authHeaderConfirmed: "Authorization: Bearer",
      tokenStorageAllowed: false,
    },
    patchPlan: {
      plannedStage: "BACKEND-STREAM-FOUNDATION-140Q",
      plannedFile: "src/app.ts",
      plannedLinePurpose: "preview route handler routeId argument only",
      currentLine: "const envelope = streamDiagnosticsHandler({ routeId: \"stream_kernel_diagnostics_snapshot\" });",
      replacementLine: "const envelope = streamDiagnosticsHandler({ routeId: \"stream_foundation_preview\" });",
      oneLineOnly: true,
      serverTsChangeAllowed: false,
      streamIndexChangeAllowed: false,
      backendRestartByPatchAllowed: false,
      runtimeHttpSmokeByPatchAllowed: false,
      databaseWriteAllowed: false,
      providerCallAllowed: false,
      walletMutationAllowed: false,
      paymentAuthorizationAllowed: false,
      monthlyPayoutAllowed: false,
      moneyMovementAllowed: false,
      fakeSuccessAllowed: false,
    },
    approvalRequired: true,
    approvedNow: false,
  };
}
