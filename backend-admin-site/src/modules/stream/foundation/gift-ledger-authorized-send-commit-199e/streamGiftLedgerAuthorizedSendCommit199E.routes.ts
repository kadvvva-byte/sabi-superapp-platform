import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  commitStreamGiftLedgerProviderAuthorizedSend199E,
  createStreamGiftLedgerAuthorizedSendCommitNextRequest199E,
  getStreamGiftLedgerAuthorizedSendCommitContract199E,
  getStreamGiftLedgerAuthorizedSendCommitReadiness199E,
  getStreamGiftLedgerAuthorizedSendCommitRunbook199E,
  normalizeStreamGiftLedgerAuthorizedSendCommitInput199E,
} from "./streamGiftLedgerAuthorizedSendCommit199E.service";
import { STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION } from "./streamGiftLedgerAuthorizedSendCommit199E.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION });
  return false;
}

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
  res.status(status).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_AUTHORIZED_SEND_COMMIT_199E_VERSION });
}

export function createStreamGiftLedgerAuthorizedSendCommit199ERouter(prisma: PrismaClient): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199e/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAuthorizedSendCommitReadiness199E());
  });

  router.get("/api/admin/stream/gifts/ledger/199e/commit-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAuthorizedSendCommitContract199E());
  });

  router.post("/api/stream/gifts/ledger/199e/authorized-send-intent", async (req: Request, res: Response) => {
    try {
      const input = normalizeStreamGiftLedgerAuthorizedSendCommitInput199E(body(req));
      const result = await commitStreamGiftLedgerProviderAuthorizedSend199E(prisma, input);
      if (!result.ok) {
        res.status(423).json(result);
        return;
      }
      res.status(201).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/199e/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerAuthorizedSendCommitRunbook199E());
  });

  router.post("/api/admin/stream/gifts/ledger/199e/next-post-commit-smoke-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerAuthorizedSendCommitNextRequest199E());
  });

  return router;
}
