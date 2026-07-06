import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersRealDataReadiness009M,
  loadTaxiOrdersRealDataStatus009M,
} from './service';

type TaxiOrdersRealDataReadinessRouteDeps009M = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009M(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-real-data-readiness-control', '009m');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

export function registerTaxiOrdersRealDataReadiness009MRoutes(router: Router, deps: TaxiOrdersRealDataReadinessRouteDeps009M): void {
  router.get('/api/admin/taxi/orders/009m/real-data-readiness/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009M(res, { readiness: buildTaxiOrdersRealDataReadiness009M() });
  });

  router.get('/api/admin/taxi/orders/009m/real-data-readiness/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersRealDataStatus009M();
    ok009M(res, status as unknown as Record<string, unknown>);
  });
}
