import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B,
  STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B,
  createStreamGiftLedgerExportReportFinalHandoff214BDbReadRequest,
  createStreamGiftLedgerExportReportFinalHandoff214BGiftLedgerExportRequest,
  createStreamGiftLedgerExportReportFinalHandoff214BPayoutAuditExportRequest,
  createStreamGiftLedgerExportReportFinalHandoff214BPayoutExecutionRequest,
  createStreamGiftLedgerExportReportFinalHandoff214BReportExportRequest,
  getStreamGiftLedgerExportReportFinalHandoff214B,
  getStreamGiftLedgerExportReportFinalHandoff214BContract,
  getStreamGiftLedgerExportReportFinalHandoff214BRunbook,
  prepareStreamGiftLedgerExportReportFinalHandoff214B,
} from "./service";

export function createStreamGiftLedgerExportReportFinalHandoff214BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/214b/readiness", (_req, res) => {
    res.json(getStreamGiftLedgerExportReportFinalHandoff214B());
  });

  router.get("/api/admin/stream/gifts/ledger/214b/contract", (_req, res) => {
    res.json(getStreamGiftLedgerExportReportFinalHandoff214BContract());
  });

  router.get("/api/admin/stream/gifts/ledger/214b/runbook", (_req, res) => {
    res.json(getStreamGiftLedgerExportReportFinalHandoff214BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/214b/final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerExportReportFinalHandoff214B({
      ownerApproval: req.body?.ownerApproval,
      handoffMode: req.body?.handoffMode,
      acknowledged214AStage: req.body?.acknowledged214AStage,
      evidenceReferences: req.body?.evidenceReferences ?? [],
      handoffAreas: req.body?.handoffAreas ?? [],
      reportSurfaces: req.body?.reportSurfaces ?? [],
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/214b/final-handoff-template", (_req, res) => {
    res.json({
      ownerApproval: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_214B_OWNER_APPROVAL,
      handoffMode: "export_report_final_handoff_only",
      acknowledged214AStage: "214A_export_report_readiness_index_clean",
      evidenceReferences: ["214A checker passed on owner machine"],
      handoffAreas: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_AREAS_214B,
      reportSurfaces: STREAM_GIFT_LEDGER_EXPORT_REPORT_FINAL_HANDOFF_REQUIRED_SURFACES_214B,
      runtimeExecutionApprovedNow: false,
      providerRuntimeEnabled: false,
      dbReadExecuted: false,
      fakeSuccessWritten: false,
    });
  });

  router.post("/api/admin/stream/gifts/ledger/214b/gift-ledger-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportFinalHandoff214BGiftLedgerExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214b/report-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportFinalHandoff214BReportExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214b/payout-audit-export-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportFinalHandoff214BPayoutAuditExportRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214b/db-read-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportFinalHandoff214BDbReadRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/214b/payout-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerExportReportFinalHandoff214BPayoutExecutionRequest());
  });

  return router;
}
