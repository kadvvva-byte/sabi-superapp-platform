import {
  STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH,
  STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_NEXT_APPROVAL,
  STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY,
  STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_VERSION,
} from "./stream-billing-ledger-readonly.route.contracts";

export const STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_DRAFT_PLAN = {
  version: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_VERSION,
  stage: "BACKEND_STREAM_FOUNDATION_142D",
  sourceOnly: true,
  routeSourceDraftFileCreated: true,
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft",
  plannedPath: STREAM_BILLING_LEDGER_READONLY_ROUTE_PATH,
  routeMountedNow: false,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  safety: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_SAFETY,
  nextApprovalPhrase: STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_NEXT_APPROVAL,
  nextStage: "BACKEND-STREAM-FOUNDATION-142E read-only route source verification and protected mount planning",
} as const;

export function getStreamBillingLedgerReadOnlyRouteSourceDraftPlan() {
  return STREAM_BILLING_LEDGER_READONLY_ROUTE_SOURCE_DRAFT_PLAN;
}
