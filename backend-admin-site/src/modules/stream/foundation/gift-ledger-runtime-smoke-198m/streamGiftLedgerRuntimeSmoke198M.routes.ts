import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerRuntimeSmoke198MRemainsSafe,
  createStreamGiftLedgerRuntimeContractRequest198M,
  getStreamGiftLedgerRuntimeSmokeReadiness198M,
  getStreamGiftLedgerRuntimeSmokeRunbook198M,
} from "./streamGiftLedgerRuntimeSmoke198M.service";
import { STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION } from "./streamGiftLedgerRuntimeSmoke198M.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_RUNTIME_SMOKE_198M_VERSION });
  return false;
}

export function createStreamGiftLedgerRuntimeSmoke198MRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerRuntimeSmoke198MRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198m/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRuntimeSmokeReadiness198M());
  });

  router.get("/api/admin/stream/gifts/ledger/198m/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRuntimeSmokeRunbook198M());
  });

  router.post("/api/admin/stream/gifts/ledger/198m/next-runtime-contract-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerRuntimeContractRequest198M());
  });

  return router;
}
