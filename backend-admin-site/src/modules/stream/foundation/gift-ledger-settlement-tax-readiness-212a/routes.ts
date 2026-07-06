import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_OWNER_APPROVAL,
  createStreamGiftLedgerSettlementTaxReadiness212APayoutExecutionRequest,
  createStreamGiftLedgerSettlementTaxReadiness212ASettlementDecisionRequest,
  createStreamGiftLedgerSettlementTaxReadiness212ATaxDecisionRequest,
  getStreamGiftLedgerSettlementTaxReadiness212A,
  getStreamGiftLedgerSettlementTaxReadiness212AContract,
  getStreamGiftLedgerSettlementTaxReadiness212ARunbook,
  prepareStreamGiftLedgerSettlementTaxReadiness212A,
} from "./service";

export function createStreamGiftLedgerSettlementTaxReadiness212ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/212a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxReadiness212A());
  });

  router.get("/api/admin/stream/gifts/ledger/212a/settlement-tax-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxReadiness212AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/212a/settlement-tax-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerSettlementTaxReadiness212A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_SETTLEMENT_TAX_READINESS_212A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "settlement_tax_readiness_index_only",
      acknowledged211BStage: req.body?.acknowledged211BStage ?? "211B_payout_eligibility_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      settlementSurfaces: req.body?.settlementSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/212a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerSettlementTaxReadiness212ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/212a/settlement-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxReadiness212ASettlementDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/212a/tax-withholding-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxReadiness212ATaxDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/212a/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerSettlementTaxReadiness212APayoutExecutionRequest());
  });

  return router;
}
