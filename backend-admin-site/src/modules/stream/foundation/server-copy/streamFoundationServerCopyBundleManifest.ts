import { getStreamFoundationFinalLocalStagingVerificationSnapshot } from "../final-verification";
import type {
  StreamFoundationServerCopyBundleItem,
  StreamFoundationServerCopyBundleSafety,
  StreamFoundationServerCopyBundleSnapshot,
  StreamFoundationServerCopyBundleStatus,
  StreamFoundationServerCopyBundleSummary,
} from "./streamFoundationServerCopyBundleManifestTypes";
import { STREAM_FOUNDATION_SERVER_COPY_BUNDLE_MANIFEST_STAGE } from "./streamFoundationServerCopyBundleManifestTypes";

const SAFETY: StreamFoundationServerCopyBundleSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  serverCopyManifestOnly: true,
  performsServerCopyNow: false,
  changesAppServerFilesNow: false,
  mountsRoutesNow: false,
  createsExpressRouterInstanceNow: false,
  executesRuntimeNow: false,
  readsDatabaseNow: false,
  writesDatabaseNow: false,
  mutatesDatabaseSchemaNow: false,
  runsMigrationNow: false,
  callsProviderNow: false,
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

function item(
  id: string,
  category: StreamFoundationServerCopyBundleItem["category"],
  sourcePath: string,
  serverTargetPath: string,
  purpose: string,
  requiredBeforeCopy: readonly string[],
  requiredAfterCopyBeforeMount: readonly string[],
  status: StreamFoundationServerCopyBundleItem["status"] = "include",
  copyAllowedInSourceStage = true,
): StreamFoundationServerCopyBundleItem {
  return {
    id,
    category,
    status,
    sourcePath,
    serverTargetPath,
    purpose,
    copyAllowedInSourceStage,
    routeMountAllowedInSourceStage: false,
    databaseMutationAllowedInSourceStage: false,
    providerCallAllowedInSourceStage: false,
    moneyMovementAllowedInSourceStage: false,
    requiredBeforeCopy,
    requiredAfterCopyBeforeMount,
  } as const;
}

export function getStreamFoundationServerCopyBundleSafety(): StreamFoundationServerCopyBundleSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyBundleItems(): readonly StreamFoundationServerCopyBundleItem[] {
  return [
    item(
      "stream_foundation_source_tree",
      "source_tree",
      "src/modules/stream/foundation/**",
      "/opt/sabi/backend/src/modules/stream/foundation/**",
      "Copy the staged Stream backend foundation package as source files before any server mount or restart.",
      ["owner review of patch ZIP", "confirm target project is backend, not mobile"],
      ["run backend TypeScript", "verify routes remain unmounted", "verify no money movement"],
    ),
    item(
      "stream_index_exports",
      "index_exports",
      "src/modules/stream/index.ts",
      "/opt/sabi/backend/src/modules/stream/index.ts",
      "Expose the Stream foundation modules for backend typecheck without changing app.ts/server.ts.",
      ["compare existing Stream exports", "avoid removing unrelated exports"],
      ["run backend TypeScript", "scan import surface"],
    ),
    item(
      "security_guards",
      "security",
      "src/modules/stream/foundation/security/**",
      "/opt/sabi/backend/src/modules/stream/foundation/security/**",
      "Keep auth/session, admin permission, idempotency, rate-limit and audit guards available for future routes.",
      ["review admin token/permission mapping"],
      ["bind persistent audit sink before paid commands"],
      "review_required",
    ),
    item(
      "protected_routes_unmounted",
      "routes",
      "src/modules/stream/foundation/routes/**",
      "/opt/sabi/backend/src/modules/stream/foundation/routes/**",
      "Copy protected route source modules but keep them unmounted until the separate mount stage.",
      ["confirm route mount remains false"],
      ["separate owner-approved mount patch", "post-mount smoke"],
      "review_required",
    ),
    item(
      "monetization_foundation",
      "monetization",
      "src/modules/stream/foundation/monetization/**",
      "/opt/sabi/backend/src/modules/stream/foundation/monetization/**",
      "Copy Stream gifts, earnings, provider-config and monthly payout foundation without live money execution.",
      ["confirm fake money success is forbidden", "confirm provider keys are server-side only"],
      ["configure real provider refs", "bind real ledger adapter", "run provider live-test later"],
      "review_required",
    ),
    item(
      "wallet_ledger_boundary",
      "wallet_boundary",
      "src/modules/stream/foundation/monetization/*Ledger*",
      "/opt/sabi/backend/src/modules/stream/foundation/monetization/*Ledger*",
      "Keep Wallet/COIN ledger as a required gate for gifts while not mutating Wallet runtime during copy.",
      ["confirm Wallet runtime remains untouched"],
      ["separate Wallet ledger adapter stage"],
      "review_required",
    ),
    item(
      "server_mount_boundary",
      "server_mount_boundary",
      "no app.ts/server.ts in this patch",
      "/opt/sabi/backend/src/app.ts and /opt/sabi/backend/src/server.ts remain unchanged",
      "Server copy stage must not mount routes or restart the backend service.",
      ["verify patch ZIP does not contain app.ts/server.ts"],
      ["separate route mount approval"],
    ),
    item(
      "database_boundary",
      "database_boundary",
      "contracts only",
      "no database schema or migration target in this patch",
      "Persistence map and repositories are contracts only until a separate database adapter/schema stage.",
      ["verify no schema file in patch"],
      ["separate schema and repository adapter review"],
    ),
    item(
      "provider_boundary",
      "provider_boundary",
      "provider gate contracts only",
      "no live provider binding in this patch",
      "Payment, payout, media and realtime providers remain gated and unavailable until configured server-side.",
      ["confirm no provider live call in copy stage"],
      ["provider live-test in separate stage"],
    ),
    item(
      "secret_boundary",
      "secret_boundary",
      "redacted config contracts only",
      "server-side secret refs only",
      "Raw provider keys must never be returned to Admin UI responses or mobile clients.",
      ["review redacted response contracts"],
      ["bind encrypted secret vault later"],
    ),
    item(
      "final_verification_snapshot",
      "verification",
      "src/modules/stream/foundation/final-verification/**",
      "/opt/sabi/backend/src/modules/stream/foundation/final-verification/**",
      "Copy final local staging verification so the server source contains the same safety evidence.",
      ["137M verification must not be blocked"],
      ["run server typecheck and source scan"],
      "review_required",
    ),
  ] as const;
}

