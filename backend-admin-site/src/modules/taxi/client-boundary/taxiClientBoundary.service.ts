import { evaluateTaxiKernelUiCall, getTaxiKernelBridgeSnapshot } from '../kernel';
import { TAXI_CLIENT_BOUNDARY_VERSION, TAXI_CLIENT_INTENT_DESCRIPTORS, TAXI_CLIENT_LIFECYCLE_RULES } from './taxiClientBoundary.constants';
import type {
  TaxiClientBoundaryCallDecision,
  TaxiClientBoundaryCallInput,
  TaxiClientBoundarySnapshot,
  TaxiClientIntent,
  TaxiClientIntentDescriptor,
} from './taxiClientBoundary.types';

export function getTaxiClientBoundarySnapshot(): TaxiClientBoundarySnapshot {
  return {
    version: TAXI_CLIENT_BOUNDARY_VERSION,
    module: 'taxi',
    status: 'client_kernel_boundary_safe_disabled_ready',
    kernelBridge: getTaxiKernelBridgeSnapshot(),
    lifecycleRules: TAXI_CLIENT_LIFECYCLE_RULES,
    intentDescriptors: TAXI_CLIENT_INTENT_DESCRIPTORS,
    foundationOwnsTaxiContracts: true,
    noMobileUiImplementationFilesInFoundation: true,
    clientReceivesKernelSafeStatusOnly: true,
    rawEvidenceAdminFoundationOnly: true,
    adminControlsTariffs: true,
    adminControlsCommissionPercent: true,
    driverParkApplicationRequiresAdminApproval: true,
    noDirectProviderImport: true,
    noDirectBackendRuntimeCall: true,
    noDirectWalletMutation: true,
    noDirectPaymentOrPayout: true,
    noAlwaysOnTaxiBackgroundRuntime: true,
    fakeLocationSuccessBlocked: true,
    fakeDriverAssignmentBlocked: true,
    fakePaymentSuccessBlocked: true,
    fakeTripCompletionBlocked: true,
    fakeTopUpSuccessBlocked: true,
    fakeStarsOrRewardBlocked: true,
  };
}

export function getTaxiClientIntentDescriptor(intent: TaxiClientIntent): TaxiClientIntentDescriptor {
  const descriptor = TAXI_CLIENT_INTENT_DESCRIPTORS.find((item) => item.intent === intent);
  if (!descriptor) {
    return {
      intent,
      surface: 'client_taxi_entry',
      kernelOperation: 'open_taxi_session',
      previewAllowed: false,
      runtimeAllowedNow: false,
      clientMustUseKernelBoundary: true,
      foundationOwnsImplementation: true,
      clientUiImplementationInFoundationAllowed: false,
      directBackendRuntimeCallAllowed: false,
      directProviderCallAllowed: false,
      directWalletMutationAllowed: false,
      directPaymentOrPayoutAllowed: false,
      backgroundRuntimeAllowedNow: false,
      fakeSuccessBlocked: true,
      requiresBackendStateForTruth: true,
      description: 'Unknown Taxi client intent is locked until an explicit foundation/Admin contract is added.',
    };
  }
  return descriptor;
}

export function evaluateTaxiClientBoundaryCall(input: TaxiClientBoundaryCallInput): TaxiClientBoundaryCallDecision {
  const descriptor = getTaxiClientIntentDescriptor(input.intent);
  const kernelDecision = evaluateTaxiKernelUiCall({
    operation: descriptor.kernelOperation,
    consumer: 'mobile_ui',
    role: input.role,
    countryCode: input.countryCode,
    wantsProviderRuntime: input.wantsProviderRuntime || input.wantsBackendRuntime,
    wantsPaymentOrPayoutRuntime: input.wantsPaymentOrPayoutRuntime,
    wantsWalletMutation: input.wantsWalletMutation,
    wantsLocationRuntime: input.wantsLocationRuntime,
    hasExactApproval: input.hasExactApproval,
  });
  const blockedReasons: TaxiClientBoundaryCallDecision['blockedReasons'] = [
    ...kernelDecision.blockedReasons,
    'client_ui_implementation_must_not_live_in_foundation',
    ...(input.wantsBackendRuntime ? ['direct_backend_runtime_blocked' as const] : []),
    ...(input.wantsBackgroundRuntime ? ['always_on_background_runtime_blocked' as const] : []),
  ];

  return {
    intent: input.intent,
    surface: input.surface,
    kernelOperation: descriptor.kernelOperation,
    previewAllowed: descriptor.previewAllowed && kernelDecision.allowedForPreview,
    runtimeAllowedNow: false,
    backgroundRuntimeAllowedNow: false,
    clientMustUseKernelBoundary: true,
    blockedReasons: Array.from(new Set(blockedReasons)),
    kernelDecision,
    fakeSuccessBlocked: true,
  };
}
