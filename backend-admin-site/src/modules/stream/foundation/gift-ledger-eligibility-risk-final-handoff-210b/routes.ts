import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_OWNER_APPROVAL,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BAdminRiskToggleRequest,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BEligibilityDecisionRequest,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BLedgerWriteRequest,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BPayoutRequest,
  createStreamGiftLedgerEligibilityRiskFinalHandoff210BSendIntentRequest,
  getStreamGiftLedgerEligibilityRiskFinalHandoff210B,
  getStreamGiftLedgerEligibilityRiskFinalHandoff210BContract,
  getStreamGiftLedgerEligibilityRiskFinalHandoff210BRunbook,
  prepareStreamGiftLedgerEligibilityRiskFinalHandoff210B,
} from "./service";

export function createStreamGiftLedgerEligibilityRiskFinalHandoff210BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/210b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskFinalHandoff210B());
  });

  router.get("/api/admin/stream/gifts/ledger/210b/eligibility-risk-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskFinalHandoff210BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/eligibility-risk-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerEligibilityRiskFinalHandoff210B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_FINAL_HANDOFF_210B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "eligibility_risk_final_handoff_only",
      acknowledged210AStage: req.body?.acknowledged210AStage ?? "210A_eligibility_risk_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      riskSurfaces: req.body?.riskSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/210b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskFinalHandoff210BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/send-intent-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskFinalHandoff210BSendIntentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/ledger-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskFinalHandoff210BLedgerWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/eligibility-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskFinalHandoff210BEligibilityDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/admin-risk-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskFinalHandoff210BAdminRiskToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210b/payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskFinalHandoff210BPayoutRequest());
  });

  return router;
}
