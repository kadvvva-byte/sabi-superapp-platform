import { getStreamFoundationServerCopyExecutionChecklistSnapshot } from "../server-copy-execution-checklist";
import {
  STREAM_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGE,
  type StreamFoundationServerCopyFinalOwnerHandoffArea,
  type StreamFoundationServerCopyFinalOwnerHandoffItem,
  type StreamFoundationServerCopyFinalOwnerHandoffItemStatus,
  type StreamFoundationServerCopyFinalOwnerHandoffSafety,
  type StreamFoundationServerCopyFinalOwnerHandoffSnapshot,
  type StreamFoundationServerCopyFinalOwnerHandoffStatus,
  type StreamFoundationServerCopyFinalOwnerHandoffSummary,
} from "./streamFoundationServerCopyFinalOwnerHandoffTypes";

const OWNER_APPROVAL_PHRASE =
  "I approve BACKEND-STREAM-FOUNDATION-137T source-only Stream foundation server-copy manual review; source copy may be prepared by owner only, route mount forbidden, backend restart forbidden, DB write forbidden, provider calls forbidden, Wallet/Messenger mutation forbidden, money movement forbidden." as const;

const NEXT_MANUAL_STEP =
  "Manual server-copy may be reviewed after owner approval, but route mount, backend restart, DB binding, provider binding, Wallet ledger live binding, and money movement remain separate future approvals." as const;

