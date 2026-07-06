import type { StreamFoundationServerCopyPreflightSnapshot } from "../server-copy-preflight";

export const STREAM_FOUNDATION_SERVER_COPY_DRY_RUN_VERIFICATION_STAGE =
  "BACKEND_STREAM_FOUNDATION_137P_SERVER_COPY_DRY_RUN_VERIFICATION" as const;

export type StreamFoundationServerCopyDryRunVerificationStatus =
  | "dry_run_ready_for_owner_review"
  | "dry_run_review_required"
  | "dry_run_blocked";

export type StreamFoundationServerCopyDryRunVerificationArea =
  | "target_root"
  | "patch_scope"
  | "server_copy"
  | "route_mount"
  | "typecheck"
  | "secrets"
  | "monetization"
  | "wallet_boundary"
  | "rollback";

export type StreamFoundationServerCopyDryRunVerificationCheckStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationServerCopyDryRunVerificationCheck = Readonly<{
  id: string;
  area: StreamFoundationServerCopyDryRunVerificationArea;
  status: StreamFoundationServerCopyDryRunVerificationCheckStatus;
  title: string;
  dryRunRule: string;
  expectedEvidence: readonly string[];
  failureAction: "stop_before_server_copy" | "manual_review_before_server_copy";
  blocksServerCopy: boolean;
  blocksRouteMount: true;
  blocksLiveMoneyMovement: true;
}>;

export type StreamFoundationServerCopyDryRunVerificationSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  dryRunOnly: true;
  performsServerCopyNow: false;
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

export type StreamFoundationServerCopyDryRunVerificationSummary = Readonly<{
  totalChecks: number;
  passedChecks: number;
  reviewRequiredChecks: number;
  blockedChecks: number;
  coveragePercent: number;
  preflightReadyForManualReview: boolean;
  readyForOwnerServerCopyReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForRouteMountNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationServerCopyDryRunVerificationSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_DRY_RUN_VERIFICATION_STAGE;
  status: StreamFoundationServerCopyDryRunVerificationStatus;
  dependsOn: readonly string[];
  preflight: StreamFoundationServerCopyPreflightSnapshot;
  checks: readonly StreamFoundationServerCopyDryRunVerificationCheck[];
  summary: StreamFoundationServerCopyDryRunVerificationSummary;
  safety: StreamFoundationServerCopyDryRunVerificationSafety;
  lockedRules: Readonly<{
    sourceCopyRequiresOwnerReview: true;
    dryRunDoesNotCopyToServer: true;
    dryRunDoesNotRestartBackend: true;
    dryRunDoesNotMountRoutes: true;
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
