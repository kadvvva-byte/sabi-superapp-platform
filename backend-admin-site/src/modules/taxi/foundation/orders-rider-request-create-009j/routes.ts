import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_HEADER_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_VALUE_009J,
  TAXI_ORDERS_RIDER_REQUEST_CREATE_IDEMPOTENCY_HEADER_009J,
} from './constants';
import {
  buildTaxiOrdersRiderRequestCreateReadiness009J,
  createTaxiRiderRequestFromExistingQuote009J,
  listTaxiOrdersRiderRequestQuoteCandidates009J,
} from './service';

type TaxiOrdersRiderRequestCreateRouteDeps009J = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009J(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-rider-request-create-control', '009j');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactRiderRequestCreateApproval009J(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_HEADER_009J] || '').trim() === TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_VALUE_009J;
}

function idempotency009J(req: Request): string {
  return String(req.headers[TAXI_ORDERS_RIDER_REQUEST_CREATE_IDEMPOTENCY_HEADER_009J] || '').trim();
}

function actor009J(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersRiderRequestCreate009JRoutes(router: Router, deps: TaxiOrdersRiderRequestCreateRouteDeps009J): void {
  router.get('/api/admin/taxi/orders/009j/rider-request-create/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009J(res, { ok: true, readiness: buildTaxiOrdersRiderRequestCreateReadiness009J() });
  });

  router.get('/api/admin/taxi/orders/009j/rider-request-create/quote-candidates', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await listTaxiOrdersRiderRequestQuoteCandidates009J(req.query.limit);
      res.status(result.ok ? 200 : 409);
      ok009J(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({
        ok: false,
        code: 'taxi_orders_009j_quote_candidates_failed',
        error: error instanceof Error ? error.message : 'unknown_error',
        dbWriteExecuted: false,
        fakeQuoteCreateBlocked: true,
        fakeRequestCreateBlocked: true,
        fakeDispatchOfferCreateBlocked: true,
        fakeTripCreateBlocked: true,
        providerDispatch: false,
        walletMutation: false,
      });
    }
  });

  router.post('/api/admin/taxi/orders/009j/rider-request-create/from-existing-quote', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactRiderRequestCreateApproval009J(req)) {
      res.setHeader('x-sabi-taxi-orders-rider-request-create-control', '009j');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009j_exact_rider_request_create_approval_missing',
        requiredHeader: TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_HEADER_009J,
        requiredValue: TAXI_ORDERS_RIDER_REQUEST_CREATE_APPROVAL_VALUE_009J,
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
      const result = await createTaxiRiderRequestFromExistingQuote009J({
        quoteId: String(body.quoteId || ''),
        reason: String(body.reason || 'admin_rider_request_create_009j'),
      }, idempotency009J(req), actor009J(req));
      const status = result.ok ? 200 : result.code.includes('not_found') ? 404 : result.code.includes('expired') ? 409 : result.code.includes('status') ? 409 : 409;
      res.status(status);
      ok009J(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009j_rider_request_create_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeQuoteCreateBlocked: true, fakeRequestCreateBlocked: true, fakeDispatchOfferCreateBlocked: true, fakeTripCreateBlocked: true, fakeSuccessBlocked: true, dbWriteExecuted: false, auditWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
