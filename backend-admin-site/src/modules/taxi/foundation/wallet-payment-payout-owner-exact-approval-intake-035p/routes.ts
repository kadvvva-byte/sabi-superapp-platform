import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerExactApprovalIntakePackage035P, getTaxiWalletPaymentPayoutOwnerExactApprovalIntakeReadiness035P } from './service';

type TaxiWalletPaymentPayoutOwnerExactApprovalIntakeRouteDeps035P = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035P(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-exact-approval-intake', '035p');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035P(res: Response, data: Record<string, unknown>): void {
  noStore035P(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerExactApprovalIntake035PRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerExactApprovalIntakeRouteDeps035P,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/readiness', (_req, res) => {
    ok035P(res, { readiness: getTaxiWalletPaymentPayoutOwnerExactApprovalIntakeReadiness035P() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package', (_req, res) => {
    ok035P(res, { intakePackage: getTaxiWalletPaymentPayoutOwnerExactApprovalIntakePackage035P() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035P(res, { readiness: getTaxiWalletPaymentPayoutOwnerExactApprovalIntakeReadiness035P() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-exact-approval-intake/035p/intake-package', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035P(res, { intakePackage: getTaxiWalletPaymentPayoutOwnerExactApprovalIntakePackage035P() });
  });
}
