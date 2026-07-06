import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_HEADER_009O,
  TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_VALUE_009O,
} from './constants';
import {
  buildTaxiOrdersTariffRegionIntakeReadiness009O,
  loadTaxiOrdersTariffRegionIntakeStatus009O,
  upsertTaxiOrdersTariffRegionFromRealTariff009O,
} from './service';

type TaxiOrdersTariffRegionIntakeRouteDeps009O = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009O(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-tariff-region-intake-control', '009o');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

function hasExactApproval009O(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_HEADER_009O] || '').trim() === TAXI_ORDERS_TARIFF_REGION_INTAKE_APPROVAL_VALUE_009O;
}

export function registerTaxiOrdersTariffRegionIntake009ORoutes(router: Router, deps: TaxiOrdersTariffRegionIntakeRouteDeps009O): void {
  router.get('/api/admin/taxi/orders/009o/tariff-region-intake/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009O(res, { readiness: buildTaxiOrdersTariffRegionIntakeReadiness009O() });
  });

  router.get('/api/admin/taxi/orders/009o/tariff-region-intake/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersTariffRegionIntakeStatus009O();
    ok009O(res, status as unknown as Record<string, unknown>);
  });

  router.post('/api/admin/taxi/orders/009o/tariff-region-intake/from-real-tariff', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasExactApproval009O(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009o_exact_tariff_region_approval_missing',
        fakeTariffCreateBlocked: true,
        fakePriceGenerated: false,
        defaultPriceGenerated: false,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }

    const result = await upsertTaxiOrdersTariffRegionFromRealTariff009O(req.body || {});
    res.status(result.statusCode).json(result);
  });
}
