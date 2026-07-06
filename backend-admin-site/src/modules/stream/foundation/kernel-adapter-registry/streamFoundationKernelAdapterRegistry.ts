import {
  STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION,
  type StreamFoundationKernelAdapterCapability,
  type StreamFoundationKernelAdapterRegistryEntry,
  type StreamFoundationKernelAdapterRegistryKind,
  type StreamFoundationKernelAdapterRegistrySnapshot,
  type StreamFoundationKernelAdapterSafetyContract,
  type StreamFoundationKernelAdapterBindingStatus,
} from "./streamFoundationKernelAdapterRegistryContracts";

const SAFE_CONTRACT: StreamFoundationKernelAdapterSafetyContract = {
  routeMountAllowedNow: false,
  adapterRuntimeBindingAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  recipientEarningCreditAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  realtimeBroadcastAllowedNow: false,
  mediaStorageWriteAllowedNow: false,
  eventBusPublishAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

function entry(
  adapterKind: StreamFoundationKernelAdapterRegistryKind,
  bindingStatus: StreamFoundationKernelAdapterBindingStatus,
  capabilities: readonly StreamFoundationKernelAdapterCapability[],
  requiredForSurfaces: readonly string[],
  blockedReason: string,
): StreamFoundationKernelAdapterRegistryEntry {
  return {
    adapterKind,
    bindingStatus,
    capabilities,
    requiredForSurfaces,
    blockedReason,
    serverSideOnly: true,
    mobileCallableDirectly: false,
    directDatabaseAccessAllowed: false,
    directProviderAccessAllowed: false,
    directWalletAccessAllowed: false,
    safety: SAFE_CONTRACT,
  };
}

export function getStreamFoundationKernelAdapterRegistryEntries(): readonly StreamFoundationKernelAdapterRegistryEntry[] {
  return [
    entry("safe_ui_preview_adapter", "contract_registered_only", ["safe_preview_response"], ["stream_foundation_preview", "shorts_creator", "creator_profile"], "safe_preview_adapter_has_no_external_side_effect"),
    entry("audit_trace_adapter", "blocked_until_database_repository_bound", ["audit_trace"], ["all_protected_stream_actions"], "audit_repository_not_bound"),
    entry("route_mount_adapter", "blocked_until_route_mount_approved", ["route_mount"], ["api_stream_routes"], "route_mount_not_approved"),
    entry("database_persistence_adapter", "blocked_until_database_repository_bound", ["database_persistence"], ["live", "shorts", "moderation", "business", "analytics", "monetization"], "repository_adapter_not_bound"),
    entry("realtime_room_adapter", "blocked_until_media_realtime_bound", ["realtime_broadcast"], ["live_single", "live_group", "live_audio", "live_game", "live_video_file"], "realtime_adapter_not_bound"),
    entry("live_lifecycle_adapter", "blocked_until_database_repository_bound", ["database_persistence", "audit_trace"], ["live_start", "live_stop", "live_heartbeat"], "live_lifecycle_repository_not_bound"),
    entry("media_storage_adapter", "blocked_until_media_realtime_bound", ["media_storage"], ["short_upload", "short_publish", "live_video_file"], "media_storage_adapter_not_bound"),
    entry("shorts_feed_adapter", "blocked_until_database_repository_bound", ["database_persistence"], ["shorts_feed", "short_detail", "short_publish"], "shorts_repository_not_bound"),
    entry("business_catalog_adapter", "blocked_until_admin_permission_bound", ["business_catalog_read", "database_persistence"], ["business_stream", "merchant_product_attach"], "business_catalog_admin_gate_not_bound"),
    entry("moderation_admin_adapter", "blocked_until_admin_permission_bound", ["moderation_admin_review", "audit_trace"], ["report_content", "moderation_queue"], "moderation_admin_gate_not_bound"),
    entry("playback_analytics_adapter", "blocked_until_database_repository_bound", ["playback_analytics_rollup"], ["playback_analytics", "creator_dashboard"], "analytics_repository_not_bound"),
    entry("notification_delivery_adapter", "blocked_until_provider_configured", ["notification_delivery"], ["live_notifications", "gift_notifications", "payout_notifications"], "notification_provider_not_configured"),
    entry("provider_secret_adapter", "blocked_until_provider_configured", ["provider_secret_storage", "provider_configuration"], ["admin_monetization_config"], "server_side_secret_store_not_bound"),
    entry("provider_config_adapter", "blocked_until_provider_configured", ["provider_configuration"], ["admin_accept_payment", "admin_payout_provider"], "payment_and_payout_provider_not_configured"),
    entry("payment_authorization_adapter", "blocked_until_payment_authorization_bound", ["payment_authorization"], ["gift_purchase"], "accept_payment_provider_not_live_bound"),
    entry("wallet_ledger_adapter", "blocked_until_wallet_ledger_bound", ["wallet_ledger_commit"], ["gift_purchase", "recipient_earning", "monthly_payout"], "wallet_coin_ledger_adapter_not_bound"),
    entry("recipient_earning_adapter", "blocked_until_wallet_ledger_bound", ["recipient_pending_earning"], ["gift_purchase", "creator_earnings"], "recipient_pending_earning_repository_not_bound"),
    entry("monthly_payout_adapter", "blocked_until_monthly_payout_batch_bound", ["monthly_payout_batch"], ["monthly_payout", "creator_withdrawal"], "monthly_payout_batch_not_live"),
    entry("platform_settlement_adapter", "blocked_until_provider_configured", ["platform_settlement"], ["platform_fee_reserve", "provider_settlement"], "platform_settlement_provider_not_configured"),
    entry("admin_creator_adapter", "blocked_until_admin_permission_bound", ["moderation_admin_review", "audit_trace"], ["creator_verification", "creator_monetization_approval"], "creator_admin_gate_not_bound"),
  ] as const;
}

export function getStreamFoundationKernelAdapterRegistrySnapshot(): StreamFoundationKernelAdapterRegistrySnapshot {
  const entries = getStreamFoundationKernelAdapterRegistryEntries();
  return {
    version: STREAM_FOUNDATION_138E_KERNEL_ADAPTER_REGISTRY_VERSION,
    streamIndexPatchIncluded: false,
    registryMode: "foundation_contracts_only",
    entries,
    totalAdapters: entries.length,
    runtimeBoundAdaptersNow: 0,
    directCallAdaptersNow: 0,
    providerReadyAdaptersNow: 0,
    walletReadyAdaptersNow: 0,
    moneyMovementReadyAdaptersNow: 0,
    allAdaptersServerSideOnly: entries.every((item) => item.serverSideOnly),
    allAdaptersBlockedUntilGateApproval: entries.every((item) => item.bindingStatus !== "contract_registered_only" || item.adapterKind === "safe_ui_preview_adapter"),
  };
}
