import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_OWNER_APPROVAL,
  createStreamGiftLedgerAdminControlsFinalHandoff208BAdminToggleRequest,
  createStreamGiftLedgerAdminControlsFinalHandoff208BRuntimeRequest,
  getStreamGiftLedgerAdminControlsFinalHandoff208B,
  getStreamGiftLedgerAdminControlsFinalHandoff208BContract,
  getStreamGiftLedgerAdminControlsFinalHandoff208BRunbook,
  prepareStreamGiftLedgerAdminControlsFinalHandoff208B,
} from "./service";

export function createStreamGiftLedgerAdminControlsFinalHandoff208BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/208b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsFinalHandoff208B());
  });

  router.get("/api/admin/stream/gifts/ledger/208b/admin-controls-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsFinalHandoff208BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/208b/admin-controls-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerAdminControlsFinalHandoff208B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_ADMIN_CONTROLS_FINAL_HANDOFF_208B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "admin_controls_final_handoff_only",
      acknowledged208AStage: req.body?.acknowledged208AStage ?? "208A_admin_controls_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      adminControlSurfaces: req.body?.adminControlSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/208b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAdminControlsFinalHandoff208BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/208b/admin-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAdminControlsFinalHandoff208BAdminToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/208b/runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAdminControlsFinalHandoff208BRuntimeRequest());
  });

  return router;
}
