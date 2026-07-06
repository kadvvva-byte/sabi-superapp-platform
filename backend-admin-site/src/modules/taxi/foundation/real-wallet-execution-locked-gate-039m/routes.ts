import type { Request, Response, Router } from 'express';
import {
  getTaxiRealWalletExecutionLockedGate039M,
  getTaxiRealWalletExecutionLockedGateReadiness039M,
} from './service';

export type TaxiRealWalletExecutionLockedGateRouteDeps039M = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039M(res: Response): void {
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

function ok039M(res: Response, data: Record<string, unknown>): void {
  noStore039M(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiRealWalletExecutionLockedGate039MRoutes(
  router: Router,
  deps: TaxiRealWalletExecutionLockedGateRouteDeps039M,
): void {
  router.get('/api/taxi/wallet-finance/real-wallet-execution-locked/039m/readiness', (_req, res) => {
    ok039M(res, { readiness: getTaxiRealWalletExecutionLockedGateReadiness039M() });
  });

  router.get('/api/taxi/wallet-finance/real-wallet-execution-locked/039m/summary', (_req, res) => {
    ok039M(res, {
      readiness: getTaxiRealWalletExecutionLockedGateReadiness039M(),
      lockedGate: getTaxiRealWalletExecutionLockedGate039M(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/real-wallet-execution-locked/039m/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039M(res, { readiness: getTaxiRealWalletExecutionLockedGateReadiness039M() });
  });

  router.get('/api/admin/taxi/wallet-finance/real-wallet-execution-locked/039m/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039M(res, {
      readiness: getTaxiRealWalletExecutionLockedGateReadiness039M(),
      lockedGate: getTaxiRealWalletExecutionLockedGate039M(),
    });
  });
}
