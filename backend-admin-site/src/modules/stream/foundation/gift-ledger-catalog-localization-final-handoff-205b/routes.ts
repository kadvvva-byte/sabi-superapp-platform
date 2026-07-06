import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_CATALOG_LOCALIZATION_FINAL_HANDOFF_205B_OWNER_APPROVAL,
  createStreamGiftLedgerCatalogLocalizationFinalHandoff205BAdminToggleRequest,
  createStreamGiftLedgerCatalogLocalizationFinalHandoff205BPublishRequest,
  getStreamGiftLedgerCatalogLocalizationFinalHandoff205B,
  getStreamGiftLedgerCatalogLocalizationFinalHandoff205BContract,
  getStreamGiftLedgerCatalogLocalizationFinalHandoff205BRunbook,
  prepareStreamGiftLedgerCatalogLocalizationFinalHandoff205B,
} from "./service";

export function createStreamGiftLedgerCatalogLocalizationFinalHandoff205BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/205b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationFinalHandoff205B());
  });

  router.get("/api/admin/stream/gifts/ledger/205b/catalog-localization-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationFinalHandoff205BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/205b/catalog-localization-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerCatalogLocalizationFinalHandoff205B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_CATALOG_LOCALIZATION_FINAL_HANDOFF_205B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "gift_catalog_localization_final_handoff_only",
      acknowledged205AStage: req.body?.acknowledged205AStage ?? "205A_catalog_localization_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      lockedAreas: req.body?.lockedAreas,
      languages: req.body?.languages,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/205b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationFinalHandoff205BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/205b/catalog-localization-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogLocalizationFinalHandoff205BPublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/205b/admin-localization-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogLocalizationFinalHandoff205BAdminToggleRequest());
  });

  return router;
}
