import express, { type Router } from "express";
import {
  STREAM_ROOMS_LIFECYCLE_READINESS_225A_OWNER_APPROVAL,
  assertStreamRoomsLifecycle225ARemainsSafe,
  createStreamRoomsRuntimeCreateRequest225A,
  createStreamRoomsRuntimeEndRequest225A,
  createStreamRoomsRuntimeJoinRequest225A,
  getStreamRoomsLifecycleReadiness225ASnapshot,
  prepareStreamRoomsLifecycleReadiness225A,
  STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS,
  STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES,
} from "./service";

export function createStreamRoomsLifecycleReadiness225ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/rooms/225a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamRoomsLifecycleReadiness225ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamRoomsLifecycle225ARemainsSafe());
  });

  router.get(`${basePath}/lifecycle-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamRoomsLifecycleReadiness225ASnapshot().version,
      contract: "stream.rooms.lifecycle-readiness.safe_disabled.v1",
      requiredArtifacts: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES,
      runtimeRoomCreateExecuted: false,
      runtimeRoomJoinExecuted: false,
      runtimeRoomEndExecuted: false,
      realtimeEmitExecuted: false,
      providerRoomCallExecuted: false,
      dbReadPerformed: false,
      dbWritePerformed: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamRoomsLifecycleReadiness225A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ROOMS_LIFECYCLE_READINESS_225A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "rooms_lifecycle_readiness_index_only",
      acknowledged224AStage: req.body?.acknowledged224AStage ?? "224A_gift_ledger_closure_marker_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["224A_checker_passed_122_of_122"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ROOMS_LIFECYCLE_READINESS_225A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-room-create-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeCreateRequest225A());
  });

  router.post(`${basePath}/runtime-room-join-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeJoinRequest225A());
  });

  router.post(`${basePath}/runtime-room-end-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeEndRequest225A());
  });

  return router;
}
