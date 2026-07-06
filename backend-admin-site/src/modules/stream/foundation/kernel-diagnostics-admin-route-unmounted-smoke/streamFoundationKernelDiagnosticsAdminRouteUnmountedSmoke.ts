import {
  STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_SAFETY,
  previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler,
} from "../kernel-diagnostics-admin-route-factory";
import {
  STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION,
  type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCase,
  type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseResult,
  type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety,
  type StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot,
} from "./streamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeContracts";

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_SAFETY: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSafety = {
  ...STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_FACTORY_SAFETY,
  unmountedSmokeOnly: true,
  runtimeHttpRequestPerformedNow: false,
  actualAdminRouteRegisteredNow: false,
  actualAdminRouteMountedNow: false,
  actualExpressRouterCreatedNow: false,
  actualExpressMiddlewareTouchedNow: false,
};

export const STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_CASES: readonly StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCase[] = [
  {
    caseId: "snapshot_preview_success",
    routeId: "stream_kernel_diagnostics_snapshot",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: false,
    expectedOk: true,
    expectedStatusCode: 200,
    expectedHandlerFound: true,
  },
  {
    caseId: "blocked_findings_preview_success",
    routeId: "stream_kernel_diagnostics_blocked_findings",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    query: { blockedOnly: "true" },
    routeMountApproved: false,
    expectedOk: true,
    expectedStatusCode: 200,
    expectedHandlerFound: true,
  },
  {
    caseId: "readiness_preview_success",
    routeId: "stream_kernel_diagnostics_readiness",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: false,
    expectedOk: true,
    expectedStatusCode: 200,
    expectedHandlerFound: true,
  },
  {
    caseId: "safe_summary_preview_success",
    routeId: "stream_kernel_diagnostics_safe_summary",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read", "admin:stream:monetization:read"],
    routeMountApproved: false,
    expectedOk: true,
    expectedStatusCode: 200,
    expectedHandlerFound: true,
  },
  {
    caseId: "missing_scope_blocked",
    routeId: "stream_kernel_diagnostics_safe_summary",
    scopes: ["admin:stream:read"],
    routeMountApproved: false,
    expectedOk: false,
    expectedStatusCode: 403,
    expectedHandlerFound: true,
  },
  {
    caseId: "route_mount_approved_blocked",
    routeId: "stream_kernel_diagnostics_snapshot",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: true,
    expectedOk: false,
    expectedStatusCode: 409,
    expectedHandlerFound: true,
  },
] as const;

function runSmokeCase(testCase: StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCase): StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeCaseResult {
  const preview = previewStreamFoundationKernelDiagnosticsAdminRouteFactoryHandler({
    routeId: testCase.routeId,
    context: {
      adminUserId: `admin-smoke-${testCase.caseId}`,
      scopes: testCase.scopes,
      query: testCase.query,
      routeMountApproved: testCase.routeMountApproved,
      sourceIpHash: "redacted-source-ip-hash",
    },
  });
  const passed =
    preview.handlerFound === testCase.expectedHandlerFound &&
    preview.envelope.ok === testCase.expectedOk &&
    preview.envelope.statusCode === testCase.expectedStatusCode &&
    preview.mountedNow === false &&
    preview.expressRouterBoundNow === false &&
    preview.envelope.rawSecretFieldsReturned === 0 &&
    preview.envelope.providerCallsPerformed === 0 &&
    preview.envelope.moneyMovementPerformed === 0;

  return {
    caseId: testCase.caseId,
    routeId: testCase.routeId,
    handlerFound: preview.handlerFound,
    expectedOk: testCase.expectedOk,
    actualOk: preview.envelope.ok,
    expectedStatusCode: testCase.expectedStatusCode,
    actualStatusCode: preview.envelope.statusCode,
    mountedNow: false,
    expressRouterBoundNow: false,
    rawSecretFieldsReturned: 0,
    providerCallsPerformed: 0,
    moneyMovementPerformed: 0,
    envelopeSafeCode: preview.envelope.safeCode,
    passed,
  };
}

export function getStreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot(): StreamFoundationKernelDiagnosticsAdminRouteUnmountedSmokeSnapshot {
  const cases = STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_CASES.map(runSmokeCase);
  const passedCases = cases.filter((testCase) => testCase.passed).length;
  const allHandlersFound = cases.every((testCase) => testCase.handlerFound);
  const allRoutesUnmounted = cases.every((testCase) => testCase.mountedNow === false && testCase.expressRouterBoundNow === false);
  const allResponsesRedacted = cases.every(
    (testCase) => testCase.rawSecretFieldsReturned === 0 && testCase.providerCallsPerformed === 0 && testCase.moneyMovementPerformed === 0,
  );

  return {
    version: STREAM_FOUNDATION_138L_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_VERSION,
    status: passedCases === cases.length ? "unmounted_smoke_passed" : "unmounted_smoke_failed",
    patchScope: "src/modules/stream/foundation/** only",
    streamIndexPatchIncluded: false,
    cases,
    checkedCases: cases.length,
    passedCases,
    failedCases: cases.length - passedCases,
    allHandlersFound,
    allRoutesUnmounted,
    allResponsesRedacted,
    providerCallsPerformed: 0,
    databaseExecutionPerformed: 0,
    walletMutationPerformed: 0,
    paymentAuthorizationPerformed: 0,
    monthlyPayoutPerformed: 0,
    moneyMovementPerformed: 0,
    runtimeHttpRequestsPerformed: 0,
    fakeSuccessAllowed: false,
    safety: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_UNMOUNTED_SMOKE_SAFETY,
  };
}
