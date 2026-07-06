import { getPlayReady9Readiness } from "./play-ready-9-ai-report-flag-patch-review";

export const PLAY_READY_9_AI_REPORT_FLAG_PATCH_REVIEW_STAGING_MANIFEST = {
  version: "PLAY-READY-9",
  stage: "controlled_ai_report_and_flag_gate_target_patch_review_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-9-ai-report-flag-patch-review/**",
  targetReviewCovers: [
    "AI response report/flag action",
    "AI report reasons",
    "provider_not_configured copy",
    "AI report intake planning",
    "admin/reviewer evidence references",
    "no fake AI provider success",
  ],
  targetFilesModifiedNow: false,
  backendRestartNow: false,
  runtimeDbWriteNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  noFakeAiProviderSuccess: true,
  nextStage: "PLAY-READY-10",
  readiness: getPlayReady9Readiness(),
} as const;
