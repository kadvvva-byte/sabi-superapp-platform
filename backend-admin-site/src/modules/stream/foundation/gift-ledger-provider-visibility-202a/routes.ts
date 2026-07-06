import { Router } from "express";
import {
  createStreamGiftLedgerProviderVisibility202ARuntimeRequest,
  getStreamGiftLedgerProviderVisibility202AContract,
  getStreamGiftLedgerProviderVisibility202AReadiness,
  getStreamGiftLedgerProviderVisibility202ARunbook,
  normalizeStreamGiftLedgerProviderVisibilityInput202A,
  prepareStreamGiftLedgerProviderVisibility202A,
} from "./service";

export function createStreamGiftLedgerProviderVisibility202ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/202a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibility202AReadiness());
  });

  router.get("/api/admin/stream/gifts/ledger/202a/provider-visibility-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibility202AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/202a/provider-visibility-index", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerProviderVisibilityInput202A(rawBody);
    const result = prepareStreamGiftLedgerProviderVisibility202A(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/202a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibility202ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/202a/runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerProviderVisibility202ARuntimeRequest());
  });

  return router;
}
