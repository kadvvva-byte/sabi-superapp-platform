import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerPayoutExecutionGuard198XRemainsSafe,
  createStreamGiftLedgerOwnerLocalProviderPayoutSmokeRequest198X,
  getStreamGiftLedgerPayoutExecutionGuardContract198X,
  getStreamGiftLedgerPayoutExecutionGuardReadiness198X,
  getStreamGiftLedgerPayoutExecutionGuardRunbook198X,
  normalizeStreamGiftLedgerPayoutExecutionGuardInput198X,
  verifyStreamGiftLedgerPayoutExecutionGuard198X,
} from "./streamGiftLedgerPayoutExecutionGuard198X.service";
import { STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION } from "./streamGiftLedgerPayoutExecutionGuard198X.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION });
  return false;
}

export function createStreamGiftLedgerPayoutExecutionGuard198XRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerPayoutExecutionGuard198XRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198x/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPayoutExecutionGuardReadiness198X());
  });

  router.get("/api/admin/stream/gifts/ledger/198x/execution-guard-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPayoutExecutionGuardContract198X());
  });

  router.post("/api/admin/stream/gifts/ledger/198x/guard-check", async (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = (req.body || {}) as Record<string, unknown>;
      const input = normalizeStreamGiftLedgerPayoutExecutionGuardInput198X(raw);
      const result = await verifyStreamGiftLedgerPayoutExecutionGuard198X(prisma, input, raw);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_PAYOUT_EXECUTION_GUARD_198X_VERSION,
        error: "payout_execution_guard_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.get("/api/admin/stream/gifts/ledger/198x/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPayoutExecutionGuardRunbook198X());
  });

  router.post("/api/admin/stream/gifts/ledger/198x/next-owner-local-provider-payout-smoke-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerOwnerLocalProviderPayoutSmokeRequest198X());
  });

  return router;
}
