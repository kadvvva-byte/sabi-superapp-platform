import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_OWNER_APPROVAL,
  createStreamGiftLedgerPrivacyRetentionReadiness215ADataSubjectExportRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionReadiness215ADbReadRequest,
  createStreamGiftLedgerPrivacyRetentionReadiness215APrivacyRedactionRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionReadiness215AReportExportRuntimeRequest,
  createStreamGiftLedgerPrivacyRetentionReadiness215ARetentionPurgeRuntimeRequest,
  getStreamGiftLedgerPrivacyRetentionReadiness215A,
  getStreamGiftLedgerPrivacyRetentionReadiness215AContract,
  getStreamGiftLedgerPrivacyRetentionReadiness215ARunbook,
  prepareStreamGiftLedgerPrivacyRetentionReadiness215A,
} from "./service";

export function createStreamGiftLedgerPrivacyRetentionReadiness215ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/215a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionReadiness215A());
  });

  router.get("/api/admin/stream/gifts/ledger/215a/privacy-retention-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionReadiness215AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/privacy-retention-readiness-index", (req, res) => {
    const result = prepareStreamGiftLedgerPrivacyRetentionReadiness215A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_PRIVACY_RETENTION_READINESS_215A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "privacy_retention_readiness_index_only",
      acknowledged214BStage: req.body?.acknowledged214BStage ?? "214B_export_report_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      privacySurfaces: req.body?.privacySurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/215a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPrivacyRetentionReadiness215ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/privacy-redaction-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionReadiness215APrivacyRedactionRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/retention-purge-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionReadiness215ARetentionPurgeRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/data-subject-export-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionReadiness215ADataSubjectExportRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/report-export-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionReadiness215AReportExportRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/215a/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerPrivacyRetentionReadiness215ADbReadRequest());
  });

  return router;
}
