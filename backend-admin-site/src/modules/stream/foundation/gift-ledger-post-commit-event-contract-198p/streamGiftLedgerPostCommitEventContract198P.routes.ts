import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerPostCommitEventContract198PRemainsSafe,
  createStreamGiftLedgerRealtimeAdapterRequest198P,
  getStreamGiftLedgerMobileRealtimeEventContract198P,
  getStreamGiftLedgerPostCommitEventContractReadiness198P,
  getStreamGiftLedgerPostCommitRunbook198P,
  inspectStreamGiftLedgerPostCommit198P,
  normalizeStreamGiftLedgerPostCommitInspectionInput198P,
} from "./streamGiftLedgerPostCommitEventContract198P.service";
import { STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION } from "./streamGiftLedgerPostCommitEventContract198P.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION });
  return false;
}

export function createStreamGiftLedgerPostCommitEventContract198PRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerPostCommitEventContract198PRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198p/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPostCommitEventContractReadiness198P());
  });

  router.get("/api/admin/stream/gifts/ledger/198p/event-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerMobileRealtimeEventContract198P());
  });

  router.get("/api/admin/stream/gifts/ledger/198p/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPostCommitRunbook198P());
  });

  router.post("/api/admin/stream/gifts/ledger/198p/inspect", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerPostCommitInspectionInput198P((req.body || {}) as Record<string, unknown>);
      const result = await inspectStreamGiftLedgerPostCommit198P(prisma, input);
      res.status(result.ok ? 200 : 404).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_POST_COMMIT_EVENT_CONTRACT_198P_VERSION,
        error: "post_commit_inspection_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198p/next-realtime-adapter-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(createStreamGiftLedgerRealtimeAdapterRequest198P());
  });

  return router;
}
