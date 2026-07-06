import { Router, type Request, type Response } from 'express';
import {
  buildTaxiApplicationDetailsResponse007Y,
  buildTaxiApplicationLockedWriteResponse007Y,
  buildTaxiApplicationsFoundationReadiness007Y,
  buildTaxiApplicationsReadOnlyListResponse007Y,
  normalizeTaxiApplicationId007Y,
} from './service';
import type { TaxiApplicationDecisionAction007Y } from './types';

type TaxiApplicationsApprovalRouteDeps007Y = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok007Y(res: Response, body: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-applications-foundation', '007y');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json(body);
}

function locked007Y(res: Response, body: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-applications-foundation', '007y');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.status(423).json(body);
}

function registerWriteAction007Y(router: Router, deps: TaxiApplicationsApprovalRouteDeps007Y, action: TaxiApplicationDecisionAction007Y): void {
  const routeAction = action;
  router.post(`/api/admin/taxi/applications/007y/applications/:applicationId/${routeAction}`, (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const applicationId = normalizeTaxiApplicationId007Y(req.params.applicationId);
    const payload = (req.body && typeof req.body === 'object') ? req.body as Record<string, unknown> : {};
    locked007Y(res, buildTaxiApplicationLockedWriteResponse007Y(action, applicationId, payload));
  });
}

export function registerTaxiApplicationsApprovalFoundation007YRoutes(
  router: Router,
  deps: TaxiApplicationsApprovalRouteDeps007Y,
): void {
  router.get('/api/admin/taxi/applications/007y/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok007Y(res, buildTaxiApplicationsFoundationReadiness007Y());
  });

  router.get('/api/admin/taxi/applications/007y/new-applications', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok007Y(res, buildTaxiApplicationsReadOnlyListResponse007Y());
  });

  router.get('/api/admin/taxi/applications/007y/applications/:applicationId', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok007Y(res, buildTaxiApplicationDetailsResponse007Y(normalizeTaxiApplicationId007Y(req.params.applicationId)));
  });

  registerWriteAction007Y(router, deps, 'approve');
  registerWriteAction007Y(router, deps, 'reject');
  registerWriteAction007Y(router, deps, 'archive');

  router.post('/api/admin/taxi/applications/007y/applications/:applicationId/request-documents', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const applicationId = normalizeTaxiApplicationId007Y(req.params.applicationId);
    const payload = (req.body && typeof req.body === 'object') ? req.body as Record<string, unknown> : {};
    locked007Y(res, buildTaxiApplicationLockedWriteResponse007Y('request-documents', applicationId, payload));
  });
}
