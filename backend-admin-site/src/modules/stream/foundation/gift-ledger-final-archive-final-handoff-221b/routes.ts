import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerFinalArchiveFinalHandoff221BDbReadWriteRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BGiftSendExecutionRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BLaunchRuntimeEnablementRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BPayoutExecutionRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderCredentialLookupRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderRuntimeRequest,
  createStreamGiftLedgerFinalArchiveFinalHandoff221BWalletPaymentRequest,
  getStreamGiftLedgerFinalArchiveFinalHandoff221B,
  getStreamGiftLedgerFinalArchiveFinalHandoff221BContract,
  getStreamGiftLedgerFinalArchiveFinalHandoff221BRunbook,
  prepareStreamGiftLedgerFinalArchiveFinalHandoff221B,
} from "./service";

export function createStreamGiftLedgerFinalArchiveFinalHandoff221BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/221b/final-archive-handoff", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveFinalHandoff221B());
  });

  router.get("/api/admin/stream/gifts/ledger/221b/final-archive-handoff-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveFinalHandoff221BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/final-archive-handoff", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerFinalArchiveFinalHandoff221B(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/221b/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerFinalArchiveFinalHandoff221BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BLaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/provider-credential-lookup-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderCredentialLookupRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/provider-runtime-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/wallet-payment-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/payout-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BPayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/221b/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerFinalArchiveFinalHandoff221BDbReadWriteRequest());
  });

  return router;
}
