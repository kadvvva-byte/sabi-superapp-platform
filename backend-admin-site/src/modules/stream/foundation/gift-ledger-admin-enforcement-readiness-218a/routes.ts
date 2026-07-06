import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerAdminEnforcement218AAdminRuntimeToggleRequest,
  createStreamGiftLedgerAdminEnforcement218ADbReadRequest,
  createStreamGiftLedgerAdminEnforcement218AProviderRiskCallRequest,
  createStreamGiftLedgerAdminEnforcement218ARiskHoldRuntimeDecisionRequest,
  getStreamGiftLedgerAdminEnforcementReadiness218A,
  getStreamGiftLedgerAdminEnforcementReadiness218AContract,
  getStreamGiftLedgerAdminEnforcementReadiness218ARunbook,
  prepareStreamGiftLedgerAdminEnforcementReadiness218A,
} from "./service";

function sendBlocked(res: Response, body: unknown): void {
  res.status(423).json(body);
}

export function createStreamGiftLedgerAdminEnforcementReadiness218ARouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/218a/readiness", (_req: Request, res: Response) => {
    res.json(getStreamGiftLedgerAdminEnforcementReadiness218A());
  });

  router.get("/api/admin/stream/gifts/ledger/218a/admin-enforcement-contract", (_req: Request, res: Response) => {
    res.json(getStreamGiftLedgerAdminEnforcementReadiness218AContract());
  });

  router.post("/api/admin/stream/gifts/ledger/218a/admin-enforcement-readiness", (req: Request, res: Response) => {
    const prepared = prepareStreamGiftLedgerAdminEnforcementReadiness218A(req.body ?? {});
    res.status(prepared.ok ? 200 : 409).json(prepared);
  });

  router.get("/api/admin/stream/gifts/ledger/218a/runbook", (_req: Request, res: Response) => {
    res.json(getStreamGiftLedgerAdminEnforcementReadiness218ARunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/218a/risk-hold-runtime-decision-request", (_req: Request, res: Response) => {
    sendBlocked(res, createStreamGiftLedgerAdminEnforcement218ARiskHoldRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218a/admin-runtime-toggle-request", (_req: Request, res: Response) => {
    sendBlocked(res, createStreamGiftLedgerAdminEnforcement218AAdminRuntimeToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218a/provider-risk-call-request", (_req: Request, res: Response) => {
    sendBlocked(res, createStreamGiftLedgerAdminEnforcement218AProviderRiskCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218a/db-read-request", (_req: Request, res: Response) => {
    sendBlocked(res, createStreamGiftLedgerAdminEnforcement218ADbReadRequest());
  });

  return router;
}
