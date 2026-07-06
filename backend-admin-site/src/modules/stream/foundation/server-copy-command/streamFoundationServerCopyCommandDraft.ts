import { getStreamFoundationServerCopyApprovalSnapshot } from "../server-copy-approval";
import {
  STREAM_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGE,
  type StreamFoundationServerCopyCommand,
  type StreamFoundationServerCopyCommandArea,
  type StreamFoundationServerCopyCommandDraftSnapshot,
  type StreamFoundationServerCopyCommandDraftStatus,
  type StreamFoundationServerCopyCommandKind,
  type StreamFoundationServerCopyCommandSafety,
  type StreamFoundationServerCopyCommandStatus,
  type StreamFoundationServerCopyCommandSummary,
} from "./streamFoundationServerCopyCommandDraftTypes";

const OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-137R source-only server copy command review for Stream foundation files only; command execution allowed only manually by owner, no route mount, no backend restart, no DB write, no provider calls, no Wallet/Messenger mutation, no money movement." as const;

const SAFETY: StreamFoundationServerCopyCommandSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  commandDraftOnly: true,
  performsServerCopyNow: false,
  executesShellCommandsNow: false,
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

function command(
  id: string,
  area: StreamFoundationServerCopyCommandArea,
  kind: StreamFoundationServerCopyCommandKind,
  status: StreamFoundationServerCopyCommandStatus,
  title: string,
  commandText: string,
  expectedEvidence: readonly string[],
  commandRequiresOwnerApproval = true,
): StreamFoundationServerCopyCommand {
  return {
    id,
    area,
    kind,
    status,
    title,
    command: commandText,
    commandIsExecutedByThisPatch: false,
    commandRequiresOwnerApproval,
    expectedEvidence,
    forbiddenEffects: [
      "backend restart",
      "route mount",
      "database write",
      "schema migration",
      "provider call",
      "Wallet mutation",
      "Messenger mutation",
      "money movement",
      "raw secret output",
      "fake payment/gift/earning/payout success",
    ],
    blocksRouteMount: true,
    blocksDatabaseBinding: true,
    blocksProviderBinding: true,
    blocksLiveMoneyMovement: true,
  } as const;
}

export function getStreamFoundationServerCopyCommandSafety(): StreamFoundationServerCopyCommandSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyCommands(): readonly StreamFoundationServerCopyCommand[] {
  const approval = getStreamFoundationServerCopyApprovalSnapshot();
  const approvalBlocked = approval.status === "source_only_approval_blocked";
  const approvalReview = approval.status === "source_only_approval_review_required";

  return [
    command(
      "command_exact_owner_approval_phrase",
      "owner_approval",
      "manual_review",
      approvalBlocked ? "blocked" : "review_required",
      "Owner must approve the source-only command draft before any server-side copy command is run",
      `printf '%s\\n' ${JSON.stringify(OWNER_APPROVAL_PHRASE)}`,
      [OWNER_APPROVAL_PHRASE, approval.status],
      true,
    ),
    command(
      "command_backend_root_preflight",
      "preflight",
      "preflight_readonly",
      approvalBlocked ? "blocked" : approvalReview ? "review_required" : "passed",
      "Confirm target is backend root and not mobile/Admin UI",
      "test -f package.json && test -f tsconfig.json && test -d src/modules && pwd",
      ["must run from /opt/sabi/backend", "package.json present", "tsconfig.json present", "src/modules present"],
      true,
    ),
    command(
      "command_create_source_backup",
      "source_copy",
      "create_backup",
      "review_required",
      "Create a timestamped source backup before copying Stream foundation files",
      "mkdir -p .data/stream-backups && tar -czf .data/stream-backups/stream-foundation-before-137r-$(date -u +%Y%m%dT%H%M%SZ).tar.gz src/modules/stream 2>/dev/null || true",
      ["backup archive path under .data/stream-backups", "source-only rollback possible"],
      true,
    ),
    command(
      "command_copy_stream_foundation_source_only",
      "source_copy",
      "copy_source_only",
      "review_required",
      "Copy Stream foundation source files only after explicit owner approval",
      "unzip -o sabi-backend-stream-foundation-137r-server-copy-command-draft-local-staging-patch-safe-blocked.zip 'src/modules/stream/foundation/*' 'src/modules/stream/index.ts' 'STREAM_BACKEND_STAGING_README_137R.md'",
      ["src/modules/stream/foundation/** copied", "src/modules/stream/index.ts copied", "no app.ts/server.ts change"],
      true,
    ),
    command(
      "command_verify_forbidden_scope_absent",
      "source_copy",
      "verify_no_forbidden_scope",
      "passed",
      "Verify forbidden server, admin, mobile, schema and secret files are not part of the source-only copy",
      "find . -path './src/app.ts' -o -path './src/server.ts' -o -path './admin-ui/*' -o -path './prisma/schema.prisma' -o -path './prisma/migrations/*' -o -path './superapp-mobile/*'",
      ["expected empty output for copied patch scope", "route mount files untouched", "schema/migrations untouched"],
      true,
    ),
    command(
      "command_typecheck_after_copy",
      "typecheck",
      "typecheck",
      "review_required",
      "Run TypeScript check after source-only copy and before any restart/mount decision",
      "npx tsc --noEmit -p tsconfig.json",
      ["typecheck passes", "no restart before typecheck", "stop on first TypeScript error"],
      true,
    ),
    command(
      "command_route_mount_remains_closed",
      "route_mount",
      "manual_review",
      "passed",
      "Route mount remains a separate owner-approved stage",
      "printf '%s\\n' 'ROUTE MOUNT BLOCKED: do not edit src/app.ts or src/server.ts in 137R'",
      ["mountsRoutesNow=false", "app.ts/server.ts untouched", "separate 137 route-mount approval required"],
      false,
    ),
    command(
      "command_database_binding_remains_closed",
      "database_binding",
      "manual_review",
      "passed",
      "Database binding remains separate from source-only copy",
      "printf '%s\\n' 'DATABASE BINDING BLOCKED: no schema/migration/Prisma write in 137R'",
      ["schema mutation=false", "migration=false", "DB write=false"],
      false,
    ),
    command(
      "command_provider_binding_remains_closed",
      "provider_binding",
      "manual_review",
      "passed",
      "Provider live binding remains separate from source-only copy",
      "printf '%s\\n' 'PROVIDER BINDING BLOCKED: no provider call/live test in 137R'",
      ["provider calls=false", "raw secrets returned=false", "mobile provider keys=false"],
      false,
    ),
    command(
      "command_wallet_monetization_boundaries_locked",
      "monetization",
      "manual_review",
      "passed",
      "Gift monetization and Wallet ledger boundaries remain locked until real provider/ledger stages",
      "printf '%s\\n' 'MONEY MOVEMENT BLOCKED: gift success requires real payment authorization + Wallet ledger commit; payout monthly only'",
      ["accept-payment provider separate", "payout provider separate", "pending earning first", "monthly payout only"],
      false,
    ),
    command(
      "command_source_only_rollback",
      "rollback",
      "rollback_source_only",
      "passed",
      "Rollback source-only copy before any route mount or DB/provider binding",
      "tar -xzf .data/stream-backups/stream-foundation-before-137r-YYYYMMDDTHHMMSSZ.tar.gz || true",
      ["rollback uses pre-copy backup", "source-only rollback", "no provider/DB rollback needed because none executed"],
      true,
    ),
  ] as const;
}

