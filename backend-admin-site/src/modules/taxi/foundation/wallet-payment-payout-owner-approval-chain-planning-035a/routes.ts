import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerApprovalChainPlan035A, getTaxiWalletPaymentPayoutOwnerApprovalChainReadiness035A } from './service';

type TaxiWalletPaymentPayoutOwnerApprovalChainPlanningRouteDeps035A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035A(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-approval-plan', '035a');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035A(res: Response, data: Record<string, unknown>): void {
  noStore035A(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalChainPlanning035ARoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalChainPlanningRouteDeps035A,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness', (_req, res) => {
    ok035A(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalChainReadiness035A() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-chain/035a/plan', (_req, res) => {
    ok035A(res, { plan: getTaxiWalletPaymentPayoutOwnerApprovalChainPlan035A() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035A(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalChainReadiness035A() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-chain/035a/plan', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035A(res, { plan: getTaxiWalletPaymentPayoutOwnerApprovalChainPlan035A() });
  });
}
