import type { StreamFoundationServerCopyApprovalSnapshot } from "../server-copy-approval";

export const STREAM_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGE =
  "BACKEND_STREAM_FOUNDATION_137R_SERVER_COPY_SOURCE_ONLY_COMMAND_DRAFT" as const;

export type StreamFoundationServerCopyCommandDraftStatus =
  | "source_only_copy_command_ready_for_owner_review"
  | "source_only_copy_command_review_required"
  | "source_only_copy_command_blocked";

export type StreamFoundationServerCopyCommandArea =
  | "owner_approval"
  | "preflight"
  | "source_copy"
  | "typecheck"
  | "route_mount"
  | "database_binding"
  | "provider_binding"
  | "wallet_boundary"
  | "monetization"
  | "rollback";

export type StreamFoundationServerCopyCommandStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationServerCopyCommandKind =
  | "manual_review"
  | "preflight_readonly"
  | "create_backup"
  | "copy_source_only"
  | "verify_no_forbidden_scope"
  | "typecheck"
  | "rollback_source_only";

export type StreamFoundationServerCopyCommand = Readonly<{
  id: string;
  area: StreamFoundationServerCopyCommandArea;
  kind: StreamFoundationServerCopyCommandKind;
  status: StreamFoundationServerCopyCommandStatus;
  title: string;
  command: string;
  commandIsExecutedByThisPatch: false;
  commandRequiresOwnerApproval: boolean;
  expectedEvidence: readonly string[];
  forbiddenEffects: readonly string[];
  blocksRouteMount: true;
  blocksDatabaseBinding: true;
  blocksProviderBinding: true;
  blocksLiveMoneyMovement: true;
}>;

export type StreamFoundationServerCopyCommandSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  commandDraftOnly: true;
  performsServerCopyNow: false;
  executesShellCommandsNow: false;
  copiesFilesToServerNow: false;
  restartsBackendNow: false;
  mountsRoutesNow: false;
  changesAppServerFilesNow: false;
  createsExpressRouterInstanceNow: false;
  executesRuntimeNow: false;
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

export type StreamFoundationServerCopyCommandSummary = Readonly<{
  totalCommands: number;
  passedCommands: number;
  reviewRequiredCommands: number;
  blockedCommands: number;
  ownerApprovalRequiredCommands: number;
  coveragePercent: number;
  approvalReadyForSourceCopy: boolean;
  readyForManualSourceCopyCommandReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseBindingNow: false;
  readyForProviderBindingNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationServerCopyCommandDraftSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_COMMAND_DRAFT_STAGE;
  status: StreamFoundationServerCopyCommandDraftStatus;
  dependsOn: readonly string[];
  approval: StreamFoundationServerCopyApprovalSnapshot;
  commands: readonly StreamFoundationServerCopyCommand[];
  summary: StreamFoundationServerCopyCommandSummary;
  safety: StreamFoundationServerCopyCommandSafety;
  ownerApprovalPhrase: string;
  lockedRules: Readonly<{
    commandDraftDoesNotExecuteCommands: true;
    sourceCopyRequiresExactOwnerApproval: true;
    copyScopeIsStreamFoundationOnly: true;
    routeMountRequiresSeparateApproval: true;
    dataStoreBindingRequiresSeparateApproval: true;
    providerLiveTestRequiresSeparateApproval: true;
    backendRestartRequiresSeparateApproval: true;
    paymentProviderAndPayoutProviderRemainSeparate: true;
    adminProviderKeysRemainServerSideOnly: true;
    walletLedgerBindingRequiredBeforeGiftSuccess: true;
    recipientEarningStartsAsPending: true;
    payoutIsMonthlyOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
