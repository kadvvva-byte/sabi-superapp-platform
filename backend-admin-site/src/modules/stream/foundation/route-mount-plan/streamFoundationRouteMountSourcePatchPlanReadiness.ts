import { getStreamFoundationRouteMountSourcePatchPlan } from "./streamFoundationRouteMountSourcePatchPlan";
import { STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE, type StreamFoundationRouteMountSourcePatchPlanReadinessSnapshot } from "./streamFoundationRouteMountSourcePatchPlanTypes";

export function getStreamFoundationRouteMountSourcePatchPlanReadinessSnapshot(): StreamFoundationRouteMountSourcePatchPlanReadinessSnapshot {
  const plan = getStreamFoundationRouteMountSourcePatchPlan();

  return {
    stage: STREAM_FOUNDATION_ROUTE_MOUNT_SOURCE_PATCH_PLAN_STAGE,
    status: "route_mount_source_patch_plan_ready_not_mounted",
    plan,
    coverage: {
      dryRunPackageIncluded: true,
      protectedRoutesIncluded: true,
      securityGuardsIncluded: true,
      safeResponseEnvelopeIncluded: true,
      routeMountFilesPlannedButUntouched: true,
      actualMountCreatedNow: false,
      coveragePercent: 100,
    },
    safety: plan.safety,
  };
}
