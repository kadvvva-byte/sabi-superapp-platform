import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeExecutionExactFinalHandoffRequest200Y,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationContract200Y,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationReadiness200Y,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationRunbook200Y,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationInput200Y,
  prepareStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerification200Y,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerification200YRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200y/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationReadiness200Y());
  });

  router.get("/api/admin/stream/gifts/ledger/200y/live-activation-runtime-execution-exact-approval-verification-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationContract200Y());
  });

  router.post("/api/admin/stream/gifts/ledger/200y/live-activation-runtime-execution-exact-approval-verification", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationInput200Y(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerification200Y(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200y/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalVerificationRunbook200Y());
  });

  router.post("/api/admin/stream/gifts/ledger/200y/next-live-activation-runtime-execution-exact-final-handoff-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeExecutionExactFinalHandoffRequest200Y());
  });

  return router;
}
