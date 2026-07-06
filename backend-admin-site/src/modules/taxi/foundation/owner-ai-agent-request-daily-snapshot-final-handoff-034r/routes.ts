import { Router, type Request, type Response } from 'express';
import { getTaxiOwnerAiDailySnapshotFinalHandoff034R, getTaxiOwnerAiDailySnapshotFinalHandoffReadiness034R } from './service';

type TaxiOwnerAiDailySnapshotFinalHandoffRouteDeps034R = Readonly<{
  requireAdminToken: (req: Request, res: Response) => boolean;
}>;

function noStore034R(res: Response): void {
  res.setHeader('cache-control', 'no-store');
  res.setHeader('x-sabi-taxi-owner-ai-final-handoff', '034r');
  res.setHeader('x-sabi-money-movement', 'blocked');
  res.setHeader('x-sabi-provider-call', 'blocked');
  res.setHeader('x-sabi-raw-personal-data', 'blocked');
}

function ok034R(res: Response, data: Record<string, unknown>): void {
  noStore034R(res);
  res.json({ ok: true, ...data });
}

export function registerTaxiOwnerAiAgentRequestDailySnapshotFinalHandoff034RRoutes(
  router: Router,
  deps: TaxiOwnerAiDailySnapshotFinalHandoffRouteDeps034R,
): void {
  router.get('/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/readiness', (_req, res) => {
    ok034R(res, { readiness: getTaxiOwnerAiDailySnapshotFinalHandoffReadiness034R() });
  });

  router.get('/api/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff', (_req, res) => {
    ok034R(res, { handoff: getTaxiOwnerAiDailySnapshotFinalHandoff034R() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/readiness', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034R(res, { readiness: getTaxiOwnerAiDailySnapshotFinalHandoffReadiness034R() });
  });

  router.get('/api/admin/taxi/owner-ai/agent-request/daily-snapshot/final-handoff/034r/handoff', (req, res) => {
    if (!deps.requireAdminToken(req, res)) return;
    ok034R(res, { handoff: getTaxiOwnerAiDailySnapshotFinalHandoff034R() });
  });
}
