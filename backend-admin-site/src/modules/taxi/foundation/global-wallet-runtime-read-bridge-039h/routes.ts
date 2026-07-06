import { Router, type Request, type Response } from 'express';
import {
  getTaxiGlobalWalletRuntimeReadBridge039H,
  getTaxiGlobalWalletRuntimeReadBridgeReadiness039H,
} from './service';

type TaxiGlobalWalletRuntimeReadBridgeRouteDeps039H = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039H(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-global-wallet-runtime-read-bridge', '039h');
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
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok039H(res: Response, data: Record<string, unknown>): void {
  noStore039H(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiGlobalWalletRuntimeReadBridge039HRoutes(
  router: Router,
  deps: TaxiGlobalWalletRuntimeReadBridgeRouteDeps039H,
): void {
  router.get('/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/readiness', (_req, res) => {
    ok039H(res, { readiness: getTaxiGlobalWalletRuntimeReadBridgeReadiness039H() });
  });

  router.get('/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/summary', (_req, res) => {
    ok039H(res, {
      readiness: getTaxiGlobalWalletRuntimeReadBridgeReadiness039H(),
      bridge: getTaxiGlobalWalletRuntimeReadBridge039H(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039H(res, { readiness: getTaxiGlobalWalletRuntimeReadBridgeReadiness039H() });
  });

  router.get('/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039H(res, {
      readiness: getTaxiGlobalWalletRuntimeReadBridgeReadiness039H(),
      bridge: getTaxiGlobalWalletRuntimeReadBridge039H(),
    });
  });
}
