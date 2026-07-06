import type { StreamFoundationProtectedRouteHandlerBinding } from "../route-handler-binding";

export const STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE = "BACKEND_STREAM_FOUNDATION_137H_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGING" as const;

export type StreamFoundationMountedRouteDryRunEntryStatus =
  | "route_entry_ready_mount_blocked"
  | "route_entry_review_required"
  | "route_entry_blocked";

export type StreamFoundationMountedRouteDryRunPackageStatus =
  | "dry_run_package_ready_mount_blocked"
  | "dry_run_package_review_required"
  | "dry_run_package_blocked";

export type StreamFoundationMountedRouteDryRunSafetyPolicy = Readonly<{
  localStagingOnly: true;
  protectedBySecurityPipeline: true;
  routeMountedNow: false;
  routerInstanceCreatedNow: false;
  appServerTouchedNow: false;
  serverRestartRequiredNow: false;
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

export type StreamFoundationMountedRouteDryRunTarget = Readonly<{
  packageId: string;
  basePath: "/api/stream";
  ownerModule: "stream";
  installTarget: "/opt/sabi/backend";
  plannedRouteCount: number;
  appServerFilesTouchedNow: readonly [];
  routeMountFilesTouchedNow: readonly [];
  mountRequiresSeparateApproval: true;
  canBeCopiedToServerAsSourceOnly: true;
}>;

export type StreamFoundationMountedRouteDryRunEntry = Readonly<{
  entryId: string;
  routeId: string;
  bindingId: string;
  method: string;
  path: string;
  plannedFullPath: string;
  handlerKind: StreamFoundationProtectedRouteHandlerBinding["handlerKind"];
  runtimeMode: StreamFoundationProtectedRouteHandlerBinding["runtimeMode"];
  status: StreamFoundationMountedRouteDryRunEntryStatus;
  handlerBound: true;
  securityPipelineBound: true;
  responseEnvelopeBound: true;
  dryRunOnly: true;
  routeMountedNow: false;
  routerInstanceCreatedNow: false;
  appServerTouchedNow: false;
  requiredBeforeRealMount: readonly string[];
  sourceBinding: StreamFoundationProtectedRouteHandlerBinding;
}>;

export type StreamFoundationMountedRouteDryRunValidation = Readonly<{
  routeId: string;
  passed: boolean;
  checks: Readonly<{
    handlerBound: true;
    securityPipelineBound: true;
    responseEnvelopeBound: true;
    notMounted: true;
    appServerUntouched: true;
    noMoneyMovement: true;
    noProviderCall: true;
    noDatabaseWrite: true;
    noRawSecrets: true;
  }>;
}>;

export type StreamFoundationMountedRouteDryRunPackage = Readonly<{
  stage: typeof STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE;
  status: StreamFoundationMountedRouteDryRunPackageStatus;
  target: StreamFoundationMountedRouteDryRunTarget;
  entries: readonly StreamFoundationMountedRouteDryRunEntry[];
  validations: readonly StreamFoundationMountedRouteDryRunValidation[];
  totalEntries: number;
  readyMountBlockedEntries: number;
  reviewRequiredEntries: number;
  blockedEntries: number;
  routeMountedNowCount: 0;
  routerInstanceCreatedNow: false;
  appServerTouchedNow: false;
  requiredBeforeRealMount: readonly string[];
  safety: StreamFoundationMountedRouteDryRunSafetyPolicy;
}>;

export type StreamFoundationMountedRouteDryRunReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE;
  status: "mounted_route_dry_run_package_ready_not_mounted";
  dryRunPackage: StreamFoundationMountedRouteDryRunPackage;
  coverage: Readonly<{
    protectedHandlerBindingsIncluded: true;
    liveRoutesIncluded: true;
    shortsRoutesIncluded: true;
    giftsRoutesIncluded: true;
    adminMonetizationRoutesIncluded: true;
    monthlyPayoutRoutesIncluded: true;
    securityGuardsIncluded: true;
    safeResponseEnvelopeIncluded: true;
    actualMountCreatedNow: false;
    coveragePercent: 100;
  }>;
  safety: StreamFoundationMountedRouteDryRunSafetyPolicy;
}>;
