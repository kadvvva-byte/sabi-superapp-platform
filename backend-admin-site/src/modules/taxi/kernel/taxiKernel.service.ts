import { getTaxiFoundationSnapshot } from '../foundation';
import {
  TAXI_KERNEL_BOUNDARY_REASONS,
  TAXI_KERNEL_BRIDGE_VERSION,
  TAXI_KERNEL_MOBILE_UI_SOURCE_STAGE,
  TAXI_KERNEL_OPERATION_DESCRIPTORS,
} from './taxiKernel.constants';
import type {
  TaxiKernelBridgeSnapshot,
  TaxiKernelBoundaryReason,
  TaxiKernelEvent,
  TaxiKernelEventName,
  TaxiKernelOperation,
  TaxiKernelOperationDescriptor,
  TaxiKernelUiCallDecision,
  TaxiKernelUiCallInput,
} from './taxiKernel.types';

export function getTaxiKernelBridgeSnapshot(): TaxiKernelBridgeSnapshot {
  return {
    version: TAXI_KERNEL_BRIDGE_VERSION,
    module: 'taxi',
    status: 'kernel_bridge_safe_disabled_ready',
    mobileUiSourceStage: TAXI_KERNEL_MOBILE_UI_SOURCE_STAGE,
    foundation: getTaxiFoundationSnapshot(),
    operationDescriptors: TAXI_KERNEL_OPERATION_DESCRIPTORS,
    boundaryReasons: TAXI_KERNEL_BOUNDARY_REASONS,
    directMobileProviderImportsAllowed: false,
    directMobileBackendRuntimeCallsAllowed: false,
    directMobileWalletMutationAllowed: false,
    directMobilePaymentOrPayoutAllowed: false,
    runtimeEnabledNow: false,
    providerEnabledNow: false,
    paymentEnabledNow: false,
    payoutEnabledNow: false,
  };
}

export function getTaxiKernelOperationDescriptor(operation: TaxiKernelOperation): TaxiKernelOperationDescriptor {
  const descriptor = TAXI_KERNEL_OPERATION_DESCRIPTORS.find((item) => item.operation === operation);
  if (!descriptor) {
    return {
      operation,
      consumer: 'mobile_ui',
      contractStatus: 'exact_approval_required',
      mapsToCapability: 'kernel_lifecycle',
      clientPreviewAllowed: false,
      clientAppMustUseKernel: true,
      clientMayCallProviderDirectly: false,
      clientMayMutateWalletDirectly: false,
      clientMayExecutePaymentDirectly: false,
      backendRuntimeMountedNow: false,
      fakeSuccessBlocked: true,
      exactApprovalRequiredForRuntime: true,
      description: 'Unknown Taxi operation is locked until an explicit kernel contract is added.',
    };
  }
  return descriptor;
}

export function evaluateTaxiKernelUiCall(input: TaxiKernelUiCallInput): TaxiKernelUiCallDecision {
  const descriptor = getTaxiKernelOperationDescriptor(input.operation);
  const blockedReasons: TaxiKernelBoundaryReason[] = [];

  if (input.consumer !== 'mobile_ui') {
    blockedReasons.push('mobile_ui_must_use_kernel_facade');
  }
  if (input.wantsProviderRuntime) {
    blockedReasons.push('direct_provider_call_blocked');
  }
  if (input.wantsPaymentOrPayoutRuntime) {
    blockedReasons.push('direct_payment_or_payout_blocked');
  }
  if (input.wantsWalletMutation) {
    blockedReasons.push('direct_wallet_mutation_blocked');
  }
  if (input.wantsLocationRuntime) {
    blockedReasons.push('direct_location_runtime_blocked');
  }
  if (descriptor.exactApprovalRequiredForRuntime && !input.hasExactApproval) {
    blockedReasons.push('exact_approval_required');
  }
  if (!descriptor.backendRuntimeMountedNow) {
    blockedReasons.push('backend_runtime_not_mounted');
  }

  return {
    operation: input.operation,
    allowedForPreview: descriptor.clientPreviewAllowed && input.consumer === 'mobile_ui',
    allowedForRuntime: false,
    mustUseKernelFacade: true,
    blockedReasons: dedupe(blockedReasons),
    requiredCapabilityStatus: descriptor.contractStatus,
    fakeSuccessBlocked: true,
    exactApprovalRequiredForRuntime: descriptor.exactApprovalRequiredForRuntime,
  };
}

export function createTaxiKernelEvent(
  name: TaxiKernelEventName,
  operation: TaxiKernelOperation,
  payload: Readonly<Record<string, string | number | boolean>> = {},
): TaxiKernelEvent {
  return {
    name,
    version: TAXI_KERNEL_BRIDGE_VERSION,
    operation,
    safeDisabled: true,
    providerRuntimeEnabled: false,
    paymentRuntimeEnabled: false,
    payoutRuntimeEnabled: false,
    walletMutationEnabled: false,
    fakeSuccessBlocked: true,
    payload,
  };
}

function dedupe(items: readonly TaxiKernelBoundaryReason[]): readonly TaxiKernelBoundaryReason[] {
  return Array.from(new Set(items));
}
