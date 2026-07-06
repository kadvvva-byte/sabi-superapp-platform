import type { StreamFoundationServerInstallReadinessSnapshot } from "../deployment";
import type { StreamFoundationMonetizationFinalReadinessSnapshot } from "../monetization";
import type { StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot } from "../route-unmounted-smoke";

export const STREAM_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGE = "BACKEND_STREAM_FOUNDATION_137L_INSTALL_BUNDLE_READINESS_STAGING" as const;

export type StreamFoundationInstallBundleReadinessStatus =
  | "install_bundle_ready_for_manual_server_review"
  | "install_bundle_review_required_before_server_copy"
  | "install_bundle_blocked";

export type StreamFoundationInstallBundleArea =
  | "source_boundary"
  | "typescript_exports"
  | "security_guards"
  | "protected_routes"
  | "unmounted_route_smoke"
  | "monetization_foundation"
  | "wallet_ledger_boundary"
  | "monthly_payout_policy"
  | "server_install_plan"
  | "rollback_boundary";

export type StreamFoundationInstallBundleReadinessItemStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationInstallBundleReadinessItem = Readonly<{
  area: StreamFoundationInstallBundleArea;
  status: StreamFoundationInstallBundleReadinessItemStatus;
  title: string;
  rule: string;
  evidence: readonly string[];
  requiredBeforeServerCopy: readonly string[];
  requiredBeforeRouteMount: readonly string[];
  requiredBeforeLiveMoneyMovement: readonly string[];
}>;

export type StreamFoundationInstallBundleSafetyPolicy = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  routeMountAllowedNow: false;
  expressRouterInstanceCreatedNow: false;
  appServerTouchedNow: false;
  adminRouteTouchedNow: false;
  serverRestartAllowedNow: false;
  runtimeExecutionAllowedNow: false;
  databaseReadAllowedNow: false;
  databaseWriteAllowedNow: false;
  schemaMigrationAllowedNow: false;
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
  fakeEarningCreditAllowed: false;
  fakePayoutSuccessAllowed: false;
  fakeSuccessAllowed: false;
}>;

export type StreamFoundationInstallBundleReadinessSummary = Readonly<{
  totalItems: number;
  passedItems: number;
  reviewRequiredItems: number;
  blockedItems: number;
  coveragePercent: number;
  sourceBoundaryLocked: boolean;
  allRoutesRemainUnmounted: boolean;
  allRoutesProtectedBySecurityPipeline: boolean;
  monetizationFoundationIncluded: boolean;
  monthlyPayoutPolicyIncluded: boolean;
  walletLedgerBoundaryIncluded: boolean;
  noRawSecretsReturned: boolean;
  noMobileProviderKeys: boolean;
  noFakeMoneySuccess: boolean;
}>;

export type StreamFoundationInstallBundleReadinessSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGE;
  status: StreamFoundationInstallBundleReadinessStatus;
  dependsOn: readonly string[];
  items: readonly StreamFoundationInstallBundleReadinessItem[];
  summary: StreamFoundationInstallBundleReadinessSummary;
  readyForPatchZipReview: true;
  readyForManualServerSourceCopyAfterOwnerApproval: boolean;
  readyForAutomaticServerInstallNow: false;
  readyForRouteMountNow: false;
  readyForLiveMoneyMovementNow: false;
  serverInstall: StreamFoundationServerInstallReadinessSnapshot;
  routeSmoke: StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot;
  monetization: StreamFoundationMonetizationFinalReadinessSnapshot;
  safety: StreamFoundationInstallBundleSafetyPolicy;
}>;
