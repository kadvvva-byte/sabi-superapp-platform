import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerFinalProductionReadinessRequest199G,
  getStreamGiftLedgerAdminProductionGatesContract199G,
  getStreamGiftLedgerAdminProductionGatesReadiness199G,
  getStreamGiftLedgerAdminProductionGatesRunbook199G,
  normalizeStreamGiftLedgerAdminProductionGatesInput199G,
  reviewStreamGiftLedgerAdminProductionGates199G,
} from "./streamGiftLedgerAdminProductionGates199G.service";
import { STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION } from "./streamGiftLedgerAdminProductionGates199G.types";

function body(req: Request): Record<string, unknown> {
  return req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {};
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = (process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  const provided = String(req.headers["x-admin-token"] || req.headers["x-sabi-admin-token"] || "").trim();
  if (!expected || provided !== expected) {
    res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION });
    return false;
  }
  return true;
}

function fail(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_199g_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_ADMIN_PRODUCTION_GATES_199G_VERSION });
}

export function createStreamGiftLedgerAdminProductionGates199GRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199g/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAdminProductionGatesReadiness199G());
  });

  router.get("/api/admin/stream/gifts/ledger/199g/controls-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAdminProductionGatesContract199G());
  });

  router.post("/api/admin/stream/gifts/ledger/199g/control-review", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const result = reviewStreamGiftLedgerAdminProductionGates199G(
        normalizeStreamGiftLedgerAdminProductionGatesInput199G(body(req)),
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/199g/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAdminProductionGatesRunbook199G());
  });

  router.post("/api/admin/stream/gifts/ledger/199g/next-final-production-readiness-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerFinalProductionReadinessRequest199G());
  });

  return router;
}
