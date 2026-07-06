import { PLAY_READY_28_ADMIN_API_CONTRACT_PLAN } from "../play-ready-28-reviewer-evidence-center-admin-api-contract-planning";
import { PLAY_READY_29_ADMIN_ROUTE_PLAN } from "../play-ready-29-reviewer-evidence-center-admin-route-planning";

export const PLAY_READY_30_VERSION = "PLAY-READY-30" as const;

export const PLAY_READY_30_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-30 reviewer evidence center Admin route source draft source-only, no runtime mount, no backend restart, no DB write, no provider call, no Wallet mutation, no money movement, no fake success, no Admin UI build." as const;

export type PlayReady30RouteCategory =
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

export type PlayReady30RouteDraft = {
  readonly id: string;
  readonly category: PlayReady30RouteCategory;
  readonly method: "GET";
  readonly path: string;
  readonly auth: "admin_required";
  readonly readOnly: true;
  readonly runtimeMounted: false;
  readonly routeFileDraftOnly: true;
  readonly responseModel: string;
  readonly purpose: string;
  readonly safetyGuards: readonly string[];
};

export type PlayReady30RouteSourceDraft = {
  readonly version: typeof PLAY_READY_30_VERSION;
  readonly sourceOnly: true;
  readonly runtimeMounted: false;
  readonly routeMountedInApp: false;
  readonly backendRestartRequiredNow: false;
  readonly adminUiBuildRequiredNow: false;
  readonly routes: readonly PlayReady30RouteDraft[];
  readonly mountPlanForLater: {
    readonly allowedLaterTarget: "protected_admin_router_only";
    readonly mustRemainGetOnly: true;
    readonly mustRequireAdminAuth: true;
    readonly mustRemainReadOnly: true;
    readonly forbiddenUntilSeparateApproval: readonly string[];
  };
};

const commonSafetyGuards = [
  "admin auth required before any response",
  "GET only",
  "read-only response model",
  "no database mutation",
  "no provider call",
  "no wallet mutation",
  "no money movement",
  "no fake success",
  "no Play upload",
  "no APK or AAB build",
] as const;

export const PLAY_READY_30_ROUTE_SOURCE_DRAFT: PlayReady30RouteSourceDraft = {
  version: PLAY_READY_30_VERSION,
  sourceOnly: true,
  runtimeMounted: false,
  routeMountedInApp: false,
  backendRestartRequiredNow: false,
  adminUiBuildRequiredNow: false,
  routes: [
    {
      id: "reviewer_evidence_summary_get",
      category: "summary",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/summary",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceSummaryResponse",
      purpose: "Return reviewer evidence center summary across all Play-ready categories.",
      safetyGuards: commonSafetyGuards,
    },
    {
      id: "reviewer_evidence_categories_get",
      category: "categories",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/categories",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceCategoryListResponse",
      purpose: "Return the nine reviewer evidence categories and their readiness states.",
      safetyGuards: commonSafetyGuards,
    },
    {
      id: "reviewer_evidence_category_detail_get",
      category: "category_detail",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/categories/:categoryId",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceCategoryDetailResponse",
      purpose: "Return category-specific reviewer evidence, declarations, and manual checks.",
      safetyGuards: commonSafetyGuards,
    },
    {
      id: "reviewer_evidence_item_detail_get",
      category: "item_detail",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/items/:itemId",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceItemDetailResponse",
      purpose: "Return a single reviewer evidence item and its support paths.",
      safetyGuards: commonSafetyGuards,
    },
    {
      id: "reviewer_access_notes_get",
      category: "reviewer_access_notes",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/reviewer-access-notes",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerAccessNotesResponse",
      purpose: "Return reviewer access notes draft without exposing secrets or credentials.",
      safetyGuards: [...commonSafetyGuards, "no raw password or API key in response"],
    },
    {
      id: "permission_declarations_get",
      category: "permission_declarations",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyPermissionDeclarationDraftResponse",
      purpose: "Return sensitive permission declaration draft for Play Console review.",
      safetyGuards: commonSafetyGuards,
    },
    {
      id: "manual_screenshot_checklist_get",
      category: "manual_screenshot_checklist",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/manual-screenshot-checklist",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyManualScreenshotChecklistResponse",
      purpose: "Return manual screenshot checklist for reviewer evidence capture.",
      safetyGuards: [...commonSafetyGuards, "no automated screenshot capture in this stage"],
    },
    {
      id: "production_readiness_blockers_get",
      category: "production_readiness_blockers",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyProductionReadinessBlockerResponse",
      purpose: "Return HTTPS, cleartext, production environment, and package-id warnings honestly.",
      safetyGuards: [...commonSafetyGuards, "do not convert blocker into success"],
    },
    {
      id: "reviewer_evidence_export_draft_get",
      category: "export_draft",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/export-draft",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceExportDraftResponse",
      purpose: "Return a safe export draft for manual reviewer preparation.",
      safetyGuards: [...commonSafetyGuards, "no secret value export"],
    },
    {
      id: "reviewer_evidence_safety_status_get",
      category: "safety_status",
      method: "GET",
      path: "/api/admin/play-ready/reviewer-evidence/safety-status",
      auth: "admin_required",
      readOnly: true,
      runtimeMounted: false,
      routeFileDraftOnly: true,
      responseModel: "PlayReadyReviewerEvidenceSafetyStatusResponse",
      purpose: "Return route safety status, runtime mount status, and no-mutation proof.",
      safetyGuards: commonSafetyGuards,
    },
  ],
  mountPlanForLater: {
    allowedLaterTarget: "protected_admin_router_only",
    mustRemainGetOnly: true,
    mustRequireAdminAuth: true,
    mustRemainReadOnly: true,
    forbiddenUntilSeparateApproval: [
      "runtime route mount",
      "backend restart",
      "Admin UI panel build",
      "database writes",
      "provider calls",
      "wallet mutations",
      "money movement",
      "fake success states",
    ],
  },
};

