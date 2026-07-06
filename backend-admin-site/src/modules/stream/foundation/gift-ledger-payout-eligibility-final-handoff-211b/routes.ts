import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_OWNER_APPROVAL,
  createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutDecisionRequest,
  createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutExecutionRequest,
  createStreamGiftLedgerPayoutEligibilityFinalHandoff211BProviderPayoutRequest,
  createStreamGiftLedgerPayoutEligibilityFinalHandoff211BWalletPayoutRequest,
  getStreamGiftLedgerPayoutEligibilityFinalHandoff211B,
  getStreamGiftLedgerPayoutEligibilityFinalHandoff211BContract,
  getStreamGiftLedgerPayoutEligibilityFinalHandoff211BRunbook,
  prepareStreamGiftLedgerPayoutEligibilityFinalHandoff211B,
} from "./service";

export function createStreamGiftLedgerPayoutEligibilityFinalHandoff211BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/211b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityFinalHandoff211B());
  });

  router.get("/api/admin/stream/gifts/ledger/211b/payout-eligibility-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityFinalHandoff211BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/211b/payout-eligibility-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerPayoutEligibilityFinalHandoff211B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PAYOUT_ELIGIBILITY_FINAL_HANDOFF_211B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "payout_eligibility_final_handoff_only",
      acknowledged211AStage: req.body?.acknowledged211AStage ?? "211A_payout_eligibility_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      payoutSurfaces: req.body?.payoutSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/211b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPayoutEligibilityFinalHandoff211BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/211b/payout-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/211b/wallet-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityFinalHandoff211BWalletPayoutRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/211b/provider-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityFinalHandoff211BProviderPayoutRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/211b/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPayoutEligibilityFinalHandoff211BPayoutExecutionRequest());
  });

  return router;
}
