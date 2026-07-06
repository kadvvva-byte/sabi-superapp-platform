import { getStreamFoundationServerCopyBundleSnapshot } from "../server-copy";
import type {
  StreamFoundationServerCopyPreflightChecklistItem,
  StreamFoundationServerCopyPreflightCommand,
  StreamFoundationServerCopyPreflightCommandStatus,
  StreamFoundationServerCopyPreflightSafety,
  StreamFoundationServerCopyPreflightSnapshot,
  StreamFoundationServerCopyPreflightSummary,
} from "./streamFoundationServerCopyPreflightCommandTypes";
import { STREAM_FOUNDATION_SERVER_COPY_PREFLIGHT_COMMAND_STAGE } from "./streamFoundationServerCopyPreflightCommandTypes";

const SAFETY: StreamFoundationServerCopyPreflightSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  commandPackageOnly: true,
  performsServerCopyNow: false,
  changesAppServerFilesNow: false,
  restartsBackendNow: false,
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

function command(
  id: string,
  kind: StreamFoundationServerCopyPreflightCommand["kind"],
  commandText: string,
  purpose: string,
  expectedSafeResult: string,
): StreamFoundationServerCopyPreflightCommand {
  return {
    id,
    kind,
    command: commandText,
    purpose,
    expectedSafeResult,
    mutatesServer: false,
    restartsBackend: false,
    mountsRoutes: false,
    readsOrWritesDatabase: false,
    callsProvider: false,
    movesMoney: false,
    returnsRawSecrets: false,
    exposesMobileProviderKeys: false,
  } as const;
}

function checklist(
  id: string,
  label: string,
  status: StreamFoundationServerCopyPreflightChecklistItem["status"] = "ready",
  failureAction: StreamFoundationServerCopyPreflightChecklistItem["failureAction"] = "stop_before_copy",
): StreamFoundationServerCopyPreflightChecklistItem {
  return {
    id,
    label,
    required: true,
    status,
    failureAction,
  } as const;
}

export function getStreamFoundationServerCopyPreflightSafety(): StreamFoundationServerCopyPreflightSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyPreflightCommands(): readonly StreamFoundationServerCopyPreflightCommand[] {
  return [
    command(
      "confirm_backend_root",
      "identity_check",
      "cd /opt/sabi/backend && test -f package.json && test -f tsconfig.json && test -d src/modules",
      "Confirm the target is the backend project root before any copy is considered.",
      "package.json, tsconfig.json and src/modules exist in /opt/sabi/backend",
    ),
    command(
      "confirm_stream_source_not_mounted",
      "route_mount_guard",
      "cd /opt/sabi/backend && test ! -f src/modules/stream/foundation/.route-mounted-now",
      "Keep Stream foundation routes unmounted before the separate route mount approval stage.",
      "no route-mounted marker exists",
    ),
    command(
      "scan_patch_for_app_server_files",
      "source_scan",
      "find ./src -type f | grep -E 'src/(app|server)\\.ts$' && exit 1 || exit 0",
      "Stop if a patch accidentally includes app.ts or server.ts during the source-copy stage.",
      "no app.ts or server.ts appears in the patch file list",
    ),
    command(
      "scan_patch_for_mobile_tree",
      "source_scan",
      "find ./src -type f | grep -E 'mobile-only-backend-boundary' && exit 1 || exit 0",
      "Stop if backend staging accidentally contains mobile-only or mobile-only paths.",
      "no mobile-only or forbidden module path appears",
    ),
    command(
      "scan_for_secret_leak_words",
      "safety_scan",
      "grep -R -n -E 'rawSecret|privateKey|providerSecret|mobileProviderKey' ./src/modules/stream/foundation && exit 1 || exit 0",
      "Stop if Stream foundation source exposes secret-bearing field names in unsafe response paths.",
      "no unsafe secret exposure terms are found",
    ),
    command(
      "scan_for_fake_money_success",
      "money_guard",
      "grep -R -n -E 'fakePaymentSuccess|fakeGiftSuccess|fakePayoutSuccess|allowsFakeSuccess: true' ./src/modules/stream/foundation && exit 1 || exit 0",
      "Stop if any fake payment, gift, earning or payout success path appears.",
      "no fake money success path is found",
    ),
    command(
      "typecheck_after_copy_only",
      "typecheck_plan",
      "cd /opt/sabi/backend && npx tsc --noEmit -p tsconfig.json",
      "Run backend TypeScript only after source copy review; this command does not start or restart services.",
      "backend TypeScript passes without service start",
    ),
    command(
      "rollback_note_source_only",
      "rollback_note",
      "echo 'rollback source-only Stream foundation files before any route mount or service restart'",
      "Document that rollback is source-only at this stage because no routes, providers or money movement are active.",
      "rollback note printed only",
    ),
  ] as const;
}

