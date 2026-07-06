import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerGeneratedClientUsabilityPlanning198HRemainsSafe,
  createStreamGiftLedgerGeneratedClientUsabilityNextApprovalRequest198H,
  getStreamGiftLedgerGeneratedClientUsabilityPlanningReadiness198H,
} from "./streamGiftLedgerGeneratedClientUsabilityPlanning198H.service";

function requireAdminToken198H(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198H" });
  return false;
}

export function createStreamGiftLedgerGeneratedClientUsabilityPlanning198HRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerGeneratedClientUsabilityPlanning198HRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198h/readiness", (req, res) => {
    if (!requireAdminToken198H(req, res)) return;
    res.json(getStreamGiftLedgerGeneratedClientUsabilityPlanningReadiness198H());
  });

  router.get("/api/admin/stream/gifts/ledger/198h/usability-check-plan", (req, res) => {
    if (!requireAdminToken198H(req, res)) return;
    res.json(getStreamGiftLedgerGeneratedClientUsabilityPlanningReadiness198H());
  });

  router.post("/api/admin/stream/gifts/ledger/198h/next-approval-request", (req, res) => {
    if (!requireAdminToken198H(req, res)) return;
    res.status(423).json(createStreamGiftLedgerGeneratedClientUsabilityNextApprovalRequest198H());
  });

  return router;
}
