import type {
  StreamFoundationKernelAdapterRegistryEntry,
  StreamFoundationKernelAdapterRegistryKind,
} from "../kernel-adapter-registry";

export const STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-138F" as const;

export type StreamFoundationKernelAdapterBindingGateStatus =
  | "contract_binding_allowed"
  | "blocked_unknown_adapter"
  | "blocked_runtime_binding_disallowed"
  | "blocked_until_route_mount_approved"
  | "blocked_until_repository_bound"
  | "blocked_until_provider_configured"
  | "blocked_until_wallet_ledger_bound"
  | "blocked_until_payment_authorization_bound"
  | "blocked_until_monthly_payout_bound"
  | "blocked_until_media_realtime_bound"
  | "blocked_until_admin_permission_bound";

export type StreamFoundationKernelAdapterBindingGateCheckStatus = "passed" | "blocked" | "review_required";

export interface StreamFoundationKernelAdapterBindingGateSafety {
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
  readonly eventBusPublishAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelAdapterBindingGateRequest {
  readonly adapterKind: StreamFoundationKernelAdapterRegistryKind | "unknown_adapter";
  readonly requestedBy: "kernel_bridge" | "kernel_facade" | "kernel_router" | "kernel_reducer" | "kernel_state_machine" | "kernel_queue_consumer" | "admin_runtime" | "mobile_runtime";
  readonly requestedRuntimeBinding: boolean;
  readonly routeMountApproved: boolean;
  readonly repositoryBound: boolean;
  readonly providerConfigured: boolean;
  readonly walletLedgerBound: boolean;
  readonly paymentAuthorizationBound: boolean;
  readonly monthlyPayoutBatchBound: boolean;
  readonly mediaRealtimeBound: boolean;
  readonly adminPermissionBound: boolean;
}

export interface StreamFoundationKernelAdapterBindingGateCheck {
  readonly checkId: string;
  readonly status: StreamFoundationKernelAdapterBindingGateCheckStatus;
  readonly message: string;
}

export interface StreamFoundationKernelAdapterBindingGateDecision {
  readonly version: typeof STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION;
  readonly adapterKind: StreamFoundationKernelAdapterRegistryKind | "unknown_adapter";
  readonly status: StreamFoundationKernelAdapterBindingGateStatus;
  readonly registryEntry: StreamFoundationKernelAdapterRegistryEntry | null;
  readonly checks: readonly StreamFoundationKernelAdapterBindingGateCheck[];
  readonly safeToBindContractOnly: boolean;
  readonly safeToBindRuntimeNow: false;
  readonly blockedReason: string;
  readonly nextRequiredGate: string;
  readonly safety: StreamFoundationKernelAdapterBindingGateSafety;
}

export interface StreamFoundationKernelAdapterBindingGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly gateMode: "foundation_binding_gate_only";
  readonly totalRegisteredAdapters: number;
  readonly runtimeBindableAdaptersNow: 0;
  readonly contractOnlyAdaptersNow: number;
  readonly blockedRuntimeAdaptersNow: number;
  readonly allDirectMobileBindingBlocked: boolean;
  readonly allRuntimeBindingBlockedUntilGateApproval: boolean;
  readonly safety: StreamFoundationKernelAdapterBindingGateSafety;
}
