import { getStreamFoundationKernelAdapterHealthSnapshot } from "./streamFoundationKernelAdapterHealthSnapshot";
import { STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION } from "./streamFoundationKernelAdapterHealthContracts";

export interface StreamFoundationKernelAdapterHealthSmokeCase {
  readonly caseId: string;
  readonly passed: boolean;
  readonly detail: string;
}

export interface StreamFoundationKernelAdapterHealthSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly cases: readonly StreamFoundationKernelAdapterHealthSmokeCase[];
  readonly passedCases: number;
  readonly failedCases: number;
  readonly runtimeBindingStillBlocked: boolean;
  readonly moneyMovementStillBlocked: boolean;
}

export function getStreamFoundationKernelAdapterHealthSmokeSnapshot(): StreamFoundationKernelAdapterHealthSmokeSnapshot {
  const snapshot = getStreamFoundationKernelAdapterHealthSnapshot({
    requestedBy: "admin_snapshot",
    routeMountApproved: false,
    repositoryBound: false,
    providerConfigured: false,
    walletLedgerBound: false,
    paymentAuthorizationBound: false,
    monthlyPayoutBatchBound: false,
    mediaRealtimeBound: false,
    adminPermissionBound: false,
  });

  const cases: StreamFoundationKernelAdapterHealthSmokeCase[] = [
    { caseId: "no_stream_index_patch", passed: snapshot.streamIndexPatchIncluded === false, detail: "src_modules_stream_index_ts_not_included" },
    { caseId: "all_server_side_only", passed: snapshot.allAdaptersServerSideOnly, detail: "adapters_are_server_side_only" },
    { caseId: "mobile_direct_access_blocked", passed: snapshot.allMobileDirectAccessBlocked, detail: "mobile_cannot_call_adapters_directly" },
    { caseId: "runtime_binding_blocked", passed: snapshot.runtimeBindableAdaptersNow === 0, detail: "runtime_adapter_binding_requires_later_approval" },
    { caseId: "provider_ready_zero", passed: snapshot.providerReadyAdaptersNow === 0, detail: "provider_not_marked_ready_without_real_config" },
    { caseId: "wallet_ready_zero", passed: snapshot.walletReadyAdaptersNow === 0, detail: "wallet_ledger_not_marked_ready_without_live_binding" },
    { caseId: "money_movement_blocked", passed: snapshot.moneyMovementReadyNow === false, detail: "no_fake_payment_gift_earning_payout_success" },
    { caseId: "raw_secrets_blocked", passed: snapshot.safety.rawSecretsReturned === false, detail: "raw_secrets_never_returned" },
  ];

  const passedCases = cases.filter((item) => item.passed).length;
  return {
    version: STREAM_FOUNDATION_138G_KERNEL_ADAPTER_HEALTH_VERSION,
    streamIndexPatchIncluded: false,
    cases,
    passedCases,
    failedCases: cases.length - passedCases,
    runtimeBindingStillBlocked: snapshot.runtimeBindableAdaptersNow === 0,
    moneyMovementStillBlocked: snapshot.moneyMovementReadyNow === false,
  };
}
