import express, { type Router } from "express";
import {
  STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL,
  STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS,
  STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES,
  assertStreamModerationSafetyFinalHandoff228BRemainsSafe,
  createStreamAdminModerationToggleRequest228B,
  createStreamContentSafetyDecisionRequest228B,
  createStreamModerationRuntimeActionRequest228B,
  createStreamProviderModerationCallRequest228B,
  getStreamModerationSafetyFinalHandoff228BSnapshot,
  prepareStreamModerationSafetyFinalHandoff228B,
} from "./service";

export function createStreamModerationSafetyFinalHandoff228BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/foundation/moderation-safety/228b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamModerationSafetyFinalHandoff228BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamModerationSafetyFinalHandoff228BRemainsSafe());
  });

  router.get(`${basePath}/moderation-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamModerationSafetyFinalHandoff228BSnapshot().version,
      contract: "stream.moderation.safety-final-handoff.safe_disabled.v1",
      requiredArtifacts: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES,
      banBoundaryLocked: true,
      muteBoundaryLocked: true,
      kickBoundaryLocked: true,
      reportBoundaryLocked: true,
      contentSafetyBoundaryLocked: true,
      adminModerationEvidenceLocked: true,
      moderationRuntimeBanExecuted: false,
      moderationRuntimeMuteExecuted: false,
      contentSafetyRuntimeDecisionExecuted: false,
      providerRuntimeEnabled: false,
      providerNotConfiguredVisible: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/handoff`, (req, res) => {
    const result = prepareStreamModerationSafetyFinalHandoff228B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "moderation_safety_final_handoff_only",
      acknowledged228AStage: req.body?.acknowledged228AStage ?? "228A_moderation_safety_readiness_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["228A_checker_passed_148_of_148"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_MODERATION_SAFETY_FINAL_HANDOFF_228B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/moderation-runtime-action-request`, (_req, res) => {
    res.status(423).json(createStreamModerationRuntimeActionRequest228B());
  });

  router.post(`${basePath}/content-safety-decision-request`, (_req, res) => {
    res.status(423).json(createStreamContentSafetyDecisionRequest228B());
  });

  router.post(`${basePath}/admin-moderation-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationToggleRequest228B());
  });

  router.post(`${basePath}/provider-moderation-call-request`, (_req, res) => {
    res.status(423).json(createStreamProviderModerationCallRequest228B());
  });

  return router;
}
