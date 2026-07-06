import { Router } from "express";
import {
  createStreamGiftLedgerAssetPolicyFinalHandoff204BPublishRequest,
  getStreamGiftLedgerAssetPolicyFinalHandoff204B,
  getStreamGiftLedgerAssetPolicyFinalHandoff204BContract,
  getStreamGiftLedgerAssetPolicyFinalHandoff204BRunbook,
  normalizeStreamGiftLedgerAssetPolicyFinalHandoffInput204B,
  prepareStreamGiftLedgerAssetPolicyFinalHandoff204B,
} from "./service";

export function createStreamGiftLedgerAssetPolicyFinalHandoff204BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/204b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyFinalHandoff204B());
  });

  router.get("/api/admin/stream/gifts/ledger/204b/asset-policy-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyFinalHandoff204BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/204b/asset-policy-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerAssetPolicyFinalHandoffInput204B(rawBody);
    const result = prepareStreamGiftLedgerAssetPolicyFinalHandoff204B(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/204b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyFinalHandoff204BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/204b/asset-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAssetPolicyFinalHandoff204BPublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/204b/admin-asset-quality-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAssetPolicyFinalHandoff204BPublishRequest());
  });

  return router;
}
