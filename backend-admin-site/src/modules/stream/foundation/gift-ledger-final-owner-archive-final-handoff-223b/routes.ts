import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS,
  STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BAdminToggleRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BDbReadWriteRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BGiftSendExecutionRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BLaunchRuntimeEnablementRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BPayoutExecutionRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderCredentialLookupRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderRuntimeRequest,
  createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BWalletPaymentRequest,
  getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B,
  getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BContract,
  getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRunbook,
  prepareStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B,
} from "./service";

export function createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRouter(): Router {
  const router = Router();
  const basePath = "/api/admin/stream/gifts/ledger/223b";

  router.get(`${basePath}/handoff`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B());
  });

  router.get(`${basePath}/contract`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BContract());
  });

  router.get(`${basePath}/runbook`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BRunbook());
  });

  router.post(`${basePath}/final-handoff`, (req, res) => {
    const body = (req.body ?? {}) as Partial<Parameters<typeof prepareStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B>[0]>;
    const result = prepareStreamGiftLedgerFinalOwnerArchiveFinalHandoff223B({
      ownerApproval: body.ownerApproval ?? STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_OWNER_APPROVAL,
      finalHandoffMode: body.finalHandoffMode ?? "final_owner_archive_package_final_handoff_only",
      acknowledged223AStage: body.acknowledged223AStage ?? "223A_final_owner_archive_package_index_clean",
      acknowledged222BStage: body.acknowledged222BStage ?? "222B_owner_execution_handoff_final_handoff_clean",
      acknowledged221BStage: body.acknowledged221BStage ?? "221B_final_archive_readiness_final_handoff_clean",
      acknowledged220BStage: body.acknowledged220BStage ?? "220B_execution_approval_boundary_final_handoff_clean",
      evidenceReferences: body.evidenceReferences ?? [
        ".data/stream/gifts/backend-stream-gifts-ledger-223a-report.json",
        ".data/stream/gifts/backend-stream-gifts-ledger-223a-handoff.md",
        ".data/stream/gifts/backend-stream-gifts-ledger-222b-report.json",
        ".data/stream/gifts/backend-stream-gifts-ledger-221b-report.json",
        ".data/stream/gifts/backend-stream-gifts-ledger-220b-report.json",
      ],
      requiredArtifacts: body.requiredArtifacts ?? STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_ARTIFACTS,
      requiredSurfaces: body.requiredSurfaces ?? STREAM_GIFT_LEDGER_FINAL_OWNER_ARCHIVE_FINAL_HANDOFF_223B_REQUIRED_SURFACES,
      operatorNote: body.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/launch-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BLaunchRuntimeEnablementRequest());
  });
  router.post(`${basePath}/provider-credential-lookup-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderCredentialLookupRequest());
  });
  router.post(`${basePath}/provider-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BProviderRuntimeRequest());
  });
  router.post(`${basePath}/gift-send-execution-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BGiftSendExecutionRequest());
  });
  router.post(`${basePath}/wallet-payment-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BWalletPaymentRequest());
  });
  router.post(`${basePath}/payout-execution-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BPayoutExecutionRequest());
  });
  router.post(`${basePath}/db-read-write-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BDbReadWriteRequest());
  });
  router.post(`${basePath}/admin-toggle-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFinalOwnerArchiveFinalHandoff223BAdminToggleRequest());
  });

  return router;
}
