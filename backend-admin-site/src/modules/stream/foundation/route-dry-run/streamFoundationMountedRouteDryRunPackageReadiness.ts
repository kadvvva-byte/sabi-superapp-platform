import { getStreamFoundationMountedRouteDryRunPackage } from "./streamFoundationMountedRouteDryRunPackage";
import { STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE, type StreamFoundationMountedRouteDryRunReadinessSnapshot } from "./streamFoundationMountedRouteDryRunPackageTypes";

export function getStreamFoundationMountedRouteDryRunReadinessSnapshot(): StreamFoundationMountedRouteDryRunReadinessSnapshot {
  const dryRunPackage = getStreamFoundationMountedRouteDryRunPackage();

  return {
    stage: STREAM_FOUNDATION_MOUNTED_ROUTE_DRY_RUN_PACKAGE_STAGE,
    status: "mounted_route_dry_run_package_ready_not_mounted",
    dryRunPackage,
    coverage: {
      protectedHandlerBindingsIncluded: true,
      liveRoutesIncluded: true,
      shortsRoutesIncluded: true,
      giftsRoutesIncluded: true,
      adminMonetizationRoutesIncluded: true,
      monthlyPayoutRoutesIncluded: true,
      securityGuardsIncluded: true,
      safeResponseEnvelopeIncluded: true,
      actualMountCreatedNow: false,
      coveragePercent: 100,
    },
    safety: dryRunPackage.safety,
  };
}
