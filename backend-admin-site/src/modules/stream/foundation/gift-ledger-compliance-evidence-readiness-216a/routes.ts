import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_OWNER_APPROVAL,
  createStreamGiftLedgerComplianceEvidenceReadiness216AAmlSanctionsRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceReadiness216AComplianceRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceReadiness216ADbReadRequest,
  createStreamGiftLedgerComplianceEvidenceReadiness216AKycKybRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceReadiness216AProviderComplianceCallRequest,
  getStreamGiftLedgerComplianceEvidenceReadiness216A,
  getStreamGiftLedgerComplianceEvidenceReadiness216AContract,
  getStreamGiftLedgerComplianceEvidenceReadiness216ARunbook,
  prepareStreamGiftLedgerComplianceEvidenceReadiness216A,
} from "./service";

export function createStreamGiftLedgerComplianceEvidenceReadiness216ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/216a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceReadiness216A());
  });

  router.get("/api/admin/stream/gifts/ledger/216a/compliance-evidence-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceReadiness216AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/compliance-evidence-readiness-index", (req, res) => {
    const result = prepareStreamGiftLedgerComplianceEvidenceReadiness216A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_READINESS_216A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "compliance_evidence_readiness_index_only",
      acknowledged215BStage: req.body?.acknowledged215BStage ?? "215B_privacy_redaction_retention_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      complianceSurfaces: req.body?.complianceSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/216a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceReadiness216ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/compliance-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceReadiness216AComplianceRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/kyc-kyb-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceReadiness216AKycKybRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/aml-sanctions-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceReadiness216AAmlSanctionsRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/provider-compliance-call-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceReadiness216AProviderComplianceCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216a/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceReadiness216ADbReadRequest());
  });

  return router;
}
