import {
  STREAM_FOUNDATION_140N_CONTROLLED_AUTHENTICATED_ADMIN_GET_SMOKE_APPROVAL_VERSION,
  type StreamFoundation140NApprovalItem,
  type StreamFoundation140NAuthenticatedSmokeTarget,
  type StreamFoundation140NSnapshot,
} from "./streamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageContracts";

function approvalItem(id: string, status: StreamFoundation140NApprovalItem["status"], evidence: string): StreamFoundation140NApprovalItem {
  return { id, status, evidence };
}

const AUTHENTICATED_SMOKE_TARGETS: readonly StreamFoundation140NAuthenticatedSmokeTarget[] = [
  {
    path: "/api/admin/stream/foundation/diagnostics/readiness",
    method: "GET",
    requiresAdminToken: true,
    expectedStatusWithValidAdminToken: 200,
    expectedStatusWithoutToken: [401, 403],
    responseMustBeReadOnlyDiagnostics: true,
  },
  {
    path: "/api/admin/stream/foundation/diagnostics/preview",
    method: "GET",
    requiresAdminToken: true,
    expectedStatusWithValidAdminToken: 200,
    expectedStatusWithoutToken: [401, 403],
    responseMustBeReadOnlyDiagnostics: true,
  },
];

export function getStreamFoundationControlledAuthenticatedAdminGetSmokeApprovalPackageSnapshot(): StreamFoundation140NSnapshot {
  const approvalItems: StreamFoundation140NApprovalItem[] = [
    approvalItem("previous_140m_review_ready", "approved_for_runner_package", "140M established protected admin-token readiness rules."),
    approvalItem("protected_without_token_verified", "approved_for_runner_package", "140K-FIX1 verified diagnostics routes return protected 403 without token."),
    approvalItem("health_marker_verified", "approved_for_runner_package", "140K-FIX1 verified /health 200 and streamFoundation marker accepted."),
    approvalItem("authenticated_get_targets_scoped", "approved_for_runner_package", "Only two Stream foundation diagnostics admin GET targets are allowed."),
    approvalItem("token_runtime_only", "approved_for_runner_package", "Admin token may be provided only at runtime and must not be written to source, audit, report, ZIP, or logs."),
    approvalItem("no_runtime_execution_by_140n", "approved_for_runner_package", "140N does not execute HTTP and only approves the next runner package."),
    approvalItem("no_mutating_methods", "approved_for_runner_package", "Future runner may use GET only; no POST, PUT, PATCH, or DELETE."),
    approvalItem("no_money_or_provider_actions", "approved_for_runner_package", "DB/provider/Wallet/payment/payout/money movement remain forbidden."),
  ];

  return {
    version: STREAM_FOUNDATION_140N_CONTROLLED_AUTHENTICATED_ADMIN_GET_SMOKE_APPROVAL_VERSION,
    stage: "controlled_authenticated_admin_get_smoke_approval_package_source_only",
    status: "controlled_authenticated_admin_get_smoke_runner_package_approved_unwritten",
    previousEvidence: {
      tokenReadinessReviewStage: "BACKEND-STREAM-FOUNDATION-140M",
      protectedAdminWithoutTokenVerified: true,
      healthMarkerVerified: true,
      baseUrl: "http://127.0.0.1:4001",
    },
    authenticatedSmokeTargets: AUTHENTICATED_SMOKE_TARGETS,
    runnerConstraints: {
      mayCreateOpsRunner: true,
      mayExecuteHttpByThisStage: false,
      allowedMethods: ["GET"],
      allowedHeaders: ["Authorization"],
      tokenInputRuntimeOnly: true,
      tokenStorageAllowed: false,
      tokenLoggingAllowed: false,
      tokenReportAllowed: false,
      backendRestartAllowed: false,
      sourceMutationAllowed: false,
      databaseWriteAllowed: false,
      providerCallAllowed: false,
      walletMutationAllowed: false,
      paymentAuthorizationAllowed: false,
      monthlyPayoutAllowed: false,
      moneyMovementAllowed: false,
      fakeSuccessAllowed: false,
    },
    approvalItems,
    blockingItems: approvalItems.filter((entry) => entry.status === "blocked"),
    nextRecommendedStage: "BACKEND-STREAM-FOUNDATION-140O controlled authenticated admin GET smoke runner package",
  };
}
