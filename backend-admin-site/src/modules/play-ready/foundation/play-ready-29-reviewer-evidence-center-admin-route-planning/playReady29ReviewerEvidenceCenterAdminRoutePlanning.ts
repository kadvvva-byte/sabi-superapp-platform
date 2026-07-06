export const PLAY_READY_29_OWNER_APPROVAL_TEXT = "I approve PLAY-READY-29 controlled reviewer evidence center Admin route planning source-only, use PLAY-READY-28 Admin API contract planning, create route planning contracts only, do not mount runtime routes, do not restart backend, do not build Admin UI, do not write DB, do not call providers, do not mutate Wallet, do not move money, and do not create fake success.";

export type PlayReady29EvidenceCategory =
  | "privacy_account_deletion"
  | "ugc_report_block_moderation"
  | "ai_report_flag"
  | "provider_not_configured"
  | "billing_wallet_separation"
  | "financial_disclosure"
  | "reviewer_access_notes"
  | "sensitive_permission_evidence"
  | "https_production_readiness";

export type PlayReady29AdminRouteId =
  | "reviewer_evidence_summary"
  | "reviewer_evidence_categories"
  | "reviewer_evidence_category_detail"
  | "reviewer_evidence_item_detail"
  | "reviewer_access_notes"
  | "permission_declaration_drafts"
  | "manual_screenshot_checklist"
  | "production_readiness_blockers"
  | "reviewer_evidence_export_draft"
  | "reviewer_evidence_safety_status";

export type PlayReady29AdminRoutePlan = {
  id: PlayReady29AdminRouteId;
  method: "GET";
  path: string;
  title: string;
  purpose: string;
  category: PlayReady29EvidenceCategory | "all";
  requiresAdminAuth: true;
  readOnly: true;
  runtimeMountedByThisStage: false;
  routeFileToDraftLater: string;
  contractSource: string;
  serviceSource: string;
  mutatesDatabase: false;
  providerCallAllowed: false;
  walletMutationAllowed: false;
  moneyMovementAllowed: false;
  fakeSuccessAllowed: false;
  responseModel: string;
  safetyGuards: string[];
  manualReviewerUse: string[];
};

