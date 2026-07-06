import {
  STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE,
  STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE_VERSION,
} from "./stream-billing-ledger-readonly-mount-approval-package.contracts";

export const STREAM_BILLING_LEDGER_READONLY_MOUNT_SOURCE_PATCH_APPROVAL_PLAN = {
  version: STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE_VERSION,
  stage: "BACKEND_STREAM_FOUNDATION_142F",
  sourceOnly: true,
  approvalPackageOnly: true,
  routeMountExecutionAllowedNow: false,
  routeMountPerformedNow: false,
  targetFile: "src/modules/admin/admin.routes.ts",
  plannedImportStatement: "import { createStreamBillingLedgerReadOnlyRouteSourceDraft } from '../stream/foundation/stream-billing-ledger-readonly.route';",
  plannedMountExpression: "router.use(createStreamBillingLedgerReadOnlyRouteSourceDraft({ prisma: store.prisma, requireAdmin: requireAdminPermission('stream:read') }));",
  plannedPath: STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE.plannedPath,
  mountProtection: STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE.plannedMountProtection,
  futureMountRequiresSeparateApproval: true,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  databaseWriteAllowedNow: false,
  backendRestartAllowedNow: false,
  adminUiTouchAllowedNow: false,
  mobileTouchAllowedNow: false,
  nextStage: "BACKEND-STREAM-FOUNDATION-142G controlled protected read-only route mount source patch execution",
  nextApprovalPhrase: STREAM_BILLING_LEDGER_READONLY_MOUNT_APPROVAL_PACKAGE.exactNextApprovalPhrase,
} as const;

export function getStreamBillingLedgerReadOnlyMountSourcePatchApprovalPlan() {
  return STREAM_BILLING_LEDGER_READONLY_MOUNT_SOURCE_PATCH_APPROVAL_PLAN;
}
