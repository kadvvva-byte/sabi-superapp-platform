import { Router, type Request, type Response } from 'express';
import { getTaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J, getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J } from './service';

type TaxiWalletPaymentPayoutOwnerApprovalDecisionGateRouteDeps035J = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035J(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-approval-decision-gate', '035j');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035J(res: Response, data: Record<string, unknown>): void {
  noStore035J(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalDecisionGate035JRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalDecisionGateRouteDeps035J,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/readiness', (_req, res) => {
    ok035J(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate', (_req, res) => {
    ok035J(res, { gate: getTaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035J(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalDecisionGateReadiness035J() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-decision-gate/035j/gate', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035J(res, { gate: getTaxiWalletPaymentPayoutOwnerApprovalDecisionGate035J() });
  });
}
