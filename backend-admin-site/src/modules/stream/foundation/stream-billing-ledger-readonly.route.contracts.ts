export const STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_VERSION = "BACKEND-STREAM-FOUNDATION-142D" as const;

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH =
  "/stream/billing-ledger/read-only-snapshot" as const;

export type StreamBillingLedgerReadOnlyRouteSourceSafety = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_VERSION;
  sourceOnly: true;
  routeSourceDraftCreated: true;
  routeMountedNow: false;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  databaseWriteAllowedNow: false;
  fakeSuccessAllowed: false;
  rawPurchaseTokenReturnAllowed: false;
  rawSecretReturnAllowed: false;
  responseMustExclude: readonly string[];
}>;

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY: StreamBillingLedgerReadOnlyRouteSourceSafety = {
  version: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_VERSION,
  sourceOnly: true,
  routeSourceDraftCreated: true,
  routeMountedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  fakeSuccessAllowed: false,
  rawPurchaseTokenReturnAllowed: false,
  rawSecretReturnAllowed: false,
  responseMustExclude: [
    "rawPurchaseToken",
    "purchaseToken",
    "providerSecret",
    "clientSecret",
    "privateKey",
    "accessToken",
    "refreshToken",
    "Wallet mutation result",
    "provider call result",
    "money movement result",
  ],
};

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_NEXT_APPROVAL =
  "I approve BACKEND-STREAM-FOUNDATION-142E read-only route source verification and protected mount planning only, no route mount, no provider call, no Wallet mutation, no money movement, no Admin UI touch, no mobile touch." as const;
