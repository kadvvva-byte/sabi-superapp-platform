import express, { type Router } from "express";
import {
  STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL,
  STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS,
  STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES,
  assertStreamRealtimeEventsReadiness226ARemainsSafe,
  createStreamRealtimeEmitRuntimeRequest226A,
  createStreamRoomStateMutationRuntimeRequest226A,
  createStreamSocketRuntimeBindingRequest226A,
  getStreamRealtimeEventsReadiness226ASnapshot,
  prepareStreamRealtimeEventsReadiness226A,
} from "./service";

export function createStreamRealtimeEventsReadiness226ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/realtime/226a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamRealtimeEventsReadiness226ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamRealtimeEventsReadiness226ARemainsSafe());
  });

  router.get(`${basePath}/event-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamRealtimeEventsReadiness226ASnapshot().version,
      contract: "stream.realtime.events-readiness.safe_disabled.v1",
      requiredArtifacts: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES,
      hostEventBoundaryVisible: true,
      viewerEventBoundaryVisible: true,
      cohostEventBoundaryVisible: true,
      battleEventBoundaryVisible: true,
      chatReactionEventBoundaryVisible: true,
      moderationEventBoundaryVisible: true,
      realtimeEmitExecuted: false,
      socketRuntimeBindingExecuted: false,
      roomRuntimeStateMutationExecuted: false,
      providerRuntimeEnabled: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamRealtimeEventsReadiness226A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_REALTIME_EVENTS_READINESS_226A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "realtime_events_readiness_index_only",
      acknowledged225BStage: req.body?.acknowledged225BStage ?? "225B_rooms_lifecycle_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["225B_checker_passed_128_of_128"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_REALTIME_EVENTS_READINESS_226A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-emit-request`, (_req, res) => {
    res.status(423).json(createStreamRealtimeEmitRuntimeRequest226A());
  });

  router.post(`${basePath}/socket-runtime-binding-request`, (_req, res) => {
    res.status(423).json(createStreamSocketRuntimeBindingRequest226A());
  });

  router.post(`${basePath}/room-state-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamRoomStateMutationRuntimeRequest226A());
  });

  return router;
}
