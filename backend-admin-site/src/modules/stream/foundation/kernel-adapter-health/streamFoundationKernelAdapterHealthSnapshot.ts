import {
  getStreamFoundationKernelAdapterBindingGateDecision,
  type StreamFoundationKernelAdapterBindingGateRequest,
} from "../kernel-adapter-binding-gate";
import { getStreamFoundationKernelAdapterRegistryEntries } from "../kernel-adapter-registry";
import {
  STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION,
  type StreamFoundationKernelAdapterHealthItem,
  type StreamFoundationKernelAdapterHealthRequest,
  type StreamFoundationKernelAdapterHealthSafety,
  type StreamFoundationKernelAdapterHealthSeverity,
  type StreamFoundationKernelAdapterHealthSnapshot,
  type StreamFoundationKernelAdapterHealthStatus,
} from "./streamFoundationKernelAdapterHealthContracts";

const SAFETY: StreamFoundationKernelAdapterHealthSafety = {
  streamIndexPatchIncluded: false,
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
  queueConsumerStartAllowedNow: false,
  eventBusPublishAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

function toBindingRequest(request: StreamFoundationKernelAdapterHealthRequest, adapterKind: StreamFoundationKernelAdapterBindingGateRequest["adapterKind"]): StreamFoundationKernelAdapterBindingGateRequest {
  return {
    adapterKind,
    requestedBy: request.requestedBy === "kernel_action_router" ? "kernel_router" : request.requestedBy === "server_install_check" || request.requestedBy === "admin_snapshot" ? "admin_runtime" : request.requestedBy,
    requestedRuntimeBinding: false,
    routeMountApproved: request.routeMountApproved,
    repositoryBound: request.repositoryBound,
    providerConfigured: request.providerConfigured,
    walletLedgerBound: request.walletLedgerBound,
    paymentAuthorizationBound: request.paymentAuthorizationBound,
    monthlyPayoutBatchBound: request.monthlyPayoutBatchBound,
    mediaRealtimeBound: request.mediaRealtimeBound,
    adminPermissionBound: request.adminPermissionBound,
  };
}

function mapHealthStatus(bindingStatus: string): StreamFoundationKernelAdapterHealthStatus {
  switch (bindingStatus) {
    case "contract_binding_allowed":
      return "healthy_contract_only";
    case "blocked_until_route_mount_approved":
      return "blocked_route_mount_not_approved";
    case "blocked_until_repository_bound":
      return "blocked_not_bound";
    case "blocked_until_provider_configured":
      return "blocked_provider_not_configured";
    case "blocked_until_wallet_ledger_bound":
      return "blocked_wallet_ledger_not_bound";
    case "blocked_until_payment_authorization_bound":
      return "blocked_payment_authorization_not_bound";
    case "blocked_until_monthly_payout_bound":
      return "blocked_monthly_payout_not_bound";
    case "blocked_until_media_realtime_bound":
      return "blocked_media_realtime_not_bound";
    case "blocked_until_admin_permission_bound":
      return "blocked_admin_permission_not_bound";
    case "blocked_unknown_adapter":
      return "blocked_unknown_adapter";
    default:
      return "blocked_not_bound";
  }
}

function severityFor(status: StreamFoundationKernelAdapterHealthStatus): StreamFoundationKernelAdapterHealthSeverity {
  if (status === "healthy_contract_only") return "info";
  if (status === "blocked_provider_not_configured" || status === "blocked_wallet_ledger_not_bound" || status === "blocked_payment_authorization_not_bound" || status === "blocked_monthly_payout_not_bound") return "blocked";
  return "review_required";
}

function messageFor(status: StreamFoundationKernelAdapterHealthStatus): string {
  switch (status) {
    case "healthy_contract_only":
      return "stream.adapter.health.contractOnlyHealthy";
    case "blocked_route_mount_not_approved":
      return "stream.adapter.health.routeMountNotApproved";
    case "blocked_provider_not_configured":
      return "stream.adapter.health.providerNotConfigured";
    case "blocked_wallet_ledger_not_bound":
      return "stream.adapter.health.walletLedgerNotBound";
    case "blocked_payment_authorization_not_bound":
      return "stream.adapter.health.paymentAuthorizationNotBound";
    case "blocked_monthly_payout_not_bound":
      return "stream.adapter.health.monthlyPayoutNotBound";
    case "blocked_media_realtime_not_bound":
      return "stream.adapter.health.mediaRealtimeNotBound";
    case "blocked_admin_permission_not_bound":
      return "stream.adapter.health.adminPermissionNotBound";
    case "blocked_unknown_adapter":
      return "stream.adapter.health.unknownAdapter";
    case "blocked_not_bound":
    default:
      return "stream.adapter.health.repositoryNotBound";
  }
}

function buildHealthItem(request: StreamFoundationKernelAdapterHealthRequest, adapterKind: StreamFoundationKernelAdapterBindingGateRequest["adapterKind"]): StreamFoundationKernelAdapterHealthItem | null {
  if (adapterKind === "unknown_adapter") return null;
  const decision = getStreamFoundationKernelAdapterBindingGateDecision(toBindingRequest(request, adapterKind));
  const status = mapHealthStatus(decision.status);
  return {
    adapterKind,
    status,
    severity: severityFor(status),
    healthMessageKey: messageFor(status),
    requiredGate: decision.nextRequiredGate,
    serverSideOnly: true,
    mobileDirectAccessBlocked: true,
    runtimeBindingAllowedNow: false,
    safeForSnapshot: decision.registryEntry?.serverSideOnly === true && decision.safeToBindRuntimeNow === false,
  };
}

export function getStreamFoundationKernelAdapterHealthSnapshot(request: StreamFoundationKernelAdapterHealthRequest): StreamFoundationKernelAdapterHealthSnapshot {
  const includedKinds = new Set(request.includeAdapterKinds ?? getStreamFoundationKernelAdapterRegistryEntries().map((entry) => entry.adapterKind));
  const items = getStreamFoundationKernelAdapterRegistryEntries()
    .filter((entry) => includedKinds.has(entry.adapterKind))
    .map((entry) => buildHealthItem(request, entry.adapterKind))
    .filter((item): item is StreamFoundationKernelAdapterHealthItem => item !== null);

  const healthyContractOnlyAdapters = items.filter((item) => item.status === "healthy_contract_only").length;
  const blockedAdapters = items.filter((item) => item.severity === "blocked").length;
  const reviewRequiredAdapters = items.filter((item) => item.severity === "review_required").length;

  return {
    version: STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION,
    streamIndexPatchIncluded: false,
    snapshotMode: "foundation_health_snapshot_only",
    requestedBy: request.requestedBy,
    totalAdapters: items.length,
    healthyContractOnlyAdapters,
    blockedAdapters,
    reviewRequiredAdapters,
    runtimeBindableAdaptersNow: 0,
    providerReadyAdaptersNow: 0,
    walletReadyAdaptersNow: 0,
    moneyMovementReadyNow: false,
    allAdaptersServerSideOnly: items.every((item) => item.serverSideOnly),
    allMobileDirectAccessBlocked: items.every((item) => item.mobileDirectAccessBlocked),
    items,
    safety: SAFETY,
  };
}

export function getStreamFoundationKernelAdapterDefaultHealthSnapshot(): StreamFoundationKernelAdapterHealthSnapshot {
  return getStreamFoundationKernelAdapterHealthSnapshot({
    requestedBy: "server_install_check",
    routeMountApproved: false,
    repositoryBound: false,
    providerConfigured: false,
    walletLedgerBound: false,
    paymentAuthorizationBound: false,
    monthlyPayoutBatchBound: false,
    mediaRealtimeBound: false,
    adminPermissionBound: false,
  });
}
