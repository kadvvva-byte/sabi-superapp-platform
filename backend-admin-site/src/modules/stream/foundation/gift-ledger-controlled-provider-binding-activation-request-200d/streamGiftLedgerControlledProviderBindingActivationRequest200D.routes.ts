import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerProviderRuntimeReadinessRequest200D,
  getStreamGiftLedgerControlledProviderBindingActivationRequestContract200D,
  getStreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D,
  getStreamGiftLedgerControlledProviderBindingActivationRequestRunbook200D,
  normalizeStreamGiftLedgerControlledProviderBindingActivationRequestInput200D,
  prepareStreamGiftLedgerControlledProviderBindingActivationRequest200D,
} from "./streamGiftLedgerControlledProviderBindingActivationRequest200D.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationRequest200D.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200d_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_REQUEST_200D_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationRequest200DRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200d/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationRequestReadiness200D());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200d/controlled-provider-binding-activation-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationRequestContract200D());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200d/controlled-provider-binding-activation-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationRequest200D(
        normalizeStreamGiftLedgerControlledProviderBindingActivationRequestInput200D(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200d/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationRequestRunbook200D());
  });

  router.post("/api/admin/stream/gifts/ledger/200d/next-provider-runtime-readiness-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerProviderRuntimeReadinessRequest200D());
  });

  return router;
}
