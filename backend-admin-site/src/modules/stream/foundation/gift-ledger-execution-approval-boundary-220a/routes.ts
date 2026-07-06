import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerExecutionApprovalBoundary220AAdminRuntimeToggleRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220ADbReadWriteRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220AGiftSendExecutionRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220ALaunchRuntimeEnablementRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220APayoutExecutionRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220AProviderBindingRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220AProviderRuntimeRequest,
  createStreamGiftLedgerExecutionApprovalBoundary220AWalletPaymentRequest,
  getStreamGiftLedgerExecutionApprovalBoundary220A,
  getStreamGiftLedgerExecutionApprovalBoundary220AContract,
  getStreamGiftLedgerExecutionApprovalBoundary220ARunbook,
  prepareStreamGiftLedgerExecutionApprovalBoundary220A,
} from "./service";

export function createStreamGiftLedgerExecutionApprovalBoundary220ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/220a/readiness", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalBoundary220A());
  });

  router.get("/api/admin/stream/gifts/ledger/220a/execution-approval-boundary-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalBoundary220AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/execution-approval-boundary-index", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerExecutionApprovalBoundary220A(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/220a/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerExecutionApprovalBoundary220ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/launch-runtime-enable-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220ALaunchRuntimeEnablementRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/provider-binding-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220AProviderBindingRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/provider-runtime-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220AProviderRuntimeRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/gift-send-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220AGiftSendExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/wallet-payment-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220AWalletPaymentRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/payout-execution-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220APayoutExecutionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/db-read-write-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220ADbReadWriteRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/220a/admin-runtime-toggle-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerExecutionApprovalBoundary220AAdminRuntimeToggleRequest());
  });

  return router;
}
