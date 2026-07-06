import { Router, type Request, type Response } from 'express';
import {
  buildTaxiOrdersLostPropertyAuditTimelineReadiness010F,
  loadTaxiOrdersLostPropertyAuditTimeline010F,
} from './service';

type TaxiOrdersLostPropertyAuditTimelineRouteDeps010F = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function ok010F(res: Response, data: Record<string, unknown>): void {
  res.setHeader('x-sabi-taxi-orders-lost-property-audit-control', '010f');
  res.setHeader('x-sabi-taxi-orders-010f-read-only-timeline-redacted', 'true');
  res.setHeader('x-sabi-fake-success-blocked', 'true');
  res.json({ ok: true, ...data });
}

export function registerTaxiOrdersLostPropertyAuditTimeline010FRoutes(router: Router, deps: TaxiOrdersLostPropertyAuditTimelineRouteDeps010F): void {
  router.get('/api/admin/taxi/orders/010f/lost-property/audit/readiness', (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok010F(res, { readiness: buildTaxiOrdersLostPropertyAuditTimelineReadiness010F() });
  });

  router.get('/api/admin/taxi/orders/010f/lost-property/audit/timeline', async (req: Request, res: Response) => {
    if (!deps.requireAdminToken(req, res)) return;
    const timeline = await loadTaxiOrdersLostPropertyAuditTimeline010F({
      supportCaseId: req.query.supportCaseId,
      tripId: req.query.tripId,
      limit: req.query.limit,
    });
    ok010F(res, timeline as unknown as Record<string, unknown>);
  });
}
