import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerDeliveryReceiptPersistentStore198TRemainsSafe,
  createStreamGiftLedgerSettlementRequest198T,
  getStreamGiftLedgerDeliveryReceiptPersistentRunbook198T,
  getStreamGiftLedgerDeliveryReceiptPersistentSchemaContract198T,
  getStreamGiftLedgerDeliveryReceiptPersistentStoreReadiness198T,
  listStreamGiftLedgerDeliveryReceiptAudit198T,
  normalizeStreamGiftLedgerDeliveryReceiptPersistentInput198T,
  persistStreamGiftLedgerDeliveryReceiptAudit198T,
} from "./streamGiftLedgerDeliveryReceiptPersistentStore198T.service";
import { STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION } from "./streamGiftLedgerDeliveryReceiptPersistentStore198T.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION });
  return false;
}

export function createStreamGiftLedgerDeliveryReceiptPersistentStore198TRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerDeliveryReceiptPersistentStore198TRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198t/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptPersistentStoreReadiness198T());
  });

  router.get("/api/admin/stream/gifts/ledger/198t/schema-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptPersistentSchemaContract198T());
  });

  router.get("/api/admin/stream/gifts/ledger/198t/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptPersistentRunbook198T());
  });

  router.post("/api/admin/stream/gifts/ledger/198t/audit-read", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const body = (req.body || {}) as Record<string, unknown>;
      const result = await listStreamGiftLedgerDeliveryReceiptAudit198T(prisma, {
        sendIntentId: typeof body.sendIntentId === "string" ? body.sendIntentId : undefined,
        clientReceiptId: typeof body.clientReceiptId === "string" ? body.clientReceiptId : undefined,
        take: typeof body.take === "number" ? body.take : undefined,
      });
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
        error: "delivery_receipt_audit_read_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/stream/gifts/ledger/198t/delivery-receipt", async (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerDeliveryReceiptPersistentInput198T((req.body || {}) as Record<string, unknown>);
      const result = await persistStreamGiftLedgerDeliveryReceiptAudit198T(prisma, input, { requireRuntimeFlag: true });
      res.status(result.ok ? 201 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_PERSISTENT_STORE_198T_VERSION,
        error: "delivery_receipt_persistence_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198t/next-settlement-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerSettlementRequest198T());
  });

  return router;
}
