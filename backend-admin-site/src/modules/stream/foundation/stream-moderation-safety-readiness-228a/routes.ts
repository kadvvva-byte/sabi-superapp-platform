import express, { type Router } from "express";
import {
  STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL,
  STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS,
  STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES,
  assertStreamModerationSafetyReadiness228ARemainsSafe,
  createStreamAdminModerationToggleRequest228A,
  createStreamContentSafetyDecisionRequest228A,
  createStreamModerationRuntimeActionRequest228A,
  createStreamProviderModerationCallRequest228A,
  getStreamModerationSafetyReadiness228ASnapshot,
  prepareStreamModerationSafetyReadiness228A,
} from "./service";

export function createStreamModerationSafetyReadiness228ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/moderation-safety/228a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamModerationSafetyReadiness228ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamModerationSafetyReadiness228ARemainsSafe());
  });

  router.get(`${basePath}/moderation-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamModerationSafetyReadiness228ASnapshot().version,
      contract: "stream.moderation.safety-readiness.safe_disabled.v1",
      requiredArtifacts: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES,
      banBoundaryVisible: true,
      muteBoundaryVisible: true,
      kickBoundaryVisible: true,
      reportBoundaryVisible: true,
      contentSafetyBoundaryVisible: true,
      adminModerationEvidenceVisible: true,
      moderationRuntimeBanExecuted: false,
      moderationRuntimeMuteExecuted: false,
      contentSafetyRuntimeDecisionExecuted: false,
      providerRuntimeEnabled: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamModerationSafetyReadiness228A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_MODERATION_SAFETY_READINESS_228A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "moderation_safety_readiness_index_only",
      acknowledged227BStage: req.body?.acknowledged227BStage ?? "227B_media_lifecycle_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["227B_checker_passed_147_of_147"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_MODERATION_SAFETY_READINESS_228A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/moderation-runtime-action-request`, (_req, res) => {
    res.status(423).json(createStreamModerationRuntimeActionRequest228A());
  });

  router.post(`${basePath}/content-safety-decision-request`, (_req, res) => {
    res.status(423).json(createStreamContentSafetyDecisionRequest228A());
  });

  router.post(`${basePath}/admin-moderation-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationToggleRequest228A());
  });

  router.post(`${basePath}/provider-moderation-call-request`, (_req, res) => {
    res.status(423).json(createStreamProviderModerationCallRequest228A());
  });

  return router;
}
