import type {
  StreamFoundationKernelBridgeAction,
  StreamFoundationKernelBridgeDecision,
  StreamFoundationKernelBridgePolicyItem,
  StreamFoundationKernelBridgeRequest,
  StreamFoundationKernelBridgeSnapshot,
  StreamFoundationKernelBridgeStatus,
  StreamFoundationKernelBridgeSurface,
} from "./streamFoundationKernelBridgeContracts";
import { STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION } from "./streamFoundationKernelBridgeContracts";

const policy = <T extends StreamFoundationKernelBridgePolicyItem>(item: T): T => item;

export const STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY: readonly StreamFoundationKernelBridgePolicyItem[] = [
  policy({
    surface: "live",
    action: "live_start",
    requiredTargets: ["stream_mobile_kernel", "stream_backend_foundation_kernel", "realtime_media_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: false,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "live",
    action: "live_stop",
    requiredTargets: ["stream_backend_foundation_kernel", "realtime_media_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: false,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "live",
    action: "live_heartbeat",
    requiredTargets: ["stream_backend_foundation_kernel", "realtime_media_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: false,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "shorts",
    action: "short_publish",
    requiredTargets: ["stream_mobile_kernel", "stream_backend_foundation_kernel", "realtime_media_kernel", "moderation_admin_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: true,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "shorts",
    action: "short_feed_read",
    requiredTargets: ["stream_backend_foundation_kernel", "analytics_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: false,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "business_stream",
    action: "business_product_attach",
    requiredTargets: ["stream_backend_foundation_kernel", "stream_admin_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "creator_profile",
    action: "creator_verification_request",
    requiredTargets: ["stream_backend_foundation_kernel", "stream_admin_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "moderation",
    action: "content_report",
    requiredTargets: ["stream_backend_foundation_kernel", "moderation_admin_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "analytics",
    action: "analytics_snapshot_read",
    requiredTargets: ["stream_backend_foundation_kernel", "analytics_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: false,
    walletLedgerRequiredLater: false,
    adminApprovalRequiredLater: false,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "gifts",
    action: "gift_purchase_request",
    requiredTargets: ["stream_backend_foundation_kernel", "payment_provider_gateway_kernel", "wallet_ledger_kernel", "stream_admin_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: true,
    walletLedgerRequiredLater: true,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "monetization_admin",
    action: "admin_monetization_config_save",
    requiredTargets: ["stream_admin_kernel", "payment_provider_gateway_kernel", "payout_provider_gateway_kernel", "wallet_ledger_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: true,
    walletLedgerRequiredLater: true,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
  }),
  policy({
    surface: "monthly_payout",
    action: "monthly_payout_batch_prepare",
    requiredTargets: ["stream_admin_kernel", "payout_provider_gateway_kernel", "wallet_ledger_kernel"],
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    routeMountRequiredLater: true,
    dbBindingRequiredLater: true,
    providerConfigRequiredLater: true,
    walletLedgerRequiredLater: true,
    adminApprovalRequiredLater: true,
    fakeSuccessAllowed: false,
    monthlyPayoutOnly: true,
  }),
] as const;

function findPolicy(surface: StreamFoundationKernelBridgeSurface, action: StreamFoundationKernelBridgeAction): StreamFoundationKernelBridgePolicyItem | undefined {
  return STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY.find((item) => item.surface === surface && item.action === action);
}

function blockedStatus(item: StreamFoundationKernelBridgePolicyItem): StreamFoundationKernelBridgeStatus {
  if (item.walletLedgerRequiredLater) return "blocked_wallet_ledger_not_configured";
  if (item.providerConfigRequiredLater) return "blocked_provider_not_configured";
  if (item.adminApprovalRequiredLater) return "blocked_admin_approval_required";
  if (item.routeMountRequiredLater) return "blocked_route_mount_required_later";
  if (item.dbBindingRequiredLater) return "blocked_db_binding_required_later";
  return "kernel_ready";
}

export function createStreamFoundationKernelBridgeDecision(request: StreamFoundationKernelBridgeRequest): StreamFoundationKernelBridgeDecision {
  const item = findPolicy(request.surface, request.action);
  if (!item) {
    return {
      version: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION,
      requestId: request.requestId,
      acceptedByKernel: false,
      status: "blocked_kernel_gate_missing",
      safeCode: "STREAM_KERNEL_BRIDGE_POLICY_MISSING",
      safeMessageKey: "stream.kernelBridge.policyMissing",
      requiredTargets: ["stream_backend_foundation_kernel"],
      blockedReasons: ["No kernel bridge policy exists for this surface/action pair."],
      nextKernelStep: "Add a policy item before connecting any direct backend/provider/Wallet path.",
      directDbAccessAllowed: false,
      directProviderCallAllowed: false,
      directWalletMutationAllowed: false,
      directRealtimeBroadcastAllowed: false,
      rawSecretsReturned: false,
      mobileProviderKeysAllowed: false,
      fakeSuccessAllowed: false,
    };
  }

  const blockedReasons = [
    item.routeMountRequiredLater ? "Route mount must happen only through the protected Stream router stage." : null,
    item.dbBindingRequiredLater ? "Database binding must happen through repository/kernel contracts, not direct DB calls." : null,
    item.providerConfigRequiredLater ? "Provider config must be supplied server-side through Admin/provider gates." : null,
    item.walletLedgerRequiredLater ? "Wallet/COIN ledger commit must happen through Wallet ledger kernel, not direct mutation." : null,
    item.adminApprovalRequiredLater ? "Admin approval/review gate is required before live execution." : null,
    item.monthlyPayoutOnly ? "Payout is monthly only and cannot be triggered as an instant user withdrawal." : null,
  ].filter((reason): reason is string => Boolean(reason));

  const status = blockedStatus(item);
  return {
    version: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION,
    requestId: request.requestId,
    acceptedByKernel: status === "kernel_ready",
    status,
    safeCode: status === "kernel_ready" ? "STREAM_KERNEL_BRIDGE_READY" : "STREAM_KERNEL_BRIDGE_BLOCKED",
    safeMessageKey: status === "kernel_ready" ? "stream.kernelBridge.ready" : "stream.kernelBridge.blocked",
    requiredTargets: item.requiredTargets,
    blockedReasons,
    nextKernelStep: status === "kernel_ready" ? "Continue through kernel facade." : "Keep request blocked until the required kernel/gate stage is configured.",
    directDbAccessAllowed: false,
    directProviderCallAllowed: false,
    directWalletMutationAllowed: false,
    directRealtimeBroadcastAllowed: false,
    rawSecretsReturned: false,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
  };
}

export function getStreamFoundationKernelBridgeSnapshot(): StreamFoundationKernelBridgeSnapshot {
  const directBindingViolations = STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY.filter((item) => (
    item.directDbAccessAllowed || item.directProviderCallAllowed || item.directWalletMutationAllowed || item.directRealtimeBroadcastAllowed
  )).length;
  const fakeSuccessViolations = STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY.filter((item) => item.fakeSuccessAllowed).length;

  return {
    version: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_CONTRACTS_VERSION,
    policyItems: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY,
    totalPolicyItems: STREAM_FOUNDATION_137W_KERNEL_BRIDGE_POLICY.length,
    directBindingViolations,
    fakeSuccessViolations,
    routeMountAllowedNow: false,
    databaseWriteAllowedNow: false,
    providerCallAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    streamIndexPatchIncluded: false,
  };
}
