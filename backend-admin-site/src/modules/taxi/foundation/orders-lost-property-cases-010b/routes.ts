import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_HEADER_010B,
  TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_VALUE_010B,
  TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_HEADER_010B,
  TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_VALUE_010B,
} from './constants';
import {
  buildTaxiOrdersLostPropertyReadiness010B,
  createTaxiOrdersLostPropertyCaseFromTrip010B,
  listTaxiOrdersLostPropertyCases010B,
  loadTaxiOrdersLostPropertyStatus010B,
  updateTaxiOrdersLostPropertyCaseStatus010B,
} from './service';

type TaxiOrdersLostPropertyRouteDeps010B = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok010B(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-lost-property-control', '010b');
  res.setHeader('x-sabi-taxi-orders-010b-read-only-list-redacted', 'true');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

function hasCreateApproval010B(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_HEADER_010B] || '').trim() === TAXI_ORDERS_LOST_PROPERTY_CREATE_APPROVAL_VALUE_010B;
}

function hasUpdateApproval010B(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_HEADER_010B] || '').trim() === TAXI_ORDERS_LOST_PROPERTY_UPDATE_APPROVAL_VALUE_010B;
}

export function registerTaxiOrdersLostPropertyCases010BRoutes(router: Router, deps: TaxiOrdersLostPropertyRouteDeps010B): void {
  router.get('/api/admin/taxi/orders/010b/lost-property/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok010B(res, { readiness: buildTaxiOrdersLostPropertyReadiness010B() });
  });

  router.get('/api/admin/taxi/orders/010b/lost-property/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersLostPropertyStatus010B();
    ok010B(res, status as unknown as Record<string, unknown>);
  });

  router.get('/api/admin/taxi/orders/010b/lost-property/cases', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const list = await listTaxiOrdersLostPropertyCases010B({ limit: req.query.limit, status: req.query.status });
    ok010B(res, list as unknown as Record<string, unknown>);
  });

  router.post('/api/admin/taxi/orders/010b/lost-property/create-from-trip', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasCreateApproval010B(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_010b_exact_lost_property_create_approval_missing',
        fakeTripCreateBlocked: true,
        fakeCaseCreateBlocked: true,
        rawPiiExposedToList: false,
        passengerDriverDirectContactBlocked: true,
        adminMediatedContactOnly: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }
    const result = await createTaxiOrdersLostPropertyCaseFromTrip010B(req.body || {});
    res.status(result.statusCode).json(result);
  });

  router.patch('/api/admin/taxi/orders/010b/lost-property/update-status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasUpdateApproval010B(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_010b_exact_lost_property_update_approval_missing',
        fakeCaseCreateBlocked: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }
    const result = await updateTaxiOrdersLostPropertyCaseStatus010B(req.body || {});
    res.status(result.statusCode).json(result);
  });
}
