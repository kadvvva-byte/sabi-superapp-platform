import type { Request, Response, Router } from 'express';
import {
  getTaxiRealMoneyMovementExecutionApprovalEvidence039O,
  getTaxiRealMoneyMovementExecutionApprovalEvidenceReadiness039O,
} from './service';

export type TaxiRealMoneyMovementExecutionApprovalEvidenceRouteDeps039O = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039O(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-real-money-movement-execution-approval-evidence', 'locked');
  res.setHeader('x-sabi-standalone-taxi-wallet', 'blocked');
  res.setHeader('x-sabi-taxi-commission-bps', '0');
  res.setHeader('x-sabi-visa-cashback-bps', '200');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-owner-sabi-ai-autonomous-execution', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok039O(res: Response, data: Record<string, unknown>): void {
  noStore039O(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiRealMoneyMovementExecutionApprovalEvidence039ORoutes(
  router: Router,
  deps: TaxiRealMoneyMovementExecutionApprovalEvidenceRouteDeps039O,
): void {
  router.get('/api/taxi/wallet-finance/real-money-movement-execution-approval-evidence/039o/readiness', (_req, res) => {
    ok039O(res, { readiness: getTaxiRealMoneyMovementExecutionApprovalEvidenceReadiness039O() });
  });

  router.get('/api/taxi/wallet-finance/real-money-movement-execution-approval-evidence/039o/summary', (_req, res) => {
    ok039O(res, {
      readiness: getTaxiRealMoneyMovementExecutionApprovalEvidenceReadiness039O(),
      executionEvidence: getTaxiRealMoneyMovementExecutionApprovalEvidence039O(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/real-money-movement-execution-approval-evidence/039o/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039O(res, { readiness: getTaxiRealMoneyMovementExecutionApprovalEvidenceReadiness039O() });
  });

  router.get('/api/admin/taxi/wallet-finance/real-money-movement-execution-approval-evidence/039o/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039O(res, {
      readiness: getTaxiRealMoneyMovementExecutionApprovalEvidenceReadiness039O(),
      executionEvidence: getTaxiRealMoneyMovementExecutionApprovalEvidence039O(),
    });
  });
}
