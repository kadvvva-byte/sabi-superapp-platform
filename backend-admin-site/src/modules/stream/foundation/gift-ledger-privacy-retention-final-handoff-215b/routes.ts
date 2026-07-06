import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_OWNER_APPROVAL,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDataSubjectExportRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDbReadRequest,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BPrivacyRedactionRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BReportExportRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRetentionPurgeRuntimeRequest,
  getStreamGiftLedgerPrivacyRetentionFinalHandoff215B,
  getStreamGiftLedgerPrivacyRetentionFinalHandoff215BContract,
  getStreamGiftLedgerPrivacyRetentionFinalHandoff215BRunbook,
  prepareStreamGiftLedgerPrivacyRetentionFinalHandoff215B,
} from "./service";

export function createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/215b/handoff", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionFinalHandoff215B());
  });

  router.get("/api/admin/stream/gifts/ledger/215b/privacy-retention-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionFinalHandoff215BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/privacy-retention-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerPrivacyRetentionFinalHandoff215B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PRIVACY_RETENTION_FINAL_HANDOFF_215B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "privacy_retention_final_handoff_only",
      acknowledged215AStage: req.body?.acknowledged215AStage ?? "215A_privacy_retention_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      privacySurfaces: req.body?.privacySurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/215b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionFinalHandoff215BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/privacy-redaction-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BPrivacyRedactionRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/retention-purge-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BRetentionPurgeRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/data-subject-export-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDataSubjectExportRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/report-export-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BReportExportRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215b/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionFinalHandoff215BDbReadRequest());
  });

  return router;
}
