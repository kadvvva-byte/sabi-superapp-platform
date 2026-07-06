import {
  getStreamFoundationKernelAdapterHealthSnapshot,
  type StreamFoundationKernelAdapterHealthItem,
  type StreamFoundationKernelAdapterHealthRequest,
} from "../kernel-adapter-health";
import {
  STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION,
  type StreamFoundationKernelAdapterDiagnosticsFinding,
  type StreamFoundationKernelAdapterDiagnosticsFindingCode,
  type StreamFoundationKernelAdapterDiagnosticsRequest,
  type StreamFoundationKernelAdapterDiagnosticsSafety,
  type StreamFoundationKernelAdapterDiagnosticsSeverity,
  type StreamFoundationKernelAdapterDiagnosticsSnapshot,
} from "./streamFoundationKernelAdapterDiagnosticsContracts";

const SAFETY: StreamFoundationKernelAdapterDiagnosticsSafety = {
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

function toHealthRequest(request: StreamFoundationKernelAdapterDiagnosticsRequest): StreamFoundationKernelAdapterHealthRequest {
  return {
    requestedBy: request.mode === "admin_redacted_snapshot" ? "admin_snapshot" : request.mode === "server_install_check" ? "server_install_check" : request.mode === "kernel_facade_check" ? "kernel_facade" : "kernel_bridge",
    includeAdapterKinds: request.includeAdapterKinds,
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

function codeFor(item: StreamFoundationKernelAdapterHealthItem): StreamFoundationKernelAdapterDiagnosticsFindingCode {
  switch (item.status) {
    case "healthy_contract_only":
      return "adapter_contract_visible";
    case "blocked_route_mount_not_approved":
      return "route_mount_not_approved";
    case "blocked_provider_not_configured":
      return "provider_not_configured";
    case "blocked_wallet_ledger_not_bound":
      return "wallet_ledger_not_bound";
    case "blocked_payment_authorization_not_bound":
      return "payment_authorization_not_bound";
    case "blocked_monthly_payout_not_bound":
      return "monthly_payout_not_bound";
    case "blocked_media_realtime_not_bound":
      return "media_realtime_not_bound";
    case "blocked_admin_permission_not_bound":
      return "admin_permission_not_bound";
    case "blocked_not_bound":
    case "blocked_unknown_adapter":
    default:
      return "adapter_binding_missing";
  }
}

function severityFor(code: StreamFoundationKernelAdapterDiagnosticsFindingCode, fallback: StreamFoundationKernelAdapterDiagnosticsSeverity): StreamFoundationKernelAdapterDiagnosticsSeverity {
  if (code === "secret_redaction_enforced" || code === "mobile_direct_access_blocked") return "info";
  if (code === "money_movement_blocked" || code === "provider_not_configured" || code === "wallet_ledger_not_bound" || code === "payment_authorization_not_bound" || code === "monthly_payout_not_bound") return "blocked";
  return fallback;
}

function messageFor(code: StreamFoundationKernelAdapterDiagnosticsFindingCode): string {
  switch (code) {
    case "adapter_contract_visible":
      return "stream.adapter.diagnostics.contractVisible";
    case "route_mount_not_approved":
      return "stream.adapter.diagnostics.routeMountNotApproved";
    case "provider_not_configured":
      return "stream.adapter.diagnostics.providerNotConfigured";
    case "wallet_ledger_not_bound":
      return "stream.adapter.diagnostics.walletLedgerNotBound";
    case "payment_authorization_not_bound":
      return "stream.adapter.diagnostics.paymentAuthorizationNotBound";
    case "monthly_payout_not_bound":
      return "stream.adapter.diagnostics.monthlyPayoutNotBound";
    case "media_realtime_not_bound":
      return "stream.adapter.diagnostics.mediaRealtimeNotBound";
    case "admin_permission_not_bound":
      return "stream.adapter.diagnostics.adminPermissionNotBound";
    case "money_movement_blocked":
      return "stream.adapter.diagnostics.moneyMovementBlocked";
    case "secret_redaction_enforced":
      return "stream.adapter.diagnostics.secretRedactionEnforced";
    case "mobile_direct_access_blocked":
      return "stream.adapter.diagnostics.mobileDirectAccessBlocked";
    case "adapter_binding_missing":
    default:
      return "stream.adapter.diagnostics.bindingMissing";
  }
}

function diagnosticFinding(item: StreamFoundationKernelAdapterHealthItem, forcedCode?: StreamFoundationKernelAdapterDiagnosticsFindingCode): StreamFoundationKernelAdapterDiagnosticsFinding {
  const code = forcedCode ?? codeFor(item);
  const severity = severityFor(code, item.severity);
  return {
    adapterKind: item.adapterKind,
    code,
    severity,
    messageKey: messageFor(code),
    sourceHealthStatus: item.status,
    requiredGate: forcedCode === "secret_redaction_enforced" ? "server_side_redacted_snapshot_only" : forcedCode === "mobile_direct_access_blocked" ? "kernel_only_no_mobile_direct_adapter_access" : forcedCode === "money_movement_blocked" ? "real_payment_wallet_ledger_and_monthly_payout_gates_required" : item.requiredGate,
    redacted: true,
    serverSideOnly: true,
    mobileDirectAccessBlocked: true,
    safeForAdminSnapshot: true,
    runtimeActionAllowedNow: false,
  };
}

export function getStreamFoundationKernelAdapterDiagnosticsSnapshot(request: StreamFoundationKernelAdapterDiagnosticsRequest): StreamFoundationKernelAdapterDiagnosticsSnapshot {
  const health = getStreamFoundationKernelAdapterHealthSnapshot(toHealthRequest(request));
  const requestedCodes = request.includeFindingCodes ? new Set(request.includeFindingCodes) : null;
  const findings = health.items.flatMap((item) => {
    const base = diagnosticFinding(item);
    const extra: StreamFoundationKernelAdapterDiagnosticsFinding[] = [
      diagnosticFinding(item, "secret_redaction_enforced"),
      diagnosticFinding(item, "mobile_direct_access_blocked"),
    ];
    if (item.adapterKind === "payment_authorization_adapter" || item.adapterKind === "wallet_ledger_adapter" || item.adapterKind === "recipient_earning_adapter" || item.adapterKind === "monthly_payout_adapter" || item.adapterKind === "platform_settlement_adapter") {
      extra.push(diagnosticFinding(item, "money_movement_blocked"));
    }
    return [base, ...extra].filter((finding) => !requestedCodes || requestedCodes.has(finding.code));
  });

  const infoFindings = findings.filter((finding) => finding.severity === "info").length;
  const reviewRequiredFindings = findings.filter((finding) => finding.severity === "review_required").length;
  const blockedFindings = findings.filter((finding) => finding.severity === "blocked").length;

  return {
    version: STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION,
    streamIndexPatchIncluded: false,
    diagnosticsMode: request.mode,
    totalFindings: findings.length,
    infoFindings,
    reviewRequiredFindings,
    blockedFindings,
    inspectedAdapters: health.totalAdapters,
    rawSecretFindingsReturned: 0,
    providerCallsPerformed: 0,
    moneyMovementPerformed: 0,
    directMobileAccessFindings: 0,
    routeMountReadyNow: false,
    diagnosticsSafeForAdmin: findings.every((finding) => finding.redacted && finding.safeForAdminSnapshot),
    diagnosticsSafeForMobile: false,
    findings,
    safety: SAFETY,
  };
}

export function getStreamFoundationKernelAdapterDefaultDiagnosticsSnapshot(): StreamFoundationKernelAdapterDiagnosticsSnapshot {
  return getStreamFoundationKernelAdapterDiagnosticsSnapshot({
    mode: "server_install_check",
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
