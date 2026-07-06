import { Router, type Request, type Response } from "express";
import {
  acceptStreamGiftLedgerRealPaymentAuthorizationHashOnly199D,
  createStreamGiftLedgerRealPaymentAuthorizationAdapterNextRequest199D,
  getStreamGiftLedgerRealPaymentAuthorizationAdapterContract199D,
  getStreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D,
  getStreamGiftLedgerRealPaymentAuthorizationAdapterRunbook199D,
  normalizeStreamGiftLedgerRealPaymentAuthorizationAdapterInput199D,
} from "./streamGiftLedgerRealPaymentAuthorizationAdapter199D.service";
import { STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION } from "./streamGiftLedgerRealPaymentAuthorizationAdapter199D.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_REAL_PAYMENT_AUTHORIZATION_ADAPTER_199D_VERSION });
  return false;
}

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

export function createStreamGiftLedgerRealPaymentAuthorizationAdapter199DRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199d/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealPaymentAuthorizationAdapterReadiness199D());
  });

  router.get("/api/admin/stream/gifts/ledger/199d/adapter-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealPaymentAuthorizationAdapterContract199D());
  });

  router.post("/api/admin/stream/gifts/ledger/199d/hash-only-authorization", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    const raw = body(req);
    const input = normalizeStreamGiftLedgerRealPaymentAuthorizationAdapterInput199D(raw);
    const result = acceptStreamGiftLedgerRealPaymentAuthorizationHashOnly199D(input, raw);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/199d/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealPaymentAuthorizationAdapterRunbook199D());
  });

  router.post("/api/admin/stream/gifts/ledger/199d/next-ledger-commit-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerRealPaymentAuthorizationAdapterNextRequest199D());
  });

  return router;
}
