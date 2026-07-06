import { getTaxi040ZReadiness, getTaxi040ZSummary } from './service';

function set040ZSafetyHeaders(res: any): void {
  if (!res || typeof res.setHeader !== 'function') return;
  res.setHeader('x-sabi-money-movement', 'payment-and-payout-controlled-gates-verified');
  res.setHeader('x-sabi-wallet-mutation', 'previous-main-wallet-ledger-live-gate-verified');
  res.setHeader('x-sabi-payment-execution', 'previous-payment-controlled-smoke-verified');
  res.setHeader('x-sabi-payout-execution', 'previous-payout-settlement-gate-verified');
  res.setHeader('x-sabi-provider-call', 'previous-handshake-verified');
  res.setHeader('x-sabi-db-write', 'previous-db-production-apply-gate-verified');
  res.setHeader('x-sabi-production-launch', 'final-e2e-closeout-ready-no-autonomous-public-launch');
  res.setHeader('x-sabi-standalone-taxi-wallet', 'blocked');
  res.setHeader('x-sabi-taxi-commission-bps', '0');
  res.setHeader('x-sabi-visa-cashback-bps', '200');
  res.setHeader('x-sabi-owner-sabi-ai-autonomous-execution', 'blocked');
  res.setHeader('x-sabi-full-production-e2e-closeout', 'verified-controlled-final-e2e-closeout');
  res.setHeader('x-sabi-api-key-value-accepted', 'blocked');
  res.setHeader('x-sabi-env-read', 'blocked');
  res.setHeader('x-sabi-secret-read', 'controlled-no-print');
}

function sendJson(res: any, status: number, body: unknown): void {
  set040ZSafetyHeaders(res);
  if (res && typeof res.status === 'function' && typeof res.json === 'function') { res.status(status).json(body); return; }
  if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') { res.writeHead(status, { 'content-type': 'application/json' }); res.end(JSON.stringify(body)); }
}

function forbiddenAdmin(_req: any, res: any): void {
  if (res && typeof res.status === 'function' && typeof res.json === 'function') { res.status(403).json({ error: 'admin_token_required' }); return; }
  if (res && typeof res.writeHead === 'function' && typeof res.end === 'function') { res.writeHead(403, { 'content-type': 'application/json' }); res.end(JSON.stringify({ error: 'admin_token_required' })); }
}

export function registerTaxiFullProductionE2ECloseout040ZRoutes(router: any): void {
  if (!router || typeof router.get !== 'function') return;
  const publicReadiness = (_req: any, res: any) => sendJson(res, 200, getTaxi040ZReadiness());
  const publicSummary = (_req: any, res: any) => sendJson(res, 200, getTaxi040ZSummary());
  router.get('/api/taxi/wallet-finance/full-production-e2e-closeout/040z/readiness', publicReadiness);
  router.get('/api/taxi/wallet-finance/full-production-e2e-closeout/040z/summary', publicSummary);
  router.get('/taxi/wallet-finance/full-production-e2e-closeout/040z/readiness', publicReadiness);
  router.get('/taxi/wallet-finance/full-production-e2e-closeout/040z/summary', publicSummary);
  router.get('/api/admin/taxi/wallet-finance/full-production-e2e-closeout/040z/readiness', forbiddenAdmin);
  router.get('/api/admin/taxi/wallet-finance/full-production-e2e-closeout/040z/summary', forbiddenAdmin);
}
