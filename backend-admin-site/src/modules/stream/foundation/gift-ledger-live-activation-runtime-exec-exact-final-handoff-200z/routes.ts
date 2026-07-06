import { Router } from "express";
import {
  createStreamGiftLedgerFutureLiveActivationRuntimeExecutionExactRequest200Z,
  getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffContract200Z,
  getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffReadiness200Z,
  getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffRunbook200Z,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffInput200Z,
  prepareStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoff200Z,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoff200ZRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200z/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffReadiness200Z());
  });

  router.get("/api/admin/stream/gifts/ledger/200z/live-activation-runtime-execution-exact-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffContract200Z());
  });

  router.post("/api/admin/stream/gifts/ledger/200z/live-activation-runtime-execution-exact-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffInput200Z(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoff200Z(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200z/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactFinalHandoffRunbook200Z());
  });

  router.post("/api/admin/stream/gifts/ledger/200z/next-live-activation-runtime-execution-package-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureLiveActivationRuntimeExecutionExactRequest200Z());
  });

  return router;
}
