/**
 * BACKEND-STREAM-FOUNDATION-152C
 * Stream realtime/media lifecycle source-only snapshot composition.
 *
 * This composition layer is deterministic and safe-disabled:
 * - no route mount
 * - no runtime start
 * - no provider calls
 * - no database access
 * - no Wallet or money movement
 */

import type {
  StreamRealtimeMediaLifecycleSnapshot151C,
  StreamSafeDisabledBoundary151C,
} from "./streamRealtimeMediaLifecycleContracts151C";

import {
  createStreamRealtimeMediaLifecycleSnapshot151C,
  createStreamSafeDisabledBoundary151C,
} from "./streamRealtimeMediaLifecycleService151C";

export type StreamRealtimeMediaLifecycleSnapshotInput152C = {
  roomId?: string;
  userId?: string;
  generatedAt?: string;
};

export type StreamRealtimeMediaLifecycleAdminReadinessSummary152C = {
  version: "BACKEND-STREAM-FOUNDATION-152C";
  status: "source_only_snapshot_ready";
  providerStatus: "provider_not_configured";
  runtimeEnabled: false;
  providerCallAllowedNow: false;
  providerBindingAllowedNow: false;
  providerCredentialReadAllowedNow: false;
  providerTokenIssueAllowedNow: false;
  mediaRoomCreateAllowedNow: false;
  realtimeGatewayStartAllowedNow: false;
  recordingStartAllowedNow: false;
  databaseWriteAllowedNow: false;
  walletMutationAllowedNow: false;
  moneyMovementAllowedNow: false;
  fakeSuccessAllowedNow: false;
  routeMountAllowedNow: false;
  runtimeSmokeAllowedNow: false;
  protectedApiFetchAllowedNow: false;
  adminUiPatchAllowedNow: false;
  mobileTouchAllowedNow: false;
  reason: "provider_not_configured_safe_disabled_source_only";
  evidenceMode: "metadata_only";
};

export type StreamRealtimeMediaLifecycleComposedSnapshot152C = {
  version: "BACKEND-STREAM-FOUNDATION-152C";
  generatedAt: string;
  safeDisabledBoundary: StreamSafeDisabledBoundary151C;
  roomLifecycle: StreamRealtimeMediaLifecycleSnapshot151C["roomLifecycle"];
  participantSession: StreamRealtimeMediaLifecycleSnapshot151C["participantSession"];
  realtimeEvent: StreamRealtimeMediaLifecycleSnapshot151C["realtimeEvent"];
  mediaSession: StreamRealtimeMediaLifecycleSnapshot151C["mediaSession"];
  moderationSignal: StreamRealtimeMediaLifecycleSnapshot151C["moderationSignal"];
  providerBoundary: StreamRealtimeMediaLifecycleSnapshot151C["providerBoundary"];
  businessStream: StreamRealtimeMediaLifecycleSnapshot151C["businessStream"];
  shortsDeferredPublish: StreamRealtimeMediaLifecycleSnapshot151C["shortsDeferredPublish"];
  adminReadinessSummary: StreamRealtimeMediaLifecycleAdminReadinessSummary152C;
};

export function createStreamRealtimeMediaLifecycleAdminReadinessSummary152C(
  boundary: StreamSafeDisabledBoundary151C = createStreamSafeDisabledBoundary151C(),
): StreamRealtimeMediaLifecycleAdminReadinessSummary152C {
  return {
    version: "BACKEND-STREAM-FOUNDATION-152C",
    status: "source_only_snapshot_ready",
    providerStatus: boundary.providerStatus,
    runtimeEnabled: false,
    providerCallAllowedNow: false,
    providerBindingAllowedNow: false,
    providerCredentialReadAllowedNow: false,
    providerTokenIssueAllowedNow: false,
    mediaRoomCreateAllowedNow: false,
    realtimeGatewayStartAllowedNow: false,
    recordingStartAllowedNow: false,
    databaseWriteAllowedNow: false,
    walletMutationAllowedNow: false,
    moneyMovementAllowedNow: false,
    fakeSuccessAllowedNow: false,
    routeMountAllowedNow: false,
    runtimeSmokeAllowedNow: false,
    protectedApiFetchAllowedNow: false,
    adminUiPatchAllowedNow: false,
    mobileTouchAllowedNow: false,
    reason: "provider_not_configured_safe_disabled_source_only",
    evidenceMode: "metadata_only",
  };
}

export function createStreamRealtimeMediaLifecycleComposedSnapshot152C(
  input: StreamRealtimeMediaLifecycleSnapshotInput152C = {},
): StreamRealtimeMediaLifecycleComposedSnapshot152C {
  const safeDisabledBoundary = createStreamSafeDisabledBoundary151C();

  const snapshot151C = createStreamRealtimeMediaLifecycleSnapshot151C({
    roomId: input.roomId,
    userId: input.userId,
    generatedAt: input.generatedAt,
  });

  return {
    version: "BACKEND-STREAM-FOUNDATION-152C",
    generatedAt: input.generatedAt ?? snapshot151C.generatedAt,
    safeDisabledBoundary,
    roomLifecycle: snapshot151C.roomLifecycle,
    participantSession: snapshot151C.participantSession,
    realtimeEvent: snapshot151C.realtimeEvent,
    mediaSession: snapshot151C.mediaSession,
    moderationSignal: snapshot151C.moderationSignal,
    providerBoundary: snapshot151C.providerBoundary,
    businessStream: snapshot151C.businessStream,
    shortsDeferredPublish: snapshot151C.shortsDeferredPublish,
    adminReadinessSummary: createStreamRealtimeMediaLifecycleAdminReadinessSummary152C(safeDisabledBoundary),
  };
}
