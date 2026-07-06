import express, { type Router } from "express";
import {
  STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_OWNER_APPROVAL,
  STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS,
  STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES,
  assertStreamRoomsLifecycleFinalHandoff225BRemainsSafe,
  createStreamRoomsRuntimeCreateRequest225B,
  createStreamRoomsRuntimeEndRequest225B,
  createStreamRoomsRuntimeJoinRequest225B,
  getStreamRoomsLifecycleFinalHandoff225BSnapshot,
  prepareStreamRoomsLifecycleFinalHandoff225B,
} from "./service";

export function createStreamRoomsLifecycleFinalHandoff225BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/rooms/225b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamRoomsLifecycleFinalHandoff225BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamRoomsLifecycleFinalHandoff225BRemainsSafe());
  });

  router.get(`${basePath}/final-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamRoomsLifecycleFinalHandoff225BSnapshot().version,
      contract: "stream.rooms.lifecycle-final-handoff.safe_disabled.v1",
      requiredArtifacts: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES,
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

  router.post(`${basePath}/handoff`, (req, res) => {
    const result = prepareStreamRoomsLifecycleFinalHandoff225B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "rooms_lifecycle_final_handoff_only",
      acknowledged225AStage: req.body?.acknowledged225AStage ?? "225A_FIX1_rooms_lifecycle_readiness_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["225A_FIX1_checker_passed_151_of_151"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ROOMS_LIFECYCLE_FINAL_HANDOFF_225B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-room-create-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeCreateRequest225B());
  });

  router.post(`${basePath}/runtime-room-join-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeJoinRequest225B());
  });

  router.post(`${basePath}/runtime-room-end-request`, (_req, res) => {
    res.status(423).json(createStreamRoomsRuntimeEndRequest225B());
  });

  return router;
}
