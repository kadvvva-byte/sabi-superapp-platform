import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerGeneratedClientUsabilityCheck198IRemainsSafe,
  createStreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I,
  getStreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I,
} from "./streamGiftLedgerGeneratedClientUsabilityCheck198I.service";

function requireAdminToken198I(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198I" });
  return false;
}

export function createStreamGiftLedgerGeneratedClientUsabilityCheck198IRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerGeneratedClientUsabilityCheck198IRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198i/readiness", (req, res) => {
    if (!requireAdminToken198I(req, res)) return;
    res.json(getStreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I());
  });

  router.get("/api/admin/stream/gifts/ledger/198i/runbook", (req, res) => {
    if (!requireAdminToken198I(req, res)) return;
    res.json(getStreamGiftLedgerGeneratedClientUsabilityCheckReadiness198I());
  });

  router.post("/api/admin/stream/gifts/ledger/198i/next-approval-request", (req, res) => {
    if (!requireAdminToken198I(req, res)) return;
    res.status(423).json(createStreamGiftLedgerGeneratedClientUsabilityReportReviewRequest198I());
  });

  return router;
}
