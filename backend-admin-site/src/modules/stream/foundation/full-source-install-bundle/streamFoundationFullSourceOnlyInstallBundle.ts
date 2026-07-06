import { getStreamFoundationInstallBundleReadinessSnapshot } from "../install-bundle";
import { getStreamFoundationServerCopyFinalOwnerHandoffSnapshot } from "../server-copy-final-handoff";
import {
  STREAM_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGE,
  type StreamFoundationFullSourceOnlyInstallBundleArea,
  type StreamFoundationFullSourceOnlyInstallBundleItem,
  type StreamFoundationFullSourceOnlyInstallBundleItemStatus,
  type StreamFoundationFullSourceOnlyInstallBundleSafety,
  type StreamFoundationFullSourceOnlyInstallBundleSnapshot,
  type StreamFoundationFullSourceOnlyInstallBundleStatus,
  type StreamFoundationFullSourceOnlyInstallBundleSummary,
} from "./streamFoundationFullSourceOnlyInstallBundleTypes";

const OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-137U full source-only Stream foundation install bundle review; source copy may be prepared by owner only, route mount forbidden, backend restart forbidden, DB write forbidden, provider calls forbidden, Wallet/Messenger mutation forbidden, money movement forbidden." as const;

const NEXT_MANUAL_STEP =
  "After owner review, the next step is manual source-only server copy. Route mount, backend restart, DB binding, provider binding, Wallet ledger live binding, and money movement remain separate approval stages." as const;

const INCLUDED_SOURCE_SCOPES = [
  "src/modules/stream/foundation/**",
  "src/modules/stream/index.ts",
  "STREAM_BACKEND_STAGING_README_*.md",
] as const;

const EXCLUDED_SOURCE_SCOPES = [
  "src/app.ts",
  "src/server.ts",
  "src/modules/admin/**",
  "src/modules/wallet/**",
  "src/modules/messenger/**",
  "prisma/schema.prisma",
  "prisma/migrations/**",
  "admin-ui/**",
  "mobile/**",
  ".env*",
] as const;

const FORBIDDEN_UNTIL_SEPARATE_APPROVAL = [
  "route mount",
  "backend restart",
  "app.ts/server.ts mutation",
  "database read/write",
  "schema mutation or migration",
  "provider call or provider live test",
  "media storage write",
  "realtime publish",
  "Wallet ledger live binding",
  "Messenger runtime mutation",
  "money movement",
  "raw secret output",
  "mobile provider key exposure",
  "fake payment/gift/earning/payout success",
] as const;

const SAFETY: StreamFoundationFullSourceOnlyInstallBundleSafety = {
  localStagingOnly: true,
  fullSourceOnlyBundle: true,
  patchZipOnly: true,
  performsServerCopyNow: false,
  restartsBackendNow: false,
  mountsRoutesNow: false,
  changesAppServerFilesNow: false,
  createsRouterInstanceNow: false,
  readsDatabaseNow: false,
  writesDatabaseNow: false,
  mutatesDatabaseSchemaNow: false,
  runsMigrationNow: false,
  callsProviderNow: false,
  runsProviderLiveTestNow: false,
  writesMediaStorageNow: false,
  publishesRealtimeNow: false,
  mutatesWalletNow: false,
  mutatesMessengerNow: false,
  movesMoneyNow: false,
  returnsRawSecrets: false,
  exposesMobileProviderKeys: false,
  allowsFakePaymentSuccess: false,
  allowsFakeGiftSuccess: false,
  allowsFakeEarningCredit: false,
  allowsFakePayoutSuccess: false,
  allowsFakeSuccess: false,
};

function bundleItem(
  id: string,
  area: StreamFoundationFullSourceOnlyInstallBundleArea,
  status: StreamFoundationFullSourceOnlyInstallBundleItemStatus,
  title: string,
  requiredForOwnerReview: boolean,
  evidence: readonly string[],
): StreamFoundationFullSourceOnlyInstallBundleItem {
  return { id, area, status, title, requiredForOwnerReview, evidence } as const;
}

export function getStreamFoundationFullSourceOnlyInstallBundleSafety(): StreamFoundationFullSourceOnlyInstallBundleSafety {
  return SAFETY;
}

