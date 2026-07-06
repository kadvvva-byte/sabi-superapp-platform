import type {
  TaxiCountryCode,
  TaxiFoundationSnapshot,
  TaxiParticipantRole,
  TaxiRuntimeCapability,
  TaxiRuntimeCapabilityStatus,
} from '../foundation';

export type TaxiKernelBridgeVersion = 'TAXI-BACKEND-FOUNDATION-001B';

export type TaxiKernelConsumer = 'mobile_ui' | 'admin_ui' | 'backend_foundation' | 'provider_runtime';

export type TaxiKernelContractStatus =
  | 'ui_only'
  | 'safe_disabled'
  | 'provider_required'
  | 'admin_review_required'
  | 'exact_approval_required';

export type TaxiKernelOperation =
  | 'open_taxi_session'
  | 'close_taxi_session'
  | 'quote_preview'
  | 'route_preview'
  | 'traffic_speed_radar_preview'
  | 'driver_dispatch_access_preview'
  | 'driver_balance_top_up_request'
  | 'commission_preview'
  | 'country_league_snapshot'
  | 'daily_complaint_policy_preview'
  | 'rider_driver_star_review_preview'
  | 'sabi_ai_fairness_signal_preview'
  | 'reward_freeze_preview'
  | 'appeal_status_preview';

export type TaxiKernelEventName =
  | 'taxi.ui.session.opened'
  | 'taxi.ui.session.closed'
  | 'taxi.ui.preview.requested'
  | 'taxi.driver.balance.gate.previewed'
  | 'taxi.league.fairness.previewed'
  | 'taxi.runtime.blocked_until_exact_approval';

export type TaxiKernelBoundaryReason =
  | 'mobile_ui_must_use_kernel_facade'
  | 'direct_provider_call_blocked'
  | 'direct_payment_or_payout_blocked'
  | 'direct_location_runtime_blocked'
  | 'direct_dispatch_runtime_blocked'
  | 'direct_wallet_mutation_blocked'
  | 'backend_runtime_not_mounted'
  | 'exact_approval_required';

export interface TaxiKernelOperationDescriptor {
  readonly operation: TaxiKernelOperation;
  readonly consumer: TaxiKernelConsumer;
  readonly contractStatus: TaxiKernelContractStatus;
  readonly mapsToCapability: TaxiRuntimeCapability | 'kernel_lifecycle' | 'country_league' | 'fairness_appeal';
  readonly clientPreviewAllowed: boolean;
  readonly clientAppMustUseKernel: true;
  readonly clientMayCallProviderDirectly: false;
  readonly clientMayMutateWalletDirectly: false;
  readonly clientMayExecutePaymentDirectly: false;
  readonly backendRuntimeMountedNow: false;
  readonly fakeSuccessBlocked: true;
  readonly exactApprovalRequiredForRuntime: boolean;
  readonly description: string;
}

export interface TaxiKernelBridgeSnapshot {
  readonly version: TaxiKernelBridgeVersion;
  readonly module: 'taxi';
  readonly status: 'kernel_bridge_safe_disabled_ready';
  readonly mobileUiSourceStage: 'TAXI-MOBILE-UI-001X';
  readonly foundation: TaxiFoundationSnapshot;
  readonly operationDescriptors: readonly TaxiKernelOperationDescriptor[];
  readonly boundaryReasons: readonly TaxiKernelBoundaryReason[];
  readonly directMobileProviderImportsAllowed: false;
  readonly directMobileBackendRuntimeCallsAllowed: false;
  readonly directMobileWalletMutationAllowed: false;
  readonly directMobilePaymentOrPayoutAllowed: false;
  readonly runtimeEnabledNow: false;
  readonly providerEnabledNow: false;
  readonly paymentEnabledNow: false;
  readonly payoutEnabledNow: false;
}

export interface TaxiKernelUiCallInput {
  readonly operation: TaxiKernelOperation;
  readonly consumer: TaxiKernelConsumer;
  readonly role?: TaxiParticipantRole;
  readonly countryCode?: TaxiCountryCode;
  readonly wantsProviderRuntime: boolean;
  readonly wantsPaymentOrPayoutRuntime: boolean;
  readonly wantsWalletMutation: boolean;
  readonly wantsLocationRuntime: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiKernelUiCallDecision {
  readonly operation: TaxiKernelOperation;
  readonly allowedForPreview: boolean;
  readonly allowedForRuntime: false;
  readonly mustUseKernelFacade: true;
  readonly blockedReasons: readonly TaxiKernelBoundaryReason[];
  readonly requiredCapabilityStatus: TaxiRuntimeCapabilityStatus | TaxiKernelContractStatus;
  readonly fakeSuccessBlocked: true;
  readonly exactApprovalRequiredForRuntime: boolean;
}

export interface TaxiKernelEvent {
  readonly name: TaxiKernelEventName;
  readonly version: TaxiKernelBridgeVersion;
  readonly operation: TaxiKernelOperation;
  readonly role?: TaxiParticipantRole;
  readonly countryCode?: TaxiCountryCode;
  readonly safeDisabled: true;
  readonly providerRuntimeEnabled: false;
  readonly paymentRuntimeEnabled: false;
  readonly payoutRuntimeEnabled: false;
  readonly walletMutationEnabled: false;
  readonly fakeSuccessBlocked: true;
  readonly payload: Readonly<Record<string, string | number | boolean>>;
}
