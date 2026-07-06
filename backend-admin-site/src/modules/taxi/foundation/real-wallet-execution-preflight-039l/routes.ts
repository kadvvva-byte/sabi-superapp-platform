import { Router, type Request, type Response } from 'express';
import {
  getTaxiRealWalletExecutionPreflight039L,
  getTaxiRealWalletExecutionPreflightReadiness039L,
} from './service';

type TaxiRealWalletExecutionPreflightRouteDeps039L = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039L(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-real-wallet-execution-preflight', '039l');
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

function ok039L(res: Response, data: Record<string, unknown>): void {
  noStore039L(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiRealWalletExecutionPreflight039LRoutes(
  router: Router,
  deps: TaxiRealWalletExecutionPreflightRouteDeps039L,
): void {
  router.get('/api/taxi/wallet-finance/real-wallet-execution-preflight/039l/readiness', (_req, res) => {
    ok039L(res, { readiness: getTaxiRealWalletExecutionPreflightReadiness039L() });
  });

  router.get('/api/taxi/wallet-finance/real-wallet-execution-preflight/039l/summary', (_req, res) => {
    ok039L(res, {
      readiness: getTaxiRealWalletExecutionPreflightReadiness039L(),
      reportBridge: getTaxiRealWalletExecutionPreflight039L(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/real-wallet-execution-preflight/039l/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039L(res, { readiness: getTaxiRealWalletExecutionPreflightReadiness039L() });
  });

  router.get('/api/admin/taxi/wallet-finance/real-wallet-execution-preflight/039l/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039L(res, {
      readiness: getTaxiRealWalletExecutionPreflightReadiness039L(),
      reportBridge: getTaxiRealWalletExecutionPreflight039L(),
    });
  });
}
