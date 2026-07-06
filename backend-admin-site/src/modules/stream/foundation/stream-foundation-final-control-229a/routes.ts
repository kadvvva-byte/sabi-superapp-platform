import express, { type Router } from "express";
import {
  STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL,
  STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS,
  STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES,
  assertStreamFoundationFinalControl229ARemainsSafe,
  createStreamFoundationDbRuntimeRequest229A,
  createStreamFoundationProviderRuntimeRequest229A,
  createStreamFoundationRealtimeRuntimeRequest229A,
  createStreamFoundationRuntimeEnablementRequest229A,
  getStreamFoundationFinalControl229ASnapshot,
  prepareStreamFoundationFinalControl229A,
} from "./service";

export function createStreamFoundationFinalControl229ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/final-control/229a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamFoundationFinalControl229ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamFoundationFinalControl229ARemainsSafe());
  });

  router.get(`${basePath}/control-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamFoundationFinalControl229ASnapshot().version,
      contract: "stream.foundation.final-readiness-control.safe_disabled.v1",
      requiredArtifacts: STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES,
      roomsLifecycleFinalHandoff225BLocked: true,
      realtimeEventsFinalHandoff226BLocked: true,
      mediaLifecycleFinalHandoff227BLocked: true,
      moderationSafetyFinalHandoff228BLocked: true,
      providerNotConfiguredVisible: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamFoundationFinalControl229A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_FOUNDATION_FINAL_CONTROL_229A_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "foundation_final_readiness_control_only",
      acknowledged224AStage: req.body?.acknowledged224AStage ?? "224A_gift_ledger_closure_clean",
      acknowledged225BStage: req.body?.acknowledged225BStage ?? "225B_rooms_lifecycle_final_handoff_clean",
      acknowledged226BStage: req.body?.acknowledged226BStage ?? "226B_realtime_events_final_handoff_clean",
      acknowledged227BStage: req.body?.acknowledged227BStage ?? "227B_media_lifecycle_final_handoff_clean",
      acknowledged228BStage: req.body?.acknowledged228BStage ?? "228B_moderation_safety_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["224A_passed_122", "225B_passed_128", "226B_passed_147", "227B_passed_147", "228B_passed_149"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_FOUNDATION_FINAL_CONTROL_229A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamFoundationRuntimeEnablementRequest229A());
  });

  router.post(`${basePath}/provider-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamFoundationProviderRuntimeRequest229A());
  });

  router.post(`${basePath}/db-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamFoundationDbRuntimeRequest229A());
  });

  router.post(`${basePath}/realtime-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamFoundationRealtimeRuntimeRequest229A());
  });

  return router;
}
