import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRequest200I,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationContract200I,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRunbook200I,
  normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I,
  prepareStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200i_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_AUTHORIZATION_200I_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200IRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200i/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationReadiness200I());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200i/controlled-provider-binding-activation-execution-authorization-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationContract200I());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200i/controlled-provider-binding-activation-execution-authorization", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorization200I(
        normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationInput200I(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200i/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionAuthorizationRunbook200I());
  });

  router.post("/api/admin/stream/gifts/ledger/200i/next-controlled-provider-binding-activation-execution-final-gate-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRequest200I());
  });

  return router;
}
