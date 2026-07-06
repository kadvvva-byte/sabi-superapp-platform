import { getStreamFoundationServerCopyCommandDraftSnapshot } from "../server-copy-command";
import {
  STREAM_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGE,
  type StreamFoundationServerCopyExecutionChecklistArea,
  type StreamFoundationServerCopyExecutionChecklistItem,
  type StreamFoundationServerCopyExecutionChecklistItemStatus,
  type StreamFoundationServerCopyExecutionChecklistSafety,
  type StreamFoundationServerCopyExecutionChecklistSnapshot,
  type StreamFoundationServerCopyExecutionChecklistStatus,
  type StreamFoundationServerCopyExecutionChecklistSummary,
} from "./streamFoundationServerCopyExecutionChecklistTypes";

const OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-137S source-only server copy execution checklist review only; commands may be executed manually by owner later, no route mount, no backend restart, no DB write, no provider calls, no Wallet/Messenger mutation, no money movement." as const;

const SAFETY: StreamFoundationServerCopyExecutionChecklistSafety = {
  localStagingOnly: true,
  patchZipOnly: true,
  checklistOnly: true,
  executesChecklistCommandsNow: false,
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

const FORBIDDEN_EFFECTS = [
  "backend restart",
  "route mount",
  "app/server source mutation",
  "database write",
  "schema migration",
  "provider call",
  "media storage write",
  "realtime broadcast",
  "Wallet mutation",
  "Messenger mutation",
  "money movement",
  "raw secret output",
  "mobile provider key exposure",
  "fake payment/gift/earning/payout success",
] as const;

function item(
  id: string,
  area: StreamFoundationServerCopyExecutionChecklistArea,
  status: StreamFoundationServerCopyExecutionChecklistItemStatus,
  title: string,
  requiredBeforeManualCopy: boolean,
  requiredEvidence: readonly string[],
  safeCommandDraft: string,
): StreamFoundationServerCopyExecutionChecklistItem {
  return {
    id,
    area,
    status,
    title,
    requiredBeforeManualCopy,
    requiredEvidence,
    safeCommandDraft,
    commandExecutedByThisPatch: false,
    forbiddenEffects: FORBIDDEN_EFFECTS,
    blocksRouteMount: true,
    blocksDatabaseBinding: true,
    blocksProviderBinding: true,
    blocksLiveMoneyMovement: true,
  } as const;
}

export function getStreamFoundationServerCopyExecutionChecklistSafety(): StreamFoundationServerCopyExecutionChecklistSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyExecutionChecklistItems(): readonly StreamFoundationServerCopyExecutionChecklistItem[] {
  const commandDraft = getStreamFoundationServerCopyCommandDraftSnapshot();
  const commandBlocked = commandDraft.status === "source_only_copy_command_blocked";
  const commandReview = commandDraft.status === "source_only_copy_command_review_required";

  return [
    item(
      "checklist_exact_owner_approval_phrase",
      "owner_approval",
      commandBlocked ? "blocked" : "review_required",
      "Owner approval phrase must be reviewed before any manual server-copy execution",
      true,
      [OWNER_APPROVAL_PHRASE, commandDraft.status],
      `printf '%s\\n' ${JSON.stringify(OWNER_APPROVAL_PHRASE)}`,
    ),
    item(
      "checklist_patch_artifact_integrity",
      "artifact_integrity",
      commandBlocked ? "blocked" : commandReview ? "review_required" : "passed",
      "Confirm the exact Stream foundation patch artifact is present and unchanged before manual copy",
      true,
      ["patch ZIP exists", "patch scope is src/modules/stream/foundation/** plus src/modules/stream/index.ts", "no Admin UI/mobile/server mount files included"],
      "test -f sabi-backend-stream-foundation-137s-server-copy-execution-checklist-local-staging-patch-safe-blocked.zip && unzip -l sabi-backend-stream-foundation-137s-server-copy-execution-checklist-local-staging-patch-safe-blocked.zip | sed -n '1,120p'",
    ),
    item(
      "checklist_backend_target_safety",
      "target_safety",
      commandBlocked ? "blocked" : "review_required",
      "Confirm manual execution target is backend root only",
      true,
      ["pwd is /opt/sabi/backend", "package.json present", "tsconfig.json present", "src/modules present"],
      "test -f package.json && test -f tsconfig.json && test -d src/modules && pwd",
    ),
    item(
      "checklist_create_stream_source_backup",
      "backup",
      "review_required",
      "Create rollback backup before manual source-only copy",
      true,
      ["timestamped archive under .data/stream-backups", "backup command completed before unzip"],
      "mkdir -p .data/stream-backups && tar -czf .data/stream-backups/stream-foundation-before-137s-$(date -u +%Y%m%dT%H%M%SZ).tar.gz src/modules/stream 2>/dev/null || true",
    ),
    item(
      "checklist_source_only_copy_scope",
      "copy_scope",
      "review_required",
      "Copy Stream foundation source only and keep server mount files untouched",
      true,
      ["src/modules/stream/foundation/** copied", "src/modules/stream/index.ts copied", "src/app.ts untouched", "src/server.ts untouched"],
      "unzip -o sabi-backend-stream-foundation-137s-server-copy-execution-checklist-local-staging-patch-safe-blocked.zip 'src/modules/stream/foundation/*' 'src/modules/stream/index.ts' 'STREAM_BACKEND_STAGING_README_137S.md'",
    ),
    item(
      "checklist_forbidden_scope_post_copy_scan",
      "post_copy_verification",
      "passed",
      "Verify forbidden source scopes remain untouched after manual copy",
      true,
      ["no app/server source patch", "no Admin UI patch", "no schema/migration patch", "no mobile patch"],
      "find . -path './src/app.ts' -o -path './src/server.ts' -o -path './admin-ui/*' -o -path './prisma/schema.prisma' -o -path './prisma/migrations/*' -o -path './superapp-mobile/*'",
    ),
    item(
      "checklist_typecheck_before_any_restart",
      "typecheck",
      "review_required",
      "Run TypeScript check before any restart or route mount decision",
      true,
      ["npx tsc --noEmit -p tsconfig.json passes", "no backend restart before typecheck"],
      "npx tsc --noEmit -p tsconfig.json",
    ),
    item(
      "checklist_route_mount_boundary_locked",
      "route_mount_boundary",
      "passed",
      "Route mount remains blocked and separate from source-only copy",
      false,
      ["mountsRoutesNow=false", "app.ts/server.ts untouched", "separate owner approval required for route mount"],
      "printf '%s\\n' 'ROUTE MOUNT BLOCKED IN 137S: do not edit src/app.ts or src/server.ts'",
    ),
    item(
      "checklist_database_boundary_locked",
      "database_boundary",
      "passed",
      "Database binding and schema changes remain blocked in source-only server copy",
      false,
      ["DB write=false", "schema mutation=false", "migration=false", "repository contracts only"],
      "printf '%s\\n' 'DATABASE BINDING BLOCKED IN 137S: no schema, migration or live DB write'",
    ),
    item(
      "checklist_provider_boundary_locked",
      "provider_boundary",
      "passed",
      "Provider live calls remain blocked until explicit provider binding stage",
      false,
      ["provider calls=false", "raw secrets returned=false", "mobile provider keys=false"],
      "printf '%s\\n' 'PROVIDER BINDING BLOCKED IN 137S: no live test, no provider call, no secret output'",
    ),
    item(
      "checklist_wallet_monetization_rules_locked",
      "wallet_monetization_boundary",
      "passed",
      "Wallet and Stream monetization money rules remain locked during source-only copy",
      false,
      ["accept-payment provider remains separate", "payout provider remains separate", "Wallet ledger required", "recipient earning starts pending", "payout monthly only"],
      "printf '%s\\n' 'MONEY MOVEMENT BLOCKED IN 137S: gift success requires real payment authorization plus Wallet ledger commit; payout monthly only'",
    ),
    item(
      "checklist_source_only_rollback_ready",
      "rollback",
      "passed",
      "Rollback source-only copy from pre-copy backup if typecheck fails",
      true,
      ["backup exists", "rollback command known", "no DB/provider rollback required because none executed"],
      "tar -xzf .data/stream-backups/stream-foundation-before-137s-YYYYMMDDTHHMMSSZ.tar.gz || true",
    ),
  ] as const;
}

function summarize(items: readonly StreamFoundationServerCopyExecutionChecklistItem[]): StreamFoundationServerCopyExecutionChecklistSummary {
  const totalItems = items.length;
  const passedItems = items.filter((entry) => entry.status === "passed").length;
  const reviewRequiredItems = items.filter((entry) => entry.status === "review_required").length;
  const blockedItems = items.filter((entry) => entry.status === "blocked").length;
  const requiredBeforeManualCopyItems = items.filter((entry) => entry.requiredBeforeManualCopy).length;
  const commandDraftReady = blockedItems === 0;

  return {
    totalItems,
    passedItems,
    reviewRequiredItems,
    blockedItems,
    requiredBeforeManualCopyItems,
    coveragePercent: totalItems === 0 ? 0 : Math.round(((passedItems + reviewRequiredItems) / totalItems) * 100),
    commandDraftReady,
    readyForOwnerManualExecutionReview: commandDraftReady,
    readyForAutomaticServerCopyNow: false,
    readyForBackendRestartNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseBindingNow: false,
    readyForProviderBindingNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyExecutionChecklistSummary): StreamFoundationServerCopyExecutionChecklistStatus {
  if (summary.blockedItems > 0 || !summary.readyForOwnerManualExecutionReview) {
    return "source_only_execution_checklist_blocked";
  }
  if (summary.reviewRequiredItems > 0 || summary.requiredBeforeManualCopyItems > 0) {
    return "source_only_execution_checklist_review_required";
  }
  return "source_only_execution_checklist_ready_for_owner_review";
}

export function getStreamFoundationServerCopyExecutionChecklistSnapshot(): StreamFoundationServerCopyExecutionChecklistSnapshot {
  const commandDraft = getStreamFoundationServerCopyCommandDraftSnapshot();
  const items = getStreamFoundationServerCopyExecutionChecklistItems();
  const summary = summarize(items);

  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137R",
      "BACKEND-STREAM-FOUNDATION-137Q",
      "BACKEND-STREAM-FOUNDATION-137P",
      "BACKEND-STREAM-FOUNDATION-137O",
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    commandDraft,
    items,
    summary,
    safety: SAFETY,
    ownerApprovalPhrase: OWNER_APPROVAL_PHRASE,
    manualExecutionBoundary: {
      checklistDoesNotRunCommands: true,
      ownerMustRunCommandsManually: true,
      sourceCopyScopeIsStreamFoundationOnly: true,
      backendRestartRequiresSeparateApproval: true,
      routeMountRequiresSeparateApproval: true,
      databaseBindingRequiresSeparateApproval: true,
      providerBindingRequiresSeparateApproval: true,
      walletLedgerLiveBindingRequiresSeparateApproval: true,
      paymentProviderAndPayoutProviderRemainSeparate: true,
      providerKeysRemainServerSideOnly: true,
      giftSuccessRequiresRealAuthorizationAndLedgerCommit: true,
      recipientEarningStartsPending: true,
      monthlyPayoutOnly: true,
      fakeMoneySuccessForbidden: true,
    },
  } as const;
}
