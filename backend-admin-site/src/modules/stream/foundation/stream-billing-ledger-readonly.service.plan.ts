import {
  STREAM_BILLING_LEDGER_READONLY_SERVICE_NEXT_APPROVAL,
  STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION,
  STREAM_BILLING_LEDGER_READONLY_TABLE_BINDINGS,
} from "./stream-billing-ledger-readonly.service.contracts";

export const STREAM_BILLING_LEDGER_READONLY_SERVICE_IMPLEMENTATION_PLAN = {
  version: STREAM_BILLING_LEDGER_READONLY_SERVICE_VERSION,
  stage: "BACKEND_STREAM_FOUNDATION_142B",
  sourceOnly: true,
  implementedFiles: [
    "src/modules/stream/foundation/stream-billing-ledger-readonly.service.contracts.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.service.ts",
    "src/modules/stream/foundation/stream-billing-ledger-readonly.service.plan.ts",
  ],
  tableBindings: STREAM_BILLING_LEDGER_READONLY_TABLE_BINDINGS,
  routeMountAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  nextApprovalPhrase: STREAM_BILLING_LEDGER_READONLY_SERVICE_NEXT_APPROVAL,
} as const;

export function getStreamBillingLedgerReadOnlyServiceImplementationPlan() {
  return STREAM_BILLING_LEDGER_READONLY_SERVICE_IMPLEMENTATION_PLAN;
}
