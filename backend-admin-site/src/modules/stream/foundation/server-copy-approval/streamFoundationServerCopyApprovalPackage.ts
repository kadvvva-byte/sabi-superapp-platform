import { getStreamFoundationServerCopyDryRunVerificationSnapshot } from "../server-copy-dry-run";
import {
  STREAM_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGE,
  type StreamFoundationServerCopyApprovalArea,
  type StreamFoundationServerCopyApprovalCheck,
  type StreamFoundationServerCopyApprovalCheckStatus,
  type StreamFoundationServerCopyApprovalSafety,
  type StreamFoundationServerCopyApprovalSnapshot,
  type StreamFoundationServerCopyApprovalStatus,
  type StreamFoundationServerCopyApprovalSummary,
} from "./streamFoundationServerCopyApprovalPackageTypes";

const OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-137Q source-only server copy package review for Stream foundation files only; no route mount, no backend restart, no DB write, no provider calls, no Wallet/Messenger mutation, no money movement." as const;

const ALLOWED_COPY_SCOPE = [
  "src/modules/stream/foundation/**",
  "src/modules/stream/index.ts",
  "STREAM_BACKEND_STAGING_README_*.md",
] as const;

const FORBIDDEN_COPY_SCOPE = [
  "src/app.ts",
  "src/server.ts",
  "src/modules/admin/**",
  "src/modules/wallet/** runtime mutation",
  "src/modules/messenger/** runtime mutation",
  "prisma/schema.prisma",
  "prisma/migrations/**",
  "admin-ui/**",
  "mobile/**",
  "superapp-mobile/**",
  ".env* secret value copy",
] as const;

const SAFETY: StreamFoundationServerCopyApprovalSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  approvalPackageOnly: true,
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
  area: StreamFoundationServerCopyApprovalArea,
  status: StreamFoundationServerCopyApprovalCheckStatus,
  title: string,
  approvalRule: string,
  requiredEvidence: readonly string[],
  ownerDecisionRequired = false,
  blocksSourceCopy = false,
): StreamFoundationServerCopyApprovalCheck {
  return {
    id,
    area,
    status,
    title,
    approvalRule,
    requiredEvidence,
    ownerDecisionRequired,
    blocksSourceCopy,
    blocksRouteMount: true,
    blocksDatabaseBinding: true,
    blocksProviderBinding: true,
    blocksLiveMoneyMovement: true,
  } as const;
}

export function getStreamFoundationServerCopyApprovalSafety(): StreamFoundationServerCopyApprovalSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyApprovalChecks(): readonly StreamFoundationServerCopyApprovalCheck[] {
  const dryRun = getStreamFoundationServerCopyDryRunVerificationSnapshot();
  const dryRunBlocked = dryRun.status === "dry_run_blocked";
  const dryRunReview = dryRun.status === "dry_run_review_required";

  return [
    check(
      "approval_dry_run_connected",
      "server_copy",
      dryRunBlocked ? "blocked" : dryRunReview ? "review_required" : "passed",
      "137P dry-run verification must be connected before source-copy approval",
      "137Q can only prepare an approval package when the dry-run snapshot exists and is not blocked.",
      [dryRun.status, `checks=${dryRun.summary.totalChecks}`, `blocked=${dryRun.summary.blockedChecks}`],
      dryRunReview,
      dryRunBlocked,
    ),
    check(
      "approval_exact_owner_phrase_required",
      "owner_approval",
      "review_required",
      "Exact owner approval phrase is required before copying to /opt/sabi/backend",
      "The package cannot copy files by itself; it only defines the approval phrase and review requirements.",
      [OWNER_APPROVAL_PHRASE],
      true,
      false,
    ),
    check(
      "approval_stream_source_scope_only",
      "source_scope",
      "passed",
      "Allowed copy scope is Stream foundation source only",
      "The source-only copy scope excludes app/server mount files, admin-ui, prisma schema/migrations, mobile and secret files.",
      [...ALLOWED_COPY_SCOPE, ...FORBIDDEN_COPY_SCOPE.map((scope) => `forbidden:${scope}`)],
    ),
    check(
      "approval_route_mount_forbidden",
      "route_mount",
      "passed",
      "Route mount stays forbidden during source-only copy",
      "Any future /api/stream mount requires a separate route-mount approval after source files are copied and typecheck passes.",
      ["mountsRoutesNow=false", "app.ts/server.ts untouched", "separate route mount approval required"],
    ),
    check(
      "approval_security_guards_required",
      "security",
      "passed",
      "Protected routes must stay behind 137B security guards",
      "Future routes must pass auth/session, permission, idempotency, rate-limit and audit guards before handler execution.",
      ["137B security guard pipeline", "137C protected route factory", "137D protected route definitions"],
    ),
    check(
      "approval_typecheck_required_after_copy",
      "typecheck",
      "review_required",
      "Server typecheck is required immediately after source copy",
      "After approved source copy, backend must run npx tsc --noEmit -p tsconfig.json before any restart or mount decision.",
      ["npx tsc --noEmit -p tsconfig.json", "no restart before typecheck", "stop on first TypeScript error"],
      true,
      false,
    ),
    check(
      "approval_monetization_rules_locked",
      "monetization",
      "passed",
      "Stream monetization rules are locked before server copy",
      "Accept-payment provider, payout provider and Wallet/COIN ledger remain separate; provider_not_configured must block live money actions.",
      ["accept-payment provider separate", "payout provider separate", "Wallet/COIN ledger required", "provider_not_configured blocks success"],
    ),
    check(
      "approval_wallet_boundary_locked",
      "wallet_boundary",
      "passed",
      "Wallet ledger binding remains separate and cannot be faked",
      "Gift success requires real payment authorization and ledger commit in later controlled stages; this package cannot mutate Wallet.",
      ["mutatesWalletNow=false", "movesMoneyNow=false", "fake gift success=false"],
    ),
    check(
      "approval_monthly_payout_locked",
      "monetization",
      "passed",
      "Monthly payout policy remains one payout cycle per month",
      "Recipient earnings start as pending and are released only through monthly payout gates after KYC, approval, provider and ledger checks.",
      ["recipient pending earning first", "monthly payout only", "direct withdrawal blocked"],
    ),
    check(
      "approval_rollback_source_only",
      "rollback",
      "passed",
      "Rollback is source-only before route mount and DB/provider stages",
      "Because source copy is unmounted and has no migration or provider execution, rollback removes only copied Stream foundation files.",
      ["no route mount", "no schema migration", "no backend restart required for rollback", "source-only rollback"],
    ),
  ] as const;
}

