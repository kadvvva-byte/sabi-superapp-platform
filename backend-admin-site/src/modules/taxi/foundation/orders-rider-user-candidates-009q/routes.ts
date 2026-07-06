import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersRiderUserCandidatesReadiness009Q,
  loadTaxiOrdersRiderUserCandidates009Q,
} from './service';

type TaxiOrdersRiderUserCandidatesRouteDeps009Q = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009Q(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-rider-user-candidates-control', '009q');
  res.setHeader('x-sabi-taxi-orders-009q-read-only', 'true');
  res.setHeader('x-sabi-taxi-orders-009q-raw-pii-blocked', 'true');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

export function registerTaxiOrdersRiderUserCandidates009QRoutes(router: Router, deps: TaxiOrdersRiderUserCandidatesRouteDeps009Q): void {
  router.get('/api/admin/taxi/orders/009q/rider-user-candidates/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009Q(res, { readiness: buildTaxiOrdersRiderUserCandidatesReadiness009Q() });
  });

  router.get('/api/admin/taxi/orders/009q/rider-user-candidates/list', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const list = await loadTaxiOrdersRiderUserCandidates009Q({ limit: req.query.limit });
    ok009Q(res, list as unknown as Record<string, unknown>);
  });
}
