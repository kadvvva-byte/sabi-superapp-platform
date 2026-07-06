import {
  getStreamFoundationKernelAdapterDiagnosticsSnapshot,
  type StreamFoundationKernelAdapterDiagnosticsFinding,
} from "../kernel-adapter-diagnostics";
import {
  STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION,
  type StreamFoundationKernelDiagnosticsAdminAction,
  type StreamFoundationKernelDiagnosticsAdminActionId,
  type StreamFoundationKernelDiagnosticsAdminHandoffSnapshot,
  type StreamFoundationKernelDiagnosticsAdminPanelId,
  type StreamFoundationKernelDiagnosticsAdminRequest,
  type StreamFoundationKernelDiagnosticsAdminSafety,
  type StreamFoundationKernelDiagnosticsAdminWidget,
} from "./streamFoundationKernelDiagnosticsAdminHandoffContracts";

const SAFETY: StreamFoundationKernelDiagnosticsAdminSafety = {
  streamIndexPatchIncluded: false,
  adminUiFilesChangedNow: false,
  adminRouteMountedNow: false,
  routeMountAllowedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  recipientEarningCreditAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  realtimeBroadcastAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

const DEFAULT_PANEL_IDS: readonly StreamFoundationKernelDiagnosticsAdminPanelId[] = [
  "stream_kernel_overview",
  "adapter_health",
  "adapter_diagnostics",
  "payment_provider_gate",
  "wallet_ledger_gate",
  "monthly_payout_gate",
  "route_mount_gate",
  "secret_redaction_gate",
  "mobile_direct_access_gate",
  "fake_success_guard",
];

function severityForPanel(panelId: StreamFoundationKernelDiagnosticsAdminPanelId, findings: readonly StreamFoundationKernelAdapterDiagnosticsFinding[]): StreamFoundationKernelDiagnosticsAdminWidget["severity"] {
  if (panelId === "secret_redaction_gate" || panelId === "mobile_direct_access_gate" || panelId === "stream_kernel_overview") return "info";
  if (panelId === "payment_provider_gate" || panelId === "wallet_ledger_gate" || panelId === "monthly_payout_gate" || panelId === "route_mount_gate" || panelId === "fake_success_guard") return "blocked";
  return findings.some((finding) => finding.severity === "blocked") ? "blocked" : "review_required";
}

function titleKeyFor(panelId: StreamFoundationKernelDiagnosticsAdminPanelId): string {
  return `stream.admin.kernelDiagnostics.${panelId}.title`;
}

function descriptionKeyFor(panelId: StreamFoundationKernelDiagnosticsAdminPanelId): string {
  return `stream.admin.kernelDiagnostics.${panelId}.description`;
}

function findingCodesFor(panelId: StreamFoundationKernelDiagnosticsAdminPanelId, findings: readonly StreamFoundationKernelAdapterDiagnosticsFinding[]): readonly string[] {
  const codes = findings.map((finding) => finding.code);
  switch (panelId) {
    case "payment_provider_gate":
      return codes.filter((code) => code === "provider_not_configured" || code === "payment_authorization_not_bound" || code === "money_movement_blocked");
    case "wallet_ledger_gate":
      return codes.filter((code) => code === "wallet_ledger_not_bound" || code === "money_movement_blocked");
    case "monthly_payout_gate":
      return codes.filter((code) => code === "monthly_payout_not_bound" || code === "money_movement_blocked");
    case "route_mount_gate":
      return codes.filter((code) => code === "route_mount_not_approved");
    case "secret_redaction_gate":
      return codes.filter((code) => code === "secret_redaction_enforced");
    case "mobile_direct_access_gate":
      return codes.filter((code) => code === "mobile_direct_access_blocked");
    case "fake_success_guard":
      return ["fake_success_blocked"];
    default:
      return Array.from(new Set(codes));
  }
}

function widgetFor(panelId: StreamFoundationKernelDiagnosticsAdminPanelId, findings: readonly StreamFoundationKernelAdapterDiagnosticsFinding[]): StreamFoundationKernelDiagnosticsAdminWidget {
  const severity = severityForPanel(panelId, findings);
  return {
    panelId,
    kind: panelId === "adapter_diagnostics" ? "redacted_findings_table" : panelId === "payment_provider_gate" || panelId === "wallet_ledger_gate" || panelId === "monthly_payout_gate" ? "provider_gate_card" : panelId === "route_mount_gate" ? "blocked_reason_list" : panelId === "stream_kernel_overview" ? "status_badge" : "handoff_notice",
    titleKey: titleKeyFor(panelId),
    descriptionKey: descriptionKeyFor(panelId),
    severity,
    visibleForAdmin: true,
    visibleForMobile: false,
    redacted: true,
    serverSideOnly: true,
    rawSecretFieldCount: 0,
    providerCallAllowedNow: false,
    moneyMovementAllowedNow: false,
    findingCodes: findingCodesFor(panelId, findings),
  };
}

function action(id: StreamFoundationKernelDiagnosticsAdminActionId, blockedReasonKey: string, flags: Pick<StreamFoundationKernelDiagnosticsAdminAction, "routeMountRequiredLater" | "providerConfigurationRequiredLater" | "walletLedgerBindingRequiredLater" | "monthlyPayoutBindingRequiredLater">, enabledReadonly = false): StreamFoundationKernelDiagnosticsAdminAction {
  return {
    actionId: id,
    status: enabledReadonly ? "enabled_readonly" : "disabled_blocked",
    labelKey: `stream.admin.kernelDiagnostics.actions.${id}.label`,
    blockedReasonKey,
    requiresAdminPermission: true,
    ...flags,
    rawSecretsReturned: false,
    runtimeMutationAllowedNow: false,
  };
}

function buildActions(): readonly StreamFoundationKernelDiagnosticsAdminAction[] {
  return [
    action("refresh_redacted_snapshot", "stream.admin.kernelDiagnostics.blocked.readonlyRefreshOnly", { routeMountRequiredLater: false, providerConfigurationRequiredLater: false, walletLedgerBindingRequiredLater: false, monthlyPayoutBindingRequiredLater: false }, true),
    action("copy_safe_diagnostics_summary", "stream.admin.kernelDiagnostics.blocked.readonlySummaryOnly", { routeMountRequiredLater: false, providerConfigurationRequiredLater: false, walletLedgerBindingRequiredLater: false, monthlyPayoutBindingRequiredLater: false }, true),
    action("open_provider_configuration_later", "stream.admin.kernelDiagnostics.blocked.providerConfigurationStageRequired", { routeMountRequiredLater: true, providerConfigurationRequiredLater: true, walletLedgerBindingRequiredLater: false, monthlyPayoutBindingRequiredLater: false }),
    action("open_wallet_ledger_binding_later", "stream.admin.kernelDiagnostics.blocked.walletLedgerBindingStageRequired", { routeMountRequiredLater: true, providerConfigurationRequiredLater: false, walletLedgerBindingRequiredLater: true, monthlyPayoutBindingRequiredLater: false }),
    action("open_monthly_payout_policy_later", "stream.admin.kernelDiagnostics.blocked.monthlyPayoutBindingStageRequired", { routeMountRequiredLater: true, providerConfigurationRequiredLater: true, walletLedgerBindingRequiredLater: true, monthlyPayoutBindingRequiredLater: true }),
    action("request_route_mount_review_later", "stream.admin.kernelDiagnostics.blocked.routeMountApprovalRequired", { routeMountRequiredLater: true, providerConfigurationRequiredLater: false, walletLedgerBindingRequiredLater: false, monthlyPayoutBindingRequiredLater: false }),
  ];
}

function redactedAdminUserId(adminUserId?: string): string {
  if (!adminUserId) return "admin_user_not_provided";
  if (adminUserId.length <= 6) return "admin_user_redacted";
  return `${adminUserId.slice(0, 3)}***${adminUserId.slice(-2)}`;
}

export function getStreamFoundationKernelDiagnosticsAdminHandoffSnapshot(request: StreamFoundationKernelDiagnosticsAdminRequest): StreamFoundationKernelDiagnosticsAdminHandoffSnapshot {
  const diagnostics = getStreamFoundationKernelAdapterDiagnosticsSnapshot({
    mode: request.mode,
    routeMountApproved: request.routeMountApproved,
    repositoryBound: request.repositoryBound,
    providerConfigured: request.providerConfigured,
    walletLedgerBound: request.walletLedgerBound,
    paymentAuthorizationBound: request.paymentAuthorizationBound,
    monthlyPayoutBatchBound: request.monthlyPayoutBatchBound,
    mediaRealtimeBound: request.mediaRealtimeBound,
    adminPermissionBound: request.adminPermissionBound,
  });
  const panels = request.includePanelIds ?? DEFAULT_PANEL_IDS;
  const findingsPreview = (request.includeBlockedFindingsOnly ? diagnostics.findings.filter((finding) => finding.severity === "blocked") : diagnostics.findings).slice(0, 40);
  const widgets = panels.map((panelId) => widgetFor(panelId, findingsPreview));
  const actions = buildActions();
  const blockedWidgets = widgets.filter((widget) => widget.severity === "blocked").length;
  const disabledActions = actions.filter((item) => item.status === "disabled_blocked").length;

  return {
    version: STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION,
    streamIndexPatchIncluded: false,
    sourceDiagnosticsVersion: diagnostics.version,
    requestedMode: request.mode,
    adminUserIdRedacted: redactedAdminUserId(request.adminUserId),
    totalWidgets: widgets.length,
    totalActions: actions.length,
    blockedWidgets,
    disabledActions,
    rawSecretFieldsReturned: 0,
    mobileVisibleWidgets: 0,
    providerCallsPerformed: 0,
    moneyMovementPerformed: 0,
    routeMountReadyNow: false,
    adminHandoffReadyForUiLater: widgets.every((widget) => widget.visibleForAdmin && widget.redacted && widget.rawSecretFieldCount === 0) && actions.every((item) => item.rawSecretsReturned === false),
    widgets,
    actions,
    findingsPreview,
    safety: SAFETY,
  };
}

export function getStreamFoundationKernelDiagnosticsDefaultAdminHandoffSnapshot(): StreamFoundationKernelDiagnosticsAdminHandoffSnapshot {
  return getStreamFoundationKernelDiagnosticsAdminHandoffSnapshot({
    mode: "admin_redacted_snapshot",
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