export function getStreamFoundationFullSourceOnlyInstallBundleItems(): readonly StreamFoundationFullSourceOnlyInstallBundleItem[] {
  const installBundle = getStreamFoundationInstallBundleReadinessSnapshot();
  const finalHandoff = getStreamFoundationServerCopyFinalOwnerHandoffSnapshot();

  return [
    bundleItem("bundle_scope_locked", "bundle_scope", "passed", "Full bundle scope is limited to Stream foundation source and staging readmes", true, [...INCLUDED_SOURCE_SCOPES]),
    bundleItem("source_only_boundary_locked", "source_only_boundary", "passed", "Bundle is source-only and performs no server copy or restart now", true, ["performsServerCopyNow=false", "restartsBackendNow=false", "localStagingOnly=true"]),
    bundleItem("stream_foundation_coverage_ready", "stream_foundation_coverage", installBundle.readyForPatchZipReview ? "passed" : "review_required", "Stream foundation coverage from 136A through 137L is included", true, [installBundle.status, `installBundleItems=${installBundle.summary.totalItems}`]),
    bundleItem("monetization_coverage_ready", "monetization_coverage", "passed", "Gifts, recipient pending earnings, separate provider config, Wallet/COIN ledger gate, and monthly payout policy are included", true, ["accept-payment provider separate", "payout provider separate", "recipient pending earning", "monthly payout only"]),
    bundleItem("security_route_coverage_ready", "security_route_coverage", "passed", "Security guards, protected route factory, route definitions, dry-run, and smoke layers are included but not mounted", true, ["137B security guards", "137C route factory", "137D route definitions", "137K unmounted smoke"]),
    bundleItem("server_copy_boundary_locked", "server_copy_boundary", finalHandoff.summary.readyForOwnerManualServerCopyReview ? "review_required" : "blocked", "Manual server-copy remains owner-review only and is not performed by this bundle", true, [finalHandoff.status, finalHandoff.ownerApprovalPhrase]),
    bundleItem("route_mount_boundary_locked", "route_mount_boundary", "passed", "Route mount remains a separate future approval", false, ["mountsRoutesNow=false", "changesAppServerFilesNow=false", "createsRouterInstanceNow=false"]),
    bundleItem("database_boundary_locked", "database_boundary", "passed", "Database binding, reads/writes, schema mutation, and migrations remain blocked", false, ["readsDatabaseNow=false", "writesDatabaseNow=false", "runsMigrationNow=false"]),
    bundleItem("provider_boundary_locked", "provider_boundary", "passed", "Provider calls and provider live tests remain blocked until real provider binding", false, ["callsProviderNow=false", "runsProviderLiveTestNow=false"]),
    bundleItem("wallet_messenger_boundary_locked", "wallet_messenger_boundary", "passed", "Wallet and Messenger runtime are not mutated by the bundle", false, ["mutatesWalletNow=false", "mutatesMessengerNow=false"]),
    bundleItem("money_movement_boundary_locked", "money_movement_boundary", "passed", "No money movement, fake gift success, fake earning credit, or fake payout is allowed", false, ["movesMoneyNow=false", "allowsFakePaymentSuccess=false", "allowsFakePayoutSuccess=false"]),
    bundleItem("secret_boundary_locked", "secret_boundary", "passed", "Provider keys remain server-side only and raw secrets are never returned", true, ["returnsRawSecrets=false", "exposesMobileProviderKeys=false"]),
    bundleItem("typecheck_boundary_ready", "typecheck_boundary", "passed", "Bundle is prepared for TypeScript noEmit verification after manual copy", true, ["tsc --noEmit -p tsconfig.json must pass before any restart"]),
    bundleItem("rollback_boundary_ready", "rollback_boundary", "passed", "Manual source backup and rollback must exist before server copy", true, ["backup first", "rollback before restart", "route mount still separate"]),
  ] as const;
}

export function getStreamFoundationFullSourceOnlyInstallBundleSummary(
  items: readonly StreamFoundationFullSourceOnlyInstallBundleItem[],
): StreamFoundationFullSourceOnlyInstallBundleSummary {
  const totalItems = items.length;
  const passedItems = items.filter((item) => item.status === "passed").length;
  const reviewRequiredItems = items.filter((item) => item.status === "review_required").length;
  const blockedItems = items.filter((item) => item.status === "blocked").length;
  const requiredForOwnerReviewItems = items.filter((item) => item.requiredForOwnerReview).length;
  const coveragePercent = totalItems === 0 ? 0 : Math.round((passedItems / totalItems) * 100);

  return {
    totalItems,
    passedItems,
    reviewRequiredItems,
    blockedItems,
    requiredForOwnerReviewItems,
    coveragePercent,
    readyForOwnerReview: blockedItems === 0,
    readyForAutomaticServerCopyNow: false,
    readyForBackendRestartNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseBindingNow: false,
    readyForProviderBindingNow: false,
    readyForWalletLedgerLiveBindingNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

export function getStreamFoundationFullSourceOnlyInstallBundleSnapshot(): StreamFoundationFullSourceOnlyInstallBundleSnapshot {
  const installBundle = getStreamFoundationInstallBundleReadinessSnapshot();
  const finalOwnerHandoff = getStreamFoundationServerCopyFinalOwnerHandoffSnapshot();
  const items = getStreamFoundationFullSourceOnlyInstallBundleItems();
  const summary = getStreamFoundationFullSourceOnlyInstallBundleSummary(items);
  const status: StreamFoundationFullSourceOnlyInstallBundleStatus = summary.blockedItems > 0
    ? "full_source_only_install_bundle_blocked"
    : summary.reviewRequiredItems > 0
      ? "full_source_only_install_bundle_review_required"
      : "full_source_only_install_bundle_ready_for_owner_review";

  return {
    stage: STREAM_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGE,
    status,
    dependsOn: [
      "BACKEND_STREAM_FOUNDATION_136A_136Z",
      "BACKEND_STREAM_FOUNDATION_137A_137T",
      installBundle.stage,
      finalOwnerHandoff.stage,
    ],
    installBundle,
    finalOwnerHandoff,
    includedSourceScopes: INCLUDED_SOURCE_SCOPES,
    excludedSourceScopes: EXCLUDED_SOURCE_SCOPES,
    forbiddenUntilSeparateApproval: FORBIDDEN_UNTIL_SEPARATE_APPROVAL,
    items,
    summary,
    ownerApprovalPhrase: OWNER_APPROVAL_PHRASE,
    nextManualStep: NEXT_MANUAL_STEP,
    safety: SAFETY,
    frozenRules: {
      sourceOnlyInstallBundle: true,
      routeMountSeparateApprovalRequired: true,
      backendRestartSeparateApprovalRequired: true,
      databaseBindingSeparateApprovalRequired: true,
      providerBindingSeparateApprovalRequired: true,
      paymentProviderAndPayoutProviderSeparate: true,
      providerKeysServerSideOnly: true,
      walletCoinLedgerRequiredBeforeGiftSuccess: true,
      giftSuccessRequiresRealPaymentAuthorizationAndLedgerCommit: true,
      recipientEarningStartsPending: true,
      monthlyPayoutOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}
