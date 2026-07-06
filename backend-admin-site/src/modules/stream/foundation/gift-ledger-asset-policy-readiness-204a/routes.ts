import { Router } from "express";
import {
  createStreamGiftLedgerAssetPolicyReadiness204APublishRequest,
  getStreamGiftLedgerAssetPolicyReadiness204A,
  getStreamGiftLedgerAssetPolicyReadiness204AContract,
  getStreamGiftLedgerAssetPolicyReadiness204ARunbook,
  normalizeStreamGiftLedgerAssetPolicyReadinessInput204A,
  prepareStreamGiftLedgerAssetPolicyReadiness204A,
} from "./service";

export function createStreamGiftLedgerAssetPolicyReadiness204ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/204a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyReadiness204A());
  });

  router.get("/api/admin/stream/gifts/ledger/204a/asset-policy-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyReadiness204AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/204a/asset-policy-readiness-index", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerAssetPolicyReadinessInput204A(rawBody);
    const result = prepareStreamGiftLedgerAssetPolicyReadiness204A(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/204a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerAssetPolicyReadiness204ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/204a/asset-publish-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAssetPolicyReadiness204APublishRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/204a/admin-asset-quality-toggle-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerAssetPolicyReadiness204APublishRequest());
  });

  return router;
}
