import { Router, type Request, type Response } from "express";
import type { PrismaClient } from "@prisma/client";
import {
  createStreamGiftLedgerAdminControlsRequest199F,
  getStreamGiftLedgerPostCommitRuntimeSmokeContract199F,
  getStreamGiftLedgerPostCommitRuntimeSmokeReadiness199F,
  getStreamGiftLedgerPostCommitRuntimeSmokeRunbook199F,
  normalizeStreamGiftLedgerPostCommitRuntimeSmokeInput199F,
  verifyStreamGiftLedgerPostCommitRuntimeSmoke199F,
} from "./streamGiftLedgerPostCommitRuntimeSmoke199F.service";
import { STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION } from "./streamGiftLedgerPostCommitRuntimeSmoke199F.types";

function body(req: Request): Record<string, unknown> {
  return req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {};
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = (process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  const provided = String(req.headers["x-admin-token"] || req.headers["x-sabi-admin-token"] || "").trim();
  if (!expected || provided !== expected) {
    res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION });
    return false;
  }
  return true;
}

function fail(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_199f_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_POST_COMMIT_RUNTIME_SMOKE_199F_VERSION });
}

export function createStreamGiftLedgerPostCommitRuntimeSmoke199FRouter(prisma: PrismaClient): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199f/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPostCommitRuntimeSmokeReadiness199F());
  });

  router.get("/api/admin/stream/gifts/ledger/199f/runtime-smoke-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPostCommitRuntimeSmokeContract199F());
  });

  router.post("/api/admin/stream/gifts/ledger/199f/runtime-smoke", async (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const result = await verifyStreamGiftLedgerPostCommitRuntimeSmoke199F(
        prisma,
        normalizeStreamGiftLedgerPostCommitRuntimeSmokeInput199F(body(req)),
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/199f/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerPostCommitRuntimeSmokeRunbook199F());
  });

  router.post("/api/admin/stream/gifts/ledger/199f/next-admin-controls-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerAdminControlsRequest199F());
  });

  return router;
}
