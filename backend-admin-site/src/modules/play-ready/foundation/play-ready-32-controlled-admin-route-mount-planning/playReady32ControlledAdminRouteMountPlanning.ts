export type PlayReady32AdminMountRouteId =
  | "reviewer_evidence_summary"
  | "reviewer_evidence_categories"
  | "reviewer_evidence_category_detail"
  | "reviewer_evidence_item_detail"
  | "reviewer_access_notes"
  | "permission_declarations"
  | "manual_screenshot_checklist"
  | "production_readiness_blockers"
  | "reviewer_export_draft"
  | "reviewer_evidence_safety_status";

export type PlayReady32MountGuardId =
  | "admin_auth_required"
  | "get_only"
  | "read_only"
  | "no_runtime_db_write"
  | "no_provider_call"
  | "no_wallet_mutation"
  | "no_money_movement"
  | "no_fake_success"
  | "no_backend_restart"
  | "no_admin_ui_build"
  | "not_mounted_until_explicit_owner_approval";

export type PlayReady32ControlledAdminRouteMountPlanningStatus =
  | "source_only_mount_planning_ready"
  | "waiting_owner_approval_for_runtime_mount_later";

export const PLAY_READY_32_VERSION = "PLAY-READY-32" as const;

export const PLAY_READY_32_REQUIRED_PRIOR_STAGE = {
  playReady31Fix1Required: true,
  expectedTypeScriptExitCode: 0,
  expectedBlockedCount: 0,
  expectedAppTsMountHits: 0,
  expectedForbiddenHits: 0,
} as const;

export const PLAY_READY_32_CONTROLLED_ADMIN_ROUTE_MOUNT_PLAN = {
  version: PLAY_READY_32_VERSION,
  status: "source_only_mount_planning_ready" as PlayReady32ControlledAdminRouteMountPlanningStatus,
  scope: "Admin reviewer evidence center controlled route mount planning only",
  routeBasePathDraft: "/api/admin/play-ready/reviewer-evidence",
  methods: ["GET"] as const,
  plannedRoutes: 10,
  requiresAdminAuth: true,
  readOnly: true,
  runtimeRouteMounted: false,
  routeMountedInApp: false,
  actualExpressRouterMounted: false,
  routeFileWrittenNow: false,
  appTsWriteAllowedNow: false,
  backendRestartAllowedNow: false,
  adminUiBuildAllowedNow: false,
  runtimeDbWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowedNow: false,
  mountAllowedOnlyAfterSeparateOwnerApproval: true,
  plannedRouteIds: [
    "reviewer_evidence_summary",
    "reviewer_evidence_categories",
    "reviewer_evidence_category_detail",
    "reviewer_evidence_item_detail",
    "reviewer_access_notes",
    "permission_declarations",
    "manual_screenshot_checklist",
    "production_readiness_blockers",
    "reviewer_export_draft",
    "reviewer_evidence_safety_status",
  ] as PlayReady32AdminMountRouteId[],
  guards: [
    "admin_auth_required",
    "get_only",
    "read_only",
    "no_runtime_db_write",
    "no_provider_call",
    "no_wallet_mutation",
    "no_money_movement",
    "no_fake_success",
    "no_backend_restart",
    "no_admin_ui_build",
    "not_mounted_until_explicit_owner_approval",
  ] as PlayReady32MountGuardId[],
  futureMountTargetCandidates: [
    "src/app.ts",
    "src/modules/admin/admin.routes.ts",
    "src/modules/play-ready/foundation/runtime route wrapper if one exists later",
  ],
  currentStageForbiddenActions: [
    "do not edit src/app.ts",
    "do not mount Express router",
    "do not restart backend",
    "do not build Admin UI",
    "do not write database",
    "do not call providers",
    "do not mutate Wallet",
    "do not move money",
    "do not create fake success states",
  ],
} as const;

export const PLAY_READY_32_OWNER_APPROVAL_TEXT_FOR_FUTURE_MOUNT =
  "I approve PLAY-READY-33 controlled Admin reviewer evidence route mount source patch, mount read-only GET routes only, admin auth required, no DB write, no provider call, no Wallet state change, no money movement, no fake success, no Admin UI build yet.";

export function getPlayReady32ControlledAdminRouteMountPlanning() {
  return PLAY_READY_32_CONTROLLED_ADMIN_ROUTE_MOUNT_PLAN;
}
