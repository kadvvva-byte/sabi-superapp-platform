import { getStreamFoundationServerCopyPreflightSnapshot } from "../server-copy-preflight";
import {
  STREAM_FOUNDATION_SERVER_COPY_DRY_RUN_VERIFICATION_STAGE,
  type StreamFoundationServerCopyDryRunVerificationArea,
  type StreamFoundationServerCopyDryRunVerificationCheck,
  type StreamFoundationServerCopyDryRunVerificationCheckStatus,
  type StreamFoundationServerCopyDryRunVerificationSafety,
  type StreamFoundationServerCopyDryRunVerificationSnapshot,
  type StreamFoundationServerCopyDryRunVerificationStatus,
  type StreamFoundationServerCopyDryRunVerificationSummary,
} from "./streamFoundationServerCopyDryRunVerificationTypes";

const SAFETY: StreamFoundationServerCopyDryRunVerificationSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  dryRunOnly: true,
  performsServerCopyNow: false,
  copiesFilesToServerNow: false,
  restartsBackendNow: false,
  mountsRoutesNow: false,
  changesAppServerFilesNow: false,
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

function check(
  id: string,
  area: StreamFoundationServerCopyDryRunVerificationArea,
  status: StreamFoundationServerCopyDryRunVerificationCheckStatus,
  title: string,
  dryRunRule: string,
  expectedEvidence: readonly string[],
  failureAction: StreamFoundationServerCopyDryRunVerificationCheck["failureAction"] = "stop_before_server_copy",
  blocksServerCopy = false,
): StreamFoundationServerCopyDryRunVerificationCheck {
  return {
    id,
    area,
    status,
    title,
    dryRunRule,
    expectedEvidence,
    failureAction,
    blocksServerCopy,
    blocksRouteMount: true,
    blocksLiveMoneyMovement: true,
  } as const;
}

export function getStreamFoundationServerCopyDryRunVerificationSafety(): StreamFoundationServerCopyDryRunVerificationSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyDryRunVerificationChecks(): readonly StreamFoundationServerCopyDryRunVerificationCheck[] {
  const preflight = getStreamFoundationServerCopyPreflightSnapshot();
  const preflightBlocked = preflight.status === "preflight_blocked";
  const preflightReview = preflight.status === "preflight_review_required";

  return [
    check(
      "dry_run_backend_root_check",
      "target_root",
      "passed",
      "Backend root must be confirmed before any copy command is used",
      "Dry-run package must require /opt/sabi/backend package.json, tsconfig.json and src/modules checks before copy.",
      ["137O confirm_backend_root command", "target is backend, not mobile"],
    ),
    check(
      "dry_run_patch_scope_check",
      "patch_scope",
      "passed",
      "Patch scope is Stream backend foundation only",
      "Dry-run must reject app.ts, server.ts, mobile tree, Admin UI files, schema and migration changes during source-copy review.",
      ["src/modules/stream/foundation/**", "src/modules/stream/index.ts", "no app/server mount files"],
    ),
    check(
      "dry_run_preflight_connected",
      "server_copy",
      preflightBlocked ? "blocked" : preflightReview ? "review_required" : "passed",
      "137O preflight command package is connected",
      "137P must depend on 137O instead of creating a second copy checklist.",
      [preflight.status, `commands=${preflight.summary.totalCommands}`, `blocked=${preflight.summary.checklistBlocked}`],
      preflightBlocked ? "stop_before_server_copy" : "manual_review_before_server_copy",
      preflightBlocked,
    ),
    check(
      "dry_run_typecheck_plan",
      "typecheck",
      "passed",
      "TypeScript check is planned but not executed by this patch",
      "Dry-run can define the command plan, but it must not start the backend service or perform runtime execution.",
      ["npx tsc --noEmit -p tsconfig.json", "no backend restart", "no service start"],
    ),
    check(
      "dry_run_route_mount_closed",
      "route_mount",
      "passed",
      "Route mount remains closed",
      "Dry-run must keep /api/stream routes unmounted until a separate owner-approved mount patch.",
      ["app.ts/server.ts untouched", "mountRoutesNow=false", "route mount approval required"],
    ),
    check(
      "dry_run_secret_redaction",
      "secrets",
      "passed",
      "Provider secrets stay server-side and redacted",
      "Accept-payment, payout and settlement provider keys must never be returned to Admin UI or mobile clients.",
      ["server-side secret refs only", "raw secrets returned=false", "mobile provider keys=false"],
    ),
    check(
      "dry_run_monetization_rules",
      "monetization",
      "review_required",
      "Gift and payout monetization rules are present but not live",
      "Dry-run confirms rules only: provider config, Wallet ledger, real payment authorization and ledger commit are still required before gift success.",
      ["accept-payment provider separate", "payout provider separate", "fake money success forbidden"],
      "manual_review_before_server_copy",
    ),
    check(
      "dry_run_wallet_boundary",
      "wallet_boundary",
      "review_required",
      "Wallet/COIN ledger binding remains a separate stage",
      "Stream foundation may require Wallet ledger for gifts but this dry-run cannot mutate Wallet runtime or move money.",
      ["Wallet mutation=false", "money movement=false", "ledger adapter separate"],
      "manual_review_before_server_copy",
    ),
    check(
      "dry_run_monthly_payout_locked",
      "monetization",
      "passed",
      "Creator payout remains monthly-only",
      "Recipient earnings start as pending and can be released only through monthly payout batch gates.",
      ["recipient earning pending first", "monthly payout only", "direct withdrawal blocked"],
    ),
    check(
      "dry_run_rollback_defined",
      "rollback",
      "passed",
      "Rollback is source-only before mount",
      "Because source copy is unmounted and no DB/provider/money actions run, rollback can remove the Stream foundation source files before any route mount stage.",
      ["no restart", "no route mount", "no schema migration", "source-only rollback"],
    ),
  ] as const;
}