export function getStreamFoundationServerCopyPreflightChecklist(): readonly StreamFoundationServerCopyPreflightChecklistItem[] {
  return [
    checklist("backend_root_confirmed", "Confirm /opt/sabi/backend is the target root, not mobile."),
    checklist("patch_zip_reviewed", "Review the patch ZIP file list before any server copy."),
    checklist("app_server_untouched", "Confirm app.ts and server.ts are not included in the copy stage."),
    checklist("routes_unmounted", "Confirm /api/stream routes remain unmounted after source copy."),
    checklist("no_service_restart", "Do not restart backend during source-copy preflight."),
    checklist("no_data_store_change", "Do not change schema, migration or persistent storage in this stage."),
    checklist("no_provider_live_call", "Do not run payment, payout, media or realtime provider live calls."),
    checklist("wallet_messenger_untouched", "Do not mutate Wallet or Messenger runtime."),
    checklist("secrets_server_side_only", "Keep payment and payout provider secrets server-side and redacted."),
    checklist("fake_money_forbidden", "Reject fake gift, earning, payment or payout success."),
    checklist("monthly_payout_locked", "Keep creator payout monthly-only."),
    checklist("manual_review_before_copy", "Manual owner review is required before copying to server.", "review_required", "manual_review"),
  ] as const;
}

function summarize(
  commands: readonly StreamFoundationServerCopyPreflightCommand[],
  checklistItems: readonly StreamFoundationServerCopyPreflightChecklistItem[],
  serverCopyBundleReadyForReview: boolean,
): StreamFoundationServerCopyPreflightSummary {
  const blocked = checklistItems.filter((entry) => entry.status === "blocked").length;
  const reviewRequired = checklistItems.filter((entry) => entry.status === "review_required").length;
  return {
    totalCommands: commands.length,
    mutatingCommands: 0,
    restartCommands: 0,
    routeMountCommands: 0,
    databaseCommands: 0,
    providerCommands: 0,
    moneyCommands: 0,
    checklistItems: checklistItems.length,
    checklistReady: checklistItems.filter((entry) => entry.status === "ready").length,
    checklistReviewRequired: reviewRequired,
    checklistBlocked: blocked,
    serverCopyBundleReadyForReview,
    readyForManualServerCopyPreflight: serverCopyBundleReadyForReview && blocked === 0,
    readyForAutomaticServerCopyNow: false,
    readyForRouteMountNow: false,
    readyForLiveMoneyNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyPreflightSummary): StreamFoundationServerCopyPreflightCommandStatus {
  if (!summary.serverCopyBundleReadyForReview || summary.checklistBlocked > 0) {
    return "preflight_blocked";
  }
  if (summary.checklistReviewRequired > 0) {
    return "preflight_review_required";
  }
  return "preflight_ready_for_manual_review";
}

export function getStreamFoundationServerCopyPreflightSnapshot(): StreamFoundationServerCopyPreflightSnapshot {
  const serverCopyBundle = getStreamFoundationServerCopyBundleSnapshot();
  const commands = getStreamFoundationServerCopyPreflightCommands();
  const preflightChecklist = getStreamFoundationServerCopyPreflightChecklist();
  const summary = summarize(commands, preflightChecklist, serverCopyBundle.summary.readyForManualServerCopyReview);
  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_PREFLIGHT_COMMAND_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-137L",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    serverCopyBundle,
    commands,
    checklist: preflightChecklist,
    summary,
    safety: SAFETY,
    lockedRules: {
      copyDoesNotRestartBackend: true,
      copyDoesNotMountRoutes: true,
      routeMountRequiresSeparateApproval: true,
      dataStoreBindingRequiresSeparateApproval: true,
      providerLiveTestRequiresSeparateApproval: true,
      paymentProviderAndPayoutProviderRemainSeparate: true,
      adminProviderKeysRemainServerSideOnly: true,
      walletLedgerBindingRequiredBeforeGiftSuccess: true,
      recipientEarningStartsAsPending: true,
      payoutIsMonthlyOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}
