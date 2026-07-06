import { Router } from "express";
import {
  createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BPublishRequest,
  getStreamGiftLedgerCatalogMediaAdminFinalHandoff203B,
  getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BContract,
  getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRunbook,
  normalizeStreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B,
  prepareStreamGiftLedgerCatalogMediaAdminFinalHandoff203B,
} from "./service";

export function createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/203b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminFinalHandoff203B());
  });

  router.get("/api/admin/stream/gifts/ledger/203b/catalog-media-admin-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/203b/catalog-media-admin-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerCatalogMediaAdminFinalHandoffInput203B(rawBody);
    const result = prepareStreamGiftLedgerCatalogMediaAdminFinalHandoff203B(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/203b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerCatalogMediaAdminFinalHandoff203BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/203b/catalog-media-cdn-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BPublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/203b/admin-catalog-media-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerCatalogMediaAdminFinalHandoff203BPublishRequest());
  });

  return router;
}
