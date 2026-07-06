import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerPrismaGenerate198GRemainsSafe,
  createStreamGiftLedgerPrismaGenerateNextApprovalRequest198G,
  getStreamGiftLedgerPrismaGenerateReadiness198G,
} from "./streamGiftLedgerPrismaGenerate198G.service";

function requireAdminToken198G(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198G" });
  return false;
}

export function createStreamGiftLedgerPrismaGenerate198GRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerPrismaGenerate198GRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198g/readiness", (req, res) => {
    if (!requireAdminToken198G(req, res)) return;
    res.json(getStreamGiftLedgerPrismaGenerateReadiness198G());
  });

  router.get("/api/admin/stream/gifts/ledger/198g/runbook", (req, res) => {
    if (!requireAdminToken198G(req, res)) return;
    res.json(getStreamGiftLedgerPrismaGenerateReadiness198G());
  });

  router.post("/api/admin/stream/gifts/ledger/198g/next-approval-request", (req, res) => {
    if (!requireAdminToken198G(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPrismaGenerateNextApprovalRequest198G());
  });

  return router;
}
