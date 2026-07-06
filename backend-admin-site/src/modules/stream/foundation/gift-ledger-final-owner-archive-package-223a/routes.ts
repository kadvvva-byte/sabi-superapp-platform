import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS,
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES,
  createStreamGiftLedgerFinalOwnerArchivePackage223AAdminToggleRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223ADbReadWriteRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223AGiftSendExecutionRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223APayoutExecutionRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223AProviderCredentialLookupRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223AProviderRuntimeRequest,
  createStreamGiftLedgerFinalOwnerArchivePackage223AWalletPaymentRequest,
  getStreamGiftLedgerFinalOwnerArchivePackage223A,
  getStreamGiftLedgerFinalOwnerArchivePackage223AContract,
  getStreamGiftLedgerFinalOwnerArchivePackage223ARunbook,
  prepareStreamGiftLedgerFinalOwnerArchivePackage223A,
} from "./service";

const withDefaultApproval = () => ({
  ownerApproval: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_OWNER_APPROVAL,
  ownerArchiveMode: "final_owner_archive_package_index_only" as const,
  acknowledged222BStage: "222B_owner_execution_handoff_final_handoff_clean" as const,
  acknowledged221BStage: "221B_final_archive_readiness_final_handoff_clean" as const,
  acknowledged220BStage: "220B_execution_approval_boundary_final_handoff_clean" as const,
  evidenceReferences: [
    ".data/stream/gifts/backend-stream-gifts-ledger-222b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-222b-handoff.md",
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-221b-handoff.md",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-report.json",
    ".data/stream/gifts/backend-stream-gifts-ledger-220b-handoff.md",
  ],
  requiredArtifacts: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_ARTIFACTS,
  requiredSurfaces: STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_PACKAGE_223A_REQUIRED_SURFACES,
  operatorNote: "223A final owner archive package index only; no runtime enablement.",
});

export function createStreamGiftLedgerFinalOwnerArchivePackage223ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/223a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchivePackage223A());
  });

  router.get("/api/admin/stream/gifts/ledger/223a/archive-package-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchivePackage223AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/owner-archive-package", (_req, res) => {
    res.status(200).json(prepareStreamGiftLedgerFinalOwnerArchivePackage223A(withDefaultApproval()));
  });

  router.get("/api/admin/stream/gifts/ledger/223a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchivePackage223ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-launch-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223ALaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-provider-credential-lookup-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223AProviderCredentialLookupRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-provider-runtime-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223AProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-gift-send-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223AGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-wallet-payment-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223AWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-payout-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223APayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-db-read-write-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223ADbReadWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/223a/future-admin-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchivePackage223AAdminToggleRequest());
  });

  return router;
}
