import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_OWNER_APPROVAL,
  createStreamGiftLedgerSettlementTaxFinalHandoff212BPayoutExecutionRequest,
  createStreamGiftLedgerSettlementTaxFinalHandoff212BSettlementDecisionRequest,
  createStreamGiftLedgerSettlementTaxFinalHandoff212BTaxDecisionRequest,
  getStreamGiftLedgerSettlementTaxFinalHandoff212B,
  getStreamGiftLedgerSettlementTaxFinalHandoff212BContract,
  getStreamGiftLedgerSettlementTaxFinalHandoff212BRunbook,
  prepareStreamGiftLedgerSettlementTaxFinalHandoff212B,
} from "./service";

export function createStreamGiftLedgerSettlementTaxFinalHandoff212BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/212b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxFinalHandoff212B());
  });

  router.get("/api/admin/stream/gifts/ledger/212b/settlement-tax-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxFinalHandoff212BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/212b/settlement-tax-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerSettlementTaxFinalHandoff212B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_SETTLEMENT_TAX_FINAL_HANDOFF_212B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "settlement_tax_final_handoff_only",
      acknowledged212AStage: req.body?.acknowledged212AStage ?? "212A_settlement_tax_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      settlementSurfaces: req.body?.settlementSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/212b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxFinalHandoff212BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/212b/settlement-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxFinalHandoff212BSettlementDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/212b/tax-withholding-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxFinalHandoff212BTaxDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/212b/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxFinalHandoff212BPayoutExecutionRequest());
  });

  return router;
}
