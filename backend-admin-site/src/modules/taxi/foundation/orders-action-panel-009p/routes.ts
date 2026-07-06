import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersActionPanelReadiness009P,
  loadTaxiOrdersActionPanelStatus009P,
} from './service';

type TaxiOrdersActionPanelRouteDeps009P = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009P(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-action-panel-control', '009p');
  res.setHeader('x-sabi-no-fake-autofill', 'true');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

export function registerTaxiOrdersActionPanel009PRoutes(router: Router, deps: TaxiOrdersActionPanelRouteDeps009P): void {
  router.get('/api/admin/taxi/orders/009p/action-panel/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009P(res, { readiness: buildTaxiOrdersActionPanelReadiness009P() });
  });

  router.get('/api/admin/taxi/orders/009p/action-panel/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersActionPanelStatus009P();
    ok009P(res, status as unknown as Record<string, unknown>);
  });
}
