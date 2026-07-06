import { Router, type Request, type Response } from 'express';
import { getTaxiOwnerAiAgentRequestDailySnapshot034O, getTaxiOwnerAiAgentRequestDailySnapshotReadiness034O } from './service';

type TaxiOwnerAiAgentRequestDailySnapshotRouteDeps034O = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore034O(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-owner-ai-daily-snapshot', '034o');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok034O(res: Response, data: Record<string, unknown>): void {
  noStore034O(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiOwnerAiAgentRequestDailySnapshotSafeRead034ORoutes(
  router: Router,
  deps: TaxiOwnerAiAgentRequestDailySnapshotRouteDeps034O,
): void {
  router.get('/api/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness', (_req, res) => {
    ok034O(res, { readiness: getTaxiOwnerAiAgentRequestDailySnapshotReadiness034O() });
  });

  router.get('/api/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot', (_req, res) => {
    ok034O(res, { snapshot: getTaxiOwnerAiAgentRequestDailySnapshot034O() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034O(res, { readiness: getTaxiOwnerAiAgentRequestDailySnapshotReadiness034O() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/daily-snapshot/034o/snapshot', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034O(res, { snapshot: getTaxiOwnerAiAgentRequestDailySnapshot034O() });
  });
}
