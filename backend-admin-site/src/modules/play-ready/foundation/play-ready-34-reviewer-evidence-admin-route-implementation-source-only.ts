export const PLAY_READY_34_VERSION = "PLAY-READY-34" as const;

export type PlayReady34ReviewerEvidenceRouteId =
  | "summary"
  | "categories"
  | "category_detail"
  | "item_detail"
  | "reviewer_access_notes"
  | "permission_declarations"
  | "manual_screenshot_checklist"
  | "production_readiness_blockers"
  | "export_draft"
  | "safety_status";

export type PlayReady34ReviewerEvidenceAdminRoute = {
  id: PlayReady34ReviewerEvidenceRouteId;
  method: "GET";
  plannedPath: string;
  requiresAdminAuth: true;
  readOnly: true;
  runtimeRouteMounted: false;
  routeMountedInApp: false;
  actualExpressRouterMounted: false;
  responseModel: string;
  sourceEvidenceOnly: true;
};

export type PlayReady34ReviewerEvidenceAdminRouteImplementationSourceOnly = {
  version: typeof PLAY_READY_34_VERSION;
  mode: "controlled_reviewer_evidence_admin_route_source_implementation_source_only";
  routeImplementationFileOnly: true;
  plannedRoutes: 10;
  methods: readonly ["GET"];
  requiresAdminAuth: true;
  readOnly: true;
  runtimeRouteMounted: false;
  routeMountedInApp: false;
  actualExpressRouterMounted: false;
  appTsWritePerformed: false;
  appTsWriteAllowedNow: false;
  backendRestartPerformed: false;
  backendRestartAllowedNow: false;
  adminUiBuildPerformed: false;
  adminUiBuildAllowedNow: false;
  runtimeDbWritePerformed: false;
  providerExecutionPerformed: false;
  walletStateChangePerformed: false;
  moneyMovementPerformed: false;
  fakeSuccessPerformed: false;
  routes: PlayReady34ReviewerEvidenceAdminRoute[];
  safetyNotes: string[];
};

export const playReady34ReviewerEvidenceAdminRoutesSourceOnly: readonly PlayReady34ReviewerEvidenceAdminRoute[] = [
  {
    id: "summary",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/summary",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceSummaryResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "categories",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/categories",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceCategoriesResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "category_detail",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/categories/:categoryId",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceCategoryDetailResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "item_detail",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/items/:itemId",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceItemDetailResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "reviewer_access_notes",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/reviewer-access-notes",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerAccessNotesResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "permission_declarations",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyPermissionDeclarationsResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "manual_screenshot_checklist",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyManualScreenshotChecklistResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "production_readiness_blockers",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyProductionReadinessBlockersResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "export_draft",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/export-draft",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceExportDraftResponse",
    sourceEvidenceOnly: true
  },
  {
    id: "safety_status",
    method: "GET",
    plannedPath: "/api/admin/play-ready/reviewer-evidence/safety-status",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeRouteMounted: false,
    routeMountedInApp: false,
    actualExpressRouterMounted: false,
    responseModel: "PlayReadyReviewerEvidenceSafetyStatusResponse",
    sourceEvidenceOnly: true
  }
] as const;

export const playReady34ReviewerEvidenceAdminRouteImplementationSourceOnly: PlayReady34ReviewerEvidenceAdminRouteImplementationSourceOnly = {
  version: PLAY_READY_34_VERSION,
  mode: "controlled_reviewer_evidence_admin_route_source_implementation_source_only",
  routeImplementationFileOnly: true,
  plannedRoutes: 10,
  methods: ["GET"],
  requiresAdminAuth: true,
  readOnly: true,
  runtimeRouteMounted: false,
  routeMountedInApp: false,
  actualExpressRouterMounted: false,
  appTsWritePerformed: false,
  appTsWriteAllowedNow: false,
  backendRestartPerformed: false,
  backendRestartAllowedNow: false,
  adminUiBuildPerformed: false,
  adminUiBuildAllowedNow: false,
  runtimeDbWritePerformed: false,
  providerExecutionPerformed: false,
  walletStateChangePerformed: false,
  moneyMovementPerformed: false,
  fakeSuccessPerformed: false,
  routes: [...playReady34ReviewerEvidenceAdminRoutesSourceOnly],
  safetyNotes: [
    "This file is source-only route implementation planning and is not mounted in src/app.ts.",
    "All planned routes are GET-only, Admin-auth required, and read-only.",
    "The implementation uses source evidence only and performs no DB write.",
    "No provider execution, Wallet state change, money movement, or fake success is allowed.",
    "A later controlled route mount stage requires separate owner approval."
  ]
};

export function getPlayReady34ReviewerEvidenceAdminRouteImplementationSourceOnly() {
  return playReady34ReviewerEvidenceAdminRouteImplementationSourceOnly;
}
