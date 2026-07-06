import { getStreamFoundationKernelAdapterRegistryEntries } from "../kernel-adapter-registry";
import { getStreamFoundationKernelAdapterBindingGateDecision, getStreamFoundationKernelAdapterBindingGateSnapshot } from "./streamFoundationKernelAdapterBindingGate";
import { STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION } from "./streamFoundationKernelAdapterBindingGateContracts";

export interface StreamFoundationKernelAdapterBindingGateSmokeCase {
  readonly caseId: string;
  readonly passed: boolean;
  readonly status: string;
  readonly blockedRuntime: boolean;
}

export interface StreamFoundationKernelAdapterBindingGateSmokeSnapshot {
  readonly version: typeof STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly cases: readonly StreamFoundationKernelAdapterBindingGateSmokeCase[];
  readonly passedCases: number;
  readonly failedCases: number;
  readonly runtimeBindingStillBlocked: boolean;
}

export function getStreamFoundationKernelAdapterBindingGateSmokeSnapshot(): StreamFoundationKernelAdapterBindingGateSmokeSnapshot {
  const cases = getStreamFoundationKernelAdapterRegistryEntries().map((entry): StreamFoundationKernelAdapterBindingGateSmokeCase => {
    const decision = getStreamFoundationKernelAdapterBindingGateDecision({
      adapterKind: entry.adapterKind,
      requestedBy: "kernel_queue_consumer",
      requestedRuntimeBinding: true,
      routeMountApproved: false,
      repositoryBound: false,
      providerConfigured: false,
      walletLedgerBound: false,
      paymentAuthorizationBound: false,
      monthlyPayoutBatchBound: false,
      mediaRealtimeBound: false,
      adminPermissionBound: false,
    });
    return {
      caseId: `runtime_binding_blocked_${entry.adapterKind}`,
      passed: decision.safeToBindRuntimeNow === false && decision.status !== "contract_binding_allowed",
      status: decision.status,
      blockedRuntime: decision.safeToBindRuntimeNow === false,
    };
  });
  const snapshot = getStreamFoundationKernelAdapterBindingGateSnapshot();
  const passedCases = cases.filter((item) => item.passed).length;
  return {
    version: STREAM_FOUNDATION_138F_KERNEL_ADAPTER_BINDING_GATE_VERSION,
    streamIndexPatchIncluded: false,
    cases,
    passedCases,
    failedCases: cases.length - passedCases,
    runtimeBindingStillBlocked: snapshot.runtimeBindableAdaptersNow === 0,
  };
}
