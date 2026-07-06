import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS,
  STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BAdminToggleRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BDbReadWriteRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BGiftSendExecutionRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BLaunchRuntimeEnablementRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BPayoutExecutionRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderCredentialLookupRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderRuntimeRequest,
  createStreamGiftLedgerOwnerExecutionFinalHandoff222BWalletPaymentRequest,
  getStreamGiftLedgerOwnerExecutionFinalHandoff222B,
  getStreamGiftLedgerOwnerExecutionFinalHandoff222BContract,
  getStreamGiftLedgerOwnerExecutionFinalHandoff222BRunbook,
  prepareStreamGiftLedgerOwnerExecutionFinalHandoff222B,
} from "./service";

const withDefaultApproval = () => ({
  ownerApproval: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_OWNER_APPROVAL,
  finalHandoffMode: "owner_execution_final_handoff_only" as const,
  acknowledged222AStage: "222A_owner_execution_handoff_index_clean" as const,
  acknowledged221BStage: "221B_final_archive_readiness_final_handoff_clean" as const,
  acknowledged220BStage: "220B_execution_approval_boundary_final_handoff_clean" as const,
  evidenceReferences: [
    ".data/stream/gifts/backend-stream-gifts-ledger-222a-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-222a-handoff.md",
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-handoff.md",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-handoff.md",
  ],
  requiredArtifacts: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_ARTIFACTS,
  requiredSurfaces: STREAM_GIFT_LEDGER_OWNER_EXECUTION_FINAL_HANDOFF_222B_REQUIRED_SURFACES,
  operatorNote: "222B owner execution final handoff only; no runtime enablement.",
});

export function createStreamGiftLedgerOwnerExecutionFinalHandoff222BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/222b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionFinalHandoff222B());
  });

  router.get("/api/admin/stream/gifts/ledger/222b/final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionFinalHandoff222BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/owner-final-handoff", (_req, res) => {
    res.status(200).json(prepareStreamGiftLedgerOwnerExecutionFinalHandoff222B(withDefaultApproval()));
  });

  router.get("/api/admin/stream/gifts/ledger/222b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerOwnerExecutionFinalHandoff222BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-launch-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BLaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-provider-credential-lookup-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderCredentialLookupRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-provider-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-gift-send-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-wallet-payment-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BPayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-db-read-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BDbReadWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/222b/future-admin-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerOwnerExecutionFinalHandoff222BAdminToggleRequest());
  });

  return router;
}
