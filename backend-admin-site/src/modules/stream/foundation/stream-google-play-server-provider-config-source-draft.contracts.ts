// BACKEND-STREAM-FOUNDATION-144C
// Server-only Google Play provider configuration and redacted readiness summary contract.
// Contract-only: no provider network call, no database write, no Sabi balance change,
// no funds flow, no runtime enablement, and no raw credential or purchase proof output.

export const STREAM_GOOGLE_PLAY_SERVER_PROVIDER_CONFIG_SOURCE_DRAFT_VERSION =
  "BACKEND-STREAM-FOUNDATION-144C" as const;

export type StreamGooglePlayServerProviderConfigDraftVersion =
  typeof STREAM_GOOGLE_PLAY_SERVER_PROVIDER_CONFIG_SOURCE_DRAFT_VERSION;

export type StreamGooglePlayServerProviderEnvKey =
  | "GOOGLE_PLAY_ANDROID_PACKAGE_NAME"
  | "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64"
  | "GOOGLE_PLAY_APPLICATION_NAME"
  | "GOOGLE_PLAY_PRODUCT_CATALOG_VERSION"
  | "GOOGLE_PLAY_PROVIDER_PROJECT_ID"
  | "GOOGLE_PLAY_PROVIDER_CLIENT_EMAIL";

export type StreamGooglePlayServerProviderBindingState =
  | "provider_not_configured"
  | "required_env_missing"
  | "required_env_present_redacted"
  | "server_side_binding_ready_for_adapter_draft"
  | "live_verification_requires_separate_approval";

export type StreamGooglePlayServerProviderEnvValueClass =
  | "public_identifier"
  | "server_credential_payload"
  | "catalog_reference";

export type StreamGooglePlayServerProviderEnvDescriptor = {
  readonly key: StreamGooglePlayServerProviderEnvKey;
  readonly required: boolean;
  readonly valueClass: StreamGooglePlayServerProviderEnvValueClass;
  readonly serverSideOnly: true;
  readonly mobileExposureAllowed: false;
  readonly adminRawValueExposureAllowed: false;
  readonly runtimeResponseRawValueAllowed: false;
  readonly redactionMode: "presence_length_hash_prefix_only";
  readonly description: string;
};

export type StreamGooglePlayServerProviderRedactedEnvStatus = {
  readonly key: StreamGooglePlayServerProviderEnvKey;
  readonly required: boolean;
  readonly present: boolean;
  readonly valueLength?: number;
  readonly sha256Prefix?: string;
  readonly source: "process_env" | "env_file" | "not_present" | "unknown";
  readonly rawValueReturned: false;
};

export type StreamGooglePlayServerProviderReadinessBlocker =
  | "android_package_name_missing"
  | "service_account_payload_missing"
  | "product_catalog_version_missing"
  | "provider_project_id_missing"
  | "provider_client_email_missing"
  | "real_provider_adapter_not_enabled"
  | "owner_approval_for_live_verification_missing";

export type StreamGooglePlayServerProviderSafeFlags = {
  readonly sourceOnly: boolean;
  readonly planningOnly: boolean;
  readonly providerCallAllowedNow: false;
  readonly dataStoreWriteAllowedNow: false;
  readonly walletFlowAllowedNow: false;
  readonly fundsFlowAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawCredentialReturnAllowed: false;
  readonly rawPurchaseProofReturnAllowed: false;
  readonly syntheticProviderApprovalAllowed: false;
  readonly liveBillingEnabledNow: false;
};

export type StreamGooglePlayServerProviderReadinessSummary = {
  readonly version: StreamGooglePlayServerProviderConfigDraftVersion;
  readonly bindingState: StreamGooglePlayServerProviderBindingState;
  readonly descriptors: readonly StreamGooglePlayServerProviderEnvDescriptor[];
  readonly redactedEnvStatuses: readonly StreamGooglePlayServerProviderRedactedEnvStatus[];
  readonly safeFlags: StreamGooglePlayServerProviderSafeFlags;
  readonly blockers: readonly StreamGooglePlayServerProviderReadinessBlocker[];
  readonly serverSideOnly: true;
  readonly mobileSecretsAllowed: false;
  readonly adminRawCredentialAllowed: false;
  readonly providerNetworkCallAllowedNow: false;
  readonly generatedAtUtc: string;
};

