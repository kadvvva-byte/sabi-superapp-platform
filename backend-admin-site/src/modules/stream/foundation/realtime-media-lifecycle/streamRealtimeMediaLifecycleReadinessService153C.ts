/**
 * BACKEND-STREAM-FOUNDATION-153C
 * Source-only read-only payload creator for Stream realtime/media lifecycle readiness.
 *
 * No DB, provider, Wallet, money, runtime, route mount, or protected fetch.
 */

import type {
  StreamRealtimeMediaLifecycleComposedSnapshot152C,
} from "./streamRealtimeMediaLifecycleSnapshotComposition152C";

import {
  createStreamRealtimeMediaLifecycleComposedSnapshot152C,
} from "./streamRealtimeMediaLifecycleSnapshotComposition152C";

export type StreamRealtimeMediaLifecycleReadinessInput153C = {
  roomId?: string;
  userId?: string;
  generatedAt?: string;
};

export type StreamRealtimeMediaLifecycleReadinessPayload153C = {
  version: "BACKEND-STREAM-FOUNDATION-153C";
  readOnly: true;
  providerStatus: "provider_not_configured";
  runtimeEnabled: false;
  snapshot: StreamRealtimeMediaLifecycleComposedSnapshot152C;
  adminReadinessSummary: StreamRealtimeMediaLifecycleComposedSnapshot152C["adminReadinessSummary"];
  safeDisabledContract: {
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
  };
  notAllowedNow: {
    routeMountAllowedNow: false;
    runtimeSmokeAllowedNow: false;
    protectedApiFetchAllowedNow: false;
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
  };
  sourceEvidence: {
    snapshotCompositionVersion: "BACKEND-STREAM-FOUNDATION-152C";
    serviceVersion: "BACKEND-STREAM-FOUNDATION-153C";
    routeMountedNow: false;
    sourceOnly: true;
  };
};

export function createStreamRealtimeMediaLifecycleReadinessPayload153C(
  input: StreamRealtimeMediaLifecycleReadinessInput153C = {},
): StreamRealtimeMediaLifecycleReadinessPayload153C {
  const snapshot = createStreamRealtimeMediaLifecycleComposedSnapshot152C({
    roomId: input.roomId,
    userId: input.userId,
    generatedAt: input.generatedAt,
  });

  return {
    version: "BACKEND-STREAM-FOUNDATION-153C",
    readOnly: true,
    providerStatus: "provider_not_configured",
    runtimeEnabled: false,
    snapshot,
    adminReadinessSummary: snapshot.adminReadinessSummary,
    safeDisabledContract: {
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
    },
    notAllowedNow: {
      routeMountAllowedNow: false,
      runtimeSmokeAllowedNow: false,
      protectedApiFetchAllowedNow: false,
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
    },
    sourceEvidence: {
      snapshotCompositionVersion: "BACKEND-STREAM-FOUNDATION-152C",
      serviceVersion: "BACKEND-STREAM-FOUNDATION-153C",
      routeMountedNow: false,
      sourceOnly: true,
    },
  };
}