function summarize(commands: readonly StreamFoundationServerCopyCommand[]): StreamFoundationServerCopyCommandSummary {
  const totalCommands = commands.length;
  const passedCommands = commands.filter((entry) => entry.status === "passed").length;
  const reviewRequiredCommands = commands.filter((entry) => entry.status === "review_required").length;
  const blockedCommands = commands.filter((entry) => entry.status === "blocked").length;
  const ownerApprovalRequiredCommands = commands.filter((entry) => entry.commandRequiresOwnerApproval).length;
  const approvalReadyForSourceCopy = blockedCommands === 0;
  return {
    totalCommands,
    passedCommands,
    reviewRequiredCommands,
    blockedCommands,
    ownerApprovalRequiredCommands,
    coveragePercent: totalCommands === 0 ? 0 : Math.round(((passedCommands + reviewRequiredCommands) / totalCommands) * 100),
    approvalReadyForSourceCopy,
    readyForManualSourceCopyCommandReview: approvalReadyForSourceCopy,
    readyForAutomaticServerCopyNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseBindingNow: false,
    readyForProviderBindingNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyCommandSummary): StreamFoundationServerCopyCommandDraftStatus {
  if (summary.blockedCommands > 0 || !summary.readyForManualSourceCopyCommandReview) {
    return "source_only_copy_command_blocked";
  }
  if (summary.reviewRequiredCommands > 0 || summary.ownerApprovalRequiredCommands > 0) {
    return "source_only_copy_command_review_required";
  }
  return "source_only_copy_command_ready_for_owner_review";
}

export function getStreamFoundationServerCopyCommandDraftSnapshot(): StreamFoundationServerCopyCommandDraftSnapshot {
  const approval = getStreamFoundationServerCopyApprovalSnapshot();
  const commands = getStreamFoundationServerCopyCommands();
  const summary = summarize(commands);
  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137Q",
      "BACKEND-STREAM-FOUNDATION-137P",
      "BACKEND-STREAM-FOUNDATION-137O",
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    approval,
    commands,
    summary,
    safety: SAFETY,
    ownerApprovalPhrase: OWNER_APPROVAL_PHRASE,
    lockedRules: {
      commandDraftDoesNotExecuteCommands: true,
      sourceCopyRequiresExactOwnerApproval: true,
      copyScopeIsStreamFoundationOnly: true,
      routeMountRequiresSeparateApproval: true,
      dataStoreBindingRequiresSeparateApproval: true,
      providerLiveTestRequiresSeparateApproval: true,
      backendRestartRequiresSeparateApproval: true,
      paymentProviderAndPayoutProviderRemainSeparate: true,
      adminProviderKeysRemainServerSideOnly: true,
      walletLedgerBindingRequiredBeforeGiftSuccess: true,
      recipientEarningStartsAsPending: true,
      payoutIsMonthlyOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}
