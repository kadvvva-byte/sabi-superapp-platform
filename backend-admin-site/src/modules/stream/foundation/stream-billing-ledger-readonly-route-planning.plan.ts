import {
  STREAM_BILLING_LEDGER_READONLY_ROUTE_PLAN,
  STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_VERSION,
} from "./stream-billing-ledger-readonly-route-planning.contracts";

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_SOURCE_PLAN = {
  version: STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_VERSION,
  stage: "BACKEND_STREAM_FOUNDATION_142C_FIX2",
  sourceOnly: true,
  routePlan: STREAM_BILLING_LEDGER_READONLY_ROUTE_PLAN,
  plannedImplementationFilesForNextStage: [
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.contracts.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.route.plan.ts",
  ],
  scannerSeparation: {
    serviceRuntimeImplementationScannedStrictly: true,
    contractsAndPlansScannedAsDeclarativeBoundaries: true,
    routePlanningTextIsNotRouteMount: true,
  },
  routeMountedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-142D read-only route source draft no-mount implementation",
} as const;

export function getStreamBillingLedgerReadOnlyRoutePlanningSourcePlan() {
  return STREAM_BILLING_LEDGER_READONLY_ROUTE_PLANNING_SOURCE_PLAN;
}
