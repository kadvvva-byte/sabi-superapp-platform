import { Router, type Request, type Response } from 'express';
import {
  getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035V,
  getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionReadiness035V,
} from './service';

type TaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionRouteDeps035V = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035V(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-approval-final-lock-selection', '035v');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035V(res: Response, data: Record<string, unknown>): void {
  noStore035V(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035VRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionRouteDeps035V,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness', (_req, res) => {
    ok035V(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionReadiness035V() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection', (_req, res) => {
    ok035V(res, { selection: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035V() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary', (_req, res) => {
    ok035V(res, {
      readiness: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionReadiness035V(),
      selection: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035V(),
    });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035V(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionReadiness035V() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/selection', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035V(res, { selection: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035V() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-final-lock-selection/035v/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035V(res, {
      readiness: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelectionReadiness035V(),
      selection: getTaxiWalletPaymentPayoutOwnerApprovalFinalLockSelection035V(),
    });
  });
}
