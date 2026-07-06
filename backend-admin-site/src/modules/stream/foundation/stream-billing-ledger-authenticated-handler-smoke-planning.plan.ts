import {
  STREAM_BILLING_LEDGER_AUTHENTICATED_HANDLER_SMOKE_PLANNING_VERSION,
  type StreamBillingLedgerAuthenticatedHandlerSmokeNextGate,
  type StreamBillingLedgerAuthenticatedHandlerSmokePlannedRequest,
  type StreamBillingLedgerAuthenticatedHandlerSmokePlanningSafety,
} from "./stream-billing-ledger-authenticated-handler-smoke-planning.contracts";

export const streamBillingLedgerAuthenticatedHandlerSmokePlanningSafety: StreamBillingLedgerAuthenticatedHandlerSmokePlanningSafety = {
  sourceWritePerformed: true,
  planningOnly: true,
  authenticatedRuntimeSmokePerformed: false,
  backendRestartAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  rawSecretValuesReturned: false,
};

export const streamBillingLedgerAuthenticatedHandlerSmokePlannedRequest: StreamBillingLedgerAuthenticatedHandlerSmokePlannedRequest = {
  method: "GET",
  routePath: "/api/admin/stream/billing-ledger/read-only-snapshot",
  auth: "admin_token_required",
  expectedPublicNoAuthStatus: 403,
  expectedAuthenticatedStatus: 200,
  responseMustBeReadOnlySnapshot: true,
};

export const streamBillingLedgerAuthenticatedHandlerSmokeNextGate: StreamBillingLedgerAuthenticatedHandlerSmokeNextGate = {
  stage: "BACKEND-STREAM-FOUNDATION-143B",
  requiresExactApproval: true,
  backendRestartAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
};

export const streamBillingLedgerAuthenticatedHandlerSmokePlanning = {
  version: STREAM_BILLING_LEDGER_AUTHENTICATED_HANDLER_SMOKE_PLANNING_VERSION,
  nextStage: streamBillingLedgerAuthenticatedHandlerSmokeNextGate.stage,
  notes: [
    "143A-FIX1 is planning-only recovery after 143A report writer failed.",
    "143B may only read an Admin token from local environment or explicit CLI parameter; it must never print token values.",
    "Authenticated smoke must use GET only and must not write DB, call providers, mutate Wallet, move money, restart backend, touch Admin UI, or touch mobile.",
  ],
} as const;
