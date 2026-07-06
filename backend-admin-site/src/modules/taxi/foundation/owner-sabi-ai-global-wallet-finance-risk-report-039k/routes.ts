import { Router, type Request, type Response } from 'express';
import {
  getTaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K,
  getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K,
} from './service';

type TaxiOwnerSabiAiGlobalWalletFinanceRiskReportRouteDeps039K = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore039K(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-owner-sabi-ai-risk-report', '039k');
  res.setHeader('x-sabi-standalone-taxi-wallet', 'blocked');
  res.setHeader('x-sabi-taxi-commission-bps', '0');
  res.setHeader('x-sabi-visa-cashback-bps', '200');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-owner-sabi-ai-autonomous-execution', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok039K(res: Response, data: Record<string, unknown>): void {
  noStore039K(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiOwnerSabiAiGlobalWalletFinanceRiskReport039KRoutes(
  router: Router,
  deps: TaxiOwnerSabiAiGlobalWalletFinanceRiskReportRouteDeps039K,
): void {
  router.get('/api/taxi/wallet-finance/owner-sabi-ai-risk-report/039k/readiness', (_req, res) => {
    ok039K(res, { readiness: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K() });
  });

  router.get('/api/taxi/wallet-finance/owner-sabi-ai-risk-report/039k/summary', (_req, res) => {
    ok039K(res, {
      readiness: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K(),
      reportBridge: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K(),
    });
  });

  router.get('/api/admin/taxi/wallet-finance/owner-sabi-ai-risk-report/039k/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039K(res, { readiness: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K() });
  });

  router.get('/api/admin/taxi/wallet-finance/owner-sabi-ai-risk-report/039k/summary', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok039K(res, {
      readiness: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReportReadiness039K(),
      reportBridge: getTaxiOwnerSabiAiGlobalWalletFinanceRiskReport039K(),
    });
  });
}
