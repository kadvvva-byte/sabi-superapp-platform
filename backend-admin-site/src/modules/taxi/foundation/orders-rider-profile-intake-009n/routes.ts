import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_HEADER_009N,
  TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_VALUE_009N,
} from './constants';
import {
  buildTaxiOrdersRiderProfileIntakeReadiness009N,
  createTaxiOrdersRiderProfileFromExistingUser009N,
  loadTaxiOrdersRiderProfileIntakeStatus009N,
} from './service';

type TaxiOrdersRiderProfileIntakeRouteDeps009N = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009N(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-rider-profile-intake-control', '009n');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

function hasExactApproval009N(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_HEADER_009N] || '').trim() === TAXI_ORDERS_RIDER_PROFILE_INTAKE_APPROVAL_VALUE_009N;
}

export function registerTaxiOrdersRiderProfileIntake009NRoutes(router: Router, deps: TaxiOrdersRiderProfileIntakeRouteDeps009N): void {
  router.get('/api/admin/taxi/orders/009n/rider-profile-intake/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009N(res, { readiness: buildTaxiOrdersRiderProfileIntakeReadiness009N() });
  });

  router.get('/api/admin/taxi/orders/009n/rider-profile-intake/status', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const status = await loadTaxiOrdersRiderProfileIntakeStatus009N();
    ok009N(res, status as unknown as Record<string, unknown>);
  });

  router.post('/api/admin/taxi/orders/009n/rider-profile-intake/from-existing-user', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasExactApproval009N(req)) {
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009n_exact_rider_profile_approval_missing',
        fakeUserCreateBlocked: true,
        fakeRiderCreateBlocked: true,
        dbWriteExecuted: false,
        auditWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }

    const result = await createTaxiOrdersRiderProfileFromExistingUser009N(req.body || {});
    res.status(result.statusCode).json(result);
  });
}
