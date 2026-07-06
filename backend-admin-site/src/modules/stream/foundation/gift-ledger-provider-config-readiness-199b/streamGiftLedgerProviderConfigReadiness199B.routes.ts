import { Router, type Request, type Response } from "express";
import {
  getStreamGiftLedgerProviderConfigReadiness199B,
  getStreamGiftLedgerProviderConfigReadinessContract199B,
  getStreamGiftLedgerProviderConfigReadinessRunbook199B,
  normalizeStreamGiftLedgerProviderConfigReadinessInput199B,
  prepareStreamGiftLedgerProviderConfigReadiness199B,
} from "./streamGiftLedgerProviderConfigReadiness199B.service";
import { STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION } from "./streamGiftLedgerProviderConfigReadiness199B.types";

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION });
  return false;
}

export function createStreamGiftLedgerProviderConfigReadiness199BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/199b/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderConfigReadiness199B());
  });

  router.get("/api/admin/stream/gifts/ledger/199b/config-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderConfigReadinessContract199B());
  });

  router.post("/api/admin/stream/gifts/ledger/199b/config-readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    const raw = (req.body || {}) as Record<string, unknown>;
    const input = normalizeStreamGiftLedgerProviderConfigReadinessInput199B(raw);
    const result = prepareStreamGiftLedgerProviderConfigReadiness199B(input, raw);
    res.status(result.status === "provider_config_readiness_prepared_reference_labels_only" ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/199b/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderConfigReadinessRunbook199B());
  });

  router.post("/api/admin/stream/gifts/ledger/199b/next-payment-authorization-adapter-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json({
      ok: false,
      version: STREAM_GIFT_LEDGER_PROVIDER_CONFIG_READINESS_199B_VERSION,
      status: "next_stage_requires_separate_199c_patch",
      nextStage: "199C_payment_authorization_adapter_boundary",
      providerBindingExecuted: false,
      providerLiveCallExecuted: false,
      payoutExecutionAllowed: false,
    });
  });

  return router;
}
