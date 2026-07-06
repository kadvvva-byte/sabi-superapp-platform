export type PlayReady43RuntimeSmokeTarget =
  | "backend_reviewer_evidence_routes"
  | "admin_ui_dev_or_preview_server"
  | "admin_ui_reviewer_evidence_panel"
  | "admin_ui_network_requests"
  | "manual_visual_review";

export const playReady43AdminUiReviewerEvidenceRuntimeVisualSmokeVerificationPlanning = {
  version: "PLAY-READY-43",
  mode: "admin_ui_reviewer_evidence_runtime_visual_smoke_verification_planning",
  sourceOnlyPlanning: true,
  verifiedByPriorStage: "PLAY-READY-42-FIX1",
  adminUiBuildVerified: true,
  adminUiDistExpected: true,
  adminUiRuntimeSmokeExecutedNow: false,
  browserVisualVerificationExecutedNow: false,
  sourceWritePerformed: false,
  adminUiSourceWritePerformed: false,
  backendSourceWritePerformed: false,
  backendRestartPerformed: false,
  runtimeDbWritePerformed: false,
  providerCallPerformed: false,
  walletStateChangePerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessPerformed: false,
  apkBuildPerformed: false,
  aabBuildPerformed: false,
  playUploadPerformed: false,
  plannedRuntimeTargets: [
    {
      id: "backend_reviewer_evidence_routes",
      requirement: "Backend must stay reachable at the provided BackendBaseUrl and reviewer evidence routes must remain protected and read-only.",
      expected: "Unauthenticated GET returns 401 or 403; authenticated GET returns 200 with readOnly true and all unsafe flags false."
    },
    {
      id: "admin_ui_dev_or_preview_server",
      requirement: "Admin UI dev or preview server may be started only by explicit command in the next stage.",
      expected: "Server responds with HTML shell without exposing Admin token or secrets."
    },
    {
      id: "admin_ui_reviewer_evidence_panel",
      requirement: "Reviewer evidence source block is visible or ready for controlled UI wiring without write controls.",
      expected: "Display-only evidence center, no approve/reject/write/payment/provider actions."
    },
    {
      id: "admin_ui_network_requests",
      requirement: "Admin UI requests only GET reviewer evidence endpoints.",
      expected: "No POST, PUT, PATCH, DELETE, provider calls, Wallet state changes, or money movement."
    },
    {
      id: "manual_visual_review",
      requirement: "Capture or inspect visible Admin UI state if browser tooling is available.",
      expected: "Show reviewer evidence information and production blockers honestly."
    }
  ] as const,
  exactOwnerApprovalRequiredForNextStage: "I approve PLAY-READY-44 Admin UI reviewer evidence runtime visual/smoke verification, Admin UI dev or preview server run allowed only if command is provided, browser/runtime smoke allowed, no source write, no backend source write, no backend restart, no DB write, no provider call, no Wallet state change, no money movement, no fake success, no APK/AAB build, no Play upload.",
  plannedNextStage: "PLAY-READY-44"
} as const;

export function getPlayReady43AdminUiReviewerEvidenceRuntimeVisualSmokeVerificationPlanning() {
  return playReady43AdminUiReviewerEvidenceRuntimeVisualSmokeVerificationPlanning;
}
