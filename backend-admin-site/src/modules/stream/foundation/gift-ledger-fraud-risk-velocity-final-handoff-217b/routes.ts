import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_OWNER_APPROVAL,
  createStreamGiftLedgerFraudRiskVelocity217BAbuseRuntimeDecisionRequest,
  createStreamGiftLedgerFraudRiskVelocity217BAdminRiskToggleRequest,
  createStreamGiftLedgerFraudRiskVelocity217BDbReadRequest,
  createStreamGiftLedgerFraudRiskVelocity217BFraudRiskRuntimeDecisionRequest,
  createStreamGiftLedgerFraudRiskVelocity217BProviderRiskCallRequest,
  createStreamGiftLedgerFraudRiskVelocity217BVelocityRuntimeDecisionRequest,
  getStreamGiftLedgerFraudRiskVelocityFinalHandoff217B,
  getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BContract,
  getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRunbook,
  prepareStreamGiftLedgerFraudRiskVelocityFinalHandoff217B,
} from "./service";

export function createStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/217b/final-handoff", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityFinalHandoff217B());
  });

  router.get("/api/admin/stream/gifts/ledger/217b/fraud-risk-velocity-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/fraud-risk-velocity-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerFraudRiskVelocityFinalHandoff217B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_FINAL_HANDOFF_217B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "fraud_risk_velocity_final_handoff_only",
      acknowledged217AStage: req.body?.acknowledged217AStage ?? "217A_fraud_risk_velocity_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      riskSurfaces: req.body?.riskSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/217b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityFinalHandoff217BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/fraud-risk-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BFraudRiskRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/velocity-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BVelocityRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/abuse-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BAbuseRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/provider-risk-call-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BProviderRiskCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/admin-risk-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BAdminRiskToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217b/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217BDbReadRequest());
  });

  return router;
}
