import type {
  StreamFoundationKernelAdapterDiagnosticsFinding,
  StreamFoundationKernelAdapterDiagnosticsMode,
  StreamFoundationKernelAdapterDiagnosticsSnapshot,
} from "../kernel-adapter-diagnostics";

export const STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION = "BACKEND-STREAM-FOUNDATION-138I" as const;

export type StreamFoundationKernelDiagnosticsAdminPanelId =
  | "stream_kernel_overview"
  | "adapter_health"
  | "adapter_diagnostics"
  | "payment_provider_gate"
  | "wallet_ledger_gate"
  | "monthly_payout_gate"
  | "route_mount_gate"
  | "secret_redaction_gate"
  | "mobile_direct_access_gate"
  | "fake_success_guard";

export type StreamFoundationKernelDiagnosticsAdminWidgetKind =
  | "status_badge"
  | "blocked_reason_list"
  | "redacted_findings_table"
  | "provider_gate_card"
  | "wallet_ledger_card"
  | "monthly_payout_card"
  | "safe_action_preview"
  | "handoff_notice";

export type StreamFoundationKernelDiagnosticsAdminActionId =
  | "refresh_redacted_snapshot"
  | "copy_safe_diagnostics_summary"
  | "open_provider_configuration_later"
  | "open_wallet_ledger_binding_later"
  | "open_monthly_payout_policy_later"
  | "request_route_mount_review_later";

export type StreamFoundationKernelDiagnosticsAdminActionStatus = "enabled_readonly" | "disabled_blocked" | "hidden_for_mobile";

export interface StreamFoundationKernelDiagnosticsAdminSafety {
  readonly streamIndexPatchIncluded: false;
  readonly adminUiFilesChangedNow: false;
  readonly adminRouteMountedNow: false;
  readonly routeMountAllowedNow: false;
  readonly databaseReadAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly recipientEarningCreditAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly realtimeBroadcastAllowedNow: false;
  readonly rawSecretsReturned: false;
  readonly mobileProviderKeysAllowed: false;
  readonly fakeSuccessAllowed: false;
}

export interface StreamFoundationKernelDiagnosticsAdminRequest {
  readonly mode: Extract<StreamFoundationKernelAdapterDiagnosticsMode, "admin_redacted_snapshot" | "server_install_check">;
  readonly adminUserId?: string;
  readonly includePanelIds?: readonly StreamFoundationKernelDiagnosticsAdminPanelId[];
  readonly includeBlockedFindingsOnly?: boolean;
  readonly routeMountApproved: boolean;
  readonly repositoryBound: boolean;
  readonly providerConfigured: boolean;
  readonly walletLedgerBound: boolean;
  readonly paymentAuthorizationBound: boolean;
  readonly monthlyPayoutBatchBound: boolean;
  readonly mediaRealtimeBound: boolean;
  readonly adminPermissionBound: boolean;
}

export interface StreamFoundationKernelDiagnosticsAdminWidget {
  readonly panelId: StreamFoundationKernelDiagnosticsAdminPanelId;
  readonly kind: StreamFoundationKernelDiagnosticsAdminWidgetKind;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly severity: "info" | "review_required" | "blocked";
  readonly visibleForAdmin: true;
  readonly visibleForMobile: false;
  readonly redacted: true;
  readonly serverSideOnly: true;
  readonly rawSecretFieldCount: 0;
  readonly providerCallAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly findingCodes: readonly string[];
}

export interface StreamFoundationKernelDiagnosticsAdminAction {
  readonly actionId: StreamFoundationKernelDiagnosticsAdminActionId;
  readonly status: StreamFoundationKernelDiagnosticsAdminActionStatus;
  readonly labelKey: string;
  readonly blockedReasonKey: string;
  readonly requiresAdminPermission: true;
  readonly routeMountRequiredLater: boolean;
  readonly providerConfigurationRequiredLater: boolean;
  readonly walletLedgerBindingRequiredLater: boolean;
  readonly monthlyPayoutBindingRequiredLater: boolean;
  readonly rawSecretsReturned: false;
  readonly runtimeMutationAllowedNow: false;
}

export interface StreamFoundationKernelDiagnosticsAdminHandoffSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138I_KERNEL_DIAGNOSTICS_ADMIN_HANDOFF_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly sourceDiagnosticsVersion: StreamFoundationKernelAdapterDiagnosticsSnapshot["version"];
  readonly requestedMode: StreamFoundationKernelDiagnosticsAdminRequest["mode"];
  readonly adminUserIdRedacted: string;
  readonly totalWidgets: number;
  readonly totalActions: number;
  readonly blockedWidgets: number;
  readonly disabledActions: number;
  readonly rawSecretFieldsReturned: 0;
  readonly mobileVisibleWidgets: 0;
  readonly providerCallsPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly routeMountReadyNow: false;
  readonly adminHandoffReadyForUiLater: boolean;
  readonly widgets: readonly StreamFoundationKernelDiagnosticsAdminWidget[];
  readonly actions: readonly StreamFoundationKernelDiagnosticsAdminAction[];
  readonly findingsPreview: readonly StreamFoundationKernelAdapterDiagnosticsFinding[];
  readonly safety: StreamFoundationKernelDiagnosticsAdminSafety;
}
