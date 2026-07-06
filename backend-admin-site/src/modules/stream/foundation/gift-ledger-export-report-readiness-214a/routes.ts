import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_OWNER_APPROVAL,
  createStreamGiftLedgerExportReportReadiness214ADbReadRequest,
  createStreamGiftLedgerExportReportReadiness214AGiftLedgerExportRequest,
  createStreamGiftLedgerExportReportReadiness214APayoutAuditExportRequest,
  createStreamGiftLedgerExportReportReadiness214APayoutExecutionRequest,
  createStreamGiftLedgerExportReportReadiness214AReportExportRequest,
  getStreamGiftLedgerExportReportReadiness214A,
  getStreamGiftLedgerExportReportReadiness214AContract,
  getStreamGiftLedgerExportReportReadiness214ARunbook,
  prepareStreamGiftLedgerExportReportReadiness214A,
} from "./service";

export function createStreamGiftLedgerExportReportReadiness214ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/214a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerExportReportReadiness214A());
  });

  router.get("/api/admin/stream/gifts/ledger/214a/export-report-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerExportReportReadiness214AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/export-report-readiness-index", (req, res) => {
    const result = prepareStreamGiftLedgerExportReportReadiness214A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_EXPORT_REPORT_READINESS_214A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "export_report_readiness_index_only",
      acknowledged213BStage: req.body?.acknowledged213BStage ?? "213B_payout_audit_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      reportSurfaces: req.body?.reportSurfaces,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/214a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerExportReportReadiness214ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/gift-ledger-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportReadiness214AGiftLedgerExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/report-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportReadiness214AReportExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/payout-audit-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportReadiness214APayoutAuditExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportReadiness214ADbReadRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214a/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportReadiness214APayoutExecutionRequest());
  });

  return router;
}