const SAFETY: StreamFoundationServerCopyFinalOwnerHandoffSafety = {
  localStagingOnly: true,
  finalHandoffOnly: true,
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

const FORBIDDEN_UNTIL_SEPARATE_APPROVAL = [
  "route mount",
  "backend restart",
  "app.ts/server.ts mutation",
  "database write",
  "schema migration",
  "provider call",
  "provider live test",
  "Wallet ledger live binding",
  "Messenger runtime mutation",
  "money movement",
  "raw secret output",
  "mobile provider key exposure",
  "fake payment/gift/earning/payout success",
] as const;

function handoffItem(
  id: string,
  area: StreamFoundationServerCopyFinalOwnerHandoffArea,
  status: StreamFoundationServerCopyFinalOwnerHandoffItemStatus,
  title: string,
  requiredForManualServerCopy: boolean,
  evidence: readonly string[],
): StreamFoundationServerCopyFinalOwnerHandoffItem {
  return {
    id,
    area,
    status,
    title,
    requiredForManualServerCopy,
    evidence,
    forbiddenUntilSeparateApproval: FORBIDDEN_UNTIL_SEPARATE_APPROVAL,
  } as const;
}

export function getStreamFoundationServerCopyFinalOwnerHandoffSafety(): StreamFoundationServerCopyFinalOwnerHandoffSafety {
  return SAFETY;
}

export function getStreamFoundationServerCopyFinalOwnerHandoffItems(): readonly StreamFoundationServerCopyFinalOwnerHandoffItem[] {
  const checklist = getStreamFoundationServerCopyExecutionChecklistSnapshot();
  const checklistBlocked = checklist.status === "source_only_execution_checklist_blocked";

  return [
    handoffItem(
      "final_owner_approval_phrase_locked",
      "owner_approval",
      checklistBlocked ? "blocked" : "review_required",
      "Owner approval phrase is locked for manual source-only server-copy review",
      true,
      [OWNER_APPROVAL_PHRASE, checklist.ownerApprovalPhrase],
    ),
    handoffItem(
      "final_source_copy_scope_locked",
      "source_copy_scope",
      "passed",
      "Source-copy scope is restricted to Stream foundation source files and Stream index exports",
      true,
      ["src/modules/stream/foundation/**", "src/modules/stream/index.ts", "no mobile/Admin UI/server mount files"],
    ),
    handoffItem(
      "final_server_safety_locked",
      "server_safety",
      "passed",
      "Server copy is not performed by this patch and backend restart is forbidden",
      true,
      ["performsServerCopyNow=false", "restartsBackendNow=false", "localStagingOnly=true"],
    ),
    handoffItem(
      "final_route_mount_boundary_locked",
      "route_mount_boundary",
      "passed",
      "Route mount remains a separate future approval and app.ts/server.ts stay untouched",
      false,
      ["mountsRoutesNow=false", "changesAppServerFilesNow=false", "createsRouterInstanceNow=false"],
    ),
    handoffItem(
      "final_database_boundary_locked",
      "database_boundary",
      "passed",
      "Database binding, schema mutation, and migrations remain blocked",
      false,
      ["writesDatabaseNow=false", "mutatesDatabaseSchemaNow=false", "runsMigrationNow=false"],
    ),
    handoffItem(
      "final_provider_boundary_locked",
      "provider_boundary",
      "passed",
      "Provider calls and provider live tests remain blocked until dedicated provider binding",
      false,
      ["callsProviderNow=false", "runsProviderLiveTestNow=false", "returnsRawSecrets=false"],
    ),
    handoffItem(
      "final_wallet_monetization_boundary_locked",
      "wallet_monetization_boundary",
      "passed",
      "Wallet/COIN gift monetization rules remain strict and no money movement is allowed now",
      false,
      [
        "accept-payment provider separate from payout provider",
        "Wallet/COIN ledger required before gift success",
        "recipient earning starts pending",
        "monthly payout only",
        "movesMoneyNow=false",
      ],
    ),
    handoffItem(
      "final_secret_safety_locked",
      "secret_safety",
      "passed",
      "Provider keys remain server-side only and raw secrets are never returned",
      true,
      ["providerKeysServerSideOnly=true", "returnsRawSecrets=false", "exposesMobileProviderKeys=false"],
    ),
    handoffItem(
      "final_typecheck_before_restart_locked",
      "typecheck_boundary",
      "review_required",
      "TypeScript must pass after manual source copy and before any restart decision",
      true,
      ["npx tsc --noEmit -p tsconfig.json", "no backend restart before typecheck"],
    ),
    handoffItem(
      "final_rollback_boundary_locked",
      "rollback_boundary",
      "passed",
      "Rollback must stay source-only because no DB/provider/money effects are allowed in this stage",
      true,
      ["backup before source copy", "rollback from backup if typecheck fails", "no DB/provider rollback needed"],
    ),
  ] as const;
}

function summarize(items: readonly StreamFoundationServerCopyFinalOwnerHandoffItem[]): StreamFoundationServerCopyFinalOwnerHandoffSummary {
  const totalItems = items.length;
  const passedItems = items.filter((entry) => entry.status === "passed").length;
  const reviewRequiredItems = items.filter((entry) => entry.status === "review_required").length;
  const blockedItems = items.filter((entry) => entry.status === "blocked").length;
  const requiredForManualServerCopyItems = items.filter((entry) => entry.requiredForManualServerCopy).length;

  return {
    totalItems,
    passedItems,
    reviewRequiredItems,
    blockedItems,
    requiredForManualServerCopyItems,
    coveragePercent: totalItems === 0 ? 0 : Math.round(((passedItems + reviewRequiredItems) / totalItems) * 100),
    readyForOwnerManualServerCopyReview: blockedItems === 0,
    readyForAutomaticServerCopyNow: false,
    readyForBackendRestartNow: false,
    readyForRouteMountNow: false,
    readyForDatabaseBindingNow: false,
    readyForProviderBindingNow: false,
    readyForWalletLedgerLiveBindingNow: false,
    readyForLiveMoneyMovementNow: false,
  } as const;
}

function resolveStatus(summary: StreamFoundationServerCopyFinalOwnerHandoffSummary): StreamFoundationServerCopyFinalOwnerHandoffStatus {
  if (summary.blockedItems > 0) {
    return "final_owner_handoff_blocked";
  }
  if (summary.reviewRequiredItems > 0 || summary.requiredForManualServerCopyItems > 0) {
    return "final_owner_handoff_review_required";
  }
  return "final_owner_handoff_ready_for_manual_review";
}

export function getStreamFoundationServerCopyFinalOwnerHandoffSnapshot(): StreamFoundationServerCopyFinalOwnerHandoffSnapshot {
  const executionChecklist = getStreamFoundationServerCopyExecutionChecklistSnapshot();
  const items = getStreamFoundationServerCopyFinalOwnerHandoffItems();
  const summary = summarize(items);

  return {
    stage: STREAM_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGE,
    status: resolveStatus(summary),
    dependsOn: [
      "BACKEND-STREAM-FOUNDATION-137S",
      "BACKEND-STREAM-FOUNDATION-137R",
      "BACKEND-STREAM-FOUNDATION-137Q",
      "BACKEND-STREAM-FOUNDATION-137P",
      "BACKEND-STREAM-FOUNDATION-137O",
      "BACKEND-STREAM-FOUNDATION-137N",
      "BACKEND-STREAM-FOUNDATION-137M",
      "BACKEND-STREAM-FOUNDATION-136Z",
    ],
    executionChecklist,
    items,
    summary,
    ownerApprovalPhrase: OWNER_APPROVAL_PHRASE,
    nextManualStep: NEXT_MANUAL_STEP,
    safety: SAFETY,
    frozenRules: {
      streamFoundationSourceOnly: true,
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
