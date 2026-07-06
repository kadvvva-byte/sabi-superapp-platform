import { Router, type Request, type Response } from 'express';
import {
  getTaxiTripSabiAiPersonaOwnerBrief036I,
  getTaxiTripSabiAiPersonaRuntimeReadiness036I,
  getTaxiTripSabiAiPersonaRuntimeReport036I,
} from './service';

type TaxiTripSabiAiPersonaRuntimeReportRouteDeps036I = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore036I(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-trip-sabi-ai-runtime-report', '036i');
  res.setHeader('x-sabi-trip-target-scale', '10000-plus');
  res.setHeader('x-sabi-report-only', 'true');
  res.setHeader('x-sabi-persona-mode', 'report-only');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-wallet-mutation', 'blocked');
  res.setHeader('x-sabi-payment-execution', 'blocked');
  res.setHeader('x-sabi-payout-execution', 'blocked');
  res.setHeader('x-sabi-db-write', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-google-provider-call', 'blocked');
  res.setHeader('x-sabi-fake-road-data', 'blocked');
  res.setHeader('x-sabi-production-launch', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok036I(res: Response, data: Record<string, unknown>): void {
  noStore036I(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutTripSabiAiPersonaRuntimeReport036IRoutes(
  router: Router,
  deps: TaxiTripSabiAiPersonaRuntimeReportRouteDeps036I,
): void {
  router.get('/api/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness', (_req, res) => {
    ok036I(res, { readiness: getTaxiTripSabiAiPersonaRuntimeReadiness036I() });
  });

  router.get('/api/taxi/trips/sabi-ai-persona-runtime-report/036i/report', (_req, res) => {
    ok036I(res, { report: getTaxiTripSabiAiPersonaRuntimeReport036I() });
  });

  router.get('/api/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief', (_req, res) => {
    ok036I(res, { ownerBrief: getTaxiTripSabiAiPersonaOwnerBrief036I() });
  });

  router.get('/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036I(res, { readiness: getTaxiTripSabiAiPersonaRuntimeReadiness036I() });
  });

  router.get('/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/report', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036I(res, { report: getTaxiTripSabiAiPersonaRuntimeReport036I() });
  });

  router.get('/api/admin/taxi/trips/sabi-ai-persona-runtime-report/036i/owner-brief', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036I(res, { ownerBrief: getTaxiTripSabiAiPersonaOwnerBrief036I() });
  });
}
