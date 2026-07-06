export const STREAM_FOUNDATION_140W_WRITE_ROUTE_APPROVAL_GATE_VERSION = "BACKEND-STREAM-FOUNDATION-140W" as const;

export type StreamFoundation140WWriteRouteKind =
  | "live_session_write"
  | "shorts_publish_write"
  | "moderation_write"
  | "gift_wallet_boundary_write"
  | "monthly_payout_boundary_write";

export type StreamFoundation140WApprovalStatus =
  | "blocked_requires_owner_approval"
  | "blocked_until_provider_wallet_ledger_ready"
  | "blocked_until_moderation_policy_ready"
  | "source_only_gate_ready";

export interface StreamFoundation140WWriteRouteApprovalItem {
  readonly id: string;
  readonly routeId: string;
  readonly title: string;
  readonly kind: StreamFoundation140WWriteRouteKind;
  readonly method: "POST";
  readonly plannedPath: string;
  readonly approvalStatus: StreamFoundation140WApprovalStatus;
  readonly mountedNow: false;
  readonly runtimeWriteAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly paymentAuthorizationAllowedNow: false;
  readonly monthlyPayoutAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly fakeSuccessAllowed: false;
  readonly requiredBeforeRuntimeMount: readonly string[];
  readonly blockedActions: readonly string[];
  readonly nextRequiredApproval: string;
}

export interface StreamFoundation140WWriteRouteApprovalGateSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140W_WRITE_ROUTE_APPROVAL_GATE_VERSION;
  readonly stage: "write_route_approval_gate_source_only";
  readonly status: "write_routes_blocked_until_separate_exact_approval";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-140V";
  readonly readOnlyRoutesVerified: true;
  readonly writeRoutes: readonly StreamFoundation140WWriteRouteApprovalItem[];
  readonly totals: {
    readonly totalWriteRoutes: number;
    readonly mountedNow: 0;
    readonly runtimeWriteAllowedNow: 0;
    readonly databaseWriteAllowedNow: 0;
    readonly providerCallAllowedNow: 0;
    readonly walletMutationAllowedNow: 0;
    readonly paymentAuthorizationAllowedNow: 0;
    readonly monthlyPayoutAllowedNow: 0;
    readonly moneyMovementAllowedNow: 0;
    readonly fakeSuccessAllowed: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly backendRestart: false;
    readonly runtimeHttpBy140W: false;
    readonly postPutPatchDeleteBy140W: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
