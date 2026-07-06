export const STREAM_BILLING_LEDGER_ROUTE_PREFIX_PRISMA_BINDING_PATCH_PLANNING_VERSION =
  "BACKEND-STREAM-FOUNDATION-143C-FIX2" as const;

export type StreamBillingLedgerRoutePrefixPrismaBindingPatchTarget =
  | "src/modules/admin/admin.routes.ts"
  | "src/modules/admin/admin.module.ts"
  | "src/app.ts"
  | "src/modules/stream/foundation/stream-billing-ledger-readonly.route.contracts.ts"
  | "src/modules/stream/foundation/stream-billing-ledger-readonly.route.ts"
  | "src/modules/stream/foundation/stream-billing-ledger-readonly.route.plan.ts";

export type StreamBillingLedgerRoutePrefixPrismaBindingPatchSafety = {
  readonly planningOnly: true;
  readonly backendRestartAllowedNow: false;
  readonly providerCallAllowedNow: false;
  readonly walletMutationAllowedNow: false;
  readonly moneyMovementAllowedNow: false;
  readonly databaseWriteAllowedNow: false;
  readonly adminUiTouchAllowedNow: false;
  readonly mobileTouchAllowedNow: false;
  readonly rawSecretValuesReturned: false;
};

export type StreamBillingLedgerRoutePrefixPrismaBindingPatchPlan = {
  readonly version: typeof STREAM_BILLING_LEDGER_ROUTE_PREFIX_PRISMA_BINDING_PATCH_PLANNING_VERSION;
  readonly stage: "BACKEND-STREAM-FOUNDATION-143C-FIX2";
  readonly nextStage: "BACKEND-STREAM-FOUNDATION-143C-FIX3";
  readonly targetFiles: readonly StreamBillingLedgerRoutePrefixPrismaBindingPatchTarget[];
  readonly expectedPublicPath: "/api/admin/stream/billing-ledger/read-only-snapshot";
  readonly desiredAdminLocalRoutePath: "/stream/billing-ledger/read-only-snapshot";
  readonly duplicatePathMustNotReachHandler: true;
  readonly sourcePatchAllowedInThisStage: false;
};
