import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerDeliveryReceiptAudit198SRemainsSafe,
  createStreamGiftLedgerPersistentDeliveryAuditRequest198S,
  getStreamGiftLedgerDeliveryReceiptAuditReadiness198S,
  getStreamGiftLedgerDeliveryReceiptAuditRunbook198S,
  getStreamGiftLedgerDeliveryReceiptContract198S,
  normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S,
  previewStreamGiftLedgerDeliveryReceiptAdminAudit198S,
  verifyStreamGiftLedgerDeliveryReceiptAudit198S,
} from "./streamGiftLedgerDeliveryReceiptAudit198S.service";
import { STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION } from "./streamGiftLedgerDeliveryReceiptAudit198S.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION });
  return false;
}

export function createStreamGiftLedgerDeliveryReceiptAudit198SRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerDeliveryReceiptAudit198SRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198s/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptAuditReadiness198S());
  });

  router.get("/api/admin/stream/gifts/ledger/198s/receipt-contract", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptContract198S());
  });

  router.get("/api/admin/stream/gifts/ledger/198s/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDeliveryReceiptAuditRunbook198S());
  });

  router.post("/api/admin/stream/gifts/ledger/198s/audit-preview", async (req, res) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const input = normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S((req.body || {}) as Record<string, unknown>);
      const result = await previewStreamGiftLedgerDeliveryReceiptAdminAudit198S(prisma, input);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
        error: "delivery_receipt_admin_audit_preview_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/stream/gifts/ledger/198s/delivery-receipt", async (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerDeliveryReceiptAuditInput198S((req.body || {}) as Record<string, unknown>);
      const result = await verifyStreamGiftLedgerDeliveryReceiptAudit198S(prisma, input, { requireRuntimeFlag: true });
      res.status(result.ok ? 202 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_DELIVERY_RECEIPT_AUDIT_198S_VERSION,
        error: "delivery_receipt_verification_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198s/next-persistent-audit-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPersistentDeliveryAuditRequest198S());
  });

  return router;
}
