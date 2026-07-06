import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationExecutionFinalGateRequest200P,
  getStreamGiftLedgerLiveActivationPreExecDryRunContract200P,
  getStreamGiftLedgerLiveActivationPreExecDryRunReadiness200P,
  getStreamGiftLedgerLiveActivationPreExecDryRunRunbook200P,
  normalizeStreamGiftLedgerLiveActivationPreExecDryRunInput200P,
  prepareStreamGiftLedgerLiveActivationPreExecDryRun200P,
} from "./service";

export function createStreamGiftLedgerLiveActivationPreExecDryRun200PRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200p/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationPreExecDryRunReadiness200P());
  });

  router.get("/api/admin/stream/gifts/ledger/200p/live-activation-pre-execution-dry-run-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationPreExecDryRunContract200P());
  });

  router.post("/api/admin/stream/gifts/ledger/200p/live-activation-pre-execution-dry-run", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationPreExecDryRunInput200P(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationPreExecDryRun200P(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200p/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationPreExecDryRunRunbook200P());
  });

  router.post("/api/admin/stream/gifts/ledger/200p/next-live-activation-execution-final-gate-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationExecutionFinalGateRequest200P());
  });

  return router;
}
