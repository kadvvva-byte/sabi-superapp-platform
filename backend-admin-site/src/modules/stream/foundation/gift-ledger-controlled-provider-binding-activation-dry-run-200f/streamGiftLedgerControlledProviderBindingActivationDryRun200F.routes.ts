import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRequest200F,
  getStreamGiftLedgerControlledProviderBindingActivationDryRunContract200F,
  getStreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F,
  getStreamGiftLedgerControlledProviderBindingActivationDryRunRunbook200F,
  normalizeStreamGiftLedgerControlledProviderBindingActivationDryRunInput200F,
  prepareStreamGiftLedgerControlledProviderBindingActivationDryRun200F,
} from "./streamGiftLedgerControlledProviderBindingActivationDryRun200F.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION } from "./streamGiftLedgerControlledProviderBindingActivationDryRun200F.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200f_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_PROVIDER_BINDING_ACTIVATION_DRY_RUN_200F_VERSION });
}

export function createStreamGiftLedgerControlledProviderBindingActivationDryRun200FRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200f/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationDryRunReadiness200F());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200f/controlled-provider-binding-activation-dry-run-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledProviderBindingActivationDryRunContract200F());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200f/controlled-provider-binding-activation-dry-run", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledProviderBindingActivationDryRun200F(
        normalizeStreamGiftLedgerControlledProviderBindingActivationDryRunInput200F(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200f/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledProviderBindingActivationDryRunRunbook200F());
  });

  router.post("/api/admin/stream/gifts/ledger/200f/next-controlled-provider-binding-activation-execution-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerControlledProviderBindingActivationExecutionApprovalRequest200F());
  });

  return router;
}
