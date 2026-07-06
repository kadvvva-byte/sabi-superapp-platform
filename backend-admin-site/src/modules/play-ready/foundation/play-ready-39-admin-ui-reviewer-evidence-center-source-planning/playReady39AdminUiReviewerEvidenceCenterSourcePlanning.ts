export type PlayReady39AdminUiReviewerEvidenceCenterStatus =
  | "source_planning_ready"
  | "blocked_until_manual_ui_patch"
  | "external_production_readiness_required";

export type PlayReady39AdminUiEvidencePanel = {
  readonly id: string;
  readonly title: string;
  readonly sourceRoute: string;
  readonly method: "GET";
  readonly requiresAdminAuth: true;
  readonly readOnly: true;
  readonly plannedUiPlacement: string;
  readonly manualEvidenceRequired: boolean;
};

export const playReady39AdminUiReviewerEvidenceCenterSourcePlanning = {
  version: "PLAY-READY-39",
  mode: "admin_ui_reviewer_evidence_center_source_planning",
  status: "source_planning_ready" as PlayReady39AdminUiReviewerEvidenceCenterStatus,
  sourceOnly: true,
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
  verifiedBackendRouteBasePath: "/api/admin/play-ready/reviewer-evidence",
  verifiedByPriorStage: "PLAY-READY-38",
  plannedPanels: [
    {
      id: "summary",
      title: "Reviewer evidence summary",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/summary",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: false
    },
    {
      id: "categories",
      title: "Evidence categories",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/categories",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: false
    },
    {
      id: "manual_screenshots",
      title: "Manual screenshot checklist",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: true
    },
    {
      id: "permission_declarations",
      title: "Permission declaration checklist",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: true
    },
    {
      id: "production_readiness_blockers",
      title: "Production readiness blockers",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: true
    },
    {
      id: "safety_status",
      title: "Reviewer evidence route safety status",
      sourceRoute: "/api/admin/play-ready/reviewer-evidence/safety-status",
      method: "GET",
      requiresAdminAuth: true,
      readOnly: true,
      plannedUiPlacement: "Admin Play readiness / reviewer evidence center",
      manualEvidenceRequired: false
    }
  ] satisfies readonly PlayReady39AdminUiEvidencePanel[],
  adminUiImplementationRules: [
    "Use existing Admin authentication and API client patterns only.",
    "Use GET-only read-only reviewer evidence endpoints.",
    "Do not add provider calls, DB writes, Wallet state changes, payment actions, APK/AAB build, Play upload, or fake success.",
    "Show external readiness blockers honestly: HTTPS production env, package id decision, manual screenshots, and Play Console declarations.",
    "Keep reviewer token values out of UI logs and reports.",
    "Do not expose raw secrets or provider credentials."
  ],
  nextStageRequiresSeparateApproval: true,
  plannedNextStage: "PLAY-READY-40 Admin UI reviewer evidence API contract/source patch planning"
} as const;

export function getPlayReady39AdminUiReviewerEvidenceCenterSourcePlanning() {
  return playReady39AdminUiReviewerEvidenceCenterSourcePlanning;
}
