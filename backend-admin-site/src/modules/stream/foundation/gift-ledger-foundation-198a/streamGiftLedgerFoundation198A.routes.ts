import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedger198ARemainsSafeDisabled,
  createBlockedStreamGiftSendIntent198A,
  createStreamGiftLedgerQuote198A,
  getStreamGiftLedgerReadiness198A,
  normalizeStreamGiftLedgerQuoteInput198A,
} from "./streamGiftLedgerFoundation198A.service";

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const status = message.includes("required") || message.includes("range") || message.includes("integer") ? 400 : 409;
  res.status(status).json({ ok: false, error: message, version: "BACKEND-STREAM-GIFTS-LEDGER-198A" });
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";

  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: "BACKEND-STREAM-GIFTS-LEDGER-198A" });
  return false;
}

export function createStreamGiftLedgerFoundation198ARouter(): Router {
  const router = Router();
  assertStreamGiftLedger198ARemainsSafeDisabled();

  router.get("/api/admin/stream/gifts/ledger/198a/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerReadiness198A());
  });

  router.post("/api/stream/gifts/ledger/198a/quote", (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerQuoteInput198A(body(req));
      res.json(createStreamGiftLedgerQuote198A(input));
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/stream/gifts/ledger/198a/send-intent", (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerQuoteInput198A(body(req));
      res.status(423).json(createBlockedStreamGiftSendIntent198A(input));
    } catch (error) {
      fail(res, error);
    }
  });

  return router;
}
