import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeFinalHandoffRequest200S,
  getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationContract200S,
  getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S,
  getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationRunbook200S,
  normalizeStreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S,
  prepareStreamGiftLedgerLiveActivationRuntimeApprovalVerification200S,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeApprovalVerification200SRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200s/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationReadiness200S());
  });

  router.get("/api/admin/stream/gifts/ledger/200s/live-activation-runtime-approval-verification-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationContract200S());
  });

  router.post("/api/admin/stream/gifts/ledger/200s/live-activation-runtime-approval-verification", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeApprovalVerificationInput200S(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeApprovalVerification200S(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200s/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalVerificationRunbook200S());
  });

  router.post("/api/admin/stream/gifts/ledger/200s/next-live-activation-runtime-final-handoff-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeFinalHandoffRequest200S());
  });

  return router;
}
