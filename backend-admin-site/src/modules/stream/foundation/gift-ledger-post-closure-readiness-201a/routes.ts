import { Router } from "express";
import {
  createStreamGiftLedgerFutureRuntimeExecutionRequest201A,
  getStreamGiftLedgerPostClosureReadiness201A,
  getStreamGiftLedgerPostClosureReadinessContract201A,
  getStreamGiftLedgerPostClosureReadinessRunbook201A,
  normalizeStreamGiftLedgerPostClosureReadinessInput201A,
  prepareStreamGiftLedgerPostClosureReadiness201A,
} from "./service";

export function createStreamGiftLedgerPostClosureReadiness201ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/201a/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureReadiness201A());
  });

  router.get("/api/admin/stream/gifts/ledger/201a/post-closure-readiness-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureReadinessContract201A());
  });

  router.post("/api/admin/stream/gifts/ledger/201a/post-closure-readiness-index", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerPostClosureReadinessInput201A(rawBody);
    const result = prepareStreamGiftLedgerPostClosureReadiness201A(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/201a/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureReadinessRunbook201A());
  });

  router.post("/api/admin/stream/gifts/ledger/201a/future-runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureRuntimeExecutionRequest201A());
  });

  return router;
}
