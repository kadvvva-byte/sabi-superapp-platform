import type { TaxiCountryCode, TaxiParticipantRole } from '../foundation';
import type {
  TaxiKernelBoundaryReason,
  TaxiKernelBridgeSnapshot,
  TaxiKernelOperation,
  TaxiKernelUiCallDecision,
} from '../kernel';

export type TaxiClientBoundaryVersion = 'TAXI-BACKEND-FOUNDATION-001R';

export type TaxiClientSurface =
  | 'client_taxi_entry'
  | 'client_route_preview'
  | 'client_quote_preview'
  | 'client_driver_access_preview'
  | 'client_safety_status'
  | 'client_history_status'
  | 'client_league_status'
  | 'client_admin_review_status';

export type TaxiClientIntent =
  | 'open_taxi_client_preview'
  | 'close_taxi_client_preview'
  | 'preview_route_or_quote'
  | 'preview_driver_access'
  | 'preview_admin_review_status'
  | 'preview_fairness_or_appeal_status'
  | 'preview_history_or_receipt_status'
  | 'preview_league_or_reward_status';

export type TaxiClientLifecycleRule =
  | 'foundation_owns_contracts_not_client_ui'
  | 'client_receives_kernel_safe_summary_only'
  | 'raw_evidence_admin_foundation_only'
  | 'admin_config_controls_tariffs_and_commission'
  | 'runtime_requires_exact_owner_approval';

export interface TaxiClientIntentDescriptor {
  readonly intent: TaxiClientIntent;
  readonly surface: TaxiClientSurface;
  readonly kernelOperation: TaxiKernelOperation;
  readonly previewAllowed: boolean;
  readonly runtimeAllowedNow: false;
  readonly clientMustUseKernelBoundary: true;
  readonly foundationOwnsImplementation: true;
  readonly clientUiImplementationInFoundationAllowed: false;
  readonly directBackendRuntimeCallAllowed: false;
  readonly directProviderCallAllowed: false;
  readonly directWalletMutationAllowed: false;
  readonly directPaymentOrPayoutAllowed: false;
  readonly backgroundRuntimeAllowedNow: false;
  readonly fakeSuccessBlocked: true;
  readonly requiresBackendStateForTruth: boolean;
  readonly description: string;
}

export interface TaxiClientBoundarySnapshot {
  readonly version: TaxiClientBoundaryVersion;
  readonly module: 'taxi';
  readonly status: 'client_kernel_boundary_safe_disabled_ready';
  readonly kernelBridge: TaxiKernelBridgeSnapshot;
  readonly lifecycleRules: readonly TaxiClientLifecycleRule[];
  readonly intentDescriptors: readonly TaxiClientIntentDescriptor[];
  readonly foundationOwnsTaxiContracts: true;
  readonly noMobileUiImplementationFilesInFoundation: true;
  readonly clientReceivesKernelSafeStatusOnly: true;
  readonly rawEvidenceAdminFoundationOnly: true;
  readonly adminControlsTariffs: true;
  readonly adminControlsCommissionPercent: true;
  readonly driverParkApplicationRequiresAdminApproval: true;
  readonly noDirectProviderImport: true;
  readonly noDirectBackendRuntimeCall: true;
  readonly noDirectWalletMutation: true;
  readonly noDirectPaymentOrPayout: true;
  readonly noAlwaysOnTaxiBackgroundRuntime: true;
  readonly fakeLocationSuccessBlocked: true;
  readonly fakeDriverAssignmentBlocked: true;
  readonly fakePaymentSuccessBlocked: true;
  readonly fakeTripCompletionBlocked: true;
  readonly fakeTopUpSuccessBlocked: true;
  readonly fakeStarsOrRewardBlocked: true;
}

export interface TaxiClientBoundaryCallInput {
  readonly intent: TaxiClientIntent;
  readonly surface: TaxiClientSurface;
  readonly role?: TaxiParticipantRole;
  readonly countryCode?: TaxiCountryCode;
  readonly wantsBackendRuntime: boolean;
  readonly wantsProviderRuntime: boolean;
  readonly wantsPaymentOrPayoutRuntime: boolean;
  readonly wantsWalletMutation: boolean;
  readonly wantsLocationRuntime: boolean;
  readonly wantsBackgroundRuntime: boolean;
  readonly hasExactApproval: boolean;
}

export interface TaxiClientBoundaryCallDecision {
  readonly intent: TaxiClientIntent;
  readonly surface: TaxiClientSurface;
  readonly kernelOperation: TaxiKernelOperation;
  readonly previewAllowed: boolean;
  readonly runtimeAllowedNow: false;
  readonly backgroundRuntimeAllowedNow: false;
  readonly clientMustUseKernelBoundary: true;
  readonly blockedReasons: readonly (TaxiKernelBoundaryReason | 'direct_backend_runtime_blocked' | 'always_on_background_runtime_blocked' | 'client_ui_implementation_must_not_live_in_foundation')[];
  readonly kernelDecision: TaxiKernelUiCallDecision;
  readonly fakeSuccessBlocked: true;
}
