import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerExecutionLayerSplit035N, getTaxiWalletPaymentPayoutOwnerExecutionLayerSplitReadiness035N } from './service';

type TaxiWalletPaymentPayoutOwnerExecutionLayerSplitRouteDeps035N = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035N(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-execution-layer-split', '035n');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035N(res: Response, data: Record<string, unknown>): void {
  noStore035N(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerExecutionLayerSplit035NRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerExecutionLayerSplitRouteDeps035N,
): void {
  router.get('/api/taxi/wallet-payment-payout/execution-layer-split/035n/readiness', (_req, res) => {
    ok035N(res, { readiness: getTaxiWalletPaymentPayoutOwnerExecutionLayerSplitReadiness035N() });
  });

  router.get('/api/taxi/wallet-payment-payout/execution-layer-split/035n/approvals', (_req, res) => {
    ok035N(res, { split: getTaxiWalletPaymentPayoutOwnerExecutionLayerSplit035N() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035N(res, { readiness: getTaxiWalletPaymentPayoutOwnerExecutionLayerSplitReadiness035N() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/execution-layer-split/035n/approvals', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035N(res, { split: getTaxiWalletPaymentPayoutOwnerExecutionLayerSplit035N() });
  });
}
