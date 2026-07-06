import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerPaymentAuthorizationAdapterNextRequest199C,
  getStreamGiftLedgerPaymentAuthorizationAdapterContract199C,
  getStreamGiftLedgerPaymentAuthorizationAdapterReadiness199C,
  getStreamGiftLedgerPaymentAuthorizationAdapterRunbook199C,
  normalizeStreamGiftLedgerPaymentAuthorizationAdapterInput199C,
  prepareStreamGiftLedgerPaymentAuthorizationAdapterBoundary199C,
} from "./streamGiftLedgerPaymentAuthorizationAdapter199C.service";
import { STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION } from "./streamGiftLedgerPaymentAuthorizationAdapter199C.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PAYMENT_AUTHORIZATION_ADAPTER_199C_VERSION });
  return false;
}

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

export function createStreamGiftLedgerPaymentAuthorizationAdapter199CRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199c/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPaymentAuthorizationAdapterReadiness199C());
  });

  router.get("/api/admin/stream/gifts/ledger/199c/payment-authorization-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPaymentAuthorizationAdapterContract199C());
  });

  router.post("/api/admin/stream/gifts/ledger/199c/adapter-boundary", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    const raw = body(req);
    const input = normalizeStreamGiftLedgerPaymentAuthorizationAdapterInput199C(raw);
    const result = prepareStreamGiftLedgerPaymentAuthorizationAdapterBoundary199C(input, raw);
    res.status(result.status === "payment_authorization_adapter_boundary_prepared_no_provider_call" ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/199c/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPaymentAuthorizationAdapterRunbook199C());
  });

  router.post("/api/admin/stream/gifts/ledger/199c/next-real-payment-authorization-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerPaymentAuthorizationAdapterNextRequest199C());
  });

  return router;
}
