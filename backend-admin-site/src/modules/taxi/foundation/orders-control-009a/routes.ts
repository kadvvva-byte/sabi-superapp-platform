import { Router, type Request, type Response } from 'express';
import {
  TAXI_ORDERS_ARCHIVE_APPROVAL_HEADER_009A,
  TAXI_ORDERS_ARCHIVE_APPROVAL_VALUE_009A,
  TAXI_ORDERS_IDEMPOTENCY_HEADER_009A,
} from './constants';
import {
  buildTaxiOrdersReadiness009A,
  getTaxiOrdersReport009A,
  listTaxiOrders009A,
  readTaxiOrdersAudit009B,
  runTaxiOrdersArchive009A,
} from './service';

type TaxiOrdersRouteDeps009A = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok009A(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-control', '009b');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(data);
}

function exactArchiveApproval009A(req: Request): boolean {
  return String(req.headers[TAXI_ORDERS_ARCHIVE_APPROVAL_HEADER_009A] || '').trim() === TAXI_ORDERS_ARCHIVE_APPROVAL_VALUE_009A;
}

function idempotency009A(req: Request): string {
  return String(req.headers[TAXI_ORDERS_IDEMPOTENCY_HEADER_009A] || '').trim();
}

function actor009A(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

export function registerTaxiOrdersControl009ARoutes(router: Router, deps: TaxiOrdersRouteDeps009A): void {
  router.get('/api/admin/taxi/orders/009a/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok009A(res, { ok: true, readiness: buildTaxiOrdersReadiness009A() });
  });

  router.get('/api/admin/taxi/orders/009a/orders', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await listTaxiOrders009A({
        status: String(req.query.status || 'all'),
        countryCode: String(req.query.countryCode || ''),
        limit: Number(req.query.limit || 200),
      });
      res.status(result.ok ? 200 : 409);
      ok009A(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009b_list_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true, dbWriteExecuted: false });
    }
  });

  router.get('/api/admin/taxi/orders/009a/report', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await getTaxiOrdersReport009A();
      res.status(result.ok ? 200 : 409);
      ok009A(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009b_report_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true, dbWriteExecuted: false });
    }
  });

  router.get('/api/admin/taxi/orders/009a/audit', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      const result = await readTaxiOrdersAudit009B({
        countryCode: String(req.query.countryCode || ''),
        limit: Number(req.query.limit || 50),
      });
      res.status(result.ok ? 200 : 409);
      ok009A(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009b_audit_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true, dbWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });

  router.post('/api/admin/taxi/orders/009a/archive/run', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!exactArchiveApproval009A(req)) {
      res.setHeader('x-sabi-taxi-orders-control', '009b');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(403).json({
        ok: false,
        code: 'taxi_orders_009a_exact_archive_approval_missing',
        requiredHeader: TAXI_ORDERS_ARCHIVE_APPROVAL_HEADER_009A,
        requiredValue: TAXI_ORDERS_ARCHIVE_APPROVAL_VALUE_009A,
        fakeSuccessBlocked: true,
        dbWriteExecuted: false,
        archiveWriteExecuted: false,
        providerDispatch: false,
        walletMutation: false,
      });
      return;
    }
    try {
      const result = await runTaxiOrdersArchive009A(idempotency009A(req), actor009A(req));
      res.status(result.ok ? 200 : 409);
      ok009A(res, result as unknown as Record<string, unknown>);
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_orders_009b_archive_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true, dbWriteExecuted: false, archiveWriteExecuted: false, providerDispatch: false, walletMutation: false });
    }
  });
}
