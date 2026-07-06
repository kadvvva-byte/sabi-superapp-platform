import express, { type Router } from "express";
import {
  STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL,
  STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS,
  STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS,
  assertStreamAdminFoundationVisibility230ARemainsSafe,
  createStreamAdminDbMutationRequest230A,
  createStreamAdminProviderRuntimeRequest230A,
  createStreamAdminRealtimeEmitRequest230A,
  createStreamAdminRuntimeToggleRequest230A,
  getStreamAdminFoundationVisibility230ASnapshot,
  prepareStreamAdminFoundationVisibility230A,
} from "./service";

export function createStreamAdminFoundationVisibility230ARouter(): Router {
  const router = express.Router();
  const basePath = "/api/admin/stream/admin-foundation/visibility/230a";

  router.get(`${basePath}/readiness`, (_req, res) => {
    res.status(200).json(getStreamAdminFoundationVisibility230ASnapshot());
  });

  router.get(`${basePath}/safety`, (_req, res) => {
    res.status(200).json(assertStreamAdminFoundationVisibility230ARemainsSafe());
  });

  router.get(`${basePath}/visibility-contract`, (_req, res) => {
    res.status(200).json({
      version: getStreamAdminFoundationVisibility230ASnapshot().version,
      contract: "admin.stream.foundation.visibility.safe_disabled.v1",
      requiredArtifacts: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS,
      requiredSections: STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS,
      giftLedgerClosure224AVisible: true,
      roomsLifecycle225BVisible: true,
      realtimeEvents226BVisible: true,
      mediaLifecycle227BVisible: true,
      moderationSafety228BVisible: true,
      foundationFinalControl229AVisible: true,
      providerNotConfiguredVisible: true,
      runtimeExecutionApprovedNow: false,
      futureRuntimeExecutionRequiresNewExactOwnerApproval: true,
    });
  });

  router.post(`${basePath}/readiness`, (req, res) => {
    const result = prepareStreamAdminFoundationVisibility230A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_OWNER_APPROVAL,
      visibilityMode: req.body?.visibilityMode ?? "admin_foundation_visibility_only",
      acknowledged224AStage: req.body?.acknowledged224AStage ?? "224A_gift_ledger_closure_clean",
      acknowledged225BStage: req.body?.acknowledged225BStage ?? "225B_rooms_lifecycle_final_handoff_clean",
      acknowledged226BStage: req.body?.acknowledged226BStage ?? "226B_realtime_events_final_handoff_clean",
      acknowledged227BStage: req.body?.acknowledged227BStage ?? "227B_media_lifecycle_final_handoff_clean",
      acknowledged228BStage: req.body?.acknowledged228BStage ?? "228B_moderation_safety_final_handoff_clean",
      acknowledged229AStage: req.body?.acknowledged229AStage ?? "229A_foundation_final_control_clean",
      evidenceReferences: req.body?.evidenceReferences ?? ["224A_passed_122", "225B_passed_128", "226B_passed_147", "227B_passed_147", "228B_passed_149", "229A_passed_153"],
      requiredArtifacts: req.body?.requiredArtifacts ?? STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_ARTIFACTS,
      requiredSections: req.body?.requiredSections ?? STREAM_ADMIN_FOUNDATION_VISIBILITY_230A_REQUIRED_SECTIONS,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/admin-runtime-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRuntimeToggleRequest230A());
  });

  router.post(`${basePath}/provider-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamAdminProviderRuntimeRequest230A());
  });

  router.post(`${basePath}/db-mutation-request`, (_req, res) => {
    res.status(423).json(createStreamAdminDbMutationRequest230A());
  });

  router.post(`${basePath}/realtime-emit-request`, (_req, res) => {
    res.status(423).json(createStreamAdminRealtimeEmitRequest230A());
  });

  return router;
}
