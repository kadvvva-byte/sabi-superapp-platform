import type { StreamFoundationKernelAdapterRegistryKind } from "../kernel-adapter-registry";
import type { StreamFoundationKernelAdapterHealthStatus } from "../kernel-adapter-health";

export const STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION = "BACKEND-STREAM-FOUNDATION-138H" as const;

export type StreamFoundationKernelAdapterDiagnosticsMode =
  | "admin_redacted_snapshot"
  | "server_install_check"
  | "kernel_bridge_check"
  | "kernel_facade_check";

export type StreamFoundationKernelAdapterDiagnosticsSeverity = "info" | "review_required" | "blocked";

export type StreamFoundationKernelAdapterDiagnosticsFindingCode =
  | "adapter_contract_visible"
  | "adapter_binding_missing"
  | "route_mount_not_approved"
  | "provider_not_configured"
  | "wallet_ledger_not_bound"
  | "payment_authorization_not_bound"
  | "monthly_payout_not_bound"
  | "media_realtime_not_bound"
  | "admin_permission_not_bound"
  | "money_movement_blocked"
  | "secret_redaction_enforced"
  | "mobile_direct_access_blocked";

export interface StreamFoundationKernelAdapterDiagnosticsSafety {
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

export interface StreamFoundationKernelAdapterDiagnosticsRequest {
  readonly mode: StreamFoundationKernelAdapterDiagnosticsMode;
  readonly includeAdapterKinds?: readonly StreamFoundationKernelAdapterRegistryKind[];
  readonly includeFindingCodes?: readonly StreamFoundationKernelAdapterDiagnosticsFindingCode[];
  readonly routeMountApproved: boolean;
  readonly repositoryBound: boolean;
  readonly providerConfigured: boolean;
  readonly walletLedgerBound: boolean;
  readonly paymentAuthorizationBound: boolean;
  readonly monthlyPayoutBatchBound: boolean;
  readonly mediaRealtimeBound: boolean;
  readonly adminPermissionBound: boolean;
}

export interface StreamFoundationKernelAdapterDiagnosticsFinding {
  readonly adapterKind: StreamFoundationKernelAdapterRegistryKind;
  readonly code: StreamFoundationKernelAdapterDiagnosticsFindingCode;
  readonly severity: StreamFoundationKernelAdapterDiagnosticsSeverity;
  readonly messageKey: string;
  readonly sourceHealthStatus: StreamFoundationKernelAdapterHealthStatus;
  readonly requiredGate: string;
  readonly redacted: true;
  readonly serverSideOnly: true;
  readonly mobileDirectAccessBlocked: true;
  readonly safeForAdminSnapshot: true;
  readonly runtimeActionAllowedNow: false;
}

export interface StreamFoundationKernelAdapterDiagnosticsSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138H_KERNEL_ADAPTER_DIAGNOSTICS_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly diagnosticsMode: StreamFoundationKernelAdapterDiagnosticsMode;
  readonly totalFindings: number;
  readonly infoFindings: number;
  readonly reviewRequiredFindings: number;
  readonly blockedFindings: number;
  readonly inspectedAdapters: number;
  readonly rawSecretFindingsReturned: 0;
  readonly providerCallsPerformed: 0;
  readonly moneyMovementPerformed: 0;
  readonly directMobileAccessFindings: 0;
  readonly routeMountReadyNow: false;
  readonly diagnosticsSafeForAdmin: boolean;
  readonly diagnosticsSafeForMobile: false;
  readonly findings: readonly StreamFoundationKernelAdapterDiagnosticsFinding[];
  readonly safety: StreamFoundationKernelAdapterDiagnosticsSafety;
}
