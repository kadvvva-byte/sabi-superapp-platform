import { Router, type Request, type Response } from "express";
import {
  getStreamGiftLedgerRealProviderBindingApprovalContract199A,
  getStreamGiftLedgerRealProviderBindingApprovalReadiness199A,
  getStreamGiftLedgerRealProviderBindingApprovalRunbook199A,
  normalizeStreamGiftLedgerRealProviderBindingApprovalInput199A,
  prepareStreamGiftLedgerRealProviderBindingApprovalRequest199A,
} from "./streamGiftLedgerRealProviderBindingApproval199A.service";
import { STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION } from "./streamGiftLedgerRealProviderBindingApproval199A.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION });
  return false;
}

export function createStreamGiftLedgerRealProviderBindingApproval199ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199a/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealProviderBindingApprovalReadiness199A());
  });

  router.get("/api/admin/stream/gifts/ledger/199a/approval-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealProviderBindingApprovalContract199A());
  });

  router.post("/api/admin/stream/gifts/ledger/199a/exact-owner-approval-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    const raw = (req.body || {}) as Record<string, unknown>;
    const input = normalizeStreamGiftLedgerRealProviderBindingApprovalInput199A(raw);
    const result = prepareStreamGiftLedgerRealProviderBindingApprovalRequest199A(input, raw);
    res.status(result.status === "real_provider_binding_exact_owner_approval_prepared_not_executed" ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/199a/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerRealProviderBindingApprovalRunbook199A());
  });

  router.post("/api/admin/stream/gifts/ledger/199a/next-provider-config-readiness-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json({
      ok: false,
      version: STREAM_GIFT_LEDGER_REAL_PROVIDER_BINDING_APPROVAL_199A_VERSION,
      status: "next_stage_requires_separate_199b_patch",
      nextStage: "199B_provider_config_readiness_reference_labels_only",
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      payoutExecutionAllowed: false,
    });
  });

  return router;
}
