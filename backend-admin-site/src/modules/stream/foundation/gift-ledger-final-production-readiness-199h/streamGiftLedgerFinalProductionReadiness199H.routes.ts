import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerNextLiveProviderBindingRequest199H,
  finalizeStreamGiftLedgerProductionReadinessHandoff199H,
  getStreamGiftLedgerFinalProductionReadiness199H,
  getStreamGiftLedgerFinalProductionReadinessContract199H,
  getStreamGiftLedgerFinalProductionReadinessRunbook199H,
  normalizeStreamGiftLedgerFinalProductionReadinessInput199H,
} from "./streamGiftLedgerFinalProductionReadiness199H.service";
import { STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION } from "./streamGiftLedgerFinalProductionReadiness199H.types";

function body(req: Request): Record<string, unknown> {
  return req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {};
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = (process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  const provided = String(req.headers["x-admin-token"] || req.headers["x-sabi-admin-token"] || "").trim();
  if (!expected || provided !== expected) {
    res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION });
    return false;
  }
  return true;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_199h_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_FINAL_PRODUCTION_READINESS_199H_VERSION });
}

export function createStreamGiftLedgerFinalProductionReadiness199HRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199h/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalProductionReadiness199H());
  });

  router.get("/api/admin/stream/gifts/ledger/199h/final-production-readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalProductionReadinessContract199H());
  });

  router.post("/api/admin/stream/gifts/ledger/199h/final-handoff", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const result = finalizeStreamGiftLedgerProductionReadinessHandoff199H(
        normalizeStreamGiftLedgerFinalProductionReadinessInput199H(body(req)),
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/199h/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalProductionReadinessRunbook199H());
  });

  router.post("/api/admin/stream/gifts/ledger/199h/next-live-provider-binding-approval-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerNextLiveProviderBindingRequest199H());
  });

  return router;
}
