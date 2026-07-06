import { getPlayReady1GlobalLaunchAuditReadiness } from "./play-ready-1-global-launch-audit";

export const PLAY_READY_1_GLOBAL_LAUNCH_AUDIT_STAGING_MANIFEST = {
  version: "PLAY-READY-1",
  stage: "controlled_google_play_and_global_launch_readiness_audit_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-1-global-launch-audit/**",
  positioning: "Sabi AI-first Global SuperApp",
  nextStage: "PLAY-READY-2",
  sourceTargetWriteAllowedNow: false,
  backendRestartAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowedNow: false,
  readiness: getPlayReady1GlobalLaunchAuditReadiness(),
} as const;
