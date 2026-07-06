import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_OWNER_APPROVAL,
  createStreamGiftLedgerPayoutAuditReadiness213AAuditExportRequest,
  createStreamGiftLedgerPayoutAuditReadiness213AAuditWriteRequest,
  createStreamGiftLedgerPayoutAuditReadiness213APayoutExecutionRequest,
  getStreamGiftLedgerPayoutAuditReadiness213A,
  getStreamGiftLedgerPayoutAuditReadiness213AContract,
  getStreamGiftLedgerPayoutAuditReadiness213ARunbook,
  prepareStreamGiftLedgerPayoutAuditReadiness213A,
} from "./service";

export function createStreamGiftLedgerPayoutAuditReadiness213ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/213a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditReadiness213A());
  });

  router.get("/api/admin/stream/gifts/ledger/213a/payout-audit-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditReadiness213AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/213a/payout-audit-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerPayoutAuditReadiness213A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PAYOUT_AUDIT_READINESS_213A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "payout_audit_readiness_index_only",
      acknowledged212BStage: req.body?.acknowledged212BStage ?? "212B_settlement_tax_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      auditSurfaces: req.body?.auditSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/213a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditReadiness213ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/213a/payout-audit-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditReadiness213AAuditWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213a/payout-audit-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditReadiness213AAuditExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213a/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditReadiness213APayoutExecutionRequest());
  });

  return router;
}
