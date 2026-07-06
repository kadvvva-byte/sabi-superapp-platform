import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_OWNER_APPROVAL,
  createStreamGiftLedgerEligibilityRiskReadiness210AEligibilityDecisionRequest,
  createStreamGiftLedgerEligibilityRiskReadiness210ALedgerWriteRequest,
  createStreamGiftLedgerEligibilityRiskReadiness210APayoutRequest,
  createStreamGiftLedgerEligibilityRiskReadiness210ASendIntentRequest,
  getStreamGiftLedgerEligibilityRiskReadiness210A,
  getStreamGiftLedgerEligibilityRiskReadiness210AContract,
  getStreamGiftLedgerEligibilityRiskReadiness210ARunbook,
  prepareStreamGiftLedgerEligibilityRiskReadiness210A,
} from "./service";

export function createStreamGiftLedgerEligibilityRiskReadiness210ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/210a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskReadiness210A());
  });

  router.get("/api/admin/stream/gifts/ledger/210a/eligibility-risk-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskReadiness210AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/210a/eligibility-risk-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerEligibilityRiskReadiness210A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_ELIGIBILITY_RISK_READINESS_210A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "eligibility_risk_readiness_index_only",
      acknowledged209BStage: req.body?.acknowledged209BStage ?? "209B_send_intent_audit_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      riskSurfaces: req.body?.riskSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/210a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerEligibilityRiskReadiness210ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/210a/send-intent-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskReadiness210ASendIntentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210a/ledger-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskReadiness210ALedgerWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210a/eligibility-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskReadiness210AEligibilityDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/210a/payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerEligibilityRiskReadiness210APayoutRequest());
  });

  return router;
}
