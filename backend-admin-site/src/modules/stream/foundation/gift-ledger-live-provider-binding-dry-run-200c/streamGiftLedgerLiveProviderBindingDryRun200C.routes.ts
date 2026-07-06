import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationRequest200C,
  getStreamGiftLedgerLiveProviderBindingDryRunContract200C,
  getStreamGiftLedgerLiveProviderBindingDryRunReadiness200C,
  getStreamGiftLedgerLiveProviderBindingDryRunRunbook200C,
  normalizeStreamGiftLedgerLiveProviderBindingDryRunInput200C,
  prepareStreamGiftLedgerLiveProviderBindingDryRun200C,
} from "./streamGiftLedgerLiveProviderBindingDryRun200C.service";
import { STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION } from "./streamGiftLedgerLiveProviderBindingDryRun200C.types";

function body(req: Request): Record<string, unknown> {
  return req.body && typeof req.body === "object" && !Array.isArray(req.body) ? req.body as Record<string, unknown> : {};
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || req.headers["x-sabi-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200c_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_LIVE_PROVIDER_BINDING_DRY_RUN_200C_VERSION });
}

export function createStreamGiftLedgerLiveProviderBindingDryRun200CRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200c/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerLiveProviderBindingDryRunReadiness200C());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200c/live-provider-binding-dry-run-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerLiveProviderBindingDryRunContract200C());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200c/live-provider-binding-dry-run", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerLiveProviderBindingDryRun200C(
        normalizeStreamGiftLedgerLiveProviderBindingDryRunInput200C(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200c/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerLiveProviderBindingDryRunRunbook200C());
  });

  router.post("/api/admin/stream/gifts/ledger/200c/next-controlled-provider-binding-activation-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationRequest200C());
  });

  return router;
}