function summarize(
  checks: readonly StreamFoundationServerCopyDryRunVerificationCheck[],
  preflightReadyForManualReview: boolean,
): StreamFoundationServerCopyDryRunVerificationSummary {
  const totalChecks = checks.length;
  const passedChecks = checks.filter((entry) => entry.status === "passed").length;
  const reviewRequiredChecks = checks.filter((entry) => entry.status === "review_required").length;
  const blockedChecks = checks.filter((entry) => entry.status === "blocked").length;
  const blockingServerCopy = checks.some((entry) => entry.blocksServerCopy || entry.status === "blocked");
  return {
    totalChecks,
    passedChecks,
    reviewRequiredChecks,
    blockedChecks,
    coveragePercent: totalChecks === 0 ? 0 : Math.round(((passedChecks + reviewRequiredChecks) / totalChecks) * 100),
    preflightReadyForManualReview,
    readyForOwnerServerCopyReview: preflightReadyForManualReview && !blockingServerCopy,
    readyForAutomaticServerCopyNow: false,
    readyForRouteMountNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyDryRunVerificationSummary): StreamFoundationServerCopyDryRunVerificationStatus {
  if (summary.blockedChecks > 0 || !summary.readyForOwnerServerCopyReview) {
    return "dry_run_blocked";
  }
  if (summary.reviewRequiredChecks > 0) {
    return "dry_run_review_required";
  }
  return "dry_run_ready_for_owner_review";
}

export function getStreamFoundationServerCopyDryRunVerificationSnapshot(): StreamFoundationServerCopyDryRunVerificationSnapshot {
  const preflight = getStreamFoundationServerCopyPreflightSnapshot();
  const checks = getStreamFoundationServerCopyDryRunVerificationChecks();
  const summary = summarize(checks, preflight.summary.readyForManualServerCopyPreflight);
  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_DRY_RUN_VERIFICATION_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137O",
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    preflight,
    checks,
    summary,
    safety: SAFETY,
    lockedRules: {
      sourceCopyRequiresOwnerReview: true,
      dryRunDoesNotCopyToServer: true,
      dryRunDoesNotRestartBackend: true,
      dryRunDoesNotMountRoutes: true,
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
