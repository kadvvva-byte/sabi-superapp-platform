import { getStreamFoundationProtectedRouteHandlerBindings, type StreamFoundationProtectedRouteHandlerBinding } from "../route-handler-binding";
import {
  STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE,
  type StreamFoundationMountedRouteDryRunEntry,
  type StreamFoundationMountedRouteDryRunEntryStatus,
  type StreamFoundationMountedRouteDryRunPackage,
  type StreamFoundationMountedRouteDryRunPackageStatus,
  type StreamFoundationMountedRouteDryRunSafetyPolicy,
  type StreamFoundationMountedRouteDryRunValidation,
} from "./streamFoundationMountedRouteDryRunPackageTypes";

const SAFETY: StreamFoundationMountedRouteDryRunSafetyPolicy = {
  localStagingOnly: true,
  protectedBySecurityPipeline: true,
  routeMountedNow: false,
  routerInstanceCreatedNow: false,
  appServerTouchedNow: false,
  serverRestartRequiredNow: false,
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

const REQUIRED_BEFORE_REAL_MOUNT = [
  "separate owner approval for route mount execution",
  "server source state check on /opt/sabi/backend before copying files",
  "backend TypeScript check after copy and before restart",
  "route mount must be added in a separate controlled stage only",
  "persistent audit sink must be bound before write routes go live",
  "database repositories must be bound before read/write persistence goes live",
  "accept-payment provider and payout provider must stay server-side only",
  "Wallet/COIN ledger must be configured before gift purchase execution",
  "provider live-test must pass before any payment or payout route is enabled",
] as const;

function entryStatus(binding: StreamFoundationProtectedRouteHandlerBinding): StreamFoundationMountedRouteDryRunEntryStatus {
  if (binding.status === "handler_bound_mount_blocked") return "route_entry_ready_mount_blocked";
  if (binding.status === "handler_bound_review_required") return "route_entry_review_required";
  return "route_entry_blocked";
}

function packageStatus(entries: readonly StreamFoundationMountedRouteDryRunEntry[]): StreamFoundationMountedRouteDryRunPackageStatus {
  if (entries.some((entry) => entry.status === "route_entry_blocked")) return "dry_run_package_blocked";
  if (entries.some((entry) => entry.status === "route_entry_review_required")) return "dry_run_package_review_required";
  return "dry_run_package_ready_mount_blocked";
}

function fullPath(path: string): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/api/stream${cleanPath}`;
}

function toEntry(binding: StreamFoundationProtectedRouteHandlerBinding, index: number): StreamFoundationMountedRouteDryRunEntry {
  return {
    entryId: `137h-dry-run-entry-${index + 1}-${binding.routeId}`,
    routeId: binding.routeId,
    bindingId: binding.bindingId,
    method: binding.method,
    path: binding.path,
    plannedFullPath: fullPath(binding.path),
    handlerKind: binding.handlerKind,
    runtimeMode: binding.runtimeMode,
    status: entryStatus(binding),
    handlerBound: true,
    securityPipelineBound: true,
    responseEnvelopeBound: true,
    dryRunOnly: true,
    routeMountedNow: false,
    routerInstanceCreatedNow: false,
    appServerTouchedNow: false,
    requiredBeforeRealMount: REQUIRED_BEFORE_REAL_MOUNT,
    sourceBinding: binding,
  };
}

function validateEntry(entry: StreamFoundationMountedRouteDryRunEntry): StreamFoundationMountedRouteDryRunValidation {
  return {
    routeId: entry.routeId,
    passed:
      entry.handlerBound &&
      entry.securityPipelineBound &&
      entry.responseEnvelopeBound &&
      entry.routeMountedNow === false &&
      entry.appServerTouchedNow === false &&
      entry.sourceBinding.safety.moneyMovementAllowedNow === false &&
      entry.sourceBinding.safety.providerCallAllowedNow === false &&
      entry.sourceBinding.safety.databaseWriteAllowedNow === false &&
      entry.sourceBinding.safety.rawSecretsReturned === false,
    checks: {
      handlerBound: true,
      securityPipelineBound: true,
      responseEnvelopeBound: true,
      notMounted: true,
      appServerUntouched: true,
      noMoneyMovement: true,
      noProviderCall: true,
      noDatabaseWrite: true,
      noRawSecrets: true,
    },
  };
}

export function getStreamFoundationMountedRouteDryRunPackage(): StreamFoundationMountedRouteDryRunPackage {
  const entries = getStreamFoundationProtectedRouteHandlerBindings().map(toEntry);
  const validations = entries.map(validateEntry);

  return {
    stage: STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE,
    status: packageStatus(entries),
    target: {
      packageId: "stream-foundation-137h-mounted-route-dry-run-package",
      basePath: "/api/stream",
      ownerModule: "stream",
      installTarget: "/opt/sabi/backend",
      plannedRouteCount: entries.length,
      appServerFilesTouchedNow: [],
      routeMountFilesTouchedNow: [],
      mountRequiresSeparateApproval: true,
      canBeCopiedToServerAsSourceOnly: true,
    },
    entries,
    validations,
    totalEntries: entries.length,
    readyMountBlockedEntries: entries.filter((entry) => entry.status === "route_entry_ready_mount_blocked").length,
    reviewRequiredEntries: entries.filter((entry) => entry.status === "route_entry_review_required").length,
    blockedEntries: entries.filter((entry) => entry.status === "route_entry_blocked").length,
    routeMountedNowCount: 0,
    routerInstanceCreatedNow: false,
    appServerTouchedNow: false,
    requiredBeforeRealMount: REQUIRED_BEFORE_REAL_MOUNT,
    safety: SAFETY,
  };
}

export function getStreamFoundationMountedRouteDryRunPackageStage(): typeof STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE {
  return STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE;
}
