import type { StreamFoundationMountedRouteDryRunPackage, StreamFoundationMountedRouteDryRunEntry } from "../route-dry-run";

export const STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE = "BACKEND_STREAM_FOUNDATION_137I_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGING" as const;

export type StreamFoundationRouteMountSourcePatchPlanStatus =
  | "source_patch_plan_ready_mount_blocked"
  | "source_patch_plan_review_required"
  | "source_patch_plan_blocked";

export type StreamFoundationRouteMountSourcePatchPlanFileRole =
  | "future_router_source"
  | "future_route_mount_integration"
  | "future_admin_route_bridge"
  | "safety_readme";

export type StreamFoundationRouteMountSourcePatchPlanFileAction =
  | "prepare_in_future_patch_only"
  | "blocked_until_separate_owner_approval"
  | "do_not_touch_in_current_stage";

export type StreamFoundationRouteMountSourcePatchPlanSafetyPolicy = Readonly<{
  localStagingOnly: true;
  routeMountAllowedNow: false;
  actualRouteModuleCreatedNow: false;
  expressRouterCreatedNow: false;
  appServerTouchedNow: false;
  adminRouteTouchedNow: false;
  serverRestartAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  providerCallAllowedNow: false;
  realtimePublishAllowedNow: false;
  mediaStorageWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  messengerMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  rawSecretsReturned: false;
  mobileProviderKeysAllowed: false;
  fakePaymentSuccessAllowed: false;
  fakeGiftSuccessAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationRouteMountSourcePatchPlanFile = Readonly<{
  filePath: string;
  role: StreamFoundationRouteMountSourcePatchPlanFileRole;
  action: StreamFoundationRouteMountSourcePatchPlanFileAction;
  touchedNow: false;
  allowedInCurrentPatch: false;
  requiresSeparateApproval: true;
  reason: string;
}>;

export type StreamFoundationRouteMountSourcePatchPlanRoute = Readonly<{
  planRouteId: string;
  routeId: string;
  method: StreamFoundationMountedRouteDryRunEntry["method"];
  path: StreamFoundationMountedRouteDryRunEntry["path"];
  plannedFullPath: string;
  handlerKind: StreamFoundationMountedRouteDryRunEntry["handlerKind"];
  runtimeMode: StreamFoundationMountedRouteDryRunEntry["runtimeMode"];
  securityPipelineRequired: true;
  responseEnvelopeRequired: true;
  idempotencyRequired: boolean;
  adminPermissionRequired: boolean;
  moneyMovementBlockedUntilProviderLedgerReady: boolean;
  routeMountAllowedNow: false;
  sourceRouteEntryReadyForFuturePatch: boolean;
  sourceDryRunEntry: StreamFoundationMountedRouteDryRunEntry;
}>;

export type StreamFoundationRouteMountSourcePatchPlanApprovalGate = Readonly<{
  gateId: string;
  status: "required_before_real_mount" | "required_before_money_movement" | "required_before_provider_live";
  passedNow: false;
  required: true;
  description: string;
}>;

export type StreamFoundationRouteMountSourcePatchPlan = Readonly<{
  stage: typeof STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE;
  status: StreamFoundationRouteMountSourcePatchPlanStatus;
  sourceDryRunPackage: StreamFoundationMountedRouteDryRunPackage;
  routes: readonly StreamFoundationRouteMountSourcePatchPlanRoute[];
  files: readonly StreamFoundationRouteMountSourcePatchPlanFile[];
  approvalGates: readonly StreamFoundationRouteMountSourcePatchPlanApprovalGate[];
  totalRoutes: number;
  routeEntriesReadyForFuturePatch: number;
  blockedRouteEntries: number;
  plannedFilesTouchedNowCount: 0;
  appServerTouchedNow: false;
  actualMountCreatedNow: false;
  canPrepareFutureMountPatch: boolean;
  canApplyMountPatchNow: false;
  safety: StreamFoundationRouteMountSourcePatchPlanSafetyPolicy;
}>;

export type StreamFoundationRouteMountSourcePatchPlanReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE;
  status: "route_mount_source_patch_plan_ready_not_mounted";
  plan: StreamFoundationRouteMountSourcePatchPlan;
  coverage: Readonly<{
    dryRunPackageIncluded: true;
    protectedRoutesIncluded: true;
    securityGuardsIncluded: true;
    safeResponseEnvelopeIncluded: true;
    routeMountFilesPlannedButUntouched: true;
    actualMountCreatedNow: false;
    coveragePercent: 100;
  }>;
  safety: StreamFoundationRouteMountSourcePatchPlanSafetyPolicy;
}>;
