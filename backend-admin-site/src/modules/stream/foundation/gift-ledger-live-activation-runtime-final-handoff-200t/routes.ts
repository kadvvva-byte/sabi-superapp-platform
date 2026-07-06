import { Router } from "express";
import {
  createStreamGiftLedgerFutureLiveActivationRuntimeExecutionPackageRequest200T,
  getStreamGiftLedgerLiveActivationRuntimeFinalHandoffContract200T,
  getStreamGiftLedgerLiveActivationRuntimeFinalHandoffReadiness200T,
  getStreamGiftLedgerLiveActivationRuntimeFinalHandoffRunbook200T,
  normalizeStreamGiftLedgerLiveActivationRuntimeFinalHandoffInput200T,
  prepareStreamGiftLedgerLiveActivationRuntimeFinalHandoff200T,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeFinalHandoff200TRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200t/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeFinalHandoffReadiness200T());
  });

  router.get("/api/admin/stream/gifts/ledger/200t/live-activation-runtime-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeFinalHandoffContract200T());
  });

  router.post("/api/admin/stream/gifts/ledger/200t/live-activation-runtime-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeFinalHandoffInput200T(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeFinalHandoff200T(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200t/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeFinalHandoffRunbook200T());
  });

  router.post("/api/admin/stream/gifts/ledger/200t/next-live-activation-runtime-execution-package-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureLiveActivationRuntimeExecutionPackageRequest200T());
  });

  return router;
}
