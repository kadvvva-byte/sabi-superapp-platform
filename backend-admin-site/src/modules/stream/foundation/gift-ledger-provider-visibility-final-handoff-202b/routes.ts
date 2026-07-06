import { Router } from "express";
import {
  createStreamGiftLedgerProviderVisibilityFinalHandoff202BRuntimeRequest,
  getStreamGiftLedgerProviderVisibilityFinalHandoff202BContract,
  getStreamGiftLedgerProviderVisibilityFinalHandoff202BReadiness,
  getStreamGiftLedgerProviderVisibilityFinalHandoff202BRunbook,
  normalizeStreamGiftLedgerProviderVisibilityFinalHandoff202BInput,
  prepareStreamGiftLedgerProviderVisibilityFinalHandoff202B,
} from "./service";

export function createStreamGiftLedgerProviderVisibilityFinalHandoff202BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/202b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibilityFinalHandoff202BReadiness());
  });

  router.get("/api/admin/stream/gifts/ledger/202b/provider-visibility-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibilityFinalHandoff202BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/202b/provider-visibility-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerProviderVisibilityFinalHandoff202BInput(rawBody);
    const result = prepareStreamGiftLedgerProviderVisibilityFinalHandoff202B(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/202b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerProviderVisibilityFinalHandoff202BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/202b/runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerProviderVisibilityFinalHandoff202BRuntimeRequest());
  });

  return router;
}
