import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS,
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES,
  createStreamGiftLedgerOwnerExecutionHandoff222AAdminToggleRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222ADbReadWriteRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222AGiftSendExecutionRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222APayoutExecutionRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222AProviderCredentialLookupRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222AProviderRuntimeRequest,
  createStreamGiftLedgerOwnerExecutionHandoff222AWalletPaymentRequest,
  getStreamGiftLedgerOwnerExecutionHandoff222A,
  getStreamGiftLedgerOwnerExecutionHandoff222AContract,
  getStreamGiftLedgerOwnerExecutionHandoff222ARunbook,
  prepareStreamGiftLedgerOwnerExecutionHandoff222A,
} from "./service";

const withDefaultApproval = () => ({
  ownerApproval: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_OWNER_APPROVAL,
  handoffMode: "owner_execution_handoff_index_only" as const,
  acknowledged221BStage: "221B_final_archive_readiness_final_handoff_clean" as const,
  acknowledged220BStage: "220B_execution_approval_boundary_final_handoff_clean" as const,
  evidenceReferences: [
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-handoff.md",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-handoff.md",
  ],
  requiredApprovals: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_APPROVALS,
  requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_HANDOFF_222A_REQUIRED_SURFACES,
  operatorNote: "222A owner handoff index only; no runtime enablement.",
});

export function createStreamGiftLedgerOwnerExecutionHandoff222ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/222a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionHandoff222A());
  });

  router.get("/api/admin/stream/gifts/ledger/222a/approval-template", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionHandoff222AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/owner-handoff-index", (_req, res) => {
    res.status(200).json(prepareStreamGiftLedgerOwnerExecutionHandoff222A(withDefaultApproval()));
  });

  router.get("/api/admin/stream/gifts/ledger/222a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionHandoff222ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-launch-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222ALaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-provider-credential-lookup-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222AProviderCredentialLookupRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-provider-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222AProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-gift-send-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222AGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-wallet-payment-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222AWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222APayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-db-read-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222ADbReadWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222a/future-admin-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionHandoff222AAdminToggleRequest());
  });

  return router;
}
