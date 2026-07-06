import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_OWNER_APPROVAL,
  createStreamGiftLedgerSendIntentAuditFinalHandoff209BLedgerWriteRequest,
  createStreamGiftLedgerSendIntentAuditFinalHandoff209BSendIntentRequest,
  getStreamGiftLedgerSendIntentAuditFinalHandoff209B,
  getStreamGiftLedgerSendIntentAuditFinalHandoff209BContract,
  getStreamGiftLedgerSendIntentAuditFinalHandoff209BRunbook,
  prepareStreamGiftLedgerSendIntentAuditFinalHandoff209B,
} from "./service";

export function createStreamGiftLedgerSendIntentAuditFinalHandoff209BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/209b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditFinalHandoff209B());
  });

  router.get("/api/admin/stream/gifts/ledger/209b/send-intent-audit-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditFinalHandoff209BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/209b/send-intent-audit-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerSendIntentAuditFinalHandoff209B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_SEND_INTENT_AUDIT_FINAL_HANDOFF_209B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "send_intent_audit_final_handoff_only",
      acknowledged209AStage: req.body?.acknowledged209AStage ?? "209A_send_intent_audit_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      sendIntentSurfaces: req.body?.sendIntentSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/209b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSendIntentAuditFinalHandoff209BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/209b/send-intent-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSendIntentAuditFinalHandoff209BSendIntentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/209b/ledger-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSendIntentAuditFinalHandoff209BLedgerWriteRequest());
  });

  return router;
}
