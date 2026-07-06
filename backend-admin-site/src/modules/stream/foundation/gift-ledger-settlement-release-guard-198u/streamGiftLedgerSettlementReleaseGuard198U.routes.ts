import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerSettlementReleaseGuard198URemainsSafe,
  createStreamGiftLedgerPayoutReadinessRequest198U,
  getStreamGiftLedgerSettlementReleaseReadiness198U,
  getStreamGiftLedgerSettlementReleaseRunbook198U,
  inspectStreamGiftLedgerSettlementRelease198U,
  normalizeStreamGiftLedgerSettlementReleaseInput198U,
  releaseStreamGiftLedgerAvailableBalance198U,
} from "./streamGiftLedgerSettlementReleaseGuard198U.service";
import { STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION } from "./streamGiftLedgerSettlementReleaseGuard198U.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({
    ok: false,
    error: "admin_forbidden",
    version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
  });
  return false;
}

export function createStreamGiftLedgerSettlementReleaseGuard198URouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerSettlementReleaseGuard198URemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198u/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerSettlementReleaseReadiness198U());
  });

  router.get("/api/admin/stream/gifts/ledger/198u/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerSettlementReleaseRunbook198U());
  });

  router.post("/api/admin/stream/gifts/ledger/198u/inspect", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerSettlementReleaseInput198U((req.body || {}) as Record<string, unknown>);
      const result = await inspectStreamGiftLedgerSettlementRelease198U(prisma, input);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
        error: "settlement_release_inspection_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198u/release-attempt", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerSettlementReleaseInput198U((req.body || {}) as Record<string, unknown>);
      const result = await releaseStreamGiftLedgerAvailableBalance198U(prisma, input);
      res.status(result.ok ? 201 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_SETTLEMENT_RELEASE_GUARD_198U_VERSION,
        error: "settlement_release_attempt_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198u/next-payout-readiness-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPayoutReadinessRequest198U());
  });

  return router;
}
