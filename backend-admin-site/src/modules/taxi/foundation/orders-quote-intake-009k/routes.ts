import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_HEADER_009K,
  TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_VALUE_009K,
  TAXI_ORDERS_QUOTE_INTAKE_IDEMPOTENCY_HEADER_009K,
} from './constants';
import {
  buildTaxiOrdersQuoteIntakeReadiness009K,
  createTaxiQuoteFromRealRouteIntake009K,
} from './service';

type TaxiOrdersQuoteIntakeRouteDeps009K = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009K(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-quote-intake-control', '009k');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactQuoteIntakeApproval009K(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_HEADER_009K] || '').trim() === TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_VALUE_009K;
}

function idempotency009K(req: Request): string {
  return String(req.headers[TAXI_ORDERS_QUOTE_INTAKE_IDEMPOTENCY_HEADER_009K] || '').trim();
}

function actor009K(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersQuoteIntake009KRoutes(router: Router, deps: TaxiOrdersQuoteIntakeRouteDeps009K): void {
  router.get('/api/admin/taxi/orders/009k/quote-intake/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009K(res, { ok: true, readiness: buildTaxiOrdersQuoteIntakeReadiness009K() });
  });

  router.post('/api/admin/taxi/orders/009k/quote-intake/from-real-route', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactQuoteIntakeApproval009K(req)) {
      res.setHeader('x-sabi-taxi-orders-quote-intake-control', '009k');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009k_exact_quote_intake_approval_missing',
        requiredHeader: TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_HEADER_009K,
        requiredValue: TAXI_ORDERS_QUOTE_INTAKE_APPROVAL_VALUE_009K,
        fakeRiderCreateBlocked: true,
        fakeTariffCreateBlocked: true,
        fakeRouteCreateBlocked: true,
        fakeQuoteCreateBlocked: true,
        fakeRequestCreateBlocked: true,
        fakeDispatchOfferCreateBlocked: true,
        fakeTripCreateBlocked: true,
        fakeSuccessBlocked: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }

    try {
      const body = req.body && typeof req.body === 'object' ? req.body as Record<string, unknown> : {};
      const result = await createTaxiQuoteFromRealRouteIntake009K({
        riderProfileId: String(body.riderProfileId || ''),
        tariffRegionId: String(body.tariffRegionId || ''),
        routeProviderRef: String(body.routeProviderRef || ''),
        estimatedFareMinor: Number(body.estimatedFareMinor || 0),
        pickupGeoJson: body.pickupGeoJson,
        dropoffGeoJson: body.dropoffGeoJson,
        expiresInMinutes: Number(body.expiresInMinutes || 15),
        reason: String(body.reason || 'admin_quote_intake_009k'),
      }, idempotency009K(req), actor009K(req));
      const status = result.ok ? 200 : result.code.includes('not_found') ? 404 : 409;
      res.status(status);
      ok009K(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009k_quote_intake_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeRiderCreateBlocked: true, fakeTariffCreateBlocked: true, fakeRouteCreateBlocked: true, fakeQuoteCreateBlocked: true, fakeRequestCreateBlocked: true, fakeDispatchOfferCreateBlocked: true, fakeTripCreateBlocked: true, fakeSuccessBlocked: true, dbWriteExecuted: false, auditWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
