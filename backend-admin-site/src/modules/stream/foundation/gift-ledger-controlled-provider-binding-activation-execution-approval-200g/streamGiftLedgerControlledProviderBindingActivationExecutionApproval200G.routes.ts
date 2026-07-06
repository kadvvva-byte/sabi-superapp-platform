import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRequest200G,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalContract200G,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G,
  getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRunbook200G,
  normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G,
  prepareStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200G,
} from "./streamGiftLedgerControlledProviderBindingActivationExecutionApproval200G.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationExecutionApproval200G.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200g_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_200G_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200GRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200g/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalReadiness200G());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200g/controlled-provider-binding-activation-execution-approval-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalContract200G());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200g/controlled-provider-binding-activation-execution-approval", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationExecutionApproval200G(
        normalizeStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalInput200G(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200g/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRunbook200G());
  });

  router.post("/api/admin/stream/gifts/ledger/200g/next-controlled-provider-binding-activation-execution-preflight-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationExecutionPreflightRequest200G());
  });

  return router;
}
