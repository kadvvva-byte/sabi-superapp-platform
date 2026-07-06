import { PLAY_READY_28_ADMIN_API_CONTRACT_SUMMARY } from "./play-ready-28-reviewer-evidence-center-admin-api-contract-planning";

export const PLAY_READY_28_REVIEWER_EVIDENCE_CENTER_ADMIN_API_CONTRACT_PLANNING_STAGING_MANIFEST = {
  version: "PLAY-READY-28",
  mode: "reviewer_evidence_center_admin_api_contract_planning_source_only",
  dependsOn: ["PLAY-READY-26", "PLAY-READY-27"],
  summary: PLAY_READY_28_ADMIN_API_CONTRACT_SUMMARY,
  changedFiles: [
    "src/modules/play-ready/foundation/play-ready-28-reviewer-evidence-center-admin-api-contract-planning/index.ts",
    "src/modules/play-ready/foundation/play-ready-28-reviewer-evidence-center-admin-api-contract-planning/playReady28ReviewerEvidenceCenterAdminApiContractPlanning.ts",
    "src/modules/play-ready/foundation/playReady28ReviewerEvidenceCenterAdminApiContractPlanningStagingManifest.ts",
  ],
  safety: {
    sourceOnly: true,
    adminUiBuild: false,
    backendRestart: false,
    runtimeRouteMount: false,
    databaseWrite: false,
    externalProviderExecution: false,
    financialRuntimeMutation: false,
    playStoreSubmission: false,
    mobileRootChange: false,
  },
  nextRecommendedStage: "PLAY-READY-29 source-only reviewer evidence center Admin route planning",
} as const;
