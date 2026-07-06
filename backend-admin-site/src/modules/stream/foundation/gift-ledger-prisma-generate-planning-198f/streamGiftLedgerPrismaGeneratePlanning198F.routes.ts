import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerPrismaGeneratePlanning198FRemainsSafe,
  createStreamGiftLedgerPrismaGenerateNextApprovalRequest198F,
  getStreamGiftLedgerPrismaGeneratePlanningReadiness198F,
} from "./streamGiftLedgerPrismaGeneratePlanning198F.service";

function requireAdminToken198F(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198F" });
  return false;
}

export function createStreamGiftLedgerPrismaGeneratePlanning198FRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerPrismaGeneratePlanning198FRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198f/readiness", (req, res) => {
    if (!requireAdminToken198F(req, res)) return;
    res.json(getStreamGiftLedgerPrismaGeneratePlanningReadiness198F());
  });

  router.get("/api/admin/stream/gifts/ledger/198f/generate-plan", (req, res) => {
    if (!requireAdminToken198F(req, res)) return;
    res.json(getStreamGiftLedgerPrismaGeneratePlanningReadiness198F());
  });

  router.post("/api/admin/stream/gifts/ledger/198f/next-approval-request", (req, res) => {
    if (!requireAdminToken198F(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPrismaGenerateNextApprovalRequest198F());
  });

  return router;
}
