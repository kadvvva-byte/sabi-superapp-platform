import {
  getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot,
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_SAFETY,
  type StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem,
} from "../kernel-diagnostics-route-source-implementation-checklist";
import type {
  StreamFoundationKernelDiagnosticsRouteSourceDraftFileSpec,
  StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget,
} from "../kernel-diagnostics-route-source-draft-package";
import {
  STREAM_FOUNDATION_138R_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_VERSION,
  type StreamFoundationKernelDiagnosticsRouteImplementationMountBoundaryReview,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprint,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprintId,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprintKind,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourceGuardId,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSafety,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot,
  type StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageStatus,
} from "./streamFoundationKernelDiagnosticsRouteImplementationSourcePackageContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_SAFETY: StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_SOURCE_IMPLEMENTATION_CHECKLIST_SAFETY,
  implementationSourcePackageOnly: true,
  implementationSourceBlueprintsPreparedNow: true,
  routeSourceImplementationExecutedNow: false,
  routeSourceFilesWrittenNow: false,
  implementationSourceFilesGeneratedNow: false,
  implementationSourceTextReturnedNow: false,
  futureRouteSourcePatchAppliedNow: false,
  futureProtectedRouteModuleCreatedNow: false,
  futureRouteHandlerCreatedNow: false,
  futureRouteScopeGuardCreatedNow: false,
  futureRouteRedactionCreatedNow: false,
  streamModuleEntrypointCreatedNow: false,
  streamIndexPatchIncluded: false,
  appServerPatchIncluded: false,
  protectedRouteMountedNow: false,
  expressRouterCreatedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
};

