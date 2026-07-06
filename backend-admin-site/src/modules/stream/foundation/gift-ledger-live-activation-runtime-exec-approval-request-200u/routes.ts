import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeExecutionApprovalVerificationRequest200U,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestContract200U,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestReadiness200U,
  getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestRunbook200U,
  normalizeStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestInput200U,
  prepareStreamGiftLedgerLiveActivationRuntimeExecApprovalRequest200U,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeExecApprovalRequest200URouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200u/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestReadiness200U());
  });

  router.get("/api/admin/stream/gifts/ledger/200u/live-activation-runtime-execution-approval-request-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestContract200U());
  });

  router.post("/api/admin/stream/gifts/ledger/200u/live-activation-runtime-execution-approval-request", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestInput200U(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeExecApprovalRequest200U(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200u/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeExecApprovalRequestRunbook200U());
  });

  router.post("/api/admin/stream/gifts/ledger/200u/next-live-activation-runtime-execution-approval-verification-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeExecutionApprovalVerificationRequest200U());
  });

  return router;
}
