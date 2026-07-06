import type { StreamFoundationServerCopyDryRunVerificationSnapshot } from "../server-copy-dry-run";

export const STREAM_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGE =
  "BACKEND_STREAM_FOUNDATION_137Q_SERVER_COPY_SOURCE_ONLY_APPROVAL_PACKAGE" as const;

export type StreamFoundationServerCopyApprovalStatus =
  | "source_only_approval_ready_for_owner_review"
  | "source_only_approval_review_required"
  | "source_only_approval_blocked";

export type StreamFoundationServerCopyApprovalArea =
  | "owner_approval"
  | "source_scope"
  | "server_copy"
  | "route_mount"
  | "security"
  | "typecheck"
  | "monetization"
  | "wallet_boundary"
  | "rollback";

export type StreamFoundationServerCopyApprovalCheckStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationServerCopyApprovalCheck = Readonly<{
  id: string;
  area: StreamFoundationServerCopyApprovalArea;
  status: StreamFoundationServerCopyApprovalCheckStatus;
  title: string;
  approvalRule: string;
  requiredEvidence: readonly string[];
  ownerDecisionRequired: boolean;
  blocksSourceCopy: boolean;
  blocksRouteMount: true;
  blocksDatabaseBinding: true;
  blocksProviderBinding: true;
  blocksLiveMoneyMovement: true;
}>;

export type StreamFoundationServerCopyApprovalSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  approvalPackageOnly: true;
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

export type StreamFoundationServerCopyApprovalSummary = Readonly<{
  totalChecks: number;
  passedChecks: number;
  reviewRequiredChecks: number;
  blockedChecks: number;
  ownerDecisionRequiredChecks: number;
  coveragePercent: number;
  dryRunReadyForOwnerReview: boolean;
  readyForSourceOnlyServerCopyApproval: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseBindingNow: false;
  readyForProviderBindingNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationServerCopyApprovalSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_APPROVAL_PACKAGE_STAGE;
  status: StreamFoundationServerCopyApprovalStatus;
  dependsOn: readonly string[];
  dryRun: StreamFoundationServerCopyDryRunVerificationSnapshot;
  checks: readonly StreamFoundationServerCopyApprovalCheck[];
  summary: StreamFoundationServerCopyApprovalSummary;
  safety: StreamFoundationServerCopyApprovalSafety;
  ownerApprovalPhrase: string;
  allowedCopyScope: readonly string[];
  forbiddenCopyScope: readonly string[];
  lockedRules: Readonly<{
    sourceCopyRequiresExactOwnerApproval: true;
    approvalPackageDoesNotCopyToServer: true;
    approvalPackageDoesNotRestartBackend: true;
    approvalPackageDoesNotMountRoutes: true;
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
