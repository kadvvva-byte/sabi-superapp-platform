import { getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot } from "../kernel-diagnostics-controlled-route-mount-source-package-write-review";
import {
  STREAM_FOUNDATION_139P_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_PACKAGE_FINAL_GATE_VERSION,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateDecision,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateItem,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSafety,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSnapshot,
  type StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateStatus,
} from "./streamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateContracts";

const CONTROLLED_FINAL_GATE_SAFETY: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSafety = {
  finalGateBuiltNow: true,
  patchScope: "src/modules/stream/foundation/** only",
  previousWriteReviewRequired: true,
  finalGateMetadataOnly: true,
  ownerApprovalRequiredBeforeMount: true,
  readyForProductionRouteMount: false,
  sourcePackageWriteAllowedNow: false,
  sourcePackageWriteExecutedNow: false,
  sourceFilesWrittenNow: false,
  sourceTextReturned: false,
  diagnosticsRouteRuntimeMountAllowedNow: false,
  diagnosticsRouteRuntimeMountPerformedNow: false,
  protectedRouteRegisteredNow: false,
  expressRouterCreatedNow: false,
  expressRouterImportedNow: false,
  expressRouterBoundNow: false,
  streamIndexPatchIncluded: false,
  streamModuleIndexTouchedNow: false,
  appServerPatchIncluded: false,
  appServerTouchedNow: false,
  runtimeHttpRequestPerformedNow: false,
  databaseReadAllowedNow: false,
  databaseWriteAllowedNow: false,
  providerCallAllowedNow: false,
  walletMutationAllowedNow: false,
  paymentAuthorizationAllowedNow: false,
  monthlyPayoutAllowedNow: false,
  moneyMovementAllowedNow: false,
  rawSecretsReturned: false,
  mobileProviderKeysAllowed: false,
  fakeSuccessAllowed: false,
};

