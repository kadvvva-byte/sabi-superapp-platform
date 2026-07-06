import {
  getStreamFoundationUnmountedRouteModuleSmokeCases,
  getStreamFoundationUnmountedRouteModuleSmokeRequiredBeforeLiveMount,
  getStreamFoundationUnmountedRouteModuleSmokeSafetyPolicy,
  summarizeStreamFoundationUnmountedRouteModuleSmokeCases,
} from "./streamFoundationUnmountedRouteModuleSmoke";
import {
  STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE,
  type StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot,
} from "./streamFoundationUnmountedRouteModuleSmokeTypes";

function statusFor(summary: StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot["summary"]): StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot["status"] {
  if (summary.blockedCases > 0) return "unmounted_route_module_smoke_blocked";
  if (summary.reviewRequiredCases > 0) return "unmounted_route_module_smoke_review_required";
  return "unmounted_route_module_smoke_passed_not_mounted";
}

export function getStreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot(): StreamFoundationUnmountedRouteModuleSmokeReadinessSnapshot {
  const cases = getStreamFoundationUnmountedRouteModuleSmokeCases();
  const summary = summarizeStreamFoundationUnmountedRouteModuleSmokeCases(cases);
  return {
    stage: STREAM_FOUNDATION_UNMOUNTED_ROUTE_MODULE_SMOKE_STAGE,
    status: statusFor(summary),
    cases,
    summary,
    requiredBeforeLiveMount: getStreamFoundationUnmountedRouteModuleSmokeRequiredBeforeLiveMount(),
    safety: getStreamFoundationUnmountedRouteModuleSmokeSafetyPolicy(),
  };
}
