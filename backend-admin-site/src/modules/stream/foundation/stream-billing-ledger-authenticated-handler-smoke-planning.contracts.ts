export const STREAM_BILLING_LEDGER_AUTHENTICATED_HANDLER_SMOKE_PLANNING_VERSION =
  "BACKEND-STREAM-FOUNDATION-143A-FIX1" as const;

export type StreamBillingLedgerAuthenticatedHandlerSmokePlanningSafety = {
  readonly sourceWritePerformed: boolean;
  readonly planningOnly: true;
  readonly authenticatedRuntimeSmokePerformed: false;
  readonly backendRestartAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly rawSecretValuesReturned: false;
};

export type StreamBillingLedgerAuthenticatedHandlerSmokePlannedRequest = {
  readonly method: "GET";
  readonly routePath: "/api/admin/stream/billing-ledger/read-only-snapshot";
  readonly auth: "admin_token_required";
  readonly expectedPublicNoAuthStatus: 401 | 403;
  readonly expectedAuthenticatedStatus: 200;
  readonly responseMustBeReadOnlySnapshot: true;
};

export type StreamBillingLedgerAuthenticatedHandlerSmokeNextGate = {
  readonly stage: "BACKEND-STREAM-FOUNDATION-143B";
  readonly requiresExactApproval: true;
  readonly backendRestartAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
};
