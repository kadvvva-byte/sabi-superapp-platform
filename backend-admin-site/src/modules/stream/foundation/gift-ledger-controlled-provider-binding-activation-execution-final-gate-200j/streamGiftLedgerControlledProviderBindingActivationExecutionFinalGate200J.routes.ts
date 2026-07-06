import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffRequest200J,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateContract200J,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRunbook200J,
  normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J,
  prepareStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200j_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_FINAL_GATE_200J_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200JRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200j/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateReadiness200J()); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200j/controlled-provider-binding-activation-execution-final-gate-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateContract200J()); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/gifts/ledger/200j/controlled-provider-binding-activation-execution-final-gate", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGate200J(
        normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateInput200J(raw), raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200j/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionFinalGateRunbook200J());
  });

  router.post("/api/admin/stream/gifts/ledger/200j/next-controlled-provider-binding-activation-execution-final-handoff-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationExecutionFinalHandoffRequest200J());
  });

  return router;
}
