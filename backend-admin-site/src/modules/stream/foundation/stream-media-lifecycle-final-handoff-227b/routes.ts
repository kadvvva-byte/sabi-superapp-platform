import express, { type Router } from "express";
import {
  STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_OWNER_APPROVAL,
  STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS,
  STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES,
  assertStreamMediaLifecycleFinalHandoff227BRemainsSafe,
  createStreamMediaRuntimeStartRequest227B,
  createStreamProviderMediaSessionRequest227B,
  createStreamRecordingRuntimeStartRequest227B,
  createStreamUploadTranscodePublishRequest227B,
  getStreamMediaLifecycleFinalHandoff227BSnapshot,
  prepareStreamMediaLifecycleFinalHandoff227B,
} from "./service";

export function createStreamMediaLifecycleFinalHandoff227BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/media/227b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamMediaLifecycleFinalHandoff227BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamMediaLifecycleFinalHandoff227BRemainsSafe());
  });

  router.get(`${basePath}/media-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamMediaLifecycleFinalHandoff227BSnapshot().version,
      contract: "stream.media.lifecycle-final-handoff.safe_disabled.v1",
      requiredArtifacts: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES,
      cameraCaptureBoundaryLocked: true,
      microphoneCaptureBoundaryLocked: true,
      screenShareBoundaryLocked: true,
      recordingBoundaryLocked: true,
      mediaStorageCdnBoundaryLocked: true,
      providerMediaSessionBoundaryLocked: true,
      mediaRuntimeStarted: false,
      recordingRuntimeStarted: false,
      mediaUploadRuntimeExecuted: false,
      mediaTranscodeRuntimeExecuted: false,
      cdnPublishRuntimeExecuted: false,
      providerRuntimeEnabled: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/handoff`, (req, res) => {
    const result = prepareStreamMediaLifecycleFinalHandoff227B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "media_lifecycle_final_handoff_only",
      acknowledged227AStage: req.body?.acknowledged227AStage ?? "227A_media_lifecycle_readiness_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["227A_checker_passed_146_of_146"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_MEDIA_LIFECYCLE_FINAL_HANDOFF_227B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/media-runtime-start-request`, (_req, res) => {
    res.status(423).json(createStreamMediaRuntimeStartRequest227B());
  });

  router.post(`${basePath}/recording-runtime-start-request`, (_req, res) => {
    res.status(423).json(createStreamRecordingRuntimeStartRequest227B());
  });

  router.post(`${basePath}/upload-transcode-publish-request`, (_req, res) => {
    res.status(423).json(createStreamUploadTranscodePublishRequest227B());
  });

  router.post(`${basePath}/provider-media-session-request`, (_req, res) => {
    res.status(423).json(createStreamProviderMediaSessionRequest227B());
  });

  return router;
}