export const STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS: readonly StreamGooglePlayServerProviderEnvDescriptor[] = [
  {
    key: "GOOGLE_PLAY_ANDROID_PACKAGE_NAME",
    required: true,
    valueClass: "public_identifier",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Android package name bound to Google Play products.",
  },
  {
    key: "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON_B64",
    required: true,
    valueClass: "server_credential_payload",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Server-only Google service account payload encoded for environment transport.",
  },
  {
    key: "GOOGLE_PLAY_APPLICATION_NAME",
    required: false,
    valueClass: "public_identifier",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Internal provider client application label.",
  },
  {
    key: "GOOGLE_PLAY_PRODUCT_CATALOG_VERSION",
    required: true,
    valueClass: "catalog_reference",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Server-side product catalog version expected by purchase verification.",
  },
  {
    key: "GOOGLE_PLAY_PROVIDER_PROJECT_ID",
    required: true,
    valueClass: "public_identifier",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Google provider project reference for readiness validation.",
  },
  {
    key: "GOOGLE_PLAY_PROVIDER_CLIENT_EMAIL",
    required: true,
    valueClass: "public_identifier",
    serverSideOnly: true,
    mobileExposureAllowed: false,
    adminRawValueExposureAllowed: false,
    runtimeResponseRawValueAllowed: false,
    redactionMode: "presence_length_hash_prefix_only",
    description: "Google provider service account identity reference, shown only as redacted metadata.",
  },
];

export const STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS: StreamGooglePlayServerProviderSafeFlags = {
  sourceOnly: true,
  planningOnly: true,
  providerCallAllowedNow: false,
  dataStoreWriteAllowedNow: false,
  walletFlowAllowedNow: false,
  fundsFlowAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawCredentialReturnAllowed: false,
  rawPurchaseProofReturnAllowed: false,
  syntheticProviderApprovalAllowed: false,
  liveBillingEnabledNow: false,
};

export function buildStreamGooglePlayServerProviderNotConfiguredSummaryDraft(
  blockers: readonly StreamGooglePlayServerProviderReadinessBlocker[] = [
    "service_account_payload_missing",
    "real_provider_adapter_not_enabled",
    "owner_approval_for_live_verification_missing",
  ],
): StreamGooglePlayServerProviderReadinessSummary {
  return {
    version: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_CONFIG_SOURCE_DRAFT_VERSION,
    bindingState: "provider_not_configured",
    descriptors: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS,
    redactedEnvStatuses: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_ENV_DESCRIPTORS.map((descriptor) => ({
      key: descriptor.key,
      required: descriptor.required,
      present: false,
      source: "not_present",
      rawValueReturned: false,
    })),
    safeFlags: STREAM_GOOGLE_PLAY_SERVER_PROVIDER_SAFE_FLAGS,
    blockers,
    serverSideOnly: true,
    mobileSecretsAllowed: false,
    adminRawCredentialAllowed: false,
    providerNetworkCallAllowedNow: false,
    generatedAtUtc: new Date().toISOString(),
  };
}

export function assertStreamGooglePlayServerProviderSummaryDraftSafe(
  value: StreamGooglePlayServerProviderReadinessSummary,
): boolean {
  return (
    value.safeFlags.providerCallAllowedNow === false &&
    value.safeFlags.dataStoreWriteAllowedNow === false &&
    value.safeFlags.walletFlowAllowedNow === false &&
    value.safeFlags.fundsFlowAllowedNow === false &&
    value.safeFlags.rawCredentialReturnAllowed === false &&
    value.safeFlags.rawPurchaseProofReturnAllowed === false &&
    value.safeFlags.syntheticProviderApprovalAllowed === false &&
    value.safeFlags.liveBillingEnabledNow === false &&
    value.mobileSecretsAllowed === false &&
    value.adminRawCredentialAllowed === false &&
    value.providerNetworkCallAllowedNow === false &&
    value.redactedEnvStatuses.every((status) => status.rawValueReturned === false)
  );
}
