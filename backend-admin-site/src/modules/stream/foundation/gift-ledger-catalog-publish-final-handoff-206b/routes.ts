import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_OWNER_APPROVAL,
  createStreamGiftLedgerCatalogPublishFinalHandoff206BAdminToggleRequest,
  createStreamGiftLedgerCatalogPublishFinalHandoff206BPublishRequest,
  getStreamGiftLedgerCatalogPublishFinalHandoff206B,
  getStreamGiftLedgerCatalogPublishFinalHandoff206BContract,
  getStreamGiftLedgerCatalogPublishFinalHandoff206BRunbook,
  prepareStreamGiftLedgerCatalogPublishFinalHandoff206B,
} from "./service";

export function createStreamGiftLedgerCatalogPublishFinalHandoff206BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/206b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishFinalHandoff206B());
  });

  router.get("/api/admin/stream/gifts/ledger/206b/catalog-publish-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishFinalHandoff206BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/206b/catalog-publish-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerCatalogPublishFinalHandoff206B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_CATALOG_PUBLISH_FINAL_HANDOFF_206B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "gift_catalog_publish_readiness_final_handoff_only",
      acknowledged206AStage: req.body?.acknowledged206AStage ?? "206A_catalog_publish_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      catalogLocales: req.body?.catalogLocales,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/206b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogPublishFinalHandoff206BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/206b/catalog-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogPublishFinalHandoff206BPublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/206b/admin-catalog-publish-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogPublishFinalHandoff206BAdminToggleRequest());
  });

  return router;
}
