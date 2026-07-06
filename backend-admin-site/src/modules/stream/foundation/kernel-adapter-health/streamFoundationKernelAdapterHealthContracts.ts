import type { StreamFoundationKernelAdapterRegistryKind } from "../kernel-adapter-registry";

export const STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION = "BACKEND-STREAM-FOUNDATION-138G" as const;

export type StreamFoundationKernelAdapterHealthStatus =
  | "healthy_contract_only"
  | "blocked_not_bound"
  | "blocked_provider_not_configured"
  | "blocked_wallet_ledger_not_bound"
  | "blocked_payment_authorization_not_bound"
  | "blocked_monthly_payout_not_bound"
  | "blocked_media_realtime_not_bound"
  | "blocked_admin_permission_not_bound"
  | "blocked_route_mount_not_approved"
  | "blocked_unknown_adapter";

export type StreamFoundationKernelAdapterHealthSeverity = "info" | "review_required" | "blocked";

export interface StreamFoundationKernelAdapterHealthSafety {
  readonly streamIndexPatchIncluded: false;
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
  readonly queueConsumerStartAllowedNow: false;
  readonly eventBusPublishAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelAdapterHealthRequest {
  readonly requestedBy: "kernel_bridge" | "kernel_facade" | "kernel_action_router" | "kernel_queue_consumer" | "admin_snapshot" | "server_install_check";
  readonly includeAdapterKinds?: readonly StreamFoundationKernelAdapterRegistryKind[];
  readonly routeMountApproved: boolean;
  readonly repositoryBound: boolean;
  readonly providerConfigured: boolean;
  readonly walletLedgerBound: boolean;
  readonly paymentAuthorizationBound: boolean;
  readonly monthlyPayoutBatchBound: boolean;
  readonly mediaRealtimeBound: boolean;
  readonly adminPermissionBound: boolean;
}

export interface StreamFoundationKernelAdapterHealthItem {
  readonly adapterKind: StreamFoundationKernelAdapterRegistryKind;
  readonly status: StreamFoundationKernelAdapterHealthStatus;
  readonly severity: StreamFoundationKernelAdapterHealthSeverity;
  readonly healthMessageKey: string;
  readonly requiredGate: string;
  readonly serverSideOnly: true;
  readonly mobileDirectAccessBlocked: true;
  readonly runtimeBindingAllowedNow: false;
  readonly safeForSnapshot: boolean;
}

export interface StreamFoundationKernelAdapterHealthSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly snapshotMode: "foundation_health_snapshot_only";
  readonly requestedBy: StreamFoundationKernelAdapterHealthRequest["requestedBy"];
  readonly totalAdapters: number;
  readonly healthyContractOnlyAdapters: number;
  readonly blockedAdapters: number;
  readonly reviewRequiredAdapters: number;
  readonly runtimeBindableAdaptersNow: 0;
  readonly providerReadyAdaptersNow: 0;
  readonly walletReadyAdaptersNow: 0;
  readonly moneyMovementReadyNow: false;
  readonly allAdaptersServerSideOnly: boolean;
  readonly allMobileDirectAccessBlocked: boolean;
  readonly items: readonly StreamFoundationKernelAdapterHealthItem[];
  readonly safety: StreamFoundationKernelAdapterHealthSafety;
}
