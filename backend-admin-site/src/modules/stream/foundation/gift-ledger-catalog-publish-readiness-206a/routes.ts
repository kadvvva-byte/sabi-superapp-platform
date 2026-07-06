import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_OWNER_APPROVAL,
  createStreamGiftLedgerCatalogPublishReadiness206AAdminToggleRequest,
  createStreamGiftLedgerCatalogPublishReadiness206APublishRequest,
  getStreamGiftLedgerCatalogPublishReadiness206A,
  getStreamGiftLedgerCatalogPublishReadiness206AContract,
  getStreamGiftLedgerCatalogPublishReadiness206ARunbook,
  prepareStreamGiftLedgerCatalogPublishReadiness206A,
} from "./service";

export function createStreamGiftLedgerCatalogPublishReadiness206ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/206a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishReadiness206A());
  });

  router.get("/api/admin/stream/gifts/ledger/206a/catalog-publish-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishReadiness206AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/206a/catalog-publish-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerCatalogPublishReadiness206A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_READINESS_206A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "gift_catalog_publish_readiness_index_only",
      acknowledged205BStage: req.body?.acknowledged205BStage ?? "205B_catalog_localization_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      catalogLocales: req.body?.catalogLocales,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/206a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishReadiness206ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/206a/catalog-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogPublishReadiness206APublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/206a/admin-catalog-publish-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogPublishReadiness206AAdminToggleRequest());
  });

  return router;
}
