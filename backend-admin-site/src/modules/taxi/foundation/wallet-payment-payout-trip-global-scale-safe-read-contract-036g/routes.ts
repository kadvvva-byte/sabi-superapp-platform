import { Router, type Request, type Response } from 'express';
import {
  getTaxiTripGlobalScaleReadiness036G,
  getTaxiTripGlobalScaleSafeReadContract036G,
  getTaxiTripGlobalScaleSabiAiPersona036G,
} from './service';

type TaxiTripGlobalScaleSafeReadContractRouteDeps036G = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore036G(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-trip-global-scale-contract', '036g');
  res.setHeader('x-sabi-trip-target-scale', '10000-plus');
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

function ok036G(res: Response, data: Record<string, unknown>): void {
  noStore036G(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiWalletPaymentPayoutTripGlobalScaleSafeReadContract036GRoutes(
  router: Router,
  deps: TaxiTripGlobalScaleSafeReadContractRouteDeps036G,
): void {
  router.get('/api/taxi/trips/global-scale-safe-read/036g/readiness', (_req, res) => {
    ok036G(res, { readiness: getTaxiTripGlobalScaleReadiness036G() });
  });

  router.get('/api/taxi/trips/global-scale-safe-read/036g/contract', (_req, res) => {
    ok036G(res, { contract: getTaxiTripGlobalScaleSafeReadContract036G() });
  });

  router.get('/api/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor', (_req, res) => {
    ok036G(res, { sabiAiSupervisor: getTaxiTripGlobalScaleSabiAiPersona036G() });
  });

  router.get('/api/admin/taxi/trips/global-scale-safe-read/036g/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036G(res, { readiness: getTaxiTripGlobalScaleReadiness036G() });
  });

  router.get('/api/admin/taxi/trips/global-scale-safe-read/036g/contract', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036G(res, { contract: getTaxiTripGlobalScaleSafeReadContract036G() });
  });

  router.get('/api/admin/taxi/trips/global-scale-safe-read/036g/sabi-ai-supervisor', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok036G(res, { sabiAiSupervisor: getTaxiTripGlobalScaleSabiAiPersona036G() });
  });
}
