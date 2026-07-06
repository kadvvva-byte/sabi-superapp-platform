import { Router } from "express";
import {
  createStreamGiftLedgerCatalogMediaAdminReadiness203APublishRequest,
  getStreamGiftLedgerCatalogMediaAdminReadiness203A,
  getStreamGiftLedgerCatalogMediaAdminReadiness203AContract,
  getStreamGiftLedgerCatalogMediaAdminReadiness203ARunbook,
  normalizeStreamGiftLedgerCatalogMediaAdminReadinessInput203A,
  prepareStreamGiftLedgerCatalogMediaAdminReadiness203A,
} from "./service";

export function createStreamGiftLedgerCatalogMediaAdminReadiness203ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/203a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminReadiness203A());
  });

  router.get("/api/admin/stream/gifts/ledger/203a/catalog-media-admin-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminReadiness203AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/203a/catalog-media-admin-readiness-index", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerCatalogMediaAdminReadinessInput203A(rawBody);
    const result = prepareStreamGiftLedgerCatalogMediaAdminReadiness203A(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/203a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminReadiness203ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/203a/catalog-media-cdn-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogMediaAdminReadiness203APublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/203a/admin-catalog-media-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogMediaAdminReadiness203APublishRequest());
  });

  return router;
}
