import { getPlayReady5Readiness } from "./play-ready-5-compliance-gate-planning";

export const PLAY_READY_5_COMPLIANCE_GATE_PLANNING_STAGING_MANIFEST = {
  version: "PLAY-READY-5",
  stage: "controlled_app_side_compliance_gate_implementation_planning_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-5-compliance-gate-planning/**",
  plannedGates: [
    "privacy_policy_link_gate",
    "account_deletion_gate",
    "ai_report_flag_gate",
    "ugc_report_block_gate",
    "permission_rationale_gate",
    "provider_not_configured_gate",
    "billing_vs_wallet_separation_gate",
    "financial_features_gate",
    "target_sdk_aab_release_gate",
    "reviewer_evidence_gate",
  ],
  implementationDoneNow: false,
  targetDetectionDoneNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  nextStage: "PLAY-READY-6",
  readiness: getPlayReady5Readiness(),
} as const;
