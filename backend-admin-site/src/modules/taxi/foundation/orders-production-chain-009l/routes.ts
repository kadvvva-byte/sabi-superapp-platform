import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersProductionChainReadiness009L,
  loadTaxiOrdersProductionChainStatus009L,
} from './service';

type TaxiOrdersProductionChainRouteDeps009L = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009L(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-production-chain-control', '009l');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

export function registerTaxiOrdersProductionChain009LRoutes(router: Router, deps: TaxiOrdersProductionChainRouteDeps009L): void {
  router.get('/api/admin/taxi/orders/009l/production-chain/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009L(res, { readiness: buildTaxiOrdersProductionChainReadiness009L() });
  });

  router.get('/api/admin/taxi/orders/009l/production-chain/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersProductionChainStatus009L();
    ok009L(res, status as unknown as Record<string, unknown>);
  });
}
