import { Router } from "express";
import {
  STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_OWNER_APPROVAL,
  createStreamGiftLedgerMediaCdnPublishFinalHandoff207BAdminToggleRequest,
  createStreamGiftLedgerMediaCdnPublishFinalHandoff207BPublishRequest,
  getStreamGiftLedgerMediaCdnPublishFinalHandoff207B,
  getStreamGiftLedgerMediaCdnPublishFinalHandoff207BContract,
  getStreamGiftLedgerMediaCdnPublishFinalHandoff207BRunbook,
  prepareStreamGiftLedgerMediaCdnPublishFinalHandoff207B,
} from "./service";

export function createStreamGiftLedgerMediaCdnPublishFinalHandoff207BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/207b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishFinalHandoff207B());
  });

  router.get("/api/admin/stream/gifts/ledger/207b/media-cdn-publish-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishFinalHandoff207BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/207b/media-cdn-publish-final-handoff", (req, res) => {
    const result = prepareStreamGiftLedgerMediaCdnPublishFinalHandoff207B({
      ownerApproval: req.body?.ownerApproval ?? STREAM_GIFT_LEDGER_MEDIA_CDN_PUBLISH_FINAL_HANDOFF_207B_OWNER_APPROVAL,
      handoffMode: req.body?.handoffMode ?? "media_cdn_publish_readiness_final_handoff_only",
      acknowledged207AStage: req.body?.acknowledged207AStage ?? "207A_media_cdn_publish_readiness_index_clean",
      evidenceReferences: req.body?.evidenceReferences,
      handoffAreas: req.body?.handoffAreas,
      mediaProfiles: req.body?.mediaProfiles,
      operatorNote: req.body?.operatorNote,
    });
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/207b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerMediaCdnPublishFinalHandoff207BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/207b/media-cdn-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerMediaCdnPublishFinalHandoff207BPublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/207b/admin-media-cdn-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerMediaCdnPublishFinalHandoff207BAdminToggleRequest());
  });

  return router;
}
