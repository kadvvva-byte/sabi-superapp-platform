import { Router } from "express";
import {
  createStreamGiftLedgerFutureLiveActivationExecutionPackageRequest200N,
  getStreamGiftLedgerLiveActivationFinalHandoffContract200N,
  getStreamGiftLedgerLiveActivationFinalHandoffReadiness200N,
  getStreamGiftLedgerLiveActivationFinalHandoffRunbook200N,
  normalizeStreamGiftLedgerLiveActivationFinalHandoffInput200N,
  prepareStreamGiftLedgerLiveActivationFinalHandoff200N,
} from "./service";

export function createStreamGiftLedgerLiveActivationFinalHandoff200NRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200n/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalHandoffReadiness200N());
  });

  router.get("/api/admin/stream/gifts/ledger/200n/separate-exact-live-provider-binding-activation-execution-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalHandoffContract200N());
  });

  router.post("/api/admin/stream/gifts/ledger/200n/separate-exact-live-provider-binding-activation-execution-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationFinalHandoffInput200N(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationFinalHandoff200N(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200n/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalHandoffRunbook200N());
  });

  router.post("/api/admin/stream/gifts/ledger/200n/next-future-live-provider-binding-activation-execution-package-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureLiveActivationExecutionPackageRequest200N());
  });

  return router;
}