function safeKey(value: string): string {
  return value.replace(/[^a-zA-Z0-9]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase();
}

function blueprintIdForTarget(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprintId {
  switch (targetPath) {
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.redaction.ts":
      return "admin_kernel_diagnostics_redaction_source_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.scope.ts":
      return "admin_kernel_diagnostics_scope_source_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts":
      return "admin_kernel_diagnostics_handlers_source_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts":
      return "admin_kernel_diagnostics_routes_source_blueprint";
    case "src/modules/stream/stream.module.ts":
      return "stream_module_entrypoint_source_blueprint";
  }
}

function blueprintKindForTarget(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprintKind {
  switch (targetPath) {
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.redaction.ts":
      return "redacted_response_envelope_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.scope.ts":
      return "admin_scope_guard_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts":
      return "protected_handler_blueprint";
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts":
      return "protected_route_definition_blueprint";
    case "src/modules/stream/stream.module.ts":
      return "future_stream_module_entrypoint_blueprint";
  }
}

function exportsForTarget(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): readonly string[] {
  switch (targetPath) {
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.redaction.ts":
      return ["redactStreamKernelDiagnosticsAdminResponse", "buildStreamKernelDiagnosticsAdminEnvelope"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.scope.ts":
      return ["assertStreamKernelDiagnosticsAdminScope", "getStreamKernelDiagnosticsScopePreview"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts":
      return ["getStreamKernelDiagnosticsSnapshotHandler", "getStreamKernelDiagnosticsReadinessHandler", "getStreamKernelDiagnosticsBlockedFindingsHandler"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts":
      return ["createAdminStreamKernelDiagnosticsRoutes"];
    case "src/modules/stream/stream.module.ts":
      return ["createStreamFoundationModule"];
  }
}

function allowedImportsForTarget(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): readonly string[] {
  switch (targetPath) {
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.redaction.ts":
      return ["kernel diagnostics admin handoff snapshot", "common safe response envelope types"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.scope.ts":
      return ["admin auth context type", "stream diagnostics route definitions"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.handlers.ts":
      return ["diagnostics handoff snapshot", "redaction helper", "scope guard"];
    case "src/modules/stream/infrastructure/routes/admin-stream-kernel-diagnostics.routes.ts":
      return ["protected route factory", "diagnostics handlers", "scope guard"];
    case "src/modules/stream/stream.module.ts":
      return ["stream diagnostics routes only after separate mount approval"];
  }
}

function guardsForTarget(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): readonly StreamFoundationKernelDiagnosticsRouteImplementationSourceGuardId[] {
  const common: readonly StreamFoundationKernelDiagnosticsRouteImplementationSourceGuardId[] = [
    "redaction_guard_later",
    "provider_wallet_money_disabled_guard_later",
    "forbidden_path_scan_later",
  ];
  if (targetPath === "src/modules/stream/stream.module.ts") {
    return ["admin_auth_guard_later", "admin_scope_guard_later", "route_mount_separation_guard_later", ...common];
  }
  if (targetPath.endsWith("routes.ts") || targetPath.endsWith("handlers.ts")) {
    return ["admin_auth_guard_later", "admin_scope_guard_later", ...common];
  }
  return common;
}

function findChecklistItem(targetPath: StreamFoundationKernelDiagnosticsRouteSourceDraftFileTarget): StreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistItem | undefined {
  const checklist = getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot();
  return checklist.checklistItems.find((item) => item.futureTargetPath === targetPath);
}

function sourceBlueprint(draftFile: StreamFoundationKernelDiagnosticsRouteSourceDraftFileSpec): StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprint {
  const targetKey = safeKey(draftFile.targetPath);
  return {
    blueprintId: blueprintIdForTarget(draftFile.targetPath),
    blueprintKind: blueprintKindForTarget(draftFile.targetPath),
    futureTargetPath: draftFile.targetPath,
    relatedDraftFile: draftFile,
    implementationChecklistItem: findChecklistItem(draftFile.targetPath),
    includedInThisPatch: false,
    generatedNow: false,
    sourceTextReturnedNow: false,
    routeMountedNow: false,
    requiresSeparateOwnerApprovalLater: true,
    requiresSeparateMountApprovalLater: true,
    requiredGuardsLater: guardsForTarget(draftFile.targetPath),
    expectedExportsLater: exportsForTarget(draftFile.targetPath),
    allowedImportsLater: allowedImportsForTarget(draftFile.targetPath),
    forbiddenRuntimeEffectsNow: [
      "no_runtime_http_request",
      "no_database_execution",
      "no_provider_call",
      "no_wallet_mutation",
      "no_payment_authorization",
      "no_monthly_payout_execution",
      "no_money_movement",
      "no_raw_secret_return",
      "no_route_mount",
    ],
    performsDatabaseExecutionNow: false,
    performsProviderCallNow: false,
    performsWalletMutationNow: false,
    performsMoneyMovementNow: false,
    returnsRawSecretsNow: false,
    safeCode: `stream_kernel_diagnostics_route_implementation_source_blueprint_${targetKey}_review_only`,
    safeMessageKey: `stream.kernel.diagnostics.routeImplementationSource.blueprint.${targetKey}.reviewOnly`,
  };
}

function buildMountBoundaryReviews(): readonly StreamFoundationKernelDiagnosticsRouteImplementationMountBoundaryReview[] {
  return [
    {
      boundaryId: "stream_index_boundary",
      targetPath: "src/modules/stream/index.ts",
      includedInThisPatch: false,
      routeMountedNow: false,
      separateApprovalRequiredLater: true,
      allowedOnlyAfterSourceReview: true,
      safeCode: "stream_kernel_diagnostics_route_implementation_stream_index_boundary_unchanged",
      safeMessageKey: "stream.kernel.diagnostics.routeImplementationSource.boundary.streamIndex.unchanged",
    },
    {
      boundaryId: "app_server_boundary",
      targetPath: "src/app.ts",
      includedInThisPatch: false,
      routeMountedNow: false,
      separateApprovalRequiredLater: true,
      allowedOnlyAfterSourceReview: true,
      safeCode: "stream_kernel_diagnostics_route_implementation_app_server_boundary_unchanged",
      safeMessageKey: "stream.kernel.diagnostics.routeImplementationSource.boundary.appServer.unchanged",
    },
    {
      boundaryId: "stream_module_boundary",
      targetPath: "src/modules/stream/stream.module.ts",
      includedInThisPatch: false,
      routeMountedNow: false,
      separateApprovalRequiredLater: true,
      allowedOnlyAfterSourceReview: true,
      safeCode: "stream_kernel_diagnostics_route_implementation_stream_module_boundary_not_generated",
      safeMessageKey: "stream.kernel.diagnostics.routeImplementationSource.boundary.streamModule.notGenerated",
    },
    {
      boundaryId: "admin_route_mount_boundary",
      targetPath: "src/server.ts",
      includedInThisPatch: false,
      routeMountedNow: false,
      separateApprovalRequiredLater: true,
      allowedOnlyAfterSourceReview: true,
      safeCode: "stream_kernel_diagnostics_route_implementation_admin_route_mount_boundary_unchanged",
      safeMessageKey: "stream.kernel.diagnostics.routeImplementationSource.boundary.adminRouteMount.unchanged",
    },
  ];
}

function deriveStatus(
  readyForImplementationSourcePackageReview: boolean,
  sourceBlueprints: readonly StreamFoundationKernelDiagnosticsRouteImplementationSourceBlueprint[],
  safety: StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSafety,
): StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageStatus {
  if (!readyForImplementationSourcePackageReview) return "implementation_source_package_blocked_by_checklist";
  if (sourceBlueprints.some((item) => item.includedInThisPatch || item.generatedNow || item.sourceTextReturnedNow)) return "implementation_source_package_blocked_by_scope_boundary";
  if (
    safety.routeSourceImplementationExecutedNow ||
    safety.routeSourceFilesWrittenNow ||
    safety.implementationSourceFilesGeneratedNow ||
    safety.implementationSourceTextReturnedNow ||
    safety.futureRouteSourcePatchAppliedNow ||
    safety.protectedRouteMountedNow ||
    safety.expressRouterCreatedNow ||
    safety.providerCallAllowedNow ||
    safety.walletMutationAllowedNow ||
    safety.moneyMovementAllowedNow
  ) {
    return "implementation_source_package_blocked_by_safety_boundary";
  }
  return "implementation_source_package_ready_for_owner_review";
}

export function getStreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot(): StreamFoundationKernelDiagnosticsRouteImplementationSourcePackageSnapshot {
  const checklist = getStreamFoundationKernelDiagnosticsRouteSourceImplementationChecklistSnapshot();
  const sourceBlueprints = checklist.sourceReviews.map((review) => sourceBlueprint(review.draftFile));
  const mountBoundaryReviews = buildMountBoundaryReviews();
  const safety = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_SAFETY;
  const readyForImplementationSourcePackageReview =
    checklist.readyForImplementationChecklistReview &&
    checklist.checklistItemCount === 12 &&
    checklist.sourceReviewCount === 5 &&
    checklist.generatedSourceReviewCount === 0 &&
    checklist.readyForRouteSourceImplementationNow === false &&
    checklist.routeSourceImplementationExecutedNow === false &&
    checklist.routeSourceFilesWrittenNow === false &&
    checklist.routeMountPerformed === false &&
    checklist.protectedRouteRegisteredNow === false &&
    checklist.streamIndexPatchIncluded === false &&
    checklist.appServerPatchIncluded === false &&
    sourceBlueprints.length === 5 &&
    sourceBlueprints.every((item) => item.includedInThisPatch === false && item.generatedNow === false && item.sourceTextReturnedNow === false) &&
    mountBoundaryReviews.every((item) => item.includedInThisPatch === false && item.routeMountedNow === false && item.separateApprovalRequiredLater);

  return {
    version: STREAM_FOUNDATION_138R_KERNEL_DIAGNOSTICS_ROUTE_IMPLEMENTATION_SOURCE_PACKAGE_VERSION,
    packageId: "stream_kernel_diagnostics_route_implementation_source_package",
    status: deriveStatus(readyForImplementationSourcePackageReview, sourceBlueprints, safety),
    patchScope: "src/modules/stream/foundation/** only",
    checklistVersion: checklist.version,
    checklistStatus: checklist.status,
    implementationSourcePackageOnly: true,
    implementationSourceBlueprintsPreparedNow: true,
    routeSourceImplementationExecutedNow: false,
    routeSourceFilesWrittenNow: false,
    implementationSourceFilesGeneratedNow: false,
    implementationSourceTextReturnedNow: false,
    futureRouteSourcePatchAppliedNow: false,
    routeMountAuthorizedNow: false,
    routeMountPerformed: false,
    protectedRouteRegisteredNow: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    readyForImplementationSourcePackageReview,
    readyForRouteSourceImplementationNow: false,
    requiresSeparateRouteSourceApproval: true,
    requiresSeparateRouteMountApproval: true,
    sourceBlueprints,
    sourceBlueprintCount: sourceBlueprints.length,
    generatedSourceBlueprintCount: 0,
    mountBoundaryReviews,
    mountBoundaryReviewCount: mountBoundaryReviews.length,
    runtimeHttpRequestsPerformed: 0,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    rawSecretsReturned: 0,
    mobileProviderKeysAllowed: false,
    fakeSuccessAllowed: false,
    safety,
  };
}
