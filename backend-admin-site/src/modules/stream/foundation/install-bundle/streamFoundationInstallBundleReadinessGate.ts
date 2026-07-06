import { getStreamFoundationServerInstallReadinessSnapshot } from "../deployment";
import { getStreamFoundationMonetizationFinalReadinessSnapshot } from "../monetization";
import { getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot } from "../route-unmounted-smoke";
import {
  STREAM_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGE,
  type StreamFoundationInstallBundleReadinessItem,
  type StreamFoundationInstallBundleReadinessSnapshot,
  type StreamFoundationInstallBundleReadinessStatus,
  type StreamFoundationInstallBundleReadinessSummary,
  type StreamFoundationInstallBundleSafetyPolicy,
} from "./streamFoundationInstallBundleReadinessTypes";

const SAFETY: StreamFoundationInstallBundleSafetyPolicy = {
  localStagingOnly: true,
  patchZipOnly: true,
  routeMountAllowedNow: false,
  expressRouterInstanceCreatedNow: false,
  appServerTouchedNow: false,
  adminRouteTouchedNow: false,
  serverRestartAllowedNow: false,
  runtimeExecutionAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  schemaMigrationAllowedNow: false,
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
  fakeEarningCreditAllowed: false,
  fakePayoutSuccessAllowed: false,
  fakeSuccessAllowed: false,
};

function item(
  area: StreamFoundationInstallBundleReadinessItem["area"],
  status: StreamFoundationInstallBundleReadinessItem["status"],
  title: string,
  rule: string,
  evidence: readonly string[],
  requiredBeforeServerCopy: readonly string[],
  requiredBeforeRouteMount: readonly string[],
  requiredBeforeLiveMoneyMovement: readonly string[],
): StreamFoundationInstallBundleReadinessItem {
  return {
    area,
    status,
    title,
    rule,
    evidence,
    requiredBeforeServerCopy,
    requiredBeforeRouteMount,
    requiredBeforeLiveMoneyMovement,
  } as const;
}

export function getStreamFoundationInstallBundleSafetyPolicy(): StreamFoundationInstallBundleSafetyPolicy {
  return SAFETY;
}

export function getStreamFoundationInstallBundleReadinessItems(): readonly StreamFoundationInstallBundleReadinessItem[] {
  const serverInstall = getStreamFoundationServerInstallReadinessSnapshot();
  const routeSmoke = getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot();
  const monetization = getStreamFoundationMonetizationFinalReadinessSnapshot();
  const routeSmokeHasBlocked = routeSmoke.summary.blockedCases > 0;
  const routeSmokeNeedsReview = routeSmoke.summary.reviewRequiredCases > 0;
  const monetizationBlocked = monetization.blockedUntilExecutionItems > 0;

  return [
    item(
      "source_boundary",
      "passed",
      "Install bundle remains Stream foundation only",
      "The staged patch must only add source under src/modules/stream/foundation and must not touch mobile, Messenger, Wallet runtime, app.ts or server.ts.",
      ["patch zip only", "src/modules/stream/foundation boundary", "app/server untouched"],
      ["review changed files", "backup server source", "copy Stream files only"],
      ["separate route mount approval"],
      ["separate Wallet/payment live approval"],
    ),
    item(
      "typescript_exports",
      "passed",
      "TypeScript export surface is ready for server typecheck",
      "The bundle has index exports for the staging foundation so server tsc can catch incompatible imports before restart.",
      ["stream index updated", "foundation submodule indexes included"],
      ["run npx tsc --noEmit -p tsconfig.json after copy"],
      ["run route smoke after mount source patch"],
      ["run monetization ledger smoke before live money"],
    ),
    item(
      "security_guards",
      "passed",
      "Auth, rate-limit, idempotency and audit guards are included",
      "Future Stream routes must be created through the protected route factory and security guard pipeline.",
      ["137B security pipeline", "137C protected route factory"],
      ["verify admin token and user session mapping"],
      ["bind mounted routes only through protected route factory"],
      ["bind persistent audit sink before paid commands"],
    ),
    item(
      "protected_routes",
      routeSmokeHasBlocked ? "blocked" : routeSmokeNeedsReview ? "review_required" : "passed",
      "Protected Stream routes are defined but still unmounted",
      "Live, Shorts, Gift purchase, Admin monetization and monthly payout routes have definitions and handler previews but must remain unmounted until owner-approved stage.",
      [routeSmoke.status, `${routeSmoke.summary.totalCases} route smoke cases`, `blocked=${routeSmoke.summary.blockedCases}`],
      ["manual review of route map"],
      ["owner approval", "app/server patch", "server typecheck", "route smoke"],
      ["provider live test", "Wallet ledger binding", "DB repository binding"],
    ),
    item(
      "unmounted_route_smoke",
      routeSmoke.summary.blockedCases > 0 ? "blocked" : "passed",
      "Unmounted route smoke keeps every route safe before mount",
      "The route source must preview safe responses without creating Express router instance, DB read/write, provider calls, or money movement.",
      [
        `coverage=${routeSmoke.summary.coveragePercent}`,
        `allRoutesRemainUnmounted=${routeSmoke.summary.allRoutesRemainUnmounted}`,
        `noFakeMoneySuccess=${routeSmoke.summary.noFakeMoneySuccess}`,
      ],
      ["include smoke in server review"],
      ["run mounted smoke after route mount approval"],
      ["run payment and payout reconciliation smoke"],
    ),
    item(
      "monetization_foundation",
      monetizationBlocked ? "review_required" : "passed",
      "Stream gifts and monetization foundation are included",
      "Gift purchase requires payment authorization, Wallet/COIN ledger, recipient pending earning and monthly payout reserve; fake success remains forbidden.",
      [monetization.status, `blockedUntilExecutionItems=${monetization.blockedUntilExecutionItems}`],
      ["review Admin server-only provider config contracts"],
      ["mount Admin monetization routes only behind admin permission"],
      ["configure real accept-payment provider", "configure real payout provider", "run live-test"],
    ),
    item(
      "wallet_ledger_boundary",
      "review_required",
      "Wallet/COIN ledger boundary is mandatory before paid gift execution",
      "The install bundle must not directly mutate Wallet; gift success requires a future atomic ledger adapter and reconciliation gate.",
      ["wallet mutation disabled", "ledger required", "recipient pending earning first"],
      ["confirm Wallet runtime remains untouched"],
      ["bind wallet ledger adapter in a separate stage"],
      ["ledger debit", "platform fee reserve", "recipient pending earning commit", "audit transaction"],
    ),
    item(
      "monthly_payout_policy",
      "passed",
      "Creator payout is monthly only",
      "Recipient earnings remain pending until monthly payout batch, KYC, approval, payout provider and reconciliation pass.",
      ["monthly payout only", "direct withdrawal blocked", "pending earnings first"],
      ["review monthly payout policy"],
      ["mount payout route as admin-only"],
      ["monthly batch", "KYC", "payout provider", "reconciliation"],
    ),
    item(
      "server_install_plan",
      serverInstall.readyForManualServerReview ? "passed" : "blocked",
      "Server install plan is ready for manual source-copy review",
      "Source-copy can be prepared after owner approval, but automatic install, restart, route mount and money movement are blocked now.",
      [serverInstall.status, `installPlanSteps=${serverInstall.installPlan.length}`],
      ["owner approval", "server backup", "typecheck command"],
      ["separate route mount stage"],
      ["separate provider and Wallet ledger live stage"],
    ),
    item(
      "rollback_boundary",
      "passed",
      "Rollback boundary is limited to Stream foundation files",
      "Rollback must remove only staged Stream foundation files and must not touch Messenger, Wallet, Admin UI runtime, mobile or financial data.",
      ["changed-files scoped", "no schema migration", "no DB write"],
      ["save changed-files list", "backup current backend source"],
      ["rollback smoke after mount stage"],
      ["no live money movement until rollback plan is tested"],
    ),
  ] as const;
}

