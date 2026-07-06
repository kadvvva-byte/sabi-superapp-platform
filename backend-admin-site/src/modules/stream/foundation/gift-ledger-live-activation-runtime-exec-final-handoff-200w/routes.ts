import { Router } from "express";
import {
  createStreamGiftLedgerFutureLiveActivationRuntimeExecutionRequest200W,
  getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffContract200W,
  getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffReadiness200W,
  getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffRunbook200W,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffInput200W,
  prepareStreamGiftLedgerLiveActivationRuntimeExecFinalHandoff200W,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecFinalHandoff200WRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200w/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffReadiness200W());
  });

  router.get("/api/admin/stream/gifts/ledger/200w/live-activation-runtime-execution-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffContract200W());
  });

  router.post("/api/admin/stream/gifts/ledger/200w/live-activation-runtime-execution-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffInput200W(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecFinalHandoff200W(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200w/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecFinalHandoffRunbook200W());
  });

  router.post("/api/admin/stream/gifts/ledger/200w/next-live-activation-runtime-execution-package-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureLiveActivationRuntimeExecutionRequest200W());
  });

  return router;
}
