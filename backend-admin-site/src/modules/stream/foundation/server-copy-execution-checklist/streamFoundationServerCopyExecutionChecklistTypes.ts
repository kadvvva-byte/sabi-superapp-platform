import type { StreamFoundationServerCopyCommandDraftSnapshot } from "../server-copy-command";

export const STREAM_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGE =
  "BACKEND_STREAM_FOUNDATION_137S_SERVER_COPY_SOURCE_ONLY_EXECUTION_CHECKLIST" as const;

export type StreamFoundationServerCopyExecutionChecklistStatus =
  | "source_only_execution_checklist_ready_for_owner_review"
  | "source_only_execution_checklist_review_required"
  | "source_only_execution_checklist_blocked";

export type StreamFoundationServerCopyExecutionChecklistArea =
  | "owner_approval"
  | "artifact_integrity"
  | "target_safety"
  | "backup"
  | "copy_scope"
  | "post_copy_verification"
  | "typecheck"
  | "route_mount_boundary"
  | "database_boundary"
  | "provider_boundary"
  | "wallet_monetization_boundary"
  | "rollback";

export type StreamFoundationServerCopyExecutionChecklistItemStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationServerCopyExecutionChecklistItem = Readonly<{
  id: string;
  area: StreamFoundationServerCopyExecutionChecklistArea;
  status: StreamFoundationServerCopyExecutionChecklistItemStatus;
  title: string;
  requiredBeforeManualCopy: boolean;
  requiredEvidence: readonly string[];
  safeCommandDraft: string;
  commandExecutedByThisPatch: false;
  forbiddenEffects: readonly string[];
  blocksRouteMount: true;
  blocksDatabaseBinding: true;
  blocksProviderBinding: true;
  blocksLiveMoneyMovement: true;
}>;

export type StreamFoundationServerCopyExecutionChecklistSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  checklistOnly: true;
  executesChecklistCommandsNow: false;
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

export type StreamFoundationServerCopyExecutionChecklistSummary = Readonly<{
  totalItems: number;
  passedItems: number;
  reviewRequiredItems: number;
  blockedItems: number;
  requiredBeforeManualCopyItems: number;
  coveragePercent: number;
  commandDraftReady: boolean;
  readyForOwnerManualExecutionReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForBackendRestartNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseBindingNow: false;
  readyForProviderBindingNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationServerCopyExecutionChecklistSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_EXECUTION_CHECKLIST_STAGE;
  status: StreamFoundationServerCopyExecutionChecklistStatus;
  dependsOn: readonly string[];
  commandDraft: StreamFoundationServerCopyCommandDraftSnapshot;
  items: readonly StreamFoundationServerCopyExecutionChecklistItem[];
  summary: StreamFoundationServerCopyExecutionChecklistSummary;
  safety: StreamFoundationServerCopyExecutionChecklistSafety;
  ownerApprovalPhrase: string;
  manualExecutionBoundary: Readonly<{
    checklistDoesNotRunCommands: true;
    ownerMustRunCommandsManually: true;
    sourceCopyScopeIsStreamFoundationOnly: true;
    backendRestartRequiresSeparateApproval: true;
    routeMountRequiresSeparateApproval: true;
    databaseBindingRequiresSeparateApproval: true;
    providerBindingRequiresSeparateApproval: true;
    walletLedgerLiveBindingRequiresSeparateApproval: true;
    paymentProviderAndPayoutProviderRemainSeparate: true;
    providerKeysRemainServerSideOnly: true;
    giftSuccessRequiresRealAuthorizationAndLedgerCommit: true;
    recipientEarningStartsPending: true;
    monthlyPayoutOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
