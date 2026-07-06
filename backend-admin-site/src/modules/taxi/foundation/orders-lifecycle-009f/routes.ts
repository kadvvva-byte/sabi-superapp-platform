import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_LIFECYCLE_APPROVAL_HEADER_009F,
  TAXI_ORDERS_LIFECYCLE_APPROVAL_VALUE_009F,
  TAXI_ORDERS_LIFECYCLE_IDEMPOTENCY_HEADER_009F,
} from './constants';
import {
  buildTaxiOrdersLifecycleReadiness009F,
  transitionExistingTaxiTripLifecycle009F,
} from './service';
import type { TaxiTripLifecycleStatus009F } from './types';

type TaxiOrdersLifecycleRouteDeps009F = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009F(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-lifecycle-control', '009f');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactLifecycleApproval009F(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_LIFECYCLE_APPROVAL_HEADER_009F] || '').trim() === TAXI_ORDERS_LIFECYCLE_APPROVAL_VALUE_009F;
}

function idempotency009F(req: Request): string {
  return String(req.headers[TAXI_ORDERS_LIFECYCLE_IDEMPOTENCY_HEADER_009F] || '').trim();
}

function actor009F(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersLifecycle009FRoutes(router: Router, deps: TaxiOrdersLifecycleRouteDeps009F): void {
  router.get('/api/admin/taxi/orders/009f/lifecycle/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009F(res, { ok: true, readiness: buildTaxiOrdersLifecycleReadiness009F() });
  });

  router.post('/api/admin/taxi/orders/009f/lifecycle/transition', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactLifecycleApproval009F(req)) {
      res.setHeader('x-sabi-taxi-orders-lifecycle-control', '009f');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009f_exact_lifecycle_approval_missing',
        requiredHeader: TAXI_ORDERS_LIFECYCLE_APPROVAL_HEADER_009F,
        requiredValue: TAXI_ORDERS_LIFECYCLE_APPROVAL_VALUE_009F,
        fakeOrderCreateBlocked: true,
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
      const result = await transitionExistingTaxiTripLifecycle009F({
        orderId: String(body.orderId || ''),
        nextStatus: String(body.nextStatus || '') as TaxiTripLifecycleStatus009F,
        finalFareMinor: Number(body.finalFareMinor || 0),
        reason: String(body.reason || 'admin_order_lifecycle_009f'),
      }, idempotency009F(req), actor009F(req));
      const status = result.ok ? 200 : result.code.includes('not_found') ? 404 : 409;
      res.status(status);
      ok009F(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009f_lifecycle_transition_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeOrderCreateBlocked: true, fakeSuccessBlocked: true, dbWriteExecuted: false, auditWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