function summarize(
  checks: readonly StreamFoundationServerCopyApprovalCheck[],
  dryRunReadyForOwnerReview: boolean,
): StreamFoundationServerCopyApprovalSummary {
  const totalChecks = checks.length;
  const passedChecks = checks.filter((entry) => entry.status === "passed").length;
  const reviewRequiredChecks = checks.filter((entry) => entry.status === "review_required").length;
  const blockedChecks = checks.filter((entry) => entry.status === "blocked").length;
  const ownerDecisionRequiredChecks = checks.filter((entry) => entry.ownerDecisionRequired).length;
  const blocksSourceCopy = checks.some((entry) => entry.blocksSourceCopy || entry.status === "blocked");
  return {
    totalChecks,
    passedChecks,
    reviewRequiredChecks,
    blockedChecks,
    ownerDecisionRequiredChecks,
    coveragePercent: totalChecks === 0 ? 0 : Math.round(((passedChecks + reviewRequiredChecks) / totalChecks) * 100),
    dryRunReadyForOwnerReview,
    readyForSourceOnlyServerCopyApproval: dryRunReadyForOwnerReview && !blocksSourceCopy,
    readyForAutomaticServerCopyNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseBindingNow: false,
    readyForProviderBindingNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyApprovalSummary): StreamFoundationServerCopyApprovalStatus {
  if (summary.blockedChecks > 0 || !summary.readyForSourceOnlyServerCopyApproval) {
    return "source_only_approval_blocked";
  }
  if (summary.reviewRequiredChecks > 0 || summary.ownerDecisionRequiredChecks > 0) {
    return "source_only_approval_review_required";
  }
  return "source_only_approval_ready_for_owner_review";
}

export function getStreamFoundationServerCopyApprovalSnapshot(): StreamFoundationServerCopyApprovalSnapshot {
  const dryRun = getStreamFoundationServerCopyDryRunVerificationSnapshot();
  const checks = getStreamFoundationServerCopyApprovalChecks();
  const summary = summarize(checks, dryRun.summary.readyForOwnerServerCopyReview);
  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137P",
      "BACKEND-STREAM-FOUNDATION-137O",
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    dryRun,
    checks,
    summary,
    safety: SAFETY,
    ownerApprovalPhrase: OWNER_APPROVAL_PHRASE,
    allowedCopyScope: ALLOWED_COPY_SCOPE,
    forbiddenCopyScope: FORBIDDEN_COPY_SCOPE,
    lockedRules: {
      sourceCopyRequiresExactOwnerApproval: true,
      approvalPackageDoesNotCopyToServer: true,
      approvalPackageDoesNotRestartBackend: true,
      approvalPackageDoesNotMountRoutes: true,
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
