import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerExactApprovalPackage035G, getTaxiWalletPaymentPayoutOwnerExactApprovalPackageReadiness035G } from './service';

type TaxiWalletPaymentPayoutOwnerExactApprovalPackageRouteDeps035G = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035G(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-exact-approval-package', '035g');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035G(res: Response, data: Record<string, unknown>): void {
  noStore035G(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerExactApprovalPackage035GRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerExactApprovalPackageRouteDeps035G,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness', (_req, res) => {
    ok035G(res, { readiness: getTaxiWalletPaymentPayoutOwnerExactApprovalPackageReadiness035G() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package', (_req, res) => {
    ok035G(res, { package: getTaxiWalletPaymentPayoutOwnerExactApprovalPackage035G() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035G(res, { readiness: getTaxiWalletPaymentPayoutOwnerExactApprovalPackageReadiness035G() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-exact-approval-package/035g/package', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035G(res, { package: getTaxiWalletPaymentPayoutOwnerExactApprovalPackage035G() });
  });
}
