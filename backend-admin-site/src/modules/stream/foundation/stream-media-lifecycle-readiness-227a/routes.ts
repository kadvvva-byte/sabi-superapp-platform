import express, { type Router } from "express";
import {
  STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL,
  STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS,
  STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES,
  assertStreamMediaLifecycleReadiness227ARemainsSafe,
  createStreamMediaRuntimeStartRequest227A,
  createStreamProviderMediaSessionRequest227A,
  createStreamRecordingRuntimeStartRequest227A,
  createStreamUploadTranscodePublishRequest227A,
  getStreamMediaLifecycleReadiness227ASnapshot,
  prepareStreamMediaLifecycleReadiness227A,
} from "./service";

export function createStreamMediaLifecycleReadiness227ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/media/227a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamMediaLifecycleReadiness227ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamMediaLifecycleReadiness227ARemainsSafe());
  });

  router.get(`${basePath}/media-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamMediaLifecycleReadiness227ASnapshot().version,
      contract: "stream.media.lifecycle-readiness.safe_disabled.v1",
      requiredArtifacts: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES,
      cameraCaptureBoundaryVisible: true,
      microphoneCaptureBoundaryVisible: true,
      screenShareBoundaryVisible: true,
      recordingBoundaryVisible: true,
      mediaStorageCdnBoundaryVisible: true,
      providerMediaSessionBoundaryVisible: true,
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

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamMediaLifecycleReadiness227A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_MEDIA_LIFECYCLE_READINESS_227A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "media_lifecycle_readiness_index_only",
      acknowledged226BStage: req.body?.acknowledged226BStage ?? "226B_realtime_events_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["226B_checker_passed_147_of_147"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_MEDIA_LIFECYCLE_READINESS_227A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/media-runtime-start-request`, (_req, res) => {
    res.status(423).json(createStreamMediaRuntimeStartRequest227A());
  });

  router.post(`${basePath}/recording-runtime-start-request`, (_req, res) => {
    res.status(423).json(createStreamRecordingRuntimeStartRequest227A());
  });

  router.post(`${basePath}/upload-transcode-publish-request`, (_req, res) => {
    res.status(423).json(createStreamUploadTranscodePublishRequest227A());
  });

  router.post(`${basePath}/provider-media-session-request`, (_req, res) => {
    res.status(423).json(createStreamProviderMediaSessionRequest227A());
  });

  return router;
}
