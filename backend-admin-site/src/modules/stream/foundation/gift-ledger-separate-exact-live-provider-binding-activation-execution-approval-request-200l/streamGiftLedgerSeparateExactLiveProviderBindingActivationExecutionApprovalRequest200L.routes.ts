import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationRequest200L,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestContract200L,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestReadiness200L,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestRunbook200L,
  normalizeStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestInput200L,
  prepareStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200L,
} from "./streamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200L.service";
import { STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION } from "./streamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200L.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200l_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_REQUEST_200L_VERSION });
}

export function createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200LRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200l/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestReadiness200L()); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200l/separate-exact-live-provider-binding-activation-execution-approval-request-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestContract200L()); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/gifts/ledger/200l/separate-exact-live-provider-binding-activation-execution-approval-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequest200L(
        normalizeStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestInput200L(raw), raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200l/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalRequestRunbook200L());
  });

  router.post("/api/admin/stream/gifts/ledger/200l/next-separate-exact-live-provider-binding-activation-execution-approval-verification-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationRequest200L());
  });

  return router;
}
