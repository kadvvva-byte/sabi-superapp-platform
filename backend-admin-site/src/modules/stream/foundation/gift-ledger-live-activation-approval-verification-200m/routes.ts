import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionFinalHandoffRequest200M,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationContract200M,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationReadiness200M,
  getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationRunbook200M,
  normalizeStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationInput200M,
  prepareStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerification200M,
} from "./service";
import { STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION } from "./types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200m_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_SEPARATE_EXACT_LIVE_PROVIDER_BINDING_ACTIVATION_EXECUTION_APPROVAL_VERIFICATION_200M_VERSION });
}

export function createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerification200MRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200m/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationReadiness200M()); } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200m/separate-exact-live-provider-binding-activation-execution-approval-verification-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try { res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationContract200M()); } catch (error) { fail(res, error); }
  });

  router.post("/api/admin/stream/gifts/ledger/200m/separate-exact-live-provider-binding-activation-execution-approval-verification", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerification200M(
        normalizeStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationInput200M(raw), raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) { fail(res, error); }
  });

  router.get("/api/admin/stream/gifts/ledger/200m/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionApprovalVerificationRunbook200M());
  });

  router.post("/api/admin/stream/gifts/ledger/200m/next-separate-exact-live-provider-binding-activation-execution-final-handoff-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerSeparateExactLiveProviderBindingActivationExecutionFinalHandoffRequest200M());
  });

  return router;
}