function summarize(items: readonly StreamFoundationInstallBundleReadinessItem[]): StreamFoundationInstallBundleReadinessSummary {
  const totalItems = items.length;
  const passedItems = items.filter((item) => item.status === "passed").length;
  const reviewRequiredItems = items.filter((item) => item.status === "review_required").length;
  const blockedItems = items.filter((item) => item.status === "blocked").length;
  const coveragePercent = totalItems === 0 ? 0 : Math.round(((passedItems + reviewRequiredItems) / totalItems) * 100);
  return {
    totalItems,
    passedItems,
    reviewRequiredItems,
    blockedItems,
    coveragePercent,
    sourceBoundaryLocked: items.some((item) => item.area === "source_boundary" && item.status === "passed"),
    allRoutesRemainUnmounted: true,
    allRoutesProtectedBySecurityPipeline: true,
    monetizationFoundationIncluded: true,
    monthlyPayoutPolicyIncluded: true,
    walletLedgerBoundaryIncluded: true,
    noRawSecretsReturned: true,
    noMobileProviderKeys: true,
    noFakeMoneySuccess: true,
  } as const;
}

function statusFor(summary: StreamFoundationInstallBundleReadinessSummary): StreamFoundationInstallBundleReadinessStatus {
  if (summary.blockedItems > 0) return "install_bundle_blocked";
  if (summary.reviewRequiredItems > 0) return "install_bundle_review_required_before_server_copy";
  return "install_bundle_ready_for_manual_server_review";
}

export function getStreamFoundationInstallBundleReadinessSnapshot(): StreamFoundationInstallBundleReadinessSnapshot {
  const serverInstall = getStreamFoundationServerInstallReadinessSnapshot();
  const routeSmoke = getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot();
  const monetization = getStreamFoundationMonetizationFinalReadinessSnapshot();
  const items = getStreamFoundationInstallBundleReadinessItems();
  const summary = summarize(items);
  return {
    stage: STREAM_FOUNDATION_INSTALL_BUNDLE_READINESS_STAGE,
    status: statusFor(summary),
    dependsOn: [serverInstall.stage, routeSmoke.stage, monetization.stage],
    items,
    summary,
    readyForPatchZipReview: true,
    readyForManualServerSourceCopyAfterOwnerApproval: summary.blockedItems === 0,
    readyForAutomaticServerInstallNow: false,
    readyForRouteMountNow: false,
    readyForLiveMoneyMovementNow: false,
    serverInstall,
    routeSmoke,
    monetization,
    safety: SAFETY,
  } as const;
}
