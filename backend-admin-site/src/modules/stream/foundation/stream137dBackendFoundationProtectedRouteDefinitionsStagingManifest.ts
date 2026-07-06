import { getStreamFoundationProtectedRouteDefinitionsReadinessSnapshot } from "./route-definitions";

export const STREAM_137D_BACKEND_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGING_VERSION = "BACKEND-STREAM-FOUNDATION-137D" as const;

export function getStream137DBackendFoundationProtectedRouteDefinitionsStagingManifest() {
  const readiness = getStreamFoundationProtectedRouteDefinitionsReadinessSnapshot();
  return {
    version: STREAM_137D_BACKEND_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGING_VERSION,
    status: "protected_stream_api_route_definitions_ready_not_mounted",
    scope: "local_staging_only",
    readiness,
    summary: {
      totalDefinitions: readiness.totalDefinitions,
      protectedDefinitions: readiness.protectedDefinitions,
      mountedDefinitionsNow: readiness.mountedDefinitionsNow,
      monetizationDefinitions: readiness.monetizationDefinitions,
      adminDefinitions: readiness.adminDefinitions,
      blockedUntilProviderWalletLedger: readiness.blockedUntilProviderWalletLedger,
    },
    nextStage: "BACKEND-STREAM-FOUNDATION-137E protected route smoke matrix staging",
    safety: readiness.safety,
  } as const;
}

export const STREAM_137D_BACKEND_FOUNDATION_PROTECTED_ROUTE_DEFINITIONS_STAGING_MANIFEST = getStream137DBackendFoundationProtectedRouteDefinitionsStagingManifest();
