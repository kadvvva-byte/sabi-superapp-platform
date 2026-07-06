import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerLaunchReadiness219ADbReadWriteRequest,
  createStreamGiftLedgerLaunchReadiness219AGiftSendExecutionRequest,
  createStreamGiftLedgerLaunchReadiness219ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerLaunchReadiness219AProviderBindingRequest,
  getStreamGiftLedgerLaunchReadinessControl219A,
  getStreamGiftLedgerLaunchReadinessControl219AContract,
  getStreamGiftLedgerLaunchReadinessControl219ARunbook,
  prepareStreamGiftLedgerLaunchReadinessControl219A,
} from "./service";

export function createStreamGiftLedgerLaunchReadinessControl219ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/219a/readiness", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessControl219A());
  });

  router.get("/api/admin/stream/gifts/ledger/219a/launch-control-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessControl219AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/219a/launch-control-index", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerLaunchReadinessControl219A(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/219a/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerLaunchReadinessControl219ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/219a/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219ALaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219a/provider-binding-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219AProviderBindingRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219a/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219AGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/219a/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerLaunchReadiness219ADbReadWriteRequest());
  });

  return router;
}
