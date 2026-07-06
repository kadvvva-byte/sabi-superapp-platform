import { Router, type RequestHandler } from "express";

import {
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
  STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
  type StreamBillingLedgerAdminProviderReadinessSnapshotInput,
} from "./stream-billing-ledger-admin-provider-readiness.contracts";
import {
  assertStreamBillingLedgerAdminProviderReadinessHasNoLiveActivation,
  buildStreamBillingLedgerAdminProviderReadinessSnapshot,
  getStreamBillingLedgerAdminProviderReadinessSafeDisabledReason,
} from "./stream-billing-ledger-admin-provider-readiness.service";

export type StreamBillingLedgerAdminProviderReadinessRouteRuntimeSignals = Readonly<{
  runtimeRouteAuthenticated?: boolean;
  runtimeDuplicateRouteBlocked?: boolean;
  normalizedSecretScanSafe?: boolean;
  expectedLedgerTablesVisible?: boolean;
  metadataRouteMountedNow?: boolean | null;
}>;

export type StreamBillingLedgerAdminProviderReadinessRouteSourceDraftOptions = Readonly<{
  requireAdmin: RequestHandler;
  env?: Readonly<Record<string, string | undefined>>;
  runtimeSignals?: StreamBillingLedgerAdminProviderReadinessRouteRuntimeSignals;
  generatedAtUtc?: string;
}>;

const defaultRuntimeSignals: Required<StreamBillingLedgerAdminProviderReadinessRouteRuntimeSignals> = {
  runtimeRouteAuthenticated: true,
  runtimeDuplicateRouteBlocked: true,
  normalizedSecretScanSafe: true,
  expectedLedgerTablesVisible: true,
  metadataRouteMountedNow: null,
};

export function createStreamBillingLedgerAdminProviderReadinessRouteSourceDraft(
  options: StreamBillingLedgerAdminProviderReadinessRouteSourceDraftOptions,
): Router {
  const router = Router();

  const handler: RequestHandler = (_req, res) => {
    const runtimeSignals = {
      ...defaultRuntimeSignals,
      ...(options.runtimeSignals ?? {}),
    };

    const snapshotInput: StreamBillingLedgerAdminProviderReadinessSnapshotInput = {
      generatedAtUtc: options.generatedAtUtc ?? new Date().toISOString(),
      env: options.env ?? {},
      runtimeRouteAuthenticated: runtimeSignals.runtimeRouteAuthenticated,
      runtimeDuplicateRouteBlocked: runtimeSignals.runtimeDuplicateRouteBlocked,
      normalizedSecretScanSafe: runtimeSignals.normalizedSecretScanSafe,
      expectedLedgerTablesVisible: runtimeSignals.expectedLedgerTablesVisible,
      metadataRouteMountedNow: runtimeSignals.metadataRouteMountedNow,
    };

    const snapshot = buildStreamBillingLedgerAdminProviderReadinessSnapshot(snapshotInput);
    assertStreamBillingLedgerAdminProviderReadinessHasNoLiveActivation(snapshot);

    res.json({
      ok: true,
      version: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_VERSION,
      sourceOnly: true,
      routeSourceDraftCreated: true,
      providerStatus: "provider_not_configured",
      runtimeEnabled: false,
      protectedApiFetchRequired: false,
      providerCallPerformed: false,
      dbWritePerformed: false,
      walletMutationPerformed: false,
      simulatedSuccessAllowed: false,
      backendSourceRouteMountedBy146J: runtimeSignals.metadataRouteMountedNow === true,
      routeMountedNow: false,
      routeMountAllowedNow: false,
      backendRestartAllowedNow: false,
      providerCallAllowedNow: false,
      walletMutationAllowedNow: false,
      moneyMovementAllowedNow: false,
      databaseWriteAllowedNow: false,
      adminUiTouchAllowedNow: false,
      mobileTouchAllowedNow: false,
      liveBillingEnabledNow: false,
      fakeSuccessAllowed: false,
      rawSecretReturnAllowed: false,
      rawPurchaseTokenReturnAllowed: false,
      adminLocalRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
      publicRouteDraft: STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_PUBLIC_ROUTE_DRAFT,
      safeDisabledReason: getStreamBillingLedgerAdminProviderReadinessSafeDisabledReason(snapshot),
      snapshot,
    });
  };

  router.get(
    STREAM_BILLING_LEDGER_ADMIN_PROVIDER_READINESS_ADMIN_LOCAL_ROUTE_DRAFT,
    options.requireAdmin,
    handler,
  );

  return router;
}
