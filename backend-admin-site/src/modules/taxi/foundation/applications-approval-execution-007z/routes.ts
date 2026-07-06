import { Router, type Request, type Response } from 'express';
import {
  TAXI_APPLICATIONS_EXECUTION_APPROVAL_HEADER_007Z,
  TAXI_APPLICATIONS_EXECUTION_APPROVAL_VALUE_007Z,
  TAXI_APPLICATIONS_IDEMPOTENCY_HEADER_007Z,
} from './constants';
import {
  buildTaxiApplicationsExecutionReadiness007Z,
  executeTaxiApplicationAction007Z,
  getTaxiApplicationDetails007Z,
  listTaxiApplications007Z,
  normalizeTaxiApplicationId007Z,
} from './service';
import type { TaxiApplicationExecutionAction007Z, TaxiApplicationExecutionPayload007Z } from './types';

type TaxiApplicationsExecutionRouteDeps007Z = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok007Z(res: Response, body: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-applications-execution', '007z');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(body);
}

function forbidden007Z(res: Response, code: string): void {
  res.setHeader('x-sabi-taxi-applications-execution', '007z');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.status(403).json({
    ok: false,
    code,
    error: 'taxi_applications_007z_execution_header_required',
    requiredHeader: TAXI_APPLICATIONS_EXECUTION_APPROVAL_HEADER_007Z,
    requiredValue: TAXI_APPLICATIONS_EXECUTION_APPROVAL_VALUE_007Z,
    fakeSuccessBlocked: true,
    dbWriteExecuted: false,
  });
}

function hasExecutionApproval007Z(req: Request): boolean {
  return String(req.headers[TAXI_APPLICATIONS_EXECUTION_APPROVAL_HEADER_007Z] || '').trim() === TAXI_APPLICATIONS_EXECUTION_APPROVAL_VALUE_007Z;
}

function idempotencyKey007Z(req: Request): string {
  return String(req.headers[TAXI_APPLICATIONS_IDEMPOTENCY_HEADER_007Z] || '').trim();
}

function payload007Z(req: Request): TaxiApplicationExecutionPayload007Z {
  return (req.body && typeof req.body === 'object') ? req.body as TaxiApplicationExecutionPayload007Z : {};
}

function actorId007Z(req: Request): string {
  return String(req.headers['x-sabi-admin-id'] || req.headers['x-admin-id'] || 'admin-panel').trim() || 'admin-panel';
}

function registerWrite007Z(router: Router, deps: TaxiApplicationsExecutionRouteDeps007Z, action: TaxiApplicationExecutionAction007Z): void {
  router.post(`/api/admin/taxi/applications/007z/applications/:applicationId/${action}`, async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    if (!hasExecutionApproval007Z(req)) {
      forbidden007Z(res, 'taxi_applications_007z_exact_owner_execution_header_missing');
      return;
    }
    try {
      const result = await executeTaxiApplicationAction007Z(action, normalizeTaxiApplicationId007Z(req.params.applicationId), payload007Z(req), idempotencyKey007Z(req), actorId007Z(req));
      res.setHeader('x-sabi-taxi-applications-execution', '007z');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(result.ok ? 200 : 409).json(result);
    } catch (error) {
      res.setHeader('x-sabi-taxi-applications-execution', '007z');
      res.setHeader('x-sabi-fake-success-blocked', 'true');
      res.status(500).json({ ok: false, code: 'taxi_applications_007z_execution_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true, dbWriteExecuted: false });
    }
  });
}

export function registerTaxiApplicationsApprovalExecution007ZRoutes(router: Router, deps: TaxiApplicationsExecutionRouteDeps007Z): void {
  router.get('/api/admin/taxi/applications/007z/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok007Z(res, { readiness: buildTaxiApplicationsExecutionReadiness007Z() });
  });

  router.get('/api/admin/taxi/applications/007z/new-applications', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      ok007Z(res, await listTaxiApplications007Z());
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_applications_007z_list_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true });
    }
  });

  router.get('/api/admin/taxi/applications/007z/applications/:applicationId', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    try {
      ok007Z(res, await getTaxiApplicationDetails007Z(normalizeTaxiApplicationId007Z(req.params.applicationId)));
    } catch (error) {
      res.status(500).json({ ok: false, code: 'taxi_applications_007z_details_failed', error: error instanceof Error ? error.message : 'unknown_error', fakeSuccessBlocked: true });
    }
  });

  registerWrite007Z(router, deps, 'approve');
  registerWrite007Z(router, deps, 'reject');
  registerWrite007Z(router, deps, 'archive');
  registerWrite007Z(router, deps, 'request-documents');
}
