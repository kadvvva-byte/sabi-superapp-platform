import type { StreamFoundationServerCopyFinalOwnerHandoffSnapshot } from "../server-copy-final-handoff";
import type { StreamFoundationInstallBundleReadinessSnapshot } from "../install-bundle";

export const STREAM_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGE =
  "BACKEND_STREAM_FOUNDATION_137U_FULL_SOURCE_ONLY_INSTALL_BUNDLE" as const;

export type StreamFoundationFullSourceOnlyInstallBundleStatus =
  | "full_source_only_install_bundle_ready_for_owner_review"
  | "full_source_only_install_bundle_review_required"
  | "full_source_only_install_bundle_blocked";

export type StreamFoundationFullSourceOnlyInstallBundleArea =
  | "bundle_scope"
  | "source_only_boundary"
  | "stream_foundation_coverage"
  | "monetization_coverage"
  | "security_route_coverage"
  | "server_copy_boundary"
  | "route_mount_boundary"
  | "database_boundary"
  | "provider_boundary"
  | "wallet_messenger_boundary"
  | "money_movement_boundary"
  | "secret_boundary"
  | "typecheck_boundary"
  | "rollback_boundary";

export type StreamFoundationFullSourceOnlyInstallBundleItemStatus = "passed" | "review_required" | "blocked";

export type StreamFoundationFullSourceOnlyInstallBundleItem = Readonly<{
  id: string;
  area: StreamFoundationFullSourceOnlyInstallBundleArea;
  status: StreamFoundationFullSourceOnlyInstallBundleItemStatus;
  title: string;
  requiredForOwnerReview: boolean;
  evidence: readonly string[];
}>;

export type StreamFoundationFullSourceOnlyInstallBundleSafety = Readonly<{
  localStagingOnly: true;
  fullSourceOnlyBundle: true;
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

export type StreamFoundationFullSourceOnlyInstallBundleSummary = Readonly<{
  totalItems: number;
  passedItems: number;
  reviewRequiredItems: number;
  blockedItems: number;
  requiredForOwnerReviewItems: number;
  coveragePercent: number;
  readyForOwnerReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForBackendRestartNow: false;
  readyForRouteMountNow: false;
  readyForDatabaseBindingNow: false;
  readyForProviderBindingNow: false;
  readyForWalletLedgerLiveBindingNow: false;
  readyForLiveMoneyMovementNow: false;
}>;

export type StreamFoundationFullSourceOnlyInstallBundleSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_FULL_SOURCE_ONLY_INSTALL_BUNDLE_STAGE;
  status: StreamFoundationFullSourceOnlyInstallBundleStatus;
  dependsOn: readonly string[];
  installBundle: StreamFoundationInstallBundleReadinessSnapshot;
  finalOwnerHandoff: StreamFoundationServerCopyFinalOwnerHandoffSnapshot;
  includedSourceScopes: readonly string[];
  excludedSourceScopes: readonly string[];
  forbiddenUntilSeparateApproval: readonly string[];
  items: readonly StreamFoundationFullSourceOnlyInstallBundleItem[];
  summary: StreamFoundationFullSourceOnlyInstallBundleSummary;
  ownerApprovalPhrase: string;
  nextManualStep: string;
  safety: StreamFoundationFullSourceOnlyInstallBundleSafety;
  frozenRules: Readonly<{
    sourceOnlyInstallBundle: true;
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
