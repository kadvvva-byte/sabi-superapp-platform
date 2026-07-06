export const STREAM_FOUNDATION_140U_READ_ONLY_ROUTE_HANDLER_ENVELOPE_BATCH_VERSION = "BACKEND-STREAM-FOUNDATION-140U" as const;

export type StreamFoundation140UReadOnlyAudience = "admin" | "mobile";
export type StreamFoundation140UReadOnlyRuntimeStatus = "source_only_unmounted" | "authenticated_diagnostics_live";
export type StreamFoundation140UReadOnlyDataStatus = "contract_ready_no_data_store" | "diagnostics_live_ready";

export interface StreamFoundation140UReadOnlyEnvelopeSpec {
  readonly envelopeId: string;
  readonly routeId: string;
  readonly title: string;
  readonly audience: StreamFoundation140UReadOnlyAudience;
  readonly method: "GET";
  readonly plannedPath: string;
  readonly runtimeStatus: StreamFoundation140UReadOnlyRuntimeStatus;
  readonly dataStatus: StreamFoundation140UReadOnlyDataStatus;
  readonly mountedNow: boolean;
  readonly returnsFakeData: false;
  readonly requiresDatabaseReadNow: false;
  readonly requiresProviderCallNow: false;
  readonly requiresWalletReadNow: false;
  readonly allowedBeforeMount: boolean;
  readonly statusCodeIfMountedWithoutData: 200 | 503;
  readonly safeCode: string;
  readonly requiredScopes: readonly string[];
}

export interface StreamFoundation140UReadOnlyEnvelopeBatchSnapshot {
  readonly version: typeof STREAM_FOUNDATION_140U_READ_ONLY_ROUTE_HANDLER_ENVELOPE_BATCH_VERSION;
  readonly stage: "read_only_route_handler_envelope_batch_source_only";
  readonly status: "read_only_envelope_batch_ready_unmounted";
  readonly previousStage: "BACKEND-STREAM-FOUNDATION-140T";
  readonly diagnosticsRoutesAlreadyLive: readonly ["readiness", "preview"];
  readonly envelopes: readonly StreamFoundation140UReadOnlyEnvelopeSpec[];
  readonly totals: {
    readonly total: number;
    readonly diagnosticsLive: number;
    readonly sourceOnlyUnmounted: number;
    readonly fakeDataRoutes: 0;
    readonly routesRequiringDatabaseNow: 0;
    readonly routesRequiringProviderNow: 0;
    readonly routesRequiringWalletNow: 0;
  };
  readonly safety: {
    readonly sourceOnly: true;
    readonly appTsChange: false;
    readonly serverTsChange: false;
    readonly streamIndexChange: false;
    readonly routeMountNow: false;
    readonly backendRestart: false;
    readonly runtimeHttpBy140U: false;
    readonly databaseWrite: false;
    readonly providerCall: false;
    readonly walletMutation: false;
    readonly paymentAuthorization: false;
    readonly monthlyPayout: false;
    readonly moneyMovement: false;
    readonly fakeSuccess: false;
  };
}
