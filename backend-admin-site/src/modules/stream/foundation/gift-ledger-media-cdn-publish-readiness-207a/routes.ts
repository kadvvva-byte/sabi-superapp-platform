import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_OWNER_APPROVAL,
  createStreamGiftLedgerMediaCdnPublishReadiness207AAdminToggleRequest,
  createStreamGiftLedgerMediaCdnPublishReadiness207APublishRequest,
  getStreamGiftLedgerMediaCdnPublishReadiness207A,
  getStreamGiftLedgerMediaCdnPublishReadiness207AContract,
  getStreamGiftLedgerMediaCdnPublishReadiness207ARunbook,
  prepareStreamGiftLedgerMediaCdnPublishReadiness207A,
} from "./service";

export function createStreamGiftLedgerMediaCdnPublishReadiness207ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/207a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishReadiness207A());
  });

  router.get("/api/admin/stream/gifts/ledger/207a/media-cdn-publish-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishReadiness207AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/207a/media-cdn-publish-readiness", (req, res) => {
    const result = prepareStreamGiftLedgerMediaCdnPublishReadiness207A({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_READINESS_207A_OWNER_APPROVAL,
      readinessMode: req.body?.readinessMode ?? "media_cdn_publish_approval_readiness_index_only",
      acknowledged206BStage: req.body?.acknowledged206BStage ?? "206B_catalog_publish_final_handoff_clean",
      evidenceReferences: req.body?.evidenceReferences,
      readinessAreas: req.body?.readinessAreas,
      mediaProfiles: req.body?.mediaProfiles,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/207a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishReadiness207ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/207a/media-cdn-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerMediaCdnPublishReadiness207APublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/207a/admin-media-cdn-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerMediaCdnPublishReadiness207AAdminToggleRequest());
  });

  return router;
}