export const PLAY_READY_29_ADMIN_ROUTE_PLANS: PlayReady29AdminRoutePlan[] = [
  {
    id: "reviewer_evidence_summary",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/summary",
    title: "Reviewer evidence summary",
    purpose: "Return one read-only summary of Play reviewer evidence categories, warnings, blockers, and manual evidence gaps.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceSummaryResponse",
    safetyGuards: ["admin auth required", "GET only", "no persistence", "no provider calls", "no Play upload"],
    manualReviewerUse: ["Prepare Play Console notes", "Prioritize missing screenshot/declaration evidence"],
  },
  {
    id: "reviewer_evidence_categories",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/categories",
    title: "Reviewer evidence categories",
    purpose: "Return the nine reviewer evidence categories and their readiness states.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceCategoryListResponse",
    safetyGuards: ["admin auth required", "GET only", "read registry/service planning only"],
    manualReviewerUse: ["Verify all reviewer evidence groups before submission"],
  },
  {
    id: "reviewer_evidence_category_detail",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/categories/:category",
    title: "Reviewer evidence category detail",
    purpose: "Return source paths, reviewer notes, manual screenshot needs, and declaration needs for one category.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceCategoryDetailResponse",
    safetyGuards: ["validate category enum", "admin auth required", "GET only"],
    manualReviewerUse: ["Copy category-specific reviewer explanations", "Collect category screenshots"],
  },
  {
    id: "reviewer_evidence_item_detail",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/items/:itemId",
    title: "Reviewer evidence item detail",
    purpose: "Return one evidence item with source paths, reviewer explanation draft, and safety caveats.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceItemDetailResponse",
    safetyGuards: ["validate item id", "admin auth required", "GET only"],
    manualReviewerUse: ["Prepare a precise proof note for one reviewer concern"],
  },
  {
    id: "reviewer_access_notes",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/reviewer-access-notes",
    title: "Reviewer access notes",
    purpose: "Return review account instructions and safe feature access notes without secrets.",
    category: "reviewer_access_notes",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerAccessNotesResponse",
    safetyGuards: ["do not return passwords or tokens", "admin auth required", "GET only"],
    manualReviewerUse: ["Draft Play Console reviewer access text"],
  },
  {
    id: "permission_declaration_drafts",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/permission-declarations",
    title: "Permission declaration drafts",
    purpose: "Return draft justifications for camera, microphone, location, call, overlay, notification, and full-screen intent permissions.",
    category: "sensitive_permission_evidence",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyPermissionDeclarationDraftsResponse",
    safetyGuards: ["state only actual app usage", "admin auth required", "GET only"],
    manualReviewerUse: ["Fill Play Console permission declarations", "Prepare reviewer evidence screenshots"],
  },
  {
    id: "manual_screenshot_checklist",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/manual-screenshots",
    title: "Manual screenshot checklist",
    purpose: "Return required manual screenshot checklist for Play review evidence.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyManualScreenshotChecklistResponse",
    safetyGuards: ["manual capture only", "no automated login", "admin auth required", "GET only"],
    manualReviewerUse: ["Capture screenshots for privacy deletion, UGC, AI report, permissions"],
  },
  {
    id: "production_readiness_blockers",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/production-readiness-blockers",
    title: "Production readiness blockers",
    purpose: "Return external production-readiness blockers such as HTTPS/domain/env/package-id decisions.",
    category: "https_production_readiness",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyProductionReadinessBlockersResponse",
    safetyGuards: ["do not claim HTTPS ready unless configured", "admin auth required", "GET only"],
    manualReviewerUse: ["Track cleartext closure", "Track production env and domain readiness"],
  },
  {
    id: "reviewer_evidence_export_draft",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/export-draft",
    title: "Reviewer evidence export draft",
    purpose: "Return a draft-only export payload for manual Play Console notes.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceExportDraftResponse",
    safetyGuards: ["draft only", "no file upload", "no Play API call", "admin auth required", "GET only"],
    manualReviewerUse: ["Copy safe reviewer notes into Play Console manually"],
  },
  {
    id: "reviewer_evidence_safety_status",
    method: "GET",
    path: "/api/admin/play-ready/reviewer-evidence/safety-status",
    title: "Reviewer evidence safety status",
    purpose: "Return safety flags proving this evidence center remains read-only and non-financial.",
    category: "all",
    requiresAdminAuth: true,
    readOnly: true,
    runtimeMountedByThisStage: false,
    routeFileToDraftLater: "src/modules/play-ready/infrastructure/routes/play-ready-reviewer-evidence.admin.routes.ts",
    contractSource: "PLAY-READY-28 Admin API contract planning",
    serviceSource: "PLAY-READY-27 reviewer evidence service planning",
    mutatesDatabase: false,
    providerCallAllowed: false,
    walletMutationAllowed: false,
    moneyMovementAllowed: false,
    fakeSuccessAllowed: false,
    responseModel: "PlayReadyReviewerEvidenceSafetyStatusResponse",
    safetyGuards: ["admin auth required", "GET only", "read-only payload", "no runtime mutation"],
    manualReviewerUse: ["Verify safety posture before later route implementation"],
  },
];

export const PLAY_READY_29_ADMIN_ROUTE_PLANNING_SUMMARY = {
  version: "PLAY-READY-29",
  status: "reviewer_evidence_center_admin_route_planning_source_only_ready",
  routePlans: PLAY_READY_29_ADMIN_ROUTE_PLANS.length,
  methods: ["GET"] as const,
  requiresAdminAuth: true,
  readOnly: true,
  runtimeMounted: false,
  routeSourceWrittenByThisStage: false,
  routeMountAllowedByThisStage: false,
  backendRestartAllowedByThisStage: false,
  adminUiBuildAllowedByThisStage: false,
  dbWriteAllowedByThisStage: false,
  providerCallAllowedByThisStage: false,
  walletMutationAllowedByThisStage: false,
  moneyMovementAllowedByThisStage: false,
  fakeSuccessAllowedByThisStage: false,
  nextRecommendedStage: "PLAY-READY-30 source-only reviewer evidence center Admin route source draft, no mount yet",
} as const;

export function getPlayReady29ReviewerEvidenceCenterAdminRoutePlanning() {
  return {
    ownerApprovalText: PLAY_READY_29_OWNER_APPROVAL_TEXT,
    summary: PLAY_READY_29_ADMIN_ROUTE_PLANNING_SUMMARY,
    routes: PLAY_READY_29_ADMIN_ROUTE_PLANS,
  };
}
