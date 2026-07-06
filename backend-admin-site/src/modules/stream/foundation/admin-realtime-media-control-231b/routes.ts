import express, { type Router } from "express";
import {
  STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL,
  STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES,
  assertStreamAdminRealtimeMediaControl231BRemainsSafe,
  createStreamAdminMediaRuntimeRequest231B,
  createStreamAdminProviderRealtimeMediaCallRequest231B,
  createStreamAdminRealtimeEmitRequest231B,
  createStreamAdminRealtimeMediaDbMutationRequest231B,
  createStreamAdminRecordingRequest231B,
  createStreamAdminSocketBindingRequest231B,
  createStreamAdminUploadTranscodeCdnPublishRequest231B,
  getStreamAdminRealtimeMediaControl231BSnapshot,
  prepareStreamAdminRealtimeMediaControl231B,
} from "./service";

export function createStreamAdminRealtimeMediaControl231BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/admin-realtime-media/control/231b";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminRealtimeMediaControl231BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminRealtimeMediaControl231BRemainsSafe());
  });

  router.get(`${basePath}/control-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminRealtimeMediaControl231BSnapshot().version,
      contract: "admin.stream.realtime-media.control.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES,
      providerNotConfiguredVisible: true,
      realtimeEventStatusVisible: true,
      socketBindingControlVisible: true,
      realtimeEmitControlVisible: true,
      recordingControlVisible: true,
      mediaStorageCdnControlVisible: true,
      adminRealtimeMediaRuntimeTogglesLocked: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminRealtimeMediaControl231B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "admin_realtime_media_control_visibility_only",
      acknowledged230BStage: req.body?.acknowledged230BStage ?? "230B_admin_provider_runtime_control_clean",
      acknowledged226BStage: req.body?.acknowledged226BStage ?? "226B_realtime_events_final_handoff_clean",
      acknowledged227BStage: req.body?.acknowledged227BStage ?? "227B_media_lifecycle_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["230B_passed_141", "226B_passed_147", "227B_passed_147", "229A_passed_153"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ADMIN_REALTIME_MEDIA_CONTROL_231B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/realtime-emit-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRealtimeEmitRequest231B());
  });

  router.post(`${basePath}/socket-binding-request`, (_req, res) => {
    res.status(423).json(createStreamAdminSocketBindingRequest231B());
  });

  router.post(`${basePath}/media-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamAdminMediaRuntimeRequest231B());
  });

  router.post(`${basePath}/recording-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRecordingRequest231B());
  });

  router.post(`${basePath}/upload-transcode-cdn-publish-request`, (_req, res) => {
    res.status(423).json(createStreamAdminUploadTranscodeCdnPublishRequest231B());
  });

  router.post(`${basePath}/provider-realtime-media-call-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderRealtimeMediaCallRequest231B());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRealtimeMediaDbMutationRequest231B());
  });

  return router;
}
