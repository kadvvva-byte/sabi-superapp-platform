import { Router } from "express";
import {
  createStreamGiftLedgerLiveActivationPreExecutionDryRunRequest200O,
  getStreamGiftLedgerLiveActivationOwnerApprovalPackageContract200O,
  getStreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O,
  getStreamGiftLedgerLiveActivationOwnerApprovalPackageRunbook200O,
  normalizeStreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O,
  prepareStreamGiftLedgerLiveActivationOwnerApprovalPackage200O,
} from "./service";

export function createStreamGiftLedgerLiveActivationOwnerApprovalPackage200ORouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/200o/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationOwnerApprovalPackageReadiness200O());
  });

  router.get("/api/admin/stream/gifts/ledger/200o/live-activation-exact-owner-approval-package-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationOwnerApprovalPackageContract200O());
  });

  router.post("/api/admin/stream/gifts/ledger/200o/live-activation-exact-owner-approval-package", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerLiveActivationOwnerApprovalPackageInput200O(rawBody);
    const result = prepareStreamGiftLedgerLiveActivationOwnerApprovalPackage200O(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/200o/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerLiveActivationOwnerApprovalPackageRunbook200O());
  });

  router.post("/api/admin/stream/gifts/ledger/200o/next-live-activation-pre-execution-dry-run-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerLiveActivationPreExecutionDryRunRequest200O());
  });

  return router;
}
