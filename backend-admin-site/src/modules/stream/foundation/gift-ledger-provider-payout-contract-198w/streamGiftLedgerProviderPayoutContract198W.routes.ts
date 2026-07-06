import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerProviderPayoutContract198WRemainsSafe,
  createStreamGiftLedgerPayoutExecutionGuardRequest198W,
  getStreamGiftLedgerProviderPayoutContract198W,
  getStreamGiftLedgerProviderPayoutContractReadiness198W,
  getStreamGiftLedgerProviderPayoutRunbook198W,
  normalizeStreamGiftLedgerProviderPayoutContractInput198W,
  verifyStreamGiftLedgerProviderPayoutContract198W,
} from "./streamGiftLedgerProviderPayoutContract198W.service";
import { STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION } from "./streamGiftLedgerProviderPayoutContract198W.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION });
  return false;
}

export function createStreamGiftLedgerProviderPayoutContract198WRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerProviderPayoutContract198WRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198w/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutContractReadiness198W());
  });

  router.get("/api/admin/stream/gifts/ledger/198w/provider-payout-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutContract198W());
  });

  router.post("/api/admin/stream/gifts/ledger/198w/admin-approval-gate", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = (req.body || {}) as Record<string, unknown>;
      const input = normalizeStreamGiftLedgerProviderPayoutContractInput198W(raw);
      const result = await verifyStreamGiftLedgerProviderPayoutContract198W(prisma, input, raw);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_PROVIDER_PAYOUT_CONTRACT_198W_VERSION,
        error: "provider_payout_contract_gate_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.get("/api/admin/stream/gifts/ledger/198w/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderPayoutRunbook198W());
  });

  router.post("/api/admin/stream/gifts/ledger/198w/next-payout-execution-guard-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPayoutExecutionGuardRequest198W());
  });

  return router;
}
