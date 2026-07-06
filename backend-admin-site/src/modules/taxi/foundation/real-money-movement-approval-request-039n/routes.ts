import type { Request, Response, Router } from 'express';
import {
  getTaxiRealMoneyMovementApprovalRequest039N,
  getTaxiRealMoneyMovementApprovalRequestReadiness039N,
} from './service';

export type TaxiRealMoneyMovementApprovalRequestRouteDeps039N = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039N(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-real-wallet-execution', 'locked');
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

function ok039N(res: Response, data: Record<string, unknown>): void {
  noStore039N(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiRealMoneyMovementApprovalRequest039NRoutes(
  router: Router,
  deps: TaxiRealMoneyMovementApprovalRequestRouteDeps039N,
): void {
  router.get('/api/taxi/wallet-finance/real-money-movement-approval-request/039n/readiness', (_req, res) => {
    ok039N(res, { readiness: getTaxiRealMoneyMovementApprovalRequestReadiness039N() });
  });

  router.get('/api/taxi/wallet-finance/real-money-movement-approval-request/039n/summary', (_req, res) => {
    ok039N(res, {
      readiness: getTaxiRealMoneyMovementApprovalRequestReadiness039N(),
      lockedGate: getTaxiRealMoneyMovementApprovalRequest039N(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/real-money-movement-approval-request/039n/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039N(res, { readiness: getTaxiRealMoneyMovementApprovalRequestReadiness039N() });
  });

  router.get('/api/admin/taxi/wallet-finance/real-money-movement-approval-request/039n/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039N(res, {
      readiness: getTaxiRealMoneyMovementApprovalRequestReadiness039N(),
      lockedGate: getTaxiRealMoneyMovementApprovalRequest039N(),
    });
  });
}
