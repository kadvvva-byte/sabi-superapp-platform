import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerCreatorPayoutReadiness198VRemainsSafe,
  createStreamGiftLedgerProviderPayoutContractRequest198V,
  getStreamGiftLedgerCreatorPayoutReadiness198V,
  getStreamGiftLedgerCreatorPayoutReadinessRunbook198V,
  inspectStreamGiftLedgerCreatorPayoutReadiness198V,
  normalizeStreamGiftLedgerCreatorPayoutReadinessInput198V,
} from "./streamGiftLedgerCreatorPayoutReadiness198V.service";
import { STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION } from "./streamGiftLedgerCreatorPayoutReadiness198V.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION });
  return false;
}

export function createStreamGiftLedgerCreatorPayoutReadiness198VRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerCreatorPayoutReadiness198VRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198v/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerCreatorPayoutReadiness198V());
  });

  router.get("/api/admin/stream/gifts/ledger/198v/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerCreatorPayoutReadinessRunbook198V());
  });

  router.post("/api/admin/stream/gifts/ledger/198v/inspect", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerCreatorPayoutReadinessInput198V((req.body || {}) as Record<string, unknown>);
      const result = await inspectStreamGiftLedgerCreatorPayoutReadiness198V(prisma, input);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_CREATOR_PAYOUT_READINESS_198V_VERSION,
        error: "creator_payout_readiness_inspection_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198v/next-provider-payout-contract-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerProviderPayoutContractRequest198V());
  });

  return router;
}
