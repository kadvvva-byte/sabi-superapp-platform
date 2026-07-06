import {
  getStreamFoundationKernelAdapterRegistryEntries,
  type StreamFoundationKernelAdapterBindingStatus,
  type StreamFoundationKernelAdapterRegistryEntry,
} from "../kernel-adapter-registry";
import {
  STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
  type StreamFoundationKernelAdapterBindingGateCheck,
  type StreamFoundationKernelAdapterBindingGateDecision,
  type StreamFoundationKernelAdapterBindingGateRequest,
  type StreamFoundationKernelAdapterBindingGateSafety,
  type StreamFoundationKernelAdapterBindingGateSnapshot,
  type StreamFoundationKernelAdapterBindingGateStatus,
} from "./streamFoundationKernelAdapterBindingGateContracts";

const SAFETY: StreamFoundationKernelAdapterBindingGateSafety = {
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
  eventBusPublishAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

function mapBindingStatus(status: StreamFoundationKernelAdapterBindingStatus): StreamFoundationKernelAdapterBindingGateStatus {
  switch (status) {
    case "contract_registered_only":
      return "contract_binding_allowed";
    case "blocked_until_route_mount_approved":
      return "blocked_until_route_mount_approved";
    case "blocked_until_database_repository_bound":
      return "blocked_until_repository_bound";
    case "blocked_until_provider_configured":
      return "blocked_until_provider_configured";
    case "blocked_until_wallet_ledger_bound":
      return "blocked_until_wallet_ledger_bound";
    case "blocked_until_payment_authorization_bound":
      return "blocked_until_payment_authorization_bound";
    case "blocked_until_monthly_payout_batch_bound":
      return "blocked_until_monthly_payout_bound";
    case "blocked_until_media_realtime_bound":
      return "blocked_until_media_realtime_bound";
    case "blocked_until_admin_permission_bound":
      return "blocked_until_admin_permission_bound";
    default:
      return "blocked_runtime_binding_disallowed";
  }
}

function nextRequiredGate(entry: StreamFoundationKernelAdapterRegistryEntry): string {
  switch (entry.bindingStatus) {
    case "contract_registered_only":
      return "runtime_binding_not_required_for_safe_preview";
    case "blocked_until_route_mount_approved":
      return "route_mount_owner_approval_required";
    case "blocked_until_database_repository_bound":
      return "repository_adapter_binding_required";
    case "blocked_until_provider_configured":
      return "server_side_provider_config_required";
    case "blocked_until_wallet_ledger_bound":
      return "wallet_coin_ledger_adapter_binding_required";
    case "blocked_until_payment_authorization_bound":
      return "accept_payment_provider_live_authorization_required";
    case "blocked_until_monthly_payout_batch_bound":
      return "monthly_payout_batch_adapter_binding_required";
    case "blocked_until_media_realtime_bound":
      return "media_realtime_adapter_binding_required";
    case "blocked_until_admin_permission_bound":
      return "admin_permission_and_approval_binding_required";
    default:
      return "manual_review_required";
  }
}

function checksFor(entry: StreamFoundationKernelAdapterRegistryEntry, request: StreamFoundationKernelAdapterBindingGateRequest): readonly StreamFoundationKernelAdapterBindingGateCheck[] {
  const checks: StreamFoundationKernelAdapterBindingGateCheck[] = [
    { checkId: "registered_adapter", status: "passed", message: "adapter_exists_in_138e_registry" },
    { checkId: "server_side_only", status: entry.serverSideOnly ? "passed" : "blocked", message: entry.serverSideOnly ? "adapter_is_server_side_only" : "adapter_not_server_side_only" },
    { checkId: "mobile_direct_call_blocked", status: entry.mobileCallableDirectly === false && request.requestedBy !== "mobile_runtime" ? "passed" : "blocked", message: "mobile_runtime_must_not_bind_adapter_directly" },
    { checkId: "direct_database_access_blocked", status: entry.directDatabaseAccessAllowed === false ? "passed" : "blocked", message: "direct_database_access_is_forbidden" },
    { checkId: "direct_provider_access_blocked", status: entry.directProviderAccessAllowed === false ? "passed" : "blocked", message: "direct_provider_access_is_forbidden" },
    { checkId: "direct_wallet_access_blocked", status: entry.directWalletAccessAllowed === false ? "passed" : "blocked", message: "direct_wallet_access_is_forbidden" },
  ];

  if (request.requestedRuntimeBinding) {
    checks.push({ checkId: "runtime_binding_now", status: "blocked", message: "runtime_adapter_binding_requires_separate_approved_live_stage" });
  } else {
    checks.push({ checkId: "contract_binding_only", status: "passed", message: "contract_binding_review_is_allowed_without_side_effects" });
  }

  if (entry.bindingStatus === "blocked_until_route_mount_approved" && !request.routeMountApproved) {
    checks.push({ checkId: "route_mount_gate", status: "blocked", message: "route_mount_not_approved" });
  }
  if (entry.bindingStatus === "blocked_until_database_repository_bound" && !request.repositoryBound) {
    checks.push({ checkId: "repository_gate", status: "blocked", message: "repository_adapter_not_bound" });
  }
  if (entry.bindingStatus === "blocked_until_provider_configured" && !request.providerConfigured) {
    checks.push({ checkId: "provider_config_gate", status: "blocked", message: "server_side_provider_not_configured" });
  }
  if (entry.bindingStatus === "blocked_until_wallet_ledger_bound" && !request.walletLedgerBound) {
    checks.push({ checkId: "wallet_ledger_gate", status: "blocked", message: "wallet_coin_ledger_not_bound" });
  }
  if (entry.bindingStatus === "blocked_until_payment_authorization_bound" && !request.paymentAuthorizationBound) {
    checks.push({ checkId: "payment_authorization_gate", status: "blocked", message: "accept_payment_authorization_adapter_not_bound" });
  }
  if (entry.bindingStatus === "blocked_until_monthly_payout_batch_bound" && !request.monthlyPayoutBatchBound) {
    checks.push({ checkId: "monthly_payout_gate", status: "blocked", message: "monthly_payout_batch_not_bound" });
  }
  if (entry.bindingStatus === "blocked_until_media_realtime_bound" && !request.mediaRealtimeBound) {
    checks.push({ checkId: "media_realtime_gate", status: "blocked", message: "media_realtime_adapter_not_bound" });
  }
  if (entry.bindingStatus === "blocked_until_admin_permission_bound" && !request.adminPermissionBound) {
    checks.push({ checkId: "admin_permission_gate", status: "blocked", message: "admin_permission_adapter_not_bound" });
  }

  return checks;
}

export function getStreamFoundationKernelAdapterBindingGateDecision(request: StreamFoundationKernelAdapterBindingGateRequest): StreamFoundationKernelAdapterBindingGateDecision {
  const entry = getStreamFoundationKernelAdapterRegistryEntries().find((candidate) => candidate.adapterKind === request.adapterKind) ?? null;
  if (!entry) {
    return {
      version: STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
      adapterKind: request.adapterKind,
      status: "blocked_unknown_adapter",
      registryEntry: null,
      checks: [{ checkId: "registered_adapter", status: "blocked", message: "adapter_not_registered_in_138e_registry" }],
      safeToBindContractOnly: false,
      safeToBindRuntimeNow: false,
      blockedReason: "adapter_not_registered",
      nextRequiredGate: "register_adapter_contract_first",
      safety: SAFETY,
    };
  }

  const checks = checksFor(entry, request);
  const hasBlocked = checks.some((check) => check.status === "blocked");
  const baseStatus = mapBindingStatus(entry.bindingStatus);
  const status: StreamFoundationKernelAdapterBindingGateStatus = request.requestedRuntimeBinding
    ? "blocked_runtime_binding_disallowed"
    : baseStatus;

  return {
    version: STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
    adapterKind: entry.adapterKind,
    status: hasBlocked && baseStatus === "contract_binding_allowed" ? "blocked_runtime_binding_disallowed" : status,
    registryEntry: entry,
    checks,
    safeToBindContractOnly: !request.requestedRuntimeBinding && checks.every((check) => check.status !== "blocked" || check.checkId.endsWith("gate")),
    safeToBindRuntimeNow: false,
    blockedReason: entry.bindingStatus === "contract_registered_only" && !request.requestedRuntimeBinding ? "none_contract_only" : entry.blockedReason,
    nextRequiredGate: nextRequiredGate(entry),
    safety: SAFETY,
  };
}

export function getStreamFoundationKernelAdapterBindingGateSnapshot(): StreamFoundationKernelAdapterBindingGateSnapshot {
  const entries = getStreamFoundationKernelAdapterRegistryEntries();
  const blockedRuntimeAdaptersNow = entries.filter((entry) => entry.bindingStatus !== "contract_registered_only").length;
  return {
    version: STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
    streamIndexPatchIncluded: false,
    gateMode: "foundation_binding_gate_only",
    totalRegisteredAdapters: entries.length,
    runtimeBindableAdaptersNow: 0,
    contractOnlyAdaptersNow: entries.length,
    blockedRuntimeAdaptersNow,
    allDirectMobileBindingBlocked: entries.every((entry) => entry.mobileCallableDirectly === false),
    allRuntimeBindingBlockedUntilGateApproval: true,
    safety: SAFETY,
  };
}
