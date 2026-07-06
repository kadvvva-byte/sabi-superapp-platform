import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_CATALOG_LOCALIZATION_READINESS_205A_OWNER_APPROVAL,
  createStreamGiftLedgerCatalogLocalizationReadiness205AAdminToggleRequest,
  createStreamGiftLedgerCatalogLocalizationReadiness205APublishRequest,
  getStreamGiftLedgerCatalogLocalizationReadiness205A,
  getStreamGiftLedgerCatalogLocalizationReadiness205AContract,
  getStreamGiftLedgerCatalogLocalizationReadiness205ARunbook,
  prepareStreamGiftLedgerCatalogLocalizationReadiness205A,
} from "./service";

export function createStreamGiftLedgerCatalogLocalizationReadiness205ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/205a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationReadiness205A());
  });

  router.get("/api/admin/stream/gifts/ledger/205a/catalog-localization-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationReadiness205AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/205a/catalog-localization-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerCatalogLocalizationReadiness205A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_CATALOG_LOCALIZATION_READINESS_205A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "gift_catalog_localization_readiness_index_only",
      acknowledged204BStage: req.body?.acknowledged204BStage ?? "204B_asset_policy_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      languages: req.body?.languages,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/205a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogLocalizationReadiness205ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/205a/catalog-localization-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogLocalizationReadiness205APublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/205a/admin-localization-review-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogLocalizationReadiness205AAdminToggleRequest());
  });

  return router;
}
