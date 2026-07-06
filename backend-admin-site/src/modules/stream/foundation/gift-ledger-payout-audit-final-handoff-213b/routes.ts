import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_OWNER_APPROVAL,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditExportRequest,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditWriteRequest,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BPayoutExecutionRequest,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BProviderPayoutRequest,
  createStreamGiftLedgerPayoutAuditFinalHandoff213BWalletPayoutRequest,
  getStreamGiftLedgerPayoutAuditFinalHandoff213B,
  getStreamGiftLedgerPayoutAuditFinalHandoff213BContract,
  getStreamGiftLedgerPayoutAuditFinalHandoff213BRunbook,
  prepareStreamGiftLedgerPayoutAuditFinalHandoff213B,
} from "./service";

export function createStreamGiftLedgerPayoutAuditFinalHandoff213BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/213b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditFinalHandoff213B());
  });

  router.get("/api/admin/stream/gifts/ledger/213b/payout-audit-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditFinalHandoff213BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/payout-audit-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerPayoutAuditFinalHandoff213B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PAYOUT_AUDIT_FINAL_HANDOFF_213B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "payout_audit_final_handoff_only",
      acknowledged213AStage: req.body?.acknowledged213AStage ?? "213A_payout_audit_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      auditSurfaces: req.body?.auditSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/213b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutAuditFinalHandoff213BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/payout-audit-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/payout-audit-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditFinalHandoff213BAuditExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/provider-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditFinalHandoff213BProviderPayoutRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/wallet-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditFinalHandoff213BWalletPayoutRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/213b/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutAuditFinalHandoff213BPayoutExecutionRequest());
  });

  return router;
}
