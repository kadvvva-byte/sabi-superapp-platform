import {
  STREAM_FOUNDATION_141D_ROUTE_BINDING_PATCH_DRAFT_REVIEW_VERSION,
  type StreamFoundation141DPatchDraftReviewItem,
  type StreamFoundation141DPatchDraftReviewSnapshot,
  type StreamFoundation141DRouteId,
} from "./streamFoundationControlledRouteBindingPatchDraftReviewContracts";

function item(
  routeId: StreamFoundation141DRouteId,
  plannedPath: string,
  plannedHandlerExport: string,
): StreamFoundation141DPatchDraftReviewItem {
  return {
    routeId,
    plannedPath,
    plannedMethod: "POST",
    plannedHandlerExport,
    draftTarget: "src/app.ts",
    draftReviewReady: true,
    actualTargetWriteNow: false,
    routeMountNow: false,
    runtimePostNow: false,
    backendRestartNow: false,
    databaseWriteNow: false,
    providerCallNow: false,
    walletMutationNow: false,
    paymentAuthorizationNow: false,
    monthlyPayoutNow: false,
    moneyMovementNow: false,
    fakeSuccessNow: false,
    reviewNotes: [
      "Draft review only; no target source write in this stage.",
      "Future runtime binding must keep handler returning controlled 423 blocked envelope until separate runtime approval.",
      "No database/provider/Wallet/payment/payout/money movement may be introduced by this draft.",
      "No fake live success may be returned.",
    ],
  };
}

const DRAFT_REVIEW_ITEMS: readonly StreamFoundation141DPatchDraftReviewItem[] = [
  item("stream_live_start", "/api/stream/live/start", "handleStreamFoundationLiveStartSourceOnlyDraft"),
  item("stream_live_stop", "/api/stream/live/stop", "handleStreamFoundationLiveStopSourceOnlyDraft"),
  item("stream_live_heartbeat", "/api/stream/live/heartbeat", "handleStreamFoundationLiveHeartbeatSourceOnlyDraft"),
];

export function getStreamFoundationControlledRouteBindingPatchDraftReviewSnapshot(): StreamFoundation141DPatchDraftReviewSnapshot {
  return {
    version: STREAM_FOUNDATION_141D_ROUTE_BINDING_PATCH_DRAFT_REVIEW_VERSION,
    stage: "controlled_source_only_route_binding_patch_draft_review",
    status: "patch_draft_review_ready_no_target_write_no_mount",
    previousStage: "BACKEND-STREAM-FOUNDATION-141C",
    approvalPackageReady: true,
    draftReviewItems: DRAFT_REVIEW_ITEMS,
    totals: {
      draftReviewItems: 3,
      actualTargetWritesNow: 0,
      routeMountNow: 0,
      runtimePostNow: 0,
      backendRestartNow: 0,
      databaseWriteNow: 0,
      providerCallNow: 0,
      walletMutationNow: 0,
      moneyMovementNow: 0,
      fakeSuccessNow: 0,
    },
    safety: {
      sourceOnly: true,
      appTsChange: false,
      serverTsChange: false,
      streamIndexChange: false,
      routeMountNow: false,
      runtimeHttpBy141D: false,
      runtimePostBy141D: false,
      backendRestart: false,
      databaseWrite: false,
      providerCall: false,
      walletMutation: false,
      paymentAuthorization: false,
      monthlyPayout: false,
      moneyMovement: false,
      fakeSuccess: false,
    },
  };
}
