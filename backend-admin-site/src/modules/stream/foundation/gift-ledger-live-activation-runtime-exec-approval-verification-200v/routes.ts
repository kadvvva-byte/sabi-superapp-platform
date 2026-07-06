import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeExecutionFinalHandoffRequest200V,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationContract200V,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationReadiness200V,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationRunbook200V,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationInput200V,
  prepareStreamGiftLedgerLiveActivationRuntimeExecApprovalVerification200V,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecApprovalVerification200VRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200v/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationReadiness200V());
  });

  router.get("/api/admin/stream/gifts/ledger/200v/live-activation-runtime-execution-approval-verification-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationContract200V());
  });

  router.post("/api/admin/stream/gifts/ledger/200v/live-activation-runtime-execution-approval-verification", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationInput200V(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecApprovalVerification200V(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200v/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalVerificationRunbook200V());
  });

  router.post("/api/admin/stream/gifts/ledger/200v/next-live-activation-runtime-execution-final-handoff-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeExecutionFinalHandoffRequest200V());
  });

  return router;
}
