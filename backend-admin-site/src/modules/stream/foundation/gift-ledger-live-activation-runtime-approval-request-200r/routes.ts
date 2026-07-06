import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationRuntimeApprovalVerificationRequest200R,
  getStreamGiftLedgerLiveActivationRuntimeApprovalRequestContract200R,
  getStreamGiftLedgerLiveActivationRuntimeApprovalRequestReadiness200R,
  getStreamGiftLedgerLiveActivationRuntimeApprovalRequestRunbook200R,
  normalizeStreamGiftLedgerLiveActivationRuntimeApprovalRequestInput200R,
  prepareStreamGiftLedgerLiveActivationRuntimeApprovalRequest200R,
} from "./service";

export function createStreamGiftLedgerLiveActivationRuntimeApprovalRequest200RRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200r/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalRequestReadiness200R());
  });

  router.get("/api/admin/stream/gifts/ledger/200r/live-activation-runtime-approval-request-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalRequestContract200R());
  });

  router.post("/api/admin/stream/gifts/ledger/200r/live-activation-runtime-approval-request", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationRuntimeApprovalRequestInput200R(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationRuntimeApprovalRequest200R(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200r/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationRuntimeApprovalRequestRunbook200R());
  });

  router.post("/api/admin/stream/gifts/ledger/200r/next-live-activation-runtime-approval-verification-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationRuntimeApprovalVerificationRequest200R());
  });

  return router;
}
