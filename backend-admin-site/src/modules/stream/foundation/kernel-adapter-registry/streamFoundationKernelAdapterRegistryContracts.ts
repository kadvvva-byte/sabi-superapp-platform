export const STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION = "BACKEND-STREAM-FOUNDATION-138E" as const;

export type StreamFoundationKernelAdapterRegistryKind =
  | "audit_trace_adapter"
  | "safe_ui_preview_adapter"
  | "route_mount_adapter"
  | "database_persistence_adapter"
  | "provider_config_adapter"
  | "wallet_ledger_adapter"
  | "payment_authorization_adapter"
  | "recipient_earning_adapter"
  | "monthly_payout_adapter"
  | "media_realtime_adapter"
  | "admin_creator_adapter"
  | "realtime_room_adapter"
  | "live_lifecycle_adapter"
  | "media_storage_adapter"
  | "shorts_feed_adapter"
  | "business_catalog_adapter"
  | "moderation_admin_adapter"
  | "playback_analytics_adapter"
  | "notification_delivery_adapter"
  | "provider_secret_adapter"
  | "platform_settlement_adapter";

export type StreamFoundationKernelAdapterBindingStatus =
  | "contract_registered_only"
  | "blocked_until_route_mount_approved"
  | "blocked_until_database_repository_bound"
  | "blocked_until_provider_configured"
  | "blocked_until_wallet_ledger_bound"
  | "blocked_until_payment_authorization_bound"
  | "blocked_until_monthly_payout_batch_bound"
  | "blocked_until_media_realtime_bound"
  | "blocked_until_admin_permission_bound";

export type StreamFoundationKernelAdapterCapability =
  | "safe_preview_response"
  | "audit_trace"
  | "route_mount"
  | "database_persistence"
  | "provider_configuration"
  | "wallet_ledger_commit"
  | "payment_authorization"
  | "recipient_pending_earning"
  | "monthly_payout_batch"
  | "media_storage"
  | "realtime_broadcast"
  | "moderation_admin_review"
  | "business_catalog_read"
  | "playback_analytics_rollup"
  | "notification_delivery"
  | "provider_secret_storage"
  | "platform_settlement";

export interface StreamFoundationKernelAdapterSafetyContract {
  readonly routeMountAllowedNow: false;
  readonly adapterRuntimeBindingAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly recipientEarningCreditAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly mediaStorageWriteAllowedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelAdapterRegistryEntry {
  readonly adapterKind: StreamFoundationKernelAdapterRegistryKind;
  readonly bindingStatus: StreamFoundationKernelAdapterBindingStatus;
  readonly capabilities: readonly StreamFoundationKernelAdapterCapability[];
  readonly requiredForSurfaces: readonly string[];
  readonly blockedReason: string;
  readonly serverSideOnly: boolean;
  readonly mobileCallableDirectly: false;
  readonly directDatabaseAccessAllowed: false;
  readonly directProviderAccessAllowed: false;
  readonly directWalletAccessAllowed: false;
  readonly safety: StreamFoundationKernelAdapterSafetyContract;
}

export interface StreamFoundationKernelAdapterRegistrySnapshot {
  readonly version: typeof STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly registryMode: "foundation_contracts_only";
  readonly entries: readonly StreamFoundationKernelAdapterRegistryEntry[];
  readonly totalAdapters: number;
  readonly runtimeBoundAdaptersNow: 0;
  readonly directCallAdaptersNow: 0;
  readonly providerReadyAdaptersNow: 0;
  readonly walletReadyAdaptersNow: 0;
  readonly moneyMovementReadyAdaptersNow: 0;
  readonly allAdaptersServerSideOnly: boolean;
  readonly allAdaptersBlockedUntilGateApproval: boolean;
}
