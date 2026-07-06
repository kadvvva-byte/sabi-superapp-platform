import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_OWNER_APPROVAL,
  createStreamGiftLedgerPayoutEligibilityReadiness211APayoutDecisionRequest,
  createStreamGiftLedgerPayoutEligibilityReadiness211AProviderPayoutRequest,
  createStreamGiftLedgerPayoutEligibilityReadiness211AWalletPayoutRequest,
  getStreamGiftLedgerPayoutEligibilityReadiness211A,
  getStreamGiftLedgerPayoutEligibilityReadiness211AContract,
  getStreamGiftLedgerPayoutEligibilityReadiness211ARunbook,
  prepareStreamGiftLedgerPayoutEligibilityReadiness211A,
} from "./service";

export function createStreamGiftLedgerPayoutEligibilityReadiness211ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/211a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityReadiness211A());
  });

  router.get("/api/admin/stream/gifts/ledger/211a/payout-eligibility-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityReadiness211AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/211a/payout-eligibility-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerPayoutEligibilityReadiness211A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_READINESS_211A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "payout_eligibility_readiness_index_only",
      acknowledged210BStage: req.body?.acknowledged210BStage ?? "210B_eligibility_risk_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      payoutSurfaces: req.body?.payoutSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/211a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityReadiness211ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/211a/payout-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityReadiness211APayoutDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/211a/provider-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityReadiness211AProviderPayoutRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/211a/wallet-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityReadiness211AWalletPayoutRequest());
  });

  return router;
}