function buildGateItems(): readonly StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateItem[] {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot();

  return [
    {
      area: "previous_write_review",
      gateId: "139p_previous_write_review_ready",
      passed: previous.status === "controlled_route_mount_source_package_write_review_ready" && previous.decision.readyForControlledRouteMountSourcePackageFinalGate === true,
      blocking: previous.status !== "controlled_route_mount_source_package_write_review_ready" || previous.decision.readyForControlledRouteMountSourcePackageFinalGate !== true,
      expected: "139O controlled route mount source package write review is ready for final gate",
      observed: `${previous.status}:${String(previous.decision.readyForControlledRouteMountSourcePackageFinalGate)}`,
      remediation: "Complete 139O write review before entering final gate.",
      safeCode: "previous_write_review_ready",
      safeMessageKey: "stream.foundation.139p.previousWriteReviewReady",
    },
    {
      area: "foundation_scope",
      gateId: "139p_foundation_scope_only",
      passed: previous.patchScope === "src/modules/stream/foundation/** only",
      blocking: previous.patchScope !== "src/modules/stream/foundation/** only",
      expected: "Only src/modules/stream/foundation/** is in scope",
      observed: previous.patchScope,
      remediation: "Remove any non-foundation files before final gate.",
      safeCode: "foundation_scope_only",
      safeMessageKey: "stream.foundation.139p.foundationScopeOnly",
    },
    {
      area: "owner_approval_required",
      gateId: "139p_owner_approval_required_before_mount",
      passed: previous.ownerApprovalRequiredBeforeMount === true && previous.readyForProductionRouteMount === false,
      blocking: previous.ownerApprovalRequiredBeforeMount !== true || previous.readyForProductionRouteMount !== false,
      expected: "Owner approval is still required and production mount remains false",
      observed: `${String(previous.ownerApprovalRequiredBeforeMount)}:${String(previous.readyForProductionRouteMount)}`,
      remediation: "Keep controlled mount blocked until explicit owner-approved production route mount stage.",
      safeCode: "owner_approval_required_before_mount",
      safeMessageKey: "stream.foundation.139p.ownerApprovalRequiredBeforeMount",
    },
    {
      area: "stream_index_guard",
      gateId: "139p_no_stream_index_patch",
      passed: previous.streamIndexPatchIncluded === false && previous.streamModuleIndexTouchedNow === false,
      blocking: previous.streamIndexPatchIncluded !== false || previous.streamModuleIndexTouchedNow !== false,
      expected: "src/modules/stream/index.ts is not included or touched",
      observed: `${String(previous.streamIndexPatchIncluded)}:${String(previous.streamModuleIndexTouchedNow)}`,
      remediation: "Do not include stream module index in the foundation-only final gate package.",
      safeCode: "no_stream_index_patch",
      safeMessageKey: "stream.foundation.139p.noStreamIndexPatch",
    },
    {
      area: "app_server_guard",
      gateId: "139p_no_app_server_patch",
      passed: previous.appServerPatchIncluded === false && previous.appServerTouchedNow === false,
      blocking: previous.appServerPatchIncluded !== false || previous.appServerTouchedNow !== false,
      expected: "No src/app.ts or src/server.ts patch is included",
      observed: `${String(previous.appServerPatchIncluded)}:${String(previous.appServerTouchedNow)}`,
      remediation: "Keep app/server entry wiring for a later controlled backend connection stage.",
      safeCode: "no_app_server_patch",
      safeMessageKey: "stream.foundation.139p.noAppServerPatch",
    },
    {
      area: "route_mount_guard",
      gateId: "139p_no_route_mount_performed",
      passed:
        previous.diagnosticsRouteRuntimeMountAllowedNow === false &&
        previous.diagnosticsRouteRuntimeMountPerformedNow === false &&
        previous.protectedRouteRegisteredNow === false &&
        previous.expressRouterCreatedNow === false &&
        previous.expressRouterImportedNow === false &&
        previous.expressRouterBoundNow === false,
      blocking:
        previous.diagnosticsRouteRuntimeMountAllowedNow !== false ||
        previous.diagnosticsRouteRuntimeMountPerformedNow !== false ||
        previous.protectedRouteRegisteredNow !== false ||
        previous.expressRouterCreatedNow !== false ||
        previous.expressRouterImportedNow !== false ||
        previous.expressRouterBoundNow !== false,
      expected: "No route mount or Express router binding is performed",
      observed: `${String(previous.diagnosticsRouteRuntimeMountAllowedNow)}:${String(previous.diagnosticsRouteRuntimeMountPerformedNow)}:${String(previous.protectedRouteRegisteredNow)}:${String(previous.expressRouterCreatedNow)}:${String(previous.expressRouterImportedNow)}:${String(previous.expressRouterBoundNow)}`,
      remediation: "Keep route mount execution blocked until controlled backend connection stage.",
      safeCode: "no_route_mount_performed",
      safeMessageKey: "stream.foundation.139p.noRouteMountPerformed",
    },
    {
      area: "runtime_execution_guard",
      gateId: "139p_no_runtime_http_request",
      passed: previous.runtimeHttpRequestsPerformed === 0,
      blocking: previous.runtimeHttpRequestsPerformed !== 0,
      expected: "No runtime HTTP request is performed",
      observed: String(previous.runtimeHttpRequestsPerformed),
      remediation: "Do not run live HTTP checks in the foundation-only final gate.",
      safeCode: "no_runtime_http_request",
      safeMessageKey: "stream.foundation.139p.noRuntimeHttpRequest",
    },
    {
      area: "data_side_effect_guard",
      gateId: "139p_no_data_side_effects",
      passed: previous.databaseExecutionPerformed === 0 && previous.sourcePackageWriteExecutedNow === false && previous.sourceFilesWrittenNow === false,
      blocking: previous.databaseExecutionPerformed !== 0 || previous.sourcePackageWriteExecutedNow !== false || previous.sourceFilesWrittenNow !== false,
      expected: "No source write execution and no database execution",
      observed: `${previous.databaseExecutionPerformed}:${String(previous.sourcePackageWriteExecutedNow)}:${String(previous.sourceFilesWrittenNow)}`,
      remediation: "Keep final gate metadata-only; do not write route source files in this step.",
      safeCode: "no_data_side_effects",
      safeMessageKey: "stream.foundation.139p.noDataSideEffects",
    },
    {
      area: "payment_wallet_guard",
      gateId: "139p_no_payment_wallet_side_effects",
      passed:
        previous.providerCallsPerformed === 0 &&
        previous.walletMutationPerformed === 0 &&
        previous.paymentAuthorizationPerformed === 0 &&
        previous.monthlyPayoutPerformed === 0 &&
        previous.moneyMovementPerformed === 0,
      blocking:
        previous.providerCallsPerformed !== 0 ||
        previous.walletMutationPerformed !== 0 ||
        previous.paymentAuthorizationPerformed !== 0 ||
        previous.monthlyPayoutPerformed !== 0 ||
        previous.moneyMovementPerformed !== 0,
      expected: "No provider, Wallet, payment, payout, or money movement side effects",
      observed: `${previous.providerCallsPerformed}:${previous.walletMutationPerformed}:${previous.paymentAuthorizationPerformed}:${previous.monthlyPayoutPerformed}:${previous.moneyMovementPerformed}`,
      remediation: "Keep payment and Wallet activation for a later provider-gated stage.",
      safeCode: "no_payment_wallet_side_effects",
      safeMessageKey: "stream.foundation.139p.noPaymentWalletSideEffects",
    },
    {
      area: "secret_guard",
      gateId: "139p_no_secret_exposure",
      passed: previous.rawSecretsReturned === 0 && previous.mobileProviderKeysAllowed === false,
      blocking: previous.rawSecretsReturned !== 0 || previous.mobileProviderKeysAllowed !== false,
      expected: "No raw secrets and no mobile provider keys",
      observed: `${previous.rawSecretsReturned}:${String(previous.mobileProviderKeysAllowed)}`,
      remediation: "Keep all provider configuration server-side and redacted.",
      safeCode: "no_secret_exposure",
      safeMessageKey: "stream.foundation.139p.noSecretExposure",
    },
    {
      area: "fake_success_guard",
      gateId: "139p_no_fake_success",
      passed: previous.fakeSuccessAllowed === false,
      blocking: previous.fakeSuccessAllowed !== false,
      expected: "Fake success remains forbidden",
      observed: String(previous.fakeSuccessAllowed),
      remediation: "Return blocked/provider-not-configured states until real provider integration exists.",
      safeCode: "no_fake_success",
      safeMessageKey: "stream.foundation.139p.noFakeSuccess",
    },
    {
      area: "production_readiness_guard",
      gateId: "139p_not_production_route_mount_ready",
      passed: previous.readyForProductionRouteMount === false,
      blocking: previous.readyForProductionRouteMount !== false,
      expected: "Production route mount readiness remains false in foundation-only stage",
      observed: String(previous.readyForProductionRouteMount),
      remediation: "Use later controlled backend connection stage for production mount readiness.",
      safeCode: "not_production_route_mount_ready",
      safeMessageKey: "stream.foundation.139p.notProductionRouteMountReady",
    },
  ];
}

