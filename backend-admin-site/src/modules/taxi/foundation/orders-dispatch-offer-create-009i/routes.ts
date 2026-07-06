import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_HEADER_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_VALUE_009I,
  TAXI_ORDERS_DISPATCH_OFFER_CREATE_IDEMPOTENCY_HEADER_009I,
} from './constants';
import {
  buildTaxiOrdersDispatchOfferCreateReadiness009I,
  createTaxiDispatchOfferFromExistingRequest009I,
  listTaxiOrdersDispatchOfferCreateCandidates009I,
} from './service';

type TaxiOrdersDispatchOfferCreateRouteDeps009I = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009I(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-dispatch-offer-create-control', '009i');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactDispatchCreateApproval009I(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_HEADER_009I] || '').trim() === TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_VALUE_009I;
}

function idempotency009I(req: Request): string {
  return String(req.headers[TAXI_ORDERS_DISPATCH_OFFER_CREATE_IDEMPOTENCY_HEADER_009I] || '').trim();
}

function actor009I(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersDispatchOfferCreate009IRoutes(router: Router, deps: TaxiOrdersDispatchOfferCreateRouteDeps009I): void {
  router.get('/api/admin/taxi/orders/009i/dispatch-create/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009I(res, { ok: true, readiness: buildTaxiOrdersDispatchOfferCreateReadiness009I() });
  });

  router.get('/api/admin/taxi/orders/009i/dispatch-create/candidates', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await listTaxiOrdersDispatchOfferCreateCandidates009I(req.query.limit);
      res.status(result.ok ? 200 : 409);
      ok009I(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({
        ok: false,
        code: 'taxi_orders_009i_dispatch_create_candidates_failed',
        error: error instanceof Error ? error.message : 'unknown_error',
        dbWriteExecuted: false,
        fakeRequestCreateBlocked: true,
        fakeDriverCreateBlocked: true,
        fakeVehicleCreateBlocked: true,
        fakeOfferCreateBlocked: true,
        providerDispatch: false,
        walletMutation: false,
      });
    }
  });

  router.post('/api/admin/taxi/orders/009i/dispatch-create/from-existing-request', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactDispatchCreateApproval009I(req)) {
      res.setHeader('x-sabi-taxi-orders-dispatch-offer-create-control', '009i');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009i_exact_dispatch_create_approval_missing',
        requiredHeader: TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_HEADER_009I,
        requiredValue: TAXI_ORDERS_DISPATCH_OFFER_CREATE_APPROVAL_VALUE_009I,
        fakeRequestCreateBlocked: true,
        fakeDriverCreateBlocked: true,
        fakeVehicleCreateBlocked: true,
        fakeOfferCreateBlocked: true,
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
      const result = await createTaxiDispatchOfferFromExistingRequest009I({
        riderRequestId: String(body.riderRequestId || ''),
        driverProfileId: String(body.driverProfileId || ''),
        vehicleId: String(body.vehicleId || ''),
        matchingScore: Number(body.matchingScore || 0),
        offerTtlSeconds: Number(body.offerTtlSeconds || 0),
        reason: String(body.reason || 'admin_dispatch_offer_create_009i'),
      }, idempotency009I(req), actor009I(req));
      const status = result.ok ? 200 : result.code.includes('not_found') ? 404 : result.code.includes('required') ? 409 : 409;
      res.status(status);
      ok009I(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009i_dispatch_offer_create_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeRequestCreateBlocked: true, fakeDriverCreateBlocked: true, fakeVehicleCreateBlocked: true, fakeOfferCreateBlocked: true, fakeSuccessBlocked: true, dbWriteExecuted: false, auditWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
