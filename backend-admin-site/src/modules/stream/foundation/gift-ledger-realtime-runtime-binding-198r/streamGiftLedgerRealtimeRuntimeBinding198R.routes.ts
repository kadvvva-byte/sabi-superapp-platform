import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import type { Server } from "socket.io";
import {
  assertStreamGiftLedgerRealtimeRuntimeBinding198RRemainsSafe,
  createStreamGiftLedgerDeliveryAuditRequest198R,
  emitStreamGiftLedgerRealtimeRuntime198R,
  getStreamGiftLedgerRealtimeRuntimeBindingContract198R,
  getStreamGiftLedgerRealtimeRuntimeBindingReadiness198R,
  getStreamGiftLedgerRealtimeRuntimeBindingRunbook198R,
  normalizeStreamGiftLedgerRealtimeRuntimeBindingInput198R,
} from "./streamGiftLedgerRealtimeRuntimeBinding198R.service";
import { STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION } from "./streamGiftLedgerRealtimeRuntimeBinding198R.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION });
  return false;
}

export function createStreamGiftLedgerRealtimeRuntimeBinding198RRouter(prisma: PrismaClient, io: Server): Router {
  const router = Router();
  assertStreamGiftLedgerRealtimeRuntimeBinding198RRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198r/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeRuntimeBindingReadiness198R());
  });

  router.get("/api/admin/stream/gifts/ledger/198r/runtime-binding-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeRuntimeBindingContract198R());
  });

  router.get("/api/admin/stream/gifts/ledger/198r/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeRuntimeBindingRunbook198R());
  });

  router.post("/api/admin/stream/gifts/ledger/198r/emit", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerRealtimeRuntimeBindingInput198R((req.body || {}) as Record<string, unknown>);
      const result = await emitStreamGiftLedgerRealtimeRuntime198R(prisma, io, input);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_REALTIME_RUNTIME_BINDING_198R_VERSION,
        error: "realtime_runtime_emit_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198r/next-delivery-audit-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerDeliveryAuditRequest198R());
  });

  return router;
}
