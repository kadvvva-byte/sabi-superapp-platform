import {
  STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLAN,
  STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_VERSION,
} from "./stream-billing-ledger-readonly-protected-mount-planning.contracts";

export const STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_SOURCE_PLAN = {
  version: STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_VERSION,
  stage: "BACKEND_STREAM_FOUNDATION_142E",
  sourceOnly: true,
  routeSourceVerified: true,
  protectedMountPlan: STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLAN,
  preferredTargetFile: "src/modules/admin/admin.routes.ts",
  routeFactoryName: "createStreamBillingLedgerReadOnlyRouteSourceDraft",
  routeMountedNow: false,
  routeMountAllowedNow: false,
  futureRouteMountRequiresSeparateApproval: true,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-142F protected read-only route mount source patch approval package",
} as const;

export function getStreamBillingLedgerReadOnlyProtectedMountPlanningSourcePlan() {
  return STREAM_BILLING_LEDGER_READONLY_PROTECTED_MOUNT_PLANNING_SOURCE_PLAN;
}
