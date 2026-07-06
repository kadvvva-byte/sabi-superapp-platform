import {
  STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION,
  STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_PACKAGE,
  type StreamBillingLedgerReadOnlyServicePlanningPackage,
} from "./stream-billing-ledger-readonly-service-planning.contracts";

export type StreamBillingLedgerReadOnlyServicePlanningSourcePlan = Readonly<{
  version: typeof STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION;
  planningStage: "BACKEND_STREAM_FOUNDATION_142A";
  sourceOnly: true;
  package: StreamBillingLedgerReadOnlyServicePlanningPackage;
  routeMountAllowedNow: false;
  providerCallAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  adminUiTouchAllowedNow: false;
  mobileTouchAllowedNow: false;
  nextStage: "BACKEND-STREAM-FOUNDATION-142B read-only service contract implementation";
}>;

export const STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_SOURCE_PLAN: StreamBillingLedgerReadOnlyServicePlanningSourcePlan = {
  version: STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_VERSION,
  planningStage: "BACKEND_STREAM_FOUNDATION_142A",
  sourceOnly: true,
  package: STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_PACKAGE,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-142B read-only service contract implementation",
};

export function getStreamBillingLedgerReadOnlyServicePlanningSourcePlan(): StreamBillingLedgerReadOnlyServicePlanningSourcePlan {
  return STREAM_BILLING_LEDGER_READONLY_SERVICE_PLANNING_SOURCE_PLAN;
}
