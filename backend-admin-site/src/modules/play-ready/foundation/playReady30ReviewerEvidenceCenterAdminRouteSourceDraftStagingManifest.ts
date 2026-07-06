import { PLAY_READY_30_ROUTE_SOURCE_DRAFT } from "./play-ready-30-reviewer-evidence-center-admin-route-source-draft";

export const PLAY_READY_30_REVIEWER_EVIDENCE_CENTER_ADMIN_ROUTE_SOURCE_DRAFT_STAGING_MANIFEST = {
  version: "PLAY-READY-30",
  stage: "reviewer_evidence_center_admin_route_source_draft_no_mount_source_only",
  sourceOnly: true,
  runtimeMounted: false,
  routeMountedInApp: false,
  backendRestartRequiredNow: false,
  adminUiBuildRequiredNow: false,
  routeCount: PLAY_READY_30_ROUTE_SOURCE_DRAFT.routes.length,
  methods: ["GET"],
  requiresAdminAuth: true,
  readOnly: true,
  changedFiles: [
    "src/modules/play-ready/foundation/play-ready-30-reviewer-evidence-center-admin-route-source-draft/index.ts",
    "src/modules/play-ready/foundation/play-ready-30-reviewer-evidence-center-admin-route-source-draft/playReady30ReviewerEvidenceCenterAdminRouteSourceDraft.ts",
    "src/modules/play-ready/foundation/playReady30ReviewerEvidenceCenterAdminRouteSourceDraftStagingManifest.ts",
  ],
  nextRecommendedStage: "PLAY-READY-31 compile/safety verification for Admin route source draft, no runtime mount",
} as const;
