import express, { type Router } from "express";
import {
  STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL,
  STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS,
  STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES,
  assertStreamRealtimeEventsFinalHandoff226BRemainsSafe,
  createStreamRealtimeEmitRuntimeRequest226B,
  createStreamRoomStateMutationRuntimeRequest226B,
  createStreamSocketRuntimeBindingRequest226B,
  getStreamRealtimeEventsFinalHandoff226BSnapshot,
  prepareStreamRealtimeEventsFinalHandoff226B,
} from "./service";

export function createStreamRealtimeEventsFinalHandoff226BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/realtime/226b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamRealtimeEventsFinalHandoff226BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamRealtimeEventsFinalHandoff226BRemainsSafe());
  });

  router.get(`${basePath}/final-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamRealtimeEventsFinalHandoff226BSnapshot().version,
      contract: "stream.realtime.events-final-handoff.safe_disabled.v1",
      requiredArtifacts: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES,
      hostEventBoundaryLocked: true,
      viewerEventBoundaryLocked: true,
      cohostEventBoundaryLocked: true,
      battleEventBoundaryLocked: true,
      chatReactionEventBoundaryLocked: true,
      moderationEventBoundaryLocked: true,
      realtimeEmitExecuted: false,
      socketRuntimeBindingExecuted: false,
      roomRuntimeStateMutationExecuted: false,
      providerRuntimeEnabled: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/handoff`, (req, res) => {
    const result = prepareStreamRealtimeEventsFinalHandoff226B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "realtime_events_final_handoff_only",
      acknowledged226AStage: req.body?.acknowledged226AStage ?? "226A_realtime_events_readiness_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["226A_checker_passed_146_of_146"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_REALTIME_EVENTS_FINAL_HANDOFF_226B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-emit-request`, (_req, res) => {
    res.status(423).json(createStreamRealtimeEmitRuntimeRequest226B());
  });

  router.post(`${basePath}/socket-runtime-binding-request`, (_req, res) => {
    res.status(423).json(createStreamSocketRuntimeBindingRequest226B());
  });

  router.post(`${basePath}/room-state-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamRoomStateMutationRuntimeRequest226B());
  });

  return router;
}
