import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerOwnerFilledProviderReferenceLabelsRequest200A,
  getStreamGiftLedgerControlledLiveProviderBindingApprovalContract200A,
  getStreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A,
  getStreamGiftLedgerControlledLiveProviderBindingApprovalRunbook200A,
  normalizeStreamGiftLedgerControlledLiveProviderBindingApprovalInput200A,
  prepareStreamGiftLedgerControlledLiveProviderBindingApproval200A,
} from "./streamGiftLedgerControlledLiveProviderBindingApproval200A.service";
import { STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION } from "./streamGiftLedgerControlledLiveProviderBindingApproval200A.types";

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
  res.status(403).json({ ok: false, error: "admin_forbidden", version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION });
  return false;
}

function fail(res: Response, error: unknown): void {
  const message = error instanceof Error ? error.message : "stream_gift_ledger_200a_unknown_error";
  res.status(409).json({ ok: false, error: message, version: STREAM_GIFT_LEDGER_CONTROLLED_LIVE_PROVIDER_BINDING_APPROVAL_200A_VERSION });
}

export function createStreamGiftLedgerControlledLiveProviderBindingApproval200ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200a/readiness", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledLiveProviderBindingApprovalReadiness200A());
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200a/live-provider-binding-approval-contract", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      res.json(getStreamGiftLedgerControlledLiveProviderBindingApprovalContract200A());
    } catch (error) {
      fail(res, error);
    }
  });

  router.post("/api/admin/stream/gifts/ledger/200a/controlled-live-binding-approval", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    try {
      const raw = body(req);
      const result = prepareStreamGiftLedgerControlledLiveProviderBindingApproval200A(
        normalizeStreamGiftLedgerControlledLiveProviderBindingApprovalInput200A(raw),
        raw,
      );
      res.status(result.ok ? 200 : 423).json(result);
    } catch (error) {
      fail(res, error);
    }
  });

  router.get("/api/admin/stream/gifts/ledger/200a/runbook", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.json(getStreamGiftLedgerControlledLiveProviderBindingApprovalRunbook200A());
  });

  router.post("/api/admin/stream/gifts/ledger/200a/next-owner-filled-provider-reference-labels-request", (req: Request, res: Response) => {
    if (!requireAdminToken(req, res)) return;
    res.status(423).json(createStreamGiftLedgerOwnerFilledProviderReferenceLabelsRequest200A());
  });

  return router;
}