function summarize(items: readonly StreamFoundationServerCopyBundleItem[], finalReady: boolean): StreamFoundationServerCopyBundleSummary {
  const totalItems = items.length;
  const includeItems = items.filter((entry) => entry.status === "include").length;
  const reviewRequiredItems = items.filter((entry) => entry.status === "review_required").length;
  const blockedItems = items.filter((entry) => entry.status === "blocked").length;
  const copyAllowedItems = items.filter((entry) => entry.copyAllowedInSourceStage).length;
  return {
    totalItems,
    includeItems,
    reviewRequiredItems,
    blockedItems,
    copyAllowedItems,
    routeMountAllowedItemsNow: 0,
    databaseMutationAllowedItemsNow: 0,
    providerCallAllowedItemsNow: 0,
    moneyMovementAllowedItemsNow: 0,
    finalLocalVerificationReady: finalReady,
    readyForManualServerCopyReview: finalReady && blockedItems === 0,
    readyForAutomaticServerCopyNow: false,
    readyForRouteMountNow: false,
    readyForLiveMoneyNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyBundleSummary): StreamFoundationServerCopyBundleStatus {
  if (summary.blockedItems > 0 || !summary.finalLocalVerificationReady) {
    return "server_copy_bundle_blocked";
  }
  if (summary.reviewRequiredItems > 0) {
    return "server_copy_bundle_review_required";
  }
  return "server_copy_bundle_ready_for_review";
}

export function getStreamFoundationServerCopyBundleSnapshot(): StreamFoundationServerCopyBundleSnapshot {
  const finalLocalVerification = getStreamFoundationFinalLocalStagingVerificationSnapshot();
  const items = getStreamFoundationServerCopyBundleItems();
  const finalReady = finalLocalVerification.summary.readyForServerCopyReview;
  const summary = summarize(items, finalReady);
  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_BUNDLE_MANIFEST_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-137L",
      "BACKEND-STREAM-FOUNDATION-136Z",
      "BACKEND-STREAM-FOUNDATION-137B",
      "BACKEND-STREAM-FOUNDATION-137K",
    ],
    finalLocalVerification,
    installRoot: {
      localPatchRoot: "src/modules/stream/foundation",
      serverRoot: "/opt/sabi/backend",
      serverTargetRoot: "/opt/sabi/backend/src/modules/stream/foundation",
      serverStreamIndexTarget: "/opt/sabi/backend/src/modules/stream/index.ts",
    },
    items,
    summary,
    safety: SAFETY,
    serverCopyRules: {
      copyOnlyAfterOwnerApproval: true,
      copySourceFilesBeforeRouteMount: true,
      runTypecheckAfterCopy: true,
      restartForbiddenDuringCopyStage: true,
      routeMountRequiresSeparatePatch: true,
      adminProviderKeysRemainServerSideOnly: true,
      paymentProviderAndPayoutProviderRemainSeparate: true,
      walletLedgerBindingRequiresSeparateStage: true,
      giftSuccessRequiresRealPaymentAuthorization: true,
      recipientEarningStartsAsPending: true,
      payoutIsMonthlyOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}
