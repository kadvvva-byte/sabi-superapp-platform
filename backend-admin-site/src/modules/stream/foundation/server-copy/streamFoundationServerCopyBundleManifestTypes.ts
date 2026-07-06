import type { StreamFoundationFinalLocalStagingVerificationSnapshot } from "../final-verification";

export const STREAM_FOUNDATION_SERVER_COPY_BUNDLE_MANIFEST_STAGE =
  "BACKEND_STREAM_FOUNDATION_137N_SERVER_COPY_BUNDLE_MANIFEST" as const;

export type StreamFoundationServerCopyBundleStatus =
  | "server_copy_bundle_ready_for_review"
  | "server_copy_bundle_review_required"
  | "server_copy_bundle_blocked";

export type StreamFoundationServerCopyBundleItemStatus =
  | "include"
  | "review_required"
  | "blocked";

export type StreamFoundationServerCopyBundleItemCategory =
  | "source_tree"
  | "index_exports"
  | "security"
  | "routes"
  | "monetization"
  | "wallet_boundary"
  | "server_mount_boundary"
  | "database_boundary"
  | "provider_boundary"
  | "secret_boundary"
  | "verification";

export type StreamFoundationServerCopyBundleItem = Readonly<{
  id: string;
  category: StreamFoundationServerCopyBundleItemCategory;
  status: StreamFoundationServerCopyBundleItemStatus;
  sourcePath: string;
  serverTargetPath: string;
  purpose: string;
  copyAllowedInSourceStage: boolean;
  routeMountAllowedInSourceStage: false;
  databaseMutationAllowedInSourceStage: false;
  providerCallAllowedInSourceStage: false;
  moneyMovementAllowedInSourceStage: false;
  requiredBeforeCopy: readonly string[];
  requiredAfterCopyBeforeMount: readonly string[];
}>;

export type StreamFoundationServerCopyBundleSafety = Readonly<{
  localStagingOnly: true;
  patchZipOnly: true;
  serverCopyManifestOnly: true;
  performsServerCopyNow: false;
  changesAppServerFilesNow: false;
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

export type StreamFoundationServerCopyBundleSummary = Readonly<{
  totalItems: number;
  includeItems: number;
  reviewRequiredItems: number;
  blockedItems: number;
  copyAllowedItems: number;
  routeMountAllowedItemsNow: 0;
  databaseMutationAllowedItemsNow: 0;
  providerCallAllowedItemsNow: 0;
  moneyMovementAllowedItemsNow: 0;
  finalLocalVerificationReady: boolean;
  readyForManualServerCopyReview: boolean;
  readyForAutomaticServerCopyNow: false;
  readyForRouteMountNow: false;
  readyForLiveMoneyNow: false;
}>;

export type StreamFoundationServerCopyBundleSnapshot = Readonly<{
  stage: typeof STREAM_FOUNDATION_SERVER_COPY_BUNDLE_MANIFEST_STAGE;
  status: StreamFoundationServerCopyBundleStatus;
  dependsOn: readonly string[];
  finalLocalVerification: StreamFoundationFinalLocalStagingVerificationSnapshot;
  installRoot: Readonly<{
    localPatchRoot: "src/modules/stream/foundation";
    serverRoot: "/opt/sabi/backend";
    serverTargetRoot: "/opt/sabi/backend/src/modules/stream/foundation";
    serverStreamIndexTarget: "/opt/sabi/backend/src/modules/stream/index.ts";
  }>;
  items: readonly StreamFoundationServerCopyBundleItem[];
  summary: StreamFoundationServerCopyBundleSummary;
  safety: StreamFoundationServerCopyBundleSafety;
  serverCopyRules: Readonly<{
    copyOnlyAfterOwnerApproval: true;
    copySourceFilesBeforeRouteMount: true;
    runTypecheckAfterCopy: true;
    restartForbiddenDuringCopyStage: true;
    routeMountRequiresSeparatePatch: true;
    adminProviderKeysRemainServerSideOnly: true;
    paymentProviderAndPayoutProviderRemainSeparate: true;
    walletLedgerBindingRequiresSeparateStage: true;
    giftSuccessRequiresRealPaymentAuthorization: true;
    recipientEarningStartsAsPending: true;
    payoutIsMonthlyOnly: true;
    fakeMoneySuccessForbidden: true;
  }>;
}>;
