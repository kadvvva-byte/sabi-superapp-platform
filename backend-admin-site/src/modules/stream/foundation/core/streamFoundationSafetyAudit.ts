import { STREAM_FOUNDATION_SAFE_SNAPSHOT } from "./streamFoundationCoreTypes";
import { STREAM_FOUNDATION_ACTION_POLICIES } from "./streamFoundationGatePolicy";
import { getStreamFoundationReadinessIndex } from "./streamFoundationReadinessIndex";

export type StreamFoundationSafetyAudit = Readonly<{
  stage: "BACKEND_STREAM_FOUNDATION_SAFETY_AUDIT_SOURCE_ONLY";
  passed: boolean;
  violations: readonly string[];
  checked: Readonly<{
    actionPolicies: number;
    sourceOnlySafetySnapshot: true;
    routeMountAllowedNow: false;
    runtimeExecutionAllowedNow: false;
    databaseWriteAllowedNow: false;
    providerCallAllowedNow: false;
    fakeSuccessAllowed: false;
    readinessRuntimeReadyActions: 0;
  }>;
}>;

export function getStreamFoundationSafetyAudit(): StreamFoundationSafetyAudit {
  const violations: string[] = [];
  const readiness = getStreamFoundationReadinessIndex();

  if (!STREAM_FOUNDATION_SAFE_SNAPSHOT.sourceOnlyNow) violations.push("source_only_snapshot_not_locked");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.routeMountAllowedNow) violations.push("route_mount_enabled_too_early");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.runtimeExecutionAllowedNow) violations.push("runtime_execution_enabled_too_early");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.databaseWriteAllowedNow) violations.push("database_write_enabled_too_early");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.providerCallAllowedNow) violations.push("provider_call_enabled_too_early");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakeLiveAllowed) violations.push("fake_live_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakeUploadAllowed) violations.push("fake_upload_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakePublishAllowed) violations.push("fake_publish_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakePlaybackAllowed) violations.push("fake_playback_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakeAnalyticsAllowed) violations.push("fake_analytics_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakeModerationAllowed) violations.push("fake_moderation_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakePaymentAllowed) violations.push("fake_payment_enabled");
  if (STREAM_FOUNDATION_SAFE_SNAPSHOT.fakeGiftAllowed) violations.push("fake_gift_enabled");
  if (readiness.runtimeExecutionReadyActions !== 0) violations.push("runtime_actions_marked_ready_too_early");

  return {
    stage: "BACKEND_STREAM_FOUNDATION_SAFETY_AUDIT_SOURCE_ONLY",
    passed: violations.length === 0,
    violations,
    checked: {
      actionPolicies: STREAM_FOUNDATION_ACTION_POLICIES.length,
      sourceOnlySafetySnapshot: STREAM_FOUNDATION_SAFE_SNAPSHOT.sourceOnlyNow,
      routeMountAllowedNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.routeMountAllowedNow,
      runtimeExecutionAllowedNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.runtimeExecutionAllowedNow,
      databaseWriteAllowedNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.databaseWriteAllowedNow,
      providerCallAllowedNow: STREAM_FOUNDATION_SAFE_SNAPSHOT.providerCallAllowedNow,
      fakeSuccessAllowed: false,
      readinessRuntimeReadyActions: readiness.runtimeExecutionReadyActions,
    },
  };
}
