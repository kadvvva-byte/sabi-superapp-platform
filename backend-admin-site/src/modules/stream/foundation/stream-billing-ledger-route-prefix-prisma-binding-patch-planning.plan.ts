import {
  STREAM_BILLING_LEDGER_ROUTE_PREFIX_PRISMA_BINDING_PATCH_PLANNING_VERSION,
  type StreamBillingLedgerRoutePrefixPrismaBindingPatchPlan,
  type StreamBillingLedgerRoutePrefixPrismaBindingPatchSafety,
} from "./stream-billing-ledger-route-prefix-prisma-binding-patch-planning.contracts";

export const streamBillingLedgerRoutePrefixPrismaBindingPatchSafety: StreamBillingLedgerRoutePrefixPrismaBindingPatchSafety = {
  planningOnly: true,
  backendRestartAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  rawSecretValuesReturned: false,
};

export const streamBillingLedgerRoutePrefixPrismaBindingPatchPlan: StreamBillingLedgerRoutePrefixPrismaBindingPatchPlan = {
  version: STREAM_BILLING_LEDGER_ROUTE_PREFIX_PRISMA_BINDING_PATCH_PLANNING_VERSION,
  stage: "BACKEND-STREAM-FOUNDATION-143C-FIX2",
  nextStage: "BACKEND-STREAM-FOUNDATION-143C-FIX3",
  targetFiles: [
    "src/modules/admin/admin.routes.ts",
    "src/modules/admin/admin.module.ts",
    "src/app.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.contracts.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.plan.ts",
  ],
  expectedPublicPath: "/api/admin/stream/billing-ledger/read-only-snapshot",
  desiredAdminLocalRoutePath: "/stream/billing-ledger/read-only-snapshot",
  duplicatePathMustNotReachHandler: true,
  sourcePatchAllowedInThisStage: false,
};

export const streamBillingLedgerRoutePrefixPrismaBindingPatchPlanningNotes = [
  "143C-FIX2 is planning-only and does not patch runtime files.",
  "143C showed authenticated expected path 404 and duplicate diagnostic path handler 500.",
  "143C-FIX1 showed current admin.routes.ts mount passes prisma from guessed store.prisma, which is undefined at runtime.",
  "143C-FIX3 should patch only controlled source needed to bind the real Prisma client and expose the handler at the admin-local route path.",
  "Future patch must preserve createRequireAdmin before route mount and requireAdminPermission(\"admin:read\").",
  "Future patch must remain GET-only and must not write DB, call providers, mutate Wallet, move money, touch Admin UI, or touch mobile.",
] as const;
