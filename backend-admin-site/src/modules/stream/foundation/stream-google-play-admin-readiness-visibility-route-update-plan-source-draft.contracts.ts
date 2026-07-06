// BACKEND-STREAM-FOUNDATION-144F
// Read-only Admin provider readiness route update plan contract.
// Draft-only: no route mount, no external network use, no data-store write,
// no Sabi balance change, no funds flow, no runtime enablement,
// and no raw credential or proof output.

import {
  STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS,
  STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
  type StreamGooglePlayServerProviderEnvDescriptor,
  type StreamGooglePlayServerProviderReadinessBlocker,
} from "./stream-google-play-server-provider-config-source-draft.contracts";
import {
  STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS,
  STREAM_GOOGLE_PLAY_IDEMPOTENCY_SCOPES,
  type StreamGooglePlayReadinessIdempotencyScope,
} from "./stream-google-play-idempotency-ledger-readiness-source-draft.contracts";

export const STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_ROUTE_UPDATE_PLAN_VERSION =
  "BACKEND-STREAM-FOUNDATION-144F" as const;

export type StreamGooglePlayAdminReadinessVisibilityRouteUpdatePlanVersion =
  typeof STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_ROUTE_UPDATE_PLAN_VERSION;

export type StreamGooglePlayAdminReadinessVisibilitySection =
  | "provider_config_redacted"
  | "adapter_safe_disabled"
  | "idempotency_gate"
  | "ledger_route_boundaries"
  | "hold_policy"
  | "live_verification_gate";

export type StreamGooglePlayAdminReadinessVisibilityState =
  | "not_ready"
  | "provider_not_configured"
  | "safe_disabled"
  | "ready_for_later_env_gate"
  | "live_use_requires_later_approval";

export type StreamGooglePlayAdminReadinessRedactedEnvLine = {
  readonly key: string;
  readonly required: boolean;
  readonly valueClass: StreamGooglePlayServerProviderEnvDescriptor["valueClass"];
  readonly presentKnown: boolean;
  readonly valueLengthKnown: boolean;
  readonly sha256PrefixKnown: boolean;
  readonly rawValueReturned: false;
};

export type StreamGooglePlayAdminReadinessVisibilitySafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly routeMountAllowedNow: false;
  readonly runtimeRouteChangeAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly creatorReleaseAllowedNow: false;
  readonly merchantReleaseAllowedNow: false;
  readonly adminUiSourceTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayAdminReadinessVisibilitySnapshotDraft = {
  readonly version: StreamGooglePlayAdminReadinessVisibilityRouteUpdatePlanVersion;
  readonly state: StreamGooglePlayAdminReadinessVisibilityState;
  readonly sections: readonly StreamGooglePlayAdminReadinessVisibilitySection[];
  readonly redactedEnvLines: readonly StreamGooglePlayAdminReadinessRedactedEnvLine[];
  readonly providerBlockers: readonly StreamGooglePlayServerProviderReadinessBlocker[];
  readonly idempotencyScopes: readonly StreamGooglePlayReadinessIdempotencyScope[];
  readonly safeFlags: StreamGooglePlayAdminReadinessVisibilitySafeFlags;
  readonly inheritedProviderSafeFlags: typeof STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS;
  readonly inheritedLedgerSafeFlags: typeof STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SAFE_FLAGS: StreamGooglePlayAdminReadinessVisibilitySafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  routeMountAllowedNow: false,
  runtimeRouteChangeAllowedNow: false,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  ledgerAppendAllowedNow: false,
  balanceChangeAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  creatorReleaseAllowedNow: false,
  merchantReleaseAllowedNow: false,
  adminUiSourceTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export const STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SECTIONS: readonly StreamGooglePlayAdminReadinessVisibilitySection[] = [
  "provider_config_redacted",
  "adapter_safe_disabled",
  "idempotency_gate",
  "ledger_route_boundaries",
  "hold_policy",
  "live_verification_gate",
];

export function buildStreamGooglePlayAdminReadinessRedactedEnvLinesDraft(): readonly StreamGooglePlayAdminReadinessRedactedEnvLine[] {
  return STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS.map((descriptor) => ({
    key: descriptor.key,
    required: descriptor.required,
    valueClass: descriptor.valueClass,
    presentKnown: false,
    valueLengthKnown: false,
    sha256PrefixKnown: false,
    rawValueReturned: false,
  }));
}

export function buildStreamGooglePlayAdminReadinessVisibilitySnapshotDraft(
  providerBlockers: readonly StreamGooglePlayServerProviderReadinessBlocker[] = [
    "service_account_payload_missing",
    "real_provider_adapter_not_enabled",
    "owner_approval_for_live_verification_missing",
  ],
): StreamGooglePlayAdminReadinessVisibilitySnapshotDraft {
  return {
    version: STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_ROUTE_UPDATE_PLAN_VERSION,
    state: "safe_disabled",
    sections: STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SECTIONS,
    redactedEnvLines: buildStreamGooglePlayAdminReadinessRedactedEnvLinesDraft(),
    providerBlockers,
    idempotencyScopes: STREAM_GOOGLE_PLAY_IDEMPOTENCY_SCOPES,
    safeFlags: STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SAFE_FLAGS,
    inheritedProviderSafeFlags: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
    inheritedLedgerSafeFlags: STREAM_GOOGLE_PLAY_IDEMPOTENCY_LEDGER_READINESS_SAFE_FLAGS,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayAdminReadinessVisibilityDraftSafe(
  value: StreamGooglePlayAdminReadinessVisibilitySnapshotDraft,
): boolean {
  return (
    value.safeFlags.routeMountAllowedNow === false &&
    value.safeFlags.runtimeRouteChangeAllowedNow === false &&
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.ledgerAppendAllowedNow === false &&
    value.safeFlags.balanceChangeAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.creatorReleaseAllowedNow === false &&
    value.safeFlags.merchantReleaseAllowedNow === false &&
    value.safeFlags.adminUiSourceTouchAllowedNow === false &&
    value.safeFlags.mobileTouchAllowedNow === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.redactedEnvLines.every((line) => line.rawValueReturned === false)
  );
}
