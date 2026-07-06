export const PLAY_READY_26_REVIEWER_EVIDENCE_REGISTRY_CONTRACT_STAGING_MANIFEST = {
  version: "PLAY-READY-26",
  stage: "reviewer_evidence_registry_contract_source_only",
  sourceOnly: true,
  createdFor: [
    "privacy/account deletion",
    "UGC report/block/moderation",
    "AI report/flag",
    "provider_not_configured/no fake success",
    "billing/wallet separation",
    "financial disclosures",
    "reviewer access notes",
    "sensitive permissions",
    "HTTPS production readiness"
  ],
  writesAllowed: [
    "src/modules/play-ready/foundation/play-ready-26-reviewer-evidence-registry-contract/index.ts",
    "src/modules/play-ready/foundation/play-ready-26-reviewer-evidence-registry-contract/playReady26ReviewerEvidenceRegistryContract.ts",
    "src/modules/play-ready/foundation/playReady26ReviewerEvidenceRegistryContractStagingManifest.ts"
  ],
  forbiddenNow: [
    "Admin UI build",
    "backend restart",
    "DB write",
    "provider call",
    "Play upload",
    "APK/AAB build",
    "wallet mutation",
    "money movement",
    "runtime route mount"
  ],
  nextRecommendedStage: "PLAY-READY-27 source-only reviewer evidence center service planning"
} as const;
