import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerLaunchReadiness219BDbReadWriteRequest,
  createStreamGiftLedgerLaunchReadiness219BGiftSendExecutionRequest,
  createStreamGiftLedgerLaunchReadiness219BLaunchRuntimeEnablementRequest,
  createStreamGiftLedgerLaunchReadiness219BProviderBindingRequest,
  createStreamGiftLedgerLaunchReadiness219BProviderRuntimeRequest,
  getStreamGiftLedgerLaunchReadinessFinalHandoff219B,
  getStreamGiftLedgerLaunchReadinessFinalHandoff219BContract,
  getStreamGiftLedgerLaunchReadinessFinalHandoff219BRunbook,
  prepareStreamGiftLedgerLaunchReadinessFinalHandoff219B,
} from "./service";

export function createStreamGiftLedgerLaunchReadinessFinalHandoff219BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/219b/readiness", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessFinalHandoff219B());
  });

  router.get("/api/admin/stream/gifts/ledger/219b/launch-control-final-handoff-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessFinalHandoff219BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/launch-control-final-handoff", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerLaunchReadinessFinalHandoff219B(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/219b/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessFinalHandoff219BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219BLaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/provider-binding-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219BProviderBindingRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/provider-runtime-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219BProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219BGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219b/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219BDbReadWriteRequest());
  });

  return router;
}
