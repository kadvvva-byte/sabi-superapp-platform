// BACKEND-STREAM-FOUNDATION-144G
// Real provider env binding readiness gate contract.
// Draft-only: validates redacted env facts supplied by a later server-only reader.
// This file does not read env values, does not contact providers, does not write storage,
// does not change Sabi balances, does not release funds, and does not enable live billing.

import {
  STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS,
  STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
  type StreamGooglePlayServerProviderEnvDescriptor,
  type StreamGooglePlayServerProviderEnvKey,
} from "./stream-google-play-server-provider-config-source-draft.contracts";
import {
  STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SAFE_FLAGS,
} from "./stream-google-play-admin-readiness-visibility-route-update-plan-source-draft.contracts";

export const STREAM_GOOGLE_PLAY_PROVIDER_ENV_BINDING_READINESS_GATE_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144G" as const;

export type StreamGooglePlayProviderEnvBindingReadinessGateDraftVersion =
  typeof STREAM_GOOGLE_PLAY_PROVIDER_ENV_BINDING_READINESS_GATE_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayProviderEnvBindingGateState =
  | "blocked_missing_required_env"
  | "blocked_raw_value_exposure"
  | "blocked_server_reader_not_installed"
  | "redacted_env_presence_ready"
  | "live_provider_use_requires_later_approval";

export type StreamGooglePlayProviderEnvBindingObservedKeyDraft = {
  readonly key: StreamGooglePlayServerProviderEnvKey;
  readonly required: boolean;
  readonly valueClass: StreamGooglePlayServerProviderEnvDescriptor["valueClass"];
  readonly present: boolean;
  readonly valueLength?: number;
  readonly sha256Prefix?: string;
  readonly rawValueReturned: false;
};

export type StreamGooglePlayProviderEnvBindingGateBlocker =
  | "server_side_env_reader_not_installed"
  | "required_env_missing"
  | "raw_value_exposure_blocked"
  | "provider_adapter_still_safe_disabled"
  | "owner_approval_for_real_provider_use_missing"
  | "live_billing_still_disabled";

export type StreamGooglePlayProviderEnvBindingGateSafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly serverSideOnly: true;
  readonly envRawReadAllowedInThisDraft: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawProviderProofReturnAllowed: false;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly ledgerAppendAllowedNow: false;
  readonly balanceChangeAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly adminUiSourceTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayProviderEnvBindingReadinessGateSnapshotDraft = {
  readonly version: StreamGooglePlayProviderEnvBindingReadinessGateDraftVersion;
  readonly state: StreamGooglePlayProviderEnvBindingGateState;
  readonly observedKeys: readonly StreamGooglePlayProviderEnvBindingObservedKeyDraft[];
  readonly missingRequiredKeys: readonly StreamGooglePlayServerProviderEnvKey[];
  readonly blockers: readonly StreamGooglePlayProviderEnvBindingGateBlocker[];
  readonly safeFlags: StreamGooglePlayProviderEnvBindingGateSafeFlags;
  readonly inheritedProviderSafeFlags: typeof STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS;
  readonly inheritedAdminVisibilitySafeFlags: typeof STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SAFE_FLAGS;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_PROVIDER_ENV_BINDING_READINESS_GATE_SAFE_FLAGS: StreamGooglePlayProviderEnvBindingGateSafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  serverSideOnly: true,
  envRawReadAllowedInThisDraft: false,
  rawCredentialReturnAllowed: false,
  rawProviderProofReturnAllowed: false,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  ledgerAppendAllowedNow: false,
  balanceChangeAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  adminUiSourceTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export function buildStreamGooglePlayProviderEnvBindingObservedKeysDraft(
  observed: readonly StreamGooglePlayProviderEnvBindingObservedKeyDraft[] = [],
): readonly StreamGooglePlayProviderEnvBindingObservedKeyDraft[] {
  return STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS.map((descriptor) => {
    const match = observed.find((item) => item.key === descriptor.key);
    return {
      key: descriptor.key,
      required: descriptor.required,
      valueClass: descriptor.valueClass,
      present: match?.present === true,
      valueLength: match?.valueLength,
      sha256Prefix: match?.sha256Prefix,
      rawValueReturned: false,
    };
  });
}

export function buildStreamGooglePlayProviderEnvBindingReadinessGateSnapshotDraft(
  observed: readonly StreamGooglePlayProviderEnvBindingObservedKeyDraft[] = [],
): StreamGooglePlayProviderEnvBindingReadinessGateSnapshotDraft {
  const observedKeys = buildStreamGooglePlayProviderEnvBindingObservedKeysDraft(observed);
  const missingRequiredKeys = observedKeys
    .filter((item) => item.required && item.present !== true)
    .map((item) => item.key);

  const blockers: StreamGooglePlayProviderEnvBindingGateBlocker[] = [
    "server_side_env_reader_not_installed",
    "provider_adapter_still_safe_disabled",
    "owner_approval_for_real_provider_use_missing",
    "live_billing_still_disabled",
  ];

  if (missingRequiredKeys.length > 0) {
    blockers.unshift("required_env_missing");
  }

  return {
    version: STREAM_GOOGLE_PLAY_PROVIDER_ENV_BINDING_READINESS_GATE_SOURCE_DRAFT_VERSION,
    state: missingRequiredKeys.length > 0 ? "blocked_missing_required_env" : "redacted_env_presence_ready",
    observedKeys,
    missingRequiredKeys,
    blockers,
    safeFlags: STREAM_GOOGLE_PLAY_PROVIDER_ENV_BINDING_READINESS_GATE_SAFE_FLAGS,
    inheritedProviderSafeFlags: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
    inheritedAdminVisibilitySafeFlags: STREAM_GOOGLE_PLAY_ADMIN_READINESS_VISIBILITY_SAFE_FLAGS,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayProviderEnvBindingReadinessGateDraftSafe(
  value: StreamGooglePlayProviderEnvBindingReadinessGateSnapshotDraft,
): boolean {
  return (
    value.safeFlags.envRawReadAllowedInThisDraft === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawProviderProofReturnAllowed === false &&
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.ledgerAppendAllowedNow === false &&
    value.safeFlags.balanceChangeAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.adminUiSourceTouchAllowedNow === false &&
    value.safeFlags.mobileTouchAllowedNow === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.observedKeys.every((item) => item.rawValueReturned === false)
  );
}
