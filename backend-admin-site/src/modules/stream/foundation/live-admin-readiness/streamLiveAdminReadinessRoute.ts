// BACKEND-STREAM-FOUNDATION-147G
// Unmounted read-only Express route factory for future Admin visibility.
// This file must not be mounted until a separate approval stage.

import { Router, type RequestHandler } from "express";
import {
  STREAM_LIVE_ADMIN_READINESS_EXPECTED_MOUNT_PREFIX,
  STREAM_LIVE_ADMIN_READINESS_ROUTE_PATH,
} from "./streamLiveAdminReadinessContracts";
import { createStreamLiveAdminReadinessSnapshot147G } from "./streamLiveAdminReadinessService";

export const streamLiveAdminReadinessRoute147GIsMountedNow = false as const;

export const streamLiveAdminReadinessRoute147GMetadata = {
  expectedMountPrefix: STREAM_LIVE_ADMIN_READINESS_EXPECTED_MOUNT_PREFIX,
  routePath: STREAM_LIVE_ADMIN_READINESS_ROUTE_PATH,
  readOnly: true,
  routeMountedNow: false,
  providerStatus: "provider_not_configured",
  runtimeEnabled: false,
  providerCallAllowedNow: false,
  providerBindingAllowedNow: false,
  providerCredentialReadAllowedNow: false,
  providerTokenIssueAllowedNow: false,
  mediaRoomCreateAllowedNow: false,
  dbWriteAllowedNow: false,
  walletMutationAllowedNow: false,
  moneyMovementAllowedNow: false,
  fakeSuccessAllowedNow: false,
} as const;

export function createStreamLiveAdminReadinessRoute147G(): Router {
  const router = Router();

  const readinessHandler: RequestHandler = (_req, res) => {
    const snapshot = createStreamLiveAdminReadinessSnapshot147G();

    res.status(200).json({
      ...snapshot,
      routeMetadata: streamLiveAdminReadinessRoute147GMetadata,
    });
  };

  router.get(STREAM_LIVE_ADMIN_READINESS_ROUTE_PATH, readinessHandler);

  return router;
}
