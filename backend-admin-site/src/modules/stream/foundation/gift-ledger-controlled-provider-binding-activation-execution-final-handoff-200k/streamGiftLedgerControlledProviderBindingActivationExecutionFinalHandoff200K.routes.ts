import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationLiveActivationExecutionRequest200K,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffContract200K,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffReadiness200K,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffRunbook200K,
  normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffInput200K,
  prepareStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200k_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_HANDOFF_200K_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200KRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200k/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffReadiness200K()); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200k/controlled-provider-binding-activation-execution-final-handoff-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffContract200K()); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/gifts/ledger/200k/controlled-provider-binding-activation-execution-final-handoff", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoff200K(
        normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffInput200K(raw), raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200k/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffRunbook200K());
  });

  router.post("/api/admin/stream/gifts/ledger/200k/next-separate-exact-live-provider-binding-activation-execution-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationLiveActivationExecutionRequest200K());
  });

  return router;
}
