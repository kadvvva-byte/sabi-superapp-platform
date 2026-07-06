import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoff035D, getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoffReadiness035D } from './service';

type TaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoffRouteDeps035D = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035D(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-final-handoff', '035d');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035D(res: Response, data: Record<string, unknown>): void {
  noStore035D(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoff035DRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoffRouteDeps035D,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness', (_req, res) => {
    ok035D(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoffReadiness035D() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff', (_req, res) => {
    ok035D(res, { handoff: getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoff035D() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035D(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoffReadiness035D() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-chain/final-handoff/035d/handoff', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035D(res, { handoff: getTaxiWalletPaymentPayoutOwnerApprovalChainFinalHandoff035D() });
  });
}
