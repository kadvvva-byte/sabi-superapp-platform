import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerPrismaValidate198ERemainsSafe,
  createStreamGiftLedgerPrismaGenerateApprovalRequest198E,
  getStreamGiftLedgerPrismaValidateReadiness198E,
} from "./streamGiftLedgerPrismaValidate198E.service";

function requireAdminToken198E(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198E" });
  return false;
}

export function createStreamGiftLedgerPrismaValidate198ERouter(): Router {
  const router = Router();
  assertStreamGiftLedgerPrismaValidate198ERemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198e/readiness", (req, res) => {
    if (!requireAdminToken198E(req, res)) return;
    res.json(getStreamGiftLedgerPrismaValidateReadiness198E());
  });

  router.get("/api/admin/stream/gifts/ledger/198e/runbook", (req, res) => {
    if (!requireAdminToken198E(req, res)) return;
    res.json(getStreamGiftLedgerPrismaValidateReadiness198E());
  });

  router.post("/api/admin/stream/gifts/ledger/198e/next-approval-request", (req, res) => {
    if (!requireAdminToken198E(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPrismaGenerateApprovalRequest198E());
  });

  return router;
}
