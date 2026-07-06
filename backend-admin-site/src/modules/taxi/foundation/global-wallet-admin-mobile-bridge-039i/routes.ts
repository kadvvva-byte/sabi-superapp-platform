import { Router, type Request, type Response } from 'express';
import {
  getTaxiGlobalWalletAdminMobileBridge039I,
  getTaxiGlobalWalletAdminMobileBridgeReadiness039I,
} from './service';

type TaxiGlobalWalletAdminMobileBridgeRouteDeps039I = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039I(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-global-wallet-admin-mobile-bridge', '039i');
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

function ok039I(res: Response, data: Record<string, unknown>): void {
  noStore039I(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiGlobalWalletAdminMobileBridge039IRoutes(
  router: Router,
  deps: TaxiGlobalWalletAdminMobileBridgeRouteDeps039I,
): void {
  router.get('/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/admin-mobile/readiness', (_req, res) => {
    ok039I(res, { readiness: getTaxiGlobalWalletAdminMobileBridgeReadiness039I() });
  });

  router.get('/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/mobile/summary', (_req, res) => {
    ok039I(res, {
      readiness: getTaxiGlobalWalletAdminMobileBridgeReadiness039I(),
      bridge: getTaxiGlobalWalletAdminMobileBridge039I(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039I(res, { readiness: getTaxiGlobalWalletAdminMobileBridgeReadiness039I() });
  });

  router.get('/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039I(res, {
      readiness: getTaxiGlobalWalletAdminMobileBridgeReadiness039I(),
      bridge: getTaxiGlobalWalletAdminMobileBridge039I(),
    });
  });
}
