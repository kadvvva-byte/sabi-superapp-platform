import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_TRIP_CREATE_APPROVAL_HEADER_009G,
  TAXI_ORDERS_TRIP_CREATE_APPROVAL_VALUE_009G,
  TAXI_ORDERS_TRIP_CREATE_IDEMPOTENCY_HEADER_009G,
} from './constants';
import {
  buildTaxiOrdersTripCreateReadiness009G,
  createTaxiTripFromExistingDispatchOffer009G,
} from './service';

type TaxiOrdersTripCreateRouteDeps009G = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009G(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-trip-create-control', '009g');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactTripCreateApproval009G(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_TRIP_CREATE_APPROVAL_HEADER_009G] || '').trim() === TAXI_ORDERS_TRIP_CREATE_APPROVAL_VALUE_009G;
}

function idempotency009G(req: Request): string {
  return String(req.headers[TAXI_ORDERS_TRIP_CREATE_IDEMPOTENCY_HEADER_009G] || '').trim();
}

function actor009G(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersTripCreate009GRoutes(router: Router, deps: TaxiOrdersTripCreateRouteDeps009G): void {
  router.get('/api/admin/taxi/orders/009g/trip-create/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009G(res, { ok: true, readiness: buildTaxiOrdersTripCreateReadiness009G() });
  });

  router.post('/api/admin/taxi/orders/009g/trip-create/from-dispatch-offer', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactTripCreateApproval009G(req)) {
      res.setHeader('x-sabi-taxi-orders-trip-create-control', '009g');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009g_exact_trip_create_approval_missing',
        requiredHeader: TAXI_ORDERS_TRIP_CREATE_APPROVAL_HEADER_009G,
        requiredValue: TAXI_ORDERS_TRIP_CREATE_APPROVAL_VALUE_009G,
        fakeOrderCreateBlocked: true,
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
      const result = await createTaxiTripFromExistingDispatchOffer009G({
        dispatchOfferId: String(body.dispatchOfferId || ''),
        vehicleId: String(body.vehicleId || ''),
        reason: String(body.reason || 'admin_trip_create_from_existing_dispatch_offer_009g'),
      }, idempotency009G(req), actor009G(req));
      const status = result.ok ? 200 : result.code.includes('not_found') ? 404 : 409;
      res.status(status);
      ok009G(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009g_trip_create_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeOrderCreateBlocked: true, fakeTripCreateBlocked: true, fakeSuccessBlocked: true, dbWriteExecuted: false, auditWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
