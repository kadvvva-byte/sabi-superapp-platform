// BACKEND-STREAM-FOUNDATION-144D
// Safe-disabled Google Play verification adapter draft.
// Draft-only: no external network use, no database write, no Sabi balance change,
// no funds flow, no runtime enablement, and no raw credential or proof output.

import {
  STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_FEE_DRAFT,
  STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SAFE_FLAGS,
  STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION,
  type StreamGooglePlayProviderVerificationResultDraft,
} from "./stream-google-play-provider-verification-source-draft.contracts";
import {
  STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
  type StreamGooglePlayServerProviderReadinessSummary,
} from "./stream-google-play-server-provider-config-source-draft.contracts";

export const STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144D" as const;

export type StreamGooglePlayVerificationAdapterDraftVersion =
  typeof STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayVerificationAdapterMode =
  | "safe_disabled_no_network"
  | "real_provider_requires_later_approval";

export type StreamGooglePlayVerificationAdapterInputDraft = {
  readonly unifiedUserId: string;
  readonly packageName: string;
  readonly productId: string;
  readonly purchasePurpose:
    | "premium_subscription"
    | "premium_feature"
    | "digital_gift"
    | "stream_boost"
    | "creator_subscription"
    | "digital_badge"
    | "digital_effect"
    | "ai_digital_tool"
    | "other_android_digital_entitlement";
  readonly idempotencyKey: string;
  readonly providerProofHashSha256: string;
  readonly providerProofLength: number;
  readonly receivedAtUtc: string;
};

export type StreamGooglePlayVerificationAdapterSafety = {
  readonly sourceOnly: boolean;
  readonly adapterDraftOnly: boolean;
  readonly noExternalNetworkUse: true;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayVerificationAdapterDraftSnapshot = {
  readonly version: StreamGooglePlayVerificationAdapterDraftVersion;
  readonly mode: StreamGooglePlayVerificationAdapterMode;
  readonly safety: StreamGooglePlayVerificationAdapterSafety;
  readonly serverProviderSafeFlags: typeof STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS;
  readonly blockers: readonly string[];
  readonly generatedAtUtc: string;
};

export type StreamGooglePlayVerificationAdapterSourceDraft = {
  readonly version: StreamGooglePlayVerificationAdapterDraftVersion;
  readonly mode: StreamGooglePlayVerificationAdapterMode;
  readonly safety: StreamGooglePlayVerificationAdapterSafety;
  readonly verifyDraftOnly: (
    input: StreamGooglePlayVerificationAdapterInputDraft,
    readiness: StreamGooglePlayServerProviderReadinessSummary,
  ) => Promise<StreamGooglePlayProviderVerificationResultDraft>;
  readonly snapshotDraftOnly: () => StreamGooglePlayVerificationAdapterDraftSnapshot;
};

export const STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SAFE_DISABLED_FLAGS: StreamGooglePlayVerificationAdapterSafety = {
  sourceOnly: true,
  adapterDraftOnly: true,
  noExternalNetworkUse: true,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export function buildStreamGooglePlayVerificationAdapterNotConfiguredResultDraft(
  input: StreamGooglePlayVerificationAdapterInputDraft,
  blockers: readonly string[] = [
    "adapter_safe_disabled",
    "real_provider_adapter_not_enabled",
    "owner_approval_for_real_provider_use_missing",
  ],
): StreamGooglePlayProviderVerificationResultDraft {
  return {
    version: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SOURCE_DRAFT_VERSION,
    rail: "google_play_billing",
    decision: "not_configured",
    verifiedByRealProvider: false,
    providerReferenceHash: input.providerProofHashSha256,
    productId: input.productId,
    packageName: input.packageName,
    purchasePurpose: input.purchasePurpose,
    targetBalanceBucket: "purchased_digital_coin_google_billing",
    idempotencyKey: input.idempotencyKey,
    safeFlags: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_SAFE_FLAGS,
    feePolicy: STREAM_GOOGLE_PLAY_PROVIDER_VERIFICATION_FEE_DRAFT,
    ledgerAppendAllowedNow: false,
    balanceChangeAllowedNow: false,
    creatorReleaseAllowedNow: false,
    adminVisibleRedactedSummaryOnly: true,
    mobileVisibleEntitlementOnlyAfterLedgerConfirmation: true,
    blockers,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function createStreamGooglePlayVerificationAdapterSourceDraft(): StreamGooglePlayVerificationAdapterSourceDraft {
  return {
    version: STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SOURCE_DRAFT_VERSION,
    mode: "safe_disabled_no_network",
    safety: STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SAFE_DISABLED_FLAGS,
    async verifyDraftOnly(input, readiness) {
      const readinessBlockers = readiness.blockers.length > 0 ? readiness.blockers : ["server_provider_not_ready"];
      return buildStreamGooglePlayVerificationAdapterNotConfiguredResultDraft(input, [
        "adapter_safe_disabled",
        ...readinessBlockers,
      ]);
    },
    snapshotDraftOnly() {
      return {
        version: STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SOURCE_DRAFT_VERSION,
        mode: "safe_disabled_no_network",
        safety: STREAM_GOOGLE_PLAY_VERIFICATION_ADAPTER_SAFE_DISABLED_FLAGS,
        serverProviderSafeFlags: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
        blockers: [
          "adapter_safe_disabled",
          "real_provider_adapter_not_enabled",
          "owner_approval_for_real_provider_use_missing",
        ],
        generatedAtUtc: new Date().toISOString(),
      };
    },
  };
}

export function assertStreamGooglePlayVerificationAdapterDraftSafe(
  adapter: StreamGooglePlayVerificationAdapterSourceDraft,
): boolean {
  return (
    adapter.safety.noExternalNetworkUse === true &&
    adapter.safety.providerCallAllowedNow === false &&
    adapter.safety.dataStoreWriteAllowedNow === false &&
    adapter.safety.walletFlowAllowedNow === false &&
    adapter.safety.fundsFlowAllowedNow === false &&
    adapter.safety.rawCredentialReturnAllowed === false &&
    adapter.safety.rawProviderProofReturnAllowed === false &&
    adapter.safety.syntheticProviderApprovalAllowed === false &&
    adapter.safety.liveBillingEnabledNow === false
  );
}
