import type { StreamFoundationServerCopyExecutionChecklistSnapshot } from "../server-copy-execution-checklist";

export const STREAM_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGE =
  "BACKEND_STREAM_FOUNDATION_137T_SERVER_COPY_FINAL_OWNER_HANDOFF" as const;

export type StreamFoundationServerCopyFinalOwnerHandoffStatus =
  | "final_owner_handoff_ready_for_manual_review"
  | "final_owner_handoff_review_required"
  | "final_owner_handoff_blocked";

export type StreamFoundationServerCopyFinalOwnerHandoffArea =
  | "owner_approval"
  | "source_copy_scope"
  | "server_safety"
  | "route_mount_boundary"
  | "database_boundary"
  | "provider_boundary"
  | "wallet_monetization_boundary"
  | "secret_safety"
  | "typecheck_boundary"
  | "rollback_boundary";

export type StreamFoundationServerCopyFinalOwnerHandoffItemStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationServerCopyFinalOwnerHandoffItem = Readonly<{
  id: string;
  area: StreamFoundationServerCopyFinalOwnerHandoffArea;
  status: StreamFoundationServerCopyFinalOwnerHandoffItemStatus;
  title: string;
  requiredForManualServerCopy: boolean;
  evidence: readonly string[];
  forbiddenUntilSeparateApproval: readonly string[];
}>;

export type StreamFoundationServerCopyFinalOwnerHandoffSafety = Readonly<{
  localStagingOnly: true;
  finalHandoffOnly: true;
  patchZipOnly: true;
  performsServerCopyNow: false;
  restartsBackendNow: false;
  mountsRoutesNow: false;
  changesAppServerFilesNow: false;
  createsRouterInstanceNow: false;
  readsDatabaseNow: false;
  writesDatabaseNow: false;
  mutatesDatabaseSchemaNow: false;
  runsMigrationNow: false;
  callsProviderNow: false;
  runsProviderLiveTestNow: false;
  writesMediaStorageNow: false;
  publishesRealtimeNow: false;
  mutatesWalletNow: false;
  mutatesMessengerNow: false;
  movesMoneyNow: false;
  returnsRawSecrets: false;
  exposesMobileProviderKeys: false;
  allowsFakePaymentSuccess: false;
  allowsFakeGiftSuccess: false;
  allowsFakeEarningCredit: false;
  allowsFakePayoutSuccess: false;
  allowsFakeSuccess: false;
}>;

export type StreamFoundationServerCopyFinalOwnerHandoffSummary = Readonly<{
  totalItems: number;
  passedItems: number;
  reviewRequiredItems: number;
  blockedItems: number;
  requiredForManualServerCopyItems: number;
  coveragePercent: number;
  readyForOwnerManualServerCopyReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForBackendRestartNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseBindingNow: false;
  readyForProviderBindingNow: false;
  readyForWalletLedgerLiveBindingNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationServerCopyFinalOwnerHandoffSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_FINAL_OWNER_HANDOFF_STAGE;
  status: StreamFoundationServerCopyFinalOwnerHandoffStatus;
  dependsOn: readonly string[];
  executionChecklist: StreamFoundationServerCopyExecutionChecklistSnapshot;
  items: readonly StreamFoundationServerCopyFinalOwnerHandoffItem[];
  summary: StreamFoundationServerCopyFinalOwnerHandoffSummary;
  ownerApprovalPhrase: string;
  nextManualStep: string;
  safety: StreamFoundationServerCopyFinalOwnerHandoffSafety;
  frozenRules: Readonly<{
    streamFoundationSourceOnly: true;
    routeMountSeparateApprovalRequired: true;
    backendRestartSeparateApprovalRequired: true;
    databaseBindingSeparateApprovalRequired: true;
    providerBindingSeparateApprovalRequired: true;
    paymentProviderAndPayoutProviderSeparate: true;
    providerKeysServerSideOnly: true;
    walletCoinLedgerRequiredBeforeGiftSuccess: true;
    giftSuccessRequiresRealPaymentAuthorizationAndLedgerCommit: true;
    recipientEarningStartsPending: true;
    monthlyPayoutOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
