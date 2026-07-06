import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerSchemaWrite198CRemainsSafe,
  createStreamGiftLedgerSchemaWriteApprovalRequest198C,
  getStreamGiftLedgerSchemaWriteReadiness198C,
} from "./streamGiftLedgerSchemaWrite198C.service";

function requireAdminToken198C(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198C" });
  return false;
}

export function createStreamGiftLedgerSchemaWrite198CRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerSchemaWrite198CRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198c/readiness", (req, res) => {
    if (!requireAdminToken198C(req, res)) return;
    res.json(getStreamGiftLedgerSchemaWriteReadiness198C());
  });

  router.post("/api/admin/stream/gifts/ledger/198c/next-approval-request", (req, res) => {
    if (!requireAdminToken198C(req, res)) return;
    res.status(423).json(createStreamGiftLedgerSchemaWriteApprovalRequest198C());
  });

  return router;
}
