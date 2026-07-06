import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_OWNER_APPROVAL,
  STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS,
  STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES,
  createStreamGiftLedgerClosureMarker224ADbReadWriteRequest,
  createStreamGiftLedgerClosureMarker224AGiftSendExecutionRequest,
  createStreamGiftLedgerClosureMarker224ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerClosureMarker224ANextGiftLedgerArchiveStageRequest,
  createStreamGiftLedgerClosureMarker224AProviderCredentialLookupRequest,
  getStreamGiftLedgerClosureMarker224A,
  getStreamGiftLedgerClosureMarker224AContract,
  getStreamGiftLedgerClosureMarker224ARunbook,
  prepareStreamGiftLedgerClosureMarker224A,
} from "./service";

export function createStreamGiftLedgerClosureMarker224ARouter(): Router {
  const router = Router();
  const basePath = "/api/admin/stream/gifts/ledger/224a";

  router.get(`${basePath}/closure`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerClosureMarker224A());
  });

  router.get(`${basePath}/contract`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerClosureMarker224AContract());
  });

  router.get(`${basePath}/runbook`, (_req, res) => {
    res.status(200).json(getStreamGiftLedgerClosureMarker224ARunbook());
  });

  router.post(`${basePath}/closure-marker`, (req, res) => {
    const body = (req.body ?? {}) as Partial<Parameters<typeof prepareStreamGiftLedgerClosureMarker224A>[0]>;
    const result = prepareStreamGiftLedgerClosureMarker224A({
      ownerApproval: body.ownerApproval ?? STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_OWNER_APPROVAL,
      closureMode: body.closureMode ?? "gift_ledger_closed_no_more_archive_layers",
      acknowledged223BStage: body.acknowledged223BStage ?? "223B_final_owner_archive_package_final_handoff_clean",
      acknowledged222BStage: body.acknowledged222BStage ?? "222B_owner_execution_handoff_final_handoff_clean",
      acknowledged221BStage: body.acknowledged221BStage ?? "221B_final_archive_readiness_final_handoff_clean",
      evidenceReferences: body.evidenceReferences ?? [
        ".data/stream/gifts/backend-stream-gifts-ledger-223b-report.json",
        ".data/stream/gifts/backend-stream-gifts-ledger-223b-handoff.md",
        ".data/stream/gifts/backend-stream-gifts-ledger-222b-report.json",
        ".data/stream/gifts/backend-stream-gifts-ledger-221b-report.json",
      ],
      requiredArtifacts: body.requiredArtifacts ?? STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_ARTIFACTS,
      requiredSurfaces: body.requiredSurfaces ?? STREAM_GIFT_LEDGER_CLOSURE_MARKER_224A_REQUIRED_SURFACES,
      operatorNote: body.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.post(`${basePath}/next-gift-ledger-archive-stage-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerClosureMarker224ANextGiftLedgerArchiveStageRequest());
  });
  router.post(`${basePath}/launch-runtime-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerClosureMarker224ALaunchRuntimeEnablementRequest());
  });
  router.post(`${basePath}/provider-credential-lookup-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerClosureMarker224AProviderCredentialLookupRequest());
  });
  router.post(`${basePath}/db-read-write-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerClosureMarker224ADbReadWriteRequest());
  });
  router.post(`${basePath}/gift-send-execution-request`, (_req, res) => {
    res.status(423).json(createStreamGiftLedgerClosureMarker224AGiftSendExecutionRequest());
  });

  return router;
}