function buildDecision(
  status: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateStatus,
  blockingGateItems: number,
): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateDecision {
  if (status !== "controlled_route_mount_source_package_final_gate_ready") {
    const safeCode = blockingGateItems > 0 ? "final_gate_blocked_by_safety_gate" : "final_gate_blocked_by_previous_write_review";
    return {
      decisionCode:
        blockingGateItems > 0
          ? "controlled_route_mount_source_package_final_gate_blocked_by_safety_gate"
          : "controlled_route_mount_source_package_final_gate_blocked_by_previous_write_review",
      readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite: false,
      readyForProductionRouteMount: false,
      ownerApprovalRequiredBeforeMount: true,
      sourcePackageWriteAllowedNow: false,
      sourcePackageWriteExecutedNow: false,
      sourceFilesWrittenNow: false,
      sourceTextReturned: false,
      streamIndexPatchIncluded: false,
      appServerPatchIncluded: false,
      routeMountAllowedNow: false,
      routeMountPerformedNow: false,
      runtimeActivationAllowedNow: false,
      safeCode,
      safeMessageKey: `stream.foundation.139p.${safeCode}`,
    };
  }

  return {
    decisionCode: "controlled_route_mount_source_package_final_gate_ready_for_owner_approved_source_only_write",
    readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite: true,
    readyForProductionRouteMount: false,
    ownerApprovalRequiredBeforeMount: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    streamIndexPatchIncluded: false,
    appServerPatchIncluded: false,
    routeMountAllowedNow: false,
    routeMountPerformedNow: false,
    runtimeActivationAllowedNow: false,
    safeCode: "final_gate_ready_for_owner_approved_source_only_write",
    safeMessageKey: "stream.foundation.139p.finalGateReadyForOwnerApprovedSourceOnlyWrite",
  };
}

export function getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSnapshot(): StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateSnapshot {
  const previous = getStreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageWriteReviewSnapshot();
  const gateItems = buildGateItems();
  const passedGateItems = gateItems.filter((item) => item.passed).length;
  const blockingGateItems = gateItems.filter((item) => item.blocking).length;
  const status: StreamFoundationKernelDiagnosticsControlledRouteMountSourcePackageFinalGateStatus =
    previous.status === "controlled_route_mount_source_package_write_review_ready" &&
    previous.decision.readyForControlledRouteMountSourcePackageFinalGate === true &&
    blockingGateItems === 0
      ? "controlled_route_mount_source_package_final_gate_ready"
      : "controlled_route_mount_source_package_final_gate_blocked";
  const decision = buildDecision(status, blockingGateItems);

  return {
    version: STREAM_FOUNDATION_139P_KERNEL_DIAGNOSTICS_CONTROLLED_ROUTE_MOUNT_SOURCE_PACKAGE_FINAL_GATE_VERSION,
    status,
    patchScope: "src/modules/stream/foundation/** only",
    previousWriteReviewStatus: previous.status,
    finalGateBuiltNow: true,
    totalGateItems: gateItems.length,
    passedGateItems,
    blockingGateItems,
    readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite: decision.readyForControlledRouteMountSourcePackageOwnerApprovedSourceOnlyWrite,
    readyForProductionRouteMount: false,
    ownerApprovalRequiredBeforeMount: true,
    sourcePackageWriteAllowedNow: false,
    sourcePackageWriteExecutedNow: false,
    sourceFilesWrittenNow: false,
    sourceTextReturned: false,
    diagnosticsRouteRuntimeMountAllowedNow: false,
    diagnosticsRouteRuntimeMountPerformedNow: false,
    protectedRouteRegisteredNow: false,
    expressRouterCreatedNow: false,
    expressRouterImportedNow: false,
    expressRouterBoundNow: false,
    streamIndexPatchIncluded: false,
    streamModuleIndexTouchedNow: false,
    appServerPatchIncluded: false,
    appServerTouchedNow: false,
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
    gateItems,
    decision,
    safety: CONTROLLED_FINAL_GATE_SAFETY,
  };
}
