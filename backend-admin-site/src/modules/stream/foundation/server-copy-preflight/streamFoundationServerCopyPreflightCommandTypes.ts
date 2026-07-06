import type { StreamFoundationServerCopyBundleSnapshot } from "../server-copy";

export const STREAM_FOUNDATION_SERVER_COPY_PREFLIGHT_COMMAND_STAGE =
  "BACKEND_STREAM_FOUNDATION_137O_SERVER_COPY_PREFLIGHT_COMMAND_PACKAGE" as const;

export type StreamFoundationServerCopyPreflightCommandStatus =
  | "preflight_ready_for_manual_review"
  | "preflight_review_required"
  | "preflight_blocked";

export type StreamFoundationServerCopyPreflightCommandKind =
  | "identity_check"
  | "source_scan"
  | "safety_scan"
  | "typecheck_plan"
  | "route_mount_guard"
  | "money_guard"
  | "rollback_note";

export type StreamFoundationServerCopyPreflightCommand = Readonly<{
  id: string;
  kind: StreamFoundationServerCopyPreflightCommandKind;
  command: string;
  purpose: string;
  expectedSafeResult: string;
  mutatesServer: false;
  restartsBackend: false;
  mountsRoutes: false;
  readsOrWritesDatabase: false;
  callsProvider: false;
  movesMoney: false;
  returnsRawSecrets: false;
  exposesMobileProviderKeys: false;
}>;

export type StreamFoundationServerCopyPreflightChecklistItem = Readonly<{
  id: string;
  label: string;
  required: true;
  status: "ready" | "review_required" | "blocked";
  failureAction: "stop_before_copy" | "manual_review";
}>;

export type StreamFoundationServerCopyPreflightSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  commandPackageOnly: true;
  performsServerCopyNow: false;
  changesAppServerFilesNow: false;
  restartsBackendNow: false;
  mountsRoutesNow: false;
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

export type StreamFoundationServerCopyPreflightSummary = Readonly<{
  totalCommands: number;
  mutatingCommands: 0;
  restartCommands: 0;
  routeMountCommands: 0;
  databaseCommands: 0;
  providerCommands: 0;
  moneyCommands: 0;
  checklistItems: number;
  checklistReady: number;
  checklistReviewRequired: number;
  checklistBlocked: number;
  serverCopyBundleReadyForReview: boolean;
  readyForManualServerCopyPreflight: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForRouteMountNow: false;
  readyForLiveMoneyNow: false;
}>;

export type StreamFoundationServerCopyPreflightSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_PREFLIGHT_COMMAND_STAGE;
  status: StreamFoundationServerCopyPreflightCommandStatus;
  dependsOn: readonly string[];
  serverCopyBundle: StreamFoundationServerCopyBundleSnapshot;
  commands: readonly StreamFoundationServerCopyPreflightCommand[];
  checklist: readonly StreamFoundationServerCopyPreflightChecklistItem[];
  summary: StreamFoundationServerCopyPreflightSummary;
  safety: StreamFoundationServerCopyPreflightSafety;
  lockedRules: Readonly<{
    copyDoesNotRestartBackend: true;
    copyDoesNotMountRoutes: true;
    routeMountRequiresSeparateApproval: true;
    dataStoreBindingRequiresSeparateApproval: true;
    providerLiveTestRequiresSeparateApproval: true;
    paymentProviderAndPayoutProviderRemainSeparate: true;
    adminProviderKeysRemainServerSideOnly: true;
    walletLedgerBindingRequiredBeforeGiftSuccess: true;
    recipientEarningStartsAsPending: true;
    payoutIsMonthlyOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
