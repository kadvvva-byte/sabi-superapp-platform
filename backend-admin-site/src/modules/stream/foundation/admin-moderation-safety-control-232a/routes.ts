import express, { type Router } from "express";
import {
  STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL,
  STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES,
  assertStreamAdminModerationSafetyControl232ARemainsSafe,
  createStreamAdminAppealDecisionRequest232A,
  createStreamAdminContentSafetyDecisionRequest232A,
  createStreamAdminModerationBanRequest232A,
  createStreamAdminModerationDbMutationRequest232A,
  createStreamAdminModerationKickRequest232A,
  createStreamAdminModerationMuteRequest232A,
  createStreamAdminModerationReportWriteRequest232A,
  createStreamAdminProviderModerationCallRequest232A,
  getStreamAdminModerationSafetyControl232ASnapshot,
  prepareStreamAdminModerationSafetyControl232A,
} from "./service";

export function createStreamAdminModerationSafetyControl232ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/admin-moderation-safety/control/232a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminModerationSafetyControl232ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminModerationSafetyControl232ARemainsSafe());
  });

  router.get(`${basePath}/control-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminModerationSafetyControl232ASnapshot().version,
      contract: "admin.stream.moderation-safety.control.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES,
      providerNotConfiguredVisible: true,
      moderationStatusVisible: true,
      banControlVisible: true,
      muteControlVisible: true,
      kickControlVisible: true,
      reportQueueControlVisible: true,
      contentSafetyReviewControlVisible: true,
      appealReviewControlVisible: true,
      adminModerationRuntimeTogglesLocked: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminModerationSafetyControl232A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "admin_moderation_safety_control_visibility_only",
      acknowledged230BStage: req.body?.acknowledged230BStage ?? "230B_admin_provider_runtime_control_clean",
      acknowledged228BStage: req.body?.acknowledged228BStage ?? "228B_moderation_safety_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["230B_passed_141", "228B_passed_149", "229A_passed_153"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ADMIN_MODERATION_SAFETY_CONTROL_232A_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/ban-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationBanRequest232A());
  });

  router.post(`${basePath}/mute-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationMuteRequest232A());
  });

  router.post(`${basePath}/kick-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationKickRequest232A());
  });

  router.post(`${basePath}/report-write-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationReportWriteRequest232A());
  });

  router.post(`${basePath}/content-safety-decision-request`, (_req, res) => {
    res.status(423).json(createStreamAdminContentSafetyDecisionRequest232A());
  });

  router.post(`${basePath}/appeal-decision-request`, (_req, res) => {
    res.status(423).json(createStreamAdminAppealDecisionRequest232A());
  });

  router.post(`${basePath}/provider-moderation-call-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderModerationCallRequest232A());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminModerationDbMutationRequest232A());
  });

  return router;
}
