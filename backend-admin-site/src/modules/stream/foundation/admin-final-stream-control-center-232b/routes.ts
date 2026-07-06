import express, { type Router } from "express";
import {
  STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL,
  STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES,
  assertStreamAdminFinalStreamControlCenter232BRemainsSafe,
  createStreamAdminFinalDbMutationRequest232B,
  createStreamAdminFinalLaunchExecutionRequest232B,
  createStreamAdminFinalProviderActivationRequest232B,
  createStreamAdminFinalRuntimeEnablementRequest232B,
  createStreamAdminFinalRuntimeToggleRequest232B,
  getStreamAdminFinalStreamControlCenter232BSnapshot,
  prepareStreamAdminFinalStreamControlCenter232B,
} from "./service";

export function createStreamAdminFinalStreamControlCenter232BRouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/final-control-center/232b";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminFinalStreamControlCenter232BSnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminFinalStreamControlCenter232BRemainsSafe());
  });

  router.get(`${basePath}/control-center-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminFinalStreamControlCenter232BSnapshot().version,
      contract: "admin.stream.final-control-center.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS,
      requiredSurfaces: STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES,
      safeDisabledCoveragePercent: 100,
      blockerMatrixVisible: true,
      exactApprovalGateVisible: true,
      finalSafeDisabledStatusVisible: true,
      runtimeExecutionApprovedNow: false,
      runtimeLaunchBlockedUntilExactApproval: true,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminFinalStreamControlCenter232B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_OWNER_APPROVAL,
      controlMode: req.body?.controlMode ?? "admin_final_stream_control_center_visibility_only",
      acknowledged229AStage: req.body?.acknowledged229AStage ?? "229A_stream_foundation_final_control_clean",
      acknowledged230AStage: req.body?.acknowledged230AStage ?? "230A_admin_foundation_visibility_clean",
      acknowledged230BStage: req.body?.acknowledged230BStage ?? "230B_admin_provider_runtime_control_clean",
      acknowledged231AStage: req.body?.acknowledged231AStage ?? "231A_admin_rooms_control_clean",
      acknowledged231BStage: req.body?.acknowledged231BStage ?? "231B_admin_realtime_media_control_clean",
      acknowledged232AStage: req.body?.acknowledged232AStage ?? "232A_admin_moderation_safety_control_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["229A_passed_153", "230A_passed_134", "230B_passed_141", "231A_passed_143", "231B_passed_141", "232A_passed_140"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_ARTIFACTS,
      requiredSurfaces: req.body?.requiredSurfaces ?? STREAM_ADMIN_FINAL_STREAM_CONTROL_CENTER_232B_REQUIRED_SURFACES,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/runtime-enable-request`, (_req, res) => {
    res.status(423).json(createStreamAdminFinalRuntimeEnablementRequest232B());
  });

  router.post(`${basePath}/provider-activation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminFinalProviderActivationRequest232B());
  });

  router.post(`${basePath}/runtime-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamAdminFinalRuntimeToggleRequest232B());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminFinalDbMutationRequest232B());
  });

  router.post(`${basePath}/launch-execution-request`, (_req, res) => {
    res.status(423).json(createStreamAdminFinalLaunchExecutionRequest232B());
  });

  return router;
}
