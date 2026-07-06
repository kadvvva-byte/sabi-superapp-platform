import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_OWNER_APPROVAL,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BAmlSanctionsRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BComplianceRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BDbReadRequest,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BKycKybRuntimeDecisionRequest,
  createStreamGiftLedgerComplianceEvidenceFinalHandoff216BProviderComplianceCallRequest,
  getStreamGiftLedgerComplianceEvidenceFinalHandoff216B,
  getStreamGiftLedgerComplianceEvidenceFinalHandoff216BContract,
  getStreamGiftLedgerComplianceEvidenceFinalHandoff216BRunbook,
  prepareStreamGiftLedgerComplianceEvidenceFinalHandoff216B,
} from "./service";

export function createStreamGiftLedgerComplianceEvidenceFinalHandoff216BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/216b/handoff", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceFinalHandoff216B());
  });

  router.get("/api/admin/stream/gifts/ledger/216b/compliance-evidence-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceFinalHandoff216BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/compliance-evidence-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerComplianceEvidenceFinalHandoff216B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_COMPLIANCE_EVIDENCE_FINAL_HANDOFF_216B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "compliance_evidence_final_handoff_only",
      acknowledged216AStage: req.body?.acknowledged216AStage ?? "216A_compliance_evidence_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      complianceSurfaces: req.body?.complianceSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/216b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerComplianceEvidenceFinalHandoff216BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/compliance-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BComplianceRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/kyc-kyb-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BKycKybRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/aml-sanctions-runtime-decision-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BAmlSanctionsRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/provider-compliance-call-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BProviderComplianceCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/216b/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerComplianceEvidenceFinalHandoff216BDbReadRequest());
  });

  return router;
}
