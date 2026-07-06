import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_OWNER_APPROVAL,
  createStreamGiftLedgerSendIntentAuditReadiness209ALedgerWriteRequest,
  createStreamGiftLedgerSendIntentAuditReadiness209ASendIntentRequest,
  getStreamGiftLedgerSendIntentAuditReadiness209A,
  getStreamGiftLedgerSendIntentAuditReadiness209AContract,
  getStreamGiftLedgerSendIntentAuditReadiness209ARunbook,
  prepareStreamGiftLedgerSendIntentAuditReadiness209A,
} from "./service";

export function createStreamGiftLedgerSendIntentAuditReadiness209ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/209a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditReadiness209A());
  });

  router.get("/api/admin/stream/gifts/ledger/209a/send-intent-audit-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditReadiness209AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/209a/send-intent-audit-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerSendIntentAuditReadiness209A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_READINESS_209A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "send_intent_audit_readiness_index_only",
      acknowledged208BStage: req.body?.acknowledged208BStage ?? "208B_admin_controls_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      sendIntentSurfaces: req.body?.sendIntentSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/209a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditReadiness209ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/209a/send-intent-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSendIntentAuditReadiness209ASendIntentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/209a/ledger-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSendIntentAuditReadiness209ALedgerWriteRequest());
  });

  return router;
}
