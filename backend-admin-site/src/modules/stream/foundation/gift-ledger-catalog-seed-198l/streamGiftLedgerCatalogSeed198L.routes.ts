import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerCatalogSeed198LRemainsSafe,
  createStreamGiftLedgerCatalogSeedNextRuntimeSmokeRequest198L,
  getStreamGiftLedgerCatalogPreview198L,
  getStreamGiftLedgerCatalogSeedReadiness198L,
  getStreamGiftLedgerCatalogSeedRunbook198L,
} from "./streamGiftLedgerCatalogSeed198L.service";
import { STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION } from "./streamGiftLedgerCatalogSeed198L.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CATALOG_SEED_198L_VERSION });
}

export function createStreamGiftLedgerCatalogSeed198LRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerCatalogSeed198LRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198l/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerCatalogSeedReadiness198L());
  });

  router.get("/api/admin/stream/gifts/ledger/198l/catalog-preview", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerCatalogPreview198L());
  });

  router.get("/api/admin/stream/gifts/ledger/198l/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerCatalogSeedRunbook198L());
  });

  router.post("/api/admin/stream/gifts/ledger/198l/next-runtime-smoke-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.status(202).json(createStreamGiftLedgerCatalogSeedNextRuntimeSmokeRequest198L());
    } catch (error) {
      fail(res, error);
    }
  });

  return router;
}
