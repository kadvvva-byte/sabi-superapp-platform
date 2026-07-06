import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerPrismaReadiness198DRemainsSafe,
  createStreamGiftLedgerPrismaReadinessApprovalRequest198D,
  getStreamGiftLedgerPrismaReadiness198D,
} from "./streamGiftLedgerPrismaReadiness198D.service";

function requireAdminToken198D(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198D" });
  return false;
}

export function createStreamGiftLedgerPrismaReadiness198DRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerPrismaReadiness198DRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198d/readiness", (req, res) => {
    if (!requireAdminToken198D(req, res)) return;
    res.json(getStreamGiftLedgerPrismaReadiness198D());
  });

  router.get("/api/admin/stream/gifts/ledger/198d/validate-generate-plan", (req, res) => {
    if (!requireAdminToken198D(req, res)) return;
    res.json(getStreamGiftLedgerPrismaReadiness198D());
  });

  router.post("/api/admin/stream/gifts/ledger/198d/next-approval-request", (req, res) => {
    if (!requireAdminToken198D(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPrismaReadinessApprovalRequest198D());
  });

  return router;
}
