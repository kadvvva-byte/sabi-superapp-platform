import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerFinalArchiveReadiness221ADbReadWriteRequest,
  createStreamGiftLedgerFinalArchiveReadiness221AGiftSendExecutionRequest,
  createStreamGiftLedgerFinalArchiveReadiness221ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerFinalArchiveReadiness221APayoutExecutionRequest,
  createStreamGiftLedgerFinalArchiveReadiness221AProviderCredentialLookupRequest,
  createStreamGiftLedgerFinalArchiveReadiness221AProviderRuntimeRequest,
  createStreamGiftLedgerFinalArchiveReadiness221AWalletPaymentRequest,
  getStreamGiftLedgerFinalArchiveReadiness221A,
  getStreamGiftLedgerFinalArchiveReadiness221AContract,
  getStreamGiftLedgerFinalArchiveReadiness221ARunbook,
  prepareStreamGiftLedgerFinalArchiveReadiness221A,
} from "./service";

export function createStreamGiftLedgerFinalArchiveReadiness221ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/221a/archive-readiness", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveReadiness221A());
  });

  router.get("/api/admin/stream/gifts/ledger/221a/archive-readiness-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveReadiness221AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/archive-readiness-index", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerFinalArchiveReadiness221A(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/221a/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveReadiness221ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221ALaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/provider-credential-lookup-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221AProviderCredentialLookupRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/provider-runtime-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221AProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221AGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/wallet-payment-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221AWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/payout-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221APayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221a/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveReadiness221ADbReadWriteRequest());
  });

  return router;
}
