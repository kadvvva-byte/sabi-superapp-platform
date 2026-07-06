import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  assertStreamGiftLedgerDbBacked198KRemainsSafe,
  createBlockedStreamGiftLedgerDbCommit198K,
  createStreamGiftLedgerDbCommit198K,
  createStreamGiftLedgerDbQuote198K,
  getStreamGiftLedgerDbBackedReadiness198K,
  normalizeStreamGiftLedgerDbBackedInput198K,
} from "./streamGiftLedgerDbBacked198K.service";
import { STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION } from "./streamGiftLedgerDbBacked198K.types";

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  const status = message.includes("required") || message.includes("must_be") || message.includes("out_of_range")
    ? 400
    : message.includes("not_found") || message.includes("not_ready")
      ? 404
      : 409;
  res.status(status).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION });
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;

  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;

  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_DB_BACKED_198K_VERSION });
  return false;
}

export function createStreamGiftLedgerDbBacked198KRouter(prisma: PrismaClient): Router {
  const router = Router();
  assertStreamGiftLedgerDbBacked198KRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198k/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerDbBackedReadiness198K());
  });

  router.post("/api/stream/gifts/ledger/198k/quote", async (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerDbBackedInput198K(body(req));
      res.json(await createStreamGiftLedgerDbQuote198K(prisma, input));
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/stream/gifts/ledger/198k/send-intent", async (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerDbBackedInput198K(body(req));
      const result = await createStreamGiftLedgerDbCommit198K(prisma, input);
      if (!result.ok) {
        res.status(423).json(result);
        return;
      }
      res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("catalog")) {
        res.status(423).json(createBlockedStreamGiftLedgerDbCommit198K("catalog_not_ready"));
        return;
      }
      fail(res, error);
    }
  });

  return router;
}
