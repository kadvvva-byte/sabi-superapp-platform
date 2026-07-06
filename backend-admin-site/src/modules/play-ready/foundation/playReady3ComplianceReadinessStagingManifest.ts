import { getPlayReady3ComplianceReadiness } from "./play-ready-3-compliance-readiness";

export const PLAY_READY_3_COMPLIANCE_READINESS_STAGING_MANIFEST = {
  version: "PLAY-READY-3",
  stage: "controlled_privacy_data_safety_account_deletion_permissions_ai_reporting_ugc_readiness_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-3-compliance-readiness/**",
  covers: [
    "Privacy Policy",
    "Data Safety",
    "Account deletion",
    "Permissions",
    "AI reporting",
    "UGC moderation/report/block",
    "Financial features",
    "NFT/tokenized digital assets",
    "Virtual card readiness",
    "Google Play Billing vs Wallet separation",
  ],
  implementationDoneNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  nextStage: "PLAY-READY-4",
  readiness: getPlayReady3ComplianceReadiness(),
} as const;
