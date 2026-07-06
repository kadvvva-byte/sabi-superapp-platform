/**
 * BACKEND-STREAM-FOUNDATION-153C
 * Source-only unmounted route factory for future Admin visibility.
 *
 * This file defines a route factory only. It does not mount itself.
 */

import {
  createStreamRealtimeMediaLifecycleReadinessPayload153C,
  type StreamRealtimeMediaLifecycleReadinessPayload153C,
} from "./streamRealtimeMediaLifecycleReadinessService153C";

export const STREAM_REALTIME_MEDIA_LIFECYCLE_READINESS_ROUTE_PATH_153C =
  "/stream/realtime-media-lifecycle/readiness" as const;

export type StreamRealtimeMediaLifecycleReadinessRequest153C = {
  query?: {
    roomId?: string;
    userId?: string;
    generatedAt?: string;
  };
};

export type StreamRealtimeMediaLifecycleReadinessResponse153C = {
  status?: (code: number) => StreamRealtimeMediaLifecycleReadinessResponse153C;
  json?: (body: StreamRealtimeMediaLifecycleReadinessPayload153C) => unknown;
};

export type StreamRealtimeMediaLifecycleReadinessHandler153C = (
  request: StreamRealtimeMediaLifecycleReadinessRequest153C,
  response: StreamRealtimeMediaLifecycleReadinessResponse153C,
) => unknown;

export type StreamRealtimeMediaLifecycleReadinessRouterLike153C = {
  get: (
    path: typeof STREAM_REALTIME_MEDIA_LIFECYCLE_READINESS_ROUTE_PATH_153C,
    handler: StreamRealtimeMediaLifecycleReadinessHandler153C,
  ) => unknown;
};

function cleanOptionalString153C(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

export function createStreamRealtimeMediaLifecycleReadinessRoute153C(
  router: StreamRealtimeMediaLifecycleReadinessRouterLike153C,
): StreamRealtimeMediaLifecycleReadinessRouterLike153C {
  router.get(STREAM_REALTIME_MEDIA_LIFECYCLE_READINESS_ROUTE_PATH_153C, (request, response) => {
    const payload = createStreamRealtimeMediaLifecycleReadinessPayload153C({
      roomId: cleanOptionalString153C(request.query?.roomId),
      userId: cleanOptionalString153C(request.query?.userId),
      generatedAt: cleanOptionalString153C(request.query?.generatedAt),
    });

    const responseTarget =
      typeof response.status === "function" ? response.status(200) : response;

    if (typeof responseTarget.json === "function") {
      return responseTarget.json(payload);
    }

    return payload;
  });

  return router;
}

export const streamRealtimeMediaLifecycleReadinessRouteMetadata153C = Object.freeze({
  version: "BACKEND-STREAM-FOUNDATION-153C",
  method: "GET",
  path: STREAM_REALTIME_MEDIA_LIFECYCLE_READINESS_ROUTE_PATH_153C,
  futureFullAdminPathIfMountedLater: "/api/admin/stream/realtime-media-lifecycle/readiness",
  readOnly: true,
  routeMountedNow: false,
  runtimeEnabled: false,
  providerStatus: "provider_not_configured",
  providerCallAllowedNow: false,
  databaseWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowedNow: false,
});
