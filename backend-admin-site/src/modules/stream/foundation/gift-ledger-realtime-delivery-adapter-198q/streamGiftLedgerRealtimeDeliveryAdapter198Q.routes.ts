import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerRealtimeDeliveryAdapter198QRemainsSafe,
  createStreamGiftLedgerRealtimeRuntimeRequest198Q,
  getStreamGiftLedgerRealtimeDeliveryAdapterContract198Q,
  getStreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q,
  getStreamGiftLedgerRealtimeDeliveryRunbook198Q,
  normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q,
  previewStreamGiftLedgerRealtimeDelivery198Q,
} from "./streamGiftLedgerRealtimeDeliveryAdapter198Q.service";
import { STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION } from "./streamGiftLedgerRealtimeDeliveryAdapter198Q.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION });
  return false;
}

export function createStreamGiftLedgerRealtimeDeliveryAdapter198QRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerRealtimeDeliveryAdapter198QRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198q/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeDeliveryAdapterReadiness198Q());
  });

  router.get("/api/admin/stream/gifts/ledger/198q/adapter-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeDeliveryAdapterContract198Q());
  });

  router.get("/api/admin/stream/gifts/ledger/198q/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealtimeDeliveryRunbook198Q());
  });

  router.post("/api/admin/stream/gifts/ledger/198q/delivery-preview", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerRealtimeDeliveryPreviewInput198Q((req.body || {}) as Record<string, unknown>);
      const result = await previewStreamGiftLedgerRealtimeDelivery198Q(prisma, input);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_REALTIME_DELIVERY_ADAPTER_198Q_VERSION,
        error: "realtime_delivery_preview_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198q/next-realtime-runtime-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerRealtimeRuntimeRequest198Q());
  });

  return router;
}
