import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerProviderPayoutAdapterSmoke198YRemainsSafe,
  createStreamGiftLedgerFinalPayoutAuditRequest198Y,
  getStreamGiftLedgerProviderPayoutAdapterSmokeContract198Y,
  getStreamGiftLedgerProviderPayoutAdapterSmokeReadiness198Y,
  getStreamGiftLedgerProviderPayoutAdapterSmokeRunbook198Y,
  normalizeStreamGiftLedgerProviderPayoutAdapterSmokeInput198Y,
  smokeStreamGiftLedgerProviderPayoutAdapter198Y,
} from "./streamGiftLedgerProviderPayoutAdapterSmoke198Y.service";
import { STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION } from "./streamGiftLedgerProviderPayoutAdapterSmoke198Y.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION });
  return false;
}

export function createStreamGiftLedgerProviderPayoutAdapterSmoke198YRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerProviderPayoutAdapterSmoke198YRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198y/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutAdapterSmokeReadiness198Y());
  });

  router.get("/api/admin/stream/gifts/ledger/198y/adapter-smoke-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutAdapterSmokeContract198Y());
  });

  router.post("/api/admin/stream/gifts/ledger/198y/adapter-smoke", async (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = (req.body || {}) as Record<string, unknown>;
      const input = normalizeStreamGiftLedgerProviderPayoutAdapterSmokeInput198Y(raw);
      const result = await smokeStreamGiftLedgerProviderPayoutAdapter198Y(prisma, input, raw);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_ADAPTER_SMOKE_198Y_VERSION,
        error: "provider_payout_adapter_smoke_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.get("/api/admin/stream/gifts/ledger/198y/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutAdapterSmokeRunbook198Y());
  });

  router.post("/api/admin/stream/gifts/ledger/198y/next-final-audit-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerFinalPayoutAuditRequest198Y());
  });

  return router;
}