export function getPlayReady30RouteSourceDraft(): PlayReady30RouteSourceDraft {
  return PLAY_READY_30_ROUTE_SOURCE_DRAFT;
}

export function getPlayReady30RouteDraftById(id: string): PlayReady30RouteDraft | null {
  return PLAY_READY_30_ROUTE_SOURCE_DRAFT.routes.find((route) => route.id === id) ?? null;
}

export function getPlayReady30RouteSourceDraftSafetySummary() {
  const routes = PLAY_READY_30_ROUTE_SOURCE_DRAFT.routes;
  return {
    version: PLAY_READY_30_VERSION,
    sourceOnly: PLAY_READY_30_ROUTE_SOURCE_DRAFT.sourceOnly,
    runtimeMounted: PLAY_READY_30_ROUTE_SOURCE_DRAFT.runtimeMounted,
    routeMountedInApp: PLAY_READY_30_ROUTE_SOURCE_DRAFT.routeMountedInApp,
    routeCount: routes.length,
    methods: Array.from(new Set(routes.map((route) => route.method))),
    allGetOnly: routes.every((route) => route.method === "GET"),
    allAdminAuthRequired: routes.every((route) => route.auth === "admin_required"),
    allReadOnly: routes.every((route) => route.readOnly === true),
    allDraftOnly: routes.every((route) => route.routeFileDraftOnly === true),
    planningInputs: {
      apiContractPlanVersion: PLAY_READY_28_ADMIN_API_CONTRACT_PLAN.version,
      adminRoutePlanVersion: PLAY_READY_29_ADMIN_ROUTE_PLAN.version,
    },
    forbiddenUntilSeparateApproval: PLAY_READY_30_ROUTE_SOURCE_DRAFT.mountPlanForLater.forbiddenUntilSeparateApproval,
  } as const;
}

// PLAY-READY-30-FIX1 explicit safety proof markers start
export const PLAY_READY_30_ADMIN_ROUTE_SOURCE_DRAFT_SAFETY_PROOF = {
  methods: ["GET"] as const,
  requiresAdminAuth: true,
  readOnly: true,
  runtimeMounted: false,
  routeMountedInApp: false,
  actualExpressRouterMounted: false,
} as const;
// PLAY-READY-30-FIX1 explicit safety proof markers end
