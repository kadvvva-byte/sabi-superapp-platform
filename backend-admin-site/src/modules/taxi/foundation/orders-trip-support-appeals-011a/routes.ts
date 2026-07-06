import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_HEADER_011A,
  TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_VALUE_011A,
  TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_HEADER_011A,
  TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_VALUE_011A,
} from './constants';
import {
  buildTaxiOrdersTripSupportAppealsReadiness011A,
  createTaxiOrdersTripSupportAppealFromTrip011A,
  listTaxiOrdersTripSupportAppealCases011A,
  loadTaxiOrdersTripSupportAppealsStatus011A,
  updateTaxiOrdersTripSupportAppealStatus011A,
} from './service';

type TaxiOrdersTripSupportRouteDeps011A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok011A(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-trip-support-control', '011a');
  res.setHeader('x-sabi-taxi-orders-011a-read-only-list-redacted', 'true');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

function hasCreateApproval011A(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_HEADER_011A] || '').trim() === TAXI_ORDERS_TRIP_SUPPORT_CREATE_APPROVAL_VALUE_011A;
}

function hasUpdateApproval011A(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_HEADER_011A] || '').trim() === TAXI_ORDERS_TRIP_SUPPORT_UPDATE_APPROVAL_VALUE_011A;
}

export function registerTaxiOrdersTripSupportAppeals011ARoutes(router: Router, deps: TaxiOrdersTripSupportRouteDeps011A): void {
  router.get('/api/admin/taxi/orders/011a/support-appeals/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok011A(res, { readiness: buildTaxiOrdersTripSupportAppealsReadiness011A() });
  });

  router.get('/api/admin/taxi/orders/011a/support-appeals/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersTripSupportAppealsStatus011A();
    ok011A(res, status as unknown as Record<string, unknown>);
  });

  router.get('/api/admin/taxi/orders/011a/support-appeals/cases', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const list = await listTaxiOrdersTripSupportAppealCases011A({ limit: req.query.limit, status: req.query.status, category: req.query.category });
    ok011A(res, list as unknown as Record<string, unknown>);
  });

  router.post('/api/admin/taxi/orders/011a/support-appeals/create-from-trip', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasCreateApproval011A(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_011a_exact_trip_support_create_approval_missing',
        fakeTripCreateBlocked: true,
        fakeCaseCreateBlocked: true,
        rawPiiExposedToList: false,
        passengerDriverDirectContactBlocked: true,
        adminMediatedContactOnly: true,
        noLocalPenalty: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }
    const result = await createTaxiOrdersTripSupportAppealFromTrip011A(req.body || {});
    res.status(result.statusCode).json(result);
  });

  router.patch('/api/admin/taxi/orders/011a/support-appeals/update-status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasUpdateApproval011A(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_011a_exact_trip_support_update_approval_missing',
        fakeCaseCreateBlocked: true,
        noLocalPenalty: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }
    const result = await updateTaxiOrdersTripSupportAppealStatus011A(req.body || {});
    res.status(result.statusCode).json(result);
  });
}
