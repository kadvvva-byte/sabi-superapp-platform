import { Router, type Request, type Response } from 'express';
import {
  getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGate035T,
  getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGateReadiness035T,
} from './service';

type TaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGateRouteDeps035T = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035T(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-approval-execution-runtime-gate', '035t');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035T(res: Response, data: Record<string, unknown>): void {
  noStore035T(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGate035TRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGateRouteDeps035T,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/readiness', (_req, res) => {
    ok035T(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGateReadiness035T() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate', (_req, res) => {
    ok035T(res, { gate: getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGate035T() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035T(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGateReadiness035T() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-execution-runtime-gate/035t/gate', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035T(res, { gate: getTaxiWalletPaymentPayoutOwnerApprovalExecutionRuntimeGate035T() });
  });
}
