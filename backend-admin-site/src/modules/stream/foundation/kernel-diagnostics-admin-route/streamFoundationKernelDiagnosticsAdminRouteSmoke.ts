import { STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION } from "./streamFoundationKernelDiagnosticsAdminRouteContracts";
import { STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS } from "./streamFoundationKernelDiagnosticsAdminRouteDefinitions";
import { getStreamFoundationKernelDiagnosticsAdminRouteReadiness } from "./streamFoundationKernelDiagnosticsAdminRouteReadiness";
import { previewStreamFoundationKernelDiagnosticsAdminRoute } from "./streamFoundationKernelDiagnosticsAdminRoutePreview";

export interface StreamFoundationKernelDiagnosticsAdminRouteSmoke {
  readonly version: typeof STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION;
  readonly streamIndexPatchIncluded: false;
  readonly passed: boolean;
  readonly checks: readonly {
    readonly name: string;
    readonly passed: boolean;
  }[];
}

export function getStreamFoundationKernelDiagnosticsAdminRouteSmoke(): StreamFoundationKernelDiagnosticsAdminRouteSmoke {
  const readiness = getStreamFoundationKernelDiagnosticsAdminRouteReadiness();
  const okPreview = previewStreamFoundationKernelDiagnosticsAdminRoute({
    routeId: "stream_kernel_diagnostics_snapshot",
    adminUserId: "admin-smoke-user",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: false,
  });
  const missingScopePreview = previewStreamFoundationKernelDiagnosticsAdminRoute({
    routeId: "stream_kernel_diagnostics_safe_summary",
    adminUserId: "admin-smoke-user",
    scopes: ["admin:stream:read", "admin:stream:diagnostics:read"],
    routeMountApproved: false,
  });
  const checks = [
    { name: "route_definitions_exist", passed: STREAM_FOUNDATION_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_DEFINITIONS.length === 4 },
    { name: "all_routes_unmounted", passed: readiness.allRoutesUnmounted },
    { name: "all_routes_admin_protected", passed: readiness.allRoutesAdminProtected },
    { name: "all_routes_redacted", passed: readiness.allRoutesRedacted },
    { name: "safe_preview_ok", passed: okPreview.ok === true && okPreview.rawSecretFieldsReturned === 0 },
    { name: "missing_scope_blocked", passed: missingScopePreview.ok === false && missingScopePreview.safeCode === "stream_kernel_diagnostics_admin_scope_missing" },
    { name: "app_server_untouched", passed: readiness.appServerUntouched },
    { name: "provider_calls_blocked", passed: readiness.providerCallsBlocked },
    { name: "database_writes_blocked", passed: readiness.databaseWritesBlocked },
    { name: "money_movement_blocked", passed: readiness.moneyMovementBlocked },
    { name: "fake_success_blocked", passed: readiness.fakeSuccessBlocked },
  ] as const;
  return {
    version: STREAM_FOUNDATION_138J_KERNEL_DIAGNOSTICS_ADMIN_ROUTE_VERSION,
    streamIndexPatchIncluded: false,
    passed: checks.every((check) => check.passed),
    checks,
  };
}
