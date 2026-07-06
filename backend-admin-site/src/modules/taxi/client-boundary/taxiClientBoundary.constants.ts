import type { TaxiClientIntentDescriptor, TaxiClientLifecycleRule } from './taxiClientBoundary.types';

export const TAXI_CLIENT_BOUNDARY_VERSION = 'TAXI-BACKEND-FOUNDATION-001R' as const;

export const TAXI_CLIENT_LIFECYCLE_RULES: readonly TaxiClientLifecycleRule[] = [
  'foundation_owns_contracts_not_client_ui',
  'client_receives_kernel_safe_summary_only',
  'raw_evidence_admin_foundation_only',
  'admin_config_controls_tariffs_and_commission',
  'runtime_requires_exact_owner_approval',
];

export const TAXI_CLIENT_INTENT_DESCRIPTORS: readonly TaxiClientIntentDescriptor[] = [
  descriptor('open_taxi_client_preview', 'client_taxi_entry', 'open_taxi_session', true, false, 'Opening a client Taxi surface is only a safe status preview until backend runtime is approved.'),
  descriptor('close_taxi_client_preview', 'client_taxi_entry', 'close_taxi_session', true, false, 'Closing a client Taxi surface must not leave Taxi runtime alive in background.'),
  descriptor('preview_route_or_quote', 'client_route_preview', 'route_preview', true, true, 'Route and quote preview are safe summaries only; truth comes from backend/provider state later.'),
  descriptor('preview_driver_access', 'client_driver_access_preview', 'driver_dispatch_access_preview', true, true, 'Driver access is shown only as Admin approval, balance, zone and provider readiness status.'),
  descriptor('preview_admin_review_status', 'client_admin_review_status', 'sabi_ai_fairness_signal_preview', true, true, 'Admin review status is redacted and never exposes raw evidence to client applications.'),
  descriptor('preview_fairness_or_appeal_status', 'client_safety_status', 'appeal_status_preview', true, true, 'Complaint, cancellation, appeal, cooldown and block statuses are preview-only until Admin/Sabi AI decision is locked.'),
  descriptor('preview_history_or_receipt_status', 'client_history_status', 'quote_preview', true, true, 'History, receipt, dispute and refund status require verified backend ledger state; client cannot create them.'),
  descriptor('preview_league_or_reward_status', 'client_league_status', 'country_league_snapshot', true, true, 'League points, stars, prizes and reward eligibility require verified backend ledger and Admin review.'),
];

function descriptor(
  intent: TaxiClientIntentDescriptor['intent'],
  surface: TaxiClientIntentDescriptor['surface'],
  kernelOperation: TaxiClientIntentDescriptor['kernelOperation'],
  previewAllowed: boolean,
  requiresBackendStateForTruth: boolean,
  description: string,
): TaxiClientIntentDescriptor {
  return {
    intent,
    surface,
    kernelOperation,
    previewAllowed,
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
    requiresBackendStateForTruth,
    description,
  };
}
