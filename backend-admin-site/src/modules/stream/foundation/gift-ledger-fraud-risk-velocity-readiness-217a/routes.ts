import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_OWNER_APPROVAL,
  createStreamGiftLedgerFraudRiskVelocity217AAbuseRuntimeDecisionRequest,
  createStreamGiftLedgerFraudRiskVelocity217ADbReadRequest,
  createStreamGiftLedgerFraudRiskVelocity217AFraudRiskRuntimeDecisionRequest,
  createStreamGiftLedgerFraudRiskVelocity217AProviderRiskCallRequest,
  createStreamGiftLedgerFraudRiskVelocity217AVelocityRuntimeDecisionRequest,
  getStreamGiftLedgerFraudRiskVelocityReadiness217A,
  getStreamGiftLedgerFraudRiskVelocityReadiness217AContract,
  getStreamGiftLedgerFraudRiskVelocityReadiness217ARunbook,
  prepareStreamGiftLedgerFraudRiskVelocityReadiness217A,
} from "./service";

export function createStreamGiftLedgerFraudRiskVelocityReadiness217ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/217a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityReadiness217A());
  });

  router.get("/api/admin/stream/gifts/ledger/217a/fraud-risk-velocity-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityReadiness217AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/fraud-risk-velocity-readiness-index", (req, res) => {
    const result = prepareStreamGiftLedgerFraudRiskVelocityReadiness217A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_FRAUD_RISK_VELOCITY_READINESS_217A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "fraud_risk_velocity_readiness_index_only",
      acknowledged216BStage: req.body?.acknowledged216BStage ?? "216B_compliance_evidence_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      riskSurfaces: req.body?.riskSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/217a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFraudRiskVelocityReadiness217ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/fraud-risk-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217AFraudRiskRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/velocity-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217AVelocityRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/abuse-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217AAbuseRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/provider-risk-call-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217AProviderRiskCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/217a/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFraudRiskVelocity217ADbReadRequest());
  });

  return router;
}
