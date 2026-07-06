import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_OWNER_APPROVAL,
  createStreamGiftLedgerAdminControlsReadiness208AAdminToggleRequest,
  createStreamGiftLedgerAdminControlsReadiness208ARuntimeRequest,
  getStreamGiftLedgerAdminControlsReadiness208A,
  getStreamGiftLedgerAdminControlsReadiness208AContract,
  getStreamGiftLedgerAdminControlsReadiness208ARunbook,
  prepareStreamGiftLedgerAdminControlsReadiness208A,
} from "./service";

export function createStreamGiftLedgerAdminControlsReadiness208ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/208a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsReadiness208A());
  });

  router.get("/api/admin/stream/gifts/ledger/208a/admin-controls-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsReadiness208AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/208a/admin-controls-readiness-index", (req, res) => {
    const result = prepareStreamGiftLedgerAdminControlsReadiness208A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_READINESS_208A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "admin_controls_readiness_index_only",
      acknowledged207BStage: req.body?.acknowledged207BStage ?? "207B_media_cdn_publish_readiness_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      adminControlSurfaces: req.body?.adminControlSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/208a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsReadiness208ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/208a/admin-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAdminControlsReadiness208AAdminToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/208a/runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAdminControlsReadiness208ARuntimeRequest());
  });

  return router;
}
