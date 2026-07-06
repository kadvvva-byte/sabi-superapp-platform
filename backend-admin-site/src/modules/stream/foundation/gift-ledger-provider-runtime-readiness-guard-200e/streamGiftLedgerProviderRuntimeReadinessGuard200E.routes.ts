import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationDryRunRequest200E,
  getStreamGiftLedgerProviderRuntimeReadinessGuard200E,
  getStreamGiftLedgerProviderRuntimeReadinessGuardContract200E,
  getStreamGiftLedgerProviderRuntimeReadinessGuardRunbook200E,
  normalizeStreamGiftLedgerProviderRuntimeReadinessInput200E,
  runStreamGiftLedgerProviderRuntimeReadinessGuard200E,
} from "./streamGiftLedgerProviderRuntimeReadinessGuard200E.service";
import { STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION } from "./streamGiftLedgerProviderRuntimeReadinessGuard200E.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200e_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_PROVIDER_RUNTIME_READINESS_GUARD_200E_VERSION });
}

export function createStreamGiftLedgerProviderRuntimeReadinessGuard200ERouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200e/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerProviderRuntimeReadinessGuard200E());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200e/provider-runtime-readiness-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerProviderRuntimeReadinessGuardContract200E());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200e/provider-runtime-readiness-guard", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = runStreamGiftLedgerProviderRuntimeReadinessGuard200E(
        normalizeStreamGiftLedgerProviderRuntimeReadinessInput200E(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200e/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderRuntimeReadinessGuardRunbook200E());
  });

  router.post("/api/admin/stream/gifts/ledger/200e/next-controlled-provider-binding-activation-dry-run-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationDryRunRequest200E());
  });

  return router;
}
