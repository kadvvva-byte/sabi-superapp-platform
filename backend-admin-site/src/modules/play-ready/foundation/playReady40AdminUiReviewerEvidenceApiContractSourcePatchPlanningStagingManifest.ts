import { playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning } from "./play-ready-40-admin-ui-reviewer-evidence-api-contract-source-patch-planning/playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning";

export const playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanningStagingManifest = {
  version: "PLAY-READY-40",
  createdFor: "Admin UI reviewer evidence API contract and source patch planning",
  sourceOnlyPlanning: true,
  changedFilesExpected: [
    "src/modules/play-ready/foundation/play-ready-40-admin-ui-reviewer-evidence-api-contract-source-patch-planning/index.ts",
    "src/modules/play-ready/foundation/play-ready-40-admin-ui-reviewer-evidence-api-contract-source-patch-planning/playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning.ts",
    "src/modules/play-ready/foundation/playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanningStagingManifest.ts"
  ],
  adminUiPatchTargetsPlannedOnly: [
    "admin-ui/src/api.ts",
    "admin-ui/src/types.ts",
    "admin-ui/src/App.tsx",
    "admin-ui/src/styles.css"
  ],
  adminUiSourceWritePerformed: false,
  adminUiBuildPerformed: false,
  backendSourceWriteOutsidePlanning: false,
  backendRestartPerformed: false,
  runtimeDbWritePerformed: false,
  providerCallPerformed: false,
  walletStateChangePerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessPerformed: false,
  apkBuildPerformed: false,
  aabBuildPerformed: false,
  playUploadPerformed: false,
  planning: playReady40AdminUiReviewerEvidenceApiContractSourcePatchPlanning
} as const;
