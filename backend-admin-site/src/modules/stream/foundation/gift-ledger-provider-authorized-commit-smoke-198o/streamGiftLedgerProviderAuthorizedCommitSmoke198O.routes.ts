import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerProviderAuthorizedCommitSmoke198ORemainsSafe,
  createStreamGiftLedgerPostCommitInspectionRequest198O,
  getStreamGiftLedgerProviderAuthorizedCommitSmokeReadiness198O,
  getStreamGiftLedgerProviderAuthorizedCommitSmokeRunbook198O,
} from "./streamGiftLedgerProviderAuthorizedCommitSmoke198O.service";
import { STREAM_GIFT_LEDGER_PROVIDER_AUTHORIZED_COMMIT_SMOKE_198O_VERSION } from "./streamGiftLedgerProviderAuthorizedCommitSmoke198O.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_AUTHORIZED_COMMIT_SMOKE_198O_VERSION });
  return false;
}

export function createStreamGiftLedgerProviderAuthorizedCommitSmoke198ORouter(): Router {
  const router = Router();
  assertStreamGiftLedgerProviderAuthorizedCommitSmoke198ORemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198o/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderAuthorizedCommitSmokeReadiness198O());
  });

  router.get("/api/admin/stream/gifts/ledger/198o/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderAuthorizedCommitSmokeRunbook198O());
  });

  router.post("/api/admin/stream/gifts/ledger/198o/next-post-commit-inspection-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(createStreamGiftLedgerPostCommitInspectionRequest198O());
  });

  return router;
}
