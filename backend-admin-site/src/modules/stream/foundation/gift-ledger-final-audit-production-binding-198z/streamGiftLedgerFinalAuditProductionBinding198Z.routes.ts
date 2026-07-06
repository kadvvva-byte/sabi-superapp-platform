import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerFinalAuditProductionBinding198ZRemainsSafe,
  createStreamGiftLedgerProductionProviderBindingRequest198Z,
  getStreamGiftLedgerFinalAuditContract198Z,
  getStreamGiftLedgerFinalAuditProductionBindingReadiness198Z,
  getStreamGiftLedgerFinalAuditProductionBindingRunbook198Z,
  inspectStreamGiftLedgerFinalAudit198Z,
  normalizeStreamGiftLedgerFinalAuditProductionBindingInput198Z,
} from "./streamGiftLedgerFinalAuditProductionBinding198Z.service";
import { STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION } from "./streamGiftLedgerFinalAuditProductionBinding198Z.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION });
  return false;
}

export function createStreamGiftLedgerFinalAuditProductionBinding198ZRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerFinalAuditProductionBinding198ZRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198z/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalAuditProductionBindingReadiness198Z());
  });

  router.get("/api/admin/stream/gifts/ledger/198z/final-audit-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalAuditContract198Z());
  });

  router.post("/api/admin/stream/gifts/ledger/198z/final-audit", async (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = (req.body || {}) as Record<string, unknown>;
      const input = normalizeStreamGiftLedgerFinalAuditProductionBindingInput198Z(raw);
      const result = await inspectStreamGiftLedgerFinalAudit198Z(prisma, input, raw);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
        error: "final_audit_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198z/production-binding-request", async (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = (req.body || {}) as Record<string, unknown>;
      const input = normalizeStreamGiftLedgerFinalAuditProductionBindingInput198Z(raw);
      const result = await createStreamGiftLedgerProductionProviderBindingRequest198Z(prisma, input, raw);
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      res.status(409).json({
        ok: false,
        version: STREAM_GIFT_LEDGER_FINAL_AUDIT_PRODUCTION_BINDING_198Z_VERSION,
        error: "production_binding_request_failed",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  });

  router.get("/api/admin/stream/gifts/ledger/198z/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerFinalAuditProductionBindingRunbook198Z());
  });

  return router;
}
