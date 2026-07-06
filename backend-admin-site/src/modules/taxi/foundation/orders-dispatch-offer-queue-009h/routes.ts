import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersDispatchOfferQueueReadiness009H,
  listTaxiOrdersAcceptedDispatchOffers009H,
} from './service';

type TaxiOrdersDispatchOfferQueueRouteDeps009H = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009H(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-dispatch-offer-queue-control', '009h');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

export function registerTaxiOrdersDispatchOfferQueue009HRoutes(router: Router, deps: TaxiOrdersDispatchOfferQueueRouteDeps009H): void {
  router.get('/api/admin/taxi/orders/009h/dispatch-offers/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009H(res, { ok: true, readiness: buildTaxiOrdersDispatchOfferQueueReadiness009H() });
  });

  router.get('/api/admin/taxi/orders/009h/dispatch-offers/eligible', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await listTaxiOrdersAcceptedDispatchOffers009H(req.query.limit);
      res.status(result.ok ? 200 : 409);
      ok009H(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({
        ok: false,
        code: 'taxi_orders_009h_dispatch_offer_queue_failed',
        error: error instanceof Error ? error.message : 'unknown_error',
        dbWriteExecuted: false,
        fakeOrderCreateBlocked: true,
        fakeTripCreateBlocked: true,
        providerDispatch: false,
        walletMutation: false,
      });
    }
  });
}
