import { Router, type Request, type Response } from "express";
import {
  assertStreamGiftLedgerProviderAuthorization198NRemainsSafe,
  createBlockedStreamGiftLedgerProviderAuthorization198N,
  createStreamGiftLedgerProviderAuthorizationContract198N,
  createStreamGiftLedgerProviderAuthorizedCommitRequest198N,
  getStreamGiftLedgerProviderAuthorizationReadiness198N,
  getStreamGiftLedgerProviderAuthorizationRunbook198N,
  normalizeStreamGiftLedgerProviderAuthorizationContract198N,
} from "./streamGiftLedgerProviderAuthorizationContract198N.service";
import { STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION } from "./streamGiftLedgerProviderAuthorizationContract198N.types";

function body(req: Request): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

function requireAdminToken(req: Request, res: Response): boolean {
  const expected = String(process.env.SABI_ADMIN_PANEL_TOKEN || process.env.ADMIN_PANEL_TOKEN || process.env.ADMIN_TOKEN || "").trim();
  if (!expected) return true;
  const header = String(req.headers["x-admin-token"] || "").trim();
  const authorization = String(req.headers.authorization || "");
  const bearer = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7).trim() : "";
  if (header === expected || bearer === expected) return true;
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  if (message === "raw_provider_token_rejected") {
    res.status(400).json(createBlockedStreamGiftLedgerProviderAuthorization198N("raw_provider_token_rejected"));
    return;
  }
  if (message === "provider_reference_hash_required") {
    res.status(423).json(createBlockedStreamGiftLedgerProviderAuthorization198N("provider_reference_hash_required"));
    return;
  }
  if (message === "provider_reference_hash_must_be_sha256_hex") {
    res.status(400).json(createBlockedStreamGiftLedgerProviderAuthorization198N("provider_reference_hash_must_be_sha256_hex"));
    return;
  }
  if (message === "send_intent_required_field_missing") {
    res.status(400).json(createBlockedStreamGiftLedgerProviderAuthorization198N("send_intent_required_field_missing"));
    return;
  }
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_PROVIDER_AUTH_CONTRACT_198N_VERSION });
}

export function createStreamGiftLedgerProviderAuthorizationContract198NRouter(): Router {
  const router = Router();
  assertStreamGiftLedgerProviderAuthorization198NRemainsSafe();

  router.get("/api/admin/stream/gifts/ledger/198n/readiness", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderAuthorizationReadiness198N());
  });

  router.get("/api/admin/stream/gifts/ledger/198n/runbook", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderAuthorizationRunbook198N());
  });

  router.post("/api/stream/gifts/ledger/198n/provider-authorization-contract", (req, res) => {
    try {
      const input = normalizeStreamGiftLedgerProviderAuthorizationContract198N(body(req));
      res.json(createStreamGiftLedgerProviderAuthorizationContract198N(input));
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/198n/next-provider-authorized-commit-request", (req, res) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerProviderAuthorizedCommitRequest198N());
  });

  return router;
}
