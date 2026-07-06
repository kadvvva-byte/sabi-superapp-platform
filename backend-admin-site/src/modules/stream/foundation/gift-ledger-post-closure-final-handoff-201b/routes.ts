import { Router } from "express";
import {
  createStreamGiftLedgerFutureRuntimeExecutionRequest201B,
  getStreamGiftLedgerPostClosureFinalHandoff201B,
  getStreamGiftLedgerPostClosureFinalHandoffContract201B,
  getStreamGiftLedgerPostClosureFinalHandoffRunbook201B,
  normalizeStreamGiftLedgerPostClosureFinalHandoffInput201B,
  prepareStreamGiftLedgerPostClosureFinalHandoff201B,
} from "./service";

export function createStreamGiftLedgerPostClosureFinalHandoff201BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/201b/readiness", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureFinalHandoff201B());
  });

  router.get("/api/admin/stream/gifts/ledger/201b/post-closure-final-handoff-contract", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureFinalHandoffContract201B());
  });

  router.post("/api/admin/stream/gifts/ledger/201b/post-closure-final-handoff", (req, res) => {
    const rawBody = (req.body ?? {}) as Record<string, unknown>;
    const normalized = normalizeStreamGiftLedgerPostClosureFinalHandoffInput201B(rawBody);
    const result = prepareStreamGiftLedgerPostClosureFinalHandoff201B(normalized, rawBody);
    res.status(result.ok ? 200 : 423).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/201b/runbook", (_req, res) => {
    res.status(200).json(getStreamGiftLedgerPostClosureFinalHandoffRunbook201B());
  });

  router.post("/api/admin/stream/gifts/ledger/201b/future-runtime-execution-request", (_req, res) => {
    res.status(423).json(createStreamGiftLedgerFutureRuntimeExecutionRequest201B());
  });

  return router;
}
