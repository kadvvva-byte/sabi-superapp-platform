import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeExecutionExactApprovalVerificationRequest200X,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestContract200X,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestReadiness200X,
  getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestRunbook200X,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestInput200X,
  prepareStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequest200X,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequest200XRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200x/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestReadiness200X());
  });

  router.get("/api/admin/stream/gifts/ledger/200x/live-activation-runtime-execution-exact-approval-request-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestContract200X());
  });

  router.post("/api/admin/stream/gifts/ledger/200x/live-activation-runtime-execution-exact-approval-request", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestInput200X(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequest200X(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200x/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecExactApprovalRequestRunbook200X());
  });

  router.post("/api/admin/stream/gifts/ledger/200x/next-live-activation-runtime-execution-exact-approval-verification-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeExecutionExactApprovalVerificationRequest200X());
  });

  return router;
}
