import { Router, type Request, type Response } from 'express';
import {
  getTaxiWalletPaymentPayoutOwnerApprovalMegaDryRunValidator035Q035S,
  getTaxiWalletPaymentPayoutOwnerApprovalMegaFinalHandoff035Q035S,
  getTaxiWalletPaymentPayoutOwnerApprovalMegaReadiness035Q035S,
} from './service';

type TaxiWalletPaymentPayoutOwnerApprovalMegaHandoffRouteDeps035Q035S = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore035Q035S(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-wallet-payment-payout-owner-approval-mega-handoff', '035q-035s');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok035Q035S(res: Response, data: Record<string, unknown>): void {
  noStore035Q035S(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutOwnerApprovalMegaHandoff035Q035SRoutes(
  router: Router,
  deps: TaxiWalletPaymentPayoutOwnerApprovalMegaHandoffRouteDeps035Q035S,
): void {
  router.get('/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/readiness', (_req, res) => {
    ok035Q035S(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalMegaReadiness035Q035S() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/dry-run-validator', (_req, res) => {
    ok035Q035S(res, { dryRunValidator: getTaxiWalletPaymentPayoutOwnerApprovalMegaDryRunValidator035Q035S() });
  });

  router.get('/api/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff', (_req, res) => {
    ok035Q035S(res, { finalHandoff: getTaxiWalletPaymentPayoutOwnerApprovalMegaFinalHandoff035Q035S() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035Q035S(res, { readiness: getTaxiWalletPaymentPayoutOwnerApprovalMegaReadiness035Q035S() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/dry-run-validator', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035Q035S(res, { dryRunValidator: getTaxiWalletPaymentPayoutOwnerApprovalMegaDryRunValidator035Q035S() });
  });

  router.get('/api/admin/taxi/wallet-payment-payout/owner-approval-mega-handoff/035q-035s/final-handoff', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok035Q035S(res, { finalHandoff: getTaxiWalletPaymentPayoutOwnerApprovalMegaFinalHandoff035Q035S() });
  });
}
