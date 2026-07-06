import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerLiveProviderBindingDryRunRequest200B,
  getStreamGiftLedgerProviderReferenceLabelsVerificationContract200B,
  getStreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B,
  getStreamGiftLedgerProviderReferenceLabelsVerificationRunbook200B,
  normalizeStreamGiftLedgerProviderReferenceLabelsVerificationInput200B,
  verifyStreamGiftLedgerProviderReferenceLabels200B,
} from "./streamGiftLedgerProviderReferenceLabelsVerification200B.service";
import { STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION } from "./streamGiftLedgerProviderReferenceLabelsVerification200B.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200b_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_PROVIDER_REFERENCE_LABELS_VERIFICATION_200B_VERSION });
}

export function createStreamGiftLedgerProviderReferenceLabelsVerification200BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200b/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerProviderReferenceLabelsVerificationReadiness200B());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200b/provider-reference-labels-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerProviderReferenceLabelsVerificationContract200B());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200b/verify-provider-reference-labels", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = verifyStreamGiftLedgerProviderReferenceLabels200B(
        normalizeStreamGiftLedgerProviderReferenceLabelsVerificationInput200B(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200b/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerProviderReferenceLabelsVerificationRunbook200B());
  });

  router.post("/api/admin/stream/gifts/ledger/200b/next-live-provider-binding-dry-run-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerLiveProviderBindingDryRunRequest200B());
  });

  return router;
}
