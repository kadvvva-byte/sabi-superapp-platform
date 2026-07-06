import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerFastTrackCloseout198JRemainsSafe,
  createStreamGiftLedgerRuntimeImplementationRequest198J,
  getStreamGiftLedgerFastTrackCloseoutReadiness198J,
} from "./streamGiftLedgerFastTrackCloseout198J.service";

function requireAdminToken198J(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198J" });
  return false;
}

export function createStreamGiftLedgerFastTrackCloseout198JRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerFastTrackCloseout198JRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198j/readiness", (req, res) => {
    if (!requireAdminToken198J(req, res)) return;
    res.json(getStreamGiftLedgerFastTrackCloseoutReadiness198J());
  });

  router.get("/api/admin/stream/gifts/ledger/198j/fast-track-runbook", (req, res) => {
    if (!requireAdminToken198J(req, res)) return;
    res.json(getStreamGiftLedgerFastTrackCloseoutReadiness198J());
  });

  router.post("/api/admin/stream/gifts/ledger/198j/next-runtime-implementation-request", (req, res) => {
    if (!requireAdminToken198J(req, res)) return;
    res.status(423).json(createStreamGiftLedgerRuntimeImplementationRequest198J());
  });

  return router;
}
