import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BAdminRuntimeToggleRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BDbReadWriteRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BGiftSendExecutionRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BLaunchRuntimeEnablementRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BPayoutExecutionRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderBindingRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderRuntimeRequest,
  createStreamGiftLedgerExecutionApprovalFinalHandoff220BWalletPaymentRequest,
  getStreamGiftLedgerExecutionApprovalFinalHandoff220B,
  getStreamGiftLedgerExecutionApprovalFinalHandoff220BContract,
  getStreamGiftLedgerExecutionApprovalFinalHandoff220BRunbook,
  prepareStreamGiftLedgerExecutionApprovalFinalHandoff220B,
} from "./service";

export function createStreamGiftLedgerExecutionApprovalFinalHandoff220BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/220b/final-handoff", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalFinalHandoff220B());
  });

  router.get("/api/admin/stream/gifts/ledger/220b/execution-approval-final-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalFinalHandoff220BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/execution-approval-final-handoff", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerExecutionApprovalFinalHandoff220B(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/220b/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalFinalHandoff220BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BLaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/provider-binding-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderBindingRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/provider-runtime-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/wallet-payment-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/payout-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BPayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BDbReadWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220b/admin-runtime-toggle-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalFinalHandoff220BAdminRuntimeToggleRequest());
  });

  return router;
}
