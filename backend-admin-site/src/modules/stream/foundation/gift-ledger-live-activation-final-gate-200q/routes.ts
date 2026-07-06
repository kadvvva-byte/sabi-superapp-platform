import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimePackageRequest200Q,
  getStreamGiftLedgerLiveActivationFinalGateContract200Q,
  getStreamGiftLedgerLiveActivationFinalGateReadiness200Q,
  getStreamGiftLedgerLiveActivationFinalGateRunbook200Q,
  normalizeStreamGiftLedgerLiveActivationFinalGateInput200Q,
  prepareStreamGiftLedgerLiveActivationFinalGate200Q,
} from "./service";

export function createStreamGiftLedgerLiveActivationFinalGate200QRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200q/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalGateReadiness200Q());
  });

  router.get("/api/admin/stream/gifts/ledger/200q/live-activation-final-gate-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalGateContract200Q());
  });

  router.post("/api/admin/stream/gifts/ledger/200q/live-activation-final-gate", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationFinalGateInput200Q(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationFinalGate200Q(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200q/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationFinalGateRunbook200Q());
  });

  router.post("/api/admin/stream/gifts/ledger/200q/next-live-activation-runtime-package-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimePackageRequest200Q());
  });

  return router;
}
