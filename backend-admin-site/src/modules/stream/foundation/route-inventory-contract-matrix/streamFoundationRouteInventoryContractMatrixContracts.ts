export const STREAM_FOUNDATION_140T_ROUTE_INVENTORY_CONTRACT_MATRIX_VERSION = "BACKEND-STREAM-FOUNDATION-140T" as const;

export type StreamFoundation140TRouteMethod = "GET" | "POST";
export type StreamFoundation140TRouteAudience = "admin" | "mobile" | "internal";
export type StreamFoundation140TRouteRuntimeStatus =
  | "authenticated_get_passed"
  | "source_only_ready_unmounted"
  | "approval_required_before_mount"
  | "blocked_until_provider_wallet_ledger_ready";

export type StreamFoundation140TRouteSafetyClass =
  | "read_only_diagnostics"
  | "read_only_foundation_preview"
  | "live_write_requires_gate"
  | "shorts_write_requires_gate"
  | "gift_wallet_boundary_requires_gate"
  | "admin_write_requires_gate";

export interface StreamFoundation140TRouteInventoryItem {
  readonly id: string;
  readonly routeId: string;
  readonly title: string;
  readonly audience: StreamFoundation140TRouteAudience;
  readonly method: StreamFoundation140TRouteMethod;
  readonly path: string;
  readonly safetyClass: StreamFoundation140TRouteSafetyClass;
  readonly runtimeStatus: StreamFoundation140TRouteRuntimeStatus;
  readonly requiredScopes: readonly string[];
  readonly allowedNow: boolean;
  readonly mountedNow: boolean;
  readonly sourceOnly: boolean;
  readonly nextStage: string;
  readonly blockedActions: readonly string[];
}

export interface StreamFoundation140TRouteInventoryMatrixSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140T_ROUTE_INVENTORY_CONTRACT_MATRIX_VERSION;
  readonly stage: "route_inventory_contract_matrix_source_only";
  readonly status: "route_inventory_matrix_ready";
  readonly previousPassedStage: "BACKEND-STREAM-FOUNDATION-140R";
  readonly postSmokeHandoffStage: "BACKEND-STREAM-FOUNDATION-140S";
  readonly authenticatedDiagnosticsReady: true;
  readonly routeInventory: readonly StreamFoundation140TRouteInventoryItem[];
  readonly totals: {
    readonly total: number;
    readonly authenticatedGetPassed: number;
    readonly sourceOnlyReadyUnmounted: number;
    readonly approvalRequiredBeforeMount: number;
    readonly providerWalletBlocked: number;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly backendRestart: false;
    readonly runtimeHttpBy140T: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
