import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutExecutionPreflight035L, getTaxiWalletPaymentPayoutExecutionPreflightReadiness035L } from './service';

type TaxiWalletPaymentPayoutExecutionPreflightRouteDeps035L = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035L(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-execution-preflight', '035l');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035L(res: Response, data: Record<string, unknown>): void {
  noStore035L(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutExecutionPreflight035LRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutExecutionPreflightRouteDeps035L,
): void {
  router.get('/api/taxi/wallet-payment-payout/execution-preflight/035l/readiness', (_req, res) => {
    ok035L(res, { readiness: getTaxiWalletPaymentPayoutExecutionPreflightReadiness035L() });
  });

  router.get('/api/taxi/wallet-payment-payout/execution-preflight/035l/preflight', (_req, res) => {
    ok035L(res, { preflight: getTaxiWalletPaymentPayoutExecutionPreflight035L() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035L(res, { readiness: getTaxiWalletPaymentPayoutExecutionPreflightReadiness035L() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/execution-preflight/035l/preflight', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035L(res, { preflight: getTaxiWalletPaymentPayoutExecutionPreflight035L() });
  });
}
