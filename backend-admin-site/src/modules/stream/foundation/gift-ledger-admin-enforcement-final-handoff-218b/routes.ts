import { Router, type Request, type Response } from "express";
import {
  createStreamGiftLedgerAdminEnforcement218BAdminRuntimeToggleRequest,
  createStreamGiftLedgerAdminEnforcement218BDbReadRequest,
  createStreamGiftLedgerAdminEnforcement218BProviderRiskCallRequest,
  createStreamGiftLedgerAdminEnforcement218BRiskHoldRuntimeDecisionRequest,
  getStreamGiftLedgerAdminEnforcementFinalHandoff218B,
  getStreamGiftLedgerAdminEnforcementFinalHandoff218BContract,
  getStreamGiftLedgerAdminEnforcementFinalHandoff218BRunbook,
  prepareStreamGiftLedgerAdminEnforcementFinalHandoff218B,
} from "./service";

export function createStreamGiftLedgerAdminEnforcementFinalHandoff218BRouter(): Router {
  const router = Router();

  router.get("/api/admin/stream/gifts/ledger/218b/final-handoff", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerAdminEnforcementFinalHandoff218B());
  });

  router.get("/api/admin/stream/gifts/ledger/218b/admin-enforcement-contract", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerAdminEnforcementFinalHandoff218BContract());
  });

  router.post("/api/admin/stream/gifts/ledger/218b/admin-enforcement-final-handoff", (req: Request, res: Response) => {
    const result = prepareStreamGiftLedgerAdminEnforcementFinalHandoff218B(req.body ?? {});
    res.status(result.ok ? 200 : 409).json(result);
  });

  router.get("/api/admin/stream/gifts/ledger/218b/runbook", (_req: Request, res: Response) => {
    res.status(200).json(getStreamGiftLedgerAdminEnforcementFinalHandoff218BRunbook());
  });

  router.post("/api/admin/stream/gifts/ledger/218b/admin-enforcement-runtime-toggle-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerAdminEnforcement218BAdminRuntimeToggleRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218b/risk-hold-runtime-decision-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerAdminEnforcement218BRiskHoldRuntimeDecisionRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218b/provider-risk-call-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerAdminEnforcement218BProviderRiskCallRequest());
  });

  router.post("/api/admin/stream/gifts/ledger/218b/db-read-request", (_req: Request, res: Response) => {
    res.status(423).json(createStreamGiftLedgerAdminEnforcement218BDbReadRequest());
  });

  return router;
}
