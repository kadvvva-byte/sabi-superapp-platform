import { Router, type Request, type Response } from 'express';
import { getTaxiOwnerAiAgentRequestReport034L, getTaxiOwnerAiAgentRequestReportReadiness034L } from './service';

type TaxiOwnerAiAgentRequestReportRouteDeps034L = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore034L(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-owner-ai-agent-request-report', '034l');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok034L(res: Response, data: Record<string, unknown>): void {
  noStore034L(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiOwnerAiAgentRequestReportSafeDisabled034LRoutes(
  router: Router,
  deps: TaxiOwnerAiAgentRequestReportRouteDeps034L,
): void {
  router.get('/api/taxi/owner-ai/agent-request/034l/readiness', (_req, res) => {
    ok034L(res, { readiness: getTaxiOwnerAiAgentRequestReportReadiness034L() });
  });

  router.get('/api/taxi/owner-ai/agent-request/034l/report', (_req, res) => {
    ok034L(res, { report: getTaxiOwnerAiAgentRequestReport034L() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/034l/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034L(res, { readiness: getTaxiOwnerAiAgentRequestReportReadiness034L() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/034l/report', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034L(res, { report: getTaxiOwnerAiAgentRequestReport034L() });
  });
}
