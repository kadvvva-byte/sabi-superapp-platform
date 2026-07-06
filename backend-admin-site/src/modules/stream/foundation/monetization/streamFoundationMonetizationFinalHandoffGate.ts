import { getStreamFoundationMonetizationFinalReadinessSnapshot } from "./streamFoundationMonetizationFinalReadinessGate";

export const STREAM_FOUNDATION_MONETIZATION_FINAL_HANDOFF_GATE_STAGE = "BACKEND_STREAM_FOUNDATION_136Z_MONETIZATION_FINAL_HANDOFF_GATE_STAGING" as const;

export type StreamFoundationMonetizationFinalHandoffDecision = Readonly<{
  stage: typeof STREAM_FOUNDATION_MONETIZATION_FINAL_HANDOFF_GATE_STAGE;
  decisionCode:
    | "stream_monetization_foundation_ready_for_server_install_planning"
    | "stream_monetization_foundation_blocked_review_required";
  installToServerAllowedNow: false;
  routeMountAllowedNow: false;
  realMoneyExecutionAllowedNow: false;
  adminProviderKeyEntryAllowedAfterServerInstall: boolean;
  giftExecutionAllowedAfterProviderWalletDbApproval: boolean;
  monthlyPayoutExecutionAllowedAfterMonthlyBatchApproval: boolean;
  message: string;
}>;

export function getStreamFoundationMonetizationFinalHandoffDecision(): StreamFoundationMonetizationFinalHandoffDecision {
  const readiness = getStreamFoundationMonetizationFinalReadinessSnapshot();
  const ready = readiness.executionGates.readyForServerInstallAfterOwnerApproval;
  return {
    stage: STREAM_FOUNDATION_MONETIZATION_FINAL_HANDOFF_GATE_STAGE,
    decisionCode: ready
      ? "stream_monetization_foundation_ready_for_server_install_planning"
      : "stream_monetization_foundation_blocked_review_required",
    installToServerAllowedNow: false,
    routeMountAllowedNow: false,
    realMoneyExecutionAllowedNow: false,
    adminProviderKeyEntryAllowedAfterServerInstall: ready,
    giftExecutionAllowedAfterProviderWalletDbApproval: ready,
    monthlyPayoutExecutionAllowedAfterMonthlyBatchApproval: ready,
    message: ready
      ? "Stream monetization foundation is ready as a local staging handoff. Server install, route mount, DB adapters, provider adapters and real money execution still require separate owner-approved stages."
      : "Stream monetization foundation remains blocked until all readiness gates pass. No server install, route mount, provider call or money movement is allowed from staging.",
  };
}

export const STREAM_FOUNDATION_MONETIZATION_FINAL_HANDOFF_DECISION = getStreamFoundationMonetizationFinalHandoffDecision();
