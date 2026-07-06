import { getStreamFoundationMountedRouteDryRunPackage } from "../route-dry-run";
import {
  STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE,
  type StreamFoundationRouteMountSourcePatchPlan,
  type StreamFoundationRouteMountSourcePatchPlanApprovalGate,
  type StreamFoundationRouteMountSourcePatchPlanFile,
  type StreamFoundationRouteMountSourcePatchPlanRoute,
  type StreamFoundationRouteMountSourcePatchPlanSafetyPolicy,
  type StreamFoundationRouteMountSourcePatchPlanStatus,
} from "./streamFoundationRouteMountSourcePatchPlanTypes";

const SAFETY: StreamFoundationRouteMountSourcePatchPlanSafetyPolicy = {
  localStagingOnly: true,
  routeMountAllowedNow: false,
  actualRouteModuleCreatedNow: false,
  expressRouterCreatedNow: false,
  appServerTouchedNow: false,
  adminRouteTouchedNow: false,
  serverRestartAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  realtimePublishAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  messengerMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakePaymentSuccessAllowed: false,
  fakeGiftSuccessAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeSuccessAllowed: false,
};

const PLANNED_FILES: readonly StreamFoundationRouteMountSourcePatchPlanFile[] = [
  {
    filePath: "src/modules/stream/foundation/routes/streamFoundationProtectedRoutes.ts",
    role: "future_router_source",
    action: "prepare_in_future_patch_only",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Router source will be created only after the dry-run package is accepted and a separate route-source stage is approved.",
  },
  {
    filePath: "src/modules/stream/foundation/routes/index.ts",
    role: "future_router_source",
    action: "prepare_in_future_patch_only",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Route exports must stay unmounted until protected route factory checks are accepted.",
  },
  {
    filePath: "src/app.ts",
    role: "future_route_mount_integration",
    action: "blocked_until_separate_owner_approval",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Application mount file must not be changed in staging; route mount requires a separate server-source approval.",
  },
  {
    filePath: "src/server.ts",
    role: "future_route_mount_integration",
    action: "do_not_touch_in_current_stage",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Server startup file must remain untouched until after source patch, typecheck, and rollback plan are ready.",
  },
  {
    filePath: "src/modules/admin/admin.routes.ts",
    role: "future_admin_route_bridge",
    action: "blocked_until_separate_owner_approval",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Admin monetization route bridge must not be mounted until admin permissions and redacted secret handling are verified.",
  },
  {
    filePath: "STREAM_BACKEND_STAGING_README_137I.md",
    role: "safety_readme",
    action: "prepare_in_future_patch_only",
    touchedNow: false,
    allowedInCurrentPatch: false,
    requiresSeparateApproval: true,
    reason: "Current stage documents exact future mount controls without creating executable router wiring.",
  },
] as const;

const APPROVAL_GATES: readonly StreamFoundationRouteMountSourcePatchPlanApprovalGate[] = [
  {
    gateId: "owner_approval_for_route_source_patch",
    status: "required_before_real_mount",
    passedNow: false,
    required: true,
    description: "A separate explicit owner approval is required before creating real router source files or touching app.ts/server.ts.",
  },
  {
    gateId: "server_source_state_check",
    status: "required_before_real_mount",
    passedNow: false,
    required: true,
    description: "The target backend source tree must be checked before copying any staged files to avoid overwriting Wallet/Messenger work.",
  },
  {
    gateId: "backend_typecheck_before_restart",
    status: "required_before_real_mount",
    passedNow: false,
    required: true,
    description: "Backend TypeScript must pass after copying source and before any service restart.",
  },
  {
    gateId: "persistent_audit_repository_binding",
    status: "required_before_real_mount",
    passedNow: false,
    required: true,
    description: "Protected write routes require a persistent audit sink before they can be exposed.",
  },
  {
    gateId: "wallet_ledger_provider_binding",
    status: "required_before_money_movement",
    passedNow: false,
    required: true,
    description: "Gift purchase and payout routes must remain blocked until real Wallet/COIN ledger integration is bound.",
  },
  {
    gateId: "accept_payment_provider_live_test",
    status: "required_before_provider_live",
    passedNow: false,
    required: true,
    description: "Accept-payment provider live-test must pass before any sender charge can be attempted.",
  },
  {
    gateId: "payout_provider_live_test",
    status: "required_before_provider_live",
    passedNow: false,
    required: true,
    description: "Payout provider live-test must pass before monthly payout execution can be attempted.",
  },
] as const;

function hasAdminRequirement(path: string): boolean {
  return path.includes("/admin/") || path.includes("monetization") || path.includes("payout");
}

function hasIdempotencyRequirement(method: string, path: string): boolean {
  return method.toUpperCase() !== "GET" || path.includes("gift") || path.includes("payout");
}

function hasMoneyMovementBoundary(path: string): boolean {
  return path.includes("gift") || path.includes("payout") || path.includes("monetization");
}

function toPlanRoute(entry: ReturnType<typeof getStreamFoundationMountedRouteDryRunPackage>["entries"][number], index: number): StreamFoundationRouteMountSourcePatchPlanRoute {
  return {
    planRouteId: `137i-route-mount-plan-${index + 1}-${entry.routeId}`,
    routeId: entry.routeId,
    method: entry.method,
    path: entry.path,
    plannedFullPath: entry.plannedFullPath,
    handlerKind: entry.handlerKind,
    runtimeMode: entry.runtimeMode,
    securityPipelineRequired: true,
    responseEnvelopeRequired: true,
    idempotencyRequired: hasIdempotencyRequirement(entry.method, entry.path),
    adminPermissionRequired: hasAdminRequirement(entry.path),
    moneyMovementBlockedUntilProviderLedgerReady: hasMoneyMovementBoundary(entry.path),
    routeMountAllowedNow: false,
    sourceRouteEntryReadyForFuturePatch: entry.status === "route_entry_ready_mount_blocked" || entry.status === "route_entry_review_required",
    sourceDryRunEntry: entry,
  };
}

function getPlanStatus(routes: readonly StreamFoundationRouteMountSourcePatchPlanRoute[]): StreamFoundationRouteMountSourcePatchPlanStatus {
  if (routes.some((route) => !route.sourceRouteEntryReadyForFuturePatch)) return "source_patch_plan_blocked";
  if (routes.some((route) => route.sourceDryRunEntry.status === "route_entry_review_required")) return "source_patch_plan_review_required";
  return "source_patch_plan_ready_mount_blocked";
}

export function getStreamFoundationRouteMountSourcePatchPlan(): StreamFoundationRouteMountSourcePatchPlan {
  const sourceDryRunPackage = getStreamFoundationMountedRouteDryRunPackage();
  const routes = sourceDryRunPackage.entries.map(toPlanRoute);
  const blockedRouteEntries = routes.filter((route) => !route.sourceRouteEntryReadyForFuturePatch).length;

  return {
    stage: STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE,
    status: getPlanStatus(routes),
    sourceDryRunPackage,
    routes,
    files: PLANNED_FILES,
    approvalGates: APPROVAL_GATES,
    totalRoutes: routes.length,
    routeEntriesReadyForFuturePatch: routes.length - blockedRouteEntries,
    blockedRouteEntries,
    plannedFilesTouchedNowCount: 0,
    appServerTouchedNow: false,
    actualMountCreatedNow: false,
    canPrepareFutureMountPatch: blockedRouteEntries === 0,
    canApplyMountPatchNow: false,
    safety: SAFETY,
  };
}

export function getStreamFoundationRouteMountSourcePatchPlanStage(): typeof STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE {
  return STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE;
}
