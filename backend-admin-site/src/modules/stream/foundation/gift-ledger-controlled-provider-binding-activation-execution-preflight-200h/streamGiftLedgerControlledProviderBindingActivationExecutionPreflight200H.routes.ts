import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRequest200H,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightContract200H,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRunbook200H,
  normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H,
  prepareStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200h_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_PREFLIGHT_200H_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200HRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200h/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightReadiness200H());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200h/controlled-provider-binding-activation-execution-preflight-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightContract200H());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200h/controlled-provider-binding-activation-execution-preflight", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationExecutionPreflight200H(
        normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightInput200H(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200h/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRunbook200H());
  });

  router.post("/api/admin/stream/gifts/ledger/200h/next-controlled-provider-binding-activation-execution-authorization-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRequest200H());
  });

  return router;
}
